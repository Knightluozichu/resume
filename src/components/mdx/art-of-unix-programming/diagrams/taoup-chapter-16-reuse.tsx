import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-16-reuse",
  title: "第16章 重用：论不要重新发明轮子",
  question: "在标准库、小型组件、外部服务和自研之间选择解析能力",
  nodes: ["问题界定", "候选检索", "适配验证", "许可维护", "退出演练"],
  concepts: [
    "16. Reuse",
    "The Tale of J. Random Newbie",
    "Transparency as the Key to Reuse",
    "From Reuse to Open Source",
    "The Best Things in Life Are Open",
    "Where to Look?",
    "Issues in Using Open-Source Software",
    "Licensing Issues",
    "What Qualifies as Open Source",
    "Standard Open-Source Licenses",
    "When You Need a Lawyer",
  ],
  actions: [
    {
      label: "收窄避免重造",
      detail: "只改变避免重造，保留接口透明与许可证的原始基线。",
    },
    {
      label: "显式化许可证",
      detail: "把许可证的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过维护活性",
      detail: "跳过维护活性直接追求替换成本，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "候选依赖的未知风险大于自研范围时，重用不再自动节省成本。",
  faultNote:
    "拒绝原因：引入庞大依赖只使用一个小函数，且没有许可证与供应链记录。",
} as const;

export function TaoupChapter16ReuseTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter16ReuseRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter16ReuseEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
