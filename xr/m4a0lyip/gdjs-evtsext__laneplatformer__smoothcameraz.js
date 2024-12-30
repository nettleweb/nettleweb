
gdjs.evtsExt__LanePlatformer__SmoothCameraZ = gdjs.evtsExt__LanePlatformer__SmoothCameraZ || {};

/**
 * Behavior generated from Smooth camera on Z
 */
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ = class SmoothCameraZ extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.OffsetX = behaviorData.OffsetX !== undefined ? behaviorData.OffsetX : Number("0") || 0;
    this._behaviorData.OffsetY = behaviorData.OffsetY !== undefined ? behaviorData.OffsetY : Number("-100") || 0;
    this._behaviorData.Distance = behaviorData.Distance !== undefined ? behaviorData.Distance : Number("400") || 0;
    this._behaviorData.ElevationAngle = behaviorData.ElevationAngle !== undefined ? behaviorData.ElevationAngle : Number("20") || 0;
    this._behaviorData.TranslationZHalfwayDuration = behaviorData.TranslationZHalfwayDuration !== undefined ? behaviorData.TranslationZHalfwayDuration : Number("0.125") || 0;
    this._behaviorData.TranslationZLogSpeed = Number("") || 0;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.OffsetX !== newBehaviorData.OffsetX)
      this._behaviorData.OffsetX = newBehaviorData.OffsetX;
    if (oldBehaviorData.OffsetY !== newBehaviorData.OffsetY)
      this._behaviorData.OffsetY = newBehaviorData.OffsetY;
    if (oldBehaviorData.Distance !== newBehaviorData.Distance)
      this._behaviorData.Distance = newBehaviorData.Distance;
    if (oldBehaviorData.ElevationAngle !== newBehaviorData.ElevationAngle)
      this._behaviorData.ElevationAngle = newBehaviorData.ElevationAngle;
    if (oldBehaviorData.TranslationZHalfwayDuration !== newBehaviorData.TranslationZHalfwayDuration)
      this._behaviorData.TranslationZHalfwayDuration = newBehaviorData.TranslationZHalfwayDuration;
    if (oldBehaviorData.TranslationZLogSpeed !== newBehaviorData.TranslationZLogSpeed)
      this._behaviorData.TranslationZLogSpeed = newBehaviorData.TranslationZLogSpeed;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    OffsetX: this._behaviorData.OffsetX,
    OffsetY: this._behaviorData.OffsetY,
    Distance: this._behaviorData.Distance,
    ElevationAngle: this._behaviorData.ElevationAngle,
    TranslationZHalfwayDuration: this._behaviorData.TranslationZHalfwayDuration,
    TranslationZLogSpeed: this._behaviorData.TranslationZLogSpeed,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.OffsetX !== undefined)
      this._behaviorData.OffsetX = networkSyncData.props.OffsetX;
    if (networkSyncData.props.OffsetY !== undefined)
      this._behaviorData.OffsetY = networkSyncData.props.OffsetY;
    if (networkSyncData.props.Distance !== undefined)
      this._behaviorData.Distance = networkSyncData.props.Distance;
    if (networkSyncData.props.ElevationAngle !== undefined)
      this._behaviorData.ElevationAngle = networkSyncData.props.ElevationAngle;
    if (networkSyncData.props.TranslationZHalfwayDuration !== undefined)
      this._behaviorData.TranslationZHalfwayDuration = networkSyncData.props.TranslationZHalfwayDuration;
    if (networkSyncData.props.TranslationZLogSpeed !== undefined)
      this._behaviorData.TranslationZLogSpeed = networkSyncData.props.TranslationZLogSpeed;
  }

  // Properties:
  
  _getOffsetX() {
    return this._behaviorData.OffsetX !== undefined ? this._behaviorData.OffsetX : Number("0") || 0;
  }
  _setOffsetX(newValue) {
    this._behaviorData.OffsetX = newValue;
  }
  _getOffsetY() {
    return this._behaviorData.OffsetY !== undefined ? this._behaviorData.OffsetY : Number("-100") || 0;
  }
  _setOffsetY(newValue) {
    this._behaviorData.OffsetY = newValue;
  }
  _getDistance() {
    return this._behaviorData.Distance !== undefined ? this._behaviorData.Distance : Number("400") || 0;
  }
  _setDistance(newValue) {
    this._behaviorData.Distance = newValue;
  }
  _getElevationAngle() {
    return this._behaviorData.ElevationAngle !== undefined ? this._behaviorData.ElevationAngle : Number("20") || 0;
  }
  _setElevationAngle(newValue) {
    this._behaviorData.ElevationAngle = newValue;
  }
  _getTranslationZHalfwayDuration() {
    return this._behaviorData.TranslationZHalfwayDuration !== undefined ? this._behaviorData.TranslationZHalfwayDuration : Number("0.125") || 0;
  }
  _setTranslationZHalfwayDuration(newValue) {
    this._behaviorData.TranslationZHalfwayDuration = newValue;
  }
  _getTranslationZLogSpeed() {
    return this._behaviorData.TranslationZLogSpeed !== undefined ? this._behaviorData.TranslationZLogSpeed : Number("") || 0;
  }
  _setTranslationZLogSpeed(newValue) {
    this._behaviorData.TranslationZLogSpeed = newValue;
  }
}

/**
 * Shared data generated from Smooth camera on Z
 */
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.SharedData = class SmoothCameraZSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._LanePlatformer_SmoothCameraZSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._LanePlatformer_SmoothCameraZSharedData = new gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.SharedData(
      initialData
    );
  }
  return instanceContainer._LanePlatformer_SmoothCameraZSharedData;
}

// Methods:
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext = {};
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTranslationZLogSpeed(Math.log(0.5) / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTranslationZHalfwayDuration());
}
}}

}


};

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
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

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15603660);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1);
{gdjs.evtTools.camera.setCameraY(runtimeScene, (( gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1[0].getCenterYInScene()) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getOffsetY() + gdjs.evtTools.common.getYFromAngleAndDistance(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getElevationAngle() + 180, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDistance()), "", 0);
}{gdjs.scene3d.camera.setCameraZ(runtimeScene, (( gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getCenterZInScene()), "", 0);
}{gdjs.scene3d.camera.setCameraRotationY(runtimeScene, -(90), "", 0);
}{gdjs.scene3d.camera.setCameraRotationX(runtimeScene, -(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getElevationAngle()), "", 0);
}}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1);
{gdjs.scene3d.camera.setCameraZ(runtimeScene, (( gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getCenterZInScene()) + (gdjs.scene3d.camera.getCameraZ(runtimeScene, "", 0) - (( gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getCenterZInScene())) * Math.exp(gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) * eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTranslationZLogSpeed()), "", 0);
}{gdjs.evtTools.camera.setCameraX(runtimeScene, (( gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1[0].getCenterXInScene()) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getOffsetX() + gdjs.evtTools.common.getXFromAngleAndDistance(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getElevationAngle() + 180, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDistance()), "", 0);
}}

}


};

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
this._onceTriggers.startNewFrame();
var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
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

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;


return;
}


gdjs.registerBehavior("LanePlatformer::SmoothCameraZ", gdjs.evtsExt__LanePlatformer__SmoothCameraZ.SmoothCameraZ);
