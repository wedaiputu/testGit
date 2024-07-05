import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../queries/gql";
import { LoginContext } from "../contexts/LoginContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../styles/Form";

export default function LoginPage({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken } = useContext(LoginContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  
  const [login, { data , error }] = useLazyQuery(LOGIN, {
    variables: input,
  });

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value,
    });
  }

  useEffect(() => {
    console.log(input);
    login();
  }, [input.email, input.password]);


  
  return (
    <>
      <StatusBar backgroundColor={"#181818"} />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.topView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/T-2.png")}
                style={{
                  width: 120,
                  height: 140,
                }}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            {errorMessage && (
              <Text
                style={{
                  color: "#DE0000",
                  marginTop: 10,
                }}
              >{`*${errorMessage}`}</Text>
            )}
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleInput("email", text);
                }}
              />
              <View style={styles.inputLogo}>
                <FontAwesome5 name="user-alt" size={15} color="white" />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleInput("password", text);
                }}
              />
              <View style={styles.inputLogo}>
                <FontAwesome5 name="lock" size={15} color="white" />
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={async () => {
                console.log(data.userLogin);
                if (data?.userLogin.access_token) {
                  await setToken(data.userLogin.access_token);
                } else {
                  setErrorMessage(error.message);
                }
              }}
            >
              <View style={styles.submitButton}>
                <Text style={styles.textButton}>Log In</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={async () => {
                  if (data?.userLogin?.access_token) {
                    await setToken(data.userLogin.access_token);
                  } else {
                    console.log(error);
                    setErrorMessage(error?.message);
                  }
              }}
            >
              <View style={styles.submitButton}>
                <Text style={styles.textButton}>Log In</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <Text style={styles.text}>Forgot Password ?</Text>
            </View>
            <View style={{}}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("RegisterPage")}
              >
                <View style={styles.submitButton2}>
                  <Text style={styles.textButton2}>Create New Accounts</Text>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  padding: 0,
                  margin: 0,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/logoMeta.png")}
                  style={{
                    width: 150,
                    height: 100,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
