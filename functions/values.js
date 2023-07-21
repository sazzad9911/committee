export class AppValues {
  constructor(isBn) {
    this.isBn = isBn;
  }
  getAppName() {
    return this.isBn ? "কমিটি" : "Comity";
  }
  getUserBottomBarName() {
    if (this.isBn) {
      return ["হোম", "চাঁদা", "ইনবক্স", "প্রোফাইল", "সদস্য", "ডেশবোর্ড"];
    } else {
      return ["Home", "Donation", "Inbox", "Profile", "Member", "Dashboard"];
    }
  }
  getLanguageHeadline() {
    if (this.isBn) {
      return "Change Language";
    } else {
      return "Change Language";
    }
  }
  getSignUpCartTitles() {
    if (this.isBn) {
      return {
        title: "দশে মিলে করি কাজ, হারি জিতি নাহি লাজ",
      };
    } else {
      return {
        title: "Two heads are better than one. We stand or fall together.",
      };
    }
  }
  getComityHeadLine() {
    return this.isBn ? "কমিটির তথ্য" : "Comity Information";
  }
  createCommitteeValues() {
    if (this.isBn) {
      return {
        name: "কমিটির নাম",
        required: "বাধ্যতা মূলক",
        highest30: "সর্বচ্চ ৩০ অক্ষর",
        highest50: "সর্বচ্চ ৫০ অক্ষর",
        notRequired: "বাধ্যতা মূলক নয়",
        mobile: "মোবাইল",
        write: "লিখুন",
        select: "বাছাই করুন",
        address: "ঠিকানা",
        division: "ভিভাগ",
        district: "জেলা",
        thana: "থানা",
        next: "পরবর্তী",
        highest1000: "সর্বচ্চ ১০০০ অক্ষর",
        about: "কমিটি সম্পর্কে",
        confirm: "নিশ্চিত করুন",
        text1: "আমি সকল",
        text2: "নীতিমালার",
        text3: "বিষয়ে সম্মতি দিলাম",
        gender: "লিঙ্গ",
      };
    } else {
      return {
        name: "Comity Name",
        required: "Require",
        highest30: "Maxi. 30 Cha.",
        highest50: "Maxi. 50 Cha.",
        notRequired: "Optional",
        mobile: "Mobile",
        write: "Type here",
        select: "Choose",
        address: "Address",
        division: "Division",
        district: "District",
        thana: "Thana",
        next: "Next",
        highest1000: "Maxi. 1000 Cha.",
        about: "About Comity",
        confirm: "Confirm",
        text1: " agree to all",
        text2: "terms and conditions",
        text3: "",
        gender: "Gender",
      };
    }
  }
  getEditProfileHeadLine() {
    return this.isBn ? "Address" : "Address";
  }
  getSearch() {
    return this.isBn ? "খুঁজুন" : "Search";
  }
  getCommitteeList() {
    return this.isBn ? "কমিটি লিস্ট" : "Comity List";
  }
  createComityText() {
    return this.isBn ? "একটি কমিটি গঠন করুন " : "Create a comity";
  }
  noComityFound() {
    return this.isBn
      ? "আপনি এখন পর্যন্ত নিজের কোন কমিটি গঠন করেননি "
      : "You have not created your own comity";
  }
  getHeadLines() {
    if (this.isBn) {
      return {
        totalMember: "সর্বমোট সদস্য",
        private: "প্রাইভেট",
        specialMember: "বিশেষ বেক্তি",
        presentBalance: "বর্তমান ব্যাল্যান্স",
        notice: "নোটিশ",
        aboutComity: "কমিটি সম্পর্কে",
        public: "পাবলিক",
        importantMessage: "",
      };
    } else {
      return {
        totalMember: "Total Member",
        private: "Private",
        specialMember: "Special Member",
        presentBalance: "Present Balance",
        notice: "Notice",
        aboutComity: "About Comity",
        public: "Public",
        importantMessage: "Important message",
      };
    }
  }
  getDashboardHeadlines() {
    if (this.isBn) {
      return {
        _currentBalance: "বর্তমান ব্যালেন্স",
        _collection: "কালেকশন",
        _expenses: "খরচ",
        _latestCollection: "সর্বশেষ কালেকশন",
        _latestExpenses: "সর্বশেষ খরচ",
        _messageCollection: "এখন পর্যন্ত কোন কালেকশন যোগ করা হয়নি",
        _messageExpenses: "এখন পর্যন্ত কোন খরচ যোগ করা হয়নি",
        _more: "আরও দেখুন",
        _settings: "সেটিং",
        _chooseDate: "অথবা যেদিন থেকে খরচ দেখতে চান সেইদিনের তারিখ সেট করুন",
        _ok: "নিশ্চিত করুন",
        _chooseDateHeadline: "তারিখ নির্বাচন করুন",
        _choose: "পছন্দ করুন",
        _last7: "সর্বশেষ ৭ দিনের কালেকশন",
        _last15: "সর্বশেষ ১৫ দিনের কালেকশন",
        _last30: "সর্বশেষ ৩০ দিনের কালেকশন",
        _last3: "সর্বশেষ ৩ মাসের কালেকশন",
        _last6: "সর্বশেষ ৬ মাসের কালেকশন",
        _last1: "সর্বশেষ ১ বছরের কালেকশন",
        _allCollection:"সকল কালেকশন",
        _allExpenses:"সকল খরচ",
        _placeholder:"নাম,তারিখ অথবা টাকার সংখ্যা"
      };
    } else {
      return {
        _currentBalance: "Current Balance",
        _collection: "Collection",
        _expenses: "Expenses",
        _latestCollection: "Latest Collection",
        _latestExpenses: "Latest Expenses",
        _messageCollection: "No collection has added yet",
        _messageExpenses: "No expense has added yet",
        _more: "See More",
        _settings: "Settings",
        _chooseDate: "Or set the date from which you want to view expenses",
        _ok: "Ok",
        _chooseDateHeadline: "Select Date",
        _choose: "Choose",
        _last7: "Last 7 days collection",
        _last15: "Last 15 days collection",
        _last30: "Last 30 days collection",
        _last3: "Last 3 months collection",
        _last6: "Last 6 months collection",
        _last1: "Last 1 years collection",
        _allCollection:"All Collection",
        _allExpenses:"All Expenses",
        _placeholder:"Name, Date Or Amount"
      };
    }
  }
}
