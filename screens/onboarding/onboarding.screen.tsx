import { styles } from "@/styles/onboarding/onboard";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Raleway_700Bold, useFonts } from "@expo-google-fonts/raleway";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OnBoardingScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.firstContainer}>
        <View>
          <Image
            source={require("@/assets/onboarding/App-logo.png")}
            xstyle={styles.logo}
          />
          <Image source={require("@/assets/onboarding/shape_9.png")} />
        </View>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.titleTextShape1}
            source={require("@/assets/onboarding/shape_3.png")}
          />
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            Bắt đầu hành trình
          </Text>
          <Image
            style={styles.titleTextShape2}
            source={require("@/assets/onboarding/shape_2.png")}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.titleTextShape1}
            source={require("@/assets/onboarding/shape_3.png")}
          />
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            học tập với
          </Text>
          <Image
            style={styles.titleTextShape2}
            source={require("@/assets/onboarding/shape_2.png")}
          />
        </View>
        <View>
          <Image
            style={styles.titleShape3}
            source={require("@/assets/onboarding/shape_6.png")}
          />
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            Study Path
          </Text>
        </View>
        <View style={styles.dscpWrapper}>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            Ứng dụng được phát triển dành riêng cho
          </Text>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            sinh viên trường đại học Bách Khoa.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push("/(routes)/welcome-intro")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Khởi đầu hành trình
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
