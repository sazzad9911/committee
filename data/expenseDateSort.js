const expenseDateSort=(state=null,action)=>{
    if(action.type=="SET_EXPENSE_DATE"){
        return action.playload
    }
    return state
}
export default expenseDateSort
export const setExpenseDateSort=(v)=>{
    return{
        type:"SET_EXPENSE_DATE",
        playload:v
    }
}