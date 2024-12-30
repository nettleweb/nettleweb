
gdjs.evtsExt__LanePlatformer__LaneCharacter = gdjs.evtsExt__LanePlatformer__LaneCharacter || {};

/**
 * Behavior generated from Lane platformer character
 */
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter = class LaneCharacter extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Tween = behaviorData.Tween !== undefined ? behaviorData.Tween : "";
    this._behaviorData.LaneDepth = behaviorData.LaneDepth !== undefined ? behaviorData.LaneDepth : Number("160") || 0;
    this._behaviorData.Lane = Number("1") || 0;
    this._behaviorData.TargetedLane = Number("1") || 0;
    this._behaviorData.HasChangedOfLane = false;
    this._behaviorData.LaneMin = behaviorData.LaneMin !== undefined ? behaviorData.LaneMin : Number("0") || 0;
    this._behaviorData.LaneMax = behaviorData.LaneMax !== undefined ? behaviorData.LaneMax : Number("2") || 0;
    this._behaviorData.LaneChangeDuration = behaviorData.LaneChangeDuration !== undefined ? behaviorData.LaneChangeDuration : Number("0.3") || 0;
    this._behaviorData.HasJustBeenCreated = true;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Tween !== newBehaviorData.Tween)
      this._behaviorData.Tween = newBehaviorData.Tween;
    if (oldBehaviorData.LaneDepth !== newBehaviorData.LaneDepth)
      this._behaviorData.LaneDepth = newBehaviorData.LaneDepth;
    if (oldBehaviorData.Lane !== newBehaviorData.Lane)
      this._behaviorData.Lane = newBehaviorData.Lane;
    if (oldBehaviorData.TargetedLane !== newBehaviorData.TargetedLane)
      this._behaviorData.TargetedLane = newBehaviorData.TargetedLane;
    if (oldBehaviorData.HasChangedOfLane !== newBehaviorData.HasChangedOfLane)
      this._behaviorData.HasChangedOfLane = newBehaviorData.HasChangedOfLane;
    if (oldBehaviorData.LaneMin !== newBehaviorData.LaneMin)
      this._behaviorData.LaneMin = newBehaviorData.LaneMin;
    if (oldBehaviorData.LaneMax !== newBehaviorData.LaneMax)
      this._behaviorData.LaneMax = newBehaviorData.LaneMax;
    if (oldBehaviorData.LaneChangeDuration !== newBehaviorData.LaneChangeDuration)
      this._behaviorData.LaneChangeDuration = newBehaviorData.LaneChangeDuration;
    if (oldBehaviorData.HasJustBeenCreated !== newBehaviorData.HasJustBeenCreated)
      this._behaviorData.HasJustBeenCreated = newBehaviorData.HasJustBeenCreated;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    Tween: this._behaviorData.Tween,
    LaneDepth: this._behaviorData.LaneDepth,
    Lane: this._behaviorData.Lane,
    TargetedLane: this._behaviorData.TargetedLane,
    HasChangedOfLane: this._behaviorData.HasChangedOfLane,
    LaneMin: this._behaviorData.LaneMin,
    LaneMax: this._behaviorData.LaneMax,
    LaneChangeDuration: this._behaviorData.LaneChangeDuration,
    HasJustBeenCreated: this._behaviorData.HasJustBeenCreated,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.Tween !== undefined)
      this._behaviorData.Tween = networkSyncData.props.Tween;
    if (networkSyncData.props.LaneDepth !== undefined)
      this._behaviorData.LaneDepth = networkSyncData.props.LaneDepth;
    if (networkSyncData.props.Lane !== undefined)
      this._behaviorData.Lane = networkSyncData.props.Lane;
    if (networkSyncData.props.TargetedLane !== undefined)
      this._behaviorData.TargetedLane = networkSyncData.props.TargetedLane;
    if (networkSyncData.props.HasChangedOfLane !== undefined)
      this._behaviorData.HasChangedOfLane = networkSyncData.props.HasChangedOfLane;
    if (networkSyncData.props.LaneMin !== undefined)
      this._behaviorData.LaneMin = networkSyncData.props.LaneMin;
    if (networkSyncData.props.LaneMax !== undefined)
      this._behaviorData.LaneMax = networkSyncData.props.LaneMax;
    if (networkSyncData.props.LaneChangeDuration !== undefined)
      this._behaviorData.LaneChangeDuration = networkSyncData.props.LaneChangeDuration;
    if (networkSyncData.props.HasJustBeenCreated !== undefined)
      this._behaviorData.HasJustBeenCreated = networkSyncData.props.HasJustBeenCreated;
  }

  // Properties:
  
  _getTween() {
    return this._behaviorData.Tween !== undefined ? this._behaviorData.Tween : "";
  }
  _setTween(newValue) {
    this._behaviorData.Tween = newValue;
  }
  _getLaneDepth() {
    return this._behaviorData.LaneDepth !== undefined ? this._behaviorData.LaneDepth : Number("160") || 0;
  }
  _setLaneDepth(newValue) {
    this._behaviorData.LaneDepth = newValue;
  }
  _getLane() {
    return this._behaviorData.Lane !== undefined ? this._behaviorData.Lane : Number("1") || 0;
  }
  _setLane(newValue) {
    this._behaviorData.Lane = newValue;
  }
  _getTargetedLane() {
    return this._behaviorData.TargetedLane !== undefined ? this._behaviorData.TargetedLane : Number("1") || 0;
  }
  _setTargetedLane(newValue) {
    this._behaviorData.TargetedLane = newValue;
  }
  _getHasChangedOfLane() {
    return this._behaviorData.HasChangedOfLane !== undefined ? this._behaviorData.HasChangedOfLane : false;
  }
  _setHasChangedOfLane(newValue) {
    this._behaviorData.HasChangedOfLane = newValue;
  }
  _toggleHasChangedOfLane() {
    this._setHasChangedOfLane(!this._getHasChangedOfLane());
  }
  _getLaneMin() {
    return this._behaviorData.LaneMin !== undefined ? this._behaviorData.LaneMin : Number("0") || 0;
  }
  _setLaneMin(newValue) {
    this._behaviorData.LaneMin = newValue;
  }
  _getLaneMax() {
    return this._behaviorData.LaneMax !== undefined ? this._behaviorData.LaneMax : Number("2") || 0;
  }
  _setLaneMax(newValue) {
    this._behaviorData.LaneMax = newValue;
  }
  _getLaneChangeDuration() {
    return this._behaviorData.LaneChangeDuration !== undefined ? this._behaviorData.LaneChangeDuration : Number("0.3") || 0;
  }
  _setLaneChangeDuration(newValue) {
    this._behaviorData.LaneChangeDuration = newValue;
  }
  _getHasJustBeenCreated() {
    return this._behaviorData.HasJustBeenCreated !== undefined ? this._behaviorData.HasJustBeenCreated : true;
  }
  _setHasJustBeenCreated(newValue) {
    this._behaviorData.HasJustBeenCreated = newValue;
  }
  _toggleHasJustBeenCreated() {
    this._setHasJustBeenCreated(!this._getHasJustBeenCreated());
  }
}

/**
 * Shared data generated from Lane platformer character
 */
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.SharedData = class LaneCharacterSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._LanePlatformer_LaneCharacterSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._LanePlatformer_LaneCharacterSharedData = new gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.SharedData(
      initialData
    );
  }
  return instanceContainer._LanePlatformer_LaneCharacterSharedData;
}

// Methods:
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasJustBeenCreated() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasJustBeenCreated(false);
}
}{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLane((gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).LaneOf((gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getCenterZInScene()), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTargetedLane(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane());
}
}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects3= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() == eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1, gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2);

{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).setAnimationName("Run");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1, gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2);

{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).setAnimationName("RunRight");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() > eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).setAnimationName("RunLeft");
}
}}

}


};gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateLane((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() != eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).exists("Move")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName("Object3D"), "Move", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane() * eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLaneDepth(), "linear", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLaneChangeDuration(), false);
}
}}

}


{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( (gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).getAnimationName()).startsWith("Run") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedOfLane(false);
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() != eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).hasFinished("Move") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLane(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
}{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).removeTween("Move");
}
}{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedOfLane(true);
}
}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLane = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.UpdateLaneContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachIndex2 = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachObjects2 = [];

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachTemporary2 = null;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachTotalCount2 = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects2= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects4= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects4= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.mapOfGDgdjs_9546evtsExt_9595_9595LanePlatformer_9595_9595LaneCharacter_9546LaneCharacter_9546prototype_9546EnablePlatformOnLaneContext_9546GDOtherObjectObjects3Objects = Hashtable.newFrom({"OtherObject": gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3});
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3);
gdjs.copyArray(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2, gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).IsObjectOnSameLane(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.mapOfGDgdjs_9546evtsExt_9595_9595LanePlatformer_9595_9595LaneCharacter_9546LaneCharacter_9546prototype_9546EnablePlatformOnLaneContext_9546GDOtherObjectObjects3Objects, eventsFunctionContext.getBehaviorName("Object3D"), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3 */
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3[i].activateBehavior(eventsFunctionContext.getBehaviorName("Platform"), true);
}
}}

}


};gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("OtherObject"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1);

for (gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachIndex2 = 0;gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachIndex2 < gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1.length;++gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachIndex2) {
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2.length = 0;


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachTemporary2 = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1[gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachIndex2];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2.push(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2[i].activateBehavior(eventsFunctionContext.getBehaviorName("Platform"), false);
}
}
{ //Subevents: 
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLane = function(OtherObject, Object3D, Platform, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "OtherObject": OtherObject
},
  _objectArraysMap: {
"Object": thisObjectList
, "OtherObject": gdjs.objectsListsToArray(OtherObject)
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Tween": this._getTween()
, "Object3D": Object3D
, "Platform": Platform
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects4.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects3.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.EnablePlatformOnLaneContext.GDOtherObjectObjects4.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects2= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("OtherObject"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).LaneOf((( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getCenterZInScene()), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) == eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLane = function(OtherObject, Object3D, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "OtherObject": OtherObject
},
  _objectArraysMap: {
"Object": thisObjectList
, "OtherObject": gdjs.objectsListsToArray(OtherObject)
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Tween": this._getTween()
, "Object3D": Object3D
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.IsObjectOnSameLaneContext.GDOtherObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = Math.round(eventsFunctionContext.getArgument("CenterZ") / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLaneDepth()); }}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOf = function(CenterZ, parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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
if (argName === "CenterZ") return CenterZ;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneOfContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane(); }}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.Lane = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.LaneContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLane(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLane = function(Value, parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.SetLaneContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateLane((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() == eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() > eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLaneMin());
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTargetedLane(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane() - (1));
}
}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeft = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveLeftContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateLane((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() == eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLane() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLaneMax());
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTargetedLane(gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTargetedLane() + (1));
}
}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRight = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.MoveRightContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext = {};
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1= [];
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects2= [];


gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasChangedOfLane() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1[k] = gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLane = function(parentEventsFunctionContext) {

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
, "Tween": this._getTween()
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

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter.prototype.HasChangedOfLaneContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}


gdjs.registerBehavior("LanePlatformer::LaneCharacter", gdjs.evtsExt__LanePlatformer__LaneCharacter.LaneCharacter);
