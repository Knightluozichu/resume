import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "2. Android and Model-View-Controller",
  "Creating a New Class",
  "Model-View-Controller and Android",
  "Updating the View Layer",
  "Updating the Controller Layer",
  "Adding an Icon",
  "Screen Pixel Densities",
  "Running on a Device",
  "Challenge: Add a Listener to the TextView",
  "Challenge: Add a Previous Button",
  "Challenge: From Button to ImageButton"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第2章 Android and Model-View-Controller" focus="把模型事实、界面渲染和Activity控制流分开，并用资源限定符适配密度" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第2章 Android and Model-View-Controller" focus="把模型事实、界面渲染和Activity控制流分开，并用资源限定符适配密度" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第2章 Android and Model-View-Controller" focus="MVC依赖图、按钮与TextView交互测试、密度资源核对表" nodes={nodes} />; }
