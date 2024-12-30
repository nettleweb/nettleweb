
if (typeof gdjs.evtsExt__Collectible__onScenePreEvents !== "undefined") {
  gdjs.evtsExt__Collectible__onScenePreEvents.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Collectible__onScenePreEvents = {};


gdjs.evtsExt__Collectible__onScenePreEvents.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "RisingPitch") > 1;
if (isConditionTrue_0) {
{eventsFunctionContext.sceneVariablesForExtension.getFromIndex(0).setNumber(0.8);
}{gdjs.evtTools.runtimeScene.removeTimer(runtimeScene, "RisingPitch");
}}

}


};

gdjs.evtsExt__Collectible__onScenePreEvents.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Collectible"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Collectible"),
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


gdjs.evtsExt__Collectible__onScenePreEvents.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Collectible__onScenePreEvents.registeredGdjsCallbacks = [];
gdjs.evtsExt__Collectible__onScenePreEvents.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__Collectible__onScenePreEvents.func(runtimeScene, runtimeScene);
})
gdjs.registerRuntimeScenePreEventsCallback(gdjs.evtsExt__Collectible__onScenePreEvents.registeredGdjsCallbacks[gdjs.evtsExt__Collectible__onScenePreEvents.registeredGdjsCallbacks.length - 1]);
