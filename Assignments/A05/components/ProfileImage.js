import React from "react";
import { StyleSheet, Image } from "react-native";
import {Colors} from "./styles";
const { brand, darkLight } = Colors;

const ProfileImage = ({ CandyLogoSource, profileImage }) => {
  const imageSource = profileImage
    ? { uri: profileImage }
    : CandyLogoSource;

  return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 6,
    borderColor: brand,
  },
});
export default ProfileImage;
