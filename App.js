import React /* { useEffect }*/ from 'react';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/Utils/firebase";
//import * as firebase from "firebase";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer", "It appears that", "YellowBox has been","FlatList"]);

export default function App() {
  return <Navigation />;
}
