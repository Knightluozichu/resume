import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-appendix-e-jdk-history",
  "title": "附录E JDK历史版本轨迹",
  "concepts": [
    "附录E JDK历史版本轨迹",
    "附录E JDK历史版本轨迹：失败边界",
    "附录E JDK历史版本轨迹：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "JDK版本历史账本",
    "boundary": "release date → specification → implementation → feature status",
    "axisA": {
      "label": "版本节点",
      "levels": [
        "JDK 6",
        "JDK 12",
        "JDK 25"
      ]
    },
    "axisB": {
      "label": "功能状态",
      "levels": [
        "预览",
        "正式",
        "移除"
      ]
    },
    "fault": "把预览、实验、默认开启和规范承诺混为一谈",
    "invariant": "每项功能标注版本、状态、JEP/规范来源、默认值和迁移影响",
    "probe": "java -version\njavac -version\njava --list-modules",
    "signal": "版本输出、JEP状态与模块清单",
    "practiceMode": "diagnosis",
    "metric": "JDK版本历史账本复现度",
    "risk": "功能状态失真风险",
    "task": "把JDK版本演进与本书章节中的行为变化建立索引，避免跨版本套用参数、工具和对象布局；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "版本轨迹、特性到章节映射、弃用与移除清单、迁移验证"
  }
} as const;

export function Duj3AppendixEJdkHistoryStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3AppendixEJdkHistoryExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3AppendixEJdkHistoryEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
