const isDark=(state=false,action)=>{
    if(action.type=="SET_THEME"){
        return action.playload
    }
    return state
}
export default isDark
export const setIsDark=(v)=>{
    return{
        type:"SET_THEME",
        playload:v
    }
}