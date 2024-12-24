import { router } from "expo-router"; 
import moment from "moment";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function CourseCard({ item }: { item: CoursesType }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/(routes)/course-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          {/* <Text>{item.progress} %</Text> */}
          <Text
            style={{
              fontStyle: "italic",
              color: "#cccccc",
              fontWeight: "bold",
            }}
          >
            {item.category}
          </Text>
        </View>
        <View>
          <Text style={styles.dateRange}>{item.numberOfCredits} tín chỉ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    margin: 5,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
    textAlign: "justify",
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: "#2AD5C8",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateRange: {
    fontSize: 12,
    fontFamily: "Nunito_700Bold",
    fontWeight: "bold",
    color: "#2AD5C8",
  },
});
