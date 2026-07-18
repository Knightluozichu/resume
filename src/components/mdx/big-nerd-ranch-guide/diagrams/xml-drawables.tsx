import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "22. XML Drawables",
  "Making Uniform Buttons",
  "Shape Drawables",
  "State List Drawables",
  "Layer List Drawables",
  "For the More Curious: Why Bother with XML Drawables?",
  "For the More Curious: Mipmap Images",
  "For the More Curious: 9-Patch Images",
  "Challenge: Button Themes"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第22章 XML Drawables" focus="组合shape、selector和layer-list表达状态化视觉，并比较mipmap与9-patch的用途" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第22章 XML Drawables" focus="组合shape、selector和layer-list表达状态化视觉，并比较mipmap与9-patch的用途" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第22章 XML Drawables" focus="统一按钮、状态矩阵、图层顺序、密度与拉伸测试" nodes={nodes} />; }
