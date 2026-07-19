import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-03-advanced-debugging",
  "unitTitle": "第3章 用高级调试技术寻找根因",
  "concepts": [
    "3 Finding problem root causes using advanced debugging techniques",
    "3.1 Minimizing investigation time with conditional breakpoints",
    "3.2 Using breakpoints that don’t pause the execution",
    "3.3 Dynamically altering the investigation scenario",
    "3.4 Rewinding the investigation case",
    "Summary"
  ],
  "stages": [
    "缩小条件",
    "采集不暂停",
    "改变场景",
    "回退重放",
    "核对副作用"
  ],
  "focuses": [
    "条件断点",
    "tracepoint",
    "求值表达式",
    "字段修改",
    "drop frame",
    "副作用"
  ],
  "model": {
    "studio": "高级断点扰动台",
    "axisA": {
      "label": "命中筛选",
      "levels": [
        "每次命中",
        "条件命中",
        "采样命中"
      ]
    },
    "axisB": {
      "label": "场景修改",
      "levels": [
        "只观察",
        "临时求值",
        "修改字段或回退"
      ]
    },
    "outcomes": {
      "signal": "有效样本率",
      "risk": "状态污染率",
      "evidence": "证据闭环度"
    },
    "fault": "在调试器中修改字段后继续运行，却把新路径当成原始程序行为",
    "task": "用条件断点捕获唯一目标请求，再以未修改进程重放同一发现",
    "invariant": "最终根因证据来自未被调试器改写的独立运行",
    "command": "conditional-breakpoint request.id == target",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e03AdvancedDebuggingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e03AdvancedDebuggingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e03AdvancedDebuggingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
