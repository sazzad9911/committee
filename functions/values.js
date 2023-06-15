export class AppValues {
  constructor(isBn) {
    this.isBn = isBn;
  }
  getAppName() {
    return this.isBn ? "কমিটি" : "Committee";
  }
  getUserBottomBarName() {
    if (this.isBn) {
      return ["হোম","চাঁদা","ইনবক্স","প্রোফাইল"]
    } else {
      return ["Home","Donation","Inbox","Profile"]
    }
  }
}
