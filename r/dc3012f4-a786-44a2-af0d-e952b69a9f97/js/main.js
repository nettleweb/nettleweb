"use strict"
function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var a=0;a<e.length;a++){var i=e[a]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,a){return e&&_defineProperties(t.prototype,e),a&&_defineProperties(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}var state_closed=0,state_opened=1,state_flagged=2,empty=0,mine=-1,Minesweeper=function(){function t(e,a){_classCallCheck(this,t),this.canvas=e,this.context=e.getContext("2d"),this.images=a,this.pxX=e.clientWidth,this.pxY=e.clientHeight,this.blockX=30,this.blockY=30,this.h=15,this.w=15,this.mines=30,this.board=[],this.state=[],this.gameState=0,this.winCallback=null,this.gameOverCallback=null}return _createClass(t,[{key:"usePreset",value:function(t){this.h=t.height,this.w=t.width,this.mines=t.mines}},{key:"inBounds",value:function(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}},{key:"countMinesAround",value:function(t,e){for(var a=0,i=-1;2>i;i++)for(var o=-1;2>o;o++)if(0!=i||0!=o){var s=e+o,n=t+i
this.inBounds(n,s)&&-1==this.board[s][n]&&a++}return a}},{key:"getTexture",value:function(t,e){switch(this.board[e][t]){case empty:return this.images.empty
case 1:return this.images.block1
case 2:return this.images.block2
case 3:return this.images.block3
case 4:return this.images.block4
case 5:return this.images.block5
case 6:return this.images.block6
case 7:return this.images.block7
case 8:return this.images.block8
case mine:return this.images.mineClicked
default:return this.images.mine}}},{key:"renderBlock",value:function(t,e){var a=t*this.blockX,i=e*this.blockY
switch(this.state[e][t]){case state_opened:this.context.drawImage(this.getTexture(t,e),a,i,this.blockX,this.blockY)
break
case state_flagged:this.context.drawImage(this.images.flagged,a,i,this.blockX,this.blockY)
break
default:this.context.drawImage(this.images.covered,a,i,this.blockX,this.blockY)}}},{key:"render",value:function(){for(var t=0;t<this.h;t++)for(var e=0;e<this.w;e++){if(this.state[t][e]==state_closed&&this.board[t][e]==mine)switch(this.gameState){case 1:this.state[t][e]=state_flagged
break
case-1:this.state[t][e]=state_opened}this.renderBlock(e,t)}}},{key:"clear",value:function(){this.context.clearRect(0,0,this.pxX,this.pxY)}},{key:"start",value:function(){this.blockX=this.pxX/this.w,this.blockY=this.pxY/this.h,this.init()
var t=this
this.canvas.addEventListener("click",function(e){if(0!=!t.gameState){var a=e.target.getBoundingClientRect(),i=Math.floor((e.clientX-a.left)/t.blockX),o=Math.floor((e.clientY-a.top)/t.blockY)
t.openBlock(i,o,!1)}else t.restart()}),this.canvas.addEventListener("contextmenu",function(e){if(0!=!t.gameState){e.preventDefault()
var a=e.target.getBoundingClientRect(),i=Math.floor((e.clientX-a.left)/t.blockX),o=Math.floor((e.clientY-a.top)/t.blockY)
t.openBlock(i,o,!0)}})}},{key:"restart",value:function(){this.gameState=0,this.blockX=this.pxX/this.w,this.blockY=this.pxY/this.h,this.clear(),this.init()}},{key:"init",value:function(){for(var t=0;t<this.h;t++){this.board[t]=[],this.state[t]=[]
for(var e=0;e<this.w;e++)this.board[t][e]=empty,this.state[t][e]=state_closed}for(var a=0;a<this.mines;a++){var i=void 0,o=void 0
do{o=Math.floor(Math.random()*this.h),i=Math.floor(Math.random()*this.w)
break}while(this.board[o][i]==mine)
this.board[o][i]=mine}for(var s=0;s<this.h;s++)for(var n=0;n<this.w;n++)this.board[s][n]!=mine&&(this.board[s][n]=this.countMinesAround(n,s))
this.render()}},{key:"win",value:function(){this.gameState=1,alert("You won!"),null!=this.winCallback&&this.winCallback()}},{key:"gameOver",value:function(){this.gameState=-1,alert("Game Over!"),null!=this.gameOverCallback&&this.gameOverCallback()}},{key:"openBlock",value:function(t,e,a){switch(this.state[e][t]){case state_closed:if(a)this.state[e][t]=state_flagged
else{if(this.state[e][t]=state_opened,this.board[e][t]==mine)return this.gameOver(),void this.render()
if(this.board[e][t]==empty)for(var i=-1;2>i;i++)for(var o=-1;2>o;o++){var s=t+i,n=e+o
this.inBounds(s,n)&&this.state[n][s]==state_closed&&this.openBlock(s,n)}}break
case state_flagged:if(!a)return
this.state[e][t]=state_closed
break
default:return}this.checkWin()&&this.win(),this.render()}},{key:"checkWin",value:function(){for(var t=0;t<this.h;t++)for(var e=0;e<this.w;e++)if(this.state[t][e]!=state_opened&&this.board[t][e]!=mine)return!1
return!0}}]),t}()
