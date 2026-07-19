import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-07-exceptions-assertions-logging",
  "title": "卷I 第7章 异常、断言与日志",
  "concepts": [
    "Chapter 7: Exceptions, Assertions, and Logging",
    "7.1 Dealing with Errors",
    "7.2 Catching Exceptions",
    "7.3 Tips for Using Exceptions",
    "7.4 Using Assertions",
    "7.5 Logging",
    "7.6 Debugging Tips"
  ],
  "stages": [
    "识别失败",
    "传播异常",
    "选择处理器",
    "关闭资源",
    "记录诊断"
  ],
  "focuses": [
    "checked异常",
    "try-with-resources",
    "suppressed",
    "assert",
    "Logger",
    "根因链"
  ],
  "model": {
    "studio": "异常传播与资源关闭台",
    "axisA": {
      "label": "处理位置",
      "levels": [
        "立即吞掉",
        "边界转换",
        "顶层决议"
      ]
    },
    "axisB": {
      "label": "诊断上下文",
      "levels": [
        "只有消息",
        "保留cause",
        "输入与资源状态"
      ]
    },
    "outcomes": {
      "success": "根因定位率",
      "risk": "失败遮蔽率",
      "evidence": "可重放证据"
    },
    "fault": "catch Exception 后继续运行，或关闭异常覆盖原始异常而丢失根因",
    "task": "注入读取失败与关闭失败，检查主异常、suppressed异常和日志字段是否完整",
    "invariant": "失败要么被明确恢复，要么携带根因到达责任边界",
    "probe": "exception.getSuppressed().length",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV107ExceptionsAssertionsLoggingMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV107ExceptionsAssertionsLoggingExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV107ExceptionsAssertionsLoggingEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
