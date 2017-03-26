function Mover(sprite, stage, ghostIndex, clearedGhosts, numberOfGhosts) {
    "use strict";

     var eventGameOver = new createjs.Event("playFinished");

    // stop the sprite animating just in case
    sprite.stop();


    // ------------------------------------------ public methods
    // Call the function for playing the sprite
    this.startMe = function () {
        sprite.play();

    };



    // Added event listener to stop sprite, also removed stopMe() function
        sprite.addEventListener("click", function () {

        // Add ghost to clear array only once.
        if (clearedGhosts.indexOf(ghostIndex) === -1) {
            clearedGhosts.push(ghostIndex);
            // Once the sprite is clicked, play the Dead function
            sprite.gotoAndPlay("ghostDead");
            createjs.Sound.play("ghost");
        }

        // Once all ghosts are gone, show Game Over screen.
        if (clearedGhosts.length === numberOfGhosts) {
            console.log('Game Over');
            stage.dispatchEvent(eventGameOver);
        }
    });

}
