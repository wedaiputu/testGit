import { NavigationContainer } from "@react-navigation/native";
import { LoginContext } from "../contexts/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import LoginPage from "../screens/LoginPage";
import HomeScreen from "../screens/HomeScreen";
import PostsAdd from "../screens/PostsAdd";
import RegisterPage from "../screens/RegisterPage";
import UserDetail from "../screens/userDetail";

const Stack = createNativeStackNavigator();

export default function TestStack() {
  const { login } = useContext(LoginContext);
  return (
    <Stack.Navigator>
      {!login ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          
        </>
      ) : (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
            />

          <Stack.Screen
            name="PostsAdd"
            component={PostsAdd}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
