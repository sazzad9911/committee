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
}
const getAuth=async()=>{
   return await getData("user")
}
const login=async(val)=>{
    return await storeData("user",val)
}
const logout=async()=>{
    return storeData("user",null)
}
const localStorage={};
localStorage.storeData=storeData;
localStorage.getData=getData;
localStorage.getAuth=getAuth;
localStorage.login=login;
localStorage.logout=logout;
export default localStorage