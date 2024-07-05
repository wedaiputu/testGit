import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ffffff", 
  },
  text: {
    color: "#000000",
    justifyContent: "center"
  },
  textButton: {
    color: "#ffffff",
    justifyContent: "center",
    fontWeight: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  textBold: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  bottomView: {
    flex: 2,
    backgroundColor: "#ffffff",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 40,
    paddingStart: 20,
    paddingEnd: 20, 
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 0.6, 
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#000000",
    fontSize: 16,
    padding: 10
  },
  inputLogo: {
    marginStart: 15,
  },
  submitButton: {
    backgroundColor: "#1877f2",
    marginTop: 20,
    alignItems: "center",
    borderRadius: 30, 
    padding: 15,
  },
  submitButton2: {
    backgroundColor: "white",
    marginTop: 100,
    alignItems: "center",
    borderRadius: 30, 
    padding: 17,
    borderWidth: 0.7,
    borderColor: "#316FF6"
  },
  textButton2: {
    color: "#316FF6",
    justifyContent: "center",
    fontWeight: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
