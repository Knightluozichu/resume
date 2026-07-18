import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第1章 引论",
  label: "第1章 引论",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "冻结源句",
    "切分阶段",
    "保存符号表",
    "比较中间表示",
    "执行目标代码",
    "核对可观察行为",
  ],
  concepts: [
    "第1章 引论",
    "1.1 语言处理器",
    "1.2 一个编译器的结构",
    "1.2.1 词法分析",
    "1.2.2 语法分析",
    "1.2.3 语义分析",
    "1.2.4 中间代码生成",
    "1.2.5 代码优化",
    "1.2.6 代码生成",
    "1.2.7 符号表管理",
    "1.2.8 将多个阶段组合成趟",
    "1.2.9 编译器构造工具",
    "1.3 程序设计语言的发展历程",
    "1.3.1 向高级程序设计语言迈进",
    "1.3.2 对编译器的影响",
    "1.4 构建一个编译器的科学",
    "1.4.1 编译器设计和实现中的建模",
    "1.4.2 代码优化的科学",
    "1.5 编译技术的应用",
    "1.5.1 高级程序设计语言的实现",
    "1.5.2 针对计算机体系结构的优化",
    "1.5.3 新计算机体系结构的设计",
    "1.5.4 程序翻译",
    "1.5.5 软件生产率工具",
    "1.6 程序设计语言基础",
    "1.6.1 静态与动态的区别",
    "1.6.2 环境与状态",
    "1.6.3 静态作用域和块结构",
    "1.6.4 显式访问控制",
    "1.6.5 动态作用域",
    "1.6.6 参数传递机制",
    "1.6.7 别名",
  ],
} as const;

export function Dbc01IntroductionMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc01IntroductionExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc01IntroductionEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
