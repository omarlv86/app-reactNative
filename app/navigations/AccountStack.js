import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
              name="search"
              component={Account}
              options={{ title: "Mi cuenta" }}
            />
            <Stack.screen
              name="Login"
              component={Login}
              options={{ title: "Iniciar sesión"}}
            >
            </Stack.screen>
        </Stack.Navigator>
        
    )
}