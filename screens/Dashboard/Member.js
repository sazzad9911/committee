import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { deletes, get, post } from "../../apis/multipleApi";
import MemberCard from "../../components/cart/MemberCard";
import SheetCard from "../../components/cart/SheetCard";
import Button from "../../components/main/Button";
import FloatingButton from "../../components/main/FloatingButton";
import Input from "../../components/main/Input";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import BottomShitLayout from "../../layouts/BottomShitLayout";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import mainStyle from "../../styles/mainStyle";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
const { width, height } = Dimensions.get("window");

export default function Member({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const inset = useSafeAreaInsets();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroudColor = colors.getBackgroundColor();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const comityListText = values.getHeadLines();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const dispatch = useDispatch();
  const [allMember, setAllMember] = useState();
  const [sortedMember, setSortedMember] = useState();
  const [searchIp, setSearch] = useState("");
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["80%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex && setIndex(index);
  }, []);

  const [filterData, setFilterData] = useState([
    "All Member",
    "Special Member",
    "General Member",
    "Only Female",
    "Only Male",
    "Within 1-20 years",
    "Within 21-40 years",
    "Within 41-60 years",
    "Within 61-80 years",
  ]);
  const [choose, setChoose] = useState();

  useEffect(() => {
    !allMember && dispatch(loader.show());
    getMember();
  }, [isFocused]);
  const getMember = async () => {
    const res = await get(`/member/get-all/${comity.id}`, user.token);
    setAllMember(res.data.members);
    dispatch(loader.hide());
  };
  useEffect(() => {
    if (allMember && searchIp) {
      dispatch(loader.hide());
      setSortedMember(
        allMember.filter(
          (member) =>
            member.name?.toUpperCase().includes(searchIp?.toUpperCase()) ||
            member?.user?.name?.toUpperCase().includes(searchIp?.toUpperCase())
        )
      );
    } else {
      setSortedMember(allMember);
    }
  }, [allMember, searchIp]);

  const Bottom = ({ filterData, onChoose, value }) => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <Text
          style={[
            mainStyle.level,
            { color: colors.getTextColor(), textAlign: "center" },
          ]}>
          {headlines._choose}
        </Text>
        <View style={{ height: 24 }} />

        {filterData?.map((doc, i) => (
          <SheetCard
            select={doc === value ? true : false}
            title={doc}
            key={i}
            onPress={()=>onChoose(doc)}
          />
        ))}
      </View>
    );
  };

  return (
    <HidableHeaderLayout
      header={
        <Header
          number={allMember ? allMember.length : "0"}
          searchIp={searchIp}
          setSearch={setSearch}
          setIndex={setIndex}
        />
      }
      component={
        <View>
          {sortedMember?.map((doc, i) => (
            <MemberCard
              //onPress={() => navigation?.navigate("AddMember")}
              onPress={() => navigation?.navigate("UserProfile", { data: doc })}
              onAdd={async () => {
                if (doc.status === "Accepted") {
                  dispatch(loader.show());
                  //console.log(doc);
                  try {
                    const res = await post(
                      "/chat/conversation/create",
                      {
                        userId: doc.userId,
                        comityId: comity.id,
                      },
                      user.token
                    );
                    navigation.navigate("ChatScreen", {
                      conversationId: res.data.conversation.id,
                      data: res.data.conversation,
                    });
                    dispatch(loader.hide());
                  } catch (e) {
                    console.error(e.message);
                    dispatch(loader.hide());
                    dispatch(toast.error("Error loading"));
                  }
                  return;
                }
                dispatch(loader.show());
                try {
                  await deletes(`/member/delete/${doc.id}`, user.token);
                  dispatch(loader.hide());
                  dispatch(toast.success("Member deleted"));
                  getMember();
                } catch (e) {
                  dispatch(loader.hide());
                  dispatch(toast.error("Request failed"));
                  console.error(e);
                }
              }}
              requested={doc.status === "Pending" ? true : false}
              accepted={doc.status === "Accepted" ? true : false}
              key={i}
              offline={doc.userId ? false : true}
              name={doc.name || doc.user?.name}
              url={doc.profilePhoto || doc.user?.profilePhoto}
              borderColor={colors.getShadowColor()}
              backgroundColor={colors.getBackgroundColor()}
              textColor={colors.getTextColor()}
            />
          ))}
          {sortedMember?.length == 0 && (
            <NoOption title={isBn?"এখন পর্যন্ত কোন সদস্য এড করা হয়নি":"No members added"} subTitle={isBn?"বাটন এ ক্লিক করে সদস্য এড করুন":"Add member by clicking the button"} />
          )}
        </View>
      }
      bottom={
        <>
          <FloatingButton
            icon={plus}
            onPress={() => navigation.navigate("SelectMemberType")}
          />
          {index != -1 && (
            <View
              style={{
                flex: 1,
                position: "absolute",
                backgroundColor: colors.getSchemeColor(),
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                opacity: 0.1,
              }}></View>
          )}
          <BottomSheet
            handleIndicatorStyle={{ backgroundColor: colors.getBorderColor() }}
            ref={bottomSheetRef}
            index={index}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: colors.getSchemeColor() }}
            onChange={handleSheetChanges}>
            <BottomSheetScrollView
              contentContainerStyle={{
                backgroundColor: colors.getSchemeColor(),
              }}
              style={{ flex: 1 }}>
              <Bottom
                value={choose}
                onChoose={setChoose}
                filterData={filterData}
              />
            </BottomSheetScrollView>
            <Button
              active={true}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
              style={{
                marginBottom: 30,
                marginTop: 20,
                backgroundColor: "#4ADE80",
                marginHorizontal: 8,
                color: "white",
              }}
              title={"Done"}
            />
          </BottomSheet>
        </>
      }
    />
  );
}
const Header = ({ searchIp, setSearch, number, setIndex }) => {
  const ac = ["#1488CC", "#2B32B2"];
  const dc = ["#000", "#000"];
  const isDark = useSelector((state) => state.isDark);
  const inset = useSafeAreaInsets();
  const colors = new AppColors(isDark);
  const textColor = colors.getTextColor();
  const backgroudColor = colors.getBackgroundColor();
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const searchText = values.getSearch();
  const comityListText = values.getHeadLines();
  const comity = useSelector((state) => state.comity);

  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  const filter = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.14272 0C2.67195 0 3.19921 0 3.72844 0C3.73043 4.81762 3.72646 9.63524 3.73043 14.4529C4.07334 14.0541 4.41625 13.6577 4.7552 13.2566C5.13181 13.6878 5.50446 14.1236 5.87314 14.5641C4.89594 15.7117 3.91675 16.857 2.93756 18C1.96036 16.8524 0.977205 15.7094 0 14.5618C0.370664 14.126 0.74331 13.6901 1.11794 13.2566C1.45689 13.653 1.7998 14.0495 2.14073 14.4459C2.1447 9.6306 2.14073 4.8153 2.14272 0Z" fill="white"/>
  <path d="M6.89844 0C10.5991 0 14.2978 0 17.9985 0C17.9985 0.619011 17.9985 1.2357 17.9985 1.85471C14.2978 1.85471 10.5991 1.85471 6.89844 1.85471C6.89844 1.2357 6.89844 0.619011 6.89844 0Z" fill="white"/>
  <path d="M6.89844 4.63672C9.80627 4.63672 12.7121 4.63672 15.6199 4.63672C15.6199 5.25573 15.6199 5.87242 15.6199 6.49143C12.7121 6.49143 9.80627 6.49143 6.89844 6.49143C6.89844 5.87242 6.89844 5.25573 6.89844 4.63672Z" fill="white"/>
  <path d="M6.89844 9.27344C9.0134 9.27344 11.1264 9.27344 13.2414 9.27344C13.2414 9.89245 13.2414 10.5091 13.2414 11.1282C11.1264 11.1282 9.0134 11.1282 6.89844 11.1282C6.89844 10.5091 6.89844 9.89245 6.89844 9.27344Z" fill="white"/>
  <path d="M6.89844 13.9102C8.22054 13.9102 9.54066 13.9102 10.8628 13.9102C10.8628 14.5292 10.8628 15.1459 10.8628 15.7649C9.54066 15.7649 8.22054 15.7649 6.89844 15.7649C6.89844 15.1459 6.89844 14.5292 6.89844 13.9102Z" fill="white"/>
  </svg>
  `;
  return (
    <LinearGradient
      // Button Linear Gradient
      style={[
        {
          paddingHorizontal: 20,
          paddingTop: 20 + inset?.top,
          paddingBottom: 17,
        },
      ]}
      start={{ x: 0.2, y: 0 }}
      colors={!isDark ? ac : dc}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
        <Text
          style={{
            color: "#B0B0B0",
            fontSize: 16,
            fontWeight: "500",
          }}>
          {comityListText.totalMember}
          {"   "}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#fff",
            }}>
            {number}
          </Text>
        </Text>
        <Pressable onPress={() => setIndex(0)}>
          <SvgXml xml={filter} />
        </Pressable>
      </View>
      <Input
        value={searchIp}
        onChange={setSearch}
        leftIcon={<SvgXml xml={search} />}
        containerStyle={[
          {
            borderRadius: 30,
            paddingHorizontal: 15,
            minHeight: 40,
            borderWidth: 0,
          },
          mainStyle.mt12,
        ]}
        placeholder={searchText}
      />
    </LinearGradient>
  );
};

const plus = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="22" fill="url(#paint0_linear_113_3424)"/>
<path d="M19.8669 12.7485C20.7515 12.584 21.6653 12.6946 22.4851 13.0655C23.3049 13.4365 23.9913 14.0498 24.4517 14.8229C24.9121 15.596 25.1245 16.4916 25.0601 17.3891C24.9957 18.2866 24.6577 19.1428 24.0916 19.8423C23.5256 20.5417 22.7587 21.0508 21.8944 21.3009C21.03 21.551 20.1098 21.5301 19.2577 21.241C18.4056 20.9519 17.6626 20.4085 17.1289 19.6841C16.5952 18.9596 16.2964 18.089 16.2729 17.1895C16.2467 16.143 16.594 15.1213 17.2525 14.3075C17.9111 13.4938 18.8379 12.9411 19.8669 12.7485ZM19.8959 14.0065C19.2772 14.1639 18.7207 14.505 18.2996 14.9848C17.8785 15.4646 17.6126 16.0606 17.5368 16.6945C17.461 17.3284 17.5789 17.9703 17.8749 18.5359C18.171 19.1015 18.6314 19.5641 19.1955 19.863C19.7595 20.1619 20.4009 20.283 21.0351 20.2103C21.6694 20.1377 22.2667 19.8747 22.7486 19.456C23.2305 19.0373 23.5743 18.4825 23.7349 17.8646C23.8954 17.2468 23.865 16.5948 23.6479 15.9945C23.3792 15.2577 22.8469 14.6467 22.1539 14.2795C21.4609 13.9123 20.6564 13.815 19.8959 14.0065Z" fill="white"/>
<path d="M28.45 17.5715C28.502 17.4573 28.5879 17.3619 28.6961 17.2983C28.8042 17.2347 28.9293 17.2058 29.0544 17.2158C29.1794 17.2257 29.2984 17.2739 29.3951 17.3538C29.4919 17.4338 29.5616 17.5415 29.595 17.6625C29.6442 18.2678 29.6556 18.8757 29.629 19.4825C30.2267 19.4572 30.8255 19.4676 31.422 19.5135C31.634 19.5415 31.745 19.7615 31.903 19.8835V20.2835C31.768 20.4495 31.624 20.6515 31.403 20.6835C30.814 20.7261 30.223 20.7354 29.633 20.7115C29.6641 21.3374 29.6488 21.9648 29.587 22.5885C29.5407 22.7068 29.4587 22.8078 29.3523 22.8773C29.246 22.9469 29.1206 22.9815 28.9936 22.9765C28.8666 22.9714 28.7444 22.9269 28.6439 22.8491C28.5434 22.7713 28.4697 22.6641 28.433 22.5425C28.3833 21.9334 28.3723 21.3219 28.4 20.7115C27.7815 20.7395 27.1618 20.7265 26.545 20.6725C26.4278 20.6319 26.3256 20.5568 26.252 20.4571C26.1783 20.3573 26.1365 20.2376 26.1322 20.1137C26.1279 19.9898 26.1612 19.8674 26.2277 19.7628C26.2943 19.6582 26.3909 19.5761 26.505 19.5275C27.1359 19.4599 27.7713 19.4429 28.405 19.4765C28.3661 18.8413 28.3811 18.2041 28.45 17.5715Z" fill="white"/>
<path d="M14.4527 24.7943C15.6293 23.5494 17.1522 22.6859 18.8246 22.3155C20.497 21.945 22.2421 22.0846 23.8344 22.7162C25.4267 23.3478 26.793 24.4424 27.7567 25.8586C28.7204 27.2747 29.2374 28.9473 29.2407 30.6603C29.2837 31.1543 28.7577 31.3603 28.3407 31.3153C23.5407 31.3153 18.7407 31.3153 13.9407 31.3153C13.3187 31.2953 12.5977 31.4573 12.0977 30.9643V30.4393C12.1652 28.3328 13.0031 26.3243 14.4527 24.7943ZM15.7167 25.2943C14.3646 26.5421 13.5225 28.2463 13.3527 30.0783C18.2327 30.0783 23.114 30.0783 27.9967 30.0783C27.8845 28.9288 27.5125 27.8198 26.9087 26.8353C26.3414 25.9169 25.5783 25.1352 24.6739 24.546C23.7694 23.9568 22.746 23.5747 21.6767 23.427C20.6074 23.2793 19.5187 23.3696 18.4884 23.6915C17.4581 24.0135 16.5116 24.5591 15.7167 25.2893V25.2943Z" fill="white"/>
<path d="M19.8963 14.0067C20.5436 13.8421 21.2264 13.8867 21.8468 14.134C22.4672 14.3813 22.9935 14.8186 23.3501 15.3833C23.7067 15.948 23.8754 16.6112 23.832 17.2776C23.7886 17.9441 23.5354 18.5798 23.1086 19.0935C22.6818 19.6072 22.1033 19.9726 21.456 20.1374C20.8088 20.3022 20.126 20.2578 19.5055 20.0107C18.885 19.7636 18.3586 19.3265 18.0018 18.7619C17.645 18.1973 17.4761 17.5342 17.5193 16.8677C17.5648 16.2016 17.8189 15.5667 18.2455 15.0531C18.6722 14.5396 19.2498 14.1734 19.8963 14.0067Z" fill="white"/>
<path d="M15.7165 25.2885C16.5112 24.5581 17.4573 24.0122 18.4874 23.6899C19.5175 23.3675 20.6061 23.2767 21.6754 23.424C22.7446 23.5712 23.7682 23.9528 24.6728 24.5415C25.5775 25.1302 26.3409 25.9115 26.9085 26.8295C27.5124 27.8141 27.8844 28.923 27.9965 30.0725C23.1145 30.0725 18.2332 30.0725 13.3525 30.0725C13.5223 28.2406 14.3645 26.5363 15.7165 25.2885Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_113_3424" x1="0" y1="22" x2="44" y2="22" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>
`;
