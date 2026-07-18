import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "Python风格对象", input: "输入1：Python风格对象", mechanism: "Python风格对象通过数据模型与语言协作，而不是复制内置类型全部API", evidence: "检查返回、状态与失败路径 1", invariant: "对象表示与备选构造器把可诊断表示和输入格式分开。" },
  { label: "对象表示与备选构造器", input: "输入2：对象表示与备选构造器", mechanism: "对象表示与备选构造器把可诊断表示和输入格式分开", evidence: "检查返回、状态与失败路径 2", invariant: "classmethod与staticmethod都改变描述符绑定方式：classmethod接收类并适合多态构造器，staticmethod只是放在命名空间里的普通函数。" },
  { label: "classmetho", input: "输入3：classmethod与staticmethod", mechanism: "classmethod与staticmethod都改变描述符绑定方式：classmethod接收类并适合多态构造器，staticmethod只是放在命名空间里的普通函数", evidence: "检查返回、状态与失败路径 3", invariant: "格式化显示与可哈希对象涉及format协议、只读属性、相等与hash一致性。" },
  { label: "格式化显示与可哈希对", input: "输入4：格式化显示与可哈希对象", mechanism: "格式化显示与可哈希对象涉及format协议、只读属性、相等与hash一致性", evidence: "检查返回、状态与失败路径 4", invariant: "私有属性、slots与类属性是约定和布局工具。" },
];

export function FlpPythonicObjectModelLab() {
  return <FluentPythonOfficialLab title="Python风格对象：模型" caption="第11章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpPythonicObjectBoundaryLab() {
  return <FluentPythonOfficialLab title="Python风格对象：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpPythonicObjectEvidenceLab() {
  return <FluentPythonOfficialLab title="Python风格对象：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
