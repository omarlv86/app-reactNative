import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";
import Modal from "../Modal";
import * as Location from "expo-location";
import MapView from "react-native-maps";


const widthScreen = Dimensions.get("window").width;


export default function AddRestaurantForm(props){
    //console.log(props);
    const { toastRef, setIsLoading, navigation } = props;
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null)


    const addRestaurant = () => {
        if(!restaurantName || !restaurantAddress || !restaurantDescription){
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        }else if(size(imageSelected) === 0){
            toastRef.current.show("El restaurante debe de tener al menos una foto");
        }else if(!locationRestaurant){
            toastRef.current.show("Tienes que guardar la localizacion del restaurante en el mapa");
        }else{
            console.log("Ok");
        }
    }

    return(
        <ScrollView style={styles.ScrollView}>
          <ImageRestaurant imagenRestaurant={imageSelected[0]}/>
          <FormAdd 
            setRestaurantName={setRestaurantName}
            setRestaurantAddress={setRestaurantAddress}
            setRestaurantDescription={setRestaurantDescription}
            setIsVisibleMap={setIsVisibleMap}
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
          <Map 
            isVisibleMap={isVisibleMap} 
            setIsVisibleMap={setIsVisibleMap}
            setLocationRestaurant={setLocationRestaurant}
            toastRef={toastRef} 
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
        setRestaurantDescription,
        setIsVisibleMap
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
              rightIcon={{
                  type: "material-community",
                  name: "google-maps",
                  color: "#c2c2c2",
                  onPress: () => setIsVisibleMap(true)
              }}
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

function Map(props){
  const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
      //funcion anonima autoejecutable
     (async() => {
       const resultPermissions = await Permissions.askAsync(
           Permissions.LOCATION
       );
      // console.log(resultPermissions);
      const statusPermissions = resultPermissions.permissions.location.status;

      if(statusPermissions !== "granted"){
          toastRef.current.show("Tienes que aceptar los permisos de localizacion para crear un restaurante.", 3000);
      }else{
          const loc = await Location.getCurrentPositionAsync({});
          //console.log(loc);
          setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
          });
      }
     })()
  }, [])

  const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localizacion guardada correctamente");
    setIsVisibleMap(false);
  }

  return (
      <Modal 
      isVisible={isVisibleMap} 
      setIsVisible={setIsVisibleMap} >
          <View>
              {location && (
                  <MapView
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={(region) =>setLocation(region) }
                  >
                    <MapView.Marker 
                      coordinate={{
                          latitude: location.latitude,
                          longitude: location.longitude
                      }}
                      draggable
                    />
                  </MapView>
              )}
            <View style={styles.viewMapBtn}>
              <Button 
                title="Guardar ubicación"
                containerStyle={styles.viewMapBtnContainerSave}
                buttonStyle={styles.viewMapBtnSave}
                onPress={confirmLocation}
              />
              <Button 
                title="Cancelar ubicación" 
                containerStyle={styles.viewMapBtnContainerCancel}
                buttonStyle={styles.viewMapBtnCancel}
                onPress={() => setIsVisibleMap(false)}
              />
            </View>
          </View>
      </Modal>
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
        width: "18%",
        height:70,
        marginRight: 5
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    }
})