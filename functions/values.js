export class AppValues {
  constructor(isBn) {
    this.isBn = isBn;
  }
  getAppName() {
    return this.isBn ? "কমিটি" : "Comity";
  }
  getUserBottomBarName() {
    if (this.isBn) {
      return ["হোম","চাঁদা","ইনবক্স","প্রোফাইল"]
    } else {
      return ["Home","Donation","Inbox","Profile"]
    }
  }
  getSignUpCartTitles(){
    if(this.isBn){
      return {
        title:"দশে মিলে করি কাজ, হারি জিতি নাহি লাজ"
      }
    }else{
      return{
        title:"Two heads are better than one. We stand or fall together."
      }
    }
  }
}
