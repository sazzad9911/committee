export class AppValues {
  constructor(isBn) {
    this.isBn = isBn;
  }
  getAppName() {
    return this.isBn ? "কমিটি" : "Comity";
  }
  getUserBottomBarName() {
    if (this.isBn) {
      return [
        "হোম",
        "পেমেন্ট",
        "ইনবক্স",
        "প্রোফাইল",
        "সদস্য",
        "ডেশবোর্ড",
        "নোটিফিকেশন",
      ];
    } else {
      return [
        "Home",
        "Payment",
        "Inbox",
        "Profile",
        "Member",
        "Dashboard",
        "Notification",
      ];
    }
  }
  getLanguageHeadline() {
    if (this.isBn) {
      return "ভাষা পরিবর্তন করুন";
    } else {
      return "Change Language";
    }
  }
  getSignUpCartTitles() {
    if (this.isBn) {
      return {
        title: "বিজনেস অ্যাকাউন্ট খুলে কমিটি পরিচালনা করুন",
      };
    } else {
      return {
        title: "Open a business account and manage your comity",
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
        highest30: "সর্বোচ্চ ৩০ অক্ষর",
        highest50: "সর্বোচ্চ ৫০ অক্ষর",
        notRequired: "বাধ্যতা মূলক নয়",
        mobile: "মোবাইল",
        write: "লিখুন",
        select: "বাছাই করুন",
        address: "ঠিকানা",
        division: "বিভাগ",
        district: "জেলা",
        thana: "থানা",
        next: "পরবর্তী",
        highest1000: "সর্বোচ্চ ১০০০ অক্ষর",
        about: "কমিটি সম্পর্কে",
        confirm: "নিশ্চিত করুন",
        text1: "আমি সকল",
        text2: "নীতিমালার",
        text3: "বিষয়ে সম্মতি দিলাম",
        gender: "লিঙ্গ",

        email: "ই-মেইল",
        legalText: "আপনার অধিকার, আমাদের আইনি কর্তব্য!",
        comity: "কমিটি",
        support: "সহায়তা",
        contactUs: "যোগাযোগ করুন",
        logout: "লগ আউট",
        darkMode: "ডার্ক মোড",
        lightMode: "লাইট মোড",
        deleteComity: "কমিটি অ্যাকাউন্ট ডিলিট করুন",
      };
    } else {
      return {
        name: "Comity Name",
        required: "Required",
        highest30: "Max. 30 Cha.",
        highest50: "Max. 50 Cha.",
        notRequired: "Optional",
        mobile: "Mobile",
        write: "Type here",
        select: "Choose",
        address: "Address",
        division: "Division",
        district: "District",
        thana: "Thana",
        next: "Next",
        highest1000: "Max. 1000 Cha.",
        about: "About Comity",
        confirm: "Confirm",
        text1: " agree to all",
        text2: "terms and conditions",
        text3: "",
        gender: "Gender",

        email: "E-mail",
        legalText: "Your rights, our legal duty!",
        comity: "Comity",
        support: "Support",
        contactUs: "Contact Us",
        logout: "Log Out",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        deleteComity: "Delete comity Account",
      };
    }
  }
  getEditProfileHeadLine() {
    return this.isBn ? "সংশোধন" : "Edit";
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
        specialMember: "বিশেষ ব্যাক্তি",
        presentBalance: "বর্তমান ব্যালেন্স",
        notice: "নোটিশ",
        aboutComity: "কমিটি সম্পর্কে",
        public: "পাবলিক",
        importantMessage: "",
        logOut: "লগ আউট",
        membersOnly: "শুধু মেম্বার",
        notification: "নোটিফিকেশন",
        accountSettings: "অ্যাকাউন্ট সেটিং",
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
        logOut: "Log Out",
        membersOnly: "Members Only",
        notification: "Notification",
        accountSettings: "Account Settings",
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
        _choose: "পছন্দ করুন",
        _deleteConfirmation: "মুছে ফেলা",
        _importantMessage: "গুরুত্বপূর্ণ টিপস",
        _delete: "মুছে ফেলা",
        _totalBalance: "সর্বমোট খরচ",
      };
    } else {
      return {
        _currentBalance: "Current Balance",
        _collection: "Collection",
        _expenses: "Expenses",
        _totalBalance: "Total Expenses",
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
        _choose: "Choose",
        _deleteConfirmation: "Cancel Confirmation",
        _importantMessage: "Important Message",
        _delete: "Delete",
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
          inbox: "ইনবক্স",
          memberList: "সদস্য তালিকা",
          done: "সম্পন্ন",
          comityList: "কমিটি তালিকা",
          _paid: "পরিশোধ",
          _unPaid: "অপরিশোধ",
          _nameDateTaka: "নাম,তারিখ অথবা টাকার সংখ্যা",
          _allSubscription: "সকল পেমেন্ট",
          _details: "বিস্তারিত",
          _aboutSubscription: "পেমেন্ট সম্পর্কে",
          _subscriptionName: "পেমেন্টের নাম লিখুন",
          _required: "বাধ্যতা মূলক",
          _max20: "সর্বোচ্চ ২০ অক্ষর",
          _ok: "নিশ্চিত করুন",
          _placeholder1: "উদাহরণ: বেতন, ভাড়া, এলাকার উন্নয়ন ইত্যাদি",
          _placeholder2: "উদাহরণ: ১০০০০৳,২০০০০৳",
          _ammoutSubs: "পরিমাণের লক্ষ",
          _positionAndQualification: "ভূমিকা এবং শ্রেণী",
          _position: "ভূমিকা",
          _selectAmembershipPlan: "একটি সদস্য শ্রেণী পছন্দ করুন",
          _requestForMember: "সদস্যে এড হওয়ার জন্য অনুরুধ করুন",
          _generalMember: "সাধারণ সদস্য",
          _specialMember: "বিশেষ সদস্য",
          _allMember: "সকল সদস্য",
          _selectProvider: "দাতা নির্বাচন করুন",
          _selectPayee: "পরিশোধ দাতা নির্বাচন করুন",
          _addFromComity: "বর্তমান সদস্য লিস্ট থেকে নির্বাচন করুন",
          _addFromComityAlt: "কমিটি ব্যবহারকারিদের থেকে এড করুন",
          _createMemberOwn: "নতুন দাতা তৈরি করুন",
          _memberInfo: "ব্যাক্তির তথ্য",
          _name: "নাম",
          _max30: "সর্বোচ্চ ৩০ অক্ষর",
          _geder: "লিঙ্গ",
          _male: "পুরুষ",
          _female: "মহিলা",
          _other: "অন্যকিছু",
          _age: "বয়স",
          _mobile: "মোবাইল",
          _max11: "সর্বোচ্চ ১১ ডিজিট",
          _email: "ইমেইল",
          _address: "ঠিকানা",
          _max50: "সর্বোচ্চ ৫০  অক্ষর",
          _positionPlaceholder: "উদাহরণ:সাধারণ সদস্য,মেম্বর, সভাপতি ইত্যাদি",
          _notRequired: "বাধ্যতা মূলক নয়",
          _account: "নিশ্চিতকরণ",
          _deleteCofirmation:
            "আপনি এখান থেকে এই অ্যাকাউন্টটি ডিলিট করতে চান কিনা তা নিশ্চিত করুন",
          _support: "সাপোর্ট",
          _supportCaution:
            "সংবেদনশীল তথ্য শেয়ার করবেন না। যেমন,  আপনার ক্রেডিট কার্ডের বিবরণ বা ব্যক্তিগত আইডি নম্বর",
          _subject: "বিষয়",
          _details: "বিবরণ",
          _canncel: "বাতিল করুন",
          _send: "পাঠান",
          _select: "নির্বাচন করুন",
          _contact: "যোগাযোগ",
          _yourMessage: "আপনার মেসেজ",
          _max1000: "সর্বোচ্চ ১০০০ অক্ষর",
          _officeLocation: "অফিস লোকেশন",
          _location: "এসএস এস \nরোড, রূপালী,বন্দর, নারায়ণগঞ্জ, ঢাকা, বাংলাদেশ",
          _googleMap: "গুগল ম্যাপে দেখুন",
          _successfulMessage: "রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে",
          _infoMessage:
            "আমাদের সাথে যোগাযোগ করার জন্য আপনাকে ধন্যবাদ৷।আমাদের টিম আপনার ম্যাসেজটি রিভিউ করছে এবং যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করবে৷।",
          _completed: "সম্পূর্ন",
          _incomplete: "অসম্পূর্ন",
          _amount: "পরিমাণ",
          _deleteSubscription: "পেমেন্টটি সম্পূর্ণ ভাবে মুছে ফেলুন",
          _subsDeleteMessage:
            "পেমেন্টটি সম্পুর্ন ভাবে মুছে ফেলেতে চাইলে নিশ্চিত করুন",
          _subsMemberDeleteMessage:
            "সদস্যের লিস্ট থেকে পেমেন্টটি মুছে ফেলার জন্য নিশ্চিত করুন",
          _seeProfile: "প্রোফাইল দেখুন",
          _deleteThisAccount: "এই অ্যাকাউন্টটি ডিলিট করুন",
          _addHisComityAccount: "তার কমিটি একাউন্টটি এখানে যোগ করুন",
          _deleteOnly: "শুধুমাত্র সদস্য মুছে ফেলুন",
          _memberAndCollectionDelete: "সদস্য এবং সমস্ত কালেকশন ডিলিট করুন",
          _exampleGeneral: "উদাহরণ:সাধারণ সদস্য,মেম্বর, সভাপতি ইত্যাদি",
          _accept: "গ্রহণ করুন",
          _decline: "প্রত্যাখ্যান করুন",
          _notiReqMsg: "আপনার কমিটিতে যোগদানের জন্য অনুরোধ করেছেন।",
          _positionAndCategory: "ভূমিকা এবং শ্রেণী",
          _selectTheDate: "তারিখ বাছাই করুন",
          _totalBalance: "সর্বমোট খরচ",
          _positionAndCategoryText: `কমিটির মধ্যে সদস্যদের অবস্থান উল্লেখ করুন৷ আপনি আপনার কমিটির কাঠামোর উপর ভিত্তি করে যেকোন পদ, যেমন 'সাধারণ সদস্য' বা অন্যান্য উপযুক্ত ভূমিকা প্রদান করতে পারেন৷।

          সদস্য বিভাগ নির্বাচন করুন:
              - 'সাধারণ সদস্য': এই বিকল্পটি সদস্যকে একটি নিয়মিত কমিটির সদস্য হিসেবে নির্বাচিত করে৷।
              - 'বিশেষ সদস্য': এই বিকল্পটি বেছে নিন যদি কমিটির মধ্যে সদস্যের একটি নির্দিষ্ট ভূমিকা থাকে, যেমন ম্যানেজার বা নেতা৷।
          
          এই বিশদ বিবরণ প্রদান করে, আপনি নিশ্চিত করেন যে নতুন সদস্যের ভূমিকা এবং ধরন সঠিকভাবে কমিটির মধ্যে সংজ্ঞায়িত করা হয়েছে, আপনার কমিটির পরিচালনা প্রক্রিয়াকে সহজসাধ্য করে`,
          allMessage: "সব বার্তা",
        }
      : {
          write: "Write",
          inbox: "Inbox",
          memberList: "Member List",
          done: "Done",
          comityList: "Comity List",
          _paid: "Paid",
          _unPaid: "Unpaid",
          _totalBalance: "Total Balance",
          _nameDateTaka: "Name, date or Amount",
          _allSubscription: "All Payments",
          _details: "Details",
          _aboutSubscription: "Payment details",
          _subscriptionName: "Payment Name",
          _required: "required",
          _max20: "Max 20 cha.",
          _placeholder1: "Example:Salary, Rent, Developmemt etc",
          _placeholder2: "Example:1000, 2000",
          _ammoutSubs: "Target Amount",
          _positionAndQualification: "Position and Category",
          _position: "Position",
          _selectAmembershipPlan: "Choose a member category",
          _requestForMember: "Request to become a member",
          _generalMember: "General Member",
          _specialMember: "Special Member",
          _allMember: "All Member",
          _selectProvider: "Paying member",
          _selectPayee: "Select Paying member",
          _addFromComity: "Choose From Member list",
          _addFromComityAlt: "Add From Comity Users",
          _createMemberOwn: "Create a new Member",
          _memberInfo: "Member Info",
          _name: "Name",
          _max30: "Max 30 character",
          _geder: "Geder",
          _male: "Male",
          _female: "Female",
          _other: "Other",
          _age: "Age",
          _ok: "Confirm",
          _mobile: "Mobile",
          _max11: "Max 11 digit",
          _email: "Email",
          _address: "Address",
          _max50: "Max 50 character",
          _positionPlaceholder: "Example:General Member,Member, Chairman E.T.C",
          _notRequired: "Not Required",
          _account: "Confirmation",
          _deleteCofirmation:
            "Confirm if you want to delete this account from here",
          _support: "Support",
          _supportCaution:
            "Do not share sensitive information (attachments or text).ex.Your credit card details or personal ID number",
          _subject: "Subject",
          _details: "Details",
          _canncel: "Cancel",
          _send: "Send",
          _select: "Select",
          _contact: "Contact Us",
          _yourMessage: "Your Message",
          _max1000: "Max 1000 characters",
          _officeLocation: "Office Location",
          _location: "SS S \nRoad,Rupali,Bandar,Narayanganaj,Dhaka,Bangladesh",
          _googleMap: "View in google map",
          _successfulMessage: "Request Successfully sent",
          _infoMessage:
            "Thank you for contacting us. Our team is reviewing your message and will be in touch with you as soon as possible.",
          _completed: "Completed",
          _incomplete: "Incomplete",
          _amount: "Amount",
          _deleteSubscription: "Delete this payment",
          _subsDeleteMessage:
            "Confirm if you want to delete the payment completely",
          _subsMemberDeleteMessage:
            "Confirm if you want to delete the Collection completely",
          _seeProfile: "See Profile",
          _deleteThisAccount: "Delete this account",
          _addHisComityAccount: "Add his comity account",
          _deleteOnly: "Delete member only",
          _memberAndCollectionDelete: "Delete member with all collections",
          _exampleGeneral: "Example: General ,President,VIP etc",
          _accept: "Accept",
          _decline: "Declie",
          _selectTheDate: "Select the date",
          _notiReqMsg: "Easin Arafat has requested to join your comity",
          _positionAndCategory: "Position And Category",
          _positionAndCategoryText: `Specify the member's position within the committee. You can assign any position, such as 'General Member' or other suitable roles based on your committee's structure.

          Select the member category:
             - 'General Member': This option designates the member as a regular committee member.
             - 'Special Member': Choose this option if the member holds a specific role within the committee, such as manager or leader.
          
          By providing these details, you ensure that the new member's role and type are accurately defined within the committee, streamlining your committee management process`,
          allMessage: "All message",
        };
  }
}
