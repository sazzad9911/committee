
const loader=(state=false,action)=>{
    if(action.type==="SET_LOADER"){
        return action.value;
    }
    return state
}
const show=()=>{
    return{
        type:"SET_LOADER",
        value:true
    }
}
const hide=()=>{
    return{
        type:"SET_LOADER",
        value:false
    }
}
loader.show=show;
loader.hide=hide;
export default loader 