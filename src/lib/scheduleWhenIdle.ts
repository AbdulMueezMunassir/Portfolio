type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export const scheduleWhenIdle = (callback: () => void, timeout = 1200) => {
  const idleWindow = window as IdleWindow;
  let cancelled = false;
  let idleHandle: number | undefined;
  let timerHandle: number | undefined;
  const run = () => {
    if (!cancelled) callback();
  };

  if (idleWindow.requestIdleCallback) {
    idleHandle = idleWindow.requestIdleCallback(run, { timeout });
  } else {
    timerHandle = window.setTimeout(run, 250);
  }

  return () => {
    cancelled = true;
    if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
    if (timerHandle !== undefined) window.clearTimeout(timerHandle);
  };
};
