import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "31. Property Animation",
  "Building the Scene",
  "Simple Property Animation",
  "Playing Animators Together",
  "For the More Curious: Other Animation APIs",
  "Challenges"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第31章 Property Animation" focus="用属性、插值器、颜色求值和AnimatorSet解释可观察状态随时间的变化" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第31章 Property Animation" focus="用属性、插值器、颜色求值和AnimatorSet解释可观察状态随时间的变化" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第31章 Property Animation" focus="动画场景、时间曲线、组合顺序、取消与配置变化测试" nodes={nodes} />; }
