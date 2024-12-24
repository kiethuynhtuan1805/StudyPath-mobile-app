import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "@/hooks/auth/useUser";
import Loader from "@/components/loader/loader";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Button from "@/components/button/button";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import PredictCard from "@/components/cards/predict.card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCORE_BOARD_URI } from "@/utils/uri";

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
  F_MAMH: string;
  F_TENMHVN: string;
  TKET: number;
  F_DVHT: number;
  COMPULSARY: string;
  LEVEL: number;
}
interface Semester {
  code: string;
  courses: Score[];
  n_credit: number;
}

export default function index() {
  const [loading, setLoading] = useState(true);
  const [loadingSP, setLoadingSP] = useState(false);
  const [progress, setProgress] = useState(0);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const { profile } = useUser();
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notiVisible, setNotiVisible] = useState(false);

  const majorData = [
    { label: "Khoa học máy tính", value: "KHKH" },
    { label: "Công nghệ Dữ liệu Bảo mật và Trí tuệ Kinh doanh", value: "KHDL" },
    { label: "Công nghệ phần mềm", value: "KHPM" },
    { label: "Mật mã và An ninh mạng", value: "KHAN" },
    { label: "Trí tuệ nhân tạo ứng dụng", value: "KHAI" },
    { label: "Xử lý ảnh và Thị giác máy tính", value: "KHIP" },
  ];

  const transformData = (inputArray: Score[][], type: String): Semester[] => {
    const semesters: Semester[] = [];

    if (type === "TC") {
      inputArray.forEach((courses) => {
        if (courses.length === 0) return;

        const code = `Tự chọn`;

        const n_credit = courses.reduce(
          (sum, course) => sum + course.F_DVHT,
          0
        );

        const semester: Semester = {
          code,
          courses,
          n_credit,
        };

        semesters.push(semester);
      });
    } else {
      const currentMonth = new Date().getMonth() + 1;
      let currentYear = new Date().getFullYear() % 100;
      let hk = "";
      if (currentMonth > 9) {
        hk = `${currentYear}2`;
      } else {
        hk = `${currentYear}1`;
      }

      inputArray.forEach((courses) => {
        if (courses.length === 0) return;

        const code = `${hk}`;

        if (hk.endsWith("2")) {
          currentYear += 1;
          hk = `${currentYear}1`;
        } else {
          hk = `${currentYear}2`;
        }

        const n_credit = courses.reduce(
          (sum, course) => sum + course.F_DVHT,
          0
        );

        const semester: Semester = {
          code,
          courses,
          n_credit,
        };

        semesters.push(semester);
      });
    }

    return semesters;
  };

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    setIsModalVisible(false);
  };

  const handleOpenAlert = () => {
    setNotiVisible(true);
  };

  const handleCloseAlert = () => {
    setNotiVisible(false);
  };

  const handleGenerate = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    setLoadingSP(true);
    setProgress(0);
    let progressInterval = 0;
    const interval = setInterval(() => {
      if (progressInterval < 1) {
        progressInterval += 1 / 60;
        setProgress(progressInterval);
      } else {
        clearInterval(interval);
      }
    }, 500);
    try {
      const resTranscript = await axios.get<{
        code: string;
        data: { diem: Diem[] };
      }>(`${SCORE_BOARD_URI}`, {
        params: {
          mssv: profile?.code,
        },
        headers: {
          Authorization: accessToken,
        },
      });
      const scores = resTranscript.data.data.diem.map((diem) => ({
        id: diem.id,
        F_MAMH: diem.mamh,
        F_TENMHVN: diem.tenmhvn,
        TKET: String(diem.diemso),
        F_DVHT: diem.tc,
      }));

      const resultArray = scores.flat();

      // const test = [
      //   {
      //     F_MAMH: "MT1003",
      //     F_TENMHVN: "Giải tích 1",
      //     F_DVHT: 4,
      //     TKET: "7",
      //   },
      //   {
      //     F_MAMH: "CH1003",
      //     F_TENMHVN: "Hóa đại cương",
      //     F_DVHT: 3,
      //     TKET: "8.5",
      //   },
      //   {
      //     F_MAMH: "MT1005",
      //     F_TENMHVN: "Giải tích 2",
      //     F_DVHT: 4,
      //     TKET: "7",
      //   },
      //   {
      //     F_MAMH: "MT1007",
      //     F_TENMHVN: "Đại số tuyến tính",
      //     F_DVHT: 3,
      //     TKET: "6",
      //   },
      //   {
      //     F_MAMH: "PH1003",
      //     F_TENMHVN: "Vật lý 1",
      //     F_DVHT: 4,
      //     TKET: "8",
      //   },
      //   {
      //     F_MAMH: "PH1007",
      //     F_TENMHVN: "Thí nghiệm vật lý",
      //     F_DVHT: 1,
      //     TKET: "7",
      //   },
      //   {
      //     F_MAMH: "CO1007",
      //     F_TENMHVN: "Ctrr",
      //     F_DVHT: 4,
      //     TKET: "8",
      //   },
      //   {
      //     F_MAMH: "CO1005",
      //     F_TENMHVN: "Nhập môn điện toán",
      //     F_DVHT: 3,
      //     TKET: "9",
      //   },
      //   {
      //     F_MAMH: "CO1023",
      //     F_TENMHVN: "Hệ thống số",
      //     F_DVHT: 3,
      //     TKET: "8",
      //   },
      //   {
      //     F_MAMH: "CO1027",
      //     F_TENMHVN: "Kỹ thuật lập trình",
      //     F_DVHT: 3,
      //     TKET: "8",
      //   },
      //   {
      //     F_MAMH: "LA1003",
      //     F_TENMHVN: "Anh văn 1",
      //     F_DVHT: 2,
      //     TKET: "D",
      //   },
      //   {
      //     F_MAMH: "LA1005",
      //     F_TENMHVN: "Anh văn 2",
      //     F_DVHT: 2,
      //     TKET: "D",
      //   },
      //   {
      //     F_MAMH: "MI1003",
      //     F_TENMHVN: "Gdqp",
      //     F_DVHT: 0,
      //     TKET: "D",
      //   },
      //   {
      //     F_MAMH: "PE1003",
      //     F_TENMHVN: "gdtc1",
      //     F_DVHT: 0,
      //     TKET: "D",
      //   },
      //   {
      //     F_MAMH: "PE1005",
      //     F_TENMHVN: "gdtc2",
      //     F_DVHT: 0,
      //     TKET: "D",
      //   },
      // ];

      const response = await axios.post(
        "http://192.168.137.1:5000/model-predict",
        JSON.stringify({
          faculty: "MT",
          semester: 3,
          masv: profile?.code,
          student_grade: resultArray,
          mang: "KHM",
          macn: selectedValue ? selectedValue : "KHKH",
          credits: 128,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const semesters = transformData(
        JSON.parse(response.request._response).message,
        JSON.parse(response.request._response).status
      );
      setSemesters(semesters);
    } catch (error) {
      handleOpenAlert();
      console.error(error);
    } finally {
      setLoadingSP(false);
      setProgress(1);
    }
  };

  useEffect(() => {
    if (profile) {
      setLoading(false);
    }
    return () => {};
  }, [profile]);

  return loading ? (
    <Loader />
  ) : (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 24, paddingBottom: 32 }}
    >
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text
              style={
                selectedValue
                  ? styles.dropdownButtonText
                  : styles.dropdownButtonTextpHolder
              }
            >
              {selectedValue
                ? majorData.find((item) => item.value === selectedValue)?.label
                : "Chọn một chuyên ngành"}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setIsModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <FlatList
                  data={majorData}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={notiVisible}
            onRequestClose={handleCloseAlert}
          >
            <View style={styles.notiOverlay}>
              <View style={styles.alertBox}>
                <Text style={styles.alertTitle}>Chúc mừng</Text>
                <Text style={styles.alertMessage}>
                  Bạn đã hoàn thành toàn bộ chương trình đào tạo!
                </Text>
                <TouchableOpacity
                  onPress={handleCloseAlert}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.actionWrapper}>
          <Button title="Đề xuất lộ trình" onPress={handleGenerate} />
        </View>
        {loadingSP && (
          <View style={styles.loadingContainer}>
            <Progress.Bar
              progress={progress}
              width={300}
              height={15}
              color="#4CAF50"
            />
            <Text style={{ marginTop: 10 }}>Đang đề xuất...</Text>
          </View>
        )}
        {semesters.length !== 0 ? (
          <ScrollView>
            {semesters.map((semester) => {
              return (
                <PredictCard
                  item={{
                    name: semester.code,
                    n_credit: semester.n_credit,
                    n_course: semester.courses.length,
                  }}
                  onPress={() => {
                    router.push({
                      pathname: "/(routes)/scoreboard/semester",
                      params: {
                        semester: JSON.stringify(semester),
                        type: "SP",
                      },
                    });
                    return;
                  }}
                  type={"hk"}
                  key={semester.code}
                />
              );
            })}
          </ScrollView>
        ) : (
          <Image
            style={{ width: "100%", height: 240, marginTop: 60 }}
            source={require("@/assets/onboarding/banner-img-1.png")}
          />
        )}
        {/* {data && (
        <Text style={styles.result}>Kết quả: {JSON.stringify(data)}</Text>
      )} */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#b0b0b0",
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownButtonTextpHolder: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  notiOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2FD1C5",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
