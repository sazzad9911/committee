import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../apis/multipleApi";
import Button from "../../components/main/Button";
import Input from "../../components/main/Input";
import loader from "../../data/loader";
import { AppColors } from "../../functions/colors";
import { AppValues } from "../../functions/values";
import mainStyle from "../../styles/mainStyle";

export default function AddSubscription({navigation}) {
  const {isDark,user,comity} = useSelector((state) => state);
  const isBn = useSelector((state) => state.isBn);
  const values = new AppValues(isBn);
  const colors = new AppColors(isDark);
  const [name,setName]=useState()
  const [quantity,setQuantity]=useState()
  const dispatch=useDispatch()
//console.log(comity.id);
  const save=async()=>{
    dispatch(loader.show())
    try{
      await post("/subs/create/subs",{
        name:name,
        amount:quantity,
        comityId:comity.id
      },user.token)
      dispatch(loader.hide())
      navigation.goBack()
    }catch(e){
      console.error(e.message);
      dispatch(loader.hide())
    }
  } 

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={[mainStyle.pdH20, mainStyle.mt24]}>
        <Input value={name} onChange={setName} level={values.getValues()._subscriptionName}
        optionalLevel={values.getValues()._required}
        subLevel={values.getValues()._max20}
        placeholder={values.getValues()._placeholder1}
         />
         <Input value={quantity} onChange={setQuantity} outSideStyle={mainStyle.mt24} level={values.getValues()._ammoutSubs}
        optionalLevel={values.getValues()._required}
        keyboardType={"numeric"}
        placeholder={values.getValues()._placeholder2}
         />
         <Button onPress={save} disabled={name&&quantity?false:true} active={name&&quantity?true:false} style={mainStyle.mt32} title={values.getValues()._ok}/>
      </View>
    </ScrollView>
  );
}
