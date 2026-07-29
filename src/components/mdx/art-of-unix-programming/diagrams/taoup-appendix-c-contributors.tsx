import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-appendix-c-contributors",
  title: "附录C 贡献者",
  question: "审查一个案例的作者、事实来源、技术评审与编辑责任",
  nodes: ["识别角色", "记录贡献", "限定范围", "链接证据", "避免背书推断"],
  concepts: ["C. Contributors"],
  actions: [
    {
      label: "收窄作者责任",
      detail: "只改变作者责任，保留案例来源与技术评审的原始基线。",
    },
    {
      label: "显式化技术评审",
      detail: "把技术评审的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过编辑贡献",
      detail: "跳过编辑贡献直接追求背书边界，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "贡献名单只能证明参与关系，不能替代许可证或事实验证。",
  faultNote: "拒绝原因：因专家姓名出现在名单中，就推断其认可全书每项技术结论。",
} as const;

export function TaoupAppendixCContributorsTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupAppendixCContributorsRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupAppendixCContributorsEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
