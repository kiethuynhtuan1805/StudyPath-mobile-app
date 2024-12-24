import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Header({
  title,
  backBtn,
}: {
  title: string;
  backBtn?: boolean;
}) {
  let buttonBack = null;
  if (backBtn) {
    buttonBack = (
      <TouchableOpacity style={styles.buttonHeader}>
        <Image
          source={require("@/assets/icons/arrow-small-left.svg")}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      {buttonBack}
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonHeader: {
    position: "absolute",
    left: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    width: "90%",
    position: "relative",
  },

  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 100,
  },

  text: {
    fontSize: 16,
  },

  bellButton: {
    borderWidth: 1,
    borderColor: "#E1E2E5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  bellIcon: {
    alignSelf: "center",
  },

  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: "#2467EC",
    position: "absolute",
    borderRadius: 50,
    right: -5,
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  helloText: { color: "#7C7C80", fontSize: 14 },
});
