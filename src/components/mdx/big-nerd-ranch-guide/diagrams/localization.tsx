import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "17. Localization",
  "Localizing Resources",
  "Configuration Qualifiers",
  "Testing Alternative Resources",
  "For the More Curious: More on Determining Device Size",
  "Challenge: Localizing Dates"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第17章 Localization" focus="用默认资源、限定符优先级、区域和设备配置推导资源匹配结果" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第17章 Localization" focus="用默认资源、限定符优先级、区域和设备配置推导资源匹配结果" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第17章 Localization" focus="资源匹配表、语言与区域测试、日期本地化和缺失资源检查" nodes={nodes} />; }
