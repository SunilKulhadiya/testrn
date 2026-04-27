import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";

import { useTranslation } from "react-i18next";
import { useTheme } from "../../theme/ThemeProvider";
import { row, textAlign, end } from "../../utils/rtl";

import BottomDrawerSheet from "../../components/modals/BottomDrawerSheet";
import LanguageSelector from "../../components/selectors/LanguageSelector";

export default function MoreScreen() {

  const { t, i18n } = useTranslation();
  const { theme, setThemeMode } = useTheme();

// onPress={() => setThemeMode("light")}
// onPress={() => setThemeMode("dark")}
// onPress={() => setThemeMode("system")}

  //const isRTL = i18n.language === "ar";
  const isRTL = i18n.dir() === "rtl";

  const [image, setImage] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [languageVisible, setLanguageVisible] = useState(false);

  const pickImage = () => {

    launchImageLibrary({ mediaType: "photo" }, (res) => {

      if (res?.assets?.length) {
        setImage(res.assets[0].uri);
      }

    });

  };

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: theme.colors.background }
        ]}
      >

        {/* PROFILE HEADER */}
        <View style={styles.header}>

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: image || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />

            <View style={[
              styles.cameraIcon,
              { [end]: 0 } // ✅ RTL safe
            ]}>
              <Icon name="camera" size={18} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={[styles.name, { color: theme.colors.text }]}>
            Sunil Kulhadiya
          </Text>

          <Text style={styles.email}>
            sunil.kulhadiya@montra.org
          </Text>

        </View>


        {/* SETTINGS */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            {t("settings.title")}
          </Text>

          <View style={[styles.row, row]}>

            <View style={[styles.rowLeft, row]}>
              <Icon name="bell-outline" size={22} />

              <Text style={[styles.rowText, textAlign]}>
                {t("settings.notifications")}
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>

        </View>


        {/* THEME */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            {t("settings.appearance")}
          </Text>

          {["light", "dark", "system"].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[styles.row, row]}
              onPress={() => setThemeMode(mode)}
            >
              <View style={[styles.rowLeft, row]}>
                <Icon
                  name={
                    mode === "light"
                      ? "white-balance-sunny"
                      : mode === "dark"
                      ? "moon-waning-crescent"
                      : "cellphone-settings"
                  }
                  size={22}
                />

                <Text style={[styles.rowText, textAlign]}>
                  {t(
                    mode === "light"
                      ? "profile.lightMode"
                      : mode === "dark"
                      ? "profile.darkMode"
                      : "profile.systemDefault"
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

        </View>


        {/* LANGUAGE */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            {t("settings.language")}
          </Text>

          <TouchableOpacity
            style={[styles.row, row]}
            onPress={() => setLanguageVisible(true)}
          >
            <View style={[styles.rowLeft, row]}>
              <Icon name="translate" size={22} />

              <Text style={[styles.rowText, textAlign]}>
                {t("settings.selectLanguage")}
              </Text>
            </View>

            <Icon
              name={isRTL ? "chevron-left" : "chevron-right"}
              size={22}
            />
          </TouchableOpacity>

        </View>


        {/* SECURITY */}
        <View style={styles.card}>

          <TouchableOpacity style={[styles.row, row]}>
            <View style={[styles.rowLeft, row]}>
              <Icon name="lock-reset" size={22} />

              <Text style={[styles.rowText, textAlign]}>
                {t("auth.changeMpin")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, row]}>
            <View style={[styles.rowLeft, row]}>
              <Icon name="logout" size={22} color="red" />

              <Text style={[styles.rowText, textAlign, { color: "red" }]}>
                {t("auth.logout")}
              </Text>
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>


      {/* LANGUAGE DRAWER */}
      <BottomDrawerSheet
        visible={languageVisible}
        onClose={() => setLanguageVisible(false)}
      >
        <Text style={[styles.drawerTitle, textAlign]}>
          🌐 {t("settings.selectLanguage")}
        </Text>

        <LanguageSelector />
      </BottomDrawerSheet>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  header: {
    alignItems: "center",
    paddingVertical: 30
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 20
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },

  email: {
    color: "#777"
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 14,
    padding: 16,
    elevation: 2
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },

  row: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12
  },

  rowLeft: {
    alignItems: "center",
    gap: 10
  },

  rowText: {
    fontSize: 16
  },

  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }

});