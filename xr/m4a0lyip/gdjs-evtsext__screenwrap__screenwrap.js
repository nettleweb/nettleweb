
gdjs.evtsExt__ScreenWrap__ScreenWrap = gdjs.evtsExt__ScreenWrap__ScreenWrap || {};

/**
 * Behavior generated from Screen Wrap
 */
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap = class ScreenWrap extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.HorizontalWrapping = behaviorData.HorizontalWrapping !== undefined ? behaviorData.HorizontalWrapping : true;
    this._behaviorData.VerticalWrapping = behaviorData.VerticalWrapping !== undefined ? behaviorData.VerticalWrapping : true;
    this._behaviorData.BorderTop = behaviorData.BorderTop !== undefined ? behaviorData.BorderTop : Number("0") || 0;
    this._behaviorData.BorderLeft = behaviorData.BorderLeft !== undefined ? behaviorData.BorderLeft : Number("0") || 0;
    this._behaviorData.BorderRight = behaviorData.BorderRight !== undefined ? behaviorData.BorderRight : Number("0") || 0;
    this._behaviorData.BorderBottom = behaviorData.BorderBottom !== undefined ? behaviorData.BorderBottom : Number("0") || 0;
    this._behaviorData.TriggerOffset = behaviorData.TriggerOffset !== undefined ? behaviorData.TriggerOffset : Number("0") || 0;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.HorizontalWrapping !== newBehaviorData.HorizontalWrapping)
      this._behaviorData.HorizontalWrapping = newBehaviorData.HorizontalWrapping;
    if (oldBehaviorData.VerticalWrapping !== newBehaviorData.VerticalWrapping)
      this._behaviorData.VerticalWrapping = newBehaviorData.VerticalWrapping;
    if (oldBehaviorData.BorderTop !== newBehaviorData.BorderTop)
      this._behaviorData.BorderTop = newBehaviorData.BorderTop;
    if (oldBehaviorData.BorderLeft !== newBehaviorData.BorderLeft)
      this._behaviorData.BorderLeft = newBehaviorData.BorderLeft;
    if (oldBehaviorData.BorderRight !== newBehaviorData.BorderRight)
      this._behaviorData.BorderRight = newBehaviorData.BorderRight;
    if (oldBehaviorData.BorderBottom !== newBehaviorData.BorderBottom)
      this._behaviorData.BorderBottom = newBehaviorData.BorderBottom;
    if (oldBehaviorData.TriggerOffset !== newBehaviorData.TriggerOffset)
      this._behaviorData.TriggerOffset = newBehaviorData.TriggerOffset;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    HorizontalWrapping: this._behaviorData.HorizontalWrapping,
    VerticalWrapping: this._behaviorData.VerticalWrapping,
    BorderTop: this._behaviorData.BorderTop,
    BorderLeft: this._behaviorData.BorderLeft,
    BorderRight: this._behaviorData.BorderRight,
    BorderBottom: this._behaviorData.BorderBottom,
    TriggerOffset: this._behaviorData.TriggerOffset,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.HorizontalWrapping !== undefined)
      this._behaviorData.HorizontalWrapping = networkSyncData.props.HorizontalWrapping;
    if (networkSyncData.props.VerticalWrapping !== undefined)
      this._behaviorData.VerticalWrapping = networkSyncData.props.VerticalWrapping;
    if (networkSyncData.props.BorderTop !== undefined)
      this._behaviorData.BorderTop = networkSyncData.props.BorderTop;
    if (networkSyncData.props.BorderLeft !== undefined)
      this._behaviorData.BorderLeft = networkSyncData.props.BorderLeft;
    if (networkSyncData.props.BorderRight !== undefined)
      this._behaviorData.BorderRight = networkSyncData.props.BorderRight;
    if (networkSyncData.props.BorderBottom !== undefined)
      this._behaviorData.BorderBottom = networkSyncData.props.BorderBottom;
    if (networkSyncData.props.TriggerOffset !== undefined)
      this._behaviorData.TriggerOffset = networkSyncData.props.TriggerOffset;
  }

  // Properties:
  
  _getHorizontalWrapping() {
    return this._behaviorData.HorizontalWrapping !== undefined ? this._behaviorData.HorizontalWrapping : true;
  }
  _setHorizontalWrapping(newValue) {
    this._behaviorData.HorizontalWrapping = newValue;
  }
  _toggleHorizontalWrapping() {
    this._setHorizontalWrapping(!this._getHorizontalWrapping());
  }
  _getVerticalWrapping() {
    return this._behaviorData.VerticalWrapping !== undefined ? this._behaviorData.VerticalWrapping : true;
  }
  _setVerticalWrapping(newValue) {
    this._behaviorData.VerticalWrapping = newValue;
  }
  _toggleVerticalWrapping() {
    this._setVerticalWrapping(!this._getVerticalWrapping());
  }
  _getBorderTop() {
    return this._behaviorData.BorderTop !== undefined ? this._behaviorData.BorderTop : Number("0") || 0;
  }
  _setBorderTop(newValue) {
    this._behaviorData.BorderTop = newValue;
  }
  _getBorderLeft() {
    return this._behaviorData.BorderLeft !== undefined ? this._behaviorData.BorderLeft : Number("0") || 0;
  }
  _setBorderLeft(newValue) {
    this._behaviorData.BorderLeft = newValue;
  }
  _getBorderRight() {
    return this._behaviorData.BorderRight !== undefined ? this._behaviorData.BorderRight : Number("0") || 0;
  }
  _setBorderRight(newValue) {
    this._behaviorData.BorderRight = newValue;
  }
  _getBorderBottom() {
    return this._behaviorData.BorderBottom !== undefined ? this._behaviorData.BorderBottom : Number("0") || 0;
  }
  _setBorderBottom(newValue) {
    this._behaviorData.BorderBottom = newValue;
  }
  _getTriggerOffset() {
    return this._behaviorData.TriggerOffset !== undefined ? this._behaviorData.TriggerOffset : Number("0") || 0;
  }
  _setTriggerOffset(newValue) {
    this._behaviorData.TriggerOffset = newValue;
  }
}

/**
 * Shared data generated from Screen Wrap
 */
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.SharedData = class ScreenWrapSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._ScreenWrap_ScreenWrapSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._ScreenWrap_ScreenWrapSharedData = new gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.SharedData(
      initialData
    );
  }
  return instanceContainer._ScreenWrap_ScreenWrapSharedData;
}

// Methods:
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects3= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderBottom() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetBottomBorder(gdjs.evtTools.window.getGameResolutionHeight(runtimeScene), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderRight() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetRightBorder(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreated = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.onCreatedContext.GDObjectObjects3.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects4= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

};gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2, gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[i].getX() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderLeft() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[i].getWidth()) / 2) - eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[i].setX(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderRight() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3[i].getWidth()) / 2) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset());
}
}}

}


{

/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getX() > eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderRight() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getWidth()) / 2) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].setX(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderLeft() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getWidth()) / 2) - eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset());
}
}}

}


};gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1, gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getY() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderTop() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getHeight()) / 2) - eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].setY(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderBottom() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getHeight()) / 2) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset());
}
}}

}


{

/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i].getY() > eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderBottom() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i].getHeight()) / 2) + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i].setY(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderTop() - ((gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i].getHeight()) / 2) - eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset());
}
}}

}


};gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHorizontalWrapping() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getVerticalWrapping() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList2(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList3(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.eventsList4(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHorizontalWrapping()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = false; }}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHorizontalWrapping() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrapping = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsHorizontalWrappingContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getVerticalWrapping()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = false; }}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getVerticalWrapping() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[k] = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrapping = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.IsVerticalWrappingContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("EnableHorizontalWrapping") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHorizontalWrapping(false);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("EnableHorizontalWrapping") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHorizontalWrapping(true);
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrapping = function(EnableHorizontalWrapping, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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
if (argName === "EnableHorizontalWrapping") return EnableHorizontalWrapping;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableHorizontalWrappingContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("EnableVerticalWrapping") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setVerticalWrapping(false);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("EnableVerticalWrapping") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setVerticalWrapping(true);
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrapping = function(EnableVerticalWrapping, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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
if (argName === "EnableVerticalWrapping") return EnableVerticalWrapping;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.EnableVerticalWrappingContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderTop(); }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTop = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderTopContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderLeft(); }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeft = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderLeftContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderRight(); }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRight = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderRightContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBorderBottom(); }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottom = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.BorderBottomContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTriggerOffset(); }}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffset = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.TriggerOffsetContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBorderTop(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorder = function(Value, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTopBorderContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBorderLeft(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorder = function(Value, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetLeftBorderContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBorderBottom(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorder = function(Value, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetBottomBorderContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBorderRight(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorder = function(Value, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetRightBorderContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext = {};
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setTriggerOffset(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffset = function(Value, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ScreenWrap"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ScreenWrap"),
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

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.SetTriggerOffsetContext.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("ScreenWrap::ScreenWrap", gdjs.evtsExt__ScreenWrap__ScreenWrap.ScreenWrap);
