import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-01-streams",
  "title": "卷II 第1章 Stream",
  "concepts": [
    "Chapter 1: Streams",
    "1.1 From Iterating to Stream Operations",
    "1.2 Stream Creation",
    "1.3 The filter, map, and flatMap Methods",
    "1.4 Extracting Substreams and Combining Streams",
    "1.5 Other Stream Transformations",
    "1.6 Simple Reductions",
    "1.7 The Optional Type",
    "1.8 Collecting Results",
    "1.9 Collectors",
    "1.10 Reduction Operations",
    "1.11 Gatherers",
    "1.12 Primitive Type Streams",
    "1.13 Parallel Streams"
  ],
  "stages": [
    "创建来源",
    "组合变换",
    "触发终止",
    "归约收集",
    "验证并行"
  ],
  "focuses": [
    "惰性求值",
    "filter/map",
    "Optional",
    "Collector",
    "Gatherer",
    "并行归约"
  ],
  "model": {
    "studio": "Stream 管线求值追踪台",
    "axisA": {
      "label": "执行方式",
      "levels": [
        "外部迭代",
        "顺序Stream",
        "并行Stream"
      ]
    },
    "axisB": {
      "label": "归约合同",
      "levels": [
        "有副作用",
        "结合但有序",
        "结合且无状态"
      ]
    },
    "outcomes": {
      "success": "管线等价率",
      "risk": "副作用竞态风险",
      "evidence": "可重放证据"
    },
    "fault": "在并行管线写共享可变容器，或对非结合运算使用reduce",
    "task": "把循环改为Stream后比较顺序与并行结果，并用反例检查结合律和遇见顺序",
    "invariant": "同一输入在声明的顺序合同下得到同一结果",
    "probe": "stream.peek(trace::add).toList()",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV201StreamsMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV201StreamsExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV201StreamsEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
