// preloader.js
// Loads all required assets - gfx & sfx

import Audio from '../audio';
import Globals from '../globals';
import Renderer from './renderer';

const PreloaderConsts = {
  SPLASH_FADE: 1500, // ms
};

class Preloader extends Renderer {

  constructor(game) {
    super(game);
  }

  preload() {
    this._loadingBar = this.game.add.sprite(this.game.world.centerX / 2,
      this.game.world.centerY, 'loadingBar');
    this._loadingBar.centerX = this.world.centerX;
    this._loadingBar.scale.setTo(0.5);
    this.game.load.setPreloadSprite(this._loadingBar);

    // load audios
    Audio.loadSfx(this.game);
    Audio.loadMusic(this.game, 'fanfare');

    // load bitmap font
    this.game.load.bitmapFont(Globals.bitmapFont,
      require('../assets/fonts/standard-0753/standard-0753.png'),
      require('file-loader!../assets/fonts/standard-0753/standard-0753.xml'));

    // load JSON files
    this.game.load.json('dialog1', require('file-loader!../assets/dialogs/dialog1.json'));

    // load images
    this.game.load.image('arrow', require('../assets/images/arrow.png'));

    // load levels
    this.game.load.image('gd-tiles', require('../assets/levels/gd-tileset.png'));

    this.game.load.tilemap('intro',
      require('file-loader!../assets/levels/intro.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act1',
      require('file-loader!../assets/levels/act1.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act2',
      require('file-loader!../assets/levels/act2.json'), null,
      Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('act5',
      require('file-loader!../assets/levels/act5.json'), null,
      Phaser.Tilemap.TILED_JSON);

    // load sprites atlas
    this.load.atlas('atlas_sprites',
      require('../assets/sprites/sprites.png'),
      require('file-loader!../assets/sprites/sprites.json'),
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

  }

  create() {
    // remove loading bar from screen
    this._loadingBar.kill();

    // debug - start directly a game state
    if (Globals.debug && Globals.state) {
      this.state.start(Globals.state);
    }

    // set background to the game average color (optional)
    this.game.stage.backgroundColor = Globals.palette.menuBackground.hex;

    // create splash screen
    const splashText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY - 40, Globals.bitmapFont, 'BARIO', 20);
    splashText.anchor.setTo(0.5);

    const entertainmentText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY, Globals.bitmapFont, 'ENTERTAINMENT', 18);
    entertainmentText.anchor.setTo(0.5);

    const systemText = this.game.add.bitmapText(this.game.world.centerX,
      this.game.world.centerY + 40, Globals.bitmapFont, 'SYSTEM', 18);
    systemText.anchor.setTo(0.5);

    // 1.5 saniye bekle, sonra fade out efekti ile kaybol
    this.game.time.events.add(1500, () => {
      // Tüm metinlere fade out efekti uygula
      this.game.add.tween(splashText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
      this.game.add.tween(entertainmentText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
      const lastTween = this.game.add.tween(systemText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

      // Son fade out tamamlandığında ana menüye geç
      lastTween.onComplete.add(() => {
        this.state.start('mainmenu');
      });
    });
  }

}

export { Preloader };
