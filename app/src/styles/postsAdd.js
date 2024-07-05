import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    // backgroundColor: "red"
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    fontSize: 16,
    color: "#1877f2",
  },
  buttonText: {
    fontSize: 16,
    color: "#1877f2",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  multilineInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#1877f2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
