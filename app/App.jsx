import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import LoginPage from "./src/screens/LoginPage";
import client from "./src/config/apolloClients";
import { LoginProvider } from "./src/contexts/LoginContext";
import HomeScreen from "./src/screens/HomeScreen";
import TestStack from "./src/navigations/testStack";



export default function App() {
  return (

    <ApolloProvider client={client} >
      <NavigationContainer>
        <LoginProvider children={
          <TestStack />
        } />
        
      </NavigationContainer>
    </ApolloProvider>
  )
}
