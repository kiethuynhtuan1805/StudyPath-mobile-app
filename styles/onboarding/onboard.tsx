import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 128,
    height: 128
  },
  titleWrapper: {
    flexDirection: "row",
  },
  titleTextShape1: {
    position: "absolute",
    left: -28,
    top: -20,
  },
  titleText: {
    fontSize: hp("4%"),
    textAlign: "center",
  },
  titleTextShape2: {
    position: "absolute",
    right: -40,
    top: -20,
  },
  titleShape3: {
    position: "absolute",
    left: 60,
  },
  dscpWrapper: {
    marginTop: 30,
  },
  dscpText: {
    textAlign: "center",
    color: "#575757",
    fontSize: hp("2%"),
  },
  buttonWrapper: {
    backgroundColor: "#2FD1C5",
    width: wp("92%"),
    paddingVertical: 18,
    borderRadius: 16,
    marginTop:40,
    height: 64,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  welcomeButtonStyle:{
    backgroundColor: "#2FD1C5",
    width: "100%",
    height: 64,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  }
});
