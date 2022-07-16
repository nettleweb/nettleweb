function update(e){MainHex.dt=e,1==gameState&&(waveone.update(),MainHex.ct-waveone.prevTimeScored>1e3&&(waveone.prevTimeScored=MainHex.ct))
var t,n,r,a=99
for(t=0;t<blocks.length;t++)MainHex.doesBlockCollide(blocks[t]),blocks[t].settled?blocks[t].removed||(blocks[t].removed=1):blocks[t].initializing||(blocks[t].distFromHex-=blocks[t].iter*e*settings.scale)
for(t=0;t<MainHex.blocks.length;t++)for(n=0;n<MainHex.blocks[t].length;n++)1==MainHex.blocks[t][n].checked&&(consolidateBlocks(MainHex,MainHex.blocks[t][n].attachedLane,MainHex.blocks[t][n].getIndex()),MainHex.blocks[t][n].checked=0)
for(t=0;t<MainHex.blocks.length;t++){for(a=99,n=0;n<MainHex.blocks[t].length;n++)r=MainHex.blocks[t][n],2==r.deleted&&(MainHex.blocks[t].splice(n,1),blockDestroyed(),a>n&&(a=n),n--)
if(a<MainHex.blocks[t].length)for(n=a;n<MainHex.blocks[t].length;n++)MainHex.blocks[t][n].settled=0}for(t=0;t<MainHex.blocks.length;t++)for(n=0;n<MainHex.blocks[t].length;n++)r=MainHex.blocks[t][n],MainHex.doesBlockCollide(r,n,MainHex.blocks[t]),MainHex.blocks[t][n].settled||(MainHex.blocks[t][n].distFromHex-=r.iter*e*settings.scale)
for(t=0;t<blocks.length;t++)1==blocks[t].removed&&(blocks.splice(t,1),t--)
MainHex.ct+=e}