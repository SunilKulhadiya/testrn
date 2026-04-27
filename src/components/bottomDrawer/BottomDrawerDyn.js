import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import AppConstant from "../../Helper/Constant";


export default function BottomDrawerDyn({ visible, onClose, children }) {
  const translateY = useRef(new Animated.Value(AppConstant.DEVICE_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    } else {
      Animated.timing(translateY, { toValue: AppConstant.DEVICE_HEIGHT, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => translateY.setValue(gestureState.dy),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.overlay}>

      {/* BACKDROP */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* DRAWER */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />

        {/* ✅ SCROLL INSIDE */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {children}
        </ScrollView>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: AppConstant.DEVICE_HEIGHT * 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    padding: 20,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
});
