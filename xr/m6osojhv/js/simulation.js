// game Object ********************************************************
//*********************************************************************
const simulation = {
    loop() { }, //main game loop, gets set to normal or testing loop
    // normalLoop() {
    //     try {
    //         simulation.gravity();
    //         Engine.update(engine, simulation.delta);
    //         simulation.wipe();
    //         simulation.textLog();
    //         if (m.onGround) {
    //             m.groundControl()
    //         } else {
    //             m.airControl()
    //         }
    //         m.move();
    //         m.look();
    //         simulation.camera();
    //         level.custom();
    //         powerUps.do();
    //         mobs.draw();
    //         simulation.draw.cons();
    //         simulation.draw.body();
    //         if (!m.isTimeDilated) mobs.loop();
    //         mobs.healthBar();
    //         m.draw();
    //         m.hold();
    //         level.customTopLayer();
    //         simulation.draw.drawMapPath();
    //         b.fire();
    //         b.bulletRemove();
    //         b.bulletDraw();
    //         if (!m.isTimeDilated) b.bulletDo();
    //         simulation.drawCircle();
    //         simulation.runEphemera();
    //         ctx.restore();
    //     } catch (error) {
    //         simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ${(error.stack && error.stack.replace(/\n/g, "<br>")) || (error.message + ` <u>${error.filename}:${error.lineno}</u>`)}`);
    //     } finally {
    //         simulation.drawCursor();
    //     }
    // },
    // testingLoop() {
    //     try {
    //         simulation.gravity();
    //         Engine.update(engine, simulation.delta);
    //         simulation.wipe();
    //         simulation.textLog();
    //         if (m.onGround) {
    //             m.groundControl()
    //         } else {
    //             m.airControl()
    //         }
    //         m.move();
    //         m.look();
    //         simulation.camera();
    //         level.custom();
    //         m.draw();
    //         m.hold();
    //         level.customTopLayer();
    //         simulation.draw.wireFrame();
    //         if (input.fire && m.fireCDcycle < m.cycle) {
    //             m.fireCDcycle = m.cycle + 15; //fire cooldown       
    //             for (let i = 0, len = mob.length; i < len; i++) {
    //                 if (Vector.magnitudeSquared(Vector.sub(mob[i].position, simulation.mouseInGame)) < mob[i].radius * mob[i].radius) {
    //                     console.log(mob[i])
    //                 }
    //             }
    //         }
    //         simulation.draw.cons();
    //         simulation.draw.testing();
    //         simulation.drawCircle();
    //         simulation.runEphemera();
    //         simulation.constructCycle()
    //     } catch (error) {
    //         simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ${(error.stack && error.stack.replace(/\n/g, "<br>")) || (error.message + ` <u>${error.filename}:${error.lineno}</u>`)}`);
    //     } finally {
    //         ctx.restore();
    //         simulation.testingOutput();
    //         simulation.drawCursor();
    //     }
    // },
    normalLoop() {
        simulation.gravity();
        Engine.update(engine, simulation.delta);
        simulation.wipe();
        simulation.textLog();
        if (m.onGround) {
            m.groundControl()
        } else {
            m.airControl()
        }
        m.move();
        m.look();
        simulation.camera();
        level.custom();
        powerUps.do();
        mobs.draw();
        simulation.draw.cons();
        simulation.draw.body();
        if (!m.isTimeDilated) mobs.loop();
        mobs.healthBar();
        m.draw();
        m.hold();
        level.customTopLayer();
        simulation.draw.drawMapPath();
        b.fire();
        b.bulletRemove();
        b.bulletDraw();
        if (!m.isTimeDilated) b.bulletDo();
        simulation.drawCircle();
        simulation.runEphemera();
        ctx.restore();
        simulation.drawCursor();
    },
    testingLoop() {
        simulation.gravity();
        Engine.update(engine, simulation.delta);
        simulation.wipe();
        simulation.textLog();
        if (m.onGround) {
            m.groundControl()
        } else {
            m.airControl()
        }
        m.move();
        m.look();
        simulation.camera();
        level.custom();
        m.draw();
        m.hold();
        level.customTopLayer();
        simulation.draw.wireFrame();
        if (input.fire && m.fireCDcycle < m.cycle) {
            m.fireCDcycle = m.cycle + 15; //fire cooldown       
            for (let i = 0, len = mob.length; i < len; i++) {
                if (Vector.magnitudeSquared(Vector.sub(mob[i].position, simulation.mouseInGame)) < mob[i].radius * mob[i].radius) {
                    console.log(mob[i])
                }
            }
        }
        simulation.draw.cons();
        simulation.draw.testing();
        simulation.drawCircle();
        simulation.runEphemera();
        simulation.constructCycle()
        ctx.restore();
        simulation.testingOutput();
        simulation.drawCursor();
    },
    isTimeSkipping: false,
    timeSkip(cycles = 60) {
        simulation.isTimeSkipping = true;
        for (let i = 0; i < cycles; i++) {
            simulation.cycle++;
            m.cycle++;
            simulation.gravity();
            Engine.update(engine, simulation.delta);
            if (m.onGround) {
                m.groundControl()
            } else {
                m.airControl()
            }
            m.move();
            level.custom();
            mobs.loop();
            m.walk_cycle += m.flipLegs * m.Vx;
            m.hold();
            level.customTopLayer();
            b.fire();
            b.bulletRemove();
            b.bulletDo();
            simulation.runEphemera();
        }
        simulation.isTimeSkipping = false;
    },
    timePlayerSkip(cycles = 60) {
        simulation.isTimeSkipping = true;
        for (let i = 0; i < cycles; i++) {
            simulation.cycle++;
            // m.walk_cycle += (m.flipLegs * m.Vx) * 0.5; //makes the legs look like they are moving fast this is just gonna run for each method call since it needs some tweaking
            simulation.gravity();
            Engine.update(engine, simulation.delta);
            // level.custom();
            // level.customTopLayer();
            if (!m.isTimeDilated) mobs.loop();
            if (m.fieldMode !== 7) m.hold();
            b.bulletRemove();
            if (!m.isTimeDilated) b.bulletDo();
            simulation.runEphemera();
        }
        simulation.isTimeSkipping = false;
    },
    ephemera: [], //array that is used to store ephemera objects
    removeEphemera: function (name) {
        for (let i = 0, len = simulation.ephemera.length; i < len; i++) {
            if (simulation.ephemera[i].name === name) {
                simulation.ephemera.splice(i, 1);
                break;
            }
        }
    },
    runEphemera() {
        for (let i = 0; i < simulation.ephemera.length; i++) {
            simulation.ephemera[i].do();
        }
    },
    // timeMobSkip() {
    //     simulation.gravity();
    //     Engine.update(engine, simulation.delta);
    //     simulation.wipe();
    //     simulation.textLog();
    //     if (m.onGround) {
    //         m.groundControl()
    //     } else {
    //         m.airControl()
    //     }
    //     m.move();
    //     m.look();
    //     simulation.camera();
    //     level.custom();
    //     powerUps.do();
    //     mobs.draw();
    //     simulation.draw.cons();
    //     simulation.draw.body();
    //     if (!m.isTimeDilated) {
    //         // mobs.loop();
    //     }
    //     mobs.healthBar();
    //     m.draw();
    //     m.hold();
    //     // v.draw(); //working on visibility work in progress
    //     level.customTopLayer();
    //     simulation.draw.drawMapPath();
    //     b.fire();
    //     b.bulletRemove();
    //     b.bulletDraw();
    //     if (!m.isTimeDilated) b.bulletDo();
    //     simulation.drawCircle();
    //     // simulation.clip();
    //     ctx.restore();
    //     simulation.drawCursor();
    //     // simulation.pixelGraphics();
    // },
    mouse: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    mouseInGame: {
        x: 0,
        y: 0
    },
    g: 0.0024, // applies to player, bodies, and power ups  (not mobs)
    onTitlePage: true,
    isCheating: false,
    isTraining: false,
    paused: false,
    isChoosing: false,
    testing: false, //testing mode: shows wire frame and some variables
    cycle: 0, //total cycles, 60 per second
    fpsCap: null, //limits frames per second to 144/2=72,  on most monitors the fps is capped at 60fps by the hardware
    fpsCapDefault: 72, //use to change fpsCap back to normal after a hit from a mob
    isCommunityMaps: false,
    cyclePaused: 0,
    fallHeight: 6000, //below this y position the player will teleport to start, take damage, or teleport to the sky based on the value of  level.fallMode
    lastTimeStamp: 0, //tracks time stamps for measuring delta
    delta: 1000 / 60, //speed of game engine //looks like it has to be 16.6666 to match player input
    buttonCD: 0,
    isHorizontalFlipped: false, //makes some maps flipped horizontally
    levelsCleared: 0,
    difficultyMode: 2, //normal difficulty is 2
    difficulty: 0,
    constraint: 0,
    dmgScale: null,
    healScale: 1,
    accelScale: null,
    CDScale: null,
    molecularMode: Math.floor(4 * Math.random()), //0 spores, 1 missile, 2 ice IX, 3 drones //randomize molecular assembler field type
    // dropFPS(cap = 40, time = 15) {
    //   simulation.fpsCap = cap
    //   simulation.fpsInterval = 1000 / simulation.fpsCap;
    //   simulation.defaultFPSCycle = simulation.cycle + time
    //   const normalFPS = function () {
    //     if (simulation.defaultFPSCycle < simulation.cycle) {
    //       simulation.fpsCap = 72
    //       simulation.fpsInterval = 1000 / simulation.fpsCap;
    //     } else {
    //       requestAnimationFrame(normalFPS);
    //     }
    //   };
    //   requestAnimationFrame(normalFPS);
    // },
    // clip() {

    // },
    pixelGraphics() {
        //copy current canvas pixel data
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;
        //change pixel data


        // const off = 4 * Math.floor(x) + 4 * canvas.width * Math.floor(y);
        // multiple windows
        for (let i = data.length / 2; i < data.length; i += 4) {
            index = i % (canvas.width * canvas.height * 2) // + canvas.width*4*canvas.height

            data[i + 0] = data[index + 0]; // red
            data[i + 1] = data[index + 1]; // red
            data[i + 2] = data[index + 2]; // red
            data[i + 3] = data[index + 3]; // red
        }

        for (let x = 0; x < len; x++) {

        }



        // const startX = 2 * canvas.width + 2 * canvas.width * canvas.height
        // const endX = 4 * canvas.width + 4 * canvas.width * canvas.height
        // const startY = 2 * canvas.width + 2 * canvas.width * canvas.height
        // const endY = 4 * canvas.width + 4 * canvas.width * canvas.height
        // for (let x = startX; x < endX; x++) {
        //   for (let y = startY; y < endY; y++) {

        //   }
        // }




        //strange draw offset
        // const off = canvas.height * canvas.width * 4 / 2
        // for (let index = 0; index < data.length; index += 4) {
        //   data[index + 0] = data[index + 0 + off]; // red
        //   data[index + 1] = data[index + 1 + off]; // red
        //   data[index + 2] = data[index + 2 + off]; // red
        //   data[index + 3] = data[index + 3 + off]; // red
        // }

        //change all pixels
        // for (let index = 0; index < data.length; index += 4) {
        // data[index + 0] = 255; // red
        // data[index + 1] = 255; // green
        // data[index + 2] = 255; // blue
        // data[index + 3] = 255; // alpha 
        // }

        //change random pixels
        // for (let i = 0, len = Math.floor(data.length / 10); i < len; ++i) {
        //   const index = Math.floor((Math.random() * data.length) / 4) * 4;
        //   data[index + 0] = 255; // red
        //   data[index + 1] = 0; // green
        //   data[index + 2] = 0; // blue
        //   data[index + 3] = 255 //Math.floor(Math.random() * Math.random() * 255); // alpha
        // }

        // //change random pixels
        // for (let i = 0, len = Math.floor(data.length / 1000); i < len; ++i) {
        //   const index = Math.floor((Math.random() * data.length) / 4) * 4;
        //   // data[index] = data[index] ^ 255; // Invert Red
        //   // data[index + 1] = data[index + 1] ^ 255; // Invert Green
        //   // data[index + 2] = data[index + 2] ^ 255; // Invert Blue
        //   data[index + 0] = 0; // red
        //   data[index + 1] = 0; // green
        //   data[index + 2] = 0; // blue
        //   // data[index + 3] = 255 //Math.floor(Math.random() * Math.random() * 255); // alpha
        // }

        //draw new pixel data to canvas
        ctx.putImageData(imgData, 0, 0);
    },
    drawCursor() {
        const size = 10;
        ctx.beginPath();
        ctx.moveTo(simulation.mouse.x - size, simulation.mouse.y);
        ctx.lineTo(simulation.mouse.x + size, simulation.mouse.y);
        ctx.moveTo(simulation.mouse.x, simulation.mouse.y - size);
        ctx.lineTo(simulation.mouse.x, simulation.mouse.y + size);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
        ctx.stroke(); // Draw it
    },
    drawCursorBasic() {
        const size = 10;
        ctx.beginPath();
        ctx.moveTo(simulation.mouse.x - size, simulation.mouse.y);
        ctx.lineTo(simulation.mouse.x + size, simulation.mouse.y);
        ctx.moveTo(simulation.mouse.x, simulation.mouse.y - size);
        ctx.lineTo(simulation.mouse.x, simulation.mouse.y + size);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
        ctx.stroke(); // Draw it
    },
    drawCursorCoolDown() {
        const size = 10;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
        ctx.beginPath();
        if (m.fireCDcycle > m.cycle) {
            ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
            ctx.arc(simulation.mouse.x, simulation.mouse.y, size + 1, 0, 2 * Math.PI);
        } else {
            ctx.strokeStyle = "#000"; //'rgba(0,0,0,0.4)'
        }
        ctx.moveTo(simulation.mouse.x - size, simulation.mouse.y);
        ctx.lineTo(simulation.mouse.x + size, simulation.mouse.y);
        ctx.moveTo(simulation.mouse.x, simulation.mouse.y - size);
        ctx.lineTo(simulation.mouse.x, simulation.mouse.y + size);
        ctx.stroke(); // Draw it
    },
    drawList: [], //so you can draw a first frame of explosions.. I know this is bad
    drawTime: 8, //how long circles are drawn.  use to push into drawlist.time
    mobDmgColor: "rgba(255,0,0,0.7)", //color when a mob damages the player  // set by mass-energy tech
    playerDmgColor: "rgba(0,0,0,0.7)", //color when the player damages a mob
    drawCircle() {
        //draws a circle for two cycles, used for showing damage mostly
        let i = simulation.drawList.length;
        while (i--) {
            ctx.beginPath(); //draw circle
            ctx.arc(simulation.drawList[i].x, simulation.drawList[i].y, simulation.drawList[i].radius, 0, 2 * Math.PI);
            ctx.fillStyle = simulation.drawList[i].color;
            ctx.fill();
            if (simulation.drawList[i].time) {
                simulation.drawList[i].time--;
            } else {
                if (!m.isTimeDilated) simulation.drawList.splice(i, 1); //remove when timer runs out
            }
        }
    },
    circleFlare(dup, loops = 100) {
        boltNum = dup * 300
        const bolts = []
        colors = [powerUps.research.color, powerUps.ammo.color, powerUps.heal.color, powerUps.tech.color, powerUps.field.color, powerUps.gun.color]
        for (let i = 0; i < boltNum; ++i) {
            const mag = 6 + 20 * Math.random()
            const angle = 2 * Math.PI * Math.random()
            bolts.push({
                x: m.pos.x,
                y: m.pos.y,
                Vx: mag * Math.cos(angle),
                Vy: mag * Math.sin(angle),
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }
        let count = 0
        loop = () => { //draw electricity
            if (count++ < loops) requestAnimationFrame(loop)
            for (let i = 0, len = bolts.length; i < len; ++i) {
                bolts[i].x += bolts[i].Vx
                bolts[i].y += bolts[i].Vy
                if (Math.random() < 0.2) {
                    simulation.drawList.push({
                        x: bolts[i].x,
                        y: bolts[i].y,
                        radius: 1.5 + 5 * Math.random(),
                        // color: "rgba(0,155,155,0.7)",
                        color: bolts[i].color,
                        time: Math.floor(9 + 25 * Math.random() * Math.random())
                    });
                }
            }
        }
        requestAnimationFrame(loop)
    },
    boldActiveGunHUD() {
        if (b.inventory.length > 0) {
            for (let i = 0, len = b.inventory.length; i < len; ++i) {
                if (b.inventory[i] === b.activeGun && document.getElementById(b.activeGun)) {
                    document.getElementById(b.inventory[i]).style.opacity = "1";
                } else {
                    document.getElementById(b.inventory[i]).style.opacity = "0.3";
                }
            }
        }
    },
    updateGunHUD() {
        for (let i = 0, len = b.inventory.length; i < len; ++i) {
            document.getElementById(b.inventory[i]).innerHTML = `${b.guns[b.inventory[i]].name} - ${b.guns[b.inventory[i]].ammo}`
        }
    },
    makeGunHUD() {
        //remove all nodes
        const myNode = document.getElementById("guns");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        //add nodes
        for (let i = 0, len = b.inventory.length; i < len; ++i) {
            const node = document.createElement("div");
            node.setAttribute("id", b.inventory[i]);
            const textNode = document.createTextNode(`${b.guns[b.inventory[i]].name} - ${b.guns[b.inventory[i]].ammo}`); //b.guns[b.inventory[i]].name + " - " + b.guns[b.inventory[i]].ammo);
            node.appendChild(textNode);
            document.getElementById("guns").appendChild(node);
        }
        simulation.boldActiveGunHUD();
    },
    // updateTechHUD() {
    //     let text = ""
    //     for (let i = 0, len = tech.tech.length; i < len; i++) { //add tech
    //         if (tech.tech[i].isLost) {
    //             if (text) text += "<br>" //add a new line, but not on the first line
    //             text += `<span style="text-decoration: line-through;">${tech.tech[i].name}</span>`
    //         } else if (tech.tech[i].count > 0 && !tech.tech[i].isInstant) {
    //             if (text) text += "<br>" //add a new line, but not on the first line
    //             text += `<span id = "${tech.tech[i].name}">${tech.tech[i].name}${tech.tech[i].count > 1 ? ` (${tech.tech[i].count}x)` : ""}</span>`

    //             // document.getElementById(tech.tech[i].name).style.fontWeight = 'bold';
    //             // simulation.ephemera.push({
    //             //     name: "bold",
    //             //     count: 180,
    //             //     do() {
    //             //         this.count--
    //             //         if (this.count < 0) {
    //             //             simulation.removeEphemera(this.name)
    //             //             if (document.getElementById(tech.tech[i].name)) document.getElementById(tech.tech[i].name).style.fontWeight = 'normal';
    //             //         }
    //             //     }
    //             // })
    //         }
    //     }
    //     document.getElementById("right-HUD").innerHTML = text
    // },
    updateTechHUD() {
        let text = ""
        for (let i = 0, len = tech.tech.length; i < len; i++) { //add tech
            if (tech.tech[i].isLost) {
                if (text) text += "<br>" //add a new line, but not on the first line
                text += `<span style="text-decoration: line-through;">${tech.tech[i].name}</span>`
            } else if (tech.tech[i].count > 0 && !tech.tech[i].isInstant) {
                if (text) text += "<br>" //add a new line, but not on the first line
                text += tech.tech[i].name
                if (tech.tech[i].count > 1) text += ` (${tech.tech[i].count}x)`
            }
        }
        document.getElementById("right-HUD").innerHTML = text
    },
    lastLogTime: 0,
    isTextLogOpen: true,
    inGameConsole(text, time = 240) {
        if (!localSettings.isHideHUD && simulation.isTextLogOpen && !build.isExperimentSelection) {
            if (simulation.lastLogTime > m.cycle) { //if there is an older message
                document.getElementById("text-log").innerHTML = document.getElementById("text-log").innerHTML + '<br>' + text;
                simulation.lastLogTime = m.cycle + time;
            } else {
                document.getElementById("text-log").innerHTML = text;
                document.getElementById("text-log").style.display = "inline";
                simulation.lastLogTime = m.cycle + time;
            }
        }
    },
    textLog() {
        if (simulation.lastLogTime && simulation.lastLogTime < m.cycle) {
            simulation.lastLogTime = 0;
            // document.getElementById("text-log").innerHTML = " ";
            document.getElementById("text-log").style.display = "none";
        }
    },
    nextGun() {
        if (b.inventory.length > 1 && !(tech.isGunCycle || tech.isGunChoice)) {
            b.inventoryGun++;
            if (b.inventoryGun > b.inventory.length - 1) b.inventoryGun = 0;
            simulation.switchGun();
        }
    },
    previousGun() {
        if (b.inventory.length > 1 && !(tech.isGunCycle || tech.isGunChoice)) {
            b.inventoryGun--;
            if (b.inventoryGun < 0) b.inventoryGun = b.inventory.length - 1;
            simulation.switchGun();
        }
    },
    switchToGunInInventory(num) {
        if (b.inventory[num] !== undefined && b.inventoryGun !== num) {
            b.inventoryGun = num
            simulation.switchGun();
        }
    },
    switchGun() {
        if (tech.isLongitudinal && b.activeGun === 3) b.guns[3].waves = []; //empty array of wave bullets
        if (tech.crouchAmmoCount) tech.crouchAmmoCount = 1 //this prevents hacking the tech by switching guns
        if (b.inventory.length > 0) b.activeGun = b.inventory[b.inventoryGun];
        b.guns[8].charge = 0; // foam charge to 0
        simulation.updateGunHUD();
        simulation.boldActiveGunHUD();
        //set crosshairs
        if (b.activeGun === 1) {
            simulation.drawCursor = simulation.drawCursorCoolDown
        } else {
            simulation.drawCursor = simulation.drawCursorBasic
        }
    },
    zoom: null,
    zoomScale: 1000,
    isAutoZoom: true,
    setZoom(zoomScale = simulation.zoomScale) { //use in window resize in index.js
        simulation.zoomScale = zoomScale
        simulation.zoom = canvas.height / zoomScale; //sets starting zoom scale
    },
    zoomTransition(newZoomScale, step = 2) {
        //old version
        // if (simulation.isAutoZoom) {
        //     const isBigger = (newZoomScale - simulation.zoomScale > 0) ? true : false;
        //     requestAnimationFrame(zLoop);
        //     const currentLevel = level.onLevel

        //     function zLoop() {
        //         if (currentLevel !== level.onLevel || simulation.isAutoZoom === false) return //stop the zoom if player goes to a new level

        //         if (isBigger) {
        //             simulation.zoomScale += step
        //             if (simulation.zoomScale >= newZoomScale) {
        //                 simulation.setZoom(newZoomScale);
        //                 return
        //             }
        //         } else {
        //             simulation.zoomScale -= step
        //             if (simulation.zoomScale <= newZoomScale) {
        //                 simulation.setZoom(newZoomScale);
        //                 return
        //             }
        //         }

        //         simulation.setZoom();
        //         requestAnimationFrame(zLoop);
        //     }
        // }


        //rewrite using the ephemera system
        if (simulation.isAutoZoom) {
            simulation.ephemera.push({
                name: "zoom",
                count: simulation.testing ? 0 : 120, //cycles before it self removes
                currentLevel: level.onLevel,
                do() {
                    this.count--
                    const step = (newZoomScale - simulation.zoomScale) / this.count
                    simulation.zoomScale += step
                    if (this.count < 1 && this.currentLevel === level.onLevel && simulation.isAutoZoom) {
                        simulation.zoomScale = newZoomScale
                        simulation.removeEphemera(this.name)
                    }
                    simulation.setZoom(simulation.zoomScale);
                },
            })
        }
    },
    isInvertedVertical: false,
    flipCameraVertical(frames = 1, passFunction = () => { }) {
        if (!simulation.isInvertedVertical) {
            if (frames > 0) {
                let count = 0
                const loop = () => {
                    if (m.alive) {
                        if (simulation.paused) {
                            requestAnimationFrame(loop);
                        } else {
                            count++
                            ctx.setTransform(1, 0, 0, 1, 0, 0); ///reset to avoid build up of transformations
                            if (count === frames) {
                                // Flip the canvas vertically
                                ctx.translate(0, canvas.height); // Move the origin down to the bottom
                                ctx.scale(1, -1); // Flip vertically
                                simulation.isInvertedVertical = true
                                //flip mouse Y again to make sure it caught
                                mouseMove = function (e) {
                                    simulation.mouse.x = e.clientX;
                                    simulation.mouse.y = window.innerHeight - e.clientY;
                                }
                            } else {
                                requestAnimationFrame(loop);
                                ctx.translate(0, canvas.height * count / frames);
                                ctx.scale(1, 1 - 2 * count / frames);
                            }
                            if (count === Math.floor(frames / 2)) {
                                //flip mouse Y at the 1/2 way point
                                mouseMove = function (e) {
                                    simulation.mouse.x = e.clientX;
                                    simulation.mouse.y = window.innerHeight - e.clientY;
                                }
                                //passFunction probably flips the map elements 
                                passFunction()
                            }
                        }
                    }
                }
                requestAnimationFrame(loop);
            } else {
                // Flip the canvas vertically
                ctx.translate(0, canvas.height); // Move the origin down to the bottom
                ctx.scale(1, -1); // Flip vertically
                //flip mouse Y
                simulation.isInvertedVertical = true
                mouseMove = function (e) {
                    simulation.mouse.x = e.clientX;
                    simulation.mouse.y = window.innerHeight - e.clientY;
                }
            }
        }
    },
    unFlipCameraVertical(frames = 0, passFunction = () => { }) {
        if (frames) {
            let count = 0
            const loop = () => {
                if (m.alive) {
                    if (simulation.paused) {
                        requestAnimationFrame(loop);
                    } else {
                        count++
                        ctx.setTransform(1, 0, 0, 1, 0, 0); ///reset to avoid build up of transformations
                        if (count === frames) {
                            // requestAnimationFrame(() => { ctx.reset(); });
                            // ctx.translate(0, 0);
                            // ctx.scale(1, 1);
                            simulation.isInvertedVertical = false
                            //flip mouse Y again to make sure it caught
                            mouseMove = mouseMoveDefault

                        } else {
                            requestAnimationFrame(loop);
                            ctx.translate(0, canvas.height - canvas.height * count / frames);
                            ctx.scale(1, -1 + 2 * count / frames);
                        }
                        if (count === Math.floor(frames / 2)) {
                            mouseMove = mouseMoveDefault//flip mouse Y at the 1/2 way point
                            passFunction()//passFunction probably draws new map elements 
                        }
                    }
                }
            }
            requestAnimationFrame(loop);
        } else {
            ctx.reset();
            ctx.font = "25px Arial";
            simulation.isInvertedVertical = false
            mouseMove = mouseMoveDefault
        }
    },
    translatePlayerAndCamera(where, isTranslateBots = true) {
        //infinite falling.  teleport to sky after falling
        const before = { x: player.position.x, y: player.position.y, }
        Matter.Body.setPosition(player, { x: where.x, y: where.y });
        const change = { x: before.x - player.position.x, y: before.y - player.position.y }
        // translate camera to preserve illusion to endless fall
        m.transX += change.x
        m.transY += change.y
        simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
        simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;

        m.angle = Math.atan2(simulation.mouseInGame.y - m.pos.y, simulation.mouseInGame.x - m.pos.x);

        //is there a reason to update m.pos here?
        // m.pos.x = player.position.x;
        // m.pos.y = playerBody.position.y - m.yOff;
        if (isTranslateBots) {
            for (let i = 0; i < bullet.length; i++) {
                if (bullet[i].botType) {
                    if (Vector.magnitudeSquared(Vector.sub(bullet[i].position, player.position)) > 1000000) { //far away bots teleport to player
                        Matter.Body.setPosition(bullet[i], Vector.add(player.position, { x: 250 * (Math.random() - 0.5), y: 250 * (Math.random() - 0.5) }));
                        Matter.Body.setVelocity(bullet[i], { x: 0, y: 0 });
                    } else { //close bots maintain relative distance to player on teleport
                        Matter.Body.setPosition(bullet[i], Vector.sub(bullet[i].position, change));
                    }
                }
            }
        }
    },
    setupCamera() { //makes the camera not scroll after changing locations
        // only works if velocity is zero
        m.pos.x = player.position.x;
        m.pos.y = playerBody.position.y - m.yOff;
        const scale = 0.8;
        m.transSmoothX = canvas.width2 - m.pos.x - (simulation.mouse.x - canvas.width2) * scale;
        m.transSmoothY = canvas.height2 - m.pos.y - (simulation.mouse.y - canvas.height2) * scale;
        m.transX += (m.transSmoothX - m.transX);
        m.transY += (m.transSmoothY - m.transY);
    },
    edgeZoomOutSmooth: 1,
    camera() {
        //zoom out when mouse gets near the edge of the window
        const dx = simulation.mouse.x / window.innerWidth - 0.5 //x distance from mouse to window center scaled by window width
        const dy = simulation.mouse.y / window.innerHeight - 0.5 //y distance from mouse to window center scaled by window height
        const d = Math.max(dx * dx, dy * dy)
        simulation.edgeZoomOutSmooth = (1 + 4 * d * d) * 0.04 + simulation.edgeZoomOutSmooth * 0.96

        ctx.save();
        ctx.translate(canvas.width2, canvas.height2); //center
        ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
        ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
        // ctx.translate(-canvas.width2 + m.transX - player.velocity.x, -canvas.height2 + m.transY + player.velocity.y); //translate
        //calculate in game mouse position by undoing the zoom and translations
        simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
        simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
    },
    //for moving camera away from player
    setCameraPosition(x, y, zoom = 1) {
        ctx.restore();
        ctx.save();
        ctx.translate(canvas.width2, canvas.height2); //center
        ctx.scale(zoom, zoom); //zoom in once centered
        ctx.translate(- x, - y); //center

        // ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
        // ctx.translate(-canvas.width2, -canvas.height2); //translate
        //calculate in game mouse position by undoing the zoom and translations
        simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
        simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
    },
    cameraNoLook() {
        ctx.save();
        ctx.translate(canvas.width2, canvas.height2); //center
        // ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
        ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
        //calculate in game mouse position by undoing the zoom and translations
        simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
        simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
    },
    restoreCamera() {
        ctx.restore();
    },
    trails(swapPeriod = 150) {
        // const swapPeriod = 150
        const len = 30
        for (let i = 0; i < len; i++) {
            setTimeout(function () {
                simulation.wipe = function () { //set wipe to have trails
                    ctx.fillStyle = `rgba(221,221,221,${i * i * 0.0005 + 0.0025})`;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }, (i) * swapPeriod);
        }

        setTimeout(function () {
            simulation.wipe = function () { //set wipe to normal
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }, len * swapPeriod);
    },
    // warp(translation = 5, skew = 0.05, scale = 0.05) {
    // if (simulation.cycle % 2) { //have to alternate frames or else successive rumbles over write the effects of the previous rumble
    // requestAnimationFrame(() => { ctx.setTransform(1, 0, 0, 1, 0, 0); }) //reset
    // requestAnimationFrame(() => {
    //     if (!simulation.paused && m.alive) {
    //         ctx.transform(1 - scale * (Math.random() - 0.5), skew * (Math.random() - 0.5), skew * (Math.random() - 0.5), 1 - scale * (Math.random() - 0.5), translation * (Math.random() - 0.5), translation * (Math.random() - 0.5)); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving)) //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
    //     }
    // })

    //reset
    // ctx.transform(1, 0, 0, 1, 0, 0); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving)) //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform

    // }
    // const loop = () => {
    //     if (!simulation.paused && m.alive) {
    //         ctx.save();
    //         ctx.transform(1 - scale * (Math.random() - 0.5), skew * (Math.random() - 0.5), skew * (Math.random() - 0.5), 1 - scale * (Math.random() - 0.5), translation * (Math.random() - 0.5), translation * (Math.random() - 0.5)); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving))
    //         requestAnimationFrame(() => { ctx.restore(); })
    //     }
    // }
    // requestAnimationFrame(loop);

    // function loop() {
    //     if (!simulation.paused && m.alive) {
    //         ctx.save();
    //         ctx.transform(1 - scale * (Math.random() - 0.5), skew * (Math.random() - 0.5), skew * (Math.random() - 0.5), 1 - scale * (Math.random() - 0.5), translation * (Math.random() - 0.5), translation * (Math.random() - 0.5)); //ctx.transform(Horizontal scaling. A value of 1 results in no scaling,  Vertical skewing,   Horizontal skewing,   Vertical scaling. A value of 1 results in no scaling,   Horizontal translation (moving),   Vertical translation (moving))
    //         requestAnimationFrame(() => { ctx.restore(); })
    //     }
    //     requestAnimationFrame(loop);
    // }
    // requestAnimationFrame(loop);
    // },
    wipe() { }, //set in simulation.startGame
    gravity() {
        function addGravity(bodies, magnitude) {
            for (var i = 0; i < bodies.length; i++) {
                bodies[i].force.y += bodies[i].mass * magnitude;
            }
        }
        if (!m.isTimeDilated) {
            addGravity(powerUp, simulation.g);
            addGravity(body, simulation.g);
        }
        player.force.y += player.mass * simulation.g;
    },
    firstRun: true,
    splashReturn() {
        document.getElementById("previous-seed").innerHTML = `previous seed: <span style="font-size:80%;">${Math.initialSeed}</span><br>`
        document.getElementById("seed").value = Math.initialSeed = Math.seed //randomize initial seed

        //String(document.getElementById("seed").value)
        // Math.seed = Math.abs(Math.hash(Math.initialSeed)) //update randomizer seed in case the player changed it


        simulation.clearTimeouts();
        simulation.onTitlePage = true;
        document.getElementById("splash").onclick = function () {
            simulation.startGame();
        };
        document.getElementById("choose-grid").style.visibility = "hidden"
        document.getElementById("choose-grid").style.opacity = "0"
        document.getElementById("info").style.display = "inline";
        document.getElementById("info").style.opacity = "0";
        document.getElementById("experiment-button").style.display = "inline"
        document.getElementById("experiment-button").style.opacity = "0";
        document.getElementById("training-button").style.display = "inline"
        document.getElementById("training-button").style.opacity = "0";
        document.getElementById("start-button").style.display = "inline"
        document.getElementById("start-button").style.opacity = "0";
        document.getElementById("experiment-grid").style.display = "none"
        document.getElementById("pause-grid-left").style.display = "none"
        document.getElementById("pause-grid-right").style.display = "none"
        document.getElementById("splash").style.display = "inline";
        document.getElementById("splash").style.opacity = "0";
        document.getElementById("dmg").style.display = "none";
        document.getElementById("health-bg").style.display = "none";
        document.getElementById("defense-bar").style.display = "none"
        document.getElementById("damage-bar").style.display = "none"
        document.body.style.cursor = "auto";
        setTimeout(() => {
            document.getElementById("experiment-button").style.opacity = "1";
            document.getElementById("training-button").style.opacity = "1";
            document.getElementById("start-button").style.opacity = "1";
            document.getElementById("info").style.opacity = "1";
            document.getElementById("splash").style.opacity = "1";
        }, 200);
    },
    fpsInterval: 0, //set in startGame
    then: null,
    startGame(isBuildRun = false, isTrainingRun = false) {
        simulation.isTextLogOpen = true
        simulation.clearMap()
        if (!isBuildRun) { //if a build run logic flow returns to "experiment-button").addEventListener
            document.body.style.cursor = "none";
            document.body.style.overflow = "hidden"
        }
        if (isTrainingRun) {
            simulation.isTraining = true
        } else {
            simulation.isTraining = false
        }
        simulation.onTitlePage = false;
        // document.getElementById("choose-grid").style.display = "none"
        document.getElementById("choose-grid").style.visibility = "hidden"
        document.getElementById("choose-grid").style.opacity = "0"
        document.getElementById("experiment-grid").style.display = "none"
        document.getElementById("info").style.display = "none";
        document.getElementById("experiment-button").style.display = "none";
        document.getElementById("training-button").style.display = "none";
        document.getElementById("start-button").style.display = "none";
        // document.getElementById("experiment-button").style.opacity = "0";
        document.getElementById("splash").onclick = null; //removes the onclick effect so the function only runs once
        document.getElementById("splash").style.display = "none"; //hides the element that spawned the function
        document.getElementById("dmg").style.display = "inline";
        document.getElementById("health").style.display = "inline"
        document.getElementById("health-bg").style.display = "inline";
        if (!localSettings.isHideHUD) {
            document.getElementById("right-HUD").style.display = "inline"
            document.getElementById("defense-bar").style.display = "inline"
            document.getElementById("damage-bar").style.display = "inline"
        } else {
            document.getElementById("right-HUD").style.display = "none"
            document.getElementById("defense-bar").style.display = "none"
            document.getElementById("damage-bar").style.display = "none"
        }
        document.getElementById("guns").style.display = "inline"
        document.getElementById("field").style.display = "inline"

        // document.body.style.overflow = "hidden"
        document.getElementById("pause-grid-left").style.display = "none"
        document.getElementById("pause-grid-right").style.display = "none"
        document.getElementById("pause-grid-right").style.opacity = "1"
        document.getElementById("pause-grid-left").style.opacity = "1"
        ctx.globalCompositeOperation = "source-over"
        ctx.shadowBlur = 0;

        mouseMove = mouseMoveDefault
        requestAnimationFrame(() => {
            ctx.setTransform(1, 0, 0, 1, 0, 0); //reset warp effect
            ctx.setLineDash([]) //reset stroke dash effect
        })
        // ctx.shadowColor = '#000';
        if (!m.isShipMode) {
            m.resetSkin() //set the play draw to normal, undoing some junk tech
            m.spawn(); //spawns the player
            m.look = m.lookDefault
        } else {
            Composite.add(engine.world, [player])
        }
        seededShuffle(level.constraint)
        level.populateLevels()
        input.endKeySensing();
        simulation.ephemera = []
        powerUps.powerUpStorage = []
        tech.resetAllTech(); //sets tech to default values
        b.resetAllGuns();
        for (i = 0, len = b.guns.length; i < len; i++) { //find which gun 
            if (b.guns[i].name === "laser") b.guns[i].chooseFireMethod()
            if (b.guns[i].name === "nail gun") b.guns[i].chooseFireMethod()
            if (b.guns[i].name === "super balls") b.guns[i].chooseFireMethod()
            if (b.guns[i].name === "harpoon") b.guns[i].chooseFireMethod()
            if (b.guns[i].name === "foam") b.guns[i].chooseFireMethod()
        }
        b.zeroBotCount()

        m.isSwitchingWorlds = false
        simulation.isChoosing = false;
        b.setFireMethod()
        b.setFireCD();
        for (let i = 0; i < b.guns.length; i++) b.guns[i].isRecentlyShown = false //reset recently shown back to zero
        for (let i = 0; i < m.fieldUpgrades.length; i++) m.fieldUpgrades[i].isRecentlyShown = false //reset recently shown back to zero
        for (let i = 0; i < tech.tech.length; i++) tech.tech[i].isRecentlyShown = false //reset recently shown back to zero

        powerUps.tech.choiceLog = [];
        powerUps.gun.choiceLog = [];
        powerUps.field.choiceLog = [];
        powerUps.totalPowerUps = 0;
        powerUps.research.count = 0;
        powerUps.boost.endCycle = 0
        powerUps.isFieldSpawned = false
        m.setFillColors();
        input.isPauseKeyReady = true
        simulation.wipe = function () { //set wipe to normal
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        m.lastHit = 0
        m.hole.isOn = false
        simulation.paused = false;
        engine.timing.timeScale = 1;
        simulation.fpsCap = simulation.fpsCapDefault;
        simulation.isAutoZoom = true;
        simulation.makeGunHUD();
        simulation.lastLogTime = 0;
        mobs.mobDeaths = 0
        level.isFlipped = false
        level.onLevel = 0;
        level.levelsCleared = 0;
        level.updateDifficulty()
        // level.setConstraints()

        simulation.clearNow = true;
        document.getElementById("text-log").style.display = "none"
        document.getElementById("fade-out").style.opacity = 0;
        document.title = "n-gon";
        simulation.inGameConsole(`Math.seed <span class='color-symbol'>=</span> ${Math.initialSeed}`);
        simulation.inGameConsole(`<span class='color-var'>const</span> engine <span class='color-symbol'>=</span> Engine.create(); <em>//simulation begin</em>`);
        simulation.inGameConsole(`engine.timing.timeScale <span class='color-symbol'>=</span> 1`);
        m.alive = true;
        m.definePlayerMass();
        m.onGround = false
        m.lastOnGroundCycle = 0
        m.health = 0;
        level.isLowHeal = false
        m.addHealth(0.25)
        m.drop();
        m.holdingTarget = null

        //set to default field
        tech.healMaxEnergyBonus = 0
        m.energy = 0
        m.immuneCycle = 0;
        m.coupling = 0
        m.setField(0) //this calls m.couplingChange(), which sets max health and max energy
        //exit testing
        if (simulation.testing) {
            simulation.testing = false;
            simulation.loop = simulation.normalLoop
            if (simulation.isConstructionMode) document.getElementById("construct").style.display = 'none'
        }
        simulation.isCheating = false
        simulation.firstRun = false;
        build.hasExperimentalMode = false
        build.isExperimentSelection = false;
        build.isExperimentRun = false;


        //setup checks
        if (!localSettings.isHideHUD) {
            simulation.ephemera.push({
                name: "dmgDefBars", count: 0, do() {
                    if (!(m.cycle % 15)) { //4 times a second
                        const defense = m.defense() //* simulation.dmgScale           //update defense bar
                        if (m.lastCalculatedDefense !== defense) {
                            document.getElementById("defense-bar").style.width = Math.floor(300 * m.maxHealth * (1 - defense)) + "px";
                            m.lastCalculatedDefense = defense
                        }
                        const damage = tech.damageFromTech() //* m.dmgScale           //update damage bar
                        if (m.lastCalculatedDamage !== damage) {
                            document.getElementById("damage-bar").style.height = Math.floor((Math.atan(0.25 * damage - 0.25) + 0.25) * 0.53 * canvas.height) + "px";
                            m.lastCalculatedDamage = damage
                        }
                    }
                },
            })
        }
        simulation.ephemera.push({
            name: "uniqueName", count: 0, do() {
                if (!(m.cycle % 60)) { //once a second
                    //energy overfill 
                    if (m.energy > m.maxEnergy) {
                        m.energy = m.maxEnergy + (m.energy - m.maxEnergy) * tech.overfillDrain //every second energy above max energy loses 25%
                        if (m.energy > 1000000) m.energy = 1000000
                    }
                    if (m.pos.y > simulation.fallHeight) { // if 4000px deep
                        if (level.fallMode === "start") {
                            //infinite falling.  teleport to sky after falling

                            simulation.ephemera.push({
                                name: "slow player",
                                count: 160, //cycles before it self removes
                                do() {
                                    this.count--
                                    if (this.count < 0 || m.onGround) simulation.removeEphemera(this.name)
                                    if (player.velocity.y > 70) Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.99 });
                                    if (player.velocity.y > 90) Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.99 });
                                },
                            })

                            const before = { x: player.position.x, y: player.position.y, }
                            Matter.Body.setPosition(player, { x: level.enter.x, y: level.enter.y - 3000 });
                            // Matter.Body.setPosition(player, level.fallPosition);

                            const change = { x: before.x - player.position.x, y: before.y - player.position.y }
                            // translate camera smoothly to preserve illusion to endless fall
                            m.transX += change.x
                            m.transY += change.y
                            simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
                            simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
                            m.angle = Math.atan2(simulation.mouseInGame.y - m.pos.y, simulation.mouseInGame.x - m.pos.x);
                            // move bots
                            for (let i = 0; i < bullet.length; i++) {
                                if (bullet[i].botType) Matter.Body.setPosition(bullet[i], Vector.sub(bullet[i].position, change));
                            }
                        } else if (level.fallMode === "position") { //fall and stay in the same horizontal position
                            simulation.ephemera.push({
                                name: "slow player",
                                count: 180, //cycles before it self removes
                                do() {
                                    this.count--
                                    if (this.count < 0 || m.onGround) simulation.removeEphemera(this.name)
                                    if (player.velocity.y > 70) Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.99 });
                                    if (player.velocity.y > 90) Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.99 });
                                },
                            })
                            const before = { x: player.position.x, y: player.position.y, }
                            const posXClamped = Math.min(Math.max(level.fallModeBounds.left, player.position.x), level.fallModeBounds.right)
                            Matter.Body.setPosition(player, { x: posXClamped, y: level.enter.y - 4000 });

                            // translate camera smoothly to preserve illusion to endless fall
                            const change = { x: before.x - posXClamped, y: before.y - player.position.y }
                            m.transX += change.x
                            m.transY += change.y
                            simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
                            simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
                            m.angle = Math.atan2(simulation.mouseInGame.y - m.pos.y, simulation.mouseInGame.x - m.pos.x);

                            // move bots
                            for (let i = 0; i < bullet.length; i++) {
                                if (bullet[i].botType) Matter.Body.setPosition(bullet[i], Vector.sub(bullet[i].position, change));
                            }
                        } else { //get hurt and go to start
                            Matter.Body.setVelocity(player, { x: 0, y: 0 });
                            Matter.Body.setPosition(player, { x: level.enter.x + 50, y: level.enter.y - 20 });
                            // move bots
                            for (let i = 0; i < bullet.length; i++) {
                                if (bullet[i].botType) {
                                    Matter.Body.setPosition(bullet[i], Vector.add(player.position, { x: 250 * (Math.random() - 0.5), y: 250 * (Math.random() - 0.5) }));
                                    Matter.Body.setVelocity(bullet[i], { x: 0, y: 0 });
                                }
                            }
                        }





                    }
                    if (isNaN(player.position.x)) m.death();
                    if (m.lastKillCycle + 300 > m.cycle) { //effects active for 5 seconds after killing a mob
                        if (tech.isEnergyRecovery && m.immuneCycle < m.cycle) {
                            m.energy += m.maxEnergy * 0.05 * level.isReducedRegen
                            simulation.drawList.push({ //add dmg to draw queue
                                x: m.pos.x,
                                y: m.pos.y - 45,
                                radius: Math.sqrt(m.maxEnergy * 0.05) * 60,
                                color: "rgba(0, 204, 255,0.4)", //#0cf
                                time: 4
                            });
                        }
                        if (tech.isHealthRecovery) {
                            if (tech.isEnergyHealth) {
                                if (m.immuneCycle < m.cycle) {
                                    m.energy += m.maxEnergy * 0.005 * level.isReducedRegen
                                    simulation.drawList.push({ //add dmg to draw queue
                                        x: m.pos.x,
                                        y: m.pos.y,
                                        radius: Math.sqrt(m.maxEnergy * 0.02) * 60,
                                        color: "rgba(0, 204, 255,0.4)", //#0cf
                                        time: 4
                                    });
                                }
                            } else {
                                const heal = 0.005 * m.maxHealth
                                m.addHealth(heal)
                                simulation.drawList.push({ //add dmg to draw queue
                                    x: m.pos.x,
                                    y: m.pos.y,
                                    radius: Math.sqrt(heal) * 150,
                                    color: "rgba(0,255,200,0.5)",
                                    time: 4
                                });
                            }
                        }
                    }

                    if (!(m.cycle % 420)) { //once every 7 seconds
                        //check if player is inside the map
                        if (Matter.Query.point(map, m.pos).length > 0 || Matter.Query.point(map, player.position).length > 0) {
                            //check for the next few seconds to see if being stuck continues
                            simulation.ephemera.push({
                                name: "stuck",
                                count: 240, //cycles before it self removes
                                do() {
                                    if (Matter.Query.point(map, m.pos).length > 0 || Matter.Query.point(map, player.position).length > 0) {
                                        this.count--

                                        if (this.count < 0) {
                                            simulation.removeEphemera(this.name)
                                            Matter.Body.setVelocity(player, { x: 0, y: 0 });
                                            Matter.Body.setPosition(player, { x: level.enter.x + 50, y: level.enter.y - 20 });
                                        }
                                    } else {
                                        simulation.removeEphemera(this.name)
                                    }
                                },
                            })
                        }
                        if (tech.isZeno) {
                            if (tech.isEnergyHealth) {
                                m.energy *= 0.95
                            } else {
                                m.health *= 0.95 //remove 5%
                                m.displayHealth();
                            }

                        }
                        if (tech.cyclicImmunity && m.immuneCycle < m.cycle + tech.cyclicImmunity) m.immuneCycle = m.cycle + tech.cyclicImmunity; //player is immune to damage for 60 cycles



                        let i = body.length;
                        while (i--) {
                            if (body[i].position.y > simulation.fallHeight) {
                                Matter.Composite.remove(engine.world, body[i]);
                                body.splice(i, 1);
                            }
                        }
                        i = powerUp.length
                        while (i--) {
                            if (powerUp[i].position.y > simulation.fallHeight) {
                                Matter.Body.setVelocity(powerUp[i], { x: 0, y: 0 });
                                if (level.fallMode === "position") {
                                    const posXClamped = Math.min(Math.max(level.fallModeBounds.left, powerUp[i].position.x), level.fallModeBounds.right)
                                    Matter.Body.setPosition(powerUp[i], { x: posXClamped, y: level.enter.y - 3000 });
                                } else {
                                    Matter.Body.setPosition(powerUp[i], {
                                        x: level.exit.x + 30 * (Math.random() - 0.5),
                                        y: level.exit.y + 30 * (Math.random() - 0.5)
                                    });
                                }
                            }
                        }
                        i = mob.length;
                        while (i--) {
                            if (mob[i].position.y > simulation.fallHeight) {
                                if (mob[i].isBoss && level.fallMode === "position") {
                                    Matter.Body.setVelocity(mob[i], { x: 0, y: 0 });
                                    const posXClamped = Math.min(Math.max(level.fallModeBounds.left, mob[i].position.x), level.fallModeBounds.right)
                                    Matter.Body.setPosition(mob[i], { x: posXClamped, y: level.enter.y - 3000 });
                                } else {
                                    mob[i].death();
                                }
                            }
                        }

                    }
                }
            },
        })

        //setup FPS cap
        simulation.fpsInterval = 1000 / simulation.fpsCap;
        simulation.then = Date.now();
        requestAnimationFrame(cycle); //starts game loop
    },
    clearTimeouts() {
        let id = window.setTimeout(function () { }, 0);
        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
    },
    clearNow: false,
    clearMap() {
        level.isVerticalFLipLevel = false
        level.isProcedural = false;
        level.fallMode = "";
        simulation.unFlipCameraVertical()
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (m.alive) {
            if (tech.isLongitudinal) b.guns[3].waves = []; //empty array of wave bullets
            if (b.guns[10].have) { //do you have mines as a gun
                let count = 0;
                for (i = 0, len = bullet.length; i < len; i++) { //count mines left on map
                    if (
                        (bullet[i].bulletType === "mine" && (!tech.isMineSentry || bullet[i].shots === undefined)) ||
                        bullet[i].bulletType === "laser mine") {
                        count++
                    }
                }
                if (tech.crouchAmmoCount) count = Math.ceil(count / 2)
                b.guns[10].ammo += count
                if (tech.ammoCap) b.guns[10].ammo = Math.min(tech.ammoCap, b.guns[10].ammo)
                simulation.updateGunHUD();
            }

            if (tech.isMutualism && !tech.isEnergyHealth) {
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].isMutualismActive) {
                        m.health += 0.01 + 0.01 * ((bullet[i].isSpore || bullet[i].isFlea) ? 0 : 1)
                        if (m.health > m.maxHealth) m.health = m.maxHealth;
                        m.displayHealth();
                    }
                }
            }
            if (tech.isEndLevelPowerUp) {
                for (let i = 0; i < powerUp.length; i++) {
                    if (powerUp[i].name === "tech") {
                        tech.giveTech()
                    } else if (powerUp[i].name === "gun") {
                        if (!tech.isOneGun) b.giveGuns("random")
                    } else if (powerUp[i].name === "field") {
                        if (m.fieldMode === 0) m.setField(Math.ceil(Math.random() * (m.fieldUpgrades.length - 1))) //pick a random field, but not field 0
                    } else {
                        powerUp[i].effect();
                    }
                }
            }
        }
        simulation.lastLogTime = 0; //clear previous messages
        spawn.allowShields = true;
        powerUps.totalPowerUps = powerUp.length
        let holdTarget = (m.holdingTarget) ? m.holdingTarget : undefined //if player is holding something this remembers it before it gets deleted
        tech.deathSpawnsFromBoss = 0;
        simulation.fallHeight = 3000;
        document.body.style.backgroundColor = "#eee" //"#d8dadf";
        // color.map = "#444";
        // color.bullet = "#FFFFFF";
        color = { //light
            // background: "#ddd", // used instead:  document.body.style.backgroundColor
            block: "rgba(140,140,140,0.85)",
            blockS: "#222",
            map: "#444",
            bullet: "#000"
        }
        simulation.draw.drawMapPath = simulation.draw.drawMapPathDefault
        m.fireCDcycle = 0
        m.drop();
        m.hole.isOn = false;
        simulation.drawList = [];
        mobs.maxMobBody = 40

        if (tech.isHealAttract && m.alive) { //send health power ups to the next level
            let healCount = 0
            for (let i = 0, len = powerUp.length; i < len; i++) {
                if (powerUp[i].name === "heal" && Vector.magnitudeSquared(Vector.sub(powerUp[i].position, m.pos)) < 1000000) healCount++
            }
            //respawn health in animation frame
            let respawnHeal = () => {
                if (healCount > 0) {
                    requestAnimationFrame(respawnHeal);
                    if (!simulation.paused && !simulation.isChoosing) {
                        healCount--
                        powerUps.directSpawn(level.enter.x + 50 + 100 * (Math.random() - 0.5), level.enter.y - 60 + 100 * (Math.random() - 0.5), "heal");
                    }
                }
            }
            requestAnimationFrame(respawnHeal);
        }
        if (tech.isDronesTravel && m.alive) {
            //count drones
            let droneCount = 0
            let sporeCount = 0
            let wormCount = 0
            let fleaCount = 0
            let deliveryCount = 0
            for (let i = 0; i < bullet.length; ++i) {
                if (bullet[i].isDrone) {
                    droneCount++
                    if (bullet[i].isImproved) deliveryCount++
                } else if (bullet[i].isSpore) {
                    sporeCount++
                } else if (bullet[i].wormSize) {
                    wormCount++
                } else if (bullet[i].isFlea) {
                    fleaCount++
                }
            }

            //respawn drones in animation frame
            requestAnimationFrame(() => { b.delayDrones({ x: level.enter.x + 50, y: level.enter.y - 60 }, droneCount, deliveryCount) });

            //respawn spores in animation frame
            let respawnSpores = () => {
                if (sporeCount > 0) {
                    requestAnimationFrame(respawnSpores);
                    if (!simulation.paused && !simulation.isChoosing) {
                        sporeCount--
                        const where = {
                            x: level.enter.x + 50,
                            y: level.enter.y - 60
                        }
                        b.spore({
                            x: where.x + 100 * (Math.random() - 0.5),
                            y: where.y + 120 * (Math.random() - 0.5)
                        })
                    }
                }
            }
            requestAnimationFrame(respawnSpores);

            //respawn worms in animation frame
            let respawnWorms = () => {
                if (wormCount > 0) {
                    requestAnimationFrame(respawnWorms);
                    if (!simulation.paused && !simulation.isChoosing) {
                        wormCount--
                        const where = {
                            x: level.enter.x + 50,
                            y: level.enter.y - 60
                        }
                        b.worm({
                            x: where.x + 100 * (Math.random() - 0.5),
                            y: where.y + 120 * (Math.random() - 0.5)
                        })
                    }
                }
            }
            requestAnimationFrame(respawnWorms);

            //respawn fleas in animation frame
            let respawnFleas = () => {
                if (fleaCount > 0) {
                    requestAnimationFrame(respawnFleas);
                    if (!simulation.paused && !simulation.isChoosing) {
                        fleaCount--
                        const where = {
                            x: level.enter.x + 50,
                            y: level.enter.y - 60
                        }
                        const speed = 6 + 3 * Math.random()
                        const angle = 2 * Math.PI * Math.random()
                        b.flea({
                            x: where.x + 100 * (Math.random() - 0.5),
                            y: where.y + 120 * (Math.random() - 0.5)
                        }, {
                            x: speed * Math.cos(angle),
                            y: speed * Math.sin(angle)
                        })
                    }
                }
            }
            requestAnimationFrame(respawnFleas);
        }
        if (tech.isQuantumEraser && m.alive) {
            let count = 0
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].isDropPowerUp && mob[i].alive) count++
            }
            count *= 0.3 //to fake the 25% chance, this makes it not random, and more predictable
            let cycle = () => { //run after waiting a cycle for the map to be cleared
                const types = ["heal", "ammo", "heal", "ammo", "research", "coupling", "boost", "tech", "gun", "field"]
                for (let i = 0; i < count; i++) powerUps.spawnDelay(types[Math.floor(Math.random() * types.length)], 1)
            }
            requestAnimationFrame(cycle);
        }

        function removeAll(array) {
            // for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
            for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
        }
        removeAll(map);
        map = [];
        removeAll(body);
        body = [];
        removeAll(mob);
        mob = [];
        removeAll(powerUp);
        powerUp = [];
        removeAll(cons);
        cons = [];
        removeAll(consBB);
        consBB = [];
        removeAll(bullet);
        bullet = [];
        removeAll(composite);
        composite = [];
        // if player was holding something this makes a new copy to hold
        if (holdTarget && m.alive) {
            len = body.length;
            body[len] = Matter.Bodies.fromVertices(0, 0, holdTarget.vertices, {
                friction: holdTarget.friction,
                frictionAir: holdTarget.frictionAir,
                frictionStatic: holdTarget.frictionStatic
            });
            Matter.Body.setPosition(body[len], m.pos);
            m.isHolding = true
            m.holdingTarget = body[len];
            m.holdingTarget.collisionFilter.category = 0;
            m.holdingTarget.collisionFilter.mask = 0;
            m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
            Composite.add(engine.world, m.holdingTarget); //add to world
            m.holdingTarget.classType = "body"
        }
        //set fps back to default
        simulation.fpsCap = simulation.fpsCapDefault
        simulation.fpsInterval = 1000 / simulation.fpsCap;
    },
    // getCoords: {
    //   //used when building maps, outputs a draw rect command to console, only works in testing mode
    //   pos1: {
    //     x: 0,
    //     y: 0
    //   },
    //   pos2: {
    //     x: 0,
    //     y: 0
    //   },
    //   out() {
    //     if (keys[49]) {
    //       simulation.getCoords.pos1.x = Math.round(simulation.mouseInGame.x / 25) * 25;
    //       simulation.getCoords.pos1.y = Math.round(simulation.mouseInGame.y / 25) * 25;
    //     }
    //     if (keys[50]) {
    //       //press 1 in the top left; press 2 in the bottom right;copy command from console
    //       simulation.getCoords.pos2.x = Math.round(simulation.mouseInGame.x / 25) * 25;
    //       simulation.getCoords.pos2.y = Math.round(simulation.mouseInGame.y / 25) * 25;
    //       window.getSelection().removeAllRanges();
    //       var range = document.createRange();
    //       range.selectNode(document.getElementById("test"));
    //       window.getSelection().addRange(range);
    //       document.execCommand("copy");
    //       window.getSelection().removeAllRanges();
    //     }
    //   }
    // },
    testingOutput() {
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(`(${simulation.mouseInGame.x.toFixed(1)}, ${simulation.mouseInGame.y.toFixed(1)})`, simulation.mouse.x, simulation.mouse.y - 20);
    },
    sight: { //credit to Cornbread2100 for adding this algorithm to n-gon
        // square: 0,
        intersectMap: [], //this is precalculated in simulation.draw.lineOfSightPrecalculation()
        getIntersection(v1, v1End, domain) {
            const intersections = simulation.sight.getIntersections(v1, v1End, domain);
            var best = { x: v1End.x, y: v1End.y, dist: (v1End.x - v1.x) ** 2 + (v1End.y - v1.y) ** 2 }
            for (const intersection of intersections) {
                const dist = (intersection.x - v1.x) ** 2 + (intersection.y - v1.y) ** 2;
                if (dist < best.dist) best = { x: intersection.x, y: intersection.y, dist: dist }
            }
            best.dist = Math.sqrt(best.dist)
            return best;
        },
        getIntersections(v1, v1End, domain) {
            const intersections = [];
            for (const obj of domain) {
                for (var i = 0; i < obj.vertices.length - 1; i++) {
                    results = simulation.checkLineIntersection(v1, v1End, obj.vertices[i], obj.vertices[i + 1]);
                    if (results.onLine1 && results.onLine2) intersections.push({ x: results.x, y: results.y });
                }
                results = simulation.checkLineIntersection(v1, v1End, obj.vertices[obj.vertices.length - 1], obj.vertices[0]);
                if (results.onLine1 && results.onLine2) intersections.push({ x: results.x, y: results.y });
            }
            return intersections;
        },
        circleLoS(pos, radius) {
            function allCircleLineCollisions(c, radius, domain) {
                var lines = [];
                for (const obj of domain) {
                    for (var i = 0; i < obj.vertices.length - 1; i++) lines.push(circleLineCollisions(obj.vertices[i], obj.vertices[i + 1], c, radius));
                    lines.push(circleLineCollisions(obj.vertices[obj.vertices.length - 1], obj.vertices[0], c, radius));
                }
                const collisionLines = [];
                for (const line of lines) {
                    if (line.length == 2) {
                        // const distance1 = Math.sqrt((line[0].x - c.x) ** 2 + (line[0].y - c.y) ** 2)
                        // const angle1 = Math.atan2(line[0].y - c.y, line[0].x - c.x);
                        // const queryPoint1 = {
                        //     x: Math.cos(angle1) * (distance1 - 1) + c.x,
                        //     y: Math.sin(angle1) * (distance1 - 1) + c.y
                        // }
                        // const distance2 = Math.sqrt((line[1].x - c.x) ** 2 + (line[1].y - c.y) ** 2)
                        // const angle2 = Math.atan2(line[1].y - c.y, line[1].x - c.x);
                        // const queryPoint2 = {
                        //     x: Math.cos(angle2) * (distance2 - 1) + c.x,
                        //     y: Math.sin(angle2) * (distance2 - 1) + c.y
                        // }
                        collisionLines.push(line)
                    }
                }

                return collisionLines;
            }

            function circleLineCollisions(a, b, c, radius) {
                // calculate distances
                const angleOffset = Math.atan2(b.y - a.y, b.x - a.x);
                const sideB = Math.sqrt((a.x - c.x) ** 2 + (a.y - c.y) ** 2);
                const sideC = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
                const sideA = Math.sqrt((c.x - b.x) ** 2 + (c.y - b.y) ** 2);

                // calculate the closest point on line AB to point C
                const angleA = Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) * (a.x - c.x) / -Math.abs(a.x - c.x)
                const sideAD = Math.cos(angleA) * sideB;
                const d = { // closest point
                    x: Math.cos(angleOffset) * sideAD + a.x,
                    y: Math.sin(angleOffset) * sideAD + a.y
                }
                const distance = Math.sqrt((d.x - c.x) ** 2 + (d.y - c.y) ** 2);
                if (distance == radius) {
                    // tangent
                    return [d];
                } else if (distance < radius) {
                    // secant
                    const angleOffset = Math.atan2(d.y - c.y, d.x - c.x);
                    const innerAngle = Math.acos(distance / radius);
                    const intersection1 = {
                        x: Math.cos(angleOffset + innerAngle) * radius + c.x,
                        y: Math.sin(angleOffset + innerAngle) * radius + c.y
                    }

                    const intersection2 = {
                        x: Math.cos(angleOffset - innerAngle) * radius + c.x,
                        y: Math.sin(angleOffset - innerAngle) * radius + c.y
                    }

                    const distance1 = {
                        a: Math.sqrt((intersection1.x - a.x) ** 2 + (intersection1.y - a.y) ** 2),
                        b: Math.sqrt((intersection1.x - b.x) ** 2 + (intersection1.y - b.y) ** 2)
                    }
                    const distance2 = {
                        a: Math.sqrt((intersection2.x - a.x) ** 2 + (intersection2.y - a.y) ** 2),
                        b: Math.sqrt((intersection2.x - b.x) ** 2 + (intersection2.y - b.y) ** 2)
                    }
                    const result = [];
                    if (Math.abs(sideC - (distance1.a + distance1.b)) < 0.01) {
                        result.push(intersection1);
                    } else {
                        if (distance1.a < distance1.b) {
                            if (sideB <= radius) result.push(a);
                        } else {
                            if (sideA <= radius) result.push(b)
                        }
                    }
                    if (Math.abs(sideC - (distance2.a + distance2.b)) < 0.01) {
                        result.push(intersection2);
                    } else {
                        if (distance2.a <= distance2.b) {
                            if (sideB <= radius) result.push(a);
                        } else {
                            if (sideA <= radius) result.push(b)
                        }
                    }

                    return result;
                } else {
                    // no intersection
                    return [];
                }
            }

            var vertices = [];
            for (const obj of simulation.sight.intersectMap) {
                for (var i = 0; i < obj.vertices.length; i++) {
                    const vertex = obj.vertices[i];
                    const angleToVertex = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                    // const distanceToVertex = Math.sqrt((vertex.x - pos.x) ** 2 + (vertex.y - pos.y) ** 2);
                    // const queryPoint = { x: Math.cos(angleToVertex) * (distanceToVertex - 1) + pos.x, y: Math.sin(angleToVertex) * (distanceToVertex - 1) + pos.y }
                    const queryPoint = { x: Math.cos(angleToVertex + Math.PI) + vertex.x, y: Math.sin(angleToVertex + Math.PI) + vertex.y }

                    if (Matter.Query.ray(map, pos, queryPoint).length == 0) {
                        var distance = Math.sqrt((vertex.x - pos.x) ** 2 + (vertex.y - pos.y) ** 2);
                        var endPoint = { x: vertex.x, y: vertex.y }

                        if (distance > radius) {
                            const angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                            endPoint = { x: Math.cos(angle) * radius + pos.x, y: Math.sin(angle) * radius + pos.y }
                            distance = radius
                        }

                        var best = simulation.sight.getIntersection(pos, endPoint, map);
                        if (best.dist >= distance) best = { x: endPoint.x, y: endPoint.y, dist: distance }
                        vertices.push(best)

                        var angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                        endPoint = { x: Math.cos(angle + 0.001) * radius + pos.x, y: Math.sin(angle + 0.001) * radius + pos.y }
                        best = simulation.sight.getIntersection(pos, endPoint, map);

                        if (best.dist >= radius) best = { x: endPoint.x, y: endPoint.y, dist: radius }
                        vertices.push(best)

                        angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                        endPoint = { x: Math.cos(angle - 0.001) * radius + pos.x, y: Math.sin(angle - 0.001) * radius + pos.y }

                        best = simulation.sight.getIntersection(pos, endPoint, map);
                        if (best.dist >= radius) best = { x: endPoint.x, y: endPoint.y, dist: radius }
                        vertices.push(best)
                    }
                }
            }

            const outerCollisions = allCircleLineCollisions(pos, radius, map);
            const circleCollisions = [];
            for (const line of outerCollisions) {
                for (const vertex of line) {
                    const distance = Math.sqrt((vertex.x - pos.x) ** 2 + (vertex.y - pos.y) ** 2)
                    const angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                    const queryPoint = { x: Math.cos(angle + Math.PI) + vertex.x, y: Math.sin(angle + Math.PI) + vertex.y }
                    if (Math.abs(distance - radius) < 1 && Matter.Query.ray(map, pos, queryPoint).length == 0) circleCollisions.push(vertex)
                }
            }
            for (var i = 0; i < circleCollisions.length; i++) {
                const vertex = circleCollisions[i];
                var nextIndex = i + 1;
                if (nextIndex == circleCollisions.length) nextIndex = 0;
                const nextVertex = circleCollisions[nextIndex];
                const angle1 = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                const angle2 = Math.atan2(nextVertex.y - pos.y, nextVertex.x - pos.x);
                var newAngle;
                if (Math.abs(angle1) > Math.PI / 2 && Math.abs(angle2) > Math.PI / 2 && angle1 / Math.abs(angle1) != angle2 / Math.abs(angle2)) {
                    // if the arc between the to points crosses over the left side (+/- pi radians)
                    const newAngle1 = (Math.PI - Math.abs(angle1)) * (angle1 / Math.abs(angle1));
                    const newAngle2 = (Math.PI - Math.abs(angle2)) * (angle2 / Math.abs(angle2));
                    newAngle = (newAngle1 + newAngle2) / 2;
                    var multiplier;
                    if (newAngle == 0) {
                        multiplier = 1;
                    } else {
                        multiplier = newAngle / Math.abs(newAngle);
                    }
                    newAngle = Math.PI * multiplier - newAngle * multiplier;
                    test = true;
                } else {
                    newAngle = (angle1 + angle2) / 2;
                }

                // shoot ray between them
                var endPoint = { x: Math.cos(newAngle) * radius + pos.x, y: Math.sin(newAngle) * radius + pos.y }
                var best = simulation.sight.getIntersection(pos, endPoint, map);
                vertices.push(vertex);
                if (best.dist <= radius) vertices.push({ x: best.x, y: best.y })
            }
            vertices.sort((a, b) => Math.atan2(a.y - pos.y, a.x - pos.x) - Math.atan2(b.y - pos.y, b.x - pos.x));
            return vertices;
        },
    },
    draw: {
        // powerUp() { //is set by Bayesian tech
        //     // ctx.globalAlpha = 0.4 * Math.sin(m.cycle * 0.15) + 0.6;
        //     // for (let i = 0, len = powerUp.length; i < len; ++i) {
        //     //   ctx.beginPath();
        //     //   ctx.arc(powerUp[i].position.x, powerUp[i].position.y, powerUp[i].size, 0, 2 * Math.PI);
        //     //   ctx.fillStyle = powerUp[i].color;
        //     //   ctx.fill();
        //     // }
        //     // ctx.globalAlpha = 1;
        // },
        // powerUpNormal() { //back up in case power up draw gets changed
        //     ctx.globalAlpha = 0.4 * Math.sin(m.cycle * 0.15) + 0.6;
        //     for (let i = 0, len = powerUp.length; i < len; ++i) {
        //         ctx.beginPath();
        //         ctx.arc(powerUp[i].position.x, powerUp[i].position.y, powerUp[i].size, 0, 2 * Math.PI);
        //         ctx.fillStyle = powerUp[i].color;
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1;
        // },
        // powerUpBonus() { //draws crackle effect for bonus power ups
        //     ctx.globalAlpha = 0.4 * Math.sin(m.cycle * 0.15) + 0.6;
        //     for (let i = 0, len = powerUp.length; i < len; ++i) {
        //         ctx.beginPath();
        //         ctx.arc(powerUp[i].position.x, powerUp[i].position.y, powerUp[i].size, 0, 2 * Math.PI);
        //         ctx.fillStyle = powerUp[i].color;
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1;
        //     for (let i = 0, len = powerUp.length; i < len; ++i) {
        //         if (powerUp[i].isDuplicated && Math.random() < 0.1) {
        //             //draw electricity
        //             const mag = 5 + powerUp[i].size / 5
        //             let unit = Vector.rotate({
        //                 x: mag,
        //                 y: mag
        //             }, 2 * Math.PI * Math.random())
        //             let path = {
        //                 x: powerUp[i].position.x + unit.x,
        //                 y: powerUp[i].position.y + unit.y
        //             }
        //             ctx.beginPath();
        //             ctx.moveTo(path.x, path.y);
        //             for (let i = 0; i < 6; i++) {
        //                 unit = Vector.rotate(unit, 3 * (Math.random() - 0.5))
        //                 path = Vector.add(path, unit)
        //                 ctx.lineTo(path.x, path.y);
        //             }
        //             ctx.lineWidth = 0.5 + 2 * Math.random();
        //             ctx.strokeStyle = "#000"
        //             ctx.stroke();
        //         }
        //     }
        // },

        // map: function() {
        //     ctx.beginPath();
        //     for (let i = 0, len = map.length; i < len; ++i) {
        //         let vertices = map[i].vertices;
        //         ctx.moveTo(vertices[0].x, vertices[0].y);
        //         for (let j = 1; j < vertices.length; j += 1) {
        //             ctx.lineTo(vertices[j].x, vertices[j].y);
        //         }
        //         ctx.lineTo(vertices[0].x, vertices[0].y);
        //     }
        //     ctx.fillStyle = "#444";
        //     ctx.fill();
        // },
        mapPath: null, //holds the path for the map to speed up drawing
        setPaths() {
            //runs at each new level to store the path for the map since the map doesn't change
            simulation.draw.mapPath = new Path2D();
            for (let i = 0, len = map.length; i < len; ++i) {
                let vertices = map[i].vertices;
                simulation.draw.mapPath.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j += 1) {
                    simulation.draw.mapPath.lineTo(vertices[j].x, vertices[j].y);
                }
                simulation.draw.mapPath.lineTo(vertices[0].x, vertices[0].y);
            }
        },
        lineOfSightPrecalculation() {
            simulation.sight.intersectMap = [];
            for (var i = 0; i < map.length; i++) {
                const obj = map[i];
                const newVertices = [];
                const restOfMap = [...map].slice(0, i).concat([...map].slice(i + 1))
                for (var j = 0; j < obj.vertices.length - 1; j++) {
                    var intersections = simulation.sight.getIntersections(obj.vertices[j], obj.vertices[j + 1], restOfMap);
                    newVertices.push(obj.vertices[j]);
                    for (const vertex of intersections) newVertices.push({ x: vertex.x, y: vertex.y });
                }
                intersections = simulation.sight.getIntersections(obj.vertices[obj.vertices.length - 1], obj.vertices[0], restOfMap);
                newVertices.push(obj.vertices[obj.vertices.length - 1]);
                for (const vertex of intersections) newVertices.push({ x: vertex.x, y: vertex.y });
                //draw the vertices as black circles for debugging
                // for (const vertex of newVertices) {
                //     ctx.beginPath();
                //     ctx.moveTo(vertex.x, vertex.y);
                //     ctx.arc(vertex.x, vertex.y, 10, 0, 2 * Math.PI);
                //     ctx.fillStyle = '#000';
                //     ctx.fill()
                // }
                simulation.sight.intersectMap.push({ vertices: newVertices });
            }
        },
        drawMapPath() { },
        drawMapPathDefault() {
            ctx.fillStyle = color.map;
            ctx.fill(simulation.draw.mapPath);
        },
        drawMapSight() {
            if (!simulation.isTimeSkipping) {
                const pos = m.pos
                const radius = 4000
                const vertices = simulation.sight.circleLoS(pos, radius);
                if (vertices.length) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (var i = 1; i < vertices.length; i++) {
                        var currentDistance = Math.sqrt((vertices[i - 1].x - pos.x) ** 2 + (vertices[i - 1].y - pos.y) ** 2);
                        var newDistance = Math.sqrt((vertices[i].x - pos.x) ** 2 + (vertices[i].y - pos.y) ** 2);
                        if (Math.abs(currentDistance - radius) < 1 && Math.abs(newDistance - radius) < 1) {
                            const currentAngle = Math.atan2(vertices[i - 1].y - pos.y, vertices[i - 1].x - pos.x);
                            const newAngle = Math.atan2(vertices[i].y - pos.y, vertices[i].x - pos.x);
                            ctx.arc(pos.x, pos.y, radius, currentAngle, newAngle);
                        } else {
                            ctx.lineTo(vertices[i].x, vertices[i].y)
                        }
                    }
                    newDistance = Math.sqrt((vertices[0].x - pos.x) ** 2 + (vertices[0].y - pos.y) ** 2);
                    currentDistance = Math.sqrt((vertices[vertices.length - 1].x - pos.x) ** 2 + (vertices[vertices.length - 1].y - pos.y) ** 2);
                    if (Math.abs(currentDistance - radius) < 1 && Math.abs(newDistance - radius) < 1) {
                        const currentAngle = Math.atan2(vertices[vertices.length - 1].y - pos.y, vertices[vertices.length - 1].x - pos.x);
                        const newAngle = Math.atan2(vertices[0].y - pos.y, vertices[0].x - pos.x);
                        ctx.arc(pos.x, pos.y, radius, currentAngle, newAngle);
                    } else {
                        ctx.lineTo(vertices[0].x, vertices[0].y)
                    }

                    // outline map edges, best with lighter colored document.body.style.backgroundColor
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 5;
                    ctx.stroke(simulation.draw.mapPath);

                    ctx.globalCompositeOperation = "destination-in";
                    ctx.fillStyle = "#000";
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";

                    // make map visible
                    // ctx.fill(simulation.draw.mapPath);
                    // ctx.fillStyle = "#000";

                    ctx.clip(); //this doesn't seem to be required, but it helps with performance, probably stops the canvas context from drawing the whole map
                }
            }
        },
        body() {
            ctx.beginPath();
            for (let i = 0, len = body.length; i < len; ++i) {
                let vertices = body[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            }
            ctx.lineWidth = 2;
            ctx.fillStyle = color.block;
            ctx.fill();
            ctx.strokeStyle = color.blockS;
            ctx.stroke();
        },
        cons() {
            ctx.beginPath();
            for (let i = 0, len = cons.length; i < len; ++i) {
                ctx.moveTo(cons[i].pointA.x, cons[i].pointA.y);
                // ctx.lineTo(cons[i].bodyB.position.x, cons[i].bodyB.position.y);
                ctx.lineTo(cons[i].bodyB.position.x + cons[i].pointB.x, cons[i].bodyB.position.y + cons[i].pointB.y);
            }
            for (let i = 0, len = consBB.length; i < len; ++i) {
                ctx.moveTo(consBB[i].bodyA.position.x, consBB[i].bodyA.position.y);
                ctx.lineTo(consBB[i].bodyB.position.x, consBB[i].bodyB.position.y);
            }
            ctx.lineWidth = 2;
            // ctx.strokeStyle = "#999";
            ctx.strokeStyle = "rgba(0,0,0,0.15)";
            ctx.stroke();
        },
        wireFrame() {
            // ctx.textAlign = "center";
            // ctx.textBaseline = "middle";
            // ctx.fillStyle = "#999";
            const bodies = Composite.allBodies(engine.world);
            ctx.beginPath();
            for (let i = 0; i < bodies.length; ++i) {
                //ctx.fillText(bodies[i].id,bodies[i].position.x,bodies[i].position.y);  //shows the id of every body
                let vertices = bodies[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.stroke();
        },
        testing() {
            //jump
            ctx.beginPath();
            let bodyDraw = jumpSensor.vertices;
            ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
            for (let j = 1; j < bodyDraw.length; ++j) {
                ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
            }
            ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fill();
            // ctx.strokeStyle = "#000";
            // ctx.stroke();
            //main body
            ctx.beginPath();
            bodyDraw = playerBody.vertices;
            ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
            for (let j = 1; j < bodyDraw.length; ++j) {
                ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
            }
            ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
            ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
            ctx.fill();
            // ctx.stroke();
            //head
            ctx.beginPath();
            bodyDraw = playerHead.vertices;
            ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
            for (let j = 1; j < bodyDraw.length; ++j) {
                ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
            }
            ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
            ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
            ctx.fill();
            // ctx.stroke();
            //head sensor
            ctx.beginPath();
            bodyDraw = headSensor.vertices;
            ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
            for (let j = 1; j < bodyDraw.length; ++j) {
                ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
            }
            ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
            ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
            ctx.fill();
            // ctx.stroke();
        }
    },
    checkLineIntersection(v1, v1End, v2, v2End) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        let denominator, a, b, numerator1, numerator2;
        let result = {
            x: null,
            y: null,
            onLine1: false,
            onLine2: false
        };
        denominator = (v2End.y - v2.y) * (v1End.x - v1.x) - (v2End.x - v2.x) * (v1End.y - v1.y);
        if (denominator == 0) {
            return result;
        }
        a = v1.y - v2.y;
        b = v1.x - v2.x;
        numerator1 = (v2End.x - v2.x) * a - (v2End.y - v2.y) * b;
        numerator2 = (v1End.x - v1.x) * a - (v1End.y - v1.y) * b;
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = v1.x + a * (v1End.x - v1.x);
        result.y = v1.y + a * (v1End.y - v1.y);
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) result.onLine1 = true;
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) result.onLine2 = true;
        // if line1 and line2 are segments, they intersect if both of the above are true
        return result;
    },
    constructMouseDownPosition: {
        x: 0,
        y: 0
    },
    constructMapString: [],
    constructCycle() {
        if (simulation.isConstructionMode && simulation.constructMouseDownPosition) {
            function round(num, round = 25) {
                return Math.ceil(num / round) * round;
            }
            const x = round(simulation.constructMouseDownPosition.x)
            const y = round(simulation.constructMouseDownPosition.y)
            const dx = Math.max(25, round(simulation.mouseInGame.x) - x)
            const dy = Math.max(25, round(simulation.mouseInGame.y) - y)

            ctx.strokeStyle = "#000"
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, dx, dy);
        }
    },
    enableConstructMode() {
        level.isProcedural = false //this is set to be true in levels like labs that need x+ and y+ in front of positions
        level.isVerticalFLipLevel = false
        simulation.isConstructionMode = true;
        simulation.isHorizontalFlipped = false;
        simulation.isAutoZoom = false;
        simulation.zoomScale = 2600;
        simulation.setZoom();

        document.body.addEventListener("mouseup", (e) => {
            if (simulation.testing && simulation.constructMouseDownPosition) {
                function round(num, round = 25) {
                    return Math.ceil(num / round) * round;
                }
                //clean up positions
                const x = round(simulation.constructMouseDownPosition.x)
                const y = round(simulation.constructMouseDownPosition.y)
                const dx = Math.max(25, round(simulation.mouseInGame.x) - x)
                const dy = Math.max(25, round(simulation.mouseInGame.y) - y)
                if (e.button === 1) {
                    if (level.isProcedural) {
                        simulation.outputMapString(`spawn.randomMob(x+${x}, ${y}, 0);\n`);
                    } else {
                        simulation.outputMapString(`spawn.randomMob(${x}, ${y}, 0);\n`);
                    }
                } else if (e.button === 4) {
                    simulation.outputMapString(`${Math.floor(simulation.constructMouseDownPosition.x)}, ${Math.floor(simulation.constructMouseDownPosition.y)}`);
                } else if (simulation.mouseInGame.x > simulation.constructMouseDownPosition.x && simulation.mouseInGame.y > simulation.constructMouseDownPosition.y) { //make sure that the width and height are positive
                    if (e.button === 0) { //add map
                        // if (level.isProcedural) {
                        //     simulation.outputMapString(`spawn.mapRect(x+${x}, ${y}, ${dx}, ${dy});\n`);
                        // } else {
                        //     simulation.outputMapString(`spawn.mapRect(${x}, ${y}, ${dx}, ${dy});\n`);
                        // }
                        if (level.isProcedural) {
                            simulation.outputMapString(`spawn.mapRect(x+${x}, ${y}, ${dx}, ${dy});\n`);
                        } else if (level.isVerticalFLipLevel) {
                            console.log('hi')
                            simulation.outputMapString(`spawn.mapRect(${x}, ${y}, ${dx}, ${dy});\n`);
                            simulation.outputMapString(`//spawn.mapRect(${x}, ${-y - dy}, ${dx}, ${dy});\n`);
                        } else {
                            simulation.outputMapString(`spawn.mapRect(${x}, ${y}, ${dx}, ${dy});\n`);
                        }
                        //see map in world
                        spawn.mapRect(x, y, dx, dy);
                        len = map.length - 1
                        map[len].collisionFilter.category = cat.map;
                        map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                        Matter.Body.setStatic(map[len], true); //make static
                        Composite.add(engine.world, map[len]); //add to world
                        simulation.draw.setPaths() //update map graphics
                    } else if (e.button === 2) { //add body
                        if (level.isProcedural) {
                            simulation.outputMapString(`spawn.bodyRect(x+${x}, ${y}, ${dx}, ${dy});\n`);
                        } else {
                            simulation.outputMapString(`spawn.bodyRect(${x}, ${y}, ${dx}, ${dy});\n`);
                        }
                        //see map in world
                        spawn.bodyRect(x, y, dx, dy);
                    }
                }
            }
            simulation.constructMouseDownPosition.x = undefined
            simulation.constructMouseDownPosition.y = undefined
        });
        simulation.constructMouseDownPosition.x = undefined
        simulation.constructMouseDownPosition.y = undefined
        document.body.addEventListener("mousedown", (e) => {
            if (simulation.testing) {
                simulation.constructMouseDownPosition.x = simulation.mouseInGame.x
                simulation.constructMouseDownPosition.y = simulation.mouseInGame.y
            }
        });

        document.body.addEventListener("wheel", (e) => {
            if (e.deltaY > 0) {
                simulation.setZoom(simulation.zoomScale / 0.9)
            } else {
                simulation.setZoom(simulation.zoomScale * 0.9)
            }
        });




        //undo last element added after you press z
        document.body.addEventListener("keydown", (event) => { // e.keyCode   z=90  m=77 b=66  shift = 16  c = 67
            if (simulation.testing && event.code === "KeyZ" && simulation.constructMapString.length) {
                if (simulation.constructMapString[simulation.constructMapString.length - 1][6] === 'm') { //remove map from current level
                    const index = map.length - 1
                    Matter.Composite.remove(engine.world, map[index]);
                    map.splice(index, 1);
                    simulation.draw.setPaths() //update map graphics  
                } else if (simulation.constructMapString[simulation.constructMapString.length - 1][6] === 'b') { //remove body from current level
                    const index = body.length - 1
                    Matter.Composite.remove(engine.world, body[index]);
                    body.splice(index, 1);
                }
                simulation.constructMapString.pop();
                simulation.outputMapString();
            }
        });
    },
    outputMapString(string) {
        if (string) simulation.constructMapString.push(string) //store command as a string in the next element of an array
        let out = "" //combine set of map strings to one string
        let outHTML = ""
        for (let i = 0, len = simulation.constructMapString.length; i < len; i++) {
            out += simulation.constructMapString[i];
            outHTML += "<div>" + simulation.constructMapString[i] + "</div>"
        }
        console.log(out)
        navigator.clipboard.writeText(out).then(function () {
            /* clipboard successfully set */
        }, function () {
            /* clipboard write failed */
            console.log('copy failed')
        });
        document.getElementById("construct").innerHTML = outHTML
    },
    // copyToClipBoard(value) {
    //     // Create a fake textarea
    //     const textAreaEle = document.createElement('textarea');

    //     // Reset styles
    //     textAreaEle.style.border = '0';
    //     textAreaEle.style.padding = '0';
    //     textAreaEle.style.margin = '0';

    //     // Set the absolute position
    //     // User won't see the element
    //     textAreaEle.style.position = 'absolute';
    //     textAreaEle.style.left = '-9999px';
    //     textAreaEle.style.top = `0px`;

    //     // Set the value
    //     textAreaEle.value = value

    //     // Append the textarea to body
    //     document.body.appendChild(textAreaEle);

    //     // Focus and select the text
    //     textAreaEle.focus();
    //     textAreaEle.select();

    //     // Execute the "copy" command
    //     try {
    //         document.execCommand('copy');
    //     } catch (err) {
    //         // Unable to copy
    //         console.log(err)
    //     } finally {
    //         // Remove the textarea
    //         document.body.removeChild(textAreaEle);
    //     }
    // },
};