import { INFO_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      // console.log(accessToken);
      await axios
        .get<{
          code: string;
          data: any;
        }>(`${INFO_URI}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => {
          setProfile({
            ...res.data.data,
            gender: res.data.data["isFemale"] ? "Nữ" : "Nam",
          });
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          setError(error);
        });
    };
    subscription();
  }, [refetch]);

  return { loading, profile, error, setRefetch, refetch };
}
