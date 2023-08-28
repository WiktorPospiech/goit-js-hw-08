import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
updateOutput();

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
  }, 1000)
);

function updateOutput() {
  try {
    const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (parsedSettings > 570) {
      parsedSettings = 0;
    }
    player.setCurrentTime(parsedSettings);
  } catch {}
}

player
  .addCuePoint(15, {
    customKey: 'customValue',
  })
  .then(function (id) {
    // cue point was added successfully
  })
  .catch(function (error) {
    switch (error.name) {
      case 'UnsupportedError':
        // cue points are not supported with the current player or browser
        break;

      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
