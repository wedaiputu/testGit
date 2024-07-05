import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {styles} from "../styles/Comments"

export default function Comments() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <Text key={index} style={styles.commentText}>
            {comment}
          </Text>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <TouchableOpacity onPress={addComment}>
          <MaterialCommunityIcons name="send" size={24} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

