export const useLocalStorage = (key: string) => {
  const setitem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  };

  return { setitem, getItem, removeItem };
};
