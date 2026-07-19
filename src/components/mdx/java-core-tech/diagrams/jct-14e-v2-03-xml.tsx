import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-03-xml",
  "title": "卷II 第3章 XML",
  "concepts": [
    "Chapter 3: XML",
    "3.1 Introducing XML",
    "3.2 The Structure of an XML Document",
    "3.3 Parsing an XML Document",
    "3.4 Validating XML Documents",
    "3.5 Locating Information with XPath",
    "3.6 Using Namespaces",
    "3.7 Streaming Parsers",
    "3.8 Generating XML Documents",
    "3.9 XSL Transformations"
  ],
  "stages": [
    "读取文档",
    "解析结构",
    "验证模式",
    "查询转换",
    "安全输出"
  ],
  "focuses": [
    "well-formed",
    "DOM",
    "Schema",
    "XPath",
    "Namespace",
    "StAX"
  ],
  "model": {
    "studio": "XML 解析策略与攻击面台",
    "axisA": {
      "label": "解析模型",
      "levels": [
        "DOM整树",
        "SAX事件",
        "StAX拉取"
      ]
    },
    "axisB": {
      "label": "信任边界",
      "levels": [
        "默认工厂",
        "禁用外部实体",
        "验证加资源限额"
      ]
    },
    "outcomes": {
      "success": "结构提取率",
      "risk": "实体与内存风险",
      "evidence": "可重放证据"
    },
    "fault": "允许外部实体或在巨大文档上构建DOM，导致XXE、资源泄露或内存耗尽",
    "task": "对同一XML切换解析器并注入DOCTYPE，验证拒绝位置、命名空间与输出",
    "invariant": "不可信输入不能读取未授权外部资源",
    "probe": "factory.setExpandEntityReferences(false)",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV203XmlMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV203XmlExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV203XmlEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
