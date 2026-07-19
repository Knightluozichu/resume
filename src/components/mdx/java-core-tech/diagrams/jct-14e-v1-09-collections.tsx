import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-09-collections",
  "title": "卷I 第9章 集合",
  "concepts": [
    "Chapter 9: Collections",
    "9.1 The Java Collections Framework",
    "9.2 Interfaces in the Collections Framework",
    "9.3 Concrete Collections",
    "9.4 Maps",
    "9.5 Copies and Views",
    "9.6 Algorithms",
    "9.7 Legacy Collections"
  ],
  "stages": [
    "声明操作",
    "选择接口",
    "选择实现",
    "执行算法",
    "验证视图"
  ],
  "focuses": [
    "List",
    "Set",
    "Map",
    "迭代器",
    "视图",
    "复杂度"
  ],
  "model": {
    "studio": "集合结构选择器",
    "axisA": {
      "label": "主要访问模式",
      "levels": [
        "顺序遍历",
        "成员查询",
        "键值聚合"
      ]
    },
    "axisB": {
      "label": "数据语义",
      "levels": [
        "允许重复",
        "保持唯一",
        "保持排序"
      ]
    },
    "outcomes": {
      "success": "操作匹配度",
      "risk": "语义错配成本",
      "evidence": "可重放证据"
    },
    "fault": "在遍历期间结构性修改集合，或把受支持的视图误当成独立副本",
    "task": "为同一数据分别选择List、Set和Map，测量操作并解释哪种语义改变了结果",
    "invariant": "实现选择必须守住接口语义与所需复杂度",
    "probe": "map.merge(key, 1, Integer::sum)",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV109CollectionsMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV109CollectionsExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV109CollectionsEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
