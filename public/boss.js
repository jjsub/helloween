var cursors;
var platforms;
var layer;
var shotTimer = 0;
var style = {fontSize: '32px', fill: '#fff'};
var boss;
var finalBoss = {
  //no preload needed
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //use the tilemap
    map = game.add.tilemap('boss');
    map.addTilesetImage('Cyber', 'level1');

    //draw level 1
    layer = map.createLayer('Boss Layer');

    //set collision for blocks
    map.setCollisionByExclusion([7, 8, 32, 35, 36, 47]);

    layer.resizeWorld();


    //draw player
    player = game.add.sprite(793, 350, 'jack');
    player.width = 40;
    player.height = 53;

    //enable physics on player
    game.physics.arcade.enable(player);
    player.body.width = 30;
    player.body.height = 53;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //player walking left and right animations
    player.animations.add('left', [5, 6, 7], 16, true);
    player.animations.add('right', [9, 10, 11], 16, true);


    //follow the player via camera
    game.camera.follow(player);

    //oogie the boss
    boss = game.add.sprite(1200, 300, 'oogie');
    game.physics.arcade.enable(boss);
    boss.body.gravity = 500;
    boss.body.collideWorldBounds = true;
    boss.body.velocity.x = -200;
    console.log(boss.body.velocity);

    boss.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
    boss.animations.add('right', [8, 9, 10, 11, 12, 13, 14], 12, true);
  
    //boss timer
    this.moveTimer = game.time.events.loop(1000, this.bossActions, this);

    //game music
    this.gameSound = game.add.audio('ls1');
    this.gameSound.play();

    this.bullets = game.add.group();
    this.bullets.enableBody = true;

    // Call the 'shoot' function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.shoot, this);

  },


  update: function(){
    //game.physics.arcade.overlap(this.bullets, cthulus, this.killCthulu, null, this);
    game.physics.arcade.collide(player, layer);
    //game.physics.arcade.collide(boss, layer);
    cursors = game.input.keyboard.createCursorKeys();

    //animate player
    this.playerMovement();
  },

  bossActions: function(){
    var direction = Math.floor(Math.random() + .5);
    if(direction === 1){
      boss.body.velocity.x += 200;
      boss.animations.play('right');
    }else if(direction === 0){
      boss.body.velocity.x -= 200;
      boss.animations.play('left');
    }
  },

  killBullet: function(bullet){
    bullet.kill();
  },
  //go to next level when player goes through door
  nextLevel: function(player, door){
    this.game.state.start('level2');
    this.gameSound.stop();
  },

  render: function(){
    //game.debug.body(boss);
    //game.debug.body(layer);
  },

  playerMovement: function(){
    player.body.velocity.x = 0;
    if(cursors.left.isDown)
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
      player.frame = 8;
    }
    //  Allow the player to jump if they are touching the ground.
    if(cursors.up.isDown && player.body.onFloor())
    {
      player.body.velocity.y = -650;
      //Add Jump Sound
      this.jumpSound = game.add.audio('jump');
      this.jumpSound.play();
    }
  },
  //player movement variables there is velocity and animation. make a global variable called "lastDirection." If you let go of that key it will still have left in it
  //It won't change until you hit right. Whatever direction you end in is what direction it will shoot.
  shoot: function(){
    if(shotTimer < game.time.now){
      shotTimer = game.time.now + 275;
      var bullet = this.bullets.create(player.body.x + player.body.width / 2 + 20, player.body.y + player.body.height / 2 - 4, 'bullet');
      game.physics.enable(bullet, Phaser.Physics.ARCADE)
      bullet.outOfBoundsKill = true;
      bullet.anchor.setTo(0.5, 0.5);
      if(cursors.left.isDown)
      {
        bullet.body.velocity.y = 0;
        bullet.body.velocity.x = -600;
      }else
      {
        bullet.body.velocity.y = 0;
        bullet.body.velocity.x = 600;
      }
    }
    this.shootSound = game.add.audio('shoot');
    this.shootSound.play();
  }
};
