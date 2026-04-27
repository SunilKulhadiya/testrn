import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTranslation } from "react-i18next";


/**
 * Advanced reusable Top App Bar
 * Flexible for any screen (list screen, detail screen, form screen, dashboard etc.)
 */

const TopAppBar = ({
  title = "Title",
  subtitle = "",

  // Left
  showBack = false,
  onBackPress,
  leftIcon = "menu",
  onLeftPress,

  // Right icons (max 3 recommended)
  rightIcons = [],

  // Styles
  backgroundColor = "#ffffff",
  titleColor = "#111",
  subtitleColor = "#777",
  iconColor = "#111",
  elevation = 4,

  // Layout
  centerTitle = false,
  showDivider = true,
  statusBarStyle = "dark-content"
}) => {

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";


  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={statusBarStyle}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor,
            elevation,
            shadowOpacity: elevation ? 0.2 : 0
          }
        ]}
      >
        {/* LEFT SECTION */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBackPress}
              style={styles.iconBtn}
            >
              <Ionicons name="arrow-back" size={22} color={iconColor} />
            </TouchableOpacity>
          ) : onLeftPress ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onLeftPress}
              style={styles.iconBtn}
            >
              <Icon name={leftIcon} size={22} color={iconColor} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>

        {/* TITLE SECTION */}
        <View
          style={[
            styles.titleSection,
            centerTitle && { alignItems: "center" }
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: titleColor, textAlign: centerTitle ? "center" : "left" }
            ]}
          >
            {t(title)}
          </Text>

          {subtitle ? (
            <Text
              numberOfLines={1}
              style={[styles.subtitle, { color: subtitleColor }]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* RIGHT SECTION */}
        <View style={styles.rightSection}>
          {rightIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={item.onPress}
              style={styles.iconBtn}
            >
              <Icon
                name={item.icon}
                size={item.size || 22}
                color={item.color || iconColor}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {showDivider && <View style={styles.divider} />}
    </>
  );
};

export default memo(TopAppBar);

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  container: {
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  leftSection: {
    width: 50,
    alignItems: "flex-start"
  },

  rightSection: {
    width: 80,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  titleSection: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    fontSize: 17,
    fontWeight: "600"
  },

  subtitle: {
    fontSize: 12,
    marginTop: 2
  },

  iconBtn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },

  iconPlaceholder: {
    height: 40,
    width: 40
  },

  divider: {
    height: 0.6,
    backgroundColor: "#e5e5e5"
  }
});


// ==================================================
// USAGE EXAMPLES
// ==================================================

/*

// 1. Simple Screen
<TopAppBar title="Dashboard" />

// 2. With Back Button
<TopAppBar
  title="Student List"
  showBack
  onBackPress={() => navigation.goBack()}
/>

// 3. With Right Icons
<TopAppBar
  title="Expenses"
  rightIcons={[
    { icon: "magnify", onPress: () => console.log("Search") },
    { icon: "filter-variant", onPress: () => console.log("Filter") },
    { icon: "dots-vertical", onPress: () => console.log("More") }
  ]}
/>

// 4. With Subtitle
<TopAppBar
  title="Profile"
  subtitle="Student Details"
  showBack
  onBackPress={() => navigation.goBack()}
/>

// 5. Center Title App Bar
<TopAppBar
  title="My App"
  centerTitle
  rightIcons={[{ icon: "bell-outline", onPress: () => {} }]}
/>

*/
