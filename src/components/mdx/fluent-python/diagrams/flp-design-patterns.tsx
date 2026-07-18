import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "使用一等函数实现设计", input: "输入1：使用一等函数实现设计模式", mechanism: "使用一等函数实现设计模式的目标不是消灭类，而是识别只有一个行为方法、没有共享状态的对象是否可简化为函数", evidence: "检查返回、状态与失败路径 1", invariant: "经典Strategy与函数式Strategy都把促销算法从Order分离。" },
  { label: "经典Strategy", input: "输入2：经典Strategy与函数式Strategy", mechanism: "经典Strategy与函数式Strategy都把促销算法从Order分离", evidence: "检查返回、状态与失败路径 2", invariant: "选择与注册策略可以用显式列表、命名约定或装饰器。" },
  { label: "选择与注册策略", input: "输入3：选择与注册策略", mechanism: "选择与注册策略可以用显式列表、命名约定或装饰器", evidence: "检查返回、状态与失败路径 3", invariant: "装饰器增强Strategy让函数注册与声明靠近，却不应把折扣规则藏进全局状态。" },
  { label: "装饰器增强Strat", input: "输入4：装饰器增强Strategy", mechanism: "装饰器增强Strategy让函数注册与声明靠近，却不应把折扣规则藏进全局状态", evidence: "检查返回、状态与失败路径 4", invariant: "Command模式把动作封装为可排队、撤销或记录的对象；若只需execute，可直接保存调用对象。" },
];

export function FlpDesignPatternsModelLab() {
  return <FluentPythonOfficialLab title="使用一等函数实现设计模式：模型" caption="第10章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDesignPatternsBoundaryLab() {
  return <FluentPythonOfficialLab title="使用一等函数实现设计模式：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDesignPatternsEvidenceLab() {
  return <FluentPythonOfficialLab title="使用一等函数实现设计模式：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
