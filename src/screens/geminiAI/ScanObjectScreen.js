import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from "react-native";
import { useTranslation } from "react-i18next";

import { launchCamera, launchImageLibrary }
    from "react-native-image-picker";
import { AnalyzeByGemini1 } from "./AnalyzeByGemini1";
import { shrinkImageIfNeeded } from "../../Helper/shrinkImageIfNeeded" 
import TopAppBar from "../../components/layout/TopAppBar";
import AppConstant from "../../Helper/Constant";

// import { analyzeMedicine }
//     from "../services/geminiService";

export default function ScanObjectScreen({ navigation, route }) {

    const { title } = route.params || {};

    const defaultImage =
    title === "med_analyzer"
        ? require("../../assets/images/scan_med.jpeg")
        : require("../../assets/images/scan_food.jpg");

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    console.log("37 , ScanObjectScreen.js , Language : ", i18n.language);

    //with Gallery
    const pickImage = async () => {

        launchImageLibrary(
            { 
                 mediaType: "photo",
                includeBase64: true
            },
            async response => {

                if (response.assets) {
                    setLoading(true);

                    const img = response.assets[0];

                    setImage(img.uri);

                    const base64 = await shrinkImageIfNeeded(img);

                    const data = await AnalyzeByGemini1(
                        base64,
                        i18n.language   // ✅ pass language
                    );


                    navigation.navigate(
                        "GeminiAIResponseScreen",
                        { data, image: img.uri }
                    );


                    setLoading(false);

                }

            }
        )

    }

    //with Camera
    const takePhoto = async () => {

        launchCamera(
            {
                mediaType: "photo",
                includeBase64: true
            },
            async response => {

                if (response.assets) {
                    setLoading(true);

                    const img = response.assets[0];

                    setImage(img.uri);

                    const base64 = await shrinkImageIfNeeded(img);

                    const data = await AnalyzeByGemini1(
                        base64,
                        i18n.language   // ✅ pass language
                    );

                    navigation.navigate(
                        "GeminiAIResponseScreen",
                        { data, image: img.uri, title: title }
                    );
                }

            }
        )

    }

    return (

        <View style={styles.container}>

                  <TopAppBar
                    title={`common.${title}`}
                    showBack={true}
                    onBackPress={() => navigation.goBack()}
                  />
            
            <View style={styles.subcontainer}>

                {image ? (
                <Image
                    source={{ uri: image }}
                    style={styles.preview}
                />
                ) : (
                <Image
                    source={defaultImage}
                    style={styles.banner}
                    resizeMode="contain"
                />
                )}

                {loading &&
                    <ActivityIndicator size="large" />
                }

                {!loading && (
                    <View style={{ flexDirection: "column", gap: 10 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePhoto}
                        >

                            <Text style={styles.btnText}>
                                {t("common.takephoto")}
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={pickImage}
                        >

                            <Text style={styles.btnText}>
                                {t("common.uploadimage")}
                            </Text>

                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </View>

    )

}
//----
const styles = StyleSheet.create({

    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6FA",
        height: AppConstant.DEVICE_HEIGHT
    },
    subcontainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6FA",
        height: AppConstant.DEVICE_HEIGHT * 0.9,
        padding: 5
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30
    },

    preview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20
    },

    button: {
        backgroundColor: "#2E7D32",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        alignItems: "center"
    },

    btnText: {
        color: "#fff",
        fontWeight: "bold"
    }

});
