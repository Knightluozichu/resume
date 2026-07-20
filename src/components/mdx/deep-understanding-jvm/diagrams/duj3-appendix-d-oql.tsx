import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-appendix-d-oql",
  "title": "附录D 对象查询语言（OQL）简介",
  "concepts": [
    "附录D 对象查询语言（OQL）简介",
    "附录D 对象查询语言（OQL）简介：失败边界",
    "附录D 对象查询语言（OQL）简介：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "堆快照与OQL台",
    "boundary": "snapshot → class/instance graph → query → retained path",
    "axisA": {
      "label": "查询目标",
      "levels": [
        "类",
        "实例",
        "GC Root路径"
      ]
    },
    "axisB": {
      "label": "数据处置",
      "levels": [
        "采集",
        "分析",
        "销毁"
      ]
    },
    "fault": "生产堆转储包含敏感数据却无授权和保留期限",
    "invariant": "查询结果可回到对象图与GC Root，快照访问最小化并按期销毁",
    "probe": "jcmd PID GC.heap_dump heap.hprof\njhsdb jmap --binaryheap --pid PID",
    "signal": "对象数量、保留路径与销毁记录",
    "practiceMode": "diagnosis",
    "metric": "堆快照与OQL台复现度",
    "risk": "数据处置失真风险",
    "task": "用OQL从堆转储筛选对象、字段与引用关系，同时控制查询成本和敏感数据暴露；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "转储校验和、OQL查询、结果采样、GC根路径、访问与销毁审计"
  }
} as const;

export function Duj3AppendixDOqlStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3AppendixDOqlExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3AppendixDOqlEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
