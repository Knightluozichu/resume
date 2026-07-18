import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "运算符重载", input: "输入1：运算符重载", mechanism: "运算符重载让领域对象参与Python表达式，但应保持操作数语义和返回类型可预测", evidence: "检查返回、状态与失败路径 1", invariant: "一元运算符plus、minus和abs通常返回新对象，plus可用于触发数值上下文转换。" },
  { label: "一元运算符", input: "输入2：一元运算符", mechanism: "一元运算符plus、minus和abs通常返回新对象，plus可用于触发数值上下文转换", evidence: "检查返回、状态与失败路径 2", invariant: "加法、标量乘法与矩阵乘法要分别验证维度和操作数能力。" },
  { label: "加法、标量乘法与矩阵", input: "输入3：加法、标量乘法与矩阵乘法", mechanism: "加法、标量乘法与矩阵乘法要分别验证维度和操作数能力", evidence: "检查返回、状态与失败路径 3", invariant: "反向运算符与富比较形成双分派链：左方法返回NotImplemented后才尝试右方法。" },
  { label: "反向运算符与富比较", input: "输入4：反向运算符与富比较", mechanism: "反向运算符与富比较形成双分派链：左方法返回NotImplemented后才尝试右方法", evidence: "检查返回、状态与失败路径 4", invariant: "增量赋值运算符若未实现iadd会退回add再绑定；可变对象可实现原地更新。" },
];

export function FlpOperatorOverloadingModelLab() {
  return <FluentPythonOfficialLab title="运算符重载：模型" caption="第16章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpOperatorOverloadingBoundaryLab() {
  return <FluentPythonOfficialLab title="运算符重载：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpOperatorOverloadingEvidenceLab() {
  return <FluentPythonOfficialLab title="运算符重载：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
