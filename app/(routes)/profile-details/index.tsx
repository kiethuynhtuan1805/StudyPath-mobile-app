import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { AVATAR_URI, SCORE_BOARD_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "@rneui/themed";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as handlebars from "handlebars";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function index() {
  const { profile } = useUser();
  const [image, setImage] = useState<any>(null);
  const [refetch, setRefetch] = useState(false);
  const [scores, setScores] = useState<Course[]>([]);
  const params = useLocalSearchParams();

  const itemInfos = [
    {
      icon: "user",
      title: "MSSV",
      contentKey: "code",
    },
    {
      icon: "user",
      title: "Ngày sinh",
      contentKey: "dateOfBirth",
    },
    {
      icon: "user",
      title: "Giới tính",
      contentKey: "gender",
    },
    {
      icon: "user",
      title: "Chương trình đào tạo",
      contentKey: "program.nameVi",
    },
    {
      icon: "user",
      title: "Khoa",
      contentKey: "trainingManagementDep.nameVi",
    },
    {
      icon: "user",
      title: "Lớp",
      contentKey: "classCode",
    },
    {
      icon: "user",
      title: "Tình trạng",
      contentKey: "status.name",
    },
  ];

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      // get scoreboard
      await axios
        .get<{ code: string; data: { diem: Diem[] } }>(
          `${handlebars.compile(SCORE_BOARD_URI)({ mssv: profile?.code })}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          const scores = res.data.data.diem.map((diem) => ({
            id: diem.id,
            code: diem.mamh,
            name: diem.tenmhvn,
            semesterCode: diem.mahk,
            score: diem.diemso,
            n_credit: diem.tc,
          }));
          setScores(scores);
          // console.log(scores);
        });
    };
    subscription();
  }, [refetch]);

  const getItem = (key: string) => {
    const keys = key.split(".");
    let content = profile;
    for (let i = 0; i < keys.length; i++) {
      content = (content as any)?.[keys[i]];
    }
    return content as any;
  };

  const avatarLeft = Dimensions.get("window").width / 2 - 42 - 24;

  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <View
        style={{
          paddingTop: 56,
          padding: 24,
          backgroundColor: "white",
          borderRadius: 16,
          marginTop: 64,
          margin: 24,
          display: "flex",
          position: "relative",
          borderWidth: 1,
          borderColor: "#E4EDFF",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -42,
            left: avatarLeft,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            size={84}
            rounded
            source={{
              uri: params.avatar,
            }}
            imageProps={{
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Nunito_600SemiBold",
          }}
        >
          {profile?.lastName} {profile?.firstName}
        </Text>
        {itemInfos.map((item, index) => (
          <View
            key={item.contentKey}
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottomWidth: index === itemInfos.length - 1 ? 0 : 1,
              borderColor: "#E4EDFF",
              height: 44,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Nunito_600SemiBold" }}>
              {item.title}:
            </Text>
            <Text
              style={{
                fontFamily: "Nunito_400Regular",
                fontSize: 14,
                color: index === itemInfos.length - 1 ? "green" : "black",
                fontWeight: index === itemInfos.length - 1 ? "bold" : "normal",
              }}
            >
              {" "}
              {getItem(item.contentKey)}
            </Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}
