var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('sky', '/img/sky.png');
    game.load.image('ground', '/img/platform.png');
    game.load.image('star', '/img/star.png');
    game.load.image('diamond', '/img/diamond.png');
    game.load.spritesheet('dude', '/img/dude.png', 32, 48);
    //Game Sound
    game.load.audio('game', 'assets/audio/Totta - Hero Quest - Pophousedub remix.mp3', 'assets/audio/Totta_-_Hero_Quest_-_Pophousedub_remix.ogg');
    //Load in the jump sound
    game.load.audio('jump', 'assets/audio/SoundEffects/alien_death1.wav');
    //Sound for Stars
    game.load.audio('star', 'assets/audio/SoundEffects/key.wav');
    //Sound for Diamonds
    game.load.audio('diamond', 'assets/audio/SoundEffects/p-ping.mp3')
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
