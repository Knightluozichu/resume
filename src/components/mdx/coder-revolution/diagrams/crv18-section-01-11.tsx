import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-11",
  title: "1.11 一个翻译家族的发家史",
  family: "language",
  nodes: ["高级源码", "编译目标", "汇编机器码", "链接符号", "装载执行"],
  concepts: ["1.11 一个翻译家族的发家史", "机器语言", "汇编语言", "高级语言"],
  mechanism:
    "编译器把高级语言翻译为汇编或目标代码，汇编器生成机器指令，链接器解析符号，加载器建立运行映像",
  success: "1.11 一个翻译家族的发家史 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.11 一个翻译家族的发家史 在“把编译成功当成符号已链接且程序必能装载，忽略外部库和运行时环境”处拒绝",
} as const;

export function Crv18Section0111Lab() {
  return <CoderMechanismLab {...profile} />;
}
