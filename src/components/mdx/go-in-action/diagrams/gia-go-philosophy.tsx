import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "开发速度", input: "大型依赖图与团队协作", mechanism: "小语言、快速编译、统一工具", evidence: "短反馈循环", invariant: "简单语法不掩盖包与错误边界。" },
  { label: "并发", input: "独立网络任务", mechanism: "goroutine、scheduler与channel", evidence: "低成本并发", invariant: "并发不自动等于并行或无竞态。" },
  { label: "类型系统", input: "具体类型与行为", mechanism: "静态类型、方法、隐式接口实现", evidence: "组合式多态", invariant: "接口由使用方需要的最小行为定义。" },
  { label: "内存管理", input: "栈、堆与引用", mechanism: "逃逸分析和垃圾回收", evidence: "自动回收", invariant: "GC不管理文件、goroutine和业务生命周期。" },
];
export function GiaChallengeLab(){return <GoActionOfficialLab title="现代编程挑战" caption="开发速度、并发、类型与内存管理共同解释Go的设计。" cases={cases}/>;}
export function GiaRuntimeLab(){return <GoActionOfficialLab title="语言与运行时" caption="切换四项设计，观察编译器与运行时分别承担什么。" cases={cases} tone="violet" initial={1}/>;}
export function GiaHelloLab(){return <GoActionOfficialLab title="Hello与Playground门禁" caption="最小程序也要记录package、入口、输出和受限执行环境。" cases={cases} tone="emerald" initial={3}/>;}
