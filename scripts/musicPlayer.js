class MusicPlayer {
  constructor() {
    this.song = null;
    this.muted = false;
  }

  playSong(name, loop = true) {
    if (this.song) {
      this.song.stop();
    }

    this.song = play(name);

    if (!loop) {
      return;
    }

    this.song.loop();

    if (this.muted) {
      this.mute();
    }

    // Temporary to not get tired of hearing it all the time
    // this.mute();
  }

  stopSong() {
    if (!this.song) {
      return;
    }

    this.song.stop();
  }

  mute() {
    if (!this.song) {
      return;
    }

    this.song.volume(0);
  }
  
  unmute() {
    if (!this.song) {
      return;
    }

    this.song.volume(1);
  }

  toggleMute() {
    this.muted = !this.muted;

    if (!this.song) {
      return;
    }

    if (this.muted) {
      this.song.volume(0);
    } else {
      this.song.volume(1);
    }
  }
}

export default new MusicPlayer();
