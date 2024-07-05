import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      commentsContainer: {
        flex: 1,
        marginBottom: 10,
      },
      commentText: {
        fontSize: 16,
        marginBottom: 5,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,
      },
      input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingLeft: 10,
        marginRight: 10,
      },
});
