import React, { useRef, useState } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from 'react-native-reanimated-carousel';

import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from 'react-native-reanimated';

import { useDispatch } from "react-redux";
import { finishOnboarding } from '../../redux/slices/app/appSlice';
import AppConstant from '../../Helper/Constant';


export default function OnBoardingScreen() {
  
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const carouselRef = useRef(null);

  // shared value for current active slide index
  const activeIndex = useSharedValue(0);
console.log("this is onboarding screen");
const sliderData = [
  {
    key: 'one',
    title: 'Stay Healthy, Stay On Track',
    text: `Manage your medicines, track doses, and never miss a reminder.`,
    image: require('../../assets/images/onboarding1.jpeg'),
  },
  {
    key: 'two',
    title: 'Never Miss a Dose',
    text: `Get timely reminders so you stay consistent with your treatment.`,
    image: require('../../assets/images/onboarding2.jpeg'),
  },
  {
    key: 'three',
    title: 'Scan & Understand Medicines',
    text: `Scan & Understand Medicines`,
    image: require('../../assets/images/onboarding3.jpeg'),
  }
];

  const triggerActive = (index) => {
    // reset then set the new index with a tiny delay — this forces derived values to re-evaluate
    activeIndex.value = -1;
    activeIndex.value = withDelay(20, withTiming(index, { duration: 10 }));
  };
  // Slide component — uses reanimated hooks safely (component-level)
  function SlideItem({ item, index }) {
    // progress for title (0..1) and text (0..1 with small delay)
    const titleProgress = useDerivedValue(() =>
      activeIndex.value === index
        ? withTiming(1, { duration: 450 })
        : withTiming(0, { duration: 300 })
    );

    const textProgress = useDerivedValue(() =>
      activeIndex.value === index
        ? withDelay(120, withTiming(1, { duration: 1000 }))
        : withTiming(0, { duration: 300 })
    );

    // title animation style: different transforms for each index
    const titleStyle = useAnimatedStyle(() => {
      const p = titleProgress.value;
      if (index === 0) {
        // from bottom -> up
        return {
          transform: [{ translateY: 30 * (1 - p) }],
          opacity: p
        };
      } else if (index === 1) {
        // from left -> center
        return {
          transform: [{ translateX: -40 * (1 - p) }],
          opacity: p
        };
      } else {
        // index === 2, from top -> down
        return {
          transform: [{ translateY: -30 * (1 - p) }],
          opacity: p
        };
      }
    });

    // text style similar but slightly smaller offset and same delay handled by textProgress
    const textStyle = useAnimatedStyle(() => {
      const p = textProgress.value;
      if (index === 0) {
        return {
          transform: [{ translateY: 20 * (1 - p) }],
          opacity: p
        };
      } else if (index === 1) {
        return {
          transform: [{ translateX: -30 * (1 - p) }],
          opacity: p
        };
      } else {
        return {
          transform: [{ translateY: -20 * (1 - p) }],
          opacity: p
        };
      }
    });

    return (
      <View style={{ flex: 1, width: '100%', height: '80%', flexDirection: 'column' }}>
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: AppConstant.DEVICE_HEIGHT * 0.65, // image = 90% of screen height
          }}
          resizeMode="stretch"
        />

        <View style={{
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
          <Animated.Text style={[styles.H3, titleStyle]}>
            {item.title}
          </Animated.Text>

          <Animated.Text style={[styles.text3, { textAlign: 'center' }, textStyle]}>
            {item.text}
          </Animated.Text>
        </View>
      </View>
    );
  }

  const onDone = async () => {
     dispatch(finishOnboarding());
  };

  const goToPage = (newPage) => {
    setPage(newPage);
    activeIndex.value = newPage; // trigger animations
    carouselRef.current?.scrollTo({ index: newPage, animated: true });
  };

  const NextButton = () => {
    if (page < sliderData.length - 1) {
      goToPage(page + 1);
    }
  };

  const PrevButton = () => {
    if (page > 0) {
      goToPage(page - 1);
    }
  };

  return (
    <View style={[styles.Pagecontainer, { flex: 1, backgroundColor: '#FFFFFF' }]}>
      {/* Skip */}
        <Pressable onPress={onDone} style={{width: '100%', height: 70, marginBottom: 10}}>
          <Text style={{
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'right',
            marginTop: 40,
            marginRight: 15,
            color: '#7c868dff'
          }}>
            Skip
          </Text>
        </Pressable>

      <GestureHandlerRootView>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={AppConstant.DEVICE_WIDTH}
          height={AppConstant.DEVICE_HEIGHT * 0.8} // full height so image 90% fills nicely
          autoPlay={false}
          data={sliderData}
          onSnapToItem={(index) => {
            setPage(index);
            triggerActive(index);
          }}
          renderItem={({ item, index }) => <SlideItem item={item} index={index} />}
        />

        {/* dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {sliderData.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === page ? 25 : 10,
                height: 10,
                borderRadius: i === page ? 3 : 5,
                backgroundColor: i === page ? '#FF5733' : '#B2B2B2',
                marginHorizontal: 5,
              }}
            />
          ))}
        </View>

        {/* nav */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',  // center horizontally
            alignItems: 'center',      // center vertically
            marginTop: 20,
            width: '100%',
            gap: "40%",
          }}>
          
          {page > 0 && (
            <Pressable onPress={PrevButton} style={{width: 100, height: 30, marginHorizontal: 10}}>
              <Text style={[styles.SliderButtonText, {textAlign: 'center'}]}>⬅️ Back</Text>
            </Pressable>
          )}

          {page < sliderData.length - 1 ? (
            <Pressable onPress={NextButton}
              style={{
                width: page > 0 ? 100 : AppConstant.DEVICEWIDTH * 0.84,
                height: 30,
                marginHorizontal: 10,
                alignItems: page > 0 ? 'center' : 'flex-end'
              }}>
              <Text style={[styles.SliderButtonText, {textAlign: 'center'}]}>Next ➡️</Text>
            </Pressable>
          ) : (
            <Pressable onPress={onDone} style={{width: 100, height: 30, marginHorizontal: 10}}>
              <Text style={[styles.SliderButtonText, {textAlign: 'center'}]}>✅ Done</Text>
            </Pressable>
          )}
        </View>
      </GestureHandlerRootView>
    </View>
  );
}


const styles = StyleSheet.create({
  Pagecontainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  H3: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    color: "#222"
  },
  text3: {
    fontSize: 15,
    marginTop: 10,
    color: "#555",
    lineHeight: 22
  },
  SliderButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FF5733"
  }
});