// loading.js
// Loads acts' specific assets - gfx & sfx

import Audio from '../audio';
import Controls from '../controls';
import Globals from '../globals';
import Renderer from './renderer';

const LoadingConsts = {
  SPLASH_FADE: 1500, // ms
  LOAD_TIME: 5,
};

class Loading extends Renderer {

  constructor(game) {
    super(game);
  }

  init(nextState) {
    this.nextState = nextState;

    // stop all audios
    const audio = new Audio(this.game);

    //if (nextState !== 'act1') {
      audio.stop();
    //}

    // play transition tune
    if (nextState !== 'intro') {
      audio.play(audio.musics.fanfare);
    }

    this.audio = audio;
  }

  preload() {
    this.resetWorld();
    // default background color
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;

    this.game.load.onLoadComplete.add(this.loadComplete, this);

    // add a countdown for next state
    this.timer = this.game.time.create();
    this.timer.add(Phaser.Timer.SECOND * LoadingConsts.LOAD_TIME, this.changeState, this);

    // load audios
    let nextStateText = '';
    if (this.nextState == 'options-audio') {
      Audio.loadMusic(this.game, 'maintheme');
      nextStateText = 'OPTIONS';
    }
    else if(this.nextState == 'act1') {
      Audio.loadMusic(this.game, 'maintheme');
      nextStateText = 'ACT 1';
    }
    else if(this.nextState == 'act2') {
      Audio.loadMusic(this.game, 'act2');
      nextStateText = 'ACT 2';
    }
    else if(this.nextState == 'act5') {
      // XXX actually this is Act 5 - Finale
      Audio.loadMusic(this.game, 'maintheme');
      Audio.loadMusic(this.game, 'act3');
      Audio.loadMusic(this.game, 'boss');
      nextStateText = 'ACT 3';
    }

    // add text to screen
    const screenHeight = this.game.world.height;
    const titleSize = Math.floor(screenHeight * 0.1); // Title size is 10% of screen height
    const loadingSize = Math.floor(screenHeight * 0.05); // Loading text size is 5% of screen height

    const stateText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY - (screenHeight * 0.2), // 20% up from center
      Globals.bitmapFont, nextStateText, titleSize);
    stateText.anchor.setTo(0.5);
    stateText.scale.setTo(0);
    this.game.add.tween(stateText.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.None, true);

    this.text = this.game.add.bitmapText(this.game.world.centerX, 
      this.game.world.centerY + (screenHeight * 0.1), // 10% down from center
      Globals.bitmapFont, '', loadingSize);
    this.text.anchor.setTo(0.5);

    this.timer.start();
  }

  update() {
    if(this.timer.running)
      this.text.text = 'LOADING...\n\t\t\t\t\t\t' + (LoadingConsts.LOAD_TIME - Math.round(this.timer.ms / 1000));
    else
      this.text.text = 'LOADED!';

    if(this.controls.punch || this.controls.jump)
      this.changeState();
  }

  loadComplete() {
    const screenHeight = this.game.world.height;
    const skipSize = Math.floor(screenHeight * 0.04); // Skip text size is 4% of screen height

    const skipText = this.game.add.bitmapText(this.game.world.centerX, 
      this.game.world.height - (screenHeight * 0.05), // 5% from bottom
      Globals.bitmapFont, 'Press Punch or Kick to skip', skipSize);
    skipText.anchor.setTo(0.5);
    skipText.alpha = 0;

    this.game.add.tween(skipText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.controls = new Controls(this.game, true);

    if (this.nextState !== 'intro') {
      // ready to go
      this.game.time.events.add(3000, () => this.audio.play(this.audio.sfx.ready));
    }
  }

  changeState() {
    this.timer.stop();
    this.state.start(this.nextState);
  }

}

export { Loading };
