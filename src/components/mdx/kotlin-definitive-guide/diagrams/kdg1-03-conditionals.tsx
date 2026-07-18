import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "3. Conditionals",
  "if/else Statements",
  "Adding more conditions",
  "Nested if/else statements",
  "More elegant conditionals",
  "Logical operators",
  "Conditional expressions",
  "Removing braces from if/else expressions",
  "Ranges",
  "when Expressions",
  "String Templates",
  "Challenge: Trying Out Some Ranges",
  "Challenge: Enhancing the Aura",
  "Challenge: Configurable Status Format"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="3. Conditionals" focus="把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="3. Conditionals" focus="分支重叠、边界遗漏或依赖不可见副作用" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="3. Conditionals" focus="输入分区、分支表、边界测试、穷尽性检查和格式化输出" nodes={nodes} />; }
