export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const login = () => {
  localStorage.setItem("token", "test-token");
};

export const logout = () => {
  localStorage.removeItem("token");
};