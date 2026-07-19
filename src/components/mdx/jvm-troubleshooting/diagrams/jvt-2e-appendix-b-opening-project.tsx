import { OfficialJvt2Studio } from "./official-jvt2-lab";

const props = {
  "unitId": "jvt-2e-appendix-b-opening-project",
  "unitTitle": "附录B 打开项目",
  "concepts": [
    "Appendix B: Opening a project"
  ],
  "stages": [
    "取得修订",
    "核对JDK",
    "恢复依赖",
    "运行测试",
    "导入IDE"
  ],
  "focuses": [
    "commit",
    "wrapper",
    "dependency lock",
    "test",
    "run config",
    "working tree"
  ],
  "model": {
    "studio": "项目复现启动台",
    "axisA": {
      "label": "构建入口",
      "levels": [
        "IDE按钮",
        "系统Maven/Gradle",
        "项目wrapper"
      ]
    },
    "axisB": {
      "label": "版本冻结",
      "levels": [
        "分支名",
        "commit",
        "commit加依赖锁"
      ]
    },
    "outcomes": {
      "signal": "构建复现率",
      "risk": "环境漂移风险",
      "evidence": "证据闭环度"
    },
    "fault": "IDE可以运行但命令行无法构建，调查者实际使用了不同JDK或依赖",
    "task": "从干净目录运行测试与故障样例，并保存版本、命令和输出哈希",
    "invariant": "IDE与命令行消费同一修订、JDK和依赖图",
    "command": "git rev-parse HEAD && ./mvnw test",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jvt2eAppendixBOpeningProjectInvestigationLab() {
  return <OfficialJvt2Studio {...props} mode="investigation" />;
}

export function Jvt2eAppendixBOpeningProjectTimelineLab() {
  return <OfficialJvt2Studio {...props} mode="timeline" />;
}

export function Jvt2eAppendixBOpeningProjectEvidenceLab() {
  return <OfficialJvt2Studio {...props} mode="evidence" />;
}
