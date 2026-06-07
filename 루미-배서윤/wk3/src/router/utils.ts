export const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("pushstate"));
};

export const getCurrentPath = () => {
  return window.location.pathname;
};