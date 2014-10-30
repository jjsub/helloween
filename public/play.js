var cursors;
var cthulu;
var mummy;
var platforms;
var layer;
var map;
var map2;
var key;
var door;

var playState = {
  //no preload needed
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //use the tilemap
    map = game.add.tilemap('lv1');
    map.addTilesetImage('Cyber', 'level1');

    //draw level 1
    layer = map.createLayer('Level 1');

    //set collision for blocks
    //map.setCollisionByExclusion([7, 32, 35, 36, 47]);, 
    map.setCollisionBetween(8, 10);
    map.setCollisionBetween(10, 13);
    map.setCollisionBetween(16, 31);
    map.setCollisionBetween(36, 43);
    map.setCollision(5);
    map.setCollision(46);
    map.setCollisionBetween(60, 62);
    map.setCollision(54);
    map.setCollision(49);
    map.setCollision(54);
    map.setCollision(60);
    map.setCollision(52);
    map.setCollision(47);
    map.setCollisionBetween(74, 76);
    //map.setCollisionB, 8etween(32, 47);


    layer.resizeWorld();

    //background image
    //game.add.sprite(0, 0, 'sky');


    //draw player
    player = game.add.sprite(32, 0, 'jack');
    player.width = 60;
    player.height = 73;

    //enable physics on player
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.8);
    player.body.width = 25;
    player.body.height = 50;

    //player.body.tilePadding.set(32, 32);
    

    //follow the player via camera
    game.camera.follow(player);


    //player physics
    player.body.bounce.y = 0.1;

    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //player walking left and right animations
    player.animations.add('left', [5, 6, 7], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);

    //enemy groups
    cthulus = game.add.group();
    cthulus.enableBody = true;

    mummies = game.add.group();
    mummies.enableBody = true;

    map.createFromObjects('Enemies', 106, 'cthulu', 0, true, false, cthulus);
    map.createFromObjects('Enemies', 107, 'mummy', 0, true, false, mummies);

    keys = game.add.group();
    keys.enableBody = true;

    doors = game.add.group();
    doors.enableBody = true;

    map.createFromObjects('Key', 67, 'key', 0, true, false, keys);

    //monster movement time
    this.moveTimer = game.time.events.loop(1500, this.moveItems, this);

    //game music
    this.gameSound = game.add.audio('game');
    this.gameSound.play();

  },

  moveItems: function(){
    cthulus.forEach(function(cthulu){
      var direction = Math.floor(Math.random() + .5);
      cthulu.animations.add('left', [4, 5, 6, 7], 10, true);
      cthulu.animations.add('right', [8, 9, 10, 11], 10, true);
      cthulu.body.gravity.y = 60;
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        cthulu.body.velocity.x += 100;
        cthulu.animations.play('right');
      }else if(direction === 0){
        cthulu.body.velocity.x -= 100;
        cthulu.animations.play('left');
      };
    }, this)

    mummies.forEach(function(mummy){
      var direction = Math.floor(Math.random() + .5);

      mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        mummy.body.velocity.x += 100;
        mummy.body.velocity.y += 20;
      }else if(direction === 0){
        mummy.body.velocity.x -= 100;
        mummy.body.velocity.y -= 20;
      };
    }, this)
  },

  collectCthulu: function(player, cthulu){
    cthulu.kill();
  },

  collectMummy: function(player, mummy){
    mummy.kill();
  },

  //show door when player has key
  openDoor: function(player, key){
    key.destroy();
    map.createFromObjects('Door', 36, 'door', 0, true, false, doors);

  },

  //go to next level when player goes through door
  nextLevel: function(player, door){
    this.game.state.start('level2');

  },


  render: function(){
    //game.debug.body(player);
    //layer.debug = true;
  },

  update: function(){
    game.physics.arcade.collide(cthulus, layer);
    game.physics.arcade.collide(mummies, layer);

    game.physics.arcade.overlap(player, cthulus, this.collectCthulu, null, this);
    game.physics.arcade.overlap(player, mummies, this.collectMummy, null, this);
    game.physics.arcade.overlap(player, keys, this.openDoor, null, this);
    game.physics.arcade.overlap(player, doors, this.nextLevel, null, this);

    //player collision w/ platform
    game.physics.arcade.collide(player, layer);
    cursors = game.input.keyboard.createCursorKeys();

    //animate player
    this.playerMovement();
  },

  playerMovement: function(){
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity.x = 150;
      player.animations.play('right');
    }
    else
    {
      //  Stand still
      player.animations.stop();
      player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if(cursors.up.isDown && player.body.onFloor())
    {
      player.body.velocity.y = -200;
      //Add Game Sound
      this.jumpSound = game.add.audio('jump');
      this.jumpSound.play();
    }
  },
};
