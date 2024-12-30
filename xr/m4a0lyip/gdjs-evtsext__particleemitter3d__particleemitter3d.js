
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D || {};

/**
 * Object generated from 3D particle emitter
 */
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D = class ParticleEmitter3D extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.StartColor = objectData.content.StartColor !== undefined ? objectData.content.StartColor : "255;0;0";
    this._objectData.EndColor = objectData.content.EndColor !== undefined ? objectData.content.EndColor : "255;255;0";
    this._objectData.StartOpacity = objectData.content.StartOpacity !== undefined ? objectData.content.StartOpacity : Number("255") || 0;
    this._objectData.EndOpacity = objectData.content.EndOpacity !== undefined ? objectData.content.EndOpacity : Number("0") || 0;
    this._objectData.Flow = objectData.content.Flow !== undefined ? objectData.content.Flow : Number("50") || 0;
    this._objectData.StartSizeMin = objectData.content.StartSizeMin !== undefined ? objectData.content.StartSizeMin : Number("10") || 0;
    this._objectData.StartSizeMax = objectData.content.StartSizeMax !== undefined ? objectData.content.StartSizeMax : Number("20") || 0;
    this._objectData.EndScale = objectData.content.EndScale !== undefined ? objectData.content.EndScale : Number("0") || 0;
    this._objectData.StartSpeedMin = objectData.content.StartSpeedMin !== undefined ? objectData.content.StartSpeedMin : Number("100") || 0;
    this._objectData.StartSpeedMax = objectData.content.StartSpeedMax !== undefined ? objectData.content.StartSpeedMax : Number("100") || 0;
    this._objectData.LifespanMin = objectData.content.LifespanMin !== undefined ? objectData.content.LifespanMin : Number("1") || 0;
    this._objectData.LifespanMax = objectData.content.LifespanMax !== undefined ? objectData.content.LifespanMax : Number("2") || 0;
    this._objectData.Duration = objectData.content.Duration !== undefined ? objectData.content.Duration : Number("5") || 0;
    this._objectData.AreParticlesRelative = objectData.content.AreParticlesRelative !== undefined ? objectData.content.AreParticlesRelative : false;
    this._objectData.SpayConeAngle = objectData.content.SpayConeAngle !== undefined ? objectData.content.SpayConeAngle : Number("30") || 0;
    this._objectData.Blending = objectData.content.Blending !== undefined ? objectData.content.Blending : "Additive";
    this._objectData.GravityTop = objectData.content.GravityTop !== undefined ? objectData.content.GravityTop : "Y-";
    this._objectData.Gravity = objectData.content.Gravity !== undefined ? objectData.content.Gravity : Number("0") || 0;
    this._objectData.ShouldAutodestruct = objectData.content.ShouldAutodestruct !== undefined ? objectData.content.ShouldAutodestruct : true;
    this._objectData.ParentOrigin = "Center-center";
    this._objectData.Z = Number("0") || 0;
    this._objectData.RotationX = Number("0") || 0;
    this._objectData.RotationY = Number("0") || 0;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.StartColor !== newObjectData.content.StartColor)
      this._objectData.StartColor = newObjectData.content.StartColor;
    if (oldObjectData.content.EndColor !== newObjectData.content.EndColor)
      this._objectData.EndColor = newObjectData.content.EndColor;
    if (oldObjectData.content.StartOpacity !== newObjectData.content.StartOpacity)
      this._objectData.StartOpacity = newObjectData.content.StartOpacity;
    if (oldObjectData.content.EndOpacity !== newObjectData.content.EndOpacity)
      this._objectData.EndOpacity = newObjectData.content.EndOpacity;
    if (oldObjectData.content.Flow !== newObjectData.content.Flow)
      this._objectData.Flow = newObjectData.content.Flow;
    if (oldObjectData.content.StartSizeMin !== newObjectData.content.StartSizeMin)
      this._objectData.StartSizeMin = newObjectData.content.StartSizeMin;
    if (oldObjectData.content.StartSizeMax !== newObjectData.content.StartSizeMax)
      this._objectData.StartSizeMax = newObjectData.content.StartSizeMax;
    if (oldObjectData.content.EndScale !== newObjectData.content.EndScale)
      this._objectData.EndScale = newObjectData.content.EndScale;
    if (oldObjectData.content.StartSpeedMin !== newObjectData.content.StartSpeedMin)
      this._objectData.StartSpeedMin = newObjectData.content.StartSpeedMin;
    if (oldObjectData.content.StartSpeedMax !== newObjectData.content.StartSpeedMax)
      this._objectData.StartSpeedMax = newObjectData.content.StartSpeedMax;
    if (oldObjectData.content.LifespanMin !== newObjectData.content.LifespanMin)
      this._objectData.LifespanMin = newObjectData.content.LifespanMin;
    if (oldObjectData.content.LifespanMax !== newObjectData.content.LifespanMax)
      this._objectData.LifespanMax = newObjectData.content.LifespanMax;
    if (oldObjectData.content.Duration !== newObjectData.content.Duration)
      this._objectData.Duration = newObjectData.content.Duration;
    if (oldObjectData.content.AreParticlesRelative !== newObjectData.content.AreParticlesRelative)
      this._objectData.AreParticlesRelative = newObjectData.content.AreParticlesRelative;
    if (oldObjectData.content.SpayConeAngle !== newObjectData.content.SpayConeAngle)
      this._objectData.SpayConeAngle = newObjectData.content.SpayConeAngle;
    if (oldObjectData.content.Blending !== newObjectData.content.Blending)
      this._objectData.Blending = newObjectData.content.Blending;
    if (oldObjectData.content.GravityTop !== newObjectData.content.GravityTop)
      this._objectData.GravityTop = newObjectData.content.GravityTop;
    if (oldObjectData.content.Gravity !== newObjectData.content.Gravity)
      this._objectData.Gravity = newObjectData.content.Gravity;
    if (oldObjectData.content.ShouldAutodestruct !== newObjectData.content.ShouldAutodestruct)
      this._objectData.ShouldAutodestruct = newObjectData.content.ShouldAutodestruct;
    if (oldObjectData.content.ParentOrigin !== newObjectData.content.ParentOrigin)
      this._objectData.ParentOrigin = newObjectData.content.ParentOrigin;
    if (oldObjectData.content.Z !== newObjectData.content.Z)
      this._objectData.Z = newObjectData.content.Z;
    if (oldObjectData.content.RotationX !== newObjectData.content.RotationX)
      this._objectData.RotationX = newObjectData.content.RotationX;
    if (oldObjectData.content.RotationY !== newObjectData.content.RotationY)
      this._objectData.RotationY = newObjectData.content.RotationY;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getStartColor() {
    return this._objectData.StartColor !== undefined ? this._objectData.StartColor : "255;0;0";
  }
  _setStartColor(newValue) {
    this._objectData.StartColor = newValue;
  }
  _getEndColor() {
    return this._objectData.EndColor !== undefined ? this._objectData.EndColor : "255;255;0";
  }
  _setEndColor(newValue) {
    this._objectData.EndColor = newValue;
  }
  _getStartOpacity() {
    return this._objectData.StartOpacity !== undefined ? this._objectData.StartOpacity : Number("255") || 0;
  }
  _setStartOpacity(newValue) {
    this._objectData.StartOpacity = newValue;
  }
  _getEndOpacity() {
    return this._objectData.EndOpacity !== undefined ? this._objectData.EndOpacity : Number("0") || 0;
  }
  _setEndOpacity(newValue) {
    this._objectData.EndOpacity = newValue;
  }
  _getFlow() {
    return this._objectData.Flow !== undefined ? this._objectData.Flow : Number("50") || 0;
  }
  _setFlow(newValue) {
    this._objectData.Flow = newValue;
  }
  _getStartSizeMin() {
    return this._objectData.StartSizeMin !== undefined ? this._objectData.StartSizeMin : Number("10") || 0;
  }
  _setStartSizeMin(newValue) {
    this._objectData.StartSizeMin = newValue;
  }
  _getStartSizeMax() {
    return this._objectData.StartSizeMax !== undefined ? this._objectData.StartSizeMax : Number("20") || 0;
  }
  _setStartSizeMax(newValue) {
    this._objectData.StartSizeMax = newValue;
  }
  _getEndScale() {
    return this._objectData.EndScale !== undefined ? this._objectData.EndScale : Number("0") || 0;
  }
  _setEndScale(newValue) {
    this._objectData.EndScale = newValue;
  }
  _getStartSpeedMin() {
    return this._objectData.StartSpeedMin !== undefined ? this._objectData.StartSpeedMin : Number("100") || 0;
  }
  _setStartSpeedMin(newValue) {
    this._objectData.StartSpeedMin = newValue;
  }
  _getStartSpeedMax() {
    return this._objectData.StartSpeedMax !== undefined ? this._objectData.StartSpeedMax : Number("100") || 0;
  }
  _setStartSpeedMax(newValue) {
    this._objectData.StartSpeedMax = newValue;
  }
  _getLifespanMin() {
    return this._objectData.LifespanMin !== undefined ? this._objectData.LifespanMin : Number("1") || 0;
  }
  _setLifespanMin(newValue) {
    this._objectData.LifespanMin = newValue;
  }
  _getLifespanMax() {
    return this._objectData.LifespanMax !== undefined ? this._objectData.LifespanMax : Number("2") || 0;
  }
  _setLifespanMax(newValue) {
    this._objectData.LifespanMax = newValue;
  }
  _getDuration() {
    return this._objectData.Duration !== undefined ? this._objectData.Duration : Number("5") || 0;
  }
  _setDuration(newValue) {
    this._objectData.Duration = newValue;
  }
  _getAreParticlesRelative() {
    return this._objectData.AreParticlesRelative !== undefined ? this._objectData.AreParticlesRelative : false;
  }
  _setAreParticlesRelative(newValue) {
    this._objectData.AreParticlesRelative = newValue;
  }
  _toggleAreParticlesRelative() {
    this._setAreParticlesRelative(!this._getAreParticlesRelative());
  }
  _getSpayConeAngle() {
    return this._objectData.SpayConeAngle !== undefined ? this._objectData.SpayConeAngle : Number("30") || 0;
  }
  _setSpayConeAngle(newValue) {
    this._objectData.SpayConeAngle = newValue;
  }
  _getBlending() {
    return this._objectData.Blending !== undefined ? this._objectData.Blending : "Additive";
  }
  _setBlending(newValue) {
    this._objectData.Blending = newValue;
  }
  _getGravityTop() {
    return this._objectData.GravityTop !== undefined ? this._objectData.GravityTop : "Y-";
  }
  _setGravityTop(newValue) {
    this._objectData.GravityTop = newValue;
  }
  _getGravity() {
    return this._objectData.Gravity !== undefined ? this._objectData.Gravity : Number("0") || 0;
  }
  _setGravity(newValue) {
    this._objectData.Gravity = newValue;
  }
  _getShouldAutodestruct() {
    return this._objectData.ShouldAutodestruct !== undefined ? this._objectData.ShouldAutodestruct : true;
  }
  _setShouldAutodestruct(newValue) {
    this._objectData.ShouldAutodestruct = newValue;
  }
  _toggleShouldAutodestruct() {
    this._setShouldAutodestruct(!this._getShouldAutodestruct());
  }
  _getParentOrigin() {
    return this._objectData.ParentOrigin !== undefined ? this._objectData.ParentOrigin : "Center-center";
  }
  _setParentOrigin(newValue) {
    this._objectData.ParentOrigin = newValue;
  }
  _getZ() {
    return this._objectData.Z !== undefined ? this._objectData.Z : Number("0") || 0;
  }
  _setZ(newValue) {
    this._objectData.Z = newValue;
  }
  _getRotationX() {
    return this._objectData.RotationX !== undefined ? this._objectData.RotationX : Number("0") || 0;
  }
  _setRotationX(newValue) {
    this._objectData.RotationX = newValue;
  }
  _getRotationY() {
    return this._objectData.RotationY !== undefined ? this._objectData.RotationY : Number("0") || 0;
  }
  _setRotationY(newValue) {
    this._objectData.RotationY = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.userFunc0xb4ce40 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const BatchedRenderer = gdjs.__particleEmmiter3DExtension.BatchedRenderer;
const ParticleSystem = gdjs.__particleEmmiter3DExtension.ParticleSystem;
const TextureLoader = gdjs.__particleEmmiter3DExtension.TextureLoader;
const IntervalValue = gdjs.__particleEmmiter3DExtension.IntervalValue;
const ConstantValue = gdjs.__particleEmmiter3DExtension.ConstantValue;
const ConstantColor = gdjs.__particleEmmiter3DExtension.ConstantColor;
const ColorOverLife = gdjs.__particleEmmiter3DExtension.ColorOverLife;
const SizeOverLife = gdjs.__particleEmmiter3DExtension.SizeOverLife;
const ApplyForce = gdjs.__particleEmmiter3DExtension.ApplyForce;
const Gradient = gdjs.__particleEmmiter3DExtension.Gradient;
const PiecewiseBezier = gdjs.__particleEmmiter3DExtension.PiecewiseBezier;
const Bezier = gdjs.__particleEmmiter3DExtension.Bezier;
const PointEmitter = gdjs.__particleEmmiter3DExtension.PointEmitter;
const ConeEmitter = gdjs.__particleEmmiter3DExtension.ConeEmitter;
const RenderMode = gdjs.__particleEmmiter3DExtension.RenderMode;

const { ParticleEmitterAdapter, ParticleEmitter3DRenderer } = gdjs.__particleEmmiter3DExtension;

/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

// Here runtimeScene is the gdjs.CustomRuntimeObjectInstanceContainer inside the custom object.
const gameScene = object.getRuntimeScene();

/** @type {SpriteObjectDataType} */
const particleSpriteData = object._instanceContainer._objects.get("Particle");
const resourceName = particleSpriteData.animations[0].directions[0].sprites[0].image;
const texture = object
    .getInstanceContainer()
    .getGame()
    .getImageManager().getThreeTexture(resourceName);

// Set the blending here because changes are not applied after the emitter creation.
const blendingString = object._getBlending();
const blending =
    blendingString === "Additive" ? THREE.AdditiveBlending :
        blendingString === "Normal" ? THREE.NormalBlending :
            blendingString === "Subtractive" ? THREE.SubtractiveBlending :
                blendingString === "Multiply" ? THREE.MultiplyBlending :
                    blendingString === "None" ? THREE.NoBlending :
                        THREE.AdditiveBlending;


// Build a configuration with the right kind of objects.
// These values are not important as they are overrided by the object properties values.
const muzzle = {
    duration: 10,
    looping: false,
    startLife: new IntervalValue(1, 2),
    startSpeed: new IntervalValue(100, 200),
    startSize: new IntervalValue(20, 50),
    startColor: new ConstantColor(new THREE.Vector4(1, 1, 1, 1)),
    worldSpace: true,

    maxParticle: 5,
    emissionOverTime: new ConstantValue(50),
    emissionBursts: [{
        time: 0,
        count: new ConstantValue(1),
        cycle: 1,
        interval: 0.01,
        probability: 1,
    }],

    shape: new PointEmitter(),
    material: new THREE.MeshBasicMaterial({
        map: texture,
        blending: blending,
        transparent: true,
        side: THREE.DoubleSide
    }),
    startTileIndex: 0,
    uTileCount: 1,
    vTileCount: 1,
    renderOrder: 2,
    renderMode: RenderMode.BillBoard
};
const particleSystem = new ParticleSystem(muzzle);

const colorOverLife = new ColorOverLife(
    new Gradient(
        [
            [new THREE.Vector3(1, 0, 0), 0],
            [new THREE.Vector3(1, 0, 0), 1],
        ],
        [
            [1, 0],
            [1, 1],
        ]
    ));
particleSystem.addBehavior(colorOverLife);
const sizeOverLife = new SizeOverLife(new PiecewiseBezier([[new Bezier(1, 2 / 3, 1 / 3, 0), 0]]));
particleSystem.addBehavior(sizeOverLife);
const applyForce = new ApplyForce(new THREE.Vector3(0, 0, -1), new ConstantValue(0));
particleSystem.addBehavior(applyForce);

particleSystem.emitter.name = object.getName() + object.getNameId();

object.__particleEmitterAdapter = new ParticleEmitterAdapter(particleSystem, colorOverLife, sizeOverLife, applyForce);
object.__particleSystem = particleSystem;

// This is a hack that may break in future releases.
// Replace the group that would hold children objects by the emmiter.
const layer = gameScene.getLayer(object.getLayer());
const group = object.getRenderer()._threeGroup;
layer.getRenderer().remove3DRendererObject(group);
particleSystem.emitter.position.copy(group.position);
particleSystem.emitter.rotation.order = 'ZYX';
particleSystem.emitter.rotation.copy(group.rotation);

const particleEmitter3DRenderer = new ParticleEmitter3DRenderer(object, object._instanceContainer, object.getInstanceContainer());
object._renderer = particleEmitter3DRenderer;
particleEmitter3DRenderer._threeGroup = particleSystem.emitter;
layer.getRenderer().add3DRendererObject(particleSystem.emitter);

particleSystem.emitter.updateMatrixWorld(true);


// See doStepPostEvents
gameScene.__particleEmmiter3DExtension = gameScene.__particleEmmiter3DExtension || {};
gameScene.__particleEmmiter3DExtension.emittersCount = gameScene.__particleEmmiter3DExtension.emittersCount || 0;
gameScene.__particleEmmiter3DExtension.emittersCount++;


};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.func(runtimeScene, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.userFunc0xb4ce40(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1[i].UpdateFromProperties((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1[i].setRotationCenter3D(0, 0, 0);
}
}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onCreatedContext.GDParticleObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDParticleObjects1= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.userFunc0xb50078 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];
// Here runtimeScene is the gdjs.CustomRuntimeObjectInstanceContainer inside the custom object.
const gameScene = object.getRuntimeScene();

object.__particleSystem.dispose();

// See doStepPostEvents
gameScene.__particleEmmiter3DExtension.emittersCount--;

if (gameScene.__particleEmmiter3DExtension.emittersCount === 0) {
    // Update batch system now because doStepPostEvents won't be called.
    gameScene.__particleEmmiter3DExtension.layerNames = gameScene.__particleEmmiter3DExtension.layerNames || [];
    const layerNames = gameScene.__particleEmmiter3DExtension.layerNames;
    gameScene.getAllLayerNames(layerNames);
    for (const layerName of layerNames) {
        const layer = gameScene.getLayer(layerName);
        if (layer.__particleEmmiter3DExtension) {
            layer.__particleEmmiter3DExtension.batchSystem.update(object.getElapsedTime() / 1000);
        }
    }
}
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.userFunc0xb50078(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroy = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDParticleObjects1.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onDestroyContext.GDParticleObjects1.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1[i].UpdateFromProperties((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloading = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.onHotReloadingContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects3= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects3= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1, gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length;i<l;++i) {
    if ( !(gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i]._getAreParticlesRelative()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i].SetAreParticlesRelative(false, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1, gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i]._getAreParticlesRelative() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2[i].SetAreParticlesRelative(true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{



}


{



}


};gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetZ((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Z((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetRotationX((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i]._getRotationX()), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetRotationY((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i]._getRotationY()), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartColor((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartColor((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetEndColor((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].EndColor((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartOpacity((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartOpacity((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetEndOpacity((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].EndOpacity((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetFlow((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Flow((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartSizeMin((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartSizeMin((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartSizeMax((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartSizeMax((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetEndScale((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].EndScale((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartSpeedMin((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartSpeedMin((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetStartSpeedMax((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].StartSpeedMax((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetLifespanMin((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].LifespanMin((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetLifespanMax((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].LifespanMax((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetDuration((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Duration((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetSpayConeAngle((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SpayConeAngle((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetGravity((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Gravity((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetGravityTop((gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].GravityTop((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromProperties = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects3.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.UpdateFromPropertiesContext.GDParticleObjects3.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
// Here runtimeScene is the gdjs.CustomRuntimeObjectInstanceContainer inside the custom object.
const gameScene = object.getRuntimeScene();

// Update batch system after having moved every emitter.
// See onScenePreEvents
gameScene.__particleEmmiter3DExtension.emittersStepped++;
if (gameScene.__particleEmmiter3DExtension.emittersStepped === gameScene.__particleEmmiter3DExtension.emittersCount) {
    gameScene.__particleEmmiter3DExtension.layerNames = gameScene.__particleEmmiter3DExtension.layerNames || [];
    const layerNames = gameScene.__particleEmmiter3DExtension.layerNames;
    gameScene.getAllLayerNames(layerNames);
    for (const layerName of layerNames) {
        const layer = gameScene.getLayer(layerName);
        if (layer.__particleEmmiter3DExtension) {
            layer.__particleEmmiter3DExtension.batchSystem.update(object.getElapsedTime() / 1000);
        }
    }
}
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1 */

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].HasEnded((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].Delete((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].HasEnded((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].RegisterInLayer((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPostEventsContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDParticleObjects1= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

// TODO Handle layer changes?
if (object.__emitterLayerName === undefined) {
    // Here runtimeScene is the gdjs.CustomRuntimeObjectInstanceContainer inside the custom object.
    const gameScene = object.getRuntimeScene();

    const layer = gameScene.getLayer(object.getLayer());
    layer.__particleEmmiter3DExtension = layer.__particleEmmiter3DExtension || {};
    if (!layer.__particleEmmiter3DExtension.batchSystem) {
        const batchSystem = new gdjs.__particleEmmiter3DExtension.BatchedRenderer();
        const threeScene = layer.getRenderer().getThreeScene();
        if (threeScene) {
            threeScene.add(batchSystem);
        }
        layer.__particleEmmiter3DExtension.batchSystem = batchSystem;
    }
    layer.__particleEmmiter3DExtension.batchSystem.addSystem(object.__particleSystem);
    object.__emitterLayerName = layer.getName();
}
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayer = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDParticleObjects1.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RegisterInLayerContext.GDParticleObjects1.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDParticleObjects1= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

object.deleteFromScene(object.getParent());

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Delete = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDParticleObjects1.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DeleteContext.GDParticleObjects1.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDParticleObjects1= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.userFunc0xf89e38 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

eventsFunctionContext.returnValue =
       object._getShouldAutodestruct()
    && object.__particleSystem.emitEnded
    && object.__particleSystem.particleNum === 0;

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.userFunc0xf89e38(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEnded = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDParticleObjects1.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.HasEndedContext.GDParticleObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDParticleObjects1= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

object.__particleSystem.restart();

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Restart = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDParticleObjects1.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RestartContext.GDParticleObjects1.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1[0]._getZ()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Z = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ZContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1[i]._setZ(eventsFunctionContext.getArgument("Value"));
}
}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZ = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetZContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1[0]._getRotationX()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationX = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationXContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.userFunc0xc16ce0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

object.__particleSystem.emitter.rotation.x = eventsFunctionContext.getArgument("Value") * Math.PI / 180;
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1[i]._setRotationX(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.userFunc0xc16ce0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationX = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationXContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1[0]._getRotationY()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationY = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.RotationYContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.userFunc0xf89e38 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

object.__particleSystem.emitter.rotation.y = (90 + eventsFunctionContext.getArgument("Value")) * Math.PI / 180;
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1[i]._setRotationY(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.userFunc0xf89e38(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationY = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetRotationYContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1[0]._getStartColor()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColor = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartColorContext.GDParticleObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.userFunc0x83bda0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startColor = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartColor(startColor);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1[i]._setStartColor(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.userFunc0x83bda0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColor = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartColorContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1[0]._getEndColor()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColor = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndColorContext.GDParticleObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.userFunc0xa31768 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const endColor = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setEndColor(endColor);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1[i]._setEndColor(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.userFunc0xa31768(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColor = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndColorContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1[0]._getStartOpacity()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacity = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartOpacityContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.userFunc0x83beb8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startOpacity = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartOpacity(startOpacity);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1[i]._setStartOpacity(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.userFunc0x83beb8(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacity = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartOpacityContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1[0]._getEndOpacity()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacity = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndOpacityContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.userFunc0xb545a8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const endOpacity = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setEndOpacity(endOpacity);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1[i]._setEndOpacity(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.userFunc0xb545a8(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacity = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndOpacityContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1[0]._getFlow()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Flow = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.FlowContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.userFunc0xb54768 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const flow = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setFlow(flow);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1[i]._setFlow(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.userFunc0xb54768(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlow = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetFlowContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1[0]._getStartSizeMin()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMin = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMinContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.userFunc0xb52e18 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startMinSize = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartMinSize(startMinSize);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1[i]._setStartSizeMin(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.userFunc0xb52e18(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMin = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMinContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1[0]._getStartSizeMax()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMax = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSizeMaxContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.userFunc0xb54630 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startMaxSize = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartMaxSize(startMaxSize);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1[i]._setStartSizeMax(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.userFunc0xb54630(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMax = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSizeMaxContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1[0]._getEndScale()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScale = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.EndScaleContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const endScale = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setEndScale(endScale);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1[i]._setEndScale(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScale = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetEndScaleContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1[0]._getStartSpeedMin()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMin = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMinContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.userFunc0xb56810 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startSpeedMin = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartSpeedMin(startSpeedMin);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1[i]._setStartSpeedMin(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.userFunc0xb56810(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMin = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMinContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1[0]._getStartSpeedMax()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMax = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.StartSpeedMaxContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.userFunc0xa316f0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const startSpeedMax = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setStartSpeedMax(startSpeedMax);
};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1[i]._setStartSpeedMax(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.userFunc0xa316f0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMax = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetStartSpeedMaxContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1[0]._getLifespanMin()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMin = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMinContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.userFunc0xb545e8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const lifespanMin = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setLifespanMin(lifespanMin);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1[i]._setLifespanMin(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.userFunc0xb545e8(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMin = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMinContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1[0]._getLifespanMax()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMax = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.LifespanMaxContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.userFunc0xa31808 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const lifespanMax = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setLifespanMax(lifespanMax);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1[i]._setLifespanMax(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.userFunc0xa31808(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMax = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetLifespanMaxContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1[0]._getDuration()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Duration = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.DurationContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.userFunc0xa31738 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const duration = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setDuration(duration);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1[i]._setDuration(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.userFunc0xa31738(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDuration = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetDurationContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1[i]._getAreParticlesRelative() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelative = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.AreParticlesRelativeContext.GDParticleObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.userFunc0xe8a420 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const areParticlesRelative = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setParticlesRelative(areParticlesRelative);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1[i]._setAreParticlesRelative(false);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1[i]._setAreParticlesRelative(true);
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.userFunc0xe8a420(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelative = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetAreParticlesRelativeContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1[0]._getSpayConeAngle()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngle = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SpayConeAngleContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.userFunc0xb569c0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const sprayConeAngle = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setSprayConeAngle(sprayConeAngle);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1[i]._setSpayConeAngle(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.userFunc0xb569c0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngle = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetSpayConeAngleContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1[0]._getBlending()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Blending = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.BlendingContext.GDParticleObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.userFunc0xa25bc0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const blending = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setBlending(blending);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1[i]._setBlending(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.userFunc0xa25bc0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlending = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetBlendingContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1[0]._getGravityTop()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTop = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityTopContext.GDParticleObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.userFunc0x83c640 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const gravityTop = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setGravityTop(gravityTop);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1[i]._setGravityTop(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.userFunc0x83c640(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTop = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityTopContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1[0]._getGravity()); }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.Gravity = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.GravityContext.GDParticleObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.userFunc0xa256e0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];
const gravity = eventsFunctionContext.getArgument("Value");

object.__particleEmitterAdapter.setGravity(gravity);

};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1[i]._setGravity(eventsFunctionContext.getArgument("Value"));
}
}}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1);

var objects = [];
objects.push.apply(objects,gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.userFunc0xa256e0(runtimeScene, objects, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravity = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetGravityContext.GDParticleObjects2.length = 0;


return;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1[i]._getShouldAutodestruct() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1[k] = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestruct = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.ShouldAutodestructContext.GDParticleObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext = {};
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects2= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects1= [];
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects2= [];


gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1[i]._setShouldAutodestruct(false);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Value") : false);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1[i]._setShouldAutodestruct(true);
}
}}

}


};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestruct = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Particle": GDParticleObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Particle": thisGDParticleObjectsList
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects2.length = 0;

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.SetShouldAutodestructContext.GDParticleObjects2.length = 0;


return;
}

gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("ParticleEmitter3D::ParticleEmitter3D", gdjs.evtsExt__ParticleEmitter3D__ParticleEmitter3D.ParticleEmitter3D);
