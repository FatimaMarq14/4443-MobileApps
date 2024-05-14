import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { StyledContainer, InnerContainer, PageTitle, StyledTextInput, StyledButton, MsgBox, Line } from "./styles";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleMessageSend = (values, { resetForm }) => {
    if (values.message.trim() !== "") {
      setMessages([...messages, values.message]);
      resetForm();
    }
  };

  return (
    <StyledContainer>
        <PageTitle>Welcome to Chat</PageTitle>
        
        <ScrollView style={{ flex: 1 }}>
          {messages.map((message, index) => (
            <View key={index} style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
              <Text key={index} style={{ alignSelf: "flex-end", backgroundColor: "#e6e6e6", padding: 10, borderRadius: 10 }}>{message}</Text>
            </View>
          ))}
        </ScrollView>

        <Formik
          initialValues={{ message: "" }}
          onSubmit={handleMessageSend}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
              <KeyboardAvoidingView style={{ flex: 1 }}>
                <StyledTextInput
                  onChangeText={handleChange("message")}
                  onBlur={handleBlur("message")}
                  value={values.message}
                  placeholder="Message"
                />
              </KeyboardAvoidingView>
              
              <StyledButton onPress={handleSubmit}>
                <Ionicons name="send" size={20} color="#fff" />
              </StyledButton>
            </View>
          )}
        </Formik>
    </StyledContainer>
  );
};

export default ChatScreen;
