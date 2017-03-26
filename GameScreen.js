var GameScreen = function(assetManager, stage) {
    // On this screen the player has exactly five seconds to beat the clock
    "use strict";
    // custom event for next button
    var eventScreenComplete = new createjs.Event("playFinished");
    var eventScreenPrevious = new createjs.Event("playPrevious");
    // construct container to hold all sprites of screen
    var screen = new createjs.Container();
    // add background to screen
    var background = assetManager.getSprite("uiAssets");
    background.gotoAndStop("gameScreen");
    screen.addChild(background);
    // construct hitspot sprite
    
    
    // timer variables
    var timer = null;
    var countDown = 60;
    var txtTimer = null;
    
    
    // ------------------------------------------------------------ private methods
    function startTimer() {
        timer = window.setInterval(onTimerUpdate, 1000);
    }
    
    function stopTimer() {
        window.clearInterval(timer);
        countDown = 60;
        timer = null;
    }

        
    function onTimerUpdate(e) {
        //console.log("time!");
        countDown--;
        txtTimer.text = String(countDown);
        // detect if game over
        if (countDown == 0) {
            userGuess = "";
            stopTimer();
        } else if (countDown <= 10) {
            createjs.Sound.play("timeSound");
        }
    }
    
    
    
    var hitAreaSprite = assetManager.getSprite("uiAssets");
	var ghosts = [],
		ghostMover = [],
		numberOfGhosts = 12, // Not needed? See comment below.
		index = 0,
    clearedGhosts = [];
    
    
    
    // add quit button
    var btnQuit = assetManager.getSprite("uiAssets");
    btnQuit.gotoAndStop("previousUp");
    btnQuit.x = 40;
    btnQuit.y = 260;
    btnQuit.buttonHelper = new createjs.ButtonHelper(btnQuit, "quitUp", "quitOver", "quitOver", false, hitAreaSprite, "hitArea");
    btnQuit.addEventListener("click",onQuit);
    screen.addChild(btnQuit);
    
	/*
	This function will add a new sprite to the screen at the given coordinate and place the needed data in the arrays.
	*/

	function addSprite(x, y) {
		"use strict";
		var ghostIndex = ghosts.length;
		ghosts[ghostIndex] = assetManager.getSprite("uiAssets");
		ghostMover[ghostIndex] = new Mover(ghosts[ghostIndex], stage, ghostIndex, clearedGhosts, numberOfGhosts);
		ghosts[ghostIndex].x = x;
		ghosts[ghostIndex].y = y;
		ghosts[ghostIndex].gotoAndStop("ghostAlive");
		screen.addChild(ghosts[ghostIndex]);
		ghostMover[ghostIndex].startMe();
	}
	addSprite(10, 10); // Index 0.
	addSprite(80, 10); // Index 1.
	addSprite(150, 10); // Index 2.
	addSprite(220, 10); // Index 3.
	addSprite(10, 80); // Index 4.
	addSprite(80, 80); // Index 5.
	addSprite(150, 80); // Index 6.
	addSprite(220, 80); // Index 7.
	addSprite(10, 150); // Index 8.
	addSprite(80, 150); // Index 9.
	addSprite(150, 150); // Index 10.
	addSprite(220, 150); // Index 11.
	/*
	* I'm not sure if the above is correct.
	* You was over-writing the sprites each row? You wasn't creating a new sprite for each row.
	*/
    
    
    function onQuit(e){
        console.log("clicked on prev!");
        // telling the world the prev button has been clicked!
        stage.dispatchEvent(eventScreenPrevious);
    }
    
    function onPlay(e){
        console.log("Play has started!");
    }
    
    // ---------------------------------- public methods
    this.showMe = function() {
        // anything else that needs to be done when the screen is shown
        // ...
        stage.addChild(screen);
        //stage.addChild(ghost1)
    }
    this.hideMe = function() {
        stage.removeChild(screen);
       
    } 
    function onTick(e) {
		ghostMover1.updateMe();
		// update the stage!
		stage.update();
	}
};
