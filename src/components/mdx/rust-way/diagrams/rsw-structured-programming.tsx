import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const data: RustWayCase[] = [
  { label: "Struct", input: "共同存在的字段", mechanism: "impl封装不变量", result: "product type对象", invariant: "构造后所有字段组合都应合法。" },
  { label: "Enum", input: "互斥状态", mechanism: "variant携带各自payload", result: "sum type状态机", invariant: "不可表示非法状态组合。" },
  { label: "Trait object", input: "异构实现集合", mechanism: "对象安全trait与动态分派", result: "统一行为边界", invariant: "对象所有权与析构位置必须明确。" },
];
const drops: RustWayCase[] = [
  { label: "局部变量", input: "同一scope多个owner", mechanism: "逆声明顺序drop", result: "确定清理序列", invariant: "不要让正确性依赖未写入类型的不明显顺序。" },
  { label: "结构体字段", input: "一个owner内多个字段", mechanism: "按字段声明顺序drop", result: "子资源依次释放", invariant: "Drop实现运行后字段仍由编译器自动清理。" },
  { label: "部分移动", input: "移出部分字段", mechanism: "drop flag追踪仍初始化部分", result: "只释放剩余值", invariant: "实现Drop的类型不能随意部分移出。" },
];
const patterns: RustWayCase[] = [
  { label: "Builder", input: "多项可选配置", mechanism: "链式累积后validate/build", result: "完整合法对象", invariant: "build是唯一把草稿变成有效对象的边界。" },
  { label: "Visitor", input: "稳定数据结构、多种操作", mechanism: "遍历与操作分离", result: "可扩展操作集合", invariant: "新增数据variant会迫使访问逻辑重新穷尽。" },
  { label: "RAII Guard", input: "临时获取锁或资源", mechanism: "guard寿命绑定释放", result: "异常路径也自动清理", invariant: "guard不能活过其保护对象。" },
];
export function RswDataModelLab() { return <RustWayOfficialLab title="结构体、枚举与对象风格" caption="用product type表示共存，用sum type表示互斥，用trait表示行为。" cases={data} tone="cyan" />; }
export function RswDropOrderLab() { return <RustWayOfficialLab title="析构顺序" caption="Drop顺序是资源协议的一部分，部分移动还会改变实际清理集合。" cases={drops} tone="rose" />; }
export function RswPatternLab() { return <RustWayOfficialLab title="Builder、Visitor与RAII" caption="模式必须由不变量和变化方向驱动，而不是照搬类层次。" cases={patterns} tone="emerald" />; }
