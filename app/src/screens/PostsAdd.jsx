import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { styles } from "../styles/postsAdd";
import Users from "../components/Users";
import ProfileBar from "../components/ProfileBar";
import { useMutation } from "@apollo/client";
import { ADD, POSTS } from "../queries/gql";

export default function PostsAdd({ navigation }) {
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const [register] = useMutation(ADD, {
    refetchQueries: [
      POSTS
    ]
  })

  const handlePostSubmit = async () => {
    try {
      await register({
        variables: {
          content,
          tags: tags.split(" "),
          imgUrl
        }
      })
      navigation.navigate("HomeScreen")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <ProfileBar />

          <TextInput
            style={styles.input}
            placeholder="Tags"
            value={tags}
            onChangeText={(text) => setTags(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={imgUrl}
            onChangeText={(text) => setImgUrl(text)}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Content"
            multiline
            numberOfLines={4}
            value={content}
            onChangeText={(text) => setContent(text)}
          />

          <TouchableOpacity
            onPress={handlePostSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.textButton}>Post</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
