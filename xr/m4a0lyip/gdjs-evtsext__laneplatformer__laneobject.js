
gdjs.evtsExt__LanePlatformer__LaneObject = gdjs.evtsExt__LanePlatformer__LaneObject || {};

/**
 * Behavior generated from Lane object
 */
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject = class LaneObject extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
  }

  // Properties:
  
}

/**
 * Shared data generated from Lane object
 */
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.SharedData = class LaneObjectSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._LanePlatformer_LaneObjectSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._LanePlatformer_LaneObjectSharedData = new gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.SharedData(
      initialData
    );
  }
  return instanceContainer._LanePlatformer_LaneObjectSharedData;
}

// Methods:
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects2= [];
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.mapOfGDgdjs_9546evtsExt_9595_9595LanePlatformer_9595_9595LaneObject_9546LaneObject_9546prototype_9546IsObjectOnSameLaneContext_9546GDObjectObjects1Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects1});
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Character"), gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("LaneCharacter")).IsObjectOnSameLane(gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.mapOfGDgdjs_9546evtsExt_9595_9595LanePlatformer_9595_9595LaneObject_9546LaneObject_9546prototype_9546IsObjectOnSameLaneContext_9546GDObjectObjects1Objects, eventsFunctionContext.getBehaviorName("Object3D"), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLane = function(Character, LaneCharacter, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Character": Character
},
  _objectArraysMap: {
"Object": thisObjectList
, "Character": gdjs.objectsListsToArray(Character)
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "LaneCharacter": LaneCharacter
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("LanePlatformer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("LanePlatformer"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.IsObjectOnSameLaneContext.GDCharacterObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("LanePlatformer::LaneObject", gdjs.evtsExt__LanePlatformer__LaneObject.LaneObject);
