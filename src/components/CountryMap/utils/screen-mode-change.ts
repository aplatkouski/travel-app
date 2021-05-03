import toFullScreen from './to-full-screen';

const screenModeChange = (element: HTMLDivElement): void => {
  if (document.fullscreenElement && 'exitFullscreen' in document) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    document.exitFullscreen();
  } else {
    toFullScreen(element);
  }
};

export default screenModeChange;
