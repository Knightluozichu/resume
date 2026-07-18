import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "7. Strings",
  "Extracting Substrings",
  "substring",
  "split",
  "String Manipulation",
  "Strings are immutable",
  "String Comparison",
  "For the More Curious: Unicode",
  "For the More Curious: Traversing a String’s Characters",
  "Challenge: Improving DragonSpeak"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="7. Strings" focus="掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="7. Strings" focus="按UTF-16索引误判用户可见字符，或忽略区域与大小写规则" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="7. Strings" focus="输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战" nodes={nodes} />; }
