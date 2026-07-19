import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-part-3-reactive-spring",
  "title": "Part 3 响应式Spring",
  "concepts": [
    "Part 3. Reactive Spring",
    "Part 3 响应式Spring：受控失败边界",
    "Part 3 响应式Spring：恢复与发布证据"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "背压与取消路径台",
    "boundary": "publisher → operators → subscriber → resource",
    "axisA": {
      "label": "需求信号",
      "levels": [
        "零",
        "有限",
        "持续"
      ]
    },
    "axisB": {
      "label": "终止方式",
      "levels": [
        "完成",
        "错误",
        "取消"
      ]
    },
    "fault": "把异步包装误当非阻塞，阻塞调用占满事件循环",
    "invariant": "需求量受控传播，错误与取消都会释放连接和订阅资源",
    "signal": "request(n)、线程名与取消清理",
    "practiceMode": "design",
    "metric": "背压与取消路径台合同命中率",
    "risk": "终止方式暴露风险",
    "task": "从Reactive Streams需求信号出发，贯通Reactor、WebFlux、响应式数据与RSocket；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "信号时序图、阻塞探针、背压实验与端到端资源预算"
  }
} as const;

export function Sia6Part3ReactiveSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6Part3ReactiveSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6Part3ReactiveSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
