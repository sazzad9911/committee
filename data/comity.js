const comity=(state=null,action)=>{
    if(action.type=="SET_COMITY"){
        return action.value
    }
    return state
}
export default comity   