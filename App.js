import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

export default function App() {
  const apiKey = '0c99956957e556bec76520a8849a54a4';
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('status', status)
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
        console.log('location', location)
        setLocation(location);
        setIsLoading(false);
      })();
    }, [])
  return (
      isLoading ? <Loading /> : <Text>location</Text>
  );
}


