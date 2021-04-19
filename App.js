import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from "./app/navigations/Navigation";

export default function App() {
  return <Navigation />;
}

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hola Mundo en React Native!</Text>
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
*/