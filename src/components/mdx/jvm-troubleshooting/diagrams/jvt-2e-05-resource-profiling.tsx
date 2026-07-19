import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-05-resource-profiling",
  "unitTitle": "第5章 用剖析识别资源消耗问题",
  "concepts": [
    "5 Identifying resource consumption problems using profiling techniques",
    "5.1 Where would a profiler be useful?",
    "5.1.1 Identifying abnormal usage of resources",
    "5.1.2 Finding out what code executes",
    "5.1.3 Identifying slowness in an app’s execution",
    "5.2 Using a profiler",
    "5.2.1 Installing and configuring VisualVM",
    "5.2.2 Observing the CPU and memory usage",
    "5.2.3 Identifying memory leaks",
    "5.3 Using AI assistance",
    "Summary"
  ],
  "stages": [
    "固定负载",
    "采集基线",
    "观察资源",
    "定位增长",
    "修复复测"
  ],
  "focuses": [
    "VisualVM",
    "CPU",
    "heap",
    "allocation",
    "memory leak",
    "AI脱敏"
  ],
  "model": {
    "studio": "资源曲线与泄漏判别台",
    "axisA": {
      "label": "资源压力",
      "levels": [
        "稳定负载",
        "阶梯负载",
        "负载撤除"
      ]
    },
    "axisB": {
      "label": "观测信号",
      "levels": [
        "总量",
        "分配热点",
        "存活对象路径"
      ]
    },
    "outcomes": {
      "signal": "资源归因率",
      "risk": "泄漏误判率",
      "evidence": "证据闭环度"
    },
    "fault": "只看到堆峰值就宣称泄漏，没有在负载撤除和GC后检查存活趋势",
    "task": "执行升载与撤载，比较堆占用、分配速率和GC后基线是否恢复",
    "invariant": "泄漏结论必须由持续存活增长及持有路径支持",
    "command": "jcmd <pid> GC.class_histogram",
    "practiceMode": "calculation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2e05ResourceProfilingInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2e05ResourceProfilingTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2e05ResourceProfilingEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
