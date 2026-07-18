import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "3. The Activity Lifecycle",
  "Rotating GeoQuiz",
  "Activity States and Lifecycle Callbacks",
  "Logging the Activity Lifecycle",
  "Exploring How the Activity Lifecycle Responds to User Actions",
  "Device Configuration Changes and the Activity Lifecycle",
  "For the More Curious: UI Updates and Multi-Window Mode",
  "For the More Curious: Log Levels",
  "Challenge: Preventing Repeat Answers",
  "Challenge: Graded Quiz"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第3章 The Activity Lifecycle" focus="用回调日志解释离开、结束、旋转、多窗口与配置变化，而不是把Activity视为常驻对象" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第3章 The Activity Lifecycle" focus="用回调日志解释离开、结束、旋转、多窗口与配置变化，而不是把Activity视为常驻对象" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第3章 The Activity Lifecycle" focus="生命周期轨迹、横竖屏差异、重复回答与计分恢复测试" nodes={nodes} />; }
