import type { ReviewQuestion } from "./types";

/** C++ Primer Plus 6e · 官方 18 章学习地图 */
export const eppLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "epp-learning-map-1",
    chapter: "epp-learning-map",
    level: 1,
    question: "官方 18 章如何组成程序、模块、对象和系统四个阶段？",
    answer: "Ch1–6 建立工具链、值、数据形状与路径；Ch7–9 建立函数契约、增强机制和翻译单元/链接边界；Ch10–15 建立类不变量、复制控制、继承复用、异常/RTTI；Ch16–18 组合 STL 范围、文件状态和 C++11 owner/callable。",
    tags: ["官方章序", "学习地图", "四阶段"],
  },
  {
    id: "epp-learning-map-2",
    chapter: "epp-learning-map",
    level: 2,
    question: "为什么有 C 基础仍不能直接从 Chapter 1 跳到类或 STL？",
    answer: "后续类/STL 依赖 C++ 特有的 iostream 状态、reference、列表窄化、string/vector、owner、范围和分离编译。可加速熟悉语法，但必须通过干净构建、边界输入、EOF/format failure、地址长度和符号故障闸门，否则缺失证据会在模板或对象生命周期中放大。",
    tags: ["前置依赖", "C基础", "阶段闸门"],
  },
  {
    id: "epp-learning-map-3",
    chapter: "epp-learning-map",
    level: 3,
    question: "多态记录文件往返项目如何串联 18 章而不是只展示一个功能？",
    answer: "工具链/值/控制阶段保证输入和路径；函数/模块阶段保证接口、翻译单元与符号；对象阶段保证构造不变量、复制/move、virtual owner、异常清理；库/系统阶段用 container/algorithm 处理，按 stream state/schema 写入并重读，验证 owner、字段和失败路径。",
    tags: ["综合项目", "依赖链", "证据"],
  },
  {
    id: "epp-learning-map-4",
    chapter: "epp-learning-map",
    level: 4,
    question: "如何用失败现象决定回补哪一章，而不是从头重读？",
    answer: "先按最早失败层分类：旧产物/编译看 Ch1；值/转换看 Ch2–4；循环/分支看 Ch5–6；参数/重载看 Ch7–8；符号/生命周期看 Ch9；对象/复制/多态/复用/异常看 Ch10–15；iterator/owner/stream/move/callable 看 Ch16–18。收集该层 producer-consumer 证据再修复。",
    tags: ["故障定位", "回补路径", "综合"],
  },
];
