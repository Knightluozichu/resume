import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第12章 过程间分析",
  label: "第12章 过程间分析",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "建立调用事实",
    "选择上下文",
    "写出Datalog规则",
    "求关系不动点",
    "压缩为BDD",
    "对照动态轨迹",
  ],
  concepts: [
    "第12章 过程间分析",
    "12.1 基本概念",
    "12.1.1 调用图",
    "12.1.2 上下文敏感性",
    "12.1.3 调用串",
    "12.1.4 基于克隆的上下文相关分析",
    "12.1.5 基于摘要的上下文相关分析",
    "12.2 为什么需要过程间分析",
    "12.2.1 虚方法调用",
    "12.2.2 指针别名分析",
    "12.2.3 并行化",
    "12.2.4 软件错误和安全漏洞的检测",
    "12.2.5 SQL注入",
    "12.2.6 缓冲区溢出",
    "12.3 数据流的逻辑表示",
    "12.3.1 Datalog简介",
    "12.3.2 Datalog规则",
    "12.3.3 内涵谓词和外延谓词",
    "12.3.4 Datalog程序的执行",
    "12.3.5 Datalog程序的增量求值",
    "12.3.6 有问题的Datalog规则",
    "12.4 一个简单的指针分析算法",
    "12.4.1 指针分析为什么困难",
    "12.4.2 指针和引用的模型",
    "12.4.3 流不敏感",
    "12.4.4 使用Datalog的形式化",
    "12.4.5 使用类型信息",
    "12.5 上下文无关的过程间分析",
    "12.5.1 方法调用的影响",
    "12.5.2 使用Datalog发现调用图",
    "12.5.3 动态加载和反射",
    "12.6 上下文相关的指针分析",
    "12.6.1 上下文和调用串",
    "12.6.2 向Datalog规则中加入上下文",
    "12.6.3 关于敏感性的进一步观察",
    "12.7 使用BDD实现Datalog",
    "12.7.1 二叉决策图",
    "12.7.2 BDD上的变换",
    "12.7.3 使用BDD表示关系",
    "12.7.4 将关系运算实现为BDD运算",
    "12.7.5 使用BDD进行指向分析",
  ],
} as const;

export function Dbc12InterproceduralAnalysisMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc12InterproceduralAnalysisExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc12InterproceduralAnalysisEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
