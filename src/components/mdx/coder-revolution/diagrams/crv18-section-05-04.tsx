import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-05-04",
  title: "5.4 编程语言的“爱恨情仇”",
  family: "language",
  nodes: ["固定任务", "声明版本", "实现同例", "测量运行", "记录维护"],
  concepts: [
    "5.4 编程语言的“爱恨情仇”",
    "让人怀疑的C 语言",
    "被忘却的 VB & Visual FoxPro",
    "蹂躏我的C",
    "赖以谋生的Java",
    "优雅的Ruby",
  ],
  mechanism:
    "C、VB、C++、Java 与 Ruby 在类型检查、内存管理、运行时、抽象机制和生态上各有取舍，结论必须绑定任务与时代版本",
  success: "5.4 编程语言的“爱恨情仇” 的输入、机制、输出与复位轨迹一致",
  failure:
    "5.4 编程语言的“爱恨情仇” 在“把个人经历中的版本和工具缺陷外推成语言永恒本质”处拒绝",
} as const;

export function Crv18Section0504Lab() {
  return <CoderMechanismLab {...profile} />;
}
