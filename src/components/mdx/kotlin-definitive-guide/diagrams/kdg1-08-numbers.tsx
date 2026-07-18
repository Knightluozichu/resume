import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "8. Numbers",
  "Numeric Types",
  "Integers",
  "Decimal Numbers",
  "Converting a String to a Numeric Type",
  "Converting an Int to a Double",
  "Formatting a Double",
  "Converting a Double to an Int",
  "For the More Curious: Bit Manipulation",
  "Challenge: Remaining Pints",
  "Challenge: Handling a Negative Balance",
  "Challenge: Dragoncoin"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="8. Numbers" focus="区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="8. Numbers" focus="假设数值会隐式扩宽，或把Double格式化结果当精确金额" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="8. Numbers" focus="数值范围表、解析结果、精度实验、格式化基线和余额边界测试" nodes={nodes} />; }
