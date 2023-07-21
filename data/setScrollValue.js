const initialState=0;
const scrollValue=(state=initialState,action)=>{
    if(action.type=="SET_SCROLL_VALUE"){
        return action.playload
    }
    return state
}

export default scrollValue
export const setScrollValue=(value)=>{
    return{
        type:"SET_SCROLL_VALUE",
        playload:value
    }
}