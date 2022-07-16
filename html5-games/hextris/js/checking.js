function search(e,t){for(var n=0;n<e.length;n++)if(e[n][0]==t[0]&&e[n][1]==t[1])return!0
return!1}function floodFill(e,t,n,r){if(void 0!==e.blocks[t]&&void 0!==e.blocks[t][n])for(var a=e.blocks[t][n].color,i=-1;2>i;i++)for(var s=-1;2>s;s++)if(Math.abs(i)!=Math.abs(s)){var o=(t+i+e.sides)%e.sides,u=n+s
void 0!==e.blocks[o]&&void 0!==e.blocks[o][u]&&e.blocks[o][u].color==a&&search(r,[o,u])===!1&&0===e.blocks[o][u].deleted&&(r.push([o,u]),floodFill(e,o,u,r))}}function consolidateBlocks(e,t,n){var r=[],a=[],i=[]
if(a.push([t,n]),floodFill(e,t,n,a),!(a.length<3)){var s
for(s=0;s<a.length;s++){var o=a[s]
void 0!==o&&2==o.length&&(-1==r.indexOf(o[0])&&r.push(o[0]),e.blocks[o[0]][o[1]].deleted=1,i.push(e.blocks[o[0]][o[1]]))}var u=MainHex.ct
if(u-e.lastCombo<settings.comboTime){settings.comboTime=1/settings.creationSpeedModifier*(waveone.nextGen/16.666667)*3,e.comboMultiplier+=1,e.lastCombo=u
var l=findCenterOfBlocks(i)
e.texts.push(new Text(l.x,l.y,"x "+e.comboMultiplier,"bold Q","#fff",fadeUpAndOut))}else settings.comboTime=240,e.lastCombo=u,e.comboMultiplier=1
var c=a.length*a.length*e.comboMultiplier
e.texts.push(new Text(e.x,e.y,"+ "+c,"bold Q ",i[0].color,fadeUpAndOut)),e.lastColorScored=i[0].color,score+=c}}