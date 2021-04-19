import React /* { useEffect }*/ from 'react';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/Utils/firebase";
//import * as firebase from "firebase";


export default function App() {

  /*  Verificando que exista conexion con firebase
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }, []);
  */

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