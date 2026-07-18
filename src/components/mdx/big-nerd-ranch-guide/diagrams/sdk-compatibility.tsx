import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "7. Android SDK Versions and Compatibility",
  "Android SDK Versions",
  "Compatibility and Android Programming",
  "Using the Android Developer Documentation",
  "Challenge: Reporting the Device's Android Version",
  "Challenge: Limited Cheats"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第7章 Android SDK Versions and Compatibility" focus="解释minSdk、targetSdk、compileSdk和运行时API检查各自约束，安全使用新API" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第7章 Android SDK Versions and Compatibility" focus="解释minSdk、targetSdk、compileSdk和运行时API检查各自约束，安全使用新API" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第7章 Android SDK Versions and Compatibility" focus="SDK矩阵、文档证据、旧设备降级测试与版本报告" nodes={nodes} />; }
