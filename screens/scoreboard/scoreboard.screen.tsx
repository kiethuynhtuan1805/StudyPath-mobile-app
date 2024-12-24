import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "@/hooks/auth/useUser";
import { SCORE_BOARD_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScoreCard from "@/components/cards/score.card";
import { router } from "expo-router";
import Header from "@/components/header/header";

interface Diem {
  capnhat: string;
  diem: string;
  diemchu: string;
  diemcu: number;
  diemdat: string;
  diemso: number;
  diemthanhphanjson: null;
  dtbhk: string;
  dtbtl: string;
  ghichu: string;
  hocky: number;
  id: string;
  mahk: string;
  mamh: string;
  nhomlop: string;
  tc: number;
  tctlhk: string;
  tenhk: string;
  tenmhvn: string;
}
interface Score {
  id: string;
  F_MAMH: string;
  F_TENMHVN: string;
  TKET: number;
  F_DVHT: number;
  semesterCode: string;
  semesterScore: number;
}
interface Semester {
  code: string;
  courses: Score[];
  n_credit: number;
  score: number;
}

export default function ScoreBoardScreen() {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<Score[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const { profile } = useUser();

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      try {
        const res = await axios.get<{ code: string; data: { diem: Diem[] } }>(
          `${SCORE_BOARD_URI}`,
          {
            params: {
              mssv: profile?.code,
            },
            headers: {
              Authorization: accessToken,
            },
          }
        );
        const scores: Score[] = res.data.data.diem.map((item: Diem) => ({
          id: item.id,
          F_MAMH: item.mamh,
          F_TENMHVN: item.tenmhvn,
          TKET: item.diemso,
          F_DVHT: item.tc,
          semesterCode: item.mahk,
          semesterScore: +item.dtbhk,
        }));

        const semesters = scores.reduce((acc: Semester[], score: Score) => {
          const idx = acc.findIndex(
            (semester) => semester.code === score.semesterCode
          );
          if (idx !== -1) {
            acc[idx].courses.push(score);
            acc[idx].n_credit += score.F_DVHT;
          } else {
            acc.push({
              code: score.semesterCode,
              courses: [score],
              n_credit: score.F_DVHT,
              score: score.semesterScore,
            });
          }
          return acc;
        }, [] as Semester[]);

        setSemesters(semesters);
        setScore(scores);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    if (profile) {
      subscription();
    }

    return () => {};
  }, [profile]);

  return loading ? (
    <Loader />
  ) : (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 50, paddingBottom: 32 }}
    >
      <Header title={"Thời khóa biểu"} backBtn={true} />
      <ScrollView style={{ marginTop: 20 }}>
        {semesters.map((semester) => {
          return (
            <ScoreCard
              item={{
                name: semester.code,
                n_credit: semester.n_credit,
                n_course: semester.courses.length,
                score: semester.score,
              }}
              onPress={() => {
                router.push({
                  pathname: "/(routes)/scoreboard/semester",
                  params: { semester: JSON.stringify(semester), type: "" },
                });
                return;
              }}
              type={"hk"}
              key={semester.code}
            />
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}
