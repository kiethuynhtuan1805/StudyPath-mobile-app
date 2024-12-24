import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardDetail {
  name: string;
  n_credit: number;
  n_course?: number;
  level?: number;
}

export default function PredictCard({
  item,
  onPress,
  type,
}: {
  item: CardDetail;
  onPress?: () => void;
  type: string;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.main}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {type === "hk" && "Học kỳ"}{" "}
            {item.name === "BL" ? "chuyển điểm" : item.name}
          </Text>
        </View>
        <View style={styles.description}>
          <View style={styles.credit}>
            <Text style={styles.textCredit}>{item.n_credit} tín chỉ</Text>
          </View>
          {item.n_course && (
            <View>
              <Text style={styles.textCourse}>Số môn học: {item.n_course}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 16,
    margin: 8,
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  main: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
  description: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  credit: {
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  textCredit: {
    color: "#297DFF",
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
  },
  textCourse: {
    color: "#B0B0B0",
    fontSize: 12,
    fontFamily: "Nunito_600SemiBold",
  },
});
