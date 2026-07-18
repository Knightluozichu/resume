import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const regions: RustWayCase[] = [
  { label: "栈", input: "固定大小局部值与frame", mechanism: "调用进入分配、返回回收", result: "快速LIFO存储", invariant: "不能返回指向已退出frame局部值的引用。" },
  { label: "堆", input: "运行期大小数据", mechanism: "allocator分配，owner负责释放", result: "稳定到move之外的buffer", invariant: "每块分配恰有一次合法释放。" },
  { label: "静态区", input: "static与常量数据", mechanism: "程序映像装载", result: "进程级存活", invariant: "可变static访问需要同步和unsafe证明。" },
];
const layouts: RustWayCase[] = [
  { label: "结构体", input: "不同size与alignment字段", mechanism: "布局、padding与repr", result: "满足对齐的连续对象", invariant: "默认repr不承诺稳定FFI布局。" },
  { label: "枚举", input: "tag与variant payload", mechanism: "判别值与niche优化", result: "可区分variant的表示", invariant: "不能从源码字段数猜实际size。" },
  { label: "胖指针", input: "slice或trait object引用", mechanism: "data pointer + metadata", result: "长度或vtable随引用传递", invariant: "metadata必须与data来源一致。" },
];
const raii: RustWayCase[] = [
  { label: "正常返回", input: "拥有文件或buffer的值", mechanism: "离开scope调用Drop", result: "资源释放", invariant: "清理与owner的词法寿命绑定。" },
  { label: "提前返回", input: "?传播错误", mechanism: "栈展开并drop局部owner", result: "已构造资源仍被清理", invariant: "半初始化状态不能被当成完整对象释放。" },
  { label: "引用环", input: "Rc节点互相强引用", mechanism: "引用计数永不归零", result: "逻辑内存泄漏", invariant: "回边使用Weak或显式拆环。" },
];
export function RswMemoryRegionLab() { return <RustWayOfficialLab title="栈、堆与静态区" caption="先定位存储区域，再判断值、handle、buffer和引用各自存活多久。" cases={regions} tone="cyan" />; }
export function RswLayoutLab() { return <RustWayOfficialLab title="复合类型内存布局" caption="size、alignment、padding、tag和metadata共同决定表示。" cases={layouts} tone="violet" />; }
export function RswRaiiLab() { return <RustWayOfficialLab title="RAII与泄漏" caption="Rust保证内存安全，不保证所有逻辑资源都不会泄漏。" cases={raii} tone="rose" />; }
