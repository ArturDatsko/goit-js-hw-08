import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}

setCurrentTime();

function setCurrentTime() {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
