
if (typeof gdjs.evtsExt__Sticker__IsStuck !== "undefined") {
  gdjs.evtsExt__Sticker__IsStuck.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sticker__IsStuck = {};
gdjs.evtsExt__Sticker__IsStuck.GDObjectObjects1= [];
gdjs.evtsExt__Sticker__IsStuck.GDBasisObjectObjects1= [];


gdjs.evtsExt__Sticker__IsStuck.userFunc0xa2d318 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const stickerBehaviorName = eventsFunctionContext.getBehaviorName("Behavior");
/** @type {Hashtable<gdjs.RuntimeObject[]>} */
const stickerObjectsLists = eventsFunctionContext.getObjectsLists("Object");
/** @type {Hashtable<gdjs.RuntimeObject[]>} */
const basisObjectsLists = eventsFunctionContext.getObjectsLists("BasisObject");

eventsFunctionContext.returnValue = gdjs.evtTools.object.twoListsTest(
  (stickerObject, basisObject) => {
    const sticker = stickerObject.getBehavior(stickerBehaviorName)._sticker;
    return sticker.isStuckTo(basisObject);
  },
  stickerObjectsLists,
  basisObjectsLists,
  false
);
};
gdjs.evtsExt__Sticker__IsStuck.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sticker__IsStuck.userFunc0xa2d318(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__Sticker__IsStuck.func = function(runtimeScene, Object, Behavior, BasisObject, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "BasisObject": BasisObject
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
, "BasisObject": gdjs.objectsListsToArray(BasisObject)
},
  _behaviorNamesMap: {
"Behavior": Behavior
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

gdjs.evtsExt__Sticker__IsStuck.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sticker__IsStuck.GDBasisObjectObjects1.length = 0;

gdjs.evtsExt__Sticker__IsStuck.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sticker__IsStuck.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sticker__IsStuck.GDBasisObjectObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__Sticker__IsStuck.registeredGdjsCallbacks = [];