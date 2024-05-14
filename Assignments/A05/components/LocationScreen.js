import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Hardcoded places
      const hardcodedPlaces = [
        { name: 'Delilah', coordinates: { latitude: 33.9137, longitude: -98.4934 } },
        { name: 'Joe Mane', coordinates: { latitude: 33.8655, longitude: -98.5356 } },
        { name: 'Jane Doe', coordinates: { latitude: 33.8750, longitude: -98.5244 } },
        { name: 'Ramon', coordinates: { latitude: 33.8625, longitude: -98.5245 } },
        { name: 'Chicken', coordinates: { latitude: 33.3715, longitude: -98.7565 } },
      ];
      setPlaces(hardcodedPlaces);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        )}
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={place.coordinates}
            title={place.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
