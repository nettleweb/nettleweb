/**
 * Contains overrides for Phaser.js necessary for the game
 */
if (typeof Phaser !== 'undefined') {
    /**
     * These changes were required to allow for top-only collision platforms.
     * Otherwise, any collision between the player's body and the platform
     * would move the player above the platform immediately.
     */
    Phaser.Physics.Arcade.prototype.separateTileX = function(body, tile, separate) {

        //  Can't separate two immovable objects (tiles are always immovable)
        if (body.immovable || body.deltaX() === 0 || Phaser.Rectangle.intersects(body.hullX, tile) === false)
        {
            return false;
        }

        this._overlap = 0;

        //  The hulls overlap, let's process it
        this._maxOverlap = body.deltaAbsX() + this.OVERLAP_BIAS;

        if (body.deltaX() < 0)
        {
            //  Moving left
            this._overlap = tile.right - body.hullX.x;

            if ((tile.tile.enableMaxOverlapCheck && this._overlap > this._maxOverlap) || body.allowCollision.left === false || tile.tile.collideRight === false)
            // if (body.allowCollision.left === false || tile.tile.collideRight === false)
            {
                this._overlap = 0;
            }
            else
            {
                body.touching.left = true;
            }
        }
        else
        {
            //  Moving right
            this._overlap = body.hullX.right - tile.x;

            if ((tile.tile.enableMaxOverlapCheck && this._overlap > this._maxOverlap) || body.allowCollision.right === false || tile.tile.collideLeft === false)
            // if (body.allowCollision.right === false || tile.tile.collideLeft === false)
            {
                this._overlap = 0;
            }
            else
            {
                body.touching.right = true;
            }
        }

        //  Then adjust their positions and velocities accordingly (if there was any overlap)
        if (this._overlap !== 0)
        {
            if (separate)
            {
                if (body.deltaX() < 0)
                {
                    body.x = body.x + this._overlap;
                }
                else
                {
                    body.x = body.x - this._overlap;
                }

                if (body.bounce.x === 0)
                {
                    body.velocity.x = 0;
                }
                else
                {
                    body.velocity.x = -body.velocity.x * body.bounce.x;
                }

                body.updateHulls();
            }

            return true;
        }
        else
        {
            return false;
        }

    };

    Phaser.Physics.Arcade.prototype.separateTileY = function(body, tile, separate) {

        //  Can't separate two immovable objects (tiles are always immovable)
        if (body.immovable || body.deltaY() === 0 || Phaser.Rectangle.intersects(body.hullY, tile) === false)
        {
            return false;
        }

        this._overlap = 0;

        //  The hulls overlap, let's process it
        this._maxOverlap = body.deltaAbsY() + this.OVERLAP_BIAS;

        if (body.deltaY() < 0)
        {
            //  Moving up
            this._overlap = tile.bottom - body.hullY.y;

            if ((tile.tile.enableMaxOverlapCheck && this._overlap > this._maxOverlap) || body.allowCollision.up === false || tile.tile.collideDown === false)
            // if (body.allowCollision.up === false || tile.tile.collideDown === false)
            {
                this._overlap = 0;
            }
            else
            {
                body.touching.up = true;
            }
        }
        else
        {
            //  Moving down
            this._overlap = body.hullY.bottom - tile.y;

            if ((tile.tile.enableMaxOverlapCheck && this._overlap > this._maxOverlap) || body.allowCollision.down === false || tile.tile.collideUp === false)
            // if (body.allowCollision.down === false || tile.tile.collideUp === false)
            {
                this._overlap = 0;
            }
            else
            {
                body.touching.down = true;
            }
        }

        //  Then adjust their positions and velocities accordingly (if there was any overlap)
        if (this._overlap !== 0)
        {
            if (separate)
            {
                if (body.deltaY() < 0)
                {
                    body.y = body.y + this._overlap;
                }
                else
                {
                    body.y = body.y - this._overlap;
                }

                if (body.bounce.y === 0)
                {
                    body.velocity.y = 0;
                }
                else
                {
                    body.velocity.y = -body.velocity.y * body.bounce.y;
                }

                body.updateHulls();
            }

            return true;
        }
        else
        {
            return false;
        }

    };

    /**
     * These changes were required for proper positioning of item
     * when being acquired.
     */
    Phaser.Physics.Arcade.prototype.moveToXY = function(displayObject, x, y, speed, maxTime) {

        if (typeof speed === 'undefined') { speed = 60; }
        if (typeof maxTime === 'undefined') { maxTime = 0; }

        this._angle = Math.atan2(y - displayObject.body.y, x - displayObject.body.x);
        
        if (maxTime > 0)
        {
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceToXY(displayObject, x, y) / (maxTime / 1000);
        }
        
        displayObject.body.velocity.x = Math.cos(this._angle) * speed;
        displayObject.body.velocity.y = Math.sin(this._angle) * speed;

        return this._angle;

    };

    Phaser.Physics.Arcade.prototype.distanceToXY = function(displayObject, x, y) {

        this._dx = displayObject.body.x - x;
        this._dy = displayObject.body.y - y;
        
        return Math.sqrt(this._dx * this._dx + this._dy * this._dy);

    };

    Phaser.Physics.Arcade.prototype.angleToXY = function(displayObject, x, y) {

        this._dx = x - displayObject.body.x;
        this._dy = y - displayObject.body.y;
        
        return Math.atan2(this._dy, this._dx);

    };


    /**
     * These changes were required to allow for flipping of particles
     */
    Phaser.Particles.Arcade.Emitter.prototype.emitParticle = function() {

        var particle = this.getFirstExists(false);

        if (particle == null)
        {
            return;
        }

        if (this.width > 1 || this.height > 1)
        {
            particle.reset(this.game.rnd.integerInRange(this.left, this.right), this.game.rnd.integerInRange(this.top, this.bottom));
        }
        else
        {
            particle.reset(this.emitX, this.emitY);
        }

        particle.lifespan = this.lifespan;

        particle.body.bounce.setTo(this.bounce.x, this.bounce.y);

        if (this.minParticleSpeed.x != this.maxParticleSpeed.x)
        {
            particle.body.velocity.x = this.game.rnd.integerInRange(this.minParticleSpeed.x, this.maxParticleSpeed.x);
        }
        else
        {
            particle.body.velocity.x = this.minParticleSpeed.x;
        }

        if (this.minParticleSpeed.y != this.maxParticleSpeed.y)
        {
            particle.body.velocity.y = this.game.rnd.integerInRange(this.minParticleSpeed.y, this.maxParticleSpeed.y);
        }
        else
        {
            particle.body.velocity.y = this.minParticleSpeed.y;
        }

        particle.body.gravity.y = this.gravity;

        if (this.minRotation != this.maxRotation)
        {
            particle.body.angularVelocity = this.game.rnd.integerInRange(this.minRotation, this.maxRotation);
        }
        else
        {
            particle.body.angularVelocity = this.minRotation;
        }

        if (this.minParticleScale !== 1 || this.maxParticleScale !== 1)
        {
            var scale = this.game.rnd.realInRange(this.minParticleScale, this.maxParticleScale);
            particle.scale.setTo(scale, scale);
        }

        if (this.flipped) {
            particle.body.velocity.x *= -1;
            particle.body.angularVelocity *= -1;
            particle.scale.x *= -1;
        }

        particle.body.drag.x = this.particleDrag.x;
        particle.body.drag.y = this.particleDrag.y;
        particle.body.angularDrag = this.angularDrag;

    };


    /**
     * These changes are necessary to have objects which behave as "immovables"
     * but are affected by each other, and gravity. Used for blocks.
     */
    Phaser.Physics.Arcade.prototype.separateX = function (body1, body2) {

        //  Can't separate two immovable bodies
        if (body1.immovable && body2.immovable)
        {
            return false;
        }

        this._overlap = 0;

        //  Check if the hulls actually overlap
        if (Phaser.Rectangle.intersects(body1, body2))
        {
            this._maxOverlap = body1.deltaAbsX() + body2.deltaAbsX() + this.OVERLAP_BIAS;

            if (body1.deltaX() === 0 && body2.deltaX() === 0)
            {
                //  They overlap but neither of them are moving
                body1.embedded = true;
                body2.embedded = true;
            }
            else if (body1.deltaX() > body2.deltaX())
            {
                //  Body1 is moving right and/or Body2 is moving left
                this._overlap = body1.x + body1.width - body2.x;

                if ((this._overlap > this._maxOverlap) || body1.allowCollision.right === false || body2.allowCollision.left === false)
                {
                    this._overlap = 0;
                }
                else
                {
                    body1.touching.right = true;
                    body2.touching.left = true;
                }
            }
            else if (body1.deltaX() < body2.deltaX())
            {
                //  Body1 is moving left and/or Body2 is moving right
                this._overlap = body1.x - body2.width - body2.x;

                if ((-this._overlap > this._maxOverlap) || body1.allowCollision.left === false || body2.allowCollision.right === false)
                {
                    this._overlap = 0;
                }
                else
                {
                    body1.touching.left = true;
                    body2.touching.right = true;
                }
            }

            //  Then adjust their positions and velocities accordingly (if there was any overlap)
            if (this._overlap !== 0)
            {
                body1.overlapX = this._overlap;
                body2.overlapX = this._overlap;

                if (body1.customSeparateX || body2.customSeparateX)
                {
                    return true;
                }

                this._velocity1 = body1.velocity.x;
                this._velocity2 = body2.velocity.x;

                if (!body1.immovable && !body2.immovable)
                {
                    if (!body1.blockable && !body2.blockable) {
                        this._overlap *= 0.5;

                        body1.x = body1.x - this._overlap;
                        body2.x += this._overlap;

                        this._newVelocity1 = Math.sqrt((this._velocity2 * this._velocity2 * body2.mass) / body1.mass) * ((this._velocity2 > 0) ? 1 : -1);
                        this._newVelocity2 = Math.sqrt((this._velocity1 * this._velocity1 * body1.mass) / body2.mass) * ((this._velocity1 > 0) ? 1 : -1);
                        this._average = (this._newVelocity1 + this._newVelocity2) * 0.5;
                        this._newVelocity1 -= this._average;
                        this._newVelocity2 -= this._average;

                        body1.velocity.x = this._average + this._newVelocity1 * body1.bounce.x;
                        body2.velocity.x = this._average + this._newVelocity2 * body2.bounce.x;
                    } else if (body1.blockable) {
                        body1.x = body1.x - this._overlap;
                        body1.velocity.x = this._velocity2 - this._velocity1 * body1.bounce.x;
                    } else if (body2.blockable) {
                        body2.x += this._overlap;
                        body2.velocity.x = this._velocity1 - this._velocity2 * body2.bounce.x;
                    }
                }
                else if (!body1.immovable)
                {
                    body1.x = body1.x - this._overlap;
                    body1.velocity.x = this._velocity2 - this._velocity1 * body1.bounce.x;
                }
                else if (!body2.immovable)
                {
                    body2.x += this._overlap;
                    body2.velocity.x = this._velocity1 - this._velocity2 * body2.bounce.x;
                }
                body1.updateHulls();
                body2.updateHulls();

                return true;
            }
        }

        return false;

    };

    Phaser.Physics.Arcade.prototype.separateY = function(body1, body2) {

        //  Can't separate two immovable or non-existing bodys
        if (body1.immovable && body2.immovable)
        {
            return false;
        }

        this._overlap = 0;

        //  Check if the hulls actually overlap
        if (Phaser.Rectangle.intersects(body1, body2))
        {
            this._maxOverlap = body1.deltaAbsY() + body2.deltaAbsY() + this.OVERLAP_BIAS;

            if (body1.deltaY() === 0 && body2.deltaY() === 0)
            {
                //  They overlap but neither of them are moving
                body1.embedded = true;
                body2.embedded = true;
            }
            else if (body1.deltaY() > body2.deltaY())
            {
                //  Body1 is moving down and/or Body2 is moving up
                this._overlap = body1.y + body1.height - body2.y;

                if ((this._overlap > this._maxOverlap) || body1.allowCollision.down === false || body2.allowCollision.up === false)
                {
                    this._overlap = 0;
                }
                else
                {
                    body1.touching.down = true;
                    body2.touching.up = true;
                }
            }
            else if (body1.deltaY() < body2.deltaY())
            {
                //  Body1 is moving up and/or Body2 is moving down
                this._overlap = body1.y - body2.height - body2.y;

                if ((-this._overlap > this._maxOverlap) || body1.allowCollision.up === false || body2.allowCollision.down === false)
                {
                    this._overlap = 0;
                }
                else
                {
                    body1.touching.up = true;
                    body2.touching.down = true;
                }
            }

            //  Then adjust their positions and velocities accordingly (if there was any overlap)
            if (this._overlap !== 0)
            {
                body1.overlapY = this._overlap;
                body2.overlapY = this._overlap;

                if (body1.customSeparateY || body2.customSeparateY)
                {
                    return true;
                }

                this._velocity1 = body1.velocity.y;
                this._velocity2 = body2.velocity.y;

                if (!body1.immovable && !body2.immovable)
                {
                    if (!body1.blockable && !body2.blockable) {
                        this._overlap *= 0.5;

                        body1.y = body1.y - this._overlap;
                        body2.y += this._overlap;

                        this._newVelocity1 = Math.sqrt((this._velocity2 * this._velocity2 * body2.mass) / body1.mass) * ((this._velocity2 > 0) ? 1 : -1);
                        this._newVelocity2 = Math.sqrt((this._velocity1 * this._velocity1 * body1.mass) / body2.mass) * ((this._velocity1 > 0) ? 1 : -1);
                        this._average = (this._newVelocity1 + this._newVelocity2) * 0.5;
                        this._newVelocity1 -= this._average;
                        this._newVelocity2 -= this._average;

                        body1.velocity.y = this._average + this._newVelocity1 * body1.bounce.y;
                        body2.velocity.y = this._average + this._newVelocity2 * body2.bounce.y;
                    } else if (body1.blockable) {
                        body1.y = body1.y - this._overlap;
                        body1.velocity.y = this._velocity2 - this._velocity1 * body1.bounce.y;

                        //  This is special case code that handles things like horizontal moving platforms you can ride
                        if (body2.active && body2.moves && (body1.deltaY() > body2.deltaY()))
                        {
                            body1.x += body2.x - body2.lastX;
                        }
                    } else if (body2.blockable) {
                        body2.y += this._overlap;
                        body2.velocity.y = this._velocity1 - this._velocity2 * body2.bounce.y;

                        //  This is special case code that handles things like horizontal moving platforms you can ride
                        if (body1.sprite.active && body1.moves && (body1.deltaY() < body2.deltaY()))
                        {
                            body2.x += body1.x - body1.lastX;
                        }
                    }
                }
                else if (!body1.immovable)
                {
                    body1.y = body1.y - this._overlap;
                    body1.velocity.y = this._velocity2 - this._velocity1 * body1.bounce.y;

                    //  This is special case code that handles things like horizontal moving platforms you can ride
                    if (body2.active && body2.moves && (body1.deltaY() > body2.deltaY()))
                    {
                        body1.x += body2.x - body2.lastX;
                    }
                }
                else if (!body2.immovable)
                {
                    body2.y += this._overlap;
                    body2.velocity.y = this._velocity1 - this._velocity2 * body2.bounce.y;

                    //  This is special case code that handles things like horizontal moving platforms you can ride
                    if (body1.sprite.active && body1.moves && (body1.deltaY() < body2.deltaY()))
                    {
                        body2.x += body1.x - body1.lastX;
                    }
                }
                body1.updateHulls();
                body2.updateHulls();

                return true;
            }

        }

        return false;

    };
}
