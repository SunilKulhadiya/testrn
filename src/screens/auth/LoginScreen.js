import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import FormInput from "../../components/inputs/FormInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import AppImage from "../../components/layout/AppImage";
//import { Images } from "../../assets/images";
import { useTheme } from "../../theme/ThemeProvider";

import { useDispatch, useSelector } from "react-redux";
import { loginWithMPIN } from "../../redux/slices/auth/authSlice";


export default function LoginScreen({ navigation }) {

  //const theme = useTheme();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [loginType, setLoginType] = useState("mpin");

  const dispatch = useDispatch();

  const storedMpin = useSelector(state => state.auth.mpin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mpin, setMpin] = useState("");

  const handleLogin = () => {

    if (loginType === "mpin") {

      if (mpin.length !== 4) {
        alert("Enter valid MPIN");
        return;
      }

      dispatch(loginWithMPIN(mpin));

    } else {

      // simple password login example
      if (!username || !password) {
        alert("Enter username and password");
        return;
      }

      dispatch(loginWithMPIN(storedMpin)); 
      // OR create separate login reducer
    }

  };

  return (

    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      {/* <Text style={styles.logo}>💊</Text> */}
        {/* <AppImage
            source={Images.logo}
            width={90}
            height={90}
        /> */}
      <Text style={styles.title}>
        {t("login")}
      </Text>

      {/* Login Type Selector */}

      <View style={styles.loginOptions}>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setLoginType("password")}
        >
          <View style={[
            styles.radio,
            loginType === "password" && styles.radioActive
          ]} />
          <Text>Username & Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setLoginType("mpin")}
        >
          <View style={[
            styles.radio,
            loginType === "mpin" && styles.radioActive
          ]} />
          <Text>MPIN</Text>
        </TouchableOpacity>

      </View>

      {/* Username Login */}

      {loginType === "password" && (

        <>
          <FormInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />

          <FormInput
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </>

      )}

      {/* MPIN Login */}

      {loginType === "mpin" && (

        <FormInput
          label="MPIN"
          placeholder="Enter 4 digit MPIN"
          secureTextEntry
          value={mpin}
          onChangeText={setMpin}
        />

      )}

      <PrimaryButton
        title="Login"
        onPress={handleLogin}
      />

              <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Register")}
        >
          Are you new user? Register
        </Text>


    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    //backgroundColor: theme.background
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600"
  },

  loginOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },

  option: {
    flexDirection: "row",
    alignItems: "center"
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 8
  },

  radioActive: {
    backgroundColor: "#4CAF50"
  }

});