import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-04-networking",
  "title": "卷II 第4章 网络",
  "concepts": [
    "Chapter 4: Networking",
    "4.1 Connecting to a Server",
    "4.2 Implementing Servers",
    "4.3 Getting Web Data",
    "4.4 The HTTP Client",
    "4.5 The Simple HTTP Server",
    "4.6 Sending E-Mail"
  ],
  "stages": [
    "解析地址",
    "建立连接",
    "交换协议",
    "处理超时",
    "关闭会话"
  ],
  "focuses": [
    "Socket",
    "ServerSocket",
    "URI",
    "HttpClient",
    "超时",
    "SMTP边界"
  ],
  "model": {
    "studio": "网络请求状态机",
    "axisA": {
      "label": "连接方式",
      "levels": [
        "原始Socket",
        "HTTP Client",
        "本地HTTP Server"
      ]
    },
    "axisB": {
      "label": "失败预算",
      "levels": [
        "无限等待",
        "连接超时",
        "端到端截止时间"
      ]
    },
    "outcomes": {
      "success": "协议完成率",
      "risk": "挂起与重试风险",
      "evidence": "可重放证据"
    },
    "fault": "没有超时地等待远端，或对非幂等请求自动重试造成重复副作用",
    "task": "注入DNS失败、连接拒绝与慢响应，区分错误阶段并验证关闭与重试决议",
    "invariant": "每个请求都有截止时间、响应上限与明确关闭责任",
    "probe": "HttpRequest.newBuilder(uri).timeout(timeout)",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV204NetworkingMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV204NetworkingExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV204NetworkingEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
