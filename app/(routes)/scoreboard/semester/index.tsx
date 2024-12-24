import ScoreCard from "@/components/cards/score.card";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function index() {
  const semester: Semester = JSON.parse(
    useLocalSearchParams().semester as string
  );

  const type: any = useLocalSearchParams().type as string;

  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 24, paddingBottom: 32 }}
    >
      <ScrollView>
        {type === "SP"
          ? semester.courses.map((course) => {
              return (
                <ScoreCard
                  item={{
                    name: course.F_TENMHVN,
                    n_credit: course.F_DVHT,
                    score: parseFloat(course.prediction.toFixed(1)),
                    level: course.LEVEL,
                    khoi: course.KHOI,
                  }}
                  key={course.F_MAMH}
                  type={""}
                />
              );
            })
          : semester.courses.map((course) => {
              return (
                <ScoreCard
                  item={{
                    name: course.name,
                    n_credit: course.n_credit,
                    score: course.score,
                  }}
                  key={course.code}
                  type={""}
                />
              );
            })}
      </ScrollView>
    </LinearGradient>
  );
}
