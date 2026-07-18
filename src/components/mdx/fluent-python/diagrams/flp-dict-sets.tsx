import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "字典与集合", input: "输入1：字典与集合", mechanism: "字典与集合都建立在哈希表上", evidence: "检查返回、状态与失败路径 1", invariant: "字典推导、双星号解包与合并运算符把转换、复制和覆盖规则写成表达式；映射模式匹配只要求目标含有指定键，多余键不会阻止匹配，并可用双星号捕获其余字段。" },
  { label: "字典推导、解包、合并", input: "输入2：字典推导、解包、合并与模式匹配", mechanism: "字典推导、双星号解包与合并运算符把转换、复制和覆盖规则写成表达式；映射模式匹配只要求目标含有指定键，多余键不会阻止匹配，并可用双星号捕获其余字段", evidence: "检查返回、状态与失败路径 2", invariant: "缺失键应按语义选择get、setdefault、defaultdict或自定义missing。" },
  { label: "可哈希对象与缺失键", input: "输入3：可哈希对象与缺失键", mechanism: "缺失键应按语义选择get、setdefault、defaultdict或自定义missing", evidence: "检查返回、状态与失败路径 3", invariant: "映射变体包括ChainMap、Counter、UserDict和只读MappingProxyType。" },
  { label: "映射变体与字典视图", input: "输入4：映射变体与字典视图", mechanism: "映射变体包括ChainMap、Counter、UserDict和只读MappingProxyType", evidence: "检查返回、状态与失败路径 4", invariant: "集合操作与字典视图操作适合表达去重、成员判断、交并差和键集合比较。" },
];

export function FlpDictSetsModelLab() {
  return <FluentPythonOfficialLab title="字典与集合：模型" caption="第3章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDictSetsBoundaryLab() {
  return <FluentPythonOfficialLab title="字典与集合：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDictSetsEvidenceLab() {
  return <FluentPythonOfficialLab title="字典与集合：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
