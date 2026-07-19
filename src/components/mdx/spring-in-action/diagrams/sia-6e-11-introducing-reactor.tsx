import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-11-introducing-reactor",
  "title": "第11章 Reactor入门",
  "concepts": [
    "11 Introducing Reactor",
    "11.1 Understanding reactive programming",
    "11.1.1 Defining Reactive Streams",
    "11.2 Getting started with Reactor",
    "11.2.1 Diagramming reactive flows",
    "11.2.2 Adding Reactor dependencies",
    "11.3 Applying common reactive operations",
    "11.3.1 Creating reactive types",
    "11.3.2 Combining reactive types",
    "11.3.3 Transforming and filtering reactive streams",
    "11.3.4 Performing logic operations on reactive types",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "Flux/Mono运算符台",
    "boundary": "source → transform → demand → terminal signal",
    "axisA": {
      "label": "序列类型",
      "levels": [
        "Mono",
        "Flux",
        "空序列"
      ]
    },
    "axisB": {
      "label": "需求窗口",
      "levels": [
        "逐个",
        "小批",
        "无界"
      ]
    },
    "fault": "在map中阻塞或忽略订阅需求，造成事件循环饥饿和内存积压",
    "invariant": "0..1与0..N基数语义正确，需求、错误和取消沿链路传播",
    "signal": "StepVerifier事件序列与线程",
    "practiceMode": "code",
    "metric": "Flux/Mono运算符台合同命中率",
    "risk": "需求窗口暴露风险",
    "task": "用Publisher、Subscriber、Subscription和demand解释Mono/Flux的惰性、操作符、错误与取消；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "信号图、操作符选择表、StepVerifier测试和调度器边界记录"
  }
} as const;

export function Sia611IntroducingReactorMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia611IntroducingReactorExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia611IntroducingReactorEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
