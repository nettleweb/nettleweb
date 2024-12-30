
if (typeof gdjs.evtsExt__Sticker__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__Sticker__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sticker__DefineHelperClasses = {};


gdjs.evtsExt__Sticker__DefineHelperClasses.userFunc0xa2d318 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (gdjs._stickerExtension) {
    return;
}

// Unstick from deleted objects.
gdjs.registerObjectDeletedFromSceneCallback(function (runtimeScene, deletedObject) {
    const extension = runtimeScene._stickerExtension;
    if (!extension) {
        return;
    }
    const allStickers = runtimeScene._stickerExtension.allStickers;
    for (const behavior of allStickers) {
        const sticker = behavior._sticker;
        if (sticker.isStuckTo(deletedObject)) {
            if (behavior._getIsDestroyedWithParent()) {
                behavior.owner.deleteFromScene(runtimeScene);
            }
            sticker.unstick();
        }
    }
});

class Sticker {
    /** @type {gdjs.RuntimeBehavior} */
    behavior;
    /** @type {gdjs.RuntimeObject | null} */
    basisObject;
    followingDoneThisFrame = false;
    relativeX = 0;
    relativeY = 0;
    relativeAngle = 0;
    relativeRotatedX = 0;
    relativeRotatedY = 0;
    basisOldX = 0;
    basisOldY = 0;
    basisOldAngle = 0;
    basisOldWidth = 0;
    basisOldHeight = 0;
    basisOldCenterXInScene = 0;
    basisOldCenterYInScene = 0;

    /**
     * @param {gdjs.RuntimeBehavior} behavior
     */
    constructor(behavior) {
        this.behavior = behavior;
    }

    /**
     * @param {gdjs.RuntimeObject} basisObject
     */
    isStuckTo(basisObject) {
        return this.basisObject === basisObject;
    }

    /**
     * @param {gdjs.RuntimeObject} basisObject
     */
    stickTo(basisObject) {
        this.basisObject = basisObject;
        this.updateOldCoordinates();
        this.updateRelativeCoordinates();
    }

    unstick() {
        this.basisObject = null;
    }

    onStepPreEvents() {
        this.followingDoneThisFrame = false;
    }

    /**
     * Update the coordinates in the basisObject basis.
     * 
     * It uses the basisObject coordinates from the previous frame.
     * This way, the sticker can move relatively to it and still
     * follow basisObject.
     * 
     * @param {gdjs.RuntimeObject} basisObject
     */
    updateRelativeCoordinates() {
        const object = this.behavior.owner;

        // Update relative coordinates
        this.relativeX = object.getX() - this.basisOldX;
        this.relativeY = object.getY() - this.basisOldY;
        if (!this.behavior._getOnlyFollowPosition()) {
            this.relativeAngle = object.getAngle() - this.basisOldAngle;
            this.relativeWidth = object.getWidth() / this.basisOldWidth;
            this.relativeHeight = object.getHeight() / this.basisOldHeight;
            const deltaX = object.getCenterXInScene() - this.basisOldCenterXInScene;
            const deltaY = object.getCenterYInScene() - this.basisOldCenterYInScene;
            const angle = this.basisOldAngle * Math.PI / 180;
            this.relativeRotatedX = (deltaX * Math.cos(angle) + deltaY * Math.sin(angle)) / this.basisOldWidth;
            this.relativeRotatedY = (-deltaX * Math.sin(angle) + deltaY * Math.cos(angle)) / this.basisOldHeight;

            // Save initial values to avoid calculus and rounding errors
            this.basisOriginalWidth = this.basisObject.getWidth();
            this.basisOriginalHeight = this.basisObject.getHeight();
            this.basisOriginalAngle = this.basisObject.getAngle();
        }
    }

    /**
     * Copy the coordinates to use it the next frame.
     */
    updateOldCoordinates() {
        const object = this.behavior.owner;

        this.ownerOldX = object.getX();
        this.ownerOldY = object.getY();

        this.basisOldX = this.basisObject.getX();
        this.basisOldY = this.basisObject.getY();

        if (!this.behavior._getOnlyFollowPosition()) {
            this.ownerOldAngle = object.getAngle();
            this.ownerOldWidth = object.getWidth();
            this.ownerOldHeight = object.getHeight();

            this.basisOldAngle = this.basisObject.getAngle();
            this.basisOldWidth = this.basisObject.getWidth();
            this.basisOldHeight = this.basisObject.getHeight();
            this.basisOldCenterXInScene = this.basisObject.getCenterXInScene();
            this.basisOldCenterYInScene = this.basisObject.getCenterYInScene();
        }
    }

    /**
     * Follow the basisObject (called in doStepPostEvents).
     * 
     * This method is also called by children to ensure
     * parents are updated first.
     */
    followBasisObject() {
        if (this.followingDoneThisFrame) {
            return;
        }
        this.followingDoneThisFrame = true;
        const basisObject = this.basisObject;
        if (basisObject) {
            // If the behavior on the basis object has a different name,
            // the objects will still follow their basis objects
            // but frame delays could happen.
            const behaviorName = this.behavior.getName();
            if (basisObject.hasBehavior(behaviorName)) {
                const basisBehavior = basisObject.getBehavior(behaviorName);
                if (basisBehavior.type === this.behavior.type) {
                    // Follow parents 1st to avoid frame delays
                    basisBehavior._sticker.followBasisObject();
                }
            }

            const object = this.behavior.owner;

            if (this.behavior._getOnlyFollowPosition()) {
                if (object.getX() !== this.ownerOldX
                    || object.getY() !== this.ownerOldY) {
                    this.updateRelativeCoordinates();
                }

                if (this.basisOldX !== basisObject.getX() ||
                    this.basisOldY !== basisObject.getY()) {
                    object.setPosition(
                        basisObject.getX() + this.relativeX,
                        basisObject.getY() + this.relativeY);
                }
            } else {
                if (object.getX() !== this.ownerOldX
                    || object.getY() !== this.ownerOldY
                    || object.getAngle() !== this.ownerOldAngle
                    || object.getWidth() !== this.ownerOldWidth
                    || object.getHeight() !== this.ownerOldHeight) {
                    this.updateRelativeCoordinates();
                }

                // Follow basisObject
                if (basisObject.getAngle() === this.basisOriginalAngle && this.basisOriginalAngle === 0) {
                    if (basisObject.getWidth() === this.basisOriginalWidth ||
                        basisObject.getHeight() === this.basisOriginalHeight) {
                        if (this.basisOldX !== basisObject.getX() ||
                            this.basisOldY !== basisObject.getY()) {
                            object.setPosition(
                                basisObject.getX() + this.relativeX,
                                basisObject.getY() + this.relativeY);
                        }
                    } else {
                        object.setCenterPositionInScene(
                            basisObject.getCenterXInScene() + this.relativeRotatedX * basisObject.getWidth(),
                            basisObject.getCenterYInScene() + this.relativeRotatedY * basisObject.getHeight());
                    }
                } else {
                    object.setAngle(basisObject.getAngle() + this.relativeAngle);

                    const deltaX = this.relativeRotatedX * basisObject.getWidth();
                    const deltaY = this.relativeRotatedY * basisObject.getHeight();
                    const angle = -basisObject.getAngle() * Math.PI / 180;
                    object.setX(basisObject.getCenterXInScene() + object.getX() - object.getCenterXInScene() + deltaX * Math.cos(angle) + deltaY * Math.sin(angle));
                    object.setY(basisObject.getCenterYInScene() + object.getY() - object.getCenterYInScene() - deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
                }
                // Unproportional dimensions changes won't work as expected
                // if the object angle is not null but nothing more can be done
                // because there is no full affine transformation on objects.
                if (basisObject.getWidth() !== this.basisOriginalWidth) {
                    object.setWidth(this.relativeWidth * basisObject.getWidth());
                }
                if (basisObject.getHeight() !== this.basisOriginalHeight) {
                    object.setHeight(this.relativeHeight * basisObject.getHeight());
                }
            }

            this.updateOldCoordinates();
        }
    }
}

gdjs._stickerExtension = {
    Sticker
}
};
gdjs.evtsExt__Sticker__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sticker__DefineHelperClasses.userFunc0xa2d318(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__Sticker__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Sticker"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Sticker"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Sticker__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Sticker__DefineHelperClasses.registeredGdjsCallbacks = [];