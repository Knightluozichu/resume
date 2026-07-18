import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "16. Taking Pictures with Intents",
  "A Place for Your Photo",
  "File Storage",
  "Using a Camera Intent",
  "Scaling and Displaying Bitmaps",
  "Declaring Features",
  "Challenge: Detail Display",
  "Challenge: Efficient Thumbnail Load"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第16章 Taking Pictures with Intents" focus="通过FileProvider授予最小URI权限，控制照片位置、相机Intent、位图缩放与设备能力" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第16章 Taking Pictures with Intents" focus="通过FileProvider授予最小URI权限，控制照片位置、相机Intent、位图缩放与设备能力" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第16章 Taking Pictures with Intents" focus="照片文件合同、相机降级、缩略图内存测试和配置声明" nodes={nodes} />; }
