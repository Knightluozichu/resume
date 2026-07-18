import type { ReviewQuestion } from "../review-questions";

export const ppa3OfficialQuestions: ReviewQuestion[] = [
  {
    id: "ppa3-official-q1",
    chapter: "ppa3-official-learning-map",
    level: 1,
    question: "“第3版权威学习地图”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担8个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q2",
    chapter: "ppa3-official-learning-map",
    level: 1,
    question: "“第3版权威学习地图”的最小数据包不变量是什么？",
    answer: "253个正式节点都有页面、实验、题目和相邻导航，不再按泛化主题替代",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q3",
    chapter: "ppa3-official-learning-map",
    level: 2,
    question: "怎样为“第3版权威学习地图”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：旧10页遗漏命令行、现实案例、慢网络、无线、附录与大量正式小节。",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q4",
    chapter: "ppa3-official-learning-map",
    level: 2,
    question: "为什么“第3版权威学习地图”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q5",
    chapter: "ppa3-official-learning-map",
    level: 3,
    question: "如何验证“第3版权威学习地图”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q6",
    chapter: "ppa3-official-learning-map",
    level: 3,
    question: "“第3版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第3版权威学习地图", "第3版"],
  },
  {
    id: "ppa3-official-q7",
    chapter: "ppa3-introduction",
    level: 1,
    question: "“导言”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担7个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q8",
    chapter: "ppa3-introduction",
    level: 1,
    question: "“导言”的最小数据包不变量是什么？",
    answer: "每个结论都能回到样例捕获文件、帧号、字段字节和复现步骤",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q9",
    chapter: "ppa3-introduction",
    level: 2,
    question: "怎样为“导言”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：只浏览界面截图而不保存捕获条件和原始PCAP，无法复核任何结论。",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q10",
    chapter: "ppa3-introduction",
    level: 2,
    question: "为什么“导言”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q11",
    chapter: "ppa3-introduction",
    level: 3,
    question: "如何验证“导言”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q12",
    chapter: "ppa3-introduction",
    level: 3,
    question: "“导言”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["导言", "PCAP"],
  },
  {
    id: "ppa3-official-q13",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 1,
    question: "“第1章 数据包分析技术与网络基础”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担15个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q14",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 1,
    question: "“第1章 数据包分析技术与网络基础”的最小数据包不变量是什么？",
    answer: "每个帧都能标出捕获点、链路方向、封装层次、源目的与流量类别",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q15",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 2,
    question: "怎样为“第1章 数据包分析技术与网络基础”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：把Wireshark看到的帧误当成全网事实，会忽略交换路径与捕获位置。",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q16",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 2,
    question:
      "为什么“第1章 数据包分析技术与网络基础”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q17",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 3,
    question: "如何验证“第1章 数据包分析技术与网络基础”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q18",
    chapter: "ppa3-01-packet-analysis-network-basics",
    level: 3,
    question: "“第1章 数据包分析技术与网络基础”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第1章 数据包分析技术与网络基础", "嗅探器"],
  },
  {
    id: "ppa3-official-q19",
    chapter: "ppa3-02-tapping-into-wire",
    level: 1,
    question: "“第2章 监听网络线路”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担10个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q20",
    chapter: "ppa3-02-tapping-into-wire",
    level: 1,
    question: "“第2章 监听网络线路”的最小数据包不变量是什么？",
    answer: "捕获点确实位于目标通信路径，并记录丢包、方向性和拓扑影响",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q21",
    chapter: "ppa3-02-tapping-into-wire",
    level: 2,
    question: "怎样为“第2章 监听网络线路”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：仅开启混杂模式并不能让交换机把其他端口的流量送到分析主机。",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q22",
    chapter: "ppa3-02-tapping-into-wire",
    level: 2,
    question: "为什么“第2章 监听网络线路”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q23",
    chapter: "ppa3-02-tapping-into-wire",
    level: 3,
    question: "如何验证“第2章 监听网络线路”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q24",
    chapter: "ppa3-02-tapping-into-wire",
    level: 3,
    question: "“第2章 监听网络线路”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第2章 监听网络线路", "混杂模式"],
  },
  {
    id: "ppa3-official-q25",
    chapter: "ppa3-03-introduction-wireshark",
    level: 1,
    question: "“第3章 Wireshark入门”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担14个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q26",
    chapter: "ppa3-03-introduction-wireshark",
    level: 1,
    question: "“第3章 Wireshark入门”的最小数据包不变量是什么？",
    answer: "分析环境的版本、接口、时间、名称解析和配置方案均可复现",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q27",
    chapter: "ppa3-03-introduction-wireshark",
    level: 2,
    question: "怎样为“第3章 Wireshark入门”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：默认配置、自动名称解析和错误接口会制造不存在的协议或时序结论。",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q28",
    chapter: "ppa3-03-introduction-wireshark",
    level: 2,
    question: "为什么“第3章 Wireshark入门”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q29",
    chapter: "ppa3-03-introduction-wireshark",
    level: 3,
    question: "如何验证“第3章 Wireshark入门”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q30",
    chapter: "ppa3-03-introduction-wireshark",
    level: 3,
    question: "“第3章 Wireshark入门”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第3章 Wireshark入门", "Wireshark"],
  },
  {
    id: "ppa3-official-q31",
    chapter: "ppa3-04-working-captured-packets",
    level: 1,
    question: "“第4章 玩转捕获数据包”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担21个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q32",
    chapter: "ppa3-04-working-captured-packets",
    level: 1,
    question: "“第4章 玩转捕获数据包”的最小数据包不变量是什么？",
    answer: "原始文件只读保留，所有过滤、合并、时间偏移和导出操作都有记录",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q33",
    chapter: "ppa3-04-working-captured-packets",
    level: 2,
    question: "怎样为“第4章 玩转捕获数据包”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：把显示过滤器当捕获过滤器会导致数据量失控，反向混淆则会永久漏包。",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q34",
    chapter: "ppa3-04-working-captured-packets",
    level: 2,
    question: "为什么“第4章 玩转捕获数据包”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q35",
    chapter: "ppa3-04-working-captured-packets",
    level: 3,
    question: "如何验证“第4章 玩转捕获数据包”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q36",
    chapter: "ppa3-04-working-captured-packets",
    level: 3,
    question: "“第4章 玩转捕获数据包”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第4章 玩转捕获数据包", "pcapng"],
  },
  {
    id: "ppa3-official-q37",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 1,
    question: "“第5章 Wireshark高级特性”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担20个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q38",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 1,
    question: "“第5章 Wireshark高级特性”的最小数据包不变量是什么？",
    answer: "统计结论能下钻到具体会话、帧、字段与解析器，并与原始字节一致",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q39",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 2,
    question: "怎样为“第5章 Wireshark高级特性”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：专家信息和图表是线索而非裁决，单独使用会把症状误判为根因。",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q40",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 2,
    question: "为什么“第5章 Wireshark高级特性”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q41",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 3,
    question: "如何验证“第5章 Wireshark高级特性”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q42",
    chapter: "ppa3-05-advanced-wireshark-features",
    level: 3,
    question: "“第5章 Wireshark高级特性”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第5章 Wireshark高级特性", "端点"],
  },
  {
    id: "ppa3-official-q43",
    chapter: "ppa3-06-command-line-analysis",
    level: 1,
    question: "“第6章 用命令行分析数据包”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担10个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q44",
    chapter: "ppa3-06-command-line-analysis",
    level: 1,
    question: "“第6章 用命令行分析数据包”的最小数据包不变量是什么？",
    answer: "命令、接口、过滤器、权限、输出格式和退出状态均进入实验记录",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q45",
    chapter: "ppa3-06-command-line-analysis",
    level: 2,
    question: "怎样为“第6章 用命令行分析数据包”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：不区分捕获过滤与显示过滤，或忽略shell引用，会得到空文件或错误样本。",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q46",
    chapter: "ppa3-06-command-line-analysis",
    level: 2,
    question:
      "为什么“第6章 用命令行分析数据包”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q47",
    chapter: "ppa3-06-command-line-analysis",
    level: 3,
    question: "如何验证“第6章 用命令行分析数据包”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q48",
    chapter: "ppa3-06-command-line-analysis",
    level: 3,
    question: "“第6章 用命令行分析数据包”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第6章 用命令行分析数据包", "TShark"],
  },
  {
    id: "ppa3-official-q49",
    chapter: "ppa3-07-network-layer-protocols",
    level: 1,
    question: "“第7章 网络层协议”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担15个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q50",
    chapter: "ppa3-07-network-layer-protocols",
    level: 1,
    question: "“第7章 网络层协议”的最小数据包不变量是什么？",
    answer: "链路地址、网络地址、协议字段、校验、跳数与请求响应能逐字节对应",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q51",
    chapter: "ppa3-07-network-layer-protocols",
    level: 2,
    question: "怎样为“第7章 网络层协议”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：ARP、IP与ICMP跨层相关，遗漏一层会把邻居解析失败误判为路由失败。",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q52",
    chapter: "ppa3-07-network-layer-protocols",
    level: 2,
    question: "为什么“第7章 网络层协议”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q53",
    chapter: "ppa3-07-network-layer-protocols",
    level: 3,
    question: "如何验证“第7章 网络层协议”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q54",
    chapter: "ppa3-07-network-layer-protocols",
    level: 3,
    question: "“第7章 网络层协议”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第7章 网络层协议", "ARP"],
  },
  {
    id: "ppa3-official-q55",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 1,
    question: "“第8章 传输层协议”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担8个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q56",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 1,
    question: "“第8章 传输层协议”的最小数据包不变量是什么？",
    answer: "四元组、序列确认、标志、窗口、长度与方向在同一时间线闭合",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q57",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 2,
    question: "怎样为“第8章 传输层协议”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：只看SYN或RST单帧无法区分正常拒绝、异常中断与中间设备注入。",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q58",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 2,
    question: "为什么“第8章 传输层协议”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q59",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 3,
    question: "如何验证“第8章 传输层协议”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q60",
    chapter: "ppa3-08-transport-layer-protocols",
    level: 3,
    question: "“第8章 传输层协议”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第8章 传输层协议", "TCP"],
  },
  {
    id: "ppa3-official-q61",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 1,
    question: "“第9章 常见高层网络协议”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担21个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q62",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 1,
    question: "“第9章 常见高层网络协议”的最小数据包不变量是什么？",
    answer: "每次应用事务能关联到底层会话、请求响应标识、状态和载荷",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q63",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 2,
    question: "怎样为“第9章 常见高层网络协议”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：按端口猜协议会错过非标准端口、重传、分段和解析器选择问题。",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q64",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 2,
    question: "为什么“第9章 常见高层网络协议”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q65",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 3,
    question: "如何验证“第9章 常见高层网络协议”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q66",
    chapter: "ppa3-09-upper-layer-protocols",
    level: 3,
    question: "“第9章 常见高层网络协议”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第9章 常见高层网络协议", "DHCP"],
  },
  {
    id: "ppa3-official-q67",
    chapter: "ppa3-10-real-world-scenarios",
    level: 1,
    question: "“第10章 基础的现实世界场景”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担26个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q68",
    chapter: "ppa3-10-real-world-scenarios",
    level: 1,
    question: "“第10章 基础的现实世界场景”的最小数据包不变量是什么？",
    answer: "每个案例都按捕获位置、预测、首个异常帧、根因与经验回收闭环",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q69",
    chapter: "ppa3-10-real-world-scenarios",
    level: 2,
    question: "怎样为“第10章 基础的现实世界场景”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：直接套过滤器或盯最后一个错误包，会忽略真正发生在更早阶段的异常。",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q70",
    chapter: "ppa3-10-real-world-scenarios",
    level: 2,
    question:
      "为什么“第10章 基础的现实世界场景”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q71",
    chapter: "ppa3-10-real-world-scenarios",
    level: 3,
    question: "如何验证“第10章 基础的现实世界场景”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q72",
    chapter: "ppa3-10-real-world-scenarios",
    level: 3,
    question: "“第10章 基础的现实世界场景”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第10章 基础的现实世界场景", "场景"],
  },
  {
    id: "ppa3-official-q73",
    chapter: "ppa3-11-fighting-slow-network",
    level: 1,
    question: "“第11章 让网络不再卡”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担21个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q74",
    chapter: "ppa3-11-fighting-slow-network",
    level: 1,
    question: "“第11章 让网络不再卡”的最小数据包不变量是什么？",
    answer: "性能结论有双向时间线、RTT样本、窗口演化、重传原因和历史基线",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q75",
    chapter: "ppa3-11-fighting-slow-network",
    level: 2,
    question: "怎样为“第11章 让网络不再卡”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：看到重传就归咎网络会混淆线路丢包、接收端受限和抓包点自身丢包。",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q76",
    chapter: "ppa3-11-fighting-slow-network",
    level: 2,
    question: "为什么“第11章 让网络不再卡”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q77",
    chapter: "ppa3-11-fighting-slow-network",
    level: 3,
    question: "如何验证“第11章 让网络不再卡”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q78",
    chapter: "ppa3-11-fighting-slow-network",
    level: 3,
    question: "“第11章 让网络不再卡”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第11章 让网络不再卡", "重传"],
  },
  {
    id: "ppa3-official-q79",
    chapter: "ppa3-12-security-analysis",
    level: 1,
    question: "“第12章 安全领域的数据包分析”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担12个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q80",
    chapter: "ppa3-12-security-analysis",
    level: 1,
    question: "“第12章 安全领域的数据包分析”的最小数据包不变量是什么？",
    answer: "安全判断同时保留行为序列、载荷证据、受害者上下文和替代解释",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q81",
    chapter: "ppa3-12-security-analysis",
    level: 2,
    question: "怎样为“第12章 安全领域的数据包分析”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：单一SYN、域名或告警不能证明攻击，必须形成多包行为和主机证据链。",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q82",
    chapter: "ppa3-12-security-analysis",
    level: 2,
    question:
      "为什么“第12章 安全领域的数据包分析”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q83",
    chapter: "ppa3-12-security-analysis",
    level: 3,
    question: "如何验证“第12章 安全领域的数据包分析”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q84",
    chapter: "ppa3-12-security-analysis",
    level: 3,
    question: "“第12章 安全领域的数据包分析”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第12章 安全领域的数据包分析", "SYN扫描"],
  },
  {
    id: "ppa3-official-q85",
    chapter: "ppa3-13-wireless-analysis",
    level: 1,
    question: "“第13章 无线网络数据包分析”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担23个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q86",
    chapter: "ppa3-13-wireless-analysis",
    level: 1,
    question: "“第13章 无线网络数据包分析”的最小数据包不变量是什么？",
    answer: "无线结论记录信道、频率、BSSID、帧类型、信号、网卡模式与认证序列",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q87",
    chapter: "ppa3-13-wireless-analysis",
    level: 2,
    question: "怎样为“第13章 无线网络数据包分析”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：单信道抓包和驱动限制会制造缺帧，不能把未捕获误判为未发送。",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q88",
    chapter: "ppa3-13-wireless-analysis",
    level: 2,
    question:
      "为什么“第13章 无线网络数据包分析”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q89",
    chapter: "ppa3-13-wireless-analysis",
    level: 3,
    question: "如何验证“第13章 无线网络数据包分析”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q90",
    chapter: "ppa3-13-wireless-analysis",
    level: 3,
    question: "“第13章 无线网络数据包分析”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第13章 无线网络数据包分析", "监控模式"],
  },
  {
    id: "ppa3-official-q91",
    chapter: "ppa3-appendix-a",
    level: 1,
    question: "“附录A 延伸阅读”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担24个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q92",
    chapter: "ppa3-appendix-a",
    level: 1,
    question: "“附录A 延伸阅读”的最小数据包不变量是什么？",
    answer: "每个工具都明确版本、证据格式、适用边界与替代工具，不凭名称推荐",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q93",
    chapter: "ppa3-appendix-a",
    level: 2,
    question: "怎样为“附录A 延伸阅读”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：附录列的是2017年生态快照，失效工具不能被悄悄替换为现代产品。",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q94",
    chapter: "ppa3-appendix-a",
    level: 2,
    question: "为什么“附录A 延伸阅读”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q95",
    chapter: "ppa3-appendix-a",
    level: 3,
    question: "如何验证“附录A 延伸阅读”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q96",
    chapter: "ppa3-appendix-a",
    level: 3,
    question: "“附录A 延伸阅读”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["附录A 延伸阅读", "Scapy"],
  },
  {
    id: "ppa3-official-q97",
    chapter: "ppa3-appendix-b",
    level: 1,
    question: "“附录B 分析数据包结构”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担5个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q98",
    chapter: "ppa3-appendix-b",
    level: 1,
    question: "“附录B 分析数据包结构”的最小数据包不变量是什么？",
    answer: "结构图中的每个字段都能映射到原始十六进制偏移与解析结果",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q99",
    chapter: "ppa3-appendix-b",
    level: 2,
    question: "怎样为“附录B 分析数据包结构”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：只相信解析树而不核对原始字节，会忽略截断、错误解析器与畸形长度。",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q100",
    chapter: "ppa3-appendix-b",
    level: 2,
    question: "为什么“附录B 分析数据包结构”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q101",
    chapter: "ppa3-appendix-b",
    level: 3,
    question: "如何验证“附录B 分析数据包结构”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q102",
    chapter: "ppa3-appendix-b",
    level: 3,
    question: "“附录B 分析数据包结构”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["附录B 分析数据包结构", "偏移"],
  },
  {
    id: "ppa3-official-q103",
    chapter: "ppa3-index",
    level: 1,
    question: "“索引”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担1个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q104",
    chapter: "ppa3-index",
    level: 1,
    question: "“索引”的最小数据包不变量是什么？",
    answer: "任一索引词都能到达正式节点、样例帧、过滤器和反例证据",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q105",
    chapter: "ppa3-index",
    level: 2,
    question: "怎样为“索引”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：主题式旧课程无法从原书术语回到真实章节，导致检索和复习断裂。",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q106",
    chapter: "ppa3-index",
    level: 2,
    question: "为什么“索引”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q107",
    chapter: "ppa3-index",
    level: 3,
    question: "如何验证“索引”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q108",
    chapter: "ppa3-index",
    level: 3,
    question: "“索引”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["索引", "索引"],
  },
  {
    id: "ppa3-official-q109",
    chapter: "ppa3-official-final-review",
    level: 1,
    question: "“第3版总复习与数据包诊断审计”承担哪些节点，正式分母是什么？",
    answer:
      "本页承担8个目录或学习节点；全书正式分母固定为17个正式单元、253个详细目录节点。",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
  {
    id: "ppa3-official-q110",
    chapter: "ppa3-official-final-review",
    level: 1,
    question: "“第3版总复习与数据包诊断审计”的最小数据包不变量是什么？",
    answer: "复核者能从PCAP和记录独立得到相同的首个异常、根因与修复结论",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
  {
    id: "ppa3-official-q111",
    chapter: "ppa3-official-final-review",
    level: 2,
    question: "怎样为“第3版总复习与数据包诊断审计”构造单变量数据包实验？",
    answer:
      "固定捕获位置、原始PCAP和其他分析条件，只改变一个接口、过滤器、解析器、字段、时序或协议变量；重点反证：只有截图、过滤结果或结论，没有原始PCAP与捕获条件就无法审计。",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
  {
    id: "ppa3-official-q112",
    chapter: "ppa3-official-final-review",
    level: 2,
    question:
      "为什么“第3版总复习与数据包诊断审计”不能只靠专家信息或最终错误验收？",
    answer:
      "专家信息、协议标签和最终错误都是解释或症状，不能证明捕获点、原始字节、首个偏差与根因；必须保留帧级时间线。",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
  {
    id: "ppa3-official-q113",
    chapter: "ppa3-official-final-review",
    level: 3,
    question: "如何验证“第3版总复习与数据包诊断审计”没有混入其他版次？",
    answer:
      "核对No Starch Press第3版官方页面和详细目录、2018年中文版目录，并把Wireshark 2.0.5、AirPcap、WEP/WPA和原书案例视为固定历史边界。",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
  {
    id: "ppa3-official-q114",
    chapter: "ppa3-official-final-review",
    level: 3,
    question: "“第3版总复习与数据包诊断审计”独立交接必须包含什么？",
    answer:
      "需要版本、拓扑、捕获点、原始PCAP哈希、帧号、过滤器、字段偏移、正常/故障对照、恢复、偏差、责任人与复核人。",
    tags: ["第3版总复习与数据包诊断审计", "目录审计"],
  },
];
