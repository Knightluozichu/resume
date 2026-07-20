import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-official-final-review",
  "title": "《深入理解Java虚拟机（第3版）》全书总复习",
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
    "studio": "全书跨层故障答辩台",
    "boundary": "source → Class → VM state → runtime evidence → recovery",
    "axisA": {
      "label": "故障域",
      "levels": [
        "内存/GC",
        "加载/JIT",
        "并发/工具"
      ]
    },
    "axisB": {
      "label": "结论层次",
      "levels": [
        "规范",
        "HotSpot",
        "目标JDK"
      ]
    },
    "fault": "只展示最终图表，无法回到原始命令和第一处状态偏离",
    "invariant": "282个节点能沿同一环境指纹重放，结论范围与回滚条件明确",
    "probe": "java -version\njavap -v -c Sample\njcmd PID VM.flags",
    "signal": "全书证据包、反例与发布判定",
    "practiceMode": "diagnosis",
    "metric": "全书跨层故障答辩台复现度",
    "risk": "结论层次失真风险",
    "task": "用一个从Class加载、热点编译、并发竞争到GC停顿的综合案例答辩串联282个正式节点；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "全书答辩包、原始输出、阶段状态图、版本差异、反例、回滚与复现实验"
  }
} as const;

export function Duj3OfficialFinalReviewStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3OfficialFinalReviewExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3OfficialFinalReviewEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
