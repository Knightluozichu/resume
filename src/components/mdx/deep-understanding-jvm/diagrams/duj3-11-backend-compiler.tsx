import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-11-backend-compiler",
  "title": "第11章 后端编译与优化",
  "concepts": [
    "第11章 后端编译与优化",
    "11.1 概述",
    "11.2 即时编译器",
    "11.2.1 解释器与编译器",
    "11.2.2 编译对象与触发条件",
    "11.2.3 编译过程",
    "11.2.4 实战：查看及分析即时编译结果",
    "11.3 提前编译器",
    "11.3.1 提前编译的优劣得失",
    "11.3.2 实战：Jaotc的提前编译",
    "11.4 编译器优化技术",
    "11.4.1 优化技术概览",
    "11.4.2 方法内联",
    "11.4.3 逃逸分析",
    "11.4.4 公共子表达式消除",
    "11.4.5 数组边界检查消除",
    "11.5 实战：深入理解Graal编译器",
    "11.5.1 历史背景",
    "11.5.2 构建编译调试环境",
    "11.5.3 JVMCI编译器接口",
    "11.5.4 代码中间表示",
    "11.5.5 代码优化与生成",
    "11.6 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "分层编译与去优化台",
    "boundary": "profile → compile tier → inline/speculate → uncommon trap",
    "axisA": {
      "label": "执行阶段",
      "levels": [
        "冷",
        "预热",
        "稳态"
      ]
    },
    "axisB": {
      "label": "优化事件",
      "levels": [
        "编译",
        "内联",
        "去优化"
      ]
    },
    "fault": "没有固定预热与黑洞就用微基准评价JIT",
    "invariant": "编译事件对应同一工作量，收益不以代码缓存或尾延迟恶化换取",
    "probe": "java -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining JitProbe",
    "signal": "编译层级、内联决定与去优化",
    "practiceMode": "diagnosis",
    "task": "比较解释、JIT与AOT，理解编译触发、内联、逃逸分析和Graal IR，并识别投机优化与去优化；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "编译事件时间线、内联决策、逃逸证据、IR演化、去优化反例与版本账本"
  }
} as const;

export function Duj311BackendCompilerStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj311BackendCompilerExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj311BackendCompilerEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
