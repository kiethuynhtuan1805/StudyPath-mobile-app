import Header from "@/components/header/header";
import AllNotification from "@/components/notification/all.notification";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet } from "react-native";

export default function NotificationScreen() {
  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header title={"Thông báo"} backBtn={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AllNotification />
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
