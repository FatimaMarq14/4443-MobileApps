import styled from "styled-components/native"; // Use 'styled-components/native' for React Native components
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Ionicons, } from "@expo/vector-icons";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "rgb(150, 230, 230)",
  secondary: "rgb(229, 231, 235)",
  tertiary: "rgb(31, 41, 55)",
  darkLight: "rgb(156, 163, 175)",
  brand: "rgb(240, 10, 170)",
  lightBrand: "rgb(0, 200, 200)",
  green: "rgb(16, 185, 129)",
  red: "rgb(219, 68, 55)",
  white: "rgb(255, 255, 255)",
};

const { primary, secondary, tertiary, darkLight, brand, green, red, lightBrand, white } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 90}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${primary};
`;

export const ProfileContainer = styled(InnerContainer)`
padding: 25px;
padding-top: 10px;
justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 50px;
  border-width: 4px;
  border-color: ${brand};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ProfileImage = styled.Image`
  width: 60%;
  height: 30%;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
  font-size: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
  margin-bottom: 5px;
  font-weight: normal;
  `}
`;

export const SearchBar = styled.TextInput`
  background-color: ${secondary};
  border-radius: 10px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  margin-top: 20px;
`;

export const SearchBarInput = styled.TextInput`
  flex: 1;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 100px;
  padding-right: 100px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 5px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 35px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 35px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justified-content: center;
  align-items: center;
  border-radius: 20px;
  margin-vertical: 15px;
  height: 60px;

  ${(props) =>
    props.google == true &&
    `
  background-color: ${lightBrand};
  flex-direction: row;
  justify-content: center;
  border-color: ${primary};
  border-width: 2px;
  `}
`;

export const ButtonText = styled.Text`
  color: ${tertiary};
  font-size: 16px;

  ${(props) =>
    props.google == true &&
    `
  padding: 25px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props => props.type == "SUCCESS" ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-item: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-item: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

