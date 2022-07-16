function blockDestroyed(){waveone.nextGen>1350?waveone.nextGen-=30*settings.creationSpeedModifier:waveone.nextGen>600?waveone.nextGen-=8*settings.creationSpeedModifier:waveone.nextGen=600,waveone.difficulty<35?waveone.difficulty+=.085*settings.speedModifier:waveone.difficulty=35}function waveGen(e){this.lastGen=0,this.last=0,this.nextGen=2700,this.start=0,this.colors=colors,this.ct=0,this.hex=e,this.difficulty=1,this.dt=0,this.update=function(){this.currentFunction(),this.dt=("mobile"==settings.platform?14:16.6667)*MainHex.ct,this.computeDifficulty(),(this.dt-this.lastGen)*settings.creationSpeedModifier>this.nextGen&&this.nextGen>600&&(this.nextGen-=11*(this.nextGen/1300)*settings.creationSpeedModifier)},this.randomGeneration=function(){if(this.dt-this.lastGen>this.nextGen){this.ct++,this.lastGen=this.dt
var e=randInt(0,MainHex.sides)
addNewBlock(e,colors[randInt(0,colors.length)],1.6+this.difficulty/15*3)
var t=5
if(this.ct>t){var n=randInt(0,24)
n>15?(this.ct=0,this.currentFunction=this.doubleGeneration):n>10?(this.ct=0,this.currentFunction=this.crosswiseGeneration):n>7?(this.ct=0,this.currentFunction=this.spiralGeneration):n>4?(this.ct=0,this.currentFunction=this.circleGeneration):n>1&&(this.ct=0,this.currentFunction=this.halfCircleGeneration)}}},this.computeDifficulty=function(){if(this.difficulty<35){var e
e=this.difficulty<8?(this.dt-this.last)/5166667*settings.speedModifier:this.difficulty<15?(this.dt-this.last)/72333333*settings.speedModifier:(this.dt-this.last)/9e7*settings.speedModifier,this.difficulty+=.5*e}},this.circleGeneration=function(){if(this.dt-this.lastGen>this.nextGen+500){var e=randInt(1,4)
3==e&&(e=randInt(1,4))
var t=[]
e:for(var n=0;e>n;n++){var r=randInt(0,colors.length)
for(var a in t)if(t[a]==colors[r]){n--
continue e}t.push(colors[r])}for(var n=0;n<MainHex.sides;n++)addNewBlock(n,t[n%e],1.5+this.difficulty/15*3)
this.ct+=15,this.lastGen=this.dt,this.shouldChangePattern(1)}},this.halfCircleGeneration=function(){if(this.dt-this.lastGen>(this.nextGen+500)/2){var e=randInt(1,3),t=colors[randInt(0,colors.length)],n=[t,t,t]
2==e&&(n=[t,colors[randInt(0,colors.length)],t])
for(var r=randInt(0,6),a=0;3>a;a++)addNewBlock((r+a)%6,n[a],1.5+this.difficulty/15*3)
this.ct+=8,this.lastGen=this.dt,this.shouldChangePattern()}},this.crosswiseGeneration=function(){if(this.dt-this.lastGen>this.nextGen){var e=randInt(0,colors.length),t=randInt(0,colors.length)
addNewBlock(t,colors[e],.6+this.difficulty/15*3),addNewBlock((t+3)%MainHex.sides,colors[e],.6+this.difficulty/15*3),this.ct+=1.5,this.lastGen=this.dt,this.shouldChangePattern()}},this.spiralGeneration=function(){var e=randInt(0,2)
this.dt-this.lastGen>this.nextGen*(2/3)&&(e?addNewBlock(5-this.ct%MainHex.sides,colors[randInt(0,colors.length)],1.5+this.difficulty/15*1.5):addNewBlock(this.ct%MainHex.sides,colors[randInt(0,colors.length)],1.5+this.difficulty/15*1.5),this.ct+=1,this.lastGen=this.dt,this.shouldChangePattern())},this.doubleGeneration=function(){if(this.dt-this.lastGen>this.nextGen){var e=randInt(0,colors.length)
addNewBlock(e,colors[randInt(0,colors.length)],1.5+this.difficulty/15*3),addNewBlock((e+1)%MainHex.sides,colors[randInt(0,colors.length)],1.5+this.difficulty/15*3),this.ct+=2,this.lastGen=this.dt,this.shouldChangePattern()}},this.setRandom=function(){this.ct=0,this.currentFunction=this.randomGeneration},this.shouldChangePattern=function(e){if(e){var t=randInt(0,4)
switch(this.ct=0,t){case 0:this.currentFunction=this.doubleGeneration
break
case 1:this.currentFunction=this.spiralGeneration
break
case 2:this.currentFunction=this.crosswiseGeneration}}else if(this.ct>8&&0===randInt(0,2))return this.setRandom(),1
return 0},this.currentFunction=this.randomGeneration}