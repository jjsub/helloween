var cursors;
var score = 0;
var scoreText;
var timer;
var style = {fontSize: '32px', fill: '#000'};
var seconds = 0;
var diamond;
var star;

var playState = {
  //no preload needed
  create: function(){
    map = game.add.tilemap('level1');

    map.addTilesetImage('cybernoid.png', 'tiles');

    score = 0;
    seconds = 30;
    //map jump, up down left right to functions that move the player
    //create groups for ledges, X, Z

    //create timer for countdown
    this.gameTimer = game.time.events.loop(1000, this.updateTimer, this);

    //add sprites, give them physics, have them collide properly
     //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //timer
    timer = game.add.text(16, 40, style);
    timer.setText('time: 30');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    //ledge = platforms.create(-150, 150, 'ground');
    //ledge.body.immovable = true;

    ledge = platforms.create(-150, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(220, 220, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(50, 150, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,3);

    ledge = platforms.create(390, 100, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,2);


    ledge = platforms.create(-150, 300, 'ground');
    ledge.body.immovable = true;

      // The player and its settings
    player = game.add.sprite(32, game.world.height - 250, 'jack');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [5, 6, 7], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);

    //spawn 10 xs
    cthulus = game.add.group();
    cthulus.enableBody = true;

    for(var i = 0; i < 10; i++){
      cthulu = cthulus.create(i * 70, 0, 'cthulu');
      cthulu.body.gravity.y = 60;
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      cthulu.body.collideWorldBounds = true;
    };

    this.moveTimer = game.time.events.loop(1500, this.moveItems, this);
    //Add Game Sound
    this.gameSound = game.add.audio('game');
    this.gameSound.play();

    scoreText = game.add.text(16, 16, 'score: 0', style);

    mummies = game.add.group();
    mummies.enableBody = true;

    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('cthulu');
  },

  moveItems: function(){
    //call this on a timer in create
    //will look like this:

    cthulus.forEach(function(cthulu){
      var direction = Math.floor(Math.random() + .5);

      if(direction === 1){
        cthulu.body.velocity.x += 100;
      }else if(direction === 0){
        cthulu.body.velocity.x -= 100;
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

    // Removes the cthulu from the screen
    cthulu.kill();
    score += 20;
    scoreText.setText('Score: ' + score);

    mummy = mummies.create(game.world.randomX, 0, 'mummy');
    mummy.body.gravity.y = 60;
    mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
    mummy.body.collideWorldBounds = true;

    //collect Star Sound
    this.starSound = game.add.audio('star');
    this.starSound.play();

    //Add and update the score
    score += 20;
    scoreText.text = 'Score: ' + score;

    var x = Math.floor(Math.random() * 600 - 32),
        y = Math.floor(Math.random() * 600 - 90);
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 2000, null, 10);
  },

  collectMummy: function(player, mummy){

    //Removes the mummy from the screen
    mummy.kill();

    //collect mummy Sound
    this.diamondSound = game.add.audio('diamond');
    this.diamondSound.play();

    // Add and update the score
    score += 40;
    scoreText.setText('Score: ' + score);

    // Check for mummies
    if(this.mummy <= 0)
    {
      this.gameSound.stop();
      game.state.start('menu');
    }
  },

  update: function(){
    //this is the biggest part of the game
    //if players collide with x, kill x, play a sound, add to score, turn x into z
    //if player collides with z, kill z, play a sound, increase score

    //x moves randomly left and right
    //z moves randomly left right and up
    //bound player to screen

    //if timer reaches zero, play and animation and return to menu
    //stars collide with platforms
    game.physics.arcade.collide(cthulus, platforms)
    game.physics.arcade.collide(mummies, platforms)
    game.physics.arcade.collide(cthulus, mummies)

    game.physics.arcade.overlap(player, cthulus, this.collectCthulu, null, this);
    game.physics.arcade.overlap(player, mummies, this.collectMummy, null, this);

    //player collision w/ platform
    game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();

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

  updateTimer: function(){
    seconds -= 1;
    timer.setText('time: ' + seconds);

    if(seconds === 0)
    {
      this.gameSound.stop();
      game.state.start('menu');
    }
  }
};
