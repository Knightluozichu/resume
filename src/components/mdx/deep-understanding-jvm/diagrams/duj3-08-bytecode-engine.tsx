import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-08-bytecode-engine",
  "title": "第8章 虚拟机字节码执行引擎",
  "concepts": [
    "第8章 虚拟机字节码执行引擎",
    "8.1 概述",
    "8.2 运行时栈帧结构",
    "8.2.1 局部变量表",
    "8.2.2 操作数栈",
    "8.2.3 动态连接",
    "8.2.4 方法返回地址",
    "8.2.5 附加信息",
    "8.3 方法调用",
    "8.3.1 解析",
    "8.3.2 分派",
    "8.4 动态类型语言支持",
    "8.4.1 动态类型语言",
    "8.4.2 Java与动态类型",
    "8.4.3 java.lang.invoke包",
    "8.4.4 invokedynamic指令",
    "8.4.5 实战：掌控方法分派规则",
    "8.5 基于栈的字节码解释执行引擎",
    "8.5.1 解释执行",
    "8.5.2 基于栈的指令集与基于寄存器的指令集",
    "8.5.3 基于栈的解释器执行过程",
    "8.6 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "栈帧与分派台",
    "boundary": "locals/operand stack → invoke opcode → target → return",
    "axisA": {
      "label": "调用指令",
      "levels": [
        "invokestatic",
        "invokevirtual",
        "invokedynamic"
      ]
    },
    "axisB": {
      "label": "执行形态",
      "levels": [
        "解释",
        "编译",
        "去优化"
      ]
    },
    "fault": "用源码层重载规则解释运行期动态分派",
    "invariant": "每个调用点的描述符、操作数栈、目标选择和返回值可追踪",
    "probe": "javac --release 12 Dispatch.java\njavap -v -c Dispatch",
    "signal": "调用指令、描述符与栈映射帧",
    "practiceMode": "diagnosis",
    "metric": "栈帧与分派台复现度",
    "risk": "执行形态失真风险",
    "task": "从栈帧和方法调用解释字节码执行，区分解析与分派，并通过MethodHandle与invokedynamic理解动态链接；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "栈帧剖面、invoke指令对照、分派矩阵、MethodHandle实验、逐指令栈变化"
  }
} as const;

export function Duj308BytecodeEngineStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj308BytecodeEngineExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj308BytecodeEngineEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
