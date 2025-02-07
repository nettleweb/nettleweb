//matter.js ***********************************************************
// module aliases
const Engine = Matter.Engine,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Vertices = Matter.Vertices,
    Query = Matter.Query,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

// create an engine
const engine = Engine.create();
engine.world.gravity.scale = 0; //turn off gravity (it's added back in later)
// engine.velocityIterations = 100
// engine.positionIterations = 100
// engine.enableSleeping = true

// matter events
function playerOnGroundCheck(event) {
    //runs on collisions events
    function enter() {
        m.numTouching++;
        if (!m.onGround) {
            m.onGround = true;
            if (m.crouch) {
                if (m.checkHeadClear()) {
                    m.undoCrouch();
                } else {
                    m.yOffGoal = m.yOffWhen.crouch;
                }
            } else {
                //sets a hard land where player stays in a crouch for a bit and can't jump
                //crouch is forced in groundControl below
                const momentum = player.velocity.y * player.mass //player mass is 5 so this triggers at 26 down velocity, unless the player is holding something
                if (momentum > m.hardLanding) {
                    m.doCrouch();
                    m.yOff = m.yOffWhen.jump;
                    m.hardLandCD = m.cycle + m.hardLandCDScale * Math.min(momentum / 6.5 - 6, 40)
                    //falling damage
                    if (tech.isFallingDamage && m.immuneCycle < m.cycle && momentum > 150) {
                        m.damage(Math.min(Math.sqrt(momentum - 133) * 0.01, 0.25));
                        if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                    }
                } else {
                    m.yOffGoal = m.yOffWhen.stand;
                }
            }
        }
    }

    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; ++i) {
        let pair = pairs[i];
        if (pair.bodyA === jumpSensor) {
            m.standingOn = pair.bodyB; //keeping track to correctly provide recoil on jump
            if (m.standingOn.alive !== true || m.immuneCycle > m.cycle) enter();
        } else if (pair.bodyB === jumpSensor) {
            m.standingOn = pair.bodyA; //keeping track to correctly provide recoil on jump
            if (m.standingOn.alive !== true || m.immuneCycle > m.cycle) enter();
        }
    }
    m.numTouching = 0;
}

function playerOffGroundCheck(event) {
    //runs on collisions events
    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; ++i) {
        if (pairs[i].bodyA === jumpSensor || pairs[i].bodyB === jumpSensor) {
            if (m.onGround && m.numTouching === 0) {
                m.onGround = false;
                m.lastOnGroundCycle = m.cycle;
                m.hardLandCD = 0 // disable hard landing
                if (m.checkHeadClear()) {
                    if (m.crouch) {
                        m.undoCrouch();
                    }
                    m.yOffGoal = m.yOffWhen.jump;
                }
            }
        }
    }
}

function collisionChecks(event) {
    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; i++) {
        //mob + (player,bullet,body) collisions
        for (let k = 0; k < mob.length; k++) {
            if (mob[k].alive) {
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
                        (obj === playerBody || obj === playerHead) &&
                        !mob[k].isSlowed && !mob[k].isStunned
                    ) {
                        let dmg = Math.min(Math.max(0.025 * Math.sqrt(mob[k].mass), 0.05), 0.3) * simulation.dmgScale; //player damage is capped at 0.3*dmgScale of 1.0
                        // if (m.isCloak) dmg *= 0.5
                        mob[k].foundPlayer();
                        if (tech.isRewindAvoidDeath && m.energy > 0.85 * Math.min(1, m.maxEnergy) && dmg > 0.01) { //CPT reversal runs in m.damage, but it stops the rest of the collision code here too
                            m.damage(dmg);
                            return
                        }
                        m.damage(dmg); //normal damage

                        if (tech.isCollisionRealitySwitch && m.alive) {
                            m.switchWorlds("Hilbert space")
                            simulation.trails(90)
                            simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> ${Math.random()}`);
                        }
                        if (tech.isPiezo) m.energy += 20.48 * level.isReducedRegen;
                        if (tech.isCouplingNoHit && m.coupling > 0) {
                            m.couplingChange(-3)

                            const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
                            let where = Vector.add(m.pos, Vector.mult(unit, 17))
                            simulation.drawList.push({ //add dmg to draw queue
                                x: where.x,
                                y: where.y,
                                radius: 22,
                                color: 'rgba(0, 171, 238, 0.33)',
                                time: 8
                            });
                            where = Vector.add(m.pos, Vector.mult(unit, 60))
                            simulation.drawList.push({ //add dmg to draw queue
                                x: where.x,
                                y: where.y,
                                radius: 18,
                                color: 'rgba(0, 171, 238, 0.5)',
                                time: 16
                            });
                            where = Vector.add(m.pos, Vector.mult(unit, 100))
                            simulation.drawList.push({ //add dmg to draw queue
                                x: where.x,
                                y: where.y,
                                radius: 14,
                                color: 'rgba(0, 171, 238, 0.6)',
                                time: 24
                            });
                            where = Vector.add(m.pos, Vector.mult(unit, 135))
                            simulation.drawList.push({ //add dmg to draw queue
                                x: where.x,
                                y: where.y,
                                radius: 10,
                                color: 'rgba(0, 171, 238, 0.7)',
                                time: 32
                            });
                        }
                        if (tech.isHarpoonDefense) { //fire harpoons at mobs after getting hit
                            const maxCount = 10 + 3 * tech.extraHarpoons //scale the number of hooks fired
                            let count = maxCount - 1
                            const angle = Math.atan2(mob[k].position.y - player.position.y, mob[k].position.x - player.position.x);
                            const mass = 0.75 * ((tech.isLargeHarpoon) ? 1 + Math.min(0.05 * Math.sqrt(b.guns[9].ammo), 10) : 1)
                            b.harpoon(m.pos, mob[k], angle, mass, true, 7, false) // harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true, thrust = 0.1) {
                            bullet[bullet.length - 1].drain = 0
                            for (; count > 0; count--) {
                                b.harpoon(m.pos, mob[k], angle + count * 2 * Math.PI / maxCount, mass, true, 7, false)
                                bullet[bullet.length - 1].drain = 0
                            }
                        }
                        if (tech.isStimulatedEmission) powerUps.ejectTech()
                        if (mob[k].onHit) mob[k].onHit();
                        if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                        //extra kick between player and mob              //this section would be better with forces but they don't work...
                        let angle = Math.atan2(player.position.y - mob[k].position.y, player.position.x - mob[k].position.x);
                        Matter.Body.setVelocity(player, { x: player.velocity.x + 8 * Math.cos(angle), y: player.velocity.y + 8 * Math.sin(angle) });
                        Matter.Body.setVelocity(mob[k], { x: mob[k].velocity.x - 8 * Math.cos(angle), y: mob[k].velocity.y - 8 * Math.sin(angle) });
                        if (tech.isAnnihilation && !mob[k].shield && !mob[k].isShielded && !mob[k].isBoss && mob[k].isDropPowerUp && m.energy > 0.08 && mob[k].damageReduction > 0) {
                            m.energy -= 0.08 //* Math.max(m.maxEnergy, m.energy) //0.33 * m.energy
                            if (m.immuneCycle === m.cycle + m.collisionImmuneCycles) m.immuneCycle = 0; //player doesn't go immune to collision damage
                            mob[k].death();
                            simulation.drawList.push({ //add dmg to draw queue
                                x: pairs[i].activeContacts[0].vertex.x,
                                y: pairs[i].activeContacts[0].vertex.y,
                                radius: Math.sqrt(dmg) * 500,
                                color: "rgba(255,0,255,0.2)",
                                time: simulation.drawTime
                            });
                        } else {
                            simulation.drawList.push({ //add dmg to draw queue
                                x: pairs[i].activeContacts[0].vertex.x,
                                y: pairs[i].activeContacts[0].vertex.y,
                                radius: Math.sqrt(dmg) * 200,
                                color: simulation.mobDmgColor,
                                time: simulation.drawTime
                            });
                        }
                        // return;
                        // }
                    } else {
                        //mob + bullet collisions
                        if (obj.classType === "bullet" && obj.speed > obj.minDmgSpeed) {
                            obj.beforeDmg(mob[k]); //some bullets do actions when they hits things, like despawn //forces don't seem to work here
                            let dmg = m.dmgScale * (obj.dmg + 0.15 * obj.mass * Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity)))
                            if (tech.isCrit && mob[k].isStunned) dmg *= 4
                            // console.log(dmg) //remove this
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
                            if (tech.isLessDamageReduction && !mob[k].shield) mob[k].damageReduction *= mob[k].isBoss ? (mob[k].isFinalBoss ? 1.0005 : 1.0025) : 1.05
                            return;
                        }
                        //mob + body collisions
                        if (obj.classType === "body" && obj.speed > 9) {
                            const v = Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity));
                            if (v > 11) {
                                if (tech.blockDmg) { //electricity
                                    Matter.Body.setVelocity(mob[k], { x: 0.5 * mob[k].velocity.x, y: 0.5 * mob[k].velocity.y });
                                    if (tech.isBlockRadiation && !mob[k].isShielded && !mob[k].isMobBullet) {
                                        mobs.statusDoT(mob[k], tech.blockDmg * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                                    } else {
                                        mob[k].damage(tech.blockDmg * m.dmgScale)
                                        simulation.drawList.push({
                                            x: pairs[i].activeContacts[0].vertex.x,
                                            y: pairs[i].activeContacts[0].vertex.y,
                                            radius: 28 * mob[k].damageReduction + 3,
                                            color: "rgba(255,0,255,0.8)",
                                            time: 4
                                        });
                                    }
                                }

                                let dmg = tech.blockDamage * m.dmgScale * v * obj.mass * (tech.isMobBlockFling ? 2.5 : 1) * (tech.isBlockRestitution ? 2.5 : 1) * ((m.fieldMode === 0 || m.fieldMode === 8) ? 1 + 0.05 * m.coupling : 1);
                                if (mob[k].isShielded) dmg *= 0.7

                                mob[k].damage(dmg, true);
                                if (tech.isBlockPowerUps && !mob[k].alive && mob[k].isDropPowerUp && Math.random() < 0.5) {
                                    options = ["coupling", "boost", "heal", "research", "ammo"]
                                    powerUps.spawn(mob[k].position.x, mob[k].position.y, options[Math.floor(Math.random() * options.length)]);
                                }

                                const stunTime = dmg / Math.sqrt(obj.mass)
                                if (stunTime > 0.5 && mob[k].memory !== Infinity) mobs.statusStun(mob[k], 60 + 60 * Math.sqrt(stunTime))
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

//determine if player is on the ground
Events.on(engine, "collisionStart", function (event) {
    playerOnGroundCheck(event);
    // playerHeadCheck(event);
    collisionChecks(event);
});
Events.on(engine, "collisionActive", function (event) {
    playerOnGroundCheck(event);
    // playerHeadCheck(event);
});
Events.on(engine, "collisionEnd", function (event) {
    playerOffGroundCheck(event);
});