import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post, socket } from "../../apis/multipleApi";
import loader from "../../data/loader";
import toast from "../../data/toast";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";
import Avatar from "../main/Avatar";
import Button from "../main/Button";
import { SvgXml } from "react-native-svg";

export default function MemberRequestCard({
  textColor,
  shadowColor,
  name,
  type,
  mainColor,
  id,
  doc,
  comity,
  onPress,
  onDone,
  navigation
}) {
  const user = useSelector((state) => state.user);
  const c = useSelector((state) => state.comity);
  const dispatch = useDispatch();
  const isBn = useSelector((state) => state.isBn);
  const headlines = new AppValues(isBn).getValues();
  const [data, setData] = useState(doc);
  // console.log(doc?.message);
  useEffect(() => {
    //console.log(data.id);
    // socket.on("newNotification", (e) => {
    //   //console.log(e);
    //   if(e&&e.id===doc.id){
    //     setData(e)
    //   }
    // });
    // socket.off("newNotification")
  }, []);
  const getText = (type, name, position, isBn) => {
    if (c) {
      return isBn
        ? `${
            type == "Reject-Member-Request"
              ? `.${name}/ আপনার কমিটিতে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসাবে যোগদানের জন্য আপনার অনুরোধ প্রত্যাখ্যান করেছেন`
              : type == "Accept-Member-Request"
              ? `.${name}/ আপনার কমিটিতে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসাবে যোগদানের জন্য আপনার অনুরোধ গ্রহণ করেছেন।`
              : type == "You-Accept-Member-Request"
              ? `আপনি /.${name}/ কে আপনার কমিটির একজন /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসাবে যোগদান করার জন্য গ্রহণ করেছেন।`
              : type == "You-Reject-Member-Request"
              ? `আপনি /.${name}/ কে আপনার কমিটিতে যোগ দিতে প্রত্যাখ্যান করেছেন`
              : `/.${name}/ আপনার কমিটিতে যোগদানের জন্য অনুরোধ করেছেন।`
          }`
        : `${
            type == "Reject-Member-Request"
              ? `.${name}/ has declined your request to join your comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "Accept-Member-Request"
              ? `.${name}/ has Accepted your request to join your comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "You-Accept-Member-Request"
              ? `You have accepted /.${name}/ to join your comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "You-Reject-Member-Request"
              ? `You have declined /.${name}/ to join your comity`
              : `.${name}/ has requested to join your comity`
          }`;
    } else {
      return isBn
        ? `${
            type == "Reject-Member-Request"
              ? `.${name}/ তাদের কমিটিতে যোগদানের জন্য আপনার অনুরোধ প্রত্যাখ্যান করেছেন`
              : type == "Accept-Member-Request"
              ? `.${name}/ তাদের কমিটিতে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসেবে যোগদানের জন্য আপনার অনুরোধ গ্রহণ করেছেন।`
              : type == "You-Accept-Member-Request"
              ? `আপনি /.${name}/তে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসেবে যোগদানের অনুরোধ গ্রহণ করেছেন`
              : type == "You-Reject-Member-Request"
              ? `আপনি /.${name}/তে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসেবে যোগদানের অনুরোধ প্রত্যাখ্যান করেছেন`
              : type == "New-Notice"
              ? `/.${name}/ কমিটি একটি নতুন বিজ্ঞপ্তি দিয়েছে`
              : `আপনি /.${name}/তে /.${
                  position === "Special" ? "বিশেষ সদস্য" : "সাধারণ সদস্য"
                }/ হিসেবে যোগদানের জন্য একটি নতুন অনুরোধ পেয়েছেন`
          }`
        : `${
            type == "Reject-Member-Request"
              ? `.${name}/ has declined your request to join their comity`
              : type == "Accept-Member-Request"
              ? `.${name}/ has Accepted your request to join their comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "You-Accept-Member-Request"
              ? `You've accepted the request to join the /.${name}/ Comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "You-Reject-Member-Request"
              ? `You've declined the request to join the /.${name}/ Comity' as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
              : type == "New-Notice"
              ? `New Notice from /.${name}/ Comity`
              : `You've received a new request to join the /.${name}/ Comity as a /.${
                  position === "Special" ? "special member" : "general member"
                }`
          }`;
    }
  };
  const accept = (id) => {
    dispatch(loader.show());
    post(
      `/member/request/accept/${id}`,
      {
        notificationId: doc.id,
      },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        dispatch(toast.success("Request accepted"));
        onDone();
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };
  const reject = (id) => {
    dispatch(loader.show());
    //console.log(data);
    post(
      `/member/request/reject`,
      c?.id
        ? {
            userId: doc.userId,
            memberId: id,
            comityId: c.id,
            notificationId: doc.id,
          }
        : {
            memberId: id,
            notificationId: doc.id,
          },
      user.token
    )
      .then((res) => {
        dispatch(loader.hide());
        dispatch(toast.success("Request cancelled"));
        onDone();
      })
      .catch((err) => {
        dispatch(loader.hide());
        dispatch(toast.error(err.response.data.msg));
      });
  };
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 12,
      }}
    >
      <Pressable onPress={()=>{
        if(type === "New-Notice"){
          if(doc.comity.noticePrivacy==="Private"){
            navigation?.navigate("ComityProfile",{comityId:doc.comity.id})
          }else{
            navigation?.navigate("ViewNotice",{noticeId:doc.entityId})
          }
        }
      }}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {type === "New-Notice" ? (
          <SvgXml xml={noticeLogo} height={40} width={40} />
        ) : (
          <Avatar
            source={{
              uri: c ? data?.user?.profilePhoto : data?.comity?.profilePhoto,
            }}
            style={{ height: 40, width: 40 }}
          />
        )}
        <Text
          style={{
            marginLeft: 12,
            fontSize: 16,
            fontWeight: "400",
            color: textColor,
            flex: 1,
          }}
        >
          {getText(
            type,
            c ? doc?.user?.name : doc?.comity?.name,
            doc?.message,
            isBn
          )
            .split("/")
            .map((doc, i) =>
              doc.split("")[0] === "." ? (
                <Text
                  key={i}
                  style={{
                    fontWeight: "700",
                  }}
                >
                  {doc
                    ? doc
                        .split("")
                        .filter((d) => d != ".")
                        .join("")
                    : ""}
                </Text>
              ) : (
                <Text
                  key={i}
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {doc ? doc : ""}
                </Text>
              )
            )}
        </Text>
      </Pressable>
      {type === "New-Member-Request" && (
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onPress={() => reject(doc.entityId)}
            bg={["#F00", "#F00"]}
            active={true}
            style={{ paddingHorizontal: 24 }}
            title={headlines._decline}
          />
          <View style={{ width: 12 }} />
          <Button
            onPress={() =>
              onPress ? onPress(doc.entityId) : accept(doc.entityId)
            }
            style={{ paddingHorizontal: 24 }}
            active={true}
            title={headlines._accept}
          />
        </View>
      )}
    </View>
  );
}

const noticeLogo = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="url(#paint0_linear_2242_11818)"/>
<path d="M12.3084 8.09214C10.1554 8.53746 8.54914 10.1031 8.09435 12.1937C7.96855 12.7703 7.96855 13.7265 8.09435 14.3031C8.54914 16.4125 10.1651 17.9687 12.3568 18.414C13.0148 18.5453 14.1663 18.5171 14.8243 18.3437C16.4161 17.9359 17.7611 16.8109 18.4191 15.3437C18.6562 14.8046 18.6707 14.5937 18.4868 14.439C18.2111 14.2093 17.9353 14.3218 17.7805 14.725C17.5095 15.4234 17.1467 15.9625 16.6096 16.464C16.0242 17.0031 15.4533 17.3265 14.6937 17.5375C12.4778 18.1656 10.0877 17.0546 9.18778 14.9875C8.90233 14.3265 8.84911 14.0546 8.85395 13.225C8.85878 12.55 8.86846 12.4328 8.98942 12.0531C9.45872 10.5343 10.6151 9.41402 12.1875 8.95464C12.5794 8.83746 12.6955 8.82339 13.397 8.82339C14.234 8.81871 14.5243 8.86558 15.1727 9.12339C16.687 9.71871 17.8627 11.2281 17.9933 12.7328C18.0659 13.525 18.1143 13.6234 18.453 13.6234C18.7723 13.6234 18.84 13.5156 18.84 13.0234C18.84 12.2453 18.5449 11.2656 18.095 10.5531C17.2821 9.24996 16.0435 8.40152 14.5098 8.08746C13.9244 7.97027 12.8842 7.97027 12.3084 8.09214Z" fill="white"/>
<path d="M13.1651 10.117C13.1216 10.1498 12.9136 10.5202 12.7007 10.9373C12.3572 11.6077 12.2991 11.6967 12.1781 11.7202C12.1056 11.7342 11.7185 11.7905 11.3169 11.8467C10.3977 11.9686 10.3154 12.0108 10.3154 12.3389C10.3154 12.4983 10.3687 12.5639 10.9686 13.1498L11.6217 13.7873L11.4814 14.5373C11.3169 15.4467 11.3121 15.5639 11.4379 15.6858C11.6508 15.892 11.7427 15.8733 12.6136 15.4327L13.4216 15.0248L14.2344 15.4327C15.1053 15.8733 15.1972 15.892 15.4052 15.6764C15.531 15.5452 15.5262 15.442 15.3569 14.5373L15.2214 13.7873L15.8697 13.1498L16.5229 12.5123L16.5084 12.3108C16.4842 12.0061 16.3826 11.9592 15.5262 11.842C15.1295 11.7905 14.7376 11.7342 14.665 11.7202C14.5489 11.6967 14.4811 11.5983 14.1231 10.9045C13.9006 10.4733 13.6828 10.1077 13.6393 10.0889C13.5087 10.042 13.2522 10.0561 13.1651 10.117ZM13.7119 11.8795C14.0167 12.4514 14.0022 12.4467 14.7908 12.5452L15.2165 12.6014L14.8053 13.0139C14.3312 13.4827 14.3312 13.4733 14.4666 14.2045C14.5053 14.4295 14.5295 14.6264 14.5198 14.6358C14.5102 14.6452 14.2973 14.5514 14.0457 14.4202C13.7602 14.2748 13.528 14.1858 13.4264 14.1858C13.32 14.1858 13.0974 14.2702 12.8023 14.4202C12.5507 14.5514 12.3378 14.6498 12.3233 14.6358C12.3136 14.6264 12.3378 14.4389 12.3765 14.2233C12.5168 13.4967 12.5168 13.4827 12.033 13.0092C11.8008 12.7795 11.6411 12.592 11.6701 12.592C11.8927 12.592 12.7829 12.4327 12.841 12.3811C12.8797 12.3436 13.02 12.1045 13.1555 11.8467C13.2861 11.5842 13.4071 11.3733 13.4216 11.3733C13.4361 11.3733 13.5667 11.5983 13.7119 11.8795Z" fill="white"/>
<path d="M18.9365 10.342C18.8058 10.4686 18.8058 10.778 18.9365 10.9045C19.0284 10.9936 19.101 10.9983 21.5878 10.9983C22.9909 10.9983 24.3021 11.0217 24.5004 11.0452C25.0084 11.1108 25.4584 11.3311 25.8358 11.7108C26.4357 12.3061 30.6111 16.8905 30.7708 17.1249C30.8579 17.2561 30.9933 17.5327 31.0659 17.7342L31.2014 18.0999V24.0295C31.2014 28.6749 31.1868 30.0014 31.1385 30.1561C30.9982 30.6014 30.5579 31.028 30.0982 31.1639C29.8031 31.253 15.6175 31.253 15.3223 31.1639C14.8675 31.0327 14.4369 30.6249 14.2821 30.1795C14.2386 30.0483 14.2144 28.7545 14.195 24.6952C14.1708 19.5061 14.1708 19.3795 14.0789 19.3139C13.9386 19.2155 13.6338 19.2295 13.5177 19.342C13.4209 19.4358 13.4209 19.4967 13.4209 24.7983C13.4209 29.9311 13.4257 30.1749 13.5128 30.4467C13.7354 31.1358 14.345 31.7217 15.0611 31.9233C15.2981 31.9889 16.1109 31.9983 22.7103 31.9983C29.3096 31.9983 30.1224 31.9889 30.3595 31.9233C31.0756 31.7217 31.6852 31.1358 31.9077 30.4467C31.9948 30.1749 31.9997 29.917 31.9997 24.0811C31.9997 18.2217 31.9948 17.9827 31.9077 17.6452C31.8013 17.2467 31.632 16.8999 31.3852 16.5624C31.2933 16.4358 30.1031 15.1186 28.7387 13.6327C26.068 10.7264 26.0003 10.6608 25.2939 10.3983L24.9601 10.2717L21.9991 10.2577C19.0719 10.2436 19.0332 10.2483 18.9365 10.342Z" fill="white"/>
<path d="M23.9679 12.217C23.8759 12.3061 23.8711 12.3717 23.8711 14.4436C23.8711 16.4874 23.8759 16.5811 23.9727 16.8342C24.1082 17.1811 24.4565 17.5186 24.8145 17.6499C25.0758 17.7436 25.1726 17.7483 27.282 17.7483C29.4205 17.7483 29.4883 17.7436 29.5802 17.6545C29.6431 17.5936 29.677 17.4999 29.677 17.3733C29.677 17.2467 29.6431 17.153 29.5802 17.092C29.4883 17.003 29.4157 16.9983 27.4901 16.9983C26.3918 16.9983 25.4048 16.9749 25.3032 16.9514C25.0661 16.8999 24.892 16.778 24.7662 16.5717C24.6742 16.4217 24.6694 16.3045 24.6452 14.3358C24.621 12.3436 24.6162 12.2545 24.5291 12.1889C24.3888 12.0905 24.084 12.1045 23.9679 12.217Z" fill="white"/>
<path d="M16.2266 20.467C16.1638 20.528 16.1299 20.6217 16.1299 20.7483C16.1299 20.8749 16.1638 20.9686 16.2266 21.0295C16.3234 21.1233 16.3863 21.1233 22.5163 21.1233C28.6464 21.1233 28.7093 21.1233 28.806 21.0295C28.8689 20.9686 28.9028 20.8749 28.9028 20.7483C28.9028 20.6217 28.8689 20.528 28.806 20.467C28.7093 20.3733 28.6464 20.3733 22.5163 20.3733C16.3863 20.3733 16.3234 20.3733 16.2266 20.467Z" fill="white"/>
<path d="M16.2266 23.467C16.1638 23.528 16.1299 23.6217 16.1299 23.7483C16.1299 23.8749 16.1638 23.9686 16.2266 24.0295C16.3234 24.1233 16.3863 24.1233 22.5163 24.1233C28.6464 24.1233 28.7093 24.1233 28.806 24.0295C28.8689 23.9686 28.9028 23.8749 28.9028 23.7483C28.9028 23.6217 28.8689 23.528 28.806 23.467C28.7093 23.3733 28.6464 23.3733 22.5163 23.3733C16.3863 23.3733 16.3234 23.3733 16.2266 23.467Z" fill="white"/>
<path d="M16.2266 26.467C16.1638 26.528 16.1299 26.6217 16.1299 26.7483C16.1299 26.8749 16.1638 26.9686 16.2266 27.0295C16.3234 27.1233 16.3863 27.1233 22.5163 27.1233C28.6464 27.1233 28.7093 27.1233 28.806 27.0295C28.8689 26.9686 28.9028 26.8749 28.9028 26.7483C28.9028 26.6217 28.8689 26.528 28.806 26.467C28.7093 26.3733 28.6464 26.3733 22.5163 26.3733C16.3863 26.3733 16.3234 26.3733 16.2266 26.467Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_2242_11818" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>
`;
