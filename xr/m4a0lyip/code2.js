gdjs.LeaderboardCode = {};
gdjs.LeaderboardCode.localVariables = [];
gdjs.LeaderboardCode.GDCoinObjects1= [];
gdjs.LeaderboardCode.GDCoinObjects2= [];
gdjs.LeaderboardCode.GDCoinObjects3= [];
gdjs.LeaderboardCode.GDLeaderboardDialogObjects1= [];
gdjs.LeaderboardCode.GDLeaderboardDialogObjects2= [];
gdjs.LeaderboardCode.GDLeaderboardDialogObjects3= [];


gdjs.LeaderboardCode.mapOfGDgdjs_9546LeaderboardCode_9546GDCoinObjects3Objects = Hashtable.newFrom({"Coin": gdjs.LeaderboardCode.GDCoinObjects3});
gdjs.LeaderboardCode.eventsList0 = function(runtimeScene) {

};gdjs.LeaderboardCode.eventsList1 = function(runtimeScene) {

{


const repeatCount3 = 100;
for (let repeatIndex3 = 0;repeatIndex3 < repeatCount3;++repeatIndex3) {
gdjs.LeaderboardCode.GDCoinObjects3.length = 0;


let isConditionTrue_0 = false;
if (true)
{
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.LeaderboardCode.mapOfGDgdjs_9546LeaderboardCode_9546GDCoinObjects3Objects, gdjs.randomInRange(gdjs.evtTools.camera.getCameraBorderLeft(runtimeScene, "", 0), gdjs.evtTools.camera.getCameraBorderRight(runtimeScene, "", 0)), gdjs.randomInRange(-(500) + gdjs.evtTools.camera.getCameraBorderTop(runtimeScene, "", 0), gdjs.evtTools.camera.getCameraBorderBottom(runtimeScene, "", 0) + 500), "3D");
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].returnVariable(gdjs.LeaderboardCode.GDCoinObjects3[i].getVariables().getFromIndex(0)).setNumber(gdjs.randomFloatInRange(20, 45));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].returnVariable(gdjs.LeaderboardCode.GDCoinObjects3[i].getVariables().getFromIndex(1)).setNumber(gdjs.randomFloatInRange(20, 45));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].returnVariable(gdjs.LeaderboardCode.GDCoinObjects3[i].getVariables().getFromIndex(2)).setNumber(gdjs.randomFloatInRange(20, 45));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].addForce(0, 200, 1);
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].getBehavior("Object3D").setZ(gdjs.randomFloatInRange(-(1000), -(32)));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].getBehavior("Object3D").setRotationX(gdjs.randomFloat(360));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects3.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects3[i].getBehavior("Object3D").setRotationY(gdjs.randomFloat(360));
}
}}
}

}


};gdjs.LeaderboardCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {

{ //Subevents
gdjs.LeaderboardCode.eventsList1(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Coin"), gdjs.LeaderboardCode.GDCoinObjects1);
{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects1[i].getBehavior("Object3D").setRotationX(gdjs.LeaderboardCode.GDCoinObjects1[i].getBehavior("Object3D").getRotationX() + (gdjs.LeaderboardCode.GDCoinObjects1[i].getVariables().getFromIndex(0).getAsNumber() * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects1[i].getBehavior("Object3D").setRotationY(gdjs.LeaderboardCode.GDCoinObjects1[i].getBehavior("Object3D").getRotationY() + (gdjs.LeaderboardCode.GDCoinObjects1[i].getVariables().getFromIndex(1).getAsNumber() * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDCoinObjects1[i].setAngle(gdjs.LeaderboardCode.GDCoinObjects1[i].getAngle() + (gdjs.LeaderboardCode.GDCoinObjects1[i].getVariables().getFromIndex(2).getAsNumber() * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}}

}


};gdjs.LeaderboardCode.eventsList3 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("LeaderboardDialog"), gdjs.LeaderboardCode.GDLeaderboardDialogObjects1);
{for(var i = 0, len = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i].SetScore(runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber(), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length ;i < len;++i) {
    gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i].SetDefaultPlayerName(runtimeScene.getGame().getVariables().getFromIndex(1).getAsString(), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("LeaderboardDialog"), gdjs.LeaderboardCode.GDLeaderboardDialogObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length;i<l;++i) {
    if ( gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i].IsRestartClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[k] = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i];
        ++k;
    }
}
gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("LeaderboardDialog"), gdjs.LeaderboardCode.GDLeaderboardDialogObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length;i<l;++i) {
    if ( gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i].IsScoreSubmitted((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[k] = gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[i];
        ++k;
    }
}
gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.LeaderboardCode.GDLeaderboardDialogObjects1 */
{runtimeScene.getGame().getVariables().getFromIndex(1).setString((( gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length === 0 ) ? "" :gdjs.LeaderboardCode.GDLeaderboardDialogObjects1[0].PlayerName((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))));
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


{


gdjs.LeaderboardCode.eventsList2(runtimeScene);
}


};

gdjs.LeaderboardCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.LeaderboardCode.GDCoinObjects1.length = 0;
gdjs.LeaderboardCode.GDCoinObjects2.length = 0;
gdjs.LeaderboardCode.GDCoinObjects3.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects2.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects3.length = 0;

gdjs.LeaderboardCode.eventsList3(runtimeScene);
gdjs.LeaderboardCode.GDCoinObjects1.length = 0;
gdjs.LeaderboardCode.GDCoinObjects2.length = 0;
gdjs.LeaderboardCode.GDCoinObjects3.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects1.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects2.length = 0;
gdjs.LeaderboardCode.GDLeaderboardDialogObjects3.length = 0;


return;

}

gdjs['LeaderboardCode'] = gdjs.LeaderboardCode;
