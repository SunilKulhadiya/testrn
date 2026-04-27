import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Image
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

//import ProgressCircle1 from "../../components/progress_styles/ProgressCircle1";
import ReminderCard from "../../components/cards/ReminderCard";
import SectionTitle from "../../components/layout/SectionTitle";
import EmptyState from "../../components/states/EmptyState";

import {
    getTodayReminders,
    getAdherence,
    markReminderTaken,
    getMissedReminders
} from "../../database/services/reminderService";
import AppConstant from "../../Helper/Constant";

import { useTranslation } from "react-i18next";
import { useTheme } from "../../theme/ThemeProvider";

export default function HomeScreen({ navigation }) {

    const { t } = useTranslation();
    const { theme } = useTheme();

    const [reminders, setReminders] = useState([]);
    const [progress, setProgress] = useState(0);
    const [missed, setMissed] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {

        loadData();

    }, []);


    const loadData = () => {

        const today = getTodayReminders();
        setReminders([...today]);

        const adherence = getAdherence();
        setProgress(Math.round(adherence));

        const missedData = getMissedReminders();
        setMissed(missedData.length);

    };


    const onRefresh = useCallback(() => {

        setRefreshing(true);

        setTimeout(() => {

            loadData();
            setRefreshing(false);

        }, 500);

    }, []);


    const handleTaken = (id) => {

        //markReminderTaken(id);
        loadData();

    };


    return (

        <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                {/* HEADER */}

                <View style={styles.header}>

                    <Text style={[styles.hello, { color: "#000000" }]}>
                        "hello, Dear 👋
                    </Text>

                    <Text style={[styles.subtitle, { color: "#000000" }]}>
                        healthOverview
                    </Text>

                </View>


                {/* PROGRESS */}

                {/* <View style={styles.progressCard}>

                    <ProgressCircle1
                        progress={progress}
                        title={t("medicineAdherence")}
                    />

                    <Text style={[styles.progressDesc, { color: theme.subText }]}>
                        {t("adherenceToday")}
                    </Text>

                </View> */}


                {/* TODAY REMINDERS */}

                <View style={styles.section}>

                    <SectionTitle title={t("todayTimeline")} />

                    {reminders.length === 0 && (

                        <EmptyState
                            icon="pill"
                            text={t("noMedicinesToday")}
                        />

                    )}

                <SectionTitle title={t("common.analyze")} />

                <View style={styles.analyzerContainer}>
                    <TouchableOpacity
                        style={styles.analyzerSubContainer}
                        onPress={() => 
                            navigation.navigate("ScanObjectScreen", {
                                title: "food_analyzer",
                            })
                        }>
                        <Image
                            source={ require('../../assets/images/scan_food.jpg')}
                            style={{
                                width: '100%',
                                height: AppConstant.DEVICE_HEIGHT * 0.15, // image = 90% of screen height
                                borderRadius: 15
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.analyzerSubContainer}
                        onPress={() => 
                            navigation.navigate("ScanObjectScreen", {
                                title: "med_analyzer",
                            })
                        }>
                        <Image
                            source={ require('../../assets/images/scan_med.jpeg')}
                            style={{
                                width: '100%',
                                height: AppConstant.DEVICE_HEIGHT * 0.15, // image = 90% of screen height
                                borderRadius: 15
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                </View>


                </View>


                {/* MISSED ALERT */}

                {missed > 0 && (

                    <View style={styles.alertCard}>

                        <MaterialCommunityIcons name="alert-circle" size={26} color="#FF5252" />

                        <View style={{ marginLeft: 10 }}>

                            <Text style={styles.alertTitle}>
                                {t("missedMedicine")}
                            </Text>

                            <Text style={styles.alertText}>
                                {t("missedCount", { count: missed })}
                            </Text>

                        </View>

                    </View>

                )}


            </ScrollView>


            {/* FAB */}


        </View>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    header: {
        padding: 20
    },

    hello: {
        fontSize: 24,
        fontWeight: "bold"
    },

    subtitle: {
        marginTop: 4
    },


    progressCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        elevation: 3
    },

    progressDesc: {
        marginTop: 10
    },


    section: {
        paddingHorizontal: 20
    },

    analyzerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: "100%",
        gap: 15
    },

    analyzerSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#b1afaf",
        width: "47%",
        borderRadius: 12
    },

    alertCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFECEC",
        margin: 20,
        padding: 15,
        borderRadius: 12
    },

    alertTitle: {
        fontWeight: "bold"
    },

    alertText: {
        color: "#666"
    },


    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#1976D2",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    }

});