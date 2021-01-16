import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './src/components/Hello';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Hello bang>Die</Hello>
      <Hello style={{ fontSize: 16 }}>Small World</Hello>
      {/* {{}}の中にcssのスタイルを書く */}
      {/* ここではbang={true}だがbangだけでbang={true｝の意味になる */}
      {/* eslint-disable */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
