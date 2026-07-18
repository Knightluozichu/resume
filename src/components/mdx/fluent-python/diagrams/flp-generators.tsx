import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "迭代器、生成器与经典", input: "输入1：迭代器、生成器与经典协程", mechanism: "迭代器、生成器与经典协程都把执行拆成暂停和恢复，但协议用途不同", evidence: "检查返回、状态与失败路径 1", invariant: "可迭代对象与迭代器不能混为一谈：iterable能返回新iterator，iterator自身实现next且通常只能消费一次。" },
  { label: "可迭代对象与迭代器", input: "输入2：可迭代对象与迭代器", mechanism: "可迭代对象与迭代器不能混为一谈：iterable能返回新iterator，iterator自身实现next且通常只能消费一次", evidence: "检查返回、状态与失败路径 2", invariant: "生成器函数与惰性求值让函数调用先返回生成器对象，直到next才执行函数体。" },
  { label: "生成器函数与惰性求值", input: "输入3：生成器函数与惰性求值", mechanism: "生成器函数与惰性求值让函数调用先返回生成器对象，直到next才执行函数体", evidence: "检查返回、状态与失败路径 3", invariant: "itertools与yield from提供组合、筛选、分组和子生成器委托。" },
  { label: "itertools与", input: "输入4：itertools与yield from", mechanism: "itertools与yield from提供组合、筛选、分组和子生成器委托", evidence: "检查返回、状态与失败路径 4", invariant: "经典协程返回值藏在StopIteration.value中，yield from可接收它。" },
];

export function FlpGeneratorsModelLab() {
  return <FluentPythonOfficialLab title="迭代器、生成器与经典协程：模型" caption="第17章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpGeneratorsBoundaryLab() {
  return <FluentPythonOfficialLab title="迭代器、生成器与经典协程：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpGeneratorsEvidenceLab() {
  return <FluentPythonOfficialLab title="迭代器、生成器与经典协程：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
