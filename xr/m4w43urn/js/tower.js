(function() { // private module pattern

  'use strict'

  //===========================================================================
  // CONSTANTS
  //===========================================================================

  var FPS           = 60,                                                   // 'update' frame rate fixed at 60fps independent of rendering loop
      WIDTH         = 720,                                                  // must have width multiple of 360...
      HEIGHT        = 540,                                                  // ... and 4:3 w:h ratio
      HORIZON       = HEIGHT/5,                                             // how much ground to show below the tower
      METER         = HEIGHT/20,                                            // how many pixels represent 1 meter
      COL_WIDTH     = METER * 3,                                            // 2D column width
      ROW_HEIGHT    = METER,                                                // 2D row height
      ROW_SURFACE   = ROW_HEIGHT * 0.3,                                     // amount of row considered 'near' enough to surface to allow jumping onto that row (instead of bouncing off again)
      PLAYER_WIDTH  = METER * 1.5,                                          // player logical width
      PLAYER_HEIGHT = METER * 2,                                            // player logical height
      GROUND_SPEED  = 2,                                                    // how fast ground scrolls left-right
      GRAVITY       = 9.8 * 4,                                              // (exagerated) gravity
      MAXDX         = 10,                                                   // player max horizontal speed (meters per second)
      MAXDY         = (ROW_SURFACE*FPS/METER),                              // player max vertical speed (meters per second) - ENSURES CANNOT FALL THROUGH PLATFORM SURFACE
      CLIMBDY       = 8,                                                    // player climbing speed (meters per second)
      ACCEL         = 1/4,                                                  // player take 1/4 second to reach maxdx (horizontal acceleration)
      FRICTION      = 1/8,                                                  // player take 1/8 second to stop from maxdx (horizontal friction)
      IMPULSE       = 15 * FPS,                                             // player jump impulse
      FALLING_JUMP  = FPS/5,                                                // player allowed to jump for 1/5 second after falling off a platform
      LADDER_EDGE   = 0.6,                                                  // how far from ladder center (60%) is ladder's true collision boundary, e.g. you fall off if you get more than 60% away from center of ladder
      COIN          = { W: ROW_HEIGHT, H: ROW_HEIGHT },                     // logical size of coin
      DIR           = { NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4 },       // useful enum for declaring an abstract direction
      STEP          = { FRAMES: 8, W: COL_WIDTH/10, H: ROW_HEIGHT },        // attributes of player stepping up
      KEY           = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 }, // input key codes
      IMAGES        = ['ground', 'ladder', 'player', 'monster', 'coins'],   // sprite image files for loading
      PLAYER        = { DEBUG: false,                                       // enable player debug rendering (bounding box and collision points)
        RIGHT: { x: 0,    y: 0, w: 72, h: 96, frames: 11, fps: 30 },        // animation - player running right
        STAND: { x: 792,  y: 0, w: 72, h: 96, frames: 1,  fps: 30 },        // animation - player standing still
        LEFT:  { x: 1224, y: 0, w: 72, h: 96, frames: 11, fps: 30 },        // animation - player running left
        BACK:  { x: 2016, y: 0, w: 72, h: 96, frames: 1,  fps: 30 },        // animation - player standing still with back to camera (on ladder but not moving)
        CLIMB: { x: 2016, y: 0, w: 72, h: 96, frames: 11, fps: 30 },        // animation - player climbing ladder
        HURTL: { x: 1080, y: 0, w: 72, h: 96, frames: 1,  fps: 10 },        // animation - player hurt while running left
        HURTR: { x: 1152, y: 0, w: 72, h: 96, frames: 1,  fps: 10 }         // animation - player hurt while running right
      },
      MONSTERS = [
        { name: "BLOCK", nx: -0.5, ny: -0.5, w: 1.5*METER, h: 1.5*METER, speed: 4*METER, dir: 'up',    vertical: true,  horizontal: false, animation: { up:   { x:   0, y:  0, w: 50, h: 50, frames: 2, fps: 5 }, down:  { x:   0, y:  0, w: 50, h: 50, frames: 2, fps: 5 } } },
        { name: "FLY",   nx: -0.5, ny: -0.5, w: 1.5*METER, h: 1.0*METER, speed: 8*METER, dir: 'left',  vertical: false, horizontal: true,  animation: { left: { x: 100, y:  7, w: 76, h: 36, frames: 2, fps: 5 }, right: { x: 252, y:  7, w: 76, h: 36, frames: 2, fps: 5 } } },
        { name: "SLIME", nx: -0.5, ny:  0.0, w: 1.5*METER, h: 1.0*METER, speed: 4*METER, dir: 'right', vertical: false, horizontal: true,  animation: { left: { x: 404, y: 11, w: 50, h: 28, frames: 2, fps: 5 }, right: { x: 504, y: 11, w: 50, h: 28, frames: 2, fps: 5 } } },
        { name: "SNAIL", nx: -0.5, ny:  0.0, w: 1.5*METER, h: 1.0*METER, speed: 2*METER, dir: 'left',  vertical: false, horizontal: true,  animation: { left: { x: 604, y:  9, w: 58, h: 32, frames: 2, fps: 5 }, right: { x: 720, y:  9, w: 58, h: 32, frames: 2, fps: 5 } } }
      ];

  //===========================================================================
  // VARIABLES
  //===========================================================================

  var tower,
      monsters,
      camera,
      player,
      renderer;

  //===========================================================================
  // UTILITY METHODS
  //===========================================================================

  function normalizex(x)              { return Game.Math.normalize(x,   0, tower.w);                       }  // wrap x-coord around to stay within tower boundary
  function normalizeColumn(col)       { return Game.Math.normalize(col, 0, tower.cols);                    }  // wrap column  around to stay within tower boundary
  function x2col(x)                   { return Math.floor(normalizex(x)/COL_WIDTH);                        }  // convert x-coord to tower column index
  function y2row(y)                   { return Math.floor(y/ROW_HEIGHT);                                   }  // convert y-coord to tower row    index
  function col2x(col)                 { return col * COL_WIDTH;                                            }  // convert tower column index to x-coord
  function row2y(row)                 { return row * ROW_HEIGHT;                                           }  // convert tower row    index to y-coord
  function x2a(x)                     { return 360 * (normalizex(x)/tower.w);                              }  // convert x-coord to an angle around the tower
  function tx(x, r)                   { return r * Math.sin((normalizex(x-camera.rx)/tower.w) *2*Math.PI); }  // transform x-coord for rendering
  function ty(y)                      { return HEIGHT - HORIZON - (y - camera.ry);                         }  // transform y-coord for rendering
  function nearColCenter(x,col,limit) { return limit > Math.abs(x - col2x(col + 0.5))/(COL_WIDTH/2);       }  // is x-coord "near" the center  of a tower column
  function nearRowSurface(y,row)      { return y > (row2y(row+1) - ROW_SURFACE);                           }  // is y-coord "near" the surface of a tower row

  //===========================================================================
  // GAME - SETUP/UPDATE/RENDER
  //===========================================================================

  function run() {
    Game.Load.images(IMAGES, function(images) {
      Game.Load.json("levels/demo", function(level) {
        setup(images, level);
        Game.run({
          fps:    FPS,
          update: update,
          render: render
        });
        Dom.on(document, 'keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
        Dom.on(document, 'keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);
      });
    });
  }

  function setup(images, level) {
    tower    = new Tower(level);
    monsters = new Monsters(level);
    player   = new Player();
    camera   = new Camera();
    renderer = new Renderer(images);
  }

  function update(dt) {
    player.update(dt);
    monsters.update(dt);
    camera.update(dt);
  }

  function render(dt) {
    renderer.render(dt);
  }

  function onkey(ev, key, pressed) {
    switch(key) {
      case KEY.LEFT:  player.input.left  = pressed; ev.preventDefault(); return false;
      case KEY.RIGHT: player.input.right = pressed; ev.preventDefault(); return false;
      case KEY.UP:    player.input.up    = pressed; ev.preventDefault(); return false;
      case KEY.DOWN:  player.input.down  = pressed; ev.preventDefault(); return false;

      case KEY.SPACE:
        player.input.jump          = pressed && player.input.jumpAvailable;
        player.input.jumpAvailable = !pressed;
        break;
    }
  }

  //===========================================================================
  // TOWER
  //===========================================================================

  var Tower = Class.create({

    //-------------------------------------------------------------------------

    initialize: function(level) {

      var row, col;

      level.map.reverse(); // make 0 index the ground, increasing towards the sky

      this.name     = level.name;
      this.color    = level.color;
      this.rows     = level.map.length;
      this.cols     = level.map[0].length;
      this.ir       = WIDTH/4;                 // inner radius (walls)
      this.or       = this.ir * 1.2;           // outer radius (walls plus platforms)
      this.w        = this.cols * COL_WIDTH;
      this.h        = this.rows * ROW_HEIGHT;
      this.map      = this.createMap(level.map);
      this.ground   = { platform: true  };
      this.air      = { platform: false };

    },

    //-------------------------------------------------------------------------

    getCell: function(row, col) {
      if (row < 0)
        return this.ground;
      else if (row >= this.rows)
        return this.air;
      else
        return this.map[row][normalizeColumn(col)];
    },

    //-------------------------------------------------------------------------

    createMap: function(source) {
      var row, col, cell, map = [];
      for(row = 0 ; row < this.rows ; row++) {
        map[row] = [];
        for(col = 0 ; col < this.cols ; col++) {
          cell = source[row][col];
          map[row][col] = {
            platform: (cell == 'X'),
            ladder:   (cell == 'H'),
            coin:     (cell == 'o')
          };
        }
      }
      return map;
    }

  });

  //===========================================================================
  // PLAYER
  //===========================================================================

  var Player = Class.create({

    initialize: function() {

      this.x         = col2x(0.5);
      this.y         = row2y(0);
      this.w         = PLAYER_WIDTH;
      this.h         = PLAYER_HEIGHT;
      this.dx        = 0;
      this.dy        = 0;
      this.gravity   = METER * GRAVITY;
      this.maxdx     = METER * MAXDX;
      this.maxdy     = METER * MAXDY;
      this.climbdy   = METER * CLIMBDY;
      this.impulse   = METER * IMPULSE;
      this.accel     = this.maxdx / ACCEL;
      this.friction  = this.maxdx / FRICTION;
      this.input     = { left: false, right: false, up: false, down: false, jump: false, jumpAvailable: true };
      this.collision = this.createCollisionPoints();
      this.animation = PLAYER.STAND;
      this.score     = 0;

    },

    createCollisionPoints: function() {
      return {
        topLeft:     { x: -this.w/4, y: this.h-2 },
        topRight:    { x:  this.w/4, y: this.h-2 },
        middleLeft:  { x: -this.w/2, y: this.h/2 },
        middleRight: { x:  this.w/2, y: this.h/2 },
        bottomLeft:  { x: -this.w/4, y:  0       },
        bottomRight: { x:  this.w/4, y:  0       },
        underLeft:   { x: -this.w/4, y: -1       },
        underRight:  { x:  this.w/4, y: -1       },
        ladderUp:    { x:         0, y: this.h/2 },
        ladderDown:  { x:         0, y: -1       }
      }
    },

    update: function(dt) {

      this.animate();

      var wasleft  = this.dx  < 0,
          wasright = this.dx  > 0,
          falling  = this.falling,
          friction = this.friction * (this.falling                  ? 0.5 : 1),
          accel    = this.accel    * (this.falling || this.climbing ? 0.5 : 1);

      if (this.stepping)
        return this.stepUp();
      else if (this.hurting)
        return this.hurt(dt);

      this.ddx = 0;
      this.ddy = falling ? -this.gravity : 0;
    
      if (this.climbing) {
        this.ddy = 0;
        if (this.input.up)
          this.dy =  this.climbdy;
        else if (this.input.down)
          this.dy = -this.climbdy;
        else
          this.dy = 0;
      }

      if (this.input.left)
        this.ddx = this.ddx - accel;
      else if (wasleft)
        this.ddx = this.ddx + friction;

      if (this.input.right)
        this.ddx = this.ddx + accel;
      else if (wasright)
        this.ddx = this.ddx - friction;
    
      if (this.input.jump && (!falling || this.fallingJump))
        this.performJump();

      this.updatePosition(dt);
    
      while (this.checkCollision()) {
        // iterate until no more collisions
      }

      // clamp dx at zero to prevent friction from making us jiggle side to side
      if ((wasleft  && (this.dx > 0)) ||
          (wasright && (this.dx < 0))) {
        this.dx = 0;
      }

      // if falling, track short period of time during which we're falling but can still jump
      if (this.falling && (this.fallingJump > 0))
        this.fallingJump = this.fallingJump - 1;

      // debug information
      this.debug = Math.floor(this.x) + ", " + Math.floor(this.y) + ", " + Math.floor(this.dx) + ", " + Math.floor(this.dy) + (this.falling ? " FALLING " : "");

    },

    updatePosition: function(dt) {
      this.x  = normalizex(this.x  + (dt * this.dx));
      this.y  =            this.y  + (dt * this.dy);
      this.dx = Game.Math.bound(this.dx + (dt * this.ddx), -this.maxdx, this.maxdx);
      this.dy = Game.Math.bound(this.dy + (dt * this.ddy), -this.maxdy, this.maxdy);
    },

    hurt: function(dt) {
      if (this.hurting === true) {
        this.dx  = -this.dx/2;
        this.ddx = 0;
        this.ddy = this.impulse/2;
        this.hurting = FPS;
        this.hurtLeft = this.input.left;
      }
      else {
        this.ddy = -this.gravity;
        this.hurting = this.hurting - 1;
      }
      this.updatePosition(dt);
      if (this.y <= 0) {
        this.hurting = false;
        this.falling = false;
        this.y  = 0;
        this.dy = 0;
      }
    },

    animate: function() {
      if (this.hurting)
        Game.animate(FPS, this, this.hurtLeft ? PLAYER.HURTL : PLAYER.HURTR);
      else if (this.climbing && (this.input.up || this.input.down || this.input.left || this.input.right))
        Game.animate(FPS, this, PLAYER.CLIMB);
      else if (this.climbing)
        Game.animate(FPS, this, PLAYER.BACK);
      else if (this.input.left  || (this.stepping == DIR.LEFT))
        Game.animate(FPS, this, PLAYER.LEFT);
      else if (this.input.right || (this.stepping == DIR.RIGHT))
        Game.animate(FPS, this, PLAYER.RIGHT);
      else
        Game.animate(FPS, this, PLAYER.STAND);
    },

    checkCollision: function() {

      var falling      = this.falling,
          fallingUp    = this.falling && (this.dy >  0),
          fallingDown  = this.falling && (this.dy <= 0),
          climbing     = this.climbing,
          climbingUp   = this.climbing && this.input.up,
          climbingDown = this.climbing && this.input.down,
          runningLeft  = this.dx < 0,
          runningRight = this.dx > 0,
          tl           = this.collision.topLeft,
          tr           = this.collision.topRight,
          ml           = this.collision.middleLeft,
          mr           = this.collision.middleRight,
          bl           = this.collision.bottomLeft,
          br           = this.collision.bottomRight,
          ul           = this.collision.underLeft,
          ur           = this.collision.underRight,
          ld           = this.collision.ladderDown,
          lu           = this.collision.ladderUp;
      
      this.updateCollisionPoint(tl);
      this.updateCollisionPoint(tr);
      this.updateCollisionPoint(ml);
      this.updateCollisionPoint(mr);
      this.updateCollisionPoint(bl);
      this.updateCollisionPoint(br);
      this.updateCollisionPoint(ul);
      this.updateCollisionPoint(ur);
      this.updateCollisionPoint(ld);
      this.updateCollisionPoint(lu);

      if      (tl.coin) return this.collectCoin(tl);
      else if (tr.coin) return this.collectCoin(tr);
      else if (ml.coin) return this.collectCoin(ml);
      else if (mr.coin) return this.collectCoin(mr);
      else if (bl.coin) return this.collectCoin(bl);
      else if (br.coin) return this.collectCoin(br);

      if (fallingDown && bl.blocked && !ml.blocked && !tl.blocked && nearRowSurface(this.y + bl.y, bl.row))
        return this.collideDown(bl);

      if (fallingDown && br.blocked && !mr.blocked && !tr.blocked && nearRowSurface(this.y + br.y, br.row))
        return this.collideDown(br);

      if (fallingDown && ld.ladder && !lu.ladder)
        return this.collideDown(ld);

      if (fallingUp && tl.blocked && !ml.blocked && !bl.blocked)
        return this.collideUp(tl);

      if (fallingUp && tr.blocked && !mr.blocked && !br.blocked)
        return this.collideUp(tr);

      if (climbingDown && ld.blocked)
        return this.stopClimbing(ld);

      if (runningRight && tr.blocked && !tl.blocked)
        return this.collide(tr);

      if (runningRight && mr.blocked && !ml.blocked)
        return this.collide(mr);

      if (runningRight && br.blocked && !bl.blocked) {
        if (falling)
          return this.collide(br);
        else
          return this.startSteppingUp(DIR.RIGHT);
      }

      if (runningLeft && tl.blocked && !tr.blocked)
        return this.collide(tl, true);

      if (runningLeft && ml.blocked && !mr.blocked)
        return this.collide(ml, true);

      if (runningLeft && bl.blocked && !br.blocked) {
        if (falling)
          return this.collide(bl, true);
        else
          return this.startSteppingUp(DIR.LEFT);
      }

      var onLadder = (lu.ladder || ld.ladder) && nearColCenter(this.x, lu.col, LADDER_EDGE);

      // check to see if we are now falling or climbing
      if (!climbing && onLadder && ((lu.ladder && this.input.up) || (ld.ladder && this.input.down)))
        return this.startClimbing();
      else if (!climbing && !falling && !ul.blocked && !ur.blocked && !onLadder)
        return this.startFalling(true);

      // check to see if we have fallen off a ladder
      if (climbing && !onLadder)
        return this.stopClimbing();

      if (!this.hurting && (tl.monster || tr.monster || ml.monster || mr.monster || bl.monster || br.monster || lu.monster || ld.monster))
        return this.hitMonster();

      return false; // done, we didn't collide with anything

    },

    updateCollisionPoint: function(point) {
      point.row  = y2row(this.y + point.y);
      point.col  = x2col(this.x + point.x);
      point.cell = tower.getCell(point.row, point.col);
      point.blocked  = point.cell.platform;
      point.platform = point.cell.platform;
      point.ladder   = point.cell.ladder;
      point.monster  = false;
      point.coin     = false;
      if (point.cell.monster) {
        var monster = point.cell.monster;
        if (Game.Math.between(this.x + point.x, monster.x + monster.nx, monster.x + monster.nx + monster.w) &&
            Game.Math.between(this.y + point.y, monster.y + monster.ny, monster.y + monster.ny + monster.h)) {
          point.monster  = point.cell.monster;
        }
      }
      if (point.cell.coin) {
        if (Game.Math.between(this.x + point.x, col2x(point.col+0.5) - COIN.W/2, col2x(point.col+0.5) + COIN.W/2) &&  // center point of column +/- COIN.W/2
            Game.Math.between(this.y + point.y, row2y(point.row), row2y(point.row+1))) {
          point.coin = true;
        }
      }
    },

    collectCoin: function(point) {
      point.cell.coin = false;
      this.score = this.score + 50;
    },

    startFalling: function(allowFallingJump) {
      this.falling     = true;
      this.fallingJump = allowFallingJump ? FALLING_JUMP : 0;
    },

    collide: function(point, left) {
      this.x  = normalizex(col2x(point.col + (left ? 1 : 0)) - point.x);
      this.dx = 0;
      return true;
    },

    collideUp: function(point) {
      this.y  = row2y(point.row) - point.y;
      this.dy = 0;
      return true;
    },

    collideDown: function(point) {
      this.y       = row2y(point.row + 1);
      this.dy      = 0;
      this.falling = false;
      return true;
    },

    performJump: function() {
      if (this.climbing)
        this.stopClimbing();
      this.dy  = 0;
      this.ddy = this.impulse; // an instant big force impulse
      this.startFalling(false);
      this.input.jump = false;
    },

    startSteppingUp: function(dir) {
      this.stepping  = dir;
      this.stepCount = STEP.FRAMES;
      return false; // NOT considered a collision
    },

    stepUp: function() {

      var left = (this.stepping == DIR.LEFT),
          dx   = STEP.W / STEP.FRAMES,
          dy   = STEP.H / STEP.FRAMES;

      this.dx  = 0;
      this.dy  = 0;
      this.x   = normalizex(this.x + (left ? -dx : dx));
      this.y   =            this.y +               dy;

      if (--(this.stepCount) == 0)
        this.stepping = DIR.NONE;
    },

    startClimbing: function() {
      this.climbing = true;
      this.dx = 0;
    },

    stopClimbing: function(point) {
      this.climbing = false;
      this.dy = 0;
      this.y  = point ? row2y(point.row + 1) : this.y;
      return true;
    },

    hitMonster: function() {
      this.hurting = true;
      return true;
    }

  });

  //===========================================================================
  // MONSTERS
  //===========================================================================

  var Monsters = Class.create({

    initialize: function(level) {
      this.all = this.createMonsters(level.map);
    },

    //-------------------------------------------------------------------------

    update: function(dt) {
      var n, max, all = this.all;
      for(n = 0, max = all.length ; n < max ; n++)
        all[n].update(dt);
    },

    //-------------------------------------------------------------------------

    createMonsters: function(source) {
      var row, col, type, monster, all = [];
      for(row = 0 ; row < tower.rows ; row++) {
        for(col = 0 ; col < tower.cols ; col++) {
          type = parseInt(source[row][col], 10);
          if (!isNaN(type)) {
            monster = new Monster(row, col, MONSTERS[type]);
            all.push(monster);
            tower.map[row][col].monster = monster;
          }
        }
      }
      return all;
    }

  });

  //===========================================================================
  // MONSTER
  //===========================================================================

  var Monster = Class.create({

    initialize: function(row, col, type) {

      this.row  = row;
      this.col  = col;
      this.x    = col2x(col+0.5);
      this.y    = row2y(row)
      this.dx   = 0;
      this.dy   = 0;
      this.w    = type.w;
      this.h    = type.h;
      this.nx   = type.nx * type.w;
      this.ny   = type.ny * type.h;
      this.type = type;
      this[type.dir] = true;
      this.animation = type.animation[type.dir];

      if (type.vertical) {
        this.minrow = row;
        this.maxrow = row;
        while ((this.minrow > 0) && !tower.map[this.minrow-1][col].platform && !tower.map[this.minrow-1][col].ladder)
          this.minrow--;
        while ((this.maxrow < tower.rows-1) && !tower.map[this.maxrow+1][col].platform && !tower.map[this.maxrow+1][col].ladder)
          this.maxrow++;
        this.miny = row2y(this.minrow)     + this.ny;
        this.maxy = row2y(this.maxrow + 1) + this.ny - this.h;
      }

      if (type.horizontal) {
        this.mincol = col;
        this.maxcol = col;
        while ((this.mincol != normalizeColumn(col+1)) && !tower.getCell(row, this.mincol-1).platform && !tower.getCell(row, this.mincol-1).ladder && tower.getCell(row-1, this.mincol-1).platform)
          this.mincol = normalizeColumn(this.mincol - 1);
        while ((this.maxcol != normalizeColumn(col-1)) && !tower.getCell(row, this.maxcol+1).platform && !tower.getCell(row, this.maxcol+1).ladder && tower.getCell(row-1, this.maxcol+1).platform)
          this.maxcol = normalizeColumn(this.maxcol + 1);
        this.minx  = col2x(this.mincol)     - this.nx;
        this.maxx  = col2x(this.maxcol + 1) - this.nx - this.w;
        this.wrapx = this.minx > this.maxx;
      }

    },

    //-------------------------------------------------------------------------

    update: function(dt) {

      if (this.left)
        this.dx = -this.type.speed;
      else if (this.right)
        this.dx =  this.type.speed;
      else
        this.dx = 0;

      if (this.up)
        this.dy = this.type.speed;
      else if (this.down)
        this.dy = -this.type.speed;
      else
        this.dy = 0;

      this.x  = normalizex(this.x  + (dt * this.dx));
      this.y  =            this.y  + (dt * this.dy);

      if (this.up && (this.y > this.maxy)) {
        this.y    = this.maxy;
        this.up   = false;
        this.down = true;
        this.animation = this.type.animation.down;
      }
      else if (this.down && (this.y < this.miny)) {
        this.y    = this.miny;
        this.down = false;
        this.up   = true;
        this.animation = this.type.animation.up;
      }

      if (this.left && (this.x < this.minx) && (!this.wrapx || this.x > this.maxx)) {
        this.x = this.minx;
        this.left = false;
        this.right = true;
        this.animation = this.type.animation.right;
      }
      else if (this.right && (this.x > this.maxx) && (!this.wrapx || this.x < this.minx)) {
        this.x = this.maxx;
        this.right = false;
        this.left = true;
        this.animation = this.type.animation.left;
      }

      var row = y2row(this.y - this.ny),
          col = x2col(this.x - this.nx);

      if ((row != this.row) || (col != this.col)) {
        tower.map[this.row][this.col].monster = null;
        tower.map[row][col].monster = this;
        this.row = row;
        this.col = col;
      }

      Game.animate(FPS, this);
    }

  });

  //===========================================================================
  // CAMERA
  //===========================================================================

  var Camera = Class.create({

    initialize: function() {
      this.x    = player.x;
      this.y    = player.y;
      this.dx   = 0;
      this.dy   = 0;
      this.miny = 0;
      this.maxy = tower.h;
    },

    update: function(dt) {
      this.x  = player.x;
      this.y  = player.y;
      this.dx = player.dx;
      this.dy = player.dy;
    }

  });

  //===========================================================================
  // RENDERER
  //===========================================================================

  var Renderer = Class.create({

    initialize: function(images) {
      this.images        = images;
      this.canvas        = Game.Canvas.init(Dom.get('canvas'), WIDTH, HEIGHT);
      this.ctx           = this.canvas.getContext('2d');
      this.stars         = this.createStars();
      this.gradient      = this.createGradient();
      this.ground        = this.createGround();
      this.debug         = Dom.get('debug');
      this.score         = Dom.get('score');
      this.vscore        = 0;
      this.platformWidth = 2 * tower.or * Math.tan((360/tower.cols) * Math.PI / 360);
    },

    //-------------------------------------------------------------------------

    render: function(dt) {

      player.rx = normalizex(Game.Math.lerp(player.x, player.dx, dt));
      player.ry =            Game.Math.lerp(player.y, player.dy, dt);
      camera.rx = normalizex(Game.Math.lerp(camera.x, camera.dx, dt));
      camera.ry =            Game.Math.lerp(camera.y, camera.dy, dt);

      player.ry = Math.max(0, player.ry); // dont let sub-frame interpolation take the player below the horizon
      camera.ry = Math.max(0, camera.ry); // dont let sub-frame interpolation take the camera below the horizon

      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.renderStars(this.ctx);
      this.ctx.save();
      this.ctx.translate(WIDTH/2, 0);
      this.renderBack(this.ctx);
      this.renderTower(this.ctx);
      this.renderFront(this.ctx);
      this.renderGround(this.ctx);
      this.renderPlayer(this.ctx);
      this.renderScore(this.ctx);
      this.ctx.restore();

      // Dom.set(debug, player.debug);

    },

    //-------------------------------------------------------------------------

    renderStars: function(ctx) {

      var x  = Game.Math.normalize(WIDTH  * camera.x/tower.w, 0, WIDTH),
          y  = Game.Math.normalize(HEIGHT * camera.y/tower.h, 0, HEIGHT),
          nx = WIDTH  - x,
          ny = HEIGHT - y;

        ctx.drawImage(this.stars, 0,   0,  nx, ny,   x, y, nx, ny);
      if (x > 0)
        ctx.drawImage(this.stars, nx,  0,   x, ny,   0, y,  x, ny);
      if (y > 0)
        ctx.drawImage(this.stars, 0,  ny,  nx,  y,   x, 0, nx,  y);
      if ((x > 0) && (y > 0))
        ctx.drawImage(this.stars, nx, ny,   x,  y,   0, 0,  x,  y);

    },

    //-------------------------------------------------------------------------

    renderGround: function(ctx) {
      var ground = this.ground,
          x      = ground.w * (camera.rx/tower.w),
          y      = ty(0),
          w      = Math.min(WIDTH, ground.w-x),
          w2     = WIDTH - w;
      ctx.drawImage(ground.image, x, 0, w, ground.h, -WIDTH/2, y, w, ground.h);
      if (w2 > 0)
        ctx.drawImage(ground.image, 0, 0, w2, ground.h, -WIDTH/2 + w, y, w2, ground.h);
    },

    //-------------------------------------------------------------------------

    renderTower: function(ctx) {

      var offsets = [0, 0.5],
          top     = Math.max(ty(tower.h), 0),
          bottom  = Math.min(ty(0),       HEIGHT);

      ctx.fillStyle = this.gradient;
      ctx.fillRect(-tower.ir, top, tower.ir * 2, bottom - top);
      ctx.strokeStyle = tower.color.stroke;
      ctx.lineWidth=1;

      ctx.beginPath();
      var n, y, offset = 0;
      for(n = 0 ; n < tower.rows ; n++) {
        y = ty(n*ROW_HEIGHT);
        if (Game.Math.between(y, -ROW_HEIGHT, HEIGHT + ROW_HEIGHT)) {
          ctx.moveTo(-tower.ir, y);
          ctx.lineTo( tower.ir, y);
          this.renderBricks(ctx, y, offsets[offset]);
        } 
        offset = (offset < offsets.length-1 ? offset + 1 : 0);
      }

      ctx.moveTo(-tower.ir, top);
      ctx.lineTo( tower.ir, top);
      ctx.moveTo(-tower.ir, top);
      ctx.lineTo(-tower.ir, bottom);
      ctx.moveTo( tower.ir, top);
      ctx.lineTo( tower.ir, bottom);

      ctx.stroke();
    },

    //-------------------------------------------------------------------------

    renderBricks: function(ctx, y, offset) {
      var n, x, a;
      for(n = 0 ; n < tower.cols ; n++) {
        x = (n+offset) * COL_WIDTH;
        a = Game.Math.normalizeAngle180(x2a(x) - x2a(camera.rx));
        if (Game.Math.between(a, -90, 90)) {
          x = tx(x, tower.ir);
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - ROW_HEIGHT);
        }
      }
    },

    //-------------------------------------------------------------------------

    renderBack: function(ctx) {

      ctx.strokeStyle = tower.color.stroke;
      ctx.lineWidth   = 2;

      var left  = x2col(camera.rx - tower.w/4),
          right = x2col(camera.rx + tower.w/4);

      this.renderQuadrant(ctx, normalizeColumn(left  - 3), left,  +1);
      this.renderQuadrant(ctx, normalizeColumn(right + 3), right, -1);

    },

    //-------------------------------------------------------------------------

    renderFront: function(ctx) {

      ctx.strokeStyle = tower.color.stroke;
      ctx.lineWidth   = 2;

      var left   = x2col(camera.rx - tower.w/4),
          center = x2col(camera.rx),
          right  = x2col(camera.rx + tower.w/4);

      this.renderQuadrant(ctx, left,  normalizeColumn(center + 0), +1);
      this.renderQuadrant(ctx, right, normalizeColumn(center - 1), -1);

    },

    //-------------------------------------------------------------------------

    renderQuadrant: function(ctx, min, max, dir) {
      var r, y, cell,
          rmin = Math.max(0,              y2row(camera.ry - HORIZON) - 1),
          rmax = Math.min(tower.rows - 1, rmin + (HEIGHT / ROW_HEIGHT + 1)),
          c    = min;
      while (c != max) {
        for(r = rmin ; r <= rmax ; r++) {
          y = ty(r * ROW_HEIGHT);
          cell = tower.getCell(r, c);
          if (cell.platform)
            this.renderPlatform(ctx, c, y);
          else if (cell.ladder)
            this.renderLadder(ctx, c, y);
          else if (cell.coin)
            this.renderCoin(ctx, c, y);
          if (cell.monster)
            this.renderMonster(ctx, c, y, cell.monster);
        }
        c = normalizeColumn(c + dir);
      }
    },

    //-------------------------------------------------------------------------

    renderPlatform: function(ctx, col, y) {

      var x = col2x(col+0.5),
          a = Game.Math.normalizeAngle180(x2a(x) - x2a(camera.rx)),
          x0 = tx(x, tower.or),
          x1 = x0 - this.platformWidth/2,
          x2 = x0 + this.platformWidth/2;

      ctx.fillStyle = Game.Math.darken(tower.color.platform, 60 * Math.min(1, Math.abs(a/90)));
      ctx.fillRect(  x1, y - ROW_HEIGHT, x2 - x1, ROW_HEIGHT);
      ctx.strokeRect(x1, y - ROW_HEIGHT, x2 - x1, ROW_HEIGHT);
   
    },

    //-------------------------------------------------------------------------

    renderLadder: function(ctx, col, y) {

      var ladder = this.images.ladder,
          x      = col2x(col+0.5),
          a      = Game.Math.normalizeAngle180(x2a(x) - x2a(camera.rx)),
          d      = Math.floor(12 * Math.min(1, Math.abs(a/90))),
          x0     = tx(x, tower.or),
          x1     = x0 - ladder.width/2 + 10,
          x2     = x0 + ladder.width/2 - 10,
          w      = x2 - x1,
          ny     = 4, // overdraw the ladders
          h      = ROW_HEIGHT + ny;

      ctx.drawImage(ladder, 0, d*30, ladder.width, 30, x1, y-h, w, h);

    },

    //-------------------------------------------------------------------------

    renderCoin: function(ctx, col, y) {

      var coins = this.images.coins,
          x     = col2x(col+0.5),
          a     = Game.Math.normalizeAngle180(x2a(x) - x2a(camera.rx)),
          d     = Math.floor(12 * Math.min(1, Math.abs(a/90))),
          w     = COIN.W,
          h     = COIN.H,
          x0    = tx(x, tower.or),
          x1    = x0 - w/2,
          x2    = x0 + w/2;

      ctx.drawImage(coins, 0, d*36, coins.width, 36, x1, y-h, w, h);

    },

    //-------------------------------------------------------------------------

    renderMonster: function(ctx, col, y, monster) {

      var a = monster.animation,
          x = tx(monster.x, tower.or) + monster.nx,
          y = ty(monster.y)           + monster.ny,
          w = monster.w,
          h = monster.h;

      ctx.drawImage(this.images.monster, a.x + (monster.animationFrame*a.w), a.y, a.w, a.h, x, y - h - 1, w, h);

    },

    //-------------------------------------------------------------------------

    renderPlayer: function(ctx) {
      ctx.drawImage(this.images.player, player.animation.x + (player.animationFrame * player.animation.w), player.animation.y, player.animation.w, player.animation.h, tx(player.rx, tower.ir) - player.w/2, ty(player.ry) - player.h, player.w, player.h);
      if (PLAYER.DEBUG) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth   = 1;
        ctx.strokeRect(tx(player.rx, tower.ir) - player.w/2, ty(player.ry + player.h), player.w, player.h);
        ctx.fillStyle = "#800000";
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.topLeft.x,          ty(player.ry + player.collision.topLeft.y),      5,  5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.topRight.x,         ty(player.ry + player.collision.topRight.y),    -5,  5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.middleLeft.x,       ty(player.ry + player.collision.middleLeft.y),   5,  5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.middleRight.x,      ty(player.ry + player.collision.middleRight.y), -5,  5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.bottomLeft.x,       ty(player.ry + player.collision.bottomLeft.y),   5, -5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.bottomRight.x,      ty(player.ry + player.collision.bottomRight.y), -5, -5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.ladderUp.x - 2.5,   ty(player.ry + player.collision.ladderUp.y),     5,  5);
        ctx.fillRect(tx(player.rx, tower.ir) + player.collision.ladderDown.x - 2.5, ty(player.ry + player.collision.ladderDown.y),   5, -5);
      }
    },

    //-------------------------------------------------------------------------

    renderScore: function(ctx) {
      if (player.score > this.vscore) {
        this.vscore = this.vscore + 2;
        Dom.set(score, this.vscore);
      }
    },

    //-------------------------------------------------------------------------

    createStars: function() {
      return Game.Canvas.render(WIDTH, HEIGHT, function(ctx) {
        var n, x, y, r, max = 500,
          colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#800000", "#808000"],
          sizes  = [0.25, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2];
        for(n = 0 ; n < max ; n++) {
          ctx.fillStyle = Game.Math.darken(Game.Math.randomChoice(colors), Game.Math.random(1,100));
          x = Game.Math.randomInt(2, WIDTH-4);
          y = Game.Math.randomInt(2, HEIGHT-4);
          r = Game.Math.randomChoice(sizes);
          ctx.fillRect(x,y,r,r);
        } 
      });
    },

    //-------------------------------------------------------------------------

    createGradient: function() {

      var radius   = tower.ir,
          color    = tower.color.wall,
          gradient = this.ctx.createLinearGradient(-radius, 0, radius, 0);

      gradient.addColorStop(0,   Game.Math.darken(color, 20));
      gradient.addColorStop(0.3, Game.Math.brighten(color, 10));
      gradient.addColorStop(0.5, Game.Math.brighten(color, 15));
      gradient.addColorStop(0.7, Game.Math.brighten(color, 10));
      gradient.addColorStop(1,   Game.Math.darken(color, 20));

      return gradient;

    },

    //-------------------------------------------------------------------------

    createGround: function() {
      var w     = WIDTH*GROUND_SPEED,
          h     = HORIZON,
          tile  = this.images.ground,
          tw    = tile.width,
          th    = tile.height,
          max   = Math.floor(w/tile.width),
          dw    = w/max,
          image = Game.Canvas.render(w, h, function(ctx) {
            var n;
            for(n = 0 ; n < max ; n++)
              ctx.drawImage(tile, 0, 0, tw, th, n * dw, 0, dw, h);
          });
      return { w: w, h: h, image: image };
    }

  });

  //===========================================================================
  // LETS PLAY!
  //===========================================================================

  run();

  //---------------------------------------------------------------------------

})();
