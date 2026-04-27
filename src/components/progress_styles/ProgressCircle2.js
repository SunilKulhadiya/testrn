import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressCircle2({

size = 160,
strokeWidth = 14,
progress = 70,
duration = 900,

title = "Adherence",
unit = "%",

startColor = "#4F8EF7",
endColor = "#7C4DFF",

bgColor = "#E9EEF5",
textColor = "#111",
subTextColor = "#888"

}) {

const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const animated = useRef(new Animated.Value(0)).current;

const strokeDashoffset = animated.interpolate({
inputRange: [0, 100],
outputRange: [circumference, 0]
});

useEffect(() => {

Animated.timing(animated,{
toValue:progress,
duration,
useNativeDriver:false
}).start();

},[progress]);

return (

<View style={[styles.wrapper,{width:size,height:size}]}>

<Svg width={size} height={size}>

<Defs>

<LinearGradient id="grad">

<Stop offset="0%" stopColor={startColor} />
<Stop offset="100%" stopColor={endColor} />

</LinearGradient>

</Defs>

{/* Background ring */}

<Circle
stroke={bgColor}
fill="none"
cx={size/2}
cy={size/2}
r={radius}
strokeWidth={strokeWidth}
/>

{/* Glow ring */}

<Circle
stroke={startColor}
fill="none"
cx={size/2}
cy={size/2}
r={radius}
strokeWidth={strokeWidth+6}
opacity={0.08}
/>

{/* Animated progress */}

<AnimatedCircle
stroke="url(#grad)"
fill="none"
cx={size/2}
cy={size/2}
r={radius}
strokeWidth={strokeWidth}
strokeDasharray={circumference}
strokeDashoffset={strokeDashoffset}
strokeLinecap="round"
rotation="-90"
originX={size/2}
originY={size/2}
/>

</Svg>

{/* CENTER CONTENT */}

<View style={styles.center}>

<Text style={[styles.value,{color:textColor}]}>
{progress}{unit}
</Text>

<Text style={[styles.label,{color:subTextColor}]}>
{title}
</Text>

</View>

</View>

);

}

const styles = StyleSheet.create({

wrapper:{
justifyContent:"center",
alignItems:"center"
},

center:{
position:"absolute",
alignItems:"center"
},

value:{
fontSize:34,
fontWeight:"700"
},

label:{
marginTop:4,
fontSize:13
}

});