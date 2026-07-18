import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "统一包结构", input: "需求与输入", action: "源码、测试、文档、许可证和构建元数据应有稳定位置", evidence: "统一包结构的测试与迁移记录", invariant: "源码、测试、文档、许可证和构建元数据应有稳定位置；src布局可避免测试意外导入工作区源码，安装后的包才是验收对象。" },
  { label: "构建与分发命令", input: "统一包结构", action: "原书围绕setup.py的sdist、bdist、install和develop讲生命周期", evidence: "构建与分发命令的测试与迁移记录", invariant: "原书围绕setup.py的sdist、bdist、install和develop讲生命周期；当前PyPA流程由pyproject声明后端，用build产出sdist与wheel并用pip安装。" },
  { label: "包元数据", input: "构建与分发命令", action: "名称、版本、Python要求、依赖、入口点和许可证影响解析与安装", evidence: "包元数据的测试与迁移记录", invariant: "名称、版本、Python要求、依赖、入口点和许可证影响解析与安装；元数据应来自单一来源，在构建制品中复查而不是只看配置文件。" },
  { label: "模板化创建", input: "包元数据", action: "原书用Python Paste模板统一项目骨架", evidence: "模板化创建的测试与迁移记录", invariant: "原书用Python Paste模板统一项目骨架；现代脚手架仍有价值，但模板必须版本化、可升级并保持最小，避免复制长期无人维护的配置。" },
  { label: "开发与发布周期", input: "模板化创建", action: "编辑安装、测试、构建、检查、测试索引和正式发布组成流水线", evidence: "开发与发布周期的测试与迁移记录", invariant: "编辑安装、测试、构建、检查、测试索引和正式发布组成流水线；每个版本从干净标签构建，同一制品经过验证后再提升。" },
];
export function PyaWritingPackageModelLab(){return <PythonAdvancedOfficialLab title="编写与分发包：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaWritingPackageBoundaryLab(){return <PythonAdvancedOfficialLab title="编写与分发包：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaWritingPackageEvidenceLab(){return <PythonAdvancedOfficialLab title="编写与分发包：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
