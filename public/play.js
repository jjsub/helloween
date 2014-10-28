var cursors;
var cthulu;
var mummy;
var platforms;

var playState = {
  //no preload needed
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //background image
    game.add.sprite(0, 0, 'sky');

    //platforms group
    platforms = game.add.group();
    platforms.enableBody = true;


    //ground sprite
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //draw player
    player = game.add.sprite(32, game.world.height - 250, 'jack');

    game.physics.arcade.enable(player);

    //player physics
    player.body.bounce.y = 0.2;
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

    for(var i = 0; i < 10; i++){
      //cthulu drawing
      cthulu = cthulus.create(i * 70, 0, 'cthulu');
      cthulu.animations.add('left', [4, 5, 6, 7], 10, true);
      cthulu.animations.add('right', [8, 9, 10, 11], 10, true);
      cthulu.body.gravity.y = 60;
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      cthulu.body.collideWorldBounds = true;

      //mummy drawing
      mummy = mummies.create(game.world.randomX, 0, 'mummy');
      mummy.body.gravity.y = 60;
      mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      mummy.body.collideWorldBounds = true;
    };

    //monster movement time
    this.moveTimer = game.time.events.loop(1500, this.moveItems, this);

    //game music
    this.gameSound = game.add.audio('game');
    this.gameSound.play();

  },

  moveItems: function(){
    cthulus.forEach(function(cthulu){
      var direction = Math.floor(Math.random() + .5);

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

      if(direction === 1){
        mummy.body.velocity.x += 100;
        mummy.body.velocity.y += 100;
      }else if(direction === 0){
        mummy.body.velocity.x -= 100;
        mummy.body.velocity.y -= 100;
      };
    }, this)
  },

  collectCthulu: function(player, cthulu){
    cthulu.kill();
  },

  collectMummy: function(player, mummy){
    mummy.kill();
  },

  update: function(){
    game.physics.arcade.collide(cthulus, platforms);
    game.physics.arcade.collide(mummies, platforms);
    game.physics.arcade.collide(cthulus, mummies);

    game.physics.arcade.overlap(player, cthulus, this.collectCthulu, null, this);
    game.physics.arcade.overlap(player, mummies, this.collectMummy, null, this);

    //player collision w/ platform
    game.physics.arcade.collide(player, platforms);
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
      //  Move to the right
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
    if(cursors.up.isDown && player.body.touching.down)
    {
      player.body.velocity.y = -350;
      //Add Game Sound
      this.jumpSound = game.add.audio('jump');
      this.jumpSound.play();
    }
  },
};
