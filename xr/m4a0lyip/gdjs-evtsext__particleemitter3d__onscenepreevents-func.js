
if (typeof gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents !== "undefined") {
  gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents = {};


gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.userFunc0x864830 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";

// See doStepPostEvents
runtimeScene.__particleEmmiter3DExtension = runtimeScene.__particleEmmiter3DExtension || {};
runtimeScene.__particleEmmiter3DExtension.emittersStepped = 0;
};
gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.userFunc0x864830(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ParticleEmitter3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ParticleEmitter3D"),
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


gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.registeredGdjsCallbacks = [];
gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.func(runtimeScene, runtimeScene);
})
gdjs.registerRuntimeScenePreEventsCallback(gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.registeredGdjsCallbacks[gdjs.evtsExt__ParticleEmitter3D__onScenePreEvents.registeredGdjsCallbacks.length - 1]);
