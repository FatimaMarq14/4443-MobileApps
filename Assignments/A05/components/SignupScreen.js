import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Formik } from "formik";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  Colors,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "./styles";

const { brand, darkLight, primary } = Colors;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHtfsw4MM2HWaiPkUJqYCWAMJeBAhGX3Q",
  authDomain: "chatapp-8b3f9.firebaseapp.com",
  projectId: "chatapp-8b3f9",
  storageBucket: "chatapp-8b3f9.appspot.com",
  messagingSenderId: "785103347761",
  appId: "1:785103347761:web:bac8755b6a617190437510",
  measurementId: "G-CLP41P94S9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (email, password) => {
    try {
      setLoading(true);
      // Use Firebase authentication method to sign in
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created in successfully!");
      setLoading(false);
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("Signup failed. Please check your credentials.");
      setMessageType("FAILED");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Candy Store</PageTitle>
          <SubTitle>Account Signup </SubTitle>

          <Formik
            initialValues={{
              First_name: "",
              last_name: "",
              email: "",
              password: "",
              verifyPassword: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              if (
                values.first_name === "" ||
                values.last_name === "" ||
                values.email === "" ||
                values.password === "" ||
                values.verifyPassword === ""
              ) {
                setMessage("Please fill in all fields");
                setMessageType("FAILED");
                setSubmitting(false);
              } else if (values.password !== values.verifyPassword) {
                setMessage("Passwords do not match");
                setMessageType("FAILED");
                setSubmitting(false);
              } else {
                await handleSignup(values.email, values.password);
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="First Name"
                  icon="person"
                  placeholder="Joe"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  value={values.first_name}
                />

                <MyTextInput
                  label="Last Name"
                  icon="person"
                  placeholder="Mane"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  value={values.last_name}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Jo3Man3@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Verify password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("verifyPassword")}
                  onBlur={handleBlur("verifyPassword")}
                  value={values.verifyPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                <StyledButton onPress={handleSubmit} disabled={isSubmitting}>
                  <ButtonText>
                    {isSubmitting ? "Signing up..." : "Signup"}
                  </ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("LoginScreen")}>
                    <TextLinkContent> Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
                <Line />
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={25} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignupScreen;
