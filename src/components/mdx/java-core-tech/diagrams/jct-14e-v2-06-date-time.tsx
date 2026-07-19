import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-06-date-time",
  "title": "卷II 第6章 日期与时间 API",
  "concepts": [
    "Chapter 6: The Date and Time API",
    "6.1 The Time Line",
    "6.2 Local Dates",
    "6.3 Date Adjusters",
    "6.4 Local Time",
    "6.5 Zoned Time",
    "6.6 Formatting and Parsing",
    "6.7 Interoperating with Legacy Code"
  ],
  "stages": [
    "选择时间线",
    "声明时区",
    "执行运算",
    "格式解析",
    "迁移旧值"
  ],
  "focuses": [
    "Instant",
    "LocalDate",
    "TemporalAdjuster",
    "ZoneId",
    "DST",
    "DateTimeFormatter"
  ],
  "model": {
    "studio": "时间语义与 DST 推演台",
    "axisA": {
      "label": "时间类型",
      "levels": [
        "LocalDateTime",
        "Instant",
        "ZonedDateTime"
      ]
    },
    "axisB": {
      "label": "时区策略",
      "levels": [
        "系统默认",
        "固定偏移",
        "命名ZoneId"
      ]
    },
    "outcomes": {
      "success": "时刻还原率",
      "risk": "DST歧义风险",
      "evidence": "可重放证据"
    },
    "fault": "把本地日期时间当成全球时刻，或依赖系统默认时区导致部署后语义漂移",
    "task": "选择一个DST跳变区域，构造缺失与重复本地时间并解释解析决议",
    "invariant": "业务概念是日期、墙钟时间还是时间线时刻必须先声明",
    "probe": "local.atZone(ZoneId.of(zone))",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV206DateTimeMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV206DateTimeExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV206DateTimeEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
