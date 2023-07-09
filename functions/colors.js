export class AppColors{
    constructor(isDark){
        this.isDark=isDark
    }
    getBackgroundColor(){
        return this.isDark?"#191C1F":"#ffffff"
    }
    getMainColor(){
        return this.isDark?"#2B32B2":"#2B32B2"
    }
    getBorderColor(){
        return this.isDark?"#CBCBCB":"#A7A7A7"
    }
    getTextColor(){
        return this.isDark?"#ffffff":"#000000"
    }
}