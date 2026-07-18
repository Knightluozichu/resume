import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "with、match", input: "输入1：with、match与else块", mechanism: "with、match与else块把建立清理、结构分派和成功路径写进控制流语法", evidence: "检查返回、状态与失败路径 1", invariant: "上下文管理器与contextlib让enter获取资源、exit总能清理。" },
  { label: "上下文管理器与con", input: "输入2：上下文管理器与contextlib", mechanism: "上下文管理器与contextlib让enter获取资源、exit总能清理", evidence: "检查返回、状态与失败路径 2", invariant: "lis.py中的模式匹配展示如何把Scheme表达式按结构分解：原子、quote、if、lambda与函数调用可由不同case表达。" },
  { label: "lis.py中的模式", input: "输入3：lis.py中的模式匹配", mechanism: "lis.py中的模式匹配展示如何把Scheme表达式按结构分解：原子、quote、if、lambda与函数调用可由不同case表达", evidence: "检查返回、状态与失败路径 3", invariant: "OR模式要求每个分支绑定同一组变量，可合并共享处理逻辑；守卫只在结构匹配后求值。" },
  { label: "OR模式", input: "输入4：OR模式", mechanism: "OR模式要求每个分支绑定同一组变量，可合并共享处理逻辑；守卫只在结构匹配后求值", evidence: "检查返回、状态与失败路径 4", invariant: "if之外的else块出现在for、while和try。" },
];

export function FlpWithMatchElseModelLab() {
  return <FluentPythonOfficialLab title="with、match与else块：模型" caption="第18章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpWithMatchElseBoundaryLab() {
  return <FluentPythonOfficialLab title="with、match与else块：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpWithMatchElseEvidenceLab() {
  return <FluentPythonOfficialLab title="with、match与else块：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
