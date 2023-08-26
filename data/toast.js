
const toast=(state=false,action)=>{
    if(action.type==="SET_TOAST"){
        return action.value;
    }
    return state
}
const info=(message)=>{
    return{
        type:"SET_TOAST",
        value:{
            type:"info",
            message
        }
    }
}
const success=(message)=>{
    return{
        type:"SET_TOAST",
        value:{
            type:"success",
            message
        }
    }
}
const error=(message)=>{
    return{
        type:"SET_TOAST",
        value:{
            type:"error",
            message
        }
    }
}
const hide=()=>{
    return{
        type:"SET_TOAST",
        value:null
    }
}
toast.info=info;
toast.success=success;
toast.error=error;
toast.hide=hide;
export default toast 