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

import BottomDrawerSheet from "../../components/modals/BottomDrawerSheet";
import LanguageSelector from "../../components/selectors/LanguageSelector";

export default function ProfileScreen() {

  const { t, i18n } = useTranslation();

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
          {
            direction: isRTL ? "rtl" : "ltr"
          }
        ]}>

        {/* PROFILE HEADER */}

        <View style={styles.header}>

          <TouchableOpacity onPress={pickImage}>

            <Image
              source={{ uri: image || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />

            <View style={[
              styles.cameraIcon,
              { right: isRTL ? null : 0, left: isRTL ? 0 : null }
            ]}>
              <Icon name="camera" size={18} color="#fff" />
            </View>

          </TouchableOpacity>

          <Text style={[
            styles.name,
            { color: "#000000"//theme.text 
              }
          ]}>
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

          <View style={[
            styles.row,
            { flexDirection: isRTL ? "row-reverse" : "row" }
          ]}>

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="bell-outline" size={22} />

              <Text style={[
                styles.rowText,
                { textAlign: isRTL ? "right" : "left" }
              ]}>
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

          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
            // onPress={() => setThemeMode("light")}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="white-balance-sunny" size={22} />

              <Text style={styles.rowText}>
                {t("profile.lightMode")}
              </Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
            // onPress={() => setThemeMode("dark")}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="moon-waning-crescent" size={22} />

              <Text style={styles.rowText}>
                {t("profile.darkMode")}
              </Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
            // onPress={() => setThemeMode("system")}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="cellphone-settings" size={22} />

              <Text style={styles.rowText}>
                {t("profile.systemDefault")}
              </Text>

            </View>

          </TouchableOpacity>

        </View>


        {/* LANGUAGE */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            {t("settings.language")}
          </Text>

          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
            onPress={() => setLanguageVisible(true)}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="translate" size={22} />

              <Text style={styles.rowText}>
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

          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="lock-reset" size={22} />

              <Text style={styles.rowText}>
                {t("auth.changeMpin")}
              </Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.row,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}
          >

            <View style={[
              styles.rowLeft,
              { flexDirection: isRTL ? "row-reverse" : "row" }
            ]}>

              <Icon name="logout" size={22} color="red" />

              <Text style={[
                styles.rowText,
                { color: "red" }
              ]}>
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

        <Text style={[
          styles.drawerTitle,
          { textAlign: isRTL ? "right" : "left" }
        ]}>
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