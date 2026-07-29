import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-appendix-d-rootless-root",
  title: "附录D 无根的根：无名师的Unix心传",
  question: "把一则关于复杂工具的公案转成团队可评审的设计假设",
  nodes: ["读取故事", "识别冲突", "提出解释", "寻找反例", "形成假设"],
  concepts: [
    "D. Rootless Root",
    "Editor's Introduction",
    "Master Foo and the Ten Thousand Lines",
    "Master Foo and the Script Kiddie",
    "Master Foo Discourses on the Two Paths",
    "Master Foo and the Methodologist",
    "Master Foo Discourses on the Graphical User Interface",
    "Master Foo and the Unix Zealot",
    "Master Foo Discourses on the Unix-Nature",
    "Master Foo and the End User",
  ],
  actions: [
    {
      label: "收窄隐喻",
      detail: "只改变隐喻，保留反转与执着的原始基线。",
    },
    {
      label: "显式化执着",
      detail: "把执着的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过工程解释",
      detail: "跳过工程解释直接追求反例，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "无法转换为可证伪条件的启发应保留为文化材料，不进入硬门禁。",
  faultNote: "拒绝原因：引用一句机锋终止技术讨论，却不给成立条件和可观察后果。",
} as const;

export function TaoupAppendixDRootlessRootTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupAppendixDRootlessRootRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupAppendixDRootlessRootEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
