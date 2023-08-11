const initialState=null
export const storeUser=(val)=>{
    return{
        type:"SET_USER",
        value:val
    }
}

const user=(state=initialState,action)=>{
    if(action.type==="SET_USER"){
        return action.value;
    }
    return state
}

export default user