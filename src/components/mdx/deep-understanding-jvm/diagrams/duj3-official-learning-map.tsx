import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-official-learning-map",
  "title": "《深入理解Java虚拟机（第3版）》权威学习地图",
  "concepts": [
    "第一部分 走近Java",
    "第1章 走近Java",
    "第二部分 自动内存管理",
    "第2章 Java内存区域与内存溢出异常",
    "第3章 垃圾收集器与内存分配策略",
    "第4章 虚拟机性能监控、故障处理工具",
    "第5章 调优案例分析与实战",
    "第三部分 虚拟机执行子系统",
    "第6章 类文件结构",
    "第7章 虚拟机类加载机制",
    "第8章 虚拟机字节码执行引擎",
    "第9章 类加载及执行子系统的案例与实战",
    "第四部分 程序编译与代码优化",
    "第10章 前端编译与优化",
    "第11章 后端编译与优化",
    "第五部分 高效并发",
    "第12章 Java内存模型与线程",
    "第13章 线程安全与锁优化",
    "附录A 在Windows系统下编译OpenJDK 6",
    "附录B 展望Java技术的未来（2013年版）",
    "附录C 虚拟机字节码指令表",
    "附录D 对象查询语言（OQL）简介",
    "附录E JDK历史版本轨迹"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "282节点跨层路线台",
    "boundary": "语言 → Class → VM状态 → HotSpot → 工具证据",
    "axisA": {
      "label": "学习层次",
      "levels": [
        "规范",
        "实现",
        "发行版"
      ]
    },
    "axisB": {
      "label": "证据深度",
      "levels": [
        "术语",
        "探针",
        "反例恢复"
      ]
    },
    "fault": "用一张HotSpot示意图替代JVMS合同并跨版本外推",
    "invariant": "23个正式单元都能回到版本化原始证据和可推翻条件",
    "probe": "java -version\njavap -version\njcmd -l",
    "signal": "路线覆盖与版本账本",
    "practiceMode": "design",
    "task": "沿5个部分、13章和附录A-E建立从JVM历史、内存、执行、编译到并发的完整学习与证据路径；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "282节点覆盖矩阵、章节依赖图、版本边界账本和全书实验清单"
  }
} as const;

export function Duj3OfficialLearningMapStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3OfficialLearningMapExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3OfficialLearningMapEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
