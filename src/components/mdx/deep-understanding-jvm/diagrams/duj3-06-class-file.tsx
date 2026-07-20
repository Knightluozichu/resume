import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-06-class-file",
  "title": "第6章 类文件结构",
  "concepts": [
    "第6章 类文件结构",
    "6.1 概述",
    "6.2 无关性的基石",
    "6.3 Class类文件的结构",
    "6.3.1 魔数与Class文件的版本",
    "6.3.2 常量池",
    "6.3.3 访问标志",
    "6.3.4 类索引、父类索引与接口索引集合",
    "6.3.5 字段表集合",
    "6.3.6 方法表集合",
    "6.3.7 属性表集合",
    "6.4 字节码指令简介",
    "6.4.1 字节码与数据类型",
    "6.4.2 加载和存储指令",
    "6.4.3 运算指令",
    "6.4.4 类型转换指令",
    "6.4.5 对象创建与访问指令",
    "6.4.6 操作数栈管理指令",
    "6.4.7 控制转移指令",
    "6.4.8 方法调用和返回指令",
    "6.4.9 异常处理指令",
    "6.4.10 同步指令",
    "6.5 公有设计，私有实现",
    "6.6 Class文件结构的发展",
    "6.7 本章小结"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "Class文件解剖台",
    "boundary": "magic/version → constant pool → members → attributes → code",
    "axisA": {
      "label": "查看粒度",
      "levels": [
        "头部",
        "常量池",
        "Code属性"
      ]
    },
    "axisB": {
      "label": "编译选项",
      "levels": [
        "默认",
        "-g",
        "-parameters"
      ]
    },
    "fault": "把javap排版当成Class二进制规范本身",
    "invariant": "字节偏移、JVMS结构、javap输出和源码构造四者一致",
    "probe": "javac -g -parameters --release 12 Sample.java\njavap -v -c -l -s -sysinfo Sample.class",
    "signal": "major version、常量池索引与字节码偏移",
    "practiceMode": "diagnosis",
    "metric": "Class文件解剖台复现度",
    "risk": "编译选项失真风险",
    "task": "逐字节解析Class文件表结构与指令族，区分规范公开格式和虚拟机私有执行实现；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "十六进制偏移表、常量池索引图、方法Code属性、操作数栈轨迹、验证失败样本"
  }
} as const;

export function Duj306ClassFileStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj306ClassFileExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj306ClassFileEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
