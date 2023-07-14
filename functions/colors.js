

export class AppColors{
    constructor(isDark){
        this.isDark=isDark
    }
    getBackgroundColor(){
        return this.isDark?"#1F1F1F":"#F6F6F6"
    }
    getMainColor(){
        return this.isDark?"#ffffff":"#2B32B2"
    }
    getBorderColor(){
        return this.isDark?"rgba(255, 255, 255, 0.60)":"rgba(0, 0, 0, 0.40)"
    }
    getTextColor(){
        return this.isDark?"#ffffff":"#000000"
    }
    getSubTextColor(){
        return this.isDark?"rgba(255, 255, 255, 0.66)":"rgba(0, 0, 0, 0.66)"
    }
    getTextPrimaryColor(){
        return this.isDark?"#fff":"#2B32B2"
    }
    
}