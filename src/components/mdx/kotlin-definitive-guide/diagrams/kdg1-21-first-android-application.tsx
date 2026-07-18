import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "21. Building Your First Android Application with Kotlin",
  "Android Studio",
  "Gradle configuration",
  "Project organization",
  "Defining a UI",
  "Running the App on an Emulator",
  "Generating a Character",
  "The Activity Class",
  "Wiring Up Views",
  "Kotlin Android Extensions Synthetic Properties",
  "Setting a Click Listener",
  "Saved Instance State",
  "Reading from the saved instance state",
  "Refactoring to an Extension",
  "For the More Curious: Android KTX and Anko Libraries"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="21. Building Your First Android Application with Kotlin" focus="按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="21. Building Your First Android Application with Kotlin" focus="把已废弃的Kotlin Android Extensions写成今天仍推荐的方案" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="21. Building Your First Android Application with Kotlin" focus="Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表" nodes={nodes} />; }
