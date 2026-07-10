import { ReviewQuestion } from "./types";

export const wpaDisplayFiltersQuestions: ReviewQuestion[] = [
  {
    id: "wpa-display-filters-1",
    chapter: "wpa-display-filters",
    level: 1,
    question: `显示过滤器表达式的基本组成是什么？过滤器栏变绿和变红分别表示什么？`,
    answer:
      `基本组成：字段名 + 比较运算符 + 值，多个条件用逻辑运算符连接。例如 \`ip.addr == 192.168.1.10 && tcp.port == 443\`。比较运算符：==/!=/>/</>=/<=（或 eq/ne/gt/lt/ge/le）、contains（包含子串）、matches（正则匹配）。逻辑运算符：&&（and）、||（or）、!（not）。过滤器栏变绿表示语法正确，可以回车应用；变红表示语法错误，需要修正。这是即时语法检查机制。`,
    tags: ["显示过滤器", "表达式", "语法"],
  },
  {
    id: "wpa-display-filters-2",
    chapter: "wpa-display-filters",
    level: 2,
    question: `写出以下需求的显示过滤器表达式：只看 HTTP POST 请求、只看 TCP 重传、只看 DNS 响应。`,
    answer:
      `①只看 HTTP POST 请求：\`http.request.method == \"POST\"\` ②只看 TCP 重传：\`tcp.analysis.retransmission\`（此字段存在即为 true，无需 == 1）③只看 DNS 响应：\`dns.flags.response == 1\`。其他常用：HTTP 错误码 \`http.response.code >= 400\`；TCP RST \`tcp.flags.reset == 1\`；TCP 异常 \`tcp.analysis.flags\`；TLS Client Hello \`tls.handshake.type == 1\`；间隔超 1 秒 \`frame.time_delta > 1\`。`,
    tags: ["显示过滤器", "HTTP", "TCP重传", "DNS"],
  },
  {
    id: "wpa-display-filters-3",
    chapter: "wpa-display-filters",
    level: 1,
    question: `contains 和 matches 运算符有什么区别？各自适用于什么场景？`,
    answer:
      `contains：子串包含匹配，大小写敏感，不支持通配符。适合简单字符串查找，如 \`http.request.uri contains \"login\"\` 匹配 URI 中含 login 的请求。matches：正则表达式匹配，支持完整的正则语法。适合复杂模式匹配，如 \`http.host matches \"\\\\.google\\\\.com$\"\` 匹配以 .google.com 结尾的 Host。区别：contains 简单快速但功能有限；matches 强大但语法复杂、性能稍低。优先用 contains，模式复杂时才用 matches。`,
    tags: ["显示过滤器", "contains", "matches", "正则"],
  },
  {
    id: "wpa-display-filters-4",
    chapter: "wpa-display-filters",
    level: 2,
    question: `如何在 Wireshark 中快速构建显示过滤器？有哪些辅助功能？`,
    answer:
      `辅助功能：①右键菜单——在包详情区右键某个字段，选择「Apply as Filter」或「Prepare as Filter」可直接生成过滤表达式 ②表达式按钮——过滤器栏右侧的 Expression 按钮打开字段浏览对话框，可搜索字段名并选择运算符 ③自动补全——在过滤器栏输入时自动提示字段名 ④保存的过滤器——可把常用表达式保存供下次使用 ⑤着色规则——右键 → Colorize Conversation 可给特定会话着色区分。最佳实践：先右键生成基础表达式，再手动组合逻辑运算符。`,
    tags: ["显示过滤器", "右键菜单", "表达式构建"],
  },
];
