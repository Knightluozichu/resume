import type { ReviewQuestion } from "./types";

export const aupTransparencyQuestions: ReviewQuestion[] = [
  {
    id: "aup-transparency-01",
    chapter: "aup-transparency",
    level: 1,
    question: `透明性的三个层次是什么？`,
    answer: `透明性三层次：① 数据可见——内部状态可被外部观察，配置文件是文本格式，日志输出人类可读，状态可通过命令查询（What it has）；② 行为可推——从输入可推断输出，逻辑直白无魔法，副作用最小化，失败模式可预测（What it does）；③ 系统可探——提供自省接口，文档与帮助完善，支持 --help/--version，提供 dry-run 模式（How to find）。三层层层递进：先让数据可见，再让行为可推，最后让系统可探索，共同构成完整的透明性。`,
    tags: ["透明性", "三层次", "可发现性"],
  },
  {
    id: "aup-transparency-02",
    chapter: "aup-transparency",
    level: 1,
    question: `什么是可发现性（Discoverability）？为什么它很重要？`,
    answer: `可发现性是指用户在不读源码的情况下能够发现和理解系统功能的能力。它很重要因为：① 降低学习成本——新用户可通过 --help 和文档快速上手；② 减少错误使用——清晰的接口和错误提示避免误操作；③ 提高维护效率——运维人员可通过自省接口诊断问题；④ 促进工具组合——可发现的工具更容易被其他工具调用和集成。实现手段：man page 手册、--help 内置帮助、README 随源码、无参数运行给提示、dry-run 预览、verbose 详尽模式、退出码遵循约定、/proc 虚拟文件系统、健康检查端点等。`,
    tags: ["可发现性", "用户体验", "自描述"],
  },
  {
    id: "aup-transparency-03",
    chapter: "aup-transparency",
    level: 2,
    question: `如何评估一个系统的透明性是否良好？`,
    answer: `评估方法：核心问题是「能否在不读源码的情况下理解系统？」。具体检查：① 数据可见——配置文件是什么格式？能否 cat 查看？日志是否人类可读？状态能否通过命令查询？② 行为可推——给定输入能否预测输出？有哪些副作用？失败时会发生什么？③ 系统可探——是否有 --help？文档是否完善？是否有 dry-run 模式？是否有自省接口？如果以上都能通过，透明性良好；如果需要读源码才能理解，则需要增加可发现性——补充文档、日志、自省接口。这是 UNIX 设计的核心检验标准之一。`,
    tags: ["透明性评估", "设计检验", "可发现性"],
  },
  {
    id: "aup-transparency-04",
    chapter: "aup-transparency",
    level: 3,
    question: `设计一个命令行工具时，如何最大化其透明性和可发现性？`,
    answer: `最大化透明性和可发现性的设计：① 接口层面——无参数运行时输出帮助信息而非报错；提供 --help 显示完整用法；提供 --version 显示版本号；遵循 -v/--verbose、-q/--quiet、-h/--help 通例；退出码遵循约定（0 成功、1-2 通用错误、126-128 权限/信号）；② 数据层面——输入输出默认走 stdin/stdout，支持管道；输出格式为文本（JSON Lines 最佳），便于 grep/jq 处理；错误信息可操作（不仅说错了，还说怎么修）；③ 状态层面——提供 dry-run 预览模式；verbose 模式输出详细过程；日志结构化输出；支持 --debug 输出内部状态；④ 文档层面——man page 完整；README 含示例；注释解释「为何」而非「做什么」。核心理念：让工具自我描述，用户无需读源码即可理解和使用。`,
    tags: ["CLI设计", "透明性", "可发现性", "实战设计"],
  },
];
