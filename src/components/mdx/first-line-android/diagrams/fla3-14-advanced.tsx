import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第14章 继续进阶，你还应该掌握的高级技巧",
  "14.1 全局获取Context的技巧",
  "14.2 使用Intent传递对象",
  "14.3 定制自己的日志工具",
  "14.4 调试Android程序",
  "14.5 深色主题",
  "14.6 Kotlin课堂：Java与Kotlin代码之间的转换",
  "14.7 总结"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第14章 继续进阶，你还应该掌握的高级技巧" focus="覆盖全局Context、对象传递、日志封装、调试、深色主题与Java/Kotlin互操作的生产边界" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第14章 继续进阶，你还应该掌握的高级技巧" focus="故意注入Activity泄漏、大对象Intent、日志敏感信息和主题硬编码，再用工具定位并修复" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第14章 继续进阶，你还应该掌握的高级技巧" focus="Context所有权表、序列化合同、结构化日志策略、调试证据、深色主题视觉回归" nodes={nodes} />; }
