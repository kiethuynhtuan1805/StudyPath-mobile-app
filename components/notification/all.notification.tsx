import { useRef } from "react";
import { FlatList, View } from "react-native";
import NotificationCard from "../cards/notification.card";

export default function AllNotification() {
  const flatListRef = useRef(null);
  const _notification = [
    {
      id: "0",
      message: "Thời khóa biểu",
      description:
        "Bạn có tiết Hệ cơ sở dữ liệu vào lúc 12:00PM hôm nay (09/12/2024)",
      status: 0,
    },
    {
      id: "1",
      message: "Chú ý",
      description:
        "Bài tập lớn 2 (Hệ cơ sở dữ liệu) còn 1 ngày nữa đến deadline",
      status: 2,
    },
    {
      id: "5",
      message: "Thời khóa biểu",
      description:
        "Bạn có tiết Quản lý dự án phần mềm vào lúc 13:00PM hôm nay (05/12/2024)",
      status: 0,
    },
    {
      id: "4",
      message: "Thời khóa biểu",
      description:
        "Bạn có tiết Kho dữ liệu và hệ hỗ trợ ra quyết định vào lúc 12:00PM hôm nay (03/12/2024)",
      status: 0,
    },
    {
      id: "2",
      message: "Nhắc nhở",
      description:
        "Bài tập lớn 2 (Hệ cơ sở dữ liệu) còn 7 ngày nữa đến deadline",
      status: 1,
    },
    {
      id: "3",
      message: "Thời khóa biểu",
      description:
        "Bạn có tiết Hệ cơ sở dữ liệu vào lúc 12:00PM hôm nay (02/12/2024)",
      status: 0,
    },
  ];

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <FlatList
        ref={flatListRef}
        data={_notification}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      />
    </View>
  );
}
