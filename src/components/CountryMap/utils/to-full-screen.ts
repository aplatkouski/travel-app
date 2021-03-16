const toFullScreen = (element: HTMLDivElement): void => {
  if (
    'fullscreenEnabled' in document &&
    document.fullscreenEnabled &&
    'requestFullscreen' in element
  ) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    element.requestFullscreen();
  } else {
    throw new Error('User doesn`t allow full screen');
  }
};

export default toFullScreen;
