// options.js 
// Show and edit game options

import Renderer from './renderer';
import Globals from '../globals';
import Controls from '../controls';

class Options extends Renderer {

  create() {
    super.create();

    this.controls = new Controls(this.game, true);

    // state title
    const controlsTitle = this.game.add.bitmapText(this.game.world.centerX, 24, Globals.bitmapFont, 'CONTROLS', 20);
    controlsTitle.anchor.setTo(0.5);

    const startX = this.game.world.centerX - 100;
    const labelX = this.game.world.centerX + 10;

    // add WASD text
    const wasdText = this.game.add.bitmapText(startX, 50, Globals.bitmapFont, 'WASD', 12);
    wasdText.tint = 0x000000;
    const movementLegend = this.game.add.bitmapText(labelX, 50, Globals.bitmapFont, 'MOVEMENT', 12);

    if (this.game.input.gamepad.pad1.connected) {
      const gamePad = this.game.add.bitmapText(this.game.world.centerX, 35, Globals.bitmapFont, 'GAMEPAD DETECTED', 10);
      gamePad.anchor.setTo(0.5);

      // add hit jump instructions
      const hitKey = this.game.add.bitmapText(startX, 80, Globals.bitmapFont, 'X / H', 12);
      hitKey.tint = 0x000000;
      const hitKeyLegend = this.game.add.bitmapText(labelX, 80, Globals.bitmapFont, 'PUNCH', 12);

      const kickKey = this.game.add.bitmapText(startX, 110, Globals.bitmapFont, 'A / J', 12);
      kickKey.tint = 0x000000;
      const kickKeyLegend = this.game.add.bitmapText(labelX, 110, Globals.bitmapFont, 'KICK', 12);

    } else {
      // add hit jump instructions
      const hitKey = this.game.add.bitmapText(startX, 80, Globals.bitmapFont, 'H', 12);
      hitKey.tint = 0x000000;
      const hitKeyLegend = this.game.add.bitmapText(labelX, 80, Globals.bitmapFont, 'PUNCH', 12);

      const kickKey = this.game.add.bitmapText(startX, 110, Globals.bitmapFont, 'J', 12);
      kickKey.tint = 0x000000;
      const kickKeyLegend = this.game.add.bitmapText(labelX, 110, Globals.bitmapFont, 'KICK', 12);
    }

    // leave text
    const leaveText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 20, 
      Globals.bitmapFont, '(Press Punch to continue)', 10);
    leaveText.anchor.setTo(0.5);
    leaveText.alpha = 0;

    this.game.add.tween(leaveText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
  }

  update() {
    super.update();

    if(this.controls.punch || this.controls.jump || this.controls.kick) {
      this.state.start('mainmenu');
    }
  }

}

export { Options };
