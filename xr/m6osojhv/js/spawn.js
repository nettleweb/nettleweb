//main object for spawning things in a level
const spawn = {
    nonCollideBossList: ["cellBossCulture", "bomberBoss", "powerUpBoss", "growBossCulture", "snakeBoss"],
    // other bosses: suckerBoss, laserBoss, tetherBoss, bounceBoss, sprayBoss, mineBoss, hopMotherBoss    //these need a particular level to work so they are not included in the random pool
    randomBossList: [
        "orbitalBoss", "historyBoss", "shooterBoss", "cellBossCulture", "bomberBoss", "spiderBoss", "launcherBoss", "laserTargetingBoss",
        "powerUpBoss", "powerUpBossBaby", "streamBoss", "pulsarBoss", "spawnerBossCulture", "grenadierBoss", "growBossCulture", "blinkBoss",
        "snakeSpitBoss", "laserBombingBoss", "blockBoss", "revolutionBoss", "slashBoss", "shieldingBoss",
        "timeSkipBoss", "dragonFlyBoss", "beetleBoss", "sneakBoss", "mantisBoss", "laserLayerBoss",
        "snakeBoss"
    ],
    bossTypeSpawnOrder: [], //preset list of boss names calculated at the start of a run by the randomSeed
    bossTypeSpawnIndex: 0, //increases as the boss type cycles
    randomLevelBoss(x, y, options = []) {
        if (options.length === 0) {
            const boss = spawn.bossTypeSpawnOrder[spawn.bossTypeSpawnIndex++ % spawn.bossTypeSpawnOrder.length]
            spawn[boss](x, y)
        } else {
            spawn[options[Math.floor(Math.random() * options.length)]](x, y)
        }
    },
    pickList: ["starter", "starter"],
    fullPickList: [
        "slasher", "slasher", "slasher2", "slasher3",
        "hopper", "hopper", "hopMother", "hopMother",
        "stabber", "stabber", "stabber",
        "springer", "springer", "springer",
        "stinger", "stinger", "stinger",
        "flutter", "flutter",
        "striker", "striker",
        "shooter", "shooter",
        "grenadier", "grenadier",
        "pulsar", "pulsar",
        "laser", "laser",
        "laserLayer", "laserLayer",
        "sneaker", "launcher", "launcherOne", "exploder", "sucker", "sniper", "spinner", "grower", "beamer", "spawner", "ghoster", "focuser"
    ],
    mobTypeSpawnOrder: [], //preset list of mob names calculated at the start of a run by the randomSeed
    mobTypeSpawnIndex: 0, //increases as the mob type cycles
    allowedGroupList: ["spinner", "striker", "springer", "laser", "focuser", "beamer", "exploder", "spawner", "shooter", "launcher", "launcherOne", "stabber", "sniper", "pulsar", "grenadier", "slasher", "flutter", "stinger", "laserLayer"],
    setSpawnList() { //this is run at the start of each new level to determine the possible mobs for the level
        spawn.pickList.splice(0, 1);
        const push = spawn.mobTypeSpawnOrder[spawn.mobTypeSpawnIndex++ % spawn.mobTypeSpawnOrder.length]
        spawn.pickList.push(push);

        // if (spawn.mobTypeSpawnIndex > spawn.mobTypeSpawnOrder.length) spawn.mobTypeSpawnIndex = 0
        //each level has 2 mobs: one new mob and one from the last level
        // spawn.pickList.splice(0, 1);
        // spawn.pickList.push(spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)]);
    },
    spawnChance(chance) {
        const difficultyChance = (simulation.difficultyMode === 1) ? 1 : simulation.difficulty
        return (Math.random() < chance + 0.07 * difficultyChance) && (mob.length < -1 + 16 * Math.log10(simulation.difficulty + 1))
    },
    randomMob(x, y, chance = 1) {
        if (spawn.spawnChance(chance) || chance === Infinity) {
            const pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
            spawn[pick](x, y);
        }
        if (tech.isDuplicateMobs && Math.random() < tech.duplicationChance()) {
            const pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
            spawn[pick](x, y);
        }
    },
    randomSmallMob(x, y,
        num = Math.max(Math.min(Math.round(Math.random() * simulation.difficulty * 0.2), 4), 0),
        size = 16 + Math.ceil(Math.random() * 15),
        chance = 1) {
        if (spawn.spawnChance(chance)) {
            for (let i = 0; i < num; ++i) {
                const pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                spawn[pick](x + Math.round((Math.random() - 0.5) * 20) + i * size * 2.5, y + Math.round((Math.random() - 0.5) * 20), size);
            }
        }
        if (tech.isDuplicateMobs && Math.random() < tech.duplicationChance()) {
            for (let i = 0; i < num; ++i) {
                const pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                spawn[pick](x + Math.round((Math.random() - 0.5) * 20) + i * size * 2.5, y + Math.round((Math.random() - 0.5) * 20), size);
            }
        }
    },
    randomGroup(x, y, chance = 1) {
        if (spawn.spawnChance(chance) && simulation.difficulty > 2 || chance === Infinity) {
            //choose from the possible picklist
            let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
            //is the pick able to be a group?
            let canBeGroup = false;
            for (let i = 0, len = spawn.allowedGroupList.length; i < len; ++i) {
                if (spawn.allowedGroupList[i] === pick) {
                    canBeGroup = true;
                    break;
                }
            }
            if (canBeGroup) {
                if (Math.random() < 0.55) {
                    spawn.nodeGroup(x, y, pick);
                } else {
                    spawn.lineGroup(x, y, pick);
                }
            } else {
                if (Math.random() < 0.1) {
                    spawn[pick](x, y, 90 + Math.random() * 40); //one extra large mob
                    spawn.spawnOrbitals(mob[mob.length - 1], mob[mob.length - 1].radius + 50 + 200 * Math.random(), 1)
                    // } else if (Math.random() < 0.35) {
                    // spawn.blockGroup(x, y) //hidden grouping blocks
                } else {
                    pick = (Math.random() < 0.5) ? "randomList" : "random";
                    if (Math.random() < 0.55) {
                        spawn.nodeGroup(x, y, pick);
                    } else {
                        spawn.lineGroup(x, y, pick);
                    }
                }
            }
        }
    },
    secondaryBossChance(x, y, options = []) {
        if (simulation.difficultyMode > 2 && level.levelsCleared > 1) {
            spawn.randomLevelBoss(x, y, options);
            powerUps.spawn(x - 30, y, "ammo");
            powerUps.spawn(x + 30, y, "ammo");
        } else {
            return false
        }
    },
    //mob templates *********************************************************************************************
    //***********************************************************************************************************
    darkMatter(x = m.pos.x, y = m.pos.y) { //immortal mob that follows player         //if you have the tech it spawns at start of every level at the player
        mobs.spawn(x, y, 3, 0.1, "transparent");
        let me = mob[mob.length - 1];
        me.stroke = "transparent"
        me.isShielded = true; //makes it immune to damage
        me.leaveBody = false;
        me.isBadTarget = true;
        me.isUnblockable = true;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.collisionFilter.category = 0;
        me.collisionFilter.mask = 0; //cat.player //| cat.body
        me.chaseSpeed = 3.3
        me.isDarkMatter = true;
        me.frictionAir = 0.006
        me.onDeath = function () {
            tech.isHarmDarkMatter = false;
        }
        me.do = function () {
            if (!simulation.isTimeSkipping) {
                const scale = ((tech.isMoveDarkMatter || tech.isNotDarkMatter) ? 1.6 : 1) * level.isReducedRegen
                const sine = Math.sin(simulation.cycle * 0.015)
                this.radius = 111 * tech.isDarkStar + 370 * (1 + 0.1 * sine)
                //chase player
                const sub = Vector.sub(player.position, this.position)
                const mag = Vector.magnitude(sub)
                // follow physics
                if (tech.isMoveDarkMatter && m.crouch && input.down) {
                    Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.97), Vector.mult(player.velocity, 0.03)))
                    Matter.Body.setPosition(this, Vector.add(Vector.mult(this.position, 0.95), Vector.mult(player.position, 0.05)))
                }

                const force = Vector.mult(Vector.normalise(sub), 0.000000003 * (this.distanceToPlayer() > 4000 ? 3 : 1))
                this.force.x += force.x
                this.force.y += force.y

                if (tech.isNotDarkMatter) {
                    if (mag < this.radius) { //buff to player when inside radius
                        tech.isHarmDarkMatter = false;
                    } else {
                        tech.isHarmDarkMatter = true;
                        //draw halo
                        ctx.strokeStyle = "rgba(80,120,200,0.2)" //"rgba(255,255,0,0.2)" //ctx.strokeStyle = `rgba(0,0,255,${0.5+0.5*Math.random()})`
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 36, 0, 2 * Math.PI);
                        ctx.lineWidth = 10;
                        ctx.stroke();
                        if (tech.isDarkEnergy) m.energy += 0.0017 * scale
                    }
                } else {
                    if (mag < this.radius) { //buff to player when inside radius
                        tech.isHarmDarkMatter = true;
                        //draw halo
                        ctx.strokeStyle = "rgba(80,120,200,0.2)" //"rgba(255,255,0,0.2)" //ctx.strokeStyle = `rgba(0,0,255,${0.5+0.5*Math.random()})`
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 36, 0, 2 * Math.PI);
                        ctx.lineWidth = 10;
                        ctx.stroke();
                        if (tech.isDarkEnergy) m.energy += 0.0017 * scale
                    } else {
                        tech.isHarmDarkMatter = false;
                    }
                }

                //draw outline
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius + 15, 0, 2 * Math.PI);
                ctx.strokeStyle = "#000"
                ctx.lineWidth = 1;
                ctx.stroke();
                if (tech.isDarkStar && !m.isCloak) { //&& !m.isTimeDilated
                    ctx.fillStyle = "rgba(10,0,40,0.4)"
                    ctx.fill()
                    //damage mobs
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && !mob[i].isShielded) {
                            if (Vector.magnitude(Vector.sub(this.position, mob[i].position)) - mob[i].radius < this.radius) {
                                const dmg = 0.03 * m.dmgScale * scale
                                mob[i].damage(dmg);
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: mob[i].position.x,
                                    y: mob[i].position.y,
                                    radius: mob[i].radius + 8,
                                    color: `rgba(10,0,40,0.1)`,
                                    time: 4
                                });
                            }
                        }
                    }
                }
                //draw growing and fading out ring around the arc
                ctx.beginPath();
                const rate = 150
                const r = simulation.cycle % rate
                ctx.arc(this.position.x, this.position.y, 15 + this.radius + 0.3 * r, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(0,0,0,${0.5 * Math.max(0, 1 - 1.4 * r / rate)})`
                ctx.stroke();
            }
        }
    },
    WIMP(x = level.exit.x + tech.wimpCount * 200 * (Math.random() - 0.5), y = level.exit.y + tech.wimpCount * 200 * (Math.random() - 0.5)) { //immortal mob that follows player //if you have the tech it spawns at start of every level at the exit
        mobs.spawn(x, y, 3, 0.1, "transparent");
        let me = mob[mob.length - 1];
        me.stroke = "transparent"
        me.isShielded = true; //makes it immune to damage
        me.leaveBody = false;
        me.isBadTarget = true;
        me.isUnblockable = true;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.collisionFilter.category = 0;
        me.collisionFilter.mask = 0; //cat.player //| cat.body
        me.chaseSpeed = 1.2 + 2.3 * Math.random()

        me.awake = function () {
            //chase player
            const sub = Vector.sub(player.position, this.position)
            const where = Vector.add(this.position, Vector.mult(Vector.normalise(sub), this.chaseSpeed))

            Matter.Body.setPosition(this, { //hold position
                x: where.x,
                y: where.y
            });
            Matter.Body.setVelocity(this, { x: 0, y: 0 });

            //aoe damage to player
            if (m.immuneCycle < m.cycle && Vector.magnitude(Vector.sub(player.position, this.position)) < this.radius) {
                const DRAIN = tech.isRadioactiveResistance ? 0.05 * 0.2 : 0.05
                if (m.energy > DRAIN) {
                    if (m.immuneCycle < m.cycle) m.energy -= DRAIN
                } else {
                    m.energy = 0;
                    m.damage((tech.isRadioactiveResistance ? 0.005 * 0.2 : 0.005) * simulation.dmgScale)
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: this.radius,
                        color: simulation.mobDmgColor,
                        time: simulation.drawTime
                    });
                }
            }
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(25,139,170,${0.2 + 0.12 * Math.random()})`;
            ctx.fill();
            this.radius = 100 * (1 + 0.25 * Math.sin(simulation.cycle * 0.03))
        }
        me.do = function () { //wake up after the player moves
            if (player.speed > 1 && !m.isCloak) {
                if (this.distanceToPlayer() < 500) {
                    const unit = Vector.rotate({ x: 1, y: 0 }, Math.random() * 6.28)
                    Matter.Body.setPosition(this, Vector.add(player.position, Vector.mult(unit, 2000)))
                }
                setTimeout(() => {
                    this.do = this.awake;
                }, 1000 * Math.random());
            }
            this.checkStatus();
        };
    },
    finalBoss(x, y, radius = 300) {
        mobs.spawn(x, y, 6, radius, "rgb(150,150,255)");
        let me = mob[mob.length - 1];
        setTimeout(() => { //fix mob in place, but allow rotation
            me.constraint = Constraint.create({
                pointA: { x: me.position.x, y: me.position.y },
                bodyB: me,
                stiffness: 1,
                damping: 1
            });
            Composite.add(engine.world, me.constraint);
        }, 1000); //add in a delay in case the level gets flipped left right
        me.isBoss = true;
        me.isFinalBoss = true;
        me.frictionAir = 0.01;
        me.memory = Infinity;
        me.locatePlayer();
        me.hasRunDeathScript = false
        me.cycle = 1;

        Matter.Body.setDensity(me, 0.2); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.14
        me.startingDamageReduction = me.damageReduction
        me.nextHealthThreshold = 0.999
        me.invulnerableCount = 0
        me.isInvulnerable = false
        me.totalModes = 0
        me.lastDamageCycle = 0
        me.onDamage = function () {
            this.lastDamageCycle = this.cycle
            if (this.health < this.nextHealthThreshold) {
                if (this.health === 1) me.cycle = 1; //reset fight
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.invulnerableCount = 220 + 10 * simulation.difficultyMode //how long does invulnerable time last
                this.isInvulnerable = true
                this.damageReduction = 0
            }
        };
        me.invulnerable = function () {
            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    this.pushAway();
                    this.mode[this.totalModes].enter() //enter new mode
                    this.totalModes++
                    //spawn 6 mobs
                    me.mobType = spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)]; //fire a bullet from each vertex
                    for (let i = 0; i < 6; i++) me.spawnMobs(i)

                    level.newLevelOrPhase() //run some new level tech effects
                }
                ctx.beginPath(); //draw invulnerable
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 15 + 6 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
                ctx.fillStyle = `rgba(255,255,255,${Math.min(1, 120 / (this.invulnerableCount + 60))})`;
                ctx.fill()
            }
        }
        me.damageReductionDecay = function () { //slowly make the boss take more damage over time  //damageReduction resets with each invulnerability phase
            if (!(me.cycle % 60) && this.lastDamageCycle + 240 > this.cycle) this.damageReduction *= 1.04 //only decay once a second   //only decay if the player has done damage in the last 4 seconds
        }
        me.mobType = spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)]
        me.spawnMobs = function (index = 0) {
            const vertex = me.vertices[index]
            const unit = Vector.normalise(Vector.sub(me.position, vertex))
            const where = Vector.add(vertex, Vector.mult(unit, -30))
            spawn[me.mobType](where.x + 50 * (Math.random() - 0.5), where.y + 50 * (Math.random() - 0.5));
            const velocity = Vector.mult(Vector.perp(unit), -10) //give the mob a rotational velocity as if they were attached to a vertex
            Matter.Body.setVelocity(mob[mob.length - 1], { x: me.velocity.x + velocity.x, y: me.velocity.y + velocity.y });
        }
        me.maxMobs = 400
        me.mode = [{
            name: "boulders",
            spawnRate: Math.max(30, 170 - 5 * simulation.difficultyMode),
            do() {
                if (!(me.cycle % this.spawnRate) && mob.length < me.maxMobs) {
                    me.boulder(me.position.x, me.position.y + 250)
                }
            },
            enter() { },
            exit() { },
        },
        {
            name: "mobs",
            // whoSpawn: spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)],
            spawnRate: Math.max(60, 240 - 20 * simulation.difficultyMode),
            do() {
                if (!(me.cycle % this.spawnRate) && mob.length < me.maxMobs) {
                    me.torque += 0.000015 * me.inertia; //spin
                    const index = Math.floor((me.cycle % (this.spawnRate * 6)) / this.spawnRate) //int from 0 to 5
                    if (index === 0) me.mobType = spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)]; //fire a bullet from each vertex
                    me.spawnMobs(index)
                    // const vertex = me.vertices[index]
                    // const unit = Vector.normalise(Vector.sub(me.position, vertex))
                    // const where = Vector.add(vertex, Vector.mult(unit, -30))
                    // spawn[me.mobType](where.x + 50 * (Math.random() - 0.5), where.y + 50 * (Math.random() - 0.5));
                    // const velocity = Vector.mult(Vector.perp(unit), -18) //give the mob a rotational velocity as if they were attached to a vertex
                    // Matter.Body.setVelocity(mob[mob.length - 1], { x: me.velocity.x + velocity.x, y: me.velocity.y + velocity.y });
                }
            },
            enter() { },
            exit() { },
        },
        {
            name: "hoppers",
            spawnRate: Math.max(90, 480 - 16 * simulation.difficultyMode),
            do() {
                if (!(me.cycle % this.spawnRate) && mob.length < me.maxMobs) {
                    me.torque += 0.00002 * me.inertia; //spin
                    for (let i = 0; i < 6; i++) {
                        const vertex = me.vertices[i]
                        spawn.hopBullet(vertex.x + 50 * (Math.random() - 0.5), vertex.y + 50 * (Math.random() - 0.5), 13 + Math.ceil(Math.random() * 8)); //hopBullet(x, y, radius = 10 + Math.ceil(Math.random() * 8))
                        Matter.Body.setDensity(mob[mob.length - 1], 0.002); //normal is 0.001
                        const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(me.position, vertex))), -18) //give the mob a rotational velocity as if they were attached to a vertex
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: me.velocity.x + velocity.x,
                            y: me.velocity.y + velocity.y
                        });
                    }
                    let where = { x: 600 - Math.random() * 100, y: -225 }
                    if (simulation.isHorizontalFlipped) where.x = -600 + Math.random() * 100
                    spawn.hopBullet(where.x, where.y, 13 + Math.ceil(Math.random() * 8)); //hopBullet(x, y, radius = 10 + Math.ceil(Math.random() * 8))
                    Matter.Body.setDensity(mob[mob.length - 1], 0.002); //normal is 0.001
                }
            },
            enter() { },
            exit() { },
        },
        {
            name: "seekers",
            spawnRate: Math.max(15, 100 - 3 * simulation.difficultyMode),
            do() {
                if (!(me.cycle % this.spawnRate) && mob.length < me.maxMobs) { //spawn seeker
                    const index = Math.floor((me.cycle % 360) / 60)
                    spawn.seeker(me.vertices[index].x, me.vertices[index].y, 18 * (0.5 + Math.random())); //seeker(x, y, radius = 8, sides = 6)
                    const who = mob[mob.length - 1]
                    Matter.Body.setDensity(who, 0.00003); //normal is 0.001
                    who.timeLeft = 720 + 30 * simulation.difficulty //* (0.8 + 0.4 * Math.random());
                    who.accelMag = 0.0004 * simulation.accelScale; //* (0.8 + 0.4 * Math.random())
                    who.frictionAir = 0.01 //* (0.8 + 0.4 * Math.random());
                }
            },
            enter() { },
            exit() { },
        },
        {
            name: "mines",
            bombCycle: 0,
            bombInterval: Math.max(2, 10 - simulation.difficultyMode),
            do() {
                const yOff = 120
                this.bombCycle++
                if (!(this.bombCycle % this.bombInterval) && (this.bombCycle % 660) > 330) { //mines above player
                    if (simulation.isHorizontalFlipped) {
                        const x = m.pos.x + 200 * (Math.random() - 0.5)
                        if (x > -750) { //mines above player IN tunnel
                            spawn.mine(Math.min(Math.max(-730, x), 100), -450 - yOff * Math.random()) //player in main room
                            mob[mob.length - 1].fallHeight = -209
                        } else { //mines above player NOT in tunnel
                            spawn.mine(Math.min(Math.max(-5375, x), -765), -1500 - yOff * Math.random()) //player in tunnel
                            mob[mob.length - 1].fallHeight = -9
                        }
                        if (Math.random() < 0.5) {
                            spawn.mine(-5350 + 4550 * Math.random(), -1500 - yOff * Math.random()) //random mines
                            mob[mob.length - 1].fallHeight = -9
                        }
                    } else {
                        const x = m.pos.x + 200 * (Math.random() - 0.5)
                        if (x < 750) { //mines above player IN tunnel
                            spawn.mine(Math.min(Math.max(-100, x), 735), -450 - yOff * Math.random()) //player in main room
                            mob[mob.length - 1].fallHeight = -209
                        } else { //mines above player NOT in tunnel
                            spawn.mine(Math.min(Math.max(760, x), 5375), -1500 - yOff * Math.random()) //player in tunnel
                            mob[mob.length - 1].fallHeight = -9
                        }
                        if (Math.random() < 0.5) { //random mines, but not in tunnel
                            spawn.mine(800 + 4550 * Math.random(), -1500 - yOff * Math.random()) //random mines
                            mob[mob.length - 1].fallHeight = -9
                        }
                    }
                }
                for (let i = 0; i < mob.length; i++) { //mines fall
                    if (mob[i].isMine) {
                        if (mob[i].position.y < mob[i].fallHeight) {
                            mob[i].force.y += mob[i].mass * 0.03;
                        } else if (!mob[i].isOnGround) {
                            mob[i].isOnGround = true
                            Matter.Body.setPosition(mob[i], {
                                x: mob[i].position.x,
                                y: mob[i].fallHeight
                            })
                        }
                    }
                }
            },
            enter() {
                this.bombCycle = 0;
            },
            exit() {
                for (let i = 0; i < mob.length; i++) {
                    if (mob[i].isMine) mob[i].isExploding = true //explode the mines at the start of new round
                }
            },
        },
        {
            name: "orbiters",
            spawnRate: Math.ceil(Math.max(2, 5 - 0.2 * simulation.difficultyMode)),
            orbitersCycle: 0,
            do() {
                this.orbitersCycle++
                if (!(this.orbitersCycle % this.spawnRate) && (this.orbitersCycle % 660) > 600 && mob.length < me.maxMobs) {
                    const speed = (0.01 + 0.0005 * simulation.difficultyMode) * ((Math.random() < 0.5) ? 0.85 : -1.15)
                    const phase = 0 //Math.floor(2 * Math.random()) * Math.PI
                    //find distance to play and set orbs at that range
                    const dist = me.distanceToPlayer()
                    //360 + 2150 * Math.random()
                    me.orbitalNoVelocity(me, dist + 900 * (Math.random() - 0.5), 0.1 * Math.random() + phase, speed) // orbital(who, radius, phase, speed)
                }
            },
            enter() { },
            exit() { },
        },
        {
            name: "laser",
            spinForce: 0.00000008, // * (Math.random() < 0.5 ? -1 : 1),
            fadeCycle: 0, //fades in over 4 seconds
            do() {
                this.fadeCycle++
                if (this.fadeCycle > 0) {
                    me.torque += this.spinForce * me.inertia; //spin  //0.00000015
                    if (this.fadeCycle > 360) this.fadeCycle = -200 + simulation.difficultyMode * simulation.difficultyMode //turn laser off and reset
                    ctx.strokeStyle = "#50f";
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    if (this.fadeCycle < 120) { //damage scales up over 2 seconds to give player time to move as it fades in
                        const scale = this.fadeCycle / 120
                        const dmg = this.fadeCycle < 60 ? 0 : 0.1 * simulation.dmgScale * scale
                        me.lasers(me.vertices[0], me.angle + Math.PI / 6, dmg);
                        me.lasers(me.vertices[1], me.angle + 3 * Math.PI / 6, dmg);
                        me.lasers(me.vertices[2], me.angle + 5 * Math.PI / 6, dmg);
                        me.lasers(me.vertices[3], me.angle + 7 * Math.PI / 6, dmg);
                        me.lasers(me.vertices[4], me.angle + 9 * Math.PI / 6, dmg);
                        me.lasers(me.vertices[5], me.angle + 11 * Math.PI / 6, dmg);
                        ctx.strokeStyle = `rgba(85, 0, 255,${scale})`;
                        ctx.stroke();
                        ctx.strokeStyle = `rgba(80, 0, 255,${0.07 * scale})`
                    } else if (this.fadeCycle > 0) {
                        me.lasers(me.vertices[0], me.angle + Math.PI / 6);
                        me.lasers(me.vertices[1], me.angle + 3 * Math.PI / 6);
                        me.lasers(me.vertices[2], me.angle + 5 * Math.PI / 6);
                        me.lasers(me.vertices[3], me.angle + 7 * Math.PI / 6);
                        me.lasers(me.vertices[4], me.angle + 9 * Math.PI / 6);
                        me.lasers(me.vertices[5], me.angle + 11 * Math.PI / 6);
                        ctx.strokeStyle = "#50f";
                        ctx.stroke();
                        ctx.strokeStyle = "rgba(80,0,255,0.07)";
                    }
                    ctx.setLineDash([]);
                    ctx.lineWidth = 20;
                    ctx.stroke();
                }
            },
            enter() { this.fadeCycle = 0 },
            exit() { },
        },
        {
            name: "black hole",
            eventHorizon: 0,
            eventHorizonRadius: 1700,
            eventHorizonCycle: 0,
            do() {
                this.eventHorizonCycle++
                this.eventHorizon = Math.max(0, this.eventHorizonRadius * Math.sin(this.eventHorizonCycle * 0.007)) //eventHorizon waves in and out
                //draw darkness
                ctx.beginPath();
                ctx.arc(me.position.x, me.position.y, this.eventHorizon * 0.2, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.3)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(me.position.x, me.position.y, this.eventHorizon * 0.4, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.25)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(me.position.x, me.position.y, this.eventHorizon * 0.6, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.2)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(me.position.x, me.position.y, this.eventHorizon * 0.8, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.15)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(me.position.x, me.position.y, this.eventHorizon, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fill();
                //when player is inside event horizon
                if (Vector.magnitude(Vector.sub(me.position, player.position)) < this.eventHorizon) {
                    if (m.immuneCycle < m.cycle) {
                        if (m.energy > 0) m.energy -= 0.018
                        if (m.energy < 0.05 && m.immuneCycle < m.cycle) m.damage(0.0003 * simulation.dmgScale);
                    }
                    const angle = Math.atan2(player.position.y - me.position.y, player.position.x - me.position.x);
                    player.force.x -= 0.0017 * Math.cos(angle) * player.mass * (m.onGround ? 1.7 : 1);
                    player.force.y -= 0.0017 * Math.sin(angle) * player.mass;
                    //draw line to player
                    ctx.beginPath();
                    ctx.moveTo(me.position.x, me.position.y);
                    ctx.lineTo(m.pos.x, m.pos.y);
                    ctx.lineWidth = Math.min(60, me.radius * 2);
                    ctx.strokeStyle = "rgba(0,0,0,0.5)";
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(0,0,0,0.3)";
                    ctx.fill();
                }
                me.curl(this.eventHorizon);
            },
            enter() { this.eventHorizonCycle = 0 },
            exit() { },
        },
        {
            name: "oscillation",
            waveCycle: 0,
            whereX: simulation.isHorizontalFlipped ? -3000 : 3000,
            do() {
                this.waveCycle += !me.isStunned + !me.isSlowed
                // if (!me.isShielded && (!(this.waveCycle % 1800) || !(this.waveCycle % 1801))) spawn.shield(me, me.position.x, me.position.y, 1);
                me.constraint.pointA = {
                    x: this.whereX + 600 * Math.sin(this.waveCycle * 0.005),
                    y: me.constraint.pointA.y
                }
            },
            enter() {
                spawn.shield(me, me.position.x, me.position.y, 1);
            },
            exit() { this.waveCycle = 0 },
        },
        {
            name: "slow zone",
            waveCycle: 0,
            whereX: simulation.isHorizontalFlipped ? -3000 : 3000,
            width: 1200,
            // isActive: false,
            cycle: 0,
            cycleDuration: 150,
            zone: 0,
            isMovingRight: true,
            playerSlowTime: 0,
            do() {
                // console.log(zone)
                this.cycle++
                if (this.cycle % this.cycleDuration === 0) { //next zone
                    this.zone += this.isMovingRight ? 1 : -1
                    if (this.zone > 0) this.isMovingRight = false
                    if (this.zone < -1) this.isMovingRight = true
                    this.whereX = (simulation.isHorizontalFlipped ? -3000 : 3000) + this.width * this.zone
                }
                //draw slow zone
                if (this.cycle % this.cycleDuration > 0.45 * this.cycleDuration) {
                    ctx.fillStyle = `rgba(0, 100, 255, ${0.19 + 0.015 * Math.sin(simulation.cycle * 0.36)})`;
                    ctx.fillRect(this.whereX, -1500, this.width, 1500);
                    //check for player in range and apply slow debuff
                    if (player.position.x > this.whereX && player.position.x < this.whereX + this.width) {
                        this.playerSlowTime = 180
                        //damage player
                        const dmg = 0.0001 * simulation.dmgScale
                        m.damage(dmg);
                    }
                } else { //show where slow zone is about to show up
                    ctx.fillStyle = `rgba(0, 100, 255, ${0.2 + 0.25 * Math.random()})`;
                    ctx.fillRect(this.whereX, -1500, this.width, 12);
                    ctx.fillRect(this.whereX, -12, this.width, 12);
                }
                if (this.playerSlowTime > 0) {
                    this.playerSlowTime-- //warm up player when outside of slow zone
                    //slow player
                    // Matter.Body.setVelocity(player, Vector.mult(player.velocity, (1 - 0.01 * this.playerSlowTime)));
                    // Matter.Body.setVelocity(player, { x: (1 - 0.01 * this.playerSlowTime) * player.velocity.x, y: (1 - 0.0025 * this.playerSlowTime) * player.velocity.y }); //makes the player get stuck slow when walking horizontally
                    Matter.Body.setVelocity(player, { x: Math.max(0.05, 1 - 0.01 * Math.max(10, this.playerSlowTime)) * player.velocity.x, y: Math.max(0.2, 1 - 0.0025 * this.playerSlowTime) * player.velocity.y });
                    //draw effect on player
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, 45, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(0,100,255,${(0.003 * Math.max(10, this.playerSlowTime))})`;
                    ctx.fill();
                }
            },
            enter() {
            },
            exit() { },
        },
        {
            name: "antigravity",
            cycle: 0,
            startCycle: 420,
            totalCycles: 600,
            rectX: simulation.isHorizontalFlipped ? -5400 : -150, //for positioning graphics
            do() {
                this.cycle++
                if (this.cycle > this.totalCycles) this.cycle = 0
                if (this.cycle === this.startCycle) {
                    //initial push up
                    for (let i = 0, len = body.length; i < len; ++i) {
                        body[i].force.y -= 0.05 * body[i].mass
                    }
                    for (let i = 0, len = powerUp.length; i < len; ++i) {
                        powerUp[i].force.y -= 0.07 * powerUp[i].mass
                    }
                    for (let i = 0, len = bullet.length; i < len; ++i) {
                        bullet[i].force.y -= 0.05 * bullet[i].mass
                    }
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        mob[i].force.y -= 0.15 * mob[i].mass
                    }
                    player.force.y -= 0.04 * player.mass
                } else if (this.cycle > this.startCycle) { //antigravity
                    for (let i = 0, len = body.length; i < len; ++i) { //push blocks away horizontally
                        body[i].force.y -= simulation.g * body[i].mass
                        Matter.Body.setVelocity(body[i], Vector.mult(body[i].velocity, 0.98)); //friction
                    }
                    for (let i = 0, len = powerUp.length; i < len; ++i) {
                        powerUp[i].force.y -= simulation.g * powerUp[i].mass
                    }
                    // for (let i = 0, len = bullet.length; i < len; ++i) {
                    //     bullet[i].force.y -= simulation.g * bullet[i].mass
                    //     Matter.Body.setVelocity(bullet[i], Vector.mult(bullet[i].velocity, 0.98)); //friction
                    // }
                    // for (let i = 0, len = mob.length; i < len; ++i) {
                    //     mob[i].force.y -= 0.7 * simulation.g * mob[i].mass
                    // }
                    player.force.y -= simulation.g * player.mass //g = 0.0024
                    Matter.Body.setVelocity(player, Vector.mult(player.velocity, 0.985)); //friction
                    //graphics
                    ctx.fillStyle = `rgba(0, 0, 0, ${0.03 + 0.03 * Math.random()})`;
                    ctx.fillRect(this.rectX, -1500, 5650, 1500); //cover everything
                } else if (this.cycle > this.startCycle - 60) {
                    //graphical warning of antigravity
                    ctx.fillStyle = `rgba(0, 0, 0, ${0.2 + 0.25 * Math.random()})`;
                    ctx.fillRect(this.rectX, -25, 5650, 25); //cover floor
                }
            },
            enter() { spawn.shield(me, me.position.x, me.position.y, 1); },
            exit() { this.cycle = 0 },
        },
            // {
            //     name: "__",
            //     do() { },
            //     enter() { },
            //     exit() { },
            // },
        ]
        me.mode.sort(() => Math.random() - 0.5);
        me.do = function () {
            this.fill = `hsl(${360 * Math.sin(this.cycle * 0.011)},${80 + 20 * Math.sin(this.cycle * 0.004)}%,${60 + 20 * Math.sin(this.cycle * 0.009)}%)`
            if (this.health < 1) {
                this.cycle++;
                this.checkStatus();
                this.invulnerable();
                this.spawnBoss();
                this.damageReductionDecay();
                for (let i = 0; i < this.totalModes; i++) this.mode[i].do()
            }
            // this.mode[10].do() //comment out this
            // console.log(this.mode[9].name)
            // this.cycle++;
            // this.mode[4].do()
            // this.mode[7].do()
        };
        me.spawnRate = 5800 - 30 * simulation.difficultyMode * simulation.difficultyMode
        me.spawnBoss = function () { //if the fight lasts too long start spawning bosses
            if (!(me.cycle % this.spawnRate) && this.health < 1) {
                this.spawnRate = Math.max(300, this.spawnRate - 10 * simulation.difficultyMode * simulation.difficultyMode) //reduce the timer each time a boss spawns
                spawn.randomLevelBoss(3000 * (simulation.isHorizontalFlipped ? -1 : 1) + 2000 * (Math.random() - 0.5), -1100 + 200 * (Math.random() - 0.5))
            }
        }
        me.pushAway = function (magX = 0.13, magY = 0.05) {
            for (let i = 0, len = body.length; i < len; ++i) { //push blocks away horizontally
                body[i].force.x += magX * body[i].mass * (body[i].position.x > this.position.x ? 1 : -1)
                body[i].force.y -= magY * body[i].mass
            }
            for (let i = 0, len = bullet.length; i < len; ++i) { //push blocks away horizontally
                bullet[i].force.x += magX * bullet[i].mass * (bullet[i].position.x > this.position.x ? 1 : -1)
                bullet[i].force.y -= magY * bullet[i].mass
            }
            for (let i = 0, len = powerUp.length; i < len; ++i) { //push blocks away horizontally
                powerUp[i].force.x += magX * powerUp[i].mass * (powerUp[i].position.x > this.position.x ? 1 : -1)
                powerUp[i].force.y -= magY * powerUp[i].mass
            }
            player.force.x += magX * player.mass * (player.position.x > this.position.x ? 1 : -1)
            player.force.y -= magY * player.mass
        }
        me.boulder = function (x, y) {
            mobs.spawn(x, y, 6, Math.floor(50 + 50 * Math.random()), this.fill);
            let boss = this
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.onHit = function () {
                this.timeLeft = 0
            };
            me.explodeRange = 500
            me.onDeath = function () { //explode
                simulation.drawList.push({ //draw explosion
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.explodeRange,
                    color: this.fill,
                    time: 8
                });
                let sub, knock
                sub = Vector.sub(player.position, this.position);
                if (Vector.magnitude(sub) < this.explodeRange) { //player knock back
                    m.damage(0.05);
                    knock = Vector.mult(Vector.normalise(sub), player.mass * 0.1);
                    player.force.x += knock.x;
                    player.force.y += knock.y;
                }
                for (let i = 0, len = powerUp.length; i < len; ++i) { //power up knock backs
                    sub = Vector.sub(powerUp[i].position, this.position);
                    if (Vector.magnitude(sub) < this.explodeRange) {
                        knock = Vector.mult(Vector.normalise(sub), powerUp[i].mass * 0.1);
                        powerUp[i].force.x += knock.x;
                        powerUp[i].force.y += knock.y;
                    }
                }
                for (let i = 0, len = body.length; i < len; ++i) { //block knock backs
                    sub = Vector.sub(body[i].position, this.position);
                    if (Vector.magnitude(sub) < this.explodeRange) {
                        knock = Vector.mult(Vector.normalise(sub), body[i].mass * 0.1);
                        body[i].force.x += knock.x;
                        body[i].force.y += knock.y;
                    }
                }
            }
            Matter.Body.setDensity(me, 0.003); //normal is 0.001
            me.timeLeft = 300;
            me.g = 0.0005; //required if using this.gravity 
            me.frictionAir = 0.005;
            me.friction = 1;
            me.frictionStatic = 1
            me.restitution = 0;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
            me.spin = me.inertia * 0.000005 * (1 + Math.random()) * (m.pos.x > me.position.x ? 1 : -1)
            Matter.Body.setAngularVelocity(me, 0.1 * (1 + 0.3 * Math.random()) * (m.pos.x > me.position.x ? 1 : -1));
            Matter.Body.setVelocity(me, { x: 0, y: 10 });
            me.do = function () {
                this.fill = boss.fill
                this.torque += this.spin;
                this.gravity();
                this.timeLimit();
                if (this.timeLeft < 60) {
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.explodeRange, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(255,255,255,0.15)`;
                    ctx.fill();
                }
            };
        }
        me.orbitalNoVelocity = function (who, radius, phase, speed) { //orbitals that don't include their host velocity  //specifically for finalBoss
            let boss = this
            mobs.spawn(who.position.x, who.position.y, 6, 20, "rgb(255,0,150)");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            Matter.Body.setDensity(me, 0.001); //normal is 0.001
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.isBadTarget = true;
            me.isUnstable = true; //dies when blocked
            me.showHealthBar = false;
            me.isOrbital = true;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.bullet; //cat.player | cat.map | cat.body
            me.do = function () {
                this.fill = boss.fill
                const time = simulation.cycle * speed + phase
                const orbit = { x: Math.cos(time), y: Math.sin(time) }
                Matter.Body.setPosition(this, Vector.add(who.position, Vector.mult(orbit, radius)))
                if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                    const dmg = 0.13 * simulation.dmgScale
                    m.damage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: Math.sqrt(dmg) * 200,
                        color: simulation.mobDmgColor,
                        time: simulation.drawTime
                    });
                    this.death();
                }
            };
        }
        me.lasers = function (where, angle, dmg = 0.1 * simulation.dmgScale) {
            const seeRange = 7000;
            best = {
                x: null,
                y: null,
                dist2: Infinity,
                who: null,
                v1: null,
                v2: null
            };
            const look = {
                x: where.x + seeRange * Math.cos(angle),
                y: where.y + seeRange * Math.sin(angle)
            };
            best = vertexCollision(where, look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);
            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                if (m.immuneCycle < m.cycle + 60 + m.collisionImmuneCycles) m.immuneCycle = m.cycle + 60 + m.collisionImmuneCycles; //player is immune to damage extra time
                m.damage(dmg);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: dmg * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            //draw beam
            if (best.dist2 === Infinity) best = look;
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
        }
        me.onDeath = function () {
            if (!this.hasRunDeathScript) {
                this.hasRunDeathScript = true
                //record win on this difficulty level to show up in the difficulty settings as a
                if (!simulation.isCheating) {
                    localSettings.difficultyCompleted[simulation.difficultyMode] = true
                    localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
                }

                //make a block body to replace this one
                //this body is too big to leave behind in the normal way mobs.replace()
                const len = body.length;
                const v = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //might help with vertex collision issue, not sure
                body[len] = Matter.Bodies.fromVertices(this.position.x, this.position.y, v);
                Matter.Body.setVelocity(body[len], { x: 0, y: -3 });
                Matter.Body.setAngularVelocity(body[len], this.angularVelocity);
                body[len].collisionFilter.category = cat.body;
                body[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet;
                body[len].classType = "body";
                Composite.add(engine.world, body[len]); //add to world
                const expand = function (that, massLimit) {
                    const scale = 1.05;
                    Matter.Body.scale(that, scale, scale);
                    if (that.mass < massLimit) setTimeout(expand, 20, that, massLimit);
                };
                expand(body[len], 200)

                function unlockExit() {
                    if (simulation.isHorizontalFlipped) {
                        level.exit.x = -5500 - 100;
                    } else {
                        level.exit.x = 5500;
                    }
                    level.exit.y = -330;
                    Matter.Composite.remove(engine.world, map[map.length - 1]);
                    map.splice(map.length - 1, 1);
                    simulation.draw.setPaths(); //redraw map draw path
                    // level.levels.push("null")
                }

                //add lore level as next level if player took lore tech earlier in the game
                if (lore.techCount > (lore.techGoal - 1) && !simulation.isCheating) {
                    simulation.inGameConsole(`<span class="lore-text">undefined</span> <span class='color-symbol'>=</span> ${lore.techCount}/${lore.techGoal}`, 360);
                    setTimeout(function () {
                        simulation.inGameConsole(`level.levels.push("<span class='lore-text'>null</span>")`, 720);
                        unlockExit()
                        level.levels.push("null")
                    }, 4000);
                    //remove block map element so exit is clear
                } else { //reset game
                    let count = 0

                    function loop() {
                        if (!simulation.paused && !simulation.onTitlePage) {
                            count++
                            if (count < 660) {
                                if (count === 1 && simulation.difficultyMode < 6) simulation.inGameConsole(`<em>//enter testing mode to set level.levels.length to <strong>Infinite</strong></em>`);
                                if (!(count % 60)) simulation.inGameConsole(`simulation.analysis <span class='color-symbol'>=</span> ${((count / 60 - Math.random()) * 0.1).toFixed(3)}`);
                            } else if (count === 660) {
                                simulation.inGameConsole(`simulation.analysis <span class='color-symbol'>=</span> 1 <em>//analysis complete</em>`);
                            } else if (count === 780) {
                                simulation.inGameConsole(`<span class="lore-text">undefined</span> <span class='color-symbol'>=</span> ${lore.techCount}/${lore.techGoal}`)
                            } else if (count === 1020) {
                                simulation.inGameConsole(`Engine.clear(engine) <em>//simulation successful</em>`);
                            } else if (count === 1260) {
                                // tech.isImmortal = false;
                                // m.death()
                                // m.alive = false;
                                // simulation.paused = true;
                                // m.health = 0;
                                // m.displayHealth();
                                document.getElementById("health").style.display = "none"
                                document.getElementById("health-bg").style.display = "none"
                                document.getElementById("defense-bar").style.display = "none"
                                document.getElementById("damage-bar").style.display = "none"
                                document.getElementById("text-log").style.display = "none"
                                document.getElementById("fade-out").style.opacity = 1; //slowly fades out
                                // build.shareURL(false)
                                setTimeout(function () {
                                    if (!simulation.onTitlePage) {
                                        m.alive = false
                                        simulation.paused = true;
                                        // simulation.clearMap();
                                        // Matter.Composite.clear(composite, keepStatic, [deep = false])
                                        // Composite.clear(engine.composite);
                                        engine.world.bodies.forEach((body) => { Matter.Composite.remove(engine.world, body) })
                                        Engine.clear(engine);
                                        simulation.splashReturn();
                                    }
                                }, 6000);
                                return
                            }
                        }
                        if (simulation.testing || simulation.difficultyMode > 6) {
                            unlockExit()
                            setTimeout(function () {
                                simulation.inGameConsole(`level.levels.length <span class='color-symbol'>=</span> <strong>Infinite</strong>`);
                            }, 1500);
                        } else {
                            if (!simulation.onTitlePage) requestAnimationFrame(loop);
                        }
                    }
                    requestAnimationFrame(loop);
                }
                //remove power Ups,  to avoid spamming console
                function removeAll(array) {
                    for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
                }
                removeAll(powerUp);
                powerUp = [];

                //pull in particles
                for (let i = 0, len = body.length; i < len; ++i) {
                    const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, body[i].position)), 65)
                    const pushUp = Vector.add(velocity, { x: 0, y: -0.5 })
                    Matter.Body.setVelocity(body[i], Vector.add(body[i].velocity, pushUp));
                }
                //damage all mobs
                for (let j = 0; j < 8; j++) { //in case some mobs leave things after they die
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i] !== this) {
                            if (mob[i].isInvulnerable) { //disable invulnerability
                                mob[i].isInvulnerable = false
                                mob[i].damageReduction = 1
                            }
                            mob[i].damage(Infinity, true);
                        }
                    }
                }

                //draw stuff
                for (let i = 0, len = 22; i < len; i++) {
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: (i + 1) * 150,
                        color: `rgba(255,255,255,0.17)`,
                        time: 5 * (len - i + 1)
                    });
                }
            }
        };
    },
    zombie(x, y, radius, sides, color) { //mob that attacks other mobs
        mobs.spawn(x, y, sides, radius, color);
        let me = mob[mob.length - 1];
        me.damageReduction = 0 //take NO damage, but also slowly lose health
        Matter.Body.setDensity(me, 0.0001) // normal density is 0.001 // this reduces life by half and decreases knockback
        me.isZombie = true
        me.isBadTarget = true;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.stroke = "#83a"
        me.accelMag = 0.003
        me.frictionAir = 0.005
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.mob
        me.seeAtDistance2 = 1000000 //1000 vision range
        // me.onDeath = function() {
        //     const amount = Math.min(10, Math.ceil(this.mass * 0.5))
        //     if (tech.isSporeFlea) {
        //         const len = amount / 2
        //         for (let i = 0; i < len; i++) {
        //             const speed = 10 + 5 * Math.random()
        //             const angle = 2 * Math.PI * Math.random()
        //             b.flea(this.position, { x: speed * Math.cos(angle), y: speed * Math.sin(angle) })
        //         }
        //     } else if (tech.isSporeWorm) {
        //         const len = amount / 2
        //         for (let i = 0; i < len; i++) b.worm(this.position)
        //     } else {
        //         for (let i = 0; i < amount; i++) b.spore(this.position)
        //     }
        // }
        me.do = function () {
            this.checkStatus();
            this.zombieHealthBar();
            this.lookForMobTargets();
            this.attack();
        };
        me.mobSearchIndex = 0;
        me.target = null
        me.lookForMobTargets = function () {
            if (this.target === null && mob.length > 1 && !(simulation.cycle % this.seePlayerFreq)) { //find mob targets
                let closeDist = Infinity;
                for (let i = 0, len = mob.length; i < len; ++i) {
                    if (
                        !mob[i].isZombie &&
                        !mob[i].isUnblockable &&
                        !mob[i].isMobBullet &&
                        Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                        Matter.Query.ray(body, this.position, mob[i].position).length === 0
                        // !mob[i].isBadTarget &&
                        // !mob[i].isInvulnerable &&
                        // (Vector.magnitudeSquared(Vector.sub(this.position, mob[this.mobSearchIndex].position)) < this.seeAtDistance2)
                    ) {
                        const DIST = Vector.magnitude(Vector.sub(this.position, mob[i].position));
                        if (DIST < closeDist) {
                            closeDist = DIST;
                            this.target = mob[i]
                        }
                    }
                }
            } else if (
                !(simulation.cycle % this.memory) &&
                this.target &&
                (!this.target.alive || Matter.Query.ray(map, this.position, this.target.position).length !== 0)
            ) {
                this.target = null //chance to forget target
            }
        }
        me.zombieHealthBar = function () {
            this.health -= 0.0003 //decay
            if ((this.health < 0.01 || isNaN(this.health)) && this.alive) this.death();
            const h = this.radius * 0.3;
            const w = this.radius * 2;
            const x = this.position.x - w / 2;
            const y = this.position.y - w * 0.7;
            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = "rgba(136, 51, 170,0.7)";
            ctx.fillRect(x, y, w * this.health, h);
        }
        me.hitCD = 0
        me.attack = function () { //hit non zombie mobs
            if (this.hitCD < simulation.cycle && !this.isStunned && !this.isSlowed) {
                if (this.target) {
                    this.force = Vector.mult(Vector.normalise(Vector.sub(this.target.position, this.position)), this.accelMag * this.mass)
                } else { //wonder around
                    this.torque += 0.0000003 * this.inertia;
                    const mag = 0.0003 * this.mass
                    this.force.x += mag * Math.cos(this.angle)
                    this.force.y += mag * Math.sin(this.angle)
                }
                if (this.speed > 15) { // speed cap instead of friction to give more agility
                    Matter.Body.setVelocity(this, { x: this.velocity.x * 0.96, y: this.velocity.y * 0.96 });
                } else if (this.speed < 10) {
                    Matter.Body.setVelocity(this, { x: this.velocity.x * 0.98, y: this.velocity.y * 0.98 });
                } else if (this.speed < 8) {
                    Matter.Body.setVelocity(this, { x: this.velocity.x * 0.99, y: this.velocity.y * 0.99 });
                }
                const hit = (who) => {
                    if (!who.isZombie && who.damageReduction) {
                        this.hitCD = simulation.cycle + 15
                        //knock back  away from recently hit mob
                        const force = Vector.mult(Vector.normalise(Vector.sub(who.position, this.position)), 0.03 * this.mass)
                        this.force.x -= force.x;
                        this.force.y -= force.y;
                        this.target = null //look for a new target

                        // who.damage(dmg);
                        //by pass normal damage method
                        const dmg = 1.5 * who.damageReduction / Math.sqrt(who.mass)
                        who.health -= dmg
                        who.onDamage(dmg); //custom damage effects
                        who.locatePlayer();
                        if ((who.health < 0.01 || isNaN(who.health)) && who.alive) who.death();

                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: Math.log(dmg + 1.1) * 40 * who.damageReduction + 3,
                            color: simulation.playerDmgColor,
                            time: simulation.drawTime
                        });
                    }
                }
                const collide = Matter.Query.collides(this, mob) //damage mob targets if nearby
                if (collide.length > 1) { //don't count self collide
                    for (let i = 0, len = collide.length; i < len; i++) {
                        hit(collide[i].bodyA)
                        hit(collide[i].bodyB)
                    }
                }
            }
        }
    },
    starter(x, y, radius = Math.floor(15 + 20 * Math.random())) { //easy mob for on level 1
        mobs.spawn(x, y, 8, radius, "#9ccdc6");
        let me = mob[mob.length - 1];
        // console.log(`mass=${me.mass}, radius = ${radius}`)
        me.accelMag = 0.0002
        me.repulsionRange = 400000 + radius * radius; //squared
        // me.memory = 120;
        me.seeAtDistance2 = 2000000 //1400 vision range
        Matter.Body.setDensity(me, 0.0005) // normal density is 0.001 // this reduces life by half and decreases knockback
        me.do = function () {
            this.seePlayerByLookingAt();
            this.attraction();
            this.repulsion();
            this.checkStatus();
        };
    },
    blockGroup(x, y, num = 3 + Math.random() * 8) {
        for (let i = 0; i < num; i++) {
            const radius = 25 + Math.floor(Math.random() * 20)
            spawn.blockGroupMob(x + Math.random() * radius, y + Math.random() * radius, radius);
        }
    },
    blockGroupMob(x, y, radius = 25 + Math.floor(Math.random() * 20)) {
        mobs.spawn(x, y, 4, radius, "#999");
        let me = mob[mob.length - 1];
        me.g = 0.00015; //required if using this.gravity
        me.accelMag = 0.0008 * simulation.accelScale;
        me.groupingRangeMax = 250000 + Math.random() * 100000;
        me.groupingRangeMin = (radius * 8) * (radius * 8);
        me.groupingStrength = 0.0005
        me.memory = 200;
        me.isGrouper = true;
        me.seeAtDistance2 = 600 * 600
        me.seePlayerFreq = Math.floor(50 + 50 * Math.random())
        me.do = function () {
            this.gravity();
            this.checkStatus();
            this.seePlayerCheck();
            if (this.seePlayer.recall) {
                this.attraction();
                //tether to other blocks
                ctx.beginPath();
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].isGrouper && mob[i] != this && mob[i].isDropPowerUp) { //don't tether to self, bullets, shields, ...
                        const distance2 = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position))
                        if (distance2 < this.groupingRangeMax) {
                            if (!mob[i].seePlayer.recall) mob[i].seePlayerCheck(); //wake up sleepy mobs
                            if (distance2 > this.groupingRangeMin) {
                                const angle = Math.atan2(mob[i].position.y - this.position.y, mob[i].position.x - this.position.x);
                                const forceMag = this.groupingStrength * mob[i].mass;
                                mob[i].force.x -= forceMag * Math.cos(angle);
                                mob[i].force.y -= forceMag * Math.sin(angle);
                            }
                            ctx.moveTo(this.position.x, this.position.y);
                            ctx.lineTo(mob[i].position.x, mob[i].position.y);
                        }
                    }
                }
                ctx.strokeStyle = "#0ff";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    },
    blockBoss(x, y, radius = 60) {
        const activeBeams = []; // used to draw beams when converting
        const beamTotalDuration = 60
        mobs.spawn(x, y, 4, radius, "#999"); //#54291d
        const me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.002); //normal density even though its a boss
        me.damageReduction = 0.04
        me.frictionAir = 0.01;
        me.accelMag = 0.0002;
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y);
            for (const who of mob) {
                if (who.isNecroMob) { //blockMobs leave their body, and die
                    who.leaveBody = true
                    who.damage(Infinity)
                }
            }
        }
        me.target = player; // the target to lock on. Usually a block, but will be the player under certain conditions
        me.do = function () {
            this.checkStatus();
            this.seePlayerCheck();
            if (this.target) { //(this.target === player && this.seePlayer.yes) || this.target !== player
                const force = Vector.mult(Vector.normalise(Vector.sub(this.target.position, this.position)), this.accelMag * this.mass)
                this.force.x += force.x;
                this.force.y += force.y;
            }

            if (!(simulation.cycle % 30)) {
                //find blocks to turn into mobs
                for (let i = 0; i < body.length; i++) {
                    if (Vector.magnitude(Vector.sub(this.position, body[i].position)) < 700 && !body[i].isNotHoldable) { // check distance for each block
                        Matter.Composite.remove(engine.world, body[i]);
                        this.target = null //player;
                        spawn.blockMob(body[i].position.x, body[i].position.y, body[i], 0);
                        body.splice(i, 1);
                        activeBeams.push([beamTotalDuration, mob[mob.length - 1]]);
                    }
                }

                // generally, the boss will tend to stay in the player's area but focus on blocks.
                if (this.distanceToPlayer() > 1500 && this.target === null) {
                    this.target = player; // too far, attract to the player
                } else {
                    if (body.length) { // look for a new target by finding the closest block 
                        let min = Infinity;
                        let closestBlock = null;
                        for (const block of body) {
                            const dist = Vector.magnitudeSquared(Vector.sub(this.position, block.position))
                            if (dist < min && Matter.Query.ray(map, this.position, block.position).length === 0) {
                                min = dist;
                                closestBlock = block;
                            }
                        }
                        this.target = closestBlock;
                    }
                }

                //randomly spawn new mobs from nothing
                if (!(simulation.cycle % 90)) {
                    let count = 0
                    for (let i = 0, len = mob.length; i < len; i++) {
                        if (mob[i].isNecroMob) count++
                    }
                    if (count < 20 * Math.random() * Math.random()) { //limit number of spawns if there are already too many blockMobs
                        const unit = Vector.normalise(Vector.sub(player.position, this.position))
                        for (let i = 0, len = 3 * Math.random(); i < len; i++) {
                            this.damageReduction += 0.001; //0.05 is starting value
                            const scale = 0.99; //if 120 use 1.02
                            Matter.Body.scale(this, scale, scale);
                            this.radius *= scale;

                            const where = Vector.add(Vector.mult(unit, radius + 200 * Math.random()), this.position)
                            spawn.blockMob(where.x + 100 * (Math.random() - 0.5), where.y + 100 * (Math.random() - 0.5), null);
                            this.torque += 0.000035 * this.inertia; //spin after spawning
                            activeBeams.push([beamTotalDuration, mob[mob.length - 1]]);
                        }
                    }
                }

            }
            for (let i = 0; i < activeBeams.length; i++) { // draw beams on new mobs
                const [duration, newBlockMob] = activeBeams[i];
                if (duration === 0) {
                    activeBeams.splice(i, 1);
                    continue;
                }
                if (newBlockMob.alive) {
                    const vertexIndex = Math.floor((newBlockMob.vertices.length - 1) * duration / beamTotalDuration)
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(newBlockMob.vertices[vertexIndex].x, newBlockMob.vertices[vertexIndex].y);

                    //outline mob
                    ctx.moveTo(newBlockMob.vertices[0].x, newBlockMob.vertices[0].y);
                    for (let j = 1; j < newBlockMob.vertices.length; j++) {
                        ctx.lineTo(newBlockMob.vertices[j].x, newBlockMob.vertices[j].y);
                    }
                    ctx.lineTo(newBlockMob.vertices[0].x, newBlockMob.vertices[0].y);

                    ctx.strokeStyle = "#0ff";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
                activeBeams[i][0]--; // shorten duration
            }
        }
    },
    blockMob(x, y, host, growCycles = 60) {
        if (host === null) {
            mobs.spawn(x, y, 4, 1.25 + 3.5 * Math.random(), "#999");
        } else {
            const sideLength = Vector.magnitude(Vector.sub(host.vertices[0], host.vertices[1])) + Vector.magnitude(Vector.sub(host.vertices[1], host.vertices[2])) / 2 //average of first 2 sides
            mobs.spawn(x, y, 4, Math.min(70, sideLength), "#999");
            if (host.bounds.max.x - host.bounds.min.x < 150 && host.bounds.max.y - host.bounds.min.y < 150) {
                Matter.Body.setVertices(mob[mob.length - 1], host.vertices) //if not too big match vertices of host exactly
                // mob[mob.length - 1].radius =
            }
        }
        const me = mob[mob.length - 1];
        me.damageReduction = 0.5; //only until done growing
        me.isNecroMob = true
        me.g = 0.00012; //required if using this.gravity
        me.accelMag = 0.0003 * Math.sqrt(simulation.accelScale);
        me.memory = 120;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        // me.showHealthBar = false;
        me.cycle = 0
        me.do = function () { //grow phase only occurs for growCycles
            this.checkStatus();
            this.seePlayerCheck();
            this.cycle++
            if (this.cycle > growCycles) {
                this.damageReduction = 1.8 //take extra damage
                this.do = this.normalDo
            } else {
                const scale = 1.04; //if 120 use 1.02
                Matter.Body.scale(this, scale, scale);
                this.radius *= scale;
            }
        }
        me.normalDo = function () {
            this.gravity();
            this.checkStatus();
            this.seePlayerCheck();
            this.attraction();
        }
    },
    cellBossCulture(x, y, radius = 20, num = 5) {
        const cellID = Math.random()
        for (let i = 0; i < num; i++) {
            spawn.cellBoss(x, y, radius, cellID)
        }
    },
    cellBoss(x, y, radius = 20, cellID) {
        mobs.spawn(x + Math.random(), y + Math.random(), 20, radius * (1 + 1.2 * Math.random()), "rgba(0,80,125,0.3)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent"
        me.isBoss = true;
        me.isCell = true;
        me.cellID = cellID
        me.accelMag = 0.000165 * simulation.accelScale;
        me.memory = Infinity;
        me.leaveBody = false;
        me.isVerticesChange = true
        me.frictionAir = 0.012
        me.seePlayerFreq = Math.floor(11 + 7 * Math.random())
        me.seeAtDistance2 = 1400000;
        me.cellMassMax = 70
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body// | cat.map
        Matter.Body.setDensity(me, 0.00012 + 0.000008 * simulation.difficulty) // normal density is 0.001
        me.damageReduction = 0.17

        const k = 642 //k=r^2/m
        me.split = function () {
            const scale = 0.45
            Matter.Body.scale(this, scale, scale);
            this.radius *= scale;
            spawn.cellBoss(this.position.x, this.position.y, this.radius, this.cellID);
            mob[mob.length - 1].health = this.health
        }
        me.onHit = function () { //run this function on hitting player
            this.health = 1;
            this.split();
        };
        me.onDamage = function (dmg) {
            if (Math.random() < 0.34 * dmg * Math.sqrt(this.mass) && this.health > dmg) this.split();
        }
        me.do = function () {
            this.seePlayerByDistOrLOS();
            this.checkStatus();
            this.attraction();

            if (this.seePlayer.recall && this.mass < this.cellMassMax) { //grow cell radius
                const scale = 1 + 0.0002 * this.cellMassMax / this.mass;
                Matter.Body.scale(this, scale, scale);
                this.radius *= scale;
            }
            if (!(simulation.cycle % this.seePlayerFreq)) { //move away from other mobs
                const repelRange = 150
                const attractRange = 700
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].isCell && mob[i].id !== this.id) {
                        const sub = Vector.sub(this.position, mob[i].position)
                        const dist = Vector.magnitude(sub)
                        if (dist < repelRange) {
                            this.force = Vector.mult(Vector.normalise(sub), this.mass * 0.002)
                        } else if (dist > attractRange) {
                            this.force = Vector.mult(Vector.normalise(sub), -this.mass * 0.003)
                        }
                    }
                }
            }
        };
        me.onDeath = function () {
            this.isCell = false;
            let count = 0 //count other cells by id
            // console.log(this.cellID)
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].isCell && mob[i].cellID === this.cellID) count++
            }
            if (count < 1) { //only drop a power up if this is the last cell
                powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            } else {
                this.isDropPowerUp = false;
            }
        }
    },
    spawnerBossCulture(x, y, radius = 50, num = 8 + Math.min(20, simulation.difficulty * 0.4)) {
        tech.deathSpawnsFromBoss += 0.4
        const spawnID = Math.random()
        for (let i = 0; i < num; i++) spawn.spawnerBoss(x, y, radius, spawnID)
    },
    spawnerBoss(x, y, radius, spawnID) {
        mobs.spawn(x + Math.random(), y + Math.random(), 4, radius, "rgba(255,0,70,1)") //);
        let me = mob[mob.length - 1];
        me.isBoss = true;

        me.isSpawnBoss = true;
        me.spawnID = spawnID
        me.accelMag = 0.00022 * simulation.accelScale;
        me.memory = Infinity;
        me.showHealthBar = false;
        me.isVerticesChange = true
        me.frictionAir = 0.011
        me.seePlayerFreq = Math.floor(14 + 7 * Math.random())
        me.seeAtDistance2 = 200000 //1400000;
        me.stroke = "transparent"
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body | cat.map //"rgba(255,60,0,0.3)"
        // Matter.Body.setDensity(me, 0.0014) // normal density is 0.001
        Matter.Body.setAngularVelocity(me, 0.12 * (Math.random() - 0.5))
        // spawn.shield(me, x, y, 1);

        me.onHit = function () { //run this function on hitting player
            this.explode(2 * this.mass);
        };
        me.damageReduction = 0.14
        me.doAwake = function () {
            //draw aura 
            ctx.beginPath();
            const vertices = this.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.strokeStyle = `rgba(255,0,70,${0.2 + 0.4 * Math.random()})`
            ctx.lineWidth = Math.floor(5 + 30 * this.health)
            ctx.stroke();
            // ctx.strokeStyle = "rgba(255,60,0,0.1)"
            // ctx.lineWidth = 70
            // ctx.stroke();
            // this.fill = `rgba(255,0,70,${0.1 + 0.1 * Math.random()})`

            this.alwaysSeePlayer();
            this.checkStatus();
            this.attraction();

            if (!(simulation.cycle % this.seePlayerFreq)) { //move away from other mobs
                const repelRange = 40
                const attractRange = 240
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].isSpawnBoss && mob[i].id !== this.id) {
                        const sub = Vector.sub(this.position, mob[i].position)
                        const dist = Vector.magnitude(sub)
                        if (dist < repelRange) {
                            this.force = Vector.mult(Vector.normalise(sub), this.mass * 0.002)
                        } else if (dist > attractRange) {
                            this.force = Vector.mult(Vector.normalise(sub), -this.mass * 0.002)
                        }
                    }
                }
            }
        }
        me.do = function () {
            this.checkStatus();
            if (this.seePlayer.recall) {
                this.do = this.doAwake
                this.fill = `transparent`
                //awaken other spawnBosses
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].isSpawnBoss && mob[i].spawnID === this.spawnID) mob[i].seePlayer.recall = 1
                }
            }
        };
        me.onDeath = function () {
            this.isSpawnBoss = false;
            let count = 0 //count other cells by id
            // console.log(this.spawnID)
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].isSpawnBoss && mob[i].spawnID === this.spawnID) count++
            }
            if (count < 1) { //only drop a power up if this is the last cell
                powerUps.spawnBossPowerUp(this.position.x, this.position.y)
                tech.deathSpawnsFromBoss -= 0.4
            } else {
                this.leaveBody = false;
                this.isDropPowerUp = false;
            }

            const spawns = tech.deathSpawns + tech.deathSpawnsFromBoss
            const len = Math.min(12, spawns * Math.ceil(Math.random() * simulation.difficulty * spawns))
            for (let i = 0; i < len; i++) {
                spawn.spawns(this.position.x + (Math.random() - 0.5) * radius * 2.5, this.position.y + (Math.random() - 0.5) * radius * 2.5);
                Matter.Body.setVelocity(mob[mob.length - 1], {
                    x: this.velocity.x + (Math.random() - 0.5) * 10,
                    y: this.velocity.x + (Math.random() - 0.5) * 10
                });
            }

        }
    },
    growBossCulture(x, y, radius = 17, nodes = 12 + Math.min(10, simulation.difficulty * 0.25)) {
        const buffID = Math.random()
        const sideLength = 200 + 50 * Math.sqrt(nodes) // distance between each node mob
        for (let i = 0; i < nodes; ++i) {
            const angle = 2 * Math.PI * Math.random()
            const mag = Math.max(radius, sideLength * (1 - Math.pow(Math.random(), 1.5))) //working on a distribution that is circular, random, but not too focused in the center
            spawn.growBoss(x + mag * Math.cos(angle), y + mag * Math.sin(angle), radius, buffID);
        }
        spawn.constrain2AdjacentMobs(nodes, 0.0001, false); //loop mobs together
    },
    growBoss(x, y, radius, buffID) {
        mobs.spawn(x + Math.random(), y + Math.random(), 6, radius, "hsl(144, 15%, 50%)") //);
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.isBuffBoss = true;
        me.buffID = buffID
        me.memory = Infinity;
        me.isVerticesChange = true
        me.frictionAir = 0.012
        me.seePlayerFreq = Math.floor(11 + 7 * Math.random())
        me.seeAtDistance2 = 200000 //1400000;
        me.stroke = "transparent"
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body //| cat.map   //"rgba(255,60,0,0.3)"

        me.buffCount = 0
        me.accelMag = 0.00005 //* simulation.accelScale;
        me.setBuffed = function () {
            this.buffCount++
            this.accelMag += 0.000024 //* Math.sqrt(simulation.accelScale)  
            this.fill = `hsl(144, ${5 + 10 * this.buffCount}%, 50%)`
            const scale = 1.135;
            Matter.Body.scale(this, scale, scale);
            this.radius *= scale;

            // this.isInvulnerable = true
            // if (this.damageReduction) this.startingDamageReduction = this.damageReduction
            // this.damageReduction = 0
            // this.invulnerabilityCountDown = simulation.difficulty
        }
        me.onDeath = function () {
            this.isBuffBoss = false;
            let count = 0 //count other cells by id
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].isBuffBoss && mob[i].buffID === this.buffID) {
                    count++
                    mob[i].setBuffed()
                }
            }
            if (count < 1) { //only drop a power up if this is the last cell
                powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            } else {
                this.leaveBody = false;
                this.isDropPowerUp = false;
                powerUps.spawnRandomPowerUp(this.position.x, this.position.y) // manual power up spawn to avoid spawning too many tech with "symbiosis"
            }
        }
        me.damageReduction = 0.2
        //required setup for invulnerable
        // me.isInvulnerable = false
        me.invulnerabilityCountDown = 0
        me.do = function () {
            // if (this.isInvulnerable) {
            //     if (this.invulnerabilityCountDown > 0) {
            //         this.invulnerabilityCountDown--
            //         ctx.beginPath();
            //         let vertices = this.vertices;
            //         ctx.moveTo(vertices[0].x, vertices[0].y);
            //         for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
            //         ctx.lineTo(vertices[0].x, vertices[0].y);
            //         ctx.lineWidth = 20;
            //         ctx.strokeStyle = "rgba(255,255,255,0.7)";
            //         ctx.stroke();
            //     } else {
            //         this.isInvulnerable = false
            //         this.damageReduction = this.startingDamageReduction
            //     }
            // }
            this.alwaysSeePlayer();
            this.checkStatus();
            this.attraction();
            // if (!(simulation.cycle % this.seePlayerFreq)) { //move away from other mobs
            //     const repelRange = 100 + 4 * this.radius
            //     const attractRange = 240
            //     for (let i = 0, len = mob.length; i < len; i++) {
            //         if (mob[i].isBuffBoss && mob[i].id !== this.id) {
            //             const sub = Vector.sub(this.position, mob[i].position)
            //             const dist = Vector.magnitude(sub)
            //             if (dist < repelRange) {
            //                 this.force = Vector.mult(Vector.normalise(sub), this.mass * 0.002)
            //             } else if (dist > attractRange) {
            //                 this.force = Vector.mult(Vector.normalise(sub), -this.mass * 0.002)
            //             }
            //         }
            //     }
            // }
        }
    },
    powerUpBossBaby(x, y, vertices = 9, radius = 60) {
        mobs.spawn(x, y, vertices, radius, "rgba(225,240,245,0.4)"); //"rgba(120,140,150,0.4)"
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.frictionAir = 0.006
        me.seeAtDistance2 = 1000000;
        me.accelMag = 0.0004 + 0.0003 * simulation.accelScale;
        // Matter.Body.setDensity(me, 0.001); //normal is 0.001
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map
        me.memory = Infinity;
        me.seePlayerFreq = 17
        me.lockedOn = null;
        if (vertices === 9) {
            //on primary spawn
            powerUps.spawnBossPowerUp(me.position.x, me.position.y)
            powerUps.spawn(me.position.x, me.position.y, "heal");
            powerUps.spawn(me.position.x, me.position.y, "ammo");
            powerUps.spawn(me.position.x, me.position.y, "ammo");
        } else if (!m.isCloak) {
            me.foundPlayer();
        }
        me.damageReduction = 0.21
        me.isInvulnerable = true
        me.startingDamageReduction = me.damageReduction
        me.damageReduction = 0
        me.invulnerabilityCountDown = 30 + simulation.difficulty
        me.onHit = function () { //run this function on hitting player
            if (powerUps.ejectTech()) {
                powerUps.ejectGraphic("150, 138, 255");
                // powerUps.spawn(m.pos.x + 60 * (Math.random() - 0.5), m.pos.y + 60 * (Math.random() - 0.5), "ammo");
                // powerUps.spawn(m.pos.x + 60 * (Math.random() - 0.5), m.pos.y + 60 * (Math.random() - 0.5), "research");
                this.accelMag *= 1.4
                Matter.Body.setDensity(this, this.density * 1.4); //normal is 0.001
            }
        };
        me.onDeath = function () {
            this.leaveBody = false;
            if (vertices > 3) {
                this.isDropPowerUp = false;
                spawn.powerUpBossBaby(this.position.x, this.position.y, vertices - 1)
                Matter.Body.setVelocity(mob[mob.length - 1], { x: this.velocity.x, y: this.velocity.y })
            }
            for (let i = 0; i < powerUp.length; i++) powerUp[i].collisionFilter.mask = cat.map | cat.powerUp
        };
        me.do = function () {
            if (this.isInvulnerable) {
                if (this.invulnerabilityCountDown > 0) {
                    this.invulnerabilityCountDown--
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                } else {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
            }
            // this.stroke = `hsl(0,0%,${80 + 25 * Math.sin(simulation.cycle * 0.01)}%)`
            // this.fill = `hsla(0,0%,${80 + 25 * Math.sin(simulation.cycle * 0.01)}%,0.3)`

            //steal all power ups
            if (this.alive) {
                for (let i = 0; i < Math.min(powerUp.length, this.vertices.length); i++) {
                    powerUp[i].collisionFilter.mask = 0
                    Matter.Body.setPosition(powerUp[i], this.vertices[i])
                    Matter.Body.setVelocity(powerUp[i], { x: 0, y: 0 })
                }
            }
            this.seePlayerByHistory(50);
            this.attraction();
            this.checkStatus();
        };
    },
    powerUpBoss(x, y, vertices = 9, radius = 130) {
        mobs.spawn(x, y, vertices, radius, "transparent");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.frictionAir = 0.01
        me.seeAtDistance2 = 1000000;
        me.accelMag = 0.0002 + 0.0004 * simulation.accelScale;
        Matter.Body.setDensity(me, 0.0003); //normal is 0.001
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body
        me.memory = Infinity;
        me.seePlayerFreq = 30
        me.lockedOn = null;
        if (vertices === 9) {
            //on primary spawn
            powerUps.spawnBossPowerUp(me.position.x, me.position.y)
            powerUps.spawn(me.position.x, me.position.y, "heal");
            powerUps.spawn(me.position.x, me.position.y, "ammo");
            powerUps.spawn(me.position.x, me.position.y, "ammo");
            powerUps.spawn(me.position.x, me.position.y, "ammo");
        } else if (!m.isCloak) {
            me.foundPlayer();
        }

        me.damageReduction = 0.23
        me.isInvulnerable = true
        me.startingDamageReduction = me.damageReduction
        me.damageReduction = 0
        me.invulnerabilityCountDown = 30 + simulation.difficulty

        me.onHit = function () { //run this function on hitting player
            if (powerUps.ejectTech()) {
                powerUps.ejectGraphic("150, 138, 255");
                // powerUps.spawn(m.pos.x + 60 * (Math.random() - 0.5), m.pos.y + 60 * (Math.random() - 0.5), "ammo");
                // powerUps.spawn(m.pos.x + 60 * (Math.random() - 0.5), m.pos.y + 60 * (Math.random() - 0.5), "research");
                this.accelMag *= 1.4
                Matter.Body.setDensity(this, this.density * 1.4); //normal is 0.001
            }
        };
        me.onDeath = function () {
            this.leaveBody = false;
            if (vertices > 3) {
                this.isDropPowerUp = false;
                spawn.powerUpBoss(this.position.x, this.position.y, vertices - 1)
                Matter.Body.setVelocity(mob[mob.length - 1], { x: this.velocity.x, y: this.velocity.y })
            }
            for (let i = 0; i < powerUp.length; i++) powerUp[i].collisionFilter.mask = cat.map | cat.powerUp
            for (let i = 0; i < 40; i++) this.colors();
        };
        me.colors = function () {
            const unit = Vector.rotate({ x: 1, y: 0 }, Math.random() * 6.28)
            const where = Vector.add(this.position, Vector.mult(unit, 700 - 500 * Math.random() * Math.random()))
            const colors = ["#0ae", "#f55", "#f7b", "#0eb", "#467", "hsl(246,100%,77%)", "#0cf", "#26a"]
            simulation.drawList.push({ //add dmg to draw queue
                x: where.x,
                y: where.y,
                radius: 5 + 10 * Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)], //#0cf
                time: 17//4 + Math.floor(15 * Math.random())
            });
        }
        me.do = function () {
            this.stroke = `hsl(0,0%,${80 + 25 * Math.sin(simulation.cycle * 0.01)}%)`
            if (this.isInvulnerable) {
                if (this.invulnerabilityCountDown > 0) {
                    this.invulnerabilityCountDown--
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                } else {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
            }
            if (this.alive) {
                for (let i = 0; i < Math.min(powerUp.length, this.vertices.length); i++) {
                    powerUp[i].collisionFilter.mask = 0
                    Matter.Body.setPosition(powerUp[i], this.vertices[i])
                    Matter.Body.setVelocity(powerUp[i], { x: 0, y: 0 })
                }
            }

            this.seePlayerCheckByDistance();
            this.attraction();
            this.checkStatus();

            //aura around boss so it can bee seen more easily even when inside walls
            if (!(simulation.cycle % 5)) this.colors();
        };
    },

    // chaser(x, y, radius = 35 + Math.ceil(Math.random() * 40)) {
    //     mobs.spawn(x, y, 8, radius, "rgb(255,150,100)"); //"#2c9790"
    //     let me = mob[mob.length - 1];
    //     // Matter.Body.setDensity(me, 0.0007); //extra dense //normal is 0.001 //makes effective life much lower
    //     me.friction = 0.1;
    //     me.frictionAir = 0;
    //     me.accelMag = 0.001 * Math.sqrt(simulation.accelScale);
    //     me.g = me.accelMag * 0.6; //required if using this.gravity
    //     me.memory = 180;
    //     spawn.shield(me, x, y);
    //     me.do = function() {
    //         this.gravity();
    //         this.seePlayerByHistory(15);
    //         this.checkStatus();
    //         this.attraction();
    //     };
    // },
    grower(x, y, radius = 15) {
        mobs.spawn(x, y, 7, radius, "hsl(144, 15%, 50%)");
        let me = mob[mob.length - 1];
        me.isVerticesChange = true
        me.big = false; //required for grow
        me.accelMag = 0.00045 * simulation.accelScale;
        me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.player //can't touch other mobs
        // me.onDeath = function () { //helps collisions functions work better after vertex have been changed
        //   this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
        // }
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();
            this.grow();
        };
    },
    springer(x, y, radius = 20 + Math.ceil(Math.random() * 35)) {
        mobs.spawn(x, y, 10, radius, "#b386e8");
        let me = mob[mob.length - 1];
        me.friction = 0;
        me.frictionAir = 0.006;
        me.lookTorque = 0.0000008; //controls spin while looking for player
        me.g = 0.0002; //required if using this.gravity
        me.seePlayerFreq = Math.floor((40 + 25 * Math.random()));
        const springStiffness = 0.00014;
        const springDampening = 0.0005;

        me.springTarget = { x: me.position.x, y: me.position.y };
        const len = cons.length;
        cons[len] = Constraint.create({
            pointA: me.springTarget,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening
        });
        Composite.add(engine.world, cons[cons.length - 1]);

        cons[len].length = 100 + 1.5 * radius;
        me.cons = cons[len];

        me.springTarget2 = { x: me.position.x, y: me.position.y };
        const len2 = cons.length;
        cons[len2] = Constraint.create({
            pointA: me.springTarget2,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[len2].length = 100 + 1.5 * radius;
        me.cons2 = cons[len2];
        me.do = function () {
            this.gravity();
            this.searchSpring();
            this.checkStatus();
            this.springAttack();
        };
        me.onDeath = function () {
            this.removeCons();
        };
        spawn.shield(me, x, y);
    },
    hopper(x, y, radius = 35 + Math.ceil(Math.random() * 30)) {
        mobs.spawn(x, y, 5, radius, "rgb(0,200,180)");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.0015); //normal is 0.001
        me.accelMag = 0.05;
        me.g = 0.0032; //required if using this.gravity
        me.frictionAir = 0.01;
        me.friction = 1
        me.frictionStatic = 1
        me.restitution = 0;
        me.delay = 120 * simulation.CDScale;
        me.randomHopFrequency = 200 + Math.floor(Math.random() * 150);
        me.randomHopCD = simulation.cycle + me.randomHopFrequency;
        Matter.Body.rotate(me, Math.random() * Math.PI);
        spawn.shield(me, x, y);
        me.do = function () {
            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            if (this.seePlayer.recall) {
                if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                    this.cd = simulation.cycle + this.delay;
                    const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass;
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                    this.force.x += forceMag * Math.cos(angle);
                    this.force.y += forceMag * Math.sin(angle) - (Math.random() * 0.06 + 0.1) * this.mass; //antigravity
                }
            } else {
                //randomly hob if not aware of player
                if (this.randomHopCD < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                    this.randomHopCD = simulation.cycle + this.randomHopFrequency;
                    //slowly change randomHopFrequency after each hop
                    this.randomHopFrequency = Math.max(100, this.randomHopFrequency + (0.5 - Math.random()) * 200);
                    const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass * (0.1 + Math.random() * 0.3);
                    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
                    this.force.x += forceMag * Math.cos(angle);
                    this.force.y += forceMag * Math.sin(angle) - 0.07 * this.mass; //antigravity
                }
            }
        };
    },
    hopMother(x, y, radius = 20 + Math.ceil(Math.random() * 20)) {
        mobs.spawn(x, y, 5, radius, "rgb(50,170,200)");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.0008); //normal is 0.001
        me.accelMag = 0.05;
        me.g = 0.0032; //required if using this.gravity
        me.frictionAir = 0.01;
        me.friction = 1
        me.frictionStatic = 1
        me.restitution = 0;
        me.delay = 120 + 110 * simulation.CDScale;
        me.randomHopFrequency = 300 + Math.floor(Math.random() * 150);
        me.randomHopCD = simulation.cycle + me.randomHopFrequency;
        Matter.Body.rotate(me, Math.random());
        spawn.shield(me, x, y);
        me.dropEgg = function () {
            if (mob.length < 360) {
                let where = { x: this.position.x, y: this.position.y + 0.3 * radius }
                for (let i = 0; i < 30; i++) { //find the ground
                    if (Matter.Query.point(map, where).length > 0 || Matter.Query.point(body, where).length > 0) break
                    where.y += 1
                }
                spawn.hopEgg(where.x, where.y - 10)
            }
        }
        me.do = function () {
            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            if (this.seePlayer.recall) {
                if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                    this.cd = simulation.cycle + this.delay;
                    const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass;
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                    this.force.x += forceMag * Math.cos(angle);
                    this.force.y += forceMag * Math.sin(angle) - (Math.random() * 0.06 + 0.1) * this.mass; //antigravity
                    this.dropEgg();
                }
            } else {
                //randomly hob if not aware of player
                if (this.randomHopCD < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                    this.randomHopCD = simulation.cycle + this.randomHopFrequency;
                    //slowly change randomHopFrequency after each hop
                    this.randomHopFrequency = Math.max(100, this.randomHopFrequency + (0.5 - Math.random()) * 200);
                    const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass * (0.1 + Math.random() * 0.3);
                    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
                    this.force.x += forceMag * Math.cos(angle);
                    this.force.y += forceMag * Math.sin(angle) - 0.07 * this.mass; //antigravity
                    if (Math.random() < 0.2) this.dropEgg();
                }
            }
        };
    },
    hopEgg(x, y) {
        mobs.spawn(x, y, 10, 9 + Math.floor(3 * Math.random()), "rgba(50, 150, 150,0.3)"); //"rgb(100,170,150)" //"rgb(61, 125, 121)"
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        Matter.Body.setDensity(me, 0.0001); //normal is 0.001
        // Matter.Body.setStatic(me, true); //make static  (disables taking damage)
        me.frictionAir = 1
        me.damageReduction = 2
        me.collisionFilter.mask = cat.bullet | cat.body
        // me.collisionFilter.category = cat.mobBullet;
        // me.collisionFilter.mask = cat.bullet | cat.body // | cat.player
        me.isMine = true
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.isUnstable = true; //dies when blocked
        me.showHealthBar = false;
        me.explodeRange = 210 + 140 * Math.random()
        me.isExploding = false
        me.countDown = Math.ceil(4 * Math.random())
        me.hatchTimer = 600 + Math.floor(120 * Math.random())
        me.isInvulnerable = true //not actually invulnerable, just prevents block + ice-9 interaction
        me.do = function () {
            this.checkStatus();
            this.hatchTimer--
            if (this.hatchTimer < 1) {
                spawn.hopBullet(this.position.x, this.position.y)
                this.death();
            }
            if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) this.isExploding = true
            if (this.isExploding) {
                if (this.countDown-- < 0) { //explode
                    this.death();
                    //hit player
                    if (Vector.magnitude(Vector.sub(this.position, player.position)) < this.explodeRange && m.immuneCycle < m.cycle) {
                        m.damage(0.01 * simulation.dmgScale * (tech.isRadioactiveResistance ? 0.2 : 1));
                        m.energy -= 0.1 * (tech.isRadioactiveResistance ? 0.2 : 1)
                        if (m.energy < 0) m.energy = 0
                    }
                    const range = this.explodeRange + 50 //mines get a slightly larger range to explode
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && Vector.magnitude(Vector.sub(this.position, mob[i].position)) < range && mob[i].isMine) {
                            mob[i].isExploding = true //explode other mines
                        }
                    }
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: this.explodeRange,
                        color: "rgba(50,180,180,0.45)",
                        time: 16
                    });
                }
            }
        };
    },
    hopBullet(x, y, radius = 10 + Math.ceil(Math.random() * 8)) {
        mobs.spawn(x, y, 5, radius, "rgb(0,200,180)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.leaveBody = false;
        me.isDropPowerUp = false;
        // me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.timeLeft = 1020 + Math.floor(480 * Math.random());

        me.isRandomMove = Math.random() < 0.3 //most chase player, some don't
        me.accelMag = 0.01; //jump height
        me.g = 0.0015; //required if using this.gravity
        me.frictionAir = 0.01;
        me.friction = 1
        me.frictionStatic = 1
        me.restitution = 0;
        me.delay = 120 + 60 * simulation.CDScale;
        // Matter.Body.rotate(me, Math.random() * Math.PI);
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
        me.onHit = function () {
            this.explode(0.5 * this.mass);
        };
        me.do = function () {
            this.gravity();
            this.checkStatus();
            if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                this.cd = simulation.cycle + this.delay;
                if (this.isRandomMove || Math.random() < 0.2) {
                    this.force.x += (0.01 + 0.03 * Math.random()) * this.mass * (Math.random() < 0.5 ? 1 : -1); //random move
                } else {
                    this.force.x += (0.01 + 0.03 * Math.random()) * this.mass * (player.position.x > this.position.x ? 1 : -1); //chase player
                }
                this.force.y -= (0.04 + 0.04 * Math.random()) * this.mass
            }
            this.timeLimit();
        };
    },
    hopMotherBoss(x, y, radius = 120) {
        mobs.spawn(x, y, 5, radius, "rgb(0,200,180)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.damageReduction = 0.12
        me.accelMag = 0.05; //jump height
        me.g = 0.003; //required if using this.gravity
        me.frictionAir = 0.01;
        me.friction = 1
        me.frictionStatic = 1
        me.restitution = 0;
        me.delay = 130 + 40 * simulation.CDScale;
        Matter.Body.rotate(me, Math.random() * Math.PI);
        spawn.shield(me, x, y, 1);
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // for (let i = 0, len = 3 + 0.1 * simulation.difficulty; i < len; ++i) spawn.hopBullet(this.position.x + 100 * (Math.random() - 0.5), this.position.y + 100 * (Math.random() - 0.5))
        };
        me.do = function () {
            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                this.cd = simulation.cycle + this.delay;
                //spawn hopBullets after each jump
                for (let i = 0, len = 1 + 0.05 * simulation.difficulty; i < len; ++i) spawn.hopBullet(this.position.x + 100 * (Math.random() - 0.5), this.position.y + 100 * (Math.random() - 0.5))

                this.force.x += (0.02 + 0.06 * Math.random()) * this.mass * (player.position.x > this.position.x ? 1 : -1);
                this.force.y -= (0.08 + 0.08 * Math.random()) * this.mass
            }
        };
    },
    // hopBoss(x, y, radius = 90) {
    //     mobs.spawn(x, y, 5, radius, "rgb(0,200,180)");
    //     let me = mob[mob.length - 1];
    //     me.isBoss = true;
    //     me.g = 0.005; //required if using this.gravity
    //     me.frictionAir = 0.01;
    //     me.friction = 1
    //     me.frictionStatic = 1
    //     me.restitution = 0;
    //     me.accelMag = 0.07;
    //     me.delay = 120 * simulation.CDScale;
    //     me.randomHopFrequency = 200
    //     me.randomHopCD = simulation.cycle + me.randomHopFrequency;
    //     // me.memory = 420;
    //     me.isInAir = false
    //     Matter.Body.setDensity(me, 0.03); //extra dense //normal is 0.001 //makes effective life much larger
    //     spawn.shield(me, x, y, 1);
    //     spawn.spawnOrbitals(me, radius + 60, 1)
    //     me.onDeath = function() {
    //         powerUps.spawnBossPowerUp(this.position.x, this.position.y)
    //     };
    //     me.lastSpeed = me.speed
    //     me.damageReduction = 0.25 
    //     me.do = function() {
    //         // this.armor();
    //         this.gravity();
    //         this.seePlayerCheck();
    //         this.checkStatus();
    //         if (this.seePlayer.recall) {
    //             const deltaSpeed = this.lastSpeed - this.speed
    //             this.lastSpeed = this.speed
    //             if (deltaSpeed > 13 && this.speed < 5) { //if the player slows down greatly in one cycle
    //                 //damage and push player away, push away blocks
    //                 const range = 800 //Math.min(800, 50 * deltaSpeed)
    //                 for (let i = body.length - 1; i > -1; i--) {
    //                     if (!body[i].isNotHoldable) {
    //                         sub = Vector.sub(body[i].position, this.position);
    //                         dist = Vector.magnitude(sub);
    //                         if (dist < range) {
    //                             knock = Vector.mult(Vector.normalise(sub), Math.min(20, 50 * body[i].mass / dist));
    //                             body[i].force.x += knock.x;
    //                             body[i].force.y += knock.y;
    //                         }
    //                     }
    //                 }
    //                 simulation.drawList.push({ //draw radius
    //                     x: this.position.x,
    //                     y: this.position.y,
    //                     radius: range,
    //                     color: "rgba(0,200,180,0.6)",
    //                     time: 4
    //                 });
    //             }
    //             if (this.isInAir) {
    //                 if (this.velocity.y > -0.01 && Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length) { //not moving up, and has hit the map or a body
    //                     this.isInAir = false //landing
    //                     this.cd = simulation.cycle + this.delay
    //                 }
    //             } else { //on ground
    //                 if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) { //jump
    //                     this.isInAir = true
    //                     const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass;
    //                     const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
    //                     this.force.x += forceMag * Math.cos(angle);
    //                     this.force.y += forceMag * Math.sin(angle) - (Math.random() * 0.05 + 0.04) * this.mass; //antigravity 
    //                 }
    //             }
    //             // if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
    //             //     this.cd = simulation.cycle + this.delay;
    //             //     const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass;
    //             //     const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
    //             //     this.force.x += forceMag * Math.cos(angle);
    //             //     this.force.y += forceMag * Math.sin(angle) - (Math.random() * 0.05 + 0.04) * this.mass; //antigravity
    //             // }
    //         } else {
    //             //randomly hob if not aware of player
    //             if (this.randomHopCD < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
    //                 this.randomHopCD = simulation.cycle + this.randomHopFrequency;
    //                 //slowly change randomHopFrequency after each hop
    //                 this.randomHopFrequency = Math.max(100, this.randomHopFrequency + 200 * (0.5 - Math.random()));
    //                 const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass * (0.5 + Math.random() * 0.2);
    //                 const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
    //                 this.force.x += forceMag * Math.cos(angle);
    //                 this.force.y += forceMag * Math.sin(angle) - (0.1 + 0.08 * Math.random()) * this.mass; //antigravity
    //             }
    //         }
    //     };
    // },
    spinner(x, y, radius = 30 + Math.ceil(Math.random() * 35)) {
        mobs.spawn(x, y, 5, radius, "#000000");
        let me = mob[mob.length - 1];
        me.fill = "#28b";
        me.rememberFill = me.fill;
        me.cd = 0;
        me.burstDir = { x: 0, y: 0 };
        me.frictionAir = 0.022;
        me.lookTorque = 0.0000014;
        me.restitution = 0;
        spawn.shield(me, x, y);
        me.look = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            if (this.seePlayer.recall && this.cd < simulation.cycle) {
                this.burstDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                this.cd = simulation.cycle + 40;
                this.do = this.spin
            }
        }
        me.do = me.look
        me.spin = function () {
            this.checkStatus();
            this.torque += 0.000035 * this.inertia;
            //draw attack vector
            const mag = this.radius * 2.5 + 50;
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.lineWidth = 3;
            ctx.setLineDash([10, 20]); //30
            const dir = Vector.add(this.position, Vector.mult(this.burstDir, mag));
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(dir.x, dir.y);
            ctx.stroke();
            ctx.setLineDash([]);
            if (this.cd < simulation.cycle) {
                this.fill = this.rememberFill;
                this.cd = simulation.cycle + 180 * simulation.CDScale
                this.do = this.look
                this.force = Vector.mult(this.burstDir, this.mass * 0.25);
            }
        }
    },
    sucker(x, y, radius = 30 + Math.ceil(Math.random() * 25)) {
        radius = 9 + radius / 8; //extra small
        mobs.spawn(x, y, 6, radius, "transparent");
        let me = mob[mob.length - 1];
        me.stroke = "transparent"; //used for drawSneaker
        me.eventHorizon = radius * 30; //required for blackhole
        me.seeAtDistance2 = (me.eventHorizon + 400) * (me.eventHorizon + 400); //vision limit is event horizon
        me.accelMag = 0.00012 * simulation.accelScale;
        me.frictionAir = 0.025;
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body
        me.memory = Infinity;
        Matter.Body.setDensity(me, 0.015); //extra dense //normal is 0.001 //makes effective life much larger
        me.do = function () {
            //keep it slow, to stop issues from explosion knock backs
            if (this.speed > 5) {
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x * 0.99,
                    y: this.velocity.y * 0.99
                });
            }
            this.seePlayerCheckByDistance()
            this.checkStatus();
            //accelerate towards the player
            if (this.seePlayer.recall) {
                const forceMag = this.accelMag * this.mass;
                const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                this.force.x += forceMag * Math.cos(angle);
                this.force.y += forceMag * Math.sin(angle);
            }
            //eventHorizon waves in and out
            const eventHorizon = this.eventHorizon * (0.93 + 0.17 * Math.sin(simulation.cycle * 0.011))
            //draw darkness
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, eventHorizon * 0.25, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, eventHorizon * 0.55, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fill();

            //when player is inside event horizon
            if (Vector.magnitude(Vector.sub(this.position, player.position)) < eventHorizon) {
                if (m.immuneCycle < m.cycle) {
                    if (m.energy > 0) m.energy -= 0.005
                    if (m.energy < 0.1) m.damage(0.0001 * simulation.dmgScale);
                }
                const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                player.force.x -= 0.00125 * player.mass * Math.cos(angle) * (m.onGround ? 1.8 : 1);
                player.force.y -= 0.0001 * player.mass * Math.sin(angle);
                //draw line to player
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(m.pos.x, m.pos.y);
                ctx.lineWidth = Math.min(60, this.radius * 2);
                ctx.strokeStyle = "rgba(0,0,0,0.5)";
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                ctx.fill();
            }
        }
        if (level.isMobShields) spawn.shield(me, x, y);
    },
    // timeBoss(x, y, radius = 25) {
    //     mobs.spawn(x, y, 12, radius, "#000");
    //     let me = mob[mob.length - 1];
    //     me.isBoss = true;
    //     me.stroke = "transparent"; //used for drawSneaker
    //     me.eventHorizon = 1100; //required for black hole
    //     me.eventHorizonGoal = 1100; //required for black hole
    //     me.seeAtDistance2 = (me.eventHorizon + 1200) * (me.eventHorizon + 1200); //vision limit is event horizon
    //     me.accelMag = 0.00006 * simulation.accelScale;
    //     // me.collisionFilter.mask = cat.player | cat.bullet //| cat.body
    //     // me.frictionAir = 0.005;
    //     me.memory = Infinity;
    //     Matter.Body.setDensity(me, 0.03); //extra dense //normal is 0.001 //makes effective life much larger
    //     me.onDeath = function() {
    //         powerUps.spawnBossPowerUp(this.position.x, this.position.y)
    //     };
    //     me.damageReduction = 0.23 
    //     me.do = function() {
    //         //keep it slow, to stop issues from explosion knock backs
    //         if (!(simulation.cycle % this.seePlayerFreq)) {
    //             if (this.distanceToPlayer2() < this.seeAtDistance2) { //&& !m.isCloak   ignore cloak for black holes
    //                 this.locatePlayer();
    //                 if (!this.seePlayer.yes) this.seePlayer.yes = true;
    //             } else if (this.seePlayer.recall) {
    //                 this.lostPlayer();
    //             }
    //         }
    //         this.checkStatus();
    //         if (this.seePlayer.recall) {
    //             //accelerate towards the player
    //             const forceMag = this.accelMag * this.mass;
    //             const dx = this.seePlayer.position.x - this.position.x
    //             const dy = this.seePlayer.position.y - this.position.y
    //             const mag = Math.sqrt(dx * dx + dy * dy)
    //             this.force.x += forceMag * dx / mag;
    //             this.force.y += forceMag * dy / mag;

    //             //eventHorizon waves in and out
    //             const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008))
    //             //  zoom camera in and out with the event horizon

    //             //draw darkness
    //             if (!simulation.isTimeSkipping) {
    //                 ctx.beginPath();
    //                 ctx.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);
    //                 ctx.fillStyle = "rgba(0,0,0,0.05)";
    //                 ctx.fill();
    //                 //when player is inside event horizon
    //                 if (Vector.magnitude(Vector.sub(this.position, player.position)) < eventHorizon) {
    //                     // if (!(simulation.cycle % 10)) simulation.timePlayerSkip(5)
    //                     // if (!(simulation.cycle % 2)) simulation.timePlayerSkip(1)
    //                     simulation.timePlayerSkip(2)

    //                     // if (m.immuneCycle < m.cycle) {
    //                     //     if (m.energy > 0) m.energy -= 0.004
    //                     //     if (m.energy < 0.1) m.damage(0.00017 * simulation.dmgScale);
    //                     // }
    //                 }
    //             }
    //         }
    //     }
    // },
    suckerBoss(x, y, radius = 25) {
        mobs.spawn(x, y, 12, radius, "#000");
        let me = mob[mob.length - 1];
        me.isBoss = true;

        me.stroke = "transparent"; //used for drawSneaker
        me.eventHorizon = 1100; //required for black hole
        me.seeAtDistance2 = (me.eventHorizon + 3000) * (me.eventHorizon + 3000); //vision limit is event horizon
        me.accelMag = 0.00004 * simulation.accelScale;
        me.collisionFilter.mask = cat.player | cat.bullet //| cat.body
        // me.frictionAir = 0.005;
        me.memory = 1600;
        Matter.Body.setDensity(me, 0.06); //extra dense //normal is 0.001 //makes effective life much larger
        me.onDeath = function () {
            //applying forces to player doesn't seem to work inside this method, not sure why
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            if (simulation.difficulty > 5) {
                //teleport everything to center
                function toMe(who, where, range) {
                    for (let i = 0, len = who.length; i < len; i++) {
                        if (!who[i].isNotHoldable) {
                            const SUB = Vector.sub(who[i].position, where)
                            const DISTANCE = Vector.magnitude(SUB)
                            if (DISTANCE < range) {
                                Matter.Body.setPosition(who[i], where)
                            }
                        }
                    }
                }
                toMe(body, this.position, this.eventHorizon)
                toMe(mob, this.position, this.eventHorizon)
                // toMe(bullet, this.position, this.eventHorizon))
            }
        };
        me.damageReduction = 0.27
        me.do = function () {
            //keep it slow, to stop issues from explosion knock backs
            if (this.speed > 1) {
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x * 0.95,
                    y: this.velocity.y * 0.95
                });
            }
            if (!(simulation.cycle % this.seePlayerFreq)) {
                if (this.distanceToPlayer2() < this.seeAtDistance2) { //&& !m.isCloak   ignore cloak for black holes
                    this.locatePlayer();
                    if (!this.seePlayer.yes) this.seePlayer.yes = true;
                } else if (this.seePlayer.recall) {
                    this.lostPlayer();
                }
            }
            this.checkStatus();
            if (this.seePlayer.recall) {
                //throw large seekers
                if (!(simulation.cycle % 90)) {
                    spawn.seeker(this.position.x, this.position.y, 15 * (0.7 + 0.5 * Math.random()), 7); //give the bullet a rotational velocity as if they were attached to a vertex
                    const who = mob[mob.length - 1]
                    Matter.Body.setDensity(who, 0.00001); //normal is 0.001
                    who.timeLeft = 600
                    who.accelMag = 0.0002 * simulation.accelScale; //* (0.8 + 0.4 * Math.random())
                    who.frictionAir = 0.01 //* (0.
                    const velocity = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), -20); //set direction to turn to fire                    //Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[index]))), -35)
                    Matter.Body.setVelocity(who, {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    });
                }
                //accelerate towards the player
                const forceMag = this.accelMag * this.mass;
                const dx = this.seePlayer.position.x - this.position.x
                const dy = this.seePlayer.position.y - this.position.y
                const mag = Math.sqrt(dx * dx + dy * dy)
                this.force.x += forceMag * dx / mag;
                this.force.y += forceMag * dy / mag;
                //eventHorizon waves in and out
                const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008)) //  zoom camera in and out with the event horizon
                //draw darkness
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.2, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.6)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.4, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.4)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.6, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.3)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.8, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,20,40,0.2)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,0,0,0.05)";
                ctx.fill();
                //when player is inside event horizon
                if (Vector.magnitude(Vector.sub(this.position, player.position)) < eventHorizon) {
                    if (m.immuneCycle < m.cycle) {
                        if (m.energy > 0) m.energy -= 0.008
                        if (m.energy < 0.1) m.damage(0.00015 * simulation.dmgScale);
                    }
                    const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                    player.force.x -= 0.0013 * Math.cos(angle) * player.mass * (m.onGround ? 1.7 : 1);
                    player.force.y -= 0.0013 * Math.sin(angle) * player.mass;
                    //draw line to player
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(m.pos.x, m.pos.y);
                    ctx.lineWidth = Math.min(60, this.radius * 2);
                    ctx.strokeStyle = "rgba(0,0,0,0.5)";
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(0,0,0,0.3)";
                    ctx.fill();
                }
                this.curl(eventHorizon);
                //attract other power ups
                for (let i = 0; i < powerUp.length; i++) { //attract heal power ups
                    const sub = Vector.sub(this.position, powerUp[i].position)
                    const mag = 0.0015 * Math.min(1, (Vector.magnitude(sub) - 200) / this.eventHorizon)
                    const attract = Vector.mult(Vector.normalise(sub), mag * powerUp[i].mass)
                    powerUp[i].force.x += attract.x;
                    powerUp[i].force.y += attract.y - powerUp[i].mass * simulation.g; //negate gravity
                    // Matter.Body.setVelocity(powerUp[i], Vector.mult(powerUp[i].velocity, 0.7));
                }
            }
        }
    },
    spiderBoss(x, y, radius = 60 + Math.ceil(Math.random() * 10)) {
        let targets = [] //track who is in the node boss, for shields
        mobs.spawn(x, y, 6, radius, "#b386e8");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.003); //extra dense //normal is 0.001 //makes effective life much larger  and damage on collision
        me.isBoss = true;
        me.damageReduction = 0.13  //normal is 1,  most bosses have 0.25

        targets.push(me.id) //add to shield protection
        me.friction = 0;
        me.frictionAir = 0.0067;
        me.lookTorque = 0.0000008; //controls spin while looking for player
        me.g = 0.0002; //required if using this.gravity
        me.seePlayerFreq = Math.floor((30 + 20 * Math.random()));
        const springStiffness = 0.00014;
        const springDampening = 0.0005;

        me.springTarget = { x: me.position.x, y: me.position.y };
        const len = cons.length;
        cons[len] = Constraint.create({
            pointA: me.springTarget,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[len].length = 100 + 1.5 * radius;
        me.cons = cons[len];

        me.springTarget2 = {
            x: me.position.x,
            y: me.position.y
        };
        const len2 = cons.length;
        cons[len2] = Constraint.create({
            pointA: me.springTarget2,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening,
            length: 0
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[len2].length = 100 + 1.5 * radius;
        me.cons2 = cons[len2];
        me.do = function () {
            // this.armor();
            this.gravity();
            this.searchSpring();
            this.checkStatus();
            this.springAttack();
        };

        me.onDeath = function () {
            this.removeCons();
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };

        radius = 22 // radius of each node mob
        const sideLength = 100 // distance between each node mob
        const nodes = 6
        const angle = 2 * Math.PI / nodes

        spawn.allowShields = false; //don't want shields on individual mobs

        for (let i = 0; i < nodes; ++i) {
            spawn.stabber(x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), radius, 12);
            Matter.Body.setDensity(mob[mob.length - 1], 0.003); //extra dense //normal is 0.001 //makes effective life much larger
            mob[mob.length - 1].damageReduction = 0.12
            targets.push(mob[mob.length - 1].id) //track who is in the node boss, for shields
        }

        const attachmentStiffness = 0.02
        spawn.constrain2AdjacentMobs(nodes, attachmentStiffness, true); //loop mobs together

        for (let i = 0; i < nodes; ++i) { //attach to center mob
            consBB[consBB.length] = Constraint.create({
                bodyA: me,
                bodyB: mob[mob.length - i - 1],
                stiffness: attachmentStiffness,
                damping: 0.03
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        //spawn shield around all nodes
        spawn.groupShield(targets, x, y, sideLength + 1 * radius + nodes * 5 - 25);
        spawn.allowShields = true;
    },
    mantisBoss(x, y, radius = 35, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 5, radius, "#6ba");
        let me = mob[mob.length - 1];
        me.babyList = [] //list of mobs that are apart of this boss
        Matter.Body.setDensity(me, 0.0015); //extra dense //normal is 0.001 //makes effective life much larger  and damage on collision
        me.damageReduction = 0.14  //normal is 1,  most bosses have 0.25
        me.isBoss = true;

        me.friction = 0;
        me.frictionAir = 0.006;
        me.g = 0.0002; //required if using this.gravity
        me.seePlayerFreq = 31;
        const springStiffness = 0.00003; //simulation.difficulty
        const springDampening = 0.0002;
        me.springTarget = { x: me.position.x, y: me.position.y };
        const len = cons.length;
        cons[len] = Constraint.create({
            pointA: me.springTarget,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[len].length = 100 + 1.5 * radius;
        me.cons = cons[len];
        me.springTarget2 = { x: me.position.x, y: me.position.y };
        const len2 = cons.length;
        cons[len2] = Constraint.create({
            pointA: me.springTarget2,
            bodyB: me,
            stiffness: springStiffness,
            damping: springDampening,
            length: 0
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[len2].length = 100 + 1.5 * radius;
        me.cons2 = cons[len2];
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.invulnerabilityCountDown = 0
        me.do = function () {
            this.checkStatus();
            this.gravity();
            //draw the two dots on the end of the springs
            ctx.beginPath();
            ctx.arc(this.cons.pointA.x, this.cons.pointA.y, 6, 0, 2 * Math.PI);
            ctx.arc(this.cons2.pointA.x, this.cons2.pointA.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "#222";
            ctx.fill();
            // this.seePlayerCheck()
            this.seePlayerByHistory()
            this.invulnerabilityCountDown--
            if (this.isInvulnerable) {
                if (this.invulnerabilityCountDown > 90 || this.invulnerabilityCountDown % 20 > 10) {
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    for (let i = 0; i < this.babyList.length; i++) {
                        if (this.babyList[i].alive) {
                            let vertices = this.babyList[i].vertices;
                            ctx.moveTo(vertices[0].x, vertices[0].y);
                            for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                            ctx.lineTo(vertices[0].x, vertices[0].y);
                        }
                    }
                    ctx.lineWidth = 3 + 0.2 * Math.min(this.invulnerabilityCountDown, 90) + 5 * Math.random()
                    ctx.strokeStyle = `rgba(255,255,255,${0.4 + 0.4 * Math.random()})`;
                    ctx.stroke();
                }
                if (this.invulnerabilityCountDown < 0) {
                    this.invulnerabilityCountDown = 110
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    for (let i = 0; i < this.babyList.length; i++) {
                        if (this.babyList[i].alive) {
                            this.babyList[i].isInvulnerable = false
                            this.babyList[i].damageReduction = this.startingDamageReduction
                        }
                    }
                }
            } else if (this.invulnerabilityCountDown < 0) {
                this.invulnerabilityCountDown = 240 + 5 * simulation.difficulty
                this.isInvulnerable = true
                if (this.damageReduction) this.startingDamageReduction = this.damageReduction
                this.damageReduction = 0
                for (let i = 0; i < this.babyList.length; i++) {
                    if (this.babyList[i].alive) {
                        this.babyList[i].isInvulnerable = true
                        this.babyList[i].damageReduction = 0
                    }
                }
            }
            // set new values of the ends of the spring constraints
            const stepRange = 700
            if (this.seePlayer.recall && Matter.Query.ray(map, this.position, this.seePlayer.position).length === 0) {
                if (!(simulation.cycle % (this.seePlayerFreq * 2))) {
                    const unit = Vector.normalise(Vector.sub(this.seePlayer.position, this.position))
                    const goal = Vector.add(this.position, Vector.mult(unit, stepRange))
                    this.springTarget.x = goal.x;
                    this.springTarget.y = goal.y;
                    this.cons.length = -200;
                    this.cons2.length = 100 + 1.5 * this.radius;
                } else if (!(simulation.cycle % this.seePlayerFreq)) {
                    const unit = Vector.normalise(Vector.sub(this.seePlayer.position, this.position))
                    const goal = Vector.add(this.position, Vector.mult(unit, stepRange))
                    this.springTarget2.x = goal.x;
                    this.springTarget2.y = goal.y;
                    this.cons.length = 100 + 1.5 * this.radius;
                    this.cons2.length = -200;
                }
            } else {
                this.torque = this.lookTorque * this.inertia;
                //spring to random place on map
                if (!(simulation.cycle % (this.seePlayerFreq))) {
                    best = {
                        x: null,
                        y: null,
                        dist2: Infinity,
                        who: null,
                        v1: null,
                        v2: null
                    };
                    const seeRange = 3000;
                    const look = { x: this.position.x + seeRange * Math.cos(this.angle), y: this.position.y + seeRange * Math.sin(this.angle) };
                    best = vertexCollision(this.position, look, [map]);
                    if (best.dist2 != Infinity) {
                        this.springTarget.x = best.x;
                        this.springTarget.y = best.y;
                        this.cons.length = 100 + 1.5 * this.radius;
                        this.cons2.length = 100 + 1.5 * this.radius;
                    }
                }
            }
        };
        me.onDeath = function () {
            this.removeCons();
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            for (let i = 0; i < this.babyList.length; i++) {
                if (this.babyList[i].alive) {
                    this.babyList[i].collisionFilter.mask = cat.map | cat.bullet | cat.player
                    this.babyList[i].isInvulnerable = false
                    this.babyList[i].damageReduction = this.startingDamageReduction
                    this.babyList[i].collisionFilter.mask = cat.bullet | cat.player | cat.map | cat.body
                }
            }
        };
        const sideLength = 80 // distance between each node mob
        const nodes = 3
        const angle = 2 * Math.PI / nodes
        spawn.allowShields = false; //don't want shields on individual mobs, it messes with the constraints
        for (let i = 0; i < nodes; ++i) {
            spawn.striker(x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), 20, 12);
            const babyMob = mob[mob.length - 1]
            me.babyList.push(babyMob)
            babyMob.fill = "rgb(68, 102, 119)"
            babyMob.isBoss = true;
            // Matter.Body.setDensity(babyMob, 0.001); //extra dense //normal is 0.001 //makes effective life much larger and increases damage
            babyMob.damageReduction = this.startingDamageReduction * 0.8
            babyMob.collisionFilter.mask = cat.bullet | cat.player //can't touch other mobs //cat.map | cat.body |
            babyMob.delay = 60 + 55 * simulation.CDScale + Math.floor(Math.random() * 20);
            babyMob.strikeRange = 400
            babyMob.onHit = function () {
                this.cd = simulation.cycle + this.delay;
                //dislodge ammo
                if (b.inventory.length) {
                    let isRemovedAmmo = false
                    const numRemoved = 3
                    for (let j = 0; j < numRemoved; j++) {
                        for (let i = 0; i < b.inventory.length; i++) {
                            const gun = b.guns[b.inventory[i]]
                            if (gun.ammo > 0 && gun.ammo !== Infinity) {
                                gun.ammo -= Math.ceil((Math.random() + Math.random()) * gun.ammoPack)
                                if (gun.ammo < 0) gun.ammo = 0
                                isRemovedAmmo = true
                            }
                        }
                    }
                    if (isRemovedAmmo) {
                        simulation.updateGunHUD();
                        for (let j = 0; j < numRemoved; j++) powerUps.directSpawn(this.position.x + 10 * Math.random(), this.position.y + 10 * Math.random(), "ammo");
                        powerUps.ejectGraphic();
                    }
                }
            };
        }
        const stiffness = 0.01
        const damping = 0.1
        for (let i = 1; i < nodes; ++i) { //attach to center mob
            consBB[consBB.length] = Constraint.create({
                bodyA: mob[mob.length - i],
                bodyB: mob[mob.length - i - 1],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - 1],
            bodyB: mob[mob.length - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);


        for (let i = 0; i < nodes; ++i) { //attach to center mob
            consBB[consBB.length] = Constraint.create({
                bodyA: me,
                bodyB: mob[mob.length - i - 1],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        spawn.allowShields = true;
    },
    // timeSkipBoss(x, y, radius = 55) {
    //     mobs.spawn(x, y, 6, radius, '#000');
    //     let me = mob[mob.length - 1];
    //     me.isBoss = true;
    //     // me.stroke = "transparent"; //used for drawSneaker
    //     me.timeSkipLastCycle = 0
    //     me.eventHorizon = 1800; //required for black hole
    //     me.seeAtDistance2 = (me.eventHorizon + 2000) * (me.eventHorizon + 2000); //vision limit is event horizon + 2000
    //     me.accelMag = 0.0004 * simulation.accelScale;
    //     // me.frictionAir = 0.005;
    //     // me.memory = 1600;
    //     // Matter.Body.setDensity(me, 0.02); //extra dense //normal is 0.001 //makes effective life much larger
    //     Matter.Body.setDensity(me, 0.0005 + 0.00018 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
    //     spawn.shield(me, x, y, 1);
    //     me.onDeath = function() {
    //         //applying forces to player doesn't seem to work inside this method, not sure why
    //         powerUps.spawnBossPowerUp(this.position.x, this.position.y)
    //     };
    //     me.do = function() {
    //         //keep it slow, to stop issues from explosion knock backs
    //         if (this.speed > 8) {
    //             Matter.Body.setVelocity(this, {
    //                 x: this.velocity.x * 0.99,
    //                 y: this.velocity.y * 0.99
    //             });
    //         }
    //         this.seePlayerCheck();
    //         this.checkStatus();
    //         this.attraction()
    //         if (!simulation.isTimeSkipping) {
    //             const compress = 1
    //             if (this.timeSkipLastCycle < simulation.cycle - compress &&
    //                 Vector.magnitude(Vector.sub(this.position, player.position)) < this.eventHorizon) {
    //                 this.timeSkipLastCycle = simulation.cycle
    //                 simulation.timeSkip(compress)

    //                 this.fill = `rgba(0,0,0,${0.4+0.6*Math.random()})`
    //                 this.stroke = "#014"
    //                 this.isShielded = false;
    //                 this.isDropPowerUp = true;
    //                 this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob; //can't touch bullets

    //                 ctx.beginPath();
    //                 ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
    //                 ctx.fillStyle = "#fff";
    //                 ctx.globalCompositeOperation = "destination-in"; //in or atop
    //                 ctx.fill();
    //                 ctx.globalCompositeOperation = "source-over";
    //                 ctx.beginPath();
    //                 ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
    //                 ctx.clip();

    //                 // ctx.beginPath();
    //                 // ctx.arc(this.position.x, this.position.y, 9999, 0, 2 * Math.PI);
    //                 // ctx.fillStyle = "#000";
    //                 // ctx.fill();
    //                 // ctx.strokeStyle = "#000";
    //                 // ctx.stroke();

    //                 // ctx.beginPath();
    //                 // ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
    //                 // ctx.fillStyle = `rgba(0,0,0,${0.05*Math.random()})`;
    //                 // ctx.fill();
    //                 // ctx.strokeStyle = "#000";
    //                 // ctx.stroke();
    //             } else {
    //                 this.isShielded = true;
    //                 this.isDropPowerUp = false;
    //                 this.seePlayer.recall = false
    //                 this.fill = "transparent"
    //                 this.stroke = "transparent"
    //                 this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.mob; //can't touch bullets
    //                 ctx.beginPath();
    //                 ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
    //                 ctx.fillStyle = `rgba(0,0,0,${0.05*Math.random()})`;
    //                 ctx.fill();
    //             }
    //         }
    //     }
    // },
    beamer(x, y, radius = 15 + Math.ceil(Math.random() * 15)) {
        mobs.spawn(x, y, 4, radius, "rgb(255,0,190)");
        let me = mob[mob.length - 1];
        me.repulsionRange = 73000; //squared
        me.laserRange = 370;
        me.accelMag = 0.0005 * simulation.accelScale;
        me.frictionStatic = 0;
        me.friction = 0;
        spawn.shield(me, x, y);
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();
            this.repulsion();
            this.harmZone();
        };
    },
    historyBoss(x, y, radius = 30) {
        if (tech.dynamoBotCount > 0) {
            spawn.randomLevelBoss(x, y, spawn.nonCollideBossList)
            return
        }
        mobs.spawn(x, y, 0, radius, "transparent");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.21); //extra dense //normal is 0.001
        me.laserRange = 350;
        me.seeAtDistance2 = 2000000;
        me.isBoss = true;
        me.damageReduction = 0.38  // me.damageReductionGoal

        me.showHealthBar = false; //drawn in this.awake
        me.delayLimit = 60 + Math.floor(30 * Math.random());
        me.followDelay = 600 - Math.floor(90 * Math.random())
        me.stroke = "transparent"; //used for drawGhost
        me.collisionFilter.mask = cat.bullet | cat.body
        me.memory = Infinity
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ctx.setTransform(1, 0, 0, 1, 0, 0); //reset warp effect
                    if (simulation.isInvertedVertical) { //redo vertical camera effects
                        ctx.translate(0, canvas.height); // Move the origin down to the bottom
                        ctx.scale(1, -1); // Flip vertically
                        //flip mouse Y
                        simulation.isInvertedVertical = true
                        mouseMove = function (e) {
                            simulation.mouse.x = e.clientX;
                            simulation.mouse.y = window.innerHeight - e.clientY;
                        }
                    }
                    ctx.setLineDash([]) //reset stroke dash effect
                })
            })
        };
        me.warpIntensity = 0
        me.awake = function () {
            this.checkStatus();
            //health bar needs to be here because the position is being set
            const h = this.radius * 0.3;
            const w = this.radius * 2;
            const x = this.position.x - w / 2;
            const y = this.position.y - w * 0.7;
            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = "rgba(150,0,255,0.7)";
            ctx.fillRect(x, y, w * this.health, h);

            //draw eye
            const unit = Vector.normalise(Vector.sub(m.pos, this.position))
            const eye = Vector.add(Vector.mult(unit, 15), this.position)
            ctx.beginPath();
            ctx.arc(eye.x, eye.y, 4, 0, 2 * Math.PI);
            ctx.moveTo(this.position.x + 20 * unit.x, this.position.y + 20 * unit.y);
            ctx.lineTo(this.position.x + 30 * unit.x, this.position.y + 30 * unit.y);
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.setLineDash([125 * Math.random(), 125 * Math.random()]); //the dashed effect is not set back to normal, because it looks neat for how the player is drawn
            // ctx.lineDashOffset = 6*(simulation.cycle % 215);
            if (this.distanceToPlayer() < this.laserRange) {
                if (m.immuneCycle < m.cycle) {
                    if (m.energy > 0.002) {
                        m.energy -= 0.004
                    } else {
                        m.damage(0.0004 * simulation.dmgScale)
                    }
                }
                this.warpIntensity += 0.0004
                requestAnimationFrame(() => {
                    if (!simulation.paused && m.alive) {
                        ctx.transform(1, this.warpIntensity * (Math.random() - 0.5), this.warpIntensity * (Math.random() - 0.5), 1, 0, 0); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving)) //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
                        // ctx.transform(1 - scale * (Math.random() - 0.5), skew * (Math.random() - 0.5), skew * (Math.random() - 0.5), 1 - scale * (Math.random() - 0.5), translation * (Math.random() - 0.5), translation * (Math.random() - 0.5)); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving)) //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
                    }
                })
                ctx.beginPath();
                ctx.moveTo(eye.x, eye.y);
                ctx.lineTo(m.pos.x, m.pos.y);
                ctx.lineTo(m.pos.x + (Math.random() - 0.5) * 3000, m.pos.y + (Math.random() - 0.5) * 3000);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgb(150,0,255)";
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(150,0,255,0.1)";
                ctx.fill();
            } else {
                this.warpIntensity = 0;
            }

            //several ellipses spinning about the same axis
            const rotation = simulation.cycle * 0.015
            const phase = simulation.cycle * 0.021
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(150,0,255,0.05)"
            ctx.strokeStyle = "#70f"
            for (let i = 0, len = 6; i < len; i++) {
                ctx.beginPath();
                ctx.ellipse(this.position.x, this.position.y, this.laserRange * Math.abs(Math.sin(phase + i / len * Math.PI)), this.laserRange, rotation, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }

            if (!this.isStunned && !this.isSlowed) {
                if (this.followDelay > this.delayLimit) this.followDelay -= 0.15;
                let history = m.history[(m.cycle - Math.floor(this.followDelay)) % 600]
                Matter.Body.setPosition(this, { x: history.position.x, y: history.position.y - history.yOff + 24.2859 }) //bullets move with player
            }
        }
        me.do = function () {
            if (this.seePlayer.recall || (!(simulation.cycle % this.seePlayerFreq) && this.distanceToPlayer2() < this.seeAtDistance2 && !m.isCloak)) {
                setTimeout(() => {
                    this.do = this.awake
                    this.stroke = "rgba(205,0,255,0.5)"
                    this.fill = "rgba(205,0,255,0.1)"
                    this.seePlayer.yes = true
                }, 2000);
            }
            this.checkStatus();
        };
    },
    focuser(x, y, radius = 30 + Math.ceil(Math.random() * 10)) {
        radius = Math.ceil(radius * 0.7);
        mobs.spawn(x, y, 4, radius, "rgb(0,0,255)");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.003); //extra dense //normal is 0.001
        me.restitution = 0;
        me.laserPos = me.position; //required for laserTracking
        me.repulsionRange = 1200000; //squared
        me.accelMag = 0.00009 * simulation.accelScale;
        me.frictionStatic = 0;
        me.friction = 0;
        me.onDamage = function () {
            this.laserPos = this.position;
        };
        spawn.shield(me, x, y);
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();
            const dist2 = this.distanceToPlayer2();
            //laser Tracking
            if (this.seePlayer.yes && dist2 < 4000000) {
                const rangeWidth = 2000; //this is sqrt of 4000000 from above if()
                //targeting laser will slowly move from the mob to the player's position
                this.laserPos = Vector.add(this.laserPos, Vector.mult(Vector.sub(player.position, this.laserPos), 0.03));
                let targetDist = Vector.magnitude(Vector.sub(this.laserPos, m.pos));
                const r = 12;
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                if (targetDist < r + 16) {
                    targetDist = r + 10;
                    if (m.immuneCycle < m.cycle) {
                        m.damage(0.0003 * simulation.dmgScale);
                        if (m.energy > 0.1) m.energy -= 0.003
                    }
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(m.pos.x, m.pos.y);
                    ctx.lineTo(m.pos.x + (Math.random() - 0.5) * 3000, m.pos.y + (Math.random() - 0.5) * 3000);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "rgb(0,0,255)";
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(0,0,255,0.1)";
                    ctx.fill();
                } else {
                    const laserWidth = 0.0005;
                    let laserOffR = Vector.rotateAbout(this.laserPos, (targetDist - r) * laserWidth, this.position);
                    let sub = Vector.normalise(Vector.sub(laserOffR, this.position));
                    laserOffR = Vector.add(laserOffR, Vector.mult(sub, rangeWidth));
                    ctx.lineTo(laserOffR.x, laserOffR.y);

                    let laserOffL = Vector.rotateAbout(this.laserPos, (targetDist - r) * -laserWidth, this.position);
                    sub = Vector.normalise(Vector.sub(laserOffL, this.position));
                    laserOffL = Vector.add(laserOffL, Vector.mult(sub, rangeWidth));
                    ctx.lineTo(laserOffL.x, laserOffL.y);
                    ctx.fillStyle = `rgba(0,0,255,${Math.max(0, 0.6 * r / targetDist)})`
                    ctx.fill();
                }
            } else {
                this.laserPos = this.position;
            }
        }
    },
    // focuser(x, y, radius = 30 + Math.ceil(Math.random() * 10)) {
    //     radius = Math.ceil(radius * 0.7);
    //     mobs.spawn(x, y, 4, radius, "rgb(0,0,255)");
    //     let me = mob[mob.length - 1];
    //     Matter.Body.setDensity(me, 0.003); //extra dense //normal is 0.001
    //     me.restitution = 0;
    //     me.laserPos = me.position; //required for laserTracking
    //     me.repulsionRange = 1200000; //squared
    //     me.accelMag = 0.00009 * simulation.accelScale;
    //     me.frictionStatic = 0;
    //     me.friction = 0;
    //     me.onDamage = function () {
    //         this.laserPos = this.position;
    //     };
    //     spawn.shield(me, x, y);
    //     me.do = function () {
    //         this.seePlayerByLookingAt();
    //         this.checkStatus();
    //         this.attraction();
    //         const dist2 = this.distanceToPlayer2();
    //         //laser Tracking
    //         if (this.seePlayer.yes && dist2 < 4000000) {
    //             const rangeWidth = 2000; //this is sqrt of 4000000 from above if()
    //             //targeting laser will slowly move from the mob to the player's position
    //             this.laserPos = Vector.add(this.laserPos, Vector.mult(Vector.sub(player.position, this.laserPos), 0.1));
    //             let targetDist = Vector.magnitude(Vector.sub(this.laserPos, m.pos));
    //             const r = 12;
    //             ctx.beginPath();
    //             ctx.moveTo(this.position.x, this.position.y);
    //             if (targetDist < r + 16) {
    //                 targetDist = r + 10;
    //                 //charge at player
    //                 const forceMag = this.accelMag * 40 * this.mass;
    //                 const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
    //                 this.force.x += forceMag * Math.cos(angle);
    //                 this.force.y += forceMag * Math.sin(angle);
    //             }
    //             // else {
    //             //high friction if can't lock onto player
    //             // Matter.Body.setVelocity(this, {
    //             //   x: this.velocity.x * 0.98,
    //             //   y: this.velocity.y * 0.98
    //             // });
    //             // }
    //             if (dist2 > 80000) {
    //                 const laserWidth = 0.002;
    //                 let laserOffR = Vector.rotateAbout(this.laserPos, (targetDist - r) * laserWidth, this.position);
    //                 let sub = Vector.normalise(Vector.sub(laserOffR, this.position));
    //                 laserOffR = Vector.add(laserOffR, Vector.mult(sub, rangeWidth));
    //                 ctx.lineTo(laserOffR.x, laserOffR.y);

    //                 let laserOffL = Vector.rotateAbout(this.laserPos, (targetDist - r) * -laserWidth, this.position);
    //                 sub = Vector.normalise(Vector.sub(laserOffL, this.position));
    //                 laserOffL = Vector.add(laserOffL, Vector.mult(sub, rangeWidth));
    //                 ctx.lineTo(laserOffL.x, laserOffL.y);
    //                 ctx.fillStyle = `rgba(0,0,255,${Math.max(0, 0.3 * r / targetDist)})`
    //                 ctx.fill();
    //             }
    //         } else {
    //             this.laserPos = this.position;
    //         }
    //     }
    // },
    flutter(x, y, radius = 20 + 6 * Math.random()) {
        mobs.spawn(x, y, 7, radius, '#16576b');
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.002); //extra dense //normal is 0.001 //makes effective life much larger
        // me.damageReduction = 0.04 

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.0006 + 0.0007 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.04;
        // me.seePlayerFreq = 40 + Math.floor(13 * Math.random())
        me.memory = 240;
        me.restitution = 1;
        me.frictionStatic = 0;
        me.friction = 0;
        me.lookTorque = 0.000001 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 }
        spawn.shield(me, x, y);

        // me.onDeath = function() {};
        me.flapRate = 0.3 + Math.floor(3 * Math.random()) / 10 + 100 * me.accelMag
        me.flapRadius = 75 + radius * 3
        me.do = function () {
            this.seePlayerByHistory()
            this.checkStatus();
            if (this.seePlayer.recall) {
                this.force.x += Math.cos(this.angle) * this.accelMag * this.mass
                this.force.y += Math.sin(this.angle) * this.accelMag * this.mass

                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));

                    //dot product can't tell if mob is facing directly away or directly towards,  so check if pointed directly away from player every few cycles
                    const mod = (a, n) => {
                        return a - Math.floor(a / n) * n
                    }
                    const sub = Vector.sub(m.pos, this.position) //check by comparing different between angles.  Give this a nudge if angles are 180 degree different
                    const diff = mod(Math.atan2(sub.y, sub.x) - this.angle + Math.PI, 2 * Math.PI) - Math.PI
                    if (Math.abs(diff) > 2.8) this.torque += 0.0002 * this.inertia * Math.random();
                }

                //rotate towards fireDir
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.4;
                const turn = 0.000025 * this.inertia
                if (c > threshold) {
                    this.torque += turn;
                } else if (c < -threshold) {
                    this.torque -= turn;
                }

                const flapArc = 0.7 //don't go past 1.57 for normal flaps
                ctx.fillStyle = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.2)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
                this.wing(this.angle + Math.PI / 2 + flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
                this.wing(this.angle - Math.PI / 2 - flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
            }
            // else { //flocking behavior (not working yet)
            //     this.force.x += Math.cos(this.angle) * this.accelMag * this.mass
            //     this.force.y += Math.sin(this.angle) * this.accelMag * this.mass
            //     //set direction to turn to fire
            //     if (!(simulation.cycle % this.seePlayerFreq)) {
            //         //find nearest mob and maintain a distance
            //         let nearestMob = null
            //         let nearestMobDistance = Infinity
            //         for (let i = 0; i < mob.length; i++) {
            //             const newMobDistance = Vector.magnitude(Vector.sub(this.position, mob[i].position))
            //             if (mob[i].isDropPowerUp && mob[i].alive && newMobDistance < nearestMobDistance) { //&& !mob[i].isBoss
            //                 nearestMobDistance = newMobDistance
            //                 nearestMob = mob[i]
            //             }
            //         }
            //         if (nearestMob) {
            //             // console.log(nearestMob)
            //             this.fireDir = Vector.normalise(Vector.sub(nearestMob.position, this.position));
            //             //dot product can't tell if mob is facing directly away or directly towards,  so check if pointed directly away from player every few cycles
            //             const mod = (a, n) => {
            //                 return a - Math.floor(a / n) * n
            //             }
            //             const sub = Vector.sub(nearestMob.position, this.position) //check by comparing different between angles.  Give this a nudge if angles are 180 degree different
            //             const diff = mod(Math.atan2(sub.y, sub.x) - this.angle + Math.PI, 2 * Math.PI) - Math.PI
            //             if (Math.abs(diff) > 2.8) this.torque += 0.0002 * this.inertia * Math.random();
            //         }
            //     }
            //     //rotate towards fireDir
            //     const angle = this.angle + Math.PI / 2;
            //     c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
            //     const threshold = 0.4;
            //     const turn = 0.000025 * this.inertia
            //     if (c > threshold) {
            //         this.torque += turn;
            //     } else if (c < -threshold) {
            //         this.torque -= turn;
            //     }
            //     const flapArc = 0.7 //don't go past 1.57 for normal flaps
            //     ctx.fillStyle = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.2)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
            //     this.wing(this.angle + Math.PI / 2 + flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
            //     this.wing(this.angle - Math.PI / 2 - flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
            // }
        };
    },
    stinger(x, y, radius = 18 + 4 * Math.random()) {
        const color = '#5bc'
        mobs.spawn(x, y, 7, radius, color);
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.0025); //extra dense //normal is 0.001 //makes effective life much larger
        // me.damageReduction = 0.04 

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.0015 + 0.0007 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.04;
        // me.seePlayerFreq = 40 + Math.floor(13 * Math.random())
        me.memory = 240;
        me.restitution = 0.8;
        me.frictionStatic = 0;
        me.friction = 0;
        me.lookTorque = 0.000001 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 }
        spawn.shield(me, x, y);

        // me.onDeath = function() {};
        me.flapRate = 0.06 + 0.03 * Math.random()
        me.flapRadius = 40 + radius * 3
        me.do = function () {
            this.seePlayerByHistory()
            this.checkStatus();
            if (this.seePlayer.recall) {
                this.force.x += Math.cos(this.angle) * this.accelMag * this.mass
                this.force.y += Math.sin(this.angle) * this.accelMag * this.mass

                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                    //dot product can't tell if mob is facing directly away or directly towards,  so check if pointed directly away from player every few cycles
                    const mod = (a, n) => a - Math.floor(a / n) * n
                    const sub = Vector.sub(m.pos, this.position) //check by comparing different between angles.  Give this a nudge if angles are 180 degree different
                    const diff = mod(Math.atan2(sub.y, sub.x) - this.angle + Math.PI, 2 * Math.PI) - Math.PI
                    if (Math.abs(diff) > 2.8) this.torque += 0.0002 * this.inertia * Math.random();
                }

                //rotate towards fireDir
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.4;
                const turn = 0.00002 * this.inertia
                if (c > threshold) {
                    this.torque += turn;
                } else if (c < -threshold) {
                    this.torque -= turn;
                }

                // this.accelMag = 0.0006 + 0.0007 * Math.sqrt(simulation.accelScale);
                this.frictionAir = 0.11 + 0.09 * Math.sin(simulation.cycle * this.flapRate - Math.PI / 2)

                const flapArc = 0.8 //don't go past 1.57 for normal flaps
                ctx.fillStyle = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.2)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
                this.wing(this.angle + 2.1 + flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
                this.wing(this.angle - 2.1 - flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)

                const seeRange = 550 + 35 * simulation.difficultyMode;
                if (this.distanceToPlayer() < 1000) {
                    best = {
                        x: null,
                        y: null,
                        dist2: Infinity,
                        who: null,
                        v1: null,
                        v2: null
                    };
                    const seeRangeRandom = seeRange - 200 - 150 * Math.random()
                    const look = { x: this.position.x + seeRangeRandom * Math.cos(this.angle), y: this.position.y + seeRangeRandom * Math.sin(this.angle) };
                    best = vertexCollision(this.position, look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);

                    // hitting player
                    if ((best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        const dmg = 0.002 * simulation.dmgScale;
                        m.damage(dmg);
                        //draw damage
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(best.x, best.y, 5 + dmg * 1500, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                    //draw beam
                    const vertex = 3
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath();
                    ctx.moveTo(this.vertices[vertex].x, this.vertices[vertex].y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // ctx.beginPath();
                    // ctx.arc(this.vertices[vertex].x, this.vertices[vertex].y, 5, 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                    // ctx.fillStyle = color;
                    // ctx.fill();
                }
                // else {
                //     ctx.beginPath();
                //     ctx.arc(this.vertices[1].x, this.vertices[1].y, 1 + 0.3 * (simulation.cycle % this.laserInterval), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                //     ctx.fillStyle = color;
                //     ctx.fill();
                // }
            }
            // else { //flocking behavior (not working yet)
            //     this.force.x += Math.cos(this.angle) * this.accelMag * this.mass
            //     this.force.y += Math.sin(this.angle) * this.accelMag * this.mass
            //     //set direction to turn to fire
            //     if (!(simulation.cycle % this.seePlayerFreq)) {
            //         //find nearest mob and maintain a distance
            //         let nearestMob = null
            //         let nearestMobDistance = Infinity
            //         for (let i = 0; i < mob.length; i++) {
            //             const newMobDistance = Vector.magnitude(Vector.sub(this.position, mob[i].position))
            //             if (mob[i].isDropPowerUp && mob[i].alive && newMobDistance < nearestMobDistance) { //&& !mob[i].isBoss
            //                 nearestMobDistance = newMobDistance
            //                 nearestMob = mob[i]
            //             }
            //         }
            //         if (nearestMob) {
            //             // console.log(nearestMob)
            //             this.fireDir = Vector.normalise(Vector.sub(nearestMob.position, this.position));
            //             //dot product can't tell if mob is facing directly away or directly towards,  so check if pointed directly away from player every few cycles
            //             const mod = (a, n) => {
            //                 return a - Math.floor(a / n) * n
            //             }
            //             const sub = Vector.sub(nearestMob.position, this.position) //check by comparing different between angles.  Give this a nudge if angles are 180 degree different
            //             const diff = mod(Math.atan2(sub.y, sub.x) - this.angle + Math.PI, 2 * Math.PI) - Math.PI
            //             if (Math.abs(diff) > 2.8) this.torque += 0.0002 * this.inertia * Math.random();
            //         }
            //     }
            //     //rotate towards fireDir
            //     const angle = this.angle + Math.PI / 2;
            //     c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
            //     const threshold = 0.4;
            //     const turn = 0.000025 * this.inertia
            //     if (c > threshold) {
            //         this.torque += turn;
            //     } else if (c < -threshold) {
            //         this.torque -= turn;
            //     }
            //     const flapArc = 0.7 //don't go past 1.57 for normal flaps
            //     ctx.fillStyle = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.2)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
            //     this.wing(this.angle + Math.PI / 2 + flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
            //     this.wing(this.angle - Math.PI / 2 - flapArc * Math.sin(simulation.cycle * this.flapRate), this.flapRadius)
            // }
        };
    },
    beetleBoss(x, y, radius = 50) {
        mobs.spawn(x, y, 7, radius, '#16576b');
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.005); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.08
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0

        me.flapRate = 0.2
        me.wingSize = 0
        me.wingGoal = 250 + simulation.difficulty
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.00045 + 0.0005 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.05;
        me.seePlayerFreq = 13
        me.memory = 420;
        me.restitution = 1;
        me.frictionStatic = 0;
        me.friction = 0;
        me.lookTorque = 0.000001 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 }
        spawn.shield(me, x, y);

        // len = 0.3 * simulation.difficulty //spawn some baby flutters
        // if (len > 3) {
        //     for (let i = 0; i < len; ++i) {
        //         const phase = i / len * 2 * Math.PI
        //         const where = Vector.add(me.position, Vector.mult({ x: Math.cos(phase), y: Math.sin(phase) }, radius * 1.5))
        //         spawn.flutter(where.x, where.y)
        //     }
        // }

        // if (Math.random() < 0.3) {
        //     const len = 0.1 * simulation.difficulty //spawn some baby flutters
        //     let i = 0
        //     let spawnFlutters = () => {
        //         if (i < len) {
        //             if (!(simulation.cycle % 30) && !simulation.paused && !simulation.isChoosing) {
        //                 const phase = i / len * 2 * Math.PI
        //                 const where = Vector.add(me.position, Vector.mult({ x: Math.cos(phase), y: Math.sin(phase) }, radius * 1.5))
        //                 spawn.flutter(where.x, where.y)
        //                 i++
        //             }
        //             requestAnimationFrame(spawnFlutters);
        //         }
        //     }
        //     requestAnimationFrame(spawnFlutters);
        //     me.isAlreadyHadBabies = true
        // }

        me.pushAway = function (magX = 0.13, magY = 0.05) {
            for (let i = 0, len = body.length; i < len; ++i) { //push blocks away horizontally
                if (Vector.magnitudeSquared(Vector.sub(body[i].position, this.position)) < 4000000) { //2000
                    body[i].force.x += magX * body[i].mass * (body[i].position.x > this.position.x ? 1 : -1)
                    body[i].force.y -= magY * body[i].mass
                }
            }
            for (let i = 0, len = bullet.length; i < len; ++i) { //push blocks away horizontally
                if (Vector.magnitudeSquared(Vector.sub(bullet[i].position, this.position)) < 4000000) { //2000
                    bullet[i].force.x += magX * bullet[i].mass * (bullet[i].position.x > this.position.x ? 1 : -1)
                    bullet[i].force.y -= magY * bullet[i].mass
                }
            }
            for (let i = 0, len = powerUp.length; i < len; ++i) { //push blocks away horizontally
                if (Vector.magnitudeSquared(Vector.sub(powerUp[i].position, this.position)) < 4000000) { //2000
                    powerUp[i].force.x += magX * powerUp[i].mass * (powerUp[i].position.x > this.position.x ? 1 : -1)
                    powerUp[i].force.y -= magY * powerUp[i].mass
                }
            }
            if (Vector.magnitudeSquared(Vector.sub(player.position, this.position)) < 4000000) { //2000
                player.force.x += magX * player.mass * (player.position.x > this.position.x ? 1 : -1)
                player.force.y -= magY * player.mass
            }
        }

        me.babies = function (len) {
            const delay = Math.max(3, Math.floor(15 - len / 2))
            let i = 0
            let spawnFlutters = () => {
                if (i < len) {
                    if (!(simulation.cycle % delay) && !simulation.paused && !simulation.isChoosing && m.alive) {
                        // const phase = i / len * 2 * Math.PI
                        // const where = Vector.add(this.position, Vector.mult({ x: Math.cos(phase), y: Math.sin(phase) }, radius * 1.5))
                        const unit = Vector.normalise(Vector.sub(player.position, this.position))
                        const velocity = Vector.mult(unit, 10 + 10 * Math.random())
                        const where = Vector.add(this.position, Vector.mult(unit, radius * 1.2))
                        spawn.allowShields = false
                        spawn.flutter(where.x, where.y, Math.floor(7 + 8 * Math.random()))
                        const who = mob[mob.length - 1]
                        Matter.Body.setDensity(who, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
                        Matter.Body.setVelocity(who, velocity);
                        Matter.Body.setAngle(who, Math.atan2(velocity.y, velocity.x))

                        this.alertNearByMobs();
                        spawn.allowShields = true
                        i++
                    }
                    requestAnimationFrame(spawnFlutters);
                }
            }
            requestAnimationFrame(spawnFlutters);
        }
        // me.babies(0.05 * simulation.difficulty + 1)

        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            me.babies(0.05 * simulation.difficulty + 1)
        };
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold && this.alive) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4
                this.invulnerableCount = 90 + Math.floor(30 * Math.random())
                this.isInvulnerable = true
                this.damageReduction = 0
                this.frictionAir = 0
                this.wingGoal = 0
                this.wingSize = 0
                this.flapRate += 0.13
                this.accelMag *= 1.4
            }
        };
        me.do = function () {
            this.seePlayerByHistory(50)
            this.checkStatus();
            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    this.frictionAir = 0.05
                    this.wingGoal = 250
                    this.pushAway(Math.sqrt(this.flapRate) * 0.13, Math.sqrt(this.flapRate) * 0.06) //this.flapRate = 0.2, +0.13x3 -> 0.6
                    me.babies(0.05 * simulation.difficulty + 1)
                }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            } else if (this.seePlayer.recall) {
                // const force = Vector.mult(Vector.normalise(Vector.sub(this.seePlayer.position, this.position)), this.accelMag * this.mass)
                // const force = Vector.mult({ x: Math.cos(this.angle), y: Math.sin(this.angle) }, this.accelMag * this.mass)
                // this.force.x += force.x;
                // this.force.y += force.y;
                this.force.x += Math.cos(this.angle) * this.accelMag * this.mass
                this.force.y += Math.sin(this.angle) * this.accelMag * this.mass

                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));

                    //dot product can't tell if mob is facing directly away or directly towards,  so check if pointed directly away from player every few cycles
                    //check by comparing different between angles.  Give this a nudge if angles are 180 degree different
                    const mod = (a, n) => {
                        return a - Math.floor(a / n) * n
                    }
                    const sub = Vector.sub(m.pos, this.position)
                    const diff = mod(Math.atan2(sub.y, sub.x) - this.angle + Math.PI, 2 * Math.PI) - Math.PI
                    if (Math.abs(diff) > 2.8) this.torque += 0.0002 * this.inertia * Math.random();
                }

                //rotate towards fireDir
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.4;
                const turn = 0.00003 * this.inertia
                if (c > threshold) {
                    this.torque += turn;
                } else if (c < -threshold) {
                    this.torque -= turn;
                }
                const flapArc = 0.7 //don't go past 1.57 for normal flaps
                this.wingSize = 0.97 * this.wingSize + 0.03 * this.wingGoal
                ctx.fillStyle = this.fill = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.9)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
                this.wing(this.angle + Math.PI / 2 + flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingSize, 0.5, 0.0012)
                this.wing(this.angle - Math.PI / 2 - flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingSize, 0.5, 0.0012)
            } else {
                this.wingSize = 0.96 * this.wingSize + 0 //shrink while stunned
            }
        };
    },
    laserTargetingBoss(x, y, radius = 80) {
        const color = "#07f"
        mobs.spawn(x, y, 3, radius, color);
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.004); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.12

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.00018 * Math.sqrt(simulation.accelScale);
        me.seePlayerFreq = 30
        me.memory = 420;
        me.restitution = 1;
        me.frictionAir = 0.01;
        me.frictionStatic = 0;
        me.friction = 0;
        me.lookTorque = 0.000001 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 }
        spawn.shield(me, x, y, 1);
        // spawn.spawnOrbitals(me, radius + 50 + 100 * Math.random())
        for (let i = 0, len = 2 + 0.3 * Math.sqrt(simulation.difficulty); i < len; i++) spawn.spawnOrbitals(me, radius + 40 + 10 * i, 1);
        // me.onHit = function() { };
        // spawn.shield(me, x, y, 1);  //not working, not sure why
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.laserInterval = 100
        me.do = function () {
            // this.armor();
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();

            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));

                //rotate towards fireAngle
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.4;
                if (c > threshold) {
                    this.torque += 0.000004 * this.inertia;
                } else if (c < -threshold) {
                    this.torque -= 0.000004 * this.inertia;
                }
                if (simulation.cycle % this.laserInterval > this.laserInterval / 2) {
                    const seeRange = 8000;
                    best = {
                        x: null,
                        y: null,
                        dist2: Infinity,
                        who: null,
                        v1: null,
                        v2: null
                    };
                    const look = { x: this.position.x + seeRange * Math.cos(this.angle), y: this.position.y + seeRange * Math.sin(this.angle) };
                    best = vertexCollision(this.position, look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);

                    // hitting player
                    if ((best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        const dmg = 0.006 * simulation.dmgScale;
                        m.damage(dmg);
                        //draw damage
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(best.x, best.y, dmg * 1500, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                    //draw beam
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath();
                    ctx.moveTo(this.vertices[1].x, this.vertices[1].y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 3;
                    ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.beginPath();
                    ctx.arc(this.vertices[1].x, this.vertices[1].y, 1 + 0.3 * (this.laserInterval - simulation.cycle % this.laserInterval), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                    ctx.fillStyle = color;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(this.vertices[1].x, this.vertices[1].y, 1 + 0.3 * (simulation.cycle % this.laserInterval), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }
        };
    },
    laserBombingBoss(x, y, radius = 80) {
        mobs.spawn(x, y, 3, radius, "rgb(0,235,255)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.damageReduction = 0.27

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.00055 * Math.sqrt(simulation.accelScale);
        me.seePlayerFreq = 30;
        me.memory = 420;
        me.restitution = 1;
        me.frictionAir = 0.05;
        me.frictionStatic = 0;
        me.friction = 0;
        me.lookTorque = 0.0000055 * (Math.random() > 0.5 ? -1 : 1) * (1 + 0.1 * Math.sqrt(simulation.difficulty))
        me.fireDir = { x: 0, y: 0 }
        Matter.Body.setDensity(me, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 200 + 300 * Math.random())
        me.onHit = function () { };
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.targetingCount = 0;
        me.targetingTime = 60 - Math.min(58, 3 * simulation.difficulty)
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();

            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));

                //rotate towards fireAngle
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.02;
                if (c > threshold) {
                    this.torque += 0.000004 * this.inertia;
                } else if (c < -threshold) {
                    this.torque -= 0.000004 * this.inertia;
                }

                const seeRange = 8000;
                best = {
                    x: null,
                    y: null,
                    dist2: Infinity,
                    who: null,
                    v1: null,
                    v2: null
                };
                const look = { x: this.position.x + seeRange * Math.cos(this.angle), y: this.position.y + seeRange * Math.sin(this.angle) };
                best = vertexCollision(this.position, look, m.isCloak ? [map] : [map, [playerBody, playerHead]]);

                // hitting player
                if (best.who === playerBody || best.who === playerHead) {
                    this.targetingCount++
                    if (this.targetingCount > this.targetingTime) {
                        this.targetingCount -= 10;
                        const sub = Vector.sub(player.position, this.position)
                        const dist = Vector.magnitude(sub)
                        const speed = Math.min(55, 5 + 20 * simulation.accelScale)
                        const velocity = Vector.mult(Vector.normalise(sub), speed)
                        spawn.grenade(this.vertices[1].x, this.vertices[1].y, dist / speed, Math.min(550, 250 + simulation.difficulty * 3), 6); //    grenade(x, y, lifeSpan = 90 + Math.ceil(60 / simulation.accelScale), pulseRadius = Math.min(550, 250 + simulation.difficulty * 3), size = 4) {
                        Matter.Body.setVelocity(mob[mob.length - 1], velocity);
                    }
                } else if (this.targetingCount > 0) {
                    this.targetingCount--
                }
                //draw beam
                if (best.dist2 === Infinity) best = look;
                // ctx.beginPath();
                // ctx.moveTo(this.vertices[1].x, this.vertices[1].y);
                // ctx.lineTo(best.x, best.y);
                // ctx.strokeStyle = "rgba(0,235,255,0.5)";
                // ctx.lineWidth = 3// + 0.1 * this.targetingCount;
                // ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                // ctx.stroke();
                // ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(this.vertices[1].x, this.vertices[1].y);
                ctx.lineTo(best.x, best.y);
                ctx.strokeStyle = "rgba(0,235,255,1)";
                ctx.lineWidth = 3
                ctx.stroke();
                if (this.targetingCount / this.targetingTime > 0.33) {
                    ctx.strokeStyle = "rgba(0,235,255,0.45)";
                    ctx.lineWidth = 10
                    ctx.stroke();
                    if (this.targetingCount / this.targetingTime > 0.66) {
                        ctx.strokeStyle = "rgba(0,235,255,0.25)";
                        ctx.lineWidth = 30
                        ctx.stroke();
                    }
                }

                // ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                // ctx.setLineDash([]);
            }
        };
    },
    blinkBoss(x, y) {
        mobs.spawn(x, y, 5, 50, "rgb(0,235,255)"); //"rgb(221,102,119)"
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, Math.PI * 0.1);
        Matter.Body.setDensity(me, 0.002); //extra dense //normal is 0.001 //makes effective life much larger
        me.isBoss = true;
        me.damageReduction = 0.038

        me.frictionStatic = 0;
        me.friction = 0;
        me.memory = 240
        me.seePlayerFreq = 55
        me.blinkRange = 250
        if (0.5 < Math.random()) {
            me.grenadeDelay = 260
            me.blinkRange *= 1.5
        } else {
            me.grenadeDelay = 100
        }
        me.pulseRadius = 1.5 * Math.min(550, 200 + simulation.difficulty * 2)
        me.delay = 55 + 35 * simulation.CDScale;
        me.nextBlinkCycle = me.delay;
        spawn.shield(me, x, y, 1);
        me.onDamage = function () {
            // this.cd = simulation.cycle + this.delay;
        };
        me.onDeath = function () {
            const offAngle = Math.PI * Math.random()
            for (let i = 0, len = 3; i < len; i++) {
                spawn.grenade(this.position.x, this.position.y, this.grenadeDelay);
                const who = mob[mob.length - 1]
                const speed = 5 * simulation.accelScale;
                const angle = 2 * Math.PI * i / len + offAngle
                Matter.Body.setVelocity(who, {
                    x: speed * Math.cos(angle),
                    y: speed * Math.sin(angle)
                });
            }
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        }
        me.do = function () {
            this.seePlayerByHistory(40)
            if (this.nextBlinkCycle < simulation.cycle && this.seePlayer.yes) { //teleport towards the player
                this.nextBlinkCycle = simulation.cycle + this.delay;
                const dist = Vector.sub(this.seePlayer.position, this.position);
                const distMag = Vector.magnitude(dist);
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                if (distMag < this.blinkRange) { //if player is inside teleport range
                    Matter.Body.setPosition(this, this.seePlayer.position);
                } else {
                    Matter.Body.translate(this, Vector.mult(Vector.normalise(dist), this.blinkRange));
                }
                spawn.grenade(this.position.x, this.position.y, this.grenadeDelay, this.pulseRadius); //spawn at new location
                ctx.lineTo(this.position.x, this.position.y);
                ctx.lineWidth = this.radius * 2.1;
                ctx.strokeStyle = this.fill; //"rgba(0,0,0,0.5)"; //'#000'
                ctx.stroke();
                Matter.Body.setVelocity(this, { x: 0, y: 0 });
                this.torque += (0.00004 + 0.00003 * Math.random()) * this.inertia * (Math.round(Math.random()) * 2 - 1) //randomly spin around after firing
            }
            this.checkStatus();
        };
    },
    snakeBoss(x, y) {
        mobs.spawn(x, y, 0, 25, `rgba(255,0,200)`); //"rgb(221,102,119)"
        let me = mob[mob.length - 1];
        me.stroke = "transparent"; //used for drawGhost
        me.isUnblockable = true;
        Matter.Body.setDensity(me, 0.033); //extra dense //normal is 0.001 //makes effective life much larger
        me.isBoss = true;
        me.damageReduction = 0.5
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0
        me.history = []
        for (let i = 0; i < 20; i++) {
            me.history.push({ x: me.position.x + i, y: me.position.y })
        }
        me.frictionStatic = 0;
        me.friction = 0;
        me.memory = 900;
        me.seePlayerFreq = 41
        me.delay = 5 + 2 * simulation.CDScale;//8 + 3 * simulation.CDScale;
        me.nextBlinkCycle = me.delay;
        me.JumpDistance = 0//set in redMode()
        // spawn.shield(me, x, y, 1);
        me.collisionFilter.mask = cat.bullet | cat.map | cat.body  //cat.player |
        me.powerUpNames = []
        me.redMode = function () {
            this.color = `rgba(255,0,200,`
            this.fill = this.color + '1)'
            this.JumpDistance = 20
            let cycle = () => {
                if (this.radius < 25) {
                    if (m.alive && this.JumpDistance === 20) requestAnimationFrame(cycle);
                    if (!simulation.paused && !simulation.isChoosing) {
                        const scale = 1.01;
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale;
                    }
                }
            }
            requestAnimationFrame(cycle);
        }
        me.redMode();
        me.blueMode = function () {
            this.color = `rgba(0,0,255,`//`rgba(255,0,200,`
            this.fill = this.color + '1)'
            this.JumpDistance = 37 //adjust this number in the IF below
            let cycle = () => {
                if (this.radius > 14) {
                    if (m.alive && this.JumpDistance === 37) requestAnimationFrame(cycle);
                    if (!simulation.paused && !simulation.isChoosing) {
                        const scale = 0.96;
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale;
                    }
                }
            }
            requestAnimationFrame(cycle);
        }
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.invulnerableCount = 240
                this.isInvulnerable = true
                this.damageReduction = 0
                if (this.history.length < 200) for (let i = 0; i < 11; i++) this.history.unshift(this.history[0])
                this.blueMode()
            }
        };
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)

            //respawn all eaten power ups
            let i = 0
            let cycle = () => {
                if (i < this.powerUpNames.length) {
                    if (m.alive) requestAnimationFrame(cycle);
                    if (!simulation.paused && !simulation.isChoosing && powerUp.length < 300) {
                        const index = Math.floor(Math.random() * this.history.length) //random segment of tail
                        const where = { x: this.history[index].x + 25 * (Math.random() - 0.5), y: this.history[index].y + 25 * (Math.random() - 0.5) }
                        powerUps.spawn(where.x, where.y, this.powerUpNames[i]);
                        i++
                    }
                }
            }
            requestAnimationFrame(cycle);
        }
        me.do = function () {
            const color = this.color + (0.35 + 0.25 * Math.random()) + ')'
            //check for player collisions in between each segment
            if (m.immuneCycle < m.cycle) {
                for (let i = 0; i < this.history.length - 1; i++) {
                    if (Matter.Query.ray([player], this.history[i], this.history[i + 1], 10).length > 0) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60
                        const dmg = 0.15 * simulation.dmgScale
                        m.damage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: m.pos.x,
                            y: m.pos.y,
                            radius: dmg * 1500,//30,
                            color: color,
                            time: 20
                        });

                        //reset tail length for a sec to prevent repeat damage
                        for (let i = 0, len = this.history.length; i < len; i++) {
                            this.history[i] = { x: this.position.x, y: this.position.y }
                        }
                        break
                    }
                }
            }

            if (this.nextBlinkCycle < simulation.cycle) { //teleport towards the player
                this.nextBlinkCycle = simulation.cycle + this.delay;
                if (this.isSlowed) this.nextBlinkCycle += this.delay
                if (this.isStunned) this.nextBlinkCycle += this.delay * 3

                //custom see player by history code
                let move = (target = this.seePlayer.position) => {
                    const dist = Vector.sub(target, this.position);

                    Matter.Body.translate(this, Vector.mult(Vector.normalise(dist), this.JumpDistance));
                    Matter.Body.setVelocity(this, { x: 0, y: 0 });
                    // Matter.Body.setAngle(this, 0);
                    Matter.Body.setAngularVelocity(this, 0)
                    //track previous locations for the tail
                    this.history.push({ x: this.position.x, y: this.position.y }) //add newest to end
                    this.history.shift() //remove first (oldest)
                }
                //look for close power ups in line of sight
                let close = {
                    dist: Infinity,
                    targetPos: null,
                    index: null,
                }
                for (let i = 0; i < powerUp.length; i++) {
                    if (Matter.Query.ray(map, this.position, powerUp[i].position).length === 0) {
                        const dist = Vector.magnitude(Vector.sub(this.position, powerUp[i].position))
                        if (dist < close.dist) {
                            close = {
                                dist: dist,
                                target: powerUp[i],
                                index: i,
                            }
                        }
                    }
                }
                if (close.dist < 3000) { //chase power ups if they are near
                    move(close.target.position)

                    //check if close to power up and eat it
                    if (close.dist < this.JumpDistance + 2 * this.radius) {
                        this.powerUpNames.push(close.target.name)  //save name to return power ups after this mob dies
                        Matter.Composite.remove(engine.world, close.target);
                        powerUp.splice(close.index, 1);
                        this.health = 1 //heal to full
                        //add more segments to tail
                        if (this.history.length < 200) for (let i = 0; i < 4; i++) this.history.unshift(this.history[0])
                        //draw pickup for a single cycle
                        ctx.beginPath();
                        ctx.moveTo(this.position.x, this.position.y);
                        ctx.lineTo(close.target.position.x, close.target.position.y);
                        ctx.strokeStyle = "#000"
                        ctx.lineWidth = 4
                        ctx.stroke();
                    }

                    //go eat blocks to heal?
                    // } else if (this.health < 0.6) {

                } else if (Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 && !m.isCloak) { //chase player
                    this.seePlayer.yes = true;
                    this.locatePlayer();
                    if (!this.seePlayer.yes) this.seePlayer.yes = true;
                    move()
                } else if (this.seePlayer.recall) { //chase player's history
                    this.lostPlayer();
                    if (m.isCloak) {
                        move(this.seePlayer.position) //go after where you last saw the player
                    } else {
                        for (let i = 0; i < 55; i++) { //if lost player lock onto a player location in history
                            let history = m.history[(m.cycle - 10 * i) % 600]
                            if (Matter.Query.ray(map, this.position, history.position).length === 0) {
                                move(history.position) //go after where you last saw the player
                                break
                            }
                        }
                    }
                }
            }
            this.checkStatus();
            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    this.redMode()
                }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            }
            //draw history
            ctx.beginPath();
            for (let i = 0, len = this.history.length; i < len; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y)
            }
            ctx.lineWidth = this.radius * 2;
            ctx.strokeStyle = color //"rgba(0,235,255,0.5)";
            ctx.stroke();
        };
    },
    pulsarBoss(x, y, radius = 90, isNonCollide = false) {
        mobs.spawn(x, y, 3, radius, "#a0f");
        let me = mob[mob.length - 1];
        if (isNonCollide) me.collisionFilter.mask = cat.bullet | cat.player
        setTimeout(() => { //fix mob in place, but allow rotation
            me.constraint = Constraint.create({
                pointA: {
                    x: me.position.x,
                    y: me.position.y
                },
                bodyB: me,
                stiffness: 0.0001,
                damping: 0.3
            });
            Composite.add(engine.world, me.constraint);
        }, 2000); //add in a delay in case the level gets flipped left right

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.radius *= 1.5
        me.vertices[1].x = me.position.x + Math.cos(me.angle) * me.radius; //make one end of the triangle longer
        me.vertices[1].y = me.position.y + Math.sin(me.angle) * me.radius;
        // me.homePosition = { x: x, y: y };
        me.fireCycle = 0
        me.fireTarget = { x: 0, y: 0 }
        me.pulseRadius = Math.min(500, 230 + simulation.difficulty * 3)
        me.fireDelay = Math.max(60, 150 - simulation.difficulty * 2)
        me.isFiring = false
        Matter.Body.setDensity(me, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
        me.isBoss = true;

        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 200 + 300 * Math.random(), 1)
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.onHit = function () { };
        me.do = function () {
            if (player.speed > 5) this.do = this.fire //don't attack until player moves
        }
        me.damageReduction = 0.29
        me.fire = function () {
            // this.armor();
            this.checkStatus();
            if (!this.isStunned) {
                if (this.isFiring) {
                    if (this.fireCycle > this.fireDelay) { //fire
                        this.isFiring = false
                        this.fireCycle = 0
                        this.torque += (0.00008 + 0.00007 * Math.random()) * this.inertia * (Math.round(Math.random()) * 2 - 1) //randomly spin around after firing
                        //is player in beam path
                        if (Matter.Query.ray([player], this.fireTarget, this.position).length) {
                            unit = Vector.mult(Vector.normalise(Vector.sub(this.vertices[1], this.position)), this.distanceToPlayer() - 100)
                            this.fireTarget = Vector.add(this.vertices[1], unit)
                        }
                        //damage player if in range
                        if (Vector.magnitude(Vector.sub(player.position, this.fireTarget)) < this.pulseRadius && m.immuneCycle < m.cycle) {
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage
                            m.damage(0.045 * simulation.dmgScale);
                        }
                        simulation.drawList.push({ //add dmg to draw queue
                            x: this.fireTarget.x,
                            y: this.fireTarget.y,
                            radius: this.pulseRadius,
                            color: "rgba(120,0,255,0.6)",
                            time: simulation.drawTime
                        });
                        ctx.beginPath();
                        ctx.moveTo(this.vertices[1].x, this.vertices[1].y)
                        ctx.lineTo(this.fireTarget.x, this.fireTarget.y)
                        ctx.lineWidth = 20;
                        ctx.strokeStyle = "rgba(120,0,255,0.3)";
                        ctx.stroke();
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = "rgba(120,0,255,1)";
                        ctx.stroke();
                    } else { //delay before firing
                        this.fireCycle++
                        //draw explosion outline
                        ctx.beginPath();
                        ctx.arc(this.fireTarget.x, this.fireTarget.y, this.pulseRadius, 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                        ctx.fillStyle = "rgba(120,0,255,0.07)";
                        ctx.fill();
                        //draw path from mob to explosion
                        ctx.beginPath();
                        ctx.moveTo(this.vertices[1].x, this.vertices[1].y)
                        ctx.lineTo(this.fireTarget.x, this.fireTarget.y)
                        ctx.setLineDash([40 * Math.random(), 200 * Math.random()]);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgba(120,0,255,0.3)";
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                } else { //aim at player
                    this.fireCycle++
                    //if cloaked, aim at player's history from 3 seconds ago
                    const whereIsPlayer = m.isCloak ? m.history[(m.cycle - 180) % 600].position : m.pos
                    this.fireDir = Vector.normalise(Vector.sub(whereIsPlayer, this.position)); //set direction to turn to fire
                    //rotate towards fireAngle
                    const angle = this.angle + Math.PI / 2;
                    const c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                    const threshold = 0.04;
                    if (c > threshold) {
                        this.torque += 0.0000015 * this.inertia;
                    } else if (c < -threshold) {
                        this.torque -= 0.0000015 * this.inertia;
                    } else if (this.fireCycle > 45) { //fire
                        unit = Vector.mult(Vector.normalise(Vector.sub(this.vertices[1], this.position)), this.distanceToPlayer() - 100)
                        this.fireTarget = Vector.add(this.vertices[1], unit)
                        if (Vector.magnitude(Vector.sub(whereIsPlayer, this.fireTarget)) < 1000) { //if's possible for this to be facing 180 degrees away from the player, this makes sure that doesn't occur
                            Matter.Body.setAngularVelocity(this, 0)
                            this.fireLockCount = 0
                            this.isFiring = true
                            this.fireCycle = 0
                        }
                    }
                }
                //gently return to starting location
                // const sub = Vector.sub(this.homePosition, this.position)
                // const dist = Vector.magnitude(sub)
                // if (dist > 250) this.force = Vector.mult(Vector.normalise(sub), this.mass * 0.0002)
            } else {
                this.isFiring = false
            }
        };
    },
    pulsar(x, y, radius = 40) {
        mobs.spawn(x, y, 3, radius, "#f08");
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.radius *= 2
        // me.frictionAir = 0.02

        me.vertices[1].x = me.position.x + Math.cos(me.angle) * me.radius; //make one end of the triangle longer
        me.vertices[1].y = me.position.y + Math.sin(me.angle) * me.radius;
        // me.homePosition = { x: x, y: y };
        Matter.Body.setDensity(me, 0.002); //extra dense //normal is 0.001 //makes effective life much larger
        me.fireCycle = Infinity
        me.fireTarget = { x: 0, y: 0 }
        me.pulseRadius = Math.min(400, 170 + simulation.difficulty * 3)
        me.fireDelay = Math.max(75, 140 - simulation.difficulty * 0.5)
        me.isFiring = false
        spawn.shield(me, x, y);
        me.onHit = function () { };
        me.canSeeTarget = function () {
            const angle = this.angle + Math.PI / 2;
            const dot = Vector.dot({
                x: Math.cos(angle),
                y: Math.sin(angle)
            }, Vector.normalise(Vector.sub(this.fireTarget, this.position)));
            //distance between the target and the player's location
            if (
                // m.isCloak ||
                dot > 0.03 || // not looking at target
                Matter.Query.ray(map, this.fireTarget, this.position).length || Matter.Query.ray(body, this.fireTarget, this.position).length || //something blocking line of sight
                Vector.magnitude(Vector.sub(m.pos, this.fireTarget)) > 1000 // distance from player to target is very far,  (this is because dot product can't tell if facing 180 degrees away)
            ) {
                this.isFiring = false
                return false
            } else {
                return true
            }
        }
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            if (this.seePlayer.recall) {
                if (this.isFiring) {
                    if (this.fireCycle > this.fireDelay) { //fire
                        if (!this.canSeeTarget()) return
                        this.isFiring = false
                        this.fireCycle = 0
                        this.torque += (0.00002 + 0.0002 * Math.random()) * this.inertia * (Math.round(Math.random()) * 2 - 1) //randomly spin around after firing
                        //is player in beam path
                        if (Matter.Query.ray([player], this.fireTarget, this.position).length) {
                            unit = Vector.mult(Vector.normalise(Vector.sub(this.vertices[1], this.position)), this.distanceToPlayer() - 100)
                            this.fireTarget = Vector.add(this.vertices[1], unit)
                        }
                        //damage player if in range
                        if (Vector.magnitude(Vector.sub(player.position, this.fireTarget)) < this.pulseRadius && m.immuneCycle < m.cycle) {
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage
                            m.damage(0.03 * simulation.dmgScale);
                        }
                        simulation.drawList.push({ //add dmg to draw queue
                            x: this.fireTarget.x,
                            y: this.fireTarget.y,
                            radius: this.pulseRadius,
                            color: "rgba(255,0,100,0.6)",
                            time: simulation.drawTime
                        });
                        ctx.beginPath();
                        ctx.moveTo(this.vertices[1].x, this.vertices[1].y)
                        ctx.lineTo(this.fireTarget.x, this.fireTarget.y)
                        ctx.lineWidth = 20;
                        ctx.strokeStyle = "rgba(255,0,100,0.3)";
                        ctx.stroke();
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = "rgba(255,0,100,1)";
                        ctx.stroke();
                    } else { //delay before firing
                        this.fireCycle++
                        if (!(simulation.cycle % 3)) {
                            if (!this.canSeeTarget()) return //if can't see stop firing
                        }
                        //draw explosion outline
                        ctx.beginPath();
                        ctx.arc(this.fireTarget.x, this.fireTarget.y, this.pulseRadius, 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                        ctx.fillStyle = "rgba(255,0,100,0.07)";
                        ctx.fill();
                        //draw path from mob to explosion
                        ctx.beginPath();
                        ctx.moveTo(this.vertices[1].x, this.vertices[1].y)
                        ctx.lineTo(this.fireTarget.x, this.fireTarget.y)
                        ctx.setLineDash([40 * Math.random(), 200 * Math.random()]);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgba(255,0,100,0.3)";
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                } else { //aim at player
                    this.fireCycle++
                    // this.fireDir = ; //set direction to turn to fire
                    const angle = this.angle + Math.PI / 2;
                    const dot = Vector.dot({
                        x: Math.cos(angle),
                        y: Math.sin(angle)
                    }, Vector.normalise(Vector.sub(this.seePlayer.position, this.position)))
                    const threshold = 0.04;
                    if (dot > threshold) { //rotate towards fireAngle
                        this.torque += 0.0000015 * this.inertia;
                    } else if (dot < -threshold) {
                        this.torque -= 0.0000015 * this.inertia;
                    } else if (this.fireCycle > 60) { // aim
                        unit = Vector.mult(Vector.normalise(Vector.sub(this.vertices[1], this.position)), this.distanceToPlayer() - 100)
                        this.fireTarget = Vector.add(this.vertices[1], unit)
                        if (!this.canSeeTarget()) return
                        Matter.Body.setAngularVelocity(this, 0)
                        this.fireLockCount = 0
                        this.isFiring = true
                        this.fireCycle = 0
                    }
                }
                //gently return to starting location
                // const sub = Vector.sub(this.homePosition, this.position)
                // const dist = Vector.magnitude(sub)
                // if (dist > 350) this.force = Vector.mult(Vector.normalise(sub), this.mass * 0.0002)
            } else {
                this.isFiring = false
            }
        };
    },
    laserLayer(x, y, radius = 18 + Math.floor(6 * Math.random())) {
        const color = "#f09"
        mobs.spawn(x, y, 4, radius, color);
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        for (let i = 0; i < 4; i += 2) {
            let spike = Vector.mult(Vector.normalise(Vector.sub(me.vertices[i], me.position)), radius * 2)
            me.vertices[i].x = me.position.x + spike.x
            me.vertices[i].y = me.position.y + spike.y
        }
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.0002 * simulation.accelScale;
        spawn.shield(me, x, y);

        me.laserArray = [] //keeps track of static laser beams
        me.laserLimit = simulation.difficultyMode < 3 ? 1 : 2
        me.fireDelay = Math.max(75, 140 - simulation.difficulty * 0.5)
        me.cycle = 0
        me.laserDelay = 150 + Math.floor(Math.random() * 120)
        me.addLaser = function () {
            if (this.cycle > this.laserDelay) {
                this.cycle = 0
                const seeRange = 6000;
                const angle = this.angle + Math.PI / 4
                const v1 = { x: this.position.x + seeRange * Math.cos(angle), y: this.position.y + seeRange * Math.sin(angle) };
                const v2 = { x: this.position.x + seeRange * Math.cos(angle + Math.PI), y: this.position.y + seeRange * Math.sin(angle + Math.PI) };
                //find where v1,v2 hit walls and make them stop there
                let best1 = vertexCollision(this.position, v1, [map]);
                let best2 = vertexCollision(this.position, v2, [map]);
                if (best2.who === null) {
                    best2.x = v2.x
                    best2.y = v2.y
                }
                if (best1.who === null) { //if the path never hits the map , just stop at seeRange
                    best1.x = v1.x
                    best1.y = v1.y
                }
                if (best1.y > best2.y) { //make laser beams always fire from top to bottom so they are predicable, and not stopped by blocks on the ground
                    const save1X = best1.x
                    const save1Y = best1.y
                    best1.x = best2.x
                    best1.y = best2.y
                    best2.x = save1X
                    best2.y = save1Y
                }

                this.laserArray.push({ a: { x: best1.x, y: best1.y }, b: { x: best2.x, y: best2.y }, fade: 0 })
                //friction to animate the mob dropping something
                Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.05));
                Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.05)
                // simulation.drawList.push({ x: best1.x, y: best1.y, radius: 10, color: "rgba(255,0,100,0.3)", time: simulation.drawTime * 2 });
                // simulation.drawList.push({ x: best2.x, y: best2.y, radius: 10, color: "rgba(255,0,100,0.3)", time: simulation.drawTime * 2 });

                if (this.laserArray.length > this.laserLimit) this.laserArray.shift() //cap total laserArray
                if (!this.seePlayer.recall && (Vector.magnitude(Vector.sub(this.position, this.driftGoal)) < 200 || 0.3 > Math.random())) {
                    //used in drift when can't find player
                    const radius = Math.random() * 1000;
                    const angle = Math.random() * 2 * Math.PI;
                    this.driftGoal = Vector.add(this.driftCenter, { x: radius * Math.cos(angle), y: radius * Math.sin(angle) })
                }
            }
        }
        me.fireLaser = function () {
            for (let i = 0; i < this.laserArray.length; i++) { //fire all lasers in the array
                let best = vertexCollision(this.laserArray[i].a, this.laserArray[i].b, m.isCloak ? [body] : [body, [playerBody, playerHead]]); //not checking map to fix not hitting player bug, this might make some lasers look strange when the map changes
                if (this.laserArray[i].fade > 0.99) {
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) { // hitting player
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage after getting hit
                        const dmg = 0.03 * simulation.dmgScale;
                        m.damage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: dmg * 1500,
                            color: "rgba(255,0,100,0.5)",
                            time: 20
                        });
                        this.laserArray.splice(i, 1) //remove this laser node
                        if (this.distanceToPlayer < 1000) {                         //mob jumps away from player
                            const forceMag = 0.03 * this.mass;
                            const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                            this.force.x -= 2 * forceMag * Math.cos(angle);
                            this.force.y -= 2 * forceMag * Math.sin(angle); // - 0.0007 * this.mass; //antigravity
                        }
                    } else if (best.who && best.who.classType === "body") { //hitting block
                        ctx.beginPath();
                        ctx.moveTo(best.x, best.y);
                        ctx.lineTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                        ctx.strokeStyle = `rgb(255,0,100)`;
                        ctx.lineWidth = 2;
                        ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    } else { //hitting nothing
                        ctx.beginPath();
                        ctx.moveTo(this.laserArray[i].b.x, this.laserArray[i].b.y);
                        ctx.lineTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                        ctx.strokeStyle = `rgb(255,0,100)`;
                        ctx.lineWidth = 2;
                        ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                } else {//fade in warning
                    this.laserArray[i].fade += 0.01
                    ctx.beginPath();
                    ctx.moveTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                    ctx.lineTo(this.laserArray[i].b.x, this.laserArray[i].b.y);
                    ctx.lineWidth = 2 + 40 - 40 * this.laserArray[i].fade;
                    ctx.strokeStyle = `rgba(255,0,100,${0.02 + 0.1 * this.laserArray[i].fade})`;
                    ctx.stroke();
                }
            }
        }
        me.driftCenter = { ...me.position }; //copy position with out reference so it doesn't change as mob moves
        const r = Math.random() * 100;
        const a = Math.random() * 2 * Math.PI;
        me.driftGoal = Vector.add(me.driftCenter, { x: r * Math.cos(a), y: r * Math.sin(a) }) //updated in addLaser()
        me.drift = function () {
            //accelerate towards the player
            if (this.seePlayer.recall) {
                const force = Vector.mult(Vector.normalise(Vector.sub(this.seePlayer.position, this.position)), this.accelMag * this.mass)
                this.force.x += force.x;
                this.force.y += force.y;
            } else { //drift
                const force = Vector.mult(Vector.normalise(Vector.sub(this.driftGoal, this.position)), 0.00002 * this.mass)
                // const force = Vector.mult(this.driftGoal, 0.0001 * this.mass)
                this.force.x += force.x;
                this.force.y += force.y;
            }
        }
        me.do = function () {
            this.cycle++
            this.torque = this.lookTorque * this.inertia * 0.6;
            this.seePlayerCheck();
            this.checkStatus();
            this.drift();
            //add new laser to lasers array
            this.addLaser()
            this.fireLaser()
            // if (this.seePlayer.recall) {
            //     //set direction to turn to fire
            //     if (!(simulation.cycle % this.seePlayerFreq)) this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
            // }
        };
    },
    laserLayerBoss(x, y, radius = 65) {
        const color = "#f09"
        mobs.spawn(x, y, 4, radius, color);
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        for (let i = 0; i < 4; i += 2) {
            let spike = Vector.mult(Vector.normalise(Vector.sub(me.vertices[i], me.position)), radius * 2)
            me.vertices[i].x = me.position.x + spike.x
            me.vertices[i].y = me.position.y + spike.y
        }
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.0001 * simulation.accelScale;
        me.isBoss = true;
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        Matter.Body.setDensity(me, 0.03); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.36
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.invulnerableCount = 90
                this.isInvulnerable = true
                this.damageReduction = 0
                this.laserDelay = 130
            }
        };
        me.laserArray = [] //keeps track of static laser beams
        me.laserLimit = 2 + (simulation.difficultyMode > 2) + (simulation.difficultyMode > 4)
        me.fireDelay = Math.max(75, 140 - simulation.difficulty * 0.5)
        me.cycle = 0
        me.laserDelay = 210
        me.addLaser = function () {
            if (this.cycle > this.laserDelay) {
                this.cycle = 0
                const seeRange = 6000;
                let add = (where, angle) => {
                    const v1 = { x: where.x + seeRange * Math.cos(angle), y: where.y + seeRange * Math.sin(angle) };
                    const v2 = { x: where.x + seeRange * Math.cos(angle + Math.PI), y: where.y + seeRange * Math.sin(angle + Math.PI) };
                    //find where v1,v2 hit walls and make them stop there
                    let best1 = vertexCollision(where, v1, [map]);
                    let best2 = vertexCollision(where, v2, [map]);
                    if (best2.who === null) {
                        best2.x = v2.x
                        best2.y = v2.y
                    }
                    if (best1.who === null) { //if the path never hits the map , just stop at seeRange
                        best1.x = v1.x
                        best1.y = v1.y
                    }
                    if (best1.y > best2.y) { //make laser beams always fire from top to bottom so they are predicable, and not stopped by blocks on the ground
                        const save1X = best1.x
                        const save1Y = best1.y
                        best1.x = best2.x
                        best1.y = best2.y
                        best2.x = save1X
                        best2.y = save1Y
                    }
                    this.laserArray.push({ a: { x: best1.x, y: best1.y }, b: { x: best2.x, y: best2.y }, fade: 0 })
                }
                // add(m.pos, m.angle)
                add(m.pos, this.angle + Math.PI / 4 + Math.PI / 2)
                add(this.position, this.angle + Math.PI / 4)
                //friction to animate the mob dropping something
                Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.05));
                Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.05)
                if (!this.seePlayer.recall && (Vector.magnitude(Vector.sub(this.position, this.driftGoal)) < 200 || 0.3 > Math.random())) {
                    //used in drift when can't find player
                    const radius = Math.random() * 1000;
                    const angle = Math.random() * 2 * Math.PI;
                    this.driftGoal = Vector.add(this.driftCenter, { x: radius * Math.cos(angle), y: radius * Math.sin(angle) })
                }
            }
        }
        me.fireLaser = function () {
            for (let i = 0; i < this.laserArray.length; i++) { //fire all laserArray in the array
                let best = vertexCollision(this.laserArray[i].a, this.laserArray[i].b, m.isCloak ? [body] : [body, [playerBody, playerHead]]); //not checking map to fix not hitting player bug, this might make some lasers look strange when the map changes
                if (this.laserArray[i].fade > 0.99) {
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) { // hitting player
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage after getting hit
                        const dmg = 0.03 * simulation.dmgScale;
                        m.damage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: dmg * 1500,
                            color: "rgba(255,0,100,0.5)",
                            time: 20
                        });
                        this.laserArray.splice(i, 1) //remove this laser node
                        if (this.distanceToPlayer < 1000) {                         //mob jumps away from player
                            const forceMag = 0.03 * this.mass;
                            const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                            this.force.x -= 2 * forceMag * Math.cos(angle);
                            this.force.y -= 2 * forceMag * Math.sin(angle); // - 0.0007 * this.mass; //antigravity
                        }
                    } else if (best.who && best.who.classType === "body") { //hitting block
                        ctx.beginPath();
                        ctx.moveTo(best.x, best.y);
                        ctx.lineTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                        ctx.strokeStyle = `rgb(255,0,100)`;
                        ctx.lineWidth = 2;
                        ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    } else { //hitting nothing
                        ctx.beginPath();
                        ctx.moveTo(this.laserArray[i].b.x, this.laserArray[i].b.y);
                        ctx.lineTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                        ctx.strokeStyle = `rgb(255,0,100)`;
                        ctx.lineWidth = 2;
                        ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                } else {//fade in warning
                    this.laserArray[i].fade += 0.007
                    ctx.beginPath();
                    ctx.moveTo(this.laserArray[i].a.x, this.laserArray[i].a.y);
                    ctx.lineTo(this.laserArray[i].b.x, this.laserArray[i].b.y);
                    ctx.lineWidth = 2 + 40 - 40 * this.laserArray[i].fade;
                    ctx.strokeStyle = `rgba(255,0,100,${0.02 + 0.1 * this.laserArray[i].fade})`;
                    ctx.stroke();
                    if (this.laserArray[i].fade > 0.99) {
                        this.laserArray[i].fade = 1;
                        if (this.laserArray.length > this.laserLimit) this.laserArray.shift() //cap total lasers
                        break
                    }
                }
            }
        }
        me.driftCenter = { ...me.position }; //copy position with out reference so it doesn't change as mob moves
        const r = Math.random() * 100;
        const a = Math.random() * 2 * Math.PI;
        me.driftGoal = Vector.add(me.driftCenter, { x: r * Math.cos(a), y: r * Math.sin(a) }) //updated in addLaser()
        me.drift = function () {
            //accelerate towards the player
            if (this.seePlayer.recall) {
                const force = Vector.mult(Vector.normalise(Vector.sub(this.seePlayer.position, this.position)), this.accelMag * this.mass)
                this.force.x += force.x;
                this.force.y += force.y;
            } else { //drift
                const force = Vector.mult(Vector.normalise(Vector.sub(this.driftGoal, this.position)), 0.00001 * this.mass)
                this.force.x += force.x;
                this.force.y += force.y;
            }
            this.torque = this.lookTorque * this.inertia * 0.9;
        }
        me.do = function () {
            this.cycle++
            this.seePlayerCheck();
            this.checkStatus();
            this.drift();
            //add new laser to lasers array
            this.addLaser()
            this.fireLaser()
            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            }
        };
    },
    laser(x, y, radius = 30) {
        const color = "#f00"
        mobs.spawn(x, y, 3, radius, color);
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        Matter.Body.rotate(me, Math.random() * Math.PI * 2);
        me.accelMag = 0.0001 * simulation.accelScale;
        me.laserInterval = 100
        Matter.Body.setDensity(me, 0.0015); //extra dense //normal is 0.001 //makes effective life much larger
        spawn.shield(me, x, y);
        me.onHit = function () {
            //run this function on hitting player
            // this.explode();
        };
        me.do = function () {
            this.torque = this.lookTorque * this.inertia * 0.5;
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();
            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));

                if (simulation.cycle % this.laserInterval > this.laserInterval / 2) {
                    const seeRange = 8000;
                    let best = {
                        x: null,
                        y: null,
                        dist2: Infinity,
                        who: null,
                        v1: null,
                        v2: null
                    };
                    const look = { x: this.position.x + seeRange * Math.cos(this.angle), y: this.position.y + seeRange * Math.sin(this.angle) };
                    best = vertexCollision(this.position, look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);

                    // hitting player
                    if ((best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        const dmg = 0.003 * simulation.dmgScale;
                        m.damage(dmg);
                        //draw damage
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(best.x, best.y, dmg * 1500, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                    //draw beam
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath();
                    ctx.moveTo(this.vertices[1].x, this.vertices[1].y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 3;
                    ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.beginPath();
                    ctx.arc(this.vertices[1].x, this.vertices[1].y, 1 + 0.3 * (this.laserInterval - simulation.cycle % this.laserInterval), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                    ctx.fillStyle = color;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(this.vertices[1].x, this.vertices[1].y, 1 + 0.3 * (simulation.cycle % this.laserInterval), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }
        };
    },
    laserBoss(x, y, radius = 30) {
        mobs.spawn(x, y, 3, radius, "#f00");
        let me = mob[mob.length - 1];
        setTimeout(() => { //fix mob in place, but allow rotation
            me.constraint = Constraint.create({
                pointA: { x: me.position.x, y: me.position.y },
                bodyB: me,
                stiffness: 1,
                damping: 1
            });
            Composite.add(engine.world, me.constraint);
        }, 2000); //add in a delay in case the level gets flipped left right
        me.count = 0;
        me.frictionAir = 0.03;
        // me.torque -= me.inertia * 0.002
        spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())
        Matter.Body.setDensity(me, 0.03); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.25
        me.isBoss = true;
        // spawn.shield(me, x, y, 1);  //not working, not sure why
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.rotateVelocity = Math.min(0.0045, 0.0015 * simulation.accelScale * simulation.accelScale) * (level.levelsCleared > 8 ? 1 : -1) * (simulation.isHorizontalFlipped ? -1 : 1)
        me.do = function () {
            this.fill = '#' + Math.random().toString(16).substr(-6); //flash colors
            this.checkStatus();
            if (!this.isStunned) {
                //check if slowed
                let slowed = false
                for (let i = 0; i < this.status.length; i++) {
                    if (this.status[i].type === "slow") {
                        slowed = true
                        break
                    }
                }
                if (!slowed) {
                    this.count++
                    Matter.Body.setAngle(this, this.count * this.rotateVelocity)
                    Matter.Body.setAngularVelocity(this, 0)
                }
                ctx.beginPath();
                this.laserArray(this.vertices[0], this.angle + Math.PI / 3);
                this.laserArray(this.vertices[1], this.angle + Math.PI);
                this.laserArray(this.vertices[2], this.angle - Math.PI / 3);
                ctx.strokeStyle = "#50f";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
                ctx.lineWidth = 20;
                ctx.strokeStyle = "rgba(80,0,255,0.07)";
                ctx.stroke(); // Draw it
            }
        };
        me.laserArray = function (where, angle) {
            const seeRange = 7000;
            best = {
                x: null,
                y: null,
                dist2: Infinity,
                who: null,
                v1: null,
                v2: null
            };
            const look = { x: where.x + seeRange * Math.cos(angle), y: where.y + seeRange * Math.sin(angle) };
            best = vertexCollision(where, look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);

            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60; //player is immune to damage for an extra second
                const dmg = 0.14 * simulation.dmgScale;
                m.damage(dmg);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: dmg * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            //draw beam
            if (best.dist2 === Infinity) best = look;
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
        }
    },
    stabber(x, y, radius = 25 + Math.ceil(Math.random() * 12), spikeMax = 7) {
        if (radius > 80) radius = 65;
        mobs.spawn(x, y, 6, radius, "rgb(220,50,205)"); //can't have sides above 6 or collision events don't work (probably because of a convex problem)
        let me = mob[mob.length - 1];
        me.isVerticesChange = true
        me.accelMag = 0.0006 * simulation.accelScale;
        // me.g = 0.0002; //required if using this.gravity
        me.delay = 360 * simulation.CDScale;
        me.spikeVertex = 0;
        me.spikeLength = 0;
        me.isSpikeGrowing = false;
        me.spikeGrowth = 0;
        me.isSpikeReset = true;
        me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.player //can't touch other mobs
        Matter.Body.rotate(me, Math.PI * 0.1);
        spawn.shield(me, x, y);
        me.onDeath = function () {
            if (this.spikeLength > 4) {
                this.spikeLength = 4
                const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), this.radius * this.spikeLength)
                this.vertices[this.spikeVertex].x = this.position.x + spike.x
                this.vertices[this.spikeVertex].y = this.position.y + spike.y
                // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
            }
        };
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.attraction();
            if (this.isSpikeReset) {
                if (this.seePlayer.recall) {
                    const dist = Vector.sub(this.seePlayer.position, this.position);
                    const distMag = Vector.magnitude(dist);
                    if (distMag < radius * spikeMax) {
                        //find nearest vertex
                        let nearestDistance = Infinity
                        for (let i = 0, len = this.vertices.length; i < len; i++) {
                            //find distance to player for each vertex
                            const dist = Vector.sub(this.seePlayer.position, this.vertices[i]);
                            const distMag = Vector.magnitude(dist);
                            //save the closest distance
                            if (distMag < nearestDistance) {
                                this.spikeVertex = i
                                nearestDistance = distMag
                            }
                        }
                        this.spikeLength = 1
                        this.isSpikeGrowing = true;
                        this.isSpikeReset = false;
                        Matter.Body.setAngularVelocity(this, 0)
                    }
                }
            } else {
                if (this.isSpikeGrowing) {
                    this.spikeLength += Math.pow(this.spikeGrowth += 0.02, 8)
                    if (this.spikeLength > spikeMax) {
                        this.isSpikeGrowing = false;
                        this.spikeGrowth = 0
                    }
                } else {
                    Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.8) //reduce rotation
                    this.spikeLength -= 0.3
                    if (this.spikeLength < 1) {
                        this.spikeLength = 1
                        this.isSpikeReset = true
                        this.radius = radius
                    }
                }
                const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), radius * this.spikeLength)
                this.vertices[this.spikeVertex].x = this.position.x + spike.x
                this.vertices[this.spikeVertex].y = this.position.y + spike.y
                // this.radius = radius * this.spikeLength;
            }
        };
    },
    striker(x, y, radius = 14 + Math.ceil(Math.random() * 25)) {
        mobs.spawn(x, y, 5, radius, "rgb(221,102,119)");
        let me = mob[mob.length - 1];
        me.accelMag = 0.00034 * simulation.accelScale;
        me.g = 0.00015; //required if using this.gravity
        me.frictionStatic = 0;
        me.friction = 0;
        me.delay = 30 + 60 * simulation.CDScale;
        me.cd = Infinity;
        me.strikeRange = 300
        Matter.Body.rotate(me, Math.PI * 0.1);
        spawn.shield(me, x, y);
        me.onDamage = function () {
            this.cd = simulation.cycle + this.delay;
        };
        me.do = function () {
            this.gravity();
            if (!(simulation.cycle % this.seePlayerFreq)) { // this.seePlayerCheck();  from mobs
                if (
                    this.distanceToPlayer2() < this.seeAtDistance2 &&
                    Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                    // Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0 &&
                    !m.isCloak
                ) {
                    this.foundPlayer();
                    if (this.cd === Infinity) this.cd = simulation.cycle + this.delay * 0.7;
                } else if (this.seePlayer.recall) {
                    this.lostPlayer();
                    this.cd = Infinity
                }
            }
            this.checkStatus();
            this.attraction();
            if (this.cd < simulation.cycle && this.seePlayer.recall) {
                const dist = Vector.sub(this.seePlayer.position, this.position);
                const distMag = Vector.magnitude(dist);
                this.cd = simulation.cycle + this.delay;
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                if (distMag < 400) {
                    Matter.Body.translate(this, Vector.mult(Vector.normalise(dist), distMag - 20 - radius));
                } else {
                    Matter.Body.translate(this, Vector.mult(Vector.normalise(dist), this.strikeRange));
                }
                ctx.lineTo(this.position.x, this.position.y);
                ctx.lineWidth = radius * 2.1;
                ctx.strokeStyle = this.fill; //"rgba(0,0,0,0.5)"; //'#000'
                ctx.stroke();
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x * 0.5,
                    y: this.velocity.y * 0.5
                });
            }
        };
    },
    revolutionBoss(x, y, radius = 70) {
        const sides = 9 + Math.floor(Math.min(12, 0.2 * simulation.difficulty))
        const coolBends = [-1.8, 0, 0, 0.9, 1.2]
        const bendFactor = coolBends[Math.floor(Math.random() * coolBends.length)];
        mobs.spawn(x, y, sides, radius, "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.accelMag = 0.00018 + 0.00018 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.01;
        me.swordRadiusMax = 400 + 10 * simulation.difficulty;
        me.laserAngle = 0;
        me.swordDamage = 0.025 * simulation.dmgScale //0.033 * simulation.dmgScale; previous      //0.14 * simulation.dmgScale;laserBoss

        // spawn.shield(me, x, y, 1);
        Matter.Body.setDensity(me, 0.005); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.13
        me.isBoss = true;
        me.onDamage = function () { };
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };

        //invulnerability every 1/4 fraction of life lost
        //required setup for invulnerable
        me.isInvulnerable = false
        me.isNextInvulnerability = 0.75
        me.invulnerabilityCountDown = 0
        me.invulnerable = function () {
            if (this.health < this.isNextInvulnerability) {
                this.isNextInvulnerability = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.isInvulnerable = true
                this.startingDamageReduction = this.damageReduction
                this.damageReduction = 0
                this.invulnerabilityCountDown = 106
            }
            if (this.isInvulnerable) {
                if (this.invulnerabilityCountDown > 0) {
                    this.invulnerabilityCountDown--
                    //draw invulnerability
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                } else {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
            }
        }
        me.do = function () {
            this.invulnerable();
            this.checkStatus();
            this.seePlayerByHistory(60);
            this.attraction();
            //traveling laser
            this.laserAngle += this.isInvulnerable ? 0.025 : 0.006
            for (let i = 0, len = this.vertices.length; i < len; i++) {
                // this.laserSword(this.vertices[1], this.angle + laserAngle);
                const bend = bendFactor * Math.cos(this.laserAngle + 2 * Math.PI * i / len)
                const long = this.swordRadiusMax * Math.sin(this.laserAngle + 2 * Math.PI * i / len)
                if (long > 0) this.laserSword(this.vertices[i], bend + this.angle + (i + 0.5) / sides * 2 * Math.PI, Math.abs(long));
            }
        };
        me.laserSword = function (where, angle, length) {
            best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
            const look = { x: where.x + length * Math.cos(angle), y: where.y + length * Math.sin(angle) };
            best = vertexCollision(where, look, [map, [playerBody, playerHead]]);
            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for an extra second
                m.damage(this.swordDamage);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: this.swordDamage * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            if (best.dist2 === Infinity) best = look;
            ctx.beginPath(); //draw beam
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
            ctx.strokeStyle = "rgba(100,100,255,0.1)"; // Purple path
            ctx.lineWidth = 10;
            ctx.stroke();
            ctx.strokeStyle = "rgba(100,100,255,0.5)"; // Purple path
            ctx.lineWidth = 2;
            // ctx.stroke();
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
        }
    },
    sprayBoss(x, y, radius = 40, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 16, radius, "rgb(255,255,255)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.isReactorBoss = true;
        me.inertia = Infinity; //no rotation
        me.burstFireFreq = 22 + Math.floor(13 * simulation.CDScale)
        me.burstTotalPhases = 3 + Math.floor(1.4 / simulation.CDScale)
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0;
        me.restitution = 1
        // spawn.spawnOrbitals(me, radius + 50 + 125 * Math.random(), 1)
        Matter.Body.setDensity(me, 0.002 + 0.00005 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.11
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.onDeath = function () {
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25

                this.phaseCycle = -2
                this.do = this.burstFire
                this.frictionAir = 1
                this.isInvulnerable = true
                this.damageReduction = 0
            }
        };

        //draw radial lines from verticies showing future bullet paths?
        me.radialLines = function () {
            ctx.beginPath();
            for (let i = 0, len = this.vertices.length; i < len; i++) {
                ctx.moveTo(this.vertices[i].x, this.vertices[i].y)
                const unit = Vector.add(Vector.mult(Vector.normalise(Vector.sub(this.vertices[i], this.position)), 1000), this.vertices[i])
                ctx.lineTo(unit.x, unit.y)
            }
            ctx.lineWidth = 10
            ctx.strokeStyle = "rgb(200,0,200,0.03)"
            ctx.stroke();
        }

        me.phaseCycle = 0
        me.normalDoStuff = function () {
            this.checkStatus();
            me.seePlayer.recall = 1
            //maintain speed //faster in the vertical to help avoid repeating patterns
            if (this.speed < 0.01) {
                Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(Vector.sub(player.position, this.position)), 0.1));
            } else {
                if (Math.abs(this.velocity.y) < 9) Matter.Body.setVelocity(this, { x: this.velocity.x, y: this.velocity.y * 1.03 });
                if (Math.abs(this.velocity.x) < 7) Matter.Body.setVelocity(this, { x: this.velocity.x * 1.03, y: this.velocity.y });
            }
        }
        me.burstFire = function () {
            this.normalDoStuff();
            this.radialLines()
            //draw invulnerable
            ctx.beginPath();
            let vertices = this.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.lineWidth = 13 + 5 * Math.random();
            ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
            ctx.stroke();

            if (!(simulation.cycle % this.burstFireFreq)) {
                this.phaseCycle++
                if (this.phaseCycle > this.burstTotalPhases) { //start spiral fire mode
                    // this.phaseCycle = -7
                    this.do = this.normalDoStuff
                    this.frictionAir = 0;
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    Matter.Body.setVelocity(this, Vector.rotate({ x: 20, y: 0 }, 2 * Math.PI * Math.random()));
                    if (this.isShielded) { //remove shield
                        for (let i = 0; i < mob.length; i++) {
                            if (mob[i].shield) mob[i].death()
                        }
                    }
                }
                if (this.phaseCycle > -1) {
                    Matter.Body.rotate(this, 0.02)
                    for (let i = 0, len = this.vertices.length; i < len; i++) { //fire a bullet from each vertex
                        spawn.sniperBullet(this.vertices[i].x, this.vertices[i].y, 3, 4);
                        const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[i])), -15)
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: velocity.x,
                            y: velocity.y
                        });
                    }
                }
            }
        };
        me.do = me.normalDoStuff
        Matter.Body.setVelocity(me, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) });
    },
    mineBoss(x, y, radius = 120, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 0, radius, "rgba(255,255,255,0.5)") // "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        // Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.isBoss = true;
        me.isReactorBoss = true;
        Matter.Body.setDensity(me, 0.001); //normal is 0.001
        me.damageReduction = 0.04
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0

        me.cycle = 0
        me.inertia = Infinity;
        me.frictionAir = 0.01
        me.restitution = 1
        me.friction = 0
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob
        me.explodeRange = 400
        Matter.Body.setVelocity(me, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) });
        me.seePlayer.recall = 1;
        // spawn.shield(me, x, y, 1);
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4
                this.invulnerableCount = 60 + simulation.difficulty * 1.5
                this.isInvulnerable = true
                this.damageReduction = 0

                //slow time to look cool
                // simulation.fpsCap = 10 //new fps
                // simulation.fpsInterval = 1000 / simulation.fpsCap;
                //how long to wait to return to normal fps
                // m.defaultFPSCycle = m.cycle + 20 + 90


                for (let i = 0, len = mob.length; i < len; ++i) { //trigger nearby mines
                    if (mob[i].isMine && Vector.magnitude(Vector.sub(this.position, mob[i].position)) < this.explodeRange) mob[i].isExploding = true
                }
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.explodeRange,
                    color: "rgba(255,25,0,0.6)",
                    time: simulation.drawTime * 2
                });

            }
        };
        me.onDeath = function () {
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            for (let i = 0, len = mob.length; i < len; ++i) { //trigger nearby mines
                if (mob[i].isMine && Vector.magnitude(Vector.sub(this.position, mob[i].position)) < this.explodeRange) mob[i].isExploding = true
            }
        };
        // console.log(me.mass) //100
        me.do = function () {
            me.seePlayer.recall = 1
            //maintain speed //faster in the vertical to help avoid repeating patterns
            if (this.speed < 0.01) {
                const unit = Vector.sub(player.position, this.position)
                Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(unit), 0.1));
                // this.invulnerableCount = 10 + simulation.difficulty * 0.5
                // this.isInvulnerable = true
                // this.damageReduction = 0
            } else {
                if (Math.abs(this.velocity.y) < 10) {
                    Matter.Body.setVelocity(this, { x: this.velocity.x, y: this.velocity.y * 1.03 });
                }
                if (Math.abs(this.velocity.x) < 7) {
                    Matter.Body.setVelocity(this, { x: this.velocity.x * 1.03, y: this.velocity.y });
                }
            }
            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            }
            this.checkStatus();
            if (!(simulation.cycle % 15) && mob.length < 360) spawn.mine(this.position.x, this.position.y)
        };
    },
    mine(x, y) {
        mobs.spawn(x, y, 8, 10, "rgb(255, 255, 255)"); //"rgb(100,170,150)" //"rgb(61, 125, 121)"
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        Matter.Body.setDensity(me, 0.0001); //normal is 0.001
        // Matter.Body.setStatic(me, true); //make static  (disables taking damage)
        me.frictionAir = 1
        me.damageReduction = 2
        me.collisionFilter.mask = cat.bullet //| cat.body
        // me.collisionFilter.category = cat.mobBullet;
        // me.collisionFilter.mask = cat.bullet | cat.body // | cat.player
        me.isMine = true
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.isUnstable = true; //dies when blocked
        me.showHealthBar = false;
        me.explodeRange = 210 + 140 * Math.random()
        me.isExploding = false
        me.countDown = Math.ceil(4 * Math.random())
        me.isInvulnerable = true //not actually invulnerable, just prevents block + ice-9 interaction

        // me.onHit = function() {
        //     this.isExploding = true
        // };
        // me.onDamage = function() {
        //     this.health = 1
        //     this.isExploding = true
        // };
        me.do = function () {
            this.checkStatus();

            if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) this.isExploding = true

            if (this.isExploding) {
                if (this.countDown-- < 0) { //explode
                    this.death();
                    //hit player
                    if (Vector.magnitude(Vector.sub(this.position, player.position)) < this.explodeRange && m.immuneCycle < m.cycle) {
                        m.damage(0.02 * simulation.dmgScale * (tech.isRadioactiveResistance ? 0.2 : 1));
                        m.energy -= 0.2 * (tech.isRadioactiveResistance ? 0.2 : 1)
                        if (m.energy < 0) m.energy = 0
                    }
                    // mob[i].isInvulnerable = false //make mineBoss not invulnerable ?
                    const range = this.explodeRange + 50 //mines get a slightly larger range to explode
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && Vector.magnitude(Vector.sub(this.position, mob[i].position)) < range) {
                            if (mob[i].isMine) mob[i].isExploding = true //explode other mines
                        }
                    }
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: this.explodeRange,
                        color: "rgba(80,220,190,0.45)",
                        time: 16
                    });
                }
            }
        };
    },
    bounceBoss(x, y, radius = 80, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 0, radius, "rgb(255,255,255)") // "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.isBoss = true;
        me.isReactorBoss = true;
        Matter.Body.setDensity(me, 0.003); //normal is 0.001
        me.damageReduction = 0.1
        me.startingDamageReduction = me.damageReduction
        me.inertia = Infinity;
        me.isInvulnerable = false
        me.frictionAir = 0.01
        me.restitution = 1
        me.friction = 0
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob
        Matter.Body.setVelocity(me, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) });
        me.seePlayer.recall = 1;
        // spawn.shield(me, x, y, 1);
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.fireCount = 60 + simulation.difficulty * 1.5
                this.isInvulnerable = true
                this.damageReduction = 0
            }
        };
        if (isSpawnBossPowerUp) me.onDeath = function () { powerUps.spawnBossPowerUp(this.position.x, this.position.y) };
        me.cycle = 0
        me.nextHealthThreshold = 0.75
        me.fireCount = 0
        // console.log(me.mass) //100
        me.do = function () {
            me.seePlayer.recall = 1
            //maintain speed //faster in the vertical to help avoid repeating patterns
            if (this.speed < 0.01) {
                const unit = Vector.sub(player.position, this.position)
                Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(unit), 0.1));
                // this.fireCount = 10 + simulation.difficulty * 0.5
                // this.isInvulnerable = true
                // this.damageReduction = 0
            } else {
                if (Math.abs(this.velocity.y) < 15) Matter.Body.setVelocity(this, { x: this.velocity.x, y: this.velocity.y * 1.03 });
                if (Math.abs(this.velocity.x) < 11) Matter.Body.setVelocity(this, { x: this.velocity.x * 1.03, y: this.velocity.y });
            }

            if (this.isInvulnerable) {
                this.fireCount--
                if (this.fireCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }

                if (this.mass > 10) Matter.Body.scale(this, 0.99, 0.99);

                // for (let i = 0; i < 1; i++) {
                const velocity = Vector.rotate(Vector.mult(Vector.normalise(this.velocity), -5 - 10 * Math.random()), 0.5 * (Math.random() - 0.5))
                spawn.bounceBullet(this.position.x, this.position.y, velocity)
                // }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            } else if (this.mass < 100) {
                Matter.Body.scale(this, 1.01, 1.01); //grow back to normal size
            }

            this.checkStatus();
            //horizontal attraction
            // const xMag = 0.0005
            // if (player.position.x > this.position.x + 200) {
            //     this.force.x += xMag * this.mass;
            // } else if (player.position.x < this.position.x - 200) {
            //     this.force.x -= xMag * this.mass;
            // }
        };
    },
    timeBoss(x, y, radius = 50, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 0, radius, `hsl(0, 100%, 50%)`) // "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.isBoss = true;
        me.isReactorBoss = true;
        me.inertia = Infinity;
        me.frictionAir = 0.01
        me.restitution = 1
        me.friction = 0
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob
        Matter.Body.setVelocity(me, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) });
        me.seePlayer.recall = 1;
        // for (let i = 0; i < 4; i++) spawn.spawnOrbitals(me, radius + 25, 1)
        for (let i = 0, len = 2 + 0.3 * Math.sqrt(simulation.difficulty); i < len; i++) spawn.spawnOrbitals(me, radius + 10 + 10 * i, 1);
        // me.skipRate = 1 + Math.floor(simulation.difficulty*0.02)
        // spawn.shield(me, x, y, 1);
        Matter.Body.setDensity(me, 0.001); //normal is 0.001
        me.damageReduction = 0.05
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                this.invulnerableCount = 420 + simulation.difficulty * 5 //how long does invulnerable time last
                this.isInvulnerable = true
                this.damageReduction = 0
                // requestAnimationFrame(() => { simulation.timePlayerSkip(300) }); //wrapping in animation frame prevents errors, probably
            }
        };
        me.onDeath = function () {
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            requestAnimationFrame(() => { simulation.timePlayerSkip(60) }); //wrapping in animation frame prevents errors, probably
        };

        me.cycle = Math.floor(360 * Math.random())
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0
        // console.log(me.mass) //100
        me.do = function () {
            this.cycle++
            this.fill = `hsl(${this.cycle * 0.5}, 100%, 80%)`;
            // this.fill = `hsl(${270 + 50*Math.sin(this.cycle*0.02)}, 100%, 60%)`;
            this.seePlayer.recall = 1
            //maintain speed //faster in the vertical to help avoid repeating patterns
            if (this.speed < 0.01) {
                const unit = Vector.sub(player.position, this.position)
                Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(unit), 0.1));
            } else {
                if (Math.abs(this.velocity.y) < 10) Matter.Body.setVelocity(this, { x: this.velocity.x, y: this.velocity.y * 1.02 });
                if (Math.abs(this.velocity.x) < 7) Matter.Body.setVelocity(this, { x: this.velocity.x * 1.02, y: this.velocity.y });
            }

            if (this.isInvulnerable) {
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                }
                //time dilation
                if (!simulation.isTimeSkipping) {
                    requestAnimationFrame(() => {
                        simulation.timePlayerSkip(2)
                        m.walk_cycle += m.flipLegs * m.Vx //makes the legs look like they are moving fast
                    }); //wrapping in animation frame prevents errors, probably            

                    // simulation.timePlayerSkip(2)
                    // m.walk_cycle += m.flipLegs * m.Vx //makes the legs look like they are moving fast

                    //draw invulnerable
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 15 + 6 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
            }

            this.checkStatus();
            //horizontal attraction
            // const xMag = 0.0005
            // if (player.position.x > this.position.x + 200) {
            //     this.force.x += xMag * this.mass;
            // } else if (player.position.x < this.position.x - 200) {
            //     this.force.x -= xMag * this.mass;
            // }
        };
    },
    bounceBullet(x, y, velocity = { x: 0, y: 0 }, radius = 11, sides = 6) {
        //bullets
        mobs.spawn(x, y, sides, radius, "rgb(255,0,155)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        Matter.Body.setDensity(me, 0.00001); //normal is 0.001
        me.timeLeft = 360 + Math.floor(180 * Math.random())
        me.inertia = Infinity;
        me.damageReduction = 1
        me.frictionAir = 0
        me.friction = 0
        me.restitution = 1
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob

        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.onHit = function () {
            this.explode(this.mass * 12);
        };
        me.do = function () {
            this.timeLimit();
        };
        Matter.Body.setVelocity(me, velocity);
    },
    slashBoss(x, y, radius = 80) {
        mobs.spawn(x, y, 5, radius, "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.isBoss = true;
        me.damageReduction = 0.11
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.frictionAir = 0.02
        me.seeAtDistance2 = 1000000;
        me.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
        Matter.Body.setDensity(me, 0.0005); //normal is 0.001
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map
        me.memory = Infinity;
        me.seePlayerFreq = 20
        me.lockedOn = null;

        me.torqueMagnitude = 0.00024 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
        me.delay = 70 + 70 * simulation.CDScale;
        me.cd = 0;
        me.swordRadius = 50;
        me.swordVertex = 1
        me.swordRadiusMax = 1100 + 20 * simulation.difficulty;
        me.swordRadiusGrowRate = me.swordRadiusMax * (0.005 + 0.0003 * simulation.difficulty)
        me.isSlashing = false;
        me.swordDamage = 0.07 * simulation.dmgScale
        me.laserAngle = 3 * Math.PI / 5
        const seeDistance2 = 200000
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.do = function () {
            this.seePlayerByHistory(40);
            this.attraction();
            this.checkStatus();
            this.sword() //does various things depending on what stage of the sword swing

            // ctx.beginPath(); //hide map
            // ctx.arc(this.position.x, this.position.y, 3000, 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
            // ctx.fillStyle = "#444";
            // ctx.fill();
        };
        me.swordWaiting = function () {
            if (
                this.seePlayer.recall &&
                this.cd < simulation.cycle &&
                this.distanceToPlayer2() < seeDistance2 &&
                !m.isCloak &&
                Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
            ) {
                //find vertex farthest away from player
                // let dist = 0
                // for (let i = 0, len = this.vertices.length; i < len; i++) {
                //     const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                //     if (D > dist) {
                //         dist = D
                //         this.swordVertex = i
                //     }
                // }
                // this.laserAngle = this.swordVertex / 5 * 2 * Math.PI + 0.6283

                this.sword = this.swordGrow
                Matter.Body.setVelocity(this, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(this, 0)
                this.accelMag = 0
                this.damageReduction = 0
                this.isInvulnerable = true
                this.frictionAir = 1
            }
            this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle); //always see the tip of the sword
        }
        me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
        me.swordGrow = function () {
            this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
            this.swordRadius += this.swordRadiusGrowRate
            if (this.swordRadius > this.swordRadiusMax) {
                this.sword = this.swordSlash
                this.spinCount = 0
            }

            ctx.beginPath();
            let vertices = this.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.lineWidth = 13 + 5 * Math.random();
            ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
            ctx.stroke();
        }
        me.swordSlash = function () {
            this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
            this.torque += this.torqueMagnitude;
            this.spinCount++
            if (this.spinCount > 80) {
                this.sword = this.swordWaiting
                this.swordRadius = 50
                this.accelMag = 0.001 * simulation.accelScale;
                this.cd = simulation.cycle + this.delay;
                this.damageReduction = this.startingDamageReduction
                this.isInvulnerable = false
                this.frictionAir = 0.01
            }
            ctx.beginPath();
            let vertices = this.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.lineWidth = 13 + 5 * Math.random();
            ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
            ctx.stroke();
        }
        me.laserSword = function (where, angle) {

            best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
            const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
            best = vertexCollision(where, look, [map, body, [playerBody, playerHead]]);

            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60; //player is immune to damage for an extra second
                m.damage(this.swordDamage);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: this.swordDamage * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            if (best.dist2 === Infinity) best = look;
            ctx.beginPath(); //draw beam
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
            ctx.strokeStyle = "rgba(100,100,255,0.1)"; // Purple path
            ctx.lineWidth = 25;
            ctx.stroke();
            ctx.strokeStyle = "rgba(100,100,255,0.5)"; // Purple path
            ctx.lineWidth = 5;
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
        }
    },
    slasher(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
        mobs.spawn(x, y, 5, radius, "rgb(201,202,225)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.accelMag = 0.0008 * simulation.accelScale;
        me.torqueMagnitude = 0.00002 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.035;
        me.delay = 120 * simulation.CDScale;
        me.cd = 0;
        me.swordRadius = 0;
        me.swordVertex = 1
        me.swordRadiusMax = 350 + 5 * simulation.difficulty;
        me.swordRadiusGrowRate = me.swordRadiusMax * (0.018 + 0.0006 * simulation.difficulty)
        me.isSlashing = false;
        me.swordDamage = 0.04 * simulation.dmgScale
        me.laserAngle = 3 * Math.PI / 5
        const seeDistance2 = 200000
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.do = function () {
            this.checkStatus();
            this.seePlayerByHistory(15);
            this.attraction();
            this.sword() //does various things depending on what stage of the sword swing
        };
        me.swordWaiting = function () {
            if (
                this.seePlayer.recall &&
                this.cd < simulation.cycle &&
                this.distanceToPlayer2() < seeDistance2 &&
                Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
            ) {
                //find vertex farthest away from player
                let dist = 0
                for (let i = 0, len = this.vertices.length; i < len; i++) {
                    const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                    if (D > dist) {
                        dist = D
                        this.swordVertex = i
                    }
                }
                this.laserAngle = this.swordVertex / 5 * 2 * Math.PI + 0.6283
                this.sword = this.swordGrow
                this.accelMag = 0
            }
        }
        me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
        me.swordGrow = function () {
            this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
            this.swordRadius += this.swordRadiusGrowRate
            if (this.swordRadius > this.swordRadiusMax || this.isStunned) {
                this.sword = this.swordSlash
                this.spinCount = 0
            }
        }
        me.swordSlash = function () {
            this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
            this.torque += this.torqueMagnitude;
            this.spinCount++
            if (this.spinCount > 60 || this.isStunned) {
                this.sword = this.swordWaiting
                this.swordRadius = 0
                this.accelMag = 0.001 * simulation.accelScale;
                this.cd = simulation.cycle + this.delay;
            }
        }
        me.laserSword = function (where, angle) {
            best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
            const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
            best = vertexCollision(where, look, [map, body, [playerBody, playerHead]]);
            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60; //player is immune to damage for an extra second
                m.damage(this.swordDamage);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: this.swordDamage * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            if (best.dist2 === Infinity) best = look;
            ctx.beginPath(); //draw beam
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
            ctx.strokeStyle = "rgba(100,100,255,0.1)"; // Purple path
            ctx.lineWidth = 15;
            ctx.stroke();
            ctx.strokeStyle = "rgba(100,100,255,0.5)"; // Purple path
            ctx.lineWidth = 4;
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
        }
    },
    slasher2(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
        mobs.spawn(x, y, 6, radius, "rgb(180,199,245)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.accelMag = 0.001 * simulation.accelScale;
        me.torqueMagnitude = -0.000012 * me.inertia //* (Math.random() > 0.5 ? -1 : 1);
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.035;
        me.delay = 140 * simulation.CDScale;
        me.cd = 0;
        me.swordRadius = 0;
        me.swordVertex = 1
        me.swordRadiusMax = 320 + 3.6 * simulation.difficulty;
        me.swordRadiusGrowRate = me.swordRadiusMax * (0.011 + 0.0002 * simulation.difficulty)
        me.isSlashing = false;
        me.swordDamage = 0.03 * simulation.dmgScale
        me.laserAngle = 3 * Math.PI / 5
        const seeDistance2 = 200000
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.do = function () {
            this.checkStatus();
            this.seePlayerByHistory(15);
            this.attraction();
            this.sword() //does various things depending on what stage of the sword swing
        };
        me.swordWaiting = function () {
            if (
                this.seePlayer.recall &&
                this.cd < simulation.cycle &&
                this.distanceToPlayer2() < seeDistance2 &&
                Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
            ) {
                this.laserAngle = -Math.PI / 6
                this.sword = this.swordGrow
                this.accelMag = 0
            }
        }
        me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
        me.swordGrow = function () {
            this.laserSword(this.vertices[0], this.angle + this.laserAngle);
            this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);
            this.swordRadius += this.swordRadiusGrowRate
            if (this.swordRadius > this.swordRadiusMax || this.isStunned) {
                this.sword = this.swordSlash
                this.spinCount = 0
            }
        }
        me.swordSlash = function () {
            this.laserSword(this.vertices[0], this.angle + this.laserAngle);
            this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);

            this.torque += this.torqueMagnitude;
            this.spinCount++
            if (this.spinCount > 100 || this.isStunned) {
                this.sword = this.swordWaiting
                this.swordRadius = 0
                this.accelMag = 0.001 * simulation.accelScale;
                this.cd = simulation.cycle + this.delay;
            }
        }
        me.laserSword = function (where, angle) {
            best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
            const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
            best = vertexCollision(where, look, [map, body, [playerBody, playerHead]]);
            if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60; //player is immune to damage for an extra second
                m.damage(this.swordDamage);
                simulation.drawList.push({ //add dmg to draw queue
                    x: best.x,
                    y: best.y,
                    radius: this.swordDamage * 1500,
                    color: "rgba(80,0,255,0.5)",
                    time: 20
                });
            }
            if (best.dist2 === Infinity) best = look;
            ctx.beginPath(); //draw beam
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
            ctx.strokeStyle = "rgba(100,100,255,0.1)"; // Purple path
            ctx.lineWidth = 15;
            ctx.stroke();
            ctx.strokeStyle = "rgba(100,100,255,0.5)"; // Purple path
            ctx.lineWidth = 4;
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
        }
    },
    slasher3(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
        const sides = 6
        mobs.spawn(x, y, sides, radius, "rgb(180,215,235)");
        let me = mob[mob.length - 1];
        Matter.Body.rotate(me, 2 * Math.PI * Math.random());
        me.accelMag = 0.00055 * simulation.accelScale;
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.02;
        me.delay = 150 * simulation.CDScale;
        me.cd = 0;
        me.cycle = 0;
        me.swordVertex = 1
        me.swordRadiusInitial = radius / 2;
        me.swordRadius = me.swordRadiusInitial;
        me.swordRadiusMax = 800 + 6 * simulation.difficulty;
        me.swordRadiusGrowRateInitial = 1.08
        me.swordRadiusGrowRate = me.swordRadiusGrowRateInitial//me.swordRadiusMax * (0.009 + 0.0002 * simulation.difficulty)
        me.isSlashing = false;
        me.swordDamage = 0.03 * simulation.dmgScale
        me.laserAngle = 3 * Math.PI / 5
        const seeDistance2 = me.swordRadiusMax * me.swordRadiusMax
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.do = function () {
            this.checkStatus();
            this.seePlayerByHistory(15);
            this.sword() //does various things depending on what stage of the sword swing
        };
        me.swordWaiting = function () {
            this.attraction();
            if (
                this.seePlayer.recall &&
                this.cd < simulation.cycle &&
                this.distanceToPlayer2() < seeDistance2 &&
                Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
            ) {
                //find vertex closest to the player
                let dist = Infinity
                for (let i = 0, len = this.vertices.length; i < len; i++) {
                    const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                    if (D < dist) {
                        dist = D
                        this.swordVertex = i
                    }
                }
                this.laserAngle = this.swordVertex / sides * 2 * Math.PI + Math.PI / sides
                this.sword = this.swordGrow
                this.cycle = 0
                this.swordRadius = this.swordRadiusInitial
                //slow velocity but don't stop
                Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.5))
                //set angular velocity to 50%
                // Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.5)
                //gently rotate towards the player with a torque, use cross product to decided clockwise or counterclockwise
                const laserStartVector = Vector.sub(this.position, this.vertices[this.swordVertex])
                const playerVector = Vector.sub(this.position, m.pos)
                const cross = Matter.Vector.cross(laserStartVector, playerVector)
                this.torque = 0.00002 * this.inertia * (cross > 0 ? 1 : -1)
            }
        }
        me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
        me.swordGrow = function () {
            this.laserSpear(this.vertices[this.swordVertex], this.angle + this.laserAngle);
            Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.9))
            // this.swordRadius += this.swordRadiusGrowRate
            this.cycle++
            // this.swordRadius = this.swordRadiusMax * Math.sin(this.cycle * 0.03)
            this.swordRadius *= this.swordRadiusGrowRate

            if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial
            // if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = -Math.abs(this.swordRadiusGrowRate)
            if (this.swordRadius < this.swordRadiusInitial || this.isStunned) {
                // this.swordRadiusGrowRate = Math.abs(this.swordRadiusGrowRate)
                this.swordRadiusGrowRate = this.swordRadiusGrowRateInitial
                this.sword = this.swordWaiting
                this.swordRadius = 0
                this.cd = simulation.cycle + this.delay;
            }
        }
        me.laserSpear = function (where, angle) {
            best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
            const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
            best = vertexCollision(where, look, [map, body, [playerBody, playerHead]]);

            if (best.who && (best.who === playerBody || best.who === playerHead)) {
                this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial //!!!! this retracts the sword if it hits the player

                if (m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60; //player is immune to damage for an extra second
                    m.damage(this.swordDamage);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: best.x,
                        y: best.y,
                        radius: this.swordDamage * 1500,
                        color: "rgba(80,0,255,0.5)",
                        time: 20
                    });
                }
            }
            if (best.dist2 === Infinity) best = look;
            ctx.beginPath(); //draw beam
            ctx.moveTo(where.x, where.y);
            ctx.lineTo(best.x, best.y);
            ctx.strokeStyle = "rgba(100,100,255,0.1)"; // Purple path
            ctx.lineWidth = 15;
            ctx.stroke();
            ctx.strokeStyle = "rgba(100,100,255,0.5)"; // Purple path
            ctx.lineWidth = 4;
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
        }
    },
    sneakBoss(x, y, radius = 70) {
        mobs.spawn(x, y, 5, radius, "transparent");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.001); //extra dense //normal is 0.001 //makes effective life much larger
        me.isBoss = true;
        me.damageReduction = 0.17

        me.accelMag = 0.0017 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.01;
        me.g = 0.0001; //required if using this.gravity
        me.stroke = "transparent"; //used for drawSneaker
        me.alpha = 1; //used in drawSneaker
        me.isCloaked = true; //used in drawSneaker
        me.isBadTarget = true;
        me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
        me.showHealthBar = false;
        me.memory = 30;
        me.vanishesLeft = Math.ceil(1 + simulation.difficultyMode * 0.5)
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            for (let i = 0; i < simulation.difficultyMode / 2 - 0.5; i++) spawn.sneaker(this.position.x + 10 * Math.random(), this.position.y + 10 * Math.random())
        };
        me.onDamage = function () {
            if (this.vanishesLeft > 0 && this.health < 0.1) { //if health is below 10% teleport to a random spot on player history, heal, and cloak
                this.vanishesLeft--

                for (let i = 0; i < 8; i++) { //flash screen to hide vanish 
                    simulation.drawList.push({
                        x: this.position.x,
                        y: this.position.y,
                        radius: 5000,
                        color: `rgba(0, 0, 0,${1 - 0.1 * i})`,
                        time: (i + 2) * 4
                    });
                }
                //teleport to near the end of player history
                const index = Math.floor((m.history.length - 1) * (0.66 + 0.2 * Math.random()))
                let history = m.history[(m.cycle - index) % 600]
                Matter.Body.setPosition(this, history.position)
                Matter.Body.setVelocity(this, { x: 0, y: 0 });

                this.damageReduction = 0 //immune to harm for the rest of this game cycle
                this.seePlayer.recall = 0
                this.cloak();
                this.health = 1;
                for (let i = 0; i < simulation.difficultyMode / 2 - 0.5; i++) spawn.sneaker(this.position.x + 10 * Math.random(), this.position.y + 10 * Math.random())
            }
        };
        me.cloak = function () {
            if (!this.isCloaked) { //stealth
                this.alpha = 0;
                this.isCloaked = true;
                this.isBadTarget = true;
                this.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
                this.damageReduction = 0.04
            }
        }
        me.deCloak = function () {
            if (this.isCloaked) {
                this.damageReduction = 0.4
                this.isCloaked = false;
                this.isBadTarget = false;
                this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob; //can touch player
            }
        }
        me.do = function () {
            if (this.damageReduction === 0) {
                this.damageReduction = 0.04
                let i = this.status.length //clear bad status effects
                while (i--) {
                    if (this.status[i].type === "stun" || this.status[i].type === "dot") this.status.splice(i, 1);
                }
                this.isStunned = false;
            }
            this.gravity();
            this.seePlayerByHistory(55);
            this.checkStatus();
            if (this.alpha > 0.8) this.attraction();
            //draw
            if (this.seePlayer.recall) {
                if (this.alpha < 1) this.alpha += 0.005 + 0.003 / simulation.CDScale;
            } else {
                if (this.alpha > 0) this.alpha -= 0.04;
            }
            if (this.alpha > 0) {
                if (this.alpha > 0.7) {
                    this.healthBar();
                    this.deCloak()
                }
                //draw body
                ctx.beginPath();
                const vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.fillStyle = `rgba(0,0,0,${this.alpha * this.alpha})`;
                ctx.fill();
            } else {
                this.cloak()
            }
        };
    },
    sneaker(x, y, radius = 15 + Math.ceil(Math.random() * 10)) {
        mobs.spawn(x, y, 5, radius, "transparent");
        let me = mob[mob.length - 1];
        // Matter.Body.setDensity(me, 0.001); //extra dense //normal is 0.001 //makes effective life much larger
        me.accelMag = 0.001 * Math.sqrt(simulation.accelScale);
        me.frictionAir = 0.01;
        me.g = 0.0002; //required if using this.gravity
        me.stroke = "transparent"; //used for drawSneaker
        me.alpha = 1; //used in drawSneaker
        me.isNotCloaked = false; //used in drawSneaker
        me.isBadTarget = true;
        me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
        me.showHealthBar = false;
        me.memory = 240;
        me.isVanished = false;
        // spawn.shield(me, x, y);  //makes it too hard to stealth

        me.onDamage = function () {
            if (!this.isVanished && this.health < 0.1 && !this.isStunned && !this.isSlowed) { //if health is below 10% teleport to a random spot on player history, heal, and cloak
                this.health = 1;
                this.isVanished = true
                this.cloak();
                //teleport to near the end of player history
                Matter.Body.setPosition(this, m.history[Math.floor((m.history.length - 1) * (0.3 + 0.4 * Math.random()))].position)
                Matter.Body.setVelocity(this, { x: 0, y: 0 });
                this.damageReduction = 0 //immune to harm for the rest of this game cycle
            }
        };
        me.cloak = function () {
            if (this.isNotCloaked) { //stealth
                this.alpha = 0;
                this.isNotCloaked = false;
                this.isBadTarget = true;
                this.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
            }
        }
        me.do = function () {
            if (this.damageReduction === 0) {
                this.damageReduction = 1 //stop being immune to harm immediately
                let i = this.status.length //clear bad status effects
                while (i--) {
                    if (this.status[i].type === "stun" || this.status[i].type === "dot") this.status.splice(i, 1);
                }
                this.isStunned = false;
            }
            this.gravity();
            this.seePlayerByHistory(25);
            this.checkStatus();
            this.attraction();
            //draw
            if (this.seePlayer.recall) {
                if (this.alpha < 1) this.alpha += 0.003 + 0.003 / simulation.CDScale;
            } else {
                if (this.alpha > 0) this.alpha -= 0.03;
            }
            if (this.alpha > 0) {
                if (this.alpha > 0.7) {
                    this.healthBar();
                    if (!this.isNotCloaked) {
                        this.isNotCloaked = true;
                        this.isBadTarget = false;
                        this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob; //can touch player
                    }
                }
                //draw body
                ctx.beginPath();
                const vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1, len = vertices.length; j < len; ++j) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.fillStyle = `rgba(0,0,0,${this.alpha * this.alpha})`;
                ctx.fill();
            } else {
                this.cloak()
            }
        };
    },
    ghoster(x, y, radius = 50 + Math.ceil(Math.random() * 90)) {
        mobs.spawn(x, y, 7, radius, "transparent");
        let me = mob[mob.length - 1];
        me.seeAtDistance2 = 500000;
        me.accelMag = 0.0002 + 0.0001 * simulation.accelScale;
        if (map.length) me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position; //required for search
        Matter.Body.setDensity(me, 0.00015); //normal is 0.001
        me.damageReduction = 0.1
        me.stroke = "transparent"; //used for drawGhost
        me.alpha = 1; //used in drawGhost
        me.isNotCloaked = false; //used in drawGhost
        me.isBadTarget = true;
        me.collisionFilter.mask = cat.bullet | cat.body
        me.showHealthBar = false;
        me.memory = 900;
        me.delay = 60
        me.cd = 0;
        me.onHit = function () {
            if (this.cd < simulation.cycle) {
                this.cd = simulation.cycle + this.delay;
                //dislodge ammo
                if (b.inventory.length) {
                    let isRemovedAmmo = false
                    const numRemoved = 3
                    for (let j = 0; j < numRemoved; j++) {
                        for (let i = 0; i < b.inventory.length; i++) {
                            const gun = b.guns[b.inventory[i]]
                            if (gun.ammo > 0 && gun.ammo !== Infinity) {
                                gun.ammo -= Math.ceil(1.1 * (Math.random() + Math.random()) * gun.ammoPack)
                                if (gun.ammo < 0) gun.ammo = 0
                                isRemovedAmmo = true
                            }
                        }
                    }
                    if (isRemovedAmmo) {
                        simulation.updateGunHUD();
                        for (let j = 0; j < numRemoved; j++) powerUps.directSpawn(this.position.x + 10 * Math.random(), this.position.y + 10 * Math.random(), "ammo");
                        powerUps.ejectGraphic();
                    }
                }
            }
        };
        me.onDamage = function () {
            if (this.health < 0.8) me.seeAtDistance2 = 2000000;
        }
        me.do = function () {
            if (this.speed > 6) Matter.Body.setVelocity(this, { x: this.velocity.x * 0.8, y: this.velocity.y * 0.8 }); //cap max speed to avoid getting launched by deflection, explosion
            this.seePlayerCheckByDistance();
            this.checkStatus();
            this.attraction();
            this.search();
            //draw
            if (this.distanceToPlayer2() < this.seeAtDistance2) {
                if (this.alpha < 1) this.alpha += 0.011 * simulation.CDScale; //near player go solid
            } else if (this.alpha > 0) {
                this.alpha -= 0.05; ///away from player, hide
            }
            if (this.alpha > 0) {
                if (this.alpha > 0.7 && this.seePlayer.recall) {
                    this.healthBar();
                    if (!this.isNotCloaked) {
                        this.isNotCloaked = true;
                        this.isBadTarget = false;
                        this.collisionFilter.mask = cat.player | cat.bullet | cat.body
                    }
                }
                //draw body
                ctx.beginPath();
                const vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                // ctx.lineWidth = 1;
                ctx.fillStyle = `rgba(255,255,255,${this.alpha * this.alpha})`;
                ctx.fill();
            } else if (this.isNotCloaked) {
                this.isNotCloaked = false;
                this.isBadTarget = true;
                this.collisionFilter.mask = cat.bullet | cat.body; //can't touch player or walls
            }
        };
    },
    // blinker(x, y, radius = 45 + Math.ceil(Math.random() * 70)) {
    //   mobs.spawn(x, y, 6, radius, "transparent");
    //   let me = mob[mob.length - 1];
    //   Matter.Body.setDensity(me, 0.0005); //normal is 0.001 //makes effective life much lower
    //   me.stroke = "rgb(0,200,255)"; //used for drawGhost
    //   Matter.Body.rotate(me, Math.random() * 2 * Math.PI);
    //   me.blinkRate = 40 + Math.round(Math.random() * 60); //required for blink
    //   me.blinkLength = 150 + Math.round(Math.random() * 200); //required for blink
    //   me.isStatic = true;
    //   me.memory = 360;
    //   me.seePlayerFreq = Math.round((40 + 30 * Math.random()));
    //   // me.isBig = false;
    //   // me.scaleMag = Math.max(5 - me.mass, 1.75);
    //   me.onDeath = function () {
    //     // if (this.isBig) {
    //     //   Matter.Body.scale(this, 1 / this.scaleMag, 1 / this.scaleMag);
    //     //   this.isBig = false;
    //     // }
    //   };
    //   me.onHit = function () {
    //     simulation.timeSkip(120)
    //   };
    //   me.do = function () {
    //     this.seePlayerCheck();
    //     this.blink();
    //     //strike by expanding
    //     // if (this.isBig) {
    //     //   if (this.cd - this.delay + 15 < simulation.cycle) {
    //     //     Matter.Body.scale(this, 1 / this.scaleMag, 1 / this.scaleMag);
    //     //     this.isBig = false;
    //     //   }
    //     // } else 
    //     if (this.seePlayer.yes && this.cd < simulation.cycle) {
    //       const dist = Vector.sub(this.seePlayer.position, this.position);
    //       const distMag2 = Vector.magnitudeSquared(dist);
    //       if (distMag2 < 80000) {
    //         this.cd = simulation.cycle + this.delay;

    //         // Matter.Body.scale(this, this.scaleMag, this.scaleMag);
    //         // this.isBig = true;
    //       }
    //     }
    //   };
    // },
    bomberBoss(x, y, radius = 88) {
        //boss that drops bombs from above and holds a set distance from player
        mobs.spawn(x, y, 3, radius, "rgba(255,0,200,0.5)");
        let me = mob[mob.length - 1];
        me.isBoss = true;

        Matter.Body.setDensity(me, 0.0025 + 0.00009 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger

        me.stroke = "transparent"; //used for drawGhost
        me.seeAtDistance2 = 1500000;
        me.fireFreq = 10 + Math.floor(70 * simulation.CDScale);
        me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position; //required for search
        me.hoverElevation = 460 + (Math.random() - 0.5) * 200; //squared
        me.hoverXOff = (Math.random() - 0.5) * 100;
        me.accelMag = Math.floor(10 * (Math.random() + 4.5)) * 0.00001 * simulation.accelScale;
        me.g = 0.0002; //required if using this.gravity   // gravity called in hoverOverPlayer
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.01;
        me.memory = Infinity;
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body
        spawn.shield(me, x, y, 1);

        const len = Math.floor(Math.min(15, 3 + Math.sqrt(simulation.difficulty)))
        const speed = (0.007 + 0.003 * Math.random() + 0.004 * Math.sqrt(simulation.difficulty))
        let radiusOrbitals = radius + 125 + 350 * Math.random()
        for (let i = 0; i < len; i++) spawn.orbital(me, radiusOrbitals, i / len * 2 * Math.PI, speed)
        radiusOrbitals = radius + 125 + 350 * Math.random()
        for (let i = 0; i < len; i++) spawn.orbital(me, radiusOrbitals, i / len * 2 * Math.PI, -speed)

        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.damageReduction = 0.22
        me.do = function () {
            // this.armor();
            this.seePlayerCheckByDistance();
            this.checkStatus();
            if (this.seePlayer.recall) {
                this.hoverOverPlayer();
                this.bomb();
                this.search();
            }
        };
    },
    shooter(x, y, radius = 25 + Math.ceil(Math.random() * 50)) {
        mobs.spawn(x, y, 3, radius, "rgb(255,100,150)");
        let me = mob[mob.length - 1];
        // me.vertices = Matter.Vertices.clockwiseSort(Matter.Vertices.rotate(me.vertices, Math.PI, me.position)); //make the pointy side of triangle the front
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        me.isVerticesChange = true
        // Matter.Body.rotate(me, Math.PI)

        me.memory = 120;
        me.fireFreq = 0.007 + Math.random() * 0.005;
        me.noseLength = 0;
        me.fireAngle = 0;
        me.accelMag = 0.0005 * simulation.accelScale;
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.05;
        me.lookTorque = 0.0000025 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 };
        me.onDeath = function () { //helps collisions functions work better after vertex have been changed
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
        }
        spawn.shield(me, x, y);
        me.do = function () {
            this.seePlayerByLookingAt();
            this.checkStatus();
            this.fire();
        };
    },
    shooterBoss(x, y, radius = 110, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 3, radius, "rgb(255,70,180)");
        let me = mob[mob.length - 1];
        setTimeout(() => { //fix mob in place, but allow rotation
            me.constraint = Constraint.create({
                pointA: {
                    x: me.position.x,
                    y: me.position.y
                },
                bodyB: me,
                stiffness: 0.00004,
                damping: 0.2
            });
            Composite.add(engine.world, me.constraint);
        }, 2000); //add in a delay in case the level gets flipped left right

        me.isBoss = true;
        Matter.Body.setDensity(me, 0.01 + 0.0003 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.22

        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        me.isVerticesChange = true
        me.memory = 240;
        me.fireFreq = 0.01 + 0.0005 * Math.min(40, simulation.difficulty); //bigger number means more shots per second
        me.noseLength = 0;
        me.fireAngle = 0;
        me.accelMag = 0.005 * simulation.accelScale;
        me.frictionAir = 0.05;
        me.lookTorque = 0.000006 * (Math.random() > 0.5 ? -1 : 1);
        me.fireDir = { x: 0, y: 0 };
        setTimeout(() => {
            for (let i = 0, len = 3 + 0.5 * Math.sqrt(simulation.difficulty); i < len; i++) spawn.spawnOrbitals(me, radius + 40 + 10 * i, 1);
        }, 100); //have to wait a sec so the tether constraint doesn't attach to an orbital
        me.onDeath = function () {
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //helps collisions functions work better after vertex have been changed
        };
        me.do = function () {
            // this.armor();
            this.seePlayerByLookingAt();
            this.checkStatus();
            // this.fire();
            const setNoseShape = () => {
                const mag = this.radius + this.radius * this.noseLength;
                this.vertices[1].x = this.position.x + Math.cos(this.angle) * mag;
                this.vertices[1].y = this.position.y + Math.sin(this.angle) * mag;
            };
            //throw a mob/bullet at player
            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                    this.fireDir.y -= Math.abs(this.seePlayer.position.x - this.position.x) / 5000; //gives the bullet an arc  //was    / 1600
                }
                //rotate towards fireAngle
                const angle = this.angle + Math.PI / 2;
                const dot = Vector.dot({ x: Math.cos(angle), y: Math.sin(angle) }, this.fireDir)
                // c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                const threshold = 0.1;
                if (dot > threshold) {
                    this.torque += 0.000004 * this.inertia;
                } else if (dot < -threshold) {
                    this.torque -= 0.000004 * this.inertia;
                } else if (this.noseLength > 1.5 && dot > -0.2 && dot < 0.2) {
                    //fire
                    for (let i = 0, len = 2 + 0.07 * simulation.difficulty; i < len; i++) {
                        spawn.bullet(this.vertices[1].x, this.vertices[1].y, 10 + Math.ceil(this.radius / 25));
                        const spread = Vector.rotate({ x: Math.sqrt(len) + 4, y: 0 }, 2 * Math.PI * Math.random())
                        const dir = Vector.add(Vector.mult(this.fireDir, 25), spread)
                        Matter.Body.setVelocity(mob[mob.length - 1], dir);
                    }
                    this.noseLength = 0;
                }
                if (this.noseLength < 1.5) this.noseLength += this.fireFreq;
                setNoseShape();
            } else if (this.noseLength > 0.1) {
                this.noseLength -= this.fireFreq / 2;
                setNoseShape();
            }
        };
    },
    bullet(x, y, radius = 9, sides = 0) {
        //bullets
        mobs.spawn(x, y, sides, radius, "rgb(255,0,0)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.onHit = function () {
            this.explode(this.mass * 15);
        };
        Matter.Body.setDensity(me, 0.00004); //normal is 0.001
        me.timeLeft = 220;
        me.g = 0.001; //required if using this.gravity 
        me.frictionAir = 0;
        me.restitution = 0.8;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
        me.do = function () {
            this.gravity();
            this.timeLimit();
        };
    },
    bomb(x, y, radius = 9, sides = 5) {
        mobs.spawn(x, y, sides, radius, "rgb(255,0,0)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.onHit = function () {
            this.explode(this.mass * 120);
        };
        me.onDeath = function () {
            spawn.bullet(this.position.x, this.position.y, this.radius / 3, 5);
            spawn.bullet(this.position.x, this.position.y, this.radius / 3, 5);
            spawn.bullet(this.position.x, this.position.y, this.radius / 3, 5);
            const mag = 8
            const v1 = Vector.rotate({
                x: 1,
                y: 1
            }, 2 * Math.PI * Math.random())
            const v2 = Vector.rotate({
                x: 1,
                y: 1
            }, 2 * Math.PI * Math.random())
            const v3 = Vector.normalise(Vector.add(v1, v2)) //last vector is opposite the sum of the other two to look a bit like momentum is conserved

            Matter.Body.setVelocity(mob[mob.length - 1], {
                x: mag * v1.x,
                y: mag * v1.y
            });
            Matter.Body.setVelocity(mob[mob.length - 2], {
                x: mag * v2.x,
                y: mag * v2.y
            });
            Matter.Body.setVelocity(mob[mob.length - 3], {
                x: -mag * v3.x,
                y: -mag * v3.y
            });
        }
        Matter.Body.setDensity(me, 0.00005); //normal is 0.001
        me.timeLeft = 140 + Math.floor(Math.random() * 30);
        me.g = 0.001; //required if using this.gravity
        me.frictionAir = 0;
        me.restitution = 1;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
        me.do = function () {
            this.gravity();
            this.timeLimit();
        };
    },
    sniper(x, y, radius = 35 + Math.ceil(Math.random() * 30)) {
        mobs.spawn(x, y, 3, radius, "transparent"); //"rgb(25,0,50)")
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        me.isVerticesChange = true
        // Matter.Body.rotate(me, Math.PI)
        me.stroke = "transparent"; //used for drawSneaker
        me.alpha = 1; //used in drawSneaker
        me.showHealthBar = false;
        me.frictionStatic = 0;
        me.friction = 0;
        me.isNotCloaked = false; //used in drawSneaker
        me.isBadTarget = true;
        me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player

        me.memory = 30 //140;
        me.fireFreq = 0.005 + Math.random() * 0.002 + 0.0005 * simulation.difficulty; //larger = fire more often
        me.noseLength = 0;
        me.fireAngle = 0;
        me.accelMag = 0.0005 * simulation.accelScale;
        me.frictionAir = 0.05;
        me.torque = 0.0001 * me.inertia;
        me.fireDir = { x: 0, y: 0 };
        me.onDeath = function () { //helps collisions functions work better after vertex have been changed
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
        }
        spawn.shield(me, x, y);
        me.do = function () {
            // this.seePlayerByLookingAt();
            this.seePlayerCheck();
            this.checkStatus();

            const setNoseShape = () => {
                const mag = this.radius + this.radius * this.noseLength;
                this.vertices[1].x = this.position.x + Math.cos(this.angle) * mag;
                this.vertices[1].y = this.position.y + Math.sin(this.angle) * mag;
            };
            //throw a mob/bullet at player
            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                    // this.fireDir.y -= Math.abs(this.seePlayer.position.x - this.position.x) / 1600; //gives the bullet an arc
                }
                //rotate towards fireAngle
                const angle = this.angle + Math.PI / 2;
                // c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                //rotate towards fireAngle
                const dot = Vector.dot({
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                }, this.fireDir)
                const threshold = 0.03;
                if (dot > threshold) {
                    this.torque += 0.000004 * this.inertia;
                } else if (dot < -threshold) {
                    this.torque -= 0.000004 * this.inertia;
                } else if (this.noseLength > 1.5 && dot > -0.2 && dot < 0.2) {
                    //fire
                    spawn.sniperBullet(this.vertices[1].x, this.vertices[1].y, 7 + Math.ceil(this.radius / 15), 5);
                    const v = 10 + 8 * simulation.accelScale;
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + this.fireDir.x * v + Math.random(),
                        y: this.velocity.y + this.fireDir.y * v + Math.random()
                    });
                    this.noseLength = 0;
                    // recoil
                    this.force.x -= 0.005 * this.fireDir.x * this.mass;
                    this.force.y -= 0.005 * this.fireDir.y * this.mass;
                }
                if (this.noseLength < 1.5) this.noseLength += this.fireFreq;
                setNoseShape();
            } else if (this.noseLength > 0.1) {
                this.noseLength -= this.fireFreq / 2;
                setNoseShape();
            }
            // else if (this.noseLength < -0.1) {
            //   this.noseLength += this.fireFreq / 4;
            //   setNoseShape();
            // }

            if (this.seePlayer.recall) {
                if (this.alpha < 1) this.alpha += 0.01;
            } else {
                if (this.alpha > 0) this.alpha -= 0.03;
            }
            //draw
            if (this.alpha > 0) {
                if (this.alpha > 0.95) {
                    this.healthBar();
                    if (!this.isNotCloaked) {
                        this.isNotCloaked = true;
                        this.isBadTarget = false;
                        this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob; //can touch player
                    }
                }
                //draw body
                ctx.beginPath();
                const vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1, len = vertices.length; j < len; ++j) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.fillStyle = `rgba(25,0,50,${this.alpha * this.alpha})`;
                ctx.fill();
            } else if (this.isNotCloaked) {
                this.isNotCloaked = false;
                this.isBadTarget = true
                this.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
            }
        };
    },
    sniperBullet(x, y, radius = 9, sides = 5) { //bullets
        mobs.spawn(x, y, sides, radius, "rgb(255,0,155)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.onHit = function () {
            this.explode(this.mass * 20);
        };
        Matter.Body.setDensity(me, 0.00005); //normal is 0.001
        me.timeLeft = 120;
        // me.g = 0.0005; //required if using this.gravity
        me.frictionAir = 0;
        me.restitution = 0;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
        me.onDeath = function () {
            if (simulation.difficulty > 11) { //explode AoE
                const radius = 100 + 0.5 * simulation.difficulty + 50 * Math.random()
                if (m.immuneCycle < m.cycle && Vector.magnitude(Vector.sub(this.position, player.position)) < radius) m.damage(0.0003 * radius * simulation.dmgScale);
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: radius,
                    color: "rgba(255,0,155,0.5)",
                    time: simulation.drawTime
                });
            }
        };
        me.do = function () {
            // this.gravity();
            this.timeLimit();
            if (Matter.Query.collides(this, map).length > 0 || Matter.Query.collides(this, body).length > 0 && this.speed < 10) {
                this.isDropPowerUp = false;
                this.death(); //death with no power up
            }
        };
    },
    launcherOne(x, y, radius = 30 + Math.ceil(Math.random() * 40)) {
        mobs.spawn(x, y, 3, radius, "rgb(150,150,255)");
        let me = mob[mob.length - 1];
        me.accelMag = 0.00004 * simulation.accelScale;
        me.fireFreq = Math.floor(420 + 90 * Math.random() * simulation.CDScale)
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.015;
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.do = function () {
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
            if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
                Matter.Body.setAngularVelocity(this, 0.14)
                spawn.seeker(this.vertices[0].x, this.vertices[0].y, 20, 9); //give the bullet a rotational velocity as if they were attached to a vertex
                const who = mob[mob.length - 1]
                Matter.Body.setDensity(who, 0.00003); //normal is 0.001
                who.timeLeft = 840 //* (0.8 + 0.4 * Math.random());
                who.accelMag = 0.00035 * simulation.accelScale; //* (0.8 + 0.4 * Math.random())
                who.frictionAir = 0.01 //* (0.8 + 0.4 * Math.random());
                const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[0]))), -6)
                Matter.Body.setVelocity(who, {
                    x: this.velocity.x + velocity.x,
                    y: this.velocity.y + velocity.y
                });
            }
        };
    },
    launcher(x, y, radius = 30 + Math.ceil(Math.random() * 40)) {
        mobs.spawn(x, y, 3, radius, "rgb(150,150,255)");
        let me = mob[mob.length - 1];
        me.accelMag = 0.00004 * simulation.accelScale;
        me.fireFreq = Math.floor(420 + 90 * Math.random() * simulation.CDScale)
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.02;
        spawn.shield(me, x, y);
        me.onDamage = function () { };
        me.do = function () {
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
            if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
                Matter.Body.setAngularVelocity(this, 0.14)
                //fire a bullet from each vertex
                for (let i = 0, len = this.vertices.length; i < len; i++) {
                    spawn.seeker(this.vertices[i].x, this.vertices[i].y, 7)
                    //give the bullet a rotational velocity as if they were attached to a vertex
                    const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[i]))), -8)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    });
                }
            }
        };
    },
    launcherBoss(x, y, radius = 90, isSpawnBossPowerUp = true) {
        mobs.spawn(x, y, 6, radius, "rgb(150,150,255)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.0022 + 0.00015 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.22

        me.accelMag = 0.0001 * simulation.accelScale;
        me.fireFreq = Math.floor(330 * simulation.CDScale)
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.02;
        me.memory = 420;
        me.repulsionRange = 1000000; //squared
        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())

        me.onDeath = function () {
            if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //helps collisions functions work better after vertex have been changed
        };
        me.onDamage = function () { };
        me.do = function () {
            // this.armor();
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
            this.repulsion();
            if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
                Matter.Body.setAngularVelocity(this, 0.11)
                //fire a bullet from each vertex
                for (let i = 0, len = this.vertices.length; i < len; i++) {
                    spawn.seeker(this.vertices[i].x, this.vertices[i].y, 8)
                    //give the bullet a rotational velocity as if they were attached to a vertex
                    const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[i]))), -10)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    });
                }
            }
        };
    },
    // blowSuckBoss(x, y, radius = 80) {
    //     mobs.spawn(x, y, 10, radius, "transparent");
    //     let me = mob[mob.length - 1];
    //     me.isBoss = true;
    //     Matter.Body.setDensity(me, 0.0022 + 0.0002 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
    //     me.damageReduction = 0.2 

    //     me.fireFreq = Math.floor(60 * simulation.CDScale)
    //     me.seePlayerFreq = 15
    //     me.seeAtDistance2 = 300000;
    //     me.accelMag = 0.0003 * simulation.accelScale;
    //     if (map.length) me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position; //required for search
    //     // Matter.Body.setDensity(me, 0.001); //normal is 0.001 //makes effective life much lower
    //     me.stroke = "transparent"; //used for drawGhost
    //     me.alpha = 1; //used in drawGhost
    //     me.isNotCloaked = false; //used in drawGhost
    //     me.isBadTarget = true;
    //     // me.leaveBody = false;
    //     me.collisionFilter.mask = cat.bullet //| cat.body
    //     me.showHealthBar = false;
    //     me.memory = 480;
    //     me.onDeath = function() {
    //         powerUps.spawnBossPowerUp(this.position.x, this.position.y)
    //     };
    //     me.onDamage = function() {};
    //     me.suck = function() {
    //         for (let i = 0; i < mob.length; i++) {
    //             if (mob[i].isBlowSuckBullet) {
    //                 const unit = Vector.normalise(Vector.sub(this.position, mob[i].position))
    //                 const mag = Vector.mult(unit, 0.0008 * mob[i].mass)
    //                 mob[i].force.x += mag.x
    //                 mob[i].force.y += mag.y
    //             }
    //         }
    //     }
    //     me.do = function() {
    //         //cap max speed
    //         if (this.speed > 8) {
    //             Matter.Body.setVelocity(this, {
    //                 x: this.velocity.x * 0.8,
    //                 y: this.velocity.y * 0.8
    //             });
    //         }
    //         this.seePlayerCheckByDistance();
    //         this.checkStatus();
    //         this.attraction();
    //         this.search();
    //         //draw
    //         if (this.distanceToPlayer2() < this.seeAtDistance2) {
    //             if (this.alpha < 1) this.alpha += 0.005 * simulation.CDScale; //near player go solid
    //         } else {
    //             if (this.alpha > 0) this.alpha -= 0.05; ///away from player, hide
    //         }
    //         if (this.alpha > 0) {
    //             if (this.alpha > 0.8 && this.seePlayer.recall) {
    //                 this.healthBar();
    //                 if (!this.isNotCloaked) {
    //                     this.isNotCloaked = true;
    //                     this.isBadTarget = false;
    //                     this.collisionFilter.mask = cat.player | cat.bullet
    //                 }
    //             }
    //             //draw body
    //             ctx.beginPath();
    //             const vertices = this.vertices;
    //             ctx.moveTo(vertices[0].x, vertices[0].y);
    //             for (let j = 1, len = vertices.length; j < len; ++j) {
    //                 ctx.lineTo(vertices[j].x, vertices[j].y);
    //             }
    //             ctx.lineTo(vertices[0].x, vertices[0].y);
    //             ctx.lineWidth = 1;
    //             ctx.fillStyle = `rgba(255,255,255,${this.alpha * this.alpha})`;
    //             ctx.fill();


    //             this.suck();
    //             if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
    //                 this.suckCount = 0;
    //                 Matter.Body.setAngularVelocity(this, 0.11)
    //                 //fire a bullet from each vertex
    //                 for (let i = 0, len = this.vertices.length; i < len; i++) {
    //                     spawn.bounceBullet(this.vertices[i].x, this.vertices[i].y, 8)
    //                     //give the bullet a rotational velocity as if they were attached to a vertex
    //                     const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[i]))), -16)
    //                     const who = mob[mob.length - 1]
    //                     who.isBlowSuckBullet = true
    //                     Matter.Body.setVelocity(who, {
    //                         x: this.velocity.x + velocity.x,
    //                         y: this.velocity.y + velocity.y
    //                     });
    //                 }
    //             }


    //         } else if (this.isNotCloaked) {
    //             this.isNotCloaked = false;
    //             this.isBadTarget = true;
    //             this.collisionFilter.mask = cat.bullet; //can't touch player or walls
    //         }
    //     };
    // },
    // blowSuckBoss(x, y, radius = 80, isSpawnBossPowerUp = true) {
    //     mobs.spawn(x, y, 10, radius, "transparent"); //rgb(60,60,85)
    //     let me = mob[mob.length - 1];
    //     me.isBoss = true;
    //     Matter.Body.setDensity(me, 0.0022 + 0.0002 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
    //     me.damageReduction = 0.2 

    //     me.accelMag = 0.0001 * simulation.accelScale;
    //     me.fireFreq = Math.floor(180 * simulation.CDScale)
    //     me.frictionStatic = 0;
    //     me.friction = 0;
    //     me.frictionAir = 0.005;
    //     me.memory = 420;
    //     me.repulsionRange = 1000000; //squared
    //     // spawn.shield(me, x, y, 1);
    //     // spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())

    //     me.onDeath = function() {
    //         if (isSpawnBossPowerUp) powerUps.spawnBossPowerUp(this.position.x, this.position.y)
    //     };
    //     me.onDamage = function() {};
    //     me.suck = function() {
    //         for (let i = 0; i < mob.length; i++) {
    //             if (mob[i].isBlowSuckBullet) {
    //                 const unit = Vector.normalise(Vector.sub(this.position, mob[i].position))
    //                 const mag = Vector.mult(unit, 0.0008 * mob[i].mass)
    //                 mob[i].force.x += mag.x
    //                 mob[i].force.y += mag.y
    //             }
    //         }
    //     }
    //     me.do = function() {
    //         this.seePlayerCheck();
    //         this.checkStatus();
    //         this.attraction();
    //         // this.repulsion();
    //         this.suck();

    //         if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
    //             this.suckCount = 0;
    //             Matter.Body.setAngularVelocity(this, 0.11)
    //             //fire a bullet from each vertex
    //             for (let i = 0, len = this.vertices.length; i < len; i++) {
    //                 spawn.bounceBullet(this.vertices[i].x, this.vertices[i].y, 8)
    //                 //give the bullet a rotational velocity as if they were attached to a vertex
    //                 const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[i]))), -16)
    //                 const who = mob[mob.length - 1]
    //                 who.isBlowSuckBullet = true
    //                 Matter.Body.setVelocity(who, {
    //                     x: this.velocity.x + velocity.x,
    //                     y: this.velocity.y + velocity.y
    //                 });
    //             }
    //         }
    //     };
    // },
    grenadierBoss(x, y, radius = 95) {
        mobs.spawn(x, y, 6, radius, "rgb(0,235,255)");
        let me = mob[mob.length - 1];
        me.isBoss = true;

        me.accelMag = 0.0001 * simulation.accelScale;
        me.fireFreq = Math.floor(360 * simulation.CDScale)
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.035;
        me.memory = 420;
        me.repulsionRange = 1200000; //squared
        // spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 50, 1);
        spawn.spawnOrbitals(me, radius + 125, 1);
        spawn.spawnOrbitals(me, radius + 200, 1);
        Matter.Body.setDensity(me, 0.004 + 0.00015 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.onDeath = function () { //helps collisions functions work better after vertex have been changed
            setTimeout(() => { //fix mob in place, but allow rotation
                for (let i = 0, len = 6; i < len; i++) {
                    const speed = 2.25 * simulation.accelScale;
                    const angle = 2 * Math.PI * i / len
                    spawn.grenade(this.position.x, this.position.y, 170 * simulation.CDScale);
                    const who = mob[mob.length - 1]
                    Matter.Body.setVelocity(who, {
                        x: speed * Math.cos(angle),
                        y: speed * Math.sin(angle)
                    });
                }
            }, 200);
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        }
        me.grenadeLimiter = 0
        me.onDamage = function () {
            if (this.grenadeLimiter < 240 && this.health > 0) {
                this.grenadeLimiter += 60
                spawn.grenade(this.position.x, this.position.y, 80 + Math.floor(60 * Math.random()));
                who = mob[mob.length - 1]
                const velocity = Vector.mult(Vector.normalise(Vector.sub(player.position, who.position)), 3 * Math.sqrt(simulation.accelScale) + 4 * Math.random())
                Matter.Body.setVelocity(who, {
                    x: this.velocity.x + velocity.x,
                    y: this.velocity.y + velocity.y
                });
            }
        };
        me.damageReduction = 0.27
        me.do = function () {
            // this.armor();
            if (this.grenadeLimiter > 1) this.grenadeLimiter--
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
        };
    },
    grenadier(x, y, radius = 35 + Math.ceil(Math.random() * 20)) {
        mobs.spawn(x, y, 3, radius, "rgb(0,235,255)"); //rgb(255,100,200)
        let me = mob[mob.length - 1];
        me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
        me.isVerticesChange = true
        // Matter.Body.rotate(me, Math.PI)
        // me.stroke = "transparent"; //used for drawSneaker
        me.frictionStatic = 0;
        me.friction = 0;
        me.memory = 60 //140;
        me.fireFreq = 0.0055 + Math.random() * 0.0015;
        me.noseLength = 0;
        me.fireAngle = 0;
        me.accelMag = 0.0006 * simulation.accelScale;
        me.frictionAir = 0.05;
        me.torque = 0.0001 * me.inertia * (Math.random() > 0.5 ? -1 : 1)
        me.fireDir = { x: 0, y: 0 };
        me.onDeath = function () { //helps collisions functions work better after vertex have been changed
            spawn.grenade(this.position.x, this.position.y, 200 * simulation.CDScale);
            // mob[mob.length - 1].collisionFilter.category = 0
            mob[mob.length - 1].collisionFilter.mask = cat.player | cat.map;
        }
        spawn.shield(me, x, y);
        me.do = function () {
            this.seePlayerCheck();
            this.checkStatus();

            const setNoseShape = () => {
                const mag = this.radius + this.radius * this.noseLength;
                this.vertices[1].x = this.position.x + Math.cos(this.angle) * mag;
                this.vertices[1].y = this.position.y + Math.sin(this.angle) * mag;
            };
            //throw a mob/bullet at player
            if (this.seePlayer.recall) {
                //set direction to turn to fire
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                    // this.fireDir.y -= Math.abs(this.seePlayer.position.x - this.position.x) / 1600; //gives the bullet an arc
                }
                //rotate towards fireAngle
                const angle = this.angle + Math.PI / 2;
                // c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                //rotate towards fireAngle
                const dot = Vector.dot({
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                }, this.fireDir)
                const threshold = 0.03;
                if (dot > threshold) {
                    this.torque += 0.000004 * this.inertia;
                } else if (dot < -threshold) {
                    this.torque -= 0.000004 * this.inertia;
                } else if (this.noseLength > 1.5 && dot > -0.2 && dot < 0.2) {
                    //fire
                    spawn.grenade(this.vertices[1].x, this.vertices[1].y);
                    const v = 5 * simulation.accelScale;
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + this.fireDir.x * v + Math.random(),
                        y: this.velocity.y + this.fireDir.y * v + Math.random()
                    });
                    this.noseLength = 0;
                    // recoil
                    this.force.x -= 0.005 * this.fireDir.x * this.mass;
                    this.force.y -= 0.005 * this.fireDir.y * this.mass;
                }
                if (this.noseLength < 1.5) this.noseLength += this.fireFreq;
                setNoseShape();
            } else if (this.noseLength > 0.1) {
                this.noseLength -= this.fireFreq / 2;
                setNoseShape();
            }
        };
    },
    grenade(x, y, lifeSpan = 90 + Math.ceil(60 / simulation.accelScale), pulseRadius = Math.min(550, 250 + simulation.difficulty * 3), size = 3) {
        mobs.spawn(x, y, 4, size, "rgb(215,0,190)"); //rgb(215,80,190)
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.onHit = function () {
            this.explode(this.mass);
        };
        Matter.Body.setDensity(me, 0.00004); //normal is 0.001

        me.lifeSpan = lifeSpan;
        me.timeLeft = me.lifeSpan;
        // me.g = 0.0002; //required if using this.gravity 
        me.frictionAir = 0;
        me.restitution = 0.8;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.onDeath = function () {
            //damage player if in range
            if (Vector.magnitude(Vector.sub(player.position, this.position)) < pulseRadius && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage
                m.damage(0.015 * simulation.dmgScale);
            }
            simulation.drawList.push({ //add dmg to draw queue
                x: this.position.x,
                y: this.position.y,
                radius: pulseRadius,
                color: "rgba(255,0,220,0.3)",
                time: simulation.drawTime
            });
        };
        me.showHealthBar = false;
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.map | cat.body | cat.player
        // me.collisionFilter.mask = 0
        me.do = function () {
            this.timeLimit();
            ctx.beginPath(); //draw explosion outline
            ctx.arc(this.position.x, this.position.y, pulseRadius * (1.01 - this.timeLeft / this.lifeSpan), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
            ctx.fillStyle = "rgba(255,0,220,0.05)";
            ctx.fill();
        };
    },
    shieldingBoss(x, y, radius = 200) {
        mobs.spawn(x, y, 9, radius, "rgb(150, 150, 255)");
        let me = mob[mob.length - 1];
        setTimeout(() => { //fix mob in place, but allow rotation
            me.constraint = Constraint.create({
                pointA: {
                    x: me.position.x,
                    y: me.position.y
                },
                bodyB: me,
                stiffness: 0.0001,
                damping: 1
            });
            Composite.add(engine.world, me.constraint);
        }, 2000); //add in a delay in case the level gets flipped left right

        Matter.Body.rotate(me, Math.random() * 2 * Math.PI)
        // me.stroke = "rgb(220,220,255)"
        me.isBoss = true;
        me.cycle = 0
        me.maxCycles = 110;
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 1;
        // me.homePosition = { x: x, y: y };
        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())

        Matter.Body.setDensity(me, 0.0045); //extra dense //normal is 0.001 //makes effective life much larger
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //helps collisions functions work better after vertex have been changed
        };
        me.onDamage = function () {
            this.cycle = 0
        };
        me.damageReduction = 0.39
        me.do = function () {
            Matter.Body.rotate(this, 0.003) //gently spin around
            this.checkStatus();
            ctx.beginPath(); //draw cycle timer
            ctx.moveTo(this.vertices[this.vertices.length - 1].x, this.vertices[this.vertices.length - 1].y)
            const phase = (this.vertices.length + 1) * this.cycle / this.maxCycles
            if (phase > 1) ctx.lineTo(this.vertices[0].x, this.vertices[0].y)
            for (let i = 1; i < phase - 1; i++) ctx.lineTo(this.vertices[i].x, this.vertices[i].y)
            ctx.lineWidth = 5
            ctx.strokeStyle = "rgb(255,255,255)"
            ctx.stroke();

            this.cycle++
            if (this.cycle > this.maxCycles) {
                this.cycle = 0
                ctx.beginPath();
                for (let i = 0; i < mob.length; i++) {
                    if (!mob[i].isShielded && !mob[i].shield && mob[i].isDropPowerUp && mob[i].alive && !mob[i].isBoss) {
                        ctx.moveTo(this.position.x, this.position.y)
                        ctx.lineTo(mob[i].position.x, mob[i].position.y)
                        spawn.shield(mob[i], mob[i].position.x, mob[i].position.y, 1, true);
                        // me.damageReduction = 0.075 
                        mob[mob.length - 1].damageReduction = 0.5 * 0.075  //shields are extra strong
                    }
                }
                if (!this.isShielded && this.alive) spawn.shield(this, this.position.x, this.position.y, 1, true);
                ctx.lineWidth = 20
                ctx.strokeStyle = "rgb(200,200,255)"
                ctx.stroke();
            }
        };
    },
    timeSkipBoss(x, y, radius = 50) {
        mobs.spawn(x, y, 15, radius, "transparent");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.eventHorizon = 0; //set in mob loop
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.005;
        me.accelMag = 0.00008 + 0.00002 * simulation.accelScale
        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 50 + 100 * Math.random())

        Matter.Body.setDensity(me, 0.0025); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.07
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // requestAnimationFrame(() => { simulation.timePlayerSkip(120) }); //wrapping in animation frame prevents errors, probably
        };
        me.onDamage = function () {
            //find side of mob closest to player
            //causes lag for foam,laser   too many seekers //maybe scale chance with dmg
            // const where = Vector.add(this.position, Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.radius + 10))
            // spawn.seeker(where.x, where.y); //give the bullet a rotational velocity as if they were attached to a vertex
        };
        me.do = function () {
            this.seePlayerByHistory(60);
            this.attraction();
            if (this.distanceToPlayer2() > 9000000) this.attraction(); //extra attraction if far away
            this.checkStatus();
            this.eventHorizon = 950 + 250 * Math.sin(simulation.cycle * 0.005)
            if (!simulation.isTimeSkipping) {
                if (Vector.magnitude(Vector.sub(this.position, m.pos)) < this.eventHorizon) {
                    this.attraction();
                    this.damageReduction = this.startingDamageReduction
                    this.isInvulnerable = false
                    // if (!(simulation.cycle % 15)) requestAnimationFrame(() => {
                    //     simulation.timePlayerSkip(5)
                    //     // simulation.loop(); //ending with a wipe and normal loop fixes some very minor graphical issues where things are draw in the wrong locations
                    // }); //wrapping in animation frame prevents errors, probably

                    // 
                    //     simulation.timePlayerSkip(1)
                    //     m.walk_cycle += m.flipLegs * m.Vx //makes the legs look like they are moving fast
                    // }); //wrapping in animation frame prevents errors, probably            
                    requestAnimationFrame(() => {
                        simulation.timePlayerSkip(1)
                    }); //wrapping in animation frame prevents errors, probably            

                    m.walk_cycle += m.flipLegs * m.Vx //makes the legs look like they are moving fast

                    // if (simulation.fpsCap > 999){}
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
                    ctx.fillStyle = "#fff";
                    ctx.globalCompositeOperation = "destination-in"; //in or atop
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI);
                    // ctx.stroke();
                    ctx.clip();
                } else {
                    this.damageReduction = 0
                    this.isInvulnerable = true
                    //prevents other things from being drawn later on in the draw cycle
                    requestAnimationFrame(() => {
                        simulation.camera();
                        ctx.beginPath(); //gets rid of already draw shapes
                        ctx.arc(this.position.x, this.position.y, this.eventHorizon, 0, 2 * Math.PI, false); //part you can't see
                        ctx.fillStyle = document.body.style.backgroundColor;
                        ctx.fill();
                        ctx.restore();
                    })
                }
            }
        };
    },
    streamBoss(x, y, radius = 110) {
        mobs.spawn(x, y, 5, radius, "rgb(245,180,255)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        // me.accelMag = 0.00023 * simulation.accelScale;
        me.accelMag = 0.00008 * simulation.accelScale;
        // me.fireFreq = Math.floor(30 * simulation.CDScale)
        me.canFire = false;
        me.closestVertex1 = 0;
        me.closestVertex2 = 1;
        me.cycle = 0
        me.frictionStatic = 0;
        me.friction = 0;
        me.frictionAir = 0.022;
        me.memory = 240;
        me.repulsionRange = 1200000; //squared
        spawn.shield(me, x, y, 1);
        spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())

        Matter.Body.setDensity(me, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //helps collisions functions work better after vertex have been changed
        };
        me.onDamage = function () { };
        me.damageReduction = 0.28
        me.do = function () {
            // this.armor();
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
            this.repulsion();

            this.cycle++
            if (this.seePlayer.recall && ((this.cycle % 15) === 0)) {
                if (this.canFire) {
                    if (this.cycle > 100) {
                        this.cycle = 0
                        this.canFire = false
                        // Matter.Body.setAngularVelocity(this, 0.1)
                        // const forceMag = 0.01 * this.mass;
                        // const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                        // this.force.x -= 2 * forceMag * Math.cos(angle);
                        // this.force.y -= 2 * forceMag * Math.sin(angle); // - 0.0007 * this.mass; //antigravity
                    }
                    spawn.seeker(this.vertices[this.closestVertex1].x, this.vertices[this.closestVertex1].y, 6)
                    Matter.Body.setDensity(mob[mob.length - 1], 0.000001); //normal is 0.001
                    const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[this.closestVertex1])), -10)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    });
                    spawn.seeker(this.vertices[this.closestVertex2].x, this.vertices[this.closestVertex2].y, 6)
                    Matter.Body.setDensity(mob[mob.length - 1], 0.000001); //normal is 0.001
                    const velocity2 = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[this.closestVertex2])), -10)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity2.x,
                        y: this.velocity.y + velocity2.y
                    });
                } else if (this.cycle > 210) {
                    this.cycle = 0
                    this.canFire = true

                    //find closest 2 vertexes
                    let distance2 = Infinity
                    for (let i = 0; i < this.vertices.length; i++) {
                        const d = Vector.magnitudeSquared(Vector.sub(this.vertices[i], player.position))
                        if (d < distance2) {
                            distance2 = d
                            this.closestVertex2 = this.closestVertex1
                            this.closestVertex1 = i
                        }
                    }
                    if (this.closestVertex2 === this.closestVertex1) {
                        this.closestVertex2++
                        if (this.closestVertex2 === this.vertices.length) this.closestVertex2 = 0
                    }
                }
            }
        };
    },
    seeker(x, y, radius = 8, sides = 6) {
        //bullets
        mobs.spawn(x, y, sides, radius, "rgb(255,0,255)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        me.onHit = function () {
            this.explode(this.mass * 20);
        };
        Matter.Body.setDensity(me, 0.000015); //normal is 0.001
        me.timeLeft = 420 //* (0.8 + 0.4 * Math.random());
        me.accelMag = 0.00017 * simulation.accelScale; //* (0.8 + 0.4 * Math.random())
        me.frictionAir = 0.01 //* (0.8 + 0.4 * Math.random());
        me.restitution = 0.5;
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isMobBullet = true;
        me.showHealthBar = false;
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
        me.do = function () {
            // this.seePlayer.yes = false;
            this.alwaysSeePlayer()
            this.attraction();
            this.timeLimit();
        };
    },
    spawner(x, y, radius = 55 + Math.ceil(Math.random() * 50)) {
        mobs.spawn(x, y, 4, radius, "rgb(255,150,0)");
        let me = mob[mob.length - 1];
        me.g = 0.0004; //required if using this.gravity
        me.leaveBody = false;
        // me.isDropPowerUp = false;
        me.onDeath = function () { //run this function on death
            for (let i = 0; i < Math.ceil(this.mass * 0.15 + Math.random() * 2.5); ++i) {
                spawn.spawns(this.position.x + (Math.random() - 0.5) * radius * 2.5, this.position.y + (Math.random() - 0.5) * radius * 2.5);
                Matter.Body.setVelocity(mob[mob.length - 1], {
                    x: this.velocity.x + (Math.random() - 0.5) * 15,
                    y: this.velocity.x + (Math.random() - 0.5) * 15
                });
            }
        };
        spawn.shield(me, x, y);
        me.do = function () {
            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
        };
    },
    spawns(x, y, radius = 15) {
        mobs.spawn(x, y, 4, radius, "rgb(255,0,0)");
        let me = mob[mob.length - 1];
        me.onHit = function () { //run this function on hitting player
            this.explode();
        };
        // me.stroke = "transparent"
        me.collisionFilter.mask = cat.player | cat.bullet | cat.body | cat.map | cat.mob
        me.showHealthBar = false;
        Matter.Body.setDensity(me, 0.0001); //normal is 0.001
        me.g = 0.00002; //required if using this.gravity 
        me.accelMag = 0.00012 * simulation.accelScale;
        // me.memory = 30;
        me.isDropPowerUp = false
        me.leaveBody = false;
        me.seePlayerFreq = Math.floor((80 + 50 * Math.random()));
        me.frictionAir = 0.004;
        me.do = function () {
            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();

            // this.alwaysSeePlayer();
            // this.checkStatus();
            // this.attraction();
        };
    },
    exploder(x, y, radius = 40 + Math.ceil(Math.random() * 50)) {
        mobs.spawn(x, y, 4, radius, "rgb(255,0,0)");
        let me = mob[mob.length - 1];
        Matter.Body.setDensity(me, 0.0013); //normal is 0.001
        me.onHit = function () {
            //run this function on hitting player
            this.explode(2.5 * this.mass);
        };
        me.g = 0.0004; //required if using this.gravity
        // spawn.shield(me, x, y);
        me.do = function () {
            //draw aura 
            ctx.beginPath();
            const vertices = this.vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.strokeStyle = `rgba(255,0,50,${0.13 + 0.45 * Math.random()})`
            ctx.lineWidth = 30
            ctx.stroke();
            ctx.strokeStyle = "rgba(255,0,50,0.1)"
            ctx.lineWidth = 70
            ctx.stroke();

            this.gravity();
            this.seePlayerCheck();
            this.checkStatus();
            this.attraction();
        };
    },
    snakeSpitBoss(x, y, radius = 50) {
        let angle = Math.PI
        const tailRadius = 300

        const color1 = "rgb(235,180,255)"
        mobs.spawn(x + tailRadius * Math.cos(angle), y + tailRadius * Math.sin(angle), 8, radius, color1); //"rgb(55,170,170)"
        let me = mob[mob.length - 1];
        me.isBoss = true;
        me.accelMag = 0.0001 + 0.0004 * Math.sqrt(simulation.accelScale)
        // me.accelMag = 0.0004 + 0.0002 * Math.sqrt(simulation.accelScale)
        me.memory = 250;
        me.laserRange = 500;
        Matter.Body.setDensity(me, 0.0022 + 0.00022 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.startingDamageReduction = 0.14
        me.damageReduction = 0
        me.isInvulnerable = true

        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            me.onDeath = function () {
                powerUps.spawnBossPowerUp(this.position.x, this.position.y)
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (this.id === mob[i].snakeHeadID && mob[i].alive) mob[i].death()
                }
            };
        };
        me.canFire = false;
        me.closestVertex1 = 0;
        me.cycle = 0
        me.do = function () {
            // this.armor();
            this.seePlayerByHistory(40)
            this.checkStatus();
            this.attraction();
            this.cycle++
            if (this.seePlayer.recall && ((this.cycle % 10) === 0)) {
                if (this.canFire) {
                    if (this.cycle > 120) {
                        this.cycle = 0
                        this.canFire = false
                        // Matter.Body.setAngularVelocity(this, 0.1)
                        // const forceMag = 0.01 * this.mass;
                        // const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                        // this.force.x -= 2 * forceMag * Math.cos(angle);
                        // this.force.y -= 2 * forceMag * Math.sin(angle); // - 0.0007 * this.mass; //antigravity
                    }
                    spawn.seeker(this.vertices[this.closestVertex1].x, this.vertices[this.closestVertex1].y, 6)
                    Matter.Body.setDensity(mob[mob.length - 1], 0.000001); //normal is 0.001
                    const velocity = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.closestVertex1], this.position)), 15)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    });
                    // spawn.seeker(this.vertices[this.closestVertex2].x, this.vertices[this.closestVertex2].y, 6)
                    // Matter.Body.setDensity(mob[mob.length - 1], 0.000001); //normal is 0.001
                    // const velocity2 = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[this.closestVertex2])), -10)
                    // Matter.Body.setVelocity(mob[mob.length - 1], {
                    //     x: this.velocity.x + velocity2.x,
                    //     y: this.velocity.y + velocity2.y
                    // });
                } else if (this.cycle > 200) {
                    this.cycle = 0
                    this.canFire = true

                    //find closest 2 vertexes
                    let distance2 = Infinity
                    for (let i = 0; i < this.vertices.length; i++) {
                        const d = Vector.magnitudeSquared(Vector.sub(this.vertices[i], player.position))
                        if (d < distance2) {
                            distance2 = d
                            // this.closestVertex2 = this.closestVertex1
                            this.closestVertex1 = i
                        }
                    }
                    // if (this.closestVertex2 === this.closestVertex1) {
                    //     this.closestVertex2++
                    //     if (this.closestVertex2 === this.vertices.length) this.closestVertex2 = 0
                    // }
                }
            }
            if (this.isInvulnerable) {
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 20;
                ctx.strokeStyle = "rgba(255,255,255,0.7)";
                ctx.stroke();
            }
        };
        //extra space to give head room
        angle -= 0.07
        let previousTailID = 0
        const nodes = Math.min(10 + Math.ceil(0.6 * simulation.difficulty), 60)
        for (let i = 0; i < nodes; ++i) {
            angle -= 0.1
            spawn.snakeBody(x + tailRadius * Math.cos(angle), y + tailRadius * Math.sin(angle), i === 0 ? 25 : 20);
            if (i < 4) mob[mob.length - 1].snakeHeadID = me.id
            mob[mob.length - 1].previousTailID = previousTailID
            previousTailID = mob[mob.length - 1].id
        }
        const damping = 1
        const stiffness = 1
        this.constrain2AdjacentMobs(nodes, stiffness, false, damping);
        for (let i = mob.length - 1, len = i - nodes; i > len; i--) { //set alternating colors
            if (i % 2) {
                mob[i].fill = "#778"
            } else {
                mob[i].fill = color1
            }
        }
        //constraint with first 3 mobs in line
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes + 1],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes + 2],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
    },
    dragonFlyBoss(x, y, radius = 42) { //snake boss with a laser head
        let angle = Math.PI
        const tailRadius = 300
        mobs.spawn(x + tailRadius * Math.cos(angle), y + tailRadius * Math.sin(angle), 8, radius, "#000"); //"rgb(55,170,170)"
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.00165 + 0.00011 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.startingDamageReduction = 0.1
        me.damageReduction = 0
        me.isInvulnerable = true

        me.accelMag = 0.00008 + 0.00045 * Math.sqrt(simulation.accelScale)
        me.memory = 250;
        me.seePlayerFreq = 13
        me.flapRate = 0.4
        me.flapArc = 0.2 //don't go past 1.57 for normal flaps
        me.wingLength = 150
        me.ellipticity = 0.3
        me.angleOff = 0.4

        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            for (let i = 0, len = mob.length; i < len; i++) {
                if (this.id === mob[i].snakeHeadID && mob[i].alive) mob[i].death()
            }
        };
        me.do = function () {
            this.seePlayerByHistory(40)
            this.checkStatus();
            this.attraction();

            let a //used to set the angle of wings
            if (this.isInvulnerable) {
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 12;
                ctx.strokeStyle = "rgba(255,255,255,0.9)";
                ctx.stroke();
                const sub = Vector.sub(this.position, this.snakeBody1.position)
                a = Math.atan2(sub.y, sub.x)
            } else {
                a = Math.atan2(this.velocity.y, this.velocity.x)
            }

            ctx.fillStyle = `hsla(${160 + 40 * Math.random()}, 100%, ${25 + 25 * Math.random() * Math.random()}%, 0.9)`; //"rgba(0,235,255,0.3)";   // ctx.fillStyle = `hsla(44, 79%, 31%,0.4)`; //"rgba(0,235,255,0.3)";
            this.wing(a + Math.PI / 2 + this.angleOff + this.flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingLength, this.ellipticity)
            this.wing(a - Math.PI / 2 - this.angleOff - this.flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingLength, this.ellipticity)
            this.wing(a - Math.PI / 2 + this.angleOff + this.flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingLength, this.ellipticity)
            this.wing(a + Math.PI / 2 - this.angleOff - this.flapArc * Math.sin(simulation.cycle * this.flapRate), this.wingLength, this.ellipticity)
        };

        angle -= 0.07
        let previousTailID = 0
        const nodes = Math.min(10 + Math.ceil(0.6 * simulation.difficulty), 60)
        for (let i = 0; i < nodes; ++i) {
            angle -= 0.1
            spawn.snakeBody(x + tailRadius * Math.cos(angle), y + tailRadius * Math.sin(angle), i === 0 ? 25 : 20);
            const who = mob[mob.length - 1]
            who.fill = `hsl(${160 + 40 * Math.random()}, 100%, ${5 + 25 * Math.random() * Math.random()}%)`
            if (i < 4) who.snakeHeadID = me.id
            if (i === 0) me.snakeBody1 = who //track this segment, so the difference in position between this segment and the head can be used to angle the wings
            who.previousTailID = previousTailID
            previousTailID = who.id
        }
        const damping = 1
        const stiffness = 1
        this.constrain2AdjacentMobs(nodes, stiffness, false, damping);
        //constraint with first few mobs in tail
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes + 1],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
        consBB[consBB.length] = Constraint.create({
            bodyA: mob[mob.length - nodes + 2],
            bodyB: mob[mob.length - 1 - nodes],
            stiffness: stiffness,
            damping: damping
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
    },
    snakeBody(x, y, radius = 10) {
        mobs.spawn(x, y, 8, radius, "rgba(0,180,180,0.4)");
        let me = mob[mob.length - 1];
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body //| cat.mob 
        me.damageReduction = 0.031
        Matter.Body.setDensity(me, 0.0001); //normal is 0.001

        // me.accelMag = 0.0007 * simulation.accelScale;
        me.leaveBody = Math.random() < 0.33 ? true : false;
        me.showHealthBar = false;
        me.isDropPowerUp = false;
        me.frictionAir = 0;
        me.isSnakeTail = true;
        me.stroke = "transparent"
        me.onDeath = function () {
            setTimeout(() => {
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (this.id === mob[i].previousTailID && mob[i].alive) mob[i].death()
                    if (this.snakeHeadID === mob[i].id) {
                        mob[i].isInvulnerable = false
                        mob[i].damageReduction = mob[i].startingDamageReduction
                    } else if (mob[i].isSnakeTail) {
                        //damage all snake tails
                        mob[i].health *= 0.95
                    }
                }
            }, 500);
        };
        me.do = function () {
            this.checkStatus();
        };
        // me.doActive = function() {
        //     this.checkStatus();
        //     this.alwaysSeePlayer();
        //     this.attraction();
        // };
    },
    tetherBoss(x, y, constraint, radius = 90) {
        // constrained mob boss for the towers level
        // often has a ring of mobs around it
        mobs.spawn(x, y, 8, radius, "rgb(0,60,80)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.0006 + 0.0001 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.27
        me.startingDamageReduction = me.damageReduction
        me.isInvulnerable = false
        me.nextHealthThreshold = 0.75
        me.invulnerableCount = 0
        me.g = 0.0001; //required if using this.gravity
        me.accelMag = 0.0012 + 0.0013 * simulation.accelScale;
        me.memory = 20;
        me.repulsionRange = 1800 * 1800

        cons[cons.length] = Constraint.create({
            pointA: { x: constraint.x, y: constraint.y },
            bodyB: me,
            stiffness: 0.00012
        });
        Composite.add(engine.world, cons[cons.length - 1]);

        spawn.shield(me, x, y, 1);
        setTimeout(() => { spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random()) }, 100); //have to wait a sec so the tether constraint doesn't attach to an orbital
        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
            this.removeCons(); //remove constraint
            me.babies(0.05 * simulation.difficulty + 1)
        };
        me.babies = function (len) {
            const delay = Math.max(3, Math.floor(15 - len / 2))
            let i = 0
            let spawnFlutters = () => {
                if (i < len) {
                    if (!(simulation.cycle % delay) && !simulation.paused && !simulation.isChoosing && m.alive) {
                        // const phase = i / len * 2 * Math.PI
                        // const where = Vector.add(this.position, Vector.mult({ x: Math.cos(phase), y: Math.sin(phase) }, radius * 1.5))
                        const unit = Vector.normalise(Vector.sub(player.position, this.position))
                        const velocity = Vector.mult(unit, 10 + 10 * Math.random())
                        const where = Vector.add(this.position, Vector.mult(unit, radius * 1.2))
                        spawn.allowShields = false
                        spawn.flutter(where.x, where.y, Math.floor(9 + 8 * Math.random()))
                        const who = mob[mob.length - 1]
                        Matter.Body.setDensity(who, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
                        Matter.Body.setVelocity(who, velocity);
                        Matter.Body.setAngle(who, Math.atan2(velocity.y, velocity.x))

                        this.alertNearByMobs();
                        spawn.allowShields = true
                        i++
                    }
                    requestAnimationFrame(spawnFlutters);
                }
            }
            requestAnimationFrame(spawnFlutters);
        }
        me.onDamage = function () {
            if (this.health < this.nextHealthThreshold && this.alive) {
                this.health = this.nextHealthThreshold - 0.01
                this.nextHealthThreshold = Math.floor(this.health * 4) / 4
                this.invulnerableCount = 90 + Math.floor(30 * Math.random())
                this.isInvulnerable = true
                this.damageReduction = 0
            }
        };
        me.do = function () {
            this.gravity();
            if (this.isInvulnerable) {
                this.repulsion();
                this.invulnerableCount--
                if (this.invulnerableCount < 0) {
                    this.isInvulnerable = false
                    this.damageReduction = this.startingDamageReduction
                    this.frictionAir = 0.05
                    me.babies(0.07 * simulation.difficulty + 2)
                    if (this.radius > 15) {
                        const scale = 0.88;
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale;
                    }
                }
                //draw invulnerable
                ctx.beginPath();
                let vertices = this.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.lineWidth = 13 + 5 * Math.random();
                ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                ctx.stroke();
            } else {
                this.seePlayerCheck();
                this.checkStatus();
                this.attraction();
            }
        };
    },
    //chance = Math.min(0.02 + simulation.difficulty * 0.005, 0.2) + tech.duplicationChance()
    shield(target, x, y, chance = (level.isMobShields ? 4 : 1) * Math.min(0.02 + simulation.difficulty * 0.005, 0.2)) {
        if (this.allowShields && Math.random() < chance) {
            mobs.spawn(x, y, 9, target.radius + 30, "rgba(220,220,255,0.9)");
            let me = mob[mob.length - 1];
            me.stroke = "rgb(220,220,255)";
            Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
            me.shield = true;
            me.damageReduction = 0.05
            me.isUnblockable = true
            me.collisionFilter.category = cat.mobShield
            me.collisionFilter.mask = cat.bullet;
            consBB[consBB.length] = Constraint.create({
                bodyA: me,
                bodyB: target, //attach shield to target
                stiffness: 0.4,
                damping: 0.1
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);

            me.onDamage = function () {
                //make sure the mob that owns the shield can tell when damage is done
                this.alertNearByMobs();
                this.fill = `rgba(220,220,255,${0.3 + 0.6 * this.health})`
            };
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.showHealthBar = false;

            me.shieldTargetID = target.id
            target.isShielded = true;
            if (target.shieldCount > 0) {
                target.shieldCount++
            } else {
                target.shieldCount = 1
            }
            me.shieldCount = target.shieldCount //used with "bubble fusion"
            target.shieldID = me.id

            me.onDeath = function () {
                //clear isShielded status from target
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].id === this.shieldTargetID) mob[i].isShielded = false;
                }
            };
            me.do = function () {
                this.checkStatus();
            };

            mob.unshift(me); //move shield to the front of the array, so that mob is behind shield graphically

            //swap order of shield and mob, so that mob is behind shield graphically
            // mob[mob.length - 1] = mob[mob.length - 2];
            // mob[mob.length - 2] = me;
        }
    },
    groupShield(targets, x, y, radius, stiffness = 0.4) {
        const nodes = targets.length
        mobs.spawn(x, y, 9, radius, "rgba(220,220,255,0.9)");
        let me = mob[mob.length - 1];
        me.stroke = "rgb(220,220,255)";
        Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
        me.frictionAir = 0;
        me.shield = true;
        me.damageReduction = 0.075
        me.collisionFilter.category = cat.mobShield
        me.collisionFilter.mask = cat.bullet;
        for (let i = 0; i < nodes; ++i) {
            mob[mob.length - i - 2].isShielded = true;
            //constrain to all mob nodes in group
            consBB[consBB.length] = Constraint.create({
                bodyA: me,
                bodyB: mob[mob.length - i - 2],
                stiffness: stiffness,
                damping: 0.1
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        me.onDamage = function () {
            this.alertNearByMobs(); //makes sure the mob that owns the shield can tell when damage is done
            this.fill = `rgba(220,220,255,${0.3 + 0.6 * this.health})`
        };
        me.onDeath = function () {
            //clear isShielded status from target
            for (let j = 0; j < targets.length; j++) {
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].id === targets[j]) mob[i].isShielded = false;
                }
            }
        };
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        mob[mob.length - 1] = mob[mob.length - 1 - nodes];
        mob[mob.length - 1 - nodes] = me;
        me.do = function () {
            this.checkStatus();
        };
    },
    spawnOrbitals(who, radius, chance = Math.min(0.25 + simulation.difficulty * 0.005)) {
        if (Math.random() < chance) {
            const len = Math.floor(Math.min(15, 3 + Math.sqrt(simulation.difficulty)))
            const speed = (0.003 + 0.004 * Math.random() + 0.002 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
            const offSet = 6.28 * Math.random()
            for (let i = 0; i < len; i++) spawn.orbital(who, radius, i / len * 2 * Math.PI + offSet, speed)
        }
    },
    orbital(who, radius, phase, speed) {
        // for (let i = 0, len = 7; i < len; i++) spawn.orbital(me, radius + 250, 2 * Math.PI / len * i)
        mobs.spawn(who.position.x, who.position.y, 8, 12, "rgb(255,0,150)");
        let me = mob[mob.length - 1];
        me.stroke = "transparent";
        Matter.Body.setDensity(me, 0.01); //normal is 0.001
        me.leaveBody = false;
        me.isDropPowerUp = false;
        me.isBadTarget = true;
        me.isUnstable = true; //dies when blocked
        me.showHealthBar = false;
        me.isOrbital = true;
        // me.isShielded = true
        me.collisionFilter.category = cat.mobBullet;
        me.collisionFilter.mask = cat.bullet; //cat.player | cat.map | cat.body
        me.do = function () {
            //if host is gone
            if (!who || !who.alive) {
                this.death();
                return
            }
            //set orbit
            const time = simulation.cycle * speed + phase
            const orbit = {
                x: Math.cos(time),
                y: Math.sin(time)
            }
            Matter.Body.setPosition(this, Vector.add(Vector.add(who.position, who.velocity), Vector.mult(orbit, radius)))
            //damage player
            if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                const dmg = 0.03 * simulation.dmgScale
                m.damage(dmg);
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: Math.sqrt(dmg) * 200,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                });
                this.death();
            }
        };
    },
    orbitalBoss(x, y, radius = 70) {
        const nodeBalance = Math.random()
        const nodes = Math.min(15, Math.floor(2 + 4 * nodeBalance + 0.75 * Math.sqrt(simulation.difficulty)))
        mobs.spawn(x, y, nodes, radius, "rgb(255,0,150)");
        let me = mob[mob.length - 1];
        me.isBoss = true;
        Matter.Body.setDensity(me, 0.0018 + 0.00015 * Math.sqrt(simulation.difficulty)); //extra dense //normal is 0.001 //makes effective life much larger
        me.damageReduction = 0.11

        me.stroke = "transparent"; //used for drawGhost
        me.seeAtDistance2 = 2000000;
        me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map
        me.memory = Infinity;
        me.frictionAir = 0.04;
        me.accelMag = 0.0002 + 0.00015 * simulation.accelScale
        spawn.shield(me, x, y, 1);

        const rangeInnerVsOuter = Math.random()
        let speed = (0.006 + 0.001 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
        let range = radius + 350 + 200 * rangeInnerVsOuter + nodes * 7
        for (let i = 0; i < nodes; i++) spawn.orbital(me, range, i / nodes * 2 * Math.PI, speed)
        const orbitalIndexes = [] //find indexes for all the current nodes
        for (let i = 0; i < nodes; i++) orbitalIndexes.push(mob.length - 1 - i)
        // add orbitals for each orbital
        range = Math.max(60, 100 + 100 * Math.random() - nodes * 3 - rangeInnerVsOuter * 80)
        speed = speed * (1.25 + 2 * Math.random())
        const subNodes = Math.max(2, Math.floor(6 - 5 * nodeBalance + 0.5 * Math.sqrt(simulation.difficulty)))
        for (let j = 0; j < nodes; j++) {
            for (let i = 0, len = subNodes; i < len; i++) spawn.orbital(mob[orbitalIndexes[j]], range, i / len * 2 * Math.PI, speed)
        }
        for (let i = 0, len = 3 + 0.5 * Math.sqrt(simulation.difficulty); i < len; i++) spawn.spawnOrbitals(me, radius + 40 + 10 * i, 1);

        me.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y)
        };
        me.do = function () {
            this.seePlayerByHistory();
            this.checkStatus();
            this.attraction();
        };
    },
    //complex constrained mob templates**********************************************************************
    //*******************************************************************************************************
    allowShields: true,
    nodeGroup(
        x,
        y,
        spawn = "striker",
        nodes = Math.min(2 + Math.ceil(Math.random() * (simulation.difficulty + 2)), 8),
        //Math.ceil(Math.random() * 3) + Math.min(4,Math.ceil(simulation.difficulty/2)),
        radius = Math.ceil(Math.random() * 10) + 18, // radius of each node mob
        sideLength = Math.ceil(Math.random() * 100) + 70, // distance between each node mob
        stiffness = Math.random() * 0.03 + 0.005
    ) {
        this.allowShields = false; //don't want shields on individual group mobs
        const angle = 2 * Math.PI / nodes
        let targets = []
        for (let i = 0; i < nodes; ++i) {
            let whoSpawn = spawn;
            if (spawn === "random") {
                whoSpawn = this.fullPickList[Math.floor(Math.random() * this.fullPickList.length)];
            } else if (spawn === "randomList") {
                whoSpawn = this.pickList[Math.floor(Math.random() * this.pickList.length)];
            }
            this[whoSpawn](x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), radius);
            targets.push(mob[mob.length - 1].id) //track who is in the group, for shields
        }
        if (Math.random() < 0.3) {
            this.constrain2AdjacentMobs(nodes, stiffness * 2, true);
        } else {
            this.constrainAllMobCombos(nodes, stiffness);
        }
        //spawn shield for entire group
        if (nodes > 2 && Math.random() < 0.998) {
            this.groupShield(targets, x, y, sideLength + 2.5 * radius + nodes * 6 - 25);
        }
        this.allowShields = true;
    },
    lineGroup(
        x,
        y,
        spawn = "striker",
        nodes = Math.min(3 + Math.ceil(Math.random() * simulation.difficulty + 2), 8),
        //Math.ceil(Math.random() * 3) + Math.min(4,Math.ceil(simulation.difficulty/2)),
        radius = Math.ceil(Math.random() * 10) + 17,
        l = Math.ceil(Math.random() * 80) + 30,
        stiffness = Math.random() * 0.06 + 0.01
    ) {
        this.allowShields = false; //don't want shields on individual group mobs
        for (let i = 0; i < nodes; ++i) {
            let whoSpawn = spawn;
            if (spawn === "random") {
                whoSpawn = this.fullPickList[Math.floor(Math.random() * this.fullPickList.length)];
            } else if (spawn === "randomList") {
                whoSpawn = this.pickList[Math.floor(Math.random() * this.pickList.length)];
            }
            this[whoSpawn](x + i * radius + i * l, y, radius);
        }
        this.constrain2AdjacentMobs(nodes, stiffness);
        this.allowShields = true;
    },
    //constraints ************************************************************************************************
    //*************************************************************************************************************
    constrainAllMobCombos(nodes, stiffness) {
        //runs through every combination of last 'num' bodies and constrains them
        for (let i = 1; i < nodes + 1; ++i) {
            for (let j = i + 1; j < nodes + 1; ++j) {
                consBB[consBB.length] = Constraint.create({
                    bodyA: mob[mob.length - i],
                    bodyB: mob[mob.length - j],
                    stiffness: stiffness
                });
                Composite.add(engine.world, consBB[consBB.length - 1]);
            }
        }
    },
    constrain2AdjacentMobs(nodes, stiffness, loop = false, damping = 0) {
        //runs through every combination of last 'num' bodies and constrains them
        for (let i = 0; i < nodes - 1; ++i) {
            consBB[consBB.length] = Constraint.create({
                bodyA: mob[mob.length - i - 1],
                bodyB: mob[mob.length - i - 2],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        if (nodes > 2) {
            for (let i = 0; i < nodes - 2; ++i) {
                consBB[consBB.length] = Constraint.create({
                    bodyA: mob[mob.length - i - 1],
                    bodyB: mob[mob.length - i - 3],
                    stiffness: stiffness,
                    damping: damping
                });
                Composite.add(engine.world, consBB[consBB.length - 1]);
            }
        }
        //optional connect the tail to head
        if (loop && nodes > 3) {
            consBB[consBB.length] = Constraint.create({
                bodyA: mob[mob.length - 1],
                bodyB: mob[mob.length - nodes],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
            consBB[consBB.length] = Constraint.create({
                bodyA: mob[mob.length - 2],
                bodyB: mob[mob.length - nodes],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
            consBB[consBB.length] = Constraint.create({
                bodyA: mob[mob.length - 1],
                bodyB: mob[mob.length - nodes + 1],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
    },
    constraintPB(x, y, bodyIndex, stiffness) {
        cons[cons.length] = Constraint.create({
            pointA: {
                x: x,
                y: y
            },
            bodyB: body[bodyIndex],
            stiffness: stiffness
        });
        Composite.add(engine.world, cons[cons.length - 1]);
    },
    constraintBB(bodyIndexA, bodyIndexB, stiffness) {
        consBB[consBB.length] = Constraint.create({
            bodyA: body[bodyIndexA],
            bodyB: body[bodyIndexB],
            stiffness: stiffness
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);
    },
    // body and map spawns ******************************************************************************
    //**********************************************************************************************
    wireHead() {
        //not a mob, just a graphic for level 1
        const breakingPoint = 1300
        mobs.spawn(breakingPoint, -100, 0, 7.5, "transparent");
        let me = mob[mob.length - 1];
        me.collisionFilter.category = cat.body;
        me.collisionFilter.mask = cat.map;
        me.inertia = Infinity;
        me.g = 0.0004; //required for gravity
        me.restitution = 0;
        me.stroke = "transparent"
        me.freeOfWires = false;
        me.frictionStatic = 1;
        me.friction = 1;
        me.frictionAir = 0.01;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.isBadTarget = true;
        me.isUnblockable = true;

        me.do = function () {
            let wireX = -50;
            let wireY = -1000;
            if (this.freeOfWires) {
                this.gravity();
            } else {
                if (m.pos.x > breakingPoint || simulation.isCheating) {
                    this.freeOfWires = true;
                    this.fill = "#000"
                    this.force.x += -0.003;
                    player.force.x += 0.06;
                    // player.force.y -= 0.15;
                    //remove difficulty power up if the wire breaks to prevent getting power ups and then making the difficulty harder
                    for (let i = 0; i < powerUp.length; ++i) {
                        if (powerUp[i].name === "difficulty") {
                            Matter.Composite.remove(engine.world, powerUp[i]);
                            powerUp.splice(i, 1);
                        }
                    }

                }

                //player is extra heavy from wires
                Matter.Body.setVelocity(player, { x: player.velocity.x, y: player.velocity.y + 0.3 })

                //player friction from the wires
                if (m.pos.x > 700 && player.velocity.x > -2) {
                    let wireFriction = 0.75 * Math.min(0.6, Math.max(0, 100 / (breakingPoint - m.pos.x)));
                    if (!m.onGround) wireFriction *= 3
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x - wireFriction,
                        y: player.velocity.y
                    })
                }
                //move to player
                Matter.Body.setPosition(this, { x: m.pos.x + (42 * Math.cos(m.angle + Math.PI)), y: m.pos.y + (42 * Math.sin(m.angle + Math.PI)) })
            }
            //draw wire
            ctx.beginPath();
            ctx.moveTo(wireX, wireY);
            ctx.quadraticCurveTo(wireX, 0, this.position.x, this.position.y);
            if (!this.freeOfWires) ctx.lineTo(m.pos.x + (30 * Math.cos(m.angle + Math.PI)), m.pos.y + (30 * Math.sin(m.angle + Math.PI)));
            ctx.lineCap = "butt";
            ctx.lineWidth = 15;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.lineCap = "round";
        };
    },
    wireKnee() {
        //not a mob, just a graphic for level 1
        const breakingPoint = 1425
        mobs.spawn(breakingPoint, -100, 0, 2, "transparent");
        let me = mob[mob.length - 1];
        //touch nothing
        me.collisionFilter.category = cat.body;
        me.collisionFilter.mask = cat.map;
        me.g = 0.0003; //required for gravity
        // me.restitution = 0;
        me.stroke = "transparent"
        // me.inertia = Infinity;
        me.restitution = 0;
        me.freeOfWires = false;
        me.frictionStatic = 1;
        me.friction = 1;
        me.frictionAir = 0.01;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.isBadTarget = true;
        me.isUnblockable = true;

        me.do = function () {
            let wireX = -50 - 20;
            let wireY = -1000;

            if (this.freeOfWires) {
                this.gravity();
            } else {
                if (m.pos.x > breakingPoint || simulation.isCheating) {
                    this.freeOfWires = true;
                    this.force.x -= 0.0004;
                    this.fill = "#222";
                }
                //move mob to player
                m.calcLeg(0, 0);
                Matter.Body.setPosition(this, {
                    x: m.pos.x + m.flipLegs * m.knee.x - 5,
                    y: m.pos.y + m.knee.y
                })
            }
            //draw wire
            ctx.beginPath();
            ctx.moveTo(wireX, wireY);
            ctx.quadraticCurveTo(wireX, 0, this.position.x, this.position.y);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#222";
            ctx.lineCap = "butt";
            ctx.stroke();
            ctx.lineCap = "round";
        };
    },
    wireKneeLeft() {
        //not a mob, just a graphic for level 1
        const breakingPoint = 1400
        mobs.spawn(breakingPoint, -100, 0, 2, "transparent");
        let me = mob[mob.length - 1];
        //touch nothing
        me.collisionFilter.category = cat.body;
        me.collisionFilter.mask = cat.map;
        me.g = 0.0003; //required for gravity
        // me.restitution = 0;
        me.stroke = "transparent"
        // me.inertia = Infinity;
        me.restitution = 0;
        me.freeOfWires = false;
        me.frictionStatic = 1;
        me.friction = 1;
        me.frictionAir = 0.01;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.isBadTarget = true;
        me.isUnblockable = true;

        me.do = function () {
            let wireX = -50 - 35;
            let wireY = -1000;

            if (this.freeOfWires) {
                this.gravity();
            } else {
                if (m.pos.x > breakingPoint || simulation.isCheating) {
                    this.freeOfWires = true;
                    this.force.x += -0.0003;
                    this.fill = "#333";
                }
                //move mob to player
                m.calcLeg(Math.PI, -3);
                Matter.Body.setPosition(this, {
                    x: m.pos.x + m.flipLegs * m.knee.x - 5,
                    y: m.pos.y + m.knee.y
                })
            }
            //draw wire
            ctx.beginPath();
            ctx.moveTo(wireX, wireY);
            ctx.quadraticCurveTo(wireX, 0, this.position.x, this.position.y);
            ctx.lineWidth = 5;
            ctx.lineCap = "butt";
            ctx.strokeStyle = "#333";
            ctx.stroke();
            ctx.lineCap = "round";
        };
    },
    wireFoot() {
        //not a mob, just a graphic for level 1
        const breakingPoint = 1350
        mobs.spawn(breakingPoint, -100, 0, 2, "transparent");
        let me = mob[mob.length - 1];
        //touch nothing
        me.collisionFilter.category = cat.body;
        me.collisionFilter.mask = cat.map;
        me.g = 0.0003; //required for gravity
        me.restitution = 0;
        me.stroke = "transparent"
        // me.inertia = Infinity;
        me.freeOfWires = false;
        // me.frictionStatic = 1;
        // me.friction = 1;
        me.frictionAir = 0.01;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.isBadTarget = true;
        me.isUnblockable = true;

        me.do = function () {
            let wireX = -50 + 16;
            let wireY = -1000;

            if (this.freeOfWires) {
                this.gravity();
            } else {
                if (m.pos.x > breakingPoint || simulation.isCheating) {
                    this.freeOfWires = true;
                    this.force.x += -0.0006;
                    this.fill = "#111";
                }
                //move mob to player
                m.calcLeg(0, 0);
                Matter.Body.setPosition(this, {
                    x: m.pos.x + m.flipLegs * m.foot.x - 5,
                    y: m.pos.y + m.foot.y - 1
                })
            }
            //draw wire
            ctx.beginPath();
            ctx.moveTo(wireX, wireY);
            ctx.quadraticCurveTo(wireX, 0, this.position.x, this.position.y);
            ctx.lineWidth = 5;
            ctx.lineCap = "butt";
            ctx.strokeStyle = "#111";
            ctx.stroke();
            ctx.lineCap = "round";
        };
    },
    wireFootLeft() {
        //not a mob, just a graphic for level 1
        const breakingPoint = 1325
        mobs.spawn(breakingPoint, -100, 0, 2, "transparent");
        let me = mob[mob.length - 1];
        //touch nothing
        me.collisionFilter.category = cat.body;
        me.collisionFilter.mask = cat.map;
        me.g = 0.0003; //required for gravity
        me.restitution = 0;
        me.stroke = "transparent"
        // me.inertia = Infinity;
        me.freeOfWires = false;
        // me.frictionStatic = 1;
        // me.friction = 1;
        me.frictionAir = 0.01;
        me.isDropPowerUp = false;
        me.showHealthBar = false;
        me.isBadTarget = true;
        me.isUnblockable = true;

        me.do = function () {
            let wireX = -50 + 26;
            let wireY = -1000;

            if (this.freeOfWires) {
                this.gravity();
            } else {
                if (m.pos.x > breakingPoint || simulation.isCheating) {
                    this.freeOfWires = true;
                    this.force.x += -0.0005;
                    this.fill = "#222";
                }
                //move mob to player
                m.calcLeg(Math.PI, -3);
                Matter.Body.setPosition(this, {
                    x: m.pos.x + m.flipLegs * m.foot.x - 5,
                    y: m.pos.y + m.foot.y - 1
                })
            }
            //draw wire
            ctx.beginPath();
            ctx.moveTo(wireX, wireY);
            ctx.quadraticCurveTo(wireX, 0, this.position.x, this.position.y);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#222";
            ctx.lineCap = "butt";
            ctx.stroke();
            ctx.lineCap = "round";
        };
    },
    boost(x, y, height = 1000) {
        spawn.mapVertex(x + 50, y + 35, "120 40 -120 40 -50 -40 50 -40");
        level.addQueryRegion(x, y - 20, 100, 20, "boost", [
            [player], body, mob, powerUp, bullet
        ], -1.21 * Math.sqrt(Math.abs(height)));
    },
    blockDoor(x, y, blockSize = 60) {
        spawn.mapRect(x, y - 290, 40, 60); // door lip
        spawn.mapRect(x, y, 40, 50); // door lip
        for (let i = 0; i < 4; ++i) {
            spawn.bodyRect(x + 5, y - 260 + i * blockSize + i * 3, 30, blockSize);
        }
    },
    debris(x, y, width, number = Math.floor(2 + Math.random() * 9)) {
        for (let i = 0; i < number; ++i) {
            if (Math.random() < 0.15) {
                powerUps.chooseRandomPowerUp(x + Math.random() * width, y);
            } else {
                const size = 18 + Math.random() * 25;
                spawn.bodyRect(x + Math.random() * width, y, size * (0.6 + Math.random()), size * (0.6 + Math.random()), 1);
                // body[body.length] = Bodies.rectangle(x + Math.random() * width, y, size * (0.6 + Math.random()), size * (0.6 + Math.random()));
            }
        }
    },
    bodyRect(x, y, width, height, chance = 1, properties = { friction: 0.05, frictionAir: 0.001 }) { //this is the command that adds blocks to the world in the middle of a level
        if (Math.random() < chance) {
            body[body.length] = Bodies.rectangle(x + width / 2, y + height / 2, width, height, properties);
            const who = body[body.length - 1]
            who.collisionFilter.category = cat.body;
            who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
            Composite.add(engine.world, who); //add to world
            who.classType = "body"
        }
    },
    bodyVertex(x, y, vector, properties) { //this is the command that adds blocks to the world in the middle of a level
        body[body.length] = Matter.Bodies.fromVertices(x, y, Vertices.fromPath(vector), properties);
        const who = body[body.length - 1]
        who.collisionFilter.category = cat.body;
        who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
        Composite.add(engine.world, who); //add to world
        who.classType = "body"
    },
    mapRect(x, y, width, height, properties) { //adds rectangle to map array
        map[map.length] = Bodies.rectangle(x + width / 2, y + height / 2, width, height, properties);
    },
    mapVertex(x, y, vector, properties) { //adds shape to map array
        map[map.length] = Matter.Bodies.fromVertices(x, y, Vertices.fromPath(vector), properties);
    },
    mapRectNow(x, y, width, height, properties, isRedrawMap = true) { //adds rectangle to map array in the middle of a level
        map[map.length] = Bodies.rectangle(x + width / 2, y + height / 2, width, height, properties);
        const who = map[map.length - 1]
        who.collisionFilter.category = cat.map;
        who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
        Matter.Body.setStatic(who, true); //make static
        Composite.add(engine.world, who); //add to world
        if (isRedrawMap) simulation.draw.setPaths()
    },
    mapVertexNow(x, y, vector, properties, isRedrawMap = true) { //adds shape to map array in the middle of a level
        map[map.length] = Matter.Bodies.fromVertices(x, y, Vertices.fromPath(vector), properties);
        const who = map[map.length - 1]
        who.collisionFilter.category = cat.map;
        who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
        Matter.Body.setStatic(who, true); //make static
        Composite.add(engine.world, who); //add to world
        if (isRedrawMap) simulation.draw.setPaths() //this is a bit slow on processing so maybe it's better to run after you spawn several different shapes
    },
    //complex map templates
    spawnBuilding(x, y, w, h, leftDoor, rightDoor, walledSide) {
        this.mapRect(x, y, w, 25); //roof
        this.mapRect(x, y + h, w, 35); //ground
        if (walledSide === "left") {
            this.mapRect(x, y, 25, h); //wall left
        } else {
            this.mapRect(x, y, 25, h - 150); //wall left
            if (leftDoor) {
                this.bodyRect(x + 5, y + h - 150, 15, 150, this.propsFriction); //door left
            }
        }
        if (walledSide === "right") {
            this.mapRect(x - 25 + w, y, 25, h); //wall right
        } else {
            this.mapRect(x - 25 + w, y, 25, h - 150); //wall right
            if (rightDoor) {
                this.bodyRect(x + w - 20, y + h - 150, 15, 150, this.propsFriction); //door right
            }
        }
    },
    spawnStairs(x, y, num, w, h, stepRight) {
        w += 50;
        if (stepRight) {
            for (let i = 0; i < num; i++) {
                this.mapRect(x - (w / num) * (1 + i), y - h + (i * h) / num, w / num + 50, h - (i * h) / num + 50);
            }
        } else {
            for (let i = 0; i < num; i++) {
                this.mapRect(x + (i * w) / num, y - h + (i * h) / num, w / num + 50, h - (i * h) / num + 50);
            }
        }
    },
    //pre-made property options*************************************************************************************
    //*************************************************************************************************************
    //Object.assign({}, propsHeavy, propsBouncy, propsNoRotation)      //will combine properties into a new object
    propsFriction: {
        friction: 0.5,
        frictionAir: 0.02,
        frictionStatic: 1
    },
    propsFrictionMedium: {
        friction: 0.15,
        frictionStatic: 1
    },
    propsBouncy: {
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        restitution: 1
    },
    propsSlide: {
        friction: 0.003,
        frictionStatic: 0.4,
        restitution: 0,
        density: 0.002
    },
    propsLight: {
        density: 0.001
    },
    propsOverBouncy: {
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        restitution: 1.05
    },
    propsHeavy: {
        density: 0.01 //default density is 0.001
    },
    propsIsNotHoldable: {
        isNotHoldable: true
    },
    propsNoRotation: {
        inertia: Infinity //prevents rotation
    },
    propsHoist: {
        inertia: Infinity, //prevents rotation
        frictionAir: 0.001,
        friction: 0.0001,
        frictionStatic: 0,
        restitution: 0,
        isNotHoldable: true
        // density: 0.0001
    },
    propsDoor: {
        density: 0.001, //default density is 0.001
        friction: 0,
        frictionAir: 0.03,
        frictionStatic: 0,
        restitution: 0
    },
    sandPaper: {
        friction: 1,
        frictionStatic: 1,
        restitution: 0
    }
};