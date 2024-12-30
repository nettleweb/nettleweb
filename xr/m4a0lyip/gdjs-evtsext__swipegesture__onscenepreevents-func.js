
if (typeof gdjs.evtsExt__SwipeGesture__onScenePreEvents !== "undefined") {
  gdjs.evtsExt__SwipeGesture__onScenePreEvents.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__SwipeGesture__onScenePreEvents = {};


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("EndPointX").setNumber(gdjs.evtTools.input.getCursorX(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0));
}{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("EndPointY").setNumber(gdjs.evtTools.input.getCursorY(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0));
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.runtimeScene.pauseTimer(runtimeScene, "__SwipeGesture.TouchDuration");
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("SwipeInProgress"), false);
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("SwipeJustEnded"), true);
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList0(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList1(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtsExt__SwipeGesture__IsSwipeInProgress.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList2(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("EndPointX").setNumber(0);
}{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("EndPointY").setNumber(0);
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointX").setNumber(gdjs.evtTools.input.getCursorX(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0));
}{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointY").setNumber(gdjs.evtTools.input.getCursorY(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0));
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "__SwipeGesture.TouchDuration");
}{gdjs.evtTools.runtimeScene.unpauseTimer(runtimeScene, "__SwipeGesture.TouchDuration");
}{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("SwipeInProgress"), true);
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList7 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList4(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList5(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList6(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList8 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtsExt__SwipeGesture__IsSwipeDetectionEnabled.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(15724468);
}
}
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList7(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList9 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Distance").setNumber(gdjs.evtTools.common.distanceBetweenPositions(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointX")), gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointY")), gdjs.evtTools.input.getCursorX(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0), gdjs.evtTools.input.getCursorY(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0)));
}}

}


{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("DistanceX").setNumber(Math.abs(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointX")) - gdjs.evtTools.input.getCursorX(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0)));
}}

}


{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("DistanceY").setNumber(Math.abs(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointY")) - gdjs.evtTools.input.getCursorY(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0)));
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList10 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Angle").setNumber(gdjs.evtTools.common.angleBetweenPositions(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointX")), gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("StartPointY")), gdjs.evtTools.input.getCursorX(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0), gdjs.evtTools.input.getCursorY(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("Layer")), 0)));
}}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList11 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList9(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList10(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList12 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtsExt__SwipeGesture__IsSwipeInProgress.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList11(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList13 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getScene().getVariables().get("__SwipeGesture").getChild("SwipeJustEnded"), false);
}}

}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList3(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList8(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList12(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__SwipeGesture__onScenePreEvents.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("SwipeGesture"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("SwipeGesture"),
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


gdjs.evtsExt__SwipeGesture__onScenePreEvents.eventsList13(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__SwipeGesture__onScenePreEvents.registeredGdjsCallbacks = [];
gdjs.evtsExt__SwipeGesture__onScenePreEvents.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__SwipeGesture__onScenePreEvents.func(runtimeScene, runtimeScene);
})
gdjs.registerRuntimeScenePreEventsCallback(gdjs.evtsExt__SwipeGesture__onScenePreEvents.registeredGdjsCallbacks[gdjs.evtsExt__SwipeGesture__onScenePreEvents.registeredGdjsCallbacks.length - 1]);
