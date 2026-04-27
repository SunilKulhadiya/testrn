import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppConstant from "../../Helper/Constant";
import TopAppBar from "../../components/layout/TopAppBar";


export default function GeminiAIResponseScreen({ route }) {

    const { data } = route.params;
    const { image } = route.params;
    const { title } = route.params;

    return (
        <View style={styles.container}>
        
            <TopAppBar
            title={`common.${title}`}
            showBack={true}
            onBackPress={() => navigation.goBack()}
            />
                    
            <View style={styles.subcontainer}>
        
                <ScrollView style={styles.container}>

                    {/* Header */}

                    <View style={styles.header}>

                        {/* <Icon name="pill" size={40} color="#fff" /> */}
                        <Image
                            source={{ uri: image }}
                            style={styles.preview}
                        />

                        <Text style={styles.medicineName}>
                            {data.name}
                        </Text>

                        <Text style={styles.generic}>
                            {data.generic_name}
                        </Text>

                        <Text style={styles.brand}>
                            {data.brand_name}
                        </Text>

                        {/* Veg + Risk */}

                        <View style={styles.badgeRow}>
                            <VegBadge status={data.veg_status} />
                            <RiskBadge level={data.risk_level} />
                        </View>

                    </View>

                    {/* Safety Score */}

                    <SafetyScore score={data.safety_score} />

                    {/* Manufacturer */}

                    <Section icon="factory" title="Manufacturer">
                        <Text style={styles.text}>
                            {data.manufacturer}
                        </Text>
                    </Section>

                    {/* Uses */}

                    <Section icon="medical-bag" title="Uses">
                        <List items={data.uses} />
                    </Section>

                    {/* Diabetes Impact */}

                    <Section icon="diabetes" title="Diabetes Impact">

                        <RiskBadge level={data.diabetes_impact?.risk_level} />

                        <Text style={styles.text}>
                            Severity: {data.diabetes_impact?.severity_score}/10
                        </Text>

                        <Text style={styles.subTitle}>Effects</Text>
                        <List items={data.diabetes_impact?.effects} />

                        <Text style={styles.subTitle}>Recommendation</Text>
                        <Text style={styles.text}>
                            {data.diabetes_impact?.recommendation}
                        </Text>

                    </Section>


                    {/* Blood Pressure Impact */}

                    <Section icon="heart-pulse" title="Blood Pressure Impact">

                        <RiskBadge level={data.blood_pressure_impact?.risk_level} />

                        <Text style={styles.text}>
                            Severity: {data.blood_pressure_impact?.severity_score}/10
                        </Text>

                        <Text style={styles.subTitle}>Effects</Text>
                        <List items={data.blood_pressure_impact?.effects} />

                        <Text style={styles.subTitle}>Recommendation</Text>
                        <Text style={styles.text}>
                            {data.blood_pressure_impact?.recommendation}
                        </Text>

                    </Section>

                    {/* Conditions */}

                    <Section icon="stethoscope" title="Conditions Treated">
                        <List items={data.conditions_treated} />
                    </Section>

                    {/* Dosage */}

                    <Section icon="clock-outline" title="Dosage">
                        <Text style={styles.text}>
                            Adult: {data.dosage?.adult}
                        </Text>
                        <Text style={styles.text}>
                            Children: {data.dosage?.children}
                        </Text>
                        <Text style={styles.text}>
                            Max Daily Dose: {data.dosage?.max_daily_dose}
                        </Text>
                    </Section>

                    {/* Composition */}

                    <Section icon="flask" title="Composition">
                        {data.composition?.map((item, i) => (
                            <View key={i} style={styles.compositionRow}>
                                <Text style={styles.chemName}>
                                    {item.chemical_name}
                                </Text>
                                <Text style={styles.strength}>
                                    {item.strength}
                                </Text>
                            </View>
                        ))}
                    </Section>

                    {/* Benefits */}

                    <Section icon="thumb-up-outline" title="Benefits">
                        <List items={data.benefits} />
                    </Section>

                    {/* Side Effects */}

                    <Section icon="alert-circle-outline" title="Side Effects">

                        <Text style={styles.subTitle}>Common</Text>
                        <List items={data.side_effects?.common} />

                        <Text style={styles.subTitle}>Serious</Text>
                        <List items={data.side_effects?.serious} />

                    </Section>

                    {/* Drug Interactions */}

                    <Section icon="alert-octagon-outline" title="Drug Interactions">
                        <List items={data.drug_interactions} />
                    </Section>

                    {/* Warnings */}

                    <Section icon="alert" title="Warnings">
                        <Text style={styles.text}>
                            Pregnancy: {data.warnings?.pregnancy}
                        </Text>
                        <Text style={styles.text}>
                            Breastfeeding: {data.warnings?.breastfeeding}
                        </Text>
                        <Text style={styles.text}>
                            Alcohol: {data.warnings?.alcohol}
                        </Text>
                    </Section>

                    {/* Disclaimer */}

                    <View style={styles.disclaimerBox}>
                        <Text style={styles.disclaimer}>
                            {data.disclaimer}
                        </Text>
                    </View>

                </ScrollView>
            </View>
        </View>    
    );
}

//--------------------
const Section = ({ icon, title, children }) => (
    <View style={styles.card}>
        <View style={styles.sectionHeader}>
            <Icon name={icon} size={22} color="#2E7D32" />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
    </View>
);

const List = ({ items }) => {
    if (!items) return null;
    return items.map((item, index) => (
        <Text key={index} style={styles.listItem}>
            • {item}
        </Text>
    ));
};

/* ---------------- Veg / NonVeg Badge ---------------- */

const VegBadge = ({ status }) => {

    let label = "Unknown";
    let color = "#9E9E9E";

    if (status === "veg") {
        label = "🌱 Vegetarian";
        color = "#2E7D32";
    }

    if (status === "non-veg") {
        label = "🍖 Non-Vegetarian";
        color = "#C62828";
    }

    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{label}</Text>
        </View>
    );
};

/* ---------------- Safety Score ---------------- */

const SafetyScore = ({ score }) => {

    const percent = (score || 0) * 20;

    return (
        <View style={styles.scoreCard}>

            <Text style={styles.scoreTitle}>
                Safety Score
            </Text>

            <View style={styles.scoreBarBg}>
                <View
                    style={[
                        styles.scoreBar,
                        { width: `${percent}%` }
                    ]}
                />
            </View>

            <Text style={styles.scoreText}>
                {score || "N/A"} / 5
            </Text>

        </View>
    );
};

/* ---------------- Risk Level ---------------- */

const RiskBadge = ({ level }) => {

    let color = "#4CAF50";
    let text = "Low Risk";

    if (level === "medium") {
        color = "#FB8C00";
        text = "Medium Risk";
    }

    if (level === "high") {
        color = "#E53935";
        text = "High Risk";
    }

    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};
//------------------------
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
        height: AppConstant.DEVICE_HEIGHT,
        width: AppConstant.DEVICE_WIDTH
    },
    subcontainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6FA",
        height: AppConstant.DEVICE_HEIGHT * 0.9,
        padding: 5
    },

    header: {
        backgroundColor: "#2E7D32",
        padding: 20,
        alignItems: "center"
    },

    preview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20
    },

    medicineName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 6
    },

    generic: {
        color: "#E8F5E9"
    },

    brand: {
        color: "#C8E6C9"
    },

    badgeRow: {
        flexDirection: "row",
        marginTop: 10
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 4
    },

    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600"
    },

    scoreCard: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 15,
        borderRadius: 10
    },

    scoreTitle: {
        fontWeight: "600"
    },

    scoreBarBg: {
        height: 8,
        backgroundColor: "#E0E0E0",
        borderRadius: 5,
        marginTop: 6
    },

    scoreBar: {
        height: 8,
        backgroundColor: "#4CAF50",
        borderRadius: 5
    },

    scoreText: {
        marginTop: 5,
        fontSize: 12
    },

    card: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 15,
        borderRadius: 10
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 6
    },

    text: {
        fontSize: 14,
        marginVertical: 2
    },

    listItem: {
        fontSize: 14,
        marginVertical: 2
    },

    compositionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4
    },

    chemName: {
        fontWeight: "500"
    },

    strength: {
        color: "#555"
    },

    subTitle: {
        marginTop: 6,
        fontWeight: "600"
    },

    disclaimerBox: {
        margin: 15,
        padding: 15,
        backgroundColor: "#FFF3E0",
        borderRadius: 10
    },

    disclaimer: {
        fontSize: 12,
        color: "#444"
    }

});