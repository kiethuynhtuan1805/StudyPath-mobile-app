import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { Redirect } from "expo-router";

export default function TabsIndex() {
  const { loading, profile } = useUser();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Redirect href={!profile ? "/(routes)/onboarding" : "/(tabs)"} />
      )}
    </>
  );
}
