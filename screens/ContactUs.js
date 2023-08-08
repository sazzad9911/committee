import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import TextArea from "../components/main/TextArea";
import { AppColors } from "../functions/colors";
import { AppValues } from "../functions/values";
import mainStyle from "../styles/mainStyle";

export default function ContactUs({navigation}) {
  const isDark = useSelector((state) => state.isDark);
  const isBn = useSelector((state) => state.isBn);
  const colors = new AppColors(isDark);
  const textColor = colors.getTextPrimaryColor();
  const borderColor = colors.getBorderColor();
  const subTextColor = colors.getSubTextColor();
  const values = new AppValues(isBn);
  const headlines = values.getValues();
  const add = `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8716 22.7368C11.52 20.7537 10.1053 18.1389 10.1053 15.7895C10.1053 13.4779 11.3179 11.3684 13.1368 10.1053H12.6316V7.57895H15.1579V9.13263C15.7895 8.95579 16.4211 8.8421 17.0526 8.8421C17.2674 8.8421 17.4821 8.8421 17.6842 8.88V0H0V22.7368H7.57895V18.3158H10.1053V22.7368H12.8716ZM12.6316 2.52632H15.1579V5.05263H12.6316V2.52632ZM5.05263 20.2105H2.52632V17.6842H5.05263V20.2105ZM5.05263 15.1579H2.52632V12.6316H5.05263V15.1579ZM5.05263 10.1053H2.52632V7.57895H5.05263V10.1053ZM5.05263 5.05263H2.52632V2.52632H5.05263V5.05263ZM7.57895 2.52632H10.1053V5.05263H7.57895V2.52632ZM7.57895 7.57895H10.1053V10.1053H7.57895V7.57895ZM7.57895 15.1579V12.6316H10.1053V15.1579H7.57895ZM17.0526 11.3684C14.6526 11.3684 12.6316 13.4021 12.6316 15.7895C12.6316 19.0863 17.0526 24 17.0526 24C17.0526 24 21.4737 19.0863 21.4737 15.7895C21.4737 13.4021 19.4526 11.3684 17.0526 11.3684ZM17.0526 17.4442C16.1684 17.4442 15.5368 16.6863 15.5368 15.9284C15.5368 15.0442 16.2947 14.4126 17.0526 14.4126C17.8105 14.4126 18.5684 15.1579 18.5684 15.9284C18.6947 16.6863 17.9368 17.4442 17.0526 17.4442Z" fill="${colors.getTextColor()}"/>
</svg>
`;
  const loc = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M20.621 8.45C19.571 3.83 15.541 1.75 12.001 1.75H11.991C8.46101 1.75 4.42101 3.82 3.37101 8.44C2.20101 13.6 5.36101 17.97 8.22101 20.72C9.23473 21.7012 10.5902 22.2498 12.001 22.25C13.361 22.25 14.721 21.74 15.771 20.72C18.631 17.97 21.791 13.61 20.621 8.45Z" fill="${colors.getTextColor()}"/>
<path d="M12.002 13.46C12.4157 13.46 12.8253 13.3785 13.2074 13.2202C13.5896 13.0619 13.9369 12.8299 14.2294 12.5374C14.5219 12.2449 14.7539 11.8976 14.9122 11.5155C15.0705 11.1333 15.152 10.7237 15.152 10.31C15.152 9.89634 15.0705 9.48673 14.9122 9.10455C14.7539 8.72238 14.5219 8.37512 14.2294 8.08262C13.9369 7.79011 13.5896 7.55809 13.2074 7.39978C12.8253 7.24148 12.4157 7.16 12.002 7.16C11.1666 7.16 10.3653 7.49188 9.7746 8.08262C9.18386 8.67336 8.85199 9.47457 8.85199 10.31C8.85199 11.1454 9.18386 11.9467 9.7746 12.5374C10.3653 13.1281 11.1666 13.46 12.002 13.46Z" fill="${colors.getTextColor()}"/>
</svg>
`;
  return (
    <ScrollView style={{
        backgroundColor:colors.getBackgroundColor()
    }} showsVerticalScrollIndicator={false}>
      <View style={[mainStyle.pdH20]}>
        <Input
          outSideStyle={mainStyle.mt12}
          level={headlines._name}
          placeholder={headlines.write}
        />
        <Input
          outSideStyle={mainStyle.mt12}
          optionalLevel={headlines._notRequired}
          level={headlines._email}
          placeholder={headlines.write}
        />
        <Input
          outSideStyle={mainStyle.mt12}
          level={headlines._mobile}
          placeholder={headlines.write}
        />
        <TextArea
          outSideStyle={[mainStyle.mt12]}
          containerStyle={{ height: 170 }}
          level={headlines._yourMessage}
          optionalLevel={headlines._max1000}
          placeholder={headlines.write}
        />
        <Button onPress={()=>{
            navigation.navigate("ContactSuccess")
        }} active={true} style={mainStyle.mt32}
         title={headlines._ok} />
        <View
          style={[
            mainStyle.mt32,
            { height: 1, backgroundColor: colors.getShadowColor() },
          ]}
        />
        <Text style={[mainStyle.mt32, mainStyle.level,{color:textColor}]}>
          {headlines._officeLocation}
        </Text>
        <View style={[mainStyle.flexBox,mainStyle.mt12,{justifyContent:"flex-start"}]}>
          <SvgXml xml={add} />
          <Text style={[mainStyle.subLevel,mainStyle.ml16,{color:textColor}]}>{headlines._location}</Text>
         
        </View>
        <View style={[mainStyle.flexBox,mainStyle.mt12,{justifyContent:"flex-start"}]}>
          <SvgXml xml={loc} />
          <Text style={[mainStyle.subLevel,mainStyle.ml16,{color:textColor}]}>{headlines._googleMap}</Text>
         
        </View>
        <View
          style={[
            mainStyle.mt32,
            { height: 1, backgroundColor: colors.getShadowColor() },
          ]}
        />
      </View>

      <View style={mainStyle.mt32} />
    </ScrollView>
  );
}
