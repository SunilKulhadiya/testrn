import ImageResizer from "react-native-image-resizer";
import { Platform } from "react-native";
import RNFS from "react-native-fs";

export const shrinkImageIfNeeded = async (img) => {
  try {
    console.log("📸 Original base64 length:", img.base64?.length);

    // ✅ If already small → return directly
    if (img.base64 && img.base64.length < 1000000) {
      return img.base64;
    }

    console.log("⚠️ Resizing image...");

    // 🔥 Resize image
    const resized = await ImageResizer.createResizedImage(
      img.uri,
      600, // width
      600, // height
      "JPEG",
      50 // quality (0-100)
    );

    console.log("📦 Resized URI:", resized.uri);

    // 🔥 Convert resized image → base64
    const base64 = await RNFS.readFile(
      Platform.OS === "android"
        ? resized.uri
        : resized.uri.replace("file://", ""),
      "base64"
    );

    console.log("✅ New base64 length:", base64.length);

    return base64;

  } catch (error) {
    console.log("❌ Resize Error:", error);
    return img.base64; // fallback
  }
};