import SearchInput from "@/components/common/search.input";
import AllCourses from "@/components/courses/all.courses";
import Header from "@/components/header/header";
import HomeBannerSlider from "@/components/home/home.banner.slider";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header title={"Study Path"} backBtn={true} />
      <SearchInput homeScreen={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBannerSlider />
        <AllCourses />
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
