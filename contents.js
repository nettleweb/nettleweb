/*!
Copyright 2022 ChromeHack Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const contents = {
	dosGames: [
		{
			name: "Blood",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fblood.jsdos"
		},
		{
			name: "Bombjack",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fbombjack.jsdos"
		},
		{
			name: "Cavern of the Evil Wizard",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fcavern-of-the-evil-wizard.jsdos"
		},
		{
			name: "CHAMP Kong",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fchamp-kong.jsdos"
		},
		{
			name: "Cross Country Trucking",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fcross-country-trucking.jsdos"
		},
		{
			name: "DC Games",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdc-games.jsdos"
		},
		{
			name: "Doom",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdoom.jsdos"
		},
		{
			name: "Doom II",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdoom-ii.jsdos"
		},
		{
			name: "Double Snake",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdouble-snake.jsdos"
		},
		{
			name: "Drake Snake and the Secret Crypt",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdrake-snake-and-the-secret-crypt.jsdos"
		},
		{
			name: "Duke Nukem 3D",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fduke-nukem-3d.jsdos"
		},
		{
			name: "Dzzee",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fdzzee.jsdos"
		},
		{
			name: "Flappy Bird",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fflappy-bird.jsdos"
		},
		{
			name: "Freak Farm",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Ffreak-farm.jsdos"
		},
		{
			name: "GroundFire",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fground-fire.jsdos"
		},
		{
			name: "HangMan!",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fhang-man.jsdos"
		},
		{
			name: "Kasia",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fkasia.jsdos"
		},
		{
			name: "KBall",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fkball.jsdos"
		},
		{
			name: "Mini Prince",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fmini-prince.jsdos"
		},
		{
			name: "Mortal Kombat",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fmortal-kombat.jsdos"
		},
		{
			name: "Neut Tower",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fneut-tower.jsdos"
		},
		{
			name: "Ninja Blitz",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fninja-blitz.jsdos"
		},
		{
			name: "Ossuary",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fossuary.jsdos"
		},
		{
			name: "Pac-Man",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fpac-man.jsdos"
		},
		{
			name: "Prince of Persia",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fprince-of-persia.jsdos"
		},
		{
			name: "Quake",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fquake.jsdos"
		},
		{
			name: "RCross",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Frcross.jsdos"
		},
		{
			name: "RetroFuel",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fretro-fuel.jsdos"
		},
		{
			name: "Silencer",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fsilencer.jsdos"
		},
		{
			name: "Slip Speed",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fslip-speed.jsdos"
		},
		{
			name: "Snake",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fsnake.jsdos"
		},
		{
			name: "Space Invaders",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fspace-invaders.jsdos"
		},
		{
			name: "Spectre",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fspectre.jsdos"
		},
		{
			name: "Spitball",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fspitball.jsdos"
		},
		{
			name: "Super Roco Bros",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fsuper-roco-bros.jsdos"
		},
		{
			name: "Super Space Fuel Inc.",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fsuper-space-fuel-inc.jsdos"
		},
		{
			name: "Super Street Fighter II Turbo",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fsuper-street-fighter-ii-turbo.jsdos"
		},
		{
			name: "TetraFix",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Ftetrafix.jsdos"
		},
		{
			name: "Tetris",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Ftetris.jsdos"
		},
		{
			name: "The Hunt",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fthe-hunt.jsdos"
		},
		{
			name: "Urthwurm",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Furthwurm.jsdos"
		},
		{
			name: "Wolfenstein 3D",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fwolfenstein-3d.jsdos"
		},
		{
			name: "WorDOS",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fwordos.jsdos"
		},
		{
			name: "X-Men: Children of the Atom",
			path: "embed.html?type=jsdos&src=%2Fdos-games%2Fx-men-children-of-the-atom.jsdos"
		}
	],
	flashGames: [
		{
			name: "1 on 1 Soccer",
			path: "embed.html?type=flash&src=%2Fflash-games%2F1on1-soccer.swf"
		},
		{
			name: "3 Foot Ninja",
			path: "embed.html?type=flash&src=%2Fflash-games%2F3-foot-ninja.swf"
		},
		{
			name: "3 Foot Ninja II",
			path: "embed.html?type=flash&src=%2Fflash-games%2F3-foot-ninja-ii.swf"
		},
		{
			name: "3D Reversi",
			path: "embed.html?type=flash&src=%2Fflash-games%2F3d-reversi.swf"
		},
		{
			name: "3D Tanks",
			path: "embed.html?type=flash&src=%2Fflash-games%2F3d-tanks.swf"
		},
		{
			name: "625 Sandwich Stacker",
			path: "embed.html?type=flash&src=%2Fflash-games%2F625-sandwich-stacker.swf"
		},
		{
			name: "7 Days Without Rain",
			path: "embed.html?type=flash&src=%2Fflash-games%2F7-days-without-rain.swf"
		},
		{
			name: "Abobo's Big Adventure",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fabobos-big-adventure.swf"
		},
		{
			name: "Ace of Space",
			path: "embed.html?type=flash&src=%2Fflash-games%2Face-of-space.swf"
		},
		{
			name: "Achievement Unlocked",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fachievement-unlocked.swf"
		},
		{
			name: "Achievement Unlocked 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fachievement-unlocked-2.swf"
		},
		{
			name: "Achievement Unlocked 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fachievement-unlocked-3.swf"
		},
		{
			name: "Action Driving Game",
			path: "embed.html?type=flash&src=%2Fflash-games%2Faction-driving-game.swf"
		},
		{
			name: "Addiction Solitaire",
			path: "embed.html?type=flash&src=%2Fflash-games%2Faddiction-solitaire.swf"
		},
		{
			name: "Age of War",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fage-of-war.swf"
		},
		{
			name: "Alien Hominid",
			path: "embed.html?type=flash&src=%2Fflash-games%2Falien-hominid.swf"
		},
		{
			name: "Amorphous Plus",
			path: "embed.html?type=flash&src=%2Fflash-games%2Famorphous-plus.swf"
		},
		{
			name: "Apple Shooter",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fapple-shooter.swf"
		},
		{
			name: "Asteroids",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fasteroids.swf"
		},
		{
			name: "Astroflash",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fastroflash.swf"
		},
		{
			name: "Atari Breakout",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fatari-breakout.swf"
		},
		{
			name: "Avalanche",
			path: "embed.html?type=flash&src=%2Fflash-games%2Favalanche.swf"
		},
		{
			name: "Battle Pong",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbattle-pong.swf"
		},
		{
			name: "Battleships",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbattleships.swf"
		},
		{
			name: "Bloons Player Pack 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-2.swf"
		},
		{
			name: "Bloons Player Pack 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-3.swf"
		},
		{
			name: "Bloons Player Pack 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-4.swf"
		},
		{
			name: "Bloons Player Pack 5",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-player-pack-5.swf"
		},
		{
			name: "Bloons Tower Defense",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-tower-defense.swf"
		},
		{
			name: "Bloons Tower Defense 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-tower-defense-2.swf"
		},
		{
			name: "Bloons Tower Defense 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloons-tower-defense-3.swf"
		},
		{
			name: "Bloxorz",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbloxorz.swf"
		},
		{
			name: "Bowman",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbowman.swf"
		},
		{
			name: "Boxhead 2 Play",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fboxhead-2-play.swf"
		},
		{
			name: "Breaking The Bank",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbreaking-the-bank.swf"
		},
		{
			name: "Bubble Shooter",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbubble-shooter.swf"
		},
		{
			name: "Bubble Tanks 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbubble-tanks-2.swf"
		},
		{
			name: "Bubble Trouble",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbubble-trouble.swf"
		},
		{
			name: "Bullet Bill",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fbullet-bill.swf"
		},
		{
			name: "Castle Wars",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcastle-wars.swf"
		},
		{
			name: "Causality",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcausality.swf"
		},
		{
			name: "Champion Archer",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchampion-archer.swf"
		},
		{
			name: "Chasm",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchasm.swf"
		},
		{
			name: "Choose Your Weapon",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchoose-your-weapon.swf"
		},
		{
			name: "Choose Your Weapon 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchoose-your-weapon-2.swf"
		},
		{
			name: "Choose Your Weapon 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchoose-your-weapon-3.swf"
		},
		{
			name: "Choose Your Weapon 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fchoose-your-weapon-4.swf"
		},
		{
			name: "Color Combat",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcolor-combat.swf"
		},
		{
			name: "Color Switch",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcolor-switch.swf"
		},
		{
			name: "Commando",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcommando.swf"
		},
		{
			name: "Connect 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fconnect-4.swf"
		},
		{
			name: "Connect the World",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fconnect-the-world.swf"
		},
		{
			name: "Conquer Antarctica",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fconquer-antarctica.swf"
		},
		{
			name: "Crimson Room",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcrimson-room.swf"
		},
		{
			name: "Cubefield",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcubefield.swf"
		},
		{
			name: "Cursor 10",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcursor-10.swf"
		},
		{
			name: "Cursor Invisible",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcursor-invisible.swf"
		},
		{
			name: "Curveball",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fcurveball.swf"
		},
		{
			name: "Dad n' Me",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fdad-n-me.swf"
		},
		{
			name: "Dr Carter and the Cave of Despair",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fdr-carter-and-the-cave-of-despair.swf"
		},
		{
			name: "Duck Life",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fduck-life.swf"
		},
		{
			name: "Duck Life 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fduck-life-2.swf"
		},
		{
			name: "Duck Life 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fduck-life-3.swf"
		},
		{
			name: "Duck Life 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fduck-life-4.swf"
		},
		{
			name: "Effing Worms",
			path: "embed.html?type=flash&src=%2Fflash-games%2Feffing-worms.swf"
		},
		{
			name: "Eggtastic",
			path: "embed.html?type=flash&src=%2Fflash-games%2Feggtastic.swf"
		},
		{
			name: "Electric Box",
			path: "embed.html?type=flash&src=%2Fflash-games%2Felectric-box.swf"
		},
		{
			name: "Electric Man 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Felectric-man-2.swf"
		},
		{
			name: "Escaping The Prison",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fescaping-the-prison.swf"
		},
		{
			name: "Extinct",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fextinct.swf"
		},
		{
			name: "Factory Balls",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffactory-balls.swf"
		},
		{
			name: "Factory Balls 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffactory-balls-2.swf"
		},
		{
			name: "Factory Balls 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffactory-balls-3.swf"
		},
		{
			name: "Factory Balls 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffactory-balls-4.swf"
		},
		{
			name: "Falldown",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffalldown.swf"
		},
		{
			name: "Falldown 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffalldown2.swf"
		},
		{
			name: "Family Crisis",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffamily-crisis.swf"
		},
		{
			name: "Fancy Pants Adventure",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffancy-pants-adventure.swf"
		},
		{
			name: "Fancy Pants Adventure 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffancy-pants-adventure2.swf"
		},
		{
			name: "Fat Ninja",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffat-ninja.swf"
		},
		{
			name: "Feed Us",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffeed-us.swf"
		},
		{
			name: "Feudalism",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffeudalism.swf"
		},
		{
			name: "Frogger",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ffrogger.swf"
		},
		{
			name: "Galaga",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgalaga.swf"
		},
		{
			name: "Gold Miner",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgold_miner_xploit_machine_edition_2009.swf"
		},
		{
			name: "Gold Miner (Special Edition)",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgold_miner_special_edition.swf"
		},
		{
			name: "Gridlock",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgridlock.swf"
		},
		{
			name: "Gun Mayhem 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgun-mayhem-2.swf"
		},
		{
			name: "Gun Mayhem 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fgun-mayhem-3.swf"
		},
		{
			name: "Hobo",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo.swf"
		},
		{
			name: "Hobo 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-2.swf"
		},
		{
			name: "Hobo 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-3.swf"
		},
		{
			name: "Hobo 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-4.swf"
		},
		{
			name: "Hobo 5",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-5.swf"
		},
		{
			name: "Hobo 6",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-6.swf"
		},
		{
			name: "Hobo 7",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fhobo-7.swf"
		},
		{
			name: "Learn to Fly",
			path: "embed.html?type=flash&src=%2Fflash-games%2Flearn-to-fly.swf"
		},
		{
			name: "Learn to Fly 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Flearn-to-fly-2.swf"
		},
		{
			name: "Line Rider",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fline-rider.swf"
		},
		{
			name: "Mario Combat",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmario-combat.swf"
		},
		{
			name: "Mindfields 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmindfields-2.swf"
		},
		{
			name: "Minecraft Tower Defence 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fminecraft-tower-defence-2.swf"
		},
		{
			name: "Missile Strike",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmissile-strike.swf"
		},
		{
			name: "Monster Brawl",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmonster-brawl.swf"
		},
		{
			name: "Moss",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmoss.swf"
		},
		{
			name: "Multitask",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fmultitask.swf"
		},
		{
			name: "N Game",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fn-game.swf"
		},
		{
			name: "Pac Man",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpac-man.swf"
		},
		{
			name: "Pacman Advanced",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpacman-advanced.swf"
		},
		{
			name: "Pandemic 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpandemic-2.swf"
		},
		{
			name: "Papa's Pizzeria",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpapas-pizzeria.swf"
		},
		{
			name: "Penguin",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpenguin.swf"
		},
		{
			name: "Pico's School",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpicos-school.swf"
		},
		{
			name: "Penguin Diner",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpenguin-diner.swf"
		},
		{
			name: "Plant VS Zombies 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fplant_vs_zombies_2.swf"
		},
		{
			name: "Playing With Fire 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fplaying-with-fire-2.swf"
		},
		{
			name: "Plazma Burst",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fplazma-burst.swf"
		},
		{
			name: "Plumber 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fplumber-2.swf"
		},
		{
			name: "Portal",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fportal.swf"
		},
		{
			name: "Portal 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fportal-2.swf"
		},
		{
			name: "Potty Racers",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpotty-racers.swf"
		},
		{
			name: "Potty Racers 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpotty-racers-2.swf"
		},
		{
			name: "Primary",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fprimary.swf"
		},
		{
			name: "Puzzle Bobble",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fpuzzle-bobble.swf"
		},
		{
			name: "Raft Wars",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fraft-wars.swf"
		},
		{
			name: "Raft Wars 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fraft-wars-2.swf"
		},
		{
			name: "Ragdoll Avalanche",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fragdoll-avalanche.swf"
		},
		{
			name: "Ragdoll Avalanche 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fragdoll-avalanche-2.swf"
		},
		{
			name: "Rage",
			path: "embed.html?type=flash&src=%2Fflash-games%2Frage.swf"
		},
		{
			name: "Rage 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Frage-2.swf"
		},
		{
			name: "Rage 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Frage-3.swf"
		},
		{
			name: "Redbeard",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fredbeard.swf"
		},
		{
			name: "Riddle School",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-school.swf"
		},
		{
			name: "Riddle School 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-school-2.swf"
		},
		{
			name: "Riddle School 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-school-3.swf"
		},
		{
			name: "Riddle School 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-school-4.swf"
		},
		{
			name: "Riddle School 5",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-school-5.swf"
		},
		{
			name: "Riddle Transfer",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-transfer.swf"
		},
		{
			name: "Riddle Transfer 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Friddle-transfer-2.swf"
		},
		{
			name: "Roadblock",
			path: "embed.html?type=flash&src=%2Fflash-games%2Froadblock.swf"
		},
		{
			name: "Roadblock 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Froadblock-2.swf"
		},
		{
			name: "Scary Maze Game",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fscary-maze-game.swf"
		},
		{
			name: "Shanghai Dynasty",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshanghai-dynasty.swf"
		},
		{
			name: "Shift",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshift.swf"
		},
		{
			name: "Shift 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshift-2.swf"
		},
		{
			name: "Shift 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshift-3.swf"
		},
		{
			name: "Shift 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshift-4.swf"
		},
		{
			name: "Shopping Cart Hero",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshopping-cart-hero.swf"
		},
		{
			name: "Shuffle",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fshuffle.swf"
		},
		{
			name: "Skywire",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fskywire.swf"
		},
		{
			name: "Skywire 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fskywire-2.swf"
		},
		{
			name: "Snake",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsnake.swf"
		},
		{
			name: "Snow Storm",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsnow-storm.swf"
		},
		{
			name: "Solitaire",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsolitaire.swf"
		},
		{
			name: "Sonic",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsonic.swf"
		},
		{
			name: "Space Invaders",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fspace-invaders.swf"
		},
		{
			name: "Stick RPG",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fstick-rpg.swf"
		},
		{
			name: "Stupidity Test",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fstupidity-test.swf"
		},
		{
			name: "Super Mario 63",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-63.swf"
		},
		{
			name: "Super Mario Flash",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-flash.swf"
		},
		{
			name: "Super Mario Flash 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-flash-2.swf"
		},
		{
			name: "Super Mario Sunshine 64",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsuper-mario-sunshine-64.swf"
		},
		{
			name: "Super Smash Flash",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fsuper-smash-flash.swf"
		},
		{
			name: "Swords and Sandals",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fswords-and-sandals.swf"
		},
		{
			name: "Swords and Sandals 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fswords-and-sandals-2.swf"
		},
		{
			name: "Tank Trouble 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ftank-trouble-2.swf"
		},
		{
			name: "Tanks",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ftanks.swf"
		},
		{
			name: "Territory War",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fterritory-war.swf"
		},
		{
			name: "Tetris",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ftetris.swf"
		},
		{
			name: "The Battle",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-battle.swf"
		},
		{
			name: "The Bright From The Screen",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-bright-from-the-screen.swf"
		},
		{
			name: "The Classroom",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-classroom.swf"
		},
		{
			name: "The Impossible Game Lite",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-impossible-game-lite.swf"
		},
		{
			name: "The Impossible Quiz",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-impossible-quiz.swf"
		},
		{
			name: "The Impossible Quiz 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-impossible-quiz-2.swf"
		},
		{
			name: "The Last Stand Union City",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthe-last-stand-union-city.swf"
		},
		{
			name: "Thing Thing",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing.swf"
		},
		{
			name: "Thing Thing 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing-2.swf"
		},
		{
			name: "Thing Thing 3",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing-3.swf"
		},
		{
			name: "Thing Thing 4",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing-4.swf"
		},
		{
			name: "Thing Thing Arena",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing-arena.swf"
		},
		{
			name: "Thing Thing Arena 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthing-thing-arena-2.swf"
		},
		{
			name: "This is the Only Level",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fthis-is-the-only-level.swf"
		},
		{
			name: "Tic Tac Toe",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ftic-tac-toe.swf"
		},
		{
			name: "Travelogue Escape",
			path: "embed.html?type=flash&src=%2Fflash-games%2Ftravelogue-escape.swf"
		},
		{
			name: "Ultimate Chess",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fultimate-chess.swf"
		},
		{
			name: "Unfair Mario",
			path: "embed.html?type=flash&src=%2Fflash-games%2Funfair-mario.swf"
		},
		{
			name: "Warp Shot",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fwarp-shot.swf"
		},
		{
			name: "Whack Your PC",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fwhack-your-pc.swf"
		},
		{
			name: "World's Easiest Game",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fworlds-easiest-game.swf"
		},
		{
			name: "World's Hardest Game",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fworlds-hardest-game.swf"
		},
		{
			name: "World's Hardest Game 2",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fworlds-hardest-game-2.swf"
		},
		{
			name: "Yuletide Riptide",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fyuletide-riptide.swf"
		},
		{
			name: "Zombocalypse",
			path: "embed.html?type=flash&src=%2Fflash-games%2Fzombocalypse.swf"
		}
	],
	html5Games: [
		{
			name: "1v1.lol",
			url: "https://1v1.lol/"
		},
		{
			name: "2048",
			path: "html5-games/2048/"
		},
		{
			name: "4 Colors",
			url: "https://storage.y8.com/y8-studio/html5/akeemywka/four_colors_v2/"
		},
		{
			name: "9007199254740992",
			path: "html5-games/9007199254740992/"
		},
		{
			name: "Alien Pyramid Solitaire",
			url: "https://cdn.htmlgames.com/AlienPyramidSolitaire/"
		},
		{
			name: "All Fives Domino",
			url: "https://cdn.htmlgames.com/AllFivesDomino/"
		},
		{
			name: "Among US",
			path: "html5-games/among-us/"
		},
		{
			name: "Appel",
			url: "https://scratch.mit.edu/projects/60917032/embed"
		},
		{
			name: "Ball Fall 3D",
			url: "https://storage.y8.com/y8-studio/unity_webgl/y8games/BallFall3D-2022-b4/index.html"
		},
		{
			name: "Bingo",
			url: "https://cdn.htmlgames.com/Bingo/"
		},
		{
			name: "Bricks Breaker",
			url: "https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/3d3d68da6d5a471e93bab1c3bde01d70/"
		},
		{
			name: "Bubble Burst",
			url: "https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/405c00612981466cbc5d9dcef4214811/"
		},
		{
			name: "Chess",
			url: "https://playpager.com/embed/minichess/index.html"
		},
		{
			name: "Chinese Freecell",
			url: "https://cdn.htmlgames.com/ChineseFreeCell/"
		},
		{
			name: "Cookie Clicker",
			url: "html5-games/cookie-clicker/"
		},
		{
			name: "Coloring Mandalas",
			url: "https://cdn.htmlgames.com/ColoringMandalas/"
		},
		{
			name: "Cut the Rope",
			path: "html5-games/cut-the-rope/"
		},
		{
			name: "Cut the Rope: Time Travel",
			url: "https://embed.gamedistribution.com/?url=https://app-97515.games.s3.yandex.net/97515/u1824c0o9xlk2nm9hlcxtbs4l6ysl44s/index.html"
		},
		{
			name: "Cut the Rope Vivid Edition",
			path: "html5-games/cut-the-rope-vivid-edition/"
		},
		{
			name: "Cut The Rope 2",
			url: "https://embed.gamedistribution.com/?url=https://app-151508.games.s3.yandex.net/151508/jvxf9j9k2sdt71knpwa2f6azsndo6nrw/index.html"
		},
		{
			name: "Dark Mahjong Connect",
			url: "https://cdn.htmlgames.com/DarkMahjongConnect/"
		},
		{
			name: "Death Worm",
			url: "https://embed.gamedistribution.com/?url=https://app-165865.games.s3.yandex.net/165865/g5i92zlftj709k08ejk195g6vimi7ezc/index.html"
		},
		{
			name: "Dogeminer",
			path: "html5-games/dogeminer/"
		},
		{
			name: "Dogeminer 2",
			url: "https://dogeminer2.com/"
		},
		{
			name: "Dominoes",
			path: "html5-games/dominoes/"
		},
		{
			name: "Doodle Jump",
			path: "html5-games/doodle-jump/"
		},
		{
			name: "Dunk Balls",
			url: "https://cdn.htmlgames.com/DunkBalls/"
		},
		{
			name: "Egypt Runes",
			url: "https://cdn.htmlgames.com/EgyptRunes/"
		},
		{
			name: "ev.io",
			url: "https://www.ev.io"
		},
		{
			name: "Flappy Bird",
			path: "html5-games/flappy-bird/"
		},
		{
			name: "Flip 3D",
			url: "https://scratch.mit.edu/projects/430999356/embed"
		},
		{
			name: "Freecell",
			url: "https://cdn.htmlgames.com/Free-cell/"
		},
		{
			name: "Fruit Ninja",
			url: "https://storms.com/games/FruitNinja-WebProtected/"
		},
		{
			name: "Geometry Dash",
			url: "https://scratch.mit.edu/projects/105500895/embed"
		},
		{
			name: "Greedy Shark",
			path: "html5-games/greedy-shark/"
		},
		{
			name: "Happy Wheels",
			url: "https://games-online.io/game/HappyWheels/"
		},
		{
			name: "Hextris",
			path: "html5-games/hextris/"
		},
		{
			name: "Hex Connect",
			url: "https://cdn.htmlgames.com/HexConnect/"
		},
		{
			name: "Hidden Forest",
			url: "https://cdn.htmlgames.com/HiddenForest/"
		},
		{
			name: "House of Cards",
			url: "https://cdn.htmlgames.com/HouseOfCards/"
		},
		{
			name: "Jetpack Joyride",
			url: "https://storms.com/games/JetpackJoyride-WebProtected/"
		},
		{
			name: "hole.io",
			url: "https://hole-io.com"
		},
		{
			name: "Krunker",
			url: "https://krunker.io"
		},
		{
			name: "Ludo",
			url: "https://cdn.htmlgames.com/Ludo/"
		},
		{
			name: "Ludo Dash",
			url: "https://zv1y2i8p.play.gamezop.com/g/SJRX12TXcRH"
		},
		{
			name: "Mahjong Triple Dimensions",
			url: "https://cdn.htmlgames.com/MahjongTripleDimensions/"
		},
		{
			name: "MaZe",
			url: "https://storage.y8.com/y8-studio/html5/akeemywka/maze_v1/index.html"
		},
		{
			name: "Minecraft 2D",
			url: "https://scratch.mit.edu/projects/10128407/embed"
		},
		{
			name: "Minecraft Classic",
			path: "html5-games/minecraft-classic/"
		},
		{
			name: "Minesweeper",
			path: "html5-games/minesweeper/"
		},
		{
			name: "Neon Math",
			url: "https://cdn.htmlgames.com/NeonMath/"
		},
		{
			name: "One Line",
			url: "https://cdn.htmlgames.com/OneLine/"
		},
		{
			name: "Pac-Man",
			url: "https://freepacman.org/"
		},
		{
			name: "Paper Battle",
			url: "https://storage.y8.com/y8-studio/unity/joll/papergame/paper_battle_v20/index.html"
		},
		{
			name: "Pool Master",
			url: "https://zv1y2i8p.play.gamezop.com/g/hgempP8Sc"
		},
		{
			name: "powerline.io",
			url: "https://powerline.io"
		},
		{
			name: "Reversi",
			url: "https://playpager.com/embed/reversi/index.html"
		},
		{
			name: "Run 3",
			url: "https://ubg100.github.io/games/run3"
		},
		{
			name: "Scary Bubbles",
			url: "https://cdn.htmlgames.com/ScaryBubbles/"
		},
		{
			name: "Shadow Fighters",
			url: "https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/49cb67eea34644a1afafea2970eaead1/"
		},
		{
			name: "Shell Shockers",
			url: "https://shellshock.io/"
		},
		{
			name: "Ski Slalom",
			url: "https://cdn.htmlgames.com/SkiSlalom/"
		},
		{
			name: "Skydom",
			url: "https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/ae10263247c44278b33c845ff1c2df80/"
		},
		{
			name: "slither.io",
			url: "https://slither.io"
		},
		{
			name: "Slope",
			url: "https://storage.y8.com/y8-studio/unity_webgl/bitlaslt/slope_v_1_2_5/index.html"
		},
		{
			name: "snake.io",
			url: "https://snake.io"
		},
		{
			name: "Solitaire",
			path: "html5-games/solitaire/"
		},
		{
			name: "Space Blaze",
			url: "https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/a1c4858cc2db451bb97c8e926257b49a/"
		},
		{
			name: "Space Blast",
			url: "https://cdn.htmlgames.com/SpaceBlast/"
		},
		{
			name: "Squid Game",
			url: "https://squad-game.vakhtangi1980.repl.co/"
		},
		{
			name: "Surf",
			path: "html5-games/surf/"
		},
		{
			name: "T-Rex Run",
			path: "html5-games/chromedino/"
		},
		{
			name: "T-Rex Run 3D",
			path: "html5-games/chromedino-3d/"
		},
		{
			name: "Temple Run 2",
			path: "html5-games/temple-run-2/"
		},
		{
			name: "Tic Tac Toe",
			url: "https://zv1y2i8p.play.gamezop.com/g/H1WmafkP9JQ"
		},
		{
			name: "Tetris",
			path: "html5-games/tetris/"
		},
		{
			name: "Triple Connect",
			url: "https://cdn.htmlgames.com/TripleConnect/"
		},
		{
			name: "Tunnel Rush",
			path: "html5-games/tunnel-rush/"
		},
		{
			name: "Uno",
			url: "https://embed.gamedistribution.com/?url=https://app-177799.games.s3.yandex.net/177799/d7a35e57hl874np745ncsvajwen2ges9/index.html"
		},
		{
			name: "venge.io",
			url: "https://venge.io"
		},
		{
			name: "Vex 3",
			path: "html5-games/vex3/"
		},
		{
			name: "Vex 4",
			path: "html5-games/vex4/"
		},
		{
			name: "Vex 5",
			path: "html5-games/vex5/"
		},
		{
			name: "Vex 6",
			path: "html5-games/vex6/"
		},
		{
			name: "voxiom.io",
			url: "https://voxiom.io"
		},
		{
			name: "wings.io",
			url: "https://wings.io"
		},
		{
			name: "Zombie Killer",
			url: "https://embed.gamedistribution.com/?url=https://app-158693.games.s3.yandex.net/158693/2289i4hez4nkfqyo31x4l2jr4mq2lx0u/index.html"
		},
		{
			name: "zombsroyale.io",
			url: "https://zombsroyale.io"
		}
	]
};

export default contents;