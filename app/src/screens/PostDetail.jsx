import { useContext } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostDetail({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Back</Text>
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
    </>
  );
}
