import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import CollectionCart from "../../components/cart/CollectionCart";
import Input from "../../components/main/Input";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import HidableHeaderLayout from "../../layouts/HidableHeaderLayout";
import mainStyle from "../../styles/mainStyle";
import BottomShitLayout from "../../layouts/BottomShitLayout";
import SheetCard from "../../components/cart/SheetCard";
import loader from "../../data/loader";
import { get } from "../../apis/multipleApi";
import { useIsFocused } from "@react-navigation/native";
import toast from "../../data/toast";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Button from "../../components/main/Button";
import NoOption from "../../components/main/NoOption";

export default function AllCollections({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const inset = useSafeAreaInsets();
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const values = new AppValues(isBn);
  const borderColor = colors.getBorderColor();
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const getComityHeadLine = values.getComityHeadLine();
  const headlines = values.getDashboardHeadlines();

  const [data, setData] = useState();
  const [index, setIndex] = useState(-1);
  const [dateSorted, setDateSorted] = useState();
  const [sorted, setSorted] = useState(data);
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const comity = useSelector((state) => state.comity);
  const user = useSelector((state) => state.user);
  const [filterData, setFilterData] = useState(
    isBn
      ? [
          "সর্বশেষ ৭ দিনের কালেকশন",
          "সর্বশেষ ১৫ দিনের কালেকশন",
          "সর্বশেষ ৩০ দিনের কালেকশন",
          "সর্বশেষ ৩ মাসের কালেকশন",
          "সর্বশেষ ৬ মাসের কালেকশন",
          "সর্বশেষ ১ বছরের কালেকশন",
        ]
      : [
          "Last 7 days collection",
          "Last 15 days collection",
          "Last 30 days collection",
          "Last 3 months collection",
          "Last 6 months collection",
          "Last 1 years collection",
        ]
  );
  const [selected, setSelected] = useState();
  const [choose, setChoose] = useState();
  const isFocus = useIsFocused();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const handleSheetChanges = useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex && setIndex(index);
  }, []);

  const fetch = async () => {
    !data && dispatch(loader.show());
    try {
      const res = await get(
        `/subs/get-comity-collections/${comity.id}`,
        user.token
      );
      dispatch(loader.hide());
      setData(res.data.collections);
      choose
        ? setSorted(
            data.filter(
              (d) =>
                new Date(d.date) >= choose[0] && new Date(d.date) <= choose[1]
            )
          )
        : setSorted(res.data.collections);
    } catch (e) {
      dispatch(loader.hide());
      dispatch(toast.error("Error loading"));
    }
  };
  useEffect(() => {
    fetch();
  }, [isFocus, choose]);
  useEffect(() => {
    text
      ? data &&
        setSorted(
          data?.filter(
            (d) =>
              d.amount?.toString().match(text ? text : "") ||
              d.member?.name
                ?.toLowerCase()
                .match(text ? text.toLowerCase() : "") ||
              d.member?.user?.name
                ?.toLowerCase()
                .match(text ? text.toLowerCase() : "")
          )
        )
      : setSorted(data);
  }, [text]);

  const handleSorted = (value) => {
    let index = filterData.indexOf(value);
    const today = new Date();
    setSorted(
      data?.filter((d) => {
        if (index === 0) {
          return new Date(d.date) >= today.setDate(today.getDate() - 7);
        } else if (index === 1) {
          return new Date(d.date) >= today.setDate(today.getDate() - 15);
        } else if (index === 2) {
          return new Date(d.date) >= today.setDate(today.getDate() - 30);
        } else if (index === 3) {
          return new Date(d.date) >= today.setMonth(today.getMonth() - 3);
        } else if (index === 4) {
          return new Date(d.date) >= today.setMonth(today.getMonth() - 6);
        } else {
          return new Date(d.date) >= today.setFullYear(today.getFullYear() - 1);
        }
      })
    );
  };

  return (
    <HidableHeaderLayout
      header={
        <Header
          text={text}
          isDark={isDark}
          borderColor={borderColor}
          headlines={headlines}
          textColor={textColor}
          onDate={() => {
            navigation.navigate("SelectDate", {
              choose: choose,
              setChoose: setChoose,
              type: "Collection",
            });
          }}
          onSort={() => setIndex(0)}
          setText={setText}
          navigation={navigation}
        />
      }
      component={
        <Component
          text={text}
          isDark={isDark}
          textColor={textColor}
          borderColor={borderColor}
          sorted={sorted}
          navigation={navigation}
          isBn={isBn}
          choose={choose}
          selected={selected}
          onCancel={() => {
            setSelected();
            setChoose();
            setSorted(data);
          }}
        />
      }
      bottom={
        <>
          {index != -1 && (
            <View
              style={{
                flex: 1,
                position: "absolute",
                backgroundColor: colors.getSchemeColor(),
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                opacity: 0.1,
              }}
            ></View>
          )}
          <BottomSheet
            handleIndicatorStyle={{ backgroundColor: colors.getBorderColor() }}
            ref={bottomSheetRef}
            index={index ? index : 0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: colors.getSchemeColor() }}
            onChange={handleSheetChanges}
          >
            <BottomSheetScrollView
              contentContainerStyle={{
                backgroundColor: colors.getSchemeColor(),
              }}
              style={{ flex: 1 }}
            >
              <Bottom
                filterData={filterData}
                colors={colors}
                value={selected}
                onChoose={(e) => {
                  handleSorted(e);
                  setSelected(e);
                }}
                headlines={headlines}
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

const Header = ({
  color,
  style,
  text,
  setText,
  isDark,
  borderColor,
  headlines,
  textColor,
  onDate,
  onSort,
  navigation,
}) => {
  const ac = ["#1488CC", "#2B32B2"];
  const inset = useSafeAreaInsets();
  const search = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.11036 0.0408841C5.04858 0.326439 2.23492 2.29256 0.900663 5.06853C-0.124611 7.19849 -0.279105 9.62805 0.460591 11.8563C1.92126 16.2473 6.44838 18.8033 10.9849 17.7968C12.1834 17.53 13.3631 17.001 14.3088 16.3035L14.6084 16.0835L16.4858 17.956C17.5157 18.9858 18.438 19.8659 18.527 19.9127C18.7376 20.0251 19.2432 20.0298 19.4399 19.9221C19.6225 19.8238 19.8238 19.6225 19.9221 19.4399C20.0298 19.2433 20.0251 18.7377 19.9127 18.5271C19.8659 18.4381 18.9858 17.5159 17.9558 16.4861L16.0832 14.6089L16.3032 14.3093C18.2367 11.6878 18.555 8.0692 17.1225 5.09662C15.4699 1.67464 11.9259 -0.31489 8.11036 0.0408841ZM10.395 2.18489C13.1618 2.77473 15.2498 4.8766 15.8444 7.66662C15.9661 8.23305 15.9661 9.8153 15.8444 10.3677C15.5401 11.7487 14.8987 12.9377 13.9156 13.9161C12.4596 15.3766 10.5869 16.0788 8.5083 15.943C5.7555 15.7698 3.33979 13.902 2.42219 11.2478C2.14597 10.4566 2.07107 9.97447 2.07575 9.00077C2.07575 8.26113 2.09448 8.03175 2.17875 7.63385C2.46901 6.2997 3.06357 5.17152 3.98585 4.21655C4.50551 3.67352 4.95963 3.31307 5.55419 2.97134C6.27516 2.55471 7.27703 2.2083 8.08695 2.09595C8.60661 2.02573 9.87533 2.07254 10.395 2.18489Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  <path d="M8.68607 3.05098C8.41922 3.1446 8.28814 3.24759 8.14301 3.46293C8.03065 3.63145 8.0166 3.70167 8.0166 4.01999C8.0166 4.34768 8.03065 4.39917 8.15705 4.58642C8.37709 4.89538 8.61117 5.00305 9.17764 5.04518C9.73944 5.092 9.98756 5.14349 10.4136 5.30265C11.3499 5.65374 12.1786 6.43083 12.5999 7.34835C12.8153 7.81179 12.8995 8.15352 12.9557 8.76677C13.0119 9.38469 13.1196 9.63279 13.4192 9.84345C13.6018 9.96984 13.6533 9.98389 14.0044 9.98389C14.3555 9.98389 14.4117 9.96984 14.5849 9.84813C14.8799 9.64684 15.0156 9.33319 15.0156 8.86507C15.0156 8.08331 14.7675 7.07684 14.393 6.33252C14.0933 5.72864 13.7703 5.28861 13.2413 4.75963C12.2488 3.76252 11.069 3.19141 9.66453 3.03693C9.08869 2.9714 8.90143 2.97608 8.68607 3.05098Z" fill="${textColor}" fill-opacity="${
    isDark ? 1 : 0.4
  }"/>
  </svg>  
  `;
  const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 19.5L7.5 12L15 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return (
    <LinearGradient
      // Button Linear Gradient
      style={[
        {
          paddingTop: inset?.top,
          borderColor: borderColor,
          paddingHorizontal: 20,
        },
        style,
      ]}
      start={{ x: 0.2, y: 0 }}
      colors={!color ? (isDark ? ["#000", "#000"] : ac) : color}
    >
      <View style={[mainStyle.flexBox, mainStyle.mt24]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgXml xml={back} />
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: "#fff",
              marginLeft: 5,
            }}
          >
            {headlines._allCollection}
          </Text>
        </View>
        <View style={[mainStyle.flexBox]}>
          <TouchableOpacity onPress={onDate}>
            <SvgXml xml={calender} />
          </TouchableOpacity>
          <SvgXml
            style={{
              marginHorizontal: 16,
            }}
            xml={dash}
          />
          <TouchableOpacity onPress={onSort}>
            <SvgXml xml={sort} />
          </TouchableOpacity>
        </View>
      </View>
      <Input
        value={text}
        onChange={setText}
        leftIcon={<SvgXml xml={search} />}
        containerStyle={[
          {
            borderRadius: 30,
            paddingHorizontal: 15,
            minHeight: 40,
            borderWidth: 0,
            marginBottom: 24,
          },
          mainStyle.mt24,
        ]}
        placeholder={headlines._placeholder}
      />
    </LinearGradient>
  );
};

const Component = ({
  sorted,
  isDark,
  textColor,
  borderColor,
  navigation,
  isBn,
  selected,
  onCancel,
  choose,
  text,
}) => {
  return (
    <View style={{ marginVertical: 14 }}>
      <View
        style={[mainStyle.pdH20, { flexDirection: "row", marginBottom: 6 }]}
      >
        {selected ? (
          <Chip onCancel={onCancel} title={selected} />
        ) : choose ? (
          <Chip
            onCancel={onCancel}
            title={`${new Date(choose[0]).toLocaleDateString()} ${
              isBn ? "থেকে" : "To"
            } ${new Date(choose[1]).toLocaleDateString()}`}
          />
        ) : null}
      </View>
      {sorted?.map((doc, i) => (
        <CollectionCart
          key={i}
          isDark={isDark}
          textColor={textColor}
          borderColor={borderColor}
          data={doc}
        />
      ))}

      {sorted?.length === 0 && (
        <NoOption
          title={
            isBn
              ? text
                ? "খুঁজে পাওয়া যাচ্ছে না"
                : "এখন পর্যন্ত কোন কালেকশন যোগ করা হয়নি"
              : text
              ? "Not found"
              : "No collection added"
          }
        />
      )}
    </View>
  );
};
const Chip = ({ title, onCancel }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const ic = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 16C3.58698 16 0 12.413 0 8C0 3.58698 3.58698 0 8 0C12.413 0 16 3.58698 16 8C16 12.413 12.413 16 8 16ZM8 1.11628C4.20465 1.11628 1.11628 4.20465 1.11628 8C1.11628 11.7953 4.20465 14.8837 8 14.8837C11.7953 14.8837 14.8837 11.7953 14.8837 8C14.8837 4.20465 11.7953 1.11628 8 1.11628Z" fill="${colors.getTextColor()}"/>
  <path d="M5.89432 10.6644C5.75292 10.6644 5.61153 10.6123 5.4999 10.5007C5.3961 10.3956 5.33789 10.2539 5.33789 10.1063C5.33789 9.95859 5.3961 9.81688 5.4999 9.71184L9.71199 5.49975C9.92781 5.28394 10.285 5.28394 10.5008 5.49975C10.7166 5.71557 10.7166 6.07277 10.5008 6.28859L6.28874 10.5007C6.18455 10.6123 6.03572 10.6644 5.89432 10.6644Z" fill="${colors.getTextColor()}"/>
  <path d="M10.1064 10.6644C9.96502 10.6644 9.82362 10.6123 9.71199 10.5007L5.4999 6.28859C5.3961 6.18356 5.33789 6.04184 5.33789 5.89417C5.33789 5.7465 5.3961 5.60478 5.4999 5.49975C5.71572 5.28394 6.07292 5.28394 6.28874 5.49975L10.5008 9.71184C10.7166 9.92766 10.7166 10.2849 10.5008 10.5007C10.3892 10.6123 10.2478 10.6644 10.1064 10.6644Z" fill="${colors.getTextColor()}"/>
  </svg>
  `;
  return (
    <TouchableOpacity
      onPress={onCancel}
      style={{
        flexDirection: "row",
        backgroundColor: colors.getSchemeColor(),
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      <Text style={[mainStyle.text14, { color: colors.getTextColor() }]}>
        {title}
      </Text>
      <SvgXml style={{ marginLeft: 5 }} xml={ic} />
    </TouchableOpacity>
  );
};
const Bottom = ({ filterData, onChoose, value, colors, headlines }) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={[
          mainStyle.level,
          { color: colors.getTextColor(), textAlign: "center" },
        ]}
      >
        {headlines._choose}
      </Text>
      <View style={{ height: 24 }} />
      {filterData?.map((doc, i) => (
        <SheetCard
          select={doc === value ? true : false}
          onPress={onChoose}
          title={doc}
          key={i}
        />
      ))}
    </View>
  );
};
const calender = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 1V3.25M15.75 1V3.25M1.5 16.75V5.5C1.5 4.90326 1.73705 4.33097 2.15901 3.90901C2.58097 3.48705 3.15326 3.25 3.75 3.25H17.25C17.8467 3.25 18.419 3.48705 18.841 3.90901C19.2629 4.33097 19.5 4.90326 19.5 5.5V16.75M1.5 16.75C1.5 17.3467 1.73705 17.919 2.15901 18.341C2.58097 18.7629 3.15326 19 3.75 19H17.25C17.8467 19 18.419 18.7629 18.841 18.341C19.2629 17.919 19.5 17.3467 19.5 16.75M1.5 16.75V9.25C1.5 8.65326 1.73705 8.08097 2.15901 7.65901C2.58097 7.23705 3.15326 7 3.75 7H17.25C17.8467 7 18.419 7.23705 18.841 7.65901C19.2629 8.08097 19.5 8.65326 19.5 9.25V16.75M10.5 10.75H10.508V10.758H10.5V10.75ZM10.5 13H10.508V13.008H10.5V13ZM10.5 15.25H10.508V15.258H10.5V15.25ZM8.25 13H8.258V13.008H8.25V13ZM8.25 15.25H8.258V15.258H8.25V15.25ZM6 13H6.008V13.008H6V13ZM6 15.25H6.008V15.258H6V15.25ZM12.75 10.75H12.758V10.758H12.75V10.75ZM12.75 13H12.758V13.008H12.75V13ZM12.75 15.25H12.758V15.258H12.75V15.25ZM15 10.75H15.008V10.758H15V10.75ZM15 13H15.008V13.008H15V13Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const sort = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.64272 0C3.17195 0 3.69921 0 4.22844 0C4.23043 4.81762 4.22646 9.63524 4.23043 14.4529C4.57334 14.0541 4.91625 13.6577 5.2552 13.2566C5.63181 13.6878 6.00446 14.1236 6.37314 14.5641C5.39594 15.7117 4.41675 16.857 3.43756 18C2.46036 16.8524 1.47721 15.7094 0.5 14.5618C0.870664 14.126 1.24331 13.6901 1.61794 13.2566C1.95689 13.653 2.2998 14.0495 2.64073 14.4459C2.6447 9.6306 2.64073 4.8153 2.64272 0Z" fill="white"/>
<path d="M7.3999 0C11.1006 0 14.7993 0 18.5 0C18.5 0.619011 18.5 1.2357 18.5 1.85471C14.7993 1.85471 11.1006 1.85471 7.3999 1.85471C7.3999 1.2357 7.3999 0.619011 7.3999 0Z" fill="white"/>
<path d="M7.3999 4.63672C10.3077 4.63672 13.2136 4.63672 16.1214 4.63672C16.1214 5.25573 16.1214 5.87242 16.1214 6.49143C13.2136 6.49143 10.3077 6.49143 7.3999 6.49143C7.3999 5.87242 7.3999 5.25573 7.3999 4.63672Z" fill="white"/>
<path d="M7.3999 9.27344C9.51487 9.27344 11.6279 9.27344 13.7428 9.27344C13.7428 9.89245 13.7428 10.5091 13.7428 11.1282C11.6279 11.1282 9.51487 11.1282 7.3999 11.1282C7.3999 10.5091 7.3999 9.89245 7.3999 9.27344Z" fill="white"/>
<path d="M7.3999 13.9104C8.722 13.9104 10.0421 13.9104 11.3642 13.9104C11.3642 14.5294 11.3642 15.1461 11.3642 15.7651C10.0421 15.7651 8.722 15.7651 7.3999 15.7651C7.3999 15.1461 7.3999 14.5294 7.3999 13.9104Z" fill="white"/>
</svg>
`;
const dash = `<svg width="2" height="12" viewBox="0 0 2 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1" y1="2.18557e-08" x2="0.999999" y2="12" stroke="#E6E6E6"/>
</svg>
`;
