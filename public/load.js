var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('sky', '/img/sky.png');
    game.load.image('ground', '/img/platform.png');
    game.load.spritesheet('cthulu', '/img/cthulu.png', 64, 64);
    game.load.spritesheet('mummy', '/img/mummy.png', 80, 80);
    game.load.spritesheet('jack', '/img/jack.png', 80, 93);
    //Game Sound
    game.load.audio('game', 'assets/audio/Totta - Hero Quest - Pophousedub remix.mp3', 'assets/audio/Totta_-_Hero_Quest_-_Pophousedub_remix.ogg');
    //Load in the jump sound
    game.load.audio('jump', 'assets/audio/SoundEffects/alien_death1.wav');
    //Sound for Stars
    game.load.audio('star', 'assets/audio/SoundEffects/key.wav');
    //Sound for Diamonds
    game.load.audio('diamond', 'assets/audio/SoundEffects/p-ping.mp3')
    //Tilemaps
    game.load.tilemap('lv1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('lv2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('level1', 'assets/tilemaps/cybernoid.png', 16, 16);
    game.load.image('level2', 'assets/tilemaps/cybernoid.png', 16, 16);
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
