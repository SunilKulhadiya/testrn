import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
ScrollView,
Dimensions
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import ProgressCircle from "../../components/progress_styles/ProgressCircle";

import {
getAdherence,
getWeeklyAdherence,
getMissedReminders
} from "../../database/services/reminderService";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen(){

const [progress,setProgress] = useState(0);
const [weekly,setWeekly] = useState([]);
const [missed,setMissed] = useState(0);

useEffect(()=>{

loadData();

},[]);


const loadData = () => {

const adherence = getAdherence();
setProgress(adherence);

const weeklyData = getWeeklyAdherence();
setWeekly(weeklyData);

const missedData = getMissedReminders();
setMissed(missedData.length);

};


const chartData = {

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[
{
data: weekly.length ? weekly : [0,0,0,0,0,0,0]
}
]

};


return(

<ScrollView style={styles.container}>

{/* HEADER */}

<Text style={styles.title}>
Health Analytics
</Text>


{/* PROGRESS */}

<View style={styles.progressContainer}>

<ProgressCircle
progress={progress}
title="Adherence"
/>

</View>


{/* STATS */}

<View style={styles.statsRow}>

<View style={styles.statCard}>

<Text style={styles.statNumber}>
{progress}%
</Text>

<Text style={styles.statLabel}>
Adherence
</Text>

</View>


<View style={styles.statCard}>

<Text style={styles.statNumber}>
{missed}
</Text>

<Text style={styles.statLabel}>
Missed
</Text>

</View>

</View>


{/* WEEKLY CHART */}

<Text style={styles.sectionTitle}>
Weekly Medicine Intake
</Text>


<LineChart
data={chartData}
width={screenWidth-30}
height={220}
chartConfig={{

backgroundGradientFrom:"#fff",
backgroundGradientTo:"#fff",

decimalPlaces:0,

color:(opacity=1)=>`rgba(25,118,210,${opacity})`,

labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`

}}

style={styles.chart}

/>


</ScrollView>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F6FA",
padding:15
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20
},

progressContainer:{
alignItems:"center",
marginBottom:30
},

statsRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:30
},

statCard:{
backgroundColor:"#fff",
padding:20,
borderRadius:14,
width:"48%",
alignItems:"center",
elevation:3
},

statNumber:{
fontSize:22,
fontWeight:"bold"
},

statLabel:{
color:"#777",
marginTop:5
},

sectionTitle:{
fontSize:18,
fontWeight:"600",
marginBottom:10
},

chart:{
borderRadius:16
}

});