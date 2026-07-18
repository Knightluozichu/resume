import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "TDD原则", input: "需求与输入", action: "先写会失败的行为示例，再写最小实现并重构", evidence: "TDD原则的测试与迁移记录", invariant: "先写会失败的行为示例，再写最小实现并重构；测试驱动的是接口与反馈，不是追求每行实现都先有一个脆弱断言。" },
  { label: "验收测试与单元测试", input: "TDD原则", action: "验收测试从用户边界证明能力，单元测试快速验证局部规则", evidence: "验收测试与单元测试的测试与迁移记录", invariant: "验收测试从用户边界证明能力，单元测试快速验证局部规则；两者之间还需要集成测试覆盖数据库、文件与网络适配。" },
  { label: "标准测试工具", input: "验收测试与单元测试", action: "unittest、doctest和测试发现提供标准反馈环", evidence: "标准测试工具的测试与迁移记录", invariant: "unittest、doctest和测试发现提供标准反馈环；原书的nose与早期py.test展示替代入口，现代迁移时要统一fixture、参数化和失败报告。" },
  { label: "Fake与Mock", input: "标准测试工具", action: "fake提供简化但可工作的实现，mock验证特定交互", evidence: "Fake与Mock的测试与迁移记录", invariant: "fake提供简化但可工作的实现，mock验证特定交互；优先断言可见结果，只有协议本身重要时才锁定调用次数和顺序。" },
  { label: "文档驱动开发", input: "Fake与Mock", action: "故事和doctest把可读示例变成执行证据，适合稳定的小接口", evidence: "文档驱动开发的测试与迁移记录", invariant: "故事和doctest把可读示例变成执行证据，适合稳定的小接口；复杂环境应移到测试模块，避免文档被大量搭建代码淹没。" },
];
export function PyaTestDrivenDevelopmentModelLab(){return <PythonAdvancedOfficialLab title="测试驱动开发：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaTestDrivenDevelopmentBoundaryLab(){return <PythonAdvancedOfficialLab title="测试驱动开发：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaTestDrivenDevelopmentEvidenceLab(){return <PythonAdvancedOfficialLab title="测试驱动开发：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
