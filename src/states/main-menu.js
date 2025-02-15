// main-menu.js
// Game main menu options screen.

import Audio from '../audio';
import Globals from '../globals';
import Controls from '../controls';

import Renderer from './renderer';

const MainMenuConsts = {
  options: [
    'PLAY',
    'CONTROLS',
    'AUDIO',
  ],
};

class MainMenu extends Renderer {

  create() {
    super.create();

    const screenCenter = this.game.world.centerX;
    const screenHeight = this.game.world.height;

    this.playIntro(screenCenter);

    // create a text for each option
    this.selectedOption = 0;
    this.optionTexts = [];
    let ypos = screenHeight * 0.4; // Start from 40% of screen height
    const spacing = screenHeight * 0.1; // Space between options is 10% of screen height
    for(const [i, option] of MainMenuConsts.options.entries()) {
      const text = this.game.add.bitmapText(screenCenter, ypos + spacing * i, 
        Globals.bitmapFont, option, Math.floor(screenHeight * 0.05)); // Text size is 5% of screen height
      text.anchor.setTo(0.5);
      this.optionTexts.push(text);
    }

    // stop all sfx in menu
    this.audio = new Audio(this.game);
    this.audio.stop();

    this.controls = new Controls(this.game, true);
  }

  playIntro(screenCenter) {
    const SPEED = 2000;
    const screenHeight = this.game.world.height;
    const titleSize = Math.floor(screenHeight * 0.12); // Title size is 12% of screen height
    const titleY = screenHeight * 0.15; // Title Y position is 15% of screen height
    const titleOffset = this.game.world.width * 0.04; // Reduced from 0.08 for tighter spacing

    // Create both text objects first to get their widths
    const menuTitleLeft = this.game.add.bitmapText(0, titleY, 
      Globals.bitmapFont, 'BIT', titleSize);
    menuTitleLeft.anchor.setTo(0.5);

    const menuTitleRight = this.game.add.bitmapText(0, titleY, 
      Globals.bitmapFont, 'BRAWLER', titleSize);
    menuTitleRight.anchor.setTo(0.5);

    // Calculate total width including the gap between words
    const totalTextWidth = menuTitleLeft.width + menuTitleRight.width + (titleOffset * 2);
    const startX = (this.game.world.width - totalTextWidth) / 2;

    // Set initial positions off-screen
    menuTitleLeft.x = -100;
    menuTitleRight.x = this.game.world.width + 100;

    // Calculate final positions for perfect centering
    const leftTargetX = startX + (menuTitleLeft.width / 2);
    const rightTargetX = startX + menuTitleLeft.width + (titleOffset * 2) + (menuTitleRight.width / 2);

    this.game.add.tween(menuTitleLeft).to({ x: leftTargetX}, SPEED, 
      Phaser.Easing.Bounce.Out, true);
    this.game.add.tween(menuTitleRight).to({ x: rightTargetX}, SPEED, 
      Phaser.Easing.Bounce.Out, true);
  }

  update() {
    super.update();

    for(const [i, option] of this.optionTexts.entries()) {
      if(i == this.selectedOption)
        option.tint = 0x000000;
      else
        option.tint = 0xffffff;
    }

    this.handleInput();
  }

  handleInput() {
    if(this.controls.up) {
      this.selectedOption--;
      this.audio.play(this.audio.sfx.hero.punch, 2);
    }
    else if(this.controls.down) {
      this.selectedOption++;
      this.audio.play(this.audio.sfx.hero.punch, 1);
    }
    else if(this.controls.punch || this.controls.jump || this.controls.kick)
      this.chooseOption();

    if(this.selectedOption < 0)
      this.selectedOption = 0;
    if(this.selectedOption >= MainMenuConsts.options.length)
      this.selectedOption = MainMenuConsts.options.length - 1;
  }

  chooseOption() {
    // start play state
    if(this.selectedOption == 0) {
      // play sfx
      this.audio.play(this.audio.sfx.go);

      this.state.start('loading', true, false, 'act1');
    }

    // start option state
    if(this.selectedOption == 1) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('options');
    }

    // start audio controls state
    if (this.selectedOption == 2) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('options-audio');
    }
  }

}

export { MainMenu };
