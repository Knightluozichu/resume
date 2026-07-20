import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-appendix-b-java-future-2013",
  "title": "附录B 展望Java技术的未来（2013年版）",
  "concepts": [
    "附录B 展望Java技术的未来（2013年版）",
    "附录B 展望Java技术的未来（2013年版）：失败边界",
    "附录B 展望Java技术的未来（2013年版）：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "2013预测复核台",
    "boundary": "dated claim → contemporaneous evidence → later outcome",
    "axisA": {
      "label": "判断时间",
      "levels": [
        "2013",
        "2019",
        "2026复核"
      ]
    },
    "axisB": {
      "label": "证据类别",
      "levels": [
        "提案",
        "交付",
        "移除"
      ]
    },
    "fault": "用后见之明把当时预测改写成必然结果",
    "invariant": "每个预测保留原日期、原证据、不确定性与后来状态",
    "probe": "git log --since=2013-01-01 --until=2013-12-31 --oneline",
    "signal": "时间戳、提案状态与发布记录",
    "practiceMode": "diagnosis",
    "metric": "2013预测复核台复现度",
    "risk": "证据类别失真风险",
    "task": "把2013年的预测作为可检验历史样本，与第3版2019年的观察分开，训练技术判断的证据意识；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "预测命题、当时证据、实际结果、偏差原因与不可知项"
  }
} as const;

export function Duj3AppendixBJavaFuture2013StructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3AppendixBJavaFuture2013ExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3AppendixBJavaFuture2013EvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
