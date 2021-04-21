import React, { useRef } from "react";
import { StyleSheet, View, Image} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, {DURATION} from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
    const toastRef = useRef();


    return(
        <KeyboardAwareScrollView>
        <View>
            <Image 
              source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef}/>
            </View>
        </View>
        <Toast ref={toastRef} position="center" opaticity={0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
  logo:{
      width: "100%",
      height: 150,
      marginTop: 20,
  },
  viewForm:{
      marginRight: 40,
      marginLeft:40,
  }
});