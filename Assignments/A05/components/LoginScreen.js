import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator,} from "react-native";
import { Formik } from "formik";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import {initializeApp} from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
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

const { brand, darkLight, primary, white } = Colors;

//keyboard
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHtfsw4MM2HWaiPkUJqYCWAMJeBAhGX3Q",
  authDomain: "chatapp-8b3f9.firebaseapp.com",
  projectId: "chatapp-8b3f9",
  storageBucket: "chatapp-8b3f9.appspot.com",
  messagingSenderId: "785103347761",
  appId: "1:785103347761:web:bac8755b6a617190437510",
  measurementId: "G-CLP41P94S9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const LoginScreen = ({navigation, handleAuthentication}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      // Use Firebase authentication method to sign in
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      setLoading(false);
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("Login failed. Please check your credentials.");
      setMessageType("FAILED");
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingWrapper><StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          style={{ width: 280, height: 280, }}
          source={require("./../assets/CandyLogo.png")}
        />
        <PageTitle>Welcome!</PageTitle>
        <SubTitle>Account Login</SubTitle>


        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            if (values.email === '' || values.password === '') {
              setMessage('Please fill in all fields');
              setMessageType('FAILED');
              setSubmitting(false);
            } else {
              await handleLogin(values.email, values.password);
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="myemail@gmail.com"
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
              <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting && (
              <StyledButton onPress={handleSubmit} disable={loading}>
                  <ButtonText style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{loading ? <ActivityIndicator size="large" color={primary} /> : 'Login'}</ButtonText>
                </StyledButton>)}


              {isSubmitting && (
              <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary}/>
                </StyledButton>)}


              <Line />
              <StyledButton google={true} onPress={() => console.log('Google signin stuff')}>
                <Fontisto name="google" color={white} size={20} />
                <ButtonText google={true} style={{ color: "#fff", fontSize: 15, fontWeight: "bold", flexDirection: "row" }}>Sign In with Google placeholder*</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink onPress={() => navigation.navigate('SignupScreen')}>
                  <TextLinkContent> Signup</TextLinkContent>
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


export default LoginScreen;
