import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "15. Implicit Intents",
  "Adding Buttons",
  "Adding a Suspect to the Model Layer",
  "Using a Format String",
  "Using Implicit Intents",
  "Challenge: Another Implicit Intent"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第15章 Implicit Intents" focus="把action、data、type、category和响应者检查组成跨应用能力请求，按最小授权处理联系人" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第15章 Implicit Intents" focus="把action、data、type、category和响应者检查组成跨应用能力请求，按最小授权处理联系人" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第15章 Implicit Intents" focus="犯罪报告、联系人选择、chooser、无响应者降级和权限测试" nodes={nodes} />; }
