function createMusicPlayer() {
  let song = null;
  let muted = null;

  function playSong(name, loop = true) {
    return;

    if (song) {
      song.stop();
    }

    song = play(name);

    if (!loop) {
      return;
    }

    song.loop();

    if (muted) {
      mute();
    }
  }

  function stopSong() {
    if (!song) {
      return;
    }

    song.stop();
  }

  function mute() {
    if (!song) {
      return;
    }

    song.volume(0);
  }

  function unmute() {
    if (!song) {
      return;
    }

    song.volume(1);
  }

  function toggleMute() {
    muted = !muted;

    if (!song) {
      return;
    }

    if (muted) {
      song.volume(0);
    } else {
      song.volume(1);
    }
  }

  return {
    playSong,
    stopSong,
    mute,
    unmute,
    toggleMute,
  };
}

export default createMusicPlayer();
