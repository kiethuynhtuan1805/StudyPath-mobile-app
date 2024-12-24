import ScoreCard from "@/components/cards/score.card";
import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { SCORE_BOARD_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

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
  code: string;
  name: string;
  semesterCode: string;
  score: number;
  n_credit: number;
  semesterScore: number;
}
interface Semester {
  code: string;
  courses: Score[];
  n_credit: number;
  score: number;
}
interface Profile {
  id: number;
  code: string;
  classCode: string;
  dateOfBirth: string | Date;
  firstName: string;
  lastName: string;
  major: { code: string; nameEn: string; nameVi: string };
  trainingManagementDep: {
    id: number;
    code: string;
    nameEn: string;
    nameVi: string;
  };
  gender: string;
  status: { code: string; id: number; name: string };
}

export default function index() {
  const [loading, setLoading] = useState(true);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const { profile } = useUser();
  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      // get profile info to get mssv
      const res2 = await axios.get<{ code: string; data: { diem: Diem[] } }>(
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
      const scores = res2.data.data.diem.map((diem) => ({
        id: diem.id,
        code: diem.mamh,
        name: diem.tenmhvn,
        semesterCode: diem.mahk,
        score: diem.diemso,
        n_credit: diem.tc,
        semesterScore: +diem.dtbhk,
      }));
      const semesters = scores.reduce((acc: Semester[], score: Score) => {
        const idx = acc.findIndex(
          (semester) => semester.code === score.semesterCode
        );
        if (idx !== -1) {
          acc[idx].courses.push(score);
          acc[idx].n_credit += score.n_credit;
        } else {
          acc.push({
            code: score.semesterCode,
            courses: [score],
            n_credit: score.n_credit,
            score: score.semesterScore,
          });
        }
        return acc;
      }, [] as Semester[]);
      setSemesters(semesters);
      setLoading(false);
    };
    subscription();
  });
  return loading ? (
    <Loader />
  ) : (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 24, paddingBottom: 32 }}
    >
      <ScrollView>
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
