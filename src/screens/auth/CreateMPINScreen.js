import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";

import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { saveMPIN } from "../../database/services/userService";

export default function CreateMPINScreen({ navigation }) {

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    const [mpin, setMpin] = useState("");
    const [confirmMpin, setConfirmMpin] = useState("");

    const handleCreate = () => {

        if (mpin.length !== 4) {
            Alert.alert("MPIN must be 4 digits");
            return;
        }

        if (mpin !== confirmMpin) {
            Alert.alert("MPIN does not match");
            return;
        }

        saveMPIN(mpin);

        Alert.alert("MPIN Created Successfully");

        navigation.replace("MainTabs");

    };

    return (

        <View style={styles.container}>

            <View style={styles.iconBox}>
                <Icon name="shield-lock-outline" size={60} color="#1E6AE1" />
            </View>

            <Text style={[styles.title, { textAlign: isRTL ? "right" : "center" }]}>
                {t("auth.createMpin")}
            </Text>

            <Text style={[styles.subtitle, { textAlign: isRTL ? "right" : "center" }]}>
                Secure your account with a 4-digit MPIN
            </Text>


            {/* MPIN INPUT */}

            <View style={styles.inputCard}>

                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("auth.mpin")}
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        { textAlign: isRTL ? "right" : "center" }
                    ]}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    value={mpin}
                    onChangeText={setMpin}
                />

            </View>


            {/* CONFIRM MPIN */}

            <View style={styles.inputCard}>

                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("auth.confirmPassword")}
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        { textAlign: isRTL ? "right" : "center" }
                    ]}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    value={confirmMpin}
                    onChangeText={setConfirmMpin}
                />

            </View>


            {/* CREATE BUTTON */}

            <TouchableOpacity
                style={styles.button}
                onPress={handleCreate}
            >

                <Text style={styles.buttonText}>
                    {t("buttons.create")}
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
        padding: 25,
        justifyContent: "center"
    },

    iconBox: {
        alignItems: "center",
        marginBottom: 20
    },

    title: {
        fontSize: 26,
        fontWeight: "bold"
    },

    subtitle: {
        marginTop: 6,
        color: "#777",
        marginBottom: 30
    },

    inputCard: {
        marginBottom: 20
    },

    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#555"
    },

    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        fontSize: 18,
        letterSpacing: 6,
        textAlign: "center",
        elevation: 2
    },

    button: {
        backgroundColor: "#1E6AE1",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    }

});