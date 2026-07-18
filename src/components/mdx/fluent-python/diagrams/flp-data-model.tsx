import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "Python数据模型", input: "输入1：Python数据模型", mechanism: "Python数据模型是一组由解释器调用的协议", evidence: "检查返回、状态与失败路径 1", invariant: "Python风格纸牌只实现len与getitem就得到长度、索引、切片、迭代和随机抽取能力，因为解释器会沿序列协议提供回退行为。" },
  { label: "特殊方法", input: "输入2：特殊方法", mechanism: "Python风格纸牌只实现len与getitem就得到长度、索引、切片、迭代和随机抽取能力，因为解释器会沿序列协议提供回退行为", evidence: "检查返回、状态与失败路径 2", invariant: "数值类型通过repr、abs、bool、add与mul表达表示、模长、真值和运算。" },
  { label: "Python风格纸牌", input: "输入3：Python风格纸牌", mechanism: "数值类型通过repr、abs、bool、add与mul表达表示、模长、真值和运算", evidence: "检查返回、状态与失败路径 3", invariant: "字符串表示要区分给开发者诊断的repr和给最终用户的str；布尔值优先调用bool，缺失时再依据len。" },
  { label: "数值类型、字符串表示", input: "输入4：数值类型、字符串表示与布尔值", mechanism: "字符串表示要区分给开发者诊断的repr和给最终用户的str；布尔值优先调用bool，缺失时再依据len", evidence: "检查返回、状态与失败路径 4", invariant: "为何len不是方法的答案同时涉及一致接口和实现效率：内置类型可以由CPython直接读取结构体长度，自定义类型则经len协议校验返回值。" },
];

export function FlpDataModelModelLab() {
  return <FluentPythonOfficialLab title="Python数据模型：模型" caption="第1章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDataModelBoundaryLab() {
  return <FluentPythonOfficialLab title="Python数据模型：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDataModelEvidenceLab() {
  return <FluentPythonOfficialLab title="Python数据模型：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
