import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-10-frontend-compiler",
  "title": "第10章 前端编译与优化",
  "concepts": [
    "第10章 前端编译与优化",
    "10.1 概述",
    "10.2 Javac编译器",
    "10.2.1 Javac的源码与调试",
    "10.2.2 解析与填充符号表",
    "10.2.3 注解处理器",
    "10.2.4 语义分析与字节码生成",
    "10.3 Java语法糖的味道",
    "10.3.1 泛型",
    "10.3.2 自动装箱、拆箱与遍历循环",
    "10.3.3 条件编译",
    "10.4 实战：插入式注解处理器",
    "10.4.1 实战目标",
    "10.4.2 代码实现",
    "10.4.3 运行与测试",
    "10.4.4 其他应用案例",
    "10.5 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "Javac语义与注解处理台",
    "boundary": "parse → enter → annotation processing → attribution → generate",
    "axisA": {
      "label": "前端阶段",
      "levels": [
        "语法",
        "语义",
        "生成"
      ]
    },
    "axisB": {
      "label": "处理轮次",
      "levels": [
        "首轮",
        "新增源",
        "结束"
      ]
    },
    "fault": "注解处理器读写非声明输入导致构建不可重复",
    "invariant": "相同源码、处理器和选项生成同一Class与诊断，错误阶段可定位",
    "probe": "javac -XprintRounds -XprintProcessorInfo -parameters Sample.java\njavap -v Sample",
    "signal": "处理轮次、诊断与Class哈希",
    "practiceMode": "diagnosis",
    "metric": "Javac语义与注解处理台复现度",
    "risk": "处理轮次失真风险",
    "task": "沿Javac解析、符号表、注解处理、语义分析到字节码生成，拆解泛型擦除、装箱与遍历等语法糖；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "Javac阶段图、脱糖前后字节码、处理器输入输出、确定性构建测试"
  }
} as const;

export function Duj310FrontendCompilerStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj310FrontendCompilerExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj310FrontendCompilerEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
