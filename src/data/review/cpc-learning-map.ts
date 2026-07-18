import type { ReviewQuestion } from "./types";

/** CPU眼里的C/C++ · 导读复习题 */
export const cpcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cpc-learning-map-1",
    chapter: "cpc-learning-map",
    level: 1,
    question: `原书六章的学习顺序是什么？每一章新增了哪一层能力？`,
    answer: `顺序是：预备知识、基础语法、函数原理、C++特性、高级编程、面试挑战。第1章建立 Compiler Explorer、可执行文件和汇编证据；第2章理解状态、地址与分支；第3章跨越函数 ABI；第4章解剖对象、生命周期与分派；第5章连接虚拟内存、内核和同步；第6章把知识组织成可反证、可验证的回答。`,
    tags: ["六章路线", "官方目录", "学习地图"],
  },
  {
    id: "cpc-learning-map-2",
    chapter: "cpc-learning-map",
    level: 2,
    question: `CPU 视角的四层证据分别回答什么问题？`,
    answer: `语言层回答 type、value、lifetime 与 observable behavior；compiler/ABI 层回答 layout、calling convention、symbols；ISA/CPU 层回答 registers、loads/stores、branches 与 atomics；OS/runtime 层回答 mappings、faults、syscalls、scheduling 与 unwind。一次汇编只能证明特定配置下的实现，不能替代语言结论。`,
    tags: ["证据链", "ABI", "语言语义"],
  },
  {
    id: "cpc-learning-map-3",
    chapter: "cpc-learning-map",
    level: 3,
    question: `如何用控制变量实验检验“局部变量一定在栈上”？`,
    answer: `固定 source、compiler、target 与 standard，比较 O0、O2 和地址逃逸三个版本。O0 可能保留 stack slot，O2 可将值放 register 或消除；增加取地址并传给未知函数后，storage 可能重新出现。由此可得：C++ 规定 local 的 scope/lifetime，不规定固定 stack 位置；具体位置属于当前 build evidence。`,
    tags: ["控制变量", "优化", "局部变量"],
  },
  {
    id: "cpc-learning-map-4",
    chapter: "cpc-learning-map",
    level: 4,
    question: `为什么“CPU 没有报错”不能证明一次数组访问合法？`,
    answer: `数组合法性由对象 bounds 与 lifetime 决定；越界后 C/C++ 已是 undefined behavior。硬件保护通常以 page 为粒度，越界地址若仍在已映射 page，load/store 可以完成。应同时检查语言 bounds、compiler assumptions、effective address 和 OS mapping，并可用 ASan 增强检测。`,
    tags: ["数组越界", "虚拟内存", "分层证据"],
  },
];
