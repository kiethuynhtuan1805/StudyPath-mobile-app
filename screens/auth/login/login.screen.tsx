import useUser from "@/hooks/auth/useUser";
import { commonStyles } from "@/styles/common/common.styles";
import {
  AFTER_CHECK_LOGIN_URI,
  LOGIN_URI,
  PRE_CHECK_URI,
  TOKEN_URI,
} from "@/utils/uri";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "react-native-toast-notifications";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });
  const { setRefetch } = useUser();
  const checkStatus = (loginResponse: string) => {
    if (loginResponse.includes('<div id="msg" class="success">')) {
      return "success";
    }
    return "wrong-password";
  };

  const getHTMLElementValue = (
    element: string,
    tag: string,
    name: string,
    query: string = "name"
  ) => {
    const regex = new RegExp(
      `<${tag}.*?${query}="${name}".*?value="(.*?)"`,
      "g"
    );
    return element.match(regex)?.[0].split("value=")[1].replace(/"/g, "");
  };

  useEffect(() => {
    const subscription = async () => {
      const res = await axios.get<string>(`${LOGIN_URI}`);
      let status = checkStatus(res.data);
      if (status === "success") {
        const formURLencoded = await AsyncStorage.getItem("form_urlencoded");
        await axios
          .post(AFTER_CHECK_LOGIN_URI, formURLencoded, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .catch((error) => {
            return undefined;
          });
        const res3 = await axios.get(PRE_CHECK_URI);
        let token =
          getHTMLElementValue(res3.data, "input", "hid_Token", "id") ?? "";
        if (token === "") {
          const res4 = await axios.get(TOKEN_URI);

          token =
            getHTMLElementValue(res4.data, "input", "hid_Token", "id") ?? "";
        }
        await AsyncStorage.setItem("access_token", token);
        router.push("/(tabs)");
        setRefetch(true);
        return;
      }
    };
    subscription();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    // if (!passwordSpecialCharacter.test(password)) {
    //   setError({
    //     ...error,
    //     password: "Write at least one special character",
    //   });
    //   setUserInfo({ ...userInfo, password: "" });
    // } else if (!passwordOneNumber.test(password)) {
    //   setError({
    //     ...error,
    //     password: "Write at least one number",
    //   });
    //   setUserInfo({ ...userInfo, password: "" });
    // } else if (!passwordSixValue.test(password)) {
    //   setError({
    //     ...error,
    //     password: "Write at least 6 characters",
    //   });
    //   setUserInfo({ ...userInfo, password: "" });
    // } else {
    //   setError({
    //     ...error,
    //     password: "",
    //   });
    setUserInfo({ ...userInfo, password: value });
    // }
  };

  const handleSignIn = async () => {
    const res = await axios.get<string>(`${LOGIN_URI}`);
    let status = checkStatus(res.data);
    if (status === "success") {
      const formURLencoded = await AsyncStorage.getItem("form_urlencoded");
      await axios
        .post(AFTER_CHECK_LOGIN_URI, formURLencoded, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .catch((error) => {
          return undefined;
        });
      const res3 = await axios.get(PRE_CHECK_URI);
      let token =
        getHTMLElementValue(res3.data, "input", "hid_Token", "id") ?? "";
      if (token === "") {
        const res4 = await axios.get(TOKEN_URI);

        token =
          getHTMLElementValue(res4.data, "input", "hid_Token", "id") ?? "";
      }
      await AsyncStorage.setItem("access_token", token);
      router.push("/(tabs)");
      return;
    }
    const lt = getHTMLElementValue(res.data, "input", "lt") ?? "";
    const execution = getHTMLElementValue(res.data, "input", "execution") ?? "";
    const body: Record<string, string> = {
      username: userInfo.email,
      password: userInfo.password,
      lt: lt,
      execution: execution,
      _eventId: "submit",
      submit: "Login",
    };

    const formBody = [];
    for (const key in body) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(body[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const formURLencoded = formBody.join("&");
    let isSuccessful = false;
    await axios
      .post(`${LOGIN_URI}`, formURLencoded, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async (loginResponse) => {
        if (checkStatus(loginResponse.data) === "success") {
          isSuccessful = true;
        } else {
          Toast.show("Email or password is not correct!", {
            type: "danger",
          });
        }
      })
      .catch((error) => {
        Toast.show("Email or password is not correct!", {
          type: "danger",
        });
      });
    if (isSuccessful) {
      await AsyncStorage.setItem("form_urlencoded", formURLencoded);

      await axios
        .post(AFTER_CHECK_LOGIN_URI, formURLencoded, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .catch((error) => {
          return undefined;
        });
      await axios.get(PRE_CHECK_URI);
      const res4 = await axios.get(TOKEN_URI);
      const token =
        getHTMLElementValue(res4.data, "input", "hid_Token", "id") ?? "";
      await AsyncStorage.setItem("access_token", token);
      router.push("/(tabs)");
      setRefetch(true);
    }
  };
  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <ScrollView>
        <View style={{ height: 350 }}>
          <View style={{ height: "auto", margin: "auto" }}>
            <Image
              style={styles.signInImage}
              source={require("@/assets/onboarding/App-logo.png")}
            />
            <Text
              style={[
                styles.welcomeText,
                { fontFamily: "Nunito_700Bold", marginTop: 24 },
              ]}
            >
              Study Path
            </Text>
            <Text style={styles.learningText}>
              Học Tập Thông Minh, Tiến Bộ Từng Ngày
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="support@hcmut.edu.vn"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
              </View>
            )}
            <View style={{ marginTop: 15 }}>
              <TextInput
                style={commonStyles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                defaultValue=""
                placeholder="********"
                onChangeText={handlePasswordValidation}
              />
              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={23}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={23} color={"#747474"} />
                )}
              </TouchableOpacity>
              <SimpleLineIcons
                style={styles.icon2}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
            </View>
            {error.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <Text
                style={[
                  styles.forgotSection,
                  { fontFamily: "Nunito_600SemiBold" },
                ]}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                backgroundColor: "#2FD1C5",
                marginTop: 15,
              }}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>

            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                gap: 10,
              }}
            >
              <TouchableOpacity>
                <FontAwesome name="google" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="github" size={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.signupRedirect}>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                Bạn không có tài khoản?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(routes)/sign-up")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Raleway_600SemiBold",
                    color: "#2FD1C5",
                    marginLeft: 5,
                  }}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    height: 128,
    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
