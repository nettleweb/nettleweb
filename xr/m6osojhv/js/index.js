"use strict";

//convert text into numbers for seed
Math.hash = s => {
    for (var i = 0, h = 9; i < s.length;) h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
    return h ^ h >>> 9
}

// const date1 = new Date()
// console.log(date1.getUTCHours())
// document.getElementById("seed").placeholder = Math.initialSeed = String(date1.getUTCDate() * date1.getUTCFullYear()) // daily seed,  day + year

// document.getElementById("seed").placeholder = Math.initialSeed = Math.floor(Date.now() % 100000) //random every time:  just the time in milliseconds UTC

window.addEventListener('error', error => {
    // simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ${error.message}  <u>${error.filename}:${error.lineno}</u>`)
    simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ${(error.stack && error.stack.replace(/\n/g, "<br>")) || (error.message + ` <u>${error.filename}:${error.lineno}</u>`)}`);

});

document.getElementById("seed").placeholder = Math.initialSeed = String(Math.floor(Date.now() % 100000))
Math.seed = Math.abs(Math.hash(Math.initialSeed)) //update randomizer seed in case the player changed it
Math.seededRandom = function (min = 0, max = 1) { // in order to work 'Math.seed' must NOT be undefined
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    return min + Math.seed / 233280 * (max - min);
}
//Math.seed is set to document.getElementById("seed").value in level.populate level at the start of runs
// console.log(Math.seed)


function seededShuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements
    while (0 !== currentIndex) {
        // Pick a remaining element...
        // randomIndex = Math.floor(Math.random() * currentIndex);
        randomIndex = Math.floor(Math.seededRandom(0, currentIndex)) //Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// function vertexCollision(v1, v1End, domain, best) {
//     let results
//     for (let i = 0; i < domain.length; ++i) {
//         let vertices = domain[i].vertices;
//         const len = vertices.length - 1;
//         for (let j = 0; j < len; j++) {
//             results = simulation.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
//             if (results.onLine1 && results.onLine2) {
//                 const dx = v1.x - results.x;
//                 const dy = v1.y - results.y;
//                 const dist2 = dx * dx + dy * dy;
//                 if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
//                     best = {
//                         x: results.x,
//                         y: results.y,
//                         dist2: dist2,
//                         who: domain[i],
//                         v1: vertices[j],
//                         v2: vertices[j + 1]
//                     };
//                 }
//             }
//         }
//         results = simulation.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
//         if (results.onLine1 && results.onLine2) {
//             const dx = v1.x - results.x;
//             const dy = v1.y - results.y;
//             const dist2 = dx * dx + dy * dy;
//             if (dist2 < best.dist2) {
//                 best = {
//                     x: results.x,
//                     y: results.y,
//                     dist2: dist2,
//                     who: domain[i],
//                     v1: vertices[0],
//                     v2: vertices[len]
//                 };
//             }
//         }
//     }
//     return best
// }
//this function is used for finding the point where a ray hits things,  used for lasers mostly
function vertexCollision(v1, v1End, domains) {  //= [map, body, [playerBody, playerHead]]     //m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]
    let results
    let best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
    for (let j = 0; j < domains.length; j++) {
        let domain = domains[j]
        for (let i = 0; i < domain.length; ++i) {
            let vertices = domain[i].vertices;
            const len = vertices.length - 1;
            for (let j = 0; j < len; j++) {
                results = simulation.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
                if (results.onLine1 && results.onLine2) {
                    const dx = v1.x - results.x;
                    const dy = v1.y - results.y;
                    const dist2 = dx * dx + dy * dy;
                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                        best = {
                            x: results.x,
                            y: results.y,
                            dist2: dist2,
                            who: domain[i],
                            v1: vertices[j],
                            v2: vertices[j + 1]
                        };
                    }
                }
            }
            results = simulation.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
            if (results.onLine1 && results.onLine2) {
                const dx = v1.x - results.x;
                const dy = v1.y - results.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < best.dist2) {
                    best = {
                        x: results.x,
                        y: results.y,
                        dist2: dist2,
                        who: domain[i],
                        v1: vertices[0],
                        v2: vertices[len]
                    };
                }
            }
        }
    }
    return best
}

// prompts to reload and exit  for JUNK tech named "beforeunload"
function beforeUnloadEventListener(event) {
    event.preventDefault();
    if (tech.isExitPrompt) {
        tech.damage *= 1.25
        // simulation.inGameConsole(`<strong class='color-d'>damage</strong> <span class='color-symbol'>*=</span> ${1.25}`)
        simulation.inGameConsole(`<span class='color-var'>tech</span>.damage *= ${1.25} //beforeunload`);
        if (Math.random() < 0.25) {
            removeEventListener('beforeunload', beforeUnloadEventListener);
        }
    }
}
// addEventListener('beforeunload', beforeUnloadEventListener);


//collision groups
//   cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet | cat.mobShield | cat.phased
const cat = {
    player: 0x1,
    map: 0x10,
    body: 0x100,
    bullet: 0x1000,
    powerUp: 0x10000,
    mob: 0x100000,
    mobBullet: 0x1000000,
    mobShield: 0x10000000,
    phased: 0x100000000,
}

let color = { //light
    // background: "#ddd", // used instead:  document.body.style.backgroundColor
    block: "rgba(140,140,140,0.85)",
    blockS: "#222",
    map: "#444",
    bullet: "#000"
}

// const color = { //dark
//     background: "#333",
//     block: "#444",
//     blockS: "#aab",
//     map: "#556",
//     bullet: "#fff"
// }

// const color = { //dark
//     background: "#999",
//     block: "#888",
//     blockS: "#111",
//     map: "#444",
// }

// shrink power up selection menu
// if (screen.height < 800) {
//     document.getElementById("choose-grid").style.fontSize = "1em"; //1.3em is normal
//     if (screen.height < 600) document.getElementById("choose-grid").style.fontSize = "0.8em"; //1.3em is normal
// }


//**********************************************************************
// check for URL parameters to load an experimental game
//**********************************************************************

//example  https://landgreen.github.io/n-gon/index.html?
//          &gun1=minigun&gun2=laser
//          &tech1=laser-bot&tech2=mass%20driver&tech3=overcharge&tech4=laser-bot&tech5=laser-bot&field=phase%20decoherence%20field&difficulty=2
//add ? to end of url then for each power up add
// &gun1=name&gun2=name
// &tech1=laser-bot&tech2=mass%20driver&tech3=overcharge&tech4=laser-bot&tech5=laser-bot
// &field=phase%20decoherence%20field
// &difficulty=2
//use %20 for spaces
//difficulty is 0 easy, 1 normal, 2 hard, 4 why
function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, k, v) {
        vars[k] = v;
    });
    return vars;
}
window.addEventListener('load', () => {
    const set = getUrlVars()
    if (Object.keys(set).length !== 0) {
        // build.populateGrid() //trying to solve a bug with this, but maybe it doesn't help
        openExperimentMenu();
        //add experimental selections based on url
        for (const property in set) {
            set[property] = set[property].replace(/%20/g, " ")
            set[property] = set[property].replace(/%27/g, "'")
            set[property] = set[property].replace(/%CE%A8/g, "Ψ")
            if (property === "field") {
                let found = false
                let index
                for (let i = 0; i < m.fieldUpgrades.length; i++) {
                    if (set[property] === m.fieldUpgrades[i].name) {
                        index = i;
                        found = true;
                        break;
                    }
                }
                if (found) build.choosePowerUp(index, 'field')
            }
            if (property.substring(0, 3) === "gun") {
                let found = false
                let index
                for (let i = 0; i < b.guns.length; i++) {
                    if (set[property] === b.guns[i].name) {
                        index = i;
                        found = true;
                        break;
                    }
                }
                if (found) build.choosePowerUp(index, 'gun')
            }
            if (property.substring(0, 4) === "tech") {
                for (let i = 0; i < tech.tech.length; i++) {
                    if (set[property] === tech.tech[i].name) {
                        build.choosePowerUp(i, 'tech', true)
                        break;
                    }
                }
            }

            // if (property === "difficulty") {
            //     simulation.difficultyMode = Number(set[property])
            //     lore.setTechGoal()
            //     document.getElementById("difficulty-select-experiment").value = Number(set[property])
            // }
            if (property === "molMode") {
                simulation.molecularMode = Number(set[property])
                const i = 4 //update experiment text
                m.fieldUpgrades[i].description = m.fieldUpgrades[i].setDescription()
                document.getElementById(`field-${i}`).innerHTML = `<div class="card-text">
                <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[i].name)}</div>
                ${m.fieldUpgrades[i].description}</div>`
            }
            // if (property === "seed") {
            //     document.getElementById("seed").placeholder = Math.initialSeed = String(set[property])
            //     Math.seed = Math.abs(Math.hash(Math.initialSeed))
            //     level.populateLevels()
            // }
            requestAnimationFrame(() => { build.sortTech('have', true) });

        }
    } else if (localSettings.isTrainingNotAttempted && localSettings.runCount < 30) { //make training button more obvious for new players
        // document.getElementById("training-button").style.border = "0px #333 solid";
        // document.getElementById("training-button").style.fill = "rgb(0, 150, 235)" //"#fff";
        // document.getElementById("training-button").style.background = "rgb(0, 200, 255)";

        //css classes not working for some reason
        // document.getElementById("training-button").classList.add('lore-text');

        let myanim = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
        myanim.setAttribute("id", "myAnimation");
        myanim.setAttribute("attributeType", "XML");
        myanim.setAttribute("attributeName", "fill");
        // myanim.setAttribute("values", "#f55;#cc5;#5c5;#5dd;#66f;#5dd;#5c5;#cc5;#f55"); //rainbow
        myanim.setAttribute("values", "#5dd;#66f;#5dd");
        // myanim.setAttribute("values", "#333;rgb(0, 170, 255);#333");
        myanim.setAttribute("dur", "3s");
        myanim.setAttribute("repeatCount", "indefinite");
        document.getElementById("training-button").appendChild(myanim);
        document.getElementById("myAnimation").beginElement();
    }
});


//**********************************************************************
//set up canvas
//**********************************************************************
const canvas = document.getElementById("canvas");
//using "const" causes problems in safari when an ID shares the same name.
const ctx = canvas.getContext("2d");
// const ctx = canvas.getContext('2d', { alpha: false }); //optimization, this works if you wipe with the background color of each level

document.body.style.backgroundColor = "#fff";

//disable pop up menu on right click
document.oncontextmenu = function () {
    return false;
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.width2 = canvas.width / 2; //precalculated because I use this often (in mouse look)
    canvas.height2 = canvas.height / 2;
    ctx.font = "25px Arial";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    simulation.setZoom();

    if (simulation.isInvertedVertical) {
        ctx.translate(0, canvas.height); // Move the origin down to the bottom
        ctx.scale(1, -1); // Flip vertically
    }
}
setupCanvas();
window.onresize = () => {
    setupCanvas();
};

//**********************************************************************
// experimental build grid display and pause
//**********************************************************************
//set wikipedia link
for (let i = 0, len = tech.tech.length; i < len; i++) {
    if (!tech.tech[i].link) tech.tech[i].link = `<a target="_blank" href='https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(tech.tech[i].name).replace(/'/g, '%27')}&title=Special:Search' class="link">${tech.tech[i].name}</a>`
}
const build = {
    pixelDraw() {
        let count = 0
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        function loop() {
            count++
            if (!(count % 2)) {
                for (let y = 0; y < canvas.height; ++y) {
                    for (let x = 0; x < canvas.width; x += 1) {
                        const index = (y * canvas.width + x) * 4;
                        // let mag = 0;
                        //   for (let j = 0, len = who.length; j < len; j++) {
                        //     const dx = who[j].position.x - x;
                        //     const dy = who[j].position.y - y;
                        //     mag -= who[j].charge / (Math.sqrt(dx * dx + dy * dy) + 1);
                        //   }

                        //get dark
                        // data[index + 0] *= 0.96
                        // data[index + 1] *= 0.96
                        // data[index + 2] *= 0.96
                        // data[index + 3] -= 1; // alpha

                        //invert
                        data[index + 0] = 255 - data[index + 0] // red
                        data[index + 1] = 255 - data[index + 1] // green
                        data[index + 2] = 255 - data[index + 2] // blue
                    }
                }

                // fade alpha for all pixels
                // for (let i = 0; i < data.length; i += 4) {
                //     if (data[i + 3] > 0) {
                //         data[i + 3]--;
                //     }
                // }

                //add random speckles
                // for (let i = 0, len = Math.floor(data.length / 15000); i < len; ++i) {
                //     const index = Math.floor((Math.random() * data.length) / 4) * 4;
                //     data[index + 0] = 255; // red
                //     data[index + 1] = 255; // green
                //     data[index + 2] = 255; // blue
                //     data[index + 3] = Math.floor(Math.random() * Math.random() * 155); // alpha
                // }

                // ctx.putImageData(imgData, 0, 1); //pixels fall because of the 1 in third parameter
                ctx.putImageData(imgData, 0, 0);
            }
            if (simulation.paused && m.alive) requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    },
    showImages(from) { //on click event:  from all 3 different places to hide / show images 
        localSettings.isHideImages = !localSettings.isHideImages
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
        if (from === 'experiment') {
            build.reset();
        } else if (from === 'pause') {
            build.unPauseGrid()
            build.pauseGrid() //redraw pause text with images
        }
        if (localSettings.isHideImages) {
            document.getElementById("choose-grid").classList.add('choose-grid-no-images');
            document.getElementById("choose-grid").classList.remove('choose-grid');
        } else {
            document.getElementById("choose-grid").classList.add('choose-grid');
            document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
        }
        document.getElementById("hide-images").checked = localSettings.isHideImages
        // console.log(localSettings.isHideImages, from)
    },
    hideHUD() {
        if (simulation.isTraining) {
            localSettings.isHideHUD = false
        } else {
            localSettings.isHideHUD = !localSettings.isHideHUD
        }
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
        document.getElementById("hide-hud").checked = localSettings.isHideHUD
        document.getElementById("hide-hud").classList.toggle("ticked")
        simulation.removeEphemera("dmgDefBars")
        if (!localSettings.isHideHUD) {
            simulation.ephemera.push({
                name: "dmgDefBars", count: 0, do() {
                    if (!(m.cycle % 15)) { //4 times a second
                        const defense = m.defense()             //update defense bar
                        if (m.lastCalculatedDefense !== defense) {
                            document.getElementById("defense-bar").style.width = Math.floor(300 * m.maxHealth * (1 - defense)) + "px";
                            m.lastCalculatedDefense = defense
                        }
                        const damage = tech.damageFromTech()             //update damage bar
                        if (m.lastCalculatedDamage !== damage) {
                            document.getElementById("damage-bar").style.height = Math.floor((Math.atan(0.25 * damage - 0.25) + 0.25) * 0.53 * canvas.height) + "px";
                            m.lastCalculatedDamage = damage
                        }
                    }
                },
            })
        }
    },
    pauseGrid() {
        build.generatePauseLeft() //makes the left side of the pause menu with the tech
        build.generatePauseRight() //makes the right side of the pause menu with the tech
        // build.sortTech('') //sorts tech into the order the player got them using tech.tech[i].cycle = m.cycle
        document.getElementById("right-HUD").style.display = "none"
        document.getElementById("guns").style.display = "none"
        document.getElementById("field").style.display = "none"
        document.getElementById("health").style.display = "none"
        document.getElementById("health-bg").style.display = "none"
        document.getElementById("defense-bar").style.display = "none"
        document.getElementById("damage-bar").style.display = "none"
        //show in game console
        simulation.lastLogTime = m.cycle //hide in game console
    },
    generatePauseLeft() {
        //left side
        let botText = ""
        if (tech.nailBotCount) botText += `<br><strong class='color-bot no-box'>nail-bots ${tech.nailBotCount}</strong>`
        if (tech.orbitBotCount) botText += `<br><strong class='color-bot no-box'>orbital-bots ${tech.orbitBotCount}</strong>`
        if (tech.boomBotCount) botText += `<br><strong class='color-bot no-box'>boom-bots ${tech.boomBotCount}</strong>`
        if (tech.laserBotCount) botText += `<br><strong class='color-bot no-box'>laser-bots ${tech.laserBotCount}</strong>`
        if (tech.foamBotCount) botText += `<br><strong class='color-bot no-box'>foam-bots ${tech.foamBotCount}</strong>`
        if (tech.soundBotCount) botText += `<br><strong class='color-bot no-box'>sound-bots ${tech.soundBotCount}</strong>`
        if (tech.dynamoBotCount) botText += `<br><strong class='color-bot no-box'>dynamo-bots ${tech.dynamoBotCount}</strong>`
        if (tech.plasmaBotCount) botText += `<br><strong class='color-bot no-box'>plasma-bots ${tech.plasmaBotCount}</strong>`
        if (tech.missileBotCount) botText += `<br><strong class='color-bot no-box'>missile-bots ${tech.missileBotCount}</strong>`

        // <strong class='color-g'>${b.activeGun === null || b.activeGun === undefined ? "undefined" : b.guns[b.activeGun].name}</strong> (${b.activeGun === null || b.activeGun === undefined ? "0" : b.guns[b.activeGun].ammo})

        // <br>
        // <input onclick="build.showImages('pause')" type="checkbox" id="hide-images-pause" name="hide-images-pause" ${localSettings.isHideImages ? "checked" : ""}>
        // <label for="hide-images-pause" title="hide images for fields, guns, and tech" style="font-size:1.15em;" >hide images</label>

        let text = `<div class="pause-grid-module" style="padding: 8px;">
<span style="font-size:1.4em;font-weight: 600; float: left;">PAUSED</span> 
<em style="float: right;color:#ccc;">press ${input.key.pause} to resume</em>
<br>
<button onclick="build.shareURL(false)" class='sort-button' style="font-size:1em;float: right;">copy build URL</button>
<input onclick="build.hideHUD('settings')" type="checkbox" id="hide-hud" name="hide-hud" ${localSettings.isHideHUD ? "checked" : ""}>
<label for="hide-hud" title="hide: tech, damage taken, damage, in game console" style="font-size:1.15em;">minimal HUD</label>
</div>

<div class="pause-grid-module">
<details id = "simulation-variables-details" style="padding: 0 8px;line-height: 140%;">
<summary>simulation variables</summary>
<div class="pause-details">
<strong class='color-d'>damage</strong> ${((tech.damageFromTech())).toPrecision(4)}x
<span style="float: right;"><strong class='color-d'>level</strong> ${((m.dmgScale)).toPrecision(4)}x</span>
<br><strong class='color-defense'>damage taken</strong> ${(m.defense()).toPrecision(4)}x
<span style="float: right;"><strong class='color-defense'>level</strong> ${(simulation.dmgScale).toPrecision(4)}x</span>
<br><strong class='color-h'>health</strong> (${level.isHideHealth ? "null" : (m.health * 100).toFixed(0)} / ${(m.maxHealth * 100).toFixed(0)})
<span style="float: right;">${powerUps.research.count} ${powerUps.orb.research()}</span>
<br><strong class='color-f'>energy</strong> (${(m.energy * 100).toFixed(0)} / ${(m.maxEnergy * 100).toFixed(0)}) + (${(m.fieldRegen * 6000 * level.isReducedRegen).toFixed(0)}/s)
<span style="float: right;">${tech.totalCount} ${powerUps.orb.tech()}</span>
<br><strong><em>fire rate</em></strong> ${(1 / b.fireCDscale).toFixed(2)}x
<span style="float: right;">mass ${player.mass.toFixed(1)}</span>
${m.coupling ? `<br><span style = 'font-size:90%;'>` + m.couplingDescription(m.coupling) + `</span> from ${(m.coupling).toFixed(0)} ${powerUps.orb.coupling(1)}` : ""}
<br><strong class='color-dup'>duplication</strong> ${(tech.duplicationChance() * 100).toFixed(0)}%
<span style="float: right;"><strong class='color-junk'>JUNK</strong> ${(100 * (tech.junkChance + level.junkAdded)).toFixed(0)}%</span>
${botText}
<br>
<br> ${level.levelAnnounce()}
<span style="float: right;">position (${player.position.x.toFixed(0)}, ${player.position.y.toFixed(0)})</span>
<br>seed ${Math.initialSeed}
<span style="float: right;">mouse (${simulation.mouseInGame.x.toFixed(0)}, ${simulation.mouseInGame.y.toFixed(0)})</span>
<br>cycles ${m.cycle}
<span style="float: right;">velocity (${player.velocity.x.toFixed(2)}, ${player.velocity.y.toFixed(2)})</span>
<br>mobs ${mob.length} (${spawn.pickList[0]},  ${spawn.pickList[1]})
<span style="float: right;">blocks ${body.length}</span>
<br>bullets ${bullet.length}
<span style="float: right;">power ups ${powerUp.length}</span>

${simulation.isCheating ? "<br><br><em>lore disabled</em>" : ""}
</div>
</details>
</div>`
        text += `<div class="pause-grid-module card-background" style="height:auto;">
<details id="difficulty-parameters-details" style="padding: 0 8px;">
<summary>difficulty parameters</summary>
<div class="pause-details">
        ${simulation.difficultyMode > 0 ? `<div class="pause-difficulty-row"><strong>0.85x</strong> <strong class='color-d'>damage</strong> per level<br><strong>1.25x</strong> <strong class='color-defense'>damage taken</strong> per level</div>` : " "}
        ${simulation.difficultyMode > 1 ? `<div class="pause-difficulty-row">spawn <strong>more</strong> mobs<br>mobs move <strong>faster</strong></div>` : " "}
        ${simulation.difficultyMode > 2 ? `<div class="pause-difficulty-row">spawn a <strong>2nd</strong> boss each level<br>bosses spawn <strong>0.5x</strong> power ups</div>` : " "}
        ${simulation.difficultyMode > 3 ? `<div class="pause-difficulty-row"><strong>0.85x</strong> <strong class='color-d'>damage</strong> per level<br><strong>1.25x</strong> <strong class='color-defense'>damage taken</strong> per level</div>` : " "}
        ${simulation.difficultyMode > 4 ? `<div class="pause-difficulty-row"><strong>+1</strong> random <strong class="constraint">constraint</strong> each level<br>fewer initial power ups</div>` : " "}
        ${simulation.difficultyMode > 5 ? `<div class="pause-difficulty-row"><strong>0.5x</strong> initial <strong class='color-d'>damage</strong><br><strong>2x</strong> initial <strong class='color-defense'>damage taken</strong></div>` : " "}        
        ${simulation.difficultyMode > 6 ? `<div class="pause-difficulty-row"><strong>+1</strong> random <strong class="constraint">constraint</strong> each level<br>fewer ${powerUps.orb.tech()} spawn</div>` : " "}        
</div>
</details>
${simulation.difficultyMode > 4 ? `<details id="constraints-details" style="padding: 0 8px;"><summary>active constraints</summary><div class="pause-details"><span class="constraint">${level.constraintDescription1}<br>${level.constraintDescription2}</span></div></details>` : ""}
</div>`
        if (!localSettings.isHideHUD) text += `<div class="pause-grid-module card-background" style="height:auto;">
<details id = "console-log-details" style="padding: 0 8px;">
<summary>console log</summary>
<div class="pause-details">
    <div class="pause-grid-module" style="    background-color: #e2e9ec;font-size: 0.8em;">${document.getElementById("text-log").innerHTML}</div>
</div>
</details>
</div>`
        if ((tech.isPauseSwitchField || simulation.testing)) {  //&& !simulation.isChoosing
            // const fieldNameP = m.fieldUpgrades[m.fieldMode > 1 ? m.fieldMode - 1 : m.fieldUpgrades.length - 1].name
            // const fieldNameN = m.fieldUpgrades[m.fieldMode === m.fieldUpgrades.length - 2 ? 1 : m.fieldMode + 1].name
            //button above for previous
            text += `<div class="pause-grid-module" id ="pause-field-previous" style="animation: fieldColorCycle 3s linear infinite alternate; border-top: 1px solid #000;border-bottom: 1px solid #000;">
                           <div class="grid-title" style="text-align: center;">↑ <div class="circle-grid field"></div> ↑</div></div>`
            //button for current
            const style = localSettings.isHideImages ? `style="height:auto;"` : `style="background-image: url('img/field/${m.fieldUpgrades[m.fieldMode].name}${m.fieldMode === 0 ? m.fieldUpgrades[0].imageNumber : ""}.webp');"`
            text += `<div class="pause-grid-module card-background" id="pause-field" ${style} >
                                                    <div class="card-text">
                                                        <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[m.fieldMode].name)}</div>
                                                        ${m.fieldUpgrades[m.fieldMode].description}</div> </div>`
            //button below for next
            text += `<div class="pause-grid-module" id="pause-field-next" style="animation: fieldColorCycle 3s linear infinite alternate;border-bottom: 1px solid #000;">
                                                    <div class="grid-title" style="text-align: center;">↓ <div class="circle-grid field"></div> ↓</div></div>`


        } else {
            const style = localSettings.isHideImages ? `style="height:auto;"` : `style="background-image: url('img/field/${m.fieldUpgrades[m.fieldMode].name}${m.fieldMode === 0 ? m.fieldUpgrades[0].imageNumber : ""}.webp');"`
            text += `<div class="pause-grid-module card-background" id="pause-field" ${style} >
                                                    <div class="card-text">
                                                        <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[m.fieldMode].name)}</div>
                                                        ${m.fieldUpgrades[m.fieldMode].description}</div> </div>`
        }
        // for (let i = 0, len = b.inventory.length; i < len; i++) {
        //     text += `<div class="pause-grid-module"><div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${build.nameLink(b.guns[b.inventory[i]].name)} - <span style="font-size:100%;font-weight: 100;">${b.guns[b.inventory[i]].ammo}</span></div> ${b.guns[b.inventory[i]].description}</div>`
        // }
        for (let i = 0, len = b.inventory.length; i < len; i++) {
            const style = localSettings.isHideImages ? `style="height:auto;"` : `style="background-image: url('img/gun/${b.guns[b.inventory[i]].name}.webp');"`
            text += `<div class="pause-grid-module card-background" ${style} >
                                                    <div class="card-text">
                                                        <div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${build.nameLink(b.guns[b.inventory[i]].name)} - <span style="font-size:100%;font-weight: 100;">${b.guns[b.inventory[i]].ammo}</span></div>
                                                        ${b.guns[b.inventory[i]].descriptionFunction()}</div> </div>`
        }
        let el = document.getElementById("pause-grid-left")
        el.style.display = "grid"
        el.innerHTML = text
        requestAnimationFrame(() => {
            if (localSettings.isAllowed) {
                document.getElementById("simulation-variables-details").open = localSettings.pauseMenuDetailsOpen[0]
                document.getElementById("difficulty-parameters-details").open = localSettings.pauseMenuDetailsOpen[1]
                document.getElementById("console-log-details").open = localSettings.pauseMenuDetailsOpen[2]
                if (document.getElementById("constraints-details")) document.getElementById("constraints-details").open = localSettings.pauseMenuDetailsOpen[3]
            }
        });
    },
    generatePauseRight() {
        let text = `<div class="sort">
    <button onclick="build.sortTech('guntech')" class='sort-button'>${powerUps.orb.gunTech()}</button>
    <button onclick="build.sortTech('fieldtech')" class='sort-button'>${powerUps.orb.fieldTech()}</button>
    <button onclick="build.sortTech('damage')" class='sort-button'><strong class='color-d'>damage</strong></button>
    <button onclick="build.sortTech('damage taken')" class='sort-button'><strong style="letter-spacing: 1px;font-weight: 100;">dmg taken</strong></button>
    <button onclick="build.sortTech('heal')" class='sort-button'><strong class='color-h'>heal</strong></button>
    <button onclick="build.sortTech('energy')" class='sort-button'><strong class='color-f'>energy</strong></button>
    <input type="search" id="sort-input" style="width: 8em;font-size: 0.6em;color:#000;" placeholder="sort by" />
    <button onclick="build.sortTech('input')" class='sort-button' style="border-radius: 0em;border: 1.5px #000 solid;font-size: 0.6em;" value="damage">sort</button>
</div>`;
        const ejectClass = (tech.isPauseEjectTech && !simulation.isChoosing) ? 'pause-eject' : ''
        for (let i = 0, len = tech.tech.length; i < len; i++) {
            if (tech.tech[i].count > 0) {
                const style = (localSettings.isHideImages || tech.tech[i].isJunk || tech.tech[i].isLore) ? `style="height:auto;"` : `style = "background-image: url('img/${tech.tech[i].name}.webp');"`
                const techCountText = tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : "";
                if (tech.tech[i].isInstant) {
                    // text += `<div class="pause-grid-module" id ="${i}-pause-tech"  style = "border: 0px; opacity:0.5; font-size: 60%; line-height: 130%; margin: 1px; padding: 6px;"><div class="grid-title">${tech.tech[i].link} ${techCountText}</div>${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div></div>`
                } else if (tech.tech[i].isFieldTech) {
                    text += `<div id="${i}-pause-tech" class="pause-grid-module card-background ${ejectClass}" onclick="powerUps.pauseEjectTech(${i})" ${style}>`
                    text += build.fieldTechText(i) + "</div>"
                } else if (tech.tech[i].isGunTech) {
                    text += `<div id="${i}-pause-tech" class="pause-grid-module card-background ${ejectClass}" onclick="powerUps.pauseEjectTech(${i})" ${style}>`
                    text += build.gunTechText(i) + "</div>"
                } else if (tech.tech[i].isSkin) {
                    text += `<div id="${i}-pause-tech" class="pause-grid-module card-background ${ejectClass}" onclick="powerUps.pauseEjectTech(${i})" ${style}>`
                    text += build.skinTechText(i) + "</div>"
                } else if (tech.tech[i].isJunk) {
                    text += `<div id="${i}-pause-tech" class="pause-grid-module card-background ${ejectClass}" onclick="powerUps.pauseEjectTech(${i})" ${style}>`
                    text += build.junkTechText(i) + "</div>"
                } else {
                    text += `<div id="${i}-pause-tech" class="pause-grid-module card-background ${ejectClass}" onclick="powerUps.pauseEjectTech(${i})" ${style}>`
                    text += build.techText(i) + "</div>"
                }
            } else if (tech.tech[i].isLost) {
                text += `<div class="pause-grid-module" style="text-decoration: line-through; padding-left: 8px; opacity: 0.4;"><div class="grid-title">${tech.tech[i].link}</div>${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div></div>`
            }
        }
        const el = document.getElementById("pause-grid-right")
        el.style.display = "grid"
        el.innerHTML = text

        //add event listener for pressing enter key when in sort
        function pressEnterSort(event) {
            if (event.key === 'Enter') {
                requestAnimationFrame(() => { document.getElementById("sort-input").focus(); });
                // event.preventDefault(); // Prevent the default action to avoid form submission or any other default action
                build.sortTech('input')
            }
        }
        document.getElementById("sort-input").addEventListener('keydown', pressEnterSort);
        // requestAnimationFrame(() => { document.getElementById("sort-input").focus(); });
    },
    sortTech(find, isExperiment = false) {
        const sortKeyword = (a, b) => {
            let aHasKeyword = (a.descriptionFunction ? a.descriptionFunction() : a.description).includes(find) || a.name.includes(find)
            let bHasKeyword = (b.descriptionFunction ? b.descriptionFunction() : b.description).includes(find) || b.name.includes(find)
            if ((aHasKeyword) && !bHasKeyword) return -1;
            if (!aHasKeyword && bHasKeyword) return 1;
            return 0;
        }

        // if (find === '') {
        //     tech.tech.sort((a, b) => { //sorts tech into the order the player got them using tech.tech[i].cycle = m.cycle
        //         console.log(a.cycle, b.cycle)
        //         if (a.cycle === undefined && b.cycle !== undefined) return -1;
        //         if (a.cycle !== undefined && b.cycle === undefined) return 1;
        //         if (a.cycle === undefined && b.cycle === undefined) return 0;
        //         if (a.cycle !== b.cycle) return a.cycle - b.cycle;
        //     });
        // } else
        if (find === 'guntech') {
            tech.tech.sort((a, b) => {
                if (a.isGunTech && b.isGunTech) {
                    return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                }
                if (a.isGunTech && !b.isGunTech) return -1; //sort to the top
                if (!a.isGunTech && b.isGunTech) return 1; //sort to the bottom
                return 0;
            });
        } else if (find === 'fieldtech') {
            tech.tech.sort((a, b) => {
                if (a.isFieldTech && b.isFieldTech) {
                    return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                }
                if (a.isFieldTech && !b.isFieldTech) return -1; //sort to the top
                if (!a.isFieldTech && b.isFieldTech) return 1; //sort to the bottom
                return 0;
            });
        } else if (find === 'allowed') {
            // tech.tech.sort((a, b) => {
            //     if (a.allowed() > !b.allowed()) return -1; //sort to the top
            //     if (!a.allowed() < b.allowed()) return 1; //sort to the bottom
            //     return 0;
            // });
            tech.tech.sort((a, b) => {
                return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
            });
        } else if (find === 'have') {
            tech.tech.sort((a, b) => {
                return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                return 0;
            });
        } else if (find === 'heal') {
            tech.tech.sort((a, b) => {
                if (a.isHealTech && b.isHealTech) {
                    return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                }
                if (a.isHealTech && !b.isHealTech) return -1; //sort to the top
                if (!a.isHealTech && b.isHealTech) return 1; //sort to the bottom
                return 0;
            });
        } else if (find === 'bot') {
            tech.tech.sort((a, b) => {
                if (a.isBotTech && b.isBotTech) {
                    return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                }
                if (a.isBotTech && !b.isBotTech) return -1; //sort to the top
                if (!a.isBotTech && b.isBotTech) return 1; //sort to the bottom
                return 0;
            });
        } else if (document.getElementById("sort-input").value === 'skin') {
            tech.tech.sort((a, b) => {
                if (a.isSkin && b.isSkin) {
                    return (a.allowed() === b.allowed()) ? 0 : a.allowed() ? -1 : 1;
                }
                if (a.isSkin && !b.isSkin) return -1; //sort to the top
                if (!a.isSkin && b.isSkin) return 1; //sort to the bottom
                return 0;
            });
        } else if (document.getElementById("sort-input").value === 'junk') {
            tech.tech.sort((a, b) => {
                if (a.isJunk && !b.isJunk) return -1; //sort to the top
                if (!a.isJunk && b.isJunk) return 1; //sort to the bottom
                return 0;
            });
        } else if (find === 'damage') {
            tech.tech.sort(sortKeyword);
        } else if (find === 'damage taken') {
            tech.tech.sort(sortKeyword);
        } else if (find === 'defense') {
            tech.tech.sort(sortKeyword);
        } else if (find === 'energy') {
            tech.tech.sort(sortKeyword);
        } else if (find === 'input') {
            find = document.getElementById("sort-input").value.toLowerCase();
            tech.tech.sort(sortKeyword);
        }
        if (isExperiment) {
            build.populateGrid()
            // build.updateExperimentText()
            document.getElementById("tech-0").scrollIntoView(); //scroll to the first tech after sorting
        } else {
            build.generatePauseRight() //makes the right side of the pause menu with the tech            
        }
        document.getElementById("sort-input").value = find; //make the sorted string display in the keyword search input field
        simulation.updateTechHUD();
    },
    unPauseGrid() {
        if (localSettings.isAllowed) {
            //save details open/close state
            if (document.getElementById("simulation-variables-details")) localSettings.pauseMenuDetailsOpen[0] = document.getElementById("simulation-variables-details").open
            if (document.getElementById("difficulty-parameters-details")) localSettings.pauseMenuDetailsOpen[1] = document.getElementById("difficulty-parameters-details").open
            if (document.getElementById("console-log-details")) localSettings.pauseMenuDetailsOpen[2] = document.getElementById("console-log-details").open
            if (document.getElementById("constraints-details")) localSettings.pauseMenuDetailsOpen[3] = document.getElementById("constraints-details").open
            localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
        }

        document.getElementById("guns").style.display = "inline"
        document.getElementById("field").style.display = "inline"
        if (tech.isEnergyHealth) {
            document.getElementById("health").style.display = "none"
            document.getElementById("health-bg").style.display = "none"
        } else if (!level.isHideHealth) {
            document.getElementById("health").style.display = "inline"
            document.getElementById("health-bg").style.display = "inline"
        }
        if (!localSettings.isHideHUD) {
            document.getElementById("right-HUD").style.display = "inline"
            document.getElementById("defense-bar").style.display = "inline"
            document.getElementById("damage-bar").style.display = "inline"
        }
        // document.body.style.overflow = "hidden"
        document.getElementById("pause-grid-left").style.display = "none"
        document.getElementById("pause-grid-right").style.display = "none"
        document.getElementById("pause-grid-right").style.opacity = "1"
        document.getElementById("pause-grid-left").style.opacity = "1"
        window.scrollTo(0, 0);
    },
    isExperimentSelection: false,
    isExperimentRun: false,
    techText(i) {
        return `<div class="card-text" >
                                <div class="grid-title" ><div class="circle-grid tech"></div> &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    instantTechText(i) {
        // 
        return `<div class="card-text" >
                                <div class="grid-title" > <div class="circle-grid-instant"></div> &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    skinTechText(i) {
        return `<div class="card-text"> <div class="grid-title">
                                <span style="position:relative;">
                                    <div class="circle-grid-skin"></div>
                                    <div class="circle-grid-skin-eye"></div>
                                </span> &nbsp; &nbsp; &nbsp; &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    gunTechText(i) {
        return `<div class="card-text"> <div class="grid-title">
                                <span style="position:relative;">
                                    <div class="circle-grid tech" style="position:absolute; top:0; left:0;opacity:0.8;"></div>
                                    <div class="circle-grid gun" style="position:absolute; top:0; left:10px; opacity:0.65;"></div>
                                </span> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    fieldTechText(i) {
        return `<div class="card-text"><div class="grid-title">
                                <span style="position:relative;">
                                    <div class="circle-grid tech" style="position:absolute; top:0; left:0;opacity:0.8;"></div>
                                    <div class="circle-grid field" style="position:absolute; top:0; left:10px;opacity:0.65;"></div>
                                </span> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    junkTechText(i) {
        return `<div class="card-text">
                                <div class="grid-title"><div class="circle-grid junk"></div> &nbsp; ${build.nameLink(tech.tech[i].name)} ${tech.tech[i].count > 1 ? `(${tech.tech[i].count}x)` : ""}</div>
                                ${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
    },
    choosePowerUp(index, type, isAllowed = false) {
        if (type === "gun") {
            let isDeselect = false
            for (let i = 0, len = b.inventory.length; i < len; i++) { //look for selection in inventory
                if (b.guns[b.inventory[i]].name === b.guns[index].name) { //if already clicked, remove gun
                    isDeselect = true
                    document.getElementById("gun-" + b.inventory[i]).classList.remove("build-gun-selected");
                    //remove gun
                    b.inventory.splice(i, 1)
                    b.guns[index].count = 0;
                    b.guns[index].have = false;
                    if (b.guns[index].ammo != Infinity) b.guns[index].ammo = 0;
                    if (b.inventory.length === 0) {
                        b.activeGun = null;
                        b.inventoryGun = 0;
                    }
                    simulation.makeGunHUD();
                    break
                }
            }
            if (!isDeselect) { //add gun
                document.getElementById("gun-" + index).classList.add("build-gun-selected");
                b.giveGuns(index)
            }
        } else if (type === "field") {
            if (m.fieldMode !== index) {
                document.getElementById("field-" + m.fieldMode).classList.remove("build-field-selected");
                m.setField(index)
                document.getElementById("field-" + index).classList.add("build-field-selected");
                document.getElementById("tech-150").focus();
            } else if (m.fieldMode === 4) {
                const i = 4 //update experiment text
                simulation.molecularMode++
                if (simulation.molecularMode > i - 1) simulation.molecularMode = 0
                m.fieldUpgrades[i].description = m.fieldUpgrades[i].setDescription()
                // document.getElementById(`field-${i}`).innerHTML = `<div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[i].name)}</div> ${m.fieldUpgrades[i].description}`

                document.getElementById(`field-${i}`).innerHTML = `<div class="card-text">
                                <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[i].name)}</div>
                                ${m.fieldUpgrades[i].description}</div>`
            }
        } else if (type === "tech") {
            if (tech.tech[index].count < tech.tech[index].maxCount) {
                // if (!tech.tech[index].isLore && !tech.tech[index].isInstant && !who.classList.contains("build-tech-selected")) who.classList.add("build-tech-selected");
                if (!document.getElementById("tech-" + index).classList.contains("build-tech-selected")) document.getElementById("tech-" + index).classList.add("build-tech-selected");
                tech.giveTech(index)
            } else if (!tech.tech[index].isInstant) {
                // tech.totalCount -= tech.tech[index].count
                document.getElementById("tech-" + index).classList.remove("build-tech-selected");
                tech.removeTech(index);
            } else {
                // for non refundable tech this makes it flash off for a second, but return to on to show that it can't be set off
                document.getElementById("tech-" + index).classList.remove("build-tech-selected")
                setTimeout(() => { document.getElementById("tech-" + index).classList.add("build-tech-selected") }, 50);
            }
        }
        build.updateExperimentText(isAllowed)
    },
    updateExperimentText(isAllowed = false) {
        for (let i = 0, len = tech.tech.length; i < len; i++) {
            const techID = document.getElementById("tech-" + i)
            if ((!tech.tech[i].isJunk || localSettings.isJunkExperiment) && !tech.tech[i].isLore) {
                if (tech.tech[i].allowed() || isAllowed || tech.tech[i].count > 0) {
                    if (tech.tech[i].isFieldTech) {
                        techID.classList.remove('experiment-grid-hide');
                        techID.innerHTML = build.fieldTechText(i)
                    } else if (tech.tech[i].isGunTech) {
                        techID.classList.remove('experiment-grid-hide');
                        techID.innerHTML = build.gunTechText(i)
                    } else if (tech.tech[i].isJunk) {
                        techID.innerHTML = build.junkTechText(i)
                        // `<div class="grid-title"><div class="circle-grid junk"></div> &nbsp; ${tech.tech[i].link} ${techCountText}</div>${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
                    } else if (tech.tech[i].isSkin) {
                        techID.classList.remove('experiment-grid-hide');
                        techID.innerHTML = build.skinTechText(i)
                    } else if (tech.tech[i].isInstant) {
                        techID.innerHTML = build.instantTechText(i)
                    } else {
                        techID.innerHTML = build.techText(i)
                    }
                    //deselect selected tech options if you don't have the tech any more // for example: when bot techs are converted after a bot upgrade tech is taken
                    if (tech.tech[i].count === 0 && techID.classList.contains("build-tech-selected")) techID.classList.remove("build-tech-selected");
                    if (techID.classList.contains("experiment-grid-disabled")) {
                        techID.classList.remove("experiment-grid-disabled");
                        techID.setAttribute("onClick", `javascript: build.choosePowerUp(${i},'tech')`);
                    }
                } else { //disabled color for disabled tech
                    techID.innerHTML = `<div class="grid-title">${tech.tech[i].name}</div>${tech.tech[i].descriptionFunction ? tech.tech[i].descriptionFunction() : tech.tech[i].description}</div>`
                    if (!techID.classList.contains("experiment-grid-disabled")) {
                        techID.classList.add("experiment-grid-disabled");
                        techID.onclick = null
                    }
                    if (tech.tech[i].count > 0) tech.removeTech(i)
                    if (techID.classList.contains("build-tech-selected")) techID.classList.remove("build-tech-selected");
                    if (tech.tech[i].isFieldTech) {
                        techID.innerHTML = build.fieldTechText(i)
                    } else if (tech.tech[i].isGunTech) {
                        techID.innerHTML = build.gunTechText(i)
                    } else if (tech.tech[i].isJunk) {
                        techID.innerHTML = build.junkTechText(i)
                    } else if (tech.tech[i].isSkin) {
                        techID.innerHTML = build.skinTechText(i)
                    } else if (tech.tech[i].isInstant) {
                        techID.innerHTML = build.instantTechText(i)
                    } else {
                        techID.innerHTML = build.techText(i)
                    }
                }
            }
        }
    },
    //     <div>
    // <select name="difficulty-select" id="difficulty-select-experiment">
    // <option value="1">easy</option>
    // <option value="2" selected>normal ⚆</option>
    // <option value="4">hard ⚆</option>
    // <option value="5">why ⚇</option>
    // </select>
    // &nbsp; &nbsp;
    //     <label for="hide-images-experiment" title="reload experiment with no images for fields, guns, and tech" style="font-size: 0.85em;">hide images</label>
    //     <input onclick="build.showImages('experiment')" type="checkbox" id="hide-images-experiment" name="hide-images-experiment" style="width:13px; height:13px;" ${localSettings.isHideImages ? "checked" : ""}>
    // </div>

    // <button onclick="build.sortTech('allowed', true)" class='sort-button' style="letter-spacing: 1px;font-weight: 400;">allowed</button>
    // <button onclick="build.sortTech('have', true)" class='sort-button color-m' style="letter-spacing: 1px;font-weight: 800;">have</button>
    populateGrid() { //background-color:var(--build-bg-color);
        let text = `
<div class="experiment-start-box">
    <div class="sort" style="border: 0px;">
        <button onclick="build.sortTech('guntech', true)" class='sort-button'>${powerUps.orb.gunTech()}</button>
        <button onclick="build.sortTech('fieldtech', true)" class='sort-button'>${powerUps.orb.fieldTech()}</button>
        <button onclick="build.sortTech('damage', true)" class='sort-button'><strong class='color-d'>damage</strong></button>
        <button onclick="build.sortTech('damage taken', true)" class='sort-button'><strong style="letter-spacing: 1px;font-weight: 100;">dmg taken</strong></button>
        <button onclick="build.sortTech('heal', true)" class='sort-button'><strong class='color-h'>heal</strong></button>
        <button onclick="build.sortTech('energy', true)" class='sort-button'><strong class='color-f'>energy</strong></button>
        <input type="search" id="sort-input" style="width: 7.5em;font-size: 0.6em;color:#000;" placeholder="sort by" />
        <button onclick="build.sortTech('input', true)" class='sort-button' style="border-radius: 0em;border: 1.5px #000 solid;font-size: 0.6em;" value="damage">sort</button>
    </div>
    <div>
        <div style="display: grid;grid-template-columns: repeat(3, 1fr);row-gap: 10px;column-gap: 25px;grid-auto-rows: minmax(5px, auto);margin:-5px 0px 10px 25px;line-height: 100%;">
            <div style="grid-column: 1;grid-row: 2 / 4;">
                <svg class="SVG-button" onclick="build.startExperiment()" width="150" height="70" >
                    <g stroke='none' fill='#333' stroke-width="2" font-size="65px" font-family="Ariel, sans-serif">
                        <text x="10" y="57">start</text>
                    </g>
                </svg>
            </div>
            <div style="grid-column: 2;grid-row: 2;">
                <svg class="SVG-button" onclick="build.reset()" width="50" height="25">
                    <g stroke='none' fill='#333' stroke-width="2" font-size="17px" font-family="Ariel, sans-serif">
                        <text x="5" y="18">reset</text>
                    </g>
                </svg>
            </div>
            <div style="grid-column: 2;grid-row: 3/4;">
                <svg class="SVG-button" onclick="build.shareURL(true)" width="52" height="25">
                    <g stroke='none' fill='#333' stroke-width="2" font-size="17px" font-family="Ariel, sans-serif">
                        <text x="5" y="18">share</text>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</div>`
        const hideStyle = `style="height:auto; border: none; background-color: transparent;"`
        for (let i = 0, len = m.fieldUpgrades.length; i < len; i++) {
            const style = localSettings.isHideImages ? hideStyle : `style="background-image: url('img/field/${m.fieldUpgrades[i].name}${i === 0 ? m.fieldUpgrades[0].imageNumber : ""}.webp');"`
            text += `<div id="field-${i}" class="experiment-grid-module card-background ${m.fieldMode === i ? " build-field-selected" : ""}" onclick="build.choosePowerUp(${i},'field')" ${style} >
                            <div class="card-text">
                                <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[i].name)}</div>
                                ${m.fieldUpgrades[i].description}</div> </div>`
        }
        for (let i = 0, len = b.guns.length; i < len; i++) {
            const style = localSettings.isHideImages ? hideStyle : `style="background-image: url('img/gun/${b.guns[i].name}.webp');"`
            text += `<div id="gun-${i}" class="experiment-grid-module card-background ${b.guns[i].have ? " build-gun-selected" : ""}" onclick="build.choosePowerUp(${i},'gun')" ${style} >
                        <div class="card-text">
                            <div class="grid-title"><div class="circle-grid gun"></div> &nbsp; ${build.nameLink(b.guns[i].name)}</div>
                            ${b.guns[i].descriptionFunction()}</div> </div>`
        }
        for (let i = 0, len = tech.tech.length; i < len; i++) {
            if ((!tech.tech[i].isJunk || localSettings.isJunkExperiment) && !tech.tech[i].isLore) {
                const style = (localSettings.isHideImages || tech.tech[i].isJunk) ? hideStyle : `style="background-image: url('img/${tech.tech[i].name}.webp');"`
                if ((tech.tech[i].allowed() || tech.tech[i].count > 0) && (!tech.tech[i].isInstant || localSettings.isJunkExperiment)) { // || tech.tech[i].name === "+1 cardinality") { //|| tech.tech[i].name === "leveraged investment"
                    text += `<div id="tech-${i}" class="experiment-grid-module card-background ${tech.tech[i].count ? "build-tech-selected" : ""}" onclick="build.choosePowerUp(${i},'tech')" ${style}>`
                } else { //disabled
                    text += `<div id="tech-${i}" class="experiment-grid-module card-background experiment-grid-disabled" ${style}>`
                }

                if (tech.tech[i].isFieldTech) {
                    text += build.fieldTechText(i)
                } else if (tech.tech[i].isGunTech) {
                    text += build.gunTechText(i)
                } else if (tech.tech[i].isSkin) {
                    text += build.skinTechText(i)
                } else if (tech.tech[i].isJunk) {
                    text += build.junkTechText(i)
                } else if (tech.tech[i].isInstant) {
                    text += build.instantTechText(i)
                } else {
                    text += build.techText(i)
                }
                text += '</div>'
            }
        }
        document.getElementById("experiment-grid").innerHTML = text


        //add event listener for pressing enter key when in sort
        function pressEnterSort(event) {
            if (event.key === 'Enter') {
                // event.preventDefault(); // Prevent the default action to avoid form submission or any other default action
                build.sortTech('input', true)
            }
        }
        document.getElementById("sort-input").addEventListener('keydown', pressEnterSort);

        //add tooltips
        for (let i = 0, len = tech.tech.length; i < len; i++) {
            if (document.getElementById(`tech-${i}`)) {
                document.getElementById(`tech-${i}`).setAttribute('data-descr', tech.tech[i].requires); //add tooltip
                // document.getElementById(`tech-${i}`).setAttribute('title', tech.tech[i].requires); //add tooltip
            }
        }

        requestAnimationFrame(() => { document.getElementById("sort-input").focus(); });
    },
    nameLink(text) { //converts text into a clickable wikipedia search
        return `<a target="_blank" href='https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(text).replace(/' /g, '%27')}&title=Special:Search' class="link">${text}</a>`
    },
    reset() {
        build.isExperimentSelection = true;
        build.isExperimentRun = true;
        simulation.startGame(true); //starts game, but pauses it
        build.isExperimentSelection = true;
        build.isExperimentRun = true;
        simulation.paused = true;
        b.inventory = []; //removes guns and ammo
        for (let i = 0, len = b.guns.length; i < len; ++i) {
            b.guns[i].count = 0;
            b.guns[i].have = false;
            if (b.guns[i].ammo != Infinity) b.guns[i].ammo = 0;
        }
        b.activeGun = null;
        b.inventoryGun = 0;
        simulation.makeGunHUD();
        tech.resetAllTech();
        build.populateGrid();
        document.getElementById("field-0").classList.add("build-field-selected");
        document.getElementById("experiment-grid").style.display = "grid"
    },
    shareURL(isCustom = false) {
        let url = "https://landgreen.github.io/n-gon/index.html?"
        url += `&seed=${Math.initialSeed}`
        let count = 0;
        for (let i = 0; i < b.inventory.length; i++) {
            if (b.guns[b.inventory[i]].have) {
                url += `&gun${count}=${encodeURIComponent(b.guns[b.inventory[i]].name.trim())}`
                count++
            }
        }
        count = 0;
        for (let i = 0; i < tech.tech.length; i++) {
            for (let j = 0; j < tech.tech[i].count; j++) {
                if (!tech.tech[i].isLore && !tech.tech[i].isJunk && !tech.tech[i].isInstant) {
                    url += `&tech${count}=${encodeURIComponent(tech.tech[i].name.trim())}`
                    count++
                }
            }
        }
        url += `&molMode=${encodeURIComponent(simulation.molecularMode)}`
        // if (property === "molMode") {
        //     simulation.molecularMode = Number(set[property])
        //     m.fieldUpgrades[i].description = m.fieldUpgrades[i].setDescription()
        //     document.getElementById(`field-${i}`).innerHTML = `<div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[i].name)}</div> ${m.fieldUpgrades[i].description}`
        // }

        url += `&field=${encodeURIComponent(m.fieldUpgrades[m.fieldMode].name.trim())}`
        url += `&difficulty=${simulation.difficultyMode}`
        if (isCustom) {
            // url += `&level=${Math.abs(Number(document.getElementById("starting-level").value))}`
            // alert('n-gon build URL copied to clipboard.\nPaste into browser address bar.')
        } else {
            simulation.inGameConsole("n-gon build URL copied to clipboard.<br>Paste into browser address bar.")
        }
        console.log('n-gon build URL copied to clipboard.\nPaste into browser address bar.')
        console.log(url)
        navigator.clipboard.writeText(url).then(function () {
            /* clipboard successfully set */
            if (isCustom) {
                setTimeout(function () {
                    alert('n-gon build URL copied to clipboard.\nPaste into browser address bar.')
                }, 300);
            }
        }, function () {
            /* clipboard write failed */
            if (isCustom) {
                setTimeout(function () {
                    alert('copy failed')
                }, 300);
            }
            console.log('copy failed')
        });

    },
    hasExperimentalMode: false,
    startExperiment() { //start playing the game after exiting the experiment menu
        build.isExperimentSelection = false;
        spawn.setSpawnList(); //gives random mobs,  not starter mobs
        if (b.inventory.length > 0) {
            b.activeGun = b.inventory[0] //set first gun to active gun
            b.inventoryGun = 0;
            simulation.makeGunHUD();
        }
        for (let i = 0; i < bullet.length; ++i) Matter.Composite.remove(engine.world, bullet[i]);
        bullet = []; //remove any bullets that might have spawned from tech
        build.hasExperimentalMode = false
        if (!simulation.isCheating) {
            for (let i = 0, len = tech.tech.length; i < len; i++) {
                if (tech.tech[i].count > 0 && !tech.tech[i].isLore) simulation.isCheating = true;
            }
            if (b.inventory.length !== 0 || m.fieldMode !== 0) simulation.isCheating = true;
        }
        if (simulation.isCheating) { //if you are cheating remove any lore you might have gotten
            lore.techCount = 0;
            for (let i = 0, len = tech.tech.length; i < len; i++) {
                if (tech.tech[i].isLore) {
                    tech.tech[i].frequency = 0; //remove lore power up chance
                    tech.tech[i].count = 0; //remove lore power up chance
                }
            }
            simulation.updateTechHUD();
        } else { //if you have no tech (not cheating) remove all power ups that might have spawned from tech
            for (let i = 0; i < powerUp.length; ++i) Matter.Composite.remove(engine.world, powerUp[i]);
            powerUp = [];
        }
        document.body.style.cursor = "none";
        document.body.style.overflow = "hidden"
        document.getElementById("experiment-grid").style.display = "none"
        simulation.paused = false;
        requestAnimationFrame(cycle);
    }
}

function openExperimentMenu() {
    document.getElementById("experiment-button").style.display = "none";
    document.getElementById("training-button").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    const el = document.getElementById("experiment-grid")
    el.style.display = "grid"
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    document.getElementById("info").style.display = 'none'
    build.reset();

}

//record settings so they can be reproduced in the experimental menu
document.getElementById("experiment-button").addEventListener("click", () => { //setup build run
    // let field = 0;
    // let inventory = [];
    // let techList = [];
    // if (!simulation.firstRun) {
    //     field = m.fieldMode
    //     inventory = [...b.inventory]
    //     for (let i = 0; i < tech.tech.length; i++) {
    //         techList.push(tech.tech[i].count)
    //     }
    // }
    openExperimentMenu();
});


// ************************************************************************************************
// inputs
// ************************************************************************************************
const input = {
    fire: false, // left mouse
    field: false, // right mouse
    up: false, // jump
    down: false, // crouch
    left: false,
    right: false,
    isPauseKeyReady: true,
    // isMouseInside: true,
    // lastDown: null,
    key: {
        fire: "KeyF",
        field: "Space",
        up: "KeyW", // jump
        down: "KeyS", // crouch
        left: "KeyA",
        right: "KeyD",
        pause: "KeyP",
        nextGun: "KeyE",
        previousGun: "KeyQ",
        testing: "KeyT"
    },
    setDefault() {
        input.key = {
            fire: "KeyF",
            field: "Space",
            up: "KeyW", // jump
            down: "KeyS", // crouch
            left: "KeyA",
            right: "KeyD",
            pause: "KeyP",
            nextGun: "KeyE",
            previousGun: "KeyQ",
            testing: "KeyT"
        }
        input.controlTextUpdate()
    },
    controlTextUpdate() {
        function cleanText(text) {
            return text.replace('Key', '').replace('Digit', '')
        }
        if (!input.key.fire) input.key.fire = "KeyF"
        document.getElementById("key-fire").innerHTML = cleanText(input.key.fire)
        document.getElementById("key-field").innerHTML = cleanText(input.key.field)
        document.getElementById("key-up").innerHTML = cleanText(input.key.up)
        document.getElementById("key-down").innerHTML = cleanText(input.key.down)
        document.getElementById("key-left").innerHTML = cleanText(input.key.left)
        document.getElementById("key-right").innerHTML = cleanText(input.key.right)
        document.getElementById("key-pause").innerHTML = cleanText(input.key.pause)
        document.getElementById("key-next-gun").innerHTML = cleanText(input.key.nextGun)
        document.getElementById("key-previous-gun").innerHTML = cleanText(input.key.previousGun)
        document.getElementById("key-testing").innerHTML = cleanText(input.key.testing) //if (localSettings.loreCount > 0)

        document.getElementById("splash-up").innerHTML = cleanText(input.key.up)[0]
        document.getElementById("splash-down").innerHTML = cleanText(input.key.down)[0]
        document.getElementById("splash-left").innerHTML = cleanText(input.key.left)[0]
        document.getElementById("splash-right").innerHTML = cleanText(input.key.right)[0]
        document.getElementById("splash-next-gun").innerHTML = cleanText(input.key.nextGun)[0]
        document.getElementById("splash-previous-gun").innerHTML = cleanText(input.key.previousGun)[0]

        localSettings.key = input.key
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    },
    focus: null,
    setTextFocus() {
        const backgroundColor = "#fff"
        document.getElementById("key-fire").style.background = backgroundColor
        document.getElementById("key-field").style.background = backgroundColor
        document.getElementById("key-up").style.background = backgroundColor
        document.getElementById("key-down").style.background = backgroundColor
        document.getElementById("key-left").style.background = backgroundColor
        document.getElementById("key-right").style.background = backgroundColor
        document.getElementById("key-pause").style.background = backgroundColor
        document.getElementById("key-next-gun").style.background = backgroundColor
        document.getElementById("key-previous-gun").style.background = backgroundColor
        document.getElementById("key-testing").style.background = backgroundColor
        if (input.focus) input.focus.style.background = 'rgb(0, 200, 255)';
        document.getElementById("key-num").style.background = backgroundColor //always not highlighted
    },
    setKeys(event) {
        //check for duplicate keys
        if (event.code && !(
            event.code === "ArrowRight" ||
            event.code === "ArrowLeft" ||
            event.code === "ArrowUp" ||
            event.code === "ArrowDown" ||
            event.code === input.key.fire ||
            event.code === input.key.field ||
            event.code === input.key.up ||
            event.code === input.key.down ||
            event.code === input.key.left ||
            event.code === input.key.right ||
            event.code === input.key.pause ||
            // event.code === "Escape" ||
            event.code === input.key.nextGun ||
            event.code === input.key.previousGun ||
            event.code === input.key.testing ||
            event.code === "Digit1" || event.code === "Digit2" || event.code === "Digit3" || event.code === "Digit4" || event.code === "Digit5" || event.code === "Digit6" || event.code === "Digit7" || event.code === "Digit8" || event.code === "Digit9" || event.code === "Digit0" || event.code === "Minus" || event.code === "Equal"
        )) {
            switch (input.focus.id) {
                case "key-fire":
                    input.key.fire = event.code
                    break;
                case "key-field":
                    input.key.field = event.code
                    break;
                case "key-up":
                    input.key.up = event.code
                    break;
                case "key-down":
                    input.key.down = event.code
                    break;
                case "key-left":
                    input.key.left = event.code
                    break;
                case "key-right":
                    input.key.right = event.code
                    break;
                case "key-pause":
                    input.key.pause = event.code
                    break;
                case "key-next-gun":
                    input.key.nextGun = event.code
                    break;
                case "key-previous-gun":
                    input.key.previousGun = event.code
                    break;
                case "key-testing":
                    input.key.testing = event.code
                    break;
            }
        }
        input.controlTextUpdate()
        input.endKeySensing()
    },
    endKeySensing() {
        window.removeEventListener("keydown", input.setKeys);
        input.focus = null
        input.setTextFocus()
    }
}

document.getElementById("control-table").addEventListener('click', (event) => {
    if (event.target.className === 'key-input') {
        input.focus = event.target
        input.setTextFocus()
        window.addEventListener("keydown", input.setKeys);
    }
});
document.getElementById("control-details").addEventListener("toggle", function () {
    input.controlTextUpdate()
    input.endKeySensing();
})

document.getElementById("control-reset").addEventListener('click', input.setDefault);

window.addEventListener("keyup", function (event) {
    switch (event.code) {
        case input.key.right:
        case "ArrowRight":
            input.right = false
            break;
        case input.key.left:
        case "ArrowLeft":
            input.left = false
            break;
        case input.key.up:
        case "ArrowUp":
            input.up = false
            break;
        case input.key.down:
        case "ArrowDown":
            input.down = false
            break;
        case input.key.fire:
            input.fire = false
            break
        case input.key.field:
            input.field = false
            break
    }
});

window.addEventListener("keydown", function (event) {
    // input.lastDown = event.code
    // console.log(event.code)
    switch (event.code) {
        case input.key.right:
        case "ArrowRight":
            input.right = true
            break;
        case input.key.left:
        case "ArrowLeft":
            input.left = true
            break;
        case input.key.up:
        case "ArrowUp":
            input.up = true
            break;
        case input.key.down:
        case "ArrowDown":
            input.down = true
            break;
        case input.key.fire:
            input.fire = true
            break
        case input.key.field:
            input.field = true
            break
        case input.key.nextGun:
            simulation.nextGun();
            break
        case input.key.previousGun:
            simulation.previousGun();
            break
        case input.key.pause:
            if (input.isPauseKeyReady && m.alive && !build.isExperimentSelection) {
                input.isPauseKeyReady = false
                setTimeout(function () { input.isPauseKeyReady = true }, 300);
                if (simulation.isChoosing) {

                    build.pauseGrid()

                } else if (simulation.paused) {
                    if (document.activeElement !== document.getElementById('sort-input')) {
                        build.unPauseGrid()
                        simulation.paused = false;
                        // level.levelAnnounce();
                        document.body.style.cursor = "none";
                        requestAnimationFrame(cycle);
                    }
                } else {  //if (!tech.isNoDraftPause)
                    simulation.paused = true;
                    build.pauseGrid()
                    document.body.style.cursor = "auto";

                    if (tech.isPauseSwitchField || simulation.testing) {
                        document.getElementById("pause-field-previous").addEventListener("click", () => {
                            const energy = m.energy //save current energy
                            if (m.fieldMode === 4 && simulation.molecularMode > 0) {
                                simulation.molecularMode--
                                m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
                            } else {
                                m.setField((m.fieldMode < 2) ? m.fieldUpgrades.length - 1 : m.fieldMode - 1) //cycle to previous field, skip field emitter
                                if (m.fieldMode === 4) {
                                    simulation.molecularMode = 3
                                    m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
                                }
                            }
                            m.energy = energy //return to current energy
                            document.getElementById("pause-field").style.backgroundImage = `url('img/field/${m.fieldUpgrades[m.fieldMode].name}${m.fieldMode === 0 ? Math.floor(Math.random() * 10) : ""}.webp')`
                            document.getElementById("pause-field").innerHTML = `<div class="card-text"> <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[m.fieldMode].name)}</div>${m.fieldUpgrades[m.fieldMode].description}</div>`
                        });

                        document.getElementById("pause-field-next").addEventListener("click", () => {
                            const energy = m.energy //save current energy
                            if (m.fieldMode === 4 && simulation.molecularMode < 3) {
                                simulation.molecularMode++
                                m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
                            } else {
                                m.setField((m.fieldMode === m.fieldUpgrades.length - 1) ? 1 : m.fieldMode + 1) //cycle to next field, skip field emitter
                                if (m.fieldMode === 4) {
                                    simulation.molecularMode = 0
                                    m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
                                }
                            }
                            m.energy = energy //return to current energy
                            // document.getElementById("pause-field").innerHTML = `<div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[m.fieldMode].name}</div> ${m.fieldUpgrades[m.fieldMode].description}`
                            document.getElementById("pause-field").style.backgroundImage = `url('img/field/${m.fieldUpgrades[m.fieldMode].name}${m.fieldMode === 0 ? Math.floor(Math.random() * 10) : ""}.webp')`
                            document.getElementById("pause-field").innerHTML = `<div class="card-text"> <div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${build.nameLink(m.fieldUpgrades[m.fieldMode].name)}</div> ${m.fieldUpgrades[m.fieldMode].description}</div>`
                        });
                    }
                }
            }
            break
        case input.key.testing:
            if (m.alive && localSettings.loreCount > 0 && !simulation.paused && !build.isExperimentSelection) {
                if (simulation.difficultyMode > 5) {
                    simulation.inGameConsole("<em>testing mode disabled for this difficulty</em>");
                    break
                }
                if (simulation.testing) {
                    simulation.testing = false;
                    simulation.loop = simulation.normalLoop
                    if (simulation.isConstructionMode) document.getElementById("construct").style.display = 'none'
                    simulation.inGameConsole("", 0);
                } else {
                    simulation.testing = true;
                    simulation.loop = simulation.testingLoop
                    if (simulation.testing) tech.setCheating();
                    if (simulation.isConstructionMode) {
                        document.getElementById("construct").style.display = 'inline'
                    } else {
                        simulation.inGameConsole(
                            `<table class="pause-table">
                <tr>
                    <td class='key-input-pause'>T</td>
                    <td class='key-used'><strong>toggle testing</strong></td>
                </tr>
                <tr>
                    <td class='key-input-pause'>R</td>
                    <td class='key-used'>teleport to mouse</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>F</td>
                    <td class='key-used'>cycle field</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>G</td>
                    <td class='key-used'>all guns</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>H</td>
                    <td class='key-used'>+100% defense</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>B</td>
                    <td class='key-used'>damage, research</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>N</td>
                    <td class='key-used'>fill health, energy</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>Y</td>
                    <td class='key-used'>random tech</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>U</td>
                    <td class='key-used'>next level</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>J</td>
                    <td class='key-used'>clear mobs</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>I/O</td>
                    <td class='key-used'>zoom in / out</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>1-8</td>
                    <td class='key-used'>spawn things</td>
                </tr>
                <tr>
                    <td class='key-input-pause'>⇧X</td>
                    <td class='key-used'>restart</td>
                </tr></table>`, Infinity);
                    }
                }
            }
            break
    }
    if (b.inventory.length > 1 && !simulation.testing && !(tech.isGunChoice || tech.isGunCycle)) {
        switch (event.code) {
            case "Digit1":
                simulation.switchToGunInInventory(0);
                break
            case "Digit2":
                simulation.switchToGunInInventory(1);
                break
            case "Digit3":
                simulation.switchToGunInInventory(2);
                break
            case "Digit4":
                simulation.switchToGunInInventory(3);
                break
            case "Digit5":
                simulation.switchToGunInInventory(4);
                break
            case "Digit6":
                simulation.switchToGunInInventory(5);
                break
            case "Digit7":
                simulation.switchToGunInInventory(6);
                break
            case "Digit8":
                simulation.switchToGunInInventory(7);
                break
            case "Digit9":
                simulation.switchToGunInInventory(8);
                break
            case "Digit0":
                simulation.switchToGunInInventory(9);
                break
            case "Minus":
                simulation.switchToGunInInventory(10);
                break
            case "Equal":
                simulation.switchToGunInInventory(11);
                break
        }
    }

    if (simulation.testing) {
        if (event.key === "X") m.death(); //only uppercase
        switch (event.key.toLowerCase()) {
            case "o":
                // simulation.isAutoZoom = false;
                // simulation.zoomScale /= 0.9;
                // simulation.setZoom();
                simulation.zoomTransition(simulation.zoomScale / 0.9)
                break;
            case "i":
                // simulation.isAutoZoom = false;
                // simulation.zoomScale *= 0.9;
                // simulation.setZoom();
                simulation.zoomTransition(simulation.zoomScale * 0.9)
                break
            case "`":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "research");
                break
            case "1":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "heal");
                break
            case "2":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "ammo");
                break
            case "3":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "gun");
                break
            case "4":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "field");
                break
            case "5":
                powerUps.directSpawn(simulation.mouseInGame.x, simulation.mouseInGame.y, "tech");
                break
            case "6":
                spawn.bodyRect(simulation.mouseInGame.x, simulation.mouseInGame.y, 50, 50);
                break
            case "7":
                const pick = spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)];
                spawn[pick](simulation.mouseInGame.x, simulation.mouseInGame.y);
                break
            case "8":
                spawn.randomLevelBoss(simulation.mouseInGame.x, simulation.mouseInGame.y);
                break
            case "f":
                const mode = (m.fieldMode === m.fieldUpgrades.length - 1) ? 0 : m.fieldMode + 1
                m.setField(mode)
                break
            case "g":
                b.giveGuns("all", 1000)
                break
            case "h":
                // m.health = Infinity
                if (m.immuneCycle === Infinity) {
                    m.immuneCycle = 0 //you can't take damage
                } else {
                    m.immuneCycle = Infinity //you can't take damage
                }

                // m.energy = Infinity
                // document.getElementById("health").style.display = "none"
                // document.getElementById("health-bg").style.display = "none"
                break
            case "n":
                m.addHealth(Infinity)
                m.energy = m.maxEnergy
                break
            case "y":
                tech.giveTech()
                break
            case "b":
                tech.isRerollDamage = true
                powerUps.research.changeRerolls(1000000)
                break
            case "r":
                m.resetHistory();
                Matter.Body.setPosition(player, simulation.mouseInGame);
                Matter.Body.setVelocity(player, { x: 0, y: 0 });
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
                break
            case "u":
                level.nextLevel();
                break
            case "j":
                for (let i = 0, len = mob.length; i < len; ++i) mob[i].damage(Infinity, true)
                setTimeout(() => {
                    for (let i = 0, len = mob.length; i < len; ++i) mob[i].damage(Infinity, true)
                }, 100);
                setTimeout(() => {
                    for (let i = 0, len = mob.length; i < len; ++i) mob[i].damage(Infinity, true)
                }, 200);
                break
            case "l":
                document.getElementById("field").style.display = "none"
                document.getElementById("guns").style.display = "none"
                document.getElementById("right-HUD").style.display = "none"
                break
        }
    }
});
//mouse move input
function mouseMoveDefault(e) {
    simulation.mouse.x = e.clientX;
    simulation.mouse.y = e.clientY;
}
let mouseMove = mouseMoveDefault
document.body.addEventListener("mousemove", (e) => {
    mouseMove(e)
});

document.body.addEventListener("mouseup", (e) => {
    // input.fire = false;
    // console.log(e)
    if (e.button === 0) {
        input.fire = false;
    } else if (e.button === 2) {
        input.field = false;
    }
});

document.body.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
        input.fire = true;
    } else if (e.button === 2) {
        input.field = true;
    }
});

document.body.addEventListener("mouseenter", (e) => { //prevents mouse getting stuck when leaving the window
    if (e.button === 1) {
        input.fire = true;
    } else {
        input.fire = false;
    }

    // if (e.button === 3) {
    //     input.field = true;
    // } else {
    //     input.field = false;
    // }
    // input.isMouseInside = true
});
document.body.addEventListener("mouseleave", (e) => { //prevents mouse getting stuck when leaving the window
    if (e.button === 1) {
        input.fire = true;
    } else {
        input.fire = false;
    }

    // if (e.button === 3) {
    //     input.field = true;
    // } else {
    //     input.field = false;
    // }
    // input.isMouseInside = false
});

document.body.addEventListener("wheel", (e) => {
    if (!simulation.paused) {
        if (e.deltaY > 0) {
            simulation.nextGun();
        } else {
            simulation.previousGun();
        }
    }
}, {
    passive: true
});

//**********************************************************************
//  local storage
//**********************************************************************
let localSettings

function localStorageCheck() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }

}
if (localStorageCheck()) {
    localSettings = JSON.parse(localStorage.getItem("localSettings"))
    if (localSettings) {
        console.log('localStorage is enabled')
        localSettings.isAllowed = true
        localSettings.isEmpty = false
    } else {
        console.log('localStorage is enabled, local settings empty')
        localSettings = {
            isAllowed: true,
            isEmpty: true
        }
    }
} else {
    console.log("localStorage is disabled")
    localSettings = {
        isAllowed: false
    }
}

if (localSettings.isAllowed && !localSettings.isEmpty) {
    console.log('restoring previous settings')

    if (localSettings.key) {
        input.key = localSettings.key
    } else {
        input.setDefault()
    }

    if (localSettings.loreCount === undefined) {
        localSettings.loreCount = 0
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }

    simulation.isCommunityMaps = localSettings.isCommunityMaps
    document.getElementById("community-maps").checked = localSettings.isCommunityMaps

    if (localSettings.fpsCapDefault === undefined) localSettings.fpsCapDefault = 'max'
    if (localSettings.personalSeeds === undefined) localSettings.personalSeeds = [];
    if (localSettings.fpsCapDefault === 'max') {
        simulation.fpsCapDefault = 999999999;
    } else {
        simulation.fpsCapDefault = Number(localSettings.fpsCapDefault)
    }
    document.getElementById("fps-select").value = localSettings.fpsCapDefault

    if (!localSettings.banList) localSettings.banList = ""
    if (localSettings.banList.length === 0 || localSettings.banList === "undefined") {
        localSettings.banList = ""
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }
    document.getElementById("banned").value = localSettings.banList

    if (!localSettings.isLoreDoesNotNeedReset) {
        localSettings.isLoreDoesNotNeedReset = true
        localSettings.loreCount = 0; //this sets what conversation is heard
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }
    if (localSettings.isHideImages === undefined) localSettings.isHideImages = true //default to hide images
    document.getElementById("hide-images").checked = localSettings.isHideImages
    // localSettings.isHideImages = true //no images

    if (localSettings.isHideHUD === undefined) localSettings.isHideHUD = true
    document.getElementById("hide-hud").checked = localSettings.isHideHUD

    if (localSettings.difficultyCompleted === undefined) {
        localSettings.difficultyCompleted = [null, false, false, false, false, false, false, false] //null because there isn't a difficulty zero
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }

    if (localSettings.difficultyMode === undefined) localSettings.difficultyMode = "2"
    simulation.difficultyMode = localSettings.difficultyMode
    lore.setTechGoal()

    if (localSettings.pauseMenuDetailsOpen === undefined) {
        localSettings.pauseMenuDetailsOpen = [true, false, false, true]
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }
} else {
    console.log('setting default localSettings')
    const isAllowed = localSettings.isAllowed //don't overwrite isAllowed value
    localSettings = {
        banList: "",
        isAllowed: isAllowed,
        personalSeeds: [],
        isJunkExperiment: false,
        isCommunityMaps: false,
        difficultyMode: '2',
        difficultyCompleted: [null, false, false, false, false, false, false, false],
        fpsCapDefault: 'max',
        runCount: 0,
        isTrainingNotAttempted: true,
        levelsClearedLastGame: 0,
        loreCount: 0,
        isLoreDoesNotNeedReset: false,
        isHuman: false,
        key: undefined,
        isHideImages: true, //default to hide images
        isHideHUD: false,
        pauseMenuDetailsOpen: [true, false, false, true]
    };
    input.setDefault()
    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    document.getElementById("community-maps").checked = localSettings.isCommunityMaps
    simulation.isCommunityMaps = localSettings.isCommunityMaps
    document.getElementById("hide-images").checked = localSettings.isHideImages
    document.getElementById("fps-select").value = localSettings.fpsCapDefault
    document.getElementById("banned").value = localSettings.banList
}
document.getElementById("control-testing").style.visibility = (localSettings.loreCount === 0) ? "hidden" : "visible"
// document.getElementById("experiment-button").style.visibility = (localSettings.loreCount === 0) ? "hidden" : "visible"
input.controlTextUpdate()


//**********************************************************************
// settings
//**********************************************************************


// difficulty-select-experiment event listener is set in build.makeGrid
// document.getElementById("difficulty-select").addEventListener("input", () => {
//     simulation.difficultyMode = Number(document.getElementById("difficulty-select").value)
//     lore.setTechGoal()
//     localSettings.difficultyMode = simulation.difficultyMode
//     localSettings.levelsClearedLastGame = 0 //after changing difficulty, reset run history
//     localSettings.entanglement = undefined //after changing difficulty, reset stored tech
//     if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
// });


document.getElementById("fps-select").addEventListener("input", () => {
    let value = document.getElementById("fps-select").value
    if (value === 'max') {
        simulation.fpsCapDefault = 999999999;
    } else {
        simulation.fpsCapDefault = Number(value)
    }
    localSettings.fpsCapDefault = value
    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
});

document.getElementById("banned").addEventListener("input", () => {
    localSettings.banList = document.getElementById("banned").value
    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
});

document.getElementById("community-maps").addEventListener("input", () => {
    simulation.isCommunityMaps = document.getElementById("community-maps").checked
    localSettings.isCommunityMaps = simulation.isCommunityMaps
    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
});

document.getElementById("updates").addEventListener("toggle", function () {
    function loadJSON(path, success, error) { //generic function to get JSON
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }
    let text = `<pre><strong>n-gon</strong>: <a href="https://github.com/landgreen/n-gon/blob/master/todo.txt">todo list</a> and complete <a href="https://github.com/landgreen/n-gon/commits/master">change-log</a><hr>`
    document.getElementById("updates-div").innerHTML = text

    ///  https://api.github.com/repos/landgreen/n-gon/stats/commit_activity
    loadJSON('https://api.github.com/repos/landgreen/n-gon/commits',
        function (data) {
            // console.log(data[0].sha) //unique code for most recent commit
            for (let i = 0, len = 20; i < len; i++) {
                text += "<strong>" + data[i].commit.author.date.substr(0, 10) + "</strong> - "; //+ "<br>"
                text += data[i].commit.message
                if (i < len - 1) text += "<hr>"
            }
            text += "</pre>"
            document.getElementById("updates-div").innerHTML = text.replace(/\n/g, "<br />")
        },
        function (xhr) {
            console.error(xhr);
        }
    );
})
const sound = {
    tone(frequency, end = 1000, gain = 0.05) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //setup audio context
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = gain; //controls volume
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = "sine"; // 'sine' 'square', 'sawtooth', 'triangle' and 'custom'
        oscillator.frequency.value = frequency; // value in hertz
        oscillator.start();
        setTimeout(() => {
            audioCtx.suspend()
            audioCtx.close()
        }, end)
        // return audioCtx
    },
    portamento(frequency, end = 1000, shiftRate = 10, gain = 0.05) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //setup audio context
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = gain; //controls volume
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = "sine"; // 'sine' 'square', 'sawtooth', 'triangle' and 'custom'
        oscillator.frequency.value = frequency; // value in hertz
        oscillator.start();
        for (let i = 0, len = end * 0.1; i < len; i++) oscillator.frequency.setValueAtTime(frequency + i * shiftRate, audioCtx.currentTime + i * 0.01);
        setTimeout(() => {
            audioCtx.suspend()
            audioCtx.close()
        }, end)
        // return audioCtx
    }
}

// preload images so they load cleaner
// MDN Scripting and preloads - https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload
// if (!localSettings.isHideImages) {
//     for (let i = 0, len = b.guns.length; i < len; i++) {
//         const preloadLink = document.createElement("link");
//         preloadLink.href = "img/gun/" + b.guns[i].name + ".webp";
//         preloadLink.rel = "preload";
//         preloadLink.as = "image";
//         document.head.appendChild(preloadLink);
//     }
//     for (let i = 1, len = m.fieldUpgrades.length; i < len; i++) {
//         const preloadLink = document.createElement("link");
//         preloadLink.href = "img/field/" + m.fieldUpgrades[i].name + ".webp";
//         preloadLink.rel = "preload";
//         preloadLink.as = "image";
//         document.head.appendChild(preloadLink);
//     }
//     for (let i = 0, len = tech.tech.length; i < len; i++) {
//         if (!tech.tech[i].isJunk) {
//             const preloadLink = document.createElement("link");
//             preloadLink.href = "img/" + tech.tech[i].name + ".webp";
//             preloadLink.rel = "preload";
//             preloadLink.as = "image";
//             document.head.appendChild(preloadLink);
//         }
//     }
// }


//preload images early
if (!localSettings.isHideImages) {
    addEventListener("load", () => {
        let urls = new Array()
        for (let i = 0, len = b.guns.length; i < len; i++) urls.push("img/gun/" + b.guns[i].name + ".webp")
        for (let i = 1, len = m.fieldUpgrades.length; i < len; i++) urls.push("img/field/" + m.fieldUpgrades[i].name + ".webp")
        for (let i = 0, len = tech.tech.length; i < len; i++) {
            if (!tech.tech[i].isJunk && !tech.tech[i].isLore) urls.push("img/" + tech.tech[i].name + ".webp")
        }
        let images = new Array()
        for (let i = 0; i < urls.length; i++) {
            images[i] = new Image()
            images[i].src = urls[i]
        }
        // console.log(urls, images)
    });
    document.getElementById("choose-grid").classList.add('choose-grid');
} else {
    document.getElementById("choose-grid").classList.add('choose-grid-no-images');
}


//**********************************************************************
// main loop 
//**********************************************************************
simulation.loop = simulation.normalLoop;

function cycle() {
    if (!simulation.paused) requestAnimationFrame(cycle);
    const now = Date.now();
    const elapsed = now - simulation.then; // calc elapsed time since last loop
    if (elapsed > simulation.fpsInterval) { // if enough time has elapsed, draw the next frame
        simulation.then = now - (elapsed % simulation.fpsInterval); // Get ready for next frame by setting then=now.   Also, adjust for fpsInterval not being multiple of 16.67

        simulation.cycle++; //tracks game cycles
        m.cycle++; //tracks player cycles  //used to alow time to stop for everything, but the player
        if (simulation.clearNow) {
            simulation.clearNow = false;
            simulation.clearMap();
            level.start();
        }
        simulation.loop();
    }
}

// function cycle() {
//     if (!simulation.paused) requestAnimationFrame(cycle);
//     const now = Date.now();
//     const elapsed = now - simulation.then; // calc elapsed time since last loop
//     if (elapsed > simulation.fpsInterval) { // if enough time has elapsed, draw the next frame
//         simulation.then = now - (elapsed % simulation.fpsInterval); // Get ready for next frame by setting then=now.   Also, adjust for fpsInterval not being multiple of 16.67

//         simulation.cycle++; //tracks game cycles
//         m.cycle++; //tracks player cycles  //used to alow time to stop for everything, but the player
//         if (simulation.clearNow) {
//             simulation.clearNow = false;
//             simulation.clearMap();
//             level.start();
//         }
//         simulation.loop();
//     }
// }

// let timeStart = performance.now()
// //0,  16.6666666666,   33.333333333333, 50.000000000
// function cycle(timestamp) {
//     if (!simulation.paused) requestAnimationFrame(cycle);
//     if (timestamp - timeStart > 0) { //simulation.fpsInterval) { // if enough time has elapsed, draw the next frame
//         console.log(timestamp - timeStart)
//         timeStart = timestamp
//         simulation.cycle++; //tracks game cycles
//         m.cycle++; //tracks player cycles  //used to alow time to stop for everything, but the player
//         if (simulation.clearNow) {
//             simulation.clearNow = false;
//             simulation.clearMap();
//             level.start();
//         }
//         simulation.loop();
//     }
// }

// let count = 1
// let timeStart = performance.now()
// const cycle = (timestamp) => {
//     // if (timeStart === undefined) timeStart = timestamp
//     // console.log(timestamp, timeStart)
//     if (timestamp - timeStart > tech.brainStormDelay * count) {
//         count++
//         powerUps.tech.effect();
//         document.getElementById("choose-grid").style.pointerEvents = "auto"; //turn off the normal 500ms delay
//         document.body.style.cursor = "auto";
//         document.getElementById("choose-grid").style.transitionDuration = "0s";
//     }
//     if (count < 5 && simulation.isChoosing) {
//         requestAnimationFrame(cycle);
//     } else {
//         tech.isBrainstormActive = false
//     }
// }
// requestAnimationFrame(cycle);