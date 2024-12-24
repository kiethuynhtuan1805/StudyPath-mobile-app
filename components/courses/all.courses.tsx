import { router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import CourseCard from "../cards/course.card";

export default function AllCourses() {
  const flatListRef = useRef(null);
  const _courses = [
    {
      id: "course_000",
      name: "Kỹ thuật lập trình",
      description:
        'Môn học "Kỹ thuật lập trình" được thiết kế để cung cấp nền tảng quan trọng trong lĩnh vực lập trình và phát triển phần mềm. Sinh viên sẽ học cách tiếp cận lập trình chuyên nghiệp thông qua các nguyên lý cơ bản, các phương pháp giải quyết vấn đề, và áp dụng chúng vào việc xây dựng ứng dụng thực tiễn.',
      progress: 85,
      startDate: "2024-01-15",
      endDate: "2024-05-15",
      numberOfCredits: 3,
      category: "Cơ sở ngành",
      outcome:
        'Nắm vững các khái niệm lập trình cơ bản và nâng cao, đặc biệt là lập trình hướng đối tượng.\nHiểu cách tổ chức và quản lý mã nguồn một cách hiệu quả.\nCó khả năng thiết kế và xây dựng các chương trình phần mềm hoàn chỉnh, từ nhỏ đến trung bình.\nThành thạo việc sử dụng các công cụ lập trình hiện đại như Git, Visual Studio Code.\nXây dựng nền tảng kiến thức để nghiên cứu các môn học chuyên sâu như "Cấu trúc dữ liệu và giải thuật", "Phát triển ứng dụng web", hoặc "Kỹ thuật phần mềm".',
    },
    {
      id: "course_001",
      name: "Lập trình nâng cao",
      description:
        'Môn học "Lập trình nâng cao" là bước tiếp nối quan trọng dành cho những sinh viên đã có kiến thức cơ bản về lập trình và mong muốn nâng cao khả năng tư duy logic, làm chủ các kỹ thuật lập trình hiện đại, cũng như phát triển các ứng dụng phức tạp hơn. Bên cạnh đó, sinh viên còn được học cách áp dụng các mẫu thiết kế (design patterns) để xây dựng phần mềm bền vững, linh hoạt, và dễ bảo trì.',
      progress: 85,
      startDate: "2024-01-15",
      endDate: "2024-05-15",
      numberOfCredits: 3,
      category: "Cơ sở ngành",
      outcome:
        "Sinh viên sẽ có khả năng lập trình cơ bản và sử dụng được các kỹ thuật lập trình cơ bản và nâng cao.\nSinh viên có thể giải quyết các bài toán lập trình với cấu trúc dữ liệu và thuật toán hiệu quả.\nSinh viên hiểu và có thể áp dụng các nguyên lý lập trình hướng đối tượng (OOP) trong việc xây dựng phần mềm.\nSử dụng thành thạo các mẫu thiết kế như Singleton, Factory, Observer, Strategy, v.v. để phát triển phần mềm.\nÁp dụng các chiến lược tối ưu hóa như giảm độ phức tạp thuật toán hoặc cải thiện tính hiệu quả của quản lý bộ nhớ.",
    },
    {
      id: "course_002",
      name: "Cấu trúc dữ liệu và giải thuật",
      description:
        'Môn học "Cấu trúc dữ liệu và giải thuật" là một học phần cốt lõi trong chương trình đào tạo của ngành khoa học máy tính. Đây là nền tảng giúp sinh viên hiểu rõ cách tổ chức và quản lý dữ liệu hiệu quả, đồng thời nắm vững các giải thuật (algorithms) để giải quyết các vấn đề từ cơ bản đến phức tạp trong lĩnh vực lập trình. Môn học tập trung vào việc giới thiệu các khái niệm quan trọng như cấu trúc dữ liệu tuyến tính và phi tuyến tính, các thuật toán tìm kiếm, sắp xếp, tối ưu hóa, cũng như đo lường độ phức tạp của thuật toán (Big-O notation). Các ngôn ngữ lập trình như C++, Java, hoặc Python thường được sử dụng để minh họa và thực hiện các giải thuật.',
      progress: 60,
      startDate: "2024-02-01",
      endDate: "2024-06-01",
      numberOfCredits: 4,
      category: "Cơ sở ngành",
      outcome:
        "Nắm vững các cấu trúc như mảng (array), danh sách liên kết (linked list), ngăn xếp (stack), hàng đợi (queue).\nHiểu cấu trúc dữ liệu phức tạp như cây nhị phân, đồ thị, heap, và bảng băm (hash table).\nThành thạo các thuật toán sắp xếp như Quick Sort, Merge Sort, Heap Sort.\nÁp dụng các thuật toán tìm kiếm như tìm kiếm nhị phân (binary search), BFS, DFS để giải quyết bài toán thực tế.\nSử dụng thuật toán quy hoạch động (dynamic programming) để giải bài toán tối ưu.\nSử dụng Big-O, Big-Theta, và Big-Omega để đánh giá hiệu năng thuật toán.\nXây dựng các thuật toán đồ thị để phân tích mạng lưới hoặc giải bài toán đường đi ngắn nhất (Dijkstra, Bellman-Ford).",
    },
    {
      id: "course_003",
      name: "Hệ cơ sở dữ liệu",
      description:
        'Môn học "Hệ cơ sở dữ liệu" là một học phần bắt buộc của khoa khoa học và kỹ thuật máy tính. Môn học trang bị cho sinh viên kiến thức cơ bản và nâng cao về cách tổ chức, quản lý và khai thác dữ liệu trong các hệ thống cơ sở dữ liệu (CSDL). Đây là nền tảng để xây dựng các ứng dụng phần mềm quản lý dữ liệu và các hệ thống thông tin trong thực tế. Nội dung môn học tập trung vào các khái niệm cơ bản về hệ quản trị cơ sở dữ liệu (DBMS), thiết kế cơ sở dữ liệu quan hệ (relational database design), ngôn ngữ truy vấn SQL, tối ưu hóa truy vấn và các chủ đề nâng cao như quản lý giao tác, đảm bảo tính toàn vẹn dữ liệu, và xử lý dữ liệu phân tán.',
      progress: 75,
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      numberOfCredits: 4,
      category: "Cơ sở ngành",
      outcome:
        "Hiểu vai trò và chức năng của hệ quản trị cơ sở dữ liệu (DBMS).\nNắm vững các mô hình dữ liệu như mô hình quan hệ và mô hình thực thể-liên kết (ER).\nPhân tích yêu cầu bài toán và thiết kế lược đồ CSDL sử dụng mô hình ER và chuyển đổi sang mô hình quan hệ.\nViết các câu lệnh SQL để truy vấn, chèn, cập nhật, và xóa dữ liệu.\nXây dựng các truy vấn phức tạp sử dụng JOIN, GROUP BY, HAVING, và các hàm tích hợp.Sử dụng khóa chính, khóa ngoại và các ràng buộc toàn vẹn để đảm bảo tính chính xác dữ liệu.\nSử dụng các hệ quản trị cơ sở dữ liệu phổ biến như MySQL, PostgreSQL, hoặc Oracle DB.",
    },
    {
      id: "course_004",
      name: "Công nghệ phần mềm",
      description:
        'Môn học "Công nghệ phần mềm" cung cấp cho sinh viên các kiến thức lý thuyết và kỹ năng thực hành liên quan đến quy trình phát triển phần mềm. Môn học tập trung vào các phương pháp, công cụ và thực tiễn tốt nhất để xây dựng các sản phẩm phần mềm chất lượng cao, đáp ứng yêu cầu người dùng và thích ứng với sự thay đổi trong môi trường công nghệ. Nội dung môn học bao gồm các giai đoạn phát triển phần mềm như phân tích yêu cầu, thiết kế, lập trình, kiểm thử, triển khai và bảo trì, đồng thời giới thiệu các mô hình quy trình phát triển phần mềm như Agile, Scrum và Waterfall.',
      progress: 90,
      startDate: "2024-01-10",
      endDate: "2024-05-10",
      numberOfCredits: 3,
      category: "Chuyên ngành",
      outcome:
        "Nắm rõ vòng đời phát triển phần mềm (SDLC - Software Development Life Cycle).\nSử dụng các công cụ và kỹ thuật thu thập yêu cầu như phỏng vấn, khảo sát, và phân tích tài liệu.\nTạo biểu đồ use case, mô hình UML và tài liệu yêu cầu phần mềm (SRS - Software Requirements Specification).\nÁp dụng các mẫu thiết kế phần mềm (Design Patterns) phổ biến như Singleton, Factory, MVC.\nHiểu và triển khai kiến trúc phần mềm tầng (layered architecture), microservices và RESTful APIs.\nLàm việc theo nhóm để xây dựng phần mềm, sử dụng các framework phổ biến (Spring, React, Node.js, v.v.).\nXây dựng và thực hiện kiểm thử đơn vị (unit testing), kiểm thử tích hợp (integration testing) và kiểm thử hệ thống.",
    },
    {
      id: "course_005",
      name: "Nguyên lý ngôn ngữ lập trình",
      description:
        'Môn học "Nguyên lý ngôn ngữ lập trình" tập trung nghiên cứu các nguyên tắc cơ bản, cấu trúc và ý nghĩa của các ngôn ngữ lập trình. Môn học cung cấp kiến thức nền tảng giúp sinh viên hiểu rõ cách thiết kế, phân tích và áp dụng các ngôn ngữ lập trình khác nhau trong thực tế, cũng như so sánh đặc điểm của các ngôn ngữ lập trình hiện đại. Sinh viên sẽ được tiếp cận với các khái niệm như cú pháp, ngữ nghĩa, kiểu dữ liệu, phạm vi biến, cũng như các mô hình lập trình chính như lập trình thủ tục (procedural), lập trình hàm (functional), lập trình hướng đối tượng (object-oriented), và lập trình logic (logic programming).',
      progress: 45,
      startDate: "2024-02-20",
      endDate: "2024-06-20",
      numberOfCredits: 4,
      category: "Chuyên ngành",
      outcome:
        "Nắm vững các khái niệm cú pháp (syntax), ngữ nghĩa (semantics) và hiểu được cách các ngôn ngữ xử lý kiểu dữ liệu (data types) và biến (variables)..\nSo sánh ưu, nhược điểm của các ngôn ngữ lập trình phổ biến (C++, Java, Python, Haskell, Prolog, v.v.).\nHiểu rõ cách thức hoạt động của các mô hình lập trình chính\nHiểu quy trình thiết kế một ngôn ngữ lập trình, từ việc định nghĩa cú pháp đến xây dựng trình thông dịch (interpreter) hoặc trình biên dịch (compiler).",
    },
    {
      id: "course_006",
      name: "Mạng máy tính",
      description:
        'Môn học "Mạng máy tính" cung cấp cho sinh viên kiến thức cơ bản về các nguyên lý và cấu trúc của mạng máy tính, bao gồm các giao thức mạng, cấu trúc mạng, và các ứng dụng trong thực tế. Môn học không chỉ giúp sinh viên hiểu rõ cách thức hoạt động của các mạng máy tính mà còn cung cấp kỹ năng cấu hình, quản lý và tối ưu hóa các hệ thống mạng. Sinh viên sẽ được học về các lớp mạng trong mô hình OSI, các giao thức mạng phổ biến như TCP/IP, DNS, HTTP, và các vấn đề về bảo mật mạng. Môn học cũng sẽ cung cấp những kiến thức cần thiết để thiết kế và triển khai các mạng LAN, WAN và các hệ thống mạng không dây (Wi-Fi).',
      progress: 45,
      startDate: "2024-02-20",
      endDate: "2024-06-20",
      numberOfCredits: 3,
      category: "Chuyên ngành",
      outcome:
        "Nắm vững các mô hình mạng phổ biến như OSI (Open Systems Interconnection) và TCP/IP.\nHiểu về các lớp trong mô hình mạng và vai trò của từng lớp trong việc truyền tải dữ liệu.\nCấu hình và quản lý các giao thức mạng như IP, TCP, UDP, DNS, HTTP, FTP, và SMTP.\nÁp dụng các giao thức để giải quyết các vấn đề về truyền tải dữ liệu trong môi trường mạng.\nThiết kế và xây dựng các mạng LAN, WAN, và các hệ thống mạng không dây (Wi-Fi).\nCấu hình các thiết bị mạng như router, switch, và firewall.\nHiểu cách thức phân tích lưu lượng mạng và sử dụng các công cụ như Wireshark để giám sát và phân tích các gói dữ liệu trong mạng.\nÁp dụng các phương pháp bảo mật để ngăn ngừa các cuộc tấn công mạng như DDoS, Man-in-the-Middle (MITM), và tấn công SQL Injection.",
    },
    {
      id: "course_007",
      name: "Thực tập ngoài trường",
      description:
        'Môn "Thực tập ngoài trường" là một môn học quan trọng, giúp sinh viên áp dụng các kiến thức đã học vào thực tế trong môi trường làm việc chuyên nghiệp. Mục tiêu của môn học này là tạo cơ hội cho sinh viên có thể thực hành và phát triển các kỹ năng nghề nghiệp tại các công ty, tổ chức, hoặc các cơ sở giáo dục, nghiên cứu liên quan đến ngành học của mình. Trong suốt quá trình thực tập, sinh viên sẽ được tiếp xúc với các công việc chuyên môn, đồng thời phát triển kỹ năng làm việc nhóm, giải quyết vấn đề, và cải thiện khả năng giao tiếp trong môi trường làm việc thực tế. Đây cũng là cơ hội để sinh viên rèn luyện tính chủ động, sáng tạo và kỷ luật trong công việc.',
      progress: 45,
      startDate: "2024-02-20",
      endDate: "2024-06-20",
      numberOfCredits: 2,
      category: "Tốt nghiệp",
      outcome:
        "Sinh viên có thể áp dụng các kiến thức đã học vào các công việc thực tế tại doanh nghiệp hoặc tổ chức.\nXử lý các tình huống thực tế trong công việc, từ đó nâng cao năng lực chuyên môn.\nCải thiện kỹ năng giao tiếp trong môi trường làm việc chuyên nghiệp.\nLàm việc hiệu quả trong môi trường nhóm, quản lý dự án và phối hợp với các bộ phận khác nhau trong công ty.\nPhát triển kỹ năng giải quyết vấn đề thông qua việc đối mặt với các thách thức và khó khăn trong công việc.\nPhát triển tư duy phản biện trong việc phân tích các tình huống, đưa ra quyết định đúng đắn và hiệu quả.\nSinh viên sẽ hiểu được các yêu cầu và quy trình công việc trong ngành học của mình, từ đó nâng cao khả năng tự tin khi bước vào thị trường lao động.",
    },
    {
      id: "course_008",
      name: "Đồ án chuyên ngành",
      description:
        'Môn "Đồ án chuyên ngành" là môn học quan trọng trong chương trình đào tạo, nhằm giúp sinh viên tích lũy và ứng dụng các kiến thức chuyên môn đã học vào việc giải quyết một vấn đề thực tế trong lĩnh vực của mình. Đây là cơ hội để sinh viên thực hiện một dự án nghiên cứu hoặc thiết kế có tính chất ứng dụng, từ đó phát triển các kỹ năng cần thiết cho nghề nghiệp sau khi ra trường. Môn học này yêu cầu sinh viên tự thực hiện một đồ án có tính chất sáng tạo và chuyên môn cao, có thể là nghiên cứu, thiết kế hệ thống, phát triển phần mềm, hoặc giải quyết vấn đề thực tế trong lĩnh vực học tập. Sinh viên sẽ phải lập kế hoạch thực hiện, triển khai và hoàn thiện đồ án, đồng thời bảo vệ kết quả nghiên cứu hoặc sản phẩm cuối cùng trước hội đồng giảng viên.',
      progress: 45,
      startDate: "2024-02-20",
      endDate: "2024-06-20",
      numberOfCredits: 2,
      category: "Tốt nghiệp",
      outcome:
        "Sinh viên có thể vận dụng các kiến thức chuyên môn đã học để giải quyết một vấn đề thực tế hoặc phát triển một sản phẩm, hệ thống liên quan đến ngành học của mình.\nXây dựng một dự án hoàn chỉnh từ khâu nghiên cứu, thiết kế, triển khai đến hoàn thiện sản phẩm hoặc giải pháp.\nHọc cách xác định các yêu cầu, thiết kế giải pháp, thực hiện và kiểm tra các phương án để đạt được kết quả tối ưu.\nSinh viên cải thiện kỹ năng tổ chức công việc, quản lý thời gian và thực hiện các nhiệm vụ dự án một cách có kế hoạch.\nPhát triển khả năng làm việc độc lập và chủ động giải quyết các vấn đề phát sinh trong quá trình thực hiện đồ án.\nSinh viên có thể đưa ra các giải pháp sáng tạo cho vấn đề trong đồ án, đồng thời phát triển tư duy phản biện trong việc phân tích và đánh giá các lựa chọn khác nhau.\nKỹ năng giải quyết các vấn đề phức tạp một cách logic và hiệu quả.",
    },
    {
      id: "course_009",
      name: "Đồ án tốt nghiệp (Khoa học máy tính)",
      description:
        'Môn "Đồ án tốt nghiệp" là phần quan trọng nhất trong chương trình đào tạo của sinh viên. Đây là môn học tổng kết, giúp sinh viên áp dụng tất cả các kiến thức, kỹ năng đã học trong suốt quá trình học tập để thực hiện một dự án nghiên cứu hoặc phát triển sản phẩm cuối cùng, mang tính chất thực tế cao và có thể áp dụng ngay vào công việc sau khi ra trường. Môn học yêu cầu sinh viên thực hiện một đồ án nghiên cứu hoặc thiết kế, có thể là một phần mềm, hệ thống, mô hình nghiên cứu, hoặc giải pháp công nghệ có tính ứng dụng cao. Đồ án sẽ được thực hiện dưới sự hướng dẫn của giảng viên và có thể liên quan đến các vấn đề thực tiễn trong ngành học của sinh viên. Sau khi hoàn thành, sinh viên sẽ phải bảo vệ đồ án trước hội đồng giảng viên và chuyên gia.',
      progress: 45,
      startDate: "2024-02-20",
      endDate: "2024-06-20",
      numberOfCredits: 4,
      category: "Tốt nghiệp",
      outcome:
        "Sinh viên có thể sử dụng kiến thức lý thuyết và các công cụ kỹ thuật đã học để giải quyết các vấn đề thực tế trong ngành học của mình.\nSinh viên sẽ có thể thực hiện một dự án hoàn chỉnh, từ khâu nghiên cứu, thiết kế, triển khai đến hoàn thiện sản phẩm hoặc giải pháp.\nSinh viên sẽ học cách phân tích và đánh giá các phương án, từ đó lựa chọn phương pháp tối ưu để thực hiện đồ án.\nKhả năng làm việc độc lập và tự giải quyết các vấn đề phát sinh trong quá trình thực hiện đồ án, bao gồm lập kế hoạch, phân công công việc và theo dõi tiến độ.\nSinh viên nâng cao kỹ năng giao tiếp, trình bày kết quả nghiên cứu hoặc sản phẩm của mình trước hội đồng giảng viên và các chuyên gia.\nSinh viên học cách viết báo cáo kỹ thuật rõ ràng và dễ hiểu, trình bày một cách mạch lạc, logic và thuyết phục.\nSinh viên phát triển tư duy phản biện trong việc phân tích, đánh giá các vấn đề và lựa chọn giải pháp.\nSinh viên sẽ nâng cao kỹ năng lập trình, thiết kế hệ thống, phân tích dữ liệu, sử dụng các phần mềm, công cụ phát triển phần mềm và các công nghệ mới.",
    },
  ];

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            fontFamily: "Raleway_700Bold",
            fontWeight: "bold",
            width: "70%",
          }}
        >
          Môn học quan trọng
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={_courses}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard item={item} />}
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      />
    </View>
  );
}
