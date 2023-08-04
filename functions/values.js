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
        _allCollection: "সকল কালেকশন",
        _allExpenses: "সকল খরচ",
        _placeholder: "নাম,তারিখ অথবা টাকার সংখ্যা",
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
        _allCollection: "All Collection",
        _allExpenses: "All Expenses",
        _placeholder: "Name, Date Or Amount",
      };
    }
  }
  getNoticeHeadLines() {
    if (this.isBn) {
      return {
        totalNotice: "সর্বমোট নোটিশ",
        onlyMembers: "শুধু সদস্য",
        search: "সদস্য খুঁজুন",
        notice: "নোটিশ",
        delete: "নোটিশটি চিরতরে মুছে ফেলুন",
        subject: "বিষয়",
        details: "বিবরণ",
        publish: "প্রকাশিত করুন",
      };
    } else {
      return {
        totalNotice: "Total Notice",
        onlyMembers: "Members Oly",
        search: "Search members",
        notice: "Notice",
        delete: "Delete Permanantly",
        subject: "Subject",
        details: "Details",
        publish: "Publish",
      };
    }
  }
  getValues() {
    return this.isBn
      ? {
          write: "লিখুন",
          inbox:"ইনবক্স",
          memberList:"সদস্য তালিকা",
          done:"সম্পন্ন",
          comityList:"কমিটি তালিকা",
          _paid:"পরিশোধ",
          _unPaid:"অপরিশোধ",
          _nameDateTaka:"নাম,তারিখ অথবা টাকার সংখ্যা",
          _allSubscription:"সকল চাঁদা",
          _details:"বিস্তারিত",
          _aboutSubscription:"চাঁদার সম্পর্কে",
          _subscriptionName:"চাঁদার নাম লিখুন",
          _required:"বাধ্যতা মূলক",
          _max20:"সর্বচ্চ ২০ অক্ষর",
          _ok:"নিশ্চিত করুন",
          _placeholder1:"উদাহরণ: বেতন, এলাকার উন্নয়ন ইত্যাদি",
          _placeholder2:"উদাহরণ: ১০০০০৳,২০০০০৳",
          _ammoutSubs:"পরিমাণের লক্ষ",
          _positionAndQualification:'ভূমিকা এবং শ্রেণী',
          _position:"ভূমিকা",
          _selectAmembershipPlan:"একটি সদস্য শ্রেণী পছন্দ করুন",
          _requestForMember:"সদস্যে এড হওয়ার জন্য অনুরুধ করুন",
          _generalMember:"সাধারণ সদস্য",
          _specialMember:"বিশেষ সদস্য",
          _allMember:"সকল সদস্য",
          _selectProvider:"দাতা নির্বাচন করুন",
          _selectPayee:"পরিশোধ দাতা নির্বাচন করুন",
          _addFromComity:"সমাজ ব্যবহারকারিদের থেকে এড করুন",
          _createMemberOwn:"নিজ থেকে একজন সদস্য তৈরি করুন",
          _memberInfo:"বেক্তির তথ্য",
          _name:"নাম",
          _max30:"সর্বচ্চ ৩০ অক্ষর",
          _geder:"লিঙ্গ",
          _male:"পুরুষ",
          _female:"মহিলা",
          _other:"অন্যকিছু",
          _age:"বয়স",
          _mobile:"মোবাইল",
          _max11:"সর্বচ্চ ১১ ডিজিট",
          _email:"ইমেইল",
          _address:"ঠিকানা",
          _max50:"সর্বচ্চ ৫০  অক্ষর",
          _positionPlaceholder:"উদাহরণ:সাধারণ সদস্য,মেম্বর, সভাপতি ইত্যাদি",
          _notRequired:"বাধ্যতা মূলক নয়"
        }
      : {
          write: "Write",
          inbox:"Inbox",
          memberList:"Member List",
          done:"Done",
          comityList:"Comity List",
          _paid:"Paid",
          _unPaid:"Unpaid",
          _nameDateTaka:"Name, date or Amout",
          _allSubscription:"All Subscription",
          _details:"Details",
          _aboutSubscription:"About Subscription",
          _subscriptionName:"Write Subscription Name",
          _required:"required",
          _max20:"Max 20 character",
          _placeholder1:"Example:Salary, Developmemt etc",
          _placeholder2:"Example:1000, 2000",
          _ammoutSubs:"Amounnt",
          _positionAndQualification:'Position and Qualification',
          _position:"Position",
          _selectAmembershipPlan:"Choose a member category",
          _requestForMember:"Request for being member",
          _generalMember:"General Member",
          _specialMember:"Special Member",
          _allMember:"All Member",
          _selectProvider:"Select Provider",
          _selectPayee:"Select Payee",
          _addFromComity:"Add from Comity",
          _createMemberOwn:"Create Member Own",
          _memberInfo:"Member Info",
          _name:"Name",
          _max30:"Max 30 character",
          _geder:"Geder",
          _male:"Male",
          _female:"Female",
          _other:"Other",
          _age:"Age",
          _mobile:"Mobile",
          _max11:"Max 11 digit",
          _email:"Email",
          _address:"Address",
          _max50:"Max 50 character",
          _positionPlaceholder:"Example:General Member,Member, Chairman E.T.C",
          _notRequired:"Not Required"
        };
  }
}
