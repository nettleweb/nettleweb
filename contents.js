"use strict";

let contents = {
	"html5Games": [
		{
			"name": "2048",
			"url": "https://gabrielecirulli.github.io/2048/"
		},
		{
			"name": "4 Colors",
			"url": "https://storage.y8.com/y8-studio/html5/akeemywka/four_colors_v2/"
		},
		{
			"name": "9007199254740992",
			"url": "https://www.csie.ntu.edu.tw/~b01902112/9007199254740992/"
		},
		{
			"name": "Appel",
			"url": "https://scratch.mit.edu/projects/60917032/embed"
		},
		{
			"name": "Ball Fall 3D",
			"url": "https://storage.y8.com/y8-studio/unity_webgl/y8games/BallFall3D-2022-b4/index.html"
		},
		{
			"name": "Chess",
			"url": "https://playpager.com/embed/minichess/index.html"
		},
		{
			"name": "Cookie Clicker",
			"url": "https://shsgames.github.io/built-games/cookieclicker/index.html"
		},
		{
			"name": "Cut The Rope",
			"path": "https://app-97515.games.s3.yandex.net/97515/u1824c0o9xlk2nm9hlcxtbs4l6ysl44s/index.html"
		},
		{
			"name": "Cut The Rope 2",
			"path": "https://app-151508.games.s3.yandex.net/151508/jvxf9j9k2sdt71knpwa2f6azsndo6nrw/index.html"
		},
		{
			"name": "Death Worm",
			"path": "https://app-165865.games.s3.yandex.net/165865/g5i92zlftj709k08ejk195g6vimi7ezc/index.html"
		},
		{
			"name": "Doodle Jump",
			"url": "https://ruochenjia.github.io/html5-games/doodle-jump/"
		},
		{
			"name": "ev.io",
			"url": "https://www.ev.io"
		},
		{
			"name": "Flappy Bird",
			"url": "https://ruochenjia.github.io/html5-games/flappy-bird"
		},
		{
			"name": "Flip 3D",
			"url": "https://scratch.mit.edu/projects/430999356/embed"
		},
		{
			"name": "Geometry Dash",
			"url": "https://scratch.mit.edu/projects/105500895/embed"
		},
		{
			"name": "Greedy Shark",
			"url": "https://ruochenjia.github.io/Greedy-Shark/"
		},
		{
			"name": "Happy Wheels",
			"url": "https://ikatchelo.github.io/happ/"
		},
		{
			"name": "hole.io",
			"url": "https://hole-io.com"
		},
		{
			"name": "krunker.io",
			"url": "https://krunker.io"
		},
		{
			"name": "Ludo",
			"url": "https://cdn.htmlgames.com/Ludo/"
		},
		{
			"name": "MaZe",
			"url": "https://storage.y8.com/y8-studio/html5/akeemywka/maze_v1/index.html"
		},
		{
			"name": "Minecraft 2D",
			"url": "https://scratch.mit.edu/projects/10128407/embed"
		},
		{
			"name": "Minecraft Classic",
			"url": "https://classic.minecraft.net"
		},
		{
			"name": "Minesweeper",
			"url": "https://ruochenjia.github.io/html5-games/minesweeper"
		},
		{
			"name": "Pac-Man",
			"url": "https://freepacman.org/"
		},
		{
			"name": "Paper Battle",
			"url": "https://storage.y8.com/y8-studio/unity/joll/papergame/paper_battle_v20/index.html"
		},
		{
			"name": "powerline.io",
			"url": "https://powerline.io"
		},
		{
			"name": "Reversi",
			"url": "https://playpager.com/embed/reversi/index.html"
		},
		{
			"name": "Run 3",
			"url": "https://ubg100.github.io/games/run3"
		},
		{
			"name": "slither.io",
			"url": "https://slither.io"
		},
		{
			"name": "Slope",
			"url": "https://storage.y8.com/y8-studio/unity_webgl/bitlaslt/slope_v_1_2_5/index.html"
		},
		{
			"name": "snake.io",
			"url": "https://snake.io"
		},
		{
			"name": "Solitaire",
			"url": "https://ruochenjia.github.io/html5-games/solitaire/"
		},
		{
			"name": "Squid Game",
			"url": "https://squad-game.vakhtangi1980.repl.co/"
		},
		{
			"name": "Surf",
			"url": "https://ruochenjia.github.io/html5-games/surf/"
		},
		{
			"name": "T-Rex Run",
			"url": "https://ruochenjia.github.io/html5-games/chromedino/"
		},
		{
			"name": "T-Rex Run 3D",
			"url": "https://elgoog.im/t-rex/3d/"
		},
		{
			"name": "Temple Run 2",
			"url": "https://yell0wsuit.github.io/html5-games/games/templerun2/"
		},
		{
			"name": "Tetris",
			"url": "https://ruochenjia.github.io/html5-games/tetris/"
		},
		{
			"name": "Triple Connect",
			"url": "https://cdn.htmlgames.com/TripleConnect/"
		},
		{
			"name": "Tunnel Rush",
			"url": "https://ubg100.github.io/games/tunnelrush/"
		},
		{
			"name": "Uno",
			"path": "https://app-177799.games.s3.yandex.net/177799/d7a35e57hl874np745ncsvajwen2ges9/index.html"
		},
		{
			"name": "venge.io",
			"url": "https://venge.io"
		},
		{
			"name": "voxiom.io",
			"url": "https://voxiom.io"
		},
		{
			"name": "wings.io",
			"url": "https://wings.io"
		},
		{
			"name": "Zombie Killer",
			"path": "https://app-158693.games.s3.yandex.net/158693/2289i4hez4nkfqyo31x4l2jr4mq2lx0u/index.html"
		},
		{
			"name": "zombsroyale.io",
			"url": "https://zombsroyale.io"
		}
	],
	"dosGames": [
	],
	"flashGames": [
	]
};

export { contents };
