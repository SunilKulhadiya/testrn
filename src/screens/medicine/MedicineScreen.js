import React from "react";
import {
View,
Text,
StyleSheet,
FlatList,
TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

export default function MedicineScreen({ navigation }) {

const { t, i18n } = useTranslation();
const isRTL = i18n.language === "ar";

const medicines = [
{ id:"1", name:"Paracetamol", type:"Tablet", dosage:"500mg" },
{ id:"2", name:"Vitamin D", type:"Capsule", dosage:"200mg" }
];

const renderItem = ({item}) => (

<View style={[
styles.card,
{flexDirection: isRTL ? "row-reverse" : "row"}
]}>

<View style={{flex:1}}>

<Text style={[
styles.name,
{textAlign: isRTL ? "right" : "left"}
]}>
{item.name}
</Text>

<Text style={[
styles.sub,
{textAlign: isRTL ? "right" : "left"}
]}>
{item.type} • {item.dosage}
</Text>

</View>

<Icon name="pill" size={26} color="#1E6AE1"/>

</View>

);

return (

<View style={styles.container}>

<View style={styles.header}>
<Text style={styles.title}>
{t("medicine.title")}
</Text>
</View>

<FlatList
data={medicines}
keyExtractor={(item)=>item.id}
renderItem={renderItem}
contentContainerStyle={{padding:20}}
/>

<TouchableOpacity
style={styles.fab}
onPress={()=>navigation.navigate("AddMedicine")}
>

<Icon name="plus" size={28} color="#fff"/>

</TouchableOpacity>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F5F7FB"
},

header:{
padding:20
},

title:{
fontSize:22,
fontWeight:"bold"
},

card:{
backgroundColor:"#fff",
padding:16,
borderRadius:14,
marginBottom:12,
alignItems:"center",
elevation:2
},

name:{
fontSize:16,
fontWeight:"600"
},

sub:{
color:"#777",
marginTop:4
},

fab:{
position:"absolute",
bottom:30,
right:20,
width:60,
height:60,
borderRadius:30,
backgroundColor:"#1E6AE1",
alignItems:"center",
justifyContent:"center",
elevation:5
}

});