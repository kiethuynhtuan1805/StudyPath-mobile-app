import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { getDateByWeek, semesterYear } from "@/utils/currentYear";
import { SCHEDULE_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
export default function index() {
  const [loading, setLoading] = useState(true);
  const { profile } = useUser();
  const [events, setEvents] = useState({});
  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      // get scoreboard
      try {
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
            });
          });
        });
        setEvents(_events);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    subscription();
  }, [profile]);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={events}
        renderItem={(item: any, isFirstItemInDay: any) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.code}</Text>
              <Text>{item.room}</Text>
              <Text>{item.startTime}</Text>
              <Text>{item.endTime}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
