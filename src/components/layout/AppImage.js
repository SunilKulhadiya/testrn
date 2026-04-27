import React from "react";
import { Image, StyleSheet } from "react-native";

export default function AppImage({
  source,
  width = 80,
  height = 80,
  resizeMode = "contain",
  style
}) {

  return (

    <Image
      source={source}
      resizeMode={resizeMode}
      style={[
        styles.image,
        { width, height },
        style
      ]}
    />

  );

}

const styles = StyleSheet.create({

  image: {
    alignSelf: "center"
  }

});