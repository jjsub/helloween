var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('helloween', '/img/helloween.png');
    game.load.image('bullet', '/img/pumpkinbomb.png');
    game.load.spritesheet('cthulu', '/img/cthulu.png', 64, 64);
    game.load.spritesheet('mummy', '/img/mummy.png', 80, 80);
    game.load.spritesheet('jack', '/img/jack.png', 80, 93);
    //Game Sound
    game.load.audio('ls1', 'assets/audio/03 This Is Halloween - Danny Elfman.mp3', 'assets/audio/03_This_Is_Halloween_-_Danny_Elfman.ogg');
    //Game Sound lvl 2
    game.load.audio('ls2', 'assets/audio/Oogie Boogie Song.mp3', 'assets/audio/Oogie_Boogie_39_s_Song.ogg');
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
    game.load.image('key', '/img/key-clipart-key.png');
    game.load.image('door', '/img/Door.png');
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
