function KeyboardInputManager(){this.events={},this.listen()}KeyboardInputManager.prototype.on=function(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)},KeyboardInputManager.prototype.emit=function(t,e){var o=this.events[t]
o&&o.forEach(function(t){t(e)})},KeyboardInputManager.prototype.listen=function(){var t=this,e={38:0,39:1,40:2,37:3,75:0,76:1,74:2,72:3,87:0,68:1,83:2,65:3}
document.addEventListener("keydown",function(o){var i=o.altKey||o.ctrlKey||o.metaKey||o.shiftKey,a=e[o.which]
i||(void 0!==a&&(o.preventDefault(),t.emit("move",a)),32===o.which&&t.restart.bind(t)(o))})
var o=document.getElementsByClassName("retry-button")[0]
o.addEventListener("click",this.restart.bind(this)),o.addEventListener("touchend",this.restart.bind(this))
var i,a,n=document.getElementsByClassName("game-container")[0]
n.addEventListener("touchstart",function(t){t.touches.length>1||(i=t.touches[0].clientX,a=t.touches[0].clientY,t.preventDefault())}),n.addEventListener("touchmove",function(t){t.preventDefault()}),n.addEventListener("touchend",function(e){if(!(e.touches.length>0)){var o=e.changedTouches[0].clientX-i,n=Math.abs(o),r=e.changedTouches[0].clientY-a,s=Math.abs(r)
Math.max(n,s)>10&&t.emit("move",n>s?o>0?1:3:r>0?2:0)}})},KeyboardInputManager.prototype.restart=function(t){t.preventDefault(),this.emit("restart")}
