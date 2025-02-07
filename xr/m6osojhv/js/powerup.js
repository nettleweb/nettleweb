let powerUp = [];

const powerUps = {
    ejectGraphic(color = "68, 102, 119") {
        simulation.drawList.push({
            x: m.pos.x,
            y: m.pos.y,
            radius: 100,
            color: `rgba(${color}, 0.8)`,
            time: 4
        });
        simulation.drawList.push({
            x: m.pos.x,
            y: m.pos.y,
            radius: 75,
            color: `rgba(${color}, 0.6)`,
            time: 8
        });
        simulation.drawList.push({
            x: m.pos.x,
            y: m.pos.y,
            radius: 50,
            color: `rgba(${color}, 0.3)`,
            time: 12
        });
        simulation.drawList.push({
            x: m.pos.x,
            y: m.pos.y,
            radius: 25,
            color: `rgba(${color}, 0.15)`,
            time: 16
        });
    },
    healGiveMaxEnergy: false, //for tech 1st ionization energy
    orb: {
        research(num = 1) {
            if (num === 1) return `<div class="research-circle"></div> `
            let text = '<span style="position:relative;">'
            for (let i = 0; i < num; i++) {
                text += `<div class="research-circle" style="position:absolute; top:1.5px; left:${i * 0.6}em;"></div>`
            }
            text += '</span> &nbsp; &nbsp; '
            for (let i = 0; i < num; i++) {
                text += '&nbsp; '
            }
            return text
        },
        ammo(num = 1) {
            switch (num) {
                case 1:
                    return `<div class="ammo-circle"></div>`
            }
            let text = '<span style="position:relative;">'
            for (let i = 0; i < num; i++) {
                text += `<div class="ammo-circle" style="position:absolute; top:1.5px; left:${i * 0.6}em;"></div>`
            }
            text += '</span> &nbsp; &nbsp; '
            for (let i = 0; i < num; i++) {
                text += '&nbsp; '
            }
            return text
        },
        heal(num = 1) {
            if (powerUps.healGiveMaxEnergy) {
                if (num === 1) return `<div class="heal-circle-energy"></div>`

                let text = '<span style="position:relative;">'
                for (let i = 0; i < num; i++) {
                    text += `<div class="heal-circle-energy" style="position:absolute; top:1px; left:${i * 0.6}em;"></div>`
                }
                text += '</span> &nbsp; &nbsp; '
                for (let i = 0; i < num; i++) text += '&nbsp; '
                return text
            } else {
                if (num === 1) return `<div class="heal-circle"></div>`

                let text = '<span style="position:relative;">'
                for (let i = 0; i < num; i++) {
                    text += `<div class="heal-circle" style="position:absolute; top:1px; left:${i * 0.6}em;"></div>`
                }
                text += '</span> &nbsp; &nbsp; '
                for (let i = 0; i < num; i++) text += '&nbsp; '
                return text
            }
        },
        tech(num = 1) {
            return `<div class="circle-grid tech tooltip" style="width: 1.32em; height: 1.32em;"><span class="tooltiptext color-m">tech</span></div>`
        },
        field(num = 1) {
            return `<div class="circle-grid field tooltip"><span class="tooltiptext color-f">field</span></div>`
        },
        gun(num = 1) {
            return `<div class="circle-grid gun tooltip"><span class="tooltiptext color-g">gun</span></div>`
        },
        gunTech(num = 1) {
            return `<div class="circle-grid tech tooltip" style="position:relative; top:-0.05em; left:0.55em;opacity:0.8;margin-left:-0.55em;"><span class="tooltiptext"><span class="color-g">gun</span><span class="color-m">tech</span></span></div>
                    <div class="circle-grid gun tooltip" style="position:relative; top:-0.05em; left:-0.55em; opacity:0.65;margin-right:-0.55em;"><span class="tooltiptext"><span class="color-g">gun</span><span class="color-m">tech</span></span></div>`
        },
        fieldTech(num = 1) {
            return `<div class="circle-grid tech tooltip" style="position:relative; top:-0.05em; left:0.55em;opacity:0.8;margin-left:-0.55em;"><span class="tooltiptext"><span class="color-f">field</span><span class="color-m">tech</span></span></div>
                    <div class="circle-grid field tooltip" style="position:relative; top:-0.05em; left:-0.55em;opacity:0.65;margin-right:-0.55em;"><span class="tooltiptext"><span class="color-f">field</span><span class="color-m">tech</span></span></div>`
        },
        coupling(num = 1) {
            switch (num) {
                case 1:
                    return `<div class="coupling-circle"></div>`
            }
            let text = '<span style="position:relative;">'
            for (let i = 0; i < num; i++) {
                text += `<div class="coupling-circle" style="position:absolute; top:1.5px; left:${i * 0.5}em;"></div>`
            }
            text += '</span> &nbsp; &nbsp;'
            for (let i = 0; i < num; i++) {
                text += '&thinsp; '
            }
            return text
        },
        boost(num = 1) {
            switch (num) {
                case 1:
                    return `<div class="boost-circle"></div>`
            }
            let text = '<span style="position:relative;">'
            for (let i = 0; i < num; i++) {
                text += `<div class="boost-circle" style="position:absolute; top:1.5px; left:${i * 8}px;"></div>`
            }
            text += '</span> &nbsp; &nbsp; '
            for (let i = 0; i < num; i++) {
                text += '&nbsp; '
            }
            return text
        },
    },
    totalPowerUps: 0, //used for tech that count power ups at the end of a level
    do() { },
    setPowerUpMode() {
        if (tech.duplicationChance() > 0 || tech.isAnthropicTech) {
            powerUps.draw = powerUps.drawDup
            if (tech.isPowerUpsVanish) {
                if (tech.isHealAttract) {
                    powerUps.do = () => {
                        powerUps.dupExplode();
                        powerUps.draw();
                        powerUps.attractHeal();
                    }
                } else {
                    powerUps.do = () => {
                        powerUps.dupExplode();
                        powerUps.draw();
                    }
                }
            } else if (tech.isHealAttract) {
                powerUps.do = () => {
                    powerUps.draw();
                    powerUps.attractHeal();
                }
            } else {
                powerUps.do = () => powerUps.draw();
            }
        } else {
            powerUps.draw = powerUps.drawCircle
            if (tech.isHealAttract) {
                powerUps.do = () => {
                    powerUps.draw();
                    powerUps.attractHeal();
                }
            } else {
                powerUps.do = powerUps.draw
            }
        }
    },
    draw() { },
    drawCircle() {
        ctx.globalAlpha = 0.4 * Math.sin(simulation.cycle * 0.15) + 0.6;
        for (let i = 0, len = powerUp.length; i < len; ++i) {
            ctx.beginPath();
            ctx.arc(powerUp[i].position.x, powerUp[i].position.y, powerUp[i].size, 0, 2 * Math.PI);
            ctx.fillStyle = powerUp[i].color;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    },
    drawDup() {
        ctx.globalAlpha = 0.4 * Math.sin(simulation.cycle * 0.15) + 0.6;
        for (let i = 0, len = powerUp.length; i < len; ++i) {
            ctx.beginPath();
            if (powerUp[i].isDuplicated) {
                let vertices = powerUp[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j++) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            } else {
                ctx.arc(powerUp[i].position.x, powerUp[i].position.y, powerUp[i].size, 0, 2 * Math.PI);
            }
            ctx.fillStyle = powerUp[i].color;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    },
    attractHeal() {
        for (let i = 0; i < powerUp.length; i++) { //attract heal power ups to player
            if (powerUp[i].name === "heal") {
                let attract = Vector.mult(Vector.normalise(Vector.sub(m.pos, powerUp[i].position)), 0.015 * powerUp[i].mass)
                powerUp[i].force.x += attract.x;
                powerUp[i].force.y += attract.y - powerUp[i].mass * simulation.g; //negate gravity
                Matter.Body.setVelocity(powerUp[i], Vector.mult(powerUp[i].velocity, 0.7));
            }
        }
    },
    dupExplode() {
        for (let i = 0, len = powerUp.length; i < len; ++i) {
            if (powerUp[i].isDuplicated) {
                if (Math.random() < 0.003 && !m.isTimeDilated) { //  (1-0.003)^240 = chance to be removed after 4 seconds,   240 = 4 seconds * 60 cycles per second
                    b.explosion(powerUp[i].position, 175 + (11 + 3 * Math.random()) * powerUp[i].size);
                    if (powerUp[i]) {
                        Matter.Composite.remove(engine.world, powerUp[i]);
                        powerUp.splice(i, 1);
                    }
                    break
                }
                if (Math.random() < 0.3) {  //draw electricity
                    const mag = Math.max(1, 4 + powerUp[i].size / 5)
                    let unit = Vector.rotate({ x: mag, y: mag }, 2 * Math.PI * Math.random())
                    let path = { x: powerUp[i].position.x + unit.x, y: powerUp[i].position.y + unit.y }
                    ctx.beginPath();
                    ctx.moveTo(path.x, path.y);
                    for (let i = 0; i < 6; i++) {
                        unit = Vector.rotate(unit, 4 * (Math.random() - 0.5))
                        path = Vector.add(path, unit)
                        ctx.lineTo(path.x, path.y);
                    }
                    ctx.lineWidth = 0.5 + 2 * Math.random();
                    ctx.strokeStyle = "#000"
                    ctx.stroke();
                }
            }
        }
    },
    choose(type, index) {
        if (type === "gun") {
            b.giveGuns(index)
            let text = `<div class="circle-grid gun"></div> &nbsp; b.giveGuns("<strong class='color-text'>${b.guns[index].name}</strong>")`
            if (b.inventory.length === 1) text += `<br>input.key.gun<span class='color-symbol'>:</span> ["<span class='color-text'>MouseLeft</span>"]`
            if (b.inventory.length === 2) text += `
            <br>input.key.nextGun<span class='color-symbol'>:</span> ["<span class='color-text'>${input.key.nextGun}</span>","<span class='color-text'>MouseWheel</span>"]
            <br>input.key.previousGun<span class='color-symbol'>:</span> ["<span class='color-text'>${input.key.previousGun}</span>","<span class='color-text'>MouseWheel</span>"]`
            simulation.inGameConsole(text);
        } else if (type === "field") {
            m.setField(index)
        } else if (type === "tech") {
            simulation.inGameConsole(`<div class="circle-grid tech"></div> &nbsp; <span class='color-var'>tech</span>.giveTech("<strong class='color-text'>${tech.tech[index].name}</strong>")`);
            tech.giveTech(index)
        }
        powerUps.endDraft(type);
    },
    showDraft() {
        simulation.isChoosing = true; //stops p from un pausing on key down

        //disable clicking for 1/2 a second to prevent mistake clicks
        document.getElementById("choose-grid").style.pointerEvents = "none";
        document.body.style.cursor = "none";
        setTimeout(() => {
            document.body.style.cursor = "auto";
            document.getElementById("choose-grid").style.pointerEvents = "auto";
            document.getElementById("choose-grid").style.transitionDuration = "0s";
        }, 400);

        if (!simulation.paused) {
            if (tech.isNoDraftPause || level.isNoPause) {
                document.getElementById("choose-grid").style.opacity = "1"
            } else {
                simulation.paused = true;
                document.getElementById("choose-grid").style.opacity = "1"
            }
            document.getElementById("choose-grid").style.transitionDuration = "0.5s"; //how long is the fade in on
            document.getElementById("choose-grid").style.visibility = "visible"

            requestAnimationFrame(() => {
                ctx.fillStyle = `rgba(150,150,150,0.9)`; //`rgba(221,221,221,0.6)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
        }
    },
    endDraft(type, isCanceled = false) { //type should be a gun, tech, or field
        if (isCanceled) {
            if (tech.isCancelDuplication) {
                const value = 0.06
                tech.duplication += value
                simulation.inGameConsole(`tech.duplicationChance() <span class='color-symbol'>+=</span> ${value}`)
                simulation.circleFlare(value);
            }
            if (tech.isCancelRerolls) {
                for (let i = 0, len = 8 + 4 * Math.random(); i < len; i++) {
                    let spawnType
                    if (Math.random() < 0.4) {
                        spawnType = "ammo"
                    } else if (Math.random() < 0.33 && !tech.isSuperDeterminism) {
                        spawnType = "research"
                    } else {
                        spawnType = "heal"
                    }
                    powerUps.spawn(m.pos.x + 40 * (Math.random() - 0.5), m.pos.y + 40 * (Math.random() - 0.5), spawnType, false);
                }
            }
            if (tech.isCancelCouple) powerUps.spawnDelay("coupling", 8)
            if (tech.isCancelTech && tech.cancelTechCount === 0 && type !== "entanglement") {
                tech.cancelTechCount++
                // powerUps.research.use('tech')
                powerUps[type].effect();
                return
            }
        }

        if (tech.isAnsatz && powerUps.research.count < 1) {
            for (let i = 0; i < 3; i++) powerUps.spawn(m.pos.x + 40 * (Math.random() - 0.5), m.pos.y + 40 * (Math.random() - 0.5), "research", false);
        }
        // document.getElementById("choose-grid").style.display = "none"
        document.getElementById("choose-grid").style.visibility = "hidden"
        document.getElementById("choose-grid").style.opacity = "0"

        document.body.style.cursor = "none";
        // document.body.style.overflow = "hidden"
        // if (m.alive){}
        if (simulation.paused) requestAnimationFrame(cycle);
        if (m.alive) simulation.paused = false;
        simulation.isChoosing = false; //stops p from un pausing on key down
        build.unPauseGrid()
        if (m.immuneCycle < m.cycle + 15) m.immuneCycle = m.cycle + 15; //player is immune to damage for 30 cycles
        if (m.holdingTarget) m.drop();
    },
    animatePowerUpGrab(color) {
        simulation.ephemera.push({
            // name: "",
            count: 25, //cycles before it self removes
            do() {
                this.count -= 2
                if (this.count < 5) simulation.removeEphemera(this.name)

                ctx.beginPath();
                ctx.arc(m.pos.x, m.pos.y, Math.max(3, this.count), 0, 2 * Math.PI);
                ctx.fillStyle = color
                ctx.fill();
                // ctx.strokeStyle = "hsla(200,50%,61%,0.18)";
                // ctx.stroke();
            },
        })

    },
    instructions: {
        name: "instructions",
        color: "rgba(100,125,140,0.35)",
        size() {
            return 130
        },
        effect() {
            Matter.Body.setVelocity(player, { x: 0, y: 0 });//power up is so big it launches the player,  this stops that
            requestAnimationFrame(() => { //add a background behind the power up menu
                ctx.fillStyle = `rgba(150,150,150,0.9)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
            powerUps.animatePowerUpGrab('rgba(0, 0, 0,0.6)')

            if (!simulation.paused) {
                simulation.paused = true;
                simulation.isChoosing = true; //stops p from un pausing on key down
                document.body.style.cursor = "auto";
                document.getElementById("choose-grid").style.pointerEvents = "auto";
                document.getElementById("choose-grid").style.transitionDuration = "0s";
            }
            //build level info
            document.getElementById("choose-grid").classList.add('choose-grid-no-images');
            document.getElementById("choose-grid").classList.remove('choose-grid');
            document.getElementById("choose-grid").style.gridTemplateColumns = "800px"//adjust this to increase the width of the whole menu, but mostly the center column
            let lore = localSettings.loreCount > 0 ? "lore.unlockTesting()               //press T to enter testing" : ""
            let text = `<div class="grid-container" style = "font-size:1rem;padding: 0px;"><pre> <strong>//console commands</strong>
 powerUps.instructions.effect()     //reproduce this message
 powerUps.warp.effect()             //warp to any level
 tech.giveTech("name")              //replace "name" with tech name
 m.setField("name")                 //standing wave  perfect diamagnetism  negative mass  molecular assembler  plasma torch  time dilation  metamaterial cloaking  pilot wave  wormhole  grappling hook
 b.giveGuns("name")                 //nail gun  shotgun  super balls  wave  missiles  grenades  spores  drones  foam  harpoon  mine  laser
 tech.damage *= 2                   //2x damage
 m.immuneCycle = Infinity           //immune to damage            
 m.coyoteCycles = Infinity          //air jumps
 m.energy = 0                       //set energy
 m.health = 1                       //set health
 m.maxHealth = 1                    //set max health
 m.maxEnergy = 1                    //set max energy
 simulation.enableConstructMode()   //press T to build with mouse
 ${lore}

 Matter.Body.setPosition(player, simulation.mouseInGame);
 spawn.bodyRect(simulation.mouseInGame.x, simulation.mouseInGame.y, 50, 50)
 spawn.randomLevelBoss(simulation.mouseInGame.x, simulation.mouseInGame.y) 
 powerUps.spawn(m.pos.x, m.pos.y, "name") //tech gun field heal ammo research coupling boost instructions entanglement
 
 //this URL downloads newest version of n-gon 
 https://codeload.github.com/landgreen/n-gon/zip/refs/heads/master

              <strong>chrome</strong>                     <strong>firefox</strong>
 <strong>Win/Linux:</strong> Ctrl + Shift + J        Ctrl + Shift + J
       <strong>Mac:</strong> Cmd + Option + J        Cmd + Shift + J</pre></div><div class="choose-grid-module" id="exit" style="text-align: center;font-size: 1.3rem;">exit</div>`
            document.getElementById("choose-grid").innerHTML = text
            //show level info
            document.getElementById("choose-grid").style.opacity = "1"
            document.getElementById("choose-grid").style.transitionDuration = "0.3s"; //how long is the fade in on
            document.getElementById("choose-grid").style.visibility = "visible"
            document.getElementById("exit").addEventListener("click", () => {
                level.unPause()
                document.body.style.cursor = "none";
                //reset hide image style
                if (localSettings.isHideImages) {
                    document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                    document.getElementById("choose-grid").classList.remove('choose-grid');
                } else {
                    document.getElementById("choose-grid").classList.add('choose-grid');
                    document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
                }
            });
        },
    },
    warp: {
        name: "warp",
        color: "rgb(110,155,160)",
        size() {
            return 30
        },
        load(name) {
            level.levels[level.onLevel + 1] = name
            powerUps.warp.exit()
            level.nextLevel();
            // simulation.clearNow = true
        },
        exit() {
            level.unPause()
            document.body.style.cursor = "none";
            //reset hide image style
            if (localSettings.isHideImages) {
                document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                document.getElementById("choose-grid").classList.remove('choose-grid');
            } else {
                document.getElementById("choose-grid").classList.add('choose-grid');
                document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
            }
        },
        effect() {
            requestAnimationFrame(() => { //add a background behind the power up menu
                ctx.fillStyle = `rgba(150,150,150,0.9)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
            powerUps.animatePowerUpGrab('rgba(0, 0, 0,0.6)')

            if (!simulation.paused) {
                simulation.paused = true;
                simulation.isChoosing = true; //stops p from un pausing on key down
                document.body.style.cursor = "auto";
                document.getElementById("choose-grid").style.pointerEvents = "auto";
                document.getElementById("choose-grid").style.transitionDuration = "0s";
            }
            //build level info
            document.getElementById("choose-grid").classList.add('choose-grid-no-images');
            document.getElementById("choose-grid").classList.remove('choose-grid');
            document.getElementById("choose-grid").style.gridTemplateColumns = "200px"//adjust this to increase the width of the whole menu, but mostly the center column
            let text = `<div class="choose-grid-module" style="font-size: 1.5rem;color:rgb(110,155,160);text-align:center;"><strong>WARP</strong></div>`
            text += `<div class="choose-grid-module" id="exit" style="font-size: 1rem;color:rgb(110,155,160);text-align:right;padding-right:5px;"><strong>cancel</strong></div>`
            text += `<div class="choose-grid-module" style="font-size: 1rem;color:rgb(110,155,160);background-color:#444;text-align:center;">level.uniqueLevels</div>`
            for (let i = 0; i < level.uniqueLevels.length; i++) {
                text += `<div class="choose-grid-module" style="font-size: 1rem;padding-left:5px;" onclick="powerUps.warp.load('${level.uniqueLevels[i]}')">${level.uniqueLevels[i]}</div>`   //id="uniqueLevels-warp-${i}"
            }
            text += `<div class="choose-grid-module" style="color:rgb(110,155,160);background-color:#444;text-align:center;">level.playableLevels</div>`
            for (let i = 0; i < level.playableLevels.length; i++) {
                text += `<div class="choose-grid-module" style="padding-left:5px;" onclick="powerUps.warp.load('${level.playableLevels[i]}')">${level.playableLevels[i]}</div>`
            }
            text += `<div class="choose-grid-module" style="color:rgb(110,155,160);background-color:#444;text-align:center;">level.communityLevels</div>`
            for (let i = 0; i < level.communityLevels.length; i++) {
                text += `<div class="choose-grid-module" style="padding-left:5px;" onclick="powerUps.warp.load('${level.communityLevels[i]}')">${level.communityLevels[i]}</div>`
            }
            text += `<div class="choose-grid-module" style="color:rgb(110,155,160);background-color:#444;text-align:center;">level.trainingLevels</div>`
            for (let i = 0; i < level.trainingLevels.length; i++) {
                text += `<div class="choose-grid-module" style="padding-left:5px;" onclick="powerUps.warp.load('${level.trainingLevels[i]}')">${level.trainingLevels[i]}</div>`
            }
            document.getElementById("choose-grid").innerHTML = text
            //show level info
            document.getElementById("choose-grid").style.opacity = "1"
            document.getElementById("choose-grid").style.transitionDuration = "0.3s"; //how long is the fade in on
            document.getElementById("choose-grid").style.visibility = "visible"

            document.getElementById("exit").addEventListener("click", () => {
                powerUps.warp.exit()
            });
        },
    },
    difficulty: {
        name: "difficulty",
        color: "#000",
        size() {
            return 80 / Math.pow(localSettings.difficultyMode, 1.5);
        },
        effect() {
            const initialDifficultyMode = simulation.difficultyMode
            requestAnimationFrame(() => { //add a background behind the power up menu
                ctx.fillStyle = `rgba(150,150,150,0.9)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
            powerUps.animatePowerUpGrab('rgba(0, 0, 0,0.6)')

            if (!simulation.paused) {
                simulation.paused = true;
                simulation.isChoosing = true; //stops p from un pausing on key down
                document.body.style.cursor = "auto";
                document.getElementById("choose-grid").style.pointerEvents = "auto";
                document.getElementById("choose-grid").style.transitionDuration = "0s";
            }
            //build level info
            document.getElementById("choose-grid").classList.add('choose-grid-no-images');
            document.getElementById("choose-grid").classList.remove('choose-grid');
            document.getElementById("choose-grid").style.gridTemplateColumns = "390px" //adjust this to increase the width of the whole menu, but mostly the center column

            //<div class="row" id="constraint-1"><strong>0.87x</strong> <strong class='color-d'>damage</strong>, <strong>1.22x</strong> <strong class='color-defense'>damage taken</strong> per level<br><strong>+1</strong> boss on each level</div>
            //<div class="row" id="constraint-2"><strong>more</strong> mobs per level<br><strong>faster</strong> mobs per level</div>
            //<div class="row" id="constraint-3"><strong>0.87x</strong> <strong class='color-d'>damage</strong>, <strong>1.22x</strong> <strong class='color-defense'>damage taken</strong> per level<br><strong>+1</strong> random <strong class="constraint">constraint</strong> on each level</div>
            //<div class="row" id="constraint-4"><strong>+1</strong> boss on each level<br>bosses spawn <strong>1</strong> fewer ${powerUps.orb.tech()}</div>
            //<div class="row" id="constraint-5"><strong>0.87x</strong> <strong class='color-d'>damage</strong>, <strong>1.22x</strong> <strong class='color-defense'>damage taken</strong> per level<br><strong>+1</strong> random <strong class="constraint">constraint</strong> on each level</div>
            //<div class="row" id="constraint-6"><strong>0.5x</strong> initial <strong class='color-d'>damage</strong><br><strong>2x</strong> initial <strong class='color-defense'>damage taken</strong></div>

            let text = `<div>
            <div class="grid-container">
                <div class="left-column">
                    <input type="range" id="difficulty-slider" name="temp" type="range" step="1" value="1" min="1" max="7" list="values" dir="ltr"/>
                    <datalist id="values">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                        <option value="7"></option>
                    </datalist>
                </div>
                <div class="right-column">
                    <div class="row" id="constraint-1"><strong>0.85x</strong> <strong class='color-d'>damage</strong> per level<br><strong>1.25x</strong> <strong class='color-defense'>damage taken</strong> per level</div>
                    <div class="row" id="constraint-2">spawn <strong>more</strong> mobs<br>mobs move <strong>faster</strong></div>
                    <div class="row" id="constraint-3">spawn a <strong>2nd</strong> boss each level<br>bosses spawn <strong>0.5x</strong> power ups</div>
                    <div class="row" id="constraint-4"><strong>0.85x</strong> <strong class='color-d'>damage</strong> per level<br><strong>1.25x</strong> <strong class='color-defense'>damage taken</strong> per level</div>
                    <div class="row" id="constraint-5"><strong>+1</strong> random <strong class="constraint">constraint</strong> each level<br>fewer initial power ups</div>
                    <div class="row" id="constraint-6"><strong>0.5x</strong> initial <strong class='color-d'>damage</strong><br><strong>2x</strong> initial <strong class='color-defense'>damage taken</strong></div>
                    <div class="row" id="constraint-7"><strong>+1</strong> random <strong class="constraint">constraint</strong> each level<br>fewer ${powerUps.orb.tech()} spawn</div>
                </div>
                <div class="far-right-column">
                    <div id = "constraint-1-record">${localSettings.difficultyCompleted[1] ? "⚆" : " "}</div>
                    <div id = "constraint-2-record">${localSettings.difficultyCompleted[2] ? "⚆" : " "}</div>
                    <div id = "constraint-3-record">${localSettings.difficultyCompleted[3] ? "⚆" : " "}</div>
                    <div id = "constraint-4-record">${localSettings.difficultyCompleted[4] ? "⚆" : " "}</div>
                    <div id = "constraint-5-record">${localSettings.difficultyCompleted[5] ? "⚆" : " "}</div>
                    <div id = "constraint-6-record">${localSettings.difficultyCompleted[6] ? "⚇" : " "}</div>
                    <div id = "constraint-6-record">${localSettings.difficultyCompleted[7] ? "⚇" : " "}</div>
                </div>
            </div>
            <div class="choose-grid-module" id="choose-difficulty">
                confirm difficulty parameters 
            </div>
            </div>`
            document.getElementById("choose-grid").innerHTML = text
            //show level info
            document.getElementById("choose-grid").style.opacity = "1"
            document.getElementById("choose-grid").style.transitionDuration = "0.3s"; //how long is the fade in on
            document.getElementById("choose-grid").style.visibility = "visible"
            document.getElementById("choose-difficulty").addEventListener("click", () => {
                level.unPause()
                document.body.style.cursor = "none";
                //reset hide image style
                if (localSettings.isHideImages) {
                    document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                    document.getElementById("choose-grid").classList.remove('choose-grid');
                } else {
                    document.getElementById("choose-grid").classList.add('choose-grid');
                    document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
                }
                if (level.levelsCleared === 0 && initialDifficultyMode !== simulation.difficultyMode) {
                    //remove and respawn all power ups if difficulty mode was changed
                    for (let i = 0; i < powerUp.length; ++i) Matter.Composite.remove(engine.world, powerUp[i]);
                    powerUp = [];
                    level.initialPowerUps()
                    simulation.trails(30)
                }
            });

            let setDifficultyText = function (isReset = true) {
                for (let i = 1; i < 8; i++) {
                    const id = document.getElementById("constraint-" + i)
                    if (simulation.difficultyMode < i) {
                        id.style.opacity = "0.15"
                    } else {
                        id.style.opacity = "1"
                    }
                }
                if (isReset) {
                    lore.setTechGoal()
                    localSettings.difficultyMode = simulation.difficultyMode
                    localSettings.levelsClearedLastGame = 0 //after changing difficulty, reset run history
                    localSettings.entanglement = undefined //after changing difficulty, reset stored tech
                    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
                }
            }
            setDifficultyText(false)
            document.getElementById("difficulty-slider").value = simulation.difficultyMode
            document.getElementById("difficulty-slider").addEventListener("input", () => {
                simulation.difficultyMode = document.getElementById("difficulty-slider").value
                setDifficultyText()
                level.setConstraints()
            });
            for (let i = 1; i < 8; i++) {
                document.getElementById("constraint-" + i).addEventListener("click", () => {
                    simulation.difficultyMode = i
                    document.getElementById("difficulty-slider").value = simulation.difficultyMode
                    setDifficultyText()
                    level.setConstraints()
                });
            }
        },
    },
    coupling: {
        name: "coupling",
        color: "#0ae", //"#0cf",
        size() {
            return 13;
        },
        effect() {
            powerUps.animatePowerUpGrab('rgba(0, 170, 238,0.3)')

            m.couplingChange(1)
        },
        // spawnDelay(num) {
        //     let count = num
        //     let respawnDrones = () => {
        //         if (count > 0) {
        //             requestAnimationFrame(respawnDrones);
        //             if (!simulation.paused && !simulation.isChoosing) { //&& !(simulation.cycle % 2)
        //                 count--
        //                 const where = { x: m.pos.x + 50 * (Math.random() - 0.5), y: m.pos.y + 50 * (Math.random() - 0.5) }
        //                 powerUps.spawn(where.x, where.y, "coupling");
        //             }
        //         }
        //     }
        //     requestAnimationFrame(respawnDrones);
        // }
    },
    boost: {
        name: "boost",
        color: "#f55", //"#0cf",
        size() {
            return 11;
        },
        endCycle: 0,
        duration: null, //set by "tech: band gap"
        damage: null, //set by "tech: band gap"
        isDefense: false,
        effect() {
            powerUps.animatePowerUpGrab('rgba(255, 0, 0, 0.5)')
            powerUps.boost.endCycle = simulation.cycle + Math.floor(Math.max(0, powerUps.boost.endCycle - simulation.cycle) * 0.6) + powerUps.boost.duration //duration+seconds plus 2/3 of current time left
        },
        draw() {
            // console.log(this.endCycle)
            // if (powerUps.boost.endCycle > m.cycle) {
            //     ctx.strokeStyle = "rgba(255,0,0,0.8)" //m.fieldMeterColor; //"rgba(255,255,0,0.2)" //ctx.strokeStyle = `rgba(0,0,255,${0.5+0.5*Math.random()})`
            //     ctx.beginPath();
            //     const arc = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
            //     ctx.arc(m.pos.x, m.pos.y, 28, m.angle - Math.PI * arc, m.angle + Math.PI * arc); //- Math.PI / 2
            //     ctx.lineWidth = 4
            //     ctx.stroke();
            // }

            if (powerUps.boost.endCycle > simulation.cycle) {
                //gel that acts as if the wind is blowing it when player moves
                ctx.save();
                ctx.translate(m.pos.x, m.pos.y);
                m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
                ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
                ctx.beginPath();
                const radius = 40
                const mag = 8 * Vector.magnitude(m.velocitySmooth) + radius
                ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
                ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
                const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)
                ctx.fillStyle = `rgba(255,0,200,${time})`
                ctx.fill()
                ctx.strokeStyle = "#f09"
                ctx.lineWidth = 0.3 + 4 * time
                ctx.stroke();
                ctx.restore();
            }
        },
    },
    research: {
        count: 0,
        name: "research",
        color: "#f7b",
        size() {
            return 20;
        },
        effect() {
            powerUps.animatePowerUpGrab('rgba(255, 119, 187,0.3)')
            powerUps.research.changeRerolls(1)
        },
        isMakingBots: false, //to prevent bot fabrication from running 2 sessions at once
        changeRerolls(amount) {
            if (amount !== 0) powerUps.research.count += amount
            if (tech.isRerollBots && !this.isMakingBots) {
                let cycle = () => {
                    const cost = 2 + Math.floor(b.totalBots() / 3)
                    if (m.alive && powerUps.research.count >= cost) {
                        requestAnimationFrame(cycle);
                        this.isMakingBots = true

                        if (!simulation.paused && !simulation.isChoosing && !(simulation.cycle % 60)) {
                            powerUps.research.count -= cost
                            b.randomBot()
                            if (tech.renormalization) {
                                for (let i = 0; i < cost; i++) {
                                    if (Math.random() < 0.47) {
                                        m.fieldCDcycle = m.cycle + 20;
                                        powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "research");
                                    }
                                }
                            }
                        }
                    } else {
                        this.isMakingBots = false
                    }
                }
                requestAnimationFrame(cycle);
            }

            if (tech.isDeathAvoid && document.getElementById("tech-anthropic")) {
                document.getElementById("tech-anthropic").innerHTML = `-${powerUps.research.count}`
            }
            if (tech.renormalization && Math.random() < 0.47 && amount < 0) {
                for (let i = 0, len = -amount; i < len; i++) powerUps.spawn(m.pos.x, m.pos.y, "research");
            }
            if (tech.isRerollHaste) {
                if (powerUps.research.count === 0) {
                    tech.researchHaste = 0.5;
                    b.setFireCD();
                } else {
                    tech.researchHaste = 1;
                    b.setFireCD();
                }
            }
        },
        currentRerollCount: 0,
        use(type) { //runs when you actually research a list of selections, type can be field, gun, or tech
            if (tech.isJunkResearch && powerUps.research.currentRerollCount < 2) {
                tech.addJunkTechToPool(0.01)
            } else {
                powerUps.research.changeRerolls(-1)
            }
            if (tech.isResearchDamage) {
                tech.damage *= 1.05
                simulation.inGameConsole(`<span class='color-var'>tech</span>.damage *= ${1.05} //peer review`);
                tech.addJunkTechToPool(0.01)
            }
            powerUps.research.currentRerollCount++
            if (tech.isResearchReality) {
                m.switchWorlds("Ψ(t) collapse")
                simulation.trails()
                simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> ${Math.random()}`);
            }
            powerUps[type].effect();
        },
    },
    heal: {
        name: "heal",
        color: "#0eb",
        size() {
            return Math.sqrt(0.1 + 0.25) * 40 * (simulation.healScale ** 0.25) * Math.sqrt(tech.largerHeals * (tech.isHalfHeals ? 0.5 : 1)); //(simulation.healScale ** 0.25)  gives a smaller radius as heal scale goes down
        },
        effect() {
            if (!tech.isEnergyHealth && m.alive) {
                powerUps.animatePowerUpGrab('rgba(0, 238, 187,0.25)')
                let heal = (this.size / 40 / (simulation.healScale ** 0.25)) ** 2 //simulation.healScale is undone here because heal scale is already properly affected on m.addHealth()
                if (heal > 0) {
                    let overHeal = m.health + heal * simulation.healScale - m.maxHealth //used with tech.isOverHeal
                    const healOutput = Math.min(m.maxHealth - m.health, heal) * simulation.healScale
                    m.addHealth(heal);
                    if (healOutput > 0) simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health <span class='color-symbol'>+=</span> ${(healOutput).toFixed(3)}`) // <br>${m.health.toFixed(3)}
                    if (tech.isOverHeal && overHeal > 0) { //tech quenching
                        tech.extraMaxHealth += 0.5 * overHeal //increase max health
                        m.setMaxHealth();
                        simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.maxHealth <span class='color-symbol'>+=</span> ${(0.3 * overHeal).toFixed(3)}`)
                        simulation.drawList.push({ //add dmg to draw queue
                            x: m.pos.x,
                            y: m.pos.y,
                            radius: overHeal * 100 * simulation.healScale,
                            color: "#0eb",
                            time: simulation.drawTime
                        });

                        // overHeal *= 2 //double the over heal converted to max health
                        // //make sure overHeal doesn't kill player
                        // if (m.health - overHeal * m.defense() < 0) overHeal = m.health - 0.01
                        // if (overHeal > m.maxHealth) overHeal = m.maxHealth  //just in case overHeal gets too big
                        // tech.extraMaxHealth += overHeal //increase max health
                        // m.setMaxHealth();
                        // m.damage(overHeal);
                        // overHeal *= m.defense() // account for defense after m.damage() so the text log is accurate
                        // simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health <span class='color-symbol'>-=</span> ${(overHeal).toFixed(3)}`) // <br>${m.health.toFixed(3)}
                        // simulation.drawList.push({ //add dmg to draw queue
                        //     x: m.pos.x,
                        //     y: m.pos.y,
                        //     radius: overHeal * 500 * simulation.healScale,
                        //     color: simulation.mobDmgColor,
                        //     time: simulation.drawTime
                        // });
                    } else if (overHeal > 0.2) { //if leftover heals spawn a new spammer heal power up
                        requestAnimationFrame(() => {
                            powerUps.directSpawn(this.position.x, this.position.y, "heal", true, Math.min(1, overHeal) * 40 * (simulation.healScale ** 0.25))//    directSpawn(x, y, name, moving = true, mode = null, size = powerUps[name].size()) {
                        });
                    }
                    if (tech.isHealBrake) {
                        const totalTime = 1020
                        //check if you already have this effect
                        let foundActiveEffect = false
                        for (let i = 0; i < simulation.ephemera.length; i++) {
                            if (simulation.ephemera[i].name === "healPush") {
                                foundActiveEffect = true
                                simulation.ephemera[i].count = 0.5 * simulation.ephemera[i].count + totalTime //add time
                                simulation.ephemera[i].scale = 0.5 * (simulation.ephemera[i].scale + Math.min(Math.max(0.6, heal * 6), 2.3)) //take average of scale
                            }
                        }
                        if (!foundActiveEffect) {
                            simulation.ephemera.push({
                                name: "healPush",
                                count: totalTime, //cycles before it self removes
                                range: 0,
                                scale: Math.min(Math.max(0.7, heal * 4), 2.2), //typically heal is 0.35
                                do() {
                                    this.count--
                                    if (this.count < 0) simulation.removeEphemera(this.name)
                                    this.range = this.range * 0.99 + 0.01 * (300 * this.scale + 100 * Math.sin(m.cycle * 0.022))
                                    if (this.count < 120) this.range -= 5 * this.scale
                                    this.range = Math.max(this.range, 1) //don't go negative
                                    // const range = 300 + 100 * Math.sin(m.cycle * 0.022)
                                    for (let i = 0; i < mob.length; i++) {
                                        const distance = Vector.magnitude(Vector.sub(m.pos, mob[i].position))
                                        if (distance < this.range) {
                                            const cap = mob[i].isShielded ? 3 : 1
                                            if (mob[i].speed > cap && Vector.dot(mob[i].velocity, Vector.sub(m.pos, mob[i].position)) > 0) { // if velocity is directed towards player
                                                Matter.Body.setVelocity(mob[i], Vector.mult(Vector.normalise(mob[i].velocity), cap)); //set velocity to cap, but keep the direction
                                            }
                                        }
                                    }
                                    ctx.beginPath();
                                    ctx.arc(m.pos.x, m.pos.y, this.range, 0, 2 * Math.PI);
                                    ctx.fillStyle = "hsla(200,50%,61%,0.18)";
                                    ctx.fill();
                                },
                            })
                        }
                    }
                }
            }
            if (powerUps.healGiveMaxEnergy) {
                tech.healMaxEnergyBonus += 0.14 * tech.largerHeals * (tech.isHalfHeals ? 0.5 : 1)
                m.setMaxEnergy();
            }
        },
        spawn(x, y, size) { //used to spawn a heal with a specific size / heal amount, not normally used
            powerUps.directSpawn(x, y, "heal", false, size)
            if (!level.isNextLevelPowerUps && Math.random() < tech.duplicationChance()) {
                powerUps.directSpawn(x, y, "heal", false, size)
                powerUp[powerUp.length - 1].isDuplicated = true
            }
        }
    },
    ammo: {
        name: "ammo",
        color: "#467",
        size() {
            return 17;
        },
        effect() {
            const couplingExtraAmmo = (m.fieldMode === 10 || m.fieldMode === 0) ? 1 + 0.04 * m.coupling : 1
            if (b.inventory.length > 0) {
                powerUps.animatePowerUpGrab('rgba(68, 102, 119,0.25)')
                if (tech.isAmmoForGun && (b.activeGun !== null && b.activeGun !== undefined)) { //give extra ammo to one gun only with tech logistics
                    const name = b.guns[b.activeGun]
                    if (name.ammo !== Infinity) {
                        if (tech.ammoCap) {
                            name.ammo = Math.ceil(2 * name.ammoPack * tech.ammoCap * couplingExtraAmmo)
                        } else {
                            name.ammo += Math.ceil(2 * (Math.random() + Math.random()) * name.ammoPack * couplingExtraAmmo)
                        }
                    }
                } else { //give ammo to all guns in inventory
                    for (let i = 0, len = b.inventory.length; i < len; i++) {
                        const name = b.guns[b.inventory[i]]
                        if (name.ammo !== Infinity) {
                            if (tech.ammoCap) {
                                name.ammo = Math.ceil(name.ammoPack * tech.ammoCap * couplingExtraAmmo)
                            } else { //default ammo behavior
                                name.ammo += Math.ceil((Math.random() + Math.random()) * name.ammoPack * couplingExtraAmmo)
                            }
                        }
                    }
                }
                simulation.updateGunHUD();
            }
        }
    },
    cancelText(type) {
        if (tech.isSuperDeterminism || type === "constraint") {
            return `<div></div>`
        } else if (tech.isCancelTech && tech.cancelTechCount === 0) {
            return `<div class='cancel-card sticky' onclick='powerUps.endDraft("${type}",true)' style="width: 115px;"><span class="color-randomize">randomize</span></div>`
        } else if (level.levelsCleared === 0 && localSettings.isTrainingNotAttempted && b.inventory.length === 0) { //don't show cancel if on initial level and haven't done tutorial
            return `<div class='cancel-card sticky'  style="visibility: hidden;"></div>`
        } else {
            return `<div class='cancel-card sticky' onclick='powerUps.endDraft("${type}",true)' style="width: 85px;">cancel</div>`
        }
    },
    researchText(type) {
        let text = ""
        if (type === "entanglement") {
            text += `<div class='choose-grid-module entanglement flipX sticky' onclick='powerUps.endDraft("${type}",true)'>entanglement</div>`
        } else if (tech.isJunkResearch && powerUps.research.currentRerollCount < 2) {
            text += `<div onclick="powerUps.research.use('${type}')" class='research-card sticky'>` // style = "margin-left: 192px; margin-right: -192px;"
            text += `<div><div> <span style="position:relative;">`
            text += `<div class="circle-grid junk" style="position:absolute; top:0; left:${15 * i}px ;opacity:0.8; border: 1px #fff solid;width: 1.15em;height: 1.15em;"></div>`
            text += `</span>&nbsp; <span class='research-select'>pseudoscience</span></div></div></div>`
        } else if (powerUps.research.count > 0) {
            text += `<div onclick="powerUps.research.use('${type}')" class='research-card sticky' >` // style = "margin-left: 192px; margin-right: -192px;"
            text += `<div><div><span style="position:relative;">`
            for (let i = 0, len = Math.min(powerUps.research.count, 30); i < len; i++) text += `<div class="circle-grid research" style="font-size:0.82em; position:absolute; top:0; left:${(18 - len * 0.21) * i}px ;opacity:0.8; border: 1px #fff solid;"></div>`
            text += `</span>&nbsp; <span class='research-select'>${tech.isResearchReality ? "<span class='alt'>alternate reality</span>" : "research"}</span></div></div></div>`
        } else {
            text += `<div></div>`
        }
        return text
    },
    researchAndCancelText(type) {
        let text = `<div class='research-cancel'>`
        if (type === "constraint") {
            return
        } else if (type === "entanglement") {
            text += `<span class='research-card entanglement flipX' style="width: 275px;" onclick='powerUps.endDraft("${type}",true)'><span style="letter-spacing: 6px;">entanglement</span></span>`
        } else if (tech.isJunkResearch && powerUps.research.currentRerollCount < 2) {
            text += `<span onclick="powerUps.research.use('${type}')" class='research-card' style="width: 275px;float: left;">` // style = "margin-left: 192px; margin-right: -192px;"
            text += `<div><div><span style="position:relative;">`
            text += `<div class="circle-grid junk" style="position:absolute; top:0; left:${15 * i}px ;opacity:0.8; border: 1px #fff solid;width: 1.15em;height: 1.15em;"></div>`
            text += `</span>&nbsp; <span class='research-select'>${tech.isResearchReality ? "<span class='alt'>alternate reality</span>" : "research"}</span></div></div></span>`
        } else if (powerUps.research.count > 0) {
            text += `<span onclick="powerUps.research.use('${type}')" class='research-card' style="width: 275px;float: left;">` // style = "margin-left: 192px; margin-right: -192px;"
            text += `<div><div><span style="position:relative;">`
            let researchCap = 18
            if (tech.isCancelTech && tech.cancelTechCount === 0) researchCap -= 2
            if (canvas.width < 1951) researchCap -= 3
            if (canvas.width < 1711) researchCap -= 4
            for (let i = 0, len = Math.min(powerUps.research.count, researchCap); i < len; i++) {
                text += `<div class="circle-grid research" style="font-size:0.82em; position:absolute; top:0; left:${(18 - len * 0.21) * i}px ;opacity:0.8; border: 1px #fff solid;"></div>`
            }
            text += `</span>&nbsp; <span class='research-select'>${tech.isResearchReality ? "<span class='alt'>alternate reality</span>" : "research"}</span></div></div></span>`
        } else {
            text += `<span class='research-card' style="width: 275px;float: right; background-color: #aaa;color:#888;">research</span>` //&zwnj;
        }
        if (tech.isSuperDeterminism) {
            text += `<span class='cancel-card' style="width: 95px;float: right;background-color: #aaa;color:#888;">cancel</span>`
        } else if (tech.isCancelTech && tech.cancelTechCount === 0) {
            text += `<span class='cancel-card' onclick='powerUps.endDraft("${type}",true)' style="width: 115px;float: right;font-size:0.9em;padding-top:5px;"><span class="color-randomize">randomize</span></span>`
        } else if (level.levelsCleared === 0 && localSettings.isTrainingNotAttempted && b.inventory.length === 0) {
            text += `<span class='cancel-card' style="visibility: hidden;">cancel</span>` //don't show cancel if on initial level and haven't done tutorial
        } else {
            text += `<span class='cancel-card' onclick='powerUps.endDraft("${type}",true)' style="width: 95px;float: right;">cancel</span>`
        }
        return text + "</div>"
    },
    buildColumns(totalChoices, type) {
        let width
        if (canvas.width < 1710) {
            width = "285px"
        } else if (canvas.width < 1950) {
            width = "340px"
        } else {
            width = "384px"
        }

        let text = ""
        if (localSettings.isHideImages) {
            document.getElementById("choose-grid").style.gridTemplateColumns = width
            text += powerUps.researchAndCancelText(type)
        } else if (totalChoices === 0) {
            document.getElementById("choose-grid").style.gridTemplateColumns = width
            text += powerUps.researchAndCancelText(type)
        } else if (totalChoices === 1 || canvas.width < 1200) {
            document.getElementById("choose-grid").style.gridTemplateColumns = width
            text += powerUps.researchAndCancelText(type)
            // console.log('hi')
            // text += powerUps.cancelText(type)
            // text += powerUps.researchText(type)
        } else if (totalChoices === 2) {
            document.getElementById("choose-grid").style.gridTemplateColumns = `repeat(2, ${width})`
            text += powerUps.researchText(type)
            text += powerUps.cancelText(type)
        } else {
            document.getElementById("choose-grid").style.gridTemplateColumns = `repeat(3, ${width})`
            text += "<div></div>"
            text += powerUps.researchText(type)
            text += powerUps.cancelText(type)
        }
        return text
    },
    hideStyle: `style="height:auto; border: none; background-color: transparent;"`,
    constraintText(choose, click) {
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${powerUps.hideStyle}>
        <div class="card-text">
        <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[choose].name}</div>
        ${m.fieldUpgrades[choose].description}</div></div>`
    },
    gunText(choose, click) {
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/gun/${b.guns[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}" ${style}>
            <div class="card-text">
            <div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${b.guns[choose].name}</div>
            ${b.guns[choose].descriptionFunction()}</div></div>`
    },
    fieldText(choose, click) {
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/field/${m.fieldUpgrades[choose].name}${choose === 0 ? Math.floor(Math.random() * 10) : ""}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
        <div class="card-text">
        <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[choose].name}</div>
        ${m.fieldUpgrades[choose].description}</div></div>`
    },
    techText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages || tech.tech[choose].isLore ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title"><div class="circle-grid tech"></div> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    instantTechText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages || tech.tech[choose].isLore ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        // <div class="circle-grid tech"></div>
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title"> <div class="circle-grid-instant"></div> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    skinTechText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title">         
                <span style="position:relative;">
                    <div class="circle-grid-skin"></div>
                    <div class="circle-grid-skin-eye"></div>
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    fieldTechText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title">
                <span style="position:relative;">
                    <div class="circle-grid tech" style="position:absolute; top:0; left:0;opacity:0.8;"></div>
                    <div class="circle-grid field" style="position:absolute; top:0; left:10px;opacity:0.65;"></div>
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    gunTechText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title">         
                <span style="position:relative;">
                    <div class="circle-grid tech" style="position:absolute; top:0; left:0;opacity:0.8;"></div>
                    <div class="circle-grid gun" style="position:absolute; top:0; left:10px; opacity:0.65;"></div>
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    junkTechText(choose, click) {
        const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-size: contain;background-repeat: no-repeat;background-image: url('img/junk.webp');"`
        if (!localSettings.isHideImages) {
            // setTimeout(() => { //delay so that the html element exists
            //     if (tech.tech[choose].url === undefined) { //if on url has been set yet
            //         const url = `https://api.openverse.engineering/v1/images/?q=${tech.tech[choose].name}`;
            //         fetch(url, { signal: AbortSignal.timeout(1000) }) //give up if it takes over 1 second
            //             .then((response) => response.json())
            //             .then((responseJson) => {
            //                 if (responseJson.results.length > 0) {
            //                     const index = Math.floor(Math.random() * responseJson.results.length) //randomly choose from the images
            //                     tech.tech[choose].url = responseJson.results[index].url //store the url
            //                     document.getElementById(`junk-${choose}`).style.backgroundImage = `url('${tech.tech[choose].url}')` //make the url the background image
            //                 }
            //             });
            //     } else {
            //         document.getElementById(`junk-${choose}`).style.backgroundImage = `url('${tech.tech[choose].url}')`
            //     }
            // }, 1);
            // setTimeout(() => { //delay so that the html element exists
            //     document.getElementById(`junk-${choose}`).style.backgroundImage = `url('${tech.tech[choose].url}')`
            // }, 1);
        }
        return `<div id = "junk-${choose}" class="choose-grid-module card-background" onclick="${click}" onauxclick="${click}"${style}>
                <div class="card-text">
                <div class="grid-title"><div class="circle-grid junk"></div> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
    },
    incoherentTechText(choose, click) {
        // text += `<div class="choose-grid-module" style = "background-color: #efeff5; border: 0px; opacity:0.5; font-size: 60%; line-height: 130%; margin: 1px; padding-top: 6px; padding-bottom: 6px;"><div class="grid-title">${tech.tech[choose].name} <span style = "color: #aaa;font-weight: normal;font-size:80%;">- incoherent</span></div></div>`
        const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
        return `<div class="choose-grid-module card-background" ${style}>
                <div class="card-text" style = "background-color: #efeff5;">
                <div class="grid-title" style = "color: #ddd;font-weight: normal;">incoherent</div> <br> <br>
                </div></div>`
    },
    gun: {
        name: "gun",
        color: "#26a",
        size() {
            return 35;
        },
        effect() {
            if (m.alive) {
                let options = [];
                for (let i = 0; i < b.guns.length; i++) {
                    if (!b.guns[i].have) options.push(i);
                }
                // console.log(options.length)
                if (options.length > 0 || !tech.isSuperDeterminism) {
                    let totalChoices = 2 + tech.extraChoices + 3 * (m.fieldMode === 8) - level.fewerChoices
                    if (tech.isCancelTech && tech.cancelTechCount === 1) {
                        totalChoices *= 3
                        tech.cancelTechCount++
                    }
                    if (tech.isDeterminism) totalChoices = 1
                    totalChoices = Math.min(totalChoices, options.length)
                    function removeOption(index) {
                        for (let i = 0; i < options.length; i++) {
                            if (options[i] === index) {
                                options.splice(i, 1) //remove a previous choice from option pool
                                return
                            }
                        }
                    }
                    //check for guns that were a choice last time and remove them
                    for (let i = 0; i < b.guns.length; i++) {
                        if (options.length - 1 < totalChoices) break //you have to repeat choices if there are not enough choices left to display
                        if (b.guns[i].isRecentlyShown) removeOption(i)
                    }
                    for (let i = 0; i < b.guns.length; i++) b.guns[i].isRecentlyShown = false //reset recently shown back to zero
                    // if (options.length > 0) {
                    let text = powerUps.buildColumns(totalChoices, "gun")
                    for (let i = 0; i < totalChoices; i++) {
                        const choose = options[Math.floor(Math.seededRandom(0, options.length))] //pick an element from the array of options                        
                        // text += `<div class="choose-grid-module" onclick="powerUps.choose('gun',${choose})"><div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${b.guns[choose].name}</div> ${b.guns[choose].description}</div>`
                        text += powerUps.gunText(choose, `powerUps.choose('gun',${choose})`)

                        b.guns[choose].isRecentlyShown = true
                        removeOption(choose)
                        if (options.length < 1) break
                    }
                    if (tech.isExtraBotOption) {
                        const botTech = [] //make an array of bot options
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].isBotTech && tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed()) botTech.push(i)
                        }
                        if (botTech.length > 0) { //pick random bot tech
                            const choose = botTech[Math.floor(Math.random() * botTech.length)];
                            const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
                            const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
                            text += `<div class="choose-grid-module card-background" onclick="powerUps.choose('tech',${choose})" ${style}>
                                    <div class="card-text">
                                    <div class="grid-title"><span  style = "font-size: 150%;font-family: 'Courier New', monospace;">⭓▸●■</span> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                                    ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
                        }
                    }
                    if (tech.isOneGun && b.inventory.length > 0) text += `<div style = "color: #f24">replaces your current gun</div>`
                    document.getElementById("choose-grid").innerHTML = text
                    powerUps.showDraft();
                }
                // }
            }
        },
    },
    field: {
        name: "field",
        color: "#0cf",
        size() {
            return 45;
        },
        effect() {
            if (m.alive) {
                let options = [];
                for (let i = 1; i < m.fieldUpgrades.length; i++) { //skip field emitter
                    if (i !== m.fieldMode) options.push(i);
                }
                let totalChoices = 2 + tech.extraChoices + 3 * (m.fieldMode === 8) - level.fewerChoices
                if (tech.isCancelTech && tech.cancelTechCount === 1) {
                    totalChoices *= 3
                    tech.cancelTechCount++
                }
                if (tech.isDeterminism) totalChoices = 1
                totalChoices = Math.max(1, Math.min(totalChoices, options.length))
                function removeOption(index) {
                    for (let i = 0; i < options.length; i++) {
                        if (options[i] === index) {
                            options.splice(i, 1) //remove a previous choice from option pool
                            return
                        }
                    }
                }
                //check for fields that were a choice last time and remove them
                for (let i = 0; i < m.fieldUpgrades.length; i++) {
                    if (options.length - 1 < totalChoices) break //you have to repeat choices if there are not enough choices left to display
                    if (m.fieldUpgrades[i].isRecentlyShown) removeOption(i)
                }
                for (let i = 0; i < m.fieldUpgrades.length; i++) m.fieldUpgrades[i].isRecentlyShown = false //reset recently shown back to zero

                if (options.length > 0 || tech.isExtraBotOption) {
                    let text = powerUps.buildColumns(totalChoices, "field")
                    for (let i = 0; i < totalChoices; i++) {
                        const choose = options[Math.floor(Math.seededRandom(0, options.length))] //pick an element from the array of options
                        //text += `<div class="choose-grid-module" onclick="powerUps.choose('field',${choose})"><div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[choose].name}</div> ${m.fieldUpgrades[choose].description}</div>`                         //default
                        text += powerUps.fieldText(choose, `powerUps.choose('field',${choose})`)
                        m.fieldUpgrades[choose].isRecentlyShown = true
                        removeOption(choose)
                        if (options.length < 1) break
                    }
                    if (tech.isExtraBotOption) {
                        const botTech = [] //make an array of bot options
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].isBotTech && tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed()) botTech.push(i)
                        }
                        if (botTech.length > 0) { //pick random bot tech
                            const choose = botTech[Math.floor(Math.random() * botTech.length)];
                            const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
                            const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
                            text += `<div class="choose-grid-module card-background" onclick="powerUps.choose('tech',${choose})" ${style}>
                                    <div class="card-text">
                                    <div class="grid-title"><span  style = "font-size: 150%;font-family: 'Courier New', monospace;">⭓▸●■</span> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                                    ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
                        }
                    }
                    document.getElementById("choose-grid").innerHTML = text
                    powerUps.showDraft();
                }
            }
        },
    },
    tech: {
        name: "tech",
        color: "hsl(246,100%,77%)", //"#a8f",
        size() {
            return 42;
        },
        effect() {
            if (m.alive) {
                // powerUps.animatePowerUpGrab('hsla(246, 100%, 77%,0.5)')
                let options = []; //generate all options
                optionLengthNoDuplicates = 0
                for (let i = 0; i < tech.tech.length; i++) {
                    if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBanished) {
                        if (tech.tech[i].frequency > 0) optionLengthNoDuplicates++
                        for (let j = 0, len = tech.tech[i].frequency; j < len; j++) options.push(i);
                    }
                }
                function removeOption(index) {
                    for (let i = options.length - 1; i > -1; i--) {
                        if (index === options[i]) {
                            options.splice(i, 1) //remove all copies of that option form the options array (some tech are in the options array multiple times because of frequency)
                            optionLengthNoDuplicates--
                        }
                        if (options.length < 1) return;
                    }
                }
                //set total choices
                let totalChoices = 3 + tech.extraChoices + 3 * (m.fieldMode === 8) - level.fewerChoices
                if (tech.isCancelTech && tech.cancelTechCount === 1) {
                    totalChoices *= 3
                    tech.cancelTechCount++
                }
                if (tech.isDeterminism) totalChoices = 1
                totalChoices = Math.max(1, Math.min(totalChoices, options.length))

                if (optionLengthNoDuplicates < totalChoices + 1) { //if not enough options for all the choices
                    totalChoices = optionLengthNoDuplicates
                    if (tech.isBanish) { //when you run out of options eject banish
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].name === "decoherence") powerUps.ejectTech(i, true)
                        }
                        simulation.inGameConsole(`decoherence <span class='color-var'>tech</span> ejected<br>options reset`)
                    }
                }
                if (tech.tooManyTechChoices) {
                    tech.tooManyTechChoices = false
                    totalChoices = optionLengthNoDuplicates
                }
                if (optionLengthNoDuplicates > totalChoices) { //check for tech that were a choice last time and remove them
                    for (let i = 0; i < tech.tech.length; i++) {
                        if (optionLengthNoDuplicates > totalChoices) {
                            if (tech.tech[i].isRecentlyShown) removeOption(i)
                        } else {
                            break //you have to repeat choices if there are not enough choices left to display
                        }

                    }
                }
                for (let i = 0; i < tech.tech.length; i++) tech.tech[i].isRecentlyShown = false //reset recently shown back to zero
                if (options.length > 0) {
                    let text = powerUps.buildColumns(totalChoices, "tech")

                    addTech = (choose) => {
                        if (tech.tech[choose].isFieldTech) {
                            text += powerUps.fieldTechText(choose, `powerUps.choose('tech',${choose})`)
                        } else if (tech.tech[choose].isGunTech) {
                            text += powerUps.gunTechText(choose, `powerUps.choose('tech',${choose})`)
                        } else if (tech.tech[choose].isJunk) {
                            text += powerUps.junkTechText(choose, `powerUps.choose('tech',${choose})`)
                        } else if (tech.tech[choose].isSkin) {
                            text += powerUps.skinTechText(choose, `powerUps.choose('tech',${choose})`)
                        } else if (tech.tech[choose].isInstant) {
                            text += powerUps.instantTechText(choose, `powerUps.choose('tech',${choose})`)
                        } else { //normal tech
                            text += powerUps.techText(choose, `powerUps.choose('tech',${choose})`)
                        }
                    }
                    if (tech.isRetain) {
                        for (let i = 0, len = powerUps.retainList.length; i < len; i++) {
                            //find index from name and add tech to options
                            for (let j = 0, len = tech.tech.length; j < len; j++) {
                                if (tech.tech[j].name === powerUps.retainList[i] && tech.tech[j].count < tech.tech[j].maxCount && tech.tech[j].allowed() && tech.tech[j].frequency > 0) { //&& !tech.tech[j].isRecentlyShown
                                    addTech(j)
                                }
                            }
                        }
                    }
                    for (let i = 0; i < totalChoices; i++) {
                        if (options.length < 1) break
                        if (Math.random() < tech.junkChance + level.junkAdded) { // choose is set to a random JUNK tech
                            const list = []
                            for (let i = 0; i < tech.tech.length; i++) {
                                if (tech.tech[i].isJunk) list.push(i)
                            }
                            chooseJUNK = list[Math.floor(Math.random() * list.length)]
                            if (tech.isRetain) powerUps.retainList.push(tech.tech[chooseJUNK].name)
                            text += powerUps.junkTechText(chooseJUNK, `powerUps.choose('tech',${chooseJUNK})`)
                        } else {
                            const choose = options[Math.floor(Math.seededRandom(0, options.length))] //pick an element from the array of options
                            if (tech.isBanish) {
                                tech.tech[choose].isBanished = true
                                if (i === 0) simulation.inGameConsole(`options.length = ${optionLengthNoDuplicates} <em class='color-text'>//removed from pool by decoherence</em>`)
                            }
                            removeOption(choose) //remove from future options pool to avoid repeats on this selection

                            //this flag prevents this option from being shown the next time you pick up a tech power up
                            //check if not extra choices from "path integral"
                            tech.tech[choose].isRecentlyShown = true
                            if (tech.isRetain && !powerUps.retainList.includes(tech.tech[choose].name)) powerUps.retainList.push(tech.tech[choose].name)
                            addTech(choose)
                        }
                    }
                    if (tech.isExtraBotOption) {
                        const botTech = [] //make an array of bot options
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].isBotTech && tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isRecentlyShown) botTech.push(i)
                        }
                        if (botTech.length > 0) { //pick random bot tech
                            // const choose = botTech[Math.floor(Math.random() * botTech.length)];
                            // const isCount = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count+1}x)` : "";
                            // text += `<div class="choose-grid-module" onclick="powerUps.choose('tech',${choose})"><div class="grid-title">          <span  style = "font-size: 150%;font-family: 'Courier New', monospace;">⭓▸●■</span>  &nbsp; ${tech.tech[choose].name} ${isCount}</div>          ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div>`
                            const choose = botTech[Math.floor(Math.random() * botTech.length)];
                            const techCountText = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
                            const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
                            text += `<div class="choose-grid-module card-background" onclick="powerUps.choose('tech',${choose})" ${style}>
                                    <div class="card-text">
                                    <div class="grid-title"><span  style = "font-size: 150%;font-family: 'Courier New', monospace;">⭓▸●■</span> &nbsp; ${tech.tech[choose].name} ${techCountText}</div>
                                    ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
                        }
                    }
                    if (tech.isMassProduction) {
                        // const techOptions = [] //make an array of bot options
                        // for (let i = 0, len = tech.tech.length; i < len; i++) {
                        //     if (tech.tech[i].isMassProduction) techOptions.push(i)
                        // }
                        // if (techOptions.length > 0) { //pick random bot tech
                        //     const choose = techOptions[Math.floor(Math.random() * techOptions.length)];
                        //     const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[choose].name}.webp');"`
                        //     text += `<div class="choose-grid-module card-background" onclick="powerUps.choose('tech',${choose})" ${style}>
                        //             <div class="card-text">
                        //             <div class="grid-title">${tech.tech[choose].name}</div>
                        //             ${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div></div>`
                        // }
                        for (let i = 0, len = tech.tech.length; i < len; i++) {
                            if (tech.tech[i].isMassProduction) {
                                const style = localSettings.isHideImages ? powerUps.hideStyle : `style="background-image: url('img/${tech.tech[i].name}.webp');"`
                                text += `<div class="choose-grid-module card-background" onclick="powerUps.choose('tech',${i})" ${style}>
                                        <div class="card-text">
                                        <div class="grid-title">${tech.tech[i].name}</div>
                                        ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div></div>`
                            }
                        }
                    }
                    if (tech.isExtraGunField) {
                        if (Math.random() > 0.5 && b.inventory.length < b.guns.length) {
                            let gunOptions = [];
                            for (let i = 0; i < b.guns.length; i++) {
                                if (!b.guns[i].have) gunOptions.push(i);
                            }
                            const pick = gunOptions[Math.floor(Math.seededRandom(0, gunOptions.length))] //pick an element from the array of options
                            // text += `<div class="choose-grid-module" onclick="powerUps.choose('gun',${pick})"><div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${b.guns[pick].name}</div> ${b.guns[pick].description}</div>`
                            text += powerUps.gunText(pick, `powerUps.choose('gun',${pick})`)
                        } else {
                            let fieldOptions = [];
                            for (let i = 1; i < m.fieldUpgrades.length; i++) { //skip field emitter
                                if (i !== m.fieldMode) fieldOptions.push(i);
                            }
                            const pick = fieldOptions[Math.floor(Math.seededRandom(0, fieldOptions.length))] //pick an element from the array of options
                            // text += `<div class="choose-grid-module" onclick="powerUps.choose('field',${pick})"><div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[pick].name}</div> ${m.fieldUpgrades[pick].description}</div>`
                            text += powerUps.fieldText(pick, `powerUps.choose('field',${pick})`)
                        }
                    }
                    if (tech.isBrainstorm && !tech.isBrainstormActive && !simulation.isChoosing) {
                        tech.isBrainstormActive = true
                        let count = 1
                        let timeStart = performance.now()
                        const cycle = (timestamp) => {
                            // if (timeStart === undefined) timeStart = timestamp
                            // console.log(timestamp, timeStart)
                            if (timestamp - timeStart > tech.brainStormDelay * count && simulation.isChoosing) {
                                count++
                                powerUps.tech.effect();
                                document.getElementById("choose-grid").style.pointerEvents = "auto"; //turn off the normal 500ms delay
                                document.body.style.cursor = "auto";
                                document.getElementById("choose-grid").style.transitionDuration = "0s";
                            }
                            if (count < 10 && simulation.isChoosing) {
                                requestAnimationFrame(cycle);
                            } else {
                                tech.isBrainstormActive = false
                            }
                        }
                        requestAnimationFrame(cycle);
                    }
                    document.getElementById("choose-grid").innerHTML = text
                    powerUps.showDraft();
                }
            }
        },
    },
    retainList: [],
    entanglement: {
        name: "entanglement",
        color: "#fff", //"hsl(248,100%,65%)",
        size() {
            return 40
        },
        effect() {
            if (m.alive && localSettings.entanglement) {
                // let text = ""
                // document.getElementById("choose-grid").style.gridTemplateColumns = "384px 384px 384px"
                let text = powerUps.buildColumns(3, "entanglement")

                // text += powerUps.researchText('tech')
                // text += "<div></div>"
                // text += "<div class='choose-grid-module entanglement flipX'>entanglement</div>"
                // text += `<div class='choose-grid-module' onclick='powerUps.endDraft("tech",true)' style="width: 82px; text-align: center;font-size: 1.1em;font-weight: 100;justify-self: end;">cancel</div>` //powerUps.cancelText('tech')
                if (localSettings.entanglement.fieldIndex && localSettings.entanglement.fieldIndex !== m.fieldMode) {
                    const choose = localSettings.entanglement.fieldIndex //add field
                    text += powerUps.fieldText(choose, `powerUps.choose('field',${choose})`)
                }
                for (let i = 0; i < localSettings.entanglement.gunIndexes.length; i++) { //add guns
                    const choose = localSettings.entanglement.gunIndexes[i]
                    //check if you always have this gun
                    let alreadyHasGun = false
                    for (let j = 0; j < b.inventory.length; j++) {
                        if (b.inventory[j] === choose) alreadyHasGun = true
                    }
                    // text += `<div class="choose-grid-module" onclick="powerUps.choose('gun',${gun})"><div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${b.guns[gun].name}</div> ${b.guns[gun].description}</div>`
                    if (!alreadyHasGun) text += powerUps.gunText(choose, `powerUps.choose('gun',${choose})`)
                }
                for (let i = 0; i < localSettings.entanglement.techIndexes.length; i++) { //add tech
                    let found = false;
                    let choose = undefined
                    for (let j = 0; j < tech.tech.length; j++) {
                        if (localSettings.entanglement.techIndexes[i] === tech.tech[j].name) {
                            choose = j;
                            found = true;
                            break;
                        }
                    }
                    if (found && tech.tech[choose]) {
                        const isCount = tech.tech[choose].count > 0 ? `(${tech.tech[choose].count + 1}x)` : "";
                        if (choose === null || tech.tech[choose].count + 1 > tech.tech[choose].maxCount || !tech.tech[choose].allowed()) {
                            text += powerUps.incoherentTechText(choose)
                        } else {
                            if (tech.tech[choose].isFieldTech) {
                                text += powerUps.fieldTechText(choose, `powerUps.choose('tech',${choose})`)
                            } else if (tech.tech[choose].isGunTech) {
                                text += powerUps.gunTechText(choose, `powerUps.choose('tech',${choose})`)
                            } else if (tech.tech[choose].isLore) {
                                text += `<div class="choose-grid-module" onclick="powerUps.choose('tech',${choose})"><div class="grid-title lore-text"><div class="circle-grid lore"></div> &nbsp; ${tech.tech[choose].name} ${isCount}</div>${tech.tech[choose].descriptionFunction ? tech.tech[choose].descriptionFunction() : tech.tech[choose].description}</div>`
                            } else if (tech.tech[choose].isJunk) {
                                text += powerUps.junkTechText(choose, `powerUps.choose('tech',${choose})`)
                            } else if (tech.tech[choose].isSkin) {
                                text += powerUps.skinTechText(choose, `powerUps.choose('tech',${choose})`)
                            } else if (tech.tech[choose].isInstant) {
                                text += powerUps.instantTechText(choose, `powerUps.choose('tech',${choose})`)
                            } else { //normal tech
                                text += powerUps.techText(choose, `powerUps.choose('tech',${choose})`)
                            }
                        }
                    }
                }
                document.getElementById("choose-grid").innerHTML = text
                powerUps.showDraft();
                localSettings.entanglement = undefined
                if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            }
        },
    },
    spawnDelay(type, count, delay = 2) {
        count *= delay
        let cycle = () => {
            if (count > 0) {
                if (m.alive) requestAnimationFrame(cycle);
                if (!simulation.paused && !simulation.isChoosing && powerUp.length < 300) { //&& !(simulation.cycle % 2)
                    count--
                    if (!(count % delay)) {
                        const where = { x: m.pos.x + 50 * (Math.random() - 0.5), y: m.pos.y + 50 * (Math.random() - 0.5) }
                        powerUps.spawn(where.x, where.y, type);
                    }
                }
            }
        }
        requestAnimationFrame(cycle);
    },
    onPickUp(who) {
        powerUps.research.currentRerollCount = 0
        if (tech.isTechDamage && who.name === "tech") m.damage(0.1)
        if (tech.isMassEnergy) m.energy += 2 * level.isReducedRegen;
        if (tech.isMineDrop && bullet.length < 150 && Math.random() < 0.5) {
            if (tech.isLaserMine && input.down) {
                b.laserMine(who.position)
            } else {
                b.mine(who.position, { x: 0, y: 0 }, 0)
            }
        }
        if (level.isNoDamage) level.noDamageCycle = m.cycle
    },
    spawnRandomPowerUp(x, y) { //mostly used after mob dies,  doesn't always return a power up
        if (!tech.isEnergyHealth && (Math.random() * Math.random() - 0.3 > Math.sqrt(m.health)) || Math.random() < 0.04) { //spawn heal chance is higher at low health
            powerUps.spawn(x, y, "heal");
            return;
        }
        if (Math.random() < 0.15 && b.inventory.length > 0) {
            powerUps.spawn(x, y, "ammo");
            return;
        }
        if (Math.random() < 0.0007 * (3 - b.inventory.length)) { //a new gun has a low chance for each not acquired gun up to 3
            powerUps.spawn(x, y, "gun");
            return;
        }
        if (Math.random() < 0.0016) {
            powerUps.spawn(x, y, "field");
            return;
        }
        if (tech.isCouplingPowerUps && Math.random() < 0.17) {
            powerUps.spawn(x, y, "coupling");
            return;
        }
        if (Math.random() < 0.02 || (tech.isBoostPowerUps && Math.random() < 0.14)) {
            powerUps.spawn(x, y, "boost");
            return;
        }
    },
    randomPowerUpCounter: 0,
    isFieldSpawned: false, //makes it so a field spawns once but not more times
    spawnBossPowerUp(x, y) { //boss spawns field and gun tech upgrades
        if (level.levels[level.onLevel] !== "final") {
            if (!powerUps.isFieldSpawned) {
                powerUps.isFieldSpawned = true
                powerUps.spawn(x, y, "field")
            } else {
                powerUpChance()
            }
            if (simulation.difficultyMode < 3) {//don't spawn second power up on difficulties with a second boss
                powerUpChance()
            }
            function powerUpChance() {
                powerUps.randomPowerUpCounter++
                if (powerUps.randomPowerUpCounter > Math.max(level.levelsCleared, 9) * 0.1 * Math.random()) {
                    powerUps.randomPowerUpCounter = 0; //reset odds
                    if (Math.random() < 0.97) {
                        powerUps.spawn(x, y, "tech")
                    } else {
                        powerUps.spawn(x, y, "gun")
                    }
                } else {
                    if (m.health < 0.65 && !tech.isEnergyHealth) {
                        powerUps.spawn(x, y, "heal");
                        powerUps.spawn(x, y, "heal");
                    } else {
                        powerUps.spawn(x, y, "ammo");
                        powerUps.spawn(x, y, "ammo");
                    }
                }
            }
            powerUps.spawn(x + 25, y - 25, "ammo", false);
            if (simulation.difficultyMode > 5) powerUps.spawn(x - 25, y - 50, "ammo", false);
            if (tech.isAddRemoveMaxHealth) {
                powerUps.spawn(x + 20, y, "tech", false)
                powerUps.spawn(x - 20, y, "research", false)
                powerUps.spawn(x - 40, y, "research", false)
                powerUps.spawn(x + 40, y, "research", false)
                powerUps.spawn(x, y + 20, "research", false)
                powerUps.spawn(x, y - 20, "heal", false)
                powerUps.spawn(x, y + 40, "heal", false)
                powerUps.spawn(x, y - 40, "heal", false)
            }
            if (tech.isResearchReality) powerUps.spawnDelay("research", 6)
            if (tech.isBanish) powerUps.spawnDelay("research", 3)
            if (tech.isCouplingNoHit) powerUps.spawnDelay("coupling", 9)
            // if (tech.isRerollDamage) powerUps.spawnDelay("research", 1)
        }
    },
    chooseRandomPowerUp(x, y) { //100% chance to drop a random power up    //used in spawn.debris
        if (Math.random() < 0.5) {
            powerUps.spawn(x, y, "heal", false);
        } else {
            powerUps.spawn(x, y, "ammo", false);
        }
    },
    addResearchToLevel() { //add a random power up to a location that has a mob,  mostly used to give each level a research
        if ((level.levelsCleared < 17 - simulation.difficultyMode * 3) && mob.length) { //don't spawn late game
            const index = Math.floor(Math.random() * mob.length)
            powerUps.spawn(mob[index].position.x, mob[index].position.y, "research");
        }
    },
    spawnStartingPowerUps(x, y) { //used for map specific power ups, mostly to give player a starting gun
        if (level.levelsCleared < 4) { //runs on first 4 levels on all difficulties
            if (level.levelsCleared > 1 && simulation.difficultyMode < 7) powerUps.spawn(x, y, "tech")
            if (b.inventory.length === 0) {
                powerUps.spawn(x, y, "gun", false); //first gun
            } else if (tech.totalCount === 0) { //first tech
                powerUps.spawn(x - 22, y - 50, "ammo", false); //some ammo
                powerUps.spawn(x, y, "tech", false);
            } else if (b.inventory.length === 1) { //second gun or extra ammo
                if (Math.random() < 0.4) {
                    powerUps.spawn(x, y, "gun", false);
                } else {
                    for (let i = 0; i < 5; i++) powerUps.spawn(x, y, "ammo", false);
                }
            } else {
                for (let i = 0; i < 4; i++) powerUps.spawnRandomPowerUp(x, y);
            }
        } else { //after the first 4 levels just spawn a random power up
            for (let i = 0; i < 3; i++) powerUps.spawnRandomPowerUp(x, y);
        }
    },
    ejectTech(choose = 'random', isOverride = false) {
        if (!simulation.isChoosing || isOverride) {
            // console.log(tech.tech[choose].name, tech.tech[choose].count, tech.tech[choose].isInstant)
            //find which tech you have
            if (choose === 'random') {
                const have = []
                for (let i = 0; i < tech.tech.length; i++) {
                    if (tech.tech[i].count > 0 && !tech.tech[i].isInstant) have.push(i)
                }
                // if (have.length === 0) {
                //     for (let i = 0; i < tech.tech.length; i++) {
                //         if (tech.tech[i].count > 0) have.push(i)
                //     }
                // }

                if (have.length) {
                    choose = have[Math.floor(Math.random() * have.length)]
                    simulation.inGameConsole(`<span class='color-var'>tech</span>.remove("<strong class='color-text'>${tech.tech[choose].name}</strong>")`)

                    for (let i = 0; i < tech.tech[choose].count; i++) {
                        powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
                    }
                    // remove a random tech from the list of tech you have
                    tech.removeCount += tech.tech[choose].count
                    tech.tech[choose].remove();
                    tech.totalCount -= tech.tech[choose].count
                    tech.tech[choose].count = 0;
                    tech.tech[choose].isLost = true;
                    simulation.updateTechHUD();
                    m.fieldCDcycle = m.cycle + 30; //disable field so you can't pick up the ejected tech
                    return true
                } else {
                    return false
                }
            } else if (tech.tech[choose].count && !tech.tech[choose].isInstant) {
                simulation.inGameConsole(`<span class='color-var'>tech</span>.remove("<strong class='color-text'>${tech.tech[choose].name}</strong>")`)

                for (let i = 0; i < tech.tech[choose].count; i++) {
                    powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
                }
                // remove a random tech from the list of tech you have
                tech.tech[choose].remove();
                tech.totalCount -= tech.tech[choose].count
                tech.removeCount += tech.tech[choose].count
                tech.tech[choose].count = 0;
                tech.tech[choose].isLost = true;
                simulation.updateTechHUD();
                m.fieldCDcycle = m.cycle + 30; //disable field so you can't pick up the ejected tech
                return true
            } else {
                return false
            }
        }
    },
    pauseEjectTech(index) {
        if ((tech.isPauseEjectTech || simulation.testing) && !simulation.isChoosing && !tech.tech[index].isInstant) {
            // if (tech.tech[index].bonusResearch !== undefined && tech.tech[index].bonusResearch > powerUps.research.count) {
            //     tech.removeTech(index)
            // } else {
            // }
            tech.tech[index].frequency = 0 //banish tech
            powerUps.ejectTech(index)
            if (m.immuneCycle < m.cycle) m.damage(tech.pauseEjectTech * 0.01, false)
            tech.pauseEjectTech *= 1.3
            document.getElementById(`${index}-pause-tech`).style.textDecoration = "line-through"
            document.getElementById(`${index}-pause-tech`).style.animation = ""
            document.getElementById(`${index}-pause-tech`).onclick = null
        }
    },
    randomize(where) { //makes a random power up convert into a random different power up
        //put 10 power ups close together
        const len = Math.min(10, powerUp.length)
        for (let i = 0; i < len; i++) { //collide the first 10 power ups
            const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
            Matter.Body.setPosition(powerUp[i], Vector.add(where, Vector.mult(unit, 20 + 25 * Math.random())));
            Matter.Body.setVelocity(powerUp[i], Vector.mult(unit, 20));
        }

        //count big power ups and small power ups
        let options = ["heal", "research", tech.isBoostReplaceAmmo ? "boost" : "ammo"]
        if (m.coupling) options.push("coupling")
        if (tech.isBoostPowerUps) options.push("boost")

        let bigIndexes = []
        let smallIndexes = []
        for (let i = 0; i < powerUp.length; i++) {
            if (powerUp[i].name === "tech" || powerUp[i].name === "gun" || powerUp[i].name === "field") {
                bigIndexes.push(i)
            } else {
                smallIndexes.push(i)
            }
        }


        if (smallIndexes.length > 2 && Math.random() < 0.66) {             // console.log("no big, at least 3 small can combine")
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < powerUp.length; i++) {
                    if (powerUp[i].name === "heal" || powerUp[i].name === "research" || powerUp[i].name === "ammo" || powerUp[i].name === "coupling" || powerUp[i].name === "boost") {
                        Matter.Composite.remove(engine.world, powerUp[i]);
                        powerUp.splice(i, 1);
                        break
                    }
                }
            }

            options = ["tech", "gun", "field"]
            powerUps.directSpawn(where.x, where.y, options[Math.floor(Math.random() * options.length)], false)
        } else if (bigIndexes.length > 0 && Math.random() < 0.5) { // console.log("at least 1 big can spilt")
            const index = bigIndexes[Math.floor(Math.random() * bigIndexes.length)]
            for (let i = 0; i < 3; i++) powerUps.directSpawn(where.x, where.y, options[Math.floor(Math.random() * options.length)], false)

            Matter.Composite.remove(engine.world, powerUp[index]);
            powerUp.splice(index, 1);
        } else if (smallIndexes.length > 0) { // console.log("no big, at least 1 small will swap flavors")
            const index = Math.floor(Math.random() * powerUp.length)
            options = options.filter(e => e !== powerUp[index].name); //don't repeat the current power up type
            powerUps.directSpawn(where.x, where.y, options[Math.floor(Math.random() * options.length)], false)
            Matter.Composite.remove(engine.world, powerUp[index]);
            powerUp.splice(index, 1);
        }
    },
    spawn(x, y, name, moving = true, size = powerUps[name].size()) {
        if ((!tech.isSuperDeterminism || (name !== 'research'))) {
            if (tech.isBoostReplaceAmmo && name === 'ammo') {
                name = 'boost'
                size = powerUps[name].size()
            }
            powerUps.directSpawn(x, y, name, moving, size)
            if (!level.isNextLevelPowerUps && Math.random() < tech.duplicationChance()) {
                powerUps.directSpawn(x, y, name, moving, size, true)
                powerUp[powerUp.length - 1].isDuplicated = true
                if (tech.isDupEnergy) m.energy *= 2
            }
        }
    },
    directSpawn(x, y, name, moving = true, size = powerUps[name].size(), isDuplicated = false) {
        if (level.isNextLevelPowerUps) {
            powerUps.powerUpStorage.push({ name: name, size: size })
            return
        }
        let index = powerUp.length;
        let properties = {
            density: 0.001,
            frictionAir: 0.03,
            restitution: 0.85,
            collisionFilter: {
                group: 0,
                category: cat.powerUp,
                mask: cat.map | cat.powerUp
            },
            color: powerUps[name].color,
            effect: powerUps[name].effect,
            name: powerUps[name].name,
            size: size
        }
        let polygonSides
        if (isDuplicated) {
            polygonSides = tech.isPowerUpsVanish ? 3 : Math.floor(4 + 2 * Math.random())
            properties.isDuplicated = true
        } else {
            properties.inertia = Infinity //prevents rotation for circles only
            polygonSides = 12
        }
        powerUp[index] = Matter.Bodies.polygon(x, y, polygonSides, size, properties);
        if (moving) Matter.Body.setVelocity(powerUp[index], { x: (Math.random() - 0.5) * 15, y: Math.random() * -9 - 3 });
        Composite.add(engine.world, powerUp[index]);
    },
    powerUpStorage: [],//used when power ups are sent to the next level (for the constraint, level.isNextLevelPowerUps)
};