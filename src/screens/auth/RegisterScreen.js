import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

import FormInput from "../../components/inputs/FormInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
//import AppImage from "../../components/layout/AppImage";
//import { Images } from "../../assets/images";

export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mpin, setMpin] = useState("");

  const handleRegister = () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      name,
      email,
      password,
      mpin
    });

    navigation.navigate("Login");

  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* <AppImage
        source={Images.logo}
        width={90}
        height={90}
      /> */}

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Manage your medicines easily
      </Text>

      <View style={styles.card}>

        <FormInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <FormInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <FormInput
          label="Confirm Password"
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <FormInput
          label="Create MPIN"
          placeholder="4 digit MPIN"
          secureTextEntry
          keyboardType="numeric"
          value={mpin}
          onChangeText={setMpin}
        />

        <PrimaryButton
          title="Register"
          onPress={handleRegister}
        />

        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Login
        </Text>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f5f7fb",
    justifyContent: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    elevation: 3
  },

  loginLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "600"
  }

});