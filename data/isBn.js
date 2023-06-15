const isBn=(state=false,action)=>{
    if(action.type=="SET_LANG"){
        return action.playload
    }
    return state
}
export default isBn;

export const setIsBn=(v)=>{
    return{
        type:"SET_LANG",
        playload:v
    }
}