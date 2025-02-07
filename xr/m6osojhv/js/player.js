//global player variables for use in matter.js physics
let player, jumpSensor, playerBody, playerHead, headSensor;

// player Object Prototype *********************************************
const m = {
    spawn() {
        //load player in matter.js physic engine
        // let vector = Vertices.fromPath("0 40  50 40   50 115   0 115   30 130   20 130"); //player as a series of vertices
        let vertices = Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"); //player as a series of vertices
        playerBody = Bodies.fromVertices(0, 0, vertices);
        jumpSensor = Bodies.rectangle(0, 46, 36, 6, {       //(0, 46, 50, 6, { //for wall jumping
            //this sensor check if the player is on the ground to enable jumping
            sleepThreshold: 99999999999,
            isSensor: true
        });
        vertices = Vertices.fromPath("16 -82  2 -66  2 -37  43 -37  43 -66  30 -82");
        playerHead = Bodies.fromVertices(0, -55, vertices); //this part of the player lowers on crouch
        headSensor = Bodies.rectangle(0, -57, 48, 45, {
            //senses if the player's head is empty and can return after crouching
            sleepThreshold: 99999999999,
            isSensor: true
        });
        player = Body.create({
            //combine jumpSensor and playerBody
            parts: [playerBody, playerHead, jumpSensor, headSensor],
            inertia: Infinity, //prevents player rotation
            friction: 0.002,
            frictionAir: 0.001,
            //frictionStatic: 0.5,
            restitution: 0,
            sleepThreshold: Infinity,
            collisionFilter: {
                group: 0,
                category: cat.player,
                mask: cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield
            },
            // death() {
            //     m.death();
            // }
        });
        Matter.Body.setMass(player, m.mass);
        Composite.add(engine.world, [player]);
    },
    cycle: 600, //starts at 600 cycles instead of 0 to prevent bugs with m.history
    lastKillCycle: 0,
    lastHarmCycle: 0,
    width: 50,
    radius: 30,
    eyeFillColor: null,
    fillColor: null, //set by setFillColors
    fillColorDark: null, //set by setFillColors
    bodyGradient: null, //set by setFillColors
    color: {
        hue: 0,
        sat: 0,
        light: 100,
    },
    setFillColors() {
        m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
        m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 25}%)`
        let grd = ctx.createLinearGradient(-30, 0, 30, 0);
        grd.addColorStop(0, m.fillColorDark);
        grd.addColorStop(1, m.fillColor);
        m.bodyGradient = grd
    },
    // setFillColorsAlpha(alpha = 0.5) {
    //     m.fillColor = `hsla(${m.color.hue},${m.color.sat}%,${m.color.light}%,${alpha})`
    //     m.fillColorDark = `hsla(${m.color.hue},${m.color.sat}%,${m.color.light - 25}%,${alpha})`
    //     let grd = ctx.createLinearGradient(-30, 0, 30, 0);
    //     grd.addColorStop(0, m.fillColorDark);
    //     grd.addColorStop(1, m.fillColor);
    //     m.bodyGradient = grd
    // },
    height: 42,
    yOffWhen: {
        crouch: 22,
        stand: 49,
        jump: 70
    },
    defaultMass: 5,
    mass: 5,
    FxNotHolding: 0.015,
    Fx: 0.016, //run Force on ground //
    jumpForce: 0.42,
    setMovement() {
        // console.log(player.mass)
        // m.FxAir = 0.4 / mass / mass 
        m.Fx = tech.baseFx * m.fieldFx * m.squirrelFx * (tech.isFastTime ? 1.5 : 1) / player.mass //base player mass is 5
        m.jumpForce = tech.baseJumpForce * m.fieldJump * m.squirrelJump * (tech.isFastTime ? 1.13 : 1) / player.mass / player.mass //base player mass is 5
    },
    FxAir: 0.016, // 0.4/5/5  run Force in Air
    yOff: 70,
    yOffGoal: 70,
    onGround: false, //checks if on ground or in air
    lastOnGroundCycle: 0, //use to calculate coyote time
    coyoteCycles: 5,
    hardLanding: 130,
    squirrelFx: 1,
    squirrelJump: 1,
    velocitySmooth: { x: 0, y: 0 },//use for drawing skin's velocity gel tail
    standingOn: undefined,
    numTouching: 0,
    crouch: false,
    // isHeadClear: true,
    spawnPos: {
        x: 0,
        y: 0
    },
    spawnVel: {
        x: 0,
        y: 0
    },
    pos: {
        x: 0,
        y: 0
    },
    yPosDifference: 24.2859, //player.position.y - m.pos.y  //24.285923217549026
    // yPosDifferenceCrouched: -2.7140767824453604,
    Sy: 0, //adds a smoothing effect to vertical only
    Vx: 0,
    Vy: 0,
    friction: {
        ground: 0.01,
        air: 0.0025
    },
    airSpeedLimit: 125, // 125/mass/mass = 5
    angle: 0,
    walk_cycle: 0,
    stepSize: 0,
    flipLegs: -1,
    hip: {
        x: 12,
        y: 24
    },
    knee: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0
    },
    foot: {
        x: 0,
        y: 0
    },
    legLength1: 55,
    legLength2: 45,
    transX: 0,
    transY: 0,
    history: new Array(600), //[], //tracks the last second of player position
    rewindCount: 0, //used with CPT
    resetHistory() {
        const set = {
            position: {
                x: player.position.x,
                y: player.position.y,
            },
            velocity: {
                x: player.velocity.x,
                y: player.velocity.y
            },
            yOff: m.yOff,
            angle: m.angle,
            health: m.health,
            energy: m.energy,
            activeGun: b.activeGun
        }
        for (let i = 0; i < 600; i++) { //reset history
            m.history[i] = set
        }
    },
    move() {
        m.pos.x = player.position.x;
        m.pos.y = playerBody.position.y - m.yOff;
        m.Vx = player.velocity.x;
        m.Vy = player.velocity.y;

        //tracks the last 10s of player information
        m.history.splice(m.cycle % 600, 1, {
            position: {
                x: player.position.x,
                y: player.position.y,
            },
            velocity: {
                x: player.velocity.x,
                y: player.velocity.y
            },
            yOff: m.yOff,
            angle: m.angle,
            health: m.health,
            energy: m.energy,
            activeGun: b.activeGun
        });
        // const back = 59  // 59 looks at 1 second ago //29 looks at 1/2 a second ago
        // historyIndex = (m.cycle - back) % 600
    },
    transSmoothX: 0,
    transSmoothY: 0,
    lastGroundedPositionY: 0,
    // mouseZoom: 0,
    lookSmoothing: 0.07, //1 is instant jerky,  0.001 is slow smooth zoom, 0.07 is standard
    look() { }, //set to lookDefault()
    lookDefault() {
        //always on mouse look
        m.angle = Math.atan2(simulation.mouseInGame.y - m.pos.y, simulation.mouseInGame.x - m.pos.x);
        //smoothed mouse look translations
        const scale = 0.8;
        m.transSmoothX = canvas.width2 - m.pos.x - (simulation.mouse.x - canvas.width2) * scale
        m.transSmoothY = canvas.height2 - m.pos.y - (simulation.mouse.y - canvas.height2) * scale

        m.transX += (m.transSmoothX - m.transX) * m.lookSmoothing;
        m.transY += (m.transSmoothY - m.transY) * m.lookSmoothing;
    },
    doCrouch() {
        if (!m.crouch) {
            m.crouch = true;
            m.yOffGoal = m.yOffWhen.crouch;
            if ((playerHead.position.y - player.position.y) < 0) {
                Matter.Body.setPosition(playerHead, { x: player.position.x, y: player.position.y + 9.1740767 })
            }
        }
    },
    undoCrouch() {
        if (m.crouch) {
            m.crouch = false;
            m.yOffGoal = m.yOffWhen.stand;
            if ((playerHead.position.y - player.position.y) > 0) {
                Matter.Body.setPosition(playerHead, { x: player.position.x, y: player.position.y - 30.28592321 })
            }
        }
    },
    hardLandCD: 0,
    hardLandCDScale: 1,
    checkHeadClear() {
        if (Matter.Query.collides(headSensor, map).length > 0) {
            return false
        } else {
            return true
        }
    },
    buttonCD_jump: 0, //cool down for player buttons
    jump() {
        m.buttonCD_jump = m.cycle; //can't jump again until 20 cycles pass
        //apply a fraction of the jump force to the body the player is jumping off of
        Matter.Body.applyForce(m.standingOn, m.pos, { x: 0, y: m.jumpForce * 0.12 * Math.min(m.standingOn.mass, 5) });
        player.force.y = -m.jumpForce; //player jump force
        Matter.Body.setVelocity(player, { //zero player y-velocity for consistent jumps
            x: player.velocity.x,
            y: Math.max(-10, Math.min(m.standingOn.velocity.y, 10)) //cap velocity contribution from blocks you are standing on to 10 in the vertical
        });
    },
    moverX: 0, //used to tell the player about moving platform x velocity
    groundControl() {
        //check for crouch or jump
        if (m.crouch) {
            if (!(input.down) && m.checkHeadClear() && m.hardLandCD < m.cycle) m.undoCrouch();
        } else if (input.down || m.hardLandCD > m.cycle) {
            m.doCrouch(); //on ground && not crouched and pressing s or down
        } else if (input.up && m.buttonCD_jump + 20 < m.cycle) {
            m.jump()
        }
        const moveX = player.velocity.x - m.moverX //account for mover platforms
        if (input.left) {
            if (moveX > -2) {
                player.force.x -= m.Fx * 1.5
            } else {
                player.force.x -= m.Fx
            }
            // }
        } else if (input.right) {
            if (moveX < 2) {
                player.force.x += m.Fx * 1.5
            } else {
                player.force.x += m.Fx
            }
        } else {
            const stoppingFriction = 0.92; //come to a stop if no move key is pressed
            Matter.Body.setVelocity(player, { x: m.moverX * 0.08 + player.velocity.x * stoppingFriction, y: player.velocity.y * stoppingFriction });
        }

        if (Math.abs(moveX) > 4) { //come to a stop if fast     // if (player.speed > 4) { //come to a stop if fast 
            const stoppingFriction = (m.crouch) ? 0.65 : 0.89; // this controls speed when crouched
            Matter.Body.setVelocity(player, { x: m.moverX * (1 - stoppingFriction) + player.velocity.x * stoppingFriction, y: player.velocity.y * stoppingFriction });
        }
        m.moverX = 0 //reset the level mover offset
    },
    airControl() {
        //check for coyote time jump
        if (input.up && m.buttonCD_jump + 20 < m.cycle && m.lastOnGroundCycle + m.coyoteCycles > m.cycle) m.jump()

        //check for short jumps   //moving up   //recently pressed jump  //but not pressing jump key now
        if (m.buttonCD_jump + 60 > m.cycle && !(input.up) && m.Vy < 0) {
            Matter.Body.setVelocity(player, { x: player.velocity.x, y: player.velocity.y * 0.94 }); //reduce player y-velocity every cycle
        }

        if (input.left) {
            if (player.velocity.x > -m.airSpeedLimit / player.mass / player.mass) player.force.x -= m.FxAir; // move player   left / a
        } else if (input.right) {
            if (player.velocity.x < m.airSpeedLimit / player.mass / player.mass) player.force.x += m.FxAir; //move player  right / d
        }
    },
    printBlock() {
        const sides = Math.floor(4 + 6 * Math.random() * Math.random())
        body[body.length] = Matter.Bodies.polygon(m.pos.x, m.pos.y, sides, 8, {
            friction: 0.05,
            frictionAir: 0.001,
            collisionFilter: { category: 0, mask: 0 }, //no collision because player is holding
            classType: "body",
            isPrinted: true,
            radius: 10, //used to grow and warp the shape of the block
            density: 0.002, //double density for 2x damage
        });
        const who = body[body.length - 1]
        Composite.add(engine.world, who); //add to world
        m.throwCharge = 4;
        m.holdingTarget = who
        m.isHolding = true;
    },
    alive: false,
    isSwitchingWorlds: false,
    switchWorlds(giveTech = "") {
        if (!m.isSwitchingWorlds) {
            let totalTech = 0;
            for (let i = tech.tech.length - 1; i > -1; i--) {
                if (tech.tech[i].count > 0 && !tech.tech[i].isLore && !tech.tech[i].isNonRefundable && !tech.tech[i].isAltRealityTech) {
                    totalTech += tech.tech[i].count
                }
            }
            powerUps.boost.endCycle = 0
            simulation.isTextLogOpen = false; //prevent console spam
            tech.resetAllTech()
            if (giveTech) tech.giveTech(giveTech) //give many worlds back

            //remove all bullets
            for (let i = 0; i < bullet.length; ++i) Matter.Composite.remove(engine.world, bullet[i]);
            bullet = [];

            //randomize
            powerUps.research.count = Math.floor(powerUps.research.count * (0.5 + 1.5 * Math.random()))
            m.coupling = Math.floor(m.coupling * (0.5 + 1.5 * Math.random()))
            //randomize health
            m.health = m.health * (1 + 0.5 * (Math.random() - 0.5))
            if (m.health > 1) m.health = 1;
            //randomize field
            m.setField(Math.ceil(Math.random() * (m.fieldUpgrades.length - 1)))
            //removes guns and ammo  
            b.inventory = [];
            b.activeGun = null;
            b.inventoryGun = 0;
            for (let i = 0, len = b.guns.length; i < len; ++i) {
                b.guns[i].have = false;
                if (b.guns[i].ammo !== Infinity) {
                    b.guns[i].ammo = 0;
                    b.guns[i].ammoPack = b.guns[i].defaultAmmoPack;
                }
            }
            //give random guns
            // const totalGuns = 1 + Math.floor(b.inventory.length * (0.5 + 1.5 * Math.random()))
            const totalGuns = 1 + Math.floor(Math.random() * Math.random() * 7)
            for (let i = 0; i < totalGuns; i++) b.giveGuns()

            //randomize ammo based on ammo/ammoPack count
            for (let i = 0, len = b.inventory.length; i < len; i++) {
                if (b.guns[b.inventory[i]].ammo !== Infinity) b.guns[b.inventory[i]].ammo = Math.floor(b.guns[b.inventory[i]].ammo * (0.25 + Math.random() + Math.random() + Math.random()))
            }

            let loop = () => {
                if (!(m.cycle % 10)) {
                    if (totalTech > 0 && m.alive) {
                        totalTech--
                        let options = [];
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
                                for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
                            }
                        }
                        if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool
                        requestAnimationFrame(loop);
                    } else {
                        m.isSwitchingWorlds = false
                    }
                } else if (m.alive) {
                    requestAnimationFrame(loop);
                } else {
                    m.isSwitchingWorlds = false
                }
            }
            requestAnimationFrame(loop);

            b.respawnBots();
            // for (let i = 0; i < randomBotCount; i++) b.randomBot()
            simulation.makeGunHUD(); //update gun HUD
            simulation.updateTechHUD();
            m.displayHealth();
            simulation.isTextLogOpen = true;
            m.drop();
            if (simulation.paused) build.pauseGrid() //update the build when paused
        }
    },
    // switchWorlds() {
    //     if (!m.isSwitchingWorlds) {
    //         powerUps.boost.endCycle = 0
    //         const totalGuns = b.inventory.length
    //         //track ammo/ ammoPack count
    //         let ammoCount = 0
    //         for (let i = 0, len = b.inventory.length; i < len; i++) {
    //             if (b.guns[b.inventory[i]].ammo !== Infinity) {
    //                 ammoCount += b.guns[b.inventory[i]].ammo / b.guns[b.inventory[i]].ammoPack
    //             } else {
    //                 ammoCount += 5
    //             }
    //         }

    //         simulation.isTextLogOpen = false; //prevent console spam
    //         //remove all tech and count current tech total
    //         let totalTech = 0;
    //         for (let i = tech.tech.length - 1; i > -1; i--) {
    //             if (tech.tech[i].isJunk) tech.tech[i].frequency = 0
    //             if (tech.tech[i].count > 0 && !tech.tech[i].isLore) {
    //                 if (tech.tech[i].frequencyDefault) {
    //                     tech.tech[i].frequency = tech.tech[i].frequencyDefault
    //                 } else {
    //                     tech.tech[i].frequency = 1
    //                 }
    //                 if (!tech.tech[i].isNonRefundable && !tech.tech[i].isAltRealityTech) {
    //                     totalTech += tech.tech[i].count
    //                     tech.tech[i].remove();
    //                     tech.tech[i].isLost = false
    //                     tech.tech[i].count = 0
    //                 }
    //             }
    //         }
    //         // lore.techCount = 0;
    //         // tech.removeLoreTechFromPool();
    //         // tech.addLoreTechToPool();
    //         // tech.removeJunkTechFromPool();


    //         // tech.junkChance = 0;
    //         // tech.duplication = 0;
    //         // tech.extraMaxHealth = 0;
    //         // tech.totalCount = 0;
    //         // tech.removeCount = 0;
    //         // const randomBotCount = b.totalBots()
    //         // b.zeroBotCount()
    //         //remove all bullets, respawn bots
    //         for (let i = 0; i < bullet.length; ++i) Matter.Composite.remove(engine.world, bullet[i]);
    //         bullet = [];

    //         //randomize health
    //         m.health = m.health * (1 + 0.5 * (Math.random() - 0.5))
    //         if (m.health > 1) m.health = 1;
    //         m.displayHealth();
    //         //randomize field
    //         m.setField(Math.ceil(Math.random() * (m.fieldUpgrades.length - 1)))
    //         //removes guns and ammo  
    //         b.inventory = [];
    //         b.activeGun = null;
    //         b.inventoryGun = 0;
    //         for (let i = 0, len = b.guns.length; i < len; ++i) {
    //             b.guns[i].have = false;
    //             if (b.guns[i].ammo !== Infinity) {
    //                 b.guns[i].ammo = 0;
    //                 b.guns[i].ammoPack = b.guns[i].defaultAmmoPack;
    //             }
    //         }
    //         //give random guns
    //         for (let i = 0; i < totalGuns; i++) b.giveGuns()

    //         //randomize ammo based on ammo/ammoPack count
    //         for (let i = 0, len = b.inventory.length; i < len; i++) {
    //             if (b.guns[b.inventory[i]].ammo !== Infinity) b.guns[b.inventory[i]].ammo = Math.max(0, Math.floor(ammoCount / b.inventory.length * b.guns[b.inventory[i]].ammoPack * (2.5 + 0.3 * (Math.random() - 0.5))))
    //         }


    //         //randomize tech
    //         // for (let i = 0; i < totalTech; i++) {
    //         //     let options = [];
    //         //     for (let i = 0, len = tech.tech.length; i < len; i++) {
    //         //         if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
    //         //             for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
    //         //         }
    //         //     }
    //         //     if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool

    //         // }
    //         let loop = () => {
    //             if (!(m.cycle % 10)) {
    //                 if (totalTech > 0 && m.alive) {
    //                     totalTech--
    //                     let options = [];
    //                     for (let i = 0, len = tech.tech.length; i < len; i++) {
    //                         if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
    //                             for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
    //                         }
    //                     }
    //                     if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool
    //                     requestAnimationFrame(loop);
    //                 } else {
    //                     m.isSwitchingWorlds = false
    //                 }
    //             } else if (m.alive) {
    //                 requestAnimationFrame(loop);
    //             } else {
    //                 m.isSwitchingWorlds = false
    //             }
    //         }
    //         requestAnimationFrame(loop);

    //         b.respawnBots();
    //         // for (let i = 0; i < randomBotCount; i++) b.randomBot()
    //         simulation.makeGunHUD(); //update gun HUD
    //         simulation.updateTechHUD();
    //         simulation.isTextLogOpen = true;
    //         m.drop();
    //         if (simulation.paused) build.pauseGrid() //update the build when paused
    //     }
    // },
    // switchWorlds() {
    //     if (!m.isSwitchingWorlds) {
    //         powerUps.boost.endCycle = 0
    //         const totalGuns = b.inventory.length
    //         //track ammo/ ammoPack count
    //         let ammoCount = 0
    //         for (let i = 0, len = b.inventory.length; i < len; i++) {
    //             if (b.guns[b.inventory[i]].ammo !== Infinity) {
    //                 ammoCount += b.guns[b.inventory[i]].ammo / b.guns[b.inventory[i]].ammoPack
    //             } else {
    //                 ammoCount += 5
    //             }
    //         }

    //         simulation.isTextLogOpen = false; //prevent console spam
    //         //remove all tech and count current tech total
    //         let totalTech = 0;
    //         for (let i = 0, len = tech.tech.length; i < len; i++) {
    //             if (tech.tech[i].isJunk) tech.tech[i].frequency = 0
    //             if (tech.tech[i].count > 0 && !tech.tech[i].isLore) {
    //                 if (tech.tech[i].frequencyDefault) {
    //                     tech.tech[i].frequency = tech.tech[i].frequencyDefault
    //                 } else {
    //                     tech.tech[i].frequency = 1
    //                 }
    //                 if (
    //                     !tech.tech[i].isNonRefundable &&
    //                     // !tech.tech[i].isFromAppliedScience &&
    //                     !tech.tech[i].isAltRealityTech
    //                 ) {
    //                     totalTech += tech.tech[i].count
    //                     tech.tech[i].remove();
    //                     tech.tech[i].isLost = false
    //                     tech.tech[i].count = 0
    //                 }
    //             }
    //         }
    //         // lore.techCount = 0;
    //         // tech.removeLoreTechFromPool();
    //         // tech.addLoreTechToPool();
    //         // tech.removeJunkTechFromPool();


    //         tech.junkChance = 0;
    //         tech.duplication = 0;
    //         tech.extraMaxHealth = 0;
    //         tech.totalCount = 0;
    //         tech.removeCount = 0;
    //         // const randomBotCount = b.totalBots()
    //         b.zeroBotCount()
    //         //remove all bullets, respawn bots
    //         for (let i = 0; i < bullet.length; ++i) Matter.Composite.remove(engine.world, bullet[i]);
    //         bullet = [];

    //         //randomize health
    //         m.health = m.health * (1 + 0.5 * (Math.random() - 0.5))
    //         if (m.health > 1) m.health = 1;
    //         m.displayHealth();
    //         //randomize field
    //         m.setField(Math.ceil(Math.random() * (m.fieldUpgrades.length - 1)))
    //         //removes guns and ammo  
    //         b.inventory = [];
    //         b.activeGun = null;
    //         b.inventoryGun = 0;
    //         for (let i = 0, len = b.guns.length; i < len; ++i) {
    //             b.guns[i].have = false;
    //             if (b.guns[i].ammo !== Infinity) {
    //                 b.guns[i].ammo = 0;
    //                 b.guns[i].ammoPack = b.guns[i].defaultAmmoPack;
    //             }
    //         }
    //         //give random guns
    //         for (let i = 0; i < totalGuns; i++) b.giveGuns()

    //         //randomize ammo based on ammo/ammoPack count
    //         for (let i = 0, len = b.inventory.length; i < len; i++) {
    //             if (b.guns[b.inventory[i]].ammo !== Infinity) b.guns[b.inventory[i]].ammo = Math.max(0, Math.floor(ammoCount / b.inventory.length * b.guns[b.inventory[i]].ammoPack * (2.5 + 0.3 * (Math.random() - 0.5))))
    //         }


    //         //randomize tech
    //         // for (let i = 0; i < totalTech; i++) {
    //         //     let options = [];
    //         //     for (let i = 0, len = tech.tech.length; i < len; i++) {
    //         //         if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
    //         //             for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
    //         //         }
    //         //     }
    //         //     if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool

    //         // }
    //         let loop = () => {
    //             if (!(m.cycle % 10)) {
    //                 if (totalTech > 0 && m.alive) {
    //                     totalTech--
    //                     let options = [];
    //                     for (let i = 0, len = tech.tech.length; i < len; i++) {
    //                         if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
    //                             for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
    //                         }
    //                     }
    //                     if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool
    //                     requestAnimationFrame(loop);
    //                 } else {
    //                     m.isSwitchingWorlds = false
    //                 }
    //             } else if (m.alive) {
    //                 requestAnimationFrame(loop);
    //             } else {
    //                 m.isSwitchingWorlds = false
    //             }
    //         }
    //         requestAnimationFrame(loop);

    //         b.respawnBots();
    //         // for (let i = 0; i < randomBotCount; i++) b.randomBot()
    //         simulation.makeGunHUD(); //update gun HUD
    //         simulation.updateTechHUD();
    //         simulation.isTextLogOpen = true;
    //         m.drop();
    //         if (simulation.paused) build.pauseGrid() //update the build when paused
    //     }
    // },
    dmgScale: null, //scales all damage, but not raw .dmg 
    death() {
        if (tech.isImmortal) { //if player has the immortality buff, spawn on the same level with randomized damage
            //remove immortality tech
            // for (let i = 0; i < tech.tech.length; i++) {
            //     if (tech.tech[i].name === "quantum immortality") tech.removeTech(i)
            // }

            m.setMaxHealth()
            m.health = 1;
            // m.addHealth(1)

            simulation.wipe = function () { //set wipe to have trails
                ctx.fillStyle = "rgba(255,255,255,0)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            spawn.setSpawnList(); //new mob types
            level.isFlipped = false
            simulation.clearNow = true; //triggers a map reset

            m.switchWorlds()
            const swapPeriod = 1000
            for (let i = 0, len = 5; i < len; i++) {
                setTimeout(function () {
                    simulation.wipe = function () { //set wipe to have trails
                        ctx.fillStyle = "rgba(255,255,255,0)";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    spawn.setSpawnList(); //new mob types
                    // simulation.clearNow = true; //triggers a map reset
                    // m.switchWorlds()
                    simulation.isTextLogOpen = true;
                    simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> 0.${len - i - 1}`, swapPeriod);
                    simulation.isTextLogOpen = false;
                    simulation.wipe = function () { //set wipe to have trails
                        ctx.fillStyle = `rgba(255,255,255,${(i + 1) * (i + 1) * 0.006})`;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                }, (i + 1) * swapPeriod);
            }
            setTimeout(function () {
                simulation.wipe = function () { //set wipe to normal
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                simulation.isTextLogOpen = true;
                simulation.inGameConsole("simulation.amplitude <span class='color-symbol'>=</span> null");
                tech.isImmortal = false //disable future immortality
            }, 6 * swapPeriod);
        } else if (m.alive) { //normal death code here            
            m.storeTech()
            m.alive = false;
            simulation.paused = true;
            m.health = 0;
            simulation.ephemera = []
            document.getElementById("defense-bar").style.display = "none"; //hide defense
            document.getElementById("damage-bar").style.display = "none"
            m.displayHealth();
            document.getElementById("text-log").style.display = "none"
            document.getElementById("fade-out").style.opacity = 0.9; //slowly fade to 90% white on top of canvas
            setTimeout(function () {
                Composite.clear(engine.world);
                Engine.clear(engine);
                simulation.splashReturn();
            }, 5000);
        }
    },
    storeTech() { //store a copy of your tech,  it will show up at your location next run in the entanglement power up
        if (localSettings.isAllowed && !simulation.isCheating) {
            const gunList = [] //store gun names
            for (i = 0, len = b.inventory.length; i < len; i++) gunList.push(b.inventory[i])
            const techList = [] //store tech names
            for (let i = 0; i < tech.tech.length; i++) {
                if (tech.tech[i].count > 0 && !tech.tech[i].isNonRefundable) techList.push(tech.tech[i].name)
            }
            if (techList.length) {
                localSettings.entanglement = {
                    fieldIndex: m.fieldMode,
                    gunIndexes: gunList,
                    techIndexes: techList,
                    position: {
                        x: m.pos.x,
                        y: m.pos.y
                    },
                    levelName: level.levels[level.onLevel],
                    isHorizontalFlipped: simulation.isHorizontalFlipped
                }
                if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            }
        }
    },
    health: 0,
    maxHealth: 1, //set in simulation.reset()
    drawHealth() {
        if (m.health < 1) {
            ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
            ctx.fillRect(m.pos.x - m.radius, m.pos.y - 50, 60, 10);
            ctx.fillStyle = "#f00";
            ctx.fillRect(
                m.pos.x - m.radius,
                m.pos.y - 50,
                60 * m.health,
                10
            );
        }
    },
    displayHealth() {
        id = document.getElementById("health");
        // health display is a x^1.5 rule to make it seem like the player has lower health, this makes the player feel more excitement
        id.style.width = Math.floor(300 * m.maxHealth * Math.pow(m.health / m.maxHealth, 1.4)) + "px";
        //css animation blink if health is low
        // if (m.health < 0.3) {
        //     id.classList.add("low-health");
        // } else {
        //     id.classList.remove("low-health");
        // }
    },
    addHealth(heal) {
        if (!tech.isEnergyHealth) {
            m.health += heal * simulation.healScale * (level.isLowHeal ? 0.5 : 1);
            if (m.health > m.maxHealth) m.health = m.maxHealth;
            m.displayHealth();
        }
    },
    baseHealth: 1,
    setMaxHealth(isMessage) {
        m.maxHealth = m.baseHealth + tech.extraMaxHealth + 5 * tech.isFallingDamage
        if (level.isReducedHealth) {
            level.reducedHealthLost = Math.max(0, m.health - m.maxHealth * 0.5)
            m.maxHealth *= 0.5
        }
        document.getElementById("health-bg").style.width = `${Math.floor(300 * m.maxHealth)}px`
        document.getElementById("defense-bar").style.width = Math.floor(300 * m.maxHealth * (1 - m.defense())) + "px";

        if (isMessage) simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-h'>maxHealth</span> <span class='color-symbol'>=</span> ${m.maxHealth.toFixed(2)}`)
        if (m.health > m.maxHealth) m.health = m.maxHealth;
        m.displayHealth();
    },
    defaultFPSCycle: 0, //tracks when to return to normal fps
    immuneCycle: 0, //used in engine
    lastCalculatedDamage: 0, //used to decided if damage bar needs to be redrawn  (in simulation.checks)
    lastCalculatedDefense: 0, //used to decided if defense bar needs to be redrawn  (in simulation.checks)
    defense() {
        let dmg = 1
        if (powerUps.boost.isDefense && powerUps.boost.endCycle > simulation.cycle) dmg *= 0.3
        if (tech.isMaxHealthDefense && m.health === m.maxHealth) dmg *= 0.1
        if (tech.isDiaphragm) dmg *= 0.55 + 0.35 * Math.sin(m.cycle * 0.0075);
        if (tech.isZeno) dmg *= 0.2
        if (tech.isFieldHarmReduction) dmg *= 0.6
        if (tech.isHarmDarkMatter) dmg *= (tech.isMoveDarkMatter || tech.isNotDarkMatter) ? 0.25 : 0.4
        if (tech.isImmortal) dmg *= 0.7
        if (m.fieldMode === 0 || m.fieldMode === 3) dmg *= 0.973 ** m.coupling
        if (tech.isHarmReduceNoKill && m.lastKillCycle + 300 < m.cycle) dmg *= 0.3
        if (tech.isAddBlockMass && m.isHolding) dmg *= 0.1
        if (tech.isSpeedHarm && (tech.speedAdded + player.speed) > 0.1) dmg *= 1 - Math.min((tech.speedAdded + player.speed) * 0.01583, 0.95) //capped at speed of 55
        if (tech.isHarmReduce && input.field) dmg *= 0.1
        if (tech.isNeutronium && input.field && m.fieldCDcycle < m.cycle) dmg *= 0.05
        if (tech.isBotArmor) dmg *= 0.96 ** b.totalBots()
        if (tech.isHarmArmor && m.lastHarmCycle + 600 > m.cycle) dmg *= 0.4;
        if (tech.isNoFireDefense && m.cycle > m.fireCDcycle + 120) dmg *= 0.3
        if (tech.isTurret && m.crouch) dmg *= 0.3;
        if (tech.isFirstDer && b.inventory[0] === b.activeGun) dmg *= 0.85 ** b.inventory.length
        // if (tech.isLowHealthDefense) dmg *= Math.pow(0.3, Math.max(0, (tech.isEnergyHealth ? m.maxEnergy - m.energy : m.maxHealth - m.health)))
        if (tech.isLowHealthDefense) dmg *= Math.pow(0.2, Math.max(0, 1 - (tech.isEnergyHealth ? m.energy / m.maxEnergy : m.health / m.maxHealth)))
        if (tech.isRemineralize) {
            //reduce mineral percent based on time since last check
            const seconds = (simulation.cycle - tech.mineralLastCheck) / 60
            tech.mineralLastCheck = simulation.cycle
            tech.mineralDamage = 1 + (tech.mineralDamage - 1) * Math.pow(0.9, seconds);
            tech.mineralDamageReduction = 1 - (1 - tech.mineralDamageReduction) * Math.pow(0.9, seconds);
            dmg *= tech.mineralDamageReduction
        }
        // return tech.isEnergyHealth ? Math.pow(dmg, 0.7) : dmg //defense has less effect
        // dmg *= m.fieldHarmReduction
        return dmg * m.fieldHarmReduction
    },
    rewind(steps) { // m.rewind(Math.floor(Math.min(599, 137 * m.energy)))
        if (tech.isRewindGrenade) {
            const immunityDuration = 50
            const immunityCycle = m.cycle + immunityDuration + 10 + tech.isPetalsExplode * 30 + tech.isCircleExplode * 21
            if (m.immuneCycle < immunityCycle) m.immuneCycle = immunityCycle; //player is immune to damage until after grenades might explode...

            for (let i = 1, len = Math.floor(4 + steps / 40); i < len; i++) {
                b.grenade(Vector.add(m.pos, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) }), -i * Math.PI / len) //fire different angles for each grenade
                const who = bullet[bullet.length - 1]

                if (tech.isNeutronBomb) {
                    Matter.Body.setVelocity(who, { x: who.velocity.x * 0.3, y: who.velocity.y * 0.3 });
                } else if (tech.isVacuumBomb) {
                    Matter.Body.setVelocity(who, { x: who.velocity.x * 0.5, y: who.velocity.y * 0.5 });
                    who.endCycle = simulation.cycle + immunityDuration

                } else if (tech.isRPG) {
                    who.endCycle = simulation.cycle + 10
                } else {
                    Matter.Body.setVelocity(who, { x: who.velocity.x * 0.5, y: who.velocity.y * 0.5 });
                    who.endCycle = simulation.cycle + immunityDuration
                }
            }
        }

        let history = m.history[(m.cycle - steps) % 600]
        Matter.Body.setPosition(player, history.position);
        Matter.Body.setVelocity(player, { x: history.velocity.x, y: history.velocity.y });
        m.yOff = history.yOff
        if (m.yOff < 48) {
            m.doCrouch()
        } else {
            m.undoCrouch()
        }

        // b.activeGun = history.activeGun
        // for (let i = 0; i < b.inventory.length; i++) {
        //     if (b.inventory[i] === b.activeGun) b.inventoryGun = i
        // }
        // simulation.updateGunHUD();
        // simulation.boldActiveGunHUD();

        // move bots to player's new position
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType) {
                Matter.Body.setPosition(bullet[i], Vector.add(player.position, {
                    x: 250 * (Math.random() - 0.5),
                    y: 250 * (Math.random() - 0.5)
                }));
                Matter.Body.setVelocity(bullet[i], {
                    x: 0,
                    y: 0
                });
            }
        }
        m.energy = Math.max(m.energy - steps / 330, 0.01)
        if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles

        let isDrawPlayer = true
        const shortPause = function () {
            if (m.defaultFPSCycle < m.cycle) { //back to default values
                simulation.fpsCap = simulation.fpsCapDefault
                simulation.fpsInterval = 1000 / simulation.fpsCap;
                document.getElementById("dmg").style.transition = "opacity 1s";
                document.getElementById("dmg").style.opacity = "0";
            } else {
                requestAnimationFrame(shortPause);
                if (isDrawPlayer) {
                    isDrawPlayer = false
                    ctx.save();
                    ctx.globalCompositeOperation = "lighter";
                    ctx.translate(canvas.width2, canvas.height2); //center
                    ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
                    ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
                    for (let i = 1; i < steps; i++) {
                        history = m.history[(m.cycle - i) % 600]
                        m.pos.x = history.position.x
                        m.pos.y = history.position.y + m.yPosDifference - history.yOff
                        m.yOff = history.yOff
                        m.draw();
                    }
                    ctx.restore();
                    m.resetHistory()
                }
            }
        };

        if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
        simulation.fpsCap = 3 //1 is longest pause, 4 is standard
        simulation.fpsInterval = 1000 / simulation.fpsCap;
        m.defaultFPSCycle = m.cycle
        if (tech.isRewindBot) {
            const len = steps * 0.05 * tech.isRewindBot
            const botStep = Math.floor(steps / len)
            for (let i = 0; i < len; i++) {
                const where = m.history[Math.abs(m.cycle - i * botStep) % 600].position //spread out spawn locations along past history
                b.randomBot({
                    x: where.x + 20 * (Math.random() - 0.5),
                    y: where.y + 20 * (Math.random() - 0.5)
                }, false, false)
                bullet[bullet.length - 1].endCycle = simulation.cycle + 440 + Math.floor(120 * Math.random()) //8-10 seconds
            }
        }
    },
    collisionImmuneCycles: 30,
    damage(dmg, isDefense = true) {
        if (tech.isRewindAvoidDeath && (m.energy + 0.05) > Math.min(0.95, m.maxEnergy) && dmg > 0.01) {
            const steps = Math.floor(Math.min(299, 150 * m.energy))
            simulation.inGameConsole(`<span class='color-var'>m</span>.rewind(${steps})`)
            m.rewind(steps)
            return
        }
        m.lastHarmCycle = m.cycle
        if (tech.isDroneOnDamage && bullet.length < 180) { //chance to build a drone on damage from tech
            const len = Math.min((dmg - 0.045 * Math.random()) * 95, 65) / tech.droneEnergyReduction * (tech.isEnergyHealth ? 0.5 : 1)
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) b.drone({
                    x: m.pos.x + 30 * Math.cos(m.angle) + 100 * (Math.random() - 0.5),
                    y: m.pos.y + 30 * Math.sin(m.angle) + 100 * (Math.random() - 0.5)
                }) //spawn drone
            }
        }
        if (tech.isEnergyHealth) {
            if (isDefense) dmg *= Math.pow(m.defense(), 0.5)
            m.energy -= 0.9 * dmg / Math.sqrt(simulation.healScale) //scale damage with heal reduction difficulty
            if (m.energy < 0 || isNaN(m.energy)) { //taking deadly damage
                if (tech.isDeathAvoid && powerUps.research.count && !tech.isDeathAvoidedThisLevel) {
                    tech.isDeathAvoidedThisLevel = true
                    powerUps.research.changeRerolls(-1)
                    simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-r'>research</span><span class='color-symbol'>--</span><br>${powerUps.research.count}`)
                    for (let i = 0; i < 22; i++) powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "heal", false);
                    m.energy = m.maxEnergy + 0.1
                    if (m.immuneCycle < m.cycle + 300) m.immuneCycle = m.cycle + 300 //disable this.immuneCycle bonus seconds
                    simulation.wipe = function () { //set wipe to have trails
                        ctx.fillStyle = "rgba(255,255,255,0.03)";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    setTimeout(function () {
                        simulation.wipe = function () { //set wipe to normal
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                    }, 3000);
                } else { //death
                    m.health = 0;
                    m.energy = 0;
                    m.death();
                }
                return;
            }
        } else {
            if (isDefense) dmg *= m.defense()
            m.health -= dmg;
            if (m.health < 0 || isNaN(m.health)) {
                if (tech.isDeathAvoid && powerUps.research.count > 0 && !tech.isDeathAvoidedThisLevel) { //&& Math.random() < 0.5
                    tech.isDeathAvoidedThisLevel = true
                    m.health = 0.05
                    powerUps.research.changeRerolls(-1)
                    simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-r'>research</span><span class='color-symbol'>--</span><br>${powerUps.research.count}`)
                    for (let i = 0; i < 16; i++) powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "heal", false);
                    if (m.immuneCycle < m.cycle + 300) m.immuneCycle = m.cycle + 300 //disable this.immuneCycle bonus seconds
                    simulation.wipe = function () { //set wipe to have trails
                        ctx.fillStyle = "rgba(255,255,255,0.03)";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    setTimeout(function () {
                        simulation.wipe = function () { //set wipe to normal
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                    }, 3000);
                } else {
                    m.health = 0;
                    m.displayHealth();
                    m.death();
                    return;
                }
            }
            m.displayHealth();
            document.getElementById("dmg").style.transition = "opacity 0s";
            document.getElementById("dmg").style.opacity = 0.1 + Math.min(0.6, dmg * 4);
        }
        if (dmg > 0.03) {
            m.lastHit = dmg;
            if (dmg > 0.06 / m.holdingMassScale) m.drop(); //drop block if holding  // m.holdingMassScale = 0.5 for most fields
            if (m.isCloak) m.fireCDcycle = m.cycle //forced exit cloak
        }
        const normalFPS = function () {
            if (m.defaultFPSCycle < m.cycle) { //back to default values
                simulation.fpsCap = simulation.fpsCapDefault
                simulation.fpsInterval = 1000 / simulation.fpsCap;
                document.getElementById("dmg").style.transition = "opacity 1s";
                document.getElementById("dmg").style.opacity = "0";
            } else {
                requestAnimationFrame(normalFPS);
            }
        };

        if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(normalFPS);
        if (dmg > 0.05) { // freeze game for high damage hits
            simulation.fpsCap = 4 //40 - Math.min(25, 100 * dmg)
            simulation.fpsInterval = 1000 / simulation.fpsCap;
            if (tech.isHarmFreeze) {
                for (let i = 0, len = mob.length; i < len; i++) mobs.statusSlow(mob[i], 480) //freeze all mobs
            }
        } else {
            simulation.fpsCap = simulation.fpsCapDefault
            simulation.fpsInterval = 1000 / simulation.fpsCap;
        }
        m.defaultFPSCycle = m.cycle
        if (level.isMobHealPlayerDamage) {
            for (let i = 0; i < mob.length; i++) {
                if (mob[i].health < 1 && mob[i].isDropPowerUp && mob[i].alive) {
                    simulation.drawList.push({
                        x: mob[i].position.x,
                        y: mob[i].position.y,
                        radius: mob[i].radius + 20,
                        color: "rgba(0,255,100,0.5)",
                        time: 10
                    });
                    mob[i].health += dmg * 7
                    if (mob[i].health > 1) mob[i].health = 1
                }
            }
        }
        // if (tech.isSlowFPS) { // slow game 
        //     simulation.fpsCap = 30 //new fps
        //     simulation.fpsInterval = 1000 / simulation.fpsCap;
        //     //how long to wait to return to normal fps
        //     m.defaultFPSCycle = m.cycle + 20 + Math.min(90, Math.floor(200 * dmg))
        //     if (tech.isHarmFreeze) { //freeze all mobs
        //         for (let i = 0, len = mob.length; i < len; i++) {
        //             mobs.statusSlow(mob[i], 450)
        //         }
        //     }
        // } else {
        //     if (dmg > 0.05) { // freeze game for high damage hits
        //         simulation.fpsCap = 4 //40 - Math.min(25, 100 * dmg)
        //         simulation.fpsInterval = 1000 / simulation.fpsCap;
        //     } else {
        //         simulation.fpsCap = simulation.fpsCapDefault
        //         simulation.fpsInterval = 1000 / simulation.fpsCap;
        //     }
        //     m.defaultFPSCycle = m.cycle
        // }
        // if (!noTransition) {
        //   document.getElementById("health").style.transition = "width 0s ease-out"
        // } else {
        //   document.getElementById("health").style.transition = "width 1s ease-out"
        // }
    },
    buttonCD: 0, //cool down for player buttons
    // *********************************************
    // ****** drawing player and skins *************
    // *********************************************
    drawLeg(stroke) { },
    calcLeg(cycle_offset, offset) {
        m.hip.x = 12 + offset;
        m.hip.y = 24 + offset;
        //stepSize goes to zero if Vx is zero or not on ground (make m transition cleaner)
        m.stepSize = 0.8 * m.stepSize + 0.2 * (7 * Math.sqrt(Math.min(9, Math.abs(m.Vx))) * m.onGround);
        //changes to stepsize are smoothed by adding only a percent of the new value each cycle
        const stepAngle = 0.034 * m.walk_cycle + cycle_offset;
        m.foot.x = 2.2 * m.stepSize * Math.cos(stepAngle) + offset;
        m.foot.y = offset + 1.2 * m.stepSize * Math.sin(stepAngle) + m.yOff + m.height;
        const Ymax = m.yOff + m.height;
        if (m.foot.y > Ymax) m.foot.y = Ymax;

        //calculate knee position as intersection of circle from hip and foot
        const d = Math.sqrt((m.hip.x - m.foot.x) * (m.hip.x - m.foot.x) + (m.hip.y - m.foot.y) * (m.hip.y - m.foot.y));
        const l = (m.legLength1 * m.legLength1 - m.legLength2 * m.legLength2 + d * d) / (2 * d);
        const h = Math.sqrt(m.legLength1 * m.legLength1 - l * l);
        m.knee.x = (l / d) * (m.foot.x - m.hip.x) - (h / d) * (m.foot.y - m.hip.y) + m.hip.x + offset;
        m.knee.y = (l / d) * (m.foot.y - m.hip.y) + (h / d) * (m.foot.x - m.hip.x) + m.hip.y;
    },
    draw() { },
    isAltSkin: false,
    drawBoost() {

    },
    resetSkin() {
        simulation.isAutoZoom = true;
        m.hardLandCDScale = 1
        m.yOffWhen.jump = 70
        m.yOffWhen.stand = 49
        m.yOffWhen.crouch = 22
        m.isAltSkin = false
        m.coyoteCycles = 5
        m.hardLanding = 130
        m.squirrelFx = 1;
        m.squirrelJump = 1;
        m.velocitySmooth = { x: 0, y: 0 }
        requestAnimationFrame(() => { m.setMovement() })
        m.color = {
            hue: 0,
            sat: 0,
            light: 100,
        }
        m.setFillColors();
        m.draw = function () {
            ctx.fillStyle = m.fillColor;
            m.walk_cycle += m.flipLegs * m.Vx;
            ctx.save();
            ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
            ctx.translate(m.pos.x, m.pos.y);
            m.calcLeg(Math.PI, -3);
            m.drawLeg("#4a4a4a");
            m.calcLeg(0, 0);
            m.drawLeg("#333");
            ctx.rotate(m.angle);
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, 2 * Math.PI);
            ctx.fillStyle = m.bodyGradient
            ctx.fill();
            ctx.arc(15, 0, 4, 0, 2 * Math.PI);
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
            m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
            powerUps.boost.draw()
        }
        m.drawLeg = function (stroke) {
            // if (simulation.mouseInGame.x > m.pos.x) {
            if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                m.flipLegs = 1;
            } else {
                m.flipLegs = -1;
            }
            ctx.save();
            ctx.scale(m.flipLegs, 1); //leg lines
            ctx.beginPath();
            ctx.moveTo(m.hip.x, m.hip.y);
            ctx.lineTo(m.knee.x, m.knee.y);
            ctx.lineTo(m.foot.x, m.foot.y);
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 5;
            ctx.stroke();

            //toe lines
            ctx.beginPath();
            ctx.moveTo(m.foot.x, m.foot.y);
            if (m.onGround) {
                ctx.lineTo(m.foot.x - 14, m.foot.y + 5);
                ctx.moveTo(m.foot.x, m.foot.y);
                ctx.lineTo(m.foot.x + 14, m.foot.y + 5);
            } else {
                ctx.lineTo(m.foot.x - 12, m.foot.y + 8);
                ctx.moveTo(m.foot.x, m.foot.y);
                ctx.lineTo(m.foot.x + 12, m.foot.y + 8);
            }
            ctx.lineWidth = 4;
            ctx.stroke();

            //hip joint
            ctx.beginPath();
            ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
            //knee joint
            ctx.moveTo(m.knee.x + 5, m.knee.y);
            ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
            //foot joint
            ctx.moveTo(m.foot.x + 4, m.foot.y + 1);
            ctx.arc(m.foot.x, m.foot.y + 1, 4, 0, 2 * Math.PI);
            ctx.fillStyle = m.fillColor;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    },
    skin: {
        none() {
            m.isAltSkin = true
        },
        favicon() { //used to render the favicon, not actually in game
            m.yOffWhen.jump = 70
            m.yOffWhen.stand = 49
            m.yOffWhen.crouch = 22
            m.isAltSkin = false

            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 10}%)`
            let grd = ctx.createLinearGradient(-30, 0, 30, 0);
            grd.addColorStop(0, m.fillColorDark);
            grd.addColorStop(1, m.fillColor);
            m.bodyGradient = grd

            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                // m.calcLeg(Math.PI, -3);
                // m.drawLeg("#4a4a4a");
                // m.calcLeg(0, 0);
                // m.drawLeg("#333");
                // ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(12, 0, 4.5, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 4.5;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
        },
        egg() {
            m.isAltSkin = true
            m.yOffWhen.stand = 52
            m.yOffWhen.jump = 72
            m.squirrelJump = 1.15;
            m.setMovement()

            m.draw = function () {
                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 39
                    const mag = 14 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.fillStyle = `rgba(0,0,0,${0.04 + 0.3 * time})`
                    ctx.fill()
                    // ctx.strokeStyle = "#333"
                    // ctx.lineWidth = 1
                    // ctx.stroke();
                    ctx.restore();
                }

                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -1.25);
                m.drawLeg("#606060");
                m.calcLeg(0, 0);
                m.drawLeg("#444");

                ctx.rotate(m.angle);
                ctx.beginPath();
                // ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.ellipse(0, 0, 0.9 * 31, 1.05 * 31, 0, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                // ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.ellipse(15, 0, 0.8 * 4, 1.1 * 4, 0, 0, 2 * Math.PI);

                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.75 + m.yOffGoal * 0.25; //smoothly move leg height towards height goal
            }
            m.drawLeg = function (stroke) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                const hip = { x: m.hip.x - 5, y: m.hip.y + 5 }
                const sub = Vector.sub(m.knee, hip)
                const off = Vector.mult(Vector.rotate(Vector.normalise(sub), Math.PI / 2), 8)
                const kneeBraceHigh = Vector.add(hip, off)
                const kneeBraceLow = Vector.add(kneeBraceHigh, Vector.mult(sub, 0.9))
                const foot = { x: m.foot.x - 10, y: m.foot.y - 15 }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(hip.x, hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(foot.x, foot.y);
                //extra upper leg brace
                ctx.moveTo(kneeBraceHigh.x, kneeBraceHigh.y);
                ctx.lineTo(kneeBraceLow.x, kneeBraceLow.y);
                ctx.lineTo(m.knee.x, m.knee.y);

                ctx.strokeStyle = stroke;
                ctx.lineWidth = 3;
                ctx.stroke();
                //foot
                ctx.beginPath();
                ctx.moveTo(foot.x, foot.y);
                ctx.quadraticCurveTo(m.foot.x - 30, m.foot.y + 12, m.foot.x + 13, m.foot.y + 3);
                ctx.lineWidth = 1.5;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y - 2, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 3, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
                //knee brace
                // ctx.moveTo(kneeBraceHigh.x + 4, kneeBraceHigh.y);
                // ctx.arc(kneeBraceHigh.x, kneeBraceHigh.y, 4, 0, 2 * Math.PI);
                ctx.moveTo(kneeBraceLow.x + 2.5, kneeBraceLow.y);
                ctx.arc(kneeBraceLow.x, kneeBraceLow.y, 2.5, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(foot.x + 2.5, foot.y);
                ctx.arc(foot.x, foot.y, 2.5, 0, 2 * Math.PI);
                ctx.fillStyle = "#f6f6f6"//m.fillColor;
                ctx.fill();
                ctx.lineWidth = 1;
                // ctx.strokeStyle = "#333"
                ctx.stroke();
                ctx.restore();
            }
        },
        mech() {
            m.isAltSkin = true
            m.yOffWhen.stand = 52
            m.yOffWhen.jump = 72
            m.coyoteCycles = 11
            m.hardLandCDScale = 0.5
            m.hardLanding = 160
            m.squirrelFx = 1.4;
            m.squirrelJump = 1.16;
            m.setMovement()

            m.draw = function () {
                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 39
                    const mag = 14 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.fillStyle = `rgba(0,0,0,${0.04 + 0.3 * time})`
                    ctx.fill()
                    // ctx.strokeStyle = "#333"
                    // ctx.lineWidth = 1
                    // ctx.stroke();
                    ctx.restore();
                }

                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -1.25);
                m.drawLeg("#606060");
                m.calcLeg(0, 0);
                m.drawLeg("#444");

                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.75 + m.yOffGoal * 0.25; //smoothly move leg height towards height goal
            }
            m.drawLeg = function (stroke) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                const hip = { x: m.hip.x - 5, y: m.hip.y + 5 }
                const sub = Vector.sub(m.knee, hip)
                const off = Vector.mult(Vector.rotate(Vector.normalise(sub), Math.PI / 2), 8)
                const kneeBraceHigh = Vector.add(hip, off)
                const kneeBraceLow = Vector.add(kneeBraceHigh, Vector.mult(sub, 0.9))
                const foot = { x: m.foot.x - 10, y: m.foot.y - 15 }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(hip.x, hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(foot.x, foot.y);
                //extra upper leg brace
                ctx.moveTo(kneeBraceHigh.x, kneeBraceHigh.y);
                ctx.lineTo(kneeBraceLow.x, kneeBraceLow.y);
                ctx.lineTo(m.knee.x, m.knee.y);

                ctx.strokeStyle = stroke;
                ctx.lineWidth = 3;
                ctx.stroke();
                //foot
                ctx.beginPath();
                ctx.moveTo(foot.x, foot.y);
                ctx.quadraticCurveTo(m.foot.x - 30, m.foot.y + 12, m.foot.x + 13, m.foot.y + 3);
                ctx.lineWidth = 1.5;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y - 1, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 3, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
                //knee brace
                // ctx.moveTo(kneeBraceHigh.x + 4, kneeBraceHigh.y);
                // ctx.arc(kneeBraceHigh.x, kneeBraceHigh.y, 4, 0, 2 * Math.PI);
                ctx.moveTo(kneeBraceLow.x + 2.5, kneeBraceLow.y);
                ctx.arc(kneeBraceLow.x, kneeBraceLow.y, 2.5, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(foot.x + 2.5, foot.y);
                ctx.arc(foot.x, foot.y, 2.5, 0, 2 * Math.PI);
                ctx.fillStyle = m.fillColor;
                ctx.fill();
                ctx.lineWidth = 1;
                // ctx.strokeStyle = "#333"
                ctx.stroke();
                ctx.restore();
            }
        },
        polar() {
            m.isAltSkin = true
            // m.setFillColors();
            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
            let grd = ctx.createLinearGradient(-30, 0, 30, 0);
            grd.addColorStop(0, m.fillColorDark);
            grd.addColorStop(0.7, m.fillColor);
            // grd.addColorStop(1, m.fillColor);
            m.bodyGradient = grd

            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);

                const diff = (m.lastKillCycle - m.cycle + tech.isDamageCooldownTime) / tech.isDamageCooldownTime
                const color = diff < 0 ? "#fff" : "#aaa"
                const hue = 220 + 20 * Math.sin(0.01 * m.cycle)
                const colorInverse = diff < 0 ? `hsl(${hue}, 80%, 40%)` : "#fff"
                m.drawLeg(color, colorInverse);
                m.calcLeg(0, 0);
                m.drawLeg(color, colorInverse);

                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = color
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(15, 0)
                ctx.lineTo(28, 0)
                ctx.strokeStyle = colorInverse;
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.restore();

                ctx.beginPath();
                ctx.ellipse(m.pos.x, m.pos.y, 24, 18, 3.14 * Math.random(), 0, 2 * Math.PI)
                ctx.fillStyle = diff < 0 ? `hsl(${hue}, 80%, 40%)` : `rgba(255,255,255,${Math.min(Math.max(0, diff + 0.3), 1)})`
                ctx.fill();

                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke, circles) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 3;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 5, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = circles;
                ctx.fill();
                // ctx.lineWidth = 2;
                // ctx.stroke();
                ctx.restore();
            }
        },
        strokeGap() {
            m.isAltSkin = true
            m.yOffWhen.stand = 52
            m.yOffWhen.jump = 72
            // m.speedSmooth = 0
            // m.smoothAngle = 0
            m.draw = function () {
                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 40
                    const mag = 9 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    // ctx.fillStyle = `rgba(255,0,200,${0.4 * time})`
                    // ctx.fill()
                    // ctx.strokeStyle = "#f09"

                    ctx.fillStyle = `rgba(255,255,255,${0.3 + time})`;
                    ctx.fill()
                    ctx.strokeStyle = "#446"
                    ctx.lineWidth = 0.2 + 4 * time
                    // ctx.lineWidth = 1
                    ctx.stroke();
                    ctx.restore();
                }

                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -1.25);
                m.drawLeg("#606080");
                m.calcLeg(0, 0);
                m.drawLeg("#446");

                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                // ctx.arc(0, 0, 30, m.angle + 1, m.angle - 1);
                ctx.fillStyle = "#fff"//m.bodyGradient
                ctx.fill();
                ctx.beginPath();
                const arc = 0.7 + 0.17 * Math.sin(m.cycle * 0.012)
                ctx.arc(0, 0, 30, -arc, arc, true); //- Math.PI / 2
                ctx.strokeStyle = "#446";
                ctx.lineWidth = 2;
                ctx.stroke();

                //fire outline directed opposite player look direction
                // ctx.beginPath();
                // const radius = 40
                // const extend = -50
                // ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                // ctx.bezierCurveTo(extend, radius, extend, 0, -100, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                // ctx.bezierCurveTo(extend, 0, extend, -radius, 0, -radius);
                // ctx.fillStyle = "rgba(255,0,255,0.3)";
                // ctx.fill()
                ctx.beginPath();
                ctx.moveTo(13, 0)
                ctx.lineTo(20, 0)
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 14, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 14, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 12, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 12, m.foot.y + 8);
                }
                ctx.lineWidth = 4;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 8, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 4, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 4, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 4, m.foot.y + 1);
                ctx.arc(m.foot.x, m.foot.y + 1, 4, 0, 2 * Math.PI);
                ctx.fillStyle = m.fillColor;
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }
        },
        energy() {
            m.isAltSkin = true
            m.color = {
                hue: 184,
                sat: 100,
                light: 85,
            }
            m.setFillColors();
            m.draw = function () {
                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 40
                    const mag = 10 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.fillStyle = `hsla(184,100%,70%,${0.1 + 1.5 * time})`
                    ctx.fill()
                    ctx.strokeStyle = "#035"//"hsl(184,100%,70%)"
                    ctx.lineWidth = 0.2 + 3 * time
                    ctx.stroke();
                    ctx.restore();
                }

                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#456");
                m.calcLeg(0, 0);
                m.drawLeg("#345");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.strokeStyle = "rgba(0,255,255,0.25)";
                ctx.lineWidth = 15;
                ctx.stroke();
                ctx.fillStyle = 'hsl(184,100%,85%)' //m.fillColor; //"#9ff" //m.bodyGradient
                ctx.fill();

                ctx.beginPath();
                ctx.arc(17, 0, 5.5, 0, 2 * Math.PI);
                ctx.fillStyle = "#357"
                ctx.fill();
                ctx.restore();

                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 3;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 10, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 6, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 6, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y + 1, 5, 0, 2 * Math.PI);
                ctx.strokeStyle = "rgba(0,255,255,0.25)";
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.fillStyle = m.fillColor;
                ctx.fill();
                ctx.restore();
            }
        },
        tungsten() {
            m.hardLandCDScale = 2
            m.hardLanding = 60
            // m.coyoteCycles = 0
            m.isAltSkin = true
            m.color = {
                hue: 210,
                sat: 5,
                light: 75,
            }
            // m.setFillColors();
            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 50}%)`
            const grd = ctx.createLinearGradient(-30, -5, 30, 10);
            grd.addColorStop(0, `#e0e0e0`);
            grd.addColorStop(0.3, `#bbb`);
            grd.addColorStop(0.4, `#b3b3b3`);
            grd.addColorStop(0.5, `#c5c5c5`);
            grd.addColorStop(0.65, `#bbb`);
            grd.addColorStop(0.7, `#b3b3b3`);
            grd.addColorStop(0.75, `#bbb`);
            grd.addColorStop(1, `#e0e0e0`);
            // const grdRad = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
            // grdRad.addColorStop(0, `rgba(0,0,0,0.3)`);
            // grdRad.addColorStop(0.5, `rgba(210,210,210,0)`);
            m.bodyGradient = grd

            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(4.2, -3);
                m.drawLeg("#666");
                m.calcLeg(2.1, -1);
                m.drawLeg("#5f5f5f");
                m.calcLeg(0, 1);
                m.drawLeg("#555");
                ctx.rotate(m.angle);

                const size = 33
                ctx.beginPath();
                ctx.lineTo(size * 1, size * 0)
                ctx.lineTo(size * 0.5, size * 0.866)
                ctx.lineTo(size * -0.5, size * 0.866)
                ctx.lineTo(size * -1, size * 0)
                ctx.lineTo(size * -0.5, size * -0.866)
                ctx.lineTo(size * 0.5, size * -0.866)
                ctx.lineTo(size * 1, size * 0)
                ctx.lineTo(size * 0.5, size * 0)
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(15, 0, 3, 0, 2 * Math.PI);
                ctx.fillStyle = "#333"
                ctx.fill();

                ctx.restore();
                m.yOff = m.yOff * 0.9 + m.yOffGoal * 0.1; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 4.5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y - 1);
                ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                ctx.lineTo(m.foot.x, m.foot.y - 1);
                ctx.lineWidth = 4;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y - 4, 12, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 6, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 6, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = m.fillColor;
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#000"
                ctx.stroke();
                ctx.restore();
            }

        },
        anodize() {
            m.isAltSkin = true
            m.color = {
                hue: 210,
                sat: 14,
                light: 65,
            }
            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 50}%)`
            const grd = ctx.createRadialGradient(16, 0, 0, 0, 0, 40);
            grd.addColorStop(0, `#c78034`);
            grd.addColorStop(0.04, `#bd5235`);
            grd.addColorStop(0.08, `#ab554d`);
            grd.addColorStop(0.12, `#8f5d8f`);
            grd.addColorStop(0.16, `#4352ab`);
            grd.addColorStop(0.2, `#2058b3`);
            grd.addColorStop(0.24, `#1a6fc4`);
            grd.addColorStop(0.28, `#1b85cf`);
            grd.addColorStop(0.32, `#2d9bd7`);
            grd.addColorStop(0.4, `#d2d7b4`);
            grd.addColorStop(0.44, `#e1cd87`);
            grd.addColorStop(0.48, `#f0b955`);
            grd.addColorStop(0.52, `#ffa050`);
            grd.addColorStop(0.56, `#ff8269`);
            grd.addColorStop(0.6, `#f5697d`);
            grd.addColorStop(0.64, `#e65aaf`);
            grd.addColorStop(0.68, `#d732d7`);
            grd.addColorStop(0.72, `#c846e6`);
            grd.addColorStop(0.76, `#c850fa`);
            grd.addColorStop(0.8, `#878cf0`);
            grd.addColorStop(0.84, `#37beeb`);
            grd.addColorStop(0.88, `#00d2be`);
            grd.addColorStop(0.92, `#00e19b`);
            grd.addColorStop(0.96, `#19f5aa`);
            grd.addColorStop(1, `#aaf5af`);
            m.bodyGradient = grd

            m.draw = function () {
                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 40
                    const mag = 12 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.fillStyle = `hsla(${simulation.cycle},100%,70%,${0.1 + 2 * time})`
                    ctx.fill()
                    ctx.restore();
                }

                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a5a");
                m.calcLeg(0, 0);
                m.drawLeg("#445");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                // ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#222";
                ctx.lineWidth = 2;
                // ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 4;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
                ctx.fillStyle = "#222";
                ctx.fill();
                //knee joint
                ctx.beginPath();
                ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
                ctx.fill();
                //foot joint
                ctx.beginPath();
                ctx.arc(m.foot.x, m.foot.y, 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        },
        dilate() {
            m.isAltSkin = true
            simulation.isAutoZoom = false;
            m.draw = function () {
                const amplitude = 8 + 4 * Math.sin(m.cycle * 0.01)
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#456");
                m.calcLeg(0, 0);
                m.drawLeg("#345");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.strokeStyle = "#345";
                ctx.lineWidth = 2;
                ctx.arc(12, 0, amplitude, 0, 2 * Math.PI); //big eye
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(12, 0, amplitude, 0, 2 * Math.PI); //big eye
                // ctx.fillStyle = `hsl(0,0%,${50+50*Math.sin(m.cycle * 0.0075+Math.PI)}%)` //`hsl(${150+50*Math.sin(m.cycle * 0.0075)},100%,50%)`
                // ctx.fill();
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal

                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 39
                    const mag = 6 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
                    // ctx.fillStyle = `hsla(${simulation.cycle * 0.5},100%,70%,0.4)`
                    // ctx.fill()
                    ctx.strokeStyle = "#345"
                    // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.lineWidth = 0.2 + 4 * time
                    ctx.stroke();
                    ctx.restore();
                }

                //zoom camera in and out
                simulation.setZoom(1800 + 400 * Math.sin(m.cycle * 0.01))
            }
        },
        dilate2() {
            m.isAltSkin = true
            m.draw = function () {
                const amplitude = Math.sin(m.cycle * 0.01)

                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#456");
                m.calcLeg(0, 0);
                m.drawLeg("#345");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.strokeStyle = "#345";
                ctx.lineWidth = 3 + 3 * Math.sin(m.cycle * 0.01 + Math.PI);
                ctx.stroke();
                // ctx.arc(12, 0, 8 + 4 * amplitude, 0, 2 * Math.PI); //big eye
                ctx.beginPath();
                ctx.arc(12, 0, 8 + 4 * amplitude, 0, 2 * Math.PI); //big eye
                ctx.fillStyle = "#345"
                // ctx.fillStyle = //`hsl(0,0%,${50+50*Math.sin(m.cycle * 0.0075+Math.PI)}%)` //`hsl(${150+50*Math.sin(m.cycle * 0.0075)},100%,50%)`
                // ctx.fillStyle = `hsl(${150 + 100 * amplitude},100%,50%)`
                ctx.fill();
                // ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal

                if (powerUps.boost.endCycle > simulation.cycle) {
                    //gel that acts as if the wind is blowing it when player moves
                    ctx.save();
                    ctx.translate(m.pos.x, m.pos.y);
                    m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                    ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                    ctx.beginPath();
                    const radius = 39
                    const mag = 6 * Vector.magnitude(m.velocitySmooth) + radius
                    ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                    ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
                    // ctx.fillStyle = `hsla(${simulation.cycle * 0.5},100%,70%,0.4)`
                    // ctx.fill()
                    const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

                    ctx.strokeStyle = "#345"
                    ctx.lineWidth = 0.2 + 7 * time
                    // ctx.lineWidth = (4 + 3 * Math.sin(m.cycle * 0.01 + Math.PI)) * time;
                    ctx.stroke();
                    ctx.restore();
                }

                simulation.setZoom(1800 + 400 * amplitude)
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 6 + 2 * Math.sin(m.cycle * 0.01 + Math.PI);
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 4;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 7, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 7, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 6, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 6, 0, 2 * Math.PI);
                ctx.fillStyle = "#345";
                ctx.fill();
                ctx.lineWidth = 3 + 3 * Math.sin(m.cycle * 0.01 + Math.PI);
                ctx.stroke();
                ctx.restore();
            }
        },
        CPT() {
            m.isAltSkin = true

            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
            let grd = ctx.createLinearGradient(-20, 0, 15, 0);
            grd.addColorStop(0, m.fillColorDark);
            grd.addColorStop(1, m.fillColor);
            // grd.addColorStop(1, m.fillColor);
            m.bodyGradient = grd
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#eee");
                m.calcLeg(0, 0);
                m.drawLeg("#fff");

                ctx.rotate(0.024 * simulation.cycle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.energy > 0.85 * Math.min(1, m.maxEnergy) ? m.bodyGradient : "#fff"
                ctx.fill();
                ctx.restore();

                ctx.beginPath();
                ctx.arc(m.pos.x + 15 * Math.cos(m.angle), m.pos.y + 15 * Math.sin(m.angle), 5, 0, 2 * Math.PI);
                ctx.fillStyle = "#000"
                ctx.fill();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 5;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 3;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 5, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "#000";
                ctx.fill();
                // ctx.lineWidth = 2;
                // ctx.stroke();
                ctx.restore();
            }
        },
        verlet() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -2);
                m.drawLeg("#4a4a4a");
                m.calcLeg(0, 0);
                m.drawLeg("#333");

                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                const rate = 0.09
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, rate * (simulation.cycle + 0) % 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, rate * (simulation.cycle + 15 / rate) % 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.globalCompositeOperation = "difference";
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(21, 0, 8, 0, 2 * Math.PI);
                ctx.fillStyle = input.fire ? "#0ff" : input.field ? "#d30" : `#fff`
                ctx.fill();
                ctx.restore();

                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 1;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                const footDrop = m.onGround ? 5 : 10
                ctx.lineTo(m.foot.x - 15, m.foot.y + footDrop);
                ctx.moveTo(m.foot.x, m.foot.y);
                ctx.lineTo(m.foot.x + 15, m.foot.y + footDrop);
                ctx.lineWidth = 1;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 5, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "#000";
                ctx.fill();
                // ctx.lineWidth = 2;
                // ctx.stroke();
                ctx.restore();
            }
        },
        stubs() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#555");
                m.calcLeg(0, 0);
                m.drawLeg("#333");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y + 5);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.restore();
            }
        },
        Sleipnir() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                ctx.translate(m.pos.x, m.pos.y);
                for (let i = 0; i < 16; i++) {
                    m.calcLeg(Math.PI * i / 8, -3 * i / 16)
                    m.drawLeg("#444")
                }
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
        },
        diegesis() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;

                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a4a");
                m.calcLeg(0, 0);
                m.drawLeg("#333");
                ctx.rotate(m.angle - (m.fireCDcycle !== Infinity ? m.flipLegs * 0.25 * Math.pow(Math.max(m.fireCDcycle - m.cycle, 0), 0.5) : 0));

                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
        },
        cat() {
            m.isAltSkin = true
            m.coyoteCycles = 10
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a4a");
                if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) {
                    ctx.scale(1, -1);
                    ctx.rotate(Math.PI);
                }
                ctx.beginPath();
                ctx.moveTo(-30, 0);
                ctx.bezierCurveTo(-65, -75,
                    -5, 150 + (5 * Math.sin(simulation.cycle / 10)),
                    -70 + (10 * Math.sin(simulation.cycle / 10)), 0 + (10 * Math.sin(simulation.cycle / 10)));
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 4;
                ctx.stroke();

                if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) {
                    ctx.scale(1, -1);
                    ctx.rotate(0 - Math.PI);
                }
                m.calcLeg(0, 0);
                m.drawLeg("#333");

                ctx.rotate(m.angle);
                if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) ctx.scale(1, -1);
                ctx.beginPath();
                ctx.moveTo(5, -30);
                ctx.lineTo(20, -40);
                ctx.lineTo(20, -20);
                ctx.lineWidth = 2;
                ctx.fillStyle = "#f3f";
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.stroke();
                ctx.moveTo(19, 0);
                ctx.arc(15, 0, 4, Math.PI, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(24.3, 6, 5, Math.PI * 2, Math.PI);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(30, 6);
                ctx.lineTo(32, 0);
                ctx.lineTo(26, 0);
                ctx.lineTo(30, 6);
                ctx.fillStyle = "#f3f";
                ctx.fill();
                ctx.stroke();

                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
        },
        pareidolia() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.7
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a4a");
                m.calcLeg(0, 0);
                m.drawLeg("#333");
                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) ctx.scale(1, -1); //here is the flip
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(2, -6, 7, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(25, -6, 7, 0.25 * Math.PI, 1.6 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(2, -10, 9, 1.25 * Math.PI, 1.75 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(25, -10, 9, 1.25 * Math.PI, 1.4 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(18, 13, 10, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient;
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(18, 13, 6, 0, 2 * Math.PI);
                ctx.fillStyle = "#555";
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(3, -6, 3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(26, -6, 3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15;
                powerUps.boost.draw()
            }
        },
        flipFlop() {
            m.isAltSkin = true
            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;

                //draw body
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                ctx.translate(m.pos.x, m.pos.y);

                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a4a");
                m.calcLeg(0, 0);
                m.drawLeg("#333");

                ctx.rotate(m.angle);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                //draw eye
                ctx.beginPath();
                ctx.arc(15, 0, 3.5, 0, 2 * Math.PI);
                ctx.fillStyle = m.eyeFillColor;
                ctx.fill()
                ctx.restore();

                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
        },
        hexagon() {
            m.isAltSkin = true

            m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
            m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
            let grd = ctx.createLinearGradient(-30, 0, 30, 0);
            grd.addColorStop(0, m.fillColorDark);
            grd.addColorStop(0.7, m.fillColor);
            // grd.addColorStop(1, m.fillColor);
            m.bodyGradient = grd

            m.draw = function () {
                ctx.fillStyle = m.fillColor;
                m.walk_cycle += m.flipLegs * m.Vx;
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
                ctx.translate(m.pos.x, m.pos.y);
                m.calcLeg(Math.PI, -3);
                m.drawLeg("#4a4a4a");
                m.calcLeg(0, 0);
                m.drawLeg("#333");
                ctx.rotate(m.angle);

                const size = 32
                ctx.beginPath();
                ctx.lineTo(size * 1, size * 0)
                ctx.lineTo(size * 0.5, size * 0.866)
                ctx.lineTo(size * -0.5, size * 0.866)
                ctx.lineTo(size * -1, size * 0)
                ctx.lineTo(size * -0.5, size * -0.866)
                ctx.lineTo(size * 0.5, size * -0.866)
                ctx.lineTo(size * 1, size * 0)
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
                powerUps.boost.draw()
            }
            m.drawLeg = function (stroke) {
                // if (simulation.mouseInGame.x > m.pos.x) {
                if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
                    m.flipLegs = 1;
                } else {
                    m.flipLegs = -1;
                }
                ctx.save();
                ctx.scale(m.flipLegs, 1); //leg lines
                ctx.beginPath();
                ctx.moveTo(m.hip.x, m.hip.y);
                ctx.lineTo(m.knee.x, m.knee.y);
                ctx.lineTo(m.foot.x, m.foot.y);
                ctx.strokeStyle = stroke;
                ctx.lineWidth = 6;
                ctx.stroke();

                //toe lines
                ctx.beginPath();
                ctx.moveTo(m.foot.x, m.foot.y);
                if (m.onGround) {
                    ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
                } else {
                    ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
                    ctx.moveTo(m.foot.x, m.foot.y);
                    ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
                }
                ctx.lineWidth = 3;
                ctx.stroke();

                //hip joint
                ctx.beginPath();
                ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
                //knee joint
                ctx.moveTo(m.knee.x + 5, m.knee.y);
                ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
                //foot joint
                ctx.moveTo(m.foot.x + 5, m.foot.y);
                ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "#000";
                ctx.fill();
                // ctx.lineWidth = 2;
                // ctx.stroke();
                ctx.restore();
            }
        },
    },
    // *********************************************
    // **************** fields *********************
    // *********************************************
    closest: {
        dist: 1000,
        index: 0
    },
    isHolding: false,
    isCloak: false,
    throwCharge: 0,
    fireCDcycle: 0,
    fieldCDcycle: 0,
    fieldMode: 0, //basic field mode before upgrades
    maxEnergy: 1, //can be increased by a tech
    holdingTarget: null,
    timeSkipLastCycle: 0,
    coupling: 0,
    // these values are set on reset by setHoldDefaults()
    fieldFx: 1,
    fieldJump: 1,
    blockingRecoil: 4,
    grabPowerUpRange2: 0,
    isFieldActive: false,
    fieldRange: 155,
    fieldShieldingScale: 1,
    fieldDamage: 1,
    isSneakAttack: false,
    lastHit: 0, //stores value of last damage player took above a threshold, in m.damage
    sneakAttackCycle: 0,
    enterCloakCycle: 0,
    duplicateChance: 0,
    energy: 0,
    fieldRegen: 0.001,
    fieldMode: 0,
    fieldFire: false,
    fieldHarmReduction: 1,
    holdingMassScale: 0,
    hole: {
        isOn: false,
        isReady: false,
        pos1: { x: 0, y: 0 },
        pos2: { x: 0, y: 0 },
    },
    fieldArc: 0,
    fieldThreshold: 0,
    calculateFieldThreshold() {
        m.fieldThreshold = Math.cos((m.fieldArc) * Math.PI)
    },
    setHoldDefaults() {
        // if (tech.isFreeWormHole && m.fieldMode !== 9) { //not wormhole
        //     const removed = tech.removeTech("charmed baryon") //neutronum can get player stuck so it has to be removed if player has wrong field
        //     if (removed) powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
        // }
        if (tech.isNeutronium && m.fieldMode !== 3) { //not negative mass field
            const removed = tech.removeTech("neutronium") //neutronum can get player stuck so it has to be removed if player has wrong field
            if (removed) powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
        }
        if (m.energy < m.maxEnergy) m.energy = m.maxEnergy;
        m.fieldMeterColor = "#0cf"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldShieldingScale = 1;
        m.fieldBlockCD = 10;
        m.fieldDamage = 1
        m.fieldHarmReduction = 1;
        m.isSneakAttack = false
        m.duplicateChance = 0
        m.grabPowerUpRange2 = 200000;
        m.blockingRecoil = 4;
        m.fieldRange = 155;
        m.fieldFire = false;
        m.fieldCDcycle = 0;
        m.isCloak = false;
        player.collisionFilter.mask = cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield
        m.airSpeedLimit = 125
        m.fieldFx = 1
        m.fieldJump = 1
        m.setFieldRegen();
        m.setMovement();
        m.drop();
        m.holdingMassScale = 0.5;
        m.fieldArc = 0.2; //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
        m.calculateFieldThreshold(); //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
        m.isTimeDilated = true;
        m.wakeCheck();
        m.setMaxEnergy(false);
        m.setMaxHealth(false);
        m.couplingChange()
        m.hole = {
            isOn: false,
            isReady: false,
            pos1: { x: 0, y: 0 },
            pos2: { x: 0, y: 0 },
        }
    },
    setMaxEnergy(isMessage = true) {
        m.maxEnergy = (tech.isMaxEnergyTech ? 0.5 : 1) + tech.bonusEnergy + tech.healMaxEnergyBonus + tech.harmonicEnergy + 3 * tech.isGroundState + 1.5 * (m.fieldMode === 1) + (m.fieldMode === 0 || m.fieldMode === 1) * 0.05 * m.coupling + 0.77 * tech.isStandingWaveExpand
        if (level.isReducedEnergy) m.maxEnergy *= 0.5
        if (isMessage) simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-f'>maxEnergy</span> <span class='color-symbol'>=</span> ${(m.maxEnergy.toFixed(2))}`)
    },
    fieldMeterColor: "#0cf",
    drawRegenEnergy(bgColor = "rgba(0, 0, 0, 0.4)", range = 60) {
        if (m.energy < m.maxEnergy) {
            m.regenEnergy();
            ctx.fillStyle = bgColor;
            const xOff = m.pos.x - m.radius * m.maxEnergy
            const yOff = m.pos.y - 50
            ctx.fillRect(xOff, yOff, range * m.maxEnergy, 10);
            ctx.fillStyle = m.fieldMeterColor;
            ctx.fillRect(xOff, yOff, range * m.energy, 10);
        } else if (m.energy > m.maxEnergy + 0.05) {
            ctx.fillStyle = bgColor;
            const xOff = m.pos.x - m.radius * m.energy
            const yOff = m.pos.y - 50
            // ctx.fillRect(xOff, yOff, range * m.maxEnergy, 10);
            ctx.fillStyle = m.fieldMeterColor;
            ctx.fillRect(xOff, yOff, range * m.energy, 10);
        }
    },
    drawRegenEnergyCloaking: function () {
        if (m.energy < m.maxEnergy) { // replaces m.drawRegenEnergy() with custom code
            m.regenEnergy();
            const xOff = m.pos.x - m.radius * m.maxEnergy
            const yOff = m.pos.y - 50
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)" //
            ctx.fillRect(xOff, yOff, 60 * m.maxEnergy, 10);
            ctx.fillStyle = "#fff" //m.cycle > m.lastKillCycle + 300 ? "#000" : "#fff" //"#fff";
            ctx.fillRect(xOff, yOff, 60 * m.energy, 10);
            ctx.beginPath()
            ctx.rect(xOff, yOff, 60 * m.maxEnergy, 10);
            ctx.strokeStyle = m.fieldMeterColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    },
    setFieldRegen() {
        if (m.fieldMode === 0) {
            m.fieldRegen = 0.00067  //4 energy per second for field emitter
        } else if (m.fieldMode === 6) {
            m.fieldRegen = 0.002  //12 energy per second for time dilation
        } else if (m.fieldMode === 2) {
            m.fieldRegen = 0.000833 //5 energy per second perfect dia
        } else if (m.fieldMode === 4) {
            m.fieldRegen = 0.002 //12 energy per second molecular assembler
        } else if (m.fieldMode === 5) {
            m.fieldRegen = 0.001667 //10 energy per second  plasma torch
        } else if (m.fieldMode === 8) {
            m.fieldRegen = 0.001667 //10 energy per second pilot wave
        } else if (m.fieldMode === 9) {
            m.fieldRegen = 0.001334 //8 energy per second wormhole
        } else if (m.fieldMode === 10) {
            m.fieldRegen = 0.0015 //9 energy per second grappling hook
        } else {
            m.fieldRegen = 0.001 //6 energy per second
        }
        if (m.fieldMode === 0 || m.fieldMode === 4) m.fieldRegen += 0.0001 * m.coupling
        if (tech.isTimeCrystals) {
            m.fieldRegen *= 2.5
        } else if (tech.isGroundState) {
            m.fieldRegen *= 0.66
        }
    },
    regenEnergy() { //used in drawRegenEnergy  // rewritten by some tech
        if (m.immuneCycle < m.cycle && m.fieldCDcycle < m.cycle) m.energy += m.fieldRegen * level.isReducedRegen;
        if (m.energy < 0) m.energy = 0
    },
    regenEnergyDefault() {
        if (m.immuneCycle < m.cycle && m.fieldCDcycle < m.cycle) m.energy += m.fieldRegen * level.isReducedRegen;
        if (m.energy < 0) m.energy = 0
    },
    lookingAt(who) {
        //calculate a vector from body to player and make it length 1
        const diff = Vector.normalise(Vector.sub(who.position, m.pos));
        //make a vector for the player's direction of length 1
        const dir = { x: Math.cos(m.angle), y: Math.sin(m.angle) };
        //the dot product of diff and dir will return how much over lap between the vectors
        if (Vector.dot(dir, diff) > m.fieldThreshold) {
            return true;
        }
        return false;
    },
    drop() {
        if (m.isHolding) {
            m.fieldCDcycle = m.cycle + 15;
            m.isHolding = false;
            m.throwCharge = 0;
            m.definePlayerMass()
        }
        if (m.holdingTarget) {
            m.holdingTarget.collisionFilter.category = cat.body;
            m.holdingTarget.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
            m.holdingTarget = null;
        }
    },
    definePlayerMass(mass = m.defaultMass) {
        Matter.Body.setMass(player, mass);
        //reduce air and ground move forces
        m.setMovement()
        //make player stand a bit lower when holding heavy masses
        m.yOffWhen.stand = Math.max(m.yOffWhen.crouch, Math.min(49, 49 - (mass - 5) * 6))
        if (m.onGround && !m.crouch) m.yOffGoal = m.yOffWhen.stand;
    },
    drawHold(target, stroke = true) {
        if (target) {
            const eye = 15;
            const len = target.vertices.length - 1;
            ctx.fillStyle = "rgba(110,170,200," + (0.2 + 0.4 * Math.random()) + ")";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(
                m.pos.x + eye * Math.cos(m.angle),
                m.pos.y + eye * Math.sin(m.angle)
            );
            ctx.lineTo(target.vertices[len].x, target.vertices[len].y);
            ctx.lineTo(target.vertices[0].x, target.vertices[0].y);
            ctx.fill();
            if (stroke) ctx.stroke();
            for (let i = 0; i < len; i++) {
                ctx.beginPath();
                ctx.moveTo(
                    m.pos.x + eye * Math.cos(m.angle),
                    m.pos.y + eye * Math.sin(m.angle)
                );
                ctx.lineTo(target.vertices[i].x, target.vertices[i].y);
                ctx.lineTo(target.vertices[i + 1].x, target.vertices[i + 1].y);
                ctx.fill();
                if (stroke) ctx.stroke();
            }
        }
    },
    holding() {
        if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle - 1
        if (m.holdingTarget) {
            m.energy -= m.fieldRegen;
            if (m.energy < 0) m.energy = 0;
            Matter.Body.setPosition(m.holdingTarget, {
                x: m.pos.x + 70 * Math.cos(m.angle),
                y: m.pos.y + 70 * Math.sin(m.angle)
            });
            Matter.Body.setVelocity(m.holdingTarget, player.velocity);
            Matter.Body.rotate(m.holdingTarget, 0.01 / m.holdingTarget.mass); //gently spin the block
        } else {
            m.isHolding = false
        }
    },
    throwBlock() { },
    throwBlockDefault() {
        if (m.holdingTarget) {
            if (input.field) {
                if (m.energy > 0.001) {
                    if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle
                    if (tech.isCapacitor && m.throwCharge < 4) m.throwCharge = 4
                    m.throwCharge += 0.5 / m.holdingTarget.mass / b.fireCDscale
                    if (m.throwCharge < 6) m.energy -= 0.001 / b.fireCDscale; // m.throwCharge caps at 5 

                    //trajectory path prediction
                    if (tech.isTokamak) {
                        //draw charge
                        const x = m.pos.x + 15 * Math.cos(m.angle);
                        const y = m.pos.y + 15 * Math.sin(m.angle);
                        const len = m.holdingTarget.vertices.length - 1;
                        const opacity = m.throwCharge > 4 ? 0.65 : m.throwCharge * 0.06
                        ctx.fillStyle = `rgba(255,0,255,${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
                        ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
                        ctx.fill();
                        for (let i = 0; i < len; i++) {
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
                            ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
                            ctx.fill();
                        }
                        if (tech.isTokamakFly && m.throwCharge > 4 && m.energy > 0.01) {
                            player.force.y -= 0.5 * player.mass * simulation.g; //add some reduced gravity
                            // const mass = (player.mass + 10) / 3 * simulation.g //this makes it so you fly slower with larger blocks
                            let isDrain = false
                            const thrust = player.mass * simulation.g * Math.pow(5 / player.mass, 0.1)
                            if (input.down) {
                                isDrain = true
                                player.force.y += 0.9 * thrust;
                            } else if (input.up) {
                                isDrain = true
                                player.force.y -= 0.9 * thrust
                            }
                            if (!m.onGround) {
                                if (input.left) {
                                    isDrain = true
                                    player.force.x -= 0.4 * thrust
                                } else if (input.right) {
                                    isDrain = true
                                    player.force.x += 0.4 * thrust
                                }
                                if (isDrain) m.energy -= 0.0017;
                            }

                        }
                    } else {
                        if (tech.isGroupThrow) {
                            const range = 810000

                            for (let i = 0; i < body.length; i++) {
                                const sub = Vector.sub(m.pos, body[i].position)
                                const dist2 = Vector.magnitudeSquared(sub)
                                if (dist2 < range) {
                                    body[i].force.y -= body[i].mass * (simulation.g * 1.01); //remove a bit more then standard gravity
                                    if (dist2 > 40000) {
                                        const f = Vector.mult(Vector.normalise(sub), 0.0008 * body[i].mass)
                                        body[i].force.x += f.x
                                        body[i].force.y += f.y
                                        Matter.Body.setVelocity(body[i], { x: 0.96 * body[i].velocity.x, y: 0.96 * body[i].velocity.y });
                                    }
                                }
                            }
                            ctx.beginPath();
                            ctx.arc(m.pos.x, m.pos.y, Math.sqrt(range), 0, 2 * Math.PI);
                            ctx.fillStyle = "rgba(245,245,255,0.15)";
                            ctx.fill();
                            // ctx.globalCompositeOperation = "difference";
                            // ctx.globalCompositeOperation = "source-over";
                        }
                        //draw charge
                        const x = m.pos.x + 15 * Math.cos(m.angle);
                        const y = m.pos.y + 15 * Math.sin(m.angle);
                        const len = m.holdingTarget.vertices.length - 1;
                        const edge = m.throwCharge * m.throwCharge * m.throwCharge;
                        const grd = ctx.createRadialGradient(x, y, edge, x, y, edge + 5);
                        grd.addColorStop(0, "rgba(255,50,150,0.3)");
                        grd.addColorStop(1, "transparent");
                        ctx.fillStyle = grd;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
                        ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
                        ctx.fill();
                        for (let i = 0; i < len; i++) {
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
                            ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
                            ctx.fill();
                        }
                        //trajectory prediction
                        const cycles = 30
                        const charge = Math.min(m.throwCharge / 5, 1)
                        const speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))
                        const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }
                        ctx.beginPath()
                        for (let i = 1, len = 10; i < len + 1; i++) {
                            const time = cycles * i / len
                            ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
                        }
                        ctx.strokeStyle = "rgba(68, 68, 68, 0.15)" //color.map
                        ctx.lineWidth = 2
                        ctx.stroke()
                    }
                } else {
                    m.drop()
                }
            } else if (m.throwCharge > 0) { //Matter.Query.region(mob, player.bounds)
                if (m.holdingTarget.isPrinted) m.holdingTarget.isPrinted = undefined
                //throw the body
                m.fieldCDcycle = m.cycle + 20;
                m.fireCDcycle = m.cycle + 20;

                m.isHolding = false;

                if (tech.isTokamak && m.throwCharge > 4) { //remove the block body and pulse  in the direction you are facing
                    //m.throwCharge > 5 seems to be when the field full colors in a block you are holding
                    m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
                    if (m.immuneCycle < m.cycle) m.energy += 0.25 * Math.sqrt(m.holdingTarget.mass) * Math.min(5, m.throwCharge) * level.isReducedRegen
                    m.throwCharge = 0;
                    m.definePlayerMass() //return to normal player mass
                    //remove block before pulse, so it doesn't get in the way
                    for (let i = 0; i < body.length; i++) {
                        if (body[i] === m.holdingTarget) {
                            Matter.Composite.remove(engine.world, body[i]);
                            body.splice(i, 1);
                        }
                    }
                    b.pulse(60 * Math.pow(m.holdingTarget.mass, 0.25), m.angle)
                    if (tech.isTokamakHeal && tech.tokamakHealCount < 5) {
                        tech.tokamakHealCount++
                        let massScale = Math.min(65 * Math.sqrt(m.maxHealth), 14 * Math.pow(m.holdingTarget.mass, 0.4))
                        if (powerUps.healGiveMaxEnergy) massScale = powerUps["heal"].size()
                        powerUps.spawn(m.pos.x, m.pos.y, "heal", true, massScale * (simulation.healScale ** 0.25) * Math.sqrt(tech.largerHeals * (tech.isHalfHeals ? 0.5 : 1)))  //    spawn(x, y, target, moving = true, mode = null, size = powerUps[target].size()) {
                    }
                } else { //normal throw
                    //bullet-like collisions
                    m.holdingTarget.collisionFilter.category = cat.bullet
                    m.holdingTarget.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield;
                    if (tech.isBlockRestitution) {
                        m.holdingTarget.restitution = 0.999 //extra bouncy
                        m.holdingTarget.friction = m.holdingTarget.frictionStatic = m.holdingTarget.frictionAir = 0.001
                    }
                    //check every second to see if player is away from thrown body, and make solid
                    const solid = function (that) {
                        const dx = that.position.x - player.position.x;
                        const dy = that.position.y - player.position.y;
                        // if (that.speed < 3 && dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
                        if (dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
                            that.collisionFilter.category = cat.body; //make solid
                            that.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet; //can hit player now
                        } else {
                            setTimeout(solid, 40, that);
                        }
                    };
                    setTimeout(solid, 200, m.holdingTarget);

                    const charge = Math.min(m.throwCharge / 5, 1)
                    //***** scale throw speed with the first number, 80 *****
                    // let speed = 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25));
                    let speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))

                    if (Matter.Query.collides(m.holdingTarget, map).length !== 0) {
                        speed *= 0.7 //drop speed by 30% if touching map
                        if (Matter.Query.ray(map, m.holdingTarget.position, m.pos).length !== 0) speed = 0 //drop to zero if the center of the block can't see the center of the player through the map
                    }
                    m.throwCharge = 0;
                    m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
                    Matter.Body.setVelocity(m.holdingTarget, {
                        x: player.velocity.x * 0.5 + Math.cos(m.angle) * speed,
                        y: player.velocity.y * 0.5 + Math.sin(m.angle) * speed
                    });
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x - Math.cos(m.angle) * speed / (m.crouch ? 30 : 10) * Math.sqrt(m.holdingTarget.mass),
                        y: player.velocity.y - Math.sin(m.angle) * speed / 30 * Math.sqrt(m.holdingTarget.mass)
                    });
                    m.definePlayerMass() //return to normal player mass

                    if (tech.isStaticBlock) m.holdingTarget.isStatic = true
                    if (tech.isAddBlockMass) {
                        const expand = function (that, massLimit) {
                            if (that.mass < massLimit) {
                                const scale = 1.04;
                                Matter.Body.scale(that, scale, scale);
                                setTimeout(expand, 20, that, massLimit);
                            }
                        };
                        expand(m.holdingTarget, Math.min(20, m.holdingTarget.mass * 3))
                    }
                    if (tech.isGroupThrow) {
                        const range = 810000
                        for (let i = 0; i < body.length; i++) {
                            if (body[i] !== m.holdingTarget) {
                                const dist2 = Vector.magnitudeSquared(Vector.sub(m.pos, body[i].position))
                                if (dist2 < range) {
                                    const blockSpeed = 90 * charge * Math.min(0.85, 0.8 / Math.pow(body[i].mass, 0.25)) * Math.pow((range - dist2) / range, 0.2)
                                    Matter.Body.setVelocity(body[i], {
                                        x: body[i].velocity.x * 0.5 + Math.cos(m.angle) * blockSpeed,
                                        y: body[i].velocity.y * 0.5 + Math.sin(m.angle) * blockSpeed
                                    });
                                }
                            }
                        }
                    }
                }
            }
        } else {
            m.isHolding = false
        }
    },
    throwSelf() {
        if (m.holdingTarget) {
            if (input.field) {
                if (m.energy > 0.001) {
                    if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle
                    if (tech.isCapacitor && m.throwCharge < 4) m.throwCharge = 4
                    m.throwCharge += 0.5 / m.holdingTarget.mass / b.fireCDscale
                    if (m.throwCharge < 6) m.energy -= 0.001 / b.fireCDscale; // m.throwCharge caps at 5 

                    //trajectory path prediction
                    //draw charge
                    const x = m.pos.x + 15 * Math.cos(m.angle);
                    const y = m.pos.y + 15 * Math.sin(m.angle);
                    const len = m.holdingTarget.vertices.length - 1;
                    const edge = m.throwCharge * m.throwCharge * m.throwCharge;
                    const grd = ctx.createRadialGradient(x, y, edge, x, y, edge + 5);
                    grd.addColorStop(0, "rgba(255,50,150,0.3)");
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
                    ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
                    ctx.fill();
                    for (let i = 0; i < len; i++) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
                        ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
                        ctx.fill();
                    }
                    //trajectory prediction
                    const cycles = 30
                    const charge = Math.min(m.throwCharge / 5, 1)
                    const speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))
                    const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }
                    ctx.beginPath()
                    for (let i = 1, len = 10; i < len + 1; i++) {
                        const time = cycles * i / len
                        ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
                    }
                    ctx.strokeStyle = "rgba(68, 68, 68, 0.15)" //color.map
                    ctx.lineWidth = 2
                    ctx.stroke()

                } else {
                    m.drop()
                }
            } else if (m.throwCharge > 0) { //Matter.Query.region(mob, player.bounds)
                if (m.holdingTarget.isPrinted) m.holdingTarget.isPrinted = undefined
                //throw the body
                m.fieldCDcycle = m.cycle + 20;
                m.fireCDcycle = m.cycle + 20;

                m.isHolding = false;
                //bullet-like collisions
                m.holdingTarget.collisionFilter.category = cat.bullet
                m.holdingTarget.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield;
                if (tech.isBlockRestitution) {
                    m.holdingTarget.restitution = 0.999 //extra bouncy
                    m.holdingTarget.friction = m.holdingTarget.frictionStatic = m.holdingTarget.frictionAir = 0.001
                }
                //check every second to see if player is away from thrown body, and make solid
                const solid = function (that) {
                    const dx = that.position.x - player.position.x;
                    const dy = that.position.y - player.position.y;
                    // if (that.speed < 3 && dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
                    if (dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
                        that.collisionFilter.category = cat.body; //make solid
                        that.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet; //can hit player now
                    } else {
                        setTimeout(solid, 40, that);
                    }
                };
                setTimeout(solid, 200, m.holdingTarget);

                const charge = Math.min(m.throwCharge / 5, 1)
                //***** scale throw speed with the first number, 80 *****
                // let speed = 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25));
                let speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))


                m.throwCharge = 0;
                m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
                Matter.Body.setVelocity(m.holdingTarget, {
                    x: Math.cos(m.angle) * speed / (m.crouch ? 30 : 10) * Math.sqrt(m.holdingTarget.mass),
                    y: player.velocity.y - Math.sin(m.angle) * speed / 30 * Math.sqrt(m.holdingTarget.mass)
                });
                Matter.Body.setVelocity(player, {
                    x: player.velocity.x - player.velocity.x * 0.5 + Math.cos(m.angle) * speed,
                    y: player.velocity.y - player.velocity.y * 0.5 + Math.sin(m.angle) * speed
                });
                m.definePlayerMass() //return to normal player mass

                if (tech.isAddBlockMass) {
                    const expand = function (that, massLimit) {
                        if (that.mass < massLimit) {
                            const scale = 1.04;
                            Matter.Body.scale(that, scale, scale);
                            setTimeout(expand, 20, that, massLimit);
                        }
                    };
                    expand(m.holdingTarget, Math.min(20, m.holdingTarget.mass * 3))
                }

            }
        } else {
            m.isHolding = false
        }
    },
    drawField() {
        if (m.holdingTarget) {
            ctx.fillStyle = "rgba(110,170,200," + (m.energy * (0.05 + 0.05 * Math.random())) + ")";
            ctx.strokeStyle = "rgba(110, 200, 235, " + (0.3 + 0.08 * Math.random()) + ")" //"#9bd" //"rgba(110, 200, 235, " + (0.5 + 0.1 * Math.random()) + ")"
        } else {
            ctx.fillStyle = "rgba(110,170,200," + (0.02 + m.energy * (0.15 + 0.15 * Math.random())) + ")";
            ctx.strokeStyle = "rgba(110, 200, 235, " + (0.6 + 0.2 * Math.random()) + ")" //"#9bd" //"rgba(110, 200, 235, " + (0.5 + 0.1 * Math.random()) + ")"
        }
        // const off = 2 * Math.cos(simulation.cycle * 0.1)
        const range = m.fieldRange;
        ctx.beginPath();
        ctx.arc(m.pos.x, m.pos.y, range, m.angle - Math.PI * m.fieldArc, m.angle + Math.PI * m.fieldArc, false);
        ctx.lineWidth = 2;
        ctx.stroke();
        let eye = 13;
        let aMag = 0.75 * Math.PI * m.fieldArc
        let a = m.angle + aMag
        let cp1x = m.pos.x + 0.6 * range * Math.cos(a)
        let cp1y = m.pos.y + 0.6 * range * Math.sin(a)
        ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle))
        a = m.angle - aMag
        cp1x = m.pos.x + 0.6 * range * Math.cos(a)
        cp1y = m.pos.y + 0.6 * range * Math.sin(a)
        ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 1 * range * Math.cos(m.angle - Math.PI * m.fieldArc), m.pos.y + 1 * range * Math.sin(m.angle - Math.PI * m.fieldArc))
        ctx.fill();
        // ctx.lineTo(m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle));

        //draw random lines in field for cool effect
        let offAngle = m.angle + 1.7 * Math.PI * m.fieldArc * (Math.random() - 0.5);
        ctx.beginPath();
        eye = 15;
        ctx.moveTo(m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle));
        ctx.lineTo(m.pos.x + range * Math.cos(offAngle), m.pos.y + range * Math.sin(offAngle));
        ctx.strokeStyle = "rgba(120,170,255,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
    },
    grabPowerUp() { //look for power ups to grab with field
        if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle - 1
        for (let i = 0, len = powerUp.length; i < len; ++i) {
            if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
            const dxP = m.pos.x - powerUp[i].position.x;
            const dyP = m.pos.y - powerUp[i].position.y;
            const dist2 = dxP * dxP + dyP * dyP + 10;
            // float towards player  if looking at and in range  or  if very close to player
            if (
                dist2 < m.grabPowerUpRange2 &&
                (m.lookingAt(powerUp[i]) || dist2 < 10000) &&
                Matter.Query.ray(map, powerUp[i].position, m.pos).length === 0
            ) {
                if (!tech.isHealAttract || powerUp[i].name !== "heal") { //if you have accretion heals are already pulled in a different way
                    powerUp[i].force.x += 0.04 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
                    powerUp[i].force.y += 0.04 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                    Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 }); //extra friction
                }
                if ( //use power up if it is close enough
                    dist2 < 5000 &&
                    !simulation.isChoosing &&
                    (powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01 || tech.isOverHeal)
                ) {
                    powerUps.onPickUp(powerUp[i]);
                    Matter.Body.setVelocity(player, { //player knock back, after grabbing power up
                        x: player.velocity.x + powerUp[i].velocity.x / player.mass * 4 * powerUp[i].mass,
                        y: player.velocity.y + powerUp[i].velocity.y / player.mass * 4 * powerUp[i].mass
                    });
                    powerUp[i].effect();
                    Matter.Composite.remove(engine.world, powerUp[i]);
                    powerUp.splice(i, 1);
                    return; //because the array order is messed up after splice
                }
            }
        }
    },
    minEnergyToDeflect: 0.05,
    bulletsToBlocks(who) {
        if (who.isMobBullet && !who.isInvulnerable && who.mass < 10 && body.length < mobs.maxMobBody) {
            // spawn block
            body[body.length] = Matter.Bodies.polygon(who.position.x, who.position.y, who.vertices.length, who.radius, {
                friction: 0.05,
                frictionAir: 0.001,
                collisionFilter: {
                    category: cat.bullet,
                    mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
                },
                classType: "body",
                isPrinted: true,
                radius: 10, //used to grow and warp the shape of the block
                density: 0.002, //double density for 2x damage
            });
            const block = body[body.length - 1]
            Composite.add(engine.world, block); //add to world
            //reverse velocity and make sure it's above 40
            const unit = Vector.mult(Vector.normalise(who.velocity), -Math.max(40, who.speed))
            Matter.Body.setVelocity(block, unit);

            simulation.ephemera.push({
                name: "remove block",
                count: 120, //cycles before it self removes
                do() {
                    this.count--
                    if (this.count < 0) {
                        simulation.removeEphemera(this.name)
                        Matter.Composite.remove(engine.world, block);
                        //find block
                        for (let i = 0; i < body.length; i++) {
                            if (body[i] === block) {
                                body.splice(i, 1);
                                break
                            }
                        }

                    }
                },
            })
            //remove mob bullet
            Matter.Composite.remove(engine.world, who); //remove from physics early to avoid collisions with block
            who.alive = false
        }
    },
    pushMass(who, fieldBlockCost = (0.025 + Math.sqrt(who.mass) * Vector.magnitude(Vector.sub(who.velocity, player.velocity)) * 0.002) * m.fieldShieldingScale) {
        if (m.energy > m.minEnergyToDeflect) { //shield needs at least some of the cost to block
            if (who.isShielded) fieldBlockCost *= 2; //shielded mobs take more energy to block
            m.energy -= fieldBlockCost
            if (m.energy < m.minEnergyToDeflect) {
                m.energy = 0;
                m.fieldCDcycle = m.cycle + Math.max(m.fieldBlockCD, 60);
                if (tech.isLaserField) {
                    simulation.ephemera.push({
                        name: "laser field", //used to find this array element in simulation.removeEphemera()
                        count: 20 + Math.floor(m.maxEnergy * 30 * 0.0018 / tech.laserDrain), //how many cycles the ephemera lasts, scales with max energy
                        do() {
                            this.count--
                            if (this.count < 0) simulation.removeEphemera(this.name)
                            for (let i = 0, num = 12; i < num; i++) { //draw random lasers
                                const angle = 6.28 * i / num + m.cycle * 0.04
                                b.laser({ x: m.pos.x + 30 * Math.cos(angle), y: m.pos.y + 30 * Math.sin(angle) }, { x: m.pos.x + 3000 * Math.cos(angle), y: m.pos.y + 3000 * Math.sin(angle) }, tech.laserDamage * 2.5)//dmg = tech.laserDamage, reflections = tech.laserReflections, isThickBeam = false, push = 1
                            }
                        },
                    })
                }
            } else {
                m.fieldCDcycle = m.cycle + m.fieldBlockCD;
            }
            if (!who.isInvulnerable && (m.coupling && m.fieldMode === 0) && bullet.length < 200) { //for field emitter iceIX
                for (let i = 0; i < m.coupling; i++) {
                    if (0.1 * m.coupling - i > 1.25 * Math.random()) {
                        const sub = Vector.mult(Vector.normalise(Vector.sub(who.position, m.pos)), (m.fieldRange * m.harmonicRadius) * (0.4 + 0.3 * Math.random())) //m.harmonicRadius should be 1 unless you are standing wave expansion
                        const rad = Vector.rotate(sub, 1 * (Math.random() - 0.5))
                        const angle = Math.atan2(sub.y, sub.x)
                        b.iceIX(6 + 6 * Math.random(), angle + 3 * (Math.random() - 0.5), Vector.add(m.pos, rad))
                    }
                }
            }
            m.bulletsToBlocks(who)
            const unit = Vector.normalise(Vector.sub(player.position, who.position))
            if (tech.blockDmg) {
                Matter.Body.setVelocity(who, { x: 0.5 * who.velocity.x, y: 0.5 * who.velocity.y });
                if (who.isShielded) {
                    for (let i = 0, len = mob.length; i < len; i++) {
                        if (mob[i].id === who.shieldID) mob[i].damage(tech.blockDmg * m.dmgScale * (tech.isBlockRadiation ? 6 : 2), true)
                    }
                } else if (tech.isBlockRadiation) {
                    if (who.isMobBullet) {
                        who.damage(tech.blockDmg * m.dmgScale * 3, true)
                    } else {
                        mobs.statusDoT(who, tech.blockDmg * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                    }
                } else {
                    who.damage(tech.blockDmg * m.dmgScale, true)
                }
                const step = 40
                ctx.beginPath(); //draw electricity
                for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
                    let x = m.pos.x - 20 * unit.x;
                    let y = m.pos.y - 20 * unit.y;
                    ctx.moveTo(x, y);
                    for (let i = 0; i < 8; i++) {
                        x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
                        y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
                        ctx.lineTo(x, y);
                    }
                }
                ctx.lineWidth = 3;
                ctx.strokeStyle = "#f0f";
                ctx.stroke();
            } else {
                m.drawHold(who);
            }
            if (tech.isStunField) mobs.statusStun(who, tech.isStunField)
            //knock backs
            const massRoot = Math.sqrt(Math.min(12, Math.max(0.15, who.mass))); // masses above 12 can start to overcome the push back
            Matter.Body.setVelocity(who, { x: player.velocity.x - (15 * unit.x) / massRoot, y: player.velocity.y - (15 * unit.y) / massRoot });
            if (who.isUnstable) {
                if (m.fieldCDcycle < m.cycle + 30) m.fieldCDcycle = m.cycle + 10
                who.death();
            }
            if (m.crouch) {
                Matter.Body.setVelocity(player, { x: player.velocity.x + 0.1 * m.blockingRecoil * unit.x * massRoot, y: player.velocity.y + 0.1 * m.blockingRecoil * unit.y * massRoot });
            } else {
                Matter.Body.setVelocity(player, { x: player.velocity.x + m.blockingRecoil * unit.x * massRoot, y: player.velocity.y + m.blockingRecoil * unit.y * massRoot });
            }
        }
    },
    pushMobsFacing() { // find mobs in range and in direction looking
        for (let i = 0, len = mob.length; i < len; ++i) {
            if (
                Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < m.fieldRange &&
                m.lookingAt(mob[i]) &&
                !mob[i].isUnblockable &&
                Matter.Query.ray(map, mob[i].position, m.pos).length === 0
            ) {
                mob[i].locatePlayer();
                m.pushMass(mob[i]);

                if (tech.deflectEnergy && !mob[i].isInvulnerable && !mob[i].isShielded) {
                    m.energy += tech.deflectEnergy * level.isReducedRegen
                }
            }
        }
    },
    lookForPickUp() { //find body to pickup
        const grabbing = {
            targetIndex: null,
            targetRange: 150,
            // lookingAt: false //false to pick up object in range, but not looking at
        };
        for (let i = 0, len = body.length; i < len; ++i) {
            if (Matter.Query.ray(map, body[i].position, m.pos).length === 0) {
                //is m next body a better target then my current best
                const dist = Vector.magnitude(Vector.sub(body[i].position, m.pos));
                const looking = m.lookingAt(body[i]);
                // if (dist < grabbing.targetRange && (looking || !grabbing.lookingAt) && !body[i].isNotHoldable) {
                if (dist < grabbing.targetRange && looking && !body[i].isNotHoldable) {
                    grabbing.targetRange = dist;
                    grabbing.targetIndex = i;
                    // grabbing.lookingAt = looking;
                }
            }
        }
        // set pick up target for when mouse is released
        if (body[grabbing.targetIndex]) {
            m.holdingTarget = body[grabbing.targetIndex];
            ctx.beginPath(); //draw on each valid body
            let vertices = m.holdingTarget.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j += 1) {
                ctx.lineTo(vertices[j].x, vertices[j].y);
            }
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.fillStyle = "rgba(190,215,230," + (0.3 + 0.7 * Math.random()) + ")";
            ctx.fill();

            ctx.globalAlpha = 0.2;
            m.drawHold(m.holdingTarget);
            ctx.globalAlpha = 1;
        } else {
            m.holdingTarget = null;
        }
    },
    pickUp() {
        //triggers when a hold target exits and field button is released
        m.isHolding = true;
        //conserve momentum when player mass changes
        totalMomentum = Vector.add(Vector.mult(player.velocity, player.mass), Vector.mult(m.holdingTarget.velocity, m.holdingTarget.mass))
        Matter.Body.setVelocity(player, Vector.mult(totalMomentum, 1 / (m.defaultMass + m.holdingTarget.mass)));

        m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
        //make block collide with nothing
        m.holdingTarget.collisionFilter.category = 0;
        m.holdingTarget.collisionFilter.mask = 0;
    },
    wakeCheck() {
        if (m.isTimeDilated) {
            m.isTimeDilated = false;

            function wake(who) {
                for (let i = 0, len = who.length; i < len; ++i) {
                    Matter.Sleeping.set(who[i], false)
                    if (who[i].storeVelocity) {
                        Matter.Body.setVelocity(who[i], {
                            x: who[i].storeVelocity.x,
                            y: who[i].storeVelocity.y
                        })
                        Matter.Body.setAngularVelocity(who[i], who[i].storeAngularVelocity)
                    }
                }
            }
            // if (tech.isFreezeMobs) {
            //     for (let i = 0, len = mob.length; i < len; ++i) {
            //         const ICE_DRAIN = 0.0005
            //         if (m.energy > ICE_DRAIN) m.energy -= ICE_DRAIN;
            //         Matter.Sleeping.set(mob[i], false)
            //         mobs.statusSlow(mob[i], 60)
            //     }
            // } else {
            //     wake(mob);
            // }
            wake(mob);
            wake(body);
            wake(bullet);
            for (let i = 0, len = cons.length; i < len; i++) {
                if (cons[i].stiffness === 0) {
                    cons[i].stiffness = cons[i].storeStiffness
                }
            }
            // wake(powerUp);
        }
    },
    hold() { },
    couplingDescription(couple = m.coupling) {
        switch (m.fieldMode) {
            case 0: //field emitter
                return `<strong>all</strong> effects`
            case 1: //standing wave
                // return `<span style = 'font-size:95%;'><strong>deflecting</strong> condenses +${couple.toFixed(1)} <strong class='color-s'>ice IX</strong></span>`
                return `+${(couple * 5).toFixed(0)} maximum <strong class='color-f'>energy</strong>`
            case 2: //perfect diamagnetism
                return `<span style = 'font-size:95%;'><strong>deflecting</strong> condenses ${(0.1 * couple).toFixed(2)} <strong class='color-s'>ice IX</strong></span>`
            // return `<span style = 'font-size:89%;'><strong>invulnerable</strong> <strong>+${2*couple}</strong> seconds post collision</span>`
            case 3: //negative mass
                return `<strong>${(0.973 ** couple).toFixed(2)}x</strong> <strong class='color-defense'>damage taken</strong>`
            case 4: //assembler
                return `<strong>+${(0.6 * couple).toFixed(1)}</strong> <strong class='color-f'>energy</strong> per second`
            case 5: //plasma
                return `<strong>${(1 + 0.025 * couple).toFixed(3)}x</strong> <strong class='color-d'>damage</strong>`
            case 6: //time dilation
                return `<strong>+${(1 + 0.05 * couple).toFixed(2)}x</strong> longer <strong style='letter-spacing: 2px;'>stopped time</strong>` //<strong>movement</strong>, <strong>jumping</strong>, and 
            case 7: //cloaking
                // return `<strong>${(1 + 3.3 * couple).toFixed(3)}x</strong> ambush <strong class='color-d'>damage</strong>`
                return `<strong>${(1 + 0.05 * couple).toFixed(3)}x</strong> ambush <strong class='color-d'>damage</strong>`
            case 8: //pilot wave
                return `<strong>${(1 + 0.05 * couple).toFixed(2)}x</strong> <strong class='color-block'>block</strong> collision <strong class='color-d'>damage</strong>`
            case 9: //wormhole
                return `<span style = 'font-size:89%;'>after eating <strong class='color-block'>blocks</strong> <strong>+${(2 * couple).toFixed(0)}</strong> <strong class='color-f'>energy</strong></span>`
            case 10: //grappling hook
                return `<span style="opacity: 1;">${powerUps.orb.ammo(1)}</span> give ${(4 * couple).toFixed(0)}% more ammo`
        }
    },
    couplingChange(change = 0) {
        if (change > 0 && level.onLevel !== -1) simulation.inGameConsole(`<div class="coupling-circle"></div> m.coupling <span class='color-symbol'>+=</span> ${change}`, 60); //level.onLevel !== -1  means not on lore level
        m.coupling += change
        if (m.coupling < 0) {
            //look for coupling power ups on this level and remove them to prevent exploiting tech ejections
            for (let i = powerUp.length - 1; i > -1; i--) {
                if (powerUp[i].name === "coupling") {
                    Matter.Composite.remove(engine.world, powerUp[i]);
                    powerUp.splice(i, 1);
                    m.coupling += 1
                    if (!(m.coupling < 0)) break
                }
            }
            m.coupling = 0 //can't go negative
        }
        m.setMaxEnergy(false);
        // m.setMaxHealth();
        m.setFieldRegen()
        mobs.setMobSpawnHealth();
        powerUps.setPowerUpMode();

        // if ((m.fieldMode === 0 || m.fieldMode === 9) && !build.isExperimentSelection && !simulation.isTextLogOpen) simulation.circleFlare(0.4);
    },
    setField(index) {
        // console.log("field mode: ", index)
        window.removeEventListener("keydown", m.fieldEvent);
        if (m.fieldUpgrades[8].collider) {
            Matter.Composite.remove(engine.world, m.fieldUpgrades[8].collider);
            m.fieldUpgrades[8].collider = null
        }

        if (isNaN(index)) { //find index by name
            let found = false
            for (let i = 0; i < m.fieldUpgrades.length; i++) {
                if (index === m.fieldUpgrades[i].name) {
                    index = i;
                    found = true;
                    break;
                }
            }
            if (!found) return //if you can't find the field don't give a field to avoid game crash
        }
        m.fieldMode = index;
        document.getElementById("field").innerHTML = m.fieldUpgrades[index].name
        m.setHoldDefaults();
        m.fieldUpgrades[index].effect();
        simulation.inGameConsole(`<div class="circle-grid field"></div> &nbsp; <span class='color-var'>m</span>.setField("<strong class='color-text'>${m.fieldUpgrades[m.fieldMode].name}</strong>")<br>input.key.field<span class='color-symbol'>:</span> ["<span class='color-text'>MouseRight</span>"]`);
        if (m.fieldMode === 4) simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>molecularMode <span class='color-symbol'>=</span> ${m.fieldUpgrades[4].modeText()} &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">↓↘→↓↙←↑↑↓</em>`);
        if (m.fieldMode === 8) simulation.inGameConsole(`Composite<span class='color-symbol'>.</span>add<span class='color-symbol'>(</span>engine.world<span class='color-symbol'>,</span> block<span class='color-symbol'>)</span> &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↓↓→↘↓↙←↓↓</em>`);
    },
    fieldEvent: null,
    fieldUpgrades: [
        {
            name: "field emitter",
            imageNumber: Math.floor(Math.random() * 26), //pick one of the 25 field emitter image files at random
            description: `<em>initial field</em><br>use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs and <strong>throw</strong> <strong class='color-block'>blocks</strong>
        <br><strong>4</strong> <strong class='color-f'>energy</strong> per second`, //            <br><strong>100</strong> max <strong class='color-f'>energy</strong>
            effect: () => {
                m.hold = function () {
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                        if (m.energy > m.minEnergyToDeflect) {
                            m.drawField();
                            m.pushMobsFacing();
                        }
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                        m.pickUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                    }
                    m.drawRegenEnergy()
                }
            }
        },
        {
            name: "standing wave",
            //<strong>deflecting</strong> protects you in every <strong>direction</strong>
            description: `<strong>3</strong> oscillating <strong>shields</strong> are permanently active
            <br><strong>+150</strong> max <strong class='color-f'>energy</strong>
            <br><strong>6</strong> <strong class='color-f'>energy</strong> per second`,
            drainCD: 0,
            effect: () => {
                m.fieldBlockCD = 0;
                m.blockingRecoil = 1 //4 is normal
                m.fieldRange = 185
                m.fieldShieldingScale = 1.6 * Math.pow(0.5, (tech.harmonics - 2))
                // m.fieldHarmReduction = 0.66; //33% reduction

                m.harmonic3Phase = () => { //normal standard 3 different 2-d circles
                    const fieldRange1 = (0.75 + 0.3 * Math.sin(m.cycle / 23)) * m.fieldRange * m.harmonicRadius
                    const fieldRange2 = (0.68 + 0.37 * Math.sin(m.cycle / 37)) * m.fieldRange * m.harmonicRadius
                    const fieldRange3 = (0.7 + 0.35 * Math.sin(m.cycle / 47)) * m.fieldRange * m.harmonicRadius
                    const netFieldRange = Math.max(fieldRange1, fieldRange2, fieldRange3)
                    ctx.fillStyle = "rgba(110,170,200," + Math.min(0.6, (0.04 + 0.7 * m.energy * (0.1 + 0.11 * Math.random()))) + ")";
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, fieldRange1, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, fieldRange2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, fieldRange3, 0, 2 * Math.PI);
                    ctx.fill();
                    //360 block
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < netFieldRange && !mob[i].isUnblockable) { // && Matter.Query.ray(map, mob[i].position, m.pos).length === 0
                            mob[i].locatePlayer();
                            if (this.drainCD > m.cycle) {
                                m.pushMass(mob[i], 0);
                            } else {
                                m.pushMass(mob[i]);
                                this.drainCD = m.cycle + 15
                            }
                        }
                    }
                }
                m.harmonicRadius = 1 //for smoothing function when player holds mouse (for harmonicAtomic)
                m.harmonicAtomic = () => { //several ellipses spinning about different axises
                    const rotation = simulation.cycle * 0.0031
                    const phase = simulation.cycle * 0.023
                    const radius = m.fieldRange * m.harmonicRadius
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "rgba(110,170,200,0.8)"
                    ctx.fillStyle = "rgba(110,170,200," + Math.min(0.6, 0.7 * m.energy * (0.11 + 0.1 * Math.random()) * (3 / tech.harmonics)) + ")";
                    // ctx.fillStyle = "rgba(110,170,200," + Math.min(0.7, m.energy * (0.22 - 0.01 * tech.harmonics) * (0.5 + 0.5 * Math.random())) + ")";
                    for (let i = 0; i < tech.harmonics; i++) {
                        ctx.beginPath();
                        ctx.ellipse(m.pos.x, m.pos.y, radius * Math.abs(Math.sin(phase + i / tech.harmonics * Math.PI)), radius, rotation + i / tech.harmonics * Math.PI, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }
                    //360 block
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < radius && !mob[i].isUnblockable) { // && Matter.Query.ray(map, mob[i].position, m.pos).length === 0
                            mob[i].locatePlayer();
                            if (this.drainCD > m.cycle) {
                                m.pushMass(mob[i], 0);
                            } else {
                                m.pushMass(mob[i]);
                                this.drainCD = m.cycle + 15
                            }
                        }
                    }
                }
                if (tech.harmonics === 2) {
                    m.harmonicShield = m.harmonic3Phase
                } else {
                    m.harmonicShield = m.harmonicAtomic
                }
                m.hold = function () {
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if ((input.field) && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                        m.pickUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                    }
                    if (m.energy > m.minEnergyToDeflect && m.fieldCDcycle < m.cycle) {
                        if (tech.isStandingWaveExpand) {
                            if (input.field) {
                                // const oldHarmonicRadius = m.harmonicRadius
                                m.harmonicRadius = 0.99 * m.harmonicRadius + 0.01 * 4
                                // m.energy -= 0.1 * (m.harmonicRadius - oldHarmonicRadius)
                            } else {
                                m.harmonicRadius = 0.994 * m.harmonicRadius + 0.006
                            }
                        }
                        if (!simulation.isTimeSkipping) m.harmonicShield()
                    }
                    m.drawRegenEnergy()
                }
            }
        },
        {
            name: "perfect diamagnetism",
            description: `<strong>deflecting</strong> does not drain <strong class='color-f'>energy</strong><br><strong>shield</strong> maintains <strong>functionality</strong> while inactive<br><strong>5</strong> <strong class='color-f'>energy</strong> per second`,
            effect: () => {
                m.fieldMeterColor = "#48f" //"#0c5"
                m.eyeFillColor = m.fieldMeterColor
                m.fieldShieldingScale = 0;
                m.fieldBlockCD = 3;
                m.grabPowerUpRange2 = 10000000
                m.fieldPosition = { x: m.pos.x, y: m.pos.y }
                m.fieldAngle = m.angle
                m.perfectPush = (isFree = false) => {
                    if (m.fieldCDcycle < m.cycle) {
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            if (
                                Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) - mob[i].radius < m.fieldRange &&
                                !mob[i].isUnblockable &&
                                Vector.dot({ x: Math.cos(m.fieldAngle), y: Math.sin(m.fieldAngle) }, Vector.normalise(Vector.sub(mob[i].position, m.fieldPosition))) > m.fieldThreshold &&
                                Matter.Query.ray(map, mob[i].position, m.fieldPosition).length === 0
                            ) {
                                mob[i].locatePlayer();
                                const unit = Vector.normalise(Vector.sub(m.fieldPosition, mob[i].position))
                                m.fieldCDcycle = m.cycle + m.fieldBlockCD + (mob[i].isShielded ? 10 : 0);
                                if (!mob[i].isInvulnerable && bullet.length < 250) {
                                    for (let i = 0; i < m.coupling; i++) {
                                        if (0.1 * m.coupling - i > Math.random()) {
                                            const angle = m.fieldAngle + 4 * m.fieldArc * (Math.random() - 0.5)
                                            const radius = m.fieldRange * (0.6 + 0.3 * Math.random())
                                            b.iceIX(6 + 6 * Math.random(), angle, Vector.add(m.fieldPosition, {
                                                x: radius * Math.cos(angle),
                                                y: radius * Math.sin(angle)
                                            }))
                                        }
                                    }
                                }
                                if (tech.blockDmg) { //electricity
                                    Matter.Body.setVelocity(mob[i], { x: 0.5 * mob[i].velocity.x, y: 0.5 * mob[i].velocity.y });
                                    if (mob[i].isShielded) {
                                        for (let j = 0, len = mob.length; j < len; j++) {
                                            if (mob[j].id === mob[i].shieldID) mob[j].damage(tech.blockDmg * m.dmgScale * (tech.isBlockRadiation ? 6 : 2), true)
                                        }
                                    } else if (tech.isBlockRadiation) {
                                        if (mob[i].isMobBullet) {
                                            mob[i].damage(tech.blockDmg * m.dmgScale * 3, true)
                                        } else {
                                            mobs.statusDoT(mob[i], tech.blockDmg * m.dmgScale * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                                        }
                                    } else {
                                        mob[i].damage(tech.blockDmg * m.dmgScale, true)
                                    }
                                    // if (mob[i].isShielded) {
                                    //     for (let j = 0, len = mob.length; j < len; j++) {
                                    //         if (mob[j].id === mob[i].shieldID) mob[j].damage(tech.blockDmg * m.dmgScale * (tech.isBlockRadiation ? 3 : 1), true)
                                    //     }
                                    // } else {
                                    //     if (tech.isBlockRadiation && !mob[i].isMobBullet) {
                                    //         mobs.statusDoT(mob[i], tech.blockDmg * m.dmgScale * 4 / 12, 360) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                                    //     } else {
                                    //         mob[i].damage(tech.blockDmg * m.dmgScale)
                                    //     }
                                    // }
                                    const step = 40
                                    ctx.beginPath();
                                    for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
                                        let x = m.fieldPosition.x - 20 * unit.x;
                                        let y = m.fieldPosition.y - 20 * unit.y;
                                        ctx.moveTo(x, y);
                                        for (let i = 0; i < 8; i++) {
                                            x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
                                            y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
                                            ctx.lineTo(x, y);
                                        }
                                    }
                                    ctx.lineWidth = 3;
                                    ctx.strokeStyle = "#f0f";
                                    ctx.stroke();
                                } else if (isFree) {
                                    ctx.lineWidth = 2; //when blocking draw this graphic
                                    ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                                    ctx.strokeStyle = "#000";
                                    const len = mob[i].vertices.length - 1;
                                    const mag = mob[i].radius
                                    ctx.beginPath();
                                    ctx.moveTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                                    for (let j = 0; j < len; j++) {
                                        ctx.lineTo(mob[i].vertices[j].x + mag * (Math.random() - 0.5), mob[i].vertices[j].y + mag * (Math.random() - 0.5));
                                    }
                                    ctx.lineTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                                    ctx.fill();
                                    ctx.stroke();
                                } else {

                                    const eye = 15; //when blocking draw this graphic
                                    const len = mob[i].vertices.length - 1;
                                    ctx.lineWidth = 1;
                                    ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                                    ctx.strokeStyle = "#000";
                                    ctx.beginPath();
                                    ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                                    ctx.lineTo(mob[i].vertices[len].x, mob[i].vertices[len].y);
                                    ctx.lineTo(mob[i].vertices[0].x, mob[i].vertices[0].y);
                                    ctx.fill();
                                    ctx.stroke();
                                    for (let j = 0; j < len; j++) {
                                        ctx.beginPath();
                                        ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                                        ctx.lineTo(mob[i].vertices[j].x, mob[i].vertices[j].y);
                                        ctx.lineTo(mob[i].vertices[j + 1].x, mob[i].vertices[j + 1].y);
                                        ctx.fill();
                                        ctx.stroke();
                                    }
                                }
                                m.bulletsToBlocks(mob[i])
                                if (tech.isStunField) mobs.statusStun(mob[i], tech.isStunField)
                                //mob knock backs
                                const massRoot = Math.sqrt(Math.max(1, mob[i].mass));
                                Matter.Body.setVelocity(mob[i], {
                                    x: player.velocity.x - (30 * unit.x) / massRoot,
                                    y: player.velocity.y - (30 * unit.y) / massRoot
                                });
                                if (mob[i].isUnstable) {
                                    if (m.fieldCDcycle < m.cycle + 10) m.fieldCDcycle = m.cycle + 6
                                    mob[i].death();
                                }
                                if (!isFree) { //player knock backs
                                    if (mob[i].isDropPowerUp && player.speed < 12) {
                                        const massRootCap = Math.sqrt(Math.min(10, Math.max(0.2, mob[i].mass)));
                                        Matter.Body.setVelocity(player, {
                                            x: 0.9 * player.velocity.x + 0.6 * unit.x * massRootCap,
                                            y: 0.9 * player.velocity.y + 0.6 * unit.y * massRootCap
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                m.hold = function () {
                    const wave = Math.sin(m.cycle * 0.022);
                    m.fieldRange = 180 + 12 * wave + 100 * tech.isBigField
                    m.fieldArc = 0.35 + 0.045 * wave + 0.065 * tech.isBigField //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
                    m.calculateFieldThreshold();
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if (input.field) { //not hold but field button is pressed
                        //float while field is on
                        const angleReduction = 0.5 + 0.7 * (Math.PI / 2 - Math.min(Math.PI / 2, Math.abs(m.angle + Math.PI / 2)))
                        // console.log(angleReduction)
                        if (player.velocity.y > 1) {
                            player.force.y -= angleReduction * (tech.isBigField ? 0.95 : 0.5) * player.mass * simulation.g;
                            Matter.Body.setVelocity(player, {
                                x: player.velocity.x,
                                y: 0.98 * player.velocity.y
                            }); //set velocity to cap, but keep the direction
                        }

                        // go invulnerable while field is active, but also drain energy
                        // if (true && m.energy > 2 * m.fieldRegen && m.immuneCycle < m.cycle + tech.cyclicImmunity) {
                        //     m.immuneCycle = m.cycle + 1; //player is immune to damage for 60 cycles
                        //     m.energy -= 2 * m.fieldRegen
                        //     if (m.energy < m.fieldRegen) m.fieldCDcycle = m.cycle + 90;
                        // }

                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                        m.fieldPosition = { x: m.pos.x, y: m.pos.y }
                        m.fieldAngle = m.angle
                        //draw field attached to player
                        if (m.holdingTarget) {
                            ctx.fillStyle = `rgba(110,150,220, ${0.06 + 0.03 * Math.random()})`
                            ctx.strokeStyle = `rgba(110,150,220, ${0.35 + 0.05 * Math.random()})`
                        } else {
                            ctx.fillStyle = `rgba(110,150,220, ${0.27 + 0.2 * Math.random() - 0.1 * wave})`
                            ctx.strokeStyle = `rgba(110,150,220, ${0.4 + 0.5 * Math.random()})`
                        }
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, m.fieldRange, m.angle - Math.PI * m.fieldArc, m.angle + Math.PI * m.fieldArc, false);
                        ctx.lineWidth = 2.5 - 1.5 * wave;
                        ctx.stroke();
                        const curve = 0.57 + 0.04 * wave
                        const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
                        let a = m.angle + aMag
                        let cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
                        let cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
                        ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 30 * Math.cos(m.angle), m.pos.y + 30 * Math.sin(m.angle))
                        a = m.angle - aMag
                        cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
                        cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
                        ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 1 * m.fieldRange * Math.cos(m.angle - Math.PI * m.fieldArc), m.pos.y + 1 * m.fieldRange * Math.sin(m.angle - Math.PI * m.fieldArc))
                        ctx.fill();
                        m.perfectPush();
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                        m.pickUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        if (!input.field) { //&& tech.isFieldFree
                            //draw field free of player
                            ctx.fillStyle = `rgba(110,150,220, ${0.27 + 0.2 * Math.random() - 0.1 * wave})`
                            ctx.strokeStyle = `rgba(110,180,255, ${0.4 + 0.5 * Math.random()})`
                            ctx.beginPath();
                            ctx.arc(m.fieldPosition.x, m.fieldPosition.y, m.fieldRange, m.fieldAngle - Math.PI * m.fieldArc, m.fieldAngle + Math.PI * m.fieldArc, false);
                            ctx.lineWidth = 2.5 - 1.5 * wave;
                            ctx.stroke();
                            const curve = 0.8 + 0.06 * wave
                            const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
                            let a = m.fieldAngle + aMag
                            ctx.quadraticCurveTo(m.fieldPosition.x + curve * m.fieldRange * Math.cos(a), m.fieldPosition.y + curve * m.fieldRange * Math.sin(a), m.fieldPosition.x + 1 * m.fieldRange * Math.cos(m.fieldAngle - Math.PI * m.fieldArc), m.fieldPosition.y + 1 * m.fieldRange * Math.sin(m.fieldAngle - Math.PI * m.fieldArc))
                            ctx.fill();
                            m.perfectPush(true);
                        }
                    }
                    // m.drawRegenEnergy()
                    m.drawRegenEnergy("rgba(0,0,0,0.2)")
                    if (tech.isPerfectBrake) { //cap mob speed around player
                        const range = 200 + 140 * wave + 150 * m.energy
                        for (let i = 0; i < mob.length; i++) {
                            const distance = Vector.magnitude(Vector.sub(m.pos, mob[i].position))
                            if (distance < range) {
                                const cap = mob[i].isShielded ? 8 : 4
                                if (mob[i].speed > cap && Vector.dot(mob[i].velocity, Vector.sub(m.pos, mob[i].position)) > 0) { // if velocity is directed towards player
                                    Matter.Body.setVelocity(mob[i], Vector.mult(Vector.normalise(mob[i].velocity), cap)); //set velocity to cap, but keep the direction
                                }
                            }
                        }
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, range, 0, 2 * Math.PI);
                        ctx.fillStyle = "hsla(200,50%,61%,0.08)";
                        ctx.fill();
                    }
                }
            }
        },
        {
            name: "negative mass",
            //<br>hold <strong class='color-block'>blocks</strong> as if they have a lower <strong>mass</strong>
            description: `use <strong class='color-f'>energy</strong> to nullify &nbsp;<strong style='letter-spacing: 7px;'>gravity</strong><br><strong>0.5x</strong> <strong class='color-defense'>damage taken</strong><br><strong>6</strong> <strong class='color-f'>energy</strong> per second`,
            fieldDrawRadius: 0,
            effect: () => {
                m.fieldFire = true;
                m.holdingMassScale = 0.01; //can hold heavier blocks with lower cost to jumping
                m.fieldMeterColor = "#333"
                m.eyeFillColor = m.fieldMeterColor
                m.fieldHarmReduction = 0.5;
                m.fieldDrawRadius = 0;

                m.hold = function () {
                    m.airSpeedLimit = 125 //5 * player.mass * player.mass
                    m.FxAir = 0.016
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if (input.field) { //push away
                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                        if (m.energy > tech.negativeMassCost && m.fieldCDcycle < m.cycle) {
                            if (tech.isFlyFaster) {
                                //look for nearby objects to make zero-g
                                function moveThis(who, range, mag = 1.06) {
                                    for (let i = 0, len = who.length; i < len; ++i) {
                                        sub = Vector.sub(who[i].position, m.pos);
                                        dist = Vector.magnitude(sub);
                                        if (dist < range) {
                                            who[i].force.y -= who[i].mass * (simulation.g * mag); //add a bit more then standard gravity
                                            if (input.left) { //blocks move horizontally with the same force as the player
                                                who[i].force.x -= m.FxAir * who[i].mass / 10; // move player   left / a
                                            } else if (input.right) {
                                                who[i].force.x += m.FxAir * who[i].mass / 10; //move player  right / d
                                            }
                                            //loose attraction to player
                                            // const sub = Vector.sub(m.pos, body[i].position)
                                            // const unit = Vector.mult(Vector.normalise(sub), who[i].mass * 0.0000002 * Vector.magnitude(sub))
                                            // body[i].force.x += unit.x
                                            // body[i].force.y += unit.y
                                        }
                                    }
                                }
                                //control horizontal acceleration
                                m.airSpeedLimit = 1000 // 7* player.mass * player.mass
                                m.FxAir = 0.01
                                //control vertical acceleration
                                if (input.down) { //down
                                    player.force.y += 0.5 * player.mass * simulation.g;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 500 * 0.03;
                                    moveThis(powerUp, this.fieldDrawRadius, 0);
                                    moveThis(body, this.fieldDrawRadius, 0);
                                } else if (input.up) { //up
                                    m.energy -= 5 * tech.negativeMassCost;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 1100 * 0.03;
                                    player.force.y -= 2.25 * player.mass * simulation.g;
                                    moveThis(powerUp, this.fieldDrawRadius, 1.8);
                                    moveThis(body, this.fieldDrawRadius, 1.8);
                                } else {
                                    m.energy -= tech.negativeMassCost;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 800 * 0.03;
                                    player.force.y -= 1.07 * player.mass * simulation.g; // slow upward drift
                                    moveThis(powerUp, this.fieldDrawRadius);
                                    moveThis(body, this.fieldDrawRadius);
                                }
                            } else {
                                //look for nearby objects to make zero-g
                                function verticalForce(who, range, mag = 1.06) {
                                    for (let i = 0, len = who.length; i < len; ++i) {
                                        sub = Vector.sub(who[i].position, m.pos);
                                        dist = Vector.magnitude(sub);
                                        if (dist < range) {
                                            who[i].force.y -= who[i].mass * (simulation.g * mag); //add a bit more then standard gravity
                                            if (input.left) { //blocks move horizontally with the same force as the player
                                                who[i].force.x -= m.FxAir * who[i].mass / 10; // move player   left / a
                                            } else if (input.right) {
                                                who[i].force.x += m.FxAir * who[i].mass / 10; //move player  right / d
                                            }
                                        }



                                        // sub = Vector.sub(who[i].position, m.pos);
                                        // dist = Vector.magnitude(sub);
                                        // if (dist < range) who[i].force.y -= who[i].mass * (simulation.g * mag);
                                    }
                                }
                                //control horizontal acceleration
                                m.airSpeedLimit = 400 // 7* player.mass * player.mass
                                m.FxAir = 0.005
                                //control vertical acceleration
                                if (input.down) { //down
                                    player.force.y -= 0.5 * player.mass * simulation.g;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 400 * 0.03;
                                    verticalForce(powerUp, this.fieldDrawRadius, 0.7);
                                    verticalForce(body, this.fieldDrawRadius, 0.7);
                                } else if (input.up) { //up
                                    m.energy -= 5 * tech.negativeMassCost;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 850 * 0.03;
                                    player.force.y -= 1.45 * player.mass * simulation.g;
                                    verticalForce(powerUp, this.fieldDrawRadius, 1.38);
                                    verticalForce(body, this.fieldDrawRadius, 1.38);
                                } else {
                                    m.energy -= tech.negativeMassCost;
                                    this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 650 * 0.03;
                                    player.force.y -= 1.07 * player.mass * simulation.g; // slow upward drift
                                    verticalForce(powerUp, this.fieldDrawRadius);
                                    verticalForce(body, this.fieldDrawRadius);
                                }
                            }

                            if (m.energy < 0.001) {
                                m.fieldCDcycle = m.cycle + 120;
                                m.energy = 0;
                            }
                            //add extra friction for horizontal motion
                            if (input.down || input.up || input.left || input.right) {
                                Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.98 });
                            } else { //slow rise and fall
                                Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.98 });
                            }
                            // if (tech.isFreezeMobs) {
                            //     const ICE_DRAIN = 0.0005
                            //     for (let i = 0, len = mob.length; i < len; i++) {
                            //         if (!mob[i].isMobBullet && !mob[i].shield && !mob[i].isShielded && ((mob[i].distanceToPlayer() + mob[i].radius) < this.fieldDrawRadius)) {
                            //             if (m.energy > ICE_DRAIN * 2) {
                            //                 m.energy -= ICE_DRAIN;
                            //                 this.fieldDrawRadius -= 2;
                            //                 mobs.statusSlow(mob[i], 60)
                            //             } else {
                            //                 break;
                            //             }
                            //         }
                            //     }
                            // }
                            //draw zero-G range
                            if (!simulation.isTimeSkipping) {
                                ctx.beginPath();
                                ctx.arc(m.pos.x, m.pos.y, this.fieldDrawRadius, 0, 2 * Math.PI);
                                ctx.fillStyle = "#f5f5ff";
                                ctx.globalCompositeOperation = "difference";
                                ctx.fill();
                                ctx.globalCompositeOperation = "source-over";
                            }
                        }
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                        m.pickUp();
                        this.fieldDrawRadius = 0
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        this.fieldDrawRadius = 0
                    }
                    m.drawRegenEnergy("rgba(0,0,0,0.2)")


                    // if (tech.isHealAttract) {
                    //     for (let i = 0; i < powerUp.length; i++) {
                    //         if (powerUp[i].name === "heal") {
                    //             //&& Vector.magnitudeSquared(Vector.sub(powerUp[i].position, m.pos)) < 500000
                    //             let attract = Vector.mult(Vector.normalise(Vector.sub(m.pos, powerUp[i].position)), 0.01 * powerUp[i].mass)
                    //             powerUp[i].force.x += attract.x;
                    //             powerUp[i].force.y += attract.y - powerUp[i].mass * simulation.g; //negate gravity
                    //             Matter.Body.setVelocity(powerUp[i], Vector.mult(powerUp[i].velocity, 0.7));
                    //         }
                    //     }
                    // }


                    // powerUp[i].force.x += 0.05 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
                    // powerUp[i].force.y += 0.05 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                    // //extra friction
                    // Matter.Body.setVelocity(powerUp[i], {
                    //     x: powerUp[i].velocity.x * 0.11,
                    //     y: powerUp[i].velocity.y * 0.11
                    // });

                }
            }
        },
        {
            name: "molecular assembler",
            modeText() {
                return `${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<strong>missiles" : simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" : "<strong>drones"}</strong>`
            },
            description: `use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs<br>excess <strong class='color-f'>energy</strong> used to <strong class='color-print'>print</strong> ${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<strong>missiles" : simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" : "<strong>drones"}</strong><br><strong>12</strong> <strong class='color-f'>energy</strong> per second <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↘→↓↙←↑↑↓</em>`,
            setDescription() {
                return `use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs<br>excess <strong class='color-f'>energy</strong> used to <strong class='color-print'>print</strong> ${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<strong>missiles" : simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" : "<strong>drones"}</strong><br><strong>12</strong> <strong class='color-f'>energy</strong> per second <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↘→↓↙←↑↑↓</em>`
            },
            keyLog: [null, null, null, null, null, null, null],
            effect: () => {
                //store event function so it can be found and removed in m.setField()
                m.fieldEvent = function (event) {
                    m.fieldUpgrades[4].keyLog.shift() //remove first element
                    m.fieldUpgrades[4].keyLog.push(event.code) //add new key to end
                    const patternA = ["ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "ArrowUp", "ArrowDown"]
                    const patternB = [input.key.down, input.key.right, input.key.down, input.key.left, input.key.up, input.key.up, input.key.down]
                    const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
                    if (arraysEqual(m.fieldUpgrades[4].keyLog, patternA) || arraysEqual(m.fieldUpgrades[4].keyLog, patternB)) {
                        //cycle to next molecular mode
                        simulation.molecularMode = simulation.molecularMode < 3 ? simulation.molecularMode + 1 : 0
                        m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
                        const name = `${simulation.molecularMode === 0 ? "<em class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<em>missiles" : simulation.molecularMode === 2 ? "<em class='color-s'>ice IX" : "<em>drones"}</em>`
                        simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>molecularMode <span class='color-symbol'>=</span> ${simulation.molecularMode} // ${name} &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">↓↘→↓↙←↑↑↓</em>`);
                    }
                    // console.log(event.code, m.fieldUpgrades[4].keyLog)
                }
                window.addEventListener("keydown", m.fieldEvent);

                m.fieldMeterColor = "#ff0"
                m.eyeFillColor = m.fieldMeterColor
                m.hold = function () {
                    if (m.energy > m.maxEnergy - 0.02 && m.fieldCDcycle < m.cycle && !input.field && bullet.length < 300 && (m.cycle % 2)) {
                        if (simulation.molecularMode === 0) {
                            if (tech.isSporeFlea) {
                                const drain = 0.18 + (Math.max(bullet.length, 130) - 130) * 0.02
                                if (m.energy > drain) {
                                    m.energy -= drain
                                    const speed = m.crouch ? 20 + 8 * Math.random() : 10 + 3 * Math.random()
                                    b.flea({
                                        x: m.pos.x + 35 * Math.cos(m.angle),
                                        y: m.pos.y + 35 * Math.sin(m.angle)
                                    }, {
                                        x: speed * Math.cos(m.angle),
                                        y: speed * Math.sin(m.angle)
                                    })
                                }
                            } else if (tech.isSporeWorm) {
                                const drain = 0.18 + (Math.max(bullet.length, 130) - 130) * 0.02
                                if (m.energy > drain) {
                                    m.energy -= drain
                                    b.worm({
                                        x: m.pos.x + 35 * Math.cos(m.angle),
                                        y: m.pos.y + 35 * Math.sin(m.angle)
                                    })
                                    const SPEED = 2 + 1 * Math.random();
                                    Matter.Body.setVelocity(bullet[bullet.length - 1], {
                                        x: SPEED * Math.cos(m.angle),
                                        y: SPEED * Math.sin(m.angle)
                                    });
                                }
                            } else {
                                const drain = 0.095 + (Math.max(bullet.length, 130) - 130) * 0.01
                                for (let i = 0, len = 5; i < len; i++) {
                                    if (m.energy > 3 * drain) {
                                        m.energy -= drain
                                        const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
                                        b.spore(Vector.add(m.pos, Vector.mult(unit, 25)), Vector.mult(unit, 10))
                                    } else {
                                        break
                                    }
                                }
                            }
                        } else if (simulation.molecularMode === 1) {
                            m.energy -= 0.33;
                            const direction = { x: Math.cos(m.angle), y: Math.sin(m.angle) }
                            const push = Vector.mult(Vector.perp(direction), 0.08)
                            b.missile({ x: m.pos.x + 30 * direction.x, y: m.pos.y + 30 * direction.y }, m.angle, -15)
                            bullet[bullet.length - 1].force.x += push.x * (Math.random() - 0.5)
                            bullet[bullet.length - 1].force.y += 0.005 + push.y * (Math.random() - 0.5)
                            // b.missile({ x: m.pos.x, y: m.pos.y - 40 }, -Math.PI / 2 + 0.5 * (Math.random() - 0.5), 0, 1)
                        } else if (simulation.molecularMode === 2) {
                            m.energy -= 0.044;
                            b.iceIX(1)
                        } else if (simulation.molecularMode === 3) {
                            if (tech.isDroneRadioactive) {
                                const drain = 0.8 + (Math.max(bullet.length, 50) - 50) * 0.01
                                if (m.energy > drain) {
                                    m.energy -= drain
                                    b.droneRadioactive({
                                        x: m.pos.x + 30 * Math.cos(m.angle) + 10 * (Math.random() - 0.5),
                                        y: m.pos.y + 30 * Math.sin(m.angle) + 10 * (Math.random() - 0.5)
                                    }, 25)
                                }
                            } else {
                                //every bullet above 100 adds 0.005 to the energy cost per drone
                                //at 200 bullets the energy cost is 0.45 + 100*0.006 = 1.05
                                const drain = (0.45 + (Math.max(bullet.length, 100) - 100) * 0.006) * tech.droneEnergyReduction
                                if (m.energy > drain) {
                                    m.energy -= drain
                                    b.drone()
                                }
                            }
                        }
                    }
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        if (tech.isPrinter && m.holdingTarget.isPrinted && input.field) {
                            // if (Math.random() < 0.004 && m.holdingTarget.vertices.length < 12) m.holdingTarget.vertices.push({ x: 0, y: 0 }) //small chance to increase the number of vertices
                            m.holdingTarget.radius += Math.min(1.1, 1.3 / m.holdingTarget.mass) //grow up to a limit
                            const r1 = m.holdingTarget.radius * (1 + 0.12 * Math.sin(m.cycle * 0.11))
                            const r2 = m.holdingTarget.radius * (1 + 0.12 * Math.cos(m.cycle * 0.11))
                            let angle = (m.cycle * 0.01) % (2 * Math.PI) //rotate the object 
                            let vertices = []
                            for (let i = 0, len = m.holdingTarget.vertices.length; i < len; i++) {
                                angle += 2 * Math.PI / len
                                vertices.push({ x: m.holdingTarget.position.x + r1 * Math.cos(angle), y: m.holdingTarget.position.y + r2 * Math.sin(angle) })
                            }
                            Matter.Body.setVertices(m.holdingTarget, vertices)
                            m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
                        }
                        m.throwBlock();
                    } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                        if (tech.isPrinter && input.down) {
                            m.printBlock();
                        } else if (m.energy > m.minEnergyToDeflect) {
                            m.drawField();
                            m.pushMobsFacing();
                        }
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                        m.pickUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                    }
                    m.drawRegenEnergy()
                }
            }
        },
        {
            name: "plasma torch",
            description: "use <strong class='color-f'>energy</strong> to emit short range <strong class='color-plasma'>plasma</strong><br><strong>1.5x</strong> <strong class='color-d'>damage</strong><br><strong>10</strong> <strong class='color-f'>energy</strong> per second",
            set() {
                b.isExtruderOn = false
                m.fieldDamage = 1.5
                // m.fieldCDcycleAlternate = 0

                if (m.plasmaBall) {
                    m.plasmaBall.reset()
                    Matter.Composite.remove(engine.world, m.plasmaBall);
                }
                if (tech.isPlasmaBall) {
                    const circleRadiusScale = 2
                    m.plasmaBall = Bodies.circle(m.pos.x + 10 * Math.cos(m.angle), m.pos.y + 10 * Math.sin(m.angle), 1, {
                        // collisionFilter: {
                        //     group: 0,
                        //     category: 0,
                        //     mask: 0 //cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield
                        // },
                        isSensor: true,
                        frictionAir: 0,
                        alpha: 0.7,
                        isPopping: false,
                        isAttached: false,
                        isOn: false,
                        drain: 0.0017,
                        radiusLimit: 10,
                        damage: 0.8,
                        setPositionToNose() {
                            const nose = { x: m.pos.x + 10 * Math.cos(m.angle), y: m.pos.y + 10 * Math.sin(m.angle) }
                            Matter.Body.setPosition(this, Vector.add(nose, Vector.mult(Vector.normalise(Vector.sub(nose, m.pos)), circleRadiusScale * this.circleRadius)));
                        },
                        fire() {
                            this.isAttached = false;
                            const speed = 10 //scale with mass?
                            Matter.Body.setVelocity(this, {
                                x: player.velocity.x * 0.4 + speed * Math.cos(m.angle),
                                y: speed * Math.sin(m.angle)
                            });
                            m.plasmaBall.setPositionToNose()
                            if (this.circleRadius < 10) this.isPopping = true
                        },
                        scale(scale) {
                            Matter.Body.scale(m.plasmaBall, scale, scale); //shrink fast
                            if (this.circleRadius < this.radiusLimit) this.reset()
                        },
                        reset() {
                            // console.log(this.circleRadius)
                            const scale = 1 / m.plasmaBall.circleRadius
                            Matter.Body.scale(m.plasmaBall, scale, scale); //grow
                            // console.log(this.circleRadius)
                            // this.circleRadius = 0
                            this.alpha = 0.7
                            this.isOn = false
                            this.isPopping = false
                            // this.isAttached = true;
                        },
                        do() {
                            if (this.isOn) {
                                //collisions with map
                                if (Matter.Query.collides(this, map).length > 0) {
                                    if (this.isAttached) {
                                        this.scale(Math.max(0.9, 0.998 - 0.1 / m.plasmaBall.circleRadius))
                                    } else {
                                        this.isPopping = true
                                    }
                                }
                                if (this.isPopping) {
                                    this.alpha -= 0.03
                                    if (this.alpha < 0.1) {
                                        this.reset()
                                    } else {
                                        const scale = 1.04 + 4 / Math.max(1, m.plasmaBall.circleRadius)
                                        Matter.Body.scale(m.plasmaBall, scale, scale); //grow
                                    }
                                    // if (this.speed > 2.5) {
                                    //     const slow = 0.9
                                    //     Matter.Body.setVelocity(this, {
                                    //         x: slow * this.velocity.x,
                                    //         y: slow * this.velocity.y
                                    //     });
                                    // }
                                }
                                //collisions with mobs
                                // const whom = Matter.Query.collides(this, mob)
                                // const dmg = this.damage * m.dmgScale
                                // for (let i = 0, len = whom.length; i < len; i++) {
                                //     const mobHit = (who) => {
                                //         if (who.alive) {
                                //             if (!this.isAttached && !who.isMobBullet) this.isPopping = true
                                //             who.damage(dmg);
                                //             // if (who.shield) this.scale(Math.max(0.9, 0.99 - 0.5 / m.plasmaBall.circleRadius))
                                //             if (who.speed > 5) {
                                //                 Matter.Body.setVelocity(who, { //friction
                                //                     x: who.velocity.x * 0.6,
                                //                     y: who.velocity.y * 0.6
                                //                 });
                                //             } else {
                                //                 Matter.Body.setVelocity(who, { //friction
                                //                     x: who.velocity.x * 0.93,
                                //                     y: who.velocity.y * 0.93
                                //                 });
                                //             }
                                //         }
                                //     }
                                //     mobHit(whom[i].bodyA)
                                //     mobHit(whom[i].bodyB)
                                // }

                                //damage nearby mobs
                                const dmg = this.damage * m.dmgScale
                                const arcList = []
                                const damageRadius = circleRadiusScale * this.circleRadius
                                const dischargeRange = 150 + 1600 * tech.plasmaDischarge + 1.3 * damageRadius
                                for (let i = 0, len = mob.length; i < len; i++) {
                                    if (mob[i].alive && (!mob[i].isBadTarget || mob[i].isMobBullet) && !mob[i].isInvulnerable) {
                                        const sub = Vector.magnitude(Vector.sub(this.position, mob[i].position))
                                        if (sub < damageRadius + mob[i].radius) {
                                            // if (!this.isAttached && !mob[i].isMobBullet) this.isPopping = true
                                            mob[i].damage(dmg);
                                            if (mob[i].speed > 5) {
                                                Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.6, y: mob[i].velocity.y * 0.6 });
                                            } else {
                                                Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.93, y: mob[i].velocity.y * 0.93 });
                                            }
                                        } else if (sub < dischargeRange + mob[i].radius && Matter.Query.ray(map, mob[i].position, this.position).length === 0) {
                                            arcList.push(mob[i]) //populate electrical arc list
                                        }
                                    }
                                }
                                for (let i = 0; i < arcList.length; i++) {
                                    if (tech.plasmaDischarge > Math.random()) {
                                        const who = arcList[Math.floor(Math.random() * arcList.length)]
                                        who.damage(dmg * 4);
                                        //draw arcs
                                        const sub = Vector.sub(who.position, this.position)
                                        const unit = Vector.normalise(sub)
                                        let len = 12
                                        const step = Vector.magnitude(sub) / (len + 2)
                                        let x = this.position.x
                                        let y = this.position.y
                                        ctx.beginPath();
                                        ctx.moveTo(x, y);
                                        for (let i = 0; i < len; i++) {
                                            x += step * (unit.x + (Math.random() - 0.5))
                                            y += step * (unit.y + (Math.random() - 0.5))
                                            ctx.lineTo(x, y);
                                        }
                                        ctx.lineTo(who.position.x, who.position.y);
                                        ctx.strokeStyle = "#88f";
                                        ctx.lineWidth = 4 + 3 * Math.random();
                                        ctx.stroke();
                                        if (who.damageReduction) {
                                            simulation.drawList.push({
                                                x: who.position.x,
                                                y: who.position.y,
                                                radius: 15,
                                                color: "rgba(150,150,255,0.4)",
                                                time: 15
                                            });
                                        }
                                    }
                                }


                                //slowly slow down if too fast
                                if (this.speed > 10) {
                                    const scale = 0.998
                                    Matter.Body.setVelocity(this, { x: scale * this.velocity.x, y: scale * this.velocity.y });
                                }

                                //graphics
                                const radius = circleRadiusScale * this.circleRadius * (0.99 + 0.02 * Math.random()) + 3 * Math.random()
                                const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, radius);
                                const alpha = this.alpha + 0.1 * Math.random()
                                gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
                                gradient.addColorStop(0.35 + 0.1 * Math.random(), `rgba(255,150,255,${alpha})`);
                                gradient.addColorStop(1, `rgba(255,0,255,${alpha})`);
                                // gradient.addColorStop(1, `rgba(255,150,255,${alpha})`);
                                ctx.fillStyle = gradient
                                ctx.beginPath();
                                ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
                                ctx.fill();
                                //draw arcs
                                const unit = Vector.rotate({ x: 1, y: 0 }, Math.random() * 6.28)
                                let len = 8
                                const step = this.circleRadius / len
                                let x = this.position.x
                                let y = this.position.y
                                ctx.beginPath();
                                if (Math.random() < 0.5) {
                                    x += step * (unit.x + 6 * (Math.random() - 0.5))
                                    y += step * (unit.y + 6 * (Math.random() - 0.5))
                                    len -= 2
                                }
                                if (Math.random() < 0.5) {
                                    x += step * (unit.x + 6 * (Math.random() - 0.5))
                                    y += step * (unit.y + 6 * (Math.random() - 0.5))
                                    len -= 2
                                }
                                ctx.moveTo(x, y);

                                for (let i = 0; i < len; i++) {
                                    x += step * (unit.x + 1.9 * (Math.random() - 0.5))
                                    y += step * (unit.y + 1.9 * (Math.random() - 0.5))
                                    ctx.lineTo(x, y);
                                }
                                ctx.strokeStyle = "#88f";
                                ctx.lineWidth = 2 * Math.random();
                                ctx.stroke();
                            }
                        },
                    });

                    Composite.add(engine.world, m.plasmaBall);
                    // m.plasmaBall.startingVertices = m.plasmaBall.vertices.slice();
                    m.hold = function () {
                        if (m.isHolding) {
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            m.throwBlock();
                        } else if (input.field) { //not hold but field button is pressed
                            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                            m.grabPowerUp();
                            m.lookForPickUp();
                            if (m.fieldCDcycle < m.cycle) {
                                //field is active
                                if (!m.plasmaBall.isAttached) { //return ball to player
                                    if (m.plasmaBall.isOn) {
                                        m.plasmaBall.isPopping = true
                                    } else {
                                        m.plasmaBall.isAttached = true
                                        m.plasmaBall.isOn = true
                                        m.plasmaBall.isPopping = false
                                        m.plasmaBall.alpha = 0.7
                                        m.plasmaBall.setPositionToNose()
                                        // m.plasmaBall.reset()

                                    }
                                } else if (m.energy > m.plasmaBall.drain) { //charge up when attached
                                    if (tech.isCapacitor) {
                                        m.energy -= m.plasmaBall.drain * 2;
                                        const scale = 1 + 48 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                                        Matter.Body.scale(m.plasmaBall, scale, scale); //grow
                                    } else {
                                        m.energy -= m.plasmaBall.drain;
                                        const scale = 1 + 16 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                                        Matter.Body.scale(m.plasmaBall, scale, scale); //grow    
                                    }
                                    if (m.energy > m.maxEnergy) {
                                        m.energy -= m.plasmaBall.drain * 2;
                                        const scale = 1 + 16 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                                        Matter.Body.scale(m.plasmaBall, scale, scale); //grow    
                                    }
                                    m.plasmaBall.setPositionToNose()

                                    //add friction for player when holding ball, more friction in vertical
                                    // const floatScale = Math.sqrt(m.plasmaBall.circleRadius)
                                    // const friction = 0.0002 * floatScale
                                    // const slowY = (player.velocity.y > 0) ? Math.max(0.8, 1 - friction * player.velocity.y * player.velocity.y) : Math.max(0.98, 1 - friction * Math.abs(player.velocity.y)) //down : up
                                    // Matter.Body.setVelocity(player, {
                                    //     x: Math.max(0.95, 1 - friction * Math.abs(player.velocity.x)) * player.velocity.x,
                                    //     y: slowY * player.velocity.y
                                    // });

                                    // if (player.velocity.y > 7) player.force.y -= 0.95 * player.mass * simulation.g //less gravity when falling fast
                                    // player.force.y -= Math.min(0.95, 0.05 * floatScale) * player.mass * simulation.g; //undo some gravity on up or down

                                    //float
                                    const slowY = (player.velocity.y > 0) ? Math.max(0.8, 1 - 0.002 * player.velocity.y * player.velocity.y) : Math.max(0.98, 1 - 0.001 * Math.abs(player.velocity.y)) //down : up
                                    Matter.Body.setVelocity(player, {
                                        x: Math.max(0.95, 1 - 0.003 * Math.abs(player.velocity.x)) * player.velocity.x,
                                        y: slowY * player.velocity.y
                                    });
                                    if (player.velocity.y > 5) {
                                        player.force.y -= 0.9 * player.mass * simulation.g //less gravity when falling fast
                                    } else {
                                        player.force.y -= 0.5 * player.mass * simulation.g;
                                    }
                                } else {
                                    m.fieldCDcycle = m.cycle + 90;
                                    m.plasmaBall.fire()
                                }
                            }
                        } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                            m.pickUp();
                            if (m.plasmaBall.isAttached) {
                                m.fieldCDcycle = m.cycle + 30;
                                m.plasmaBall.fire()
                            }
                        } else {
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                            if (m.plasmaBall.isAttached) {
                                m.fieldCDcycle = m.cycle + 30;
                                m.plasmaBall.fire()
                            }
                        }
                        m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
                        m.plasmaBall.do()
                    }
                } else if (tech.isExtruder) {
                    m.hold = function () {
                        b.isExtruderOn = false
                        if (m.isHolding) {
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            m.throwBlock();
                        } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                            m.grabPowerUp();
                            m.lookForPickUp();
                            b.extruder();
                        } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                            m.pickUp();
                        } else {
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        }
                        m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
                        if (input.field) {
                            b.wasExtruderOn = true
                        } else {
                            b.wasExtruderOn = false
                            b.canExtruderFire = true
                        }
                        ctx.beginPath(); //draw all the wave bullets
                        for (let i = 1, len = bullet.length; i < len; i++) { //skip the first bullet (which is is oldest bullet)
                            if (bullet[i].isWave) {
                                if (bullet[i].isBranch || bullet[i - 1].isBranch) {
                                    ctx.moveTo(bullet[i].position.x, bullet[i].position.y)
                                } else {
                                    ctx.lineTo(bullet[i].position.x, bullet[i].position.y)
                                }
                            }
                        }
                        if (b.wasExtruderOn && b.isExtruderOn) ctx.lineTo(m.pos.x + 15 * Math.cos(m.angle), m.pos.y + 15 * Math.sin(m.angle))
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = "#f07"
                        ctx.stroke();
                        ctx.lineWidth = tech.extruderRange;
                        ctx.strokeStyle = "rgba(255,0,110,0.06)"
                        ctx.stroke();
                    }
                    // } else if (true) { //plasma sword slash
                    //     const plasmaSweepCycles = 30
                    //     m.plasmaSweep = 0
                    //     m.plasmaSlashDirection = m.flipLegs//Math.random() > 0.5 ? 1 : -1;
                    //     m.hold = function () {
                    //         if (m.isHolding) {
                    //             m.drawHold(m.holdingTarget);
                    //             m.holding();
                    //             m.throwBlock();
                    //             m.plasmaSweep = 0
                    //             // } else if (true) { //not hold but field button is pressed
                    //         } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                    //             if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                    //             m.grabPowerUp();
                    //             m.lookForPickUp();

                    //             //graphics
                    //             if (m.plasmaSweep === 0) m.plasmaSlashDirection = m.flipLegs //Math.random() > 0.5 ? 1 : -1;
                    //             const angle = m.angle //+ 1 * (m.plasmaSweep - plasmaSweepCycles / 2) / plasmaSweepCycles * m.plasmaSlashDirection
                    //             const plasmaSweepCapped = Math.min(m.plasmaSweep, plasmaSweepCycles - 8) / plasmaSweepCycles
                    //             const range = 100 * plasmaSweepCapped
                    //             const arc = 1.3
                    //             const A = { x: m.pos.x + range * Math.cos(angle - arc), y: m.pos.y + range * Math.sin(angle - arc) }
                    //             const B = { x: m.pos.x + range * Math.cos(angle + arc), y: m.pos.y + range * Math.sin(angle + arc) }
                    //             const controlRange = 500 * plasmaSweepCapped
                    //             const AC = { x: m.pos.x + controlRange * Math.cos(angle - arc / 2), y: m.pos.y + controlRange * Math.sin(angle - arc / 2) }
                    //             const BC = { x: m.pos.x + controlRange * Math.cos(angle + arc / 2), y: m.pos.y + controlRange * Math.sin(angle + arc / 2) }
                    //             const innerControlRange = 300 * plasmaSweepCapped
                    //             const ACinner = { x: m.pos.x + innerControlRange * Math.cos(angle - arc / 2), y: m.pos.y + innerControlRange * Math.sin(angle - arc / 2) }
                    //             const BCinner = { x: m.pos.x + innerControlRange * Math.cos(angle + arc / 2), y: m.pos.y + innerControlRange * Math.sin(angle + arc / 2) }
                    //             ctx.beginPath();
                    //             ctx.moveTo(A.x, A.y)
                    //             ctx.bezierCurveTo(AC.x, AC.y, BC.x, BC.y, B.x, B.y); //outer curve
                    //             ctx.bezierCurveTo(BCinner.x, BCinner.y, ACinner.x, ACinner.y, A.x, A.y); //inner curve
                    //             // ctx.strokeStyle = "#000"
                    //             // ctx.stroke();
                    //             ctx.fillStyle = "rgba(255,0,255,0.5)"
                    //             ctx.fill();

                    //             //draw control points for graphics reference
                    //             ctx.lineWidth = '0.5'
                    //             ctx.beginPath();
                    //             ctx.arc(A.x, A.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();
                    //             ctx.beginPath();
                    //             ctx.arc(B.x, B.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();
                    //             ctx.beginPath();
                    //             ctx.arc(AC.x, AC.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();
                    //             ctx.beginPath();
                    //             ctx.arc(BC.x, BC.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();
                    //             ctx.beginPath();
                    //             ctx.arc(ACinner.x, ACinner.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();
                    //             ctx.beginPath();
                    //             ctx.arc(BCinner.x, BCinner.y, 5, 0, 2 * Math.PI);
                    //             ctx.stroke();

                    //             //mob collision detection
                    //             collideRange = 160
                    //             const collideCenter = {
                    //                 x: m.pos.x + collideRange * Math.cos(angle),
                    //                 y: m.pos.y + collideRange * Math.sin(angle)
                    //             }
                    //             ctx.beginPath();
                    //             ctx.arc(collideCenter.x, collideCenter.y, 140, 0, 2 * Math.PI);
                    //             ctx.stroke();

                    //             //push mob away and slow them?


                    //             //sweeping motion and cooldown
                    //             m.plasmaSweep++
                    //             if (m.plasmaSweep > plasmaSweepCycles) {
                    //                 m.plasmaSweep = 0
                    //                 if (m.fireCDcycle < m.cycle + 30) m.fieldCDcycle = m.cycle + 30
                    //             }
                    //         } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                    //             m.pickUp();
                    //             m.plasmaSweep = 0
                    //         } else {
                    //             m.plasmaSweep = 0
                    //             m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                    //         }
                    //         m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
                    //     }
                } else {
                    m.hold = function () {
                        if (m.isHolding) {
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            m.throwBlock();
                        } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                            m.grabPowerUp();
                            m.lookForPickUp();
                            b.plasma();
                        } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                            m.pickUp();
                        } else {
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        }
                        m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
                    }
                }
            },
            effect() {
                m.fieldMeterColor = "#f0f"
                m.eyeFillColor = m.fieldMeterColor
                this.set();
            }
        },
        {
            name: "time dilation",
            description: `use <strong class='color-f'>energy</strong> to <strong style='letter-spacing: 2px;'>stop time</strong><br><strong>1.2x</strong> movement and <strong><em>fire rate</em></strong><br><strong>12</strong> <strong class='color-f'>energy</strong> per second`,
            set() {
                // m.fieldMeterColor = "#0fc"
                // m.fieldMeterColor = "#ff0"
                m.fieldMeterColor = "#3fe"
                m.eyeFillColor = m.fieldMeterColor
                m.fieldFx = 1.25
                // m.fieldJump = 1.09
                m.setMovement();
                b.setFireCD()
                const timeStop = () => {
                    m.immuneCycle = m.cycle + 10; //invulnerable to harm while time is stopped,  this also disables regen
                    //draw field everywhere
                    ctx.globalCompositeOperation = "saturation"
                    ctx.fillStyle = "#ccc";
                    ctx.fillRect(-50000, -50000, 100000, 100000)
                    ctx.globalCompositeOperation = "source-over"
                    //stop time
                    m.isTimeDilated = true;

                    function sleep(who) {
                        for (let i = 0, len = who.length; i < len; ++i) {
                            if (!who[i].isSleeping) {
                                who[i].storeVelocity = who[i].velocity
                                who[i].storeAngularVelocity = who[i].angularVelocity
                            }
                            Matter.Sleeping.set(who[i], true)
                        }
                    }
                    sleep(mob);
                    sleep(body);
                    sleep(bullet);
                    simulation.cycle--; //pause all functions that depend on game cycle increasing
                }
                if (tech.isRewindField) {
                    this.rewindCount = 0
                    m.grabPowerUpRange2 = 300000//        m.grabPowerUpRange2 = 200000;

                    m.hold = function () {
                        // console.log(m.fieldCDcycle)
                        m.grabPowerUp();
                        // //grab power ups
                        // for (let i = 0, len = powerUp.length; i < len; ++i) {
                        //     if (
                        //         Vector.magnitudeSquared(Vector.sub(m.pos, powerUp[i].position)) < 100000 &&
                        //         !simulation.isChoosing &&
                        //         (powerUp[i].name !== "heal" || m.health !== m.maxHealth || tech.isOverHeal)
                        //     ) {
                        //         powerUps.onPickUp(powerUp[i]);
                        //         powerUp[i].effect();
                        //         Matter.Composite.remove(engine.world, powerUp[i]);
                        //         powerUp.splice(i, 1);
                        //         break; //because the array order is messed up after splice
                        //     }
                        // }
                        if (m.isHolding) {
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            m.throwBlock();
                            m.wakeCheck();
                        } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                            const drain = 0.0014 / (1 + 0.05 * m.coupling)
                            if (m.energy > drain) m.energy -= drain
                            m.grabPowerUp();
                            if (this.rewindCount === 0) {
                                m.lookForPickUp();
                            }

                            if (!m.holdingTarget) {
                                if (this.rewindCount === 0) { //large upfront energy cost to enter rewind mode
                                    if (m.energy > 0.3) {
                                        m.energy -= 0.3
                                    } else {
                                        this.rewindCount = 0;
                                        m.resetHistory();
                                        if (m.fireCDcycle < m.cycle + 60) m.fieldCDcycle = m.cycle + 60
                                        m.immuneCycle = m.cycle //if you reach the end of the history disable harm immunity
                                    }
                                }
                                this.rewindCount += 6;
                                const DRAIN = 0.003
                                let history = m.history[(m.cycle - this.rewindCount) % 600]
                                if (this.rewindCount > 599 || m.energy < DRAIN) {
                                    this.rewindCount = 0;
                                    m.resetHistory();
                                    if (m.fireCDcycle < m.cycle + 60) m.fieldCDcycle = m.cycle + 60
                                    m.immuneCycle = m.cycle //if you reach the end of the history disable harm immunity
                                } else {
                                    //draw field everywhere
                                    ctx.globalCompositeOperation = "saturation"
                                    ctx.fillStyle = "#ccc";
                                    ctx.fillRect(-100000, -100000, 200000, 200000)
                                    ctx.globalCompositeOperation = "source-over"
                                    // m.grabPowerUp(); //a second grab power up to make the power ups easier to grab, and they more fast which matches the time theme
                                    m.energy -= DRAIN
                                    if (m.immuneCycle < m.cycle + 5) m.immuneCycle = m.cycle + 5; //player is immune to damage for 5 cycles
                                    Matter.Body.setPosition(player, history.position);
                                    Matter.Body.setVelocity(player, {
                                        x: history.velocity.x,
                                        y: history.velocity.y
                                    });
                                    if (m.health < history.health) {
                                        m.health = history.health
                                        if (m.health > m.maxHealth) m.health = m.maxHealth
                                        m.displayHealth();
                                    }
                                    m.yOff = history.yOff
                                    if (m.yOff < 48) {
                                        m.doCrouch()
                                    } else {
                                        m.undoCrouch()
                                    }
                                    if (tech.isRewindBot && !(this.rewindCount % 60)) {
                                        for (let i = 0; i < tech.isRewindBot; i++) {
                                            b.randomBot(m.pos, false, false)
                                            bullet[bullet.length - 1].endCycle = simulation.cycle + 300 + Math.floor(180 * Math.random()) //8-9 seconds
                                        }
                                    }
                                    if (tech.isRewindGrenade && !(this.rewindCount % 30)) {
                                        b.grenade(m.pos, this.rewindCount) //Math.PI / 2
                                        const who = bullet[bullet.length - 1]
                                        who.endCycle = simulation.cycle + 120
                                    }
                                }
                            }
                            m.wakeCheck();
                        } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                            m.pickUp();
                            this.rewindCount = 0;
                            m.wakeCheck();
                        } else if (tech.isTimeStop && player.speed < 1 && m.onGround && !input.fire) {
                            timeStop();
                            this.rewindCount = 0;
                        } else {
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                            this.rewindCount = 0;
                            m.wakeCheck();
                        }
                        m.drawRegenEnergy() // this calls  m.regenEnergy(); also
                    }
                } else {
                    m.fieldFire = true;
                    m.isTimeDilated = false;
                    m.hold = function () {
                        if (m.isHolding) {
                            m.wakeCheck();
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            m.throwBlock();
                        } else if (input.field && m.fieldCDcycle < m.cycle) {
                            const drain = 0.0026 / (1 + 0.03 * m.coupling)
                            if (m.energy > drain) m.energy -= drain
                            m.grabPowerUp();
                            m.lookForPickUp(); //this drains energy 0.001
                            if (m.energy > drain) {
                                timeStop();
                            } else { //holding, but field button is released
                                m.fieldCDcycle = m.cycle + 120;
                                m.energy = 0;
                                m.wakeCheck();
                                m.wakeCheck();
                            }
                        } else if (tech.isTimeStop && player.speed < 1 && m.onGround && m.fireCDcycle < m.cycle && !input.fire) {
                            timeStop();
                            //makes things move at 1/5 time rate, but has an annoying flicker for mob graphics, and other minor bugs
                            // if (!(m.cycle % 4)) {
                            //     // requestAnimationFrame(() => {
                            //     m.wakeCheck();
                            //     // simulation.timePlayerSkip(1)
                            //     // }); //wrapping in animation frame prevents errors, probably          
                            //     ctx.globalCompositeOperation = "saturation"
                            //     ctx.fillStyle = "#ccc";
                            //     ctx.fillRect(-100000, -100000, 200000, 200000)
                            //     ctx.globalCompositeOperation = "source-over"
                            // } else {
                            //     timeStop();
                            // }
                        } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                            m.wakeCheck();
                            m.pickUp();
                        } else {
                            m.wakeCheck();
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        }
                        m.drawRegenEnergy()
                    }
                }
            },
            effect() {
                if (tech.isTimeStop) {
                    m.fieldHarmReduction = 0.6;
                } else {
                    m.fieldHarmReduction = 1;
                }
                this.set();
            }
        },
        {
            name: "metamaterial cloaking",
            description: `<strong>0.4x</strong> <strong class='color-defense'>damage taken</strong> while <strong class='color-cloaked'>cloaked</strong><br>after <strong class='color-cloaked'>decloaking</strong> <strong>4.5x</strong> <strong class='color-d'>damage</strong> for <strong>2</strong> s<br><strong>6</strong> <strong class='color-f'>energy</strong> per second`,
            effect: () => {
                m.fieldFire = true;
                m.fieldMeterColor = "#333";
                m.eyeFillColor = m.fieldMeterColor
                m.fieldPhase = 0;
                m.isCloak = false
                m.fieldDrawRadius = 0
                m.isSneakAttack = true;
                m.sneakAttackCycle = 0;
                m.enterCloakCycle = 0;
                m.drawCloakedM = function () {
                    m.walk_cycle -= m.flipLegs * m.Vx;
                    m.pos.x += 4
                    m.draw();
                }
                m.drawCloak = function () {
                    m.fieldPhase += 0.007
                    const wiggle = 0.15 * Math.sin(m.fieldPhase * 0.5)
                    ctx.beginPath();
                    ctx.ellipse(m.pos.x, m.pos.y, m.fieldDrawRadius * (1 - wiggle), m.fieldDrawRadius * (1 + wiggle), m.fieldPhase, 0, 2 * Math.PI);
                    ctx.fillStyle = "#fff"
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "#000"
                    // ctx.stroke()
                    ctx.globalCompositeOperation = "destination-in";
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";
                    ctx.clip();
                }
                m.hold = function () {
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold and field button is pressed
                        if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
                        m.grabPowerUp();
                        m.lookForPickUp();
                    } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding target exists, and field button is not pressed
                        m.pickUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                    }
                    //not shooting (or using field) enable cloak
                    if (m.energy < 0.05 && m.fireCDcycle < m.cycle && !input.fire) m.fireCDcycle = m.cycle
                    if (m.fireCDcycle + 10 < m.cycle && !input.fire) { //automatically cloak if not firing
                        // const drain = 0.02
                        if (!m.isCloak) { //&& m.energy > drain + 0.03
                            // m.energy -= drain
                            m.isCloak = true //enter cloak
                            m.fieldHarmReduction = 0.4;
                            m.enterCloakCycle = m.cycle
                            if (tech.isCloakHealLastHit && m.lastHit > 0) {
                                const heal = Math.min(0.75 * m.lastHit, m.energy)
                                m.addHealth(heal); //heal from last hit
                                m.lastHit = 0
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: m.pos.x,
                                    y: m.pos.y,
                                    radius: Math.sqrt(heal) * 200,
                                    color: "rgba(0,255,200,0.6)",
                                    time: 16
                                });
                            }
                            if (tech.isIntangible) {
                                for (let i = 0; i < bullet.length; i++) {
                                    if (bullet[i].botType && bullet[i].botType !== "orbit") bullet[i].collisionFilter.mask = cat.map | cat.bullet | cat.mobBullet | cat.mobShield
                                }
                            }
                        }
                    } else if (m.isCloak) { //exit cloak
                        m.sneakAttackCycle = m.cycle
                        m.isCloak = false
                        m.fieldHarmReduction = 1

                        if (tech.isIntangible) {
                            for (let i = 0; i < bullet.length; i++) {
                                if (bullet[i].botType && bullet[i].botType !== "orbit") bullet[i].collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
                            }
                        }
                        if (tech.isCloakStun) { //stun nearby mobs after exiting cloak
                            // let isMobsAround = false
                            const stunRange = m.fieldDrawRadius * 1.25
                            // const drain = 0.01
                            // if (m.energy > drain) {
                            for (let i = 0, len = mob.length; i < len; ++i) {
                                if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) < stunRange && Matter.Query.ray(map, mob[i].position, m.pos).length === 0 && !mob[i].isBadTarget) {
                                    isMobsAround = true
                                    mobs.statusStun(mob[i], 120)
                                }
                            }
                            // if (isMobsAround) {
                            //     m.energy -= drain
                            //     simulation.drawList.push({
                            //         x: m.pos.x,
                            //         y: m.pos.y,
                            //         radius: stunRange,
                            //         color: "hsla(0,50%,100%,0.7)",
                            //         time: 7
                            //     });
                            // }
                            // }
                        }
                    }

                    if (m.isCloak) {
                        m.fieldRange = m.fieldRange * 0.85 + 130
                        m.fieldDrawRadius = m.fieldRange * 1.1 //* 0.88 //* Math.min(1, 0.3 + 0.5 * Math.min(1, energy * energy));
                        m.drawCloak()
                        // ctx.globalCompositeOperation = "lighter";
                        // m.drawCloakedM()
                        // ctx.globalCompositeOperation = "source-over";

                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 35, 0, 2 * Math.PI);
                        ctx.strokeStyle = "rgba(255,255,255,0.25)";//"rgba(0,0,0,0.7)";//"rgba(255,255,255,0.7)";//"rgba(255,0,100,0.7)";
                        ctx.lineWidth = 10
                        ctx.stroke();

                    } else if (m.fieldRange < 4000) {
                        m.fieldRange += 90
                        m.fieldDrawRadius = m.fieldRange //* Math.min(1, 0.3 + 0.5 * Math.min(1, energy * energy));
                        m.drawCloak()
                    }
                    if (tech.isIntangible) {
                        if (m.isCloak) {
                            player.collisionFilter.mask = cat.map
                            let inPlayer = Matter.Query.region(mob, player.bounds)
                            if (inPlayer.length > 0) {
                                for (let i = 0; i < inPlayer.length; i++) {
                                    if (m.energy > 0) {
                                        if (!inPlayer[i].isUnblockable) m.energy -= 0.004 + 0.0005 * simulation.difficultyMode;
                                        if (inPlayer[i].shield) m.energy -= 0.015 + 0.001 * simulation.difficultyMode;
                                    }
                                }
                            }
                        } else {
                            player.collisionFilter.mask = cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield //normal collisions
                        }
                    }
                    this.drawRegenEnergyCloaking()
                    if (m.isSneakAttack && m.sneakAttackCycle + Math.min(100, 0.66 * (m.cycle - m.enterCloakCycle)) > m.cycle) { //show sneak attack status
                        m.fieldDamage = 4.5 * (1 + 0.05 * m.coupling)
                        const timeLeft = (m.sneakAttackCycle + Math.min(100, 0.66 * (m.cycle - m.enterCloakCycle)) - m.cycle) * 0.5
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 32, 0, 2 * Math.PI);
                        ctx.strokeStyle = "rgba(180,30,70,0.5)";//"rgba(0,0,0,0.7)";//"rgba(255,255,255,0.7)";//"rgba(255,0,100,0.7)";
                        ctx.lineWidth = Math.max(Math.min(10, timeLeft), 3);
                        ctx.stroke();
                        // ctx.globalCompositeOperation = "multiply";
                        // m.drawCloakedM()
                        // ctx.globalCompositeOperation = "source-over";
                    } else {
                        m.fieldDamage = 1
                    }
                }
            }
        },
        {
            name: "pilot wave",
            description: `use <strong class='color-f'>energy</strong> to guide <strong class='color-block'>blocks</strong><em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↓→↘↓↙←↓↓</em><br><div class="circle-grid tech"></div>, <div class="circle-grid gun"></div>, and <div class="circle-grid field"></div> have <strong>+3</strong> <strong class='color-choice'><span>ch</span><span>oi</span><span>ces</span></strong><br><strong>10</strong> <strong class='color-f'>energy</strong> per second`,
            keyLog: [null, null, null, null, null, null, null],
            collider: null,
            fieldMass: 1,
            effect: () => {
                m.fieldUpgrades[8].collider = Matter.Bodies.polygon(m.pos.x, m.pos.y, 8, 35, {
                    friction: 0,
                    frictionAir: 0.12,
                    collisionFilter: { category: cat.player, mask: cat.map }, //no collision because player is holding
                    classType: "field",
                    lastSpeed: 0,
                    isPLayerInField: false,
                });
                Composite.add(engine.world, m.fieldUpgrades[8].collider); //add to world

                //store event function so it can be found and removed in m.setField()
                m.fieldEvent = function (event) {
                    m.fieldUpgrades[4].keyLog.shift() //remove first element
                    m.fieldUpgrades[4].keyLog.push(event.code) //add new key to end
                    const patternA = ["ArrowDown", "ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowDown", "ArrowDown"]
                    const patternB = [input.key.down, input.key.down, input.key.right, input.key.down, input.key.left, input.key.down, input.key.down]
                    const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

                    const width = 90 + Math.floor(30 * Math.random())
                    const height = 11 + Math.floor(7 * Math.random())
                    const yOff = 60
                    const blockRegion = {
                        min: {
                            x: m.pos.x - width,
                            y: m.pos.y + yOff - height
                        },
                        max: {
                            x: m.pos.x + width,
                            y: m.pos.y + yOff + height
                        }
                    }
                    if (
                        (arraysEqual(m.fieldUpgrades[4].keyLog, patternA) || arraysEqual(m.fieldUpgrades[4].keyLog, patternB))
                        && !Matter.Query.region(map, blockRegion).length
                        && !m.crouch
                    ) {
                        //move player up away from block
                        Matter.Body.setPosition(player, { x: player.position.x, y: player.position.y - height })

                        //spawn a block
                        body[body.length] = Matter.Bodies.rectangle(m.pos.x, blockRegion.max.y, width * 2, height * 2, {
                            friction: 0.05,
                            frictionAir: 0.001,
                            collisionFilter: {
                                category: cat.body,
                                mask: cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
                            },
                            classType: "body",
                            isPilotWave: true,
                        });
                        Composite.add(engine.world, body[body.length - 1]); //add to world
                        simulation.inGameConsole(`Composite<span class='color-symbol'>.</span>add<span class='color-symbol'>(</span>engine.world<span class='color-symbol'>,</span> block<span class='color-symbol'>)</span> &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">//↓↓→↘↓↙←↓↓</em>`);
                    }
                }
                window.addEventListener("keydown", m.fieldEvent);

                m.fieldMeterColor = "#333"
                m.eyeFillColor = m.fieldMeterColor
                m.fieldPhase = 0;
                m.fieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
                m.lastFieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
                m.fieldOn = false;
                // m.fieldFire = true;

                m.fieldRadius = 0;
                m.drop();
                m.hold = function () {
                    if (tech.isPrinter) {
                        //spawn blocks if field and crouch
                        if (input.field && m.fieldCDcycle < m.cycle && input.down && !m.isHolding) {
                            m.printBlock()
                        }
                        //if holding block grow it
                        if (m.isHolding) {
                            m.drawHold(m.holdingTarget);
                            m.holding();
                            if (tech.isPrinter && m.holdingTarget.isPrinted && input.field) {
                                // if (Math.random() < 0.004 && m.holdingTarget.vertices.length < 12) m.holdingTarget.vertices.push({ x: 0, y: 0 }) //small chance to increase the number of vertices
                                m.holdingTarget.radius += Math.min(1.1, 1.3 / m.holdingTarget.mass) //grow up to a limit
                                const r1 = m.holdingTarget.radius * (1 + 0.12 * Math.sin(m.cycle * 0.11))
                                const r2 = m.holdingTarget.radius * (1 + 0.12 * Math.cos(m.cycle * 0.11))
                                let angle = (m.cycle * 0.01) % (2 * Math.PI) //rotate the object 
                                let vertices = []
                                for (let i = 0, len = m.holdingTarget.vertices.length; i < len; i++) {
                                    angle += 2 * Math.PI / len
                                    vertices.push({ x: m.holdingTarget.position.x + r1 * Math.cos(angle), y: m.holdingTarget.position.y + r2 * Math.sin(angle) })
                                }
                                Matter.Body.setVertices(m.holdingTarget, vertices)
                                m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
                            }
                            m.throwBlock()
                        } else {
                            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        }
                        //if releasing field throw it

                    }
                    if (input.field) {
                        if (m.fieldCDcycle < m.cycle) {
                            if (!m.fieldOn) { // if field was off, teleport to player
                                m.fieldOn = true;
                                Matter.Body.setPosition(m.fieldUpgrades[8].collider, m.pos);
                                m.fieldPosition.x = m.pos.x
                                m.fieldPosition.y = m.pos.y
                            }
                            //when field is on it smoothly moves towards the mouse
                            const sub = Vector.sub(simulation.mouseInGame, m.fieldUpgrades[8].collider.position)
                            const mag = Vector.magnitude(sub)

                            //adjust speed of field here, and with friction and mass above where the collier is spawned
                            const fieldMassScale = Math.max(1.5, Math.pow(m.fieldUpgrades[8].fieldMass, 0.35)) //how much mass inside the field slows the push and cap
                            const scaledMag = 0.00000017 / fieldMassScale * Math.pow(mag, 2) //having the mag squared makes the effect weaker in close for fine movement
                            let push = Vector.mult(Vector.normalise(sub), scaledMag)
                            const cap = 0.17 / fieldMassScale //acts like a "speed limit"
                            if (Vector.magnitude(push) > cap) push = Vector.mult(Vector.normalise(push), cap)
                            m.fieldUpgrades[8].collider.force = push

                            //check for map collisions
                            if (Matter.Query.ray(map, m.fieldPosition, m.fieldUpgrades[8].collider.position).length) {
                                Matter.Body.setVelocity(m.fieldUpgrades[8].collider, Vector.mult(m.fieldUpgrades[8].collider.velocity, 0.6))
                                m.fieldRadius *= 0.6
                            }
                            m.fieldPosition.x = m.fieldUpgrades[8].collider.position.x
                            m.fieldPosition.y = m.fieldUpgrades[8].collider.position.y

                            //check if player is inside field
                            // if (tech.isSurfing) {

                            // }

                            //grab power ups into the field
                            for (let i = 0, len = powerUp.length; i < len; ++i) {
                                if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue

                                const dxP = m.fieldPosition.x - powerUp[i].position.x;
                                const dyP = m.fieldPosition.y - powerUp[i].position.y;
                                const dist2 = dxP * dxP + dyP * dyP + 200;
                                // float towards field  if looking at and in range  or  if very close to player
                                if (
                                    dist2 < m.fieldRadius * m.fieldRadius &&
                                    (m.lookingAt(powerUp[i]) || dist2 < 16000)
                                ) {
                                    powerUp[i].force.x += 0.05 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
                                    powerUp[i].force.y += 0.05 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                                    //extra friction
                                    Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 });
                                    if (
                                        dist2 < 5000 &&
                                        !simulation.isChoosing &&
                                        (tech.isOverHeal || powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01)
                                        // (powerUp[i].name !== "heal" || m.health < 0.94 * m.maxHealth)
                                        // (powerUp[i].name !== "ammo" || b.guns[b.activeGun].ammo !== Infinity)
                                    ) { //use power up if it is close enough
                                        powerUps.onPickUp(powerUp[i]);
                                        powerUp[i].effect();
                                        Matter.Composite.remove(engine.world, powerUp[i]);
                                        powerUp.splice(i, 1);
                                        // m.fieldRadius += 50
                                        break; //because the array order is messed up after splice
                                    }
                                }
                            }
                            //grab power ups normally at player too
                            m.grabPowerUp();

                            let radiusGoal, radiusSmooth, drainPassive
                            if (Matter.Query.ray(map, m.fieldPosition, player.position).length) { //is there something blocking the player's view of the field
                                radiusGoal = 0
                                radiusSmooth = 0.995
                                drainPassive = 1.5 * m.fieldRegen //* (tech.isSurfing && m.fieldUpgrades[8].collider.isPLayerInField ? 0 : 1)
                            } else {
                                radiusGoal = Math.max(50, 250 - 2 * m.fieldUpgrades[8].collider.speed) //* (tech.isSurfing && m.fieldUpgrades[8].collider.isPLayerInField ? 1.5 : 1)
                                radiusSmooth = 0.97
                                drainPassive = m.fieldRegen //* (tech.isSurfing && m.fieldUpgrades[8].collider.isPLayerInField ? 0 : 1)
                            }
                            m.fieldRadius = m.fieldRadius * radiusSmooth + radiusGoal * (1 - radiusSmooth)

                            //track velocity change for calculating block energy drain
                            const speedChange = Math.max(0, m.fieldUpgrades[8].collider.speed - m.fieldUpgrades[8].collider.lastSpeed)
                            m.fieldUpgrades[8].collider.lastSpeed = m.fieldUpgrades[8].collider.speed

                            if (m.energy > drainPassive) {
                                m.energy -= drainPassive;
                                m.fieldUpgrades[8].fieldMass = 1
                                for (let i = 0, len = body.length; i < len; ++i) {
                                    if (Vector.magnitude(Vector.sub(body[i].position, m.fieldPosition)) < m.fieldRadius && !body[i].isNotHoldable) {
                                        // const drainBlock = m.fieldUpgrades[8].collider.speed * body[i].mass * 0.0000013
                                        const drainBlock = speedChange * body[i].mass * 0.000095 //* (tech.isSurfing && m.fieldUpgrades[8].collider.isPLayerInField ? 0 : 1)
                                        if (m.energy > drainBlock) {
                                            m.energy -= drainBlock;
                                            Matter.Body.setVelocity(body[i], m.fieldUpgrades[8].collider.velocity); //give block mouse velocity
                                            Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0.8)
                                            m.fieldUpgrades[8].fieldMass += body[i].mass
                                            //blocks drift towards center of pilot wave
                                            const sub = Vector.sub(m.fieldPosition, body[i].position)
                                            const push = Vector.mult(Vector.normalise(sub), 0.0001 * body[i].mass * Vector.magnitude(sub))
                                            body[i].force.x += push.x
                                            body[i].force.y += push.y - body[i].mass * simulation.g //remove gravity effects

                                            if (m.standingOn === body[i] && m.onGround) {
                                                //try to stop the walk animation
                                                m.walk_cycle -= m.flipLegs * m.Vx
                                                m.stepSize *= 0
                                                //extra stability
                                                Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0)
                                                //match velocity upto a change of 10 per cycle
                                                const limit = 10
                                                const deltaV = Math.max(-limit, Math.min((m.fieldUpgrades[8].collider.velocity.x - player.velocity.x), limit))
                                                Matter.Body.setVelocity(player, { x: player.velocity.x + deltaV, y: player.velocity.y });
                                            }

                                        } else {
                                            m.fieldCDcycle = m.cycle + 60;
                                            m.fieldOn = false
                                            m.fieldRadius = 0
                                            break
                                        }
                                    }
                                }

                                // if (tech.isFreezeMobs) {
                                //     for (let i = 0, len = mob.length; i < len; ++i) {
                                //         if (!mob[i].isMobBullet && !mob[i].shield && !mob[i].isShielded && Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) < m.fieldRadius + mob[i].radius) {
                                //             const ICE_DRAIN = 0.0005
                                //             if (m.energy > ICE_DRAIN) m.energy -= ICE_DRAIN;
                                //             mobs.statusSlow(mob[i], 180)
                                //         }
                                //     }
                                // }

                                ctx.beginPath();
                                const rotate = m.cycle * 0.008;
                                m.fieldPhase += 0.2 // - 0.5 * Math.sqrt(Math.min(m.energy, 1));
                                const off1 = 1 + 0.06 * Math.sin(m.fieldPhase);
                                const off2 = 1 - 0.06 * Math.sin(m.fieldPhase);
                                ctx.beginPath();
                                ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, 1.2 * m.fieldRadius * off1, 1.2 * m.fieldRadius * off2, rotate, 0, 2 * Math.PI);
                                ctx.globalCompositeOperation = "exclusion";
                                ctx.fillStyle = "#fff";
                                ctx.fill();
                                ctx.globalCompositeOperation = "source-over";
                                ctx.beginPath();
                                ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, 1.2 * m.fieldRadius * off1, 1.2 * m.fieldRadius * off2, rotate, 0, 2 * Math.PI * m.energy / m.maxEnergy);
                                if (radiusGoal || m.cycle % 5) {
                                    ctx.strokeStyle = "#000";
                                } else {
                                    ctx.strokeStyle = "#fff";
                                }
                                ctx.lineWidth = 4;
                                ctx.stroke();

                            } else {
                                m.fieldCDcycle = m.cycle + 60;
                                m.fieldOn = false
                                m.fieldRadius = 0
                            }
                        } else {
                            m.grabPowerUp();
                        }
                    } else {
                        m.fieldOn = false
                        m.fieldRadius = 0
                    }
                    m.drawRegenEnergy("rgba(0,0,0,0.2)")

                    // //draw physics collider
                    // ctx.beginPath();
                    // const vertices = m.fieldUpgrades[8].collider.vertices;
                    // ctx.moveTo(vertices[0].x, vertices[0].y);
                    // for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
                    // ctx.lineTo(vertices[0].x, vertices[0].y);
                    // ctx.strokeStyle = "#000";
                    // ctx.lineWidth = 2;
                    // ctx.stroke();
                }
            }
        },
        {
            name: "wormhole",
            //<strong class='color-worm'>wormholes</strong> attract <strong class='color-block'>blocks</strong> and power ups<br>
            description: "use <strong class='color-f'>energy</strong> to <strong>tunnel</strong> through a <strong class='color-worm'>wormhole</strong><br><strong>+8%</strong> chance to <strong class='color-dup'>duplicate</strong> spawned <strong>power ups</strong><br><strong>8</strong> <strong class='color-f'>energy</strong> per second", //<br>bullets may also traverse <strong class='color-worm'>wormholes</strong>
            drain: 0,
            effect: function () {
                m.fieldMeterColor = "#bbf" //"#0c5"
                m.eyeFillColor = m.fieldMeterColor

                m.duplicateChance = 0.08
                m.fieldRange = 0
                powerUps.setPowerUpMode(); //needed after adjusting duplication chance

                m.hold = function () {
                    // m.hole = {  //this is reset with each new field, but I'm leaving it here for reference
                    //   isOn: false,
                    //   isReady: true,
                    //   pos1: {x: 0,y: 0},
                    //   pos2: {x: 0,y: 0},
                    //   angle: 0,
                    //   unit:{x:0,y:0},
                    // }
                    if (m.hole.isOn) {
                        // draw holes
                        m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
                        const semiMajorAxis = m.fieldRange + 30
                        const edge1a = Vector.add(Vector.mult(m.hole.unit, semiMajorAxis), m.hole.pos1)
                        const edge1b = Vector.add(Vector.mult(m.hole.unit, -semiMajorAxis), m.hole.pos1)
                        const edge2a = Vector.add(Vector.mult(m.hole.unit, semiMajorAxis), m.hole.pos2)
                        const edge2b = Vector.add(Vector.mult(m.hole.unit, -semiMajorAxis), m.hole.pos2)
                        ctx.beginPath();
                        ctx.moveTo(edge1a.x, edge1a.y)
                        ctx.bezierCurveTo(m.hole.pos1.x, m.hole.pos1.y, m.hole.pos2.x, m.hole.pos2.y, edge2a.x, edge2a.y);
                        ctx.lineTo(edge2b.x, edge2b.y)
                        ctx.bezierCurveTo(m.hole.pos2.x, m.hole.pos2.y, m.hole.pos1.x, m.hole.pos1.y, edge1b.x, edge1b.y);
                        ctx.fillStyle = `rgba(255,255,255,${200 / m.fieldRange / m.fieldRange})` //"rgba(0,0,0,0.1)"
                        ctx.fill();
                        ctx.beginPath();
                        ctx.ellipse(m.hole.pos1.x, m.hole.pos1.y, m.fieldRange, semiMajorAxis, m.hole.angle, 0, 2 * Math.PI)
                        ctx.ellipse(m.hole.pos2.x, m.hole.pos2.y, m.fieldRange, semiMajorAxis, m.hole.angle, 0, 2 * Math.PI)
                        ctx.fillStyle = `rgba(255,255,255,${32 / m.fieldRange})`
                        ctx.fill();

                        //suck power ups
                        for (let i = 0, len = powerUp.length; i < len; ++i) {
                            if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
                            //which hole is closer
                            const dxP1 = m.hole.pos1.x - powerUp[i].position.x;
                            const dyP1 = m.hole.pos1.y - powerUp[i].position.y;
                            const dxP2 = m.hole.pos2.x - powerUp[i].position.x;
                            const dyP2 = m.hole.pos2.y - powerUp[i].position.y;
                            let dxP, dyP, dist2
                            if (dxP1 * dxP1 + dyP1 * dyP1 < dxP2 * dxP2 + dyP2 * dyP2) {
                                dxP = dxP1
                                dyP = dyP1
                            } else {
                                dxP = dxP2
                                dyP = dyP2
                            }
                            dist2 = dxP * dxP + dyP * dyP;
                            if (dist2 < 600000) { //&& !(m.health === m.maxHealth && powerUp[i].name === "heal")
                                powerUp[i].force.x += 4 * (dxP / dist2) * powerUp[i].mass; // float towards hole
                                powerUp[i].force.y += 4 * (dyP / dist2) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                                Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.05, y: powerUp[i].velocity.y * 0.05 });
                                if (dist2 < 1000 && !simulation.isChoosing) { //use power up if it is close enough
                                    m.fieldRange *= 0.8
                                    powerUps.onPickUp(powerUp[i]);
                                    powerUp[i].effect();
                                    Matter.Composite.remove(engine.world, powerUp[i]);
                                    powerUp.splice(i, 1);
                                    break; //because the array order is messed up after splice
                                }
                            }
                        }
                        //suck and shrink blocks
                        const suckRange = 500
                        const shrinkRange = 100
                        const shrinkScale = 0.97;
                        const slowScale = 0.9
                        for (let i = 0, len = body.length; i < len; i++) {
                            if (!body[i].isNotHoldable) {
                                const dist1 = Vector.magnitude(Vector.sub(m.hole.pos1, body[i].position))
                                const dist2 = Vector.magnitude(Vector.sub(m.hole.pos2, body[i].position))
                                if (dist1 < dist2) {
                                    if (dist1 < suckRange) {
                                        const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos1, body[i].position)), 1)
                                        const slow = Vector.mult(body[i].velocity, slowScale)
                                        Matter.Body.setVelocity(body[i], Vector.add(slow, pull));
                                        //shrink
                                        if (Vector.magnitude(Vector.sub(m.hole.pos1, body[i].position)) < shrinkRange) {
                                            Matter.Body.scale(body[i], shrinkScale, shrinkScale);
                                            if (body[i].mass < 0.05) {
                                                Matter.Composite.remove(engine.world, body[i]);
                                                body.splice(i, 1);
                                                m.fieldRange *= 0.8
                                                if ((m.fieldMode === 0 || m.fieldMode === 9) && m.immuneCycle < m.cycle) m.energy += 0.02 * m.coupling * level.isReducedRegen
                                                if (tech.isWormholeWorms) { //pandimensional spermia
                                                    b.worm(Vector.add(m.hole.pos2, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                                                    Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), -10));
                                                    if (Math.random() < 0.5) { //chance for a second worm
                                                        b.worm(Vector.add(m.hole.pos2, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                                                        Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), -10));
                                                    }
                                                }
                                                break
                                            }
                                        }
                                    }
                                } else if (dist2 < suckRange) {
                                    const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos2, body[i].position)), 1)
                                    const slow = Vector.mult(body[i].velocity, slowScale)
                                    Matter.Body.setVelocity(body[i], Vector.add(slow, pull));
                                    //shrink
                                    if (Vector.magnitude(Vector.sub(m.hole.pos2, body[i].position)) < shrinkRange) {
                                        Matter.Body.scale(body[i], shrinkScale, shrinkScale);
                                        if (body[i].mass < 0.05) {
                                            Matter.Composite.remove(engine.world, body[i]);
                                            body.splice(i, 1);
                                            m.fieldRange *= 0.8
                                            if ((m.fieldMode === 0 || m.fieldMode === 9) && m.immuneCycle < m.cycle) m.energy += 0.02 * m.coupling * level.isReducedRegen
                                            if (m.fieldMode === 0 || m.fieldMode === 9) m.energy += 0.02 * m.coupling * level.isReducedRegen
                                            if (tech.isWormholeWorms) { //pandimensional spermia
                                                b.worm(Vector.add(m.hole.pos1, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                                                Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), 5));
                                                if (Math.random() < 0.5) { //chance for a second worm
                                                    b.worm(Vector.add(m.hole.pos1, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                                                    Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), 5));
                                                }
                                            }
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        if (tech.isWormHoleBullets) {
                            //teleport bullets
                            for (let i = 0, len = bullet.length; i < len; ++i) { //teleport bullets from hole1 to hole2
                                if (!bullet[i].botType && !bullet[i].isInHole) { //don't teleport bots
                                    if (Vector.magnitude(Vector.sub(m.hole.pos1, bullet[i].position)) < m.fieldRange) { //find if bullet is touching hole1
                                        Matter.Body.setPosition(bullet[i], Vector.add(m.hole.pos2, Vector.sub(m.hole.pos1, bullet[i].position)));
                                        m.fieldRange += 5
                                        bullet[i].isInHole = true
                                    } else if (Vector.magnitude(Vector.sub(m.hole.pos2, bullet[i].position)) < m.fieldRange) { //find if bullet is touching hole1
                                        Matter.Body.setPosition(bullet[i], Vector.add(m.hole.pos1, Vector.sub(m.hole.pos2, bullet[i].position)));
                                        m.fieldRange += 5
                                        bullet[i].isInHole = true
                                    }
                                }
                            }
                            // mobs get pushed away
                            for (let i = 0, len = mob.length; i < len; i++) {
                                if (Vector.magnitude(Vector.sub(m.hole.pos1, mob[i].position)) < 200) {
                                    const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos1, mob[i].position)), -0.07)
                                    Matter.Body.setVelocity(mob[i], Vector.add(mob[i].velocity, pull));
                                }
                                if (Vector.magnitude(Vector.sub(m.hole.pos2, mob[i].position)) < 200) {
                                    const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos2, mob[i].position)), -0.07)
                                    Matter.Body.setVelocity(mob[i], Vector.add(mob[i].velocity, pull));
                                }
                            }
                        }
                    }

                    if (m.fieldCDcycle < m.cycle) {
                        const scale = 60
                        const justPastMouse = Vector.add(Vector.mult(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)), 50), simulation.mouseInGame)
                        const sub = Vector.sub(simulation.mouseInGame, m.pos)
                        const mag = Vector.magnitude(sub)

                        if (input.field) {
                            if (tech.isWormHolePause) {
                                // const drain = m.fieldRegen + 0.000035
                                // if (m.energy > drain) {
                                // m.energy -= drain
                                if (m.immuneCycle < m.cycle + 1) m.immuneCycle = m.cycle + 1; //player is immune to damage for 1 cycle
                                m.isTimeDilated = true;

                                function sleep(who) {
                                    for (let i = 0, len = who.length; i < len; ++i) {
                                        if (!who[i].isSleeping) {
                                            who[i].storeVelocity = who[i].velocity
                                            who[i].storeAngularVelocity = who[i].angularVelocity
                                        }
                                        Matter.Sleeping.set(who[i], true)
                                    }
                                }
                                sleep(mob);
                                sleep(body);
                                sleep(bullet);
                                simulation.cycle--; //pause all functions that depend on game cycle increasing
                                Matter.Body.setVelocity(player, { //keep player frozen
                                    x: 0,
                                    y: -55 * player.mass * simulation.g //undo gravity before it is added
                                });
                                player.force.x = 0
                                player.force.y = 0
                                // } else {
                                //     m.wakeCheck();
                                //     m.energy = 0;
                                // }
                            }

                            m.grabPowerUp();
                            //draw possible wormhole
                            if (tech.isWormholeMapIgnore && Matter.Query.ray(map, m.pos, justPastMouse).length !== 0) {
                                this.drain = (0.05 + 0.005 * Math.sqrt(mag)) * 2
                            } else {
                                this.drain = tech.isFreeWormHole ? 0 : 0.05 + 0.005 * Math.sqrt(mag)
                            }
                            const unit = Vector.perp(Vector.normalise(sub))
                            const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }
                            m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
                            const edge2a = Vector.add(Vector.mult(unit, 1.5 * m.fieldRange), simulation.mouseInGame)
                            const edge2b = Vector.add(Vector.mult(unit, -1.5 * m.fieldRange), simulation.mouseInGame)
                            ctx.beginPath();
                            ctx.moveTo(where.x, where.y)
                            ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2a.x, edge2a.y);
                            ctx.moveTo(where.x, where.y)
                            ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2b.x, edge2b.y);
                            if (
                                mag > 250 && m.energy > this.drain &&
                                (tech.isWormholeMapIgnore || Matter.Query.ray(map, m.pos, justPastMouse).length === 0) &&
                                Matter.Query.region(map, {
                                    min: {
                                        x: simulation.mouseInGame.x - scale,
                                        y: simulation.mouseInGame.y - scale
                                    },
                                    max: {
                                        x: simulation.mouseInGame.x + scale,
                                        y: simulation.mouseInGame.y + scale
                                    }
                                }).length === 0
                            ) {
                                m.hole.isReady = true;
                                // ctx.fillStyle = "rgba(255,255,255,0.5)"
                                // ctx.fill();
                                ctx.lineWidth = 1
                                ctx.strokeStyle = "#000"
                                ctx.stroke();
                            } else {
                                m.hole.isReady = false;
                                ctx.lineWidth = 1
                                ctx.strokeStyle = "#000"
                                ctx.lineDashOffset = 30 * Math.random()
                                ctx.setLineDash([20, 40]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }
                        } else {
                            if (tech.isWormHolePause && m.isTimeDilated) m.wakeCheck();

                            //make new wormhole
                            if (
                                m.hole.isReady && mag > 250 && m.energy > this.drain &&
                                (tech.isWormholeMapIgnore || Matter.Query.ray(map, m.pos, justPastMouse).length === 0) &&
                                Matter.Query.region(map, {
                                    min: { x: simulation.mouseInGame.x - scale, y: simulation.mouseInGame.y - scale },
                                    max: { x: simulation.mouseInGame.x + scale, y: simulation.mouseInGame.y + scale }
                                }).length === 0
                            ) {
                                //tech.isWormHolePause
                                // console.log(this.drain)
                                m.energy -= this.drain
                                m.hole.isReady = false;
                                m.fieldRange = 0
                                Matter.Body.setPosition(player, simulation.mouseInGame);
                                // simulation.translatePlayerAndCamera(simulation.mouseInGame) //too jerky
                                m.buttonCD_jump = 0 //this might fix a bug with jumping
                                const velocity = Vector.mult(Vector.normalise(sub), 20)
                                Matter.Body.setVelocity(player, {
                                    x: velocity.x,
                                    y: velocity.y - 4 //an extra vertical kick so the player hangs in place longer
                                });
                                if (m.immuneCycle < m.cycle + 5) m.immuneCycle = m.cycle + 5; //player is immune to damage for 1/4 seconds 
                                // move bots to player
                                for (let i = 0; i < bullet.length; i++) {
                                    if (bullet[i].botType) {
                                        Matter.Body.setPosition(bullet[i], Vector.add(player.position, {
                                            x: 250 * (Math.random() - 0.5),
                                            y: 250 * (Math.random() - 0.5)
                                        }));
                                        Matter.Body.setVelocity(bullet[i], {
                                            x: 0,
                                            y: 0
                                        });
                                    }
                                }

                                //set holes
                                m.hole.isOn = true;
                                m.hole.pos1.x = m.pos.x
                                m.hole.pos1.y = m.pos.y
                                m.hole.pos2.x = player.position.x
                                m.hole.pos2.y = player.position.y
                                m.hole.angle = Math.atan2(sub.y, sub.x)
                                m.hole.unit = Vector.perp(Vector.normalise(sub))

                                if (tech.isWormholeDamage) {
                                    who = Matter.Query.ray(mob, m.pos, simulation.mouseInGame, 100)
                                    for (let i = 0; i < who.length; i++) {
                                        if (who[i].body.alive) {
                                            mobs.statusDoT(who[i].body, 1, 420)
                                            mobs.statusStun(who[i].body, 360)
                                        }
                                    }
                                }
                            }
                        }

                        // if (true && m.energy > 0.5) { //teleport away low mass mobs
                        //     // && !(m.cycle % 1)
                        //     const hit = Matter.Query.region(mob, {
                        //         min: {
                        //             x: m.pos.x - 80,
                        //             y: m.pos.y - 80
                        //         },
                        //         max: {
                        //             x: m.pos.x + 80,
                        //             y: m.pos.y + 160
                        //         }
                        //     })

                        //     // find incoming mob with low mass
                        //     for (let i = 0; i < hit.length; i++) {
                        //         if (hit[i].mass < 4 && m.energy > hit[i].mass * 0.06) {
                        //             //is the mob moving towards the player?

                        //             // console.log('found one', hit[i].mass)
                        //             const unit = Vector.normalise(hit[i].velocity)
                        //             const jump = Vector.mult(unit, 200)
                        //             const where = Vector.add(hit[i].position, jump)
                        //             if (Matter.Query.ray(map, hit[i].position, where).length === 0) { // check if space 180 from mob is clear of body and map
                        //                 // m.energy -= hit[i].mass * 0.06
                        //                 // m.fieldCDcycle = m.cycle + 30;
                        //                 simulation.drawList.push({ x: hit[i].position.x, y: hit[i].position.y, radius: 20, color: "#fff", time: 16 });
                        //                 Matter.Body.setPosition(hit[i], where);
                        //                 simulation.drawList.push({ x: hit[i].position.x, y: hit[i].position.y, radius: 20, color: "#fff", time: 16 });
                        //             }
                        //             // break
                        //         }
                        //     }
                        // }
                    }
                    // if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
                    //     const justPastMouse = Vector.add(Vector.mult(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)), 50), simulation.mouseInGame)
                    //     const scale = 60
                    //     const sub = Vector.sub(simulation.mouseInGame, m.pos)
                    //     const mag = Vector.magnitude(sub)
                    //     const drain = tech.isFreeWormHole ? 0 : 0.06 + 0.006 * Math.sqrt(mag)
                    //     if (m.hole.isReady && mag > 250 && m.energy > drain) {
                    //         if (
                    //             Matter.Query.region(map, {
                    //                 min: {
                    //                     x: simulation.mouseInGame.x - scale,
                    //                     y: simulation.mouseInGame.y - scale
                    //                 },
                    //                 max: {
                    //                     x: simulation.mouseInGame.x + scale,
                    //                     y: simulation.mouseInGame.y + scale
                    //                 }
                    //             }).length === 0 &&
                    //             Matter.Query.ray(map, m.pos, justPastMouse).length === 0
                    //             // Matter.Query.ray(map, m.pos, simulation.mouseInGame).length === 0 &&
                    //             // Matter.Query.ray(map, player.position, simulation.mouseInGame).length === 0 &&
                    //             // Matter.Query.ray(map, player.position, justPastMouse).length === 0
                    //         ) {
                    //             m.energy -= drain
                    //             m.hole.isReady = false;
                    //             m.fieldRange = 0
                    //             Matter.Body.setPosition(player, simulation.mouseInGame);
                    //             m.buttonCD_jump = 0 //this might fix a bug with jumping
                    //             const velocity = Vector.mult(Vector.normalise(sub), 20)
                    //             Matter.Body.setVelocity(player, {
                    //                 x: velocity.x,
                    //                 y: velocity.y - 4 //an extra vertical kick so the player hangs in place longer
                    //             });
                    //             if (m.immuneCycle < m.cycle + 15) m.immuneCycle = m.cycle + 15; //player is immune to damage for 1/4 seconds 
                    //             // move bots to player
                    //             for (let i = 0; i < bullet.length; i++) {
                    //                 if (bullet[i].botType) {
                    //                     Matter.Body.setPosition(bullet[i], Vector.add(player.position, {
                    //                         x: 250 * (Math.random() - 0.5),
                    //                         y: 250 * (Math.random() - 0.5)
                    //                     }));
                    //                     Matter.Body.setVelocity(bullet[i], {
                    //                         x: 0,
                    //                         y: 0
                    //                     });
                    //                 }
                    //             }

                    //             //set holes
                    //             m.hole.isOn = true;
                    //             m.hole.pos1.x = m.pos.x
                    //             m.hole.pos1.y = m.pos.y
                    //             m.hole.pos2.x = player.position.x
                    //             m.hole.pos2.y = player.position.y
                    //             m.hole.angle = Math.atan2(sub.y, sub.x)
                    //             m.hole.unit = Vector.perp(Vector.normalise(sub))

                    //             if (tech.isWormholeDamage) {
                    //                 who = Matter.Query.ray(mob, m.pos, simulation.mouseInGame, 100)
                    //                 for (let i = 0; i < who.length; i++) {
                    //                     if (who[i].body.alive) {
                    //                         mobs.statusDoT(who[i].body, 1, 420)
                    //                         mobs.statusStun(who[i].body, 360)
                    //                     }
                    //                 }
                    //             }
                    //         } else {
                    //             //draw failed wormhole
                    //             const unit = Vector.perp(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)))
                    //             const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle), }
                    //             m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
                    //             const edge2a = Vector.add(Vector.mult(unit, 1.5 * m.fieldRange), simulation.mouseInGame)
                    //             const edge2b = Vector.add(Vector.mult(unit, -1.5 * m.fieldRange), simulation.mouseInGame)
                    //             ctx.beginPath();
                    //             ctx.moveTo(where.x, where.y)
                    //             ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2a.x, edge2a.y);
                    //             ctx.lineTo(edge2b.x, edge2b.y)
                    //             ctx.bezierCurveTo(simulation.mouseInGame.x, simulation.mouseInGame.y, where.x, where.y, where.x, where.y);
                    //             // ctx.fillStyle = "rgba(255,255,255,0.5)"
                    //             // ctx.fill();
                    //             ctx.lineWidth = 1
                    //             ctx.strokeStyle = "#000"
                    //             ctx.lineDashOffset = 30 * Math.random()
                    //             ctx.setLineDash([20, 40]);
                    //             ctx.stroke();
                    //             ctx.setLineDash([]);
                    //         }
                    //     }
                    //     m.grabPowerUp();
                    // } else {
                    //     m.hole.isReady = true;
                    // }
                    m.drawRegenEnergy()
                }
            },

            // rewind: function() {
            //     if (input.down) {
            //         if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
            //             const DRAIN = 0.01
            //             if (this.rewindCount < 289 && m.energy > DRAIN) {
            //                 m.energy -= DRAIN


            //                 if (this.rewindCount === 0) {
            //                     const shortPause = function() {
            //                         if (m.defaultFPSCycle < m.cycle) { //back to default values
            //                             simulation.fpsCap = simulation.fpsCapDefault
            //                             simulation.fpsInterval = 1000 / simulation.fpsCap;
            //                             // document.getElementById("dmg").style.transition = "opacity 1s";
            //                             // document.getElementById("dmg").style.opacity = "0";
            //                         } else {
            //                             requestAnimationFrame(shortPause);
            //                         }
            //                     };
            //                     if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
            //                     simulation.fpsCap = 4 //1 is longest pause, 4 is standard
            //                     simulation.fpsInterval = 1000 / simulation.fpsCap;
            //                     m.defaultFPSCycle = m.cycle
            //                 }


            //                 this.rewindCount += 10;
            //                 simulation.wipe = function() { //set wipe to have trails
            //                     // ctx.fillStyle = "rgba(255,255,255,0)";
            //                     ctx.fillStyle = `rgba(221,221,221,${0.004})`;
            //                     ctx.fillRect(0, 0, canvas.width, canvas.height);
            //                 }
            //                 let history = m.history[(m.cycle - this.rewindCount) % 300]
            //                 Matter.Body.setPosition(player, history.position);
            //                 Matter.Body.setVelocity(player, { x: history.velocity.x, y: history.velocity.y });
            //                 if (history.health > m.health) {
            //                     m.health = history.health
            //                     m.displayHealth();
            //                 }
            //                 //grab power ups
            //                 for (let i = 0, len = powerUp.length; i < len; ++i) {
            //                     const dxP = player.position.x - powerUp[i].position.x;
            //                     const dyP = player.position.y - powerUp[i].position.y;
            //                     if (dxP * dxP + dyP * dyP < 50000 && !simulation.isChoosing && !(m.health === m.maxHealth && powerUp[i].name === "heal")) {
            //                         powerUps.onPickUp(player.position);
            //                         powerUp[i].effect();
            //                         Matter.Composite.remove(engine.world, powerUp[i]);
            //                         powerUp.splice(i, 1);
            //                         const shortPause = function() {
            //                             if (m.defaultFPSCycle < m.cycle) { //back to default values
            //                                 simulation.fpsCap = simulation.fpsCapDefault
            //                                 simulation.fpsInterval = 1000 / simulation.fpsCap;
            //                                 // document.getElementById("dmg").style.transition = "opacity 1s";
            //                                 // document.getElementById("dmg").style.opacity = "0";
            //                             } else {
            //                                 requestAnimationFrame(shortPause);
            //                             }
            //                         };
            //                         if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
            //                         simulation.fpsCap = 3 //1 is longest pause, 4 is standard
            //                         simulation.fpsInterval = 1000 / simulation.fpsCap;
            //                         m.defaultFPSCycle = m.cycle
            //                         break; //because the array order is messed up after splice
            //                     }
            //                 }
            //                 m.immuneCycle = m.cycle + 5; //player is immune to damage for 30 cycles
            //             } else {
            //                 m.fieldCDcycle = m.cycle + 30;
            //                 // m.resetHistory();
            //             }
            //         } else {
            //             if (this.rewindCount !== 0) {
            //                 m.fieldCDcycle = m.cycle + 30;
            //                 m.resetHistory();
            //                 this.rewindCount = 0;
            //                 simulation.wipe = function() { //set wipe to normal
            //                     ctx.clearRect(0, 0, canvas.width, canvas.height);
            //                 }
            //             }
            //             m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            //         }
            //     }
            //     m.drawRegenEnergy()
            // },
        },
        {
            name: "grappling hook",
            description: `use <strong class='color-f'>energy</strong> to fire a hook that <strong>pulls</strong> you<br><strong>0.5x</strong> <strong class='color-defense'>damage taken</strong><br><strong>9</strong> <strong class='color-f'>energy</strong> per second`,
            effect: () => {
                m.fieldFire = true;
                // m.holdingMassScale = 0.01; //can hold heavier blocks with lower cost to jumping
                // m.fieldMeterColor = "#789"//"#456"
                m.eyeFillColor = m.fieldMeterColor
                m.fieldHarmReduction = 0.5; //40% reduction
                m.grabPowerUpRange2 = 300000 //m.grabPowerUpRange2 = 200000;

                m.hold = function () {
                    if (m.isHolding) {
                        m.drawHold(m.holdingTarget);
                        m.holding();
                        m.throwBlock();
                    } else if (input.field) {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        if (m.fieldCDcycle < m.cycle) {
                            if (m.energy > 0.02) m.energy -= 0.02
                            b.grapple({ x: m.pos.x + 40 * Math.cos(m.angle), y: m.pos.y + 40 * Math.sin(m.angle) }, m.angle)
                            if (m.fieldCDcycle < m.cycle + 20) m.fieldCDcycle = m.cycle + 20
                        }
                        m.grabPowerUp();
                    } else {
                        m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
                        if (tech.isHookDefense && m.energy > 0.15 && m.fieldCDcycle < m.cycle) {
                            const range = 300
                            for (let i = 0; i < mob.length; i++) {
                                if (!mob[i].isBadTarget &&
                                    !mob[i].isInvulnerable &&
                                    Vector.magnitude(Vector.sub(m.pos, mob[i].position)) < range &&
                                    Matter.Query.ray(map, m.pos, mob[i].position).length === 0
                                ) {
                                    m.energy -= 0.1
                                    if (m.fieldCDcycle < m.cycle + 30) m.fieldCDcycle = m.cycle + 30
                                    const angle = Math.atan2(mob[i].position.y - player.position.y, mob[i].position.x - player.position.x);
                                    b.harpoon(m.pos, mob[i], angle, 0.75, true, 20) // harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true, thrust = 0.1) {
                                    bullet[bullet.length - 1].drain = 0
                                    const maxCount = 6
                                    for (let j = maxCount - 1; j > 0; j--) {
                                        b.harpoon(m.pos, mob[i], angle + j * 2 * Math.PI / maxCount, 0.75, true, 10)
                                        bullet[bullet.length - 1].drain = 0
                                    }
                                    break
                                }
                            }
                            ctx.beginPath();
                            ctx.arc(m.pos.x, m.pos.y, range, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#000";
                            ctx.lineWidth = 0.25;
                            ctx.setLineDash([10, 30]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                    }
                    m.drawRegenEnergy()
                    //look for nearby mobs and fire harpoons at them
                }
            }
        },
    ],
    //************************************************************************************
    //************************************************************************************
    //*************************************  SHIP  ***************************************
    //************************************************************************************
    //************************************************************************************
    isShipMode: false,
    shipMode(thrust = 0.03, drag = 0.99, torque = 1.15, rotationDrag = 0.92) { //  m.shipMode() //thrust = 0.03, drag = 0.99, torque = 1.15, rotationDrag = 0.92
        if (!m.isShipMode) {
            //if wires remove them
            for (let i = 0; i < mob.length; i++) {
                if (!mob[i].freeOfWires) mob[i].freeOfWires = true
            }
            m.isShipMode = true
            // simulation.isCheating = true
            const points = [{
                x: 29.979168754143455,
                y: 4.748337243898336
            },
            {
                x: 27.04503734408824,
                y: 13.7801138209198
            },
            {
                x: 21.462582474874278,
                y: 21.462582475257523
            },
            {
                x: 13.780113820536943,
                y: 27.045037344471485
            },
            {
                x: 4.74833724351507,
                y: 29.979168754526473
            },
            {
                x: -4.748337245049098,
                y: 29.979168754526473
            },
            {
                x: -13.780113822071026,
                y: 27.045037344471485
            },
            {
                x: -21.46258247640829,
                y: 21.462582475257523
            },
            {
                x: -27.045037345621797,
                y: 13.7801138209198
            },
            {
                x: -29.979168755677012,
                y: 4.748337243898336
            },
            {
                x: -29.979168755677012,
                y: -4.7483372446656045
            },
            {
                x: -27.045037345621797,
                y: -13.78011382168726
            },
            {
                x: -21.46258247640829,
                y: -21.462582476024817
            },
            {
                x: -13.780113822071026,
                y: -27.045037345239006
            },
            {
                x: -4.748337245049098,
                y: -29.97916875529422
            },
            {
                x: 4.74833724351507,
                y: -29.97916875529422
            },
            {
                x: 13.780113820536943,
                y: -27.045037345239006
            },
            {
                x: 21.462582474874278,
                y: -21.462582476024817
            },
            {
                x: 27.04503734408824,
                y: -13.78011382168726
            },
            {
                x: 29.979168754143455,
                y: -4.7483372446656045
            }
            ]
            // 
            Matter.Body.setVertices(player, Matter.Vertices.create(points, player))
            player.parts.pop()
            player.parts.pop()
            player.parts.pop()
            player.parts.pop()
            // Matter.Body.setDensity(player, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
            m.defaultMass = 30
            Matter.Body.setMass(player, m.defaultMass);
            player.friction = 0.01
            player.restitution = 0.2
            // player.frictionStatic = 0.1
            // Matter.Body.setInertia(player, Infinity); //disable rotation

            // const circle = Bodies.polygon(player.position.x, player.position.x, 30, 30)
            // player.parts[0] = circle
            // Matter.Body.setVertices(player.parts[0], Matter.Vertices.create(points, player.parts[0]))
            m.spin = 0
            // m.groundControl = () => {}         //disable entering ground
            m.onGround = false
            m.lastOnGroundCycle = 0
            // playerOnGroundCheck = () => {}
            m.airControl = () => { //tank controls
                player.force.y -= player.mass * simulation.g; //undo gravity
                Matter.Body.setVelocity(player, {
                    x: drag * player.velocity.x,
                    y: drag * player.velocity.y
                });
                if (input.up) { //forward thrust
                    player.force.x += thrust * Math.cos(m.angle) * m.squirrelJump
                    player.force.y += thrust * Math.sin(m.angle) * m.squirrelJump
                } else if (input.down) {
                    player.force.x -= 0.6 * thrust * Math.cos(m.angle)
                    player.force.y -= 0.6 * thrust * Math.sin(m.angle)
                }
                //rotation
                Matter.Body.setAngularVelocity(player, player.angularVelocity * rotationDrag)
                if (input.right) {
                    player.torque += torque
                } else if (input.left) {
                    player.torque -= torque
                }
                m.angle += m.spin
                m.angle = player.angle
            }





            // level.exit.drawAndCheck = () => { //fix this
            //     if (
            //         player.position.x > level.exit.x &&
            //         player.position.x < level.exit.x + 100 &&
            //         player.position.y > level.exit.y - 150 &&
            //         player.position.y < level.exit.y + 40
            //     ) {
            //         level.nextLevel()
            //     }
            // }
            m.move = () => {
                m.pos.x = player.position.x;
                m.pos.y = player.position.y;
                m.Vx = player.velocity.x;
                m.Vy = player.velocity.y;

                //tracks the last 10s of player information
                m.history.splice(m.cycle % 600, 1, {
                    position: {
                        x: player.position.x,
                        y: player.position.y,
                    },
                    velocity: {
                        x: player.velocity.x,
                        y: player.velocity.y
                    },
                    yOff: m.yOff,
                    angle: m.angle,
                    health: m.health,
                    energy: m.energy,
                    activeGun: b.activeGun
                });
            }

            m.look = () => { //disable mouse aiming
                const scale = 0.8;
                m.transSmoothX = canvas.width2 - m.pos.x - (simulation.mouse.x - canvas.width2) * scale;
                m.transSmoothY = canvas.height2 - m.pos.y - (simulation.mouse.y - canvas.height2) * scale;

                m.transX += (m.transSmoothX - m.transX) * 0.07;
                m.transY += (m.transSmoothY - m.transY) * 0.07;
            }

            simulation.camera = () => {
                const dx = simulation.mouse.x / window.innerWidth - 0.5 //x distance from mouse to window center scaled by window width
                const dy = simulation.mouse.y / window.innerHeight - 0.5 //y distance from mouse to window center scaled by window height
                const d = Math.max(dx * dx, dy * dy)
                simulation.edgeZoomOutSmooth = (1 + 4 * d * d) * 0.04 + simulation.edgeZoomOutSmooth * 0.96

                ctx.save();
                ctx.translate(canvas.width2, canvas.height2); //center
                ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
                ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
                //calculate in game mouse position by undoing the zoom and translations
                simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
                simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
            }

            m.draw = () => { //just draw the circle
                ctx.save();
                ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                ctx.translate(player.position.x, player.position.y);
                ctx.rotate(player.angle);

                //thrust
                if (input.up) {
                    var grd2 = ctx.createLinearGradient(0, 0, -150, 0);
                    // grd2.addColorStop(0, 'rgba(255, 255, 155, 0.8)');
                    // grd2.addColorStop(1, 'rgba(255, 200, 0, 0.1)');
                    grd2.addColorStop(0, 'rgba(150, 200, 255, 0.7)');
                    grd2.addColorStop(1, 'rgba(150, 200, 255, 0)');
                    ctx.fillStyle = grd2;
                    ctx.beginPath();
                    ctx.moveTo(-18, -25);
                    //10 * (Math.random() - 0.5), 10 * (Math.random() - 0.5)
                    ctx.lineTo(-18, 25);
                    ctx.lineTo(-50 - 100 * Math.random(), 0);
                    ctx.fill();
                } else if (input.down) {
                    var grd2 = ctx.createLinearGradient(0, 0, 80, 0);
                    grd2.addColorStop(0, 'rgba(150, 200, 255, 0.7)');
                    grd2.addColorStop(1, 'rgba(150, 200, 255, 0)');
                    ctx.fillStyle = grd2;
                    ctx.beginPath();
                    ctx.moveTo(20, -16);
                    //10 * (Math.random() - 0.5), 10 * (Math.random() - 0.5)
                    ctx.lineTo(20, 16);
                    ctx.lineTo(35 + 43 * Math.random(), 0);
                    ctx.fill();
                }

                //body
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.restore();
            }

            //fix collisions
            collisionChecks = function (event) {
                const pairs = event.pairs;
                for (let i = 0, j = pairs.length; i != j; i++) {
                    //mob + (player,bullet,body) collisions
                    for (let k = 0; k < mob.length; k++) {
                        if (mob[k].alive && m.alive) {
                            if (pairs[i].bodyA === mob[k]) {
                                collideMob(pairs[i].bodyB);
                                break;
                            } else if (pairs[i].bodyB === mob[k]) {
                                collideMob(pairs[i].bodyA);
                                break;
                            }

                            function collideMob(obj) {
                                //player + mob collision
                                if (
                                    m.immuneCycle < m.cycle &&
                                    // (obj === playerBody || obj === playerHead) &&
                                    (obj === player) &&
                                    !mob[k].isSlowed && !mob[k].isStunned
                                ) {
                                    mob[k].foundPlayer();
                                    let dmg = Math.min(Math.max(0.025 * Math.sqrt(mob[k].mass), 0.05), 0.3) * simulation.dmgScale; //player damage is capped at 0.3*dmgScale of 1.0
                                    if (tech.isRewindAvoidDeath && (m.energy + 0.05) > Math.min(0.95, m.maxEnergy) && dmg > 0.01) { //CPT reversal runs in m.damage, but it stops the rest of the collision code here too
                                        m.damage(dmg);
                                        return
                                    }
                                    m.damage(dmg);
                                    if (tech.isPiezo) m.energy += 20.48 * level.isReducedRegen;
                                    if (tech.isStimulatedEmission) powerUps.ejectTech()
                                    if (mob[k].onHit) mob[k].onHit();
                                    if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                                    //extra kick between player and mob              //this section would be better with forces but they don't work...
                                    let angle = Math.atan2(player.position.y - mob[k].position.y, player.position.x - mob[k].position.x);
                                    Matter.Body.setVelocity(player, {
                                        x: player.velocity.x + 8 * Math.cos(angle),
                                        y: player.velocity.y + 8 * Math.sin(angle)
                                    });
                                    Matter.Body.setVelocity(mob[k], {
                                        x: mob[k].velocity.x - 8 * Math.cos(angle),
                                        y: mob[k].velocity.y - 8 * Math.sin(angle)
                                    });

                                    if (tech.isAnnihilation && !mob[k].shield && !mob[k].isShielded && !mob[k].isBoss && mob[k].isDropPowerUp && m.energy > 0.08) {
                                        m.energy -= 0.08 //* Math.max(m.maxEnergy, m.energy) //0.33 * m.energy
                                        m.immuneCycle = 0; //player doesn't go immune to collision damage
                                        mob[k].death();
                                        simulation.drawList.push({ //add dmg to draw queue
                                            x: pairs[i].activeContacts[0].vertex.x,
                                            y: pairs[i].activeContacts[0].vertex.y,
                                            radius: dmg * 2000,
                                            color: "rgba(255,0,255,0.2)",
                                            time: simulation.drawTime
                                        });
                                    } else {
                                        simulation.drawList.push({ //add dmg to draw queue
                                            x: pairs[i].activeContacts[0].vertex.x,
                                            y: pairs[i].activeContacts[0].vertex.y,
                                            radius: dmg * 500,
                                            color: simulation.mobDmgColor,
                                            time: simulation.drawTime
                                        });
                                    }
                                    return;
                                    // }
                                }
                                //mob + bullet collisions
                                if (obj.classType === "bullet" && obj.speed > obj.minDmgSpeed) {
                                    obj.beforeDmg(mob[k]); //some bullets do actions when they hits things, like despawn //forces don't seem to work here
                                    let dmg = m.dmgScale * (obj.dmg + 0.15 * obj.mass * Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity)))
                                    if (tech.isCrit && mob[k].isStunned) dmg *= 4
                                    mob[k].damage(dmg);
                                    if (mob[k].alive) mob[k].foundPlayer();
                                    if (mob[k].damageReduction) {
                                        simulation.drawList.push({ //add dmg to draw queue
                                            x: pairs[i].activeContacts[0].vertex.x,
                                            y: pairs[i].activeContacts[0].vertex.y,
                                            radius: Math.log(dmg + 1.1) * 40 * mob[k].damageReduction + 3,
                                            color: simulation.playerDmgColor,
                                            time: simulation.drawTime
                                        });
                                    }
                                    return;
                                }
                                //mob + body collisions
                                if (obj.classType === "body" && obj.speed > 6) {
                                    const v = Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity));
                                    if (v > 9) {
                                        let dmg = tech.blockDamage * m.dmgScale * v * obj.mass * (tech.isMobBlockFling ? 2 : 1);
                                        if (mob[k].isShielded) dmg *= 0.7
                                        mob[k].damage(dmg, true);
                                        if (tech.isBlockPowerUps && !mob[k].alive && mob[k].isDropPowerUp && Math.random() < 0.5) {
                                            let type = "ammo"
                                            if (Math.random() < 0.4) {
                                                type = "heal"
                                            } else if (Math.random() < 0.4 && !tech.isSuperDeterminism) {
                                                type = "research"
                                            }
                                            powerUps.spawn(mob[k].position.x, mob[k].position.y, type);
                                            // for (let i = 0, len = Math.ceil(2 * Math.random()); i < len; i++) {}
                                        }

                                        const stunTime = dmg / Math.sqrt(obj.mass)
                                        if (stunTime > 0.5) mobs.statusStun(mob[k], 30 + 60 * Math.sqrt(stunTime))
                                        if (mob[k].alive && mob[k].distanceToPlayer2() < 1000000 && !m.isCloak) mob[k].foundPlayer();
                                        if (tech.fragments && obj.speed > 10 && !obj.hasFragmented) {
                                            obj.hasFragmented = true;
                                            b.targetedNail(obj.position, tech.fragments * 4)
                                        }
                                        if (mob[k].damageReduction) {
                                            simulation.drawList.push({
                                                x: pairs[i].activeContacts[0].vertex.x,
                                                y: pairs[i].activeContacts[0].vertex.y,
                                                radius: Math.log(dmg + 1.1) * 40 * mob[k].damageReduction + 3,
                                                color: simulation.playerDmgColor,
                                                time: simulation.drawTime
                                            });
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
};