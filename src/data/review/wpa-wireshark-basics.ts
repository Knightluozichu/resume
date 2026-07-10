import { ReviewQuestion } from "./types";

export const wpaWiresharkBasicsQuestions: ReviewQuestion[] = [
  {
    id: "wpa-wireshark-basics-1",
    chapter: "wpa-wireshark-basics",
    level: 1,
    question: `Wireshark 的抓包基本流程是什么？鲨鱼鳍和红方块按钮分别做什么？`,
    answer:
      `抓包流程：①选择要监听的网卡（Capture → Options 或点击网卡列表）②点击鲨鱼鳍按钮开始抓包（实时捕获该网卡的所有流量）③进行需要抓包的操作（如访问网页）④点击红方块按钮停止抓包 ⑤在包列表区分析捕获的数据。鲨鱼鳍=开始抓包，红方块=停止抓包。`,
    tags: ["Wireshark", "抓包流程", "网卡"],
  },
  {
    id: "wpa-wireshark-basics-2",
    chapter: "wpa-wireshark-basics",
    level: 2,
    question: `Wireshark 包列表区的每一列分别显示什么信息？颜色高亮有什么意义？`,
    answer:
      `包列表区列：No.（序号）、Time（时间戳，相对第一个包的时间）、Source（源地址）、Destination（目的地址）、Protocol（协议类型）、Length（包长度，字节）、Info（摘要信息，如 TCP 标志位、HTTP 方法等）。颜色高亮用于区分不同协议和包类型——Wireshark 内置着色规则，如 HTTP 请求为绿色、TCP RST 为红色、DNS 为蓝色等，帮助快速识别包的性质。`,
    tags: ["Wireshark", "包列表", "颜色规则"],
  },
  {
    id: "wpa-wireshark-basics-1b",
    chapter: "wpa-wireshark-basics",
    level: 1,
    question: `混合模式（Promiscuous Mode）和监听模式（Monitor Mode）有什么区别？`,
    answer:
      `混合模式（Promiscuous Mode）：用于有线网卡，让网卡接收局域网中所有发往其他设备的包，而不仅仅是发给自己的。在交换网络中由于交换机隔离，只能收到广播和自己端口的流量。监听模式（Monitor Mode）：用于无线网卡，让网卡以「监听」方式接收空气中所有 Wi-Fi 802.11 帧（包括其他设备之间的通信），无需关联到特定 AP。两者都用于扩大抓包范围，但场景不同——混合模式用于有线，监听模式用于无线。`,
    tags: ["Wireshark", "混合模式", "监听模式"],
  },
  {
    id: "wpa-wireshark-basics-2b",
    chapter: "wpa-wireshark-basics",
    level: 2,
    question: `如何保存和打开抓包文件？pcapng 格式有什么优势？`,
    answer:
      `保存：File → Save As，选择路径和格式。打开：File → Open 选择文件，或直接拖入 Wireshark 窗口。pcapng（PCAP Next Generation）是现代抓包格式，优势：①支持多接口的抓包数据（同一文件可含有线+无线）②支持自定义注释和元数据 ③支持更大的文件 ④向后兼容 pcap 格式。旧 pcap 格式只支持单接口、无注释。Wireshark 默认推荐使用 pcapng。`,
    tags: ["Wireshark", "pcapng", "文件格式"],
  },
];
