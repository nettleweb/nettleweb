//create array of mobs
let mob = [];
//method to populate the array above
const mobs = {
    loop() {
        let i = mob.length;
        while (i--) {
            if (mob[i].alive) {
                mob[i].do();
            } else {
                mob[i].replace(i); //removing mob and replace with body, this is done here to avoid an array index bug with drawing I think
            }
        }
    },
    draw() { },
    drawDefault() {
        ctx.lineWidth = 2;
        let i = mob.length;
        while (i--) {
            // if (Matter.Query.ray(map, mob[i].position, m.pos).length === 0) { //check if there is a ray between the mob and the player
            ctx.beginPath();
            const vertices = mob[i].vertices;
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.fillStyle = mob[i].fill;
            ctx.strokeStyle = mob[i].stroke;
            ctx.fill();
            ctx.stroke();
            // }
        }
    },
    defaultHealthBar() {
        for (let i = 0, len = mob.length; i < len; i++) {
            if (mob[i].seePlayer.recall && mob[i].showHealthBar) {
                const h = mob[i].radius * 0.3;
                const w = mob[i].radius * 2;
                const x = mob[i].position.x - w / 2;
                const y = mob[i].position.y - w * 0.7;
                ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                ctx.fillRect(x, y, w, h);
                ctx.fillStyle = "rgba(255,0,0,0.7)";
                ctx.fillRect(x, y, w * mob[i].health, h);
                // if (mob[i].isInvulnerable) {
                //     ctx.strokeStyle = "rgba(255,255,255,1)";
                //     ctx.lineWidth = 5
                //     ctx.strokeRect(x, y, w, h);
                // }
            }
        }
    },
    healthBar() { },
    statusSlow(who, cycles = 60) {
        applySlow(who)
        //look for mobs near the target
        if (tech.isAoESlow) {
            const range2 = (200 + 170 * Math.random()) ** 2
            for (let i = 0, len = mob.length; i < len; i++) {
                if (who !== mob[i] && Vector.magnitudeSquared(Vector.sub(who.position, mob[i].position)) < range2 + mob[i].radius) applySlow(mob[i])
            }
            simulation.drawList.push({
                x: who.position.x,
                y: who.position.y,
                radius: Math.sqrt(range2),
                color: "rgba(0,100,255,0.05)",
                time: simulation.drawTime
            });
        }

        function applySlow(whom) {
            if (!whom.shield && !whom.isShielded && whom.alive) {
                if (tech.isIceMaxHealthLoss && whom.health > 0.66 && whom.damageReduction > 0) whom.health = 0.66
                if (tech.isIceKill && whom.health < 0.34 && whom.damageReduction > 0 && whom.alive) {
                    // whom.death();
                    whom.damage(Infinity);
                    simulation.drawList.push({
                        x: whom.position.x,
                        y: whom.position.y,
                        radius: whom.radius * 1.2,
                        color: "rgb(0,100,255)",
                        time: 8
                    });
                    simulation.drawList.push({
                        x: whom.position.x,
                        y: whom.position.y,
                        radius: whom.radius * 0.7,
                        color: "rgb(0,100,255)",
                        time: 12
                    });
                    simulation.drawList.push({
                        x: whom.position.x,
                        y: whom.position.y,
                        radius: whom.radius * 0.4,
                        color: "rgb(0,100,255)",
                        time: 16
                    });
                }
                if (whom.isBoss) cycles = Math.floor(cycles * 0.25)
                let i = whom.status.length
                while (i--) {
                    if (whom.status[i].type === "slow") whom.status.splice(i, 1); //remove other "slow" effects on this mob
                }
                whom.isSlowed = true;
                whom.status.push({
                    effect() {
                        if (whom.speed > 1) {
                            const drag = 0.94
                            Matter.Body.setVelocity(whom, {
                                x: whom.velocity.x * drag,
                                y: whom.velocity.y * drag
                            });
                        }
                        Matter.Body.setAngularVelocity(whom, 0);
                        ctx.beginPath();
                        ctx.moveTo(whom.vertices[0].x, whom.vertices[0].y);
                        for (let j = 1, len = whom.vertices.length; j < len; ++j) {
                            ctx.lineTo(whom.vertices[j].x, whom.vertices[j].y);
                        }
                        ctx.lineTo(whom.vertices[0].x, whom.vertices[0].y);
                        ctx.strokeStyle = "rgba(0,100,255,0.8)";
                        ctx.lineWidth = 15;
                        ctx.stroke();
                        ctx.fillStyle = whom.fill
                        ctx.fill();
                    },
                    endEffect() {
                        //check to see if there are not other freeze effects?
                        whom.isSlowed = false;
                    },
                    type: "slow",
                    endCycle: simulation.cycle + cycles,
                })
            }
        }
    },
    statusStun(who, cycles = 180) {
        if (!who.shield && !who.isShielded) {
            if (who.speed > 3) {
                Matter.Body.setVelocity(who, {
                    x: who.velocity.x * 0.8,
                    y: who.velocity.y * 0.8
                });
            }
            Matter.Body.setAngularVelocity(who, who.angularVelocity * 0.8);
            //remove other "stun" effects on this mob
            let i = who.status.length
            while (i--) {
                if (who.status[i].type === "stun") who.status.splice(i, 1);
            }
            who.isStunned = true;
            who.status.push({
                effect() {
                    if (who.memory !== Infinity) {
                        who.seePlayer.yes = false;
                        who.seePlayer.recall = 0;
                        who.seePlayer.position = {
                            x: who.position.x + 100 * (Math.random() - 0.5),
                            y: who.position.y + 100 * (Math.random() - 0.5)
                        }
                    } else {
                        Matter.Body.setVelocity(who, {
                            x: who.velocity.x * 0.6,
                            y: who.velocity.y * 0.6
                        });
                    }
                    if (who.velocity.y < 2) who.force.y += who.mass * 0.0004 //extra gravity

                    //draw health bar
                    const h = who.radius * 0.3;
                    const w = who.radius * 2;
                    const x = who.position.x - w / 2;
                    const y = who.position.y - w * 0.7;
                    ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                    ctx.fillRect(x, y, w, h);
                    ctx.fillStyle = `rgba(${Math.floor(255 * Math.random())},${Math.floor(255 * Math.random())},${Math.floor(255 * Math.random())},0.5)`
                    ctx.fillRect(x, y, w * who.health, h);

                    //draw fill inside mob
                    ctx.beginPath();
                    ctx.moveTo(who.vertices[0].x, who.vertices[0].y);
                    for (let j = 1, len = who.vertices.length; j < len; ++j) {
                        ctx.lineTo(who.vertices[j].x, who.vertices[j].y);
                    }
                    ctx.lineTo(who.vertices[0].x, who.vertices[0].y);
                    ctx.fill();
                },
                endEffect() {
                    who.isStunned = false
                },
                type: "stun",
                endCycle: simulation.cycle + cycles * (who.isBoss ? 0.2 : 1),
            })
        }
    },
    statusDoT(who, tickDamage, cycles = 180) {
        if (!who.isShielded && who.alive && who.damageReduction > 0) {
            who.status.push({
                effect() {
                    if ((simulation.cycle - this.startCycle) % 30 === 0) {
                        let dmg = m.dmgScale * tech.radioactiveDamage * this.dmg
                        who.damage(dmg);
                        if (who.damageReduction) {
                            simulation.drawList.push({ //add dmg to draw queue
                                x: who.position.x + (Math.random() - 0.5) * who.radius * 0.5,
                                y: who.position.y + (Math.random() - 0.5) * who.radius * 0.5,
                                radius: Math.log(dmg + 1.1) * 40 * who.damageReduction + 3,
                                color: "rgba(0,80,80,0.9)",
                                time: simulation.drawTime
                            });
                        }
                    }
                },
                endEffect() { },
                dmg: tickDamage,
                type: "dot",
                endCycle: simulation.cycle + cycles,
                startCycle: simulation.cycle + 29 //makes sure it doesn't tick on first application
            })
        }
    },
    // statusBurn(who, tickDamage, cycles = 90 + Math.floor(90 * Math.random())) {
    //   if (!who.isShielded) {
    //     //remove other "burn" effects on this mob
    //     let i = who.status.length
    //     while (i--) {
    //       if (who.status[i].type === "burn") who.status.splice(i, 1);
    //     }
    //     who.status.push({
    //       effect() {
    //         if ((simulation.cycle - this.startCycle) % 15 === 0) {
    //           let dmg = m.dmgScale * tickDamage * 0.5 * (1 + Math.random())
    //           who.damage(dmg);
    //           simulation.drawList.push({ //add dmg to draw queue
    //             x: who.position.x,
    //             y: who.position.y,
    //             radius: Math.log(2 * dmg + 1.1) * 40,
    //             color: `rgba(255,${Math.floor(200*Math.random())},0,0.9)`,
    //             time: simulation.drawTime
    //           });
    //         }
    //       },
    //       type: "burn",
    //       endCycle: simulation.cycle + cycles,
    //       startCycle: simulation.cycle
    //     })
    //   }
    // },
    deathCount: 0,
    mobSpawnWithHealth: 1,
    setMobSpawnHealth() {
        mobs.mobSpawnWithHealth = 0.88 ** (tech.mobSpawnWithHealth)
    },
    //**********************************************************************************************
    //**********************************************************************************************
    spawn(xPos, yPos, sides, radius, color) {
        let i = mob.length;
        mob[i] = Matter.Bodies.polygon(xPos, yPos, sides, radius, {
            //inertia: Infinity, //prevents rotation
            mob: true,
            density: 0.001,
            //friction: 0,
            frictionAir: 0.005,
            //frictionStatic: 0,
            restitution: 0.5,
            collisionFilter: {
                group: 0,
                category: cat.mob,
                mask: cat.player | cat.map | cat.body | cat.bullet | cat.mob
            },
            onHit: undefined,
            alive: true,
            index: i,
            health: mobs.mobSpawnWithHealth,
            showHealthBar: true,
            accelMag: 0.001 * simulation.accelScale,
            cd: 0, //game cycle when cooldown will be over
            delay: 60, //static: time between cooldowns
            fill: color,
            stroke: "#000",
            seePlayer: {
                yes: false,
                recall: 0,
                position: {
                    x: xPos,
                    y: yPos
                }
            },
            radius: radius,
            spawnPos: {
                x: xPos,
                y: yPos
            },
            status: [], // [ { effect(), endCycle } ]
            checkStatus() {
                let j = this.status.length;
                while (j--) {
                    this.status[j].effect();
                    if (this.status[j].endCycle < simulation.cycle) {
                        this.status[j].endEffect();
                        this.status.splice(j, 1);
                    }
                }
            },
            isSlowed: false,
            isStunned: false,
            seeAtDistance2: Infinity, //sqrt(4000000) = 2000 = max seeing range
            distanceToPlayer() {
                const dx = this.position.x - player.position.x;
                const dy = this.position.y - player.position.y;
                return Math.sqrt(dx * dx + dy * dy);
            },
            distanceToPlayer2() {
                const dx = this.position.x - player.position.x;
                const dy = this.position.y - player.position.y;
                return dx * dx + dy * dy;
            },
            gravity() {
                this.force.y += this.mass * this.g;
            },
            seePlayerFreq: Math.floor(30 + 30 * Math.random()), //how often NPC checks to see where player is, lower numbers have better vision
            foundPlayer() {
                this.locatePlayer();
                if (!this.seePlayer.yes) {
                    this.alertNearByMobs();
                    this.seePlayer.yes = true;
                }
            },
            lostPlayer() {
                this.seePlayer.yes = false;
                this.seePlayer.recall -= this.seePlayerFreq;
                if (this.seePlayer.recall < 0) this.seePlayer.recall = 0;
            },
            memory: 120, //default time to remember player's location
            locatePlayer() { // updates mob's memory of player location
                this.seePlayer.recall = this.memory + Math.round(this.memory * Math.random()); //cycles before mob falls a sleep
                this.seePlayer.position.x = player.position.x;
                this.seePlayer.position.y = player.position.y;
            },
            alertNearByMobs() {
                //this.alertRange2 is set at the very bottom of this mobs, after mob is made
                for (let i = 0; i < mob.length; i++) {
                    if (!mob[i].seePlayer.recall && Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position)) < this.alertRange2) {
                        mob[i].locatePlayer();
                    }
                }
            },
            alwaysSeePlayer() {
                if (!m.isCloak) {
                    this.seePlayer.recall = 1;
                    this.seePlayer.position.x = player.position.x;
                    this.seePlayer.position.y = player.position.y;
                }
            },
            seePlayerByHistory(depth = 30) { //depth max 60?  limit of history
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 && !m.isCloak) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                        if (!m.isCloak) {
                            for (let i = 0; i < depth; i++) { //if lost player lock onto a player location in history
                                let history = m.history[(m.cycle - 10 * i) % 600]
                                if (Matter.Query.ray(map, this.position, history.position).length === 0) {
                                    this.seePlayer.recall = this.memory + Math.round(this.memory * Math.random()); //cycles before mob falls a sleep
                                    this.seePlayer.position.x = history.position.x;
                                    this.seePlayer.position.y = history.position.y;
                                    this.seePlayer.yes = true;
                                    //draw the history location found for testing purposes
                                    // ctx.beginPath();
                                    // ctx.moveTo(this.position.x, this.position.y);
                                    // ctx.lineTo(history.position.x, history.position.y);
                                    // ctx.lineWidth = 5;
                                    // ctx.strokeStyle = "#000";
                                    // ctx.stroke();
                                    break
                                }
                            }
                        }
                    }
                }
            },
            seePlayerCheck() {
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (
                        this.distanceToPlayer2() < this.seeAtDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        // Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0 &&
                        !m.isCloak
                    ) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
            },
            seePlayerCheckByDistance() {
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (this.distanceToPlayer2() < this.seeAtDistance2 && !m.isCloak) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
            },
            seePlayerByDistOrLOS() {
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (
                        (this.distanceToPlayer2() < this.seeAtDistance2 || (Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0)) && //&& Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                        !m.isCloak
                    ) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
            },
            isLookingAtPlayer(threshold) {
                const diff = Vector.normalise(Vector.sub(player.position, this.position));
                //make a vector for the mob's direction of length 1
                const dir = { x: Math.cos(this.angle), y: Math.sin(this.angle) };
                //the dot product of diff and dir will return how much over lap between the vectors
                const dot = Vector.dot(dir, diff);
                // console.log(Math.cos(dot)*180/Math.PI)
                if (dot > threshold) {
                    return true;
                } else {
                    return false;
                }
            },
            lookRange: 0.2 + Math.random() * 0.2,
            lookTorque: 0.0000004 * (Math.random() > 0.5 ? -1 : 1),
            seePlayerByLookingAt() {
                if (!(simulation.cycle % this.seePlayerFreq) && (this.seePlayer.recall || this.isLookingAtPlayer(this.lookRange))) {
                    if (
                        this.distanceToPlayer2() < this.seeAtDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        // Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0 &&
                        !m.isCloak
                    ) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
                //if you don't recall player location rotate and draw to show where you are looking
                if (!this.seePlayer.recall) {
                    this.torque = this.lookTorque * this.inertia;
                    //draw
                    const range = Math.PI * this.lookRange;
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.radius * 2.5, this.angle - range, this.angle + range);
                    ctx.arc(this.position.x, this.position.y, this.radius * 1.4, this.angle + range, this.angle - range, true);
                    ctx.fillStyle = "rgba(0,0,0,0.07)";
                    ctx.fill();
                }
            },
            playerPosRandomY() {
                return {
                    x: player.position.x, // + (Math.random() - 0.5) * 50,
                    y: player.position.y + (Math.random() - 0.5) * 110
                };
            },
            // hacked() { //set this.hackedTarget variable before running this method
            //   //find a new target
            //   if (!(simulation.cycle % this.seePlayerFreq)) {
            //     this.hackedTarget = null
            //     for (let i = 0, len = mob.length; i < len; i++) {
            //       if (mob[i] !== this) {
            //         // const DIST = Vector.magnitude(Vector.sub(this.position, mob[j]));
            //         if (Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
            //           Matter.Query.ray(body, this.position, mob[i].position).length === 0) {
            //           this.hackedTarget = mob[i]
            //         }
            //       }
            //     }
            //   }
            //   //acceleration towards targets
            //   if (this.hackedTarget) {
            //     this.force = Vector.mult(Vector.normalise(Vector.sub(this.hackedTarget.position, this.position)), this.mass * 0.0015)
            //   }
            // },
            harmZone() {
                if (this.seePlayer.yes) {
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                    // ctx.lineDashOffset = 6*(simulation.cycle % 215);
                    if (this.distanceToPlayer() < this.laserRange) {
                        if (m.immuneCycle < m.cycle) {
                            m.damage(0.0003 * simulation.dmgScale);
                            if (m.energy > 0.1) m.energy -= 0.003
                        }
                        ctx.beginPath();
                        ctx.moveTo(this.position.x, this.position.y);
                        ctx.lineTo(m.pos.x, m.pos.y);
                        ctx.lineTo(m.pos.x + (Math.random() - 0.5) * 3000, m.pos.y + (Math.random() - 0.5) * 3000);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgb(255,0,170)";
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                        ctx.fillStyle = "rgba(255,0,170,0.15)";
                        ctx.fill();
                    }
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.laserRange * 0.9, 0, 2 * Math.PI);
                    ctx.strokeStyle = "rgba(255,0,170,0.5)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(255,0,170,0.03)";
                    ctx.fill();
                }
            },
            // laser() {
            //     if (this.seePlayer.recall && !this.isSlowed) {
            //         const seeRange = 2500;
            //         best = {
            //             x: null,
            //             y: null,
            //             dist2: Infinity,
            //             who: null,
            //             v1: null,
            //             v2: null
            //         };
            //         const look = {
            //             x: this.position.x + seeRange * Math.cos(this.angle),
            //             y: this.position.y + seeRange * Math.sin(this.angle)
            //         };
            //         best = vertexCollision(this.position, look, m.isCloak ? [map, body] : [map, body, [player]]);

            //         // hitting player
            //         if (best.who === player) {
            //             if (m.immuneCycle < m.cycle) {
            //                 const dmg = 0.0014 * simulation.dmgScale;
            //                 m.damage(dmg);
            //                 ctx.fillStyle = "#f00"; //draw damage
            //                 ctx.beginPath();
            //                 ctx.arc(best.x, best.y, dmg * 10000, 0, 2 * Math.PI);
            //                 ctx.fill();
            //             }
            //         }
            //         //draw beam
            //         if (best.dist2 === Infinity) {
            //             best = look;
            //         }
            //         ctx.beginPath();
            //         ctx.moveTo(this.position.x, this.position.y);
            //         ctx.lineTo(best.x, best.y);
            //         ctx.strokeStyle = "#f00"; // Purple path
            //         ctx.lineWidth = 1;
            //         ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
            //         ctx.stroke(); // Draw it
            //         ctx.setLineDash([]);
            //     }
            // },
            wing(a, radius = 250, ellipticity = 0.4, dmg = 0.0006) {
                const minorRadius = radius * ellipticity
                const perp = { x: Math.cos(a), y: Math.sin(a) } //
                const where = Vector.add(this.position, Vector.mult(perp, radius + 0.8 * this.radius))

                ctx.beginPath();
                ctx.ellipse(where.x, where.y, radius, minorRadius, a, 0, 2 * Math.PI)
                ctx.fill();

                //check for wing -> player damage
                const hitPlayer = Matter.Query.ray([player], this.position, Vector.add(this.position, Vector.mult(perp, radius * 2.05)), minorRadius)
                if (hitPlayer.length && m.immuneCycle < m.cycle) {
                    m.damage(dmg * simulation.dmgScale);
                }
            },
            searchSpring() {
                //draw the two dots on the end of the springs
                ctx.beginPath();
                ctx.arc(this.cons.pointA.x, this.cons.pointA.y, 6, 0, 2 * Math.PI);
                ctx.arc(this.cons2.pointA.x, this.cons2.pointA.y, 6, 0, 2 * Math.PI);
                ctx.fillStyle = "#222";
                ctx.fill();

                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (
                        (this.seePlayer.recall || this.isLookingAtPlayer(this.lookRange)) &&
                        this.distanceToPlayer2() < this.seeAtDistance2 &&
                        Matter.Query.ray(map, this.position, player.position).length === 0 &&
                        Matter.Query.ray(body, this.position, player.position).length === 0 &&
                        !m.isCloak
                    ) {
                        this.foundPlayer();
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
            },
            springAttack() {
                // set new values of the ends of the spring constraints
                const stepRange = 600
                if (this.seePlayer.recall && Matter.Query.ray(map, this.position, this.seePlayer.position).length === 0) {
                    if (!(simulation.cycle % (this.seePlayerFreq * 2))) {
                        const unit = Vector.normalise(Vector.sub(this.seePlayer.position, this.position))
                        const goal = Vector.add(this.position, Vector.mult(unit, stepRange))
                        this.springTarget.x = goal.x;
                        this.springTarget.y = goal.y;
                        // this.springTarget.x = this.seePlayer.position.x;
                        // this.springTarget.y = this.seePlayer.position.y;
                        this.cons.length = -200;
                        this.cons2.length = 100 + 1.5 * this.radius;
                    } else if (!(simulation.cycle % this.seePlayerFreq)) {
                        const unit = Vector.normalise(Vector.sub(this.seePlayer.position, this.position))
                        const goal = Vector.add(this.position, Vector.mult(unit, stepRange))
                        this.springTarget2.x = goal.x;
                        this.springTarget2.y = goal.y;
                        // this.springTarget2.x = this.seePlayer.position.x;
                        // this.springTarget2.y = this.seePlayer.position.y;
                        this.cons.length = 100 + 1.5 * this.radius;
                        this.cons2.length = -200;
                    }
                } else {
                    this.torque = this.lookTorque * this.inertia;
                    //draw looking around arcs
                    const range = Math.PI * this.lookRange;
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.radius * 2.5, this.angle - range, this.angle + range);
                    ctx.arc(this.position.x, this.position.y, this.radius * 1.4, this.angle + range, this.angle - range, true);
                    ctx.fillStyle = "rgba(0,0,0,0.07)";
                    ctx.fill();
                    //spring to random place on map
                    if (!(simulation.cycle % (this.seePlayerFreq * 4))) {
                        best = {
                            x: null,
                            y: null,
                            dist2: Infinity,
                            who: null,
                            v1: null,
                            v2: null
                        };
                        const seeRange = 3000;
                        const look = {
                            x: this.position.x + seeRange * Math.cos(this.angle),
                            y: this.position.y + seeRange * Math.sin(this.angle)
                        };
                        best = vertexCollision(this.position, look, [map, body]);
                        if (best.dist2 != Infinity) {
                            if (Math.random() > 0.5) {
                                this.springTarget.x = best.x;
                                this.springTarget.y = best.y;
                                this.cons.length = 100 + 1.5 * this.radius;
                                this.cons2.length = 100 + 1.5 * this.radius;
                            } else {
                                this.springTarget2.x = best.x;
                                this.springTarget2.y = best.y;
                                this.cons.length = 100 + 1.5 * this.radius;
                                this.cons2.length = 100 + 1.5 * this.radius;
                            }
                        }
                    }
                }
            },
            curl(range = 1000, mag = -10) {
                //cause all mobs, and bodies to rotate in a circle
                applyCurl = function (center, array, isAntiGravity = true) {
                    for (let i = 0; i < array.length; ++i) {
                        if (!array[i].isNotHoldable) {
                            const sub = Vector.sub(center, array[i].position)
                            const radius2 = Vector.magnitudeSquared(sub);

                            //if too close, like center mob or shield, don't curl   // if too far don't curl
                            if (radius2 < range * range && radius2 > 10000) {
                                const curlVector = Vector.mult(Vector.perp(Vector.normalise(sub)), mag)
                                //apply curl force
                                if (array[i].isMobBullet) {
                                    Matter.Body.setVelocity(array[i], {
                                        x: array[i].velocity.x * 0.97 + curlVector.x * 0.06,
                                        y: array[i].velocity.y * 0.97 + curlVector.y * 0.06
                                    })
                                } else {
                                    Matter.Body.setVelocity(array[i], {
                                        x: array[i].velocity.x * 0.95 + curlVector.x * 0.06,
                                        y: array[i].velocity.y * 0.95 + curlVector.y * 0.06
                                    })
                                }
                                if (isAntiGravity) array[i].force.y -= 0.8 * simulation.g * array[i].mass
                                // //draw curl, for debugging
                                // ctx.beginPath();
                                // ctx.moveTo(array[i].position.x, array[i].position.y);
                                // ctx.lineTo(array[i].position.x + curlVector.x * 10, array[i].position.y + curlVector.y * 10);
                                // ctx.lineWidth = 2;
                                // ctx.strokeStyle = "#000";
                                // ctx.stroke();
                            }
                        }
                    }
                }
                applyCurl(this.position, mob, false);
                applyCurl(this.position, body);
                applyCurl(this.position, powerUp);
                // applyCurl(this.position, bullet);  // too powerful, just stops all bullets need to write a curl function just for bullets
                // applyCurl(this.position, [player]);

                //draw limit
                // ctx.beginPath();
                // ctx.arc(this.position.x, this.position.y, range, 0, 2 * Math.PI);
                // ctx.fillStyle = "rgba(55,255,255, 0.1)";
                // ctx.fill();
            },
            pullPlayer() {
                if (this.seePlayer.yes && Vector.magnitudeSquared(Vector.sub(this.position, player.position)) < 1000000) {
                    const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                    player.force.x -= simulation.accelScale * 0.00113 * player.mass * Math.cos(angle) * (m.onGround ? 2 : 1);
                    player.force.y -= simulation.accelScale * 0.00084 * player.mass * Math.sin(angle);

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
            },
            repelBullets() {
                // if (this.seePlayer.yes) {
                // ctx.lineWidth = "8";
                // ctx.strokeStyle = this.fill;
                // ctx.beginPath();
                for (let i = 0, len = bullet.length; i < len; ++i) {
                    const dx = bullet[i].position.x - this.position.x;
                    const dy = bullet[i].position.y - this.position.y;
                    const dist = Math.max(300, Math.sqrt(dx * dx + dy * dy))
                    if (dist < 700) {
                        ctx.moveTo(this.position.x, this.position.y);
                        ctx.lineTo(bullet[i].position.x, bullet[i].position.y);
                        const angle = Math.atan2(dy, dx);
                        const mag = (500 * bullet[i].mass * simulation.g) / dist;
                        bullet[i].force.x += mag * Math.cos(angle);
                        bullet[i].force.y += mag * Math.sin(angle);
                    }
                }
                // ctx.stroke();
                // }
            },
            attraction() {
                //accelerate towards the player
                if (this.seePlayer.recall) {
                    const force = Vector.mult(Vector.normalise(Vector.sub(this.seePlayer.position, this.position)), this.accelMag * this.mass)
                    this.force.x += force.x;
                    this.force.y += force.y;
                }
            },
            repulsionRange: 500000, //squared
            repulsion() {
                //accelerate towards the player
                if (this.seePlayer.recall && this.distanceToPlayer2() < this.repulsionRange) {
                    // && dx * dx + dy * dy < 2000000) {
                    const forceMag = this.accelMag * this.mass;
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                    this.force.x -= 2 * forceMag * Math.cos(angle);
                    this.force.y -= 2 * forceMag * Math.sin(angle); // - 0.0007 * this.mass; //antigravity
                }
            },
            hoverOverPlayer() {
                if (this.seePlayer.recall) {
                    // vertical positioning
                    const rangeY = 250;
                    if (this.position.y > this.seePlayer.position.y - this.hoverElevation + rangeY) {
                        this.force.y -= this.accelMag * this.mass;
                    } else if (this.position.y < this.seePlayer.position.y - this.hoverElevation - rangeY) {
                        this.force.y += this.accelMag * this.mass;
                    }
                    // horizontal positioning
                    const rangeX = 150;
                    if (this.position.x > this.seePlayer.position.x + this.hoverXOff + rangeX) {
                        this.force.x -= this.accelMag * this.mass;
                    } else if (this.position.x < this.seePlayer.position.x + this.hoverXOff - rangeX) {
                        this.force.x += this.accelMag * this.mass;
                    }
                }
            },
            grow() {
                if (this.seePlayer.recall) {
                    if (this.radius < 80) {
                        const scale = 1.01;
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale;
                        // this.torque = -0.00002 * this.inertia;
                        this.fill = `hsl(144, ${this.radius}%, 50%)`;
                        if (this.isShielded) { //remove shield if shielded when growing
                            this.isShielded = false;
                            this.removeConsBB();
                        }
                    }
                } else {
                    if (this.radius > 15) {
                        const scale = 0.99;
                        Matter.Body.scale(this, scale, scale);
                        this.radius *= scale;
                        this.fill = `hsl(144, ${this.radius}%, 50%)`;
                    }
                }
            },
            search() {
                //be sure to declare searchTarget in mob spawn
                //accelerate towards the searchTarget
                if (!this.seePlayer.recall) {
                    const newTarget = function (that) {
                        if (Math.random() < 0.0007) {
                            that.searchTarget = player.position; //chance to target player
                        } else {
                            //target random body
                            that.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position;
                        }
                    };

                    const sub = Vector.sub(this.searchTarget, this.position);
                    if (Vector.magnitude(sub) > this.radius * 2) {
                        // ctx.beginPath();
                        // ctx.strokeStyle = "#aaa";
                        // ctx.moveTo(this.position.x, this.position.y);
                        // ctx.lineTo(this.searchTarget.x,this.searchTarget.y);
                        // ctx.stroke();
                        //accelerate at 0.1 of normal acceleration
                        this.force = Vector.mult(Vector.normalise(sub), this.accelMag * this.mass * 0.2);
                    } else {
                        //after reaching random target switch to new target
                        newTarget(this);
                    }
                    //switch to a new target after a while
                    if (!(simulation.cycle % (this.seePlayerFreq * 15))) {
                        newTarget(this);
                    }
                }
            },
            blink() {
                //teleport towards player as a way to move
                if (this.seePlayer.recall && !(simulation.cycle % this.blinkRate)) {
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    const dist = Vector.sub(this.seePlayer.position, this.position);
                    const distMag = Vector.magnitude(dist);
                    const unitVector = Vector.normalise(dist);
                    const rando = (Math.random() - 0.5) * 50;
                    if (distMag < this.blinkLength) {
                        Matter.Body.translate(this, Vector.mult(unitVector, distMag + rando));
                    } else {
                        Matter.Body.translate(this, Vector.mult(unitVector, this.blinkLength + rando));
                    }
                    ctx.lineTo(this.position.x, this.position.y);
                    ctx.lineWidth = radius * 2;
                    ctx.strokeStyle = this.stroke; //"rgba(0,0,0,0.5)"; //'#000'
                    ctx.stroke();
                }
            },
            drift() {
                //teleport towards player as a way to move
                if (this.seePlayer.recall && !(simulation.cycle % this.blinkRate)) {
                    // && !m.lookingAtMob(this,0.5)){
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    const dist = Vector.sub(this.seePlayer.position, this.position);
                    const distMag = Vector.magnitude(dist);
                    const vector = Vector.mult(Vector.normalise(dist), this.blinkLength);
                    if (distMag < this.blinkLength) {
                        Matter.Body.setPosition(this, this.seePlayer.position);
                        Matter.Body.translate(this, {
                            x: (Math.random() - 0.5) * 50,
                            y: (Math.random() - 0.5) * 50
                        });
                    } else {
                        vector.x += (Math.random() - 0.5) * 200;
                        vector.y += (Math.random() - 0.5) * 200;
                        Matter.Body.translate(this, vector);
                    }
                    ctx.lineTo(this.position.x, this.position.y);
                    ctx.lineWidth = radius * 2;
                    ctx.strokeStyle = this.stroke;
                    ctx.stroke();
                }
            },
            bomb() {
                //throw a mob/bullet at player
                if (
                    !(simulation.cycle % this.fireFreq) &&
                    Math.abs(this.position.x - this.seePlayer.position.x) < 400 && //above player
                    Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 && //see player
                    Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                ) {
                    spawn.bomb(this.position.x, this.position.y + this.radius * 0.7, 9 + Math.ceil(this.radius / 15), 5);
                    //add spin and speed
                    Matter.Body.setAngularVelocity(mob[mob.length - 1], (Math.random() - 0.5) * 0.5);
                    Matter.Body.setVelocity(mob[mob.length - 1], { x: this.velocity.x, y: this.velocity.y });
                    //spin for mob as well
                    Matter.Body.setAngularVelocity(this, (Math.random() - 0.5) * 0.25);
                }
            },
            fire() {
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
                        this.fireDir.y -= Math.abs(this.seePlayer.position.x - this.position.x) / 2500; //gives the bullet an arc  //was    / 1600
                    }
                    //rotate towards fireAngle
                    const angle = this.angle + Math.PI / 2;
                    const dot = Vector.dot({
                        x: Math.cos(angle),
                        y: Math.sin(angle)
                    }, this.fireDir)
                    // c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                    const threshold = 0.1;
                    if (dot > threshold) {
                        this.torque += 0.000004 * this.inertia;
                    } else if (dot < -threshold) {
                        this.torque -= 0.000004 * this.inertia;
                    } else if (this.noseLength > 1.5 && dot > -0.2 && dot < 0.2) {
                        //fire
                        spawn.bullet(this.vertices[1].x, this.vertices[1].y, 9 + Math.ceil(this.radius / 15));
                        const v = 15;
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v + 3 * Math.random(),
                            y: this.velocity.y + this.fireDir.y * v + 3 * Math.random()
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
            },
            // launch() {
            //     if (this.seePlayer.recall) {
            //       //fire
            //       spawn.seeker(this.vertices[1].x, this.vertices[1].y, 5 + Math.ceil(this.radius / 15), 5);
            //       const v = 15;
            //       Matter.Body.setVelocity(mob[mob.length - 1], {
            //         x: this.velocity.x + this.fireDir.x * v + Math.random(),
            //         y: this.velocity.y + this.fireDir.y * v + Math.random()
            //       });
            //       // recoil
            //       this.force.x -= 0.005 * this.fireDir.x * this.mass;
            //       this.force.y -= 0.005 * this.fireDir.y * this.mass;
            //     }
            // },
            turnToFacePlayer() {
                //turn to face player
                const dx = player.position.x - this.position.x;
                const dy = -player.position.y + this.position.y;
                const dist = this.distanceToPlayer();
                const angle = this.angle + Math.PI / 2;
                c = Math.cos(angle) * dx - Math.sin(angle) * dy;
                // if (c > 0.04) {
                //   Matter.Body.rotate(this, 0.01);
                // } else if (c < 0.04) {
                //   Matter.Body.rotate(this, -0.01);
                // }
                if (c > 0.04 * dist) {
                    this.torque += 0.002 * this.mass;
                } else if (c < 0.04) {
                    this.torque -= 0.002 * this.mass;
                }
            },
            facePlayer() {
                const unitVector = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                const angle = Math.atan2(unitVector.y, unitVector.x);
                Matter.Body.setAngle(this, angle - Math.PI);
            },
            explode(mass = this.mass) {
                if (m.immuneCycle < m.cycle) {
                    m.damage(Math.min(Math.max(0.03 * Math.sqrt(mass), 0.01), 0.4) * simulation.dmgScale);
                    this.isDropPowerUp = false;
                    this.death(); //death with no power up or body
                }
            },
            timeLimit() {
                this.timeLeft--;
                if (this.timeLeft < 0) {
                    this.isDropPowerUp = false;
                    this.death(); //death with no power up
                }
            },
            //draw health by mob //most health bars are drawn in mobs.healthBar(); , not this
            healthBar() {
                if (this.seePlayer.recall && !level.isHideHealth) {
                    const h = this.radius * 0.3;
                    const w = this.radius * 2;
                    const x = this.position.x - w / 2;
                    const y = this.position.y - w * 0.7;
                    ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                    ctx.fillRect(x, y, w, h);
                    ctx.fillStyle = "rgba(255,0,0,0.7)";
                    ctx.fillRect(x, y, w * this.health, h);
                }
            },
            damage(dmg, isBypassShield = false) {
                if ((!this.isShielded || isBypassShield) && this.alive) {
                    if (dmg !== Infinity) {
                        dmg *= tech.damageFromTech()
                        if (this.isDropPowerUp) {
                            if (this.health === 1) {
                                if (tech.isMobFullHealthCloak) {
                                    dmg *= 2.11
                                    simulation.ephemera.push({
                                        name: "damage outline",
                                        count: 7, //cycles before it self removes
                                        vertices: this.vertices,
                                        do() {
                                            this.count--
                                            if (this.count < 0) simulation.removeEphemera(this.name)
                                            //draw body
                                            ctx.beginPath();
                                            const vertices = this.vertices;
                                            ctx.moveTo(vertices[0].x, vertices[0].y);
                                            for (let j = 1, len = vertices.length; j < len; ++j) {
                                                ctx.lineTo(vertices[j].x, vertices[j].y);
                                            }
                                            ctx.lineTo(vertices[0].x, vertices[0].y);
                                            ctx.fillStyle = `rgba(255,0,100,0.15)` //"rgba(150,150,225,0.5)";
                                            ctx.fill()
                                            ctx.lineWidth = 3 //60 * (0.25 - this.damageReductionGoal)
                                            ctx.strokeStyle = `#f08` //"rgba(150,150,225,0.5)";
                                            ctx.stroke();
                                        },
                                    })
                                }
                            } else if (tech.isMobLowHealth && this.health < 0.25) {
                                dmg *= 3

                                simulation.ephemera.push({
                                    name: "damage outline",
                                    count: 2, //cycles before it self removes
                                    vertices: this.vertices,
                                    do() {
                                        this.count--
                                        if (this.count < 0) simulation.removeEphemera(this.name)
                                        //draw body
                                        ctx.beginPath();
                                        const vertices = this.vertices;
                                        ctx.moveTo(vertices[0].x, vertices[0].y);
                                        for (let j = 1, len = vertices.length; j < len; ++j) {
                                            ctx.lineTo(vertices[j].x, vertices[j].y);
                                        }
                                        ctx.lineTo(vertices[0].x, vertices[0].y);
                                        ctx.fillStyle = `rgba(255,50,100,0.2)` //"rgba(150,150,225,0.5)";
                                        ctx.fill()
                                        ctx.lineWidth = 3 //60 * (0.25 - this.damageReductionGoal)
                                        ctx.strokeStyle = `#f38` //"rgba(150,150,225,0.5)";
                                        ctx.stroke();
                                    },
                                })
                            }
                        }

                        //mobs specific damage changes
                        if (tech.isFarAwayDmg) dmg *= 1 + Math.sqrt(Math.max(500, Math.min(3000, this.distanceToPlayer())) - 500) * 0.0067 //up to 33% dmg at max range of 3000
                        dmg *= this.damageReduction
                        //energy and heal drain should be calculated after damage boosts
                        if (tech.energySiphon && this.isDropPowerUp && m.immuneCycle < m.cycle) {
                            //dmg !== Infinity &&
                            const regen = Math.min(this.health, dmg) * tech.energySiphon * level.isReducedRegen
                            if (!isNaN(regen) && regen !== Infinity) m.energy += regen
                        }
                        dmg /= Math.sqrt(this.mass)
                    }

                    this.health -= dmg
                    //this.fill = this.color + this.health + ')';
                    this.onDamage(dmg); //custom damage effects
                    if ((this.health < 0.01 || isNaN(this.health)) && this.alive) this.death();
                }
            },
            onDamage() {
                // a placeholder for custom effects on mob damage
                //to use declare custom method in mob spawn
            },
            onDeath() {
                // a placeholder for custom effects on mob death
                // to use declare custom method in mob spawn
            },
            damageReduction: 1,
            // damageReductionGoal: 0.001, //must add this to boss set up:   me.damageReduction = 0.25
            // damageReductionScale: 0.004, //for bosses in this.onDamage  determines the impact of dmg on damageReductionGoal
            // armor() { //slowly reduce damage reduction, for bosses
            //     if (this.seePlayer.recall) {
            //         if (this.damageReductionGoal > 0.24) {
            //             this.damageReductionGoal = 0.25
            //         } else {
            //             this.damageReductionGoal = this.damageReductionGoal * 0.999 + 0.001 * 0.25 //smooth the goal towards 0.25 damage reduction
            //         }
            //         this.damageReduction = this.damageReduction * 0.995 + 0.005 * this.damageReductionGoal //smooth damage reduction towards the goal
            //         // console.log(`damageReduction = ${this.damageReduction.toFixed(4)}`, `damageReductionGoal = ${this.damageReductionGoal.toFixed(4)}`)
            //     }
            //     //draw armor
            //     //draw body
            //     ctx.beginPath();
            //     const vertices = this.vertices;
            //     ctx.moveTo(vertices[0].x, vertices[0].y);
            //     for (let j = 1, len = vertices.length; j < len; ++j) {
            //         ctx.lineTo(vertices[j].x, vertices[j].y);
            //     }
            //     ctx.lineTo(vertices[0].x, vertices[0].y);
            //     console.log(this.damageReduction, this.damageReductionGoal)
            //     ctx.lineWidth = 3 //60 * (0.25 - this.damageReductionGoal)
            //     ctx.strokeStyle = `rgba(255,255,255,${4.1*(0.25 - this.damageReductionGoal)})` //"rgba(150,150,225,0.5)";
            //     ctx.stroke();
            // },
            leaveBody: true,
            maxMobBody: 40,
            isDropPowerUp: true,
            death() {
                if (tech.collidePowerUps && this.isDropPowerUp) powerUps.randomize(this.position) //needs to run before onDeath spawns power ups
                this.onDeath(this); //custom death effects
                this.removeConsBB();
                this.alive = false; //triggers mob removal in mob[i].replace(i)
                // console.log(this.shieldCount)

                if (this.isDropPowerUp) {
                    if (level.isMobDeathHeal) {
                        for (let i = 0; i < mob.length; i++) {
                            if (Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position)) < 500000 && mob[i].alive) { //700
                                if (mob[i].health < 1) {
                                    mob[i].health += 0.33
                                    if (mob[i].health > 1) mob[i].health = 1
                                    simulation.drawList.push({
                                        x: mob[i].position.x,
                                        y: mob[i].position.y,
                                        radius: mob[i].radius + 20,
                                        color: "rgba(0,255,100,0.5)",
                                        time: 10
                                    });
                                }
                            }
                        }
                    }
                    if (this.isSoonZombie) { //spawn zombie on death
                        this.leaveBody = false;
                        let count = 5 //delay spawn cycles
                        let cycle = () => {
                            if (count > 0) {
                                if (m.alive) requestAnimationFrame(cycle);
                                if (!simulation.paused && !simulation.isChoosing) {
                                    count--
                                }
                            } else {
                                spawn.zombie(this.position.x, this.position.y, this.radius, this.vertices.length, this.fill) // zombie(x, y, radius, sides, color)
                            }
                        }
                        requestAnimationFrame(cycle);
                    }
                    if (tech.iceIXOnDeath && this.isSlowed) {
                        for (let i = 0, len = 2 * Math.sqrt(Math.min(this.mass, 25)) * tech.iceIXOnDeath; i < len; i++) b.iceIX(3, Math.random() * 2 * Math.PI, this.position)
                    }
                    if (tech.deathSpawnsFromBoss || tech.deathSpawns) {
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
                    if (level.isMobRespawn && !this.isBoss && 0.33 > Math.random()) {
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 30,
                            color: `#fff`,
                            time: 20
                        });
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 20,
                            color: `#fff`,
                            time: 40
                        });
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 10,
                            color: `#fff`,
                            time: 60
                        });
                        setTimeout(() => {
                            const pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                            const size = 16 + Math.ceil(Math.random() * 15)
                            spawn[pick](this.position.x, this.position.y, size);
                        }, 1000);
                    }
                    if (tech.healSpawn && Math.random() < tech.healSpawn) {
                        powerUps.spawn(this.position.x + 20 * (Math.random() - 0.5), this.position.y + 20 * (Math.random() - 0.5), "heal");
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 50,
                            color: "#0eb",
                            time: 12
                        });
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 100,
                            color: "#0eb",
                            time: 6
                        });
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 200,
                            color: "#0eb",
                            time: 3
                        });
                    }

                    if (tech.isVerlet && !m.isTimeDilated) {
                        requestAnimationFrame(() => {
                            simulation.timePlayerSkip(this.isBoss ? 60 : 30)
                            simulation.loop(); //ending with a wipe and normal loop fixes some very minor graphical issues where things are draw in the wrong locations
                        }); //wrapping in animation frame prevents errors, probably
                    }
                    if (tech.isEnergyLoss) {
                        m.energy -= 0.05;
                        if (m.energy < 0) m.energy = 0
                    }



                    if (tech.isRemineralize) {
                        //reduce mineral percent based on time since last check
                        const seconds = (simulation.cycle - tech.mineralLastCheck) / 60
                        tech.mineralLastCheck = simulation.cycle
                        tech.mineralDamageReduction = 1 - (1 - tech.mineralDamageReduction) * Math.pow(0.9, seconds);
                        tech.mineralDamage = 1 + (tech.mineralDamage - 1) * Math.pow(0.9, seconds);
                        //apply mineral damage reduction
                        tech.mineralDamageReduction *= 0.85
                    }
                    if (tech.isDemineralize) {
                        //reduce mineral percent based on time since last check
                        const seconds = (simulation.cycle - tech.mineralLastCheck) / 60
                        tech.mineralLastCheck = simulation.cycle
                        tech.mineralDamageReduction = 1 - (1 - tech.mineralDamageReduction) * Math.pow(0.9, seconds);
                        tech.mineralDamage = 1 + (tech.mineralDamage - 1) * Math.pow(0.9, seconds);
                        //apply mineral damage
                        tech.mineralDamage *= 1.08
                    }



                    powerUps.spawnRandomPowerUp(this.position.x, this.position.y);
                    m.lastKillCycle = m.cycle; //tracks the last time a kill was made, mostly used in simulation.checks()
                    mobs.mobDeaths++

                    if (Math.random() < tech.sporesOnDeath) {
                        const amount = Math.min(25, Math.floor(2 + this.mass * (0.5 + 0.5 * Math.random())))
                        if (tech.isSporeFlea) {
                            const len = amount / 2
                            for (let i = 0; i < len; i++) {
                                const speed = 10 + 5 * Math.random()
                                const angle = 2 * Math.PI * Math.random()
                                b.flea(this.position, { x: speed * Math.cos(angle), y: speed * Math.sin(angle) })
                            }
                        } else if (tech.isSporeWorm) {
                            const len = amount / 2
                            for (let i = 0; i < len; i++) b.worm(this.position)
                        } else {
                            for (let i = 0; i < amount; i++) b.spore(this.position)
                        }
                    }
                    if (tech.isExplodeMob) {
                        b.explosion(this.position, Math.min(700, Math.sqrt(this.mass + 6) * (30 + 60 * Math.random())))
                    }
                    if (tech.nailsDeathMob) {
                        b.targetedNail(this.position, tech.nailsDeathMob, 39 + 6 * Math.random())
                    }
                    if (tech.isBotSpawnerReset) {
                        for (let i = 0, len = bullet.length; i < len; i++) {
                            if (bullet[i].botType && bullet[i].endCycle !== Infinity) bullet[i].endCycle = simulation.cycle + 900 //15 seconds
                        }
                    }
                    if (Math.random() < tech.botSpawner) {
                        b.randomBot(this.position, false)
                        bullet[bullet.length - 1].endCycle = simulation.cycle + 900 //15 seconds
                        this.leaveBody = false; // no body since it turned into the bot
                    }
                    if (tech.isMobDeathImmunity) {
                        const immuneTime = 300
                        if (m.immuneCycle < m.cycle + immuneTime) m.immuneCycle = m.cycle + immuneTime; //player is immune to damage
                    }
                    if (tech.isAddRemoveMaxHealth) {
                        if (!this.isBoss) {
                            const amount = 0.0025
                            if (tech.isEnergyHealth) {
                                if (m.maxEnergy > amount) {
                                    tech.healMaxEnergyBonus -= amount
                                    m.setMaxEnergy();
                                }
                            } else if (m.maxHealth > amount) {
                                tech.extraMaxHealth -= amount //decrease max health
                                m.setMaxHealth();
                            }
                        }
                    }
                    if (tech.cloakDuplication && !this.isBoss) {
                        tech.cloakDuplication -= 0.01
                        powerUps.setPowerUpMode(); //needed after adjusting duplication chance
                    }
                } else if (tech.isShieldAmmo && this.shield && this.shieldCount === 1) {
                    let type = "ammo"
                    if (Math.random() < 0.4) {
                        type = "heal"
                    } else if (Math.random() < 0.3 && !tech.isSuperDeterminism) {
                        type = "research"
                    }
                    for (let i = 0, len = Math.ceil(2 * Math.random()); i < len; i++) {
                        powerUps.spawn(this.position.x, this.position.y, type);
                    }
                }
                if (tech.isRadioactive) {
                    //look for dots and spread them
                    let dmgTotal = 0
                    for (let i = 0, len = this.status.length; i < len; i++) {
                        if (this.status[i].type === "dot") dmgTotal += this.status[i].dmg * (this.status[i].endCycle - simulation.cycle)
                    }
                    if (dmgTotal > 0) { //look for closest mob
                        let closestRadius = 500;
                        let closestIndex = null;
                        for (let i = 0, len = mob.length; i < len; ++i) {
                            const radius = Vector.magnitude(Vector.sub(this.position, mob[i].position))
                            if (mob[i].alive && !mob[i].isShielded && radius < closestRadius) {
                                closestRadius = radius
                                closestIndex = i
                            }
                        }
                        if (closestIndex) {
                            mobs.statusDoT(mob[closestIndex], dmgTotal / 180, 180)
                            ctx.beginPath();
                            ctx.moveTo(this.position.x, this.position.y);
                            ctx.lineTo(mob[closestIndex].position.x, mob[closestIndex].position.y);
                            ctx.lineWidth = this.radius;
                            ctx.strokeStyle = "rgba(0,80,80,1)";
                            ctx.stroke();
                        }
                        //draw AOE
                        // simulation.drawList.push({ //add dmg to draw queue
                        //     x: this.position.x,
                        //     y: this.position.y,
                        //     radius: radius,
                        //     color: "rgba(0,80,80,0.03)",
                        //     time: 15
                        // });
                    }
                }
            },
            removeConsBB() {
                for (let i = 0, len = consBB.length; i < len; ++i) {
                    if (consBB[i].bodyA === this) {
                        if (consBB[i].bodyB.shield) { //&& !this.shield
                            consBB[i].bodyB.do = function () { this.death() }
                        }
                        consBB[i].bodyA = consBB[i].bodyB;
                        consBB.splice(i, 1);
                        this.removeConsBB();
                        break;
                    } else if (consBB[i].bodyB === this) {
                        if (consBB[i].bodyA.shield) {
                            consBB[i].bodyA.do = function () { this.death() }
                        }
                        consBB[i].bodyB = consBB[i].bodyA;
                        consBB.splice(i, 1);
                        this.removeConsBB();
                        break;
                    }
                }
            },
            removeCons() {
                for (let i = 0, len = cons.length; i < len; ++i) {
                    if (cons[i].bodyA === this) {
                        cons[i].bodyA = cons[i].bodyB;
                        cons.splice(i, 1);
                        this.removeCons();
                        break;
                    } else if (cons[i].bodyB === this) {
                        cons[i].bodyB = cons[i].bodyA;
                        cons.splice(i, 1);
                        this.removeCons();
                        break;
                    }
                }
            },
            //replace dead mob with a regular body
            replace(i) {
                //if there are too many bodies don't turn into blocks to help performance
                if (this.leaveBody && body.length < mobs.maxMobBody && this.mass < 200 && this.mass > 2 && this.radius > 18) {
                    let v = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices)) //might help with vertex collision issue, not sure
                    if (v.length > 5 && body.length < 35 && Math.random() < 0.25) {
                        const cutPoint = 3 + Math.floor((v.length - 6) * Math.random()) //Math.floor(v.length / 2)
                        const v2 = v.slice(0, cutPoint + 1)
                        v = v.slice(cutPoint - 1)
                        const len = body.length;
                        body[len] = Matter.Bodies.fromVertices(this.position.x, this.position.y, v2);
                        Matter.Body.setVelocity(body[len], Vector.mult(this.velocity, 0.5));
                        Matter.Body.setAngularVelocity(body[len], this.angularVelocity);
                        body[len].collisionFilter.category = cat.body;
                        body[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet;
                        body[len].classType = "body";
                        body[len].frictionAir = 0.001
                        body[len].friction = 0.05
                        Composite.add(engine.world, body[len]); //add to world

                        const len2 = body.length;
                        body[len2] = Matter.Bodies.fromVertices(this.position.x, this.position.y, v);
                        Matter.Body.setVelocity(body[len2], Vector.mult(this.velocity, 0.5));
                        Matter.Body.setAngularVelocity(body[len2], this.angularVelocity);
                        body[len2].collisionFilter.category = cat.body;
                        body[len2].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet;
                        body[len2].classType = "body";
                        body[len2].frictionAir = 0.001
                        body[len2].friction = 0.05
                        Composite.add(engine.world, body[len2]); //add to world

                        //large mobs shrink so they don't block paths
                        if (body[len].mass + body[len2].mass > 16) {
                            const massLimit = 8 + 6 * Math.random()
                            const shrink = function (that1, that2) {
                                if (that1.mass + that2.mass > massLimit) {
                                    const scale = 0.95;
                                    Matter.Body.scale(that1, scale, scale);
                                    Matter.Body.scale(that2, scale, scale);
                                    setTimeout(shrink, 20, that1, that2);
                                }
                            };
                            shrink(body[len], body[len2])
                        }
                    } else {
                        const len = body.length;
                        body[len] = Matter.Bodies.fromVertices(this.position.x, this.position.y, v);
                        Matter.Body.setVelocity(body[len], Vector.mult(this.velocity, 0.5));
                        Matter.Body.setAngularVelocity(body[len], this.angularVelocity);
                        body[len].collisionFilter.category = cat.body;
                        body[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet;
                        body[len].classType = "body";
                        body[len].frictionAir = 0.001
                        body[len].friction = 0.05
                        Composite.add(engine.world, body[len]); //add to world
                        //large mobs shrink so they don't block paths
                        if (body[len].mass > 9) {
                            const massLimit = 7 + 4 * Math.random()
                            const shrink = function (that) {
                                if (that.mass > massLimit) {
                                    const scale = 0.95;
                                    Matter.Body.scale(that, scale, scale);
                                    setTimeout(shrink, 20, that);
                                }
                            };
                            shrink(body[len])
                        }
                    }
                    Matter.Composite.remove(engine.world, this);
                    mob.splice(i, 1);
                    if (tech.isMobBlockFling) {
                        const who = body[body.length - 1]
                        if (!who.isNotHoldable) {
                            b.targetedBlock(who)
                            Matter.Body.setAngularVelocity(who, (0.5 + 0.2 * Math.random()) * (Math.random() < 0.5 ? -1 : 1));
                            // who.torque += who.inertia * 0.002 * (Math.random() - 0.5)
                        }
                    }
                } else {
                    Matter.Composite.remove(engine.world, this);
                    mob.splice(i, 1);
                }
            }
        });
        mob[i].alertRange2 = Math.pow(mob[i].radius * 3 + 550, 2);
        Composite.add(engine.world, mob[i]); //add to world
    }
};