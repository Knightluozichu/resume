import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "附录 Tiger语言参考手册",
  label: "附录 Tiger语言参考手册",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结词法合同",
    "列出声明作用域",
    "定义变量寻址",
    "规定表达式类型",
    "核对标准库ABI",
    "生成语言一致性测试",
  ],
  concepts: [
    "附录 Tiger语言参考手册",
    "A.1 词法问题",
    "A.2 声明",
    "A.3 变量和表达式",
    "A.4 标准库",
  ],
} as const;

export function TbcAppendixTigerLanguageReferenceMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function TbcAppendixTigerLanguageReferenceExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function TbcAppendixTigerLanguageReferenceEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
