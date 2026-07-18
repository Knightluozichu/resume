import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const cargo: RustWayCase[] = [
  { label: "Package", input: "Cargo.toml与一个或多个target", mechanism: "版本、feature、profile与依赖解析", result: "可构建发布单元", invariant: "Cargo.lock策略与库/应用发布边界一致。" },
  { label: "Crate", input: "lib.rs或bin入口", mechanism: "编译与命名空间单元", result: "library或binary artifact", invariant: "crate graph必须无循环。" },
  { label: "Workspace", input: "多个package", mechanism: "共享lockfile与target目录", result: "协同开发仓库", invariant: "共享版本不代表所有package必须同步发布。" },
];
const modules: RustWayCase[] = [
  { label: "mod", input: "模块树声明", mechanism: "建立路径与父子关系", result: "名称空间", invariant: "文件布局服务模块树，不反向决定公开API。" },
  { label: "use", input: "完整路径", mechanism: "把名称引入当前scope", result: "更短调用路径", invariant: "use不改变可见性和所有权。" },
  { label: "pub", input: "私有item", mechanism: "扩大到crate、super或公开范围", result: "可访问接口", invariant: "只暴露能长期维护的不变量和类型。" },
];
const csv: RustWayCase[] = [
  { label: "读取", input: "Reader与原始record", mechanism: "csv crate解析quote与delimiter", result: "字段序列或Error", invariant: "不能用split(',')替代CSV语法。" },
  { label: "转换", input: "字段与schema", mechanism: "deserialize、validate、domain mapping", result: "有效领域记录", invariant: "行号、字段名和源错误保留在错误链。" },
  { label: "输出", input: "领域记录", mechanism: "Writer负责escape与flush", result: "协议正确CSV", invariant: "失败时不能把部分文件误标为完整产物。" },
];
export function RswCargoGraphLab() { return <RustWayOfficialLab title="Package、Crate与Workspace" caption="Cargo同时管理构建单元、依赖图、feature与发布边界。" cases={cargo} tone="cyan" />; }
export function RswModuleVisibilityLab() { return <RustWayOfficialLab title="模块、路径与可见性" caption="模块树组织名字，pub设计长期接口，use只改变局部写法。" cases={modules} tone="violet" />; }
export function RswCsvPackageLab() { return <RustWayOfficialLab title="CSV功能包闭环" caption="读取、转换、输出三层分别保留协议、领域与产物不变量。" cases={csv} tone="emerald" />; }
