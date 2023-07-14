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
  getLanguageHeadline() {
    if (this.isBn) {
      return "Change Language"
    } else {
      return "Change Language"
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
  getComityHeadLine(){
    return this.isBn?"কমিটির তথ্য":"Comity Information"
  }
  createCommitteeValues(){
    if(this.isBn){
      return {
        name:"কমিটির নাম",
        required:"বাধ্যতা মূলক",
        highest30:"সর্বচ্চ ৩০ অক্ষর",
        highest50:"সর্বচ্চ ৫০ অক্ষর",
        notRequired:"বাধ্যতা মূলক নয়",
        mobile:"মোবাইল",
        write:"লিখুন",
        select:"বাছাই করুন",
        address:"ঠিকানা",
        division:"ভিভাগ",
        district:"জেলা",
        thana:"থানা",
        next:"পরবর্তী",
        highest1000:"সর্বচ্চ ১০০০ অক্ষর",
        about:"কমিটি সম্পর্কে",
        confirm:"নিশ্চিত করুন",
        text1:"আমি সকল",
        text2:"নীতিমালার",
        text3:"বিষয়ে সম্মতি দিলাম",
        gender:"লিঙ্গ"
      }
    }else{
      return {
        name:"Comity Name",
        required:"Require",
        highest30:"Maxi. 30 Cha.",
        highest50:"Maxi. 50 Cha.",
        notRequired:"Optional",
        mobile:"Mobile",
        write:"Type here",
        select:"Choose",
        address:"Address",
        division:"Division",
        district:"District",
        thana:"Thana",
        next:"Next",
        highest1000:"Maxi. 1000 Cha.",
        about:"About Comity",
        confirm:"Confirm",
        text1:" agree to all",
        text2:"terms and conditions",
        text3:"",
        gender:"Gender"
      }
    }
  }
  getEditProfileHeadLine(){
    return this.isBn?"Address":"Address"
  }
  getSearch(){
    return this.isBn?"খুঁজুন":"Search"
  }
  getCommitteeList(){
    return this.isBn?"কমিটি লিস্ট":"Comity List"
  }
  createComityText(){
    return this.isBn?"একটি কমিটি গঠন করুন ":"Create a comity"
  }
  noComityFound(){
    return this.isBn?"আপনি এখন পর্যন্ত নিজের কোন কমিটি গঠন করেননি ":"You have not created your own comity"
  }
}
