import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {styles} from'../styles/UserId'
import { LoginContext } from "../contexts/LoginContext";
import { useQuery } from "@apollo/client";
import { USERBYID } from "../queries/gql";

export default function UserDetail({ navigation }){

  const {deleteToken} = useContext(LoginContext)
  const [user, setUser] = useState(null)

  

  const {data} = useQuery(USERBYID, {
    variables:{}
  })



  const userDummy = {
    name: "John Doe",
    profileImage:
      "https://i.pinimg.com/564x/c8/8a/8c/c88a8c3fdfb825ff06d7cf0527dc7879.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    follower: "4",
  };
  console.log(data,'=userDetail');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteToken("Login")}>
            <Text>LOG OUT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <Image
            source={{ uri: userDummy.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userDummy.name}</Text>
          <Text>Followers: {userDummy.follower}</Text>
          <Text style={styles.userBio}>{userDummy.bio}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

