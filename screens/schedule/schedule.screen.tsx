import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { getDateByWeek, semesterYear } from "@/utils/currentYear";
import { SCHEDULE_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ScheduleScreen() {
  const [loading, setLoading] = useState(true);
  const { profile } = useUser();
  const [events, setEvents] = useState({});

  const getDayName = (dayOfWeek: number) => {
    switch (dayOfWeek) {
      case 2:
        return "Thứ hai";
      case 3:
        return "Thứ ba";
      case 4:
        return "Thứ tư";
      case 5:
        return "Thứ năm";
      case 6:
        return "Thứ sáu";
      case 7:
        return "Thứ bảy";
      case 8:
        return "Chủ nhật";
      default:
        return "Không xác định";
    }
  };

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      // get scoreboard
      const { data } = await axios.get<{ code: string; data: ScheduleBE[] }>(
        SCHEDULE_URI,
        {
          params: {
            studentId: profile?.id,
            semesterYear: semesterYear,
          },
          headers: {
            Authorization: accessToken,
          },
        }
      );

      const schedule: Schedule[] = data.data.map(
        (schedule) =>
          ({
            id: schedule.id,
            course: {
              id: schedule.subject.id,
              code: schedule.subject.code,
              name: schedule.subject.nameVi,
              n_credit: schedule.subject.numOfCredits,
            },
            dayOfWeek: schedule.dayOfWeek,
            startLesson: schedule.startLesson,
            numOfLesson: schedule.numOfLesson,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            room: schedule.room.code,
            weekSeriesDisplay: schedule.weekSeriesDisplay
              .split("|")
              .filter((week) => week && !isNaN(Number(week)))
              .map((week) =>
                moment(
                  getDateByWeek(
                    Number(week),
                    new Date().getFullYear(),
                    schedule.dayOfWeek
                  )
                ).format("YYYY-MM-DD")
              ),
          } as Schedule)
      );

      // console.log(schedule);

      const _events: Record<string, any[]> = {};
      schedule.forEach((schedule) => {
        schedule.weekSeriesDisplay?.forEach((date) => {
          if (!_events[date]) {
            _events[date] = [];
          }
          _events[date].push({
            name: schedule.course?.name,
            code: schedule.course?.code,
            room: schedule.room,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            dayOfWeek: schedule.dayOfWeek,
            numOfLesson: schedule.numOfLesson,
            startLesson: schedule.startLesson,
            credit: schedule.course?.n_credit,
          });
        });
      });

      // console.log(_events);

      setEvents(_events);
      setLoading(false);
    };
    subscription();
  }, [profile]);

  return loading ? (
    <Loader />
  ) : (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header title={"Thời khóa biểu"} backBtn={true} />
      <View style={styles.container}>
        <Agenda
          selected={"2024-12-09"}
          items={events}
          renderItem={(item: any, isFirstItemInDay: any) => {
            return (
              <View style={styles.eventItem}>
                <View
                  style={{
                    width: "70%",
                    padding: 16,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.eventTitle}>{item.name}</Text>
                  <View>
                    <Text style={styles.eventCode}>Mã môn: {item.code}</Text>
                    <Text style={styles.eventRoom}>Phòng học: {item.room}</Text>
                    <Text style={styles.eventRoom}>Tín chỉ: {item.credit}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    height: 140,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#2FD1C5",
                      width: "100%",
                      height: "60%",
                      borderTopRightRadius: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View>
                      <Text style={styles.eventTime}>
                        Tiết: {item.startLesson} -{" "}
                        {item.startLesson + item.numOfLesson}
                      </Text>
                      <Text style={styles.eventTime}>
                        {item.startTime} - {item.endTime}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40%",
                      backgroundColor: "#f5fbff",
                      borderBottomRightRadius: 15,
                    }}
                  >
                    <Text style={styles.eventDOW}>
                      {getDayName(item.dayOfWeek)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          renderDay={(day: any) => {
            if (!day || !day.dateString) {
              return null;
            }
            return (
              <View style={styles.dayHeader}>
                <Text style={styles.dayText}>
                  {moment(day.dateString).format("dddd, D MMM YYYY")}
                </Text>
              </View>
            );
          }}
          renderEmptyDate={() => null}
          theme={{
            agendaDayTextColor: "#00BFFF",
            agendaDayNumColor: "#FF6347",
            agendaTodayColor: "#FFD700",
          }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  eventCode: {
    fontSize: 14,
    color: "#888",
    paddingBottom: 5,
  },
  eventRoom: {
    fontSize: 14,
    color: "#555",
  },
  eventTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    padding: 4,
  },
  eventDOW: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  dayHeader: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
