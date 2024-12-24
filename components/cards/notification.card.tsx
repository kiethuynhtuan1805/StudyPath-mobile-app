import { StyleSheet, Text, View, Image } from "react-native";
export default function NotificationCard({ item }: { item: NotificationType }) {
  return (
    <View style={styles.container}>
      {item.status === 1 ? (
        <Image
          style={{ width: 40, height: 40, tintColor: "#FFA500" }}
          source={require("@/assets/icons/notice.png")}
        />
      ) : item.status === 2 ? (
        <Image
          style={{ width: 40, height: 40, tintColor: "#FF0000" }}
          source={require("@/assets/icons/error.png")}
        />
      ) : (
        <Image
          style={{ width: 40, height: 40, tintColor: "#0000FF" }}
          source={require("@/assets/icons/info.png")}
        />
      )}
      <View
        style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}
      >
        <View>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 8,
    margin: 5,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 4,
  },
  description: {
    color: "#828282",
    textAlign: "justify",
    lineHeight: 24,
  },
});
