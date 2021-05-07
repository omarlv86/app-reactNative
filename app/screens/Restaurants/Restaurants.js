import React,{ useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";


const db = firebase.firestore(firebaseApp);

export default function Restautants(props){
    const { navigation } = props;
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [startRestaurant, setStartRestaurant] = useState(null);
    const limitRestaurant = 5;
    //console.log(totalRestaurants);
    console.log(restaurants);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
          //console.log(userInfo);
          setUser(userInfo);
        })
    }, []);

    useEffect(() => {
        db.collection("restaurants").get().then((snap) => {
            setTotalRestaurants(snap.size);
        });

        const resultRestaurants = [];

        db.collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurant).get().then((response) => {
            setStartRestaurant(response.docs[response.docs.length -1]);

            response.forEach((doc) => {
                //console.log(doc.data());
                //console.log(doc.id)
                const restaurant = doc.data();
                restaurant.id = doc.id;
                //console.log(restaurant);

                resultRestaurants.push(restaurant);
            });
            setRestaurants(resultRestaurants);
        })
    }, [])

    return(
        <View style={styles.viewBody}>
            <Text>Restaurants...</Text>

            { user && (
                <Icon
                reverse 
                type="material-community" 
                name="plus" 
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("add-restaurant")}
              />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer:{
        position:"absolute",
        bottom: 0,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    }
});