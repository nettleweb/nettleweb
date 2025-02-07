let bullet = [];

const b = {
    // dmgScale: null, //scales all damage, but not raw .dmg
    gravity: 0.0006, //most other bodies have   gravity = 0.001
    activeGun: null, //current gun in use by player
    inventoryGun: 0,
    inventory: [], //list of what guns player has  // 0 starts with basic gun
    setFireMethod() {
        if (tech.isFireMoveLock) {
            b.fire = b.fireFloat
            // } else if (tech.isFireNotMove) {
            //     if (tech.isAlwaysFire) {
            //         b.fire = b.fireAlwaysFire
            //     } else {
            //         b.fire = b.fireNotMove
            //     }
        } else if (tech.isAlwaysFire) {
            b.fire = b.fireAlwaysFire
        } else {
            b.fire = b.fireNormal
        }
    },
    fire() { },
    fireNormal() {
        if (b.inventory.length && (b.activeGun !== null && b.activeGun !== undefined)) {
            if (input.fire && m.fireCDcycle < m.cycle && (!input.field || m.fieldFire)) {
                if (b.guns[b.activeGun].ammo > 0) {
                    b.fireWithAmmo()
                } else {
                    b.outOfAmmo()
                }
                if (m.holdingTarget) m.drop();
            }
            b.guns[b.activeGun].do();
        }
    },
    fireNotMove() { //added  && player.speed < 0.5 && m.onGround  
        if (b.inventory.length && (b.activeGun !== null && b.activeGun !== undefined)) {
            if (input.fire && m.fireCDcycle < m.cycle && (!input.field || m.fieldFire) && player.speed < 2.5 && m.onGround && Math.abs(m.yOff - m.yOffGoal) < 1) {
                if (b.guns[b.activeGun].ammo > 0) {
                    b.fireWithAmmo()
                } else {
                    b.outOfAmmo()
                }
                if (m.holdingTarget) m.drop();
            }
            b.guns[b.activeGun].do();
        }
    },
    fireAlwaysFire() { //added  && player.speed < 0.5 && m.onGround  //removed input.fire && (!input.field || m.fieldFire)
        if (b.inventory.length && (b.activeGun !== null && b.activeGun !== undefined)) {
            if (m.fireCDcycle < m.cycle && player.speed < 0.5 && m.onGround && Math.abs(m.yOff - m.yOffGoal) < 1) {
                if (b.guns[b.activeGun].ammo > 0) {
                    b.fireWithAmmo()
                }
                if (m.holdingTarget) m.drop();
            }
            b.guns[b.activeGun].do();
        }
    },
    fireFloat() { //added  && player.speed < 0.5 && m.onGround  
        if (b.inventory.length && (b.activeGun !== null && b.activeGun !== undefined)) {
            if (input.fire && (!input.field || m.fieldFire)) {
                if (m.fireCDcycle < m.cycle) {
                    if (b.guns[b.activeGun].ammo > 0) {
                        b.fireWithAmmo()
                    } else {
                        b.outOfAmmo()
                    }
                    if (m.holdingTarget) m.drop();
                }
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: -55 * player.mass * simulation.g //undo gravity before it is added
                });
                player.force.x = 0
                player.force.y = 0
            }
            b.guns[b.activeGun].do();
        }
    },
    fireWithAmmo() { //triggers after firing when you have ammo
        b.guns[b.activeGun].fire();
        if (tech.crouchAmmoCount && m.crouch) {
            if (tech.crouchAmmoCount % 2) {
                b.guns[b.activeGun].ammo--;
                if (level.is2xAmmo && b.guns[b.activeGun].ammo > 0) b.guns[b.activeGun].ammo--;
                simulation.updateGunHUD();
            }
            tech.crouchAmmoCount++ //makes the no ammo toggle off and on
        } else {
            b.guns[b.activeGun].ammo--;
            if (level.is2xAmmo && b.guns[b.activeGun].ammo > 0) b.guns[b.activeGun].ammo--;
            simulation.updateGunHUD();
        }
    },
    outOfAmmo() { //triggers after firing when you have NO ammo
        simulation.inGameConsole(`${b.guns[b.activeGun].name}.<span class='color-g'>ammo</span><span class='color-symbol'>:</span> 0`);
        m.fireCDcycle = m.cycle + 30; //fire cooldown       
        if (tech.isAmmoFromHealth) {
            const amount = 0.02
            if (tech.isEnergyHealth) {
                if (m.maxEnergy > amount * 2) {
                    tech.healMaxEnergyBonus -= amount * 2
                    m.setMaxEnergy();
                    for (let i = 0; i < 4; i++) powerUps.spawn(m.pos.x + 50 * (Math.random() - 0.5), m.pos.y + 50 * (Math.random() - 0.5), "ammo");
                }
            } else {
                if (m.health > amount) {
                    tech.extraMaxHealth -= amount //decrease max health
                    m.setMaxHealth();
                    for (let i = 0; i < 4; i++) powerUps.spawn(m.pos.x + 50 * (Math.random() - 0.5), m.pos.y + 50 * (Math.random() - 0.5), "ammo");
                }
            }
        }
    },
    refundAmmo() { //triggers after firing when you removed ammo for a gun, but didn't need to
        if (tech.crouchAmmoCount && m.crouch && (b.activeGun !== null && b.activeGun !== undefined)) {
            tech.crouchAmmoCount--
            if ((tech.crouchAmmoCount) % 2) {
                b.guns[b.activeGun].ammo++;
                simulation.updateGunHUD();
            }
        } else {
            b.guns[b.activeGun].ammo++;
            simulation.updateGunHUD();
        }
    },
    // returnGunAmmo(name) {
    //     for (i = 0, len = b.guns.length; i < len; i++) { //find which gun 
    //         if (b.guns[i].name === name) return b.guns[i].ammo
    //     }
    // },
    giveGuns(gun = "random", ammoPacks = 22) {
        if (tech.ammoCap) ammoPacks = tech.ammoCap
        if (tech.isOneGun) b.resetAllGuns();
        if (gun === "random") {
            //find what guns player doesn't have
            options = []
            for (let i = 0, len = b.guns.length; i < len; i++) {
                if (!b.guns[i].have) options.push(i)
            }
            if (options.length === 0) return
            //randomly pick from list of possible guns
            gun = options[Math.floor(Math.random() * options.length)]
        }
        if (gun === "all") {
            for (let i = 0; i < b.guns.length; i++) {
                b.inventory[i] = i;
                b.guns[i].have = true;
                if (b.guns[i].ammo !== Infinity) b.guns[i].ammo = Math.ceil(b.guns[i].ammoPack * ammoPacks);
            }
            b.inventoryGun = 0;
            b.activeGun = b.inventory[0];
        } else {
            if (isNaN(gun)) { //find gun by name
                let found = false;
                for (let i = 0; i < b.guns.length; i++) {
                    if (gun === b.guns[i].name) {
                        gun = i
                        found = true;
                        break
                    }
                }
                if (!found) return //if no gun found don't give a gun
            }
            if (!b.guns[gun].have) b.inventory.push(gun);
            b.guns[gun].have = true;
            if (b.guns[gun].ammo !== Infinity) b.guns[gun].ammo = Math.ceil(b.guns[gun].ammoPack * ammoPacks);
            if (b.activeGun === null) {
                b.inventoryGun = 0;
                b.activeGun = b.inventory[0] //if no active gun switch to new gun
                if (b.guns[b.activeGun].charge) b.guns[b.activeGun].charge = 0; //set foam charge to zero if foam is a new gun
            }
        }
        simulation.makeGunHUD();
        simulation.switchGun();
        b.setFireCD();
        if (tech.isOneGun && b.inventory > 0) {
            //count how many gun tech you have and remove them
            let gunTechCount = 0 //2 bonus gun tech
            for (let i = 0, len = tech.tech.length; i < len; i++) {
                if (tech.tech[i].isGunTech && tech.tech[i].count > 0 && !tech.tech[i].isInstant && !tech.tech[i].isRemoveGun) {
                    const remove = tech.removeTech(i)
                    gunTechCount += remove
                }
            }

            //get a random gun tech for your gun
            for (let i = 0; i < gunTechCount; i++) {
                const gunTechPool = []
                for (let j = 0, len = tech.tech.length; j < len; j++) {
                    if (tech.tech[j].isGunTech && tech.tech[j].allowed() && !tech.tech[i].isRemoveGun && !tech.tech[j].isJunk && !tech.tech[j].isBadRandomOption && tech.tech[j].count < tech.tech[j].maxCount) {
                        const regex = tech.tech[j].requires.search(b.guns[b.activeGun].name) //get string index of gun name
                        const not = tech.tech[j].requires.search(' not ') //get string index of ' not '
                        //look for the gun name in the requirements, but the gun name needs to show up before the word ' not '
                        if (regex !== -1 && (not === -1 || not > regex)) gunTechPool.push(j)
                    }
                }
                if (gunTechPool.length) {
                    const index = Math.floor(Math.random() * gunTechPool.length)
                    simulation.inGameConsole(`<span class='color-var'>tech</span>.giveTech("<strong class='color-text'>${tech.tech[gunTechPool[index]].name}</strong>")`)
                    tech.giveTech(gunTechPool[index]) // choose from the gun pool
                } else {
                    tech.giveTech() //get normal tech if you can't find any gun tech
                }
            }

        }
    },
    removeGun(gunName) {
        for (let i = 0; i < b.guns.length; i++) {
            if (b.guns[i].name === gunName && b.guns[i].have) {
                b.guns[i].have = false
                for (let j = 0; j < b.inventory.length; j++) {
                    if (b.inventory[j] === i) {
                        b.inventory.splice(j, 1)
                        break
                    }
                }
                if (b.inventory.length > 0) {
                    b.activeGun = b.inventory[0];
                } else {
                    b.activeGun = null;
                }
                b.inventoryGun = 0;
                simulation.makeGunHUD();
                break
            }
        }
        b.setFireCD();
    },
    resetAllGuns() {
        b.inventory = []; //removes guns and ammo  
        for (let i = 0, len = b.guns.length; i < len; ++i) {
            b.guns[i].count = 0;
            b.guns[i].have = false;
            b.guns[i].ammoPack = b.guns[i].defaultAmmoPack;
            if (b.guns[i].ammo != Infinity) b.guns[i].ammo = 0;
        }
        tech.buffedGun = 0
        b.activeGun = null;
        b.inventoryGun = 0;
        simulation.drawCursor = simulation.drawCursorBasic //set cross hairs
    },
    bulletRemove() { //run in main loop
        //remove bullet if at end cycle for that bullet
        let i = bullet.length;
        while (i--) {
            if (bullet[i].endCycle < simulation.cycle) {
                bullet[i].onEnd(i); //some bullets do stuff on end
                if (bullet[i]) {
                    Matter.Composite.remove(engine.world, bullet[i]);
                    bullet.splice(i, 1);
                } else {
                    break; //if bullet[i] doesn't exist don't complete the for loop, because the game probably reset
                }
            }
        }
    },
    bulletDraw() {
        ctx.beginPath();
        for (let i = 0, len = bullet.length; i < len; i++) {
            let vertices = bullet[i].vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j += 1) {
                ctx.lineTo(vertices[j].x, vertices[j].y);
            }
            ctx.lineTo(vertices[0].x, vertices[0].y);
        }
        ctx.fillStyle = color.bullet;
        ctx.fill();
    },
    bulletDo() {
        for (let i = 0, len = bullet.length; i < len; i++) {
            bullet[i].do();
        }
    },
    fireProps(cd, speed, dir, me) {
        m.fireCDcycle = m.cycle + Math.floor(cd * b.fireCDscale); // cool down
        Matter.Body.setVelocity(bullet[me], {
            x: 0.5 * player.velocity.x + speed * Math.cos(dir),
            y: 0.5 * player.velocity.y + speed * Math.sin(dir)
        });
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    fireCDscale: 1,
    setFireCD() {
        b.fireCDscale = tech.fireRate * tech.slowFire * tech.researchHaste * tech.aimDamage
        if (m.fieldMode === 6) b.fireCDscale *= 0.8
        if (tech.isFastTime) b.fireCDscale *= 0.666
        if (tech.isFireRateForGuns) b.fireCDscale *= Math.pow(0.76923, Math.max(0, b.inventory.length - 1))
        if (tech.isFireMoveLock) b.fireCDscale *= 0.25
    },
    fireAttributes(dir, rotate = true) {
        if (rotate) {
            return {
                // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
                angle: dir,
                friction: 0.5,
                frictionAir: 0,
                dmg: 0, //damage done in addition to the damage from momentum
                classType: "bullet",
                collisionFilter: {
                    category: cat.bullet,
                    mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
                },
                minDmgSpeed: 10,
                beforeDmg() { }, //this.endCycle = 0  //triggers despawn
                onEnd() { }
            };
        } else {
            return {
                // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
                inertia: Infinity, //prevents rotation
                angle: dir,
                friction: 0.5,
                frictionAir: 0,
                dmg: 0, //damage done in addition to the damage from momentum
                classType: "bullet",
                collisionFilter: {
                    category: cat.bullet,
                    mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
                },
                minDmgSpeed: 10,
                beforeDmg() { }, //this.endCycle = 0  //triggers despawn
                onEnd() { }
            };
        }
    },
    muzzleFlash(radius = 30) {
        // ctx.fillStyle = "#fb0";
        // ctx.beginPath();
        // ctx.arc(m.pos.x + 35 * Math.cos(m.angle), m.pos.y + 35 * Math.sin(m.angle), radius, 0, 2 * Math.PI);
        // ctx.fill();

        simulation.drawList.push({ //add dmg to draw queue
            x: m.pos.x + 20 * Math.cos(m.angle),
            y: m.pos.y + 20 * Math.sin(m.angle),
            radius: radius,
            color: "#fb0",
            time: 1
        });
    },
    removeConsBB(me) {
        for (let i = 0, len = consBB.length; i < len; ++i) {
            if (consBB[i].bodyA === me) {
                consBB[i].bodyA = consBB[i].bodyB;
                consBB.splice(i, 1);
                break;
            } else if (consBB[i].bodyB === me) {
                consBB[i].bodyB = consBB[i].bodyA;
                consBB.splice(i, 1);
                break;
            }
        }
    },
    onCollision(event) {
        const pairs = event.pairs;
        for (let i = 0, j = pairs.length; i != j; i++) {
            //map + bullet collisions
            if (pairs[i].bodyA.collisionFilter.category === cat.map && pairs[i].bodyB.collisionFilter.category === cat.bullet) {
                collideBulletStatic(pairs[i].bodyB)
            } else if (pairs[i].bodyB.collisionFilter.category === cat.map && pairs[i].bodyA.collisionFilter.category === cat.bullet) {
                collideBulletStatic(pairs[i].bodyA)
            }

            function collideBulletStatic(obj) {
                if (obj.onWallHit) obj.onWallHit();
            }
        }
    },
    explosionRange() {
        return tech.explosiveRadius * (tech.isExplosionHarm ? 1.7 : 1) * (tech.isSmallExplosion ? 0.7 : 1) * (tech.isExplodeRadio ? 1.25 : 1)
    },
    explosion(where, radius, color = "rgba(255,25,0,0.6)", reducedKnock = 1) { // typically explode is used for some bullets with .onEnd
        radius *= tech.explosiveRadius

        let knock;
        let dmg = radius * 0.019
        if (tech.isExplosionHarm) radius *= 1.7 //    1/sqrt(2) radius -> area
        if (tech.isSmallExplosion) {
            // color = "rgba(255,0,30,0.7)"
            radius *= 0.7
            dmg *= 1.7
        }
        let sub = Vector.sub(where, player.position);
        let dist = Vector.magnitude(sub);
        if (tech.isSmartRadius && radius > dist - 50) radius = Math.max(dist - 50, 1)

        if (tech.isExplodeRadio) { //radiation explosion
            radius *= 1.25; //alert range
            // if (tech.isSmartRadius) radius = Math.max(Math.min(radius, Vector.magnitude(Vector.sub(where, player.position)) - 25), 1)
            color = "rgba(25,139,170,0.25)"
            simulation.drawList.push({ //add dmg to draw queue
                x: where.x,
                y: where.y,
                radius: radius,
                color: color,
                time: simulation.drawTime * 2
            });

            //player damage
            if (Vector.magnitude(Vector.sub(where, player.position)) < radius) {
                const DRAIN = (tech.isExplosionHarm ? 0.6 : 0.45) * (tech.isRadioactiveResistance ? 0.2 : 1)
                if (m.immuneCycle < m.cycle) m.energy -= DRAIN
                if (m.energy < 0) {
                    m.energy = 0
                    if (simulation.dmgScale) m.damage(tech.radioactiveDamage * 0.03 * (tech.isRadioactiveResistance ? 0.2 : 1));
                }
            }

            //mob damage and knock back with alert
            let damageScale = 1.5; // reduce dmg for each new target to limit total AOE damage
            for (let i = 0, len = mob.length; i < len; ++i) {
                if (mob[i].alive && !mob[i].isShielded) {
                    sub = Vector.sub(where, mob[i].position);
                    dist = Vector.magnitude(sub) - mob[i].radius;
                    if (dist < radius) {
                        if (mob[i].shield) dmg *= 2.5 //balancing explosion dmg to shields
                        if (Matter.Query.ray(map, mob[i].position, where).length > 0) dmg *= 0.5 //reduce damage if a wall is in the way
                        mobs.statusDoT(mob[i], dmg * damageScale * 0.25, 240) //apply radiation damage status effect on direct hits
                        if (tech.isStun) mobs.statusStun(mob[i], 30)
                        mob[i].locatePlayer();
                        damageScale *= 0.87 //reduced damage for each additional explosion target
                    }
                }
            }
        } else { //normal explosions
            // if (tech.isSmartRadius) radius = Math.max(Math.min(radius, Vector.magnitude(Vector.sub(where, player.position)) - 25), 1)
            simulation.drawList.push({ //add dmg to draw queue
                x: where.x,
                y: where.y,
                radius: radius,
                color: color,
                time: simulation.drawTime
            });
            const alertRange = 100 + radius * 2; //alert range
            simulation.drawList.push({ //add alert to draw queue
                x: where.x,
                y: where.y,
                radius: alertRange,
                color: "rgba(100,20,0,0.03)",
                time: simulation.drawTime
            });

            //player damage and knock back
            if (m.immuneCycle < m.cycle) {
                if (dist < radius) {
                    if (simulation.dmgScale) {
                        const harm = tech.isExplosionHarm ? 0.067 : 0.05
                        if (tech.isImmuneExplosion && m.energy > 0.25) {
                            // const mitigate = Math.min(1, Math.max(1 - m.energy * 0.5, 0))
                            m.energy -= 0.25
                            // m.damage(0.01 * harm); //remove 99% of the damage  1-0.99
                            knock = Vector.mult(Vector.normalise(sub), -0.6 * player.mass * Math.max(0, Math.min(0.15 - 0.002 * player.speed, 0.15)));
                            player.force.x = knock.x; // not +=  so crazy forces can't build up with MIRV
                            player.force.y = knock.y - 0.3; //some extra vertical kick 
                        } else {
                            if (simulation.dmgScale) m.damage(harm);
                            knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass * 0.013);
                            player.force.x += knock.x;
                            player.force.y += knock.y;
                        }
                    }
                } else if (dist < alertRange) {
                    knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass * 0.005);
                    player.force.x += knock.x;
                    player.force.y += knock.y;
                }
            }

            //body knock backs
            for (let i = body.length - 1; i > -1; i--) {
                if (!body[i].isNotHoldable) {
                    sub = Vector.sub(where, body[i].position);
                    dist = Vector.magnitude(sub);
                    if (dist < radius) {
                        knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * body[i].mass * 0.022);
                        body[i].force.x += knock.x;
                        body[i].force.y += knock.y;
                        if (tech.isBlockExplode) {
                            if (body[i] === m.holdingTarget) m.drop()
                            const size = 20 + 300 * Math.pow(body[i].mass, 0.25)
                            const where = body[i].position
                            const onLevel = level.onLevel //prevent explosions in the next level
                            Matter.Composite.remove(engine.world, body[i]);
                            body.splice(i, 1);
                            setTimeout(() => {
                                if (onLevel === level.onLevel) b.explosion(where, size); //makes bullet do explosive damage at end
                            }, 250 + 300 * Math.random());
                        }
                    } else if (dist < alertRange) {
                        knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * body[i].mass * 0.011);
                        body[i].force.x += knock.x;
                        body[i].force.y += knock.y;
                    }
                }
            }

            //power up knock backs
            for (let i = 0, len = powerUp.length; i < len; ++i) {
                sub = Vector.sub(where, powerUp[i].position);
                dist = Vector.magnitude(sub);
                if (dist < radius) {
                    knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * powerUp[i].mass * 0.013);
                    powerUp[i].force.x += knock.x;
                    powerUp[i].force.y += knock.y;
                } else if (dist < alertRange) {
                    knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * powerUp[i].mass * 0.007);
                    powerUp[i].force.x += knock.x;
                    powerUp[i].force.y += knock.y;
                }
            }

            //mob damage and knock back with alert
            let damageScale = 1.5; // reduce dmg for each new target to limit total AOE damage
            for (let i = 0, len = mob.length; i < len; ++i) {
                if (mob[i].alive && !mob[i].isShielded) {
                    sub = Vector.sub(where, mob[i].position);
                    dist = Vector.magnitude(sub) - mob[i].radius;
                    if (dist < radius) {
                        if (mob[i].shield) dmg *= 2.5 //balancing explosion dmg to shields
                        if (Matter.Query.ray(map, mob[i].position, where).length > 0) dmg *= 0.5 //reduce damage if a wall is in the way
                        mob[i].damage(dmg * damageScale * m.dmgScale);
                        mob[i].locatePlayer();
                        knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg * damageScale) * mob[i].mass * (mob[i].isBoss ? 0.003 : 0.01) * reducedKnock);
                        if (tech.isStun) {
                            mobs.statusStun(mob[i], 30)
                        } else if (!mob[i].isInvulnerable) {
                            mob[i].force.x += knock.x;
                            mob[i].force.y += knock.y;
                        }
                        radius *= 0.95 //reduced range for each additional explosion target
                        damageScale *= 0.87 //reduced damage for each additional explosion target
                    } else if (!mob[i].seePlayer.recall && dist < alertRange) {
                        mob[i].locatePlayer();
                        knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg * damageScale) * mob[i].mass * (mob[i].isBoss ? 0 : 0.006 * reducedKnock));
                        if (tech.isStun) {
                            mobs.statusStun(mob[i], 30)
                        } else if (!mob[i].isInvulnerable) {
                            mob[i].force.x += knock.x;
                            mob[i].force.y += knock.y;
                        }
                    }
                }
            }
        }
    },
    pulse(charge, angle = m.angle, where = m.pos) {
        let best;
        let explosionRadius = 5.5 * charge
        let range = 5000
        const path = [{
            x: where.x + 20 * Math.cos(angle),
            y: where.y + 20 * Math.sin(angle)
        },
        {
            x: where.x + range * Math.cos(angle),
            y: where.y + range * Math.sin(angle)
        }
        ];
        //check for collisions
        best = {
            x: null,
            y: null,
            dist2: Infinity,
            who: null,
            v1: null,
            v2: null
        };
        if (!best.who) {
            best = vertexCollision(path[0], path[1], [mob, map, body]);
            if (best.dist2 != Infinity) { //if hitting something
                path[path.length - 1] = {
                    x: best.x,
                    y: best.y
                };
            }
        }
        if (best.who) {
            b.explosion(path[1], explosionRadius)
            const off = explosionRadius * 1.2
            b.explosion({
                x: path[1].x + off * (Math.random() - 0.5),
                y: path[1].y + off * (Math.random() - 0.5)
            }, explosionRadius)
            b.explosion({
                x: path[1].x + off * (Math.random() - 0.5),
                y: path[1].y + off * (Math.random() - 0.5)
            }, explosionRadius)
        }
        //draw laser beam
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        ctx.lineTo(path[1].x, path[1].y);
        if (charge > 50) {
            ctx.strokeStyle = "rgba(255,0,0,0.10)"
            ctx.lineWidth = 70
            ctx.stroke();
        }
        ctx.strokeStyle = "rgba(255,0,0,0.25)"
        ctx.lineWidth = 20
        ctx.stroke();
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 4
        ctx.stroke();

        //draw little dots along the laser path
        const sub = Vector.sub(path[1], path[0])
        const mag = Vector.magnitude(sub)
        for (let i = 0, len = Math.floor(mag * 0.0005 * charge); i < len; i++) {
            const dist = Math.random()
            simulation.drawList.push({
                x: path[0].x + sub.x * dist + 10 * (Math.random() - 0.5),
                y: path[0].y + sub.y * dist + 10 * (Math.random() - 0.5),
                radius: 1.5 + 5 * Math.random(),
                color: "rgba(255,0,0,0.5)",
                time: Math.floor(9 + 25 * Math.random() * Math.random())
            });
        }
    },
    clusterExplode(where, size) { //can occur after grenades detonate
        const cycle = () => {
            if (m.alive) {
                if (simulation.paused || m.isTimeDilated) {
                    requestAnimationFrame(cycle)
                } else {
                    count++
                    if (count < 84) requestAnimationFrame(cycle);
                    if (!(count % 7)) {
                        const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
                        b.explosion(Vector.add(where, Vector.mult(unit, size * (count * 0.01 + 0.03 * Math.random()))), size * (0.4 + Math.random() * 0.35), `hsla(${360 * Math.random()},100%,66%,0.6)`, 0.2); //makes bullet do explosive damage at end
                    }
                }
            }
        }
        let count = 7
        requestAnimationFrame(cycle);
    },
    starburst(where, size) { //can occur after grenades detonate
        const color = `hsla(${360 * Math.random()},100%,66%,0.6)`
        const cycle = () => {
            if (m.alive) {
                if (simulation.paused || m.isTimeDilated) {
                    requestAnimationFrame(cycle)
                } else {
                    count++
                    if (count < 21) requestAnimationFrame(cycle);
                    if (count % 2) {
                        const unit = Vector.rotate({
                            x: 1,
                            y: 0
                        }, curl * 6.28 * count / 18 + off)
                        b.explosion(Vector.add(where, Vector.mult(unit, size * 0.75)), size * 0.7, color, 0.5); //makes bullet do explosive damage at end
                    }
                }
            }
        }
        const off = 6 * Math.random()
        const curl = Math.random() < 0.5 ? -1 : 1;
        let count = 0
        requestAnimationFrame(cycle);
    },
    fireFlower(where, size) { //can occur after grenades detonate
        // size *= b.explosionRange()
        const range = size * Math.sqrt(b.explosionRange())
        const cycle = () => {
            if (m.alive) {
                if (simulation.paused || m.isTimeDilated) {
                    requestAnimationFrame(cycle)
                } else {
                    if (count < 30 && m.alive) requestAnimationFrame(cycle);
                    if (count === 0) {
                        const color = `hsla(${360 * Math.random()},100%,66%,0.6)`
                        b.explosion(where, size * 0.8, color, 0.5);
                    }
                    if (count === 8) {
                        const color = `hsla(${360 * Math.random()},100%,66%,0.6)`
                        for (let i = 0, len = 6; i < len; i++) {
                            const unit = Vector.rotate({
                                x: 1,
                                y: 0
                            }, 6.28 * i / len)
                            b.explosion(Vector.add(where, Vector.mult(unit, 1.1 * range)), size * 0.6, color, 0.5); //makes bullet do explosive damage at end
                        }
                    }
                    if (count === 16) {
                        const color = `hsla(${360 * Math.random()},100%,66%,0.6)`
                        for (let i = 0, len = 10; i < len; i++) {
                            const unit = Vector.rotate({
                                x: 1,
                                y: 0
                            }, 6.28 * i / len)
                            b.explosion(Vector.add(where, Vector.mult(unit, 1.4 * range)), size * 0.45, color, 0.5); //makes bullet do explosive damage at end
                        }
                    }
                    count++
                }
            }
        }
        let count = 0
        requestAnimationFrame(cycle);
    },
    grenadeEnd() {
        if (tech.isCircleExplode) {
            b.starburst(this.position, this.explodeRad)
        } else if (tech.isPetalsExplode) {
            b.fireFlower(this.position, this.explodeRad)
        } else if (tech.isClusterExplode) {
            b.clusterExplode(this.position, this.explodeRad)
        } else {
            b.explosion(this.position, this.explodeRad); //makes bullet do explosive damage at end
        }
        if (tech.fragments) b.targetedNail(this.position, tech.fragments * Math.floor(2 + 1.5 * Math.random()))
    },
    grenade() {

    },
    setGrenadeMode() {
        grenadeDefault = function (where = {
            x: m.pos.x + 30 * Math.cos(m.angle),
            y: m.pos.y + 30 * Math.sin(m.angle)
        }, angle = m.angle, size = 1) {
            const me = bullet.length;
            bullet[me] = Bodies.circle(where.x, where.y, 15, b.fireAttributes(angle, false));
            Matter.Body.setDensity(bullet[me], 0.0003);
            bullet[me].explodeRad = 300 * size + 100 * tech.isBlockExplode;
            bullet[me].onEnd = b.grenadeEnd
            bullet[me].minDmgSpeed = 1;
            bullet[me].beforeDmg = function () {
                this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
            };
            speed = m.crouch ? 43 : 32
            Matter.Body.setVelocity(bullet[me], {
                x: 0.5 * player.velocity.x + speed * Math.cos(angle),
                y: 0.5 * player.velocity.y + speed * Math.sin(angle)
            });
            bullet[me].endCycle = simulation.cycle + Math.floor(m.crouch ? 120 : 80) * tech.bulletsLastLonger;
            bullet[me].restitution = 0.4;
            bullet[me].do = function () {
                this.force.y += this.mass * 0.0025; //extra gravity for harder arcs
            };
            Composite.add(engine.world, bullet[me]); //add bullet to world
        }
        grenadeRPG = function (where = {
            x: m.pos.x + 30 * Math.cos(m.angle),
            y: m.pos.y + 30 * Math.sin(m.angle)
        }, angle = m.angle, size = 1) {
            const me = bullet.length;
            bullet[me] = Bodies.circle(where.x, where.y, 15, b.fireAttributes(angle, false));
            Matter.Body.setDensity(bullet[me], 0.0003);
            bullet[me].explodeRad = 300 * size + 100 * tech.isBlockExplode;
            bullet[me].onEnd = b.grenadeEnd
            bullet[me].minDmgSpeed = 1;
            bullet[me].beforeDmg = function () {
                this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
            };
            speed = m.crouch ? 46 : 32
            Matter.Body.setVelocity(bullet[me], {
                x: 0.8 * player.velocity.x + speed * Math.cos(angle),
                y: 0.5 * player.velocity.y + speed * Math.sin(angle)
            });
            Composite.add(engine.world, bullet[me]); //add bullet to world

            bullet[me].endCycle = simulation.cycle + 70 * tech.bulletsLastLonger;
            bullet[me].frictionAir = 0.07;
            const MAG = 0.015
            bullet[me].thrust = {
                x: bullet[me].mass * MAG * Math.cos(angle),
                y: bullet[me].mass * MAG * Math.sin(angle)
            }
            bullet[me].do = function () {
                this.force.x += this.thrust.x;
                this.force.y += this.thrust.y;
                if (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length) {
                    this.endCycle = 0; //explode if touching map or blocks
                }
            };
        }
        grenadeRPGVacuum = function (where = {
            x: m.pos.x + 30 * Math.cos(m.angle),
            y: m.pos.y + 30 * Math.sin(m.angle)
        }, angle = m.angle, size = 1) {
            const me = bullet.length;
            bullet[me] = Bodies.circle(where.x, where.y, 15, b.fireAttributes(angle, false));
            Matter.Body.setDensity(bullet[me], 0.0003);
            bullet[me].explodeRad = 350 * size + Math.floor(Math.random() * 50) + tech.isBlockExplode * 100
            bullet[me].onEnd = b.grenadeEnd
            bullet[me].minDmgSpeed = 1;
            bullet[me].beforeDmg = function () {
                this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
            };
            speed = m.crouch ? 46 : 32
            Matter.Body.setVelocity(bullet[me], {
                x: 0.8 * player.velocity.x + speed * Math.cos(angle),
                y: 0.5 * player.velocity.y + speed * Math.sin(angle)
            });
            Composite.add(engine.world, bullet[me]); //add bullet to world
            bullet[me].endCycle = simulation.cycle + 70 * tech.bulletsLastLonger;
            bullet[me].frictionAir = 0.07;
            bullet[me].suckCycles = 40
            const MAG = 0.015
            bullet[me].thrust = {
                x: bullet[me].mass * MAG * Math.cos(angle),
                y: bullet[me].mass * MAG * Math.sin(angle)
            }
            bullet[me].suck = function () {
                const suck = (who, radius = this.explodeRad * 3.2) => {
                    for (i = 0, len = who.length; i < len; i++) {
                        const sub = Vector.sub(this.position, who[i].position);
                        const dist = Vector.magnitude(sub);
                        if (dist < radius && dist > 150 && !who.isInvulnerable && who[i] !== this) {
                            knock = Vector.mult(Vector.normalise(sub), mag * who[i].mass / Math.sqrt(dist));
                            who[i].force.x += knock.x;
                            who[i].force.y += knock.y;
                        }
                    }
                }
                let mag = 0.1
                if (simulation.cycle > this.endCycle - 5) {
                    mag = -0.22
                    suck(mob, this.explodeRad * 3)
                    suck(body, this.explodeRad * 2)
                    suck(powerUp, this.explodeRad * 1.5)
                    suck(bullet, this.explodeRad * 1.5)
                    suck([player], this.explodeRad * 1.3)
                } else {
                    mag = 0.11
                    suck(mob, this.explodeRad * 3)
                    suck(body, this.explodeRad * 2)
                    suck(powerUp, this.explodeRad * 1.5)
                    suck(bullet, this.explodeRad * 1.5)
                    suck([player], this.explodeRad * 1.3)
                }

                Matter.Body.setVelocity(this, { x: 0, y: 0 }); //keep bomb in place
                //draw suck
                const radius = 2.75 * this.explodeRad * (this.endCycle - simulation.cycle) / this.suckCycles
                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
                ctx.fill();
            }
            bullet[me].do = function () {
                if (simulation.cycle > this.endCycle - this.suckCycles) { //suck
                    this.do = this.suck
                } else if (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length) {
                    Matter.Body.setPosition(this, Vector.sub(this.position, this.velocity)) //undo last movement
                    this.do = this.suck
                } else {
                    this.force.x += this.thrust.x;
                    this.force.y += this.thrust.y;
                }
            };
        }
        grenadeVacuum = function (where = {
            x: m.pos.x + 30 * Math.cos(m.angle),
            y: m.pos.y + 30 * Math.sin(m.angle)
        }, angle = m.angle, size = 1) {
            const me = bullet.length;
            bullet[me] = Bodies.circle(where.x, where.y, 20, b.fireAttributes(angle, false));
            Matter.Body.setDensity(bullet[me], 0.0002);
            bullet[me].explodeRad = 350 * size + Math.floor(Math.random() * 50) + tech.isBlockExplode * 100
            bullet[me].onEnd = b.grenadeEnd
            bullet[me].beforeDmg = function () {
                this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
            };
            bullet[me].restitution = 0.4;
            bullet[me].do = function () {
                this.force.y += this.mass * 0.0025; //extra gravity for harder arcs

                const suckCycles = 40
                if (simulation.cycle > this.endCycle - suckCycles) { //suck
                    const that = this

                    function suck(who, radius = that.explodeRad * 3.2) {
                        for (i = 0, len = who.length; i < len; i++) {
                            const sub = Vector.sub(that.position, who[i].position);
                            const dist = Vector.magnitude(sub);
                            if (dist < radius && dist > 150 && !who.isInvulnerable) {
                                knock = Vector.mult(Vector.normalise(sub), mag * who[i].mass / Math.sqrt(dist));
                                who[i].force.x += knock.x;
                                who[i].force.y += knock.y;
                            }
                        }
                    }
                    let mag = 0.1
                    if (simulation.cycle > this.endCycle - 5) {
                        mag = -0.22
                        suck(mob, this.explodeRad * 3)
                        suck(body, this.explodeRad * 2)
                        suck(powerUp, this.explodeRad * 1.5)
                        suck(bullet, this.explodeRad * 1.5)
                        suck([player], this.explodeRad * 1.3)
                    } else {
                        mag = 0.11
                        suck(mob, this.explodeRad * 3)
                        suck(body, this.explodeRad * 2)
                        suck(powerUp, this.explodeRad * 1.5)
                        suck(bullet, this.explodeRad * 1.5)
                        suck([player], this.explodeRad * 1.3)
                    }
                    //keep bomb in place
                    Matter.Body.setVelocity(this, {
                        x: 0,
                        y: 0
                    });
                    //draw suck
                    const radius = 2.75 * this.explodeRad * (this.endCycle - simulation.cycle) / suckCycles
                    ctx.fillStyle = "rgba(0,0,0,0.1)";
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            };
            speed = 35
            // speed = m.crouch ? 43 : 32

            bullet[me].endCycle = simulation.cycle + 70 * tech.bulletsLastLonger;
            if (m.crouch) {
                speed += 9
                bullet[me].endCycle += 20;
            }
            Matter.Body.setVelocity(bullet[me], {
                x: 0.5 * player.velocity.x + speed * Math.cos(angle),
                y: 0.5 * player.velocity.y + speed * Math.sin(angle)
            });
            Composite.add(engine.world, bullet[me]); //add bullet to world
        }

        grenadeNeutron = function (where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }, angle = m.angle, size = 1) {
            const me = bullet.length;
            bullet[me] = Bodies.polygon(where.x, where.y, 10, 4, b.fireAttributes(angle, false));
            b.fireProps((m.crouch ? 45 : 25) / Math.pow(0.92, tech.missileCount), m.crouch ? 35 : 20, angle, me); //cd , speed
            Matter.Body.setDensity(bullet[me], 0.000001);
            bullet[me].endCycle = 500 + simulation.cycle;
            bullet[me].frictionAir = 0;
            bullet[me].friction = 1;
            bullet[me].frictionStatic = 1;
            bullet[me].restitution = 0;
            bullet[me].minDmgSpeed = 0;
            bullet[me].damageRadius = 100;
            bullet[me].maxDamageRadius = 450 * size + 130 * tech.isNeutronSlow //+ 150 * Math.random()
            bullet[me].radiusDecay = (0.81 + 0.15 * tech.isNeutronSlow) / tech.bulletsLastLonger
            bullet[me].stuckTo = null;
            bullet[me].stuckToRelativePosition = null;
            if (tech.isRPG) {
                const SCALE = 2
                Matter.Body.scale(bullet[me], SCALE, SCALE);
                speed = m.crouch ? 25 : 15
                // speed = m.crouch ? 43 : 32
                Matter.Body.setVelocity(bullet[me], { x: 0.5 * player.velocity.x + speed * Math.cos(angle), y: 0.5 * player.velocity.y + speed * Math.sin(angle) });
                const MAG = 0.005
                bullet[me].thrust = { x: bullet[me].mass * MAG * Math.cos(angle), y: bullet[me].mass * MAG * Math.sin(angle) }
            }

            bullet[me].beforeDmg = function () { };
            bullet[me].stuck = function () { };
            bullet[me].do = function () {
                const onCollide = () => {
                    this.collisionFilter.mask = 0; //non collide with everything
                    Matter.Body.setVelocity(this, { x: 0, y: 0 });
                    if (tech.isRPG) this.thrust = { x: 0, y: 0 }
                    this.do = this.radiationMode;
                }
                const mobCollisions = Matter.Query.collides(this, mob)
                if (mobCollisions.length) {
                    onCollide()
                    this.stuckTo = mobCollisions[0].bodyA
                    mobs.statusDoT(this.stuckTo, 0.6, 360) //apply radiation damage status effect on direct hits
                    if (this.stuckTo.isVerticesChange) {
                        this.stuckToRelativePosition = { x: 0, y: 0 }
                    } else {
                        //find the relative position for when the mob is at angle zero by undoing the mobs rotation
                        this.stuckToRelativePosition = Vector.rotate(Vector.sub(this.position, this.stuckTo.position), -this.stuckTo.angle)
                    }
                    this.stuck = function () {
                        if (this.stuckTo && this.stuckTo.alive) {
                            const rotate = Vector.rotate(this.stuckToRelativePosition, this.stuckTo.angle) //add in the mob's new angle to the relative position vector
                            Matter.Body.setPosition(this, Vector.add(Vector.add(rotate, this.stuckTo.velocity), this.stuckTo.position))
                            Matter.Body.setVelocity(this, this.stuckTo.velocity); //so that it will move properly if it gets unstuck
                        } else {
                            this.collisionFilter.mask = cat.map | cat.body | cat.player | cat.mob; //non collide with everything but map
                            this.stuck = function () {
                                this.force.y += this.mass * 0.001;
                            }
                        }
                    }
                } else {
                    const bodyCollisions = Matter.Query.collides(this, body)
                    if (bodyCollisions.length) {
                        if (!bodyCollisions[0].bodyA.isNotHoldable) {
                            onCollide()
                            this.stuckTo = bodyCollisions[0].bodyA
                            //find the relative position for when the mob is at angle zero by undoing the mobs rotation
                            this.stuckToRelativePosition = Vector.rotate(Vector.sub(this.position, this.stuckTo.position), -this.stuckTo.angle)
                        } else {
                            this.do = this.radiationMode;
                        }
                        this.stuck = function () {
                            if (this.stuckTo) {
                                const rotate = Vector.rotate(this.stuckToRelativePosition, this.stuckTo.angle) //add in the mob's new angle to the relative position vector
                                Matter.Body.setPosition(this, Vector.add(Vector.add(rotate, this.stuckTo.velocity), this.stuckTo.position))
                                // Matter.Body.setVelocity(this, this.stuckTo.velocity); //so that it will move properly if it gets unstuck
                            } else {
                                this.force.y += this.mass * 0.001;
                            }
                        }
                    } else {
                        if (Matter.Query.collides(this, map).length) {
                            onCollide()
                        } else if (tech.isRPG) { //if colliding with nothing
                            this.force.x += this.thrust.x;
                            this.force.y += this.thrust.y;
                        } else {
                            this.force.y += this.mass * 0.001;
                        }
                    }
                }
            }
            bullet[me].radiationMode = function () { //the do code after the bullet is stuck on something,  projects a damaging radiation field
                this.stuck(); //runs different code based on what the bullet is stuck to
                this.damageRadius = this.damageRadius * 0.85 + 0.15 * this.maxDamageRadius //smooth radius towards max
                this.maxDamageRadius -= this.radiusDecay
                if (this.damageRadius < 15) {
                    this.endCycle = 0;
                } else {
                    //aoe damage to player
                    if (Vector.magnitude(Vector.sub(player.position, this.position)) < this.damageRadius) {
                        const DRAIN = (tech.isRadioactiveResistance ? 0.0025 * 0.2 : 0.0025)
                        if (m.energy > DRAIN) {
                            if (m.immuneCycle < m.cycle) m.energy -= DRAIN
                        } else {
                            m.energy = 0;
                            if (simulation.dmgScale) m.damage((tech.isRadioactiveResistance ? 0.00016 * 0.2 : 0.00016) * tech.radioactiveDamage) //0.00015
                        }
                    }
                    //aoe damage to mobs
                    let dmg = m.dmgScale * 0.15 * tech.radioactiveDamage
                    for (let i = 0, len = mob.length; i < len; i++) {
                        if (Vector.magnitude(Vector.sub(mob[i].position, this.position)) < this.damageRadius + mob[i].radius) {
                            if (Matter.Query.ray(map, mob[i].position, this.position).length > 0) dmg *= 0.2 //reduce damage if a wall is in the way
                            mob[i].damage(mob[i].shield ? dmg * 3 : dmg);
                            mob[i].locatePlayer();
                            if (tech.isNeutronSlow && mob[i].speed > 4) {
                                Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.97, y: mob[i].velocity.y * 0.97 });
                            }
                        }
                    }
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.damageRadius, 0, 2 * Math.PI);
                    ctx.globalCompositeOperation = "lighter"
                    ctx.fillStyle = `rgba(25,139,170,${0.2 + 0.06 * Math.random()})`;
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over"
                    if (tech.isNeutronSlow) {
                        let slow = (who, radius = this.explodeRad * 3.2) => {
                            for (i = 0, len = who.length; i < len; i++) {
                                const sub = Vector.sub(this.position, who[i].position);
                                const dist = Vector.magnitude(sub);
                                if (dist < radius) {
                                    Matter.Body.setVelocity(who[i], { x: who[i].velocity.x * 0.975, y: who[i].velocity.y * 0.975 });
                                }
                            }
                        }
                        slow(body, this.damageRadius)
                        slow([player], this.damageRadius)
                    }
                }
            }
        }

        if (tech.isNeutronBomb) {
            b.grenade = grenadeNeutron
            if (tech.isRPG) {
                b.guns[5].do = function () { }
            } else {
                b.guns[5].do = function () {
                    if (!input.field && m.crouch) {
                        const cycles = 80
                        const speed = m.crouch ? 35 : 20 //m.crouch ? 43 : 32
                        const g = m.crouch ? 0.137 : 0.135
                        const v = {
                            x: speed * Math.cos(m.angle),
                            y: speed * Math.sin(m.angle)
                        }
                        ctx.strokeStyle = "rgba(68, 68, 68, 0.2)" //color.map
                        ctx.lineWidth = 2
                        ctx.beginPath()
                        for (let i = 1, len = 19; i < len + 1; i++) {
                            const time = cycles * i / len
                            ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + g * time * time)
                        }
                        ctx.stroke()
                    }
                }
            }
        } else if (tech.isRPG) {
            b.guns[5].do = function () { }
            if (tech.isVacuumBomb) {
                b.grenade = grenadeRPGVacuum
            } else {
                b.grenade = grenadeRPG
            }
        } else if (tech.isVacuumBomb) {
            b.grenade = grenadeVacuum
            b.guns[5].do = function () {
                if (!input.field && m.crouch) {
                    const cycles = Math.floor(m.crouch ? 50 : 30) //30
                    const speed = m.crouch ? 44 : 35
                    const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }
                    ctx.strokeStyle = "rgba(68, 68, 68, 0.2)" //color.map
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    for (let i = 1.6, len = 19; i < len + 1; i++) {
                        const time = cycles * i / len
                        ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
                    }
                    ctx.stroke()
                }
            }
        } else {
            b.grenade = grenadeDefault
            b.guns[5].do = function () {
                if (!input.field && m.crouch) {
                    const cycles = Math.floor(m.crouch ? 120 : 80) //30
                    const speed = m.crouch ? 43 : 32
                    const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) } //m.Vy / 2 + removed to make the path less jerky
                    ctx.strokeStyle = "rgba(68, 68, 68, 0.2)" //color.map
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    for (let i = 0.5, len = 19; i < len + 1; i++) {
                        const time = cycles * i / len
                        ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
                    }
                    ctx.stroke()
                }
            }
        }
    },
    grapple(where, angle = m.angle) {
        const me = bullet.length;
        const returnRadius = 100
        bullet[me] = Bodies.fromVertices(where.x, where.y, [{
            x: -40,
            y: 2,
            index: 0,
            isInternal: false
        }, {
            x: -40,
            y: -2,
            index: 1,
            isInternal: false
        }, {
            x: 37,
            y: -2,
            index: 2,
            isInternal: false
        }, {
            x: 40,
            y: -1,
            index: 3,
            isInternal: false
        }, {
            x: 37,
            y: 3,
            index: 4,
            isInternal: false
        }],
            {
                angle: angle,
                friction: 1,
                frictionAir: 0.4,
                thrustMag: 0.13,
                dmg: 8, //damage done in addition to the damage from momentum
                classType: "bullet",
                endCycle: simulation.cycle + 70,
                isSlowPull: false,
                drawStringControlMagnitude: 1000 + 1000 * Math.random(),
                drawStringFlip: (Math.round(Math.random()) ? 1 : -1),
                attached: false,
                glowColor: tech.hookNails ? "rgba(200,0,0,0.07)" : tech.isHarmReduce ? "rgba(50,100,255,0.1)" : "rgba(0,200,255,0.07)",
                collisionFilter: {
                    category: cat.bullet,
                    mask: tech.isShieldPierce ? cat.body | cat.mob | cat.mobBullet : cat.body | cat.mob | cat.mobBullet | cat.mobShield,
                },
                minDmgSpeed: 4,
                // lookFrequency: Math.floor(7 + Math.random() * 3),
                density: 0.004, //0.001 is normal for blocks,  0.004 is normal for harpoon
                drain: 0.001,
                powerUpDamage: tech.isHarpoonPowerUp && simulation.cycle - 480 < tech.harpoonPowerUpCycle,
                draw() {
                    // draw rope
                    const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }
                    const sub = Vector.sub(where, this.vertices[0])
                    ctx.strokeStyle = "#000" // "#0ce"
                    ctx.lineWidth = 0.5
                    ctx.beginPath();
                    ctx.moveTo(where.x, where.y);
                    if (this.attached) {
                        const controlPoint = Vector.add(where, Vector.mult(sub, -0.5))
                        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, this.vertices[0].x, this.vertices[0].y)
                    } else {
                        const long = Math.max(Vector.magnitude(sub), 60)
                        const perpendicular = Vector.mult(Vector.normalise(Vector.perp(sub)), this.drawStringFlip * Math.min(0.7 * long, 10 + this.drawStringControlMagnitude / (10 + Vector.magnitude(sub))))
                        const controlPoint = Vector.add(Vector.add(where, Vector.mult(sub, -0.5)), perpendicular)
                        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, this.vertices[0].x, this.vertices[0].y)
                    }
                    // ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                    // ctx.stroke();
                    ctx.strokeStyle = this.glowColor // "#0ce"
                    ctx.lineWidth = 10
                    ctx.stroke();
                    ctx.strokeStyle = "#000" // "#0ce"
                    ctx.lineWidth = 0.5
                    ctx.stroke();

                    if (this.powerUpDamage) {
                        ctx.beginPath();
                        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                        ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
                        ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
                        ctx.lineTo(this.vertices[3].x, this.vertices[3].y);
                        ctx.lineTo(this.vertices[4].x, this.vertices[4].y);
                        ctx.lineJoin = "miter"
                        ctx.miterLimit = 30;
                        ctx.lineWidth = 25;
                        ctx.strokeStyle = "rgba(0,255,255,0.4)";
                        ctx.stroke();
                        ctx.lineWidth = 8;
                        ctx.strokeStyle = "rgb(0,255,255)";
                        ctx.stroke();
                        ctx.lineJoin = "round"
                        ctx.miterLimit = 5
                        ctx.fillStyle = "#000"
                        ctx.fill();
                    }
                    //draw hook
                    ctx.beginPath();
                    ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                    const spike = Vector.add(this.vertices[3], Vector.mult(Vector.sub(this.vertices[3], this.vertices[2]), 2))
                    ctx.moveTo(this.vertices[2].x, this.vertices[2].y);
                    ctx.lineTo(spike.x, spike.y);
                    ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
                    ctx.fillStyle = '#000'
                    ctx.fill();
                },
                beforeDmg(who) {
                    if (tech.isShieldPierce && who.isShielded) { //disable shields
                        who.isShielded = false
                        requestAnimationFrame(() => { who.isShielded = true });
                    }
                    if (m.fieldCDcycle < m.cycle + 40) m.fieldCDcycle = m.cycle + 40  //extra long cooldown on hitting mobs
                    if (tech.hookNails) {
                        // if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + 5; //player is immune to damage for 5 cycles
                        // b.explosion(this.position, 300 + 150 * Math.random()); //makes bullet do explosive damage at end
                        b.targetedNail(this.position, tech.hookNails)
                        const ANGLE = 2 * Math.PI * Math.random() //make a few random ones
                        for (let i = 0; i < 4; i++) b.nail(this.position, { x: 10.5 * Math.cos(ANGLE), y: 10.5 * Math.sin(ANGLE) }, 1.2)
                    }
                    // if (this.powerUpDamage) this.density = 2 * 0.004 //double damage after pick up power up for 8 seconds


                    if (tech.isHarpoonPowerUp && simulation.cycle - 480 < tech.harpoonPowerUpCycle) {
                        Matter.Body.setDensity(this, 1.8 * 0.004); //+90% damage after pick up power up for 8 seconds
                    } else if (tech.isHarpoonFullHealth && who.health === 1) {
                        Matter.Body.setDensity(this, 2.11 * 0.004); //+90% damage if mob has full health do
                        simulation.ephemera.push({
                            name: "grapple outline",
                            count: 3, //cycles before it self removes
                            vertices: this.vertices,
                            do() {
                                this.count--
                                if (this.count < 0) simulation.removeEphemera(this.name)

                                ctx.beginPath();
                                ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                                for (let j = 1, len = this.vertices.length; j < len; j += 1) ctx.lineTo(this.vertices[j].x, this.vertices[j].y);
                                ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                                ctx.lineJoin = "miter"
                                ctx.miterLimit = 20;
                                ctx.lineWidth = 40;
                                ctx.strokeStyle = "rgba(255,0,100,0.35)";
                                ctx.stroke();
                                ctx.lineWidth = 10;
                                ctx.strokeStyle = `#f07`;
                                ctx.stroke();
                                ctx.lineJoin = "round"
                                ctx.miterLimit = 5
                                ctx.fillStyle = "#000"
                                ctx.fill();
                            },
                        })
                    }


                    this.retract()
                },
                caughtPowerUp: null,
                dropCaughtPowerUp() {
                    if (this.caughtPowerUp) {
                        this.caughtPowerUp.collisionFilter.category = cat.powerUp
                        this.caughtPowerUp.collisionFilter.mask = cat.map | cat.powerUp
                        this.caughtPowerUp = null
                    }
                },
                onEnd() {
                    if (this.caughtPowerUp && !simulation.isChoosing && (this.caughtPowerUp.name !== "heal" || m.health !== m.maxHealth || tech.isOverHeal)) {
                        let index = null //find index
                        for (let i = 0, len = powerUp.length; i < len; ++i) {
                            if (powerUp[i] === this.caughtPowerUp) index = i
                        }
                        if (index !== null) {
                            powerUps.onPickUp(this.caughtPowerUp);
                            this.caughtPowerUp.effect();
                            Matter.Composite.remove(engine.world, this.caughtPowerUp);
                            powerUp.splice(index, 1);
                            if (tech.isHarpoonPowerUp) tech.harpoonPowerUpCycle = simulation.cycle
                        } else {
                            this.dropCaughtPowerUp()
                        }
                    } else {
                        this.dropCaughtPowerUp()
                    }
                },
                retract() {
                    this.attached = false
                    this.do = this.returnToPlayer
                    this.endCycle = simulation.cycle + 60
                    Matter.Body.setDensity(this, 0.0005); //reduce density on return
                    if (this.angularSpeed < 0.5) this.torque += this.inertia * 0.001 * (Math.random() - 0.5) //(Math.round(Math.random()) ? 1 : -1)
                    this.collisionFilter.mask = 0//cat.map | cat.mob | cat.mobBullet | cat.mobShield // | cat.body
                    //recoil on pulling grapple back
                    // if (this.pickUpTarget.mass) console.log(this.pickUpTarget.mass)
                    const mag = this.pickUpTarget ? Math.min(5, Math.max(this.pickUpTarget.mass, 0.5)) : 0.5
                    const unit = Vector.normalise(Vector.sub(this.position, m.pos))
                    const momentum = Vector.mult(unit, mag * (m.crouch ? 0.1 : 0.2))
                    player.force.x += momentum.x
                    player.force.y += momentum.y
                },
                returnToPlayer() {
                    if (m.fieldCDcycle < m.cycle + 5) m.fieldCDcycle = m.cycle + 5
                    if (Vector.magnitude(Vector.sub(this.position, m.pos)) < returnRadius) { //near player
                        this.endCycle = 0;
                        //recoil on catching grapple
                        // const momentum = Vector.mult(Vector.sub(this.velocity, player.velocity), (m.crouch ? 0.0001 : 0.0002))
                        const unit = Vector.normalise(Vector.sub(this.velocity, player.velocity))
                        const momentum = Vector.mult(unit, (m.crouch ? 0.0001 : 0.0002))
                        player.force.x += momentum.x
                        player.force.y += momentum.y
                        if (this.pickUpTarget) {
                            if (tech.isReel && this.blockDist > 150) {
                                // console.log(0.0003 * Math.min(this.blockDist, 1000))
                                m.energy += 0.00113 * Math.min(this.blockDist, 800) * level.isReducedRegen //max 0.352 energy
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: m.pos.x,
                                    y: m.pos.y,
                                    radius: 10,
                                    color: m.fieldMeterColor,
                                    time: simulation.drawTime
                                });
                            }
                            m.holdingTarget = this.pickUpTarget
                            // give block to player after it returns
                            m.isHolding = true;
                            //conserve momentum when player mass changes
                            const blockMass = Math.min(5, this.pickUpTarget.mass)
                            const grappleMomentum = Vector.mult(Vector.normalise(this.velocity), 15 * blockMass)
                            const playerMomentum = Vector.mult(player.velocity, player.mass)
                            totalMomentum = Vector.add(playerMomentum, grappleMomentum)
                            Matter.Body.setVelocity(player, Vector.mult(totalMomentum, 1 / (m.defaultMass + blockMass)));

                            m.definePlayerMass(m.defaultMass + this.pickUpTarget.mass * m.holdingMassScale)
                            //make block collide with nothing
                            m.holdingTarget.collisionFilter.category = 0;
                            m.holdingTarget.collisionFilter.mask = 0;
                            this.pickUpTarget = null
                        }
                    } else {
                        if (m.energy > this.drain) m.energy -= this.drain
                        const sub = Vector.sub(this.position, m.pos)
                        const rangeScale = 1 + 0.000003 * Vector.magnitude(sub)  //return faster when far from player
                        const returnForce = Vector.mult(Vector.normalise(sub), rangeScale * this.thrustMag * this.mass)
                        this.force.x -= returnForce.x
                        this.force.y -= returnForce.y
                        this.grabPowerUp()
                        this.grabBlocks()
                    }
                    this.draw();
                },
                destroyBlocks() {//not used?
                    const blocks = Matter.Query.collides(this, body)
                    if (blocks.length && !blocks[0].bodyA.isNotHoldable) {
                        if (blocks[0].bodyA.mass > 2.5) this.retract()
                        const block = blocks[0].bodyA.vertices
                        Composite.remove(engine.world, blocks[0].bodyA)
                        body.splice(body.indexOf(blocks[0].bodyA), 1)
                        //animate the block fading away
                        simulation.ephemera.push({
                            name: "blockFadeOut",
                            count: 25, //cycles before it self removes
                            do() {
                                this.count--
                                if (this.count < 0) simulation.removeEphemera(this.name)
                                ctx.beginPath();
                                ctx.moveTo(block[0].x, block[0].y);
                                for (let j = 1; j < block.length; j++) ctx.lineTo(block[j].x, block[j].y);
                                ctx.lineTo(block[0].x, block[0].y);
                                ctx.lineWidth = 2;
                                ctx.strokeStyle = `rgba(0,0,0,${this.count / 25})`
                                ctx.stroke();
                            },
                        })
                    }
                },
                pickUpTarget: null,
                grabBlocks() {
                    if (this.pickUpTarget) { //if always attached to a block
                        //position block on hook
                        Matter.Body.setPosition(this.pickUpTarget, Vector.add(this.vertices[2], this.velocity))
                        Matter.Body.setVelocity(this.pickUpTarget, { x: 0, y: 0 })
                    } else {
                        const blocks = Matter.Query.collides(this, body)
                        if (blocks.length) {
                            for (let i = 0; i < blocks.length; i++) {
                                if (blocks[i].bodyA.classType === "body" && !blocks[i].bodyA.isNotHoldable && blocks[0].bodyA.mass < 40) {
                                    this.retract()
                                    if (tech.hookNails) {
                                        b.targetedNail(this.position, 3 * tech.hookNails)
                                        const ANGLE = 2 * Math.PI * Math.random() //make a few random ones
                                        for (let i = 0; i < 13; i++) b.nail(this.position, { x: 10.5 * Math.cos(ANGLE), y: 10.5 * Math.sin(ANGLE) }, 1.2)

                                        const blockVertices = blocks[i].bodyA.vertices
                                        Composite.remove(engine.world, blocks[i].bodyA)
                                        body.splice(body.indexOf(blocks[i].bodyA), 1)
                                        //animate the block fading away
                                        simulation.ephemera.push({
                                            name: "blockFadeOut",
                                            count: 25, //cycles before it self removes
                                            do() {
                                                this.count--
                                                if (this.count < 0) simulation.removeEphemera(this.name)
                                                ctx.beginPath();
                                                ctx.moveTo(blockVertices[0].x, blockVertices[0].y);
                                                for (let j = 1; j < blockVertices.length; j++) ctx.lineTo(blockVertices[j].x, blockVertices[j].y);
                                                ctx.lineTo(blockVertices[0].x, blockVertices[0].y);
                                                ctx.lineWidth = 2;
                                                ctx.strokeStyle = `rgba(0,0,0,${this.count / 25})`
                                                ctx.stroke();
                                            },
                                        })
                                    } else {
                                        this.pickUpTarget = blocks[i].bodyA
                                        this.blockDist = Vector.magnitude(Vector.sub(this.pickUpTarget.position, m.pos))
                                    }
                                }
                            }
                        }
                    }
                },
                grabPowerUp() { //grab power ups near the tip of the harpoon
                    if (this.caughtPowerUp) {
                        Matter.Body.setPosition(this.caughtPowerUp, Vector.add(this.vertices[2], this.velocity))
                        Matter.Body.setVelocity(this.caughtPowerUp, { x: 0, y: 0 })
                    } else {
                        for (let i = 0, len = powerUp.length; i < len; ++i) {
                            if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
                            const radius = powerUp[i].circleRadius + 50
                            if (Vector.magnitudeSquared(Vector.sub(this.vertices[2], powerUp[i].position)) < radius * radius) {
                                if (powerUp[i].name !== "heal" || m.health !== m.maxHealth || tech.isOverHeal) {
                                    this.caughtPowerUp = powerUp[i]
                                    Matter.Body.setVelocity(powerUp[i], { x: 0, y: 0 })
                                    Matter.Body.setPosition(powerUp[i], this.vertices[2])
                                    powerUp[i].collisionFilter.category = 0
                                    powerUp[i].collisionFilter.mask = 0
                                    this.thrustMag *= 0.6
                                    this.endCycle += 0.5 //it pulls back slower, so this prevents it from ending early
                                    // this.retract()
                                    break //just pull 1 power up if possible
                                }
                            }
                        }
                    }
                    m.grabPowerUp();
                },
                do() {
                    if (m.fieldCDcycle < m.cycle + 5) m.fieldCDcycle = m.cycle + 5
                    if (input.field) {
                        this.grabBlocks()
                        this.grabPowerUp()
                    } else {
                        this.retract()
                    }
                    //grappling hook
                    if (input.field && Matter.Query.collides(this, map).length) {
                        Matter.Body.setPosition(this, Vector.add(this.position, { x: -20 * Math.cos(this.angle), y: -20 * Math.sin(this.angle) }))
                        if (Matter.Query.collides(this, map).length) {
                            if (tech.hookNails) {
                                b.targetedNail(this.position, tech.hookNails)
                                const ANGLE = 2 * Math.PI * Math.random() //make a few random ones
                                for (let i = 0; i < 4; i++) b.nail(this.position, { x: 10.5 * Math.cos(ANGLE), y: 10.5 * Math.sin(ANGLE) }, 1.2)

                            }
                            this.attached = true
                            Matter.Body.setVelocity(this, { x: 0, y: 0 });
                            Matter.Sleeping.set(this, true)
                            this.endCycle = simulation.cycle + 5
                            this.do = () => {
                                if (m.fieldCDcycle < m.cycle + 5) m.fieldCDcycle = m.cycle + 5
                                this.grabPowerUp()

                                //between player nose and the grapple
                                const sub = Vector.sub(this.vertices[0], { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) })
                                let dist = Vector.magnitude(sub)
                                if (input.field) {
                                    this.endCycle = simulation.cycle + 10
                                    if (input.down) { //down
                                        this.isSlowPull = true
                                        dist = 0
                                        player.force.y += 3 * player.mass * simulation.g; //adjust this to control fall rate while hooked and pressing down
                                    } else if (input.up) {
                                        this.isSlowPull = false
                                        player.force.y -= player.mass * simulation.g; //adjust this to control fall rate while hooked and pressing down
                                    }
                                    if (m.energy < this.drain) this.isSlowPull = true

                                    // pulling friction that allowed a slight swinging, but has high linear pull at short dist
                                    const drag = 1 - 30 / Math.min(Math.max(100, dist), 700) - 0.1 * (player.speed > 66)
                                    Matter.Body.setVelocity(player, { x: player.velocity.x * drag, y: player.velocity.y * drag });
                                    const pull = Vector.mult(Vector.normalise(sub), 0.0004 * Math.min(Math.max(15, dist), this.isSlowPull ? 70 : 200))
                                    //original pulling force with high friction and very linear pull
                                    // Matter.Body.setVelocity(player, { x: player.velocity.x * 0.85, y: player.velocity.y * 0.85 });
                                    // const pull = Vector.mult(Vector.normalise(sub), 0.0008 * Math.min(Math.max(15, dist), this.isSlowPull ? 100 : 200))

                                    player.force.x += pull.x
                                    player.force.y += pull.y
                                    if (dist > 500) m.energy -= this.drain
                                } else {
                                    Matter.Sleeping.set(this, false)
                                    this.retract()
                                }
                                this.draw();
                            }
                        }
                    }
                    this.force.x += this.thrustMag * this.mass * Math.cos(this.angle);
                    this.force.y += this.thrustMag * this.mass * Math.sin(this.angle);
                    this.draw()
                },
            });
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true, thrust = 0.1) {
        const me = bullet.length;
        const returnRadius = 100 * Math.sqrt(harpoonSize)
        bullet[me] = Bodies.fromVertices(where.x, where.y, [{
            x: -40 * harpoonSize,
            y: 2 * harpoonSize,
            index: 0,
            isInternal: false
        }, {
            x: -40 * harpoonSize,
            y: -2 * harpoonSize,
            index: 1,
            isInternal: false
        }, {
            x: 50 * harpoonSize,
            y: -3 * harpoonSize,
            index: 3,
            isInternal: false
        }, {
            x: 30 * harpoonSize,
            y: 2 * harpoonSize,
            index: 4,
            isInternal: false
        }], {
            cycle: 0,
            angle: angle,
            friction: 1,
            frictionAir: 0.4,
            // thrustMag: 0.1,
            drain: tech.isRailEnergy ? 0.0002 : 0.006,
            turnRate: isReturn ? 0.1 : 0.03, //0.015
            drawStringControlMagnitude: 3000 + 5000 * Math.random(),
            drawStringFlip: (Math.round(Math.random()) ? 1 : -1),
            dmg: 6, //damage done in addition to the damage from momentum
            classType: "bullet",
            endCycle: simulation.cycle + totalCycles * 2.5 + 40,
            collisionFilter: {
                category: cat.bullet,
                mask: tech.isShieldPierce ? cat.map | cat.body | cat.mob | cat.mobBullet : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield,
            },
            minDmgSpeed: 4,
            lookFrequency: Math.floor(7 + Math.random() * 3),
            density: tech.harpoonDensity, //0.001 is normal for blocks,  0.004 is normal for harpoon,  0.004*6 when buffed
            foamSpawned: 0,
            beforeDmg(who) {
                if (tech.isShieldPierce && who.isShielded) { //disable shields
                    who.isShielded = false
                    requestAnimationFrame(() => {
                        who.isShielded = true
                    });
                }
                if (tech.fragments) {
                    b.targetedNail(this.vertices[2], tech.fragments * Math.floor(2 + Math.random()))
                    if (!isReturn) this.endCycle = 0;
                }
                if (!who.isBadTarget) {
                    if (isReturn) {
                        this.do = this.returnToPlayer
                    } else {
                        this.frictionAir = 0.01
                        this.do = () => {
                            this.force.y += this.mass * 0.003; //gravity
                            this.draw();
                        }
                    }
                }
                if (tech.isFoamBall && this.foamSpawned < 55) {
                    for (let i = 0, len = Math.min(30, 2 + 3 * Math.sqrt(this.mass)); i < len; i++) {
                        const radius = 5 + 9 * Math.random()
                        const velocity = { x: Math.max(0.5, 2 - radius * 0.1), y: 0 }
                        b.foam(this.position, Vector.rotate(velocity, 6.28 * Math.random()), radius)
                        this.foamSpawned++
                    }
                }
                if (tech.isHarpoonPowerUp && simulation.cycle - 480 < tech.harpoonPowerUpCycle) {
                    Matter.Body.setDensity(this, 1.8 * tech.harpoonDensity); //+90% damage after pick up power up for 8 seconds
                } else if (tech.isHarpoonFullHealth && who.health === 1) {
                    Matter.Body.setDensity(this, 2.2 * tech.harpoonDensity); //+90% damage if mob has full health do
                    simulation.ephemera.push({
                        name: "harpoon outline",
                        count: 2, //cycles before it self removes
                        vertices: this.vertices,
                        do() {
                            this.count--
                            if (this.count < 0) simulation.removeEphemera(this.name)

                            ctx.beginPath();
                            ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                            for (let j = 1, len = this.vertices.length; j < len; j += 1) ctx.lineTo(this.vertices[j].x, this.vertices[j].y);
                            ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                            ctx.lineJoin = "miter"
                            ctx.miterLimit = 20;
                            ctx.lineWidth = 40;
                            ctx.strokeStyle = "rgba(255,0,100,0.35)";
                            ctx.stroke();
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = `#f07`;
                            ctx.stroke();
                            ctx.lineJoin = "round"
                            ctx.miterLimit = 5
                            ctx.fillStyle = "#000"
                            ctx.fill();
                        },
                    })
                }
            },
            caughtPowerUp: null,
            dropCaughtPowerUp() {
                if (this.caughtPowerUp) {
                    this.caughtPowerUp.collisionFilter.category = cat.powerUp
                    this.caughtPowerUp.collisionFilter.mask = cat.map | cat.powerUp
                    this.caughtPowerUp = null
                }
            },
            onEnd() {
                if (this.caughtPowerUp && !simulation.isChoosing && (this.caughtPowerUp.name !== "heal" || m.health !== m.maxHealth || tech.isOverHeal)) {
                    let index = null //find index
                    for (let i = 0, len = powerUp.length; i < len; ++i) {
                        if (powerUp[i] === this.caughtPowerUp) index = i
                    }
                    if (index !== null) {
                        powerUps.onPickUp(this.caughtPowerUp);
                        this.caughtPowerUp.effect();
                        Matter.Composite.remove(engine.world, this.caughtPowerUp);
                        powerUp.splice(index, 1);
                        if (tech.isHarpoonPowerUp) tech.harpoonPowerUpCycle = simulation.cycle
                    } else {
                        this.dropCaughtPowerUp()
                    }
                } else {
                    this.dropCaughtPowerUp()
                }
            },
            drawDamageAura() {
                ctx.beginPath();
                ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                for (let j = 1, len = this.vertices.length; j < len; j += 1) ctx.lineTo(this.vertices[j].x, this.vertices[j].y);
                ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                ctx.lineJoin = "miter"
                ctx.miterLimit = 20;
                ctx.lineWidth = 15;
                ctx.strokeStyle = "rgba(255,0,100,0.25)";
                ctx.stroke();
                ctx.lineWidth = 4;
                ctx.strokeStyle = `#f07`;
                ctx.stroke();
                ctx.lineJoin = "round"
                ctx.miterLimit = 5
                ctx.fillStyle = "#000"
                ctx.fill();
            },
            drawString() {
                const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }
                const sub = Vector.sub(where, this.vertices[0])
                const perpendicular = Vector.mult(Vector.normalise(Vector.perp(sub)), this.drawStringFlip * Math.min(80, 10 + this.drawStringControlMagnitude / (10 + Vector.magnitude(sub))))
                const controlPoint = Vector.add(Vector.add(where, Vector.mult(sub, -0.5)), perpendicular)
                ctx.strokeStyle = "#000" // "#0ce"
                ctx.lineWidth = 0.5
                ctx.beginPath();
                ctx.moveTo(where.x, where.y);
                ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, this.vertices[0].x, this.vertices[0].y)
                // ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                ctx.stroke();
            },
            draw() { },
            returnToPlayer() {
                if (Vector.magnitude(Vector.sub(this.position, m.pos)) < returnRadius) { //near player
                    this.endCycle = 0;
                    // if (m.energy < 0.05) {
                    //     m.fireCDcycle = m.cycle + 80 * b.fireCDscale; //fire cooldown is much longer when out of energy
                    // } else if (m.cycle + 20 * b.fireCDscale < m.fireCDcycle) {
                    // if (m.energy > 0.05) m.fireCDcycle = m.cycle + 20 * b.fireCDscale //lower cd to 25 if it is above 25
                    // }
                    //recoil on catching
                    const momentum = Vector.mult(Vector.sub(this.velocity, player.velocity), (m.crouch ? 0.0001 : 0.0002))
                    player.force.x += momentum.x
                    player.force.y += momentum.y
                    // refund ammo
                    if (isReturnAmmo) {
                        b.guns[9].ammo++;
                        if (level.is2xAmmo) b.guns[9].ammo++;
                        simulation.updateGunHUD();
                        // for (i = 0, len = b.guns.length; i < len; i++) { //find which gun 
                        //     if (b.guns[i].name === "harpoon") {
                        //         break;
                        //     }
                        // }
                    }
                } else {
                    const sub = Vector.sub(this.position, m.pos)
                    const rangeScale = 1 + 0.000001 * Vector.magnitude(sub) * Vector.magnitude(sub) //return faster when far from player
                    const returnForce = Vector.mult(Vector.normalise(sub), rangeScale * thrust * this.mass)
                    if (m.energy > this.drain) m.energy -= this.drain
                    if (m.energy < 0.05) {
                        this.force.x -= returnForce.x * 0.15
                        this.force.y -= returnForce.y * 0.15
                    } else { //if (m.cycle + 20 * b.fireCDscale < m.fireCDcycle)
                        this.force.x -= returnForce.x
                        this.force.y -= returnForce.y
                    }
                    this.grabPowerUp()
                }
                this.draw();
            },
            grabPowerUp() { //grab power ups near the tip of the harpoon
                if (this.caughtPowerUp) {
                    Matter.Body.setPosition(this.caughtPowerUp, Vector.add(this.vertices[2], this.velocity))
                    Matter.Body.setVelocity(this.caughtPowerUp, { x: 0, y: 0 })
                } else { //&& simulation.cycle % 2 
                    for (let i = 0, len = powerUp.length; i < len; ++i) {
                        if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
                        const radius = powerUp[i].circleRadius + 50
                        if (Vector.magnitudeSquared(Vector.sub(this.vertices[2], powerUp[i].position)) < radius * radius && !powerUp[i].isGrabbed) {
                            if (powerUp[i].name !== "heal" || m.health !== m.maxHealth || tech.isOverHeal) {
                                powerUp[i].isGrabbed = true
                                this.caughtPowerUp = powerUp[i]
                                Matter.Body.setVelocity(powerUp[i], { x: 0, y: 0 })
                                Matter.Body.setPosition(powerUp[i], this.vertices[2])
                                powerUp[i].collisionFilter.category = 0
                                powerUp[i].collisionFilter.mask = 0
                                thrust *= 0.6
                                this.endCycle += 0.5 //it pulls back slower, so this prevents it from ending early
                                break //just pull 1 power up if possible
                            }
                        }
                    }
                }
            },
            do() {
                this.cycle++
                if (isReturn || target) {
                    if (isReturn) {
                        if (this.cycle > totalCycles) { //return to player  //|| !input.fire
                            this.do = this.returnToPlayer
                            if (this.angularSpeed < 0.5) this.torque += this.inertia * 0.001 * (Math.random() - 0.5) //(Math.round(Math.random()) ? 1 : -1)
                            Matter.Sleeping.set(this, false)
                            this.endCycle = simulation.cycle + 240
                            const momentum = Vector.mult(Vector.sub(this.velocity, player.velocity), (m.crouch ? 0.00015 : 0.0003)) //recoil on jerking line
                            player.force.x += momentum.x
                            player.force.y += momentum.y
                            requestAnimationFrame(() => { //delay this for 1 cycle to get the proper hit graphics
                                this.collisionFilter.category = 0
                                this.collisionFilter.mask = 0
                            });
                        } else {
                            this.grabPowerUp()
                        }
                    }
                    if (target) { //rotate towards the target
                        const face = {
                            x: Math.cos(this.angle),
                            y: Math.sin(this.angle)
                        };
                        const vectorGoal = Vector.normalise(Vector.sub(this.position, target.position));
                        if (Vector.cross(vectorGoal, face) > 0) {
                            Matter.Body.rotate(this, this.turnRate);
                        } else {
                            Matter.Body.rotate(this, -this.turnRate);
                        }
                    }
                    this.force.x += thrust * this.mass * Math.cos(this.angle);
                    this.force.y += thrust * this.mass * Math.sin(this.angle);
                }
                this.draw()
            },
        });
        if (!isReturn && !target) {
            Matter.Body.setVelocity(bullet[me], {
                x: 0.7 * player.velocity.x + 600 * thrust * Math.cos(bullet[me].angle),
                y: 0.5 * player.velocity.x + 600 * thrust * Math.sin(bullet[me].angle)
            });
            bullet[me].frictionAir = 0.002
            bullet[me].do = function () {
                if (this.speed < 20) this.force.y += 0.0005 * this.mass;
                this.draw();
            }
        }
        if (tech.isHarpoonPowerUp && simulation.cycle - 480 < tech.harpoonPowerUpCycle) { //8 seconds
            if (isReturn) {
                bullet[me].draw = function () {
                    this.drawDamageAura()
                    this.drawString()
                }
            } else {
                bullet[me].draw = function () {
                    this.drawDamageAura()
                }
            }
        } else if (isReturn) {
            bullet[me].draw = function () {
                this.drawString()
            }
        }
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    missile(where, angle, speed, size = 1) {
        if (tech.isMissileBig) {
            size *= 1.55
            if (tech.isMissileBiggest) {
                size *= 1.55

            }
        }
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(where.x, where.y, 30 * size, 4 * size, {
            angle: angle,
            friction: 0.5,
            frictionAir: 0.045,
            dmg: 0, //damage done in addition to the damage from momentum
            classType: "bullet",
            endCycle: simulation.cycle + Math.floor((230 + 40 * Math.random()) * tech.bulletsLastLonger + 120 * tech.isMissileBiggest + 60 * tech.isMissileBig),
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
            },
            minDmgSpeed: 10,
            lookFrequency: Math.floor(10 + Math.random() * 3),
            explodeRad: (tech.isMissileBig ? 230 : 180) + 60 * Math.random(),
            density: 0.02, //0.001 is normal
            beforeDmg() {
                Matter.Body.setDensity(this, 0.0001); //reduce density to normal
                this.tryToLockOn();
                this.endCycle = 0; //bullet ends cycle after doing damage  // also triggers explosion
            },
            onEnd() {
                b.explosion(this.position, this.explodeRad * size); //makes bullet do explosive damage at end
                if (tech.fragments) b.targetedNail(this.position, tech.fragments * Math.floor(2 + 1.5 * Math.random()))
            },
            lockedOn: null,
            tryToLockOn() {
                let closeDist = Infinity;
                const futurePos = Vector.add(this.position, Vector.mult(this.velocity, 30)) //look for closest target to where the missile will be in 30 cycles
                this.lockedOn = null;
                // const futurePos = this.lockedOn ? :Vector.add(this.position, Vector.mult(this.velocity, 50))
                for (let i = 0, len = mob.length; i < len; ++i) {
                    if (
                        mob[i].alive && !mob[i].isBadTarget &&
                        Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                        !mob[i].isInvulnerable
                    ) {
                        const futureDist = Vector.magnitude(Vector.sub(futurePos, mob[i].position));
                        if (futureDist < closeDist) {
                            closeDist = futureDist;
                            this.lockedOn = mob[i];
                            // this.frictionAir = 0.04; //extra friction once a target it locked
                        }
                        if (Vector.magnitude(Vector.sub(this.position, mob[i].position) < this.explodeRad)) {
                            this.endCycle = 0; //bullet ends cycle after doing damage  //also triggers explosion
                            mob[i].lockedOn.damage(m.dmgScale * 2 * size); //does extra damage to target
                        }
                    }
                }
                //explode when bullet is close enough to target
                if (this.lockedOn && Vector.magnitude(Vector.sub(this.position, this.lockedOn.position)) < this.explodeRad) {
                    this.endCycle = 0; //bullet ends cycle after doing damage  //also triggers explosion
                    this.lockedOn.damage(m.dmgScale * 4 * size); //does extra damage to target
                }
            },
            do() {
                if (!(m.cycle % this.lookFrequency)) this.tryToLockOn();
                if (this.lockedOn) { //rotate missile towards the target
                    const face = {
                        x: Math.cos(this.angle),
                        y: Math.sin(this.angle)
                    };
                    const target = Vector.normalise(Vector.sub(this.position, this.lockedOn.position));
                    const dot = Vector.dot(target, face)
                    const aim = Math.min(0.08, (1 + dot) * 1)
                    if (Vector.cross(target, face) > 0) {
                        Matter.Body.rotate(this, aim);
                    } else {
                        Matter.Body.rotate(this, -aim);
                    }
                    this.frictionAir = Math.min(0.1, Math.max(0.04, 1 + dot)) //0.08; //extra friction if turning
                }
                //accelerate in direction bullet is facing
                const dir = this.angle;
                this.force.x += thrust * Math.cos(dir);
                this.force.y += thrust * Math.sin(dir);

                ctx.beginPath(); //draw rocket
                ctx.arc(this.position.x - Math.cos(this.angle) * (25 * size - 3) + (Math.random() - 0.5) * 4,
                    this.position.y - Math.sin(this.angle) * (25 * size - 3) + (Math.random() - 0.5) * 4,
                    11 * size, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(255,155,0,0.5)";
                ctx.fill();
            },
        });
        const thrust = 0.0066 * bullet[me].mass * (tech.isMissileBig ? (tech.isMissileBiggest ? 0.3 : 0.7) : 1);
        Matter.Body.setVelocity(bullet[me], {
            x: 0.5 * player.velocity.x + speed * Math.cos(angle),
            y: 0.5 * player.velocity.y + speed * Math.sin(angle)
        });
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    lastAngle: 0,
    wasExtruderOn: false,
    isExtruderOn: false,
    didExtruderDrain: false,
    canExtruderFire: true,
    extruder() {
        const DRAIN = 0.0012
        if (m.energy > DRAIN && b.canExtruderFire) {
            m.energy -= DRAIN
            if (m.energy < 0) {
                m.fieldCDcycle = m.cycle + 120;
                m.energy = 0;
            }
            b.isExtruderOn = true
            const SPEED = 8 + 12 * tech.isPlasmaRange
            const me = bullet.length;
            const where = Vector.add(m.pos, player.velocity)
            bullet[me] = Bodies.polygon(where.x + 20 * Math.cos(m.angle), where.y + 20 * Math.sin(m.angle), 4, 0.01, {
                cycle: -0.5,
                isWave: true,
                endCycle: simulation.cycle + 40, // + 30 * tech.isPlasmaRange,
                inertia: Infinity,
                frictionAir: 0,
                isInHole: true, //this keeps the bullet from entering wormholes
                minDmgSpeed: 0,
                dmg: m.dmgScale * 2.7, //damage also changes when you divide by mob.mass on in .do()
                classType: "bullet",
                isBranch: false,
                restitution: 0,
                collisionFilter: {
                    // category: 0,
                    // mask: 0, //cat.mob | cat.mobBullet | cat.mobShield
                    category: 0, //cat.bullet,
                    mask: 0, //cat.map, //cat.mob | cat.mobBullet | cat.mobShield
                },
                beforeDmg() { },
                onEnd() { },
                do() {
                    if (this.endCycle < simulation.cycle + 1) this.isWave = false
                    if (Matter.Query.point(map, this.position).length) { //check if inside map   //|| Matter.Query.point(body, this.position).length
                        this.isBranch = true;
                        this.do = () => {
                            if (this.endCycle < simulation.cycle + 1) this.isWave = false
                        }
                    } else { //check if inside a mob
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position))
                            const radius = mob[i].radius + tech.extruderRange / 2
                            if (dist < radius * radius) {
                                if (mob[i].speed > 2) {
                                    if (mob[i].isBoss || mob[i].isShielded) {
                                        Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.95, y: mob[i].velocity.y * 0.95 });
                                    } else {
                                        Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.25, y: mob[i].velocity.y * 0.25 });
                                    }
                                }
                                // Matter.Body.setPosition(this, Vector.add(this.position, mob[i].velocity)) //move with the medium
                                let dmg = this.dmg / Math.min(10, mob[i].mass)
                                mob[i].damage(dmg);
                                if (mob[i].alive) mob[i].foundPlayer();
                            }
                        }
                    }
                    this.cycle++
                    const wiggleMag = (m.crouch ? 6 : 12) * Math.cos(simulation.cycle * 0.09)
                    const wiggle = Vector.mult(transverse, wiggleMag * Math.cos(this.cycle * 0.36)) //+ wiggleMag * Math.cos(simulation.cycle * 0.3))
                    const velocity = Vector.mult(player.velocity, 0.4) //move with player
                    Matter.Body.setPosition(this, Vector.add(velocity, Vector.add(this.position, wiggle)))
                }
            });
            Composite.add(engine.world, bullet[me]); //add bullet to world
            Matter.Body.setVelocity(bullet[me], {
                x: SPEED * Math.cos(m.angle),
                y: SPEED * Math.sin(m.angle)
            });
            const transverse = Vector.normalise(Vector.perp(bullet[me].velocity))
            if (180 - Math.abs(Math.abs(b.lastAngle - m.angle) - 180) > 0.13 || !b.wasExtruderOn) {
                bullet[me].isBranch = true; //don't draw stroke for this bullet
                bullet[me].do = function () {
                    if (this.endCycle < simulation.cycle + 1) this.isWave = false
                }
            }
            b.lastAngle = m.angle //track last angle for the above angle difference calculation
        } else {
            b.canExtruderFire = false;
        }
    },
    plasma() {
        const DRAIN = 0.00075
        if (m.energy > DRAIN) {
            m.energy -= DRAIN;
            if (m.energy < 0) {
                m.fieldCDcycle = m.cycle + 120;
                m.energy = 0;
            }

            //calculate laser collision
            let range = tech.isPlasmaRange * (120 + (m.crouch ? 400 : 300) * Math.sqrt(Math.random())) //+ 100 * Math.sin(m.cycle * 0.3);
            // const dir = m.angle // + 0.04 * (Math.random() - 0.5)
            const path = [
                { x: m.pos.x + 20 * Math.cos(m.angle), y: m.pos.y + 20 * Math.sin(m.angle) },
                { x: m.pos.x + range * Math.cos(m.angle), y: m.pos.y + range * Math.sin(m.angle) }
            ];
            //check for collisions
            let best = {
                x: null,
                y: null,
                dist2: Infinity,
                who: null,
                v1: null,
                v2: null
            };
            best = vertexCollision(path[0], path[1], [mob, map, body]);
            if (best.dist2 != Infinity) { //if hitting something
                path[path.length - 1] = { x: best.x, y: best.y };
                if (best.who.alive) {
                    const dmg = 0.9 * m.dmgScale; //********** SCALE DAMAGE HERE *********************
                    best.who.damage(dmg);
                    best.who.locatePlayer();

                    //push mobs away
                    if (best.who.speed > 3) {
                        const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.005 * Math.min(5, best.who.mass))
                        Matter.Body.applyForce(best.who, path[1], force)
                        Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.4, y: best.who.velocity.y * 0.4 });
                    } else {
                        const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.01 * Math.min(5, best.who.mass))
                        Matter.Body.applyForce(best.who, path[1], force)
                        Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.7, y: best.who.velocity.y * 0.7 });
                    }
                    //draw mob damage circle
                    simulation.drawList.push({
                        x: path[1].x,
                        y: path[1].y,
                        radius: Math.sqrt(2000 * dmg * best.who.damageReduction),
                        color: "rgba(255,0,255,0.2)",
                        time: simulation.drawTime * 4
                    });
                } else if (!best.who.isStatic) {
                    //push blocks away
                    const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.007 * Math.sqrt(Math.sqrt(best.who.mass)))
                    Matter.Body.applyForce(best.who, path[1], force)
                }
            }

            //draw blowtorch laser beam
            ctx.strokeStyle = "rgba(255,0,255,0.1)"
            ctx.lineWidth = 14
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            ctx.lineTo(path[1].x, path[1].y);
            ctx.stroke();
            ctx.strokeStyle = "#f0f";
            ctx.lineWidth = 2
            ctx.stroke();

            //draw electricity
            const Dx = Math.cos(m.angle);
            const Dy = Math.sin(m.angle);
            let x = m.pos.x + 20 * Dx;
            let y = m.pos.y + 20 * Dy;
            ctx.beginPath();
            ctx.moveTo(x, y);
            const step = Vector.magnitude(Vector.sub(path[0], path[1])) / 10
            for (let i = 0; i < 8; i++) {
                x += step * (Dx + 1.5 * (Math.random() - 0.5))
                y += step * (Dy + 1.5 * (Math.random() - 0.5))
                ctx.lineTo(x, y);
            }
            ctx.lineWidth = 2 * Math.random();
            ctx.stroke();
        }
    },
    laser(where = {
        x: m.pos.x + 20 * Math.cos(m.angle),
        y: m.pos.y + 20 * Math.sin(m.angle)
    }, whereEnd = {
        x: where.x + 3000 * Math.cos(m.angle),
        y: where.y + 3000 * Math.sin(m.angle)
    }, dmg = tech.laserDamage, reflections = tech.laserReflections, isThickBeam = false, push = 1) {
        const reflectivity = 1 - 1 / (reflections * 3)
        let damage = m.dmgScale * dmg
        let best = { x: 1, y: 1, dist2: Infinity, who: null, v1: 1, v2: 1 };
        const path = [{ x: where.x, y: where.y }, { x: whereEnd.x, y: whereEnd.y }];

        const checkForCollisions = function () {
            best = vertexCollision(path[path.length - 2], path[path.length - 1], [mob, map, body]);
        };
        const laserHitMob = function () {
            if (best.who.alive) {
                best.who.locatePlayer();
                if (best.who.damageReduction) {
                    if ( //iridescence
                        tech.laserCrit && !best.who.shield &&
                        Vector.dot(Vector.normalise(Vector.sub(best.who.position, path[path.length - 1])), Vector.normalise(Vector.sub(path[path.length - 1], path[path.length - 2]))) > 0.999 - 0.5 / best.who.radius
                    ) {
                        damage *= 1 + tech.laserCrit
                        simulation.drawList.push({ //add dmg to draw queue
                            x: path[path.length - 1].x,
                            y: path[path.length - 1].y,
                            radius: Math.sqrt(2500 * damage * best.who.damageReduction) + 5,
                            color: `hsla(${60 + 283 * Math.random()},100%,70%,0.5)`, // random hue, but not red
                            time: 16
                        });
                    } else {
                        simulation.drawList.push({ //add dmg to draw queue
                            x: path[path.length - 1].x,
                            y: path[path.length - 1].y,
                            radius: Math.sqrt(2000 * damage * best.who.damageReduction) + 2,
                            color: tech.laserColorAlpha,
                            time: simulation.drawTime
                        });
                    }
                    best.who.damage(damage);
                }
                if (tech.isLaserPush) { //push mobs away
                    const index = path.length - 1
                    Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.97, y: best.who.velocity.y * 0.97 });
                    const force = Vector.mult(Vector.normalise(Vector.sub(path[index], path[Math.max(0, index - 1)])), 0.003 * push * Math.min(6, best.who.mass))
                    Matter.Body.applyForce(best.who, path[index], force)
                }
            } else if (tech.isLaserPush && best.who.classType === "body") {
                const index = path.length - 1
                Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.97, y: best.who.velocity.y * 0.97 });
                const force = Vector.mult(Vector.normalise(Vector.sub(path[index], path[Math.max(0, index - 1)])), 0.003 * push * Math.min(6, best.who.mass))
                Matter.Body.applyForce(best.who, path[index], force)
            }
        };
        const reflection = function () { // https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
            const n = Vector.perp(Vector.normalise(Vector.sub(best.v1, best.v2)));
            const d = Vector.sub(path[path.length - 1], path[path.length - 2]);
            const nn = Vector.mult(n, 2 * Vector.dot(d, n));
            const r = Vector.normalise(Vector.sub(d, nn));
            path[path.length] = Vector.add(Vector.mult(r, 5000), path[path.length - 1]);
        };

        checkForCollisions();
        let lastBestOdd
        let lastBestEven = best.who //used in hack below
        if (best.dist2 !== Infinity) { //if hitting something
            path[path.length - 1] = { x: best.x, y: best.y };
            laserHitMob();
            for (let i = 0; i < reflections; i++) {
                reflection();
                checkForCollisions();
                if (best.dist2 !== Infinity) { //if hitting something
                    lastReflection = best
                    path[path.length - 1] = { x: best.x, y: best.y };
                    damage *= reflectivity
                    laserHitMob();
                    //I'm not clear on how this works, but it gets rid of a bug where the laser reflects inside a block, often vertically.
                    //I think it checks to see if the laser is reflecting off a different part of the same block, if it is "inside" a block
                    if (i % 2) {
                        if (lastBestOdd === best.who) break
                    } else {
                        lastBestOdd = best.who
                        if (lastBestEven === best.who) break
                    }
                } else {
                    break
                }
            }
        }
        if (isThickBeam) {
            for (let i = 1, len = path.length; i < len; ++i) {
                ctx.moveTo(path[i - 1].x, path[i - 1].y);
                ctx.lineTo(path[i].x, path[i].y);
            }
        } else if (tech.isLaserLens && b.guns[11].lensDamage !== 1) {
            ctx.strokeStyle = tech.laserColor;
            ctx.lineWidth = 2
            ctx.lineDashOffset = 900 * Math.random()
            ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
            for (let i = 1, len = path.length; i < len; ++i) {
                ctx.beginPath();
                ctx.moveTo(path[i - 1].x, path[i - 1].y);
                ctx.lineTo(path[i].x, path[i].y);
                ctx.stroke();
                ctx.globalAlpha *= reflectivity; //reflections are less intense
            }
            ctx.setLineDash([]);
            // ctx.globalAlpha = 1;

            //glow
            ctx.lineWidth = 9 + 2 * b.guns[11].lensDamageOn
            ctx.globalAlpha = 0.13
            ctx.beginPath();
            for (let i = 1, len = path.length; i < len; ++i) {
                ctx.moveTo(path[i - 1].x, path[i - 1].y);
                ctx.lineTo(path[i].x, path[i].y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        } else {
            ctx.strokeStyle = tech.laserColor;
            ctx.lineWidth = 2
            ctx.lineDashOffset = 900 * Math.random()
            ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
            for (let i = 1, len = path.length; i < len; ++i) {
                ctx.beginPath();
                ctx.moveTo(path[i - 1].x, path[i - 1].y);
                ctx.lineTo(path[i].x, path[i].y);
                ctx.stroke();
                ctx.globalAlpha *= reflectivity; //reflections are less intense
            }
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        }
    },
    AoEStunEffect(where, range, cycles = 120 + 60 * Math.random()) {
        for (let i = 0, len = mob.length; i < len; ++i) {
            if (mob[i].alive && !mob[i].isShielded && !mob[i].shield && !mob[i].isBadTarget) {
                if (Vector.magnitude(Vector.sub(where, mob[i].position)) - mob[i].radius < range) mobs.statusStun(mob[i], cycles)
            }
        }
        simulation.drawList.push({
            x: where.x,
            y: where.y,
            radius: range,
            color: "rgba(0,0,0,0.1)",
            time: 15
        });
    },
    laserMine(position, velocity = {
        x: 0,
        y: -8
    }) {
        const me = bullet.length;
        bullet[me] = Bodies.polygon(position.x, position.y, 3, 25, {
            bulletType: "laser mine",
            angle: m.angle,
            friction: 0,
            frictionAir: 0.025,
            restitution: 0.5,
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 67 + Math.floor(7 * Math.random()),
            drain: 0.7 * tech.laserDrain,
            isDetonated: false,
            torqueMagnitude: 0.000003 * (Math.round(Math.random()) ? 1 : -1),
            range: 1500,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
            },
            beforeDmg() { },
            onEnd() { },
            do() {
                if (!(simulation.cycle % this.lookFrequency) && m.energy > this.drain) { //find mob targets
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (
                            Vector.magnitude(Vector.sub(this.position, mob[i].position)) < 1300 &&
                            !mob[i].isBadTarget &&
                            Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                            Matter.Query.ray(body, this.position, mob[i].position).length === 0
                        ) {
                            if (tech.isStun) b.AoEStunEffect(this.position, 1300); //AoEStunEffect(where, range, cycles = 90 + 60 * Math.random()) {
                            this.do = this.laserSpin
                            if (this.angularSpeed < 0.5) this.torque += this.inertia * this.torqueMagnitude * 200 //spin
                            this.endCycle = simulation.cycle + 360 + 120
                            // if (this.angularSpeed < 0.01) this.torque += this.inertia * this.torqueMagnitude * 5 //spin
                            this.isDetonated = true
                            break
                        }
                    }
                }
            },
            reflections: Math.max(0, tech.laserReflections - 2),
            laserSpin() {
                //drain energy
                if (m.energy > this.drain) {
                    m.energy -= this.drain
                    if (this.angularSpeed < 0.05) this.torque += this.inertia * this.torqueMagnitude //spin

                    //fire lasers
                    ctx.strokeStyle = tech.laserColor;
                    ctx.lineWidth = 1.5
                    // ctx.globalAlpha = 1;
                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const where = this.vertices[i]
                        const endPoint = Vector.add(where, Vector.mult(Vector.normalise(Vector.sub(where, this.position)), 2500))
                        b.laser(where, endPoint, tech.laserDamage * 13, this.reflections, true)
                    }
                    ctx.stroke();
                    // ctx.globalAlpha = 1;
                }
                if (this.endCycle - 60 < simulation.cycle) {
                    this.do = () => { } //no nothing, no laser, no spin
                }
            },
        })
        Matter.Body.setVelocity(bullet[me], velocity);
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    mine(where, velocity, angle = 0) {
        const bIndex = bullet.length;
        bullet[bIndex] = Bodies.rectangle(where.x, where.y, 45, 16, {
            angle: angle,
            friction: 1,
            frictionStatic: 1,
            frictionAir: 0,
            restitution: 0,
            dmg: 0, //damage done in addition to the damage from momentum
            classType: "bullet",
            bulletType: "mine",
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //  | cat.bullet   //doesn't collide with other bullets until it lands  (was crashing into bots)
            },
            minDmgSpeed: 5,
            stillCount: 0,
            isArmed: false,
            endCycle: Infinity,
            lookFrequency: 0,
            range: 700 - 300 * tech.isFoamMine,
            beforeDmg() { },
            onEnd() {
                if (this.isArmed && !tech.isMineSentry) {
                    if (tech.isFoamMine) {
                        //send 14 in random directions slowly
                        for (let i = 0; i < 12; i++) {
                            const radius = 13 + 8 * Math.random()
                            const velocity = { x: 0.5 + 5.5 * Math.random(), y: 0 }
                            b.foam(this.position, Vector.rotate(velocity, this.angle + 1.57 + 3 * (Math.random() - 0.5)), radius) //6.28 * Math.random()
                        }
                        //send 40 targeted
                        let count = 0
                        let cycle = () => {
                            if (count < 50) {
                                if (!simulation.paused && !simulation.isChoosing) { //!(simulation.cycle % 1) &&
                                    count++
                                    b.targetedFoam(this.position)
                                }
                                requestAnimationFrame(cycle);
                            }
                        }
                        requestAnimationFrame(cycle)
                    } else if (tech.isSuperMine) {
                        b.targetedBall(this.position, 22 + 2 * tech.extraSuperBalls)
                    } else {
                        b.targetedNail(this.position, 22, 40 + 10 * Math.random(), 1200, 2.2)
                    }
                }
            },
            do() {
                this.force.y += this.mass * 0.002; //extra gravity
                let collide = Matter.Query.collides(this, map) //check if collides with map
                if (collide.length > 0) {
                    for (let i = 0; i < collide.length; i++) {
                        if (collide[i].bodyA.collisionFilter.category === cat.map) { // || collide[i].bodyB.collisionFilter.category === cat.map) {
                            const angle = Vector.angle(collide[i].normal, { x: 1, y: 0 })
                            Matter.Body.setAngle(this, Math.atan2(collide[i].tangent.y, collide[i].tangent.x))
                            for (let j = 0; j < 10; j++) { //move until touching map again after rotation
                                if (Matter.Query.collides(this, map).length > 0) { //touching map
                                    if (angle > -0.2 || angle < -1.5) { //don't stick to level ground
                                        Matter.Body.setVelocity(this, { x: 0, y: 0 });
                                        Matter.Body.setStatic(this, true) //don't set to static if not touching map
                                        this.collisionFilter.category = 0
                                        this.collisionFilter.mask = 0 //cat.map | cat.bullet
                                    } else {
                                        Matter.Body.setVelocity(this, { x: 0, y: 0 });
                                        Matter.Body.setAngularVelocity(this, 0)
                                    }
                                    this.arm();
                                    //sometimes the mine can't attach to map and it just needs to be reset
                                    setTimeout(() => {
                                        if (Matter.Query.collides(this, map).length === 0 || Matter.Query.point(map, this.position).length > 0) {
                                            this.endCycle = 0 // if not touching map explode
                                            this.isArmed = false
                                            b.mine(this.position, this.velocity, this.angle)
                                        }
                                    }, 100);
                                    break
                                }
                                Matter.Body.setPosition(this, Vector.add(this.position, Vector.mult(collide[i].normal, 2))) //move until you are touching the wall
                            }
                            break
                        }
                    }
                } else {
                    if (this.speed < 1 && this.angularSpeed < 0.01) this.stillCount++
                }
                if (this.stillCount > 25) this.arm();
            },
            arm() {
                this.collisionFilter.mask = cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield | cat.bullet //can now collide with other bullets
                this.lookFrequency = simulation.cycle + 60
                this.do = function () { //overwrite the do method for this bullet
                    this.force.y += this.mass * 0.002; //extra gravity
                    if (simulation.cycle > this.lookFrequency) {
                        this.isArmed = true
                        this.lookFrequency = 55 + Math.floor(22 * Math.random())
                        simulation.drawList.push({ x: this.position.x, y: this.position.y, radius: 10, color: "#f00", time: 4 });
                        this.do = function () { //overwrite the do method for this bullet
                            this.force.y += this.mass * 0.002; //extra gravity
                            if (!(simulation.cycle % this.lookFrequency)) { //find mob targets
                                const random = 300 * Math.random()
                                for (let i = 0, len = mob.length; i < len; ++i) {
                                    if (
                                        !mob[i].isBadTarget &&
                                        !mob[i].isInvulnerable &&
                                        Vector.magnitude(Vector.sub(this.position, mob[i].position)) < this.range + mob[i].radius + random &&
                                        Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                        Matter.Query.ray(body, this.position, mob[i].position).length === 0
                                    ) {
                                        if (tech.isStun) b.AoEStunEffect(this.position, this.range + mob[i].radius + random); //AoEStunEffect(where, range, cycles = 90 + 60 * Math.random()) {
                                        if (tech.isMineSentry) {
                                            this.lookFrequency = Math.floor(7 + 7 * b.fireCDscale + 10 * (tech.oneSuperBall && tech.isSuperMine) + Math.floor(3 * Math.random()))
                                            // this.endCycle = Infinity
                                            this.shots = tech.sentryAmmo
                                            this.do = function () { //overwrite the do method for this bullet
                                                this.force.y += this.mass * 0.002; //extra gravity
                                                if (!(simulation.cycle % this.lookFrequency)) { //find mob targets
                                                    if (tech.isFoamMine) {
                                                        this.shots -= 0.6 * b.targetedFoam(this.position, 1, 21 + 7 * Math.random(), 1200, false)
                                                        b.targetedFoam(this.position, 1, 21 + 7 * Math.random(), 1200, false)
                                                    } else if (tech.isSuperMine) {
                                                        const cost = tech.oneSuperBall ? 2 : 0.7
                                                        this.shots -= cost * b.targetedBall(this.position, 1, 42 + 12 * Math.random(), 1200, false)
                                                        for (let i = 0, len = tech.extraSuperBalls / 4; i < len; i++) {
                                                            if (Math.random() < 0.33) b.targetedBall(this.position, 1, 42 + 12 * Math.random(), 1200, false)
                                                        }
                                                    } else {
                                                        this.shots -= b.targetedNail(this.position, 1, 45 + 5 * Math.random(), 1100, 2.3)
                                                    }
                                                    if (this.shots < 0) this.endCycle = 0
                                                    if (!(simulation.cycle % (this.lookFrequency * 6))) {
                                                        simulation.drawList.push({ x: this.position.x, y: this.position.y, radius: 8, color: "#fe0", time: 4 });
                                                    }
                                                }
                                            }
                                            break
                                        } else {
                                            this.endCycle = 0 //end life if mob is near and visible
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
        bullet[bIndex].torque += bullet[bIndex].inertia * 0.0002 * (0.5 - Math.random())
        Matter.Body.setVelocity(bullet[bIndex], velocity);
        Composite.add(engine.world, bullet[bIndex]); //add bullet to world
    },
    worm(where, isFreeze = tech.isSporeFreeze) { //used with the tech upgrade in mob.death()
        const bIndex = bullet.length;
        const wormSize = 6 + tech.wormSize * 4.2 * Math.random()
        if (bIndex < 500) { //can't make over 500 spores
            bullet[bIndex] = Bodies.polygon(where.x, where.y, 3, 3, {
                inertia: Infinity,
                isFreeze: isFreeze,
                restitution: 0.5,
                // angle: Math.random() * 2 * Math.PI,
                friction: 0,
                frictionAir: 0.025,
                thrust: (tech.isSporeFollow ? 0.0012 : 0.00055) * (1 + 0.5 * (Math.random() - 0.5)),
                wormSize: wormSize,
                wormTail: 1 + Math.max(4, Math.min(wormSize - 2 * tech.wormSize, 30)),
                dmg: (tech.isMutualism ? 9.5 : 3.2) * wormSize,
                lookFrequency: 100 + Math.floor(37 * Math.random()),
                classType: "bullet",
                collisionFilter: {
                    category: cat.bullet,
                    mask: cat.map | cat.mob | cat.mobBullet | cat.mobShield //no collide with body
                },
                endCycle: simulation.cycle + Math.floor((600 + Math.floor(Math.random() * 420)) * tech.bulletsLastLonger),
                minDmgSpeed: 0,
                playerOffPosition: { //used when moving towards player to keep spores separate
                    x: 100 * (Math.random() - 0.5),
                    y: 100 * (Math.random() - 0.5)
                },
                beforeDmg(who) {
                    if (who.isInvulnerable) {
                        Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.1));
                    } else {
                        if (tech.isSpawnBulletsOnDeath && who.alive && who.isDropPowerUp) {
                            setTimeout(() => {
                                if (!who.alive) {
                                    for (let i = 0; i < 3; i++) { //spawn 3 more
                                        b.worm(this.position)
                                        bullet[bullet.length - 1].endCycle = Math.min(simulation.cycle + Math.floor(420 * tech.bulletsLastLonger), this.endCycle + 180 + Math.floor(60 * Math.random())) //simulation.cycle + Math.floor(420 * tech.bulletsLastLonger)
                                    }
                                }
                                this.endCycle = 0; //bullet ends cycle after doing damage 
                            }, 1);
                        } else {
                            this.endCycle = 0; //bullet ends cycle after doing damage 
                        }
                        if (this.isFreeze) mobs.statusSlow(who, 90)
                    }
                },
                onEnd() {
                    if (tech.isMutualism && this.isMutualismActive && !tech.isEnergyHealth) {
                        m.health += 0.02
                        if (m.health > m.maxHealth) m.health = m.maxHealth;
                        m.displayHealth();
                    }
                },
                tailCycle: 6.28 * Math.random(),
                do() {
                    this.tailCycle += this.speed * 0.025
                    ctx.beginPath(); //draw nematode
                    ctx.moveTo(this.position.x, this.position.y);
                    // const dir = Vector.mult(Vector.normalise(this.velocity), -Math.min(100, this.wormTail * this.speed))
                    const speed = Math.min(7, this.speed)
                    const dir = Vector.mult(Vector.normalise(this.velocity), -0.6 * this.wormTail * speed)
                    const tail = Vector.add(this.position, dir)
                    const wiggle = Vector.add(Vector.add(tail, dir), Vector.rotate(dir, Math.sin(this.tailCycle)))
                    // const wiggle = Vector.add(tail, Vector.rotate(dir, Math.sin((m.cycle - this.endCycle) * 0.03 * this.speed)))
                    ctx.quadraticCurveTo(tail.x, tail.y, wiggle.x, wiggle.y) // ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, this.vertices[0].x, this.vertices[0].y)
                    // ctx.lineTo(tail.x, tail.y);
                    ctx.lineWidth = this.wormSize;
                    ctx.strokeStyle = "#000";
                    ctx.stroke();


                    if (this.lockedOn && this.lockedOn.alive) {
                        this.force = Vector.mult(Vector.normalise(Vector.sub(this.lockedOn.position, this.position)), this.mass * this.thrust)
                    } else {
                        if (!(simulation.cycle % this.lookFrequency)) { //find mob targets
                            this.closestTarget = null;
                            this.lockedOn = null;
                            let closeDist = Infinity;
                            for (let i = 0, len = mob.length; i < len; ++i) {
                                if (!mob[i].isBadTarget && Matter.Query.ray(map, this.position, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                                    const targetVector = Vector.sub(this.position, mob[i].position)
                                    const dist = Vector.magnitude(targetVector) * (Math.random() + 0.5);
                                    if (dist < closeDist) {
                                        this.closestTarget = mob[i].position;
                                        closeDist = dist;
                                        this.lockedOn = mob[i]
                                        if (0.3 > Math.random()) break //doesn't always target the closest mob
                                    }
                                }
                            }
                        }
                        if (tech.isSporeFollow && this.lockedOn === null) { //move towards player //checking for null means that the spores don't go after the player until it has looked and not found a target
                            const dx = this.position.x - m.pos.x;
                            const dy = this.position.y - m.pos.y;
                            if (dx * dx + dy * dy > 10000) {
                                this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, Vector.add(this.playerOffPosition, this.position))), this.mass * this.thrust)
                            }
                        } else {
                            const unit = Vector.normalise(this.velocity)
                            const force = Vector.mult(Vector.rotate(unit, 0.005 * this.playerOffPosition.x), 0.000003)
                            this.force.x += force.x
                            this.force.y += force.y
                        }
                    }
                },
            });
            const SPEED = 2 + 1 * Math.random();
            const ANGLE = 2 * Math.PI * Math.random()
            Matter.Body.setVelocity(bullet[bIndex], {
                x: SPEED * Math.cos(ANGLE),
                y: SPEED * Math.sin(ANGLE)
            });
            Composite.add(engine.world, bullet[bIndex]); //add bullet to world
            if (tech.isMutualism && m.health > 0.04) {
                m.health -= 0.02
                m.displayHealth();
                bullet[bIndex].isMutualismActive = true
            }
        }
    },
    spore(where, velocity = null) { //used with the tech upgrade in mob.death()
        const bIndex = bullet.length;
        const size = 4
        if (bIndex < 500) { //can't make over 500 spores
            bullet[bIndex] = Bodies.polygon(where.x, where.y, size, size, {
                // density: 0.0015,			//frictionAir: 0.01,
                inertia: Infinity,
                isFreeze: tech.isSporeFreeze,
                restitution: 0.5,
                angle: Math.random() * 2 * Math.PI,
                friction: 0,
                frictionAir: 0.025,
                thrust: (tech.isSporeFollow ? 0.0011 : 0.0005) * (1 + 0.3 * (Math.random() - 0.5)),
                dmg: (tech.isMutualism ? 20 : 7), //bonus damage from tech.isMutualism
                lookFrequency: 100 + Math.floor(117 * Math.random()),
                classType: "bullet",
                isSpore: true,
                collisionFilter: {
                    category: cat.bullet,
                    mask: cat.map | cat.mob | cat.mobBullet | cat.mobShield //no collide with body
                },
                endCycle: simulation.cycle + Math.floor((540 + Math.floor(Math.random() * 420)) * tech.bulletsLastLonger),
                minDmgSpeed: 0,
                playerOffPosition: { //used when moving towards player to keep spores separate
                    x: 100 * (Math.random() - 0.5),
                    y: 100 * (Math.random() - 0.5)
                },
                beforeDmg(who) {
                    if (!who.isInvulnerable) {
                        this.endCycle = 0; //bullet ends cycle after doing damage 
                        if (this.isFreeze) mobs.statusSlow(who, 90)
                    }
                },
                onEnd() {
                    if (tech.isMutualism && this.isMutualismActive && !tech.isEnergyHealth) {
                        m.health += 0.01
                        if (m.health > m.maxHealth) m.health = m.maxHealth;
                        m.displayHealth();
                    }
                    // console.log(this.dmg)
                },
                do() {
                    if (this.lockedOn && this.lockedOn.alive) {
                        this.force = Vector.mult(Vector.normalise(Vector.sub(this.lockedOn.position, this.position)), this.mass * this.thrust)
                    } else {
                        if (!(simulation.cycle % this.lookFrequency)) { //find mob targets
                            this.closestTarget = null;
                            this.lockedOn = null;
                            let closeDist = Infinity;
                            for (let i = 0, len = mob.length; i < len; ++i) {
                                if (!mob[i].isBadTarget && Matter.Query.ray(map, this.position, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                                    const targetVector = Vector.sub(this.position, mob[i].position)
                                    const dist = Vector.magnitude(targetVector) * (Math.random() + 0.5);
                                    if (dist < closeDist) {
                                        this.closestTarget = mob[i].position;
                                        closeDist = dist;
                                        this.lockedOn = mob[i]
                                        if (0.3 > Math.random()) break //doesn't always target the closest mob
                                    }
                                }
                            }
                        }
                        if (tech.isSporeFollow && this.lockedOn === null) { //move towards player
                            //checking for null means that the spores don't go after the player until it has looked and not found a target
                            const dx = this.position.x - m.pos.x;
                            const dy = this.position.y - m.pos.y;
                            if (dx * dx + dy * dy > 10000) {
                                this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, Vector.add(this.playerOffPosition, this.position))), this.mass * this.thrust)
                            }
                        } else {
                            this.force.y += this.mass * 0.0001; //gravity
                        }

                    }
                },
            });
            if (velocity) {
                Matter.Body.setVelocity(bullet[bIndex], velocity);
            } else {
                const SPEED = 4 + 8 * Math.random();
                const ANGLE = 2 * Math.PI * Math.random()
                Matter.Body.setVelocity(bullet[bIndex], {
                    x: SPEED * Math.cos(ANGLE),
                    y: SPEED * Math.sin(ANGLE)
                });
            }

            Composite.add(engine.world, bullet[bIndex]); //add bullet to world

            if (tech.isMutualism && m.health > 0.01) {
                m.health -= 0.01
                m.displayHealth();
                bullet[bIndex].isMutualismActive = true
            }
        }
    },
    iceIX(speed = 0, dir = m.angle + Math.PI * 2 * Math.random(), where = {
        x: m.pos.x + 30 * Math.cos(m.angle),
        y: m.pos.y + 30 * Math.sin(m.angle)
    }) {
        const me = bullet.length;
        const THRUST = 0.0018
        const RADIUS = 18
        const SCALE = 1 - 0.11 / tech.bulletsLastLonger
        bullet[me] = Bodies.polygon(where.x, where.y, 3, RADIUS, {
            angle: dir - Math.PI,
            // inertia: Infinity,
            spin: 0.00004 * (0.1 + Math.random()) * (Math.round(Math.random()) ? 1 : -1),
            friction: 0,
            frictionAir: 0.02,
            restitution: 0.9,
            dmg: 1.3, //damage done in addition to the damage from momentum
            lookFrequency: 14 + Math.floor(8 * Math.random()),
            endCycle: simulation.cycle + 65 * tech.bulletsLastLonger + Math.floor(25 * Math.random()),
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //self collide
            },
            minDmgSpeed: 0,
            lockedOn: null,
            beforeDmg(who) {
                if (!who.isInvulnerable) {
                    if (tech.iceEnergy && !who.shield && !who.isShielded && who.isDropPowerUp && who.alive && m.immuneCycle < m.cycle) {
                        setTimeout(() => {
                            if (!who.alive) m.energy += tech.iceEnergy * 0.8 * level.isReducedRegen
                        }, 10);
                    }
                    mobs.statusSlow(who, tech.iceIXFreezeTime)
                    this.endCycle = simulation.cycle
                }
                // if (tech.isHeavyWater) mobs.statusDoT(who, 0.15, 300)
            },
            onEnd() { },
            do() {
                // this.force.y += this.mass * 0.0002;
                //find mob targets
                if (!(simulation.cycle % this.lookFrequency)) {
                    Matter.Body.scale(this, SCALE, SCALE);
                    this.lockedOn = null;
                    let closeDist = Infinity;
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (
                            !mob[i].isBadTarget &&
                            Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                            Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                            !mob[i].isInvulnerable
                        ) {
                            const TARGET_VECTOR = Vector.sub(this.position, mob[i].position)
                            const DIST = Vector.magnitude(TARGET_VECTOR);
                            if (DIST < closeDist) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                }
                if (this.lockedOn) { //accelerate towards mobs
                    this.force = Vector.mult(Vector.normalise(Vector.sub(this.lockedOn.position, this.position)), this.mass * THRUST)
                } else {
                    this.force = Vector.mult(Vector.normalise(this.velocity), this.mass * THRUST)
                }
                this.torque += this.inertia * this.spin
            }
        })

        Composite.add(engine.world, bullet[me]); //add bullet to world
        // Matter.Body.setAngularVelocity(bullet[me], 2 * (0.5 - Math.random()))  //doesn't work due to high friction
        Matter.Body.setVelocity(bullet[me], {
            x: speed * Math.cos(dir),
            y: speed * Math.sin(dir)
        });
        Matter.Body.setAngularVelocity(bullet[me], 3000 * bullet[me].spin);
    },
    flea(where, velocity, radius = 6 + 3 * Math.random() + 10 * tech.wormSize * Math.random()) {
        const me = bullet.length;
        bullet[me] = Bodies.polygon(where.x, where.y, 5, radius, {
            isFlea: true,
            angle: 0.5 * Math.random(),
            friction: 1,
            frictionStatic: 1,
            frictionAir: 0, //0.01,
            restitution: 0,
            density: 0.0005, //  0.001 is normal density
            lookFrequency: 19 + Math.floor(7 * Math.random()),
            endCycle: simulation.cycle + Math.floor((900 * tech.bulletsLastLonger + 420 * Math.random()) + Math.max(0, 150 - bullet.length)), // 13 - 19s
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
            },
            minDmgSpeed: 0,
            lockedOn: null,
            delay: 50,
            cd: simulation.cycle + 10,
            dmg: 0,
            setDamage() { //dmg is set to zero after doing damage once, and set back to normal after jumping
                this.dmg = radius * (tech.isMutualism ? 3.3 : 1.1) //damage done in addition to the damage from momentum  //spores do 7 dmg, worms do 18
            },
            beforeDmg(who) {
                Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(Vector.sub(this.position, who.position)), 10 + 10 * Math.random())); //push away from target
                this.cd = simulation.cycle + this.delay;
                if (!who.isInvulnerable && this.dmg !== 0) {
                    this.endCycle -= 110
                    if (tech.isSporeFreeze) mobs.statusSlow(who, 90)
                    if (tech.isSpawnBulletsOnDeath && who.alive && who.isDropPowerUp) {
                        setTimeout(() => {
                            if (!who.alive) {
                                for (let i = 0; i < 2; i++) { //spawn 2 more
                                    const speed = 10 + 5 * Math.random()
                                    const angle = 2 * Math.PI * Math.random()
                                    b.flea(this.position, {
                                        x: speed * Math.cos(angle),
                                        y: speed * Math.sin(angle)
                                    })
                                }
                            }
                            this.endCycle = 0;
                        }, 1);
                    }
                    setTimeout(() => {
                        this.dmg = 0
                    })
                }
            },
            onEnd() {
                if (tech.isMutualism && this.isMutualismActive && !tech.isEnergyHealth) {
                    m.health += 0.02
                    if (m.health > m.maxHealth) m.health = m.maxHealth;
                    m.displayHealth();
                }
            },
            gravity: 0.002 + 0.002 * tech.isSporeFollow,
            do() {
                this.force.y += this.gravity * this.mass
                if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) { //if on the ground and not on jump cooldown //
                    this.cd = simulation.cycle + this.delay;
                    this.lockedOn = null; //find a target
                    let closeDist = Infinity;
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (
                            !mob[i].isBadTarget &&
                            !mob[i].isInvulnerable &&
                            mob[i].alive &&
                            this.position.y - mob[i].position.y < 1500 && //this is about how high fleas can jump with  capMaxY = 0.12 + 0.04 * Math.random()
                            this.position.y - mob[i].position.y > -300 && //not too far below the flea (note that fleas should be on the ground most of the time when doing this check)
                            Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                            Matter.Query.ray(body, this.position, mob[i].position).length === 0
                        ) {
                            const TARGET_VECTOR = Vector.sub(this.position, mob[i].position)
                            const DIST = Vector.magnitude(TARGET_VECTOR);
                            if (DIST < closeDist) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                    if (tech.isSporeFollow && !this.lockedOn && Matter.Query.ray(map, this.position, m.pos).length === 0) {
                        this.lockedOn = { //make target player if there are no mobs to target
                            position: m.pos,
                            velocity: { x: 0, y: 0 }
                        }
                    }
                    if (this.lockedOn) { //hop towards mob target
                        const where = Vector.add(this.lockedOn.position, Vector.mult(this.lockedOn.velocity, 5)) //estimate where the mob will be in 5 cycles
                        const Dy = Math.max(0, this.position.y - where.y) //can't be negative because you can't hop down
                        const Dx = this.position.x - where.x
                        const Vx = -0.06 * Dx / Math.sqrt(2 * Dy / this.gravity) //calibrated to hit target, don't mess with this
                        const Vy = 0.085 * Math.sqrt(this.gravity * Dy) //calibrated to hit target, don't mess with this
                        const capX = 0.07 + 0.02 * tech.isSporeFollow
                        const capMaxY = 0.12 + 0.04 * Math.random() + 0.05 * tech.isSporeFollow
                        const capMinY = closeDist > 500 ? 0.05 + 0.02 * Math.random() : 0.02 + 0.01 * Math.random() //don't jump super low, unless you are very close to mob target
                        this.force.x = Math.max(-capX, Math.min(capX, Vx)) * this.mass;
                        this.force.y = -Math.max(capMinY, Math.min(capMaxY, Vy)) * this.mass
                    } else { //random hops  
                        if (Math.random() < 0.5) { //chance to continue in the same horizontal direction
                            this.force.x = (0.01 + 0.03 * Math.random()) * this.mass * (this.velocity.x > 0 ? 1 : -1); //random move 
                        } else {
                            this.force.x = (0.01 + 0.03 * Math.random()) * this.mass * (Math.random() < 0.5 ? 1 : -1); //random move 
                        }
                        this.force.y = -(0.03 + 0.08 * Math.random()) * this.mass
                    }
                    Matter.Body.setVelocity(this, { x: 0, y: 0 });
                    this.setDamage() //after jumping damage is no longer zero
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
        Matter.Body.setVelocity(bullet[me], velocity);
        if (tech.isMutualism && m.health > 0.01) {
            m.health -= 0.01
            m.displayHealth();
            bullet[bullet.length - 1].isMutualismActive = true
        }
    },
    delayDrones(where, droneCount = 1, deliveryCount = 0) {
        let respawnDrones = () => {
            if (droneCount > 0) {
                requestAnimationFrame(respawnDrones);
                if (!simulation.paused && !simulation.isChoosing && m.alive) {
                    droneCount--
                    if (tech.isDroneRadioactive) {
                        b.droneRadioactive({ x: where.x + 50 * (Math.random() - 0.5), y: where.y + 50 * (Math.random() - 0.5) }, 0)
                    } else {
                        b.drone({ x: where.x + 50 * (Math.random() - 0.5), y: where.y + 50 * (Math.random() - 0.5) }, 0)
                        if (tech.isDroneGrab && deliveryCount > 0) { //
                            const who = bullet[bullet.length - 1]
                            who.isImproved = true;
                            const SCALE = 2.25
                            Matter.Body.scale(who, SCALE, SCALE);
                            who.lookFrequency = 30 + Math.floor(11 * Math.random());
                            who.endCycle += 3000 * tech.droneCycleReduction * tech.bulletsLastLonger
                            deliveryCount--
                        }
                    }
                }
            }
        }
        requestAnimationFrame(respawnDrones);
    },
    drone(where = { x: m.pos.x + 30 * Math.cos(m.angle) + 20 * (Math.random() - 0.5), y: m.pos.y + 30 * Math.sin(m.angle) + 20 * (Math.random() - 0.5) }, speed = 1) {
        const me = bullet.length;
        const THRUST = 0.0015
        const dir = m.angle + 0.2 * (Math.random() - 0.5);
        const RADIUS = (4.5 + 3 * Math.random())
        bullet[me] = Bodies.polygon(where.x, where.y, 8, RADIUS, {
            angle: dir,
            inertia: Infinity,
            friction: 0.05,
            frictionAir: 0,
            restitution: 1,
            density: 0.0005, //  0.001 is normal density
            dmg: 0.34 + 0.12 * tech.isDroneTeleport + 0.15 * tech.isDroneFastLook, //damage done in addition to the damage from momentum
            lookFrequency: (tech.isDroneFastLook ? 20 : 70) + Math.floor(17 * Math.random()),
            endCycle: simulation.cycle + Math.floor((950 + 400 * Math.random()) * tech.bulletsLastLonger * tech.droneCycleReduction) + 5 * RADIUS + Math.max(0, 150 - bullet.length),
            classType: "bullet",
            isDrone: true,
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield //self collide
            },
            minDmgSpeed: 0,
            lockedOn: null,
            deathCycles: 110 + RADIUS * 5,
            isImproved: false,
            beforeDmg(who) {
                if (who.isInvulnerable) {
                    //move away from target after hitting
                    const unit = Vector.mult(Vector.normalise(Vector.sub(this.position, who.position)), -20)
                    Matter.Body.setVelocity(this, { x: unit.x, y: unit.y });
                    this.lockedOn = null
                } else {
                    // if (tech.isIncendiary && simulation.cycle + this.deathCycles < this.endCycle && !tech.isForeverDrones) {
                    //     const max = Math.max(Math.min(this.endCycle - simulation.cycle - this.deathCycles, 1500), 0)
                    //     b.explosion(this.position, max * 0.14 + this.isImproved * 110 + 60 * Math.random()); //makes bullet do explosive damage at end
                    //     if (tech.isForeverDrones) {
                    //         this.endCycle = 0
                    //         b.drone({ x: m.pos.x + 30 * (Math.random() - 0.5), y: m.pos.y + 30 * (Math.random() - 0.5) }, 5)
                    //         bullet[bullet.length - 1].endCycle = Infinity
                    //     } else {
                    //         this.endCycle -= max
                    //     }
                    // } else {
                    //move away from target after hitting
                    const unit = Vector.mult(Vector.normalise(Vector.sub(this.position, who.position)), -20)
                    Matter.Body.setVelocity(this, { x: unit.x, y: unit.y });
                    this.lockedOn = null
                    if (this.endCycle > simulation.cycle + this.deathCycles) {
                        this.endCycle -= 60
                        if (simulation.cycle + this.deathCycles > this.endCycle) this.endCycle = simulation.cycle + this.deathCycles
                    }
                    // }
                }
            },
            onEnd() {
                if (tech.isDroneRespawn) {
                    //are there any nearby bodies nearby that aren't blocked by map?
                    const canSee = body.filter(a => Matter.Query.ray(map, this.position, a.position).length === 0 && !a.isNotHoldable && Vector.magnitude(Vector.sub(this.position, a.position)) < 70 + 30 * a.mass)
                    if (canSee.length) {
                        //find the closest body to the drone from the canSee array
                        const found = canSee.reduce((a, b) => {
                            const distA = Vector.magnitude(Vector.sub(this.position, a.position))
                            const distB = Vector.magnitude(Vector.sub(this.position, b.position))
                            return distA < distB ? a : b
                        })
                        if (found && m.energy > 0.041) {
                            m.energy -= 0.04
                            //remove the body and spawn a new drone
                            Composite.remove(engine.world, found)
                            body.splice(body.indexOf(found), 1)
                            b.delayDrones(found.position, Math.sqrt(found.mass))
                            //draw a line from the drone to the body on the canvas
                            ctx.beginPath();
                            ctx.moveTo(this.position.x, this.position.y);
                            ctx.lineTo(found.position.x, found.position.y);
                            ctx.strokeStyle = "#000";
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            //animate the block fading away
                            simulation.ephemera.push({
                                name: "droneRespawn",
                                count: 60, //cycles before it self removes
                                do() {
                                    this.count--
                                    if (this.count < 0) simulation.removeEphemera(this.name)
                                    ctx.beginPath();
                                    let vertices = found.vertices;
                                    ctx.moveTo(vertices[0].x, vertices[0].y);
                                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                                    ctx.lineTo(vertices[0].x, vertices[0].y);
                                    ctx.lineWidth = 2;
                                    ctx.strokeStyle = `rgba(0,0,0,${this.count / 60})`
                                    ctx.stroke();
                                },
                            })
                        }
                    }
                }
            },
            doRespawning() { //fall shrink and die
                const scale = 0.995;
                Matter.Body.scale(this, scale, scale);
                if (this.bodyTarget) {
                    this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.bodyTarget.position)), -this.mass * THRUST)
                } else {
                    this.force.y += this.mass * 0.0012;
                }
            },
            doDieing() { //fall shrink and die
                this.force.y += this.mass * 0.0012;
                const scale = 0.995;
                Matter.Body.scale(this, scale, scale);
            },
            hasExploded: false,
            do() {
                if (simulation.cycle + this.deathCycles > this.endCycle) {
                    if (tech.isIncendiary && !this.hasExploded) {
                        this.hasExploded = true
                        // const max = Math.max(Math.min(this.endCycle - simulation.cycle - this.deathCycles, 1500), 0)
                        // this.endCycle -= max
                        b.explosion(this.position, 200 + this.isImproved * 110 + 60 * Math.random()); //makes bullet do explosive damage at end
                    }
                    this.restitution = 0.2;
                    if (tech.isDroneRespawn) {
                        this.do = this.doRespawning
                        //make a list of all elements of array body that a ray can be drawn to from the drone                        
                        const canSee = body.filter(a => Matter.Query.ray(map, this.position, a.position).length === 0 && !a.isNotHoldable)
                        if (canSee.length) {
                            //find the closest body to the drone from the canSee array
                            const found = canSee.reduce((a, b) => {
                                const distA = Vector.magnitude(Vector.sub(this.position, a.position))
                                const distB = Vector.magnitude(Vector.sub(this.position, b.position))
                                return distA < distB ? a : b
                            })
                            if (found) this.bodyTarget = found
                        }
                    } else {
                        this.do = this.doDieing
                    }
                }

                this.force.y += this.mass * 0.0002;
                if (!(simulation.cycle % this.lookFrequency)) {
                    //find mob targets
                    this.lockedOn = null;
                    let closeDist = Infinity;
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (
                            !mob[i].isBadTarget &&
                            Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                            Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                            !mob[i].isInvulnerable
                        ) {
                            const TARGET_VECTOR = Vector.sub(this.position, mob[i].position)
                            const DIST = Vector.magnitude(TARGET_VECTOR)
                            if (DIST < closeDist) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                    //blink towards mobs
                    if (tech.isDroneTeleport && this.lockedOn) {
                        const sub = Vector.sub(this.lockedOn.position, this.position);
                        const distMag = Vector.magnitude(sub);
                        const unit = Vector.normalise(sub)
                        Matter.Body.setVelocity(this, Vector.mult(unit, Math.max(20, this.speed * 1.5)));
                        ctx.beginPath();
                        ctx.moveTo(this.position.x, this.position.y);
                        Matter.Body.translate(this, Vector.mult(unit, Math.min(350, distMag - this.lockedOn.radius + 10)));
                        ctx.lineTo(this.position.x, this.position.y);
                        ctx.lineWidth = RADIUS * 2;
                        ctx.strokeStyle = "rgba(0,0,0,0.5)";
                        ctx.stroke();
                    }
                    //power ups
                    if (!this.isImproved && !simulation.isChoosing) {
                        if (this.lockedOn) {
                            for (let i = 0, len = powerUp.length; i < len; ++i) { //grab, but don't lock onto nearby power up
                                if (
                                    Vector.magnitudeSquared(Vector.sub(this.position, powerUp[i].position)) < 20000 &&
                                    !(
                                        (m.health > 0.94 * m.maxHealth && !tech.isOverHeal && !tech.isDroneGrab && powerUp[i].name === "heal") ||
                                        (tech.isSuperDeterminism && powerUp[i].name === "field") ||
                                        ((tech.isEnergyNoAmmo || b.inventory.length === 0) && powerUp[i].name === "ammo")
                                    )
                                ) {
                                    //draw pickup for a single cycle
                                    ctx.beginPath();
                                    ctx.moveTo(this.position.x, this.position.y);
                                    ctx.lineTo(powerUp[i].position.x, powerUp[i].position.y);
                                    ctx.strokeStyle = "#000"
                                    ctx.lineWidth = 4
                                    ctx.stroke();
                                    //pick up nearby power ups
                                    powerUps.onPickUp(powerUp[i]);
                                    powerUp[i].effect();
                                    Matter.Composite.remove(engine.world, powerUp[i]);
                                    powerUp.splice(i, 1);
                                    if (tech.isDroneGrab) {
                                        this.isImproved = true;
                                        const SCALE = 2.25
                                        Matter.Body.scale(this, SCALE, SCALE);
                                        this.lookFrequency = 30 + Math.floor(11 * Math.random());
                                        this.endCycle += 3000 * tech.droneCycleReduction * tech.bulletsLastLonger
                                    }
                                    break;
                                }
                            }
                        } else {
                            //look for power ups to lock onto
                            let closeDist = Infinity;
                            for (let i = 0, len = powerUp.length; i < len; ++i) {
                                if (!(
                                    (m.health > 0.94 * m.maxHealth && !tech.isOverHeal && !tech.isDroneGrab && powerUp[i].name === "heal") ||
                                    (tech.isSuperDeterminism && powerUp[i].name === "field") ||
                                    ((tech.isEnergyNoAmmo || b.inventory.length === 0) && powerUp[i].name === "ammo")
                                )) {
                                    if (Vector.magnitudeSquared(Vector.sub(this.position, powerUp[i].position)) < 20000 && !simulation.isChoosing) {
                                        //draw pickup for a single cycle
                                        ctx.beginPath();
                                        ctx.moveTo(this.position.x, this.position.y);
                                        ctx.lineTo(powerUp[i].position.x, powerUp[i].position.y);
                                        ctx.strokeStyle = "#000"
                                        ctx.lineWidth = 4
                                        ctx.stroke();
                                        //pick up nearby power ups
                                        powerUps.onPickUp(powerUp[i]);
                                        powerUp[i].effect();
                                        Matter.Composite.remove(engine.world, powerUp[i]);
                                        powerUp.splice(i, 1);
                                        if (tech.isDroneGrab) {
                                            this.isImproved = true;
                                            const SCALE = 2.25
                                            Matter.Body.scale(this, SCALE, SCALE);
                                            this.lookFrequency = 30 + Math.floor(11 * Math.random());
                                            this.endCycle += 3000 * tech.droneCycleReduction * tech.bulletsLastLonger
                                            // this.frictionAir = 0
                                        }
                                        break;
                                    }
                                    //look for power ups to lock onto
                                    if (
                                        Matter.Query.ray(map, this.position, powerUp[i].position).length === 0 //&& Matter.Query.ray(body, this.position, powerUp[i].position).length === 0
                                    ) {
                                        const TARGET_VECTOR = Vector.sub(this.position, powerUp[i].position)
                                        const DIST = Vector.magnitude(TARGET_VECTOR);
                                        if (DIST < closeDist) {
                                            closeDist = DIST;
                                            this.lockedOn = powerUp[i]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.lockedOn) { //accelerate towards mobs
                    this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
                } else { //accelerate towards mouse
                    this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, simulation.mouseInGame)), -this.mass * THRUST)
                }
                // speed cap instead of friction to give more agility
                if (this.speed > 6) {
                    Matter.Body.setVelocity(this, { x: this.velocity.x * 0.97, y: this.velocity.y * 0.97 });
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
        Matter.Body.setVelocity(bullet[me], { x: speed * Math.cos(dir), y: speed * Math.sin(dir) });
    },
    droneRadioactive(where = {
        x: m.pos.x + 30 * Math.cos(m.angle) + 20 * (Math.random() - 0.5),
        y: m.pos.y + 30 * Math.sin(m.angle) + 20 * (Math.random() - 0.5)
    }, speed = 1) {
        const me = bullet.length;
        const THRUST = (tech.isFastDrones ? 0.003 : 0.0012) + 0.0005 * (Math.random() - 0.5)
        const dir = m.angle + 0.4 * (Math.random() - 0.5);
        const RADIUS = 3
        bullet[me] = Bodies.polygon(where.x, where.y, 8, RADIUS, {
            angle: dir,
            inertia: Infinity,
            friction: 0,
            frictionAir: 0,
            restitution: 0.4 + 0.199 * Math.random(),
            dmg: 0, //0.24   damage done in addition to the damage from momentum   and radiation
            lookFrequency: 120 + Math.floor(23 * Math.random()),
            endCycle: simulation.cycle + Math.floor((900 + 110 * Math.random()) * tech.bulletsLastLonger / tech.droneRadioDamage) + 5 * RADIUS + Math.max(0, 150 - 2 * bullet.length),
            classType: "bullet",
            isDrone: true,
            collisionFilter: {
                category: cat.bullet,
                mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield //self collide
            },
            minDmgSpeed: 0,
            speedCap: 5 + 2 * Math.random(), //6 is normal
            lockedOn: null,
            deathCycles: 110 + RADIUS * 5,
            isImproved: false,
            radioRadius: 0,
            maxRadioRadius: 270 + Math.floor(90 * Math.random()),
            beforeDmg() { },
            onEnd() {
                if (tech.isDroneRespawn) {
                    //are there any nearby bodies nearby that aren't blocked by map?
                    const canSee = body.filter(a => Matter.Query.ray(map, this.position, a.position).length === 0 && !a.isNotHoldable && Vector.magnitude(Vector.sub(this.position, a.position)) < 70 + 30 * a.mass)
                    if (canSee.length) {
                        //find the closest body to the drone from the canSee array
                        const found = canSee.reduce((a, b) => {
                            const distA = Vector.magnitude(Vector.sub(this.position, a.position))
                            const distB = Vector.magnitude(Vector.sub(this.position, b.position))
                            return distA < distB ? a : b
                        })
                        if (found && m.energy > 0.091) {
                            m.energy -= 0.09
                            //remove the body and spawn a new drone
                            Composite.remove(engine.world, found)
                            body.splice(body.indexOf(found), 1)
                            b.delayDrones(found.position, 0.5 * Math.sqrt(found.mass))
                            //draw a line from the drone to the body on the canvas
                            ctx.beginPath();
                            ctx.moveTo(this.position.x, this.position.y);
                            ctx.lineTo(found.position.x, found.position.y);
                            ctx.strokeStyle = "#000";
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            //animate the block fading away
                            simulation.ephemera.push({
                                name: "droneRespawn",
                                count: 60, //cycles before it self removes
                                do() {
                                    this.count--
                                    if (this.count < 0) simulation.removeEphemera(this.name)
                                    ctx.beginPath();
                                    let vertices = found.vertices;
                                    ctx.moveTo(vertices[0].x, vertices[0].y);
                                    for (let j = 1; j < vertices.length; j++) {
                                        ctx.lineTo(vertices[j].x, vertices[j].y);
                                    }
                                    ctx.lineTo(vertices[0].x, vertices[0].y);
                                    ctx.lineWidth = 2;
                                    ctx.strokeStyle = `rgba(0,0,0,${this.count / 60})`
                                    ctx.stroke();
                                },
                            })
                        }
                    }
                }
            },
            do() {
                //radioactive zone
                this.radioRadius = this.radioRadius * 0.993 + 0.007 * this.maxRadioRadius //smooth radius towards max
                //aoe damage to player
                if (Vector.magnitude(Vector.sub(player.position, this.position)) < this.radioRadius) {
                    const DRAIN = tech.isRadioactiveResistance ? 0.001 : 0.004
                    if (m.energy > DRAIN) {
                        if (m.immuneCycle < m.cycle) m.energy -= DRAIN
                    } else {
                        m.energy = 0;
                        if (simulation.dmgScale) m.damage((tech.isRadioactiveResistance ? 0.00004 : 0.0002) * tech.radioactiveDamage) //0.00015
                    }
                }
                //aoe damage to mobs
                let dmg = (0.12 + 0.04 * tech.isFastDrones) * m.dmgScale * tech.droneRadioDamage * tech.radioactiveDamage
                for (let i = 0, len = mob.length; i < len; i++) {
                    if (Vector.magnitude(Vector.sub(mob[i].position, this.position)) < this.radioRadius + mob[i].radius) {
                        if (Matter.Query.ray(map, mob[i].position, this.position).length > 0) dmg *= 0.25 //reduce damage if a wall is in the way
                        mob[i].damage(mob[i].shield ? dmg * 3 : dmg);
                        mob[i].locatePlayer();
                    }
                }
                //draw
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radioRadius, 0, 2 * Math.PI);
                ctx.globalCompositeOperation = "lighter"
                // ctx.fillStyle = `rgba(25,139,170,${0.15+0.05*Math.random()})`;
                // ctx.fillStyle = `rgba(36, 207, 255,${0.1+0.05*Math.random()})`;
                ctx.fillStyle = `rgba(28, 175, 217,${0.13 + 0.07 * Math.random()})`;
                ctx.fill();
                ctx.globalCompositeOperation = "source-over"

                //normal drone actions
                if (simulation.cycle + this.deathCycles > this.endCycle) { //fall shrink and die
                    this.force.y += this.mass * 0.0012;
                    this.restitution = 0.2;
                    const scale = 0.995;
                    Matter.Body.scale(this, scale, scale);
                    this.maxRadioRadius = 0
                    this.radioRadius = this.radioRadius * 0.98 //let radioactivity decrease
                } else {
                    this.force.y += this.mass * 0.0002; //gravity

                    if (!(simulation.cycle % this.lookFrequency)) {
                        //find mob targets
                        this.lockedOn = null;
                        let closeDist = Infinity;
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            if (
                                !mob[i].isBadTarget &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                                !mob[i].isInvulnerable
                            ) {
                                const TARGET_VECTOR = Vector.sub(this.position, mob[i].position)
                                const DIST = Vector.magnitude(TARGET_VECTOR);
                                if (DIST < closeDist) {
                                    closeDist = DIST;
                                    this.lockedOn = mob[i]
                                }
                            }
                        }
                        //power ups
                        if (!this.isImproved && !simulation.isChoosing) {
                            if (this.lockedOn) {
                                //grab, but don't lock onto nearby power up
                                for (let i = 0, len = powerUp.length; i < len; ++i) {
                                    if (
                                        Vector.magnitudeSquared(Vector.sub(this.position, powerUp[i].position)) < 20000 &&
                                        !(
                                            (m.health > 0.93 * m.maxHealth && !tech.isDroneGrab && powerUp[i].name === "heal") ||
                                            (tech.isSuperDeterminism && powerUp[i].name === "field") ||
                                            ((tech.isEnergyNoAmmo || b.inventory.length === 0) && powerUp[i].name === "ammo")
                                        )
                                    ) {
                                        //draw pickup for a single cycle
                                        ctx.beginPath();
                                        ctx.moveTo(this.position.x, this.position.y);
                                        ctx.lineTo(powerUp[i].position.x, powerUp[i].position.y);
                                        ctx.strokeStyle = "#000"
                                        ctx.lineWidth = 4
                                        ctx.stroke();
                                        //pick up nearby power ups
                                        powerUps.onPickUp(powerUp[i]);
                                        powerUp[i].effect();
                                        Matter.Composite.remove(engine.world, powerUp[i]);
                                        powerUp.splice(i, 1);
                                        if (tech.isDroneGrab) {
                                            this.isImproved = true;
                                            const SCALE = 2.25
                                            Matter.Body.scale(this, SCALE, SCALE);
                                            this.lookFrequency = 30 + Math.floor(11 * Math.random());
                                            this.endCycle += 1000 * tech.bulletsLastLonger
                                            this.maxRadioRadius *= 1.25
                                        }
                                        break;
                                    }
                                }
                            } else {
                                //look for power ups to lock onto
                                let closeDist = Infinity;
                                for (let i = 0, len = powerUp.length; i < len; ++i) {
                                    if (!(
                                        (m.health > 0.93 * m.maxHealth && !tech.isDroneGrab && powerUp[i].name === "heal") ||
                                        (tech.isSuperDeterminism && powerUp[i].name === "field") ||
                                        ((tech.isEnergyNoAmmo || b.inventory.length === 0) && powerUp[i].name === "ammo")
                                    )) {
                                        if (Vector.magnitudeSquared(Vector.sub(this.position, powerUp[i].position)) < 20000 && !simulation.isChoosing) {
                                            //draw pickup for a single cycle
                                            ctx.beginPath();
                                            ctx.moveTo(this.position.x, this.position.y);
                                            ctx.lineTo(powerUp[i].position.x, powerUp[i].position.y);
                                            ctx.strokeStyle = "#000"
                                            ctx.lineWidth = 4
                                            ctx.stroke();
                                            //pick up nearby power ups
                                            powerUps.onPickUp(powerUp[i]);
                                            powerUp[i].effect();
                                            Matter.Composite.remove(engine.world, powerUp[i]);
                                            powerUp.splice(i, 1);
                                            if (tech.isDroneGrab) {
                                                this.isImproved = true;
                                                const SCALE = 2.25
                                                Matter.Body.scale(this, SCALE, SCALE);
                                                this.lookFrequency = 30 + Math.floor(11 * Math.random());
                                                this.endCycle += 1000 * tech.bulletsLastLonger
                                                this.maxRadioRadius *= 1.25
                                            }
                                            break;
                                        }
                                        //look for power ups to lock onto
                                        if (
                                            Matter.Query.ray(map, this.position, powerUp[i].position).length === 0 &&
                                            Matter.Query.ray(body, this.position, powerUp[i].position).length === 0
                                        ) {
                                            const TARGET_VECTOR = Vector.sub(this.position, powerUp[i].position)
                                            const DIST = Vector.magnitude(TARGET_VECTOR);
                                            if (DIST < closeDist) {
                                                closeDist = DIST;
                                                this.lockedOn = powerUp[i]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.lockedOn) { //accelerate towards mobs
                        this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
                    } else { //accelerate towards mouse
                        this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, simulation.mouseInGame)), -this.mass * THRUST)
                    }
                    // speed cap instead of friction to give more agility
                    if (this.speed > this.speedCap) {
                        Matter.Body.setVelocity(this, {
                            x: this.velocity.x * 0.97,
                            y: this.velocity.y * 0.97
                        });
                    }
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
        Matter.Body.setVelocity(bullet[me], {
            x: speed * Math.cos(dir),
            y: speed * Math.sin(dir)
        });
    },
    superBall(where, velocity, radius) {
        let gravity = 0.001
        if (tech.superBallDelay) {
            velocity = Vector.mult(velocity, 1.4)
            gravity *= 6
        }
        let dir = m.angle
        const me = bullet.length;
        bullet[me] = Bodies.polygon(where.x, where.y, 12, radius, b.fireAttributes(dir, false));
        Composite.add(engine.world, bullet[me]); //add bullet to world
        Matter.Body.setVelocity(bullet[me], velocity);
        Matter.Body.setDensity(bullet[me], 0.0007 + 0.0007 * tech.isSuperHarm + 0.0007 * tech.isBulletTeleport);
        bullet[me].endCycle = simulation.cycle + Math.floor(270 + 90 * Math.random());
        bullet[me].minDmgSpeed = 0;
        bullet[me].restitution = 1;
        bullet[me].frictionAir = 0;
        bullet[me].friction = 0;
        bullet[me].frictionStatic = 0;
        if (tech.isSuperHarm) {
            bullet[me].collidePlayerDo = function () {
                this.force.y += this.mass * gravity;;
                if (Matter.Query.collides(this, [player]).length) {
                    this.endCycle = 0
                    // m.energy -= 0.04
                    // if (m.energy < 0) m.energy = 0
                    // simulation.drawList.push({ //add dmg to draw queue
                    //     x: this.position.x,
                    //     y: this.position.y,
                    //     radius: radius,
                    //     color: "#0ad",
                    //     time: 15
                    // });
                }
            }
            bullet[me].cycle = 0
            bullet[me].do = function () {
                this.cycle++
                if (this.cycle > 2) this.do = this.collidePlayerDo
                this.force.y += this.mass * 0.001;
            };
        } else if (tech.isBulletTeleport) {
            bullet[me].portFrequency = 25 + Math.floor(10 * Math.random())
            bullet[me].nextPortCycle = simulation.cycle + bullet[me].portFrequency
            bullet[me].do = function () {
                this.force.y += this.mass * gravity;
                if (this.nextPortCycle < simulation.cycle) { //teleport around if you have tech.isBulletTeleport
                    this.nextPortCycle = simulation.cycle + this.portFrequency
                    const range = 33 * Math.sqrt(radius) * Math.random()
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.rotate({ x: range, y: 0 }, 2 * Math.PI * Math.random())))
                    Matter.Body.setVelocity(this, Vector.rotate(this.velocity, 2 * (Math.random() * Math.random() - 0.25)))
                }
            };
        } else {
            bullet[me].do = function () {
                this.force.y += this.mass * gravity;
            };
        }
        bullet[me].beforeDmg = function (who) {
            if (!who.isInvulnerable) {
                if (tech.oneSuperBall) mobs.statusStun(who, 120) // (2.3) * 2 / 14 ticks (2x damage over 7 seconds)
                if (tech.isFoamBall) {
                    for (let i = 0, len = 6 * this.mass; i < len; i++) {
                        const radius = 6 + 9 * Math.random()
                        const velocity = { x: Math.max(0.5, 2 - radius * 0.1), y: 0 }
                        b.foam(this.position, Vector.rotate(velocity, 6.28 * Math.random()), radius)
                    }
                    this.endCycle = 0
                }
                if (tech.isIncendiary) {
                    b.explosion(this.position, this.mass * 280); //makes bullet do explosive damage at end
                    this.endCycle = 0
                } else if (tech.isSuperBounce) {
                    const cycle = () => {
                        Matter.Body.setDensity(this, (0.0007 + 0.0007 * tech.isSuperHarm + 0.0007 * tech.isBulletTeleport) * 1.33);//33% more density and damage
                        this.endCycle = simulation.cycle + Math.floor(300 + 90 * Math.random()); //reset to full duration of time
                        Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(this.velocity), 60)); //reset to high velocity
                        let count = 5
                        const wait = () => {
                            count--
                            if (count > 0) requestAnimationFrame(wait);
                            simulation.drawList.push({ //add dmg to draw queue
                                x: this.position.x,
                                y: this.position.y,
                                radius: radius,
                                color: 'rgba(255, 0, 0, 0.33)',
                                time: 8
                            });
                        }
                        requestAnimationFrame(wait);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: this.position.x,
                            y: this.position.y,
                            radius: radius,
                            color: 'rgba(255, 0, 0, 0.33)',
                            time: 8
                        });
                    }
                    requestAnimationFrame(cycle);
                }
            }
        };
    },
    targetedBall(position, num = 1, speed = 42 + 12 * Math.random(), range = 1200, isRandomAim = true) {
        let shotsFired = 0
        const targets = [] //target nearby mobs
        for (let i = 0, len = mob.length; i < len; i++) {
            const dist = Vector.magnitude(Vector.sub(position, mob[i].position));
            if (
                dist < range + mob[i].radius &&
                !mob[i].isBadTarget &&
                Matter.Query.ray(map, position, mob[i].position).length === 0 &&
                Matter.Query.ray(body, position, mob[i].position).length === 0 &&
                !mob[i].isInvulnerable
            ) {
                targets.push(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, dist / 60))) //predict where the mob will be in a few cycles
            }
        }
        const radius = (11 + 9 * tech.oneSuperBall) * tech.bulletSize
        for (let i = 0; i < num; i++) {
            if (targets.length > 0) { // aim near a random target in array
                const index = Math.floor(Math.random() * targets.length)
                const SPREAD = 160 / targets.length
                const WHERE = {
                    x: targets[index].x + SPREAD * (Math.random() - 0.5),
                    y: targets[index].y + SPREAD * (Math.random() - 0.5)
                }
                b.superBall(position, Vector.mult(Vector.normalise(Vector.sub(WHERE, position)), speed), radius)
                shotsFired++
            } else if (isRandomAim) { // aim in random direction
                const ANGLE = 2 * Math.PI * Math.random()
                b.superBall(position, { x: speed * Math.cos(ANGLE), y: speed * Math.sin(ANGLE) }, radius)
            }
        }
        return shotsFired
    },
    targetedFoam(position, num = 1, speed = 21 + 7 * Math.random(), range = 1200, isRandomAim = true) {
        let shotsFired = 0
        const targets = [] //target nearby mobs
        for (let i = 0, len = mob.length; i < len; i++) {
            const dist = Vector.magnitude(Vector.sub(position, mob[i].position));
            if (
                dist < range + mob[i].radius &&
                !mob[i].isBadTarget && //|| mob[i].isMobBullet
                Matter.Query.ray(map, position, mob[i].position).length === 0 &&
                !mob[i].isInvulnerable
            ) {
                targets.push(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, dist / 60))) //predict where the mob will be in a few cycles
            }
        }
        for (let i = 0; i < num; i++) {
            if (targets.length > 0) { // aim near a random target in array
                const SPREAD = 160 / targets.length
                const index = Math.floor(Math.random() * targets.length)
                const radius = 11 + 12 * Math.random()
                const where = {
                    x: targets[index].x + SPREAD * (Math.random() - 0.5),
                    y: targets[index].y + SPREAD * (Math.random() - 0.5)
                }
                b.foam(position, Vector.mult(Vector.normalise(Vector.sub(where, position)), speed - radius * 0.25), radius)
                shotsFired++
            } else if (isRandomAim) { // aim in random direction
                const ANGLE = 2 * Math.PI * Math.random()
                b.foam(position, { x: speed * Math.cos(ANGLE), y: speed * Math.sin(ANGLE) }, 8 + 11 * Math.random())
            }
        }
        return shotsFired
    },
    foam(position, velocity, radius) {
        if (tech.isFoamCavitation && Math.random() < 0.25) {
            velocity = Vector.mult(velocity, 1.35)
            radius = 1.2 * radius + 13
        }
        // radius *= Math.sqrt(tech.bulletSize)
        const me = bullet.length;
        bullet[me] = Bodies.polygon(position.x, position.y, 20, radius, {
            density: 0.000001, //  0.001 is normal density
            inertia: Infinity,
            frictionAir: 0.003,
            dmg: 0, //damage on impact
            damage: tech.foamDamage * (tech.isFastFoam ? 2.8 : 1) * (tech.isBulletTeleport ? 1.53 : 1), //damage done over time
            scale: 1 - 0.006 / tech.bulletsLastLonger * (tech.isFastFoam ? 1.65 : 1),
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: cat.mob | cat.mobBullet // cat.map | cat.body | cat.mob | cat.mobShield
            },
            minDmgSpeed: 0,
            endCycle: Infinity,
            count: 0,
            radius: radius,
            target: null,
            targetVertex: null,
            targetRelativePosition: null,
            portFrequency: 7 + Math.floor(5 * Math.random()),
            nextPortCycle: Infinity, //disabled unless you have the teleport tech
            beforeDmg(who) {
                if (!this.target && who.alive) {
                    this.target = who;
                    if (who.radius < 20) {
                        this.targetRelativePosition = {
                            x: 0,
                            y: 0
                        } //find relative position vector for zero mob rotation
                    } else if (Matter.Query.collides(this, [who]).length > 0) {
                        const normal = Matter.Query.collides(this, [who])[0].normal
                        this.targetRelativePosition = Vector.rotate(Vector.sub(Vector.sub(this.position, who.position), Vector.mult(normal, -this.radius)), -who.angle) //find relative position vector for zero mob rotation
                    } else {
                        this.targetRelativePosition = Vector.rotate(Vector.sub(this.position, who.position), -who.angle) //find relative position vector for zero mob rotation
                    }
                    this.collisionFilter.category = cat.body;
                    this.collisionFilter.mask = null;

                    let bestVertexDistance = Infinity
                    let bestVertex = null
                    for (let i = 0; i < this.target.vertices.length; i++) {
                        const dist = Vector.magnitude(Vector.sub(this.position, this.target.vertices[i]));
                        if (dist < bestVertexDistance) {
                            bestVertex = i
                            bestVertexDistance = dist
                        }
                    }
                    this.targetVertex = bestVertex
                    Matter.Body.setVelocity(this, { x: 0, y: 0 });
                }
            },
            onEnd() { },
            do() {
                if (this.count < 20) {
                    this.count++
                    //grow
                    const SCALE = 1.06
                    Matter.Body.scale(this, SCALE, SCALE);
                    this.radius *= SCALE;
                } else {
                    //shrink
                    Matter.Body.scale(this, this.scale, this.scale);
                    this.radius *= this.scale;
                    if (this.radius < 8) this.endCycle = 0;
                }
                if (this.target && this.target.alive) { //if stuck to a target
                    const rotate = Vector.rotate(this.targetRelativePosition, this.target.angle) //add in the mob's new angle to the relative position vector
                    if (this.target.isVerticesChange) {
                        Matter.Body.setPosition(this, this.target.vertices[this.targetVertex])
                    } else {
                        Matter.Body.setPosition(this, Vector.add(Vector.add(rotate, this.target.velocity), this.target.position))
                    }
                    if (this.target.isBoss) {
                        if (this.target.speed > 6.5) Matter.Body.setVelocity(this.target, Vector.mult(this.target.velocity, 0.975))
                    } else {
                        if (this.target.speed > 2.5) Matter.Body.setVelocity(this.target, Vector.mult(this.target.velocity, 0.94))
                    }

                    Matter.Body.setAngularVelocity(this.target, this.target.angularVelocity * 0.9);
                    // Matter.Body.setAngularVelocity(this.target, this.target.angularVelocity * 0.9)
                    if (this.target.isShielded) {
                        this.target.damage(m.dmgScale * this.damage, true); //shield damage bypass
                        const SCALE = 1 - 0.004 / tech.bulletsLastLonger //shrink if mob is shielded
                        Matter.Body.scale(this, SCALE, SCALE);
                        this.radius *= SCALE;
                    } else {
                        this.target.damage(m.dmgScale * this.damage);
                    }
                } else if (this.target !== null) { //look for a new target
                    this.collisionFilter.category = cat.bullet;
                    this.collisionFilter.mask = cat.mob //| cat.mobShield //cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
                    Matter.Body.setVelocity(this, { x: this.target.velocity.x, y: this.target.velocity.y });
                    if (tech.isSpawnBulletsOnDeath && bullet.length < 180 && !this.target.isMobBullet) {
                        let targets = []
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
                            if (dist < 1000000) targets.push(mob[i])
                        }
                        const radius = Math.min(this.radius * 0.5, 9)
                        const len = bullet.length < 80 ? 2 : 1
                        for (let i = 0; i < len; i++) {
                            if (targets.length - i > 0) {
                                const index = Math.floor(Math.random() * targets.length)
                                const speed = 6 + 6 * Math.random()
                                const velocity = Vector.mult(Vector.normalise(Vector.sub(targets[index].position, this.position)), speed)
                                b.foam(this.position, Vector.rotate(velocity, 0.5 * (Math.random() - 0.5)), radius)
                            } else {
                                b.foam(this.position, Vector.rotate({
                                    x: 15 + 10 * Math.random(),
                                    y: 0
                                }, 2 * Math.PI * Math.random()), radius)
                            }
                        }
                    }
                    this.target = null
                } else if (Matter.Query.point(map, this.position).length > 0) { //slow when touching map
                    const slow = 0.87
                    Matter.Body.setVelocity(this, { x: this.velocity.x * slow, y: this.velocity.y * slow });
                    const SCALE = 0.97
                    Matter.Body.scale(this, SCALE, SCALE);
                    this.radius *= SCALE;
                    // } else if (Matter.Query.collides(this, body).length > 0) {
                } else if (Matter.Query.point(body, this.position).length > 0) { //slow when touching blocks
                    const slow = 0.94
                    Matter.Body.setVelocity(this, { x: this.velocity.x * slow, y: this.velocity.y * slow });
                    const SCALE = 0.99
                    Matter.Body.scale(this, SCALE, SCALE);
                    this.radius *= SCALE;
                } else {
                    this.force.y += this.mass * tech.foamGravity; //gravity
                    if (tech.isFoamAttract) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const range = Vector.magnitude(Vector.sub(mob[i].position, this.position))
                            if (
                                !mob[i].isBadTarget &&
                                mob[i].alive &&
                                !mob[i].isInvulnerable &&
                                range < 500 &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0
                            ) {
                                const mag = 0.001 * Math.min(1, 200 / range)
                                this.force = Vector.mult(Vector.normalise(Vector.sub(mob[i].position, this.position)), this.mass * mag)
                                const slow = 0.98
                                Matter.Body.setVelocity(this, { x: this.velocity.x * slow, y: this.velocity.y * slow });
                                break
                            }
                        }
                    }
                }
                if (this.nextPortCycle < simulation.cycle) { //teleport around if you have tech.isBulletTeleport
                    this.nextPortCycle = simulation.cycle + this.portFrequency
                    const range = 13 * Math.sqrt(this.radius) * Math.random()
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.rotate({
                        x: range,
                        y: 0
                    }, 2 * Math.PI * Math.random())))
                }
            }
        });
        if (tech.isBulletTeleport) bullet[me].nextPortCycle = simulation.cycle + bullet[me].portFrequency
        Composite.add(engine.world, bullet[me]); //add bullet to world
        Matter.Body.setVelocity(bullet[me], velocity);
    },
    targetedBlock(who, speed = 50 - Math.min(20, who.mass * 2), range = 1600) {
        let closestMob, dist
        for (let i = 0, len = mob.length; i < len; i++) {
            if (who !== mob[i] && !mob[i].isBadTarget && !mob[i].isInvulnerable) {
                dist = Vector.magnitude(Vector.sub(who.position, mob[i].position));
                if (dist < range && Matter.Query.ray(map, who.position, mob[i].position).length === 0) { //&& Matter.Query.ray(body, position, mob[i].position).length === 0
                    closestMob = mob[i]
                    range = dist
                }
            }
        }
        if (closestMob) {
            const where = Vector.add(closestMob.position, Vector.mult(closestMob.velocity, dist / 60))
            const velocity = Vector.mult(Vector.normalise(Vector.sub(where, who.position)), speed)
            velocity.y -= Math.abs(who.position.x - closestMob.position.x) / 150; //gives an arc, but not a good one
            Matter.Body.setVelocity(who, velocity);
        }
    },
    targetedNail(position, num = 1, speed = 40 + 10 * Math.random(), range = 1200, damage = 1.4) {
        let shotsFired = 0
        const targets = [] //target nearby mobs
        for (let i = 0, len = mob.length; i < len; i++) {
            const dist = Vector.magnitude(Vector.sub(position, mob[i].position));
            if (
                dist < range + mob[i].radius &&
                !mob[i].isBadTarget && //|| mob[i].isMobBullet
                Matter.Query.ray(map, position, mob[i].position).length === 0 &&
                Matter.Query.ray(body, position, mob[i].position).length === 0 &&
                !mob[i].isInvulnerable
            ) {
                targets.push(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, dist / 60))) //predict where the mob will be in a few cycles
            }
        }
        for (let i = 0; i < num; i++) {
            if (targets.length > 0) { // aim near a random target in array
                const index = Math.floor(Math.random() * targets.length)
                const SPREAD = 150 / targets.length
                const WHERE = {
                    x: targets[index].x + SPREAD * (Math.random() - 0.5),
                    y: targets[index].y + SPREAD * (Math.random() - 0.5)
                }
                b.nail(position, Vector.mult(Vector.normalise(Vector.sub(WHERE, position)), speed), damage)
                shotsFired++
            } else { // aim in random direction
                const ANGLE = 2 * Math.PI * Math.random()
                b.nail(position, {
                    x: speed * Math.cos(ANGLE),
                    y: speed * Math.sin(ANGLE)
                }, damage)
                shotsFired++
            }
        }
        return shotsFired
    },
    crit(mob, bullet) {
        if (!mob.shield && Vector.dot(Vector.normalise(Vector.sub(mob.position, bullet.position)), Vector.normalise(bullet.velocity)) > 0.999 - 1 / mob.radius) {
            if (mob.isFinalBoss && !(Vector.dot(Vector.normalise(Vector.sub(mob.position, bullet.position)), Vector.normalise(bullet.velocity)) > 0.999999)) return
            let cycle = () => { //makes this run after damage
                if (mob.health < 0.5 && mob.damageReduction > 0 && mob.alive) {
                    // mob.death();
                    // mob.damage(this.health * Math.sqrt(this.mass) / this.damageReduction);
                    mob.damage(Infinity);

                    const color = 'rgb(255,255,255)'
                    simulation.drawList.push({
                        x: mob.position.x,
                        y: mob.position.y,
                        radius: mob.radius * 1.2,
                        color: color, //"rgba(0,0,0,0.6)",
                        time: 8
                    });
                    simulation.drawList.push({
                        x: mob.position.x,
                        y: mob.position.y,
                        radius: mob.radius * 0.75,
                        color: color, //"rgba(0,0,0,0.85)",
                        time: 15
                    });
                    simulation.drawList.push({
                        x: mob.position.x,
                        y: mob.position.y,
                        radius: mob.radius * 0.4,
                        color: color, //"rgb(0,0,0)",
                        time: 20
                    });
                }
            }
            requestAnimationFrame(cycle);
        }
    },
    nail(pos, velocity, dmg = 1) {
        dmg *= tech.bulletSize
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(pos.x, pos.y, 25 * tech.bulletSize, 2 * tech.bulletSize, b.fireAttributes(Math.atan2(velocity.y, velocity.x)));
        Matter.Body.setVelocity(bullet[me], velocity);
        Composite.add(engine.world, bullet[me]); //add bullet to world
        bullet[me].endCycle = simulation.cycle + 80 + 18 * Math.random();
        bullet[me].dmg = tech.isNailRadiation ? 0 : dmg
        bullet[me].beforeDmg = function (who) { //beforeDmg is rewritten with ice crystal tech
            if (tech.isNailRadiation) mobs.statusDoT(who, dmg * (tech.isFastRadiation ? 1.3 : 0.44), tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
            if (tech.isNailCrit) { //makes bullet do explosive damage if it hits center
                if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                    b.explosion(this.position, 80 + 90 * (b.activeGun === 0) + 30 * Math.random()); //larger explosions for human aimed nail gun, smaller for auto aimed sources, like bots, and mine
                }
            }
            this.ricochet(who)
        };
        bullet[me].ricochet = function (who) { //use for normal nails, and ice crystal nails
            if (tech.isRicochet) {
                const targets = [] //target nearby mobs
                for (let i = 0, len = mob.length; i < len; i++) {
                    const dist = Vector.magnitude(Vector.sub(this.position, mob[i].position));
                    if (
                        mob[i] !== who &&
                        dist < 2500 + mob[i].radius &&
                        !mob[i].isBadTarget && //|| mob[i].isMobBullet
                        !mob[i].isInvulnerable &&
                        Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                        Matter.Query.ray(map, this.position, mob[i].position).length === 0
                    ) {
                        targets.push(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, dist / 60))) //predict where the mob will be in a few cycles
                    }
                }
                if (targets.length > 0) { // aim near a random target in array
                    const index = Math.floor(Math.random() * targets.length)
                    Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(Vector.sub(targets[index], this.position)), 45));
                    Matter.Body.setAngle(this, Math.atan2(this.velocity.y, this.velocity.x))
                    Matter.Body.setAngularVelocity(this, 0);
                }
                this.dmg += 2
            }
        }
        bullet[me].do = function () { };
    },
    needle(angle = m.angle) {
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(m.pos.x + 40 * Math.cos(m.angle), m.pos.y + 40 * Math.sin(m.angle), 75 * tech.bulletSize, 0.75 * tech.bulletSize, b.fireAttributes(angle));
        Matter.Body.setDensity(bullet[me], 0.00001); //0.001 is normal
        bullet[me].immuneList = []
        bullet[me].dmg = 6
        if (tech.needleTunnel) {
            bullet[me].dmg *= 1.2
            bullet[me].endCycle = simulation.cycle + 300;
            bullet[me].collisionFilter.mask = tech.isShieldPierce ? 0 : cat.mobShield
            // bullet[me].turnRate = 0.005 * (Math.random() - 0.5)
            bullet[me].isInMap = false
            bullet[me].do = function () {
                const whom = Matter.Query.collides(this, mob)
                if (whom.length && this.speed > 20) { //if touching a mob 
                    for (let i = 0, len = whom.length; i < len; i++) {
                        who = whom[i].bodyA
                        if (who && who.mob) {
                            let immune = false
                            for (let i = 0; i < this.immuneList.length; i++) { //check if this needle has hit this mob already
                                if (this.immuneList[i] === who.id) {
                                    immune = true
                                    break
                                }
                            }
                            if (!immune) {
                                if (tech.isNailCrit) {
                                    if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                                        b.explosion(this.position, 220 + 50 * Math.random()); //makes bullet do explosive damage at end
                                    }
                                } else if (tech.isCritKill) b.crit(who, this)

                                this.immuneList.push(who.id) //remember that this needle has hit this mob once already
                                let dmg = this.dmg * tech.bulletSize * m.dmgScale
                                if (tech.isNailRadiation) {
                                    mobs.statusDoT(who, (tech.isFastRadiation ? 6 : 2) * tech.bulletSize, tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
                                    dmg *= 0.25
                                }
                                if (tech.isCrit && who.isStunned) dmg *= 4
                                who.damage(dmg, tech.isShieldPierce);
                                if (who.alive) who.foundPlayer();
                                if (who.damageReduction) {
                                    simulation.drawList.push({ //add dmg to draw queue
                                        x: this.position.x,
                                        y: this.position.y,
                                        radius: Math.log(dmg + 1.1) * 40 * who.damageReduction + 3,
                                        color: simulation.playerDmgColor,
                                        time: simulation.drawTime
                                    });
                                }
                            }
                        }
                    }
                } else if (Matter.Query.collides(this, map).length) { //penetrate walls
                    if (!this.isInMap) { //turn after entering the map, but only turn once
                        this.isInMap = true
                        Matter.Body.setVelocity(this, Vector.rotate(this.velocity, 0.25 * (Math.random() - 0.5)));
                        Matter.Body.setAngle(this, Math.atan2(this.velocity.y, this.velocity.x))
                    }
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.mult(this.velocity, -0.98))) //move back 1/2 your velocity = moving at 1/2 speed
                } else if (Matter.Query.collides(this, body).length) { //penetrate blocks
                    Matter.Body.setAngularVelocity(this, 0)
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.mult(this.velocity, -0.94))) //move back 1/2 your velocity = moving at 1/2 speed
                } else if (this.speed < 30) {
                    this.force.y += this.mass * 0.001; //no gravity until it slows down to improve aiming
                }
            };
        } else {
            bullet[me].endCycle = simulation.cycle + 100;
            bullet[me].collisionFilter.mask = tech.isShieldPierce ? cat.body : cat.body | cat.mobShield
            bullet[me].do = function () {
                const whom = Matter.Query.collides(this, mob)
                if (whom.length && this.speed > 20) { //if touching a mob 
                    for (let i = 0, len = whom.length; i < len; i++) {
                        who = whom[i].bodyA
                        if (who && who.mob) {
                            let immune = false
                            for (let i = 0; i < this.immuneList.length; i++) { //check if this needle has hit this mob already
                                if (this.immuneList[i] === who.id) {
                                    immune = true
                                    break
                                }
                            }
                            if (!immune) {
                                if (tech.isNailCrit) {
                                    if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                                        b.explosion(this.position, 220 + 50 * Math.random()); //makes bullet do explosive damage at end
                                    }
                                } else if (tech.isCritKill) b.crit(who, this)

                                this.immuneList.push(who.id) //remember that this needle has hit this mob once already
                                let dmg = this.dmg * tech.bulletSize * m.dmgScale
                                if (tech.isNailRadiation) {
                                    mobs.statusDoT(who, (tech.isFastRadiation ? 6 : 2) * tech.bulletSize, tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
                                    dmg *= 0.25
                                }
                                if (tech.isCrit && who.isStunned) dmg *= 4
                                who.damage(dmg, tech.isShieldPierce);
                                if (who.alive) who.foundPlayer();
                                if (who.damageReduction) {
                                    simulation.drawList.push({ //add dmg to draw queue
                                        x: this.position.x,
                                        y: this.position.y,
                                        radius: Math.log(dmg + 1.1) * 40 * who.damageReduction + 3,
                                        color: simulation.playerDmgColor,
                                        time: simulation.drawTime
                                    });
                                }
                            }
                        }
                    }
                } else if (Matter.Query.collides(this, map).length) { //stick in walls
                    this.collisionFilter.mask = 0;
                    Matter.Body.setAngularVelocity(this, 0)
                    Matter.Body.setVelocity(this, {
                        x: 0,
                        y: 0
                    });
                    this.do = function () {
                        if (!Matter.Query.collides(this, map).length) this.force.y += this.mass * 0.001;
                    }
                    if (tech.isNeedleIce) {
                        b.iceIX(5 + 5 * Math.random(), 2 * Math.PI * Math.random(), this.position) // iceIX(speed = 0, dir = m.angle + Math.PI * 2 * Math.random(), where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }) {
                        if (0.5 < Math.random()) b.iceIX(5 + 5 * Math.random(), 2 * Math.PI * Math.random(), this.position)
                    }
                } else if (this.speed < 30) {
                    this.force.y += this.mass * 0.001; //no gravity until it slows down to improve aiming
                }
            };
        }
        const SPEED = 90
        Matter.Body.setVelocity(bullet[me], {
            x: 0.5 * player.velocity.x + SPEED * Math.cos(angle),
            y: 0.5 * player.velocity.y + SPEED * Math.sin(angle)
        });
        // Matter.Body.setDensity(bullet[me], 0.00001);
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    // **************************************************************************************************
    // **************************************************************************************************
    // ********************************         Bots        *********************************************
    // **************************************************************************************************
    // **************************************************************************************************
    totalBots() {
        return tech.dynamoBotCount + tech.foamBotCount + tech.soundBotCount + tech.nailBotCount + tech.laserBotCount + tech.boomBotCount + tech.orbitBotCount + tech.plasmaBotCount + tech.missileBotCount
    },
    hasBotUpgrade() {
        return tech.isNailBotUpgrade + tech.isFoamBotUpgrade + tech.isBoomBotUpgrade + tech.isLaserBotUpgrade + tech.isOrbitBotUpgrade + tech.isDynamoBotUpgrade + tech.isSoundBotUpgrade
    },
    convertBotsTo(type) { //type can be a string like "dynamoBotCount"
        const totalPermanentBots = b.totalBots()
        //remove all bots techs and convert them to the new type so that tech refunds work correctly
        let totalTechToConvert = 0 //count how many tech need to be converted
        for (let i = 0; i < tech.tech.length; i++) {
            if (tech.tech[i].count && tech.tech[i].isBot) {
                totalTechToConvert += tech.tech[i].count
                tech.removeTech(i)
            }
        }
        //remove all bots
        b.zeroBotCount()
        b.clearPermanentBots()
        for (let i = 0; i < totalTechToConvert; i++) tech.giveTech(type) //spawn tech for the correct bot type

        //find index of new bot type tech effect
        let index = null
        for (let i = 0; i < tech.tech.length; i++) {
            if (tech.tech[i].name === type) {
                index = i
                break
            }
        }
        for (let i = 0, len = totalPermanentBots - totalTechToConvert; i < len; i++) tech.tech[index].effect(); //also convert any permanent bots that didn't come from a tech
        //in experiment mode set the unselect color for bot tech that was converted
        // if (build.isExperimentSelection) {        }
    },
    clearPermanentBots() {
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType && bullet[i].endCycle === Infinity) bullet[i].endCycle = 0 //remove active bots, but don't remove temp bots
        }
    },
    removeBot() {
        if (tech.nailBotCount > 1) {
            tech.nailBotCount--
            return
        }
        if (tech.laserBotCount > 1) {
            tech.laserBotCount--
            return
        }
        if (tech.foamBotCount > 1) {
            tech.foamBotCount--
            return
        }
        if (tech.soundBotCount > 1) {
            tech.soundBotCount--
            return
        }
        if (tech.boomBotCount > 1) {
            tech.boomBotCount--
            return
        }
        if (tech.orbitBotCount > 1) {
            tech.orbitBotCount--
            return
        }
        if (tech.dynamoBotCount > 1) {
            tech.dynamoBotCount--
            return
        }
        if (tech.missileBotCount > 1) {
            tech.missileBotCount--
            return
        }
        if (tech.plasmaBotCount > 1) {
            tech.plasmaBotCount--
            return
        }
    },
    zeroBotCount() { //remove all bots
        tech.dynamoBotCount = 0;
        tech.nailBotCount = 0;
        tech.laserBotCount = 0;
        tech.orbitBotCount = 0;
        tech.foamBotCount = 0;
        tech.soundBotCount = 0;
        tech.boomBotCount = 0;
        tech.plasmaBotCount = 0;
        tech.missileBotCount = 0;
    },
    respawnBots() {
        for (let i = 0; i < tech.dynamoBotCount; i++) b.dynamoBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.laserBotCount; i++) b.laserBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.nailBotCount; i++) b.nailBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.foamBotCount; i++) b.foamBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.soundBotCount; i++) b.soundBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.boomBotCount; i++) b.boomBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.orbitBotCount; i++) b.orbitBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        }, !level.isSlowBots)
        for (let i = 0; i < tech.plasmaBotCount; i++) b.plasmaBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        })
        for (let i = 0; i < tech.missileBotCount; i++) b.missileBot({
            x: player.position.x + 50 * (Math.random() - 0.5),
            y: player.position.y + 50 * (Math.random() - 0.5)
        })
        if (tech.isIntangible && m.isCloak) {
            for (let i = 0; i < bullet.length; i++) {
                if (bullet[i].botType) bullet[i].collisionFilter.mask = cat.map | cat.bullet | cat.mobBullet | cat.mobShield
            }
        }
    },
    randomBot(where = player.position, isKeep = true, isLaser = true) {
        if (Math.random() < 0.5) { //chance to match bot to your upgrade
            if (tech.isNailBotUpgrade) { //check for upgrades first
                b.nailBot(where, isKeep)
                if (isKeep) tech.nailBotCount++;
            } else if (tech.isFoamBotUpgrade) {
                b.foamBot(where, isKeep)
                if (isKeep) tech.foamBotCount++;
            } else if (tech.isSoundBotUpgrade) {
                b.soundBot(where, isKeep)
                if (isKeep) tech.soundBotCount++;
            } else if (tech.isBoomBotUpgrade) {
                b.boomBot(where, isKeep)
                if (isKeep) tech.boomBotCount++;
            } else if (tech.isLaserBotUpgrade) {
                b.laserBot(where, isKeep)
                if (isKeep) tech.laserBotCount++;
            } else if (tech.isOrbitBotUpgrade) {
                b.orbitBot(where, isKeep);
                if (isKeep) tech.orbitBotCount++;
            } else if (tech.isDynamoBotUpgrade) {
                b.dynamoBot(where, isKeep)
                if (isKeep) tech.dynamoBotCount++;
            } else if (Math.random() < 0.143) { //random
                b.soundBot(where, isKeep)
                if (isKeep) tech.soundBotCount++;
            } else if (Math.random() < 0.166 && isLaser) {
                b.laserBot(where, isKeep)
                if (isKeep) tech.laserBotCount++;
            } else if (Math.random() < 0.2) {
                b.dynamoBot(where, isKeep)
                if (isKeep) tech.dynamoBotCount++;
            } else if (Math.random() < 0.25) {
                b.orbitBot(where, isKeep);
                if (isKeep) tech.orbitBotCount++;
            } else if (Math.random() < 0.33) {
                b.nailBot(where, isKeep)
                if (isKeep) tech.nailBotCount++;
            } else if (Math.random() < 0.5) {
                b.foamBot(where, isKeep)
                if (isKeep) tech.foamBotCount++;
            } else {
                b.boomBot(where, isKeep)
                if (isKeep) tech.boomBotCount++;
            }
        } else { //else don't match bot to upgrade
            if (Math.random() < 0.143) { //random
                b.soundBot(where, isKeep)
                if (isKeep) tech.soundBotCount++;
            } else if (Math.random() < 0.166 && isLaser) { //random
                b.laserBot(where, isKeep)
                if (isKeep) tech.laserBotCount++;
            } else if (Math.random() < 0.2) {
                b.dynamoBot(where, isKeep)
                if (isKeep) tech.dynamoBotCount++;
            } else if (Math.random() < 0.25) {
                b.orbitBot(where, isKeep);
                if (isKeep) tech.orbitBotCount++;
            } else if (Math.random() < 0.33) {
                b.nailBot(where, isKeep)
                if (isKeep) tech.nailBotCount++;
            } else if (Math.random() < 0.5) {
                b.foamBot(where, isKeep)
                if (isKeep) tech.foamBotCount++;
            } else {
                b.boomBot(where, isKeep)
                if (isKeep) tech.boomBotCount++;
            }
        }

    },
    setDynamoBotDelay() {
        let total = 0
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType === 'dynamo') total++
        }
        let count = 0
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType === 'dynamo') {
                count++
                const step = Math.max(60 - 3 * total, 10)
                if (bullet[i].isKeep) {
                    bullet[i].followDelay = (step * count) % 600
                } else {
                    bullet[i].followDelay = Math.floor(step * bullet.length * Math.random()) % 600
                }
            }
        }
    },
    dynamoBot(position = player.position, isKeep = true) {
        const me = bullet.length;
        bullet[me] = Bodies.polygon(position.x, position.y, 5, 10, {
            isUpgraded: tech.isDynamoBotUpgrade,
            botType: "dynamo",
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.02,
            spin: 0.07 * (Math.random() < 0.5 ? -1 : 1),
            // isStatic: true,
            isKeep: isKeep,
            isSensor: true,
            restitution: 0,
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 0,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: 0 //cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
            },
            beforeDmg() { },
            onEnd() {
                b.setDynamoBotDelay()
            },
            followDelay: 0,
            phase: Math.floor(60 * Math.random()),
            do() {
                // if (Vector.magnitude(Vector.sub(this.position, player.position)) < 150) {
                //     ctx.fillStyle = "rgba(0,0,0,0.06)";
                //     ctx.beginPath();
                //     ctx.arc(this.position.x, this.position.y, 150, 0, 2 * Math.PI);
                //     ctx.fill();
                // }

                //check for damage 
                if (m.immuneCycle < m.cycle && !((m.cycle + this.phase) % 30)) { //twice a second
                    if (Vector.magnitude(Vector.sub(this.position, player.position)) < 250 && m.immuneCycle < m.cycle) { //give energy
                        Matter.Body.setAngularVelocity(this, this.spin)
                        if (this.isUpgraded) {
                            m.energy += 0.12 * level.isReducedRegen
                            simulation.drawList.push({ //add dmg to draw queue
                                x: this.position.x,
                                y: this.position.y,
                                radius: 10,
                                color: m.fieldMeterColor,
                                time: simulation.drawTime
                            });
                        } else {
                            m.energy += 0.04 * level.isReducedRegen
                            simulation.drawList.push({ //add dmg to draw queue
                                x: this.position.x,
                                y: this.position.y,
                                radius: 5,
                                color: m.fieldMeterColor,
                                time: simulation.drawTime
                            });
                        }
                    }
                }

                if (!m.isCloak) { //if cloaking field isn't active
                    const size = 33 - 6 * isKeep
                    q = Matter.Query.region(mob, {
                        min: {
                            x: this.position.x - size,
                            y: this.position.y - size
                        },
                        max: {
                            x: this.position.x + size,
                            y: this.position.y + size
                        }
                    })
                    for (let i = 0; i < q.length; i++) {
                        if (!q[i].isShielded) {
                            Matter.Body.setAngularVelocity(this, this.spin)
                            // mobs.statusStun(q[i], 180)
                            // const dmg = 0.5 * m.dmgScale * (this.isUpgraded ? 2.5 : 1)
                            const dmg = 0.5 * m.dmgScale
                            q[i].damage(dmg);
                            if (q[i].alive) q[i].foundPlayer();
                            if (q[i].damageReduction) {
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: this.position.x,
                                    y: this.position.y,
                                    // radius: 600 * dmg * q[i].damageReduction,
                                    radius: Math.sqrt(2000 * dmg * q[i].damageReduction) + 2,
                                    color: 'rgba(0,0,0,0.4)',
                                    time: simulation.drawTime
                                });
                            }
                        }
                    }
                }
                let history = m.history[(m.cycle - this.followDelay) % 600]
                Matter.Body.setPosition(this, { x: history.position.x, y: history.position.y - history.yOff + 24.2859 }) //bullets move with player
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
        b.setDynamoBotDelay()
    },
    nailBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        const RADIUS = (12 + 4 * Math.random())
        bullet[me] = Bodies.polygon(position.x, position.y, 4, RADIUS, {
            isUpgraded: tech.isNailBotUpgrade,
            botType: "nail",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.05,
            restitution: 0.6 * (1 + 0.5 * Math.random()),
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            // lookFrequency: 56 + Math.floor(17 * Math.random()) - isUpgraded * 20,
            lastLookCycle: simulation.cycle + 60 * Math.random(),
            delay: Math.floor((tech.isNailBotUpgrade ? 22 : 85) + 10 * isKeep),
            acceleration: (isKeep ? 0.005 : 0.001) * (1 + 0.5 * Math.random()),
            range: 60 * (1 + 0.3 * Math.random()) + 3 * b.totalBots() + !isKeep * 100,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            beforeDmg() { },
            onEnd() { },
            do() {
                const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, m.pos))
                if (distanceToPlayer > this.range) { //if far away move towards player
                    this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.mass * this.acceleration)
                } else { //close to player
                    Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity
                    if (this.lastLookCycle < simulation.cycle && !m.isCloak) {
                        this.lastLookCycle = simulation.cycle + this.delay
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
                            if (
                                !mob[i].isBadTarget &&
                                dist < 3000000 &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                                !mob[i].isShielded &&
                                !mob[i].isInvulnerable
                            ) {
                                const unit = Vector.normalise(Vector.sub(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, Math.sqrt(dist) / 60)), this.position))
                                if (this.isUpgraded) {
                                    const SPEED = 60
                                    b.nail(this.position, Vector.mult(unit, SPEED))
                                    this.force = Vector.mult(unit, -0.02 * this.mass)
                                } else {
                                    const SPEED = 45
                                    b.nail(this.position, Vector.mult(unit, SPEED))
                                    this.force = Vector.mult(unit, -0.012 * this.mass)
                                }
                                break;
                            }
                        }
                    }
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    missileBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(position.x, position.y, 28, 11, {
            botType: "missile",
            angle: m.angle,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.04,
            restitution: 0.7,
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 26 + Math.ceil(6 * Math.random()),
            cd: 0,
            delay: Math.floor(60),
            range: 70 + 3 * b.totalBots(),
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? (cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield) : (cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield) //if over 50 bots, they no longer collide with each other
            },
            beforeDmg() { },
            onEnd() { },
            do() {
                const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, m.pos))
                if (distanceToPlayer > this.range) { //if far away move towards player
                    this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.mass * 0.006)
                } else { //close to player
                    Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity
                    if (this.cd < simulation.cycle && !(simulation.cycle % this.lookFrequency) && !m.isCloak) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist2 = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
                            if (
                                mob[i].alive &&
                                !mob[i].isBadTarget &&
                                dist2 > 40000 &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                !mob[i].isInvulnerable
                            ) {
                                this.cd = simulation.cycle + this.delay;
                                const angle = Vector.angle(this.position, mob[i].position)
                                Matter.Body.setAngle(this, angle)
                                // Matter.Body.setAngularVelocity(this, 0.025)
                                this.torque += this.inertia * 0.00004 * (Math.round(Math.random()) ? 1 : -1)
                                this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, mob[i].position)), this.mass * 0.02)

                                if (tech.missileCount > 1) {
                                    const countReduction = Math.pow(0.85, tech.missileCount)
                                    const size = Math.sqrt(countReduction)
                                    const direction = { x: Math.cos(angle), y: Math.sin(angle) }
                                    const push = Vector.mult(Vector.perp(direction), 0.015 * countReduction / Math.sqrt(tech.missileCount))
                                    for (let i = 0; i < tech.missileCount; i++) {
                                        setTimeout(() => {
                                            b.missile(this.position, angle, -8, size)
                                            bullet[bullet.length - 1].force.x += push.x * (i - (tech.missileCount - 1) / 2);
                                            bullet[bullet.length - 1].force.y += push.y * (i - (tech.missileCount - 1) / 2);
                                        }, 40 * tech.missileCount * Math.random());
                                    }
                                } else {
                                    b.missile(this.position, angle, -8) //    missile(where, angle, speed, size = 1) {
                                }
                                break;
                            }
                        }
                    }
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    foamBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        const RADIUS = (10 + 5 * Math.random())
        bullet[me] = Bodies.polygon(position.x, position.y, 6, RADIUS, {
            isUpgraded: tech.isFoamBotUpgrade,
            botType: "foam",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.05,
            restitution: 0.6 * (1 + 0.5 * Math.random()),
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 60 + Math.floor(17 * Math.random()) - 50 * tech.isFoamBotUpgrade,
            cd: 0,
            fireCount: 0,
            fireLimit: 5 + 2 * tech.isFoamBotUpgrade - isKeep,
            delay: Math.floor((200 + (tech.isFoamBotUpgrade ? 0 : 200))),// + 30 - 20 * tech.isFoamBotUpgrade,//20 + Math.floor(85 * b.fireCDscale) - 20 * tech.isFoamBotUpgrade,
            acceleration: (isKeep ? 0.005 : 0.001) * (1 + 0.5 * Math.random()),
            range: 60 * (1 + 0.3 * Math.random()) + 3 * b.totalBots() + !isKeep * 100, //how far from the player the bot will move
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            beforeDmg() { },
            onEnd() { },
            fireTarget: { x: 0, y: 0 },
            fire() {
                this.fireCount++
                if (this.fireCount > this.fireLimit) {
                    this.fireCount = 0
                    this.cd = simulation.cycle + this.delay;
                } // else {this.cd = simulation.cycle + 1;}

                const radius = 5 + 3 * Math.random()
                const SPEED = Math.max(5, 25 - radius * 0.4); //(m.crouch ? 32 : 20) - radius * 0.7;
                const velocity = Vector.mult(Vector.normalise(Vector.sub(this.fireTarget, this.position)), SPEED)
                b.foam(this.position, Vector.rotate(velocity, 0.07 * (Math.random() - 0.5)), radius + 5 * this.isUpgraded)

                //recoil
                // const force = Vector.mult(Vector.normalise(velocity), 0.005 * this.mass * (tech.isFoamCavitation ? 2 : 1))
                const force = Vector.mult(velocity, 0.0001 * this.mass * (tech.isFoamCavitation ? 2 : 1))
                this.force.x -= force.x
                this.force.y -= force.y
            },
            do() {
                if (this.fireCount === 0) { //passive mode: look for targets and following player
                    const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, m.pos))
                    if (distanceToPlayer > this.range) { //if far away move towards player
                        this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.mass * this.acceleration)
                    } else { //close to player
                        Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity
                    }

                    if (this.cd < simulation.cycle && !m.isCloak && !(simulation.cycle % this.lookFrequency)) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist2 = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
                            if (dist2 < 1600000 && !mob[i].isBadTarget && Matter.Query.ray(map, this.position, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                                this.fireTarget = Vector.add(mob[i].position, Vector.mult(mob[i].velocity, Math.sqrt(dist2) / 60)) //set target to where the mob will be in 1 second
                                this.fire()
                                break;
                            }
                        }
                    }
                } else { //fire mode: quickly fire at targets and doesn't follow player
                    this.fire()
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    soundBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        bullet[me] = Bodies.rectangle(position.x, position.y, 12, 30, {
            isUpgraded: tech.isSoundBotUpgrade,
            botType: "sound",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.05,
            restitution: 0.6 * (1 + 0.5 * Math.random()),
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 17 + Math.floor(7 * Math.random()) - 3 * tech.isSoundBotUpgrade,
            cd: 0,
            fireCount: 0,
            fireLimit: 5 - isKeep,
            delay: Math.floor(140),// + 30 - 20 * tech.isFoamBotUpgrade,//20 + Math.floor(85 * b.fireCDscale) - 20 * tech.isFoamBotUpgrade,
            acceleration: (isKeep ? 0.005 : 0.001) * (1 + 0.5 * Math.random()),
            range: 60 * (1 + 0.3 * Math.random()) + 3 * b.totalBots() + !isKeep * 100, //how far from the player the bot will move
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            beforeDmg() { },
            onEnd() { },
            fireTarget: { x: 0, y: 0 },
            waves: [],
            phononWaveCD: 0,
            addWave(where, angle) {
                const halfArc = 0.2 * (tech.isBulletTeleport ? 0.66 + (Math.random() - 0.5) : 1) + 0.04 * tech.isSoundBotUpgrade //6.28 is a full circle, but these arcs needs to stay small because we are using small angle linear approximation, for collisions
                this.waves.push({
                    position: where,
                    angle: angle - halfArc, //used in drawing ctx.arc
                    unit1: { x: Math.cos(angle - halfArc), y: Math.sin(angle - halfArc) }, //used for collision
                    unit2: { x: Math.cos(angle + halfArc), y: Math.sin(angle + halfArc) }, //used for collision
                    arc: halfArc * 2,
                    radius: 25,
                    resonanceCount: 0,
                    dmg: (tech.isUpgraded ? 9 : 1.5) * m.dmgScale * tech.wavePacketDamage * tech.waveBeamDamage * (tech.isBulletTeleport ? 1.5 : 1),
                })
            },
            fire() {
                if (!(simulation.cycle % 6)) {
                    this.fireCount++
                    if (this.fireCount > this.fireLimit) {
                        this.fireCount = 0
                        this.cd = simulation.cycle + this.delay;
                    }
                    this.addWave({ x: this.position.x, y: this.position.y }, Math.atan2(this.fireTarget.y - this.position.y, this.fireTarget.x - this.position.x) + tech.isBulletTeleport * 0.3 * (Math.random() - 0.5)) //add wave to waves array
                    //face target
                    Matter.Body.setAngle(this, Vector.angle(this.position, this.fireTarget));
                }
            },
            do() {
                if (this.fireCount === 0) { //passive mode: look for targets and following player
                    const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, m.pos))
                    if (distanceToPlayer > this.range) { //if far away move towards player
                        this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.mass * this.acceleration)
                    } else { //close to player
                        Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity
                    }
                    if (this.cd < simulation.cycle && !m.isCloak && !(simulation.cycle % this.lookFrequency)) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            const dist2 = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
                            if (dist2 < 1300000 && !mob[i].isBadTarget && (Matter.Query.ray(map, this.position, mob[i].position).length === 0 || dist2 < 300000) && !mob[i].isInvulnerable) {
                                this.fireTarget = Vector.add(mob[i].position, Vector.mult(mob[i].velocity, Math.sqrt(dist2) / 60)) //set target to where the mob will be in 1 second
                                this.fire()
                                break;
                            }
                        }
                    }
                } else { //fire mode: quickly fire at targets and doesn't follow player
                    this.fire()
                }
                if (!m.isTimeDilated) { //update current waves
                    ctx.strokeStyle = "rgba(0,0,0,0.6)" //"000";
                    ctx.lineWidth = 2 * tech.wavePacketDamage
                    ctx.beginPath();
                    const end = 1200 * Math.sqrt(tech.bulletsLastLonger)
                    //this does less damage than the player phonon waves  2.3 -> 2
                    for (let i = this.waves.length - 1; i > -1; i--) {
                        const v1 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit1, this.waves[i].radius))
                        const v2 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit2, this.waves[i].radius))
                        //draw wave
                        ctx.moveTo(v1.x, v1.y)
                        ctx.arc(this.waves[i].position.x, this.waves[i].position.y, this.waves[i].radius, this.waves[i].angle, this.waves[i].angle + this.waves[i].arc);
                        //using small angle linear approximation of circle arc, this will not work if the arc gets large   // https://stackoverflow.com/questions/13652518/efficiently-find-points-inside-a-circle-sector
                        let hits = Matter.Query.ray(mob, v1, v2, 50)
                        for (let j = 0; j < hits.length; j++) {
                            const who = hits[j].body
                            if (!who.isShielded) {
                                who.force.x += 0.01 * (Math.random() - 0.5) * who.mass
                                who.force.y += 0.01 * (Math.random() - 0.5) * who.mass
                                Matter.Body.setVelocity(who, { x: who.velocity.x * 0.98, y: who.velocity.y * 0.98 });
                                let vertices = who.vertices;
                                const vibe = 50 + who.radius * 0.15
                                ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x + vibe * (Math.random() - 0.5), vertices[j].y + vibe * (Math.random() - 0.5));
                                ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                who.locatePlayer();
                                who.damage(this.waves[i].dmg / Math.pow(who.radius, 0.33));


                                if (tech.isPhononWave && this.phononWaveCD < m.cycle) {
                                    this.phononWaveCD = m.cycle + 10 * (1 + this.waves[i].resonanceCount)
                                    let closestMob, dist
                                    let range = end - 30 * this.waves[i].resonanceCount
                                    for (let i = 0, len = mob.length; i < len; i++) {
                                        if (who !== mob[i] && !mob[i].isBadTarget && !mob[i].isInvulnerable) {
                                            dist = Vector.magnitude(Vector.sub(who.position, mob[i].position));
                                            if (dist < range) {
                                                closestMob = mob[i]
                                                range = dist
                                            }
                                        }
                                    }
                                    if (closestMob) { //add wave to waves array
                                        this.addWave(who.position, Math.atan2(closestMob.position.y - who.position.y, closestMob.position.x - who.position.x) + tech.isBulletTeleport * 0.3 * (Math.random() - 0.5))
                                    } else {
                                        this.addWave(who.position, Math.random() * Math.PI)
                                    }
                                    this.waves[this.waves.length - 1].resonanceCount = this.waves[i].resonanceCount + 1
                                    break
                                }
                            }
                        }

                        hits = Matter.Query.ray(body, v1, v2, 50) //Matter.Query.ray(bodies, startPoint, endPoint, [rayWidth])
                        for (let j = 0, len = Math.min(30, hits.length); j < len; j++) {
                            const who = hits[j].body
                            //make them shake around
                            who.force.x += 0.005 * (Math.random() - 0.5) * who.mass
                            who.force.y += (0.005 * (Math.random() - 0.5) - simulation.g * 0.1) * who.mass //remove force of gravity
                            let vertices = who.vertices;
                            const vibe = 25
                            ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                            for (let j = 1; j < vertices.length; j++) {
                                ctx.lineTo(vertices[j].x + vibe * (Math.random() - 0.5), vertices[j].y + vibe * (Math.random() - 0.5));
                            }
                            ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));

                            if (tech.isPhononBlock && !who.isNotHoldable && who.speed < 5 && who.angularSpeed < 0.1) {
                                if (Math.random() < 0.5) b.targetedBlock(who, 50 - Math.min(25, who.mass * 3)) //    targetedBlock(who, speed = 50 - Math.min(20, who.mass * 2), range = 1600) {
                                // Matter.Body.setAngularVelocity(who, (0.25 + 0.12 * Math.random()) * (Math.random() < 0.5 ? -1 : 1));
                                who.torque += who.inertia * 0.001 * (Math.random() - 0.5)
                            }
                        }

                        this.waves[i].radius += tech.waveBeamSpeed * 2
                        if (this.waves[i].radius > end - 30 * this.waves[i].resonanceCount) {
                            this.waves.splice(i, 1) //end
                        }
                    }
                    ctx.stroke();
                }



            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    laserBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        const RADIUS = (14 + 6 * Math.random())
        bullet[me] = Bodies.polygon(position.x, position.y, 3, RADIUS, {
            botType: "laser",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.008 * (1 + 0.3 * Math.random()),
            restitution: 0.5 * (1 + 0.5 * Math.random()),
            acceleration: 0.0015 * (1 + 0.3 * Math.random()),
            playerRange: 140 + Math.floor(30 * Math.random()) + 2 * b.totalBots(),
            offPlayer: { x: 0, y: 0, },
            dmg: 0, //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 20 + Math.floor(7 * Math.random()) - 13 * tech.isLaserBotUpgrade,
            range: (600 + 375 * tech.isLaserBotUpgrade) * (1 + 0.12 * Math.random()),
            drainThreshold: 0.15 + 0.5 * Math.random() + (tech.isEnergyHealth ? 0.3 : 0),// laser bot will not attack if the player is below this energy
            drain: (0.57 - 0.43 * tech.isLaserBotUpgrade + isKeep * 0.08) * tech.laserDrain,
            laserDamage: 0.75 + 0.75 * tech.isLaserBotUpgrade,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            lockedOn: null,
            beforeDmg() {
                this.lockedOn = null
            },
            onEnd() { },
            do() {
                const playerPos = Vector.add(Vector.add(this.offPlayer, m.pos), Vector.mult(player.velocity, 20)) //also include an offset unique to this bot to keep many bots spread out
                const farAway = Math.max(0, (Vector.magnitude(Vector.sub(this.position, playerPos))) / this.playerRange) //linear bounding well 
                const mag = Math.min(farAway, 4) * this.mass * this.acceleration
                this.force = Vector.mult(Vector.normalise(Vector.sub(playerPos, this.position)), mag)
                //manual friction to not lose rotational velocity
                Matter.Body.setVelocity(this, { x: this.velocity.x * 0.95, y: this.velocity.y * 0.95 });
                //find targets
                if (!(simulation.cycle % this.lookFrequency)) {
                    this.lockedOn = null;
                    if (!m.isCloak) {
                        let closeDist = this.range;
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            const DIST = Vector.magnitude(Vector.sub(this.vertices[0], mob[i].position));
                            if (
                                DIST - mob[i].radius < closeDist &&
                                !mob[i].isShielded &&
                                (!mob[i].isBadTarget || mob[i].isMobBullet) &&
                                Matter.Query.ray(map, this.vertices[0], mob[i].position).length === 0 &&
                                Matter.Query.ray(body, this.vertices[0], mob[i].position).length === 0 &&
                                !mob[i].isInvulnerable
                            ) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                    //randomize position relative to player
                    if (Math.random() < 0.1) {
                        if (isKeep) {
                            const range = 110 + 4 * b.totalBots()
                            this.offPlayer = { x: range * (Math.random() - 0.5), y: range * (Math.random() - 0.5) - 20, }
                        } else {
                            const range = 110 + 4 * b.totalBots() + 100 * Math.random()
                            this.offPlayer = Vector.mult(Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random()), range)
                        }
                    }
                }
                //hit target with laser
                if (this.lockedOn && this.lockedOn.alive && m.energy > this.drainThreshold) {
                    m.energy -= this.drain
                    this.laser();
                    // b.laser(this.vertices[0], this.lockedOn.position, m.dmgScale * this.laserDamage * tech.laserDamage, tech.laserReflections, false, 0.4) //tech.laserDamage = 0.16
                }
            },
            laser() {
                const push = 0.4
                const reflectivity = 1 - 1 / (tech.laserReflections * 3)
                let damage = m.dmgScale * this.laserDamage * tech.laserDamage
                //make the laser wiggle as it aims at the target
                let best = { x: 1, y: 1, dist2: Infinity, who: null, v1: 1, v2: 1 };
                const perp2 = Vector.mult(Vector.rotate({ x: 1, y: 0 }, m.angle + Math.PI / 2), 0.6 * this.lockedOn.radius * Math.sin(simulation.cycle / this.lookFrequency))
                const path = [{ x: this.vertices[0].x, y: this.vertices[0].y }, Vector.add(this.lockedOn.position, perp2)];

                const checkForCollisions = function () {
                    best = { x: 1, y: 1, dist2: Infinity, who: null, v1: 1, v2: 1 };
                    best = vertexCollision(path[path.length - 2], path[path.length - 1], [mob, map, body]);
                };
                const laserHitMob = function () {
                    if (best.who.alive) {
                        best.who.locatePlayer();
                        if (best.who.damageReduction) {
                            if ( //iridescence
                                tech.laserCrit && !best.who.shield &&
                                Vector.dot(Vector.normalise(Vector.sub(best.who.position, path[path.length - 1])), Vector.normalise(Vector.sub(path[path.length - 1], path[path.length - 2]))) > 0.999 - 0.5 / best.who.radius
                            ) {
                                damage *= 1 + tech.laserCrit
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: path[path.length - 1].x,
                                    y: path[path.length - 1].y,
                                    radius: Math.sqrt(2500 * damage * best.who.damageReduction) + 5,
                                    color: `hsla(${60 + 283 * Math.random()},100%,70%,0.5)`, // random hue, but not red
                                    time: 16
                                });
                            } else {
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: path[path.length - 1].x,
                                    y: path[path.length - 1].y,
                                    radius: Math.sqrt(2000 * damage * best.who.damageReduction) + 2,
                                    color: tech.laserColorAlpha,
                                    time: simulation.drawTime
                                });
                            }
                            best.who.damage(damage);
                        }
                        if (tech.isLaserPush) { //push mobs away
                            const index = path.length - 1
                            Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.97, y: best.who.velocity.y * 0.97 });
                            const force = Vector.mult(Vector.normalise(Vector.sub(path[index], path[Math.max(0, index - 1)])), 0.003 * push * Math.min(6, best.who.mass))
                            Matter.Body.applyForce(best.who, path[index], force)
                        }
                    } else if (tech.isLaserPush && best.who.classType === "body") {
                        const index = path.length - 1
                        Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.97, y: best.who.velocity.y * 0.97 });
                        const force = Vector.mult(Vector.normalise(Vector.sub(path[index], path[Math.max(0, index - 1)])), 0.003 * push * Math.min(6, best.who.mass))
                        Matter.Body.applyForce(best.who, path[index], force)
                    }
                };
                const reflection = function () { // https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
                    const n = Vector.perp(Vector.normalise(Vector.sub(best.v1, best.v2)));
                    const d = Vector.sub(path[path.length - 1], path[path.length - 2]);
                    const nn = Vector.mult(n, 2 * Vector.dot(d, n));
                    const r = Vector.normalise(Vector.sub(d, nn));
                    path[path.length] = Vector.add(Vector.mult(r, 3000), path[path.length - 1]);
                };

                checkForCollisions();
                let lastBestOdd
                let lastBestEven = best.who //used in hack below
                if (best.dist2 !== Infinity) { //if hitting something
                    path[path.length - 1] = { x: best.x, y: best.y };
                    laserHitMob();
                    for (let i = 0; i < tech.laserReflections; i++) {
                        reflection();
                        checkForCollisions();
                        if (best.dist2 !== Infinity) { //if hitting something
                            lastReflection = best
                            path[path.length - 1] = { x: best.x, y: best.y };
                            damage *= reflectivity
                            laserHitMob();
                            //I'm not clear on how this works, but it gets rid of a bug where the laser reflects inside a block, often vertically.
                            //I think it checks to see if the laser is reflecting off a different part of the same block, if it is "inside" a block
                            if (i % 2) {
                                if (lastBestOdd === best.who) break
                            } else {
                                lastBestOdd = best.who
                                if (lastBestEven === best.who) break
                            }
                        } else {
                            break
                        }
                    }
                }
                ctx.strokeStyle = tech.laserColor;
                ctx.lineWidth = 2
                ctx.lineDashOffset = 900 * Math.random()
                ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
                for (let i = 1, len = path.length; i < len; ++i) {
                    ctx.beginPath();
                    ctx.moveTo(path[i - 1].x, path[i - 1].y);
                    ctx.lineTo(path[i].x, path[i].y);
                    ctx.stroke();
                    ctx.globalAlpha *= reflectivity; //reflections are less intense
                }
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    boomBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        const RADIUS = (7 + 2 * Math.random())
        bullet[me] = Bodies.polygon(position.x, position.y, 4, RADIUS, {
            isUpgraded: tech.isBoomBotUpgrade,
            botType: "boom",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.05,
            restitution: 1,
            dmg: 0,
            minDmgSpeed: 0,
            lookFrequency: 43 + Math.floor(7 * Math.random()) - 15 * tech.isBoomBotUpgrade,
            acceleration: (isKeep ? 0.005 : 0.001) * (1 + 0.5 * Math.random()),
            attackAcceleration: 0.012 + 0.005 * tech.isBoomBotUpgrade,
            range: 500 * (1 + 0.1 * Math.random()) + 250 * tech.isBoomBotUpgrade + !isKeep * 100,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            lockedOn: null,
            explode: 0,
            beforeDmg() {
                if (this.lockedOn) {
                    const explosionRadius = Math.min(136 + 230 * this.isUpgraded, Vector.magnitude(Vector.sub(this.position, m.pos)) - 30)
                    if (explosionRadius > 60) {
                        this.explode = explosionRadius
                        // 
                        //push away from player, because normal explosion knock doesn't do much
                        // const sub = Vector.sub(this.lockedOn.position, m.pos)
                        // mag = Math.min(35, 20 / Math.sqrt(this.lockedOn.mass))
                        // Matter.Body.setVelocity(this.lockedOn, Vector.mult(Vector.normalise(sub), mag))
                    }
                    this.lockedOn = null //lose target so bot returns to player
                }
            },
            onEnd() { },
            do() {
                const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, player.position))
                if (distanceToPlayer > 100) { //if far away move towards player
                    if (this.explode) {
                        // if (tech.isImmuneExplosion && m.energy > 1.43) {
                        //     b.explosion(this.position, this.explode);
                        // } else {
                        // }
                        b.explosion(this.position, Math.max(0, Math.min(this.explode, (distanceToPlayer - 70) / b.explosionRange())));
                        this.explode = 0;
                    }
                    this.force = Vector.mult(Vector.normalise(Vector.sub(player.position, this.position)), this.mass * this.acceleration)
                } else if (distanceToPlayer < 250) { //close to player
                    Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity
                    //find targets
                    if (!(simulation.cycle % this.lookFrequency) && !m.isCloak) {
                        this.lockedOn = null;
                        let closeDist = this.range;
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            const DIST = Vector.magnitude(Vector.sub(this.position, mob[i].position)) - mob[i].radius;
                            if (
                                DIST < closeDist &&
                                !mob[i].isBadTarget &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                                !mob[i].isInvulnerable
                            ) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                }
                //punch target
                if (this.lockedOn && this.lockedOn.alive && !m.isCloak) {
                    const DIST = Vector.magnitude(Vector.sub(this.vertices[0], this.lockedOn.position));
                    if (DIST - this.lockedOn.radius < this.range &&
                        Matter.Query.ray(map, this.position, this.lockedOn.position).length === 0) {
                        //move towards the target
                        this.force = Vector.add(this.force, Vector.mult(Vector.normalise(Vector.sub(this.lockedOn.position, this.position)), this.attackAcceleration * this.mass))
                    }
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    plasmaBot(position = { x: player.position.x + 50 * (Math.random() - 0.5), y: player.position.y + 50 * (Math.random() - 0.5) }, isKeep = true) {
        const me = bullet.length;
        const dir = m.angle;
        const RADIUS = 21
        bullet[me] = Bodies.polygon(position.x, position.y, 5, RADIUS, {
            botType: "plasma",
            angle: dir,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0.05,
            restitution: 1,
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 2,
            lookFrequency: 25,
            cd: 0,
            acceleration: 0.009,
            endCycle: Infinity,
            drainThreshold: tech.isEnergyHealth ? 0.5 : 0.05,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: b.totalBots() < 50 ? cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield : cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield //if over 50 bots, they no longer collide with each other
            },
            lockedOn: null,
            beforeDmg() {
                this.lockedOn = null
            },
            onEnd() { },
            do() {
                const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, m.pos))
                if (distanceToPlayer > 150) this.force = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.position)), this.mass * this.acceleration) //if far away move towards player
                Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.90), Vector.mult(player.velocity, 0.17))); //add player's velocity

                if (!(simulation.cycle % this.lookFrequency)) { //find closest
                    this.lockedOn = null;
                    if (!m.isCloak) {
                        let closeDist = tech.isPlasmaRange * 1000;
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            const DIST = Vector.magnitude(Vector.sub(this.position, mob[i].position)) - mob[i].radius;
                            if (
                                DIST < closeDist && (!mob[i].isBadTarget || mob[i].isMobBullet) &&
                                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                                Matter.Query.ray(body, this.position, mob[i].position).length === 0 &&
                                !mob[i].isInvulnerable
                            ) {
                                closeDist = DIST;
                                this.lockedOn = mob[i]
                            }
                        }
                    }
                }
                //fire plasma at target
                if (this.lockedOn && this.lockedOn.alive && m.fieldCDcycle < m.cycle) {
                    const sub = Vector.sub(this.lockedOn.position, this.position)
                    const DIST = Vector.magnitude(sub);
                    const unit = Vector.normalise(sub)
                    if (DIST < tech.isPlasmaRange * 450 && m.energy > this.drainThreshold) {
                        m.energy -= 0.001
                        //calculate laser collision
                        let best;
                        let range = tech.isPlasmaRange * (120 + 300 * Math.sqrt(Math.random()))
                        const path = [{ x: this.position.x, y: this.position.y }, { x: this.position.x + range * unit.x, y: this.position.y + range * unit.y }];
                        //check for collisions
                        best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                        best = vertexCollision(path[0], path[1], [mob, map, body]);
                        if (best.dist2 != Infinity) { //if hitting something
                            path[path.length - 1] = { x: best.x, y: best.y };
                            if (best.who.alive) {
                                const dmg = 1.4 * m.dmgScale; //********** SCALE DAMAGE HERE *********************
                                best.who.damage(dmg);
                                best.who.locatePlayer();
                                //push mobs away
                                // const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.007 * Math.min(5, best.who.mass))
                                // Matter.Body.applyForce(best.who, path[1], force)
                                //push mobs away
                                if (best.who.speed > 3) {
                                    const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.004 * Math.min(5, best.who.mass))
                                    Matter.Body.applyForce(best.who, path[1], force)
                                    Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.5, y: best.who.velocity.y * 0.5 });
                                } else {
                                    const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.01 * Math.min(5, best.who.mass))
                                    Matter.Body.applyForce(best.who, path[1], force)
                                    Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.7, y: best.who.velocity.y * 0.7 });
                                }

                                if (best.who.speed > 2.5) Matter.Body.setVelocity(best.who, { x: best.who.velocity.x * 0.75, y: best.who.velocity.y * 0.75 });
                                //draw mob damage circle
                                if (best.who.damageReduction) {
                                    simulation.drawList.push({
                                        x: path[1].x,
                                        y: path[1].y,
                                        // radius: Math.sqrt(dmg) * 50 * mob[k].damageReduction,
                                        // radius: 600 * dmg * best.who.damageReduction,
                                        radius: Math.sqrt(2000 * dmg * best.who.damageReduction) + 2,
                                        color: "rgba(255,0,255,0.2)",
                                        time: simulation.drawTime * 4
                                    });
                                }
                            } else if (!best.who.isStatic) {
                                //push blocks away
                                const force = Vector.mult(Vector.normalise(Vector.sub(m.pos, path[1])), -0.007 * Math.sqrt(Math.sqrt(best.who.mass)))
                                Matter.Body.applyForce(best.who, path[1], force)
                            }
                        }
                        //draw blowtorch laser beam
                        ctx.beginPath();
                        ctx.moveTo(path[0].x, path[0].y);
                        ctx.lineTo(path[1].x, path[1].y);
                        ctx.strokeStyle = "rgba(255,0,255,0.1)"
                        ctx.lineWidth = 14
                        ctx.stroke();
                        ctx.strokeStyle = "#f0f";
                        ctx.lineWidth = 2
                        ctx.stroke();
                        //draw electricity
                        let x = this.position.x + 20 * unit.x;
                        let y = this.position.y + 20 * unit.y;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        const step = Vector.magnitude(Vector.sub(path[0], path[1])) / 5
                        for (let i = 0; i < 4; i++) {
                            x += step * (unit.x + 1.5 * (Math.random() - 0.5))
                            y += step * (unit.y + 1.5 * (Math.random() - 0.5))
                            ctx.lineTo(x, y);
                        }
                        ctx.lineWidth = 2 * Math.random();
                        ctx.stroke();
                    }
                }
            }
        })
        Composite.add(engine.world, bullet[me]); //add bullet to world
    },
    orbitBot(position = player.position, isKeep = true) {
        const me = bullet.length;
        bullet[me] = Bodies.polygon(position.x, position.y, 9, 12, {
            isUpgraded: tech.isOrbitBotUpgrade,
            botType: "orbit",
            friction: 0,
            frictionStatic: 0,
            frictionAir: 1,
            isStatic: true,
            isSensor: true,
            isKeep: isKeep,
            restitution: 0,
            dmg: 0, // 0.14   //damage done in addition to the damage from momentum
            minDmgSpeed: 0,
            endCycle: Infinity,
            classType: "bullet",
            collisionFilter: {
                category: cat.bullet,
                mask: 0 //cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
            },
            beforeDmg() { },
            onEnd() {
                //reorder orbital bot positions around a circle
                let totalOrbitalBots = 0
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].botType === 'orbit' && bullet[i] !== this && bullet[i].isKeep) totalOrbitalBots++
                }
                let index = 0
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].botType === 'orbit' && bullet[i] !== this && bullet[i].isKeep) {
                        bullet[i].phase = (index / totalOrbitalBots) * 2 * Math.PI
                        index++
                    }
                }
            },
            range: 160 + 170 * tech.isOrbitBotUpgrade + !isKeep * 100 * (0.5 - Math.random()), //range is set in bot upgrade too!
            orbitalSpeed: 0,
            phase: 2 * Math.PI * Math.random(),
            do() {
                if (!m.isCloak) { //if time dilation isn't active
                    const size = 40
                    q = Matter.Query.region(mob, {
                        min: {
                            x: this.position.x - size,
                            y: this.position.y - size
                        },
                        max: {
                            x: this.position.x + size,
                            y: this.position.y + size
                        }
                    })
                    for (let i = 0; i < q.length; i++) {
                        if (!q[i].isShielded) {
                            mobs.statusStun(q[i], 210 + 90 * this.isUpgraded)
                            const dmg = 0.4 * m.dmgScale * (this.isUpgraded ? 4.5 : 1) * (tech.isCrit ? 4 : 1)
                            q[i].damage(dmg);
                            if (q[i].alive) q[i].foundPlayer();
                            if (q[i].damageReduction) {
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: this.position.x,
                                    y: this.position.y,
                                    // radius: 600 * dmg * q[i].damageReduction,
                                    radius: Math.sqrt(2000 * dmg * q[i].damageReduction) + 2,
                                    color: 'rgba(0,0,0,0.4)',
                                    time: simulation.drawTime
                                });
                            }
                        }
                    }
                }
                //orbit player
                const time = simulation.cycle * this.orbitalSpeed + this.phase
                const orbit = { x: Math.cos(time), y: Math.sin(time) }
                Matter.Body.setPosition(this, Vector.add(m.pos, Vector.mult(orbit, this.range))) //bullets move with player
            }
        })
        // bullet[me].orbitalSpeed = Math.sqrt(0.7 / bullet[me].range)
        bullet[me].orbitalSpeed = Math.sqrt(0.25 / bullet[me].range) //also set in bot upgrade too!
        // bullet[me].phase = (index / tech.orbitBotCount) * 2 * Math.PI
        Composite.add(engine.world, bullet[me]); //add bullet to world

        //reorder orbital bot positions around a circle
        let totalOrbitalBots = 0
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType === 'orbit' && bullet[i].isKeep) totalOrbitalBots++
        }
        let index = 0
        for (let i = 0; i < bullet.length; i++) {
            if (bullet[i].botType === 'orbit' && bullet[i].isKeep) {
                bullet[i].phase = (index / totalOrbitalBots) * 2 * Math.PI
                index++
            }
        }
    },
    // **************************************************************************************************
    // **************************************************************************************************
    // ********************************         Guns        *********************************************
    // **************************************************************************************************
    // **************************************************************************************************
    //0 nail gun
    //1 shotgun
    //2 super balls
    //3 wave
    //4 missiles
    //5 grenades
    //6 spores
    //7 drones
    //8 foam
    //9 harpoon
    //10 mine
    //11 laser
    guns: [
        {
            name: "nail gun", // 0
            // description: `use compressed air to shoot a stream of <strong>nails</strong><br><em>fire rate</em> <strong>increases</strong> the longer you fire<br><strong>60</strong> nails per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `use compressed air to rapidly drive <strong>nails</strong><br><em>fire rate</em> <strong>increases</strong> the longer you fire<br><strong>${this.ammoPack.toFixed(0)}</strong> nails per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 27,
            defaultAmmoPack: 27,
            recordedAmmo: 0,
            have: false,
            nextFireCycle: 0, //use to remember how longs its been since last fire, used to reset count
            startingHoldCycle: 0,
            chooseFireMethod() { //set in simulation.startGame
                if (tech.nailRecoil) {
                    if (tech.isRivets) {
                        this.fire = this.fireRecoilRivets
                    } else {
                        this.fire = this.fireRecoilNails
                    }
                } else if (tech.isRivets) {
                    this.fire = this.fireRivets
                } else if (tech.isNeedles) {
                    this.fire = this.fireNeedles
                } else if (tech.nailInstantFireRate) {
                    this.fire = this.fireInstantFireRate
                    // } else if (tech.nailFireRate) {
                    // this.fire = this.fireNailFireRate
                } else {
                    this.fire = this.fireNormal
                }
            },
            do() { },
            fire() { },
            fireRecoilNails() {
                if (this.nextFireCycle + 1 < m.cycle) this.startingHoldCycle = m.cycle //reset if not constantly firing
                const CD = Math.max(11 - 0.06 * (m.cycle - this.startingHoldCycle), 0.99) //CD scales with cycles fire is held down
                this.nextFireCycle = m.cycle + CD * b.fireCDscale //predict next fire cycle if the fire button is held down

                m.fireCDcycle = m.cycle + Math.floor(CD * b.fireCDscale); // cool down
                this.baseFire(m.angle + (Math.random() - 0.5) * (m.crouch ? 0.04 : 0.13) / CD, 45 + 6 * Math.random())
                //very complex recoil system
                if (m.onGround) {
                    if (m.crouch) {
                        const KNOCK = 0.006
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x * 0.5,
                            y: player.velocity.y * 0.5
                        });
                    } else {
                        const KNOCK = 0.03
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x * 0.8,
                            y: player.velocity.y * 0.8
                        });
                    }
                } else {
                    player.force.x -= 0.06 * Math.cos(m.angle) * Math.min(1, 3 / (0.1 + Math.abs(player.velocity.x)))
                    player.force.y -= 0.006 * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                }
            },
            fireNormal() {
                if (this.nextFireCycle + 1 < m.cycle) this.startingHoldCycle = m.cycle //reset if not constantly firing
                const CD = Math.max(11 - 0.06 * (m.cycle - this.startingHoldCycle), 1) //CD scales with cycles fire is held down
                this.nextFireCycle = m.cycle + CD * b.fireCDscale //predict next fire cycle if the fire button is held down

                m.fireCDcycle = m.cycle + Math.floor(CD * b.fireCDscale); // cool down
                this.baseFire(m.angle + (Math.random() - 0.5) * (m.crouch ? 0.05 : 0.3) / CD)
            },
            fireNeedles() {
                if (m.crouch) {
                    m.fireCDcycle = m.cycle + 30 * b.fireCDscale; // cool down
                    b.needle()

                    function cycle() {
                        if (simulation.paused || m.isTimeDilated) {
                            requestAnimationFrame(cycle)
                        } else {
                            count++
                            if (count % 2) b.needle()
                            if (count < 7 && m.alive) requestAnimationFrame(cycle);
                        }
                    }
                    let count = -1
                    requestAnimationFrame(cycle);
                } else {
                    m.fireCDcycle = m.cycle + 22 * b.fireCDscale; // cool down
                    b.needle()

                    function cycle() {
                        if (simulation.paused || m.isTimeDilated) {
                            requestAnimationFrame(cycle)
                        } else {
                            count++
                            if (count % 2) b.needle()
                            if (count < 3 && m.alive) requestAnimationFrame(cycle);
                        }
                    }
                    let count = -1
                    requestAnimationFrame(cycle);
                }
            },
            fireRivets() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 22 : 14) * b.fireCDscale); // cool down
                const me = bullet.length;
                const size = tech.bulletSize * 8
                bullet[me] = Bodies.rectangle(m.pos.x + 35 * Math.cos(m.angle), m.pos.y + 35 * Math.sin(m.angle), 5 * size, size, b.fireAttributes(m.angle));
                bullet[me].dmg = tech.isNailRadiation ? 0 : 2.75
                Matter.Body.setDensity(bullet[me], 0.002);
                Composite.add(engine.world, bullet[me]); //add bullet to world
                const SPEED = m.crouch ? 60 : 44
                Matter.Body.setVelocity(bullet[me], {
                    x: SPEED * Math.cos(m.angle),
                    y: SPEED * Math.sin(m.angle)
                });
                bullet[me].endCycle = simulation.cycle + 180

                bullet[me].beforeDmg = function (who) { //beforeDmg is rewritten with ice crystal tech
                    if (tech.isIncendiary) {
                        this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                        b.explosion(this.position, 100 + (Math.random() - 0.5) * 20); //makes bullet do explosive damage at end
                    }
                    if (tech.isNailCrit) {
                        if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                            b.explosion(this.position, 300 + 40 * Math.random()); //makes bullet do explosive damage at end
                        }
                    } else if (tech.isCritKill) b.crit(who, this)
                    if (tech.isNailRadiation) mobs.statusDoT(who, 7 * (tech.isFastRadiation ? 0.7 : 0.24), tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
                    if (this.speed > 4 && tech.fragments) {
                        b.targetedNail(this.position, 1.25 * tech.fragments * tech.bulletSize)
                        this.endCycle = 0 //triggers despawn
                    }
                };

                bullet[me].minDmgSpeed = 10
                bullet[me].frictionAir = 0.006;
                bullet[me].rotateToVelocity = function () { //rotates bullet to face current velocity?
                    if (this.speed > 7) {
                        const facing = {
                            x: Math.cos(this.angle),
                            y: Math.sin(this.angle)
                        }
                        const mag = 0.002 * this.mass
                        if (Vector.cross(Vector.normalise(this.velocity), facing) < 0) {
                            this.torque += mag
                        } else {
                            this.torque -= mag
                        }
                    }
                };
                if (tech.isIncendiary) {
                    bullet[me].do = function () {
                        this.force.y += this.mass * 0.0008
                        this.rotateToVelocity()
                        //collide with map
                        if (Matter.Query.collides(this, map).length) { //penetrate walls
                            this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            b.explosion(this.position, 300 + 40 * Math.random()); //makes bullet do explosive damage at end
                        }
                    };
                } else {
                    bullet[me].do = function () {
                        this.force.y += this.mass * 0.0008
                        this.rotateToVelocity()
                    };
                }
                b.muzzleFlash();
                //very complex recoil system
                if (m.onGround) {
                    if (m.crouch) {
                        const KNOCK = 0.01
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                    } else {
                        const KNOCK = 0.02
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                    }
                } else {
                    const KNOCK = 0.01
                    player.force.x -= KNOCK * Math.cos(m.angle)
                    player.force.y -= KNOCK * Math.sin(m.angle) * 0.5 //reduce knock back in vertical direction to stop super jumps    
                }
            },
            fireRecoilRivets() {
                // m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 25 : 17) * b.fireCDscale); // cool down
                if (this.nextFireCycle + 1 < m.cycle) this.startingHoldCycle = m.cycle //reset if not constantly firing
                const CD = Math.max(25 - 0.14 * (m.cycle - this.startingHoldCycle), 5) //CD scales with cycles fire is held down
                this.nextFireCycle = m.cycle + CD * b.fireCDscale //predict next fire cycle if the fire button is held down
                m.fireCDcycle = m.cycle + Math.floor(CD * b.fireCDscale); // cool down

                const me = bullet.length;
                const size = tech.bulletSize * 8
                bullet[me] = Bodies.rectangle(m.pos.x + 35 * Math.cos(m.angle), m.pos.y + 35 * Math.sin(m.angle), 5 * size, size, b.fireAttributes(m.angle));
                bullet[me].dmg = tech.isNailRadiation ? 0 : 2.75
                Matter.Body.setDensity(bullet[me], 0.002);
                Composite.add(engine.world, bullet[me]); //add bullet to world
                const SPEED = m.crouch ? 62 : 52
                Matter.Body.setVelocity(bullet[me], {
                    x: SPEED * Math.cos(m.angle),
                    y: SPEED * Math.sin(m.angle)
                });
                bullet[me].endCycle = simulation.cycle + 180
                bullet[me].beforeDmg = function (who) { //beforeDmg is rewritten with ice crystal tech
                    if (tech.isIncendiary) {
                        this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                        b.explosion(this.position, 100 + (Math.random() - 0.5) * 20); //makes bullet do explosive damage at end
                    }
                    if (tech.isNailCrit) {
                        if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                            b.explosion(this.position, 300 + 40 * Math.random()); //makes bullet do explosive damage at end
                        }
                    } else if (tech.isCritKill) b.crit(who, this)
                    if (tech.isNailRadiation) mobs.statusDoT(who, 7 * (tech.isFastRadiation ? 0.7 : 0.24), tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
                    if (this.speed > 4 && tech.fragments) {
                        b.targetedNail(this.position, 1.25 * tech.fragments * tech.bulletSize)
                        this.endCycle = 0 //triggers despawn
                    }
                };

                bullet[me].minDmgSpeed = 10
                bullet[me].frictionAir = 0.006;
                bullet[me].rotateToVelocity = function () { //rotates bullet to face current velocity?
                    if (this.speed > 7) {
                        const facing = {
                            x: Math.cos(this.angle),
                            y: Math.sin(this.angle)
                        }
                        const mag = 0.002 * this.mass
                        if (Vector.cross(Vector.normalise(this.velocity), facing) < 0) {
                            this.torque += mag
                        } else {
                            this.torque -= mag
                        }
                    }
                };
                if (tech.isIncendiary) {
                    bullet[me].do = function () {
                        this.force.y += this.mass * 0.0008
                        this.rotateToVelocity()
                        //collide with map
                        if (Matter.Query.collides(this, map).length) { //penetrate walls
                            this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            b.explosion(this.position, 100 + (Math.random() - 0.5) * 20); //makes bullet do explosive damage at end
                        }
                    };
                } else {
                    bullet[me].do = function () {
                        this.force.y += this.mass * 0.0008
                        this.rotateToVelocity()
                    };
                }

                b.muzzleFlash();
                //very complex recoil system
                if (m.onGround) {
                    if (m.crouch) {
                        const KNOCK = 0.03
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x * 0.4,
                            y: player.velocity.y * 0.4
                        });
                    } else {
                        const KNOCK = 0.1
                        player.force.x -= KNOCK * Math.cos(m.angle)
                        player.force.y -= KNOCK * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x * 0.7,
                            y: player.velocity.y * 0.7
                        });
                    }
                } else {
                    player.force.x -= 0.2 * Math.cos(m.angle) * Math.min(1, 3 / (0.1 + Math.abs(player.velocity.x)))
                    // player.force.x -= 0.06 * Math.cos(m.angle) * Math.min(1, 3 / (0.1 + Math.abs(player.velocity.x)))

                    player.force.y -= 0.02 * Math.sin(m.angle) //reduce knock back in vertical direction to stop super jumps
                }
            },
            fireInstantFireRate() {
                m.fireCDcycle = m.cycle + Math.floor(1 * b.fireCDscale); // cool down
                this.baseFire(m.angle + (Math.random() - 0.5) * (Math.random() - 0.5) * (m.crouch ? 1.15 : 2) / 2)
            },
            baseFire(angle, speed = 30 + 6 * Math.random()) {
                b.nail({
                    x: m.pos.x + 30 * Math.cos(m.angle),
                    y: m.pos.y + 30 * Math.sin(m.angle)
                }, {
                    x: 0.8 * player.velocity.x + speed * Math.cos(angle),
                    y: 0.5 * player.velocity.y + speed * Math.sin(angle)
                }) //position, velocity, damage
                if (tech.isIceCrystals) {
                    bullet[bullet.length - 1].beforeDmg = function (who) {
                        mobs.statusSlow(who, 60)
                        if (tech.isNailRadiation) mobs.statusDoT(who, 1 * (tech.isFastRadiation ? 1.3 : 0.44), tech.isSlowRadiation ? 360 : (tech.isFastRadiation ? 60 : 180)) // one tick every 30 cycles
                        if (tech.isNailCrit) {
                            if (!who.shield && Vector.dot(Vector.normalise(Vector.sub(who.position, this.position)), Vector.normalise(this.velocity)) > 0.97 - 1 / who.radius) {
                                b.explosion(this.position, 150 + 30 * Math.random()); //makes bullet do explosive damage at end
                            }
                        }
                        this.ricochet(who)
                    };
                    if (m.energy < 0.01) {
                        m.fireCDcycle = m.cycle + 60; // cool down
                    } else {
                        m.energy -= 0.01
                    }
                }
            },
        },
        {
            name: "shotgun", //1
            // description: `fire a wide <strong>burst</strong> of short range <strong> bullets</strong><br>with a low <strong><em>fire rate</em></strong><br><strong>3-4</strong> nails per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `fire a wide <strong>burst</strong> of short range <strong>pellets</strong><br>has a slow <strong><em>fire rate</em></strong><br><strong>${this.ammoPack.toFixed(1)}</strong> shots per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 1.6,
            defaultAmmoPack: 1.6,
            have: false,
            do() {
                //fade cross hairs



                // draw loop around player head
                // const left = m.fireCDcycle !== Infinity ? 0.05 * Math.max(m.fireCDcycle - m.cycle, 0) : 0
                // if (left > 0) {
                //     ctx.beginPath();
                //     // ctx.arc(simulation.mouseInGame.x, simulation.mouseInGame.y, 30, 0, left);
                //     ctx.arc(m.pos.x, m.pos.y, 28, m.angle - left, m.angle);
                //     // ctx.fillStyle = "rgba(0,0,0,0.3)" //"#333"
                //     // ctx.fill();
                //     ctx.strokeStyle = "#333";
                //     ctx.lineWidth = 2;
                //     ctx.stroke();
                // }


                //draw hip circle
                // ctx.beginPath();
                // ctx.arc(m.pos.x + m.hip.x, m.pos.y + m.hip.y, 11, 0, 2 * Math.PI);
                // ctx.fillStyle = "rgba(0,0,0,0.3)" //"#333"
                // ctx.fill();
            },
            fire() {
                let knock, spread
                const coolDown = function () {
                    if (m.crouch) {
                        spread = 0.65
                        m.fireCDcycle = m.cycle + Math.floor((73 + 36 * tech.shotgunExtraShots) * b.fireCDscale) // cool down
                        if (tech.isShotgunImmune && m.immuneCycle < m.cycle + Math.floor(60 * b.fireCDscale)) m.immuneCycle = m.cycle + Math.floor(60 * b.fireCDscale); //player is immune to damage for 30 cycles
                        knock = 0.01
                    } else {
                        m.fireCDcycle = m.cycle + Math.floor((56 + 28 * tech.shotgunExtraShots) * b.fireCDscale) // cool down
                        if (tech.isShotgunImmune && m.immuneCycle < m.cycle + Math.floor(47 * b.fireCDscale)) m.immuneCycle = m.cycle + Math.floor(47 * b.fireCDscale); //player is immune to damage for 30 cycles
                        spread = 1.3
                        knock = 0.1
                    }

                    if (tech.isShotgunReversed) {
                        player.force.x += 1.5 * knock * Math.cos(m.angle)
                        player.force.y += 1.5 * knock * Math.sin(m.angle) - 3 * player.mass * simulation.g
                    } else if (tech.isShotgunRecoil) {
                        m.fireCDcycle -= 0.66 * (56 * b.fireCDscale)
                        player.force.x -= 2 * knock * Math.cos(m.angle)
                        player.force.y -= 2 * knock * Math.sin(m.angle)
                    } else {
                        player.force.x -= knock * Math.cos(m.angle)
                        player.force.y -= knock * Math.sin(m.angle) * 0.5 //reduce knock back in vertical direction to stop super jumps
                    }
                }
                const spray = (num) => {
                    const side = 22
                    for (let i = 0; i < num; i++) {
                        const me = bullet.length;
                        const dir = m.angle + (Math.random() - 0.5) * spread
                        bullet[me] = Bodies.rectangle(m.pos.x, m.pos.y, side, side, b.fireAttributes(dir));
                        Composite.add(engine.world, bullet[me]); //add bullet to world
                        const SPEED = 52 + Math.random() * 8
                        Matter.Body.setVelocity(bullet[me], {
                            x: SPEED * Math.cos(dir),
                            y: SPEED * Math.sin(dir)
                        });
                        bullet[me].endCycle = simulation.cycle + 40 * tech.bulletsLastLonger
                        bullet[me].minDmgSpeed = 15
                        if (tech.isShotgunReversed) Matter.Body.setDensity(bullet[me], 0.0015)
                        // bullet[me].restitution = 0.4
                        bullet[me].frictionAir = 0.034;
                        bullet[me].do = function () {
                            const scale = 1 - 0.034 / tech.bulletsLastLonger
                            Matter.Body.scale(this, scale, scale);
                        };
                    }
                }
                const chooseBulletType = function () {
                    if (tech.isRivets) {
                        const me = bullet.length;
                        // const dir = m.angle + 0.02 * (Math.random() - 0.5)
                        bullet[me] = Bodies.rectangle(m.pos.x + 35 * Math.cos(m.angle), m.pos.y + 35 * Math.sin(m.angle), 56 * tech.bulletSize, 25 * tech.bulletSize, b.fireAttributes(m.angle));

                        Matter.Body.setDensity(bullet[me], 0.005 * (tech.isShotgunReversed ? 1.5 : 1));
                        Composite.add(engine.world, bullet[me]); //add bullet to world
                        const SPEED = (m.crouch ? 50 : 43)
                        Matter.Body.setVelocity(bullet[me], {
                            x: SPEED * Math.cos(m.angle),
                            y: SPEED * Math.sin(m.angle)
                        });
                        if (tech.isIncendiary) {
                            bullet[me].endCycle = simulation.cycle + 60
                            bullet[me].onEnd = function () {
                                b.explosion(this.position, 400 + (Math.random() - 0.5) * 60); //makes bullet do explosive damage at end
                            }
                            bullet[me].beforeDmg = function () {
                                this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            };
                        } else {
                            bullet[me].endCycle = simulation.cycle + 180
                        }
                        bullet[me].minDmgSpeed = 7
                        // bullet[me].restitution = 0.4
                        bullet[me].frictionAir = 0.004;
                        bullet[me].turnMag = 0.04 * Math.pow(tech.bulletSize, 3.75)
                        bullet[me].do = function () {
                            this.force.y += this.mass * 0.002
                            if (this.speed > 6) { //rotates bullet to face current velocity?
                                const facing = {
                                    x: Math.cos(this.angle),
                                    y: Math.sin(this.angle)
                                }
                                if (Vector.cross(Vector.normalise(this.velocity), facing) < 0) {
                                    this.torque += this.turnMag
                                } else {
                                    this.torque -= this.turnMag
                                }
                            }
                            if (tech.isIncendiary && Matter.Query.collides(this, map).length) {
                                this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            }
                        };
                        bullet[me].beforeDmg = function (who) {
                            if (this.speed > 4) {
                                if (tech.fragments) {
                                    b.targetedNail(this.position, 6 * tech.fragments * tech.bulletSize)
                                    this.endCycle = 0 //triggers despawn
                                }
                                if (tech.isIncendiary) this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                                if (tech.isCritKill) b.crit(who, this)
                            }
                        }
                        spray(12); //fires normal shotgun bullets
                    } else if (tech.isIncendiary) {
                        spread *= 0.15
                        const END = Math.floor(m.crouch ? 8 : 5);
                        const totalBullets = 9
                        const angleStep = (m.crouch ? 0.3 : 0.8) / totalBullets
                        let dir = m.angle - angleStep * totalBullets / 2;
                        for (let i = 0; i < totalBullets; i++) { //5 -> 7
                            dir += angleStep
                            const me = bullet.length;
                            bullet[me] = Bodies.rectangle(m.pos.x + 50 * Math.cos(m.angle), m.pos.y + 50 * Math.sin(m.angle), 17, 4, b.fireAttributes(dir));
                            const end = END + Math.random() * 4
                            bullet[me].endCycle = 2 * end * tech.bulletsLastLonger + simulation.cycle
                            const speed = 25 * end / END
                            const dirOff = dir + (Math.random() - 0.5) * spread
                            Matter.Body.setVelocity(bullet[me], {
                                x: speed * Math.cos(dirOff),
                                y: speed * Math.sin(dirOff)
                            });
                            bullet[me].onEnd = function () {
                                b.explosion(this.position, 180 * (tech.isShotgunReversed ? 1.4 : 1) + (Math.random() - 0.5) * 30); //makes bullet do explosive damage at end
                            }
                            bullet[me].beforeDmg = function () {
                                this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            };
                            bullet[me].do = function () {
                                if (Matter.Query.collides(this, map).length) this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
                            }
                            Composite.add(engine.world, bullet[me]); //add bullet to world
                        }
                    } else if (tech.isNailShot) {
                        spread *= 0.65
                        const dmg = 2 * (tech.isShotgunReversed ? 1.5 : 1)
                        if (m.crouch) {
                            for (let i = 0; i < 17; i++) {
                                speed = 38 + 15 * Math.random()
                                const dir = m.angle + (Math.random() - 0.5) * spread
                                const pos = {
                                    x: m.pos.x + 35 * Math.cos(m.angle) + 15 * (Math.random() - 0.5),
                                    y: m.pos.y + 35 * Math.sin(m.angle) + 15 * (Math.random() - 0.5)
                                }
                                b.nail(pos, {
                                    x: speed * Math.cos(dir),
                                    y: speed * Math.sin(dir)
                                }, dmg)
                            }
                        } else {
                            for (let i = 0; i < 17; i++) {
                                speed = 38 + 15 * Math.random()
                                const dir = m.angle + (Math.random() - 0.5) * spread
                                const pos = {
                                    x: m.pos.x + 35 * Math.cos(m.angle) + 15 * (Math.random() - 0.5),
                                    y: m.pos.y + 35 * Math.sin(m.angle) + 15 * (Math.random() - 0.5)
                                }
                                b.nail(pos, {
                                    x: speed * Math.cos(dir),
                                    y: speed * Math.sin(dir)
                                }, dmg)
                            }
                        }
                    } else if (tech.isSporeFlea) {
                        const where = {
                            x: m.pos.x + 35 * Math.cos(m.angle),
                            y: m.pos.y + 35 * Math.sin(m.angle)
                        }
                        const number = 2 * (tech.isShotgunReversed ? 1.5 : 1)
                        for (let i = 0; i < number; i++) {
                            const angle = m.angle + 0.2 * (Math.random() - 0.5)
                            const speed = (m.crouch ? 35 * (1 + 0.05 * Math.random()) : 30 * (1 + 0.15 * Math.random()))
                            b.flea(where, {
                                x: speed * Math.cos(angle),
                                y: speed * Math.sin(angle)
                            })
                            bullet[bullet.length - 1].setDamage()
                        }
                        spray(10); //fires normal shotgun bullets
                    } else if (tech.isSporeWorm) {
                        const where = {
                            x: m.pos.x + 35 * Math.cos(m.angle),
                            y: m.pos.y + 35 * Math.sin(m.angle)
                        }
                        const spread = (m.crouch ? 0.02 : 0.07)
                        const number = 3 * (tech.isShotgunReversed ? 1.5 : 1)
                        let angle = m.angle - (number - 1) * spread * 0.5
                        for (let i = 0; i < number; i++) {
                            b.worm(where)
                            const SPEED = (30 + 10 * m.crouch) * (1 + 0.2 * Math.random())
                            Matter.Body.setVelocity(bullet[bullet.length - 1], {
                                x: player.velocity.x * 0.5 + SPEED * Math.cos(angle),
                                y: player.velocity.y * 0.5 + SPEED * Math.sin(angle)
                            });
                            angle += spread
                        }
                        spray(7); //fires normal shotgun bullets
                    } else if (tech.isIceShot) {
                        const spread = (m.crouch ? 0.7 : 1.2)
                        for (let i = 0, len = 10 * (tech.isShotgunReversed ? 1.5 : 1); i < len; i++) {
                            b.iceIX(23 + 10 * Math.random(), m.angle + spread * (Math.random() - 0.5))
                        }
                        spray(10); //fires normal shotgun bullets
                    } else if (tech.isFoamShot) {
                        const spread = (m.crouch ? 0.15 : 0.4)
                        const where = {
                            x: m.pos.x + 25 * Math.cos(m.angle),
                            y: m.pos.y + 25 * Math.sin(m.angle)
                        }
                        const number = 16 * (tech.isShotgunReversed ? 1.5 : 1)
                        for (let i = 0; i < number; i++) {
                            const SPEED = 13 + 4 * Math.random();
                            const angle = m.angle + spread * (Math.random() - 0.5)
                            b.foam(where, {
                                x: 0.6 * player.velocity.x + SPEED * Math.cos(angle),
                                y: 0.5 * player.velocity.y + SPEED * Math.sin(angle)
                            }, 8 + 7 * Math.random())
                        }
                    } else if (tech.isNeedles) {
                        const number = 9 * (tech.isShotgunReversed ? 1.5 : 1)
                        const spread = (m.crouch ? 0.03 : 0.05)
                        let angle = m.angle - (number - 1) * spread * 0.5
                        for (let i = 0; i < number; i++) {
                            b.needle(angle)
                            angle += spread
                        }
                    } else {
                        spray(16); //fires normal shotgun bullets
                    }
                }


                coolDown();
                b.muzzleFlash(35);
                chooseBulletType();

                if (tech.shotgunExtraShots) {
                    const delay = 7
                    let count = tech.shotgunExtraShots * delay

                    function cycle() {
                        count--
                        if (!(count % delay)) {
                            coolDown();
                            b.muzzleFlash(35);
                            chooseBulletType();
                        }
                        if (count > 0) {
                            requestAnimationFrame(cycle);
                        }
                    }
                    requestAnimationFrame(cycle);
                }
            }
        }, {
            name: "super balls", //2
            descriptionFunction() {
                return `fire <strong>3</strong> balls that retain<br><strong>momentum</strong> and <strong>kinetic energy</strong> after <strong>collisions</strong><br><strong>${this.ammoPack.toFixed(0)}</strong> balls per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 4.05,
            defaultAmmoPack: 4.05,
            have: false,
            // num: 5,
            do() { },
            foamBall() { },
            fireOne() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 27 : 19) * b.fireCDscale); // cool down
                const speed = m.crouch ? 43 : 36
                b.superBall({
                    x: m.pos.x + 30 * Math.cos(m.angle),
                    y: m.pos.y + 30 * Math.sin(m.angle)
                }, {
                    x: speed * Math.cos(m.angle),
                    y: speed * Math.sin(m.angle)
                }, 21 * tech.bulletSize)
            },
            fireMulti() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 23 : 15) * b.fireCDscale); // cool down
                const SPREAD = m.crouch ? 0.08 : 0.13
                const num = 3 + Math.floor(tech.extraSuperBalls * Math.random())
                const speed = m.crouch ? 43 : 36
                if (tech.isBulletTeleport) {
                    for (let i = 0; i < num; i++) {
                        b.superBall({
                            x: m.pos.x + 30 * Math.cos(m.angle),
                            y: m.pos.y + 30 * Math.sin(m.angle)
                        }, {
                            x: speed * Math.cos(m.angle),
                            y: speed * Math.sin(m.angle)
                        }, 11 * tech.bulletSize)
                    }
                } else {
                    let dir = m.angle - SPREAD * (num - 1) / 2;
                    for (let i = 0; i < num; i++) {
                        b.superBall({
                            x: m.pos.x + 30 * Math.cos(dir),
                            y: m.pos.y + 30 * Math.sin(dir)
                        }, {
                            x: speed * Math.cos(dir),
                            y: speed * Math.sin(dir)
                        }, 11 * tech.bulletSize)
                        dir += SPREAD;
                    }
                }
            },
            fireQueue() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 23 : 15) * b.fireCDscale); // cool down
                const num = 2 + 3 + Math.floor(tech.extraSuperBalls * Math.random()) //2 extra 
                const speed = m.crouch ? 43 : 36

                const delay = Math.floor((m.crouch ? 18 : 12) * b.fireCDscale)
                m.fireCDcycle = m.cycle + delay; // cool down
                function cycle() {
                    count++
                    b.superBall({
                        x: m.pos.x + 30 * Math.cos(m.angle),
                        y: m.pos.y + 30 * Math.sin(m.angle)
                    }, {
                        x: speed * Math.cos(m.angle),
                        y: speed * Math.sin(m.angle)
                    }, 11 * tech.bulletSize)
                    if (count < num && m.alive) requestAnimationFrame(cycle);
                    m.fireCDcycle = m.cycle + delay; // cool down                  
                }
                let count = 0
                requestAnimationFrame(cycle);
            },
            chooseFireMethod() { //set in simulation.startGame
                if (tech.oneSuperBall) {
                    this.fire = this.fireOne
                } else if (tech.superBallDelay) {
                    this.fire = this.fireQueue
                } else {
                    this.fire = this.fireMulti
                }
            },
            fire() { }
        },
        {
            name: "wave", //3
            // description: `emit <strong>wave packets</strong> that propagate through <strong>solids</strong><br>waves <strong class='color-s'>slow</strong> mobs<br><strong>115</strong> packets per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `emit <strong>wave packets</strong> that propagate through <strong>solids</strong><br>waves <strong class='color-s'>slow</strong> mobs<br><strong>${this.ammoPack.toFixed(0)}</strong> wave packets per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 60,
            defaultAmmoPack: 60,
            have: false,
            wavePacketCycle: 0,
            delay: 40,
            phononWaveCD: 0,
            waves: [], //used in longitudinal mode
            chooseFireMethod() { //set in simulation.startGame
                this.waves = [];
                if (tech.isLongitudinal) {
                    if (tech.is360Longitudinal) {
                        this.fire = this.fire360Longitudinal
                        this.do = this.do360Longitudinal
                    } else {
                        this.fire = this.fireLongitudinal
                        this.do = this.doLongitudinal
                    }
                } else {
                    this.fire = this.fireTransverse
                    this.do = this.doTransverse
                }
            },
            do() { },
            do360Longitudinal() {
                if (!m.isTimeDilated) {
                    ctx.strokeStyle = "rgba(0,0,0,0.6)" //"000";
                    ctx.lineWidth = 2 * tech.wavePacketDamage
                    ctx.beginPath();
                    const end = 700 * Math.sqrt(tech.bulletsLastLonger)
                    const damage = 2.3 * m.dmgScale * tech.wavePacketDamage * tech.waveBeamDamage * (tech.isBulletTeleport ? 1.43 : 1) * (tech.isInfiniteWaveAmmo ? 0.75 : 1) //damage is lower for large radius mobs, since they feel the waves longer

                    for (let i = this.waves.length - 1; i > -1; i--) {
                        //draw wave
                        ctx.moveTo(this.waves[i].position.x + this.waves[i].radius, this.waves[i].position.y)
                        ctx.arc(this.waves[i].position.x, this.waves[i].position.y, this.waves[i].radius, 0, 2 * Math.PI);
                        // collisions
                        // if (tech.isBulletTeleport && Math.random() < 0.04) {
                        //     const scale = 400 * Math.random()
                        //     this.waves[i].position = Vector.add(this.waves[i].position, { x: scale * (Math.random() - 0.5), y: scale * (Math.random() - 0.5) })
                        // }
                        for (let j = 0, len = mob.length; j < len; j++) {
                            if (!mob[j].isShielded) {
                                const dist = Vector.magnitude(Vector.sub(this.waves[i].position, mob[j].position))
                                const r = mob[j].radius + 30
                                if (dist + r > this.waves[i].radius && dist - r < this.waves[i].radius) {
                                    //make them shake around
                                    if (!mob[j].isBadTarget) {
                                        mob[j].force.x += 0.01 * (Math.random() - 0.5) * mob[j].mass
                                        mob[j].force.y += 0.01 * (Math.random() - 0.5) * mob[j].mass
                                    }
                                    // if (!mob[j].isShielded) {
                                    Matter.Body.setVelocity(mob[j], { //friction
                                        x: mob[j].velocity.x * 0.95,
                                        y: mob[j].velocity.y * 0.95
                                    });
                                    //draw vibes
                                    let vertices = mob[j].vertices;
                                    const vibe = 50 + mob[j].radius * 0.15
                                    ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                    for (let k = 1; k < vertices.length; k++) {
                                        ctx.lineTo(vertices[k].x + vibe * (Math.random() - 0.5), vertices[k].y + vibe * (Math.random() - 0.5));
                                    }
                                    ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                    //damage
                                    mob[j].locatePlayer();
                                    mob[j].damage(damage / Math.sqrt(mob[j].radius));
                                    // }
                                    if (tech.isPhononWave && this.phononWaveCD < m.cycle) {
                                        this.phononWaveCD = m.cycle + 8 * (1 + this.waves[i].resonanceCount)
                                        this.waves.push({
                                            position: mob[j].position,
                                            radius: 25,
                                            resonanceCount: this.waves[i].resonanceCount + 1,
                                        })
                                    }
                                }
                            }
                        }
                        // for (let j = 0, len = body.length; j < len; j++) {
                        for (let j = 0, len = Math.min(30, body.length); j < len; j++) {
                            const dist = Vector.magnitude(Vector.sub(this.waves[i].position, body[j].position))
                            const r = 20
                            if (dist + r > this.waves[i].radius && dist - r < this.waves[i].radius) {
                                const who = body[j]
                                //make them shake around
                                who.force.x += 0.01 * (Math.random() - 0.5) * who.mass
                                who.force.y += (0.01 * (Math.random() - 0.5) - simulation.g * 0.25) * who.mass //remove force of gravity
                                //draw vibes
                                let vertices = who.vertices;
                                const vibe = 25
                                ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                for (let k = 1; k < vertices.length; k++) {
                                    ctx.lineTo(vertices[k].x + vibe * (Math.random() - 0.5), vertices[k].y + vibe * (Math.random() - 0.5));
                                }
                                ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));

                                if (tech.isPhononBlock && !who.isNotHoldable && who.speed < 5 && who.angularSpeed < 0.1) {
                                    if (Math.random() < 0.5) b.targetedBlock(who, 50 - Math.min(25, who.mass * 3)) //    targetedBlock(who, speed = 50 - Math.min(20, who.mass * 2), range = 1600) {
                                    // Matter.Body.setAngularVelocity(who, (0.25 + 0.1 * Math.random()) * (Math.random() < 0.5 ? -1 : 1));
                                    who.torque += who.inertia * 0.001 * (Math.random() - 0.5)
                                }
                            }
                        }
                        this.waves[i].radius += 0.9 * tech.waveBeamSpeed //expand / move
                        // if (this.waves[i].radius > end) this.waves.splice(i, 1) //end
                        if (this.waves[i].radius > end - 30 * this.waves[i].resonanceCount) { //* Math.pow(0.9, this.waves[i].resonanceCount)
                            this.waves.splice(i, 1) //end
                        }
                    }
                    ctx.stroke();
                }
            },
            fire360Longitudinal() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 4 : 8) * b.fireCDscale); // cool down
                this.waves.push({
                    position: { x: m.pos.x, y: m.pos.y, },
                    radius: 25,
                    resonanceCount: 0 //used with tech.isPhononWave
                })
            },
            doLongitudinal() {
                if (!m.isTimeDilated) {
                    ctx.strokeStyle = "rgba(0,0,0,0.6)" //"000";
                    ctx.lineWidth = 2 * tech.wavePacketDamage
                    ctx.beginPath();
                    const end = 1100 * tech.bulletsLastLonger
                    const damage = 2.3 * m.dmgScale * tech.wavePacketDamage * tech.waveBeamDamage * (tech.isBulletTeleport ? 1.4 : 1) * (tech.isInfiniteWaveAmmo ? 0.75 : 1) //damage is lower for large radius mobs, since they feel the waves longer
                    for (let i = this.waves.length - 1; i > -1; i--) {
                        const v1 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit1, this.waves[i].radius))
                        const v2 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit2, this.waves[i].radius))
                        //draw wave
                        ctx.moveTo(v1.x, v1.y)
                        ctx.arc(this.waves[i].position.x, this.waves[i].position.y, this.waves[i].radius, this.waves[i].angle, this.waves[i].angle + this.waves[i].arc);
                        //using small angle linear approximation of circle arc, this will not work if the arc gets large   // https://stackoverflow.com/questions/13652518/efficiently-find-points-inside-a-circle-sector
                        let hits = Matter.Query.ray(mob, v1, v2, 50) //Matter.Query.ray(bodies, startPoint, endPoint, [rayWidth])
                        for (let j = 0; j < hits.length; j++) {
                            const who = hits[j].body
                            if (!who.isShielded) {
                                who.force.x += 0.01 * (Math.random() - 0.5) * who.mass
                                who.force.y += 0.01 * (Math.random() - 0.5) * who.mass
                                Matter.Body.setVelocity(who, { x: who.velocity.x * 0.95, y: who.velocity.y * 0.95 });
                                let vertices = who.vertices;
                                const vibe = 50 + who.radius * 0.15
                                ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x + vibe * (Math.random() - 0.5), vertices[j].y + vibe * (Math.random() - 0.5));
                                ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                                who.locatePlayer();
                                who.damage(damage / Math.sqrt(who.radius));

                                if (tech.isPhononWave && this.phononWaveCD < m.cycle) {
                                    this.phononWaveCD = m.cycle + 8 * (1 + this.waves[i].resonanceCount)
                                    const halfArc = 0.27 //6.28 is a full circle, but these arcs needs to stay small because we are using small angle linear approximation, for collisions
                                    let closestMob, dist
                                    let range = end - 30 * this.waves[i].resonanceCount
                                    for (let i = 0, len = mob.length; i < len; i++) {
                                        if (who !== mob[i] && !mob[i].isBadTarget && !mob[i].isInvulnerable) {
                                            dist = Vector.magnitude(Vector.sub(who.position, mob[i].position));
                                            if (dist < range) {
                                                closestMob = mob[i]
                                                range = dist
                                            }
                                        }
                                    }
                                    if (closestMob) {
                                        const dir = Vector.normalise(Vector.sub(closestMob.position, who.position))
                                        var angle = Math.atan2(dir.y, dir.x)
                                    } else {
                                        var angle = 2 * Math.PI * Math.random()
                                    }
                                    this.waves.push({
                                        position: who.position,
                                        angle: angle - halfArc, //used in drawing ctx.arc
                                        unit1: { x: Math.cos(angle - halfArc), y: Math.sin(angle - halfArc) }, //used for collision
                                        unit2: { x: Math.cos(angle + halfArc), y: Math.sin(angle + halfArc) }, //used for collision
                                        arc: halfArc * 2,
                                        radius: 25,
                                        resonanceCount: this.waves[i].resonanceCount + 1
                                    })
                                }
                            }
                        }

                        hits = Matter.Query.ray(body, v1, v2, 50) //Matter.Query.ray(bodies, startPoint, endPoint, [rayWidth])
                        for (let j = 0, len = Math.min(30, hits.length); j < len; j++) {
                            const who = hits[j].body
                            //make them shake around
                            who.force.x += 0.01 * (Math.random() - 0.5) * who.mass
                            who.force.y += (0.01 * (Math.random() - 0.5) - simulation.g * 0.25) * who.mass //remove force of gravity
                            let vertices = who.vertices;
                            const vibe = 25
                            ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                            for (let j = 1; j < vertices.length; j++) {
                                ctx.lineTo(vertices[j].x + vibe * (Math.random() - 0.5), vertices[j].y + vibe * (Math.random() - 0.5));
                            }
                            ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));

                            if (tech.isPhononBlock && !who.isNotHoldable && who.speed < 5 && who.angularSpeed < 0.1) {
                                if (Math.random() < 0.5) b.targetedBlock(who, 50 - Math.min(25, who.mass * 3)) //    targetedBlock(who, speed = 50 - Math.min(20, who.mass * 2), range = 1600) {
                                // Matter.Body.setAngularVelocity(who, (0.25 + 0.12 * Math.random()) * (Math.random() < 0.5 ? -1 : 1));
                                who.torque += who.inertia * 0.001 * (Math.random() - 0.5)
                            }
                        }

                        this.waves[i].radius += tech.waveBeamSpeed * 1.8 //expand / move
                        if (this.waves[i].radius > end - 30 * this.waves[i].resonanceCount) {
                            this.waves.splice(i, 1) //end
                        }
                    }
                    ctx.stroke();
                }
            },
            fireLongitudinal() {
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 4 : 8) * b.fireCDscale); // cool down
                const halfArc = (m.crouch ? 0.0785 : 0.275) * (tech.isBulletTeleport ? 0.66 + (Math.random() - 0.5) : 1) //6.28 is a full circle, but these arcs needs to stay small because we are using small angle linear approximation, for collisions
                const angle = m.angle + tech.isBulletTeleport * 0.3 * (Math.random() - 0.5)
                this.waves.push({
                    position: { x: m.pos.x + 25 * Math.cos(m.angle), y: m.pos.y + 25 * Math.sin(m.angle), },
                    angle: angle - halfArc, //used in drawing ctx.arc
                    unit1: { x: Math.cos(angle - halfArc), y: Math.sin(angle - halfArc) }, //used for collision
                    unit2: { x: Math.cos(angle + halfArc), y: Math.sin(angle + halfArc) }, //used for collision
                    arc: halfArc * 2,
                    radius: 25,
                    resonanceCount: 0
                })
            },
            doTransverse() {
                // if (this.wavePacketCycle && !input.fire) {
                //     this.wavePacketCycle = 0;
                //     m.fireCDcycle = m.cycle + Math.floor(this.delay * b.fireCDscale); // cool down
                // }
            },
            fireTransverse() {
                totalCycles = Math.floor((3.5) * 35 * tech.waveReflections * tech.bulletsLastLonger / Math.sqrt(tech.waveReflections * 0.5))
                const me = bullet.length;
                bullet[me] = Bodies.polygon(m.pos.x + 25 * Math.cos(m.angle), m.pos.y + 25 * Math.sin(m.angle), 5, 4, {
                    angle: m.angle,
                    cycle: -0.5,
                    endCycle: simulation.cycle + totalCycles,
                    inertia: Infinity,
                    frictionAir: 0,
                    slow: 0,
                    // amplitude: (m.crouch ? 5 : 10) * ((this.wavePacketCycle % 2) ? -1 : 1) * Math.sin((this.wavePacketCycle + 1) * 0.088), //0.0968 //0.1012 //0.11 //0.088 //shorten wave packet
                    amplitude: (m.crouch ? 6 : 12) * ((this.wavePacketCycle % 2) ? -1 : 1) * Math.sin(this.wavePacketCycle * 0.088) * Math.sin(this.wavePacketCycle * 0.04), //0.0968 //0.1012 //0.11 //0.088 //shorten wave packet
                    minDmgSpeed: 0,
                    dmg: m.dmgScale * tech.waveBeamDamage * tech.wavePacketDamage * (tech.isBulletTeleport ? 1.43 : 1) * (tech.isInfiniteWaveAmmo ? 0.75 : 1), //also control damage when you divide by mob.mass 
                    dmgCoolDown: 0,
                    classType: "bullet",
                    collisionFilter: {
                        category: 0,
                        mask: 0, //cat.mob | cat.mobBullet | cat.mobShield
                    },
                    beforeDmg() { },
                    onEnd() { },
                    do() { },
                    query() {
                        let slowCheck = 1
                        if (Matter.Query.point(map, this.position).length) { //check if inside map                                    
                            slowCheck = waveSpeedMap
                        } else { //check if inside a body
                            let q = Matter.Query.point(body, this.position)
                            if (q.length) {
                                slowCheck = waveSpeedBody
                                Matter.Body.setPosition(this, Vector.add(this.position, q[0].velocity)) //move with the medium
                            }
                        }
                        if (slowCheck !== this.slow) { //toggle velocity based on inside and outside status change
                            this.slow = slowCheck
                            Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(this.velocity), tech.waveBeamSpeed * slowCheck));
                        }

                        if (this.dmgCoolDown < 1) {
                            q = Matter.Query.point(mob, this.position) // check if inside a mob
                            for (let i = 0; i < q.length; i++) {
                                this.dmgCoolDown = 5 + Math.floor(8 * Math.random() * b.fireCDscale);
                                let dmg = this.dmg
                                q[i].damage(dmg);
                                if (q[i].alive) {
                                    q[i].foundPlayer();
                                    Matter.Body.setVelocity(q[i], Vector.mult(q[i].velocity, 0.9))
                                }
                                // this.endCycle = 0; //bullet ends cycle after doing damage
                                if (q[i].damageReduction) {
                                    simulation.drawList.push({ //add dmg to draw queue
                                        x: this.position.x,
                                        y: this.position.y,
                                        radius: Math.log(dmg + 1.1) * 40 * q[i].damageReduction + 3,
                                        color: 'rgba(0,0,0,0.4)',
                                        time: simulation.drawTime
                                    });
                                }
                            }
                        } else {
                            this.dmgCoolDown--
                        }
                    },
                    wiggle() {
                        this.cycle++
                        const where = Vector.mult(transverse, this.amplitude * Math.cos(this.cycle * tech.waveFrequency))
                        Matter.Body.setPosition(this, Vector.add(this.position, where))
                    }
                });
                if (tech.isBulletTeleport) {
                    bullet[me].wiggle = function () {
                        this.cycle++
                        const where = Vector.mult(transverse, this.amplitude * Math.cos(this.cycle * tech.waveFrequency))
                        if (Math.random() < 0.005) {
                            if (Math.random() < 0.33) { //randomize position
                                const scale = 500 * Math.random()
                                Matter.Body.setPosition(this, Vector.add({
                                    x: scale * (Math.random() - 0.5),
                                    y: scale * (Math.random() - 0.5)
                                }, Vector.add(this.position, where)))
                            } else { //randomize position in velocity direction
                                const velocityScale = Vector.mult(this.velocity, 50 * (Math.random() - 0.5))
                                Matter.Body.setPosition(this, Vector.add(velocityScale, Vector.add(this.position, where)))
                            }

                        } else {
                            Matter.Body.setPosition(this, Vector.add(this.position, where))
                        }
                    }
                }
                let waveSpeedMap = 0.13
                let waveSpeedBody = 0.3
                if (tech.isPhaseVelocity) {
                    waveSpeedMap = 3.5
                    waveSpeedBody = 2
                    bullet[me].dmg *= 1.5
                }
                if (tech.waveReflections) {
                    bullet[me].reflectCycle = totalCycles / tech.waveReflections //tech.waveLengthRange
                    bullet[me].do = function () {
                        this.query()
                        if (this.cycle > this.reflectCycle) {
                            this.reflectCycle += totalCycles / tech.waveReflections
                            Matter.Body.setVelocity(this, Vector.mult(this.velocity, -1));
                            // if (this.reflectCycle > tech.waveLengthRange * (1 + tech.waveReflections)) this.endCycle = 0;
                        }
                        this.wiggle()
                    }
                } else {
                    bullet[me].do = function () {
                        this.query()
                        this.wiggle();
                    }
                }
                Composite.add(engine.world, bullet[me]); //add bullet to world
                Matter.Body.setVelocity(bullet[me], {
                    x: tech.waveBeamSpeed * Math.cos(m.angle),
                    y: tech.waveBeamSpeed * Math.sin(m.angle)
                });
                const transverse = Vector.normalise(Vector.perp(bullet[me].velocity))
                this.wavePacketCycle++
            },
            fire() { }
        },
        {
            name: "missiles", //6
            // description: `launch <strong>homing</strong> missiles that target mobs<br>missiles <strong class='color-e'>explode</strong> on contact with mobs<br><strong>5</strong> missiles per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `launch <strong>homing</strong> missiles that target mobs<br>missiles <strong class='color-e'>explode</strong> on contact with mobs<br><strong>${this.ammoPack.toFixed(1)}</strong> missiles per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 2.3,
            defaultAmmoPack: 2.3,
            have: false,
            fireCycle: 0,
            do() { },
            fire() {
                const countReduction = Math.pow(0.86, tech.missileCount)
                // if (m.crouch) {
                //     m.fireCDcycle = m.cycle + tech.missileFireCD * b.fireCDscale / countReduction; // cool down
                //     // for (let i = 0; i < tech.missileCount; i++) {
                //     //     b.missile(where, -Math.PI / 2 + 0.2 * (Math.random() - 0.5) * Math.sqrt(tech.missileCount), -2, Math.sqrt(countReduction))
                //     //     bullet[bullet.length - 1].force.x += 0.004 * countReduction * (i - (tech.missileCount - 1) / 2);
                //     // }

                //     if (tech.missileCount > 1) {
                //         for (let i = 0; i < tech.missileCount; i++) {
                //             setTimeout(() => {
                //                 const where = { x: m.pos.x, y: m.pos.y - 40 }
                //                 b.missile(where, -Math.PI / 2 + 0.2 * (Math.random() - 0.5) * Math.sqrt(tech.missileCount), -2, Math.sqrt(countReduction))
                //                 bullet[bullet.length - 1].force.x += 0.025 * countReduction * (i - (tech.missileCount - 1) / 2);
                //             }, 20 * tech.missileCount * Math.random());
                //         }
                //     } else {
                //         const where = {
                //             x: m.pos.x,
                //             y: m.pos.y - 40
                //         }
                //         b.missile(where, -Math.PI / 2 + 0.2 * (Math.random() - 0.5), -2)
                //     }
                // } else {
                m.fireCDcycle = m.cycle + tech.missileFireCD * b.fireCDscale / countReduction; // cool down
                const direction = { x: Math.cos(m.angle), y: Math.sin(m.angle) }
                // const where = {
                //     x: m.pos.x + 30 * direction.x,
                //     y: m.pos.y + 30 * direction.y
                // }
                if (tech.missileCount > 1) {
                    const push = Vector.mult(Vector.perp(direction), 0.2 * countReduction / Math.sqrt(tech.missileCount))
                    const sqrtCountReduction = Math.sqrt(countReduction)
                    // for (let i = 0; i < tech.missileCount; i++) {
                    //     setTimeout(() => {
                    //         if (m.crouch) {
                    //             b.missile(where, m.angle, 20, sqrtCountReduction)
                    //             // bullet[bullet.length - 1].force.x += 0.7 * push.x * (i - (tech.missileCount - 1) / 2);
                    //             // bullet[bullet.length - 1].force.y += 0.7 * push.y * (i - (tech.missileCount - 1) / 2);
                    //         } else {
                    //             b.missile(where, m.angle, -10, sqrtCountReduction)
                    //             bullet[bullet.length - 1].force.x += push.x * (i - (tech.missileCount - 1) / 2);
                    //             bullet[bullet.length - 1].force.y += 0.005 + push.y * (i - (tech.missileCount - 1) / 2);
                    //         }

                    //     }, 1 + i * 10 * tech.missileCount);
                    // }
                    const launchDelay = 4
                    let count = 0
                    const fireMissile = () => {
                        if (m.crouch) {
                            b.missile({ x: m.pos.x + 30 * direction.x, y: m.pos.y + 30 * direction.y }, m.angle, 20, sqrtCountReduction)
                            bullet[bullet.length - 1].force.x += 0.5 * push.x * (Math.random() - 0.5)
                            bullet[bullet.length - 1].force.y += 0.004 + 0.5 * push.y * (Math.random() - 0.5)
                        } else {
                            b.missile({ x: m.pos.x + 30 * direction.x, y: m.pos.y + 30 * direction.y }, m.angle, -15, sqrtCountReduction)
                            bullet[bullet.length - 1].force.x += push.x * (Math.random() - 0.5)
                            bullet[bullet.length - 1].force.y += 0.005 + push.y * (Math.random() - 0.5)
                        }
                    }
                    const cycle = () => {
                        if ((simulation.paused) && m.alive) {
                            requestAnimationFrame(cycle)
                        } else {
                            count++
                            if (!(count % launchDelay)) {
                                fireMissile()
                            }
                            if (count < tech.missileCount * launchDelay && m.alive) requestAnimationFrame(cycle);
                        }
                    }
                    requestAnimationFrame(cycle);
                } else {
                    if (m.crouch) {
                        b.missile({ x: m.pos.x + 40 * direction.x, y: m.pos.y + 40 * direction.y }, m.angle, 25)
                    } else {
                        b.missile({ x: m.pos.x + 40 * direction.x, y: m.pos.y + 40 * direction.y }, m.angle, -12)
                        bullet[bullet.length - 1].force.y += 0.04 * (Math.random() - 0.2)
                    }
                }
            }
        }, {
            name: "grenades", //5
            // description: `lob a single <strong>bouncy</strong> projectile<br><strong class='color-e'>explodes</strong> on <strong>contact</strong> or after one second<br><strong>7</strong> grenades per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `lob a single <strong>bouncy</strong> projectile<br><strong class='color-e'>explodes</strong> on <strong>contact</strong> or after <strong>1.5</strong> seconds<br><strong>${this.ammoPack.toFixed(0)}</strong> grenades per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 3.2,
            defaultAmmoPack: 3.2,
            have: false,
            do() { }, //do is set in b.setGrenadeMode()
            fire() {
                const countReduction = Math.pow(0.93, tech.missileCount)
                m.fireCDcycle = m.cycle + Math.floor((m.crouch ? 35 : 27) * b.fireCDscale / countReduction); // cool down
                const where = {
                    x: m.pos.x + 30 * Math.cos(m.angle),
                    y: m.pos.y + 30 * Math.sin(m.angle)
                }
                const SPREAD = m.crouch ? 0.12 : 0.2
                let angle = m.angle - SPREAD * (tech.missileCount - 1) / 2;
                for (let i = 0; i < tech.missileCount; i++) {
                    b.grenade(where, angle, countReduction) //function(where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }, angle = m.angle, size = 1)
                    angle += SPREAD
                }
            },
        }, {
            name: "spores", //6
            // description: `toss a <strong class='color-p' style='letter-spacing: 2px;'>sporangium</strong> that discharges <strong class='color-p' style='letter-spacing: 2px;'>spores</strong><br><strong class='color-p' style='letter-spacing: 2px;'>spores</strong> seek out nearby mobs<br><strong>2-3</strong> sporangium per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `toss a <strong class='color-p' style='letter-spacing: 2px;'>sporangium</strong> that discharges ${b.guns[6].nameString("s")}<br>${b.guns[6].nameString("s")} seek out nearby mobs<br><strong>${this.ammoPack.toFixed(1)}</strong> sporangium per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 1.22,
            defaultAmmoPack: 1.22,
            have: false,
            nameString(suffix = "") {
                if (tech.isSporeFlea) {
                    return `<strong class='color-p' style='letter-spacing: -0.8px;'>flea${suffix}</strong>`
                } else if (tech.isSporeWorm) {
                    return `<strong class='color-p' style='letter-spacing: -0.8px;'>worm${suffix}</strong>`
                } else {
                    return `<strong class='color-p' style='letter-spacing: 2px;'>spore${suffix}</strong>`
                }
            },
            do() { },
            fire() {
                const me = bullet.length;
                const dir = m.angle;
                bullet[me] = Bodies.polygon(m.pos.x + 30 * Math.cos(m.angle), m.pos.y + 30 * Math.sin(m.angle), 20, 4.5, b.fireAttributes(dir, false));
                b.fireProps(m.crouch ? 40 : 20, m.crouch ? 30 : 16, dir, me); //cd , speed
                Matter.Body.setDensity(bullet[me], 0.000001);
                bullet[me].endCycle = simulation.cycle + 480 + Math.max(0, 120 - 2 * bullet.length);
                bullet[me].frictionAir = 0;
                bullet[me].friction = 0.5;
                bullet[me].radius = 4.5;
                bullet[me].maxRadius = 30;
                bullet[me].restitution = 0.3;
                bullet[me].minDmgSpeed = 0;
                bullet[me].totalSpores = 8 + 2 * tech.isSporeFreeze + 5 * tech.isSporeColony
                bullet[me].stuck = function () { };
                bullet[me].beforeDmg = function () { };
                bullet[me].do = function () {
                    function onCollide(that) {
                        that.collisionFilter.mask = 0; //non collide with everything
                        Matter.Body.setVelocity(that, { x: 0, y: 0 });
                        that.do = that.grow;
                    }
                    const mobCollisions = Matter.Query.collides(this, mob)
                    if (mobCollisions.length) {
                        onCollide(this)
                        this.stuckTo = mobCollisions[0].bodyA
                        if (tech.isZombieMobs) this.stuckTo.isSoonZombie = true
                        if (this.stuckTo.isVerticesChange) {
                            this.stuckToRelativePosition = { x: 0, y: 0 }
                        } else {
                            //find the relative position for when the mob is at angle zero by undoing the mobs rotation
                            this.stuckToRelativePosition = Vector.rotate(Vector.sub(this.position, this.stuckTo.position), -this.stuckTo.angle)
                        }
                        this.stuck = function () {
                            if (this.stuckTo && this.stuckTo.alive) {
                                const rotate = Vector.rotate(this.stuckToRelativePosition, this.stuckTo.angle) //add in the mob's new angle to the relative position vector
                                Matter.Body.setPosition(this, Vector.add(Vector.add(rotate, this.stuckTo.velocity), this.stuckTo.position))
                                Matter.Body.setVelocity(this, this.stuckTo.velocity); //so that it will move properly if it gets unstuck
                            } else {
                                this.collisionFilter.mask = cat.map; //non collide with everything but map
                                this.stuck = function () {
                                    this.force.y += this.mass * 0.0006;
                                }
                            }
                        }
                    } else {
                        const bodyCollisions = Matter.Query.collides(this, body)
                        if (bodyCollisions.length) {
                            if (!bodyCollisions[0].bodyA.isNonStick) {
                                onCollide(this)
                                this.stuckTo = bodyCollisions[0].bodyA
                                //find the relative position for when the mob is at angle zero by undoing the mobs rotation
                                this.stuckToRelativePosition = Vector.rotate(Vector.sub(this.position, this.stuckTo.position), -this.stuckTo.angle)
                            } else {
                                this.do = this.grow;
                            }
                            this.stuck = function () {
                                if (this.stuckTo) {
                                    const rotate = Vector.rotate(this.stuckToRelativePosition, this.stuckTo.angle) //add in the mob's new angle to the relative position vector
                                    Matter.Body.setPosition(this, Vector.add(Vector.add(rotate, this.stuckTo.velocity), this.stuckTo.position))
                                    // Matter.Body.setVelocity(this, this.stuckTo.velocity); //so that it will move properly if it gets unstuck
                                } else {
                                    this.force.y += this.mass * 0.0006;
                                }
                            }
                        } else {
                            if (Matter.Query.collides(this, map).length) {
                                onCollide(this)
                            } else { //if colliding with nothing just fall
                                this.force.y += this.mass * 0.0006;
                                simulation.mouseInGame.x
                            }
                        }
                    }
                    //draw green glow
                    ctx.fillStyle = "rgba(0,200,125,0.16)";
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.maxRadius, 0, 2 * Math.PI);
                    ctx.fill();
                }
                bullet[me].grow = function () {
                    this.stuck(); //runs different code based on what the bullet is stuck to
                    let scale = 1.01
                    if (tech.isSporeGrowth && !(simulation.cycle % 40)) { //release a spore
                        if (tech.isSporeFlea) {
                            if (!(simulation.cycle % 80)) {
                                const speed = 10 + 5 * Math.random()
                                const angle = 2 * Math.PI * Math.random()
                                b.flea(this.position, {
                                    x: speed * Math.cos(angle),
                                    y: speed * Math.sin(angle)
                                })
                            }
                        } else if (tech.isSporeWorm) {
                            if (!(simulation.cycle % 80)) b.worm(this.position)
                        } else {
                            b.spore(this.position)
                        }
                        scale = 0.96
                        if (this.stuckTo && this.stuckTo.alive) scale = 0.9
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale
                    } else {
                        if (this.stuckTo && this.stuckTo.alive) scale = 1.03
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale
                        if (this.radius > this.maxRadius) this.endCycle = 0;
                    }
                    //draw green glow
                    ctx.fillStyle = "rgba(0,200,125,0.16)";
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.maxRadius, 0, 2 * Math.PI);
                    ctx.fill();
                };
                //spawn bullets on end
                bullet[me].onEnd = function () {
                    let count = 0 //used in for loop below
                    const things = [
                        () => { //spore
                            b.spore(this.position)
                        },
                        () => { //worm
                            count++ //count as 2 things
                            b.worm(this.position)
                        },
                        () => { //flea
                            count++ //count as 2 things
                            const speed = 10 + 5 * Math.random()
                            const angle = 2 * Math.PI * Math.random()
                            b.flea(this.position, {
                                x: speed * Math.cos(angle),
                                y: speed * Math.sin(angle)
                            })
                        },
                        () => { // drones
                            b.drone(this.position)
                        },
                        () => { // ice IX
                            b.iceIX(1, Math.random() * 2 * Math.PI, this.position)
                        },
                        () => { //missile
                            count++ //count as 2 things
                            b.missile(this.position, -Math.PI / 2 + 0.5 * (Math.random() - 0.5), 0, 1)
                        },
                        () => { //nail
                            b.targetedNail(this.position, 1, 39 + 6 * Math.random())
                        },
                        () => { //super ball
                            const speed = 36
                            const angle = 2 * Math.PI * Math.random()
                            b.superBall(this.position, {
                                x: speed * Math.cos(angle),
                                y: speed * Math.sin(angle)
                            }, 11 * tech.bulletSize)
                        },
                    ]

                    for (len = this.totalSpores; count < len; count++) {
                        if (tech.isSporeColony && Math.random() < 0.33) {
                            things[Math.floor(Math.random() * things.length)]()
                        } else if (tech.isSporeFlea) {
                            things[2]()
                        } else if (tech.isSporeWorm) {
                            things[1]()
                        } else {
                            things[0]() //spores
                        }
                    }
                    // } else if (tech.isSporeFlea) {
                    //     for (let i = 0, len = this.totalSpores; i < len; i++) things[2]()
                    // } else if (tech.isSporeWorm) {
                    //     for (let i = 0, len = this.totalSpores; i < len; i++) things[1]()
                    // } else {
                    //     for (let i = 0; i < this.totalSpores; i++) things[0]()
                    // }
                    if (tech.isStun) b.AoEStunEffect(this.position, 600, 270 + 120 * Math.random()); //AoEStunEffect(where, range, cycles = 120 + 60 * Math.random()) {
                }
            }
        }, {
            name: "drones", //7
            // description: `deploy <strong>autonomous</strong> drones that <strong>smash</strong> into mobs<br>and <strong>collect</strong> nearby power ups<br><strong>16</strong> drones per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `deploy <strong>autonomous</strong> <strong>drones</strong> that smash into mobs<br>drones <strong>collect</strong> nearby power ups<br><strong>${this.ammoPack.toFixed(0)}</strong> drones per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 7.3,
            defaultAmmoPack: 7.3,
            have: false,
            do() { },
            fire() {
                if (tech.isDroneRadioactive) {
                    if (m.crouch) {
                        b.droneRadioactive({
                            x: m.pos.x + 30 * Math.cos(m.angle) + 10 * (Math.random() - 0.5),
                            y: m.pos.y + 30 * Math.sin(m.angle) + 10 * (Math.random() - 0.5)
                        }, 45)
                        m.fireCDcycle = m.cycle + Math.floor(45 * b.fireCDscale); // cool down
                    } else {
                        b.droneRadioactive({
                            x: m.pos.x + 30 * Math.cos(m.angle) + 10 * (Math.random() - 0.5),
                            y: m.pos.y + 30 * Math.sin(m.angle) + 10 * (Math.random() - 0.5)
                        }, 10)
                        m.fireCDcycle = m.cycle + Math.floor(25 * b.fireCDscale); // cool down
                    }
                } else {
                    if (m.crouch) {
                        b.drone({
                            x: m.pos.x + 30 * Math.cos(m.angle) + 5 * (Math.random() - 0.5),
                            y: m.pos.y + 30 * Math.sin(m.angle) + 5 * (Math.random() - 0.5)
                        }, 50)
                        m.fireCDcycle = m.cycle + Math.floor(7 * b.fireCDscale); // cool down
                    } else {
                        b.drone({
                            x: m.pos.x + 30 * Math.cos(m.angle) + 10 * (Math.random() - 0.5),
                            y: m.pos.y + 30 * Math.sin(m.angle) + 10 * (Math.random() - 0.5)
                        }, 15)
                        m.fireCDcycle = m.cycle + Math.floor(4 * b.fireCDscale); // cool down
                    }
                }
            }
        },
        {
            name: "foam", //8
            descriptionFunction() {
                return `spray bubbly <strong>foam</strong> that <strong>sticks</strong> to mobs<br><strong class='color-s'>slows</strong> mobs and does <strong class='color-d'>damage</strong> over time<br><strong>${this.ammoPack.toFixed(0)}</strong> bubbles per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 12.6,
            defaultAmmoPack: 12.6,
            have: false,
            charge: 0,
            isDischarge: false,
            knockBack: 0.0005, //set in tech: cavitation
            applyKnock(velocity) {
                player.force.x -= 0.7 * this.knockBack * velocity.x
                if (velocity.y > 0) {
                    player.force.y -= 4.3 * this.knockBack * velocity.y
                } else {
                    player.force.y -= this.knockBack * velocity.y
                }
            },
            chooseFireMethod() {
                if (tech.isFoamPressure) {
                    this.do = this.doCharges
                    this.fire = this.fireCharges
                } else {
                    this.do = this.doStream
                    this.fire = this.fireStream
                }
            },
            doStream() { },
            fireStream() {
                const spread = (m.crouch ?
                    0.04 * (Math.random() - 0.5) + 0.09 * Math.sin(m.cycle * 0.12) :
                    0.23 * (Math.random() - 0.5) + 0.15 * Math.sin(m.cycle * 0.12)
                )
                const radius = 5 + 8 * Math.random() + (tech.isAmmoFoamSize && this.ammo < 300) * 12
                const SPEED = (m.crouch ? 1.2 : 1) * Math.max(2, 14 - radius * 0.25)
                const dir = m.angle + 0.15 * (Math.random() - 0.5)
                const velocity = {
                    x: 0.7 * player.velocity.x + SPEED * Math.cos(dir),
                    y: 0.5 * player.velocity.y + SPEED * Math.sin(dir)
                }
                const position = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }
                b.foam(position, Vector.rotate(velocity, spread), radius)
                this.applyKnock(velocity)
                m.fireCDcycle = m.cycle + Math.floor(1.5 * b.fireCDscale);
            },
            doCharges() {
                if (this.charge > 0) {
                    //draw charge level
                    ctx.fillStyle = "rgba(0,50,50,0.3)";
                    ctx.beginPath();
                    const radius = 5 * Math.sqrt(this.charge)
                    const mag = 11 + radius
                    ctx.arc(m.pos.x + mag * Math.cos(m.angle), m.pos.y + mag * Math.sin(m.angle), radius, 0, 2 * Math.PI);
                    ctx.fill();

                    if (this.isDischarge && m.cycle % 2) {
                        const spread = (m.crouch ? 0.04 : 0.5) * (Math.random() - 0.5)
                        const radius = 5 + 8 * Math.random() + (tech.isAmmoFoamSize && this.ammo < 300) * 12
                        const SPEED = (m.crouch ? 1.2 : 1) * 10 - radius * 0.4 + Math.min(5, Math.sqrt(this.charge));
                        const dir = m.angle + 0.15 * (Math.random() - 0.5)
                        const velocity = {
                            x: 0.7 * player.velocity.x + SPEED * Math.cos(dir),
                            y: 0.5 * player.velocity.y + SPEED * Math.sin(dir)
                        }
                        const position = {
                            x: m.pos.x + 30 * Math.cos(m.angle),
                            y: m.pos.y + 30 * Math.sin(m.angle)
                        }
                        b.foam(position, Vector.rotate(velocity, spread), radius)
                        this.applyKnock(velocity)
                        this.charge -= 0.75
                        m.fireCDcycle = m.cycle + 2; //disable firing and adding more charge until empty
                    } else if (!input.fire) {
                        this.isDischarge = true;
                    }
                } else {
                    if (this.isDischarge) {
                        m.fireCDcycle = m.cycle + Math.floor(25 * b.fireCDscale);
                    }
                    this.isDischarge = false
                }
            },
            fireCharges() {
                const spread = (m.crouch ?
                    0.04 * (Math.random() - 0.5) + 0.09 * Math.sin(m.cycle * 0.12) :
                    0.23 * (Math.random() - 0.5) + 0.15 * Math.sin(m.cycle * 0.12)
                )
                const radius = 5 + 8 * Math.random() + (tech.isAmmoFoamSize && this.ammo < 300) * 12
                const SPEED = (m.crouch ? 1.2 : 1) * Math.max(2, 14 - radius * 0.25)
                const dir = m.angle + 0.15 * (Math.random() - 0.5)
                const velocity = {
                    x: 0.7 * player.velocity.x + SPEED * Math.cos(dir),
                    y: 0.5 * player.velocity.y + SPEED * Math.sin(dir)
                }
                const position = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }

                b.foam(position, Vector.rotate(velocity, spread), radius)
                this.applyKnock(velocity)
                m.fireCDcycle = m.cycle + Math.floor(1.5 * b.fireCDscale);
                this.charge += 1 + tech.isCapacitor
            },
            fire() { },
            do() { },
        },
        {
            name: "harpoon", //9
            // description: `throw a <strong>self-steering</strong> harpoon that uses <strong class='color-f'>energy</strong><br>to <strong>retract</strong> and refund its <strong class='color-ammo'>ammo</strong> cost<br><strong>1-2</strong> harpoons per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `throw a <strong>harpoon</strong> that uses <strong class='color-f'>energy</strong> to <strong>retract</strong><br><strong>harpoons</strong> refund <strong class='color-ammo'>ammo</strong><br><strong>${this.ammoPack.toFixed(1)}</strong> harpoons per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 0.77, //update this in railgun tech
            defaultAmmoPack: 0.77,
            have: false,
            fire() { },
            do() { },
            chooseFireMethod() {
                if (tech.isRailGun) {
                    this.do = this.railDo
                    this.fire = this.railFire
                    // } else if (tech.isGrapple) {
                    //     this.do = () => { }
                    //     this.fire = this.grappleFire
                } else {
                    this.do = () => { }
                    this.fire = this.harpoonFire
                }
            },
            charge: 0,
            railDo() {
                if (this.charge > 0) {
                    const DRAIN = (tech.isRailEnergy ? 0 : 0.002)
                    //exit railgun charging without firing
                    if (m.energy < DRAIN) {
                        m.fireCDcycle = m.cycle + 120; // cool down if out of energy
                        this.endCycle = 0;
                        this.charge = 0
                        b.refundAmmo()
                        return
                    }
                    //fire
                    if ((!input.fire && this.charge > 0.6)) {
                        const where = {
                            x: m.pos.x + 30 * Math.cos(m.angle),
                            y: m.pos.y + 30 * Math.sin(m.angle)
                        }
                        const closest = {
                            distance: 10000,
                            target: null
                        }
                        //push away blocks and mobs
                        const range = 600 + 500 * this.charge
                        for (let i = 0, len = mob.length; i < len; ++i) { //push away mobs when firing
                            if (!mob[i].isUnblockable) {
                                const SUB = Vector.sub(mob[i].position, m.pos)
                                const DISTANCE = Vector.magnitude(SUB)
                                if (DISTANCE < range + mob[i].radius) {
                                    const DEPTH = 100 + Math.min(range - DISTANCE + mob[i].radius, 1500)
                                    const FORCE = Vector.mult(Vector.normalise(SUB), 0.0015 * Math.sqrt(DEPTH) * mob[i].mass)
                                    mob[i].force.x += FORCE.x;
                                    mob[i].force.y += FORCE.y;

                                    let dmg = m.dmgScale * (mob[i].isDropPowerUp ? 350 : 1100) * tech.harpoonDensity * this.charge
                                    simulation.drawList.push({ //add dmg to draw queue
                                        x: mob[i].position.x,
                                        y: mob[i].position.y,
                                        radius: Math.log(dmg + 1.1) * 40 * mob[i].damageReduction + 3,
                                        color: 'rgba(100, 0, 200, 0.4)',
                                        time: 15
                                    });
                                    mob[i].damage(dmg);
                                }
                            }
                        }
                        for (let i = 0, len = body.length; i < len; ++i) { //push away blocks when firing
                            const SUB = Vector.sub(body[i].position, m.pos)
                            const DISTANCE = Vector.magnitude(SUB)
                            if (DISTANCE < range) {
                                const DEPTH = Math.min(range - DISTANCE, 500)
                                const FORCE = Vector.mult(Vector.normalise(SUB), 0.003 * Math.sqrt(DEPTH) * body[i].mass)
                                body[i].force.x += FORCE.x;
                                body[i].force.y += FORCE.y - body[i].mass * simulation.g * 1.5; //kick up a bit to give them some arc
                            }
                        }
                        for (let i = 0, len = powerUp.length; i < len; ++i) { //push away blocks when firing
                            const SUB = Vector.sub(powerUp[i].position, m.pos)
                            const DISTANCE = Vector.magnitude(SUB)
                            if (DISTANCE < range) {
                                const DEPTH = Math.min(range - DISTANCE, 500)
                                const FORCE = Vector.mult(Vector.normalise(SUB), 0.002 * Math.sqrt(DEPTH) * powerUp[i].mass)
                                powerUp[i].force.x += FORCE.x;
                                powerUp[i].force.y += FORCE.y - powerUp[i].mass * simulation.g * 1.5; //kick up a bit to give them some arc
                            }
                        }
                        //draw little dots near the edge of range
                        for (let i = 0, len = 10 + 25 * this.charge; i < len; i++) {
                            const unit = Vector.rotate({
                                x: 1,
                                y: 0
                            }, 6.28 * Math.random())
                            const where = Vector.add(m.pos, Vector.mult(unit, range * (0.6 + 0.3 * Math.random())))
                            simulation.drawList.push({
                                x: where.x,
                                y: where.y,
                                radius: 5 + 12 * Math.random(),
                                color: "rgba(100, 0, 200, 0.1)",
                                time: Math.floor(5 + 35 * Math.random())
                            });
                        }

                        const recoil = Vector.mult(Vector.normalise(Vector.sub(where, m.pos)), m.crouch ? 0.03 : 0.06)
                        player.force.x -= recoil.x
                        player.force.y -= recoil.y
                        const harpoonSize = tech.isLargeHarpoon ? 1 + 0.07 * Math.sqrt(this.ammo) : 1
                        const thrust = 0.15 * (this.charge)
                        if (tech.extraHarpoons) {
                            let targetCount = 0
                            const SPREAD = 0.06 + 0.05 * (!m.crouch)
                            let angle = m.angle - SPREAD * tech.extraHarpoons / 2;
                            const dir = {
                                x: Math.cos(angle),
                                y: Math.sin(angle)
                            }; //make a vector for the player's direction of length 1; used in dot product

                            for (let i = 0, len = mob.length; i < len; ++i) {
                                if (mob[i].alive && !mob[i].isBadTarget && !mob[i].shield && Matter.Query.ray(map, m.pos, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                                    const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                                    const dist = Vector.magnitude(Vector.sub(where, mob[i].position))
                                    if (dot > 0.95 - Math.min(dist * 0.00015, 0.3)) { //lower dot product threshold for targeting then if you only have one harpoon //target closest mob that player is looking at and isn't too close to target
                                        // if (this.ammo > -1) {
                                        //     this.ammo--
                                        b.harpoon(where, m.crouch ? null : mob[i], angle, harpoonSize, false, 35, false, thrust) //harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true, thrust = 0.1) {
                                        angle += SPREAD
                                        targetCount++
                                        if (targetCount > tech.extraHarpoons) break
                                        // }
                                    }
                                }
                            }
                            //if more harpoons and no targets left
                            if (targetCount < tech.extraHarpoons + 1) {
                                const num = tech.extraHarpoons + 1 - targetCount
                                for (let i = 0; i < num; i++) {
                                    b.harpoon(where, null, angle, harpoonSize, false, 35, false, thrust)
                                    angle += SPREAD
                                }
                            }
                            simulation.updateGunHUD();
                        } else {
                            //look for closest mob in player's LoS
                            const dir = {
                                x: Math.cos(m.angle),
                                y: Math.sin(m.angle)
                            }; //make a vector for the player's direction of length 1; used in dot product
                            for (let i = 0, len = mob.length; i < len; ++i) {
                                if (mob[i].alive && !mob[i].isBadTarget && Matter.Query.ray(map, m.pos, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                                    const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                                    const dist = Vector.magnitude(Vector.sub(where, mob[i].position))
                                    if (dist < closest.distance && dot > 0.98 - Math.min(dist * 0.00014, 0.3)) { //target closest mob that player is looking at and isn't too close to target
                                        closest.distance = dist
                                        closest.target = mob[i]
                                    }
                                }
                            }
                            b.harpoon(where, closest.target, m.angle, harpoonSize, false, 35, false, thrust)
                        }

                        this.charge = 0;
                    } else { //charging
                        if (tech.isFireMoveLock) {
                            Matter.Body.setVelocity(player, {
                                x: 0,
                                y: -55 * player.mass * simulation.g //undo gravity before it is added
                            });
                            player.force.x = 0
                            player.force.y = 0
                        }
                        m.fireCDcycle = m.cycle + 10 //can't fire until mouse is released
                        // const previousCharge = this.charge

                        //small b.fireCDscale = faster shots, b.fireCDscale=1 = normal shot,  big b.fireCDscale = slower chot
                        // let smoothRate = tech.isCapacitor ? 0.85 : Math.min(0.998, 0.985 * (0.98 + 0.02 * b.fireCDscale))
                        const rate = Math.sqrt(b.fireCDscale) * tech.railChargeRate * (tech.isCapacitor ? 0.6 : 1) * (m.crouch ? 0.8 : 1)
                        let smoothRate = Math.min(0.998, 0.94 + 0.05 * rate)


                        this.charge = 1 - smoothRate + this.charge * smoothRate
                        if (m.energy > DRAIN) m.energy -= DRAIN

                        //draw magnetic field
                        const X = m.pos.x
                        const Y = m.pos.y
                        const unitVector = {
                            x: Math.cos(m.angle),
                            y: Math.sin(m.angle)
                        }
                        const unitVectorPerp = Vector.perp(unitVector)

                        function magField(mag, arc) {
                            ctx.moveTo(X, Y);
                            ctx.bezierCurveTo(
                                X + unitVector.x * mag, Y + unitVector.y * mag,
                                X + unitVector.x * mag + unitVectorPerp.x * arc, Y + unitVector.y * mag + unitVectorPerp.y * arc,
                                X + unitVectorPerp.x * arc, Y + unitVectorPerp.y * arc)
                            ctx.bezierCurveTo(
                                X - unitVector.x * mag + unitVectorPerp.x * arc, Y - unitVector.y * mag + unitVectorPerp.y * arc,
                                X - unitVector.x * mag, Y - unitVector.y * mag,
                                X, Y)
                        }
                        ctx.fillStyle = `rgba(50,0,100,0.05)`;
                        const magSize = 8 * this.charge * tech.railChargeRate ** 3
                        const arcSize = 6 * this.charge * tech.railChargeRate ** 3
                        for (let i = 3; i < 7; i++) {
                            const MAG = magSize * i * i * (0.93 + 0.07 * Math.random())
                            const ARC = arcSize * i * i * (0.93 + 0.07 * Math.random())
                            ctx.beginPath();
                            magField(MAG, ARC)
                            magField(MAG, -ARC)
                            ctx.fill();
                        }
                    }
                }
            },
            railFire() {
                m.fireCDcycle = m.cycle + 10 //can't fire until mouse is released
                this.charge += 0.00001
            },
            // grappleFire() {
            //     const harpoonSize = (tech.isLargeHarpoon ? 1 + 0.1 * Math.sqrt(this.ammo) : 1) //* (m.crouch ? 0.7 : 1)
            //     const where = {
            //         x: m.pos.x + harpoonSize * 40 * Math.cos(m.angle),
            //         y: m.pos.y + harpoonSize * 40 * Math.sin(m.angle)
            //     }
            //     const num = Math.min(this.ammo, tech.extraHarpoons + 1)
            //     if (!m.crouch && num > 1) { //multiple harpoons
            //         const SPREAD = 0.06
            //         let angle = m.angle - SPREAD * num / 2;
            //         for (let i = 0; i < num; i++) {
            //             if (this.ammo > 0) {
            //                 this.ammo--
            //                 b.grapple(where, angle, true, harpoonSize)
            //                 angle += SPREAD
            //             }
            //         }
            //         this.ammo++ //make up for the ammo used up in fire()
            //         simulation.updateGunHUD();
            //         m.fireCDcycle = m.cycle + Math.floor(75 * b.fireCDscale) // cool down
            //         // } else if (m.crouch) {
            //         //     b.harpoon(where, null, m.angle, harpoonSize, false, 70)
            //     } else {
            //         if (tech.crouchAmmoCount) tech.crouchAmmoCount = 1
            //         b.grapple(where, m.angle, harpoonSize)
            //     }
            //     // m.fireCDcycle = m.cycle + Math.floor(75 * b.fireCDscale) // cool down
            //     m.fireCDcycle = m.cycle + 5 + 40 * b.fireCDscale + 60 * (m.energy < 0.05)

            // },
            harpoonFire() {
                const where = {
                    x: m.pos.x + 30 * Math.cos(m.angle),
                    y: m.pos.y + 30 * Math.sin(m.angle)
                }
                const closest = {
                    distance: 10000,
                    target: null
                }
                //look for closest mob in player's LoS
                const harpoonSize = (tech.isLargeHarpoon ? 1 + 0.1 * Math.sqrt(this.ammo) : 1) //* (m.crouch ? 0.7 : 1)
                const totalCycles = 6.5 * (tech.isFilament ? 1 + 0.013 * Math.min(110, this.ammo) : 1) * Math.sqrt(harpoonSize)

                if (tech.extraHarpoons && !m.crouch) { //multiple harpoons
                    const SPREAD = 0.2
                    let angle = m.angle - SPREAD * tech.extraHarpoons / 2;
                    const dir = { x: Math.cos(angle), y: Math.sin(angle) }; //make a vector for the player's direction of length 1; used in dot product
                    const range = 450 * (tech.isFilament ? 1 + 0.012 * Math.min(110, this.ammo) : 1)
                    let targetCount = 0
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && !mob[i].isBadTarget && !mob[i].shield && Matter.Query.ray(map, m.pos, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                            const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                            const dist = Vector.magnitude(Vector.sub(where, mob[i].position))
                            if (dist < range && dot > 0.9) { //lower dot product threshold for targeting then if you only have one harpoon //target closest mob that player is looking at and isn't too close to target
                                if (this.ammo > 0) {
                                    this.ammo--
                                    b.harpoon(where, mob[i], angle, harpoonSize, true, totalCycles) //Vector.angle(Vector.sub(where, mob[i].position), { x: 0, y: 0 })
                                    angle += SPREAD
                                    targetCount++
                                    if (targetCount > tech.extraHarpoons) break
                                }
                            }
                        }
                    }
                    //if more harpoons and no targets left
                    if (targetCount < tech.extraHarpoons + 1) {
                        const num = tech.extraHarpoons - targetCount
                        const delay = 1 //Math.floor(Math.max(4, 8 - 0.5 * tech.extraHarpoons))
                        let angle = m.angle - SPREAD * tech.extraHarpoons / 2;
                        let count = -1
                        let harpoonDelay = () => {
                            if (simulation.paused) {
                                requestAnimationFrame(harpoonDelay)
                            } else {
                                count++
                                if (!(count % delay) && this.ammo > 0) {
                                    this.ammo--
                                    b.harpoon({ x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }, null, angle, harpoonSize, true, totalCycles)
                                    angle += SPREAD
                                }
                                if (count < num * delay && m.alive) requestAnimationFrame(harpoonDelay);
                            }
                        }
                        requestAnimationFrame(harpoonDelay)
                    }
                    this.ammo++ //make up for the ammo used up in fire()
                    simulation.updateGunHUD();

                } else { //m.crouch makes a single harpoon with longer range
                    const dir = {
                        x: Math.cos(m.angle),
                        y: Math.sin(m.angle)
                    }; //make a vector for the player's direction of length 1; used in dot product
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && !mob[i].isBadTarget && Matter.Query.ray(map, m.pos, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                            const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                            const dist = Vector.magnitude(Vector.sub(where, mob[i].position))
                            if (dist < closest.distance && dot > 0.98 - Math.min(dist * 0.00014, 0.3)) { //target closest mob that player is looking at and isn't too close to target
                                closest.distance = dist
                                closest.target = mob[i]
                            }
                        }
                    }
                    if (m.crouch && m.onGround) {
                        b.harpoon(where, null, m.angle, harpoonSize, true, 1.6 * totalCycles, (m.crouch && tech.crouchAmmoCount && (tech.crouchAmmoCount - 1) % 2) ? false : true) //    harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true) {
                    } else {
                        b.harpoon(where, closest.target, m.angle, harpoonSize, true, totalCycles)
                    }
                }
                m.fireCDcycle = m.cycle + 5 + 35 * b.fireCDscale + 60 * (m.energy < 0.05) + tech.extraHarpoons // cool down is set when harpoon bullet returns to player
                const recoil = Vector.mult(Vector.normalise(Vector.sub(where, m.pos)), m.crouch ? 0.015 : 0.035)
                player.force.x -= recoil.x
                player.force.y -= recoil.y
            },
        }, {
            name: "mine", //10
            // description: `toss a <strong>proximity</strong> mine that <strong>sticks</strong> to walls<br>refund <strong>undetonated</strong> mines on <strong>exiting</strong> a level<br><strong>1-2</strong> mines per ${powerUps.orb.ammo()}`,
            descriptionFunction() {
                return `toss a <strong>proximity</strong> mine that <strong>sticks</strong> to walls<br>refund <strong>undetonated</strong> mines on <strong>exiting</strong> a level<br><strong>${this.ammoPack.toFixed(1)}</strong> mines per ${powerUps.orb.ammo()}`
            },
            ammo: 0,
            ammoPack: 0.77,
            defaultAmmoPack: 0.77,
            have: false,
            nameString(suffix = "") {
                if (tech.isFoamMine) {
                    return `<strong>foam</strong>`
                } else if (tech.isSuperMine) {
                    return `<strong>super ball${suffix}</strong>`
                } else {
                    return `<strong>nail${suffix}</strong>`
                }
            },
            do() {
                if (!input.field && m.crouch && !tech.isLaserMine) {
                    const cycles = 60 //30
                    const speed = 40
                    const v = {
                        x: speed * Math.cos(m.angle),
                        y: speed * Math.sin(m.angle)
                    } //m.Vy / 2 + removed to make the path less jerky
                    ctx.strokeStyle = "rgba(68, 68, 68, 0.2)" //color.map
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    for (let i = 1.5, len = 19; i < len + 1; i++) {
                        const time = cycles * i / len
                        ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
                    }
                    ctx.stroke()
                }
            },
            fire() {
                if (m.crouch) {
                    if (tech.isLaserMine) {
                        const speed = 30
                        const velocity = {
                            x: speed * Math.cos(m.angle),
                            y: speed * Math.sin(m.angle)
                        }
                        b.laserMine(m.pos, velocity)
                        m.fireCDcycle = m.cycle + Math.floor(65 * b.fireCDscale); // cool down
                    } else {
                        const pos = {
                            x: m.pos.x + 30 * Math.cos(m.angle),
                            y: m.pos.y + 30 * Math.sin(m.angle)
                        }
                        let speed = 36
                        if (Matter.Query.point(map, pos).length > 0) speed = -2 //don't launch if mine will spawn inside map
                        b.mine(pos, { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }, 0)
                        m.fireCDcycle = m.cycle + Math.floor(55 * b.fireCDscale); // cool down
                    }
                } else {
                    const pos = {
                        x: m.pos.x + 30 * Math.cos(m.angle),
                        y: m.pos.y + 30 * Math.sin(m.angle)
                    }
                    let speed = 23
                    if (Matter.Query.point(map, pos).length > 0) speed = -2 //don't launch if mine will spawn inside map
                    b.mine(pos, { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }, 0)
                    m.fireCDcycle = m.cycle + Math.floor(35 * b.fireCDscale); // cool down
                }
            }
        },
        {
            name: "laser", //11
            descriptionFunction() {
                return `emit a <strong>beam</strong> of collimated coherent <strong class='color-laser'>light</strong><br>reflects off map, <strong class='color-block'>blocks</strong>, and mobs <strong>${(tech.isWideLaser || tech.isPulseLaser) ? 0 : tech.laserReflections}</strong> times<br>costs <strong>${(tech.laserDrain * 6000).toFixed(1)}</strong> <strong class='color-f'>energy</strong> per second and 0 <strong>ammo</strong>`
            },
            ammo: 0,
            ammoPack: Infinity,
            defaultAmmoPack: Infinity,
            have: false,
            charge: 0,
            isStuckOn: false,
            angle: 0,
            isInsideArc(angle) {
                const mod = (a, n) => {
                    return a - Math.floor(a / n) * n
                }
                let diff = mod(angle - this.angle + Math.PI, 2 * Math.PI) - Math.PI
                return Math.abs(diff) < this.arcRange
            },
            arcRange: 0.78, //1.57,
            lensDamage: 1,
            lensDamageOn: 0, //set in tech
            lens() {
                this.stuckOn();
                this.angle += 0.03
                if (this.isInsideArc(m.angle)) {
                    this.lensDamage = this.lensDamageOn
                    ctx.lineWidth = 6 + this.lensDamageOn
                } else {
                    this.lensDamage = 1
                    ctx.lineWidth = 2
                }
                ctx.beginPath();
                ctx.arc(m.pos.x, m.pos.y, 60, this.angle - this.arcRange, this.angle + this.arcRange);
                ctx.strokeStyle = '#fff' //'rgba(255,255,255,0.9)' //'hsl(189, 100%, 95%)'
                ctx.stroke();
            },
            stuckOn() {
                if (tech.isStuckOn) {
                    if (this.isStuckOn) {
                        if (!input.fire) this.fire();
                        if (m.energy < tech.laserDrain + 0.06) this.isStuckOn = false
                    } else if (input.fire) {
                        this.isStuckOn = true
                    }
                    // console.log(this.isStuckOn)
                }
            },
            do() { },
            fire() { },
            chooseFireMethod() {
                this.lensDamage = 1
                if (tech.isLaserLens) {
                    this.do = this.lens
                } else {
                    this.do = this.stuckOn
                }
                if (tech.isPulseLaser) {
                    this.fire = () => {
                        const drain = Math.min(0.9 * m.maxEnergy, 0.01 * (tech.isCapacitor ? 10 : 1) / b.fireCDscale)
                        if (m.energy > drain && this.charge < 50 * m.maxEnergy) {
                            m.energy -= drain
                            this.charge += drain * 100
                        }
                    }
                    if (tech.historyLaser) {
                        const len = 1 + tech.historyLaser
                        const spacing = Math.ceil(30 - 2 * tech.historyLaser)
                        this.do = () => {
                            if (tech.isLaserLens) this.lens()
                            if (this.charge > 0) {
                                //draw charge level
                                const mag = 4.1 * Math.sqrt(this.charge)
                                ctx.beginPath();
                                for (let i = 0; i < len; i++) {
                                    const history = m.history[(m.cycle - i * spacing) % 600]
                                    const off = history.yOff - 24.2859
                                    ctx.moveTo(history.position.x, history.position.y - off);
                                    ctx.ellipse(history.position.x, history.position.y - off, mag, mag * 0.65, history.angle, 0, 2 * Math.PI)
                                }
                                ctx.fillStyle = `rgba(255,0,0,${0.09 * Math.sqrt(this.charge)})`;
                                ctx.fill();
                                //fire
                                if (!input.fire) {
                                    if (this.charge > 5) {
                                        m.fireCDcycle = m.cycle + Math.floor(35 * b.fireCDscale); // cool down
                                        for (let i = 0; i < len; i++) {
                                            const history = m.history[(m.cycle - i * spacing) % 600]
                                            const off = history.yOff - 24.2859
                                            b.pulse(1.65 * this.charge * this.lensDamage, history.angle, {
                                                x: history.position.x,
                                                y: history.position.y - off
                                            })
                                        }
                                    }
                                    this.charge = 0;
                                }
                            }
                        };
                    } else {
                        this.do = () => {
                            if (tech.isLaserLens) this.lens()
                            if (this.charge > 0) {
                                //draw charge level
                                ctx.beginPath();
                                ctx.arc(m.pos.x, m.pos.y, 4.2 * Math.sqrt(this.charge), 0, 2 * Math.PI);
                                // ctx.fillStyle = `rgba(255,0,0,${0.09 * Math.sqrt(this.charge)})`;
                                ctx.fillStyle = `rgba(255,0,0,${0.09 * Math.sqrt(this.charge)})`;
                                ctx.fill();
                                //fire  
                                if (!input.fire) {
                                    if (this.charge > 5) {
                                        m.fireCDcycle = m.cycle + Math.floor(35 * b.fireCDscale); // cool down
                                        if (tech.beamSplitter) {
                                            const divergence = m.crouch ? 0.15 : 0.35
                                            const angle = m.angle - tech.beamSplitter * divergence / 2
                                            for (let i = 0; i < 1 + tech.beamSplitter; i++) b.pulse(this.charge, angle + i * divergence)
                                        } else {
                                            b.pulse(1.8 * this.charge * this.lensDamage, m.angle)
                                        }
                                    }
                                    this.charge = 0;
                                }
                            }
                        };
                    }

                } else if (tech.beamCollimator) {
                    this.fire = this.fireSplitCollimator
                } else if (tech.beamSplitter) {
                    this.fire = this.fireSplit
                } else if (tech.historyLaser) {
                    this.fire = this.fireHistory
                } else if (tech.isWideLaser) {
                    this.fire = this.fireWideBeam
                } else {
                    this.fire = this.fireLaser
                }
                // this.fire = this.firePhoton
            },
            fireLaser() {
                const drain = tech.laserDrain / b.fireCDscale
                if (m.energy < drain) {
                    m.fireCDcycle = m.cycle + 100; // cool down if out of energy
                } else {
                    m.fireCDcycle = m.cycle
                    m.energy -= drain
                    const where = { x: m.pos.x + 20 * Math.cos(m.angle), y: m.pos.y + 20 * Math.sin(m.angle) }
                    b.laser(where, {
                        x: where.x + 5000 * Math.cos(m.angle),
                        y: where.y + 5000 * Math.sin(m.angle)
                    }, tech.laserDamage / b.fireCDscale * this.lensDamage);
                }
            },

            firePulse() { },
            fireSplit() {
                const drain = tech.laserDrain / b.fireCDscale
                if (m.energy < drain) {
                    m.fireCDcycle = m.cycle + 100; // cool down if out of energy
                } else {
                    m.fireCDcycle = m.cycle
                    m.energy -= drain
                    // const divergence = m.crouch ? 0.15 : 0.2
                    // const scale = Math.pow(0.9, tech.beamSplitter)
                    // const pushScale = scale * scale
                    let dmg = tech.laserDamage / b.fireCDscale * this.lensDamage // * scale //Math.pow(0.9, tech.laserDamage)
                    const where = { x: m.pos.x + 20 * Math.cos(m.angle), y: m.pos.y + 20 * Math.sin(m.angle) }
                    const divergence = m.crouch ? 0.15 : 0.35
                    const angle = m.angle - tech.beamSplitter * divergence / 2
                    for (let i = 0; i < 1 + tech.beamSplitter; i++) {
                        b.laser(where, {
                            x: where.x + 3000 * Math.cos(angle + i * divergence),
                            y: where.y + 3000 * Math.sin(angle + i * divergence)
                        }, dmg, tech.laserReflections, false)
                    }
                }
            },
            fireSplitCollimator() {
                const drain = tech.laserDrain / b.fireCDscale
                if (m.energy < drain) {
                    m.fireCDcycle = m.cycle + 100; // cool down if out of energy
                } else {
                    m.fireCDcycle = m.cycle
                    m.energy -= drain
                    const freq = 0.037
                    const len = tech.beamSplitter + 1
                    const phase = 2 * Math.PI / len
                    for (let i = 0; i < len; i++) {
                        if (Math.sin(m.cycle * freq + phase * (i) + Math.PI / 2) > 0 || !(m.cycle % 3)) ctx.globalAlpha = 0.35

                        const whereSweep = m.angle + (m.crouch ? 0.4 : 1) * (Math.sin(m.cycle * freq + phase * (i)))
                        const where = { x: m.pos.x + 30 * Math.cos(whereSweep), y: m.pos.y + 30 * Math.sin(whereSweep) }
                        b.laser(where, {
                            x: where.x + 5000 * Math.cos(m.angle),
                            y: where.y + 5000 * Math.sin(m.angle)
                        }, tech.laserDamage / b.fireCDscale * this.lensDamage);
                        ctx.globalAlpha = 1
                    }
                }
            },
            fireWideBeam() {
                const drain = tech.laserDrain / b.fireCDscale
                if (m.energy < drain) {
                    m.fireCDcycle = m.cycle + 100; // cool down if out of energy
                } else {
                    m.fireCDcycle = m.cycle
                    m.energy -= drain
                    const range = {
                        x: 5000 * Math.cos(m.angle),
                        y: 5000 * Math.sin(m.angle)
                    }
                    const rangeOffPlus = {
                        x: 7.5 * Math.cos(m.angle + Math.PI / 2),
                        y: 7.5 * Math.sin(m.angle + Math.PI / 2)
                    }
                    const rangeOffMinus = {
                        x: 7.5 * Math.cos(m.angle - Math.PI / 2),
                        y: 7.5 * Math.sin(m.angle - Math.PI / 2)
                    }
                    const dmg = 0.70 * tech.laserDamage / b.fireCDscale * this.lensDamage //  3.5 * 0.55 = 200% more damage
                    const where = {
                        x: m.pos.x + 30 * Math.cos(m.angle),
                        y: m.pos.y + 30 * Math.sin(m.angle)
                    }
                    const eye = {
                        x: m.pos.x + 15 * Math.cos(m.angle),
                        y: m.pos.y + 15 * Math.sin(m.angle)
                    }
                    ctx.strokeStyle = tech.laserColor;
                    ctx.lineWidth = 8
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    if (Matter.Query.ray(map, eye, where).length === 0 && Matter.Query.ray(body, eye, where).length === 0) {
                        b.laser(eye, {
                            x: eye.x + range.x,
                            y: eye.y + range.y
                        }, dmg, 0, true, 0.3)
                    }
                    for (let i = 1; i < tech.wideLaser; i++) {
                        let whereOff = Vector.add(where, {
                            x: i * rangeOffPlus.x,
                            y: i * rangeOffPlus.y
                        })
                        if (Matter.Query.ray(map, eye, whereOff).length === 0 && Matter.Query.ray(body, eye, whereOff).length === 0) {
                            ctx.moveTo(eye.x, eye.y)
                            ctx.lineTo(whereOff.x, whereOff.y)
                            b.laser(whereOff, {
                                x: whereOff.x + range.x,
                                y: whereOff.y + range.y
                            }, dmg, 0, true, 0.3)
                        }
                        whereOff = Vector.add(where, {
                            x: i * rangeOffMinus.x,
                            y: i * rangeOffMinus.y
                        })
                        if (Matter.Query.ray(map, eye, whereOff).length === 0 && Matter.Query.ray(body, eye, whereOff).length === 0) {
                            ctx.moveTo(eye.x, eye.y)
                            ctx.lineTo(whereOff.x, whereOff.y)
                            b.laser(whereOff, {
                                x: whereOff.x + range.x,
                                y: whereOff.y + range.y
                            }, dmg, 0, true, 0.3)
                        }
                    }
                    ctx.stroke();
                    if (tech.isLaserLens && b.guns[11].lensDamage !== 1) {
                        ctx.lineWidth = 20 + 3 * b.guns[11].lensDamageOn
                        ctx.globalAlpha = 0.3
                        ctx.stroke();
                    }
                    ctx.globalAlpha = 1;
                }
            },
            fireHistory() {
                drain = tech.laserDrain / b.fireCDscale
                if (m.energy < drain) {
                    m.fireCDcycle = m.cycle + 100; // cool down if out of energy
                } else {
                    m.fireCDcycle = m.cycle
                    m.energy -= drain
                    const dmg = tech.laserDamage / b.fireCDscale * this.lensDamage
                    const spacing = Math.ceil(23 - tech.historyLaser)
                    ctx.beginPath();
                    b.laser({
                        x: m.pos.x + 20 * Math.cos(m.angle),
                        y: m.pos.y + 20 * Math.sin(m.angle)
                    }, {
                        x: m.pos.x + 3000 * Math.cos(m.angle),
                        y: m.pos.y + 3000 * Math.sin(m.angle)
                    }, dmg);

                    for (let i = 1, len = 1 + tech.historyLaser; i < len; i++) {
                        const history = m.history[(m.cycle - i * spacing) % 600]
                        const off = history.yOff - 24.2859 + 2 * i
                        // ctx.globalAlpha = 0.13
                        b.laser({
                            x: history.position.x + 20 * Math.cos(history.angle),
                            y: history.position.y + 20 * Math.sin(history.angle) - off
                        }, {
                            x: history.position.x + 3000 * Math.cos(history.angle),
                            y: history.position.y + 3000 * Math.sin(history.angle) - off
                        }, 0.7 * dmg, tech.laserReflections, true);
                    }
                    // ctx.globalAlpha = 1
                    ctx.strokeStyle = tech.laserColor;
                    ctx.lineWidth = 1
                    ctx.stroke();
                    if (tech.isLaserLens && b.guns[11].lensDamage !== 1) {
                        ctx.strokeStyle = tech.laserColor;
                        ctx.lineWidth = 10 + 2 * b.guns[11].lensDamageOn
                        ctx.globalAlpha = 0.2
                        ctx.stroke(); //glow
                        ctx.globalAlpha = 1;
                    }
                }
            },
        },
    ],
};