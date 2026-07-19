import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-01-philosophy",
  title: "第1章 哲学",
  question: "审查一条读取事件、规范化字段、筛选并输出结果的工具链",
  nodes: ["文化语境", "得失判断", "规则组合", "一课总结", "工程态度"],
  concepts: [
    "1. Philosophy",
    "Culture? What Culture?",
    "The Durability of Unix",
    "The Case against Learning Unix Culture",
    "What Unix Gets Wrong",
    "What Unix Gets Right",
    "Open-Source Software",
    "Cross-Platform Portability and Open Standards",
    "The Internet and the World Wide Web",
    "The Open-Source Community",
    "Flexibility All the Way Down",
    "Unix Is Fun to Hack",
    "The Lessons of Unix Can Be Applied Elsewhere",
    "Basics of the Unix Philosophy",
    "Rule of Modularity: Write simple parts connected by clean interfaces.",
    "Rule of Clarity: Clarity is better than cleverness.",
    "Rule of Composition: Design programs to be connected with other programs.",
    "Rule of Separation: Separate policy from mechanism; separate interfaces from engines.",
    "Rule of Simplicity: Design for simplicity; add complexity only where you must.",
    "Rule of Parsimony: Write a big program only when it is clear by demonstration that nothing else will do.",
    "Rule of Transparency: Design for visibility to make inspection and debugging easier.",
    "Rule of Robustness: Robustness is the child of transparency and simplicity.",
    "Rule of Representation: Fold knowledge into data, so program logic can be stupid and robust.",
    "Rule of Least Surprise: In interface design, always do the least surprising thing.",
    "Rule of Silence: When a program has nothing surprising to say, it should say nothing.",
    "Rule of Repair: Repair what you can — but when you must fail, fail noisily and as soon as possible.",
    "Rule of Economy: Programmer time is expensive; conserve it in preference to machine time.",
    "Rule of Generation: Avoid hand-hacking; write programs to write programs when you can.",
    "Rule of Optimization: Prototype before polishing. Get it working before you optimize it.",
    "Rule of Diversity: Distrust all claims for one true way.",
    "Rule of Extensibility: Design for the future, because it will be here sooner than you think.",
    "The Unix Philosophy in One Lesson",
    "Applying the Unix Philosophy",
    "Attitude Matters Too",
  ],
  actions: [
    {
      label: "收窄模块化",
      detail: "只改变模块化，保留清晰与组合的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化组合",
      detail: "把组合的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过分离",
      detail: "跳过分离直接追求简洁，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["模块化风险", "组合可见度", "简洁恢复度"],
  boundaryNote: "拆分只有在接口更窄、失败更清楚且组合成本下降时才算模块化。",
  faultNote:
    "拒绝原因：为了追求小工具数量而制造更多格式转换、隐式状态和失败边界。",
} as const;

export function TaoupChapter01PhilosophyTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter01PhilosophyRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter01PhilosophyEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
