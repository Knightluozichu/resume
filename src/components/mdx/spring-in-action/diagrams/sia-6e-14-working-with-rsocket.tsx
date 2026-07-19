import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-14-working-with-rsocket",
  "title": "第14章 使用RSocket",
  "concepts": [
    "14 Working with RSocket",
    "14.1 Introducing RSocket",
    "14.2 Creating a simple RSocket server and client",
    "14.2.1 Working with request-response",
    "14.2.2 Handling request-stream messaging",
    "14.2.3 Sending fire-and-forget messages",
    "14.2.4 Sending messages bidirectionally",
    "14.3 Transporting RSocket over WebSocket",
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
    "studio": "RSocket交互模型台",
    "boundary": "route + metadata → requester/responder → frame stream",
    "axisA": {
      "label": "交互模型",
      "levels": [
        "request-response",
        "request-stream",
        "channel"
      ]
    },
    "axisB": {
      "label": "传输状态",
      "levels": [
        "TCP",
        "WebSocket",
        "断线恢复"
      ]
    },
    "fault": "把request-stream当普通响应，忽略需求和断线后的重复订阅",
    "invariant": "路由、metadata、基数、需求和终止信号与所选交互模型一致",
    "signal": "frame方向、request(n)与终止原因",
    "practiceMode": "code",
    "metric": "RSocket交互模型台合同命中率",
    "risk": "传输状态暴露风险",
    "task": "按交互模型选择request-response、request-stream、fire-and-forget或channel，并验证背压和连接生命周期；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "交互模型决策表、帧时序图、断线重连实验和RSocketRequester合同测试"
  }
} as const;

export function Sia614WorkingWithRsocketMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia614WorkingWithRsocketExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia614WorkingWithRsocketEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
