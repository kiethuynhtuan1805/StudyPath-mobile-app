import useUser from "@/hooks/auth/useUser";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  const { profile } = useUser();
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "index") {
              iconName = require("@/assets/icons/HouseSimple.png");
            } else if (route.name === "schedule/index") {
              iconName = require("@/assets/icons/schedule.png");
            } else if (route.name === "profile/index") {
              iconName = require("@/assets/icons/User.png");
            } else if (route.name === "notification/index") {
              iconName = require("@/assets/icons/notification.png");
            }
            return (
              <Image
                style={{ width: 25, height: 25, tintColor: color }}
                source={iconName}
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2AD5C8",
        };
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="schedule/index"
        options={{
          title: "Thời khóa biểu",
        }}
      />
      <Tabs.Screen
        name="notification/index"
        options={{
          title: "Thông báo",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
