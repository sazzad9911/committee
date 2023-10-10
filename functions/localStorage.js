import AsyncStorage from "@react-native-async-storage/async-storage";
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    return e;
  }
};
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return e;
  }
};
const getAuth = async () => {
  return await getData("user");
};
const login = async (val) => {
  return await storeData("user", val);
};
const logout = async () => {
  return await storeData("user", null);
};
const comityLogOut = async () => {
  return await storeData("SET_COMITY", null);
};
const comityLogIn = async (val) => {
  return await storeData("SET_COMITY", val);
};
const getComity = async () => {
  return await getData("SET_COMITY");
};
const isBn = async () => {
  return await getData("isBn");
};
const setBn = async (b) => {
  return await storeData("isBn", b);
};
const isDark = async () => {
  return await getData("isDark");
};
const setDark = async (b) => {
  return await storeData("isDark", b);
};
const isNotFirstTime = async () => {
  return await getData("isNotFirstTime");
};
const setNotFirstTime = async (b) => {
  return await storeData("isNotFirstTime", b);
};
const localStorage = {};
localStorage.storeData = storeData;
localStorage.getData = getData;
localStorage.getAuth = getAuth;
localStorage.login = login;
localStorage.logout = logout;
localStorage.comityLogIn = comityLogIn;
localStorage.comityLogOut = comityLogOut;
localStorage.getComity = getComity;
localStorage.setBn = setBn;
localStorage.isBn = isBn;
localStorage.setDark = setDark;
localStorage.isDark = isDark;
localStorage.setNotFirstTime = setNotFirstTime;
localStorage.isNotFirstTime = isNotFirstTime;
export default localStorage;
