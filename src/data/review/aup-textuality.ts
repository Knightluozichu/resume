import type { ReviewQuestion } from "./types";

export const aupTextualityQuestions: ReviewQuestion[] = [
  {
    id: "aup-textuality-01",
    chapter: "aup-textuality",
    level: 1,
    question: `UNIX 为什么偏好文本格式而非二进制格式？`,
    answer: `UNIX 偏好文本格式的原因：① 人可读——cat 即可查看内容，无需专用工具反序列化；② 可 diff——版本控制友好，变更一目了然；③ 可 grep——可用标准文本工具搜索过滤；④ 可手动编辑——出错时可直接用编辑器修改；⑤ 工具生态丰富——awk/sed/cut/jq 等工具可处理各种文本格式；⑥ 可组合——文本流可通过管道在工具间传递。缺点是体积更大、解析较慢，但 UNIX 哲学认为在大多数场景下可读性和可组合性的价值远大于性能损失。典型文本格式：JSON/YAML/XML/CSV、/etc 配置文件、HTTP 头。`,
    tags: ["文本格式", "UNIX哲学", "可读性"],
  },
  {
    id: "aup-textuality-02",
    chapter: "aup-textuality",
    level: 1,
    question: `数据格式设计的四大原则是什么？`,
    answer: `四大设计原则：① 透明性——数据结构可见，无隐藏魔法，cat 即可查看，grep 即可搜索；② 韧性——容错能力强，损坏不全局崩溃，可部分恢复，无前缀依赖（一行损坏不影响其他行）；③ 简洁性——语法最少化，一行一记录，字段分隔清晰，无冗余标记；④ 可扩展——向前兼容，可加新字段，老版本不崩溃，支持版本协商。这四个原则共同保证数据格式既好用又耐久。违反任一原则都会带来维护负担：不透明需专用工具、不韧性问题难恢复、不简洁增加认知负荷、不可扩展导致版本地狱。`,
    tags: ["数据格式", "设计原则", "透明性", "韧性"],
  },
  {
    id: "aup-textuality-03",
    chapter: "aup-textuality",
    level: 2,
    question: `什么时候应该使用二进制格式而非文本格式？`,
    answer: `使用二进制格式的场景：① 性能敏感——高频通信、大量数据传输，二进制解析快、体积小；② 数据结构复杂——嵌套关系、二进制数据（图像/音频）难以用文本表达；③ 带宽受限——移动端、嵌入式设备，体积差异显著；④ 需要类型安全——Protocol Buffers 等提供 schema 验证和类型检查。但即便用二进制，也应遵循 UNIX 理念：提供文本调试接口（如 protobuf 的 JSON 表示）、保留可观测性、做好版本兼容。原则：默认用文本，测量证明文本是瓶颈后才用二进制，且二进制格式应提供文本降级路径。典型二进制格式：Protocol Buffers/MessagePack/ELF/数据库存储格式。`,
    tags: ["二进制格式", "性能优化", "格式选择"],
  },
  {
    id: "aup-textuality-04",
    chapter: "aup-textuality",
    level: 3,
    question: `设计一个日志系统的数据格式，说明你的选择和理由。`,
    answer: `日志格式设计：选择结构化文本格式（JSON Lines，每行一个 JSON 对象）。理由：① 透明性——cat 可查看，jq 可过滤，grep 可搜索关键字；② 韧性——每行独立，一行损坏不影响其他行解析（JSON Lines 的优势）；③ 简洁性——JSON 语法清晰，字段名自描述；④ 可扩展——可随时添加新字段，老解析器忽略未知字段；⑤ 可组合——可通过管道串联处理（cat log.jsonl | jq 过滤 ERROR 级别 | sort）。字段设计：timestamp（ISO 8601）、level（INFO/WARN/ERROR）、message（人类可读）、trace_id（链路追踪）、fields（扩展字段）。对于超高性能场景，可提供二进制降级（如 MessagePack），但保留 JSON 转换工具。这体现了 UNIX 的文本优先理念：先保证可观测可组合，性能不够时再优化。`,
    tags: ["日志设计", "JSON Lines", "实战设计"],
  },
];
