class Colors{
    constructor(isDark){
        this.isDark=isDark
    }
    getBackgroundColor(){
        return this.isDark?"#ffffff":"#000000"
    }
    getMainColor(){
        return this.isDark?"#2B32B2":"#2B32B2"
    }
    getBorderColor(){
        return this.isDark?"#E6E6E6":"#E6E6E6"
    }
    getTextColor(){
        return this.isDark?"#ffffff":"#000000"
    }
}