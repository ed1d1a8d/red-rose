var gameWidth = 1200,
    gameHeight = 640;

window.onload = function() {
  Crafty.init(gameWidth, gameHeight, "cr-stage");
  defineScenes();
  Crafty.enterScene("loading");
};

defineScenes = function() {

  /*
   * SCENE: loading
   * DESCRIPTION: This scene is displayed anytime the game needs to load assets.
   */
  Crafty.defineScene("loading", function() {
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text")
          .textFont({ size: '20px' })
          .textColor("white")
          .css({ 'text-align' : 'center' })
          .attr({w: 200, h: 50, x: gameWidth/2 - 100, y: gameHeight/2 - 25})
          .text("Loading Assets...")
          .unselectable();

  });

};