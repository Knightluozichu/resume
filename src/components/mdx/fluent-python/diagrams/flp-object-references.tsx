import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "对象引用、可变性与回", input: "输入1：对象引用、可变性与回收", mechanism: "对象引用、可变性与回收的起点是变量不是盒子，而是绑定到对象的名字", evidence: "检查返回、状态与失败路径 1", invariant: "身份、相等性与别名要分层判断：is比较是否同一对象，双等号委托值相等协议。" },
  { label: "身份、相等性与别名", input: "输入2：身份、相等性与别名", mechanism: "身份、相等性与别名要分层判断：is比较是否同一对象，双等号委托值相等协议", evidence: "检查返回、状态与失败路径 2", invariant: "浅复制只复制最外层容器，内部元素仍共享；深复制递归复制对象图并用memo处理循环。" },
  { label: "浅复制与深复制", input: "输入3：浅复制与深复制", mechanism: "浅复制只复制最外层容器，内部元素仍共享；深复制递归复制对象图并用memo处理循环", evidence: "检查返回、状态与失败路径 3", invariant: "可变参数默认值在函数定义时只创建一次，导致多次调用和多个实例共享状态。" },
  { label: "可变参数默认值", input: "输入4：可变参数默认值", mechanism: "可变参数默认值在函数定义时只创建一次，导致多次调用和多个实例共享状态", evidence: "检查返回、状态与失败路径 4", invariant: "del与垃圾回收针对引用而非对象；引用计数归零或循环垃圾被探测后对象才可能回收。" },
];

export function FlpObjectReferencesModelLab() {
  return <FluentPythonOfficialLab title="对象引用、可变性与回收：模型" caption="第6章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpObjectReferencesBoundaryLab() {
  return <FluentPythonOfficialLab title="对象引用、可变性与回收：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpObjectReferencesEvidenceLab() {
  return <FluentPythonOfficialLab title="对象引用、可变性与回收：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
