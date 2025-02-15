// hud.js - Container for showing player stats

import HealthBar from '../components/health-bar';
import GoHand from '../components/go-hand';

class Hud {

  constructor(game, sprite) {
    this.game = game;

    // create health bar
    const options = {
        x: 10,
        y: 10,
        width: 75,
        fixedToCamera: true,
        visible: true
    };
    this._healthbar = new HealthBar(game, sprite, options);
  }

  get thisWay() {
    return this.hand;
  }

  showThisWay(actor) {
    this.hand = new GoHand(this.game);
    return this.hand;
  }

  hideThisWay() {
    if (this.hand) {
      this.hand.sprite.destroy();
    }
  }

  update() {
    this._healthbar.update();
  }

}

export default Hud;
