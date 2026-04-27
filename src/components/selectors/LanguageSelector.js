import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", en_label: "English 🇬🇧", label: "English" },
  { code: "hi", en_label: "Hindi", label: "हिन्दी 🇮🇳" },
  { code: "ar", en_label: "Arabic", label: "العربية 🇸🇦" },
  { code: "mr", en_label: "Marathi", label: "मराठी 🇮🇳" },
  { code: "gu", en_label: "Gujarati", label: "ગુજરાતી 🇮🇳" },
  { code: "es", en_label: "Spanish", label: "Español 🇪🇸" },
  { code: "fr", en_label: "French", label: "Français 🇫🇷" },
  { code: "zh", en_label: "Chinese", label: "中文 🇨🇳" }
];

export default function LanguageSelector() {

  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>

      {languages.map((lang) => {

        const active = i18n.language === lang.code;

        return (

          <TouchableOpacity
            key={lang.code}
            style={[styles.button, active && styles.activeButton]}
            onPress={() => changeLanguage(lang.code)}
          >

            <View style={styles.row}>

              {/* Fixed width column */}

              <View style={styles.column}>
                <Text style={styles.enText}>{lang.en_label}</Text>
                <Text style={styles.text}>{lang.label}</Text>
              </View>

              {/* Checkbox */}

              <Text style={styles.check}>
                {active ? "✅" : "⬜"}
              </Text>

            </View>

          </TouchableOpacity>

        );

      })}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10
  },

  button: {
    padding: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10
  },

  activeButton: {
    backgroundColor: "#E8F5E9"
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  column: {
    flexDirection: "column",
    width: "80%"   // ⭐ fixed width for alignment
  },

  enText: {
    fontSize: 16,
    fontWeight: "600"
  },

  text: {
    fontSize: 14,
    color: "#666"
  },

  check: {
    fontSize: 20,
    textAlign: "right",
    width: "20%"   // remaining space
  }

});