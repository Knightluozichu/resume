import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-07-internationalization",
  "title": "卷II 第7章 国际化",
  "concepts": [
    "Chapter 7: Internationalization",
    "7.1 Locales",
    "7.2 Number Formats",
    "7.3 Date and Time",
    "7.4 Collation and Normalization",
    "7.5 Message Formatting",
    "7.6 Text Boundaries",
    "7.7 Text Input and Output",
    "7.8 Resource Bundles",
    "7.9 A Complete Example"
  ],
  "stages": [
    "选择Locale",
    "加载资源",
    "格式化值",
    "比较文本",
    "验证回退"
  ],
  "focuses": [
    "Locale",
    "NumberFormat",
    "Collator",
    "Normalizer",
    "MessageFormat",
    "ResourceBundle"
  ],
  "model": {
    "studio": "Locale 与文本边界对照台",
    "axisA": {
      "label": "区域环境",
      "levels": [
        "ROOT",
        "zh-CN",
        "de-DE"
      ]
    },
    "axisB": {
      "label": "文本处理",
      "levels": [
        "代码点",
        "归一化",
        "语言排序"
      ]
    },
    "outcomes": {
      "success": "本地化正确率",
      "risk": "默认区域漂移",
      "evidence": "可重放证据"
    },
    "fault": "用字符串拼接翻译消息，或用二进制顺序代替面向用户的语言排序",
    "task": "用三种Locale格式化同一数值和日期，并验证资源回退、占位与排序差异",
    "invariant": "存储语义与面向用户的区域化表示彼此分离",
    "probe": "NumberFormat.getNumberInstance(locale)",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV207InternationalizationMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV207InternationalizationExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV207InternationalizationEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
