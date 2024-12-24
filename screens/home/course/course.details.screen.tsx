import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function CourseDetailScreen() {
  const params = useLocalSearchParams();
  const courseData: CoursesType = JSON.parse(params.item);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ marginBottom: 40 }}>
        <View style={styles.container}>
          <View
            style={{ display: "flex", alignItems: "center", marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {courseData.name}
            </Text>
          </View>
          <View style={styles.countDateContainer}>
            <View style={styles.countCard}>
              <Text style={styles.countNumber}>16</Text>
              <Text style={styles.countUnit}>Tuần</Text>
            </View>

            <View style={styles.countCard}>
              <Text style={styles.countNumber}>
                {courseData.numberOfCredits}
              </Text>
              <Text style={styles.countUnit}>Tín chỉ</Text>
            </View>

            <View style={styles.countCard}>
              <Text style={styles.countNumber}>18</Text>
              <Text style={styles.countUnit}>giờ</Text>
            </View>
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
            >
              Mô tả
            </Text>
            <Text style={{ textAlign: "justify", lineHeight: 24 }}>
              {courseData.description}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
            >
              Thuộc nhóm
            </Text>
            <Text style={{ textAlign: "justify" }}>{courseData.category}</Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
            >
              Khoa
            </Text>
            <Text style={{ textAlign: "justify" }}>
              Khoa học và Kỹ thuật máy tính
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
            >
              Mục tiêu môn học
            </Text>
            {courseData.outcome.split("\n").map((item, index) => (
              <Text
                style={{
                  marginBottom: 16,
                  lineHeight: 24,
                  textAlign: "justify",
                }}
              >
                {index + 1}. {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 16,
    paddingBottom: 80,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateWrapper: {
    flexDirection: "column",
  },
  startDate: {
    alignItems: "flex-start",
  },
  endDate: {
    alignItems: "flex-end",
  },
  dateTitle: {
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },
  dateDetail: {
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
  },
  countDateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  countCard: {
    flex: 1,
    backgroundColor: "#2AD5C8",
    borderRadius: 20,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  countNumber: {
    fontSize: 32,
    fontFamily: "Nunito_700Bold",
    color: "white",
  },
  countUnit: {
    color: "white",
  },
});
