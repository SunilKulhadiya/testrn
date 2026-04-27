import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

import { getMPIN, updateMPIN } from "../../database/services/userService";

export default function UpdateMPINScreen({ navigation }) {

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    const [currentMpin, setCurrentMpin] = useState("");
    const [newMpin, setNewMpin] = useState("");
    const [confirmMpin, setConfirmMpin] = useState("");

    const handleUpdate = () => {

        const storedMPIN = getMPIN();

        if (currentMpin !== storedMPIN) {
            Alert.alert(t("errors.somethingWrong"), "Invalid current MPIN");
            return;
        }

        if (newMpin.length !== 4) {
            Alert.alert("MPIN must be 4 digits");
            return;
        }

        if (newMpin !== confirmMpin) {
            Alert.alert("MPIN does not match");
            return;
        }

        updateMPIN(newMpin);

        Alert.alert("MPIN Updated Successfully");

        navigation.goBack();

    };

    return (

        <View style={styles.container}>

            <View style={styles.iconBox}>
                <Icon name="shield-key-outline" size={60} color="#1E6AE1" />
            </View>

            <Text style={[styles.title, { textAlign: isRTL ? "right" : "center" }]}>
                {t("auth.changeMpin")}
            </Text>


            {/* CURRENT MPIN */}

            <View style={styles.inputCard}>

                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    Current MPIN
                </Text>

                <TextInput
                    style={[styles.input, { textAlign: isRTL ? "right" : "center" }]}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    value={currentMpin}
                    onChangeText={setCurrentMpin}
                />

            </View>


            {/* NEW MPIN */}

            <View style={styles.inputCard}>

                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("auth.mpin")}
                </Text>

                <TextInput
                    style={[styles.input, { textAlign: isRTL ? "right" : "center" }]}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    value={newMpin}
                    onChangeText={setNewMpin}
                />

            </View>


            {/* CONFIRM MPIN */}

            <View style={styles.inputCard}>

                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    Confirm MPIN
                </Text>

                <TextInput
                    style={[styles.input, { textAlign: isRTL ? "right" : "center" }]}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    value={confirmMpin}
                    onChangeText={setConfirmMpin}
                />

            </View>


            {/* UPDATE BUTTON */}

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
            >

                <Text style={styles.buttonText}>
                    {t("buttons.update")}
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
        fontWeight: "bold",
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