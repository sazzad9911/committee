import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../apis/multipleApi";
import SubscriptionCard from "../../components/cart/SubscriptionCard";
import FloatingButton from "../../components/main/FloatingButton";
import NoOption from "../../components/main/NoOption";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";

export default function Paid({ navigation, searchTerm }) {
  const [paidList, setPaidList] = useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new AppColors(isDark);
  const isBn = useSelector((state) => state.isBn);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const comity = useSelector((state) => state.comity);
  const [sortedPaid, setSortedPaid] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    !paidList && dispatch(loader.show());
    get(`/subs/get-all-subs/${comity.id}`, user.token)
      .then((res) => {
        dispatch(loader.hide());
        setPaidList(res.data.subs?.filter((sub) => sub.completed));
        setSortedPaid(res.data.subs?.filter((sub) => sub.completed));
      })
      .catch((err) => {
        dispatch(loader.hide());
      });
  }, [isFocused]);

  useEffect(() => {
    if (searchTerm) {
      setSortedPaid(
        paidList.filter((sub) =>
          sub.name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else {
      setSortedPaid(paidList);
    }
  }, [searchTerm]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.getBackgroundColor() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 6 }} />
        {sortedPaid &&
          sortedPaid.map((doc, i) => (
            <SubscriptionCard
              data={doc}
              key={i}
              index={i + 1}
              onPress={() => {
                navigation?.navigate("SubscriptionDetails", { data: doc });
              }}
              title={doc.name}
            />
          ))}
        {sortedPaid?.length == 0 && (
          <NoOption
            title={" "}
            subTitle={
              isBn
                ? searchTerm
                  ? "খুঁজে পাওয়া যাচ্ছে না"
                  : "যোগ বাটন এ ক্লিক করে পেমেন্ট তৈরি করুন"
                : searchTerm
                ? "Not found"
                : "Create a payment by clicking the Add button"
            }
          />
        )}
        <View style={{ height: 6 }} />
      </ScrollView>
    </View>
  );
}
