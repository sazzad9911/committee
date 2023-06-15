export class AppColors{
    constructor(isDark){
        this.isDark=isDark
    }
    getBackgroundColor(){
        return this.isDark?"#000000":"#ffffff"
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