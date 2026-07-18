import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const reflection: RustWayCase[] = [
  { label: "TypeId", input: "'static类型", mechanism: "运行期类型标识比较", result: "类型相同或不同", invariant: "TypeId不提供任意字段反射。" },
  { label: "Any", input: "dyn Any值", mechanism: "is与downcast_ref", result: "受检具体类型引用", invariant: "失败返回None，不得伪造目标类型。" },
  { label: "静态反射", input: "泛型与trait", mechanism: "编译期能力选择", result: "无运行时类型查询的代码", invariant: "优先把可知关系编码进类型系统。" },
];
const macroKinds: RustWayCase[] = [
  { label: "声明宏", input: "token tree与pattern", mechanism: "macro_rules匹配替换", result: "语法片段", invariant: "展开结果在调用上下文重新解析和检查。" },
  { label: "派生宏", input: "struct或enum AST", mechanism: "过程宏生成impl", result: "附加trait实现", invariant: "生成路径使用完整限定并给出精确诊断。" },
  { label: "属性/函数宏", input: "item或token stream", mechanism: "任意Rust代码转换", result: "替换后的token stream", invariant: "输入、输出语法和副作用边界写进文档。" },
];
const compile: RustWayCase[] = [
  { label: "展开", input: "宏调用", mechanism: "token匹配或过程宏执行", result: "扩展源码", invariant: "宏在编译期运行，不应依赖不稳定环境。" },
  { label: "解析检查", input: "扩展源码", mechanism: "name resolve、type与borrow check", result: "合法程序或诊断", invariant: "宏不能绕过类型和借用规则。" },
  { label: "迁移插件", input: "旧编译器插件需求", mechanism: "稳定过程宏、build.rs或lint工具", result: "受支持扩展点", invariant: "避免依赖私有编译器内部API。" },
];
export function RswReflectionLab() { return <RustWayOfficialLab title="类型检查、Any与向下转型" caption="Rust反射能力刻意受限，优先用泛型和Trait表达静态关系。" cases={reflection} tone="violet" />; }
export function RswMacroKindLab() { return <RustWayOfficialLab title="声明宏与过程宏" caption="三类稳定宏拥有不同输入坐标、生成能力与诊断责任。" cases={macroKinds} tone="cyan" />; }
export function RswMacroCompileLab() { return <RustWayOfficialLab title="宏的编译过程" caption="宏先生成代码，生成物仍需经过名称、类型、借用和代码生成阶段。" cases={compile} tone="amber" />; }
