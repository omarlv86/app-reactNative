import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";

const widthScreen = Dimensions.get("window").width;


export default function AddRestaurantForm(props){
    //console.log(props);
    const { toastRef, setIsLoading, navigation } = props;
    const [restaurantName, setRestaurantName] = useState("")
    const [restaunrantAddress, setRestaurantAddress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")
    const [imageSelected, setImageSelected] = useState([])


    const addRestaurant = () => {
        console.log("Ok");
        //console.log("restaurantName: " +restaurantName);
        //console.log("restaunrantAddress: " +restaunrantAddress);
        //console.log("restaurantDescription: " +restaurantDescription);
        console.log(imageSelected);
    }

    return(
        <ScrollView style={styles.ScrollView}>
          <ImageRestaurant imagenRestaurant={imageSelected[0]}/>
          <FormAdd 
            setRestaurantName={setRestaurantName}
            setRestaurantAddress={setRestaurantAddress}
            setRestaurantDescription={setRestaurantDescription}
          />
          <UploadImage 
            toastRef={toastRef} 
            imageSelected={imageSelected} 
            setImageSelected={setImageSelected}
          />
          <Button 
            title="Crear Restaurante"
            onPress={addRestaurant}
            buttonStyle={styles.btnAddRestaurant}
          />
        </ScrollView>
    )
}
function ImageRestaurant(props){
    const { imagenRestaurant} = props;

    return (
        <View styles={styles.viewPhoto}>
          <Image 
            source={
                imagenRestaurant 
                ? { uri: imagenRestaurant} 
                : require("../../../assets/img/no-image.png")}
            style={{ width: widthScreen, height: 200}}
          />
        </View>
    )
}

function FormAdd(props){
    const { 
        setRestaurantName, 
        setRestaurantAddress, 
        setRestaurantDescription
    } = props;
    return(
        <View style={styles.viewForm}>
            <Input 
              placeholder="Nombre del restaurante"
              containerStyle={ styles.input }
              onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input 
              placeholder="Direccion"
              containerStyle={ styles.input }
              onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input 
              placeholder="Descripcion del restaurante"
              multiline={true}
              inputContainerStyle={ styles.textArea}
              onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

function UploadImage(props){
    const { toastRef, imageSelected, setImageSelected } = props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA
        );
        
        //console.log(resultPermissions);
        if(resultPermissions === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galeria", 3000);
        }else {
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4,3]
            })
            //console.log(result);
            if(result.cancelled){
                toastRef.current.show("Ha cerrado la galeria sin seleccionar ninguna imagen", 2000);
            }else{
               // console.log(result.uri);
               //setImageSelected(result.uri);
               setImageSelected([...imageSelected, result.uri])
            }
        }
    }

    const removeImage = (image) => {

        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro de querer eliminar la imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress:() =>{
                        setImageSelected(
                            filter(imageSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: false}
        )
    } 

    return (
        <View style={styles.viewImage}>
            {size(imageSelected) < 5 && (
              <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
              />
            )}
          
          {map(imageSelected, (imageRestaurant, index) => (
               <Avatar 
                 key={index}
                 style={styles.miniatureStyle}
                 source={{ uri: imageRestaurant }}
                 onPress={() => removeImage(imageRestaurant)}
               />
          ))}
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView:{
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,

    },
    input:{
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImage:{
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height:70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: "19%",
        height:70,
        marginRight: 5
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})