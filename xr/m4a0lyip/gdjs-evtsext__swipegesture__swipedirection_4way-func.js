
if (typeof gdjs.evtsExt__SwipeGesture__SwipeDirection_4way !== "undefined") {
  gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__SwipeGesture__SwipeDirection_4way = {};


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) >= -(135));
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) < -(45));
}
}
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("Direction") : "") == "Up");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) >= 45);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) < 135);
}
}
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("Direction") : "") == "Down");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList2(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
{isConditionTrue_2 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) >= -(180));
}
if (isConditionTrue_2) {
isConditionTrue_2 = false;
{isConditionTrue_2 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) < -(135));
}
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
{isConditionTrue_2 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) >= 135);
}
if (isConditionTrue_2) {
isConditionTrue_2 = false;
{isConditionTrue_2 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) < 180);
}
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("Direction") : "") == "Left");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList4(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) >= -(45));
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtsExt__SwipeGesture__Angle.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) < 45);
}
}
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList7 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("Direction") : "") == "Right");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList6(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList8 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList1(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList3(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList5(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList7(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList9 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList8(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList10 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtsExt__SwipeGesture__Distance.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) > 0;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList9(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.func = function(runtimeScene, Direction, parentEventsFunctionContext) {
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
if (argName === "Direction") return Direction;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.eventsList10(runtimeScene, eventsFunctionContext);


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__SwipeGesture__SwipeDirection_4way.registeredGdjsCallbacks = [];