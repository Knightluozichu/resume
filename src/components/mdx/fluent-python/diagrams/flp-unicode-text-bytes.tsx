import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "Unicode文本与", input: "输入1：Unicode文本与字节", mechanism: "Unicode文本与字节必须在系统边界分离：str是Unicode码点序列，bytes是八位值序列", evidence: "检查返回、状态与失败路径 1", invariant: "编码器、解码器与Unicode错误策略决定数据是否可逆。" },
  { label: "编码器、解码器与Un", input: "输入2：编码器、解码器与Unicode错误", mechanism: "编码器、解码器与Unicode错误策略决定数据是否可逆", evidence: "检查返回、状态与失败路径 2", invariant: "BOM与文本文件说明编码元数据可能藏在字节前缀或外部约定中。" },
  { label: "BOM与文本文件", input: "输入3：BOM与文本文件", mechanism: "BOM与文本文件说明编码元数据可能藏在字节前缀或外部约定中", evidence: "检查返回、状态与失败路径 3", invariant: "Unicode规范化把视觉等价但码点不同的文本转成可比较形式，NFC适合多数存储，casefold比lower更适合无大小写比较。" },
  { label: "Unicode规范化", input: "输入4：Unicode规范化、大小写折叠与排序", mechanism: "Unicode规范化把视觉等价但码点不同的文本转成可比较形式，NFC适合多数存储，casefold比lower更适合无大小写比较", evidence: "检查返回、状态与失败路径 4", invariant: "str与bytes双模式API常通过参数类型决定返回类型，但正则、文件路径和操作系统接口各有边界。" },
];

export function FlpUnicodeTextBytesModelLab() {
  return <FluentPythonOfficialLab title="Unicode文本与字节：模型" caption="第4章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpUnicodeTextBytesBoundaryLab() {
  return <FluentPythonOfficialLab title="Unicode文本与字节：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpUnicodeTextBytesEvidenceLab() {
  return <FluentPythonOfficialLab title="Unicode文本与字节：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
