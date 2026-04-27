import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressCircle1({

size = 140,
strokeWidth = 14,
progress = 75,
duration = 900,
label = "Adherence",
unit = "%",
colorStart = "#4F8EF7",
colorEnd = "#7C4DFF",
backgroundColor = "#E6ECF5",
textColor = "#1A1A1A",
labelColor = "#888"

}) {

const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const animated = useRef(new Animated.Value(0)).current;

const strokeDashoffset = animated.interpolate({
inputRange: [0, 100],
outputRange: [circumference, 0]
});

useEffect(() => {

Animated.timing(animated, {
toValue: progress,
duration,
useNativeDriver: false
}).start();

}, [progress]);

return (

<View style={styles.container}>

<Svg width={size} height={size}>

<Defs>

<LinearGradient id="grad">

<Stop offset="0%" stopColor={colorStart} />
<Stop offset="100%" stopColor={colorEnd} />

</LinearGradient>

</Defs>

{/* background ring */}

<Circle
stroke={backgroundColor}
fill="none"
cx={size / 2}
cy={size / 2}
r={radius}
strokeWidth={strokeWidth}
/>

{/* animated progress */}

<AnimatedCircle
stroke="url(#grad)"
fill="none"
cx={size / 2}
cy={size / 2}
r={radius}
strokeWidth={strokeWidth}
strokeDasharray={circumference}
strokeDashoffset={strokeDashoffset}
strokeLinecap="round"
rotation="-90"
originX={size / 2}
originY={size / 2}
/>

</Svg>

<View style={styles.textWrapper}>

<Text style={[styles.value,{color:textColor}]}>
{progress}{unit}
</Text>

<Text style={[styles.label,{color:labelColor}]}>
{label}
</Text>

</View>

</View>

);

}

const styles = StyleSheet.create({

container:{
alignItems:"center",
justifyContent:"center"
},

textWrapper:{
position:"absolute",
alignItems:"center"
},

value:{
fontSize:32,
fontWeight:"700"
},

label:{
marginTop:4,
fontSize:13
}

});