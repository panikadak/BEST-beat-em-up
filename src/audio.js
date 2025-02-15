// audio.js - handles all user input

import Globals from './globals';

const DEFAULT_FADEOUT = 2500;

class Audio {

  static loadSfx(game) {
    // Add format check
    const audioFormat = '.m4a';  // Sadece m4a formatını kullan

    // Load audio files with proper format
    const loadAudio = (key, path) => {
      try {
        // Build için doğru yol
        game.load.audio(key, `assets/sfx/${path}${audioFormat}`);
      } catch (e) {
        console.warn(`Failed to load audio: ${key}`, e);
      }
    };

    loadAudio('hero-dive', 'BrianDive');
    loadAudio('hero-jump', 'BrianJump');
    loadAudio('hero-kick1', 'BrianKick1');
    loadAudio('hero-kick2', 'BrianKick2');
    loadAudio('hero-kick3', 'BrianKick3');
    loadAudio('hero-punch1', 'BrianPunch1');
    loadAudio('hero-punch2', 'BrianPunch2');
    loadAudio('hero-punch3', 'BrianPunch3');
    loadAudio('death1', 'Death1');
    loadAudio('death2', 'Death2');
    loadAudio('death3', 'Death3');
    loadAudio('death4', 'Death4');
    loadAudio('door1', 'Door1');
    loadAudio('door2', 'Door2');
    loadAudio('door3', 'Door3');
    loadAudio('foodpickup', 'FoodPickup');
    loadAudio('gameover', 'GameOver');
    loadAudio('go', 'Go');
    loadAudio('npcdespawn', 'NPCDespawn');
    loadAudio('npc-hit1', 'NPCHit1');
    loadAudio('npc-hit2', 'NPCHit3');
    loadAudio('npc-hit3', 'NPCHit2');
    loadAudio('breakglass1', 'PropBreakGlass1');
    loadAudio('breakglass2', 'PropBreakGlass2');
    loadAudio('breakglass3', 'PropBreakGlass3');
    loadAudio('breakmetal1', 'PropBreakMetal1');
    loadAudio('breakmetal2', 'PropBreakMetal2');
    loadAudio('breakmetal3', 'PropBreakMetal3');
    loadAudio('ready', 'Ready');
    loadAudio('thisway', 'ThisWayMix');
    loadAudio('dog1', 'Dog1');
    loadAudio('dog2', 'Dog2');
    loadAudio('dog3', 'Dog3');
    loadAudio('grunt1', 'Pain1');
    loadAudio('grunt2', 'Pain2');
    loadAudio('grunt3', 'Pain3');
    loadAudio('grunt4', 'Pain4');
    loadAudio('grunt5', 'Pain5');
    loadAudio('bossgrunt1', 'BossPain1');
    loadAudio('bossgrunt2', 'BossPain2');
    loadAudio('bossgrunt3', 'BossPain3');
    loadAudio('bosssight', 'BossSight');
    loadAudio('gloriacheer', 'GloriaCheer');
    loadAudio('gloriawin', 'GloriaWin');
  }

  static loadMusic(game, level) {
    try {
      // Build için doğru yol
      game.load.audio(level, `assets/musics/GO17-${level}_aac.m4a`);
    } catch (e) {
      console.warn(`Failed to load music: ${level}`, e);
    }
  }

  constructor(game) {
    this.game = game;

    this._soundsOn = Globals.noSounds == false;
    this._musicOn = Globals.noMusic == false;

    this._current = null;
    
    // Initialize audio context
    const startAudio = () => {
      if (this.game.sound.context) {
        // Unlock WebAudio
        const context = this.game.sound.context;
        if (context.state === 'suspended') {
          context.resume();
        }

        // Create empty buffer
        const buffer = context.createBuffer(1, 1, 22050);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);

        // Remove event listeners
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
        document.removeEventListener('touchstart', startAudio);
      }
    };

    // Add multiple event listeners for user interaction
    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('touchstart', startAudio);

    // Fallback for audio format
    this.game.sound.usingWebAudio = true;
    this.game.sound.usingAudioTag = false;

    // add all possible musics
    this.musics = {
        maintheme: game.add.audio('maintheme', 1, true),
        act2: game.add.audio('act2', 1, true),
        act3: game.add.audio('act3', 1, true),
        boss: game.add.audio('boss', 1, true),
        fanfare: game.add.audio('fanfare', 1, false),
    };

    // add all possible sfx
    this.sfx = {
      hero: {
        dive: game.add.audio('hero-dive'),
        kick: [
          game.add.audio('hero-kick1'),
          game.add.audio('hero-kick2'),
          game.add.audio('hero-kick3')
        ],
        jump: game.add.audio('hero-jump'),
        punch: [
          game.add.audio('hero-punch1'),
          game.add.audio('hero-punch2'),
          game.add.audio('hero-punch3')
        ],
        death: game.add.audio('death1')
      },
      door: [
        game.add.audio('door1'),
        game.add.audio('door2'),
        game.add.audio('door3')
      ],
      foodpickup: [
        game.add.audio('foodpickup')
      ],
      gameover: [
        game.add.audio('gameover')
      ],
      go: [
        game.add.audio('go')
      ],
      npcdespawn: [
        game.add.audio('npcdespawn')
      ],
      npc: {
        hit: [
          game.add.audio('npc-hit1'),
          game.add.audio('npc-hit2'),
          game.add.audio('npc-hit3')
        ],
        death: [
          game.add.audio('death2'),
          game.add.audio('death3'),
          game.add.audio('death4')
        ],
        grunts: [
          game.add.audio('grunt1'),
          game.add.audio('grunt2'),
          game.add.audio('grunt3'),
          game.add.audio('grunt4'),
          game.add.audio('grunt5'),
        ],
        boss: {
          grunts: [
            game.add.audio('bossgrunt1'),
            game.add.audio('bossgrunt2'),
            game.add.audio('bossgrunt3'),
          ],
          mock: game.add.audio('bosssight')
        },
        gloria: {
          cheer: game.add.audio('gloriacheer'),
          win: game.add.audio('gloriawin'),
        }
      },
      breakglass: [
        game.add.audio('breakglass1'),
        game.add.audio('breakglass2'),
        game.add.audio('breakglass3')
      ],
      breakmetal: [
        game.add.audio('breakmetal1'),
        game.add.audio('breakmetal2'),
        game.add.audio('breakmetal3')
      ],
      ready: [
        game.add.audio('ready')
      ],
      thisway: [
        game.add.audio('thisway')
      ],
      dog: {
        bark: [ 
          game.add.audio('dog1'),
          game.add.audio('dog2')
        ],
        goodboy: game.add.audio('dog3')
      }
    };
  }

  _canPlay(audio) {
    if (!audio) 
      return true;

    if (audio && audio.name in this.musics) {
      return this._musicOn;
    }

    return this._soundsOn;
  }

  play(audio, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(Array.isArray(audio)) {
      if (key === true) {
        const idx = this.game.rnd.integerInRange(0, audio.length - 1);
        this._current = audio[idx];
      } else {
        this._current = audio[key];
      }
    }
    else {
      this._current = audio;
    }

    this._current.play();
  }

  stop(audio = null, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(audio) {
      if(Array.isArray(audio))
        audio[key].stop();
      else
        audio.stop();
    }
    else if(this._current)
      this._current.stop();
    else
      this.game.sound.stopAll();
  }

  fadeOut(audio, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(audio) {
      if(Array.isArray(audio))
        audio[key].stop();
      else
        audio.fadeOut(DEFAULT_FADEOUT);
    }
    else if(this._current) {
      this._current.fadeOut(DEFAULT_FADEOUT);
    }
  }

  set soundsOn(value) {
    this._soundsOn = value;
    localStorage.setItem(`noSounds`, !value);
  }
  get soundsOn() {
    return this._soundsOn;
  }
  set musicOn(value) {
    this._musicOn = value;
    localStorage.setItem(`noMusic`, !value);
  }
  get musicOn() {
    return this._musicOn;
  }
}

export default Audio;
