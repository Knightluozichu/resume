import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v1-06-interfaces-lambdas-inner",
  "title": "卷I 第6章 接口、Lambda 与内部类",
  "concepts": [
    "Chapter 6: Interfaces, Lambda Expressions, and Inner Classes",
    "6.1 Interfaces",
    "6.2 Lambda Expressions",
    "6.3 Inner Classes",
    "6.4 Service Loaders",
    "6.5 Proxies"
  ],
  "stages": [
    "声明行为",
    "确定目标类型",
    "捕获上下文",
    "装配服务",
    "代理调用"
  ],
  "focuses": [
    "默认方法",
    "函数式接口",
    "有效final",
    "内部类",
    "ServiceLoader",
    "Proxy"
  ],
  "model": {
    "studio": "行为对象与捕获语义台",
    "axisA": {
      "label": "行为表示",
      "levels": [
        "匿名类",
        "Lambda",
        "服务实现"
      ]
    },
    "axisB": {
      "label": "上下文耦合",
      "levels": [
        "隐式捕获",
        "显式参数",
        "无状态合同"
      ]
    },
    "outcomes": {
      "success": "行为替换度",
      "risk": "隐藏捕获风险",
      "evidence": "可重放证据"
    },
    "fault": "Lambda 捕获可变上下文或代理遗漏 Object 方法语义，导致行为与身份不可预测",
    "task": "把同一行为分别写成Lambda和匿名类，比较this、捕获变量与运行时类的差异",
    "invariant": "目标类型、捕获值和调用边界在执行前可说明",
    "probe": "lambda.getClass().isSynthetic()",
    "practiceMode": "code",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV106InterfacesLambdasInnerMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV106InterfacesLambdasInnerExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV106InterfacesLambdasInnerEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
