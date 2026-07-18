import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "生命周期模型", input: "需求与输入", action: "瀑布、螺旋和迭代模型对反馈时机与风险暴露方式不同", evidence: "生命周期模型的测试与迁移记录", invariant: "瀑布、螺旋和迭代模型对反馈时机与风险暴露方式不同；选择应由不确定性、法规和交付成本决定，而不是把某种流程当成仪式。" },
  { label: "迭代式计划与开发", input: "生命周期模型", action: "把目标拆成可验收增量，每次迭代包含设计、实现、测试和反馈", evidence: "迭代式计划与开发的测试与迁移记录", invariant: "把目标拆成可验收增量，每次迭代包含设计、实现、测试和反馈；任务完成定义必须包含文档、迁移与运行证据。" },
  { label: "全局调试与发布", input: "迭代式计划与开发", action: "集成阶段检查跨模块契约、性能和部署环境，发布使用冻结输入与候选制品", evidence: "全局调试与发布的测试与迁移记录", invariant: "集成阶段检查跨模块契约、性能和部署环境，发布使用冻结输入与候选制品；在发布当天首次组合系统会把未知风险集中爆发。" },
  { label: "Trac跟踪系统", input: "全局调试与发布", action: "原书用Trac串联ticket、里程碑、版本库和Wiki", evidence: "Trac跟踪系统的测试与迁移记录", invariant: "原书用Trac串联ticket、里程碑、版本库和Wiki；现代平台可以替代工具，但需求、变更、决策和证据的双向链接不可丢失。" },
  { label: "关闭与复盘", input: "Trac跟踪系统", action: "迭代结束要关闭或重排未完成项、记录偏差和行动负责人", evidence: "关闭与复盘的测试与迁移记录", invariant: "迭代结束要关闭或重排未完成项、记录偏差和行动负责人；复盘关注系统条件而非个人归罪，并验证改进是否在下一迭代执行。" },
];
export function PyaManagingLifeCycleModelLab(){return <PythonAdvancedOfficialLab title="管理软件生命周期：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaManagingLifeCycleBoundaryLab(){return <PythonAdvancedOfficialLab title="管理软件生命周期：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaManagingLifeCycleEvidenceLab(){return <PythonAdvancedOfficialLab title="管理软件生命周期：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
