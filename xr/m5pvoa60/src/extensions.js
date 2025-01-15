function createSlopedTilemapCollider(upwardSlopes, downwardSlopes) {
    return function(sprite, tilemapLayer, collideCallback, processCallback, callbackContext) {
        this._mapData = tilemapLayer.getTiles(sprite.body.x, sprite.body.y, sprite.body.width, sprite.body.height, true);

        if (this._mapData.length === 0) {
            return;
        }

        for (var i = 0; i < this._mapData.length; i++) {
            var tile = this._mapData[i];
            var slopeDistanceFromTileTop = 0;

            // Detect slopes
            if (upwardSlopes.indexOf(tile.tile.index) >= 0 && sprite.body.right < tile.right) {
                slopeDistanceFromTileTop = Math.max(0, tile.right - sprite.body.right);
            }
            else if (downwardSlopes.indexOf(tile.tile.index) >= 0 && sprite.body.x > tile.x) {
                slopeDistanceFromTileTop = Math.max(0, sprite.body.x - tile.x);
            }

            var shouldSeparate = (slopeDistanceFromTileTop === 0 || sprite.body.bottom > tile.y + slopeDistanceFromTileTop);

            if (shouldSeparate && this.separateTile(sprite.body, this._mapData[i])) {
                //  They collided, is there a custom process callback?
                if (processCallback) {
                    if (processCallback.call(callbackContext, sprite, this._mapData[i])) {
                        this._total++;

                        if (collideCallback) {
                            collideCallback.call(callbackContext, sprite, this._mapData[i]);
                        }
                    }
                } else {
                    this._total++;

                    if (collideCallback) {
                        collideCallback.call(callbackContext, sprite, this._mapData[i]);
                    }
                }

                if (slopeDistanceFromTileTop > 0) {
                    sprite.body.y += slopeDistanceFromTileTop;
                    sprite.body.updateHulls();
                }
            }
        }
    };
}

module.exports.createSlopedTilemapCollider = createSlopedTilemapCollider;
