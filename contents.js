"use strict";

let contents = {
	"html5Games": [
		{
			"name": "1v1.lol",
			"url": "https://1v1.lol/"
		},
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
			"name": "Dogeminer 2",
			"url": "https://dogeminer2.com/"
		},
		{
			"name": "Doodle Jump",
			"path": "html5-games/doodle-jump/"
		},
		{
			"name": "ev.io",
			"url": "https://www.ev.io"
		},
		{
			"name": "Flappy Bird",
			"path": "html5-games/flappy-bird/"
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
			"name": "Hextris",
			"url": "https://hextris.io/"
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
			"path": "html5-games/minesweeper/"
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
			"name": "Shadow Fighters",
			"url": "https://embed.gamedistribution.com/?language=en&gdpr-tracking=0&gdpr-targeting=0&gdpr-third-party=0&url=https://html5.gamedistribution.com/49cb67eea34644a1afafea2970eaead1/"
		},
		{
			"name": "Shell Shockers",
			"url": "https://shellshock.io/"
		},
		{
			"name": "Skydom",
			"url": "https://embed.gamedistribution.com/?language=en&gdpr-tracking=0&gdpr-targeting=0&gdpr-third-party=0&https://html5.gamedistribution.com/ae10263247c44278b33c845ff1c2df80/"
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
			"path": "html5-games/solitaire/"
		},
		{
			"name": "Squid Game",
			"url": "https://squad-game.vakhtangi1980.repl.co/"
		},
		{
			"name": "Surf",
			"path": "html5-games/surf/"
		},
		{
			"name": "T-Rex Run",
			"path": "html5-games/chromedino/"
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
			"path": "html5-games/tetris/"
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
		{
			"name": "Blood",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fblood.jsdos"
		},
		{
			"name": "CHAMP Kong",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fchamp-kong.jsdos"
		},
		{
			"name": "Doom",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fdoom.jsdos"
		},
		{
			"name": "Duke Nukem 3D",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fduke-nukem-3d.jsdos"
		},
		{
			"name": "Pac-Man",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fpac-man.jsdos"
		},
		{
			"name": "Quake",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fquake.jsdos"
		},
		{
			"name": "Super Street Fighter II Turbo",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fsuper-street-fighter-ii-turbo.jsdos"
		},
		{
			"name": "Tetris",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Ftetris.jsdos"
		},
		{
			"name": "Wolfenstein 3D",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fwolfenstein-3d.jsdos"
		},
		{
			"name": "X-Men: Children of the Atom",
			"path": "embed.html?type=jsdos&src=%2Fdos-games%2Fx-men-children-of-the-atom.jsdos"
		}
	],
	"flashGames": [
		{
			"name": "7 Days Without Rain",
			"path": "embed.html?type=flash&src=%2Fflash-games%2F7-days-without-rain.swf"
		},
		{
			"name": "Amorphous Plus",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Famorphous-plus.swf"
		},
		{
			"name": "Bloons Player Pack 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-2.swf"
		},
		{
			"name": "Bloons Player Pack 3",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-3.swf"
		},
		{
			"name": "Bloons Player Pack 4",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-4.swf"
		},
		{
			"name": "Bloons Tower Defense",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbloons-tower-defense.swf"
		},
		{
			"name": "Bloons Tower Defense 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbloons-tower-defense-2.swf"
		},
		{
			"name": "Bubble Trouble",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fbubble-trouble.swf"
		},
		{
			"name": "Falldown",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Ffalldown.swf"
		},
		{
			"name": "Falldown 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Ffalldown2.swf"
		},
		{
			"name": "Fancy Pants Adventure",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Ffancy-pants-adventure.swf"
		},
		{
			"name": "Fancy Pants Adventure 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Ffancy-pants-adventure2.swf"
		},
		{
			"name": "Gold Miner",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fgold_miner_xploit_machine_edition_2009.swf"
		},
		{
			"name": "Gold Miner (Special Edition)",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fgold_miner_special_edition.swf"
		},
		{
			"name": "Henry Stickmin: Breaking the Bank",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fhenry-stickmin-breaking-the-bank.swf"
		},
		{
			"name": "Henry Stickmin: Escaping The Prison",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fhenry-stickmin-escaping-the-prison.swf"
		},
		{
			"name": "Henry Stickmin: Stealing The Diamond",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fhenry-stickmin-stealing-the-diamond.swf"
		},
		{
			"name": "Plant VS Zombies 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fplant_vs_zombies_2.swf"
		},
		{
			"name": "Plazma Burst",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fplazma-burst.swf"
		},
		{
			"name": "Super Mario Flash",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-flash.swf"
		},
		{
			"name": "Super Mario Flash 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-flash2.swf"
		},
		{
			"name": "Super Smash Flash",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fsuper-smash-flash.swf"
		},
		{
			"name": "The Impossible Quiz",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fthe-impossible-quiz.swf"
		},
		{
			"name": "The Impossible Quiz 2",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fthe-impossible-quiz-2.swf"
		},
		{
			"name": "World's Hardest Game",
			"path": "embed.html?type=flash&src=%2Fflash-games%2Fworlds-hardest-game.swf"
		}
	]
};

export { contents };
