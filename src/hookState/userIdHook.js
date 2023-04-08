export const userIdHook = () => {
  return typeof window !== "undefined" ? localStorage.getItem("userId") : null;
};
