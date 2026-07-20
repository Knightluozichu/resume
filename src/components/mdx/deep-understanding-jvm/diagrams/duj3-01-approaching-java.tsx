import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-01-approaching-java",
  "title": "第1章 走近Java",
  "concepts": [
    "第1章 走近Java",
    "1.1 概述",
    "1.2 Java技术体系",
    "1.3 Java发展史",
    "1.4 Java虚拟机家族",
    "1.4.1 虚拟机始祖：Sun Classic/Exact VM",
    "1.4.2 武林盟主：HotSpot VM",
    "1.4.3 小家碧玉：Mobile/Embedded VM",
    "1.4.4 天下第二：BEA JRockit/IBM J9 VM",
    "1.4.5 软硬合璧：BEA Liquid VM/Azul VM",
    "1.4.6 挑战者：Apache Harmony/Google Android Dalvik VM",
    "1.4.7 没有成功，但并非失败：Microsoft JVM及其他",
    "1.4.8 百家争鸣",
    "1.5 展望Java技术的未来",
    "1.5.1 无语言倾向",
    "1.5.2 新一代即时编译器",
    "1.5.3 向Native迈进",
    "1.5.4 灵活的胖子",
    "1.5.5 语言语法持续增强",
    "1.6 实战：自己编译JDK",
    "1.6.1 获取源码",
    "1.6.2 系统需求",
    "1.6.3 构建编译环境",
    "1.6.4 进行编译",
    "1.6.5 在IDE工具中进行源码调试",
    "1.7 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "OpenJDK构建与调试台",
    "boundary": "source commit → configure → build → images → debugger",
    "axisA": {
      "label": "构建阶段",
      "levels": [
        "configure",
        "compile",
        "images"
      ]
    },
    "axisB": {
      "label": "调试入口",
      "levels": [
        "启动",
        "类加载",
        "GC初始化"
      ]
    },
    "fault": "构建成功但未记录boot JDK、依赖和源码提交",
    "invariant": "同一提交与工具链生成同一可启动镜像并命中预定源码断点",
    "probe": "git rev-parse HEAD\nbash configure --with-debug-level=slowdebug\nmake images",
    "signal": "构建日志、镜像校验与断点",
    "practiceMode": "diagnosis",
    "metric": "OpenJDK构建与调试台复现度",
    "risk": "调试入口失真风险",
    "task": "从Java体系和JVM演进走到可重复的OpenJDK 12源码构建，建立阅读虚拟机实现的入口；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "JVM家族比较表、JDK 12构建清单、构建日志、镜像验证与调试断点"
  }
} as const;

export function Duj301ApproachingJavaStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj301ApproachingJavaExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj301ApproachingJavaEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
