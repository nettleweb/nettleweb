
var auto_move_flag = false;
var auto_move_time;

function start_auto_move(){
	auto_move_flag = true;
	auto_move();
}

function auto_move(){
	if ( auto_move_flag === false )
		return;
	var direction = Math.floor( Math.random() * 4 );
	GM.move( direction );
	setTimeout( "auto_move()", auto_move_time );
}

function stop_auto_move(){
	auto_move_flag = false;
}

window.requestAnimationFrame(function(){
	document.getElementById("auto-move-run").addEventListener("click",function(){
		var time = parseInt( document.getElementById("auto-move-input-time").value );
		if ( !isNaN( time ) ){
			auto_move_time = time;
			if ( auto_move_flag === false ){
				start_auto_move();
			}
		}
	});
	document.getElementById("auto-move-stop").addEventListener("click",function(){
		stop_auto_move();
	});
});