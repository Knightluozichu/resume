import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "13. Initialization",
  "Constructors",
  "Primary constructors",
  "Defining properties in a primary constructor",
  "Secondary constructors",
  "Default arguments",
  "Named arguments",
  "Initializer Blocks",
  "Property Initialization",
  "Initialization Order",
  "Delaying Initialization",
  "Late initialization",
  "Lazy initialization",
  "For the More Curious: Initialization Gotchas",
  "Challenge: The Riddle of Excalibur"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="13. Initialization" focus="比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="13. Initialization" focus="在初始化顺序中读取尚未建立的属性，或滥用lateinit推迟必填依赖" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="13. Initialization" focus="初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战" nodes={nodes} />; }
