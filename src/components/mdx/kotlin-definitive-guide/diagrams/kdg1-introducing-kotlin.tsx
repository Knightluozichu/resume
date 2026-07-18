import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "Introducing Kotlin",
  "Why Kotlin?",
  "Who Is This Book For?",
  "How to Use This Book",
  "For the More Curious",
  "Challenges",
  "Typographical conventions",
  "Using an eBook",
  "Looking Forward"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="Introducing Kotlin" focus="明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="Introducing Kotlin" focus="把当前Kotlin或Android惯例倒灌进2018年原书" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="Introducing Kotlin" focus="版本指纹、目标平台说明、最小程序、学习顺序与迁移边界" nodes={nodes} />; }
