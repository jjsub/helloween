var gameOver = {
  create: function(){
    var style = {font: "30px Arial", fill: "#e78f27"};
    //var x = game.world.width/2, y = game.world.height/2;

    var text = this.game.add.text(game.world.centerX, game.world.centerY, "Game Over", style);
    text.anchor.setTo(0.5, 0.5);

    var text2 = this.game.add.text(game.world.centerX, game.world.centerY + 100, 'You were killed.', style);
    text2.anchor.setTo(0.5, 0.5);
  }
};
