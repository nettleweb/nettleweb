function start_auto_move(){auto_move_flag=!0,auto_move()}function auto_move(){if(auto_move_flag!==!1){var e=Math.floor(4*Math.random())
GM.move(e),setTimeout("auto_move()",auto_move_time)}}function stop_auto_move(){auto_move_flag=!1}var auto_move_flag=!1,auto_move_time
window.requestAnimationFrame(function(){document.getElementById("auto-move-run").addEventListener("click",function(){var e=parseInt(document.getElementById("auto-move-input-time").value)
isNaN(e)||(auto_move_time=e,auto_move_flag===!1&&start_auto_move())}),document.getElementById("auto-move-stop").addEventListener("click",function(){stop_auto_move()})})
