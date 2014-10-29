var game = new Phaser.Game(900, 500, Phaser.CANVAS, 'gameDiv');

var score = 0;

//load all the states
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

//start with the load state
game.state.start('load');
