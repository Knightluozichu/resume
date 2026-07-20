import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-appendix-c-bytecode-table",
  "title": "附录C 虚拟机字节码指令表",
  "concepts": [
    "附录C 虚拟机字节码指令表",
    "附录C 虚拟机字节码指令表：失败边界",
    "附录C 虚拟机字节码指令表：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "字节码速查与栈效应台",
    "boundary": "opcode bytes → operands → stack before/after → exception",
    "axisA": {
      "label": "指令族",
      "levels": [
        "加载存储",
        "调用",
        "控制转移"
      ]
    },
    "axisB": {
      "label": "验证条件",
      "levels": [
        "类型",
        "栈高",
        "分支目标"
      ]
    },
    "fault": "只背助记符，不计算操作数栈和异常边",
    "invariant": "每条选中指令的编码、栈效应、类型约束与控制流可手算",
    "probe": "javap -v -c -s BytecodeProbe.class",
    "signal": "opcode偏移、栈高与验证错误",
    "practiceMode": "diagnosis",
    "metric": "字节码速查与栈效应台复现度",
    "risk": "验证条件失真风险",
    "task": "将指令表作为第6与第8章的查阅索引，按操作数、栈效果、异常和控制流解释字节码；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "指令分类表、栈效果注释、控制流图、验证器约束"
  }
} as const;

export function Duj3AppendixCBytecodeTableStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3AppendixCBytecodeTableExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3AppendixCBytecodeTableEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
