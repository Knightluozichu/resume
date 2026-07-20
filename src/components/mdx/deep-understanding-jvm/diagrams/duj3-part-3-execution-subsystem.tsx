import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-part-3-execution-subsystem",
  "title": "第三部分 虚拟机执行子系统",
  "concepts": [
    "第三部分 虚拟机执行子系统",
    "第三部分 虚拟机执行子系统：失败边界",
    "第三部分 虚拟机执行子系统：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "Class到执行状态台",
    "boundary": "class bytes → verification → loading/linking/init → frames",
    "axisA": {
      "label": "表示层",
      "levels": [
        "源码",
        "Class",
        "运行时"
      ]
    },
    "axisB": {
      "label": "解析时点",
      "levels": [
        "编译",
        "加载",
        "首次使用"
      ]
    },
    "fault": "从源码语句直接推断操作数栈和动态分派",
    "invariant": "Class表项、加载状态、栈帧与调用结果能够逐层对应",
    "probe": "javac --release 12 Sample.java\njavap -v -c -s Sample",
    "signal": "Class校验和、常量池与指令",
    "practiceMode": "design",
    "task": "沿Class文件、加载与链接、栈帧执行、动态调用和案例实战解释字节码如何成为运行行为；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "源码到Class映射、加载状态机、栈帧时间线、动态调用验证"
  }
} as const;

export function Duj3Part3ExecutionSubsystemStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3Part3ExecutionSubsystemExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3Part3ExecutionSubsystemEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
