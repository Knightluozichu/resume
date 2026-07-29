"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "avc2-references",
  title: "参考文献：规范、工具与证据边界",
  decision:
    "建立书目目录、版本化 AUTOSAR 规范、ISO 标准、工具文档与芯片资料的证据等级，拒绝把不同来源混成一个权威层级",
  invariant:
    "每条可变技术事实都有发布日期或版本、直接来源、适用范围和访问边界，二手目录只承担目录证据",
  fault: "用 2018 年零售目录证明 R25-11 的 RTE、安全或 Adaptive 机制细节",
  evidence:
    "来源 ID、标题、URL、发布日期、适用章节、主张摘录位置、版本差异与访问限制",
  concepts: ["参考文献"],
  pipeline: [
    {
      label: "书目边界",
      artifact: "2018 中文版元数据与正式目录",
    },
    {
      label: "规范事实",
      artifact: "AUTOSAR R25-11 版本化规范与发布页",
    },
    {
      label: "安全标准",
      artifact: "ISO 26262 生命周期与 AUTOSAR 措施",
    },
    {
      label: "工具硬件",
      artifact: "ETAS、MathWorks、NXP 官方文档",
    },
    {
      label: "主张登记",
      artifact: "事实、范围、版本、引用和复核日期",
    },
  ],
  scenarios: [
    {
      label: "核验 RTE 主张",
      input: "课程声称 RTE 连接应用组件与基础软件",
      expected: "引用当前 RTE 或 Classic 官方资料，并记录 R25-11 适用边界",
    },
    {
      label: "核验原书目录",
      input: "课程声称原书第 7 章覆盖九类 MCAL 条目",
      expected: "只用 2018 目录核对章节节点，不由此推断当前接口细节",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc2ReferencesArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc2ReferencesTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc2ReferencesFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
