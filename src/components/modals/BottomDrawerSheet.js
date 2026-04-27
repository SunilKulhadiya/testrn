import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { height } = Dimensions.get("window");

export default function BottomDrawerSheet({ visible, onClose, children }) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      {/* Background overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Bottom sheet */}
      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.indicator} />
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10
  }
});
