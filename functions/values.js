class Values{
    constructor(isBn){
        this.isBn=isBn;
    }
    getAppName(){
        return this.isBn?"Komite":"Committee"
    }
}