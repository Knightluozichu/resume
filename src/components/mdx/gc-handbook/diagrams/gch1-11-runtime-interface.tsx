import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第11章 运行时接口",
  "11.1 分配接口",
  "加速分配",
  "清零",
  "11.2 查找指针",
  "保守式指针查找",
  "使用带标签值精确查找指针",
  "在对象中精确查找指针",
  "在全局根中精确查找指针",
  "在栈和寄存器中精确查找指针",
  "在代码中精确查找指针",
  "处理内部指针",
  "处理派生指针",
  "11.3 对象表",
  "11.4 来自外部代码的引用",
  "11.5 栈屏障",
  "11.6 GC安全点与变异器暂停",
  "11.7 回收代码",
  "11.8 读写屏障",
  "工程实现",
  "写屏障精度",
  "哈希表",
  "顺序存储缓冲区",
  "溢出处理",
  "卡与卡表",
  "跨越映射",
  "卡摘要",
  "硬件与虚拟内存技术",
  "写屏障机制总结",
  "分块链表",
  "11.9 管理地址空间",
  "11.10 虚拟内存页保护的应用",
  "双重映射",
  "不可访问页的应用",
  "11.11 选择堆大小",
  "11.12 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第11章 运行时接口" focus="连接分配、根与指针发现、对象表、安全点、读写屏障、虚拟内存和堆大小选择的完整运行时合同" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第11章 运行时接口" focus="对同一程序切换保守/精确根、卡表粒度和安全点请求，验证漏报、误报、停顿与屏障成本" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第11章 运行时接口" focus="编译器-运行时-GC接口图、精确根映射、屏障矩阵、安全点与地址空间证据" nodes={nodes} />; }
