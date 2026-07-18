import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "异步编程", input: "输入1：异步编程", mechanism: "异步编程用单线程事件循环管理大量等待中的I/O任务", evidence: "检查返回、状态与失败路径 1", invariant: "可等待对象与原生协程包括coroutine、Task和Future。" },
  { label: "可等待对象与原生协程", input: "输入2：可等待对象与原生协程", mechanism: "可等待对象与原生协程包括coroutine、Task和Future", evidence: "检查返回、状态与失败路径 2", invariant: "asyncio、HTTPX与信号量组合并发HTTP请求时，信号量限制在途数量，客户端应复用连接并设置超时。" },
  { label: "asyncio、HT", input: "输入3：asyncio、HTTPX与信号量", mechanism: "asyncio、HTTPX与信号量组合并发HTTP请求时，信号量限制在途数量，客户端应复用连接并设置超时", evidence: "检查返回、状态与失败路径 3", invariant: "异步上下文管理器、迭代器与生成器分别表达异步获取清理和逐步拉取。" },
  { label: "异步上下文管理器、迭", input: "输入4：异步上下文管理器、迭代器与生成器", mechanism: "异步上下文管理器、迭代器与生成器分别表达异步获取清理和逐步拉取", evidence: "检查返回、状态与失败路径 4", invariant: "asyncio服务器与阻塞调用的边界最关键：文件、DNS、旧库或CPU工作可能阻塞循环，应使用原生异步API或to_thread，并通过取消、超时和背压关闭任务树。" },
];

export function FlpAsyncProgrammingModelLab() {
  return <FluentPythonOfficialLab title="异步编程：模型" caption="第21章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpAsyncProgrammingBoundaryLab() {
  return <FluentPythonOfficialLab title="异步编程：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpAsyncProgrammingEvidenceLab() {
  return <FluentPythonOfficialLab title="异步编程：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
