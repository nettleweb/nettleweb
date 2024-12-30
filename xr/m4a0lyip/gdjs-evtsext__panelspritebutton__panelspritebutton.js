
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton || {};

/**
 * Object generated from Button (panel sprite)
 */
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton = class PanelSpriteButton extends gdjs.CustomRuntimeObject2D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.PressedLabelOffsetY = objectData.content.PressedLabelOffsetY !== undefined ? objectData.content.PressedLabelOffsetY : Number("0") || 0;
    this._objectData.LeftPadding = objectData.content.LeftPadding !== undefined ? objectData.content.LeftPadding : Number("0") || 0;
    this._objectData.RightPadding = objectData.content.RightPadding !== undefined ? objectData.content.RightPadding : Number("0") || 0;
    this._objectData.TopPadding = objectData.content.TopPadding !== undefined ? objectData.content.TopPadding : Number("0") || 0;
    this._objectData.BottomPadding = objectData.content.BottomPadding !== undefined ? objectData.content.BottomPadding : Number("0") || 0;
    this._objectData.HoveredFadeOutDuration = objectData.content.HoveredFadeOutDuration !== undefined ? objectData.content.HoveredFadeOutDuration : Number("0.25") || 0;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.PressedLabelOffsetY !== newObjectData.content.PressedLabelOffsetY)
      this._objectData.PressedLabelOffsetY = newObjectData.content.PressedLabelOffsetY;
    if (oldObjectData.content.LeftPadding !== newObjectData.content.LeftPadding)
      this._objectData.LeftPadding = newObjectData.content.LeftPadding;
    if (oldObjectData.content.RightPadding !== newObjectData.content.RightPadding)
      this._objectData.RightPadding = newObjectData.content.RightPadding;
    if (oldObjectData.content.TopPadding !== newObjectData.content.TopPadding)
      this._objectData.TopPadding = newObjectData.content.TopPadding;
    if (oldObjectData.content.BottomPadding !== newObjectData.content.BottomPadding)
      this._objectData.BottomPadding = newObjectData.content.BottomPadding;
    if (oldObjectData.content.HoveredFadeOutDuration !== newObjectData.content.HoveredFadeOutDuration)
      this._objectData.HoveredFadeOutDuration = newObjectData.content.HoveredFadeOutDuration;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getPressedLabelOffsetY() {
    return this._objectData.PressedLabelOffsetY !== undefined ? this._objectData.PressedLabelOffsetY : Number("0") || 0;
  }
  _setPressedLabelOffsetY(newValue) {
    this._objectData.PressedLabelOffsetY = newValue;
  }
  _getLeftPadding() {
    return this._objectData.LeftPadding !== undefined ? this._objectData.LeftPadding : Number("0") || 0;
  }
  _setLeftPadding(newValue) {
    this._objectData.LeftPadding = newValue;
  }
  _getRightPadding() {
    return this._objectData.RightPadding !== undefined ? this._objectData.RightPadding : Number("0") || 0;
  }
  _setRightPadding(newValue) {
    this._objectData.RightPadding = newValue;
  }
  _getTopPadding() {
    return this._objectData.TopPadding !== undefined ? this._objectData.TopPadding : Number("0") || 0;
  }
  _setTopPadding(newValue) {
    this._objectData.TopPadding = newValue;
  }
  _getBottomPadding() {
    return this._objectData.BottomPadding !== undefined ? this._objectData.BottomPadding : Number("0") || 0;
  }
  _setBottomPadding(newValue) {
    this._objectData.BottomPadding = newValue;
  }
  _getHoveredFadeOutDuration() {
    return this._objectData.HoveredFadeOutDuration !== undefined ? this._objectData.HoveredFadeOutDuration : Number("0.25") || 0;
  }
  _setHoveredFadeOutDuration(newValue) {
    this._objectData.HoveredFadeOutDuration = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDIdleObjects1Objects = Hashtable.newFrom({"Idle": gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects1});
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDHoveredObjects1Objects = Hashtable.newFrom({"Hovered": gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1});
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDPressedObjects1Objects = Hashtable.newFrom({"Pressed": gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1});
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDLabelObjects1Objects = Hashtable.newFrom({"Label": gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1});
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects1.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDIdleObjects1Objects, 0, 0, "");
}{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDHoveredObjects1Objects, 0, 0, "");
}{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDPressedObjects1Objects, 0, 0, "");
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1[i].setZOrder(1);
}
}}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteButton_9595_9595PanelSpriteButton_9546PanelSpriteButton_9546prototype_9546onCreatedContext_9546GDLabelObjects1Objects, 0, 0, "");
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1[i].setZOrder(2);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1[i].setWrapping(true);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1[i].CenterLabel((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onCreatedContext.GDPressedObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1[i].CenterLabel((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloading = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.onHotReloadingContext.GDPressedObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final = [];

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final = [];

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final = [];

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects4= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects3= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects4= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects3= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects4= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects4= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects3= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects4= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3);
gdjs.copyArray(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2, gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3[i].isVisible() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3[i]._getHoveredFadeOutDuration() > 0 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3 */
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween("Fadeout", 0, "linear", (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3[0]._getHoveredFadeOutDuration()) * 1000, false);
}
}}

}


{

/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i]._getHoveredFadeOutDuration() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].hide();
}
}}

}


};gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i].IsIdle((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15675860);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[i].setCenterYInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0].CenterWithPaddingY((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[i].hide(false);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2[i].hide();
}
}
{ //Subevents
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].getOpacity() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].setOpacity(255);
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i].IsHovered((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15681036);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[i].setCenterYInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0].CenterWithPaddingY((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].hide(false);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).removeTween("Fadeout");
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].setOpacity(255);
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i].IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15683140);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[i].setCenterYInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0].CenterWithPaddingY((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))) + (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0]._getPressedLabelOffsetY()));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2[i].hide(false);
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[i].IsFocused((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15684876);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1[i].setCenterYInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[0].CenterWithPaddingY((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1[i].hide();
}
}}

}


};gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2);
{isConditionTrue_1 = ((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0].getWidth()) != Math.max((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[0].getAABBRight()), (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[0].getAABBRight())) - Math.min((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[0].getAABBLeft()), (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[0].getAABBLeft())));
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[j]);
    }
}
}
{
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2);
{isConditionTrue_1 = ((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[0].getHeight()) != Math.max((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[0].getAABBBottom()), (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[0].getAABBBottom())) - Math.min((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[0].getAABBTop()), (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[0].getAABBTop())));
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2[j]);
    }
    for (let j = 0, jLen = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final.indexOf(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[j]) === -1 )
            gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final.push(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2[j]);
    }
}
}
{
gdjs.copyArray(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1_1final, gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1);
gdjs.copyArray(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1_1final, gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1);
gdjs.copyArray(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1_1final, gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1 */
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].returnVariable(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].getVariables().get("Width")).setNumber((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[0].getWidth()));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].returnVariable(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].getVariables().get("Height")).setNumber((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[0].getHeight()));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[i].setScale(1);
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].setWidth((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].getVariables().get("Width"))));
}
for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1[i].setWidth((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[0].getVariables()).get("Width"))));
}
for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1[i].setWidth((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[0].getVariables()).get("Width"))));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].setHeight((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[i].getVariables().get("Height"))));
}
for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1[i].setHeight((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[0].getVariables()).get("Height"))));
}
for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1[i].setHeight((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1[0].getVariables()).get("Height"))));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1[i].CenterLabel((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList1(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList2(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects4.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.eventsList3(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDLabelObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDIdleObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDHoveredObjects4.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects3.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPostEventsContext.GDPressedObjects4.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM")).IsIdle((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdle = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsIdleContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM")).IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClicked = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsClickedContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM")).IsHovered((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHovered = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsHoveredContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM")).IsFocused((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocused = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsFocusedContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM")).IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressed = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsPressedContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1[i].setString(eventsFunctionContext.getArgument("LabelText"));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1[i].CenterLabel((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelText = function(LabelText, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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
if (argName === "LabelText") return LabelText;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.SetLabelTextContext.GDPressedObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1.length === 0 ) ? "" :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1[0].getString()); }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelText = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.LabelTextContext.GDPressedObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1[0].getCenterYInScene()) + ((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1[0]._getTopPadding()) - (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1[0]._getBottomPadding())) / 2; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingY = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterWithPaddingYContext.GDPressedObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Hovered"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1 */
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1 */
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Pressed"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].setCenterXInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1.length === 0 ) ? (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1.length === 0 ) ? (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1[0].getCenterXInScene()) :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1[0].getCenterXInScene()) :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1[0].getCenterXInScene()) + ((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getLeftPadding()) - (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getRightPadding())) / 2);
}
}}

}


};gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].setPosition((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getLeftPadding()),(( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getTopPadding()));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].setWrappingWidth((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1[0].getWidth()) - (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getLeftPadding()) - (( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getRightPadding()));
}
}{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].setCenterYInScene((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0].CenterWithPaddingY((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}
}
{ //Subevents
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[i].IsPressed((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].setY(gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1[i].getY() + ((( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1[0]._getPressedLabelOffsetY())));
}
}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabel = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.CenterLabelContext.GDPressedObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("ShouldActivate") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1[i].activateBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM"), true);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("ShouldActivate") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1[i].activateBehavior(eventsFunctionContext.getBehaviorName("ButtonFSM"), false);
}
}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.Activate = function(ShouldActivate, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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
if (argName === "ShouldActivate") return ShouldActivate;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.ActivateContext.GDPressedObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext = {};
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects2= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects1= [];
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects2= [];


gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Idle"), gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1[i].behaviorActivated(eventsFunctionContext.getBehaviorName("ButtonFSM")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1[k] = gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDIdleObjectsList = [...runtimeScene.getObjects("Idle")];
var GDIdleObjects = Hashtable.newFrom({"Idle": thisGDIdleObjectsList});
var thisGDHoveredObjectsList = [...runtimeScene.getObjects("Hovered")];
var GDHoveredObjects = Hashtable.newFrom({"Hovered": thisGDHoveredObjectsList});
var thisGDPressedObjectsList = [...runtimeScene.getObjects("Pressed")];
var GDPressedObjects = Hashtable.newFrom({"Pressed": thisGDPressedObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "Idle": GDIdleObjects
, "Hovered": GDHoveredObjects
, "Pressed": GDPressedObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "Idle": thisGDIdleObjectsList
, "Hovered": thisGDHoveredObjectsList
, "Pressed": thisGDPressedObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteButton"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteButton"),
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

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects2.length = 0;

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDIdleObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDHoveredObjects2.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects1.length = 0;
gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.IsActivatedContext.GDPressedObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("PanelSpriteButton::PanelSpriteButton", gdjs.evtsExt__PanelSpriteButton__PanelSpriteButton.PanelSpriteButton);
