import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../styles/Form";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../queries/gql";

export default function RegisterPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [register] = useMutation(REGISTER);

  const handleRegister = async () => {
    try {
      await register({
        variables: { name, email, password, username },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={"#181818"} />
      <SafeAreaView style={{ flex: 2 }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text>Back to login</Text>
          </TouchableWithoutFeedback>

          <View style={styles.bottomView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="grey"
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="grey"
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="grey"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={handleRegister}
            >
              <View style={styles.submitButton}>
                <Text style={styles.textButton}>Register</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
