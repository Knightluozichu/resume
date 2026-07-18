import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "包管理器", input: "目标与输入", rule: "包管理器把依赖解析、版本约束、制品缓存和发布元数据变成可复现流程", evidence: "包管理器的边界测试与结果记录", invariant: "包管理器把依赖解析、版本约束、制品缓存和发布元数据变成可复现流程；锁文件与清单承担不同责任，库和应用对锁定策略也不同。" },
  { label: "模块与可见性", input: "包管理器", rule: "模块树组织名称和隐私边界，pub只开放必要接口", evidence: "模块与可见性的边界测试与结果记录", invariant: "模块树组织名称和隐私边界，pub只开放必要接口；文件布局是模块结构的载体，不应让目录偶然决定公共API。" },
  { label: "Cargo 与 crate", input: "模块与可见性", rule: "package是Cargo管理单元，crate是编译单元，target是库、二进制、示例或测试目标", evidence: "Cargo 与 crate的边界测试与结果记录", invariant: "package是Cargo管理单元，crate是编译单元，target是库、二进制、示例或测试目标；先分清三者才能解释一次构建究竟产出什么。" },
  { label: "Cargo 扩展与工具", input: "Cargo 与 crate", rule: "cargo fmt、clippy、metadata和自定义子命令共享项目模型", evidence: "Cargo 扩展与工具的边界测试与结果记录", invariant: "cargo fmt、clippy、metadata和自定义子命令共享项目模型；工具必须读取结构化元数据，不能靠猜测target目录或解析人类输出工作。" },
  { label: "imgtool 项目", input: "Cargo 扩展与工具", rule: "原书的imgtool把清单、模块、依赖、命令行和图像处理连成项目", evidence: "imgtool 项目的边界测试与结果记录", invariant: "原书的imgtool把清单、模块、依赖、命令行和图像处理连成项目；验收要覆盖输入格式、输出路径、失败原子性与重复执行。" },
];

export function MrsManagingProjectsCargoModelLab() {
  return <MasteringRustOfficialLab title="使用 Cargo 管理项目：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsManagingProjectsCargoBoundaryLab() {
  return <MasteringRustOfficialLab title="使用 Cargo 管理项目：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsManagingProjectsCargoEvidenceLab() {
  return <MasteringRustOfficialLab title="使用 Cargo 管理项目：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
