import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "./ProfileImage";
import TheMango from "../assets/TheMango.png";
import {
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ProfileContainer,
  Avatar,
  StyledTextInput,
  RightIcon,
  Colors,
} from "./styles";

const { brand, darkLight } = Colors;

const ProfileScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedCandyIndex, setSelectedCandyIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "You need to enable permission to access the camera roll."
        );
      }
    })();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
      console.log("Profile Image Updated:", result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const searchCandies = async () => {
    try {
      const response = await fetch(`http://64.225.1.14:8084/candies/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.data);
      console.log("Candies Found:", data);
    } catch (error) {
      console.error("Error searching candies:", error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <ProfileContainer>
          <TouchableOpacity onPress={pickImageAsync}>
            <ProfileImage CandyLogoSource={TheMango} profileImage={profileImage} />
          </TouchableOpacity>
          <PageTitle>Welcome!</PageTitle>
          <StyledFormArea>
            <View>
              <RightIcon style={{ marginTop: -15 }}>
                <Ionicons name="search-sharp" size={30} color={brand} />
              </RightIcon>
              <StyledTextInput
                placeholder="Search for Candies..."
                placeholderTextColor={darkLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={searchCandies}
              />
            </View>
            <Line />
            <Line />

            <ScrollView style={{ maxHeight: 250, borderColor: brand, borderWidth: 3, padding: 5 }}>
              {searchResults.map((candy, index) => (
                <TouchableOpacity key={index} onPress={() => { setSelectedCandyIndex(index); toggleModal(); }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, borderColor: darkLight, borderWidth: 3 }}>
                    <Text style={{ fontSize: 15 }}>{candy.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <StyledButton onPress={() => navigation.navigate("LocationScreen")}>
                <ButtonText>Location</ButtonText>
              </StyledButton>
              <TouchableOpacity>
                <StyledButton onPress={() => navigation.navigate("ChatScreen")} style={{ backgroundColor: brand }}>
                  <ButtonText>   Chat   </ButtonText>
                </StyledButton>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
              style={{
                backgroundColor: brand,
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Logout
              </Text>
            </TouchableOpacity>
          </StyledFormArea>
        </ProfileContainer>
      </InnerContainer>
      {/* Modal for displaying candy price */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 20 }}>{searchResults[selectedCandyIndex]?.name}</Text>
            <Text style={{ fontSize: 18 }}>{`Price: $${searchResults[selectedCandyIndex]?.price}`}</Text>
            <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;
