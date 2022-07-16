function drawTimer(){if(1==gameState){var e=[],t=[]
if(MainHex.ct-MainHex.lastCombo<settings.comboTime)for(var n=0;6>n;n++){var r=MainHex.ct-MainHex.lastCombo
if(!(r<settings.comboTime*(5-n)*(1/6))){e.push(calcSide(n,n+1,1-6*r/settings.comboTime%1,1)),t.push(calcSide(12-n,11-n,1-6*r/settings.comboTime%1,1))
break}e.push(calcSide(n,n+1,1,1)),t.push(calcSide(12-n,11-n,1,1))}0!==t.length&&drawSide(t),0!==e.length&&drawSide(e)}}function calcSide(e,t,n,r){e=(e+r)%12,t=(t+r)%12,ctx.globalAlpha=1,ctx.beginPath(),ctx.lineCap="round"
var a=settings.rows*settings.blockHeight*(2/Math.sqrt(3))+settings.hexWidth,i=a/2,s=a*(Math.sqrt(3)/2),o=[[3*i/2,s/2],[a,0],[3*i/2,-s/2],[i,-s],[0,-s],[-i,-s],[-(3*i)/2,-s/2],[-a,0],[-(3*i)/2,s/2],[-i,s],[0,s],[i,s]].reverse(),u=trueCanvas.width/2+o[e][0],l=trueCanvas.height/2+o[e][1],c=trueCanvas.width/2+o[t][0],h=trueCanvas.height/2+o[t][1]
return[[u,l],[(c-u)*n+u,(h-l)*n+l]]}function drawSide(e){0===gameState?ctx.strokeStyle=hexColorsToTintedColors[MainHex.lastColorScored]:ctx.strokeStyle=MainHex.lastColorScored,ctx.lineWidth=4*settings.scale,ctx.moveTo(e[0][0][0],e[0][0][1]),ctx.lineTo(e[0][1][0],e[0][1][1])
for(var t=1;t<e.length;t++)ctx.lineTo(e[t][1][0],e[t][1][1]),ctx.moveTo(e[t][1][0],e[t][1][1])
ctx.closePath(),ctx.fill(),ctx.stroke()}