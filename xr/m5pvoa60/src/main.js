var _ = require('./overrides');
var u = require('./utils');
var extensions = require('./extensions');
var cfg = require('./config');
var data = require('./data');

/**
 * Game code
 */
var game = new Phaser.Game(cfg.GAME_WIDTH, cfg.GAME_HEIGHT, Phaser.CANVAS, cfg.DOM_PARENT);

var Main = {};

var preloadbar, loaded, menubackground, logo, occluder, map, tileset, surface, background, backbackground,
    player, goal, clouds, items, backgroundItems, blocks, theme, musicdone, transitioning, gotoNext, isDone,
    sfx = {}, elemEmitters = {},
    cursors, elemButton, acquireButton, dropButton;

function boot() {
    /**
     * Custom configuration
     */
    game.physics.collideSpriteVsTilemapLayer = extensions.createSlopedTilemapCollider(
        cfg.UPWARD_SLOPE_TILES,
        cfg.DOWNWARD_SLOPE_TILES);

    game.input.maxPointers = 1;

    /**
     * Initialize the game states
     */
    Main.boot = function() {
    };

    Main.boot.prototype = {
        preload: function() {
            game.load.image('preloadbar', 'assets/images/preloadbar.png');
        },
        create: function() {
            game.state.start('preloader');
        }
    };
    game.state.add('boot', Main.boot, false);

    Main.preloader = function() {
    };

    Main.preloader.prototype = {
        preload: function() {
            preloadbar = game.add.sprite(0, 0, 'preloadbar');
            // Center the preload bar
            preloadbar.x = (cfg.GAME_WIDTH - preloadbar.width) / 2;
            preloadbar.y = (cfg.GAME_HEIGHT / 2) - preloadbar.height / 2;

            game.load.setPreloadSprite(preloadbar);
            preload();
        },
        create: function() {
            preloadbar.crop.width = preloadbar.width;

            var tween = game.add.tween(preloadbar).to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
            tween.onComplete.addOnce(function() {
                game.state.start('mainmenu');
            });
        }
    };
    game.state.add('preloader', Main.preloader, false);

    Main.mainmenu = function() {
    };

    Main.mainmenu.prototype = {
        create: function() {
            game.level = 'mainmenu';

            theme = game.add.audio('theme');
            theme.play('', 0, 0.3, true);

            menubackground = game.add.sprite(0, 0, 'menubackground');
            menubackground.alpha = 0;

            logo = game.add.text(game.world.centerX, game.world.centerY - 150, 'ELEMENTAL ONE', {
                font: '45px "minecraftiaregular"',
                fill: 'slategray',
                align: 'center'
            });
            logo.anchor.setTo(0.5, 0.5);

            var startText = game.add.text(game.world.centerX, game.world.centerY + 200, 'press enter', {
                font: '25px "minecraftiaregular"',
                fill: 'black',
                align: 'center'
            });
            startText.anchor.setTo(0.5, 0.5);
            game.add.tween(startText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, Infinity, true);

            game.add.tween(menubackground).to({ alpha: 1 }, 2000, Phaser.Easing.Quadratic.Out, true);

            // Setup dancing player
            addPlayer(data.mainmenu.player.x, data.mainmenu.player.y);
            player.body.gravity.y = 0;
            player.animations.play('walk');
            player.alpha = 0;
            game.add.tween(player).to({ alpha: 1 }, 2000, Phaser.Easing.Quadratic.Out, true);
            var ptween = game.add.tween(player).to({ x: player.x - 80 }, 1350, Phaser.Easing.Linear.None, true, 0, Infinity, true);
            ptween.onComplete.add(function() {
                player.scale.x *= -1;
            });

            var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            key.onDown.addOnce(function() {
                game.add.tween(player).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                game.add.tween(logo).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                var tween = game.add.tween(menubackground).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

                tween.onComplete.addOnce(function() {
                    game.state.start('level1');
                });
            });
        }
    };
    game.state.add('mainmenu', Main.mainmenu, false);

    Main.Levels = {};
    Object.keys(data.levels).forEach(function(level) {
        Main.Levels[level] = function() {
        };
        Main.Levels[level].prototype = {
            create: function() {
                game.level = level;
                game.nextState = data.levels[level].nextState;
                create();
            },
            update: update,
            render: render
        };

        game.state.add(level, Main.Levels[level], false);
    });

    game.state.start('boot');
}

function preload() {
    if (loaded) {
        return;
    }

    game.load.image('menubackground', 'assets/images/menubackground.png');
    game.load.image('occluder', 'assets/images/occluder.png');

    game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level3', 'assets/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level4', 'assets/tilemaps/level4.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('tiles', 'assets/tilesets/tiles_spritesheet.png', cfg.TILE_WIDTH, cfg.TILE_HEIGHT);

    game.load.atlas('p1', 'assets/sprites/p1_spritesheet.png', 'assets/sprites/p1_spritesheet.json');

    game.load.atlasXML('items', 'assets/sprites/items_spritesheet.png', 'assets/sprites/items_spritesheet.xml');
    game.load.spritesheet('blocks', 'assets/tilesets/tiles_spritesheet.png', cfg.TILE_WIDTH, cfg.TILE_HEIGHT);
    game.load.atlasXML('particles', 'assets/sprites/particles.png', 'assets/sprites/particles.xml');

    game.load.audio('theme', ['assets/sounds/happy.mp3', 'assets/sounds/happy.ogg'], true);

    game.load.audio('jumpsound', 'assets/sounds/jump.wav', true);
    game.load.audio('pickupsound', 'assets/sounds/pickup.wav', true);
    game.load.audio('airsound', 'assets/sounds/air.wav', true);
    game.load.audio('watersound', 'assets/sounds/water.wav', true);
    game.load.audio('earthsound', 'assets/sounds/earth.wav', true);
    game.load.audio('firesound', 'assets/sounds/fire.wav', true);

    loaded = true;
}

function create() {
    game.stage.backgroundColor = data.levels[game.level].background;

    createAudio();

    map = game.add.tilemap(game.level);
    tileset = game.add.tileset('tiles');

    // Set tiles to collide on all four sides
    tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
    tileset.tiles.forEach(function(t) {
        t.enableMaxOverlapCheck = true;
    });

    // Set tile collisions
    cfg.FLOATING_TILES.forEach(function(tile) {
        var t = tileset.getTile(tile);
        t.setCollision(false, false, true, false);
    });
    cfg.UPWARD_SLOPE_TILES.forEach(function(tile) {
        var t = tileset.getTile(tile);
        t.setCollision(false, false, true, false);
        t.enableMaxOverlapCheck = false;
    });
    cfg.DOWNWARD_SLOPE_TILES.forEach(function(tile) {
        var t = tileset.getTile(tile);
        t.setCollision(false, false, true, false);
        t.enableMaxOverlapCheck = false;
    });
    cfg.BACKGROUND_TILES.forEach(function(tile) {
        tileset.setCollision(tile, false, false, false, false);
    });

    createClouds();

    // Layer 2 is the surface, layers 1 and 0 are the background
    backbackground = game.add.tilemapLayer(0, 0, cfg.GAME_WIDTH, cfg.GAME_HEIGHT, tileset, map, 0);
    background = game.add.tilemapLayer(0, 0, cfg.GAME_WIDTH, cfg.GAME_HEIGHT, tileset, map, 1);
    surface = game.add.tilemapLayer(0, 0, cfg.GAME_WIDTH, cfg.GAME_HEIGHT, tileset, map, 2);
    surface.resizeWorld();

    createBlocks();
    createBackgroundItems();
    createHelpText();
    addGoal();
    addPlayer();
    createItems();
    createEmitters();

    // Create occluder - must be done last
    occluder = game.add.sprite(player.x, player.y, 'occluder');
    occluder.anchor.setTo(0.5, 0.5);
    occluder.scale.setTo(10, 10);

    game.add.tween(occluder).to({ alpha: 0 }, cfg.LEVEL_FADEIN_TIME, Phaser.Easing.Linear.None, true);

    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

    cursors = game.input.keyboard.createCursorKeys();
    elemButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    acquireButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    dropButton = game.input.keyboard.addKey(Phaser.Keyboard.X);

    transitioning = false;
}

function createAudio() {
    // Avoid recreating the music
    if (musicdone) {
        return;
    }

    // Add sfx
    ['jumpsound', 'pickupsound'].forEach(function(s) {
        sfx[s] = game.add.audio(s);
    });
    ['airsound', 'watersound', 'earthsound', 'firesound'].forEach(function(s) {
        sfx[s] = game.add.audio(s, 1, true);
    });

    musicdone = true;
}

function createClouds() {
    if (data.levels[game.level].clouds) {
        clouds = game.add.group();
        u.range(10).forEach(function() {
            var offset = cfg.CLOUD_MOVE_OFFSET * game.rnd.realInRange(0.8, 1.2);
            var c = clouds.create(game.rnd.integerInRange(0, data.levels[game.level].width), game.rnd.integerInRange(0, data.levels[game.level].height), 'items');
            c.animations.add('cloud', [game.rnd.pick(['cloud1.png', 'cloud2.png', 'cloud3.png'])], 1, false, false);
            c.animations.play('cloud');
            game.add.tween(c).to({ x: c.x - offset }, cfg.CLOUD_MOVE_TIME, Phaser.Easing.Linear.None)
                             .to({ x: c.x - offset - 100 }, 3000, Phaser.Easing.Quadratic.Out)
                             .to({ x: c.x - offset }, 3000, Phaser.Easing.Quadratic.In)
                             .to({ x: c.x + offset }, cfg.CLOUD_MOVE_TIME, Phaser.Easing.Linear.None)
                             .to({ x: c.x + offset + 100 }, 3000, Phaser.Easing.Quadratic.Out)
                             .to({ x: c.x + offset }, 3000, Phaser.Easing.Quadratic.In)
                             .loop().start();
        });
    }
}

function createBlocks() {
    blocks = game.add.group();
    createLevelElements(data.levels[game.level].blocks, blocks, 'blocks');
}

function createBackgroundItems() {
    backgroundItems = game.add.group();
    createLevelElements(data.levels[game.level].backgroundItems, backgroundItems, 'items');
}

function createHelpText() {
    if (data.levels[game.level].text) {
        data.levels[game.level].text.forEach(function(text) {
            var t = game.add.text(text.x, text.y, text.msg, text.style);
            t.anchor.setTo(0.5, 0.5);
        });
    }
}

function createItems() {
    items = game.add.group();
    createLevelElements(data.levels[game.level].items, items, 'items');
}

function createLevelElements(elems, group, type) {
    var addLevelElement = function(el) {
        var e = group.create(el.x, el.y, type, el.frameName || el.frameId);
        e.elemType = el.elemType;

        e.body.allowGravity = !el.noGravity;
        e.body.gravity.y = cfg.ELEM_GRAVITY;
        e.body.collideWorldBounds = true;

        if (el.body) {
            e.body.setSize(el.body.width || e.body.sourceWidth,
                           el.body.height || e.body.sourceHeight,
                           el.body.x || e.body.offset.x,
                           el.body.y || e.body.offset.y);
            e.body.immovable = el.body.immovable || e.body.immovable;
            e.body.gravity.y = el.body.gravity || cfg.ELEM_GRAVITY;
        }

        if (el.props) {
            for (var prop in el.props) {
                if (el.props.hasOwnProperty(prop)) {
                    e[prop] = el.props[prop];
                }
            }
        }

        if (el.tween) {
            var tween = game.add.tween(e);
            el.tween.forEach(function(t) {
                tween = tween.to({ x: e.x + t.x, y: e.y + t.y }, t.duration, t.easing);
            });
            if (el.tweenLoop) {
                tween.loop();
            }
            tween.start();
        }
    };

    elems.forEach(addLevelElement);
}

function createEmitters() {
    data.levels[game.level].elements.forEach(function(elem) {
        var emitter = game.add.emitter(0, 0, cfg.MAX_PARTICLES);
        emitter.element = elem.element;
        emitter.makeParticles('particles', [elem.frameName], elem.num, true, true);

        emitter.gravity = elem.gravity || emitter.gravity;
        emitter.lifespan = elem.lifespan || emitter.lifespan;

        if (elem.particleScale) {
            emitter.minParticleScale = elem.particleScale.min;
            emitter.maxParticleScale = elem.particleScale.max;
        }
        if (elem.angularVel) {
            emitter.setRotation(elem.angularVel.min, elem.angularVel.max);
        }
        if (elem.speedX) {
            emitter.setXSpeed(elem.speedX.min, elem.speedX.max);
        }
        if (elem.speedY) {
            emitter.setYSpeed(elem.speedY.min, elem.speedY.max);
        }

        // Make sure that all particles start as "dead"
        emitter.forEach(function(child) {
            child.kill();
        });

        elemEmitters[elem.element] = emitter;
    });
}

function addPlayer(x, y) {
    x = x || data.levels[game.level].player.x;
    y = y || data.levels[game.level].player.y;

    player = game.add.sprite(x, y, 'p1');
    player.body.collideWorldBounds = true;
    player.body.blockable = true;
    player.body.gravity.y = cfg.GRAVITY;
    player.body.setSize(cfg.PLAYER_BOUND_WIDTH, cfg.PLAYER_BOUND_HEIGHT, 0, cfg.PLAYER_BOUND_H_OFFSET);

    player.anchor.setTo(0.5, 0.5);

    // Animations are used for still frames as well, for convenience
    player.animations.add('stand', ['p1_stand'], 1, false, false);
    player.animations.add('use', ['p1_use'], 1, false, false);
    player.animations.add('duck', ['p1_duck'], 1, false, false);
    player.animations.add('hurt', ['p1_hurt'], 1, false, false);
    player.animations.add('jump', ['p1_jump'], 1, false, false);
    player.animations.add('front', ['p1_front'], 1, false, false);
    player.animations.add('walk',
        Phaser.Animation.generateFrameNames('p1_walk', 1, 11, '', 2), 15, true, false);

    player.animations.play('stand');

}

function addGoal() {
    if (data.levels[game.level].goal) {
        var g = data.levels[game.level].goal;
        goal = game.add.sprite(g.x, g.y, 'blocks', cfg.GOAL_TILE);
        goal.slow = g.slow;

        if (g.width) {
            goal.width = g.width;
        }
        goal.alpha = 0;
    }
}

function update() {
    // The sprite positions get completely messed up if we try to change game
    // state while inside of the tween's onComplete handler (a setTimeout doesn't
    // help either - appears to be some kind of race condition?), so we use this
    // flag to catch it on the next cycle of the update loop
    if (gotoNext) {
        gotoNext = false;

        if (game.nextState) {
            // Transition to next level (or state)
            game.state.start(game.nextState);
        } else {
            isDone = true;

            // Show end screen
            game.stage.backgroundColor = 'black';
            var youwin = game.add.text(
                game.camera.view.x + game.camera.view.width / 2,
                game.camera.view.y + game.camera.view.height / 2,
                'YOU WIN!',
                {
                    font: '45px "minecraftiaregular"',
                    fill: 'white',
                    align: 'center'
                }
            );

            youwin.anchor.setTo(0.5, 0.5);
            youwin.alpha = 0;

            var tween = game.add.tween(youwin).to({ alpha: 1 }, 2000, Phaser.Easing.Quadratic.Out, true);
            tween.onComplete.addOnce(function() {
                var theend = game.add.text(
                    game.camera.view.x + game.camera.view.width / 2,
                    game.camera.view.y + game.camera.view.height / 2 + 60,
                    'THE END',
                    {
                        font: '25px "minecraftiaregular"',
                        fill: 'white',
                        align: 'center'
                    }
                );

                theend.anchor.setTo(0.5, 0.5);
                theend.alpha = 0;

                game.add.tween(theend).to({ alpha: 1 }, 2000, Phaser.Easing.Quadratic.Out, true);
            });
        }
    }

    var emitter = elemEmitters[player.element] || null;

    // Collisions
    game.physics.overlap(player, goal, function() {
        if (!transitioning && !isDone) {
            transitioning = true;
            occluder.x = player.x;
            occluder.y = player.y;

            var fadeTime = goal.slow ? cfg.LEVEL_FADEOUT_TIME * 5 : cfg.LEVEL_FADEOUT_TIME;

            var tween = game.add.tween(occluder).to({ alpha: 1 }, fadeTime, Phaser.Easing.Linear.None);
            tween.onComplete.addOnce(function() {
                gotoNext = true;
            });
            tween.start();
        }
    });
    game.physics.collide(player, surface);
    game.physics.collide(player, blocks);
    game.physics.collide(items, surface);
    game.physics.collide(blocks, surface);
    game.physics.collide(blocks, blocks);

    // Hack done because changing state fails completely on the last level,
    // so we have to add the finishing screen over the level, but we still
    // need collisions, so we put this halfway
    if (isDone) {
        // Fade out background music
        theme.volume = Math.max(theme.volume - cfg.MUSIC_FADE_INCR, 0);
        if (theme.volume == 0) {
            theme.stop();
        }
        return;
    }

    if (emitter) {
        game.physics.collide(emitter, surface);

        game.physics.overlap(emitter, blocks, function(particle, block) {
            if (block.collideParticle) {
                block.collideParticle(particle, block);
            }
            block.isDisappearing = true;
            block.lifespan = cfg.ITEM_FADE_TIME;
        }, function(particle, block) {
            if (block.isDisappearing) {
                return false;
            }
            if (block.checkCollideParticle) {
                return block.checkCollideParticle(particle, block);
            }
            return false;
        });

        // Fade out particles as time goes on
        emitter.forEachAlive(function(p) {
            p.alpha = p.lifespan / emitter.lifespan;
        });

        if (player.elementWasDropped && emitter.countLiving() === 0) {
            player.element = null;
            player.elementWasDropped = false;
        }
    }


    // Reset player movement if touching ground
    // Otherwise, mark as airborne (when player hasn't jumped, but falls)
    if (player.body.touching.down) {
        player.body.velocity.x = 0;
        if (player.airborne !== false) {
            player.animations.play('stand');
            player.facing = 'idle';
            player.airborne = false;
        }
    } else {
        player.airborne = true;
    }

    // Movement detection
    if (cursors.left.isDown) {
        player.body.velocity.x = -cfg.MOVEMENT_VEL;
        if (player.facing !== 'left') {
            if (!player.airborne) {
                player.animations.play('walk');
            }
            player.facing = 'left';
            player.flipped = true;
        }
    } else if (cursors.right.isDown) {
        player.body.velocity.x = cfg.MOVEMENT_VEL;
        if (player.facing !== 'right') {
            if (!player.airborne) {
                player.animations.play('walk');
            }
            player.facing = 'right';
            player.flipped = false;
        }
    } else if (cursors.down.isDown) {
        player.body.velocity.x = 0;
        if (player.facing !== 'down') {
            if (!player.airborne) {
                player.animations.play('duck');
            }
            player.facing = 'down';
        }
    } else if (!player.airborne) {
        if (player.facing !== 'idle') {
            player.animations.play('stand');
            player.facing = 'idle';
        }
    }

    // Jump detection
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -cfg.JUMP_VEL;
        player.animations.play('jump');
        player.airborne = true;
        sfx.jumpsound.play('', 0, 0.3);
    }


    // Detect item acquisition
    if (acquireButton.isDown) {
        game.physics.overlap(player, items, function(player, item) {
            player.currentItem = item;
            if (item.acquire) {
                item.acquire(player, item);
            }
            item.isBeingAcquired = true;
            item.lifespan = cfg.ITEM_FADE_TIME;
            sfx.pickupsound.play('', 0.6);
        }, function(player, item) {
            if (item.isBeingAcquired) {
                return false;
            }
            if (item.checkAcquirable) {
                return item.checkAcquirable(player, item);
            }
            return false;
        });
    }

    // Detect item drop
    if (dropButton.isDown && player.currentItem && player.currentItem.lifespan <= 0) {
        player.currentItem.revive();
        player.currentItem.isBeingAcquired = false;
        player.currentItem.alpha = 1;
        player.currentItem.body.x = player.body.x;
        player.currentItem.body.y = player.body.y + cfg.ITEM_ACQUIRE_OFFSET;
        player.currentItem.body.velocity.setTo(0, cfg.ITEM_DROP_VEL);

        if (player.currentItem.drop) {
            player.currentItem.drop(player, player.currentItem);
        }
        player.currentItem = null;
    }

    // Item fading
    items.forEachAlive(function(i) {
        if (i.isBeingAcquired) {
            // Fade with quadratic easing
            var t = (cfg.ITEM_FADE_TIME - i.lifespan) / cfg.ITEM_FADE_TIME;
            i.alpha = -1 * t * t + 1;

            // Move toward player
            game.physics.moveToXY(i, player.body.x, player.body.y + cfg.ITEM_ACQUIRE_OFFSET, null, i.lifespan);
        }
    });

    // Block fading
    blocks.forEachAlive(function(b) {
        if (b.isDisappearing) {
            b.alpha = b.lifespan / cfg.BLOCK_FADE_TIME;
        }
    });


    // Elemental emission
    if (emitter) {
        if (player.hasElement && elemButton.isDown && player.facing === 'idle' && !player.airborne) {

            // Setup emitter properties if the player is starting to fire
            if (!player.isFiring) {
                player.animations.play('use');

                // Flip the position if needed
                if (!player.flipped) {
                    emitter.emitX = player.x + cfg.PARTICLE_X_OFFSET;
                    emitter.emitY = player.y + cfg.PARTICLE_Y_OFFSET;

                    emitter.flipped = false;
                } else {
                    emitter.emitX = player.x - cfg.PARTICLE_X_OFFSET;
                    emitter.emitY = player.y + cfg.PARTICLE_Y_OFFSET;

                    emitter.flipped = true;
                }
            }
            player.isFiring = true;

            if (!sfx[player.element + 'sound'].isPlaying) {
                sfx[player.element + 'sound'].play();
            }

            emitter.emitParticle();
        } else {
            if (player.isFiring && player.facing === 'idle' && !player.airborne) {
                player.animations.play('stand');
            }
            player.isFiring = false;

            if (player.element && sfx[player.element + 'sound'].isPlaying) {
                sfx[player.element + 'sound'].stop();
            }
        }
    }

    // Flip player sprite
    if (player.flipped) {
        player.scale.x = -1;
    } else {
        player.scale.x = 1;
    }
}

function render() {
}

window.onload = boot;
