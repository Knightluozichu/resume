import { ReviewQuestion } from "./types";

export const wpaCaptureFiltersQuestions: ReviewQuestion[] = [
  {
    id: "wpa-capture-filters-1",
    chapter: "wpa-capture-filters",
    level: 1,
    question: `捕获过滤器和显示过滤器有什么区别？分别在什么场景下使用？`,
    answer:
      `捕获过滤器：在抓包时生效，使用 BPF 语法，在网卡层面过滤，只存储匹配的包到内存。优势是减少抓包量、节省资源；劣势是被过滤掉的包无法恢复。适合高流量环境或长时间抓包。显示过滤器：在抓包后生效，使用 Wireshark 表达式语法，对已抓到的包做筛选显示。优势是可随时切换条件、数据不丢失；劣势是已抓全部流量、内存开销大。适合分析阶段灵活筛选。实际使用中常先用捕获过滤减少数据量，再用显示过滤精细分析。`,
    tags: ["捕获过滤器", "显示过滤器", "BPF"],
  },
  {
    id: "wpa-capture-filters-2",
    chapter: "wpa-capture-filters",
    level: 2,
    question: `BPF 语法的基本结构是什么？写出以下场景的捕获过滤器表达式。`,
    answer:
      `BPF 语法 = [协议] [方向] [类型] [值] [逻辑运算符]。类型限定符：host/net/port/portrange；方向：src/dst；协议：ether/ip/tcp/udp/arp/icmp；逻辑：and/or/not。场景示例：①只抓特定主机：\`host 192.168.1.10\` ②只抓 HTTPS：\`tcp port 443\` ③排除 SSH 干扰：\`not port 22\` ④抓整个网段：\`net 10.0.0.0/24\` ⑤只抓 ping：\`icmp\` ⑥组合条件：\`tcp dst port 80 and src host 192.168.1.10\`。`,
    tags: ["BPF", "捕获过滤器", "语法"],
  },
  {
    id: "wpa-capture-filters-3",
    chapter: "wpa-capture-filters",
    level: 1,
    question: `什么是环形缓冲区和多文件轮转？它们解决什么问题？`,
    answer:
      `环形缓冲区（Ring Buffer）：Wireshark 在内存中维护一个固定大小的缓冲区，满了后新数据覆盖最旧的数据。防止长时间抓包时内存耗尽。多文件轮转：当抓包文件达到指定大小或数量后，自动创建新文件继续存储，旧文件可按配置保留或删除。解决的问题：长时间高流量抓包会导致单个文件过大（打开慢、占满磁盘）。环形缓冲区限制内存使用，多文件轮转限制磁盘使用，两者配合可实现长时间无人值守抓包。`,
    tags: ["环形缓冲区", "多文件轮转", "长时间抓包"],
  },
  {
    id: "wpa-capture-filters-4",
    chapter: "wpa-capture-filters",
    level: 2,
    question: `如何设置自动停止条件？有哪些可选的停止条件？`,
    answer:
      `在 Capture → Options 对话框中设置停止条件。可选条件：①包数（Packets）——抓到 N 个包后停止 ②文件大小（File size）——文件达到 N MB/KB 后停止 ③时长（Duration）——抓包 N 秒/分钟后停止。多个条件可同时设置，满足任一即停止。使用场景：包数限制适合精准抓取特定事件；文件大小适合控制存储；时长适合定时采样。配合多文件轮转可实现「每 100MB 切一个文件」的自动分割。`,
    tags: ["自动停止", "抓包选项", "条件触发"],
  },
];
