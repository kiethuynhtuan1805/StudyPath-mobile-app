import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchInput from "@/components/common/search.input";

export default function SearchScreen() {
  return (
    <LinearGradient
      colors={["#ffffff", "#f5fbff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <SearchInput />
      </SafeAreaView>
    </LinearGradient>
  );
}
