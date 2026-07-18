import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "PEP 8与命名风格", input: "需求与输入", action: "名字应按变量、常量、函数、类和模块的角色保持一致", evidence: "PEP 8与命名风格的测试与迁移记录", invariant: "名字应按变量、常量、函数、类和模块的角色保持一致；风格检查能发现形式偏差，但语义是否准确仍需领域评审。" },
  { label: "参数设计", input: "PEP 8与命名风格", action: "参数从真实用例迭代出来，必需项、默认值和关键字边界共同形成API", evidence: "参数设计的测试与迁移记录", invariant: "参数从真实用例迭代出来，必需项、默认值和关键字边界共同形成API；任意参数能扩展接口，也可能吞掉拼写错误和破坏可发现性。" },
  { label: "名称指南", input: "参数设计", action: "布尔名称表达判断，序列用复数，映射说明键值含义，并避免data、manager等泛称", evidence: "名称指南的测试与迁移记录", invariant: "布尔名称表达判断，序列用复数，映射说明键值含义，并避免data、manager等泛称；名称应让读者无需展开实现即可预测单位和失败。" },
  { label: "命名空间与API", input: "名称指南", action: "模块树决定用户导入路径，公共API要小而稳定", evidence: "命名空间与API的测试与迁移记录", invariant: "模块树决定用户导入路径，公共API要小而稳定；内部重排通过显式导出隔离，不能把所有实现细节暴露为偶然契约。" },
  { label: "弃用与质量工具", input: "命名空间与API", action: "弃用要给替代路径、告警、期限和兼容窗口，再在主版本删除", evidence: "弃用与质量工具的测试与迁移记录", invariant: "弃用要给替代路径、告警、期限和兼容窗口，再在主版本删除；静态检查与重复检测提供线索，最终变更仍需测试真实调用者。" },
];
export function PyaChoosingGoodNamesModelLab(){return <PythonAdvancedOfficialLab title="选择好名字与设计API：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaChoosingGoodNamesBoundaryLab(){return <PythonAdvancedOfficialLab title="选择好名字与设计API：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaChoosingGoodNamesEvidenceLab(){return <PythonAdvancedOfficialLab title="选择好名字与设计API：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
