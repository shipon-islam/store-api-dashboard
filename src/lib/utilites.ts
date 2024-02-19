export const getAuth = () => {
  const localSession = localStorage.getItem("auth");
  const sessionObj = localSession ? JSON.parse(localSession) : {};
  return sessionObj;
};
