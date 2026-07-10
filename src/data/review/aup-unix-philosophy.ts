import type { ReviewQuestion } from "./types";

export const aupUnixPhilosophyQuestions: ReviewQuestion[] = [
  {
    id: "aup-unix-philosophy-01",
    chapter: "aup-unix-philosophy",
    level: 1,
    question: "UNIX 哲学的四大核心支柱是什么？",
    answer: "四大核心支柱：① 简洁性——一个程序只做一件事并做好，简单优于复杂，小即是美；② 组合性——一切皆文件，文本流是通用接口，程序通过管道协同工作；③ 透明性——数据流而非控制流，提供机制而非策略，沉默是金；④ 稳健性——健壮性源于透明与简洁，优雅不是可选的附加品。这四大支柱共同构成了 UNIX 哲学的设计基因。",
    tags: ["UNIX哲学", "四大支柱", "设计原则"],
  },
  {
    id: "aup-unix-philosophy-02",
    chapter: "aup-unix-philosophy",
    level: 1,
    question: "「一个程序只做一件事并做好」这条原则的含义是什么？",
    answer: "含义：每个程序应该聚焦于单一功能并做到极致，而不是试图包揽所有功能。这样做的好处：① 程序小巧易理解；② 接口简单易记忆；③ 可独立测试和演化；④ 可通过管道与其他工具组合完成复杂任务。反面例子是试图做所有事情的「大而全」程序，如某些 IDE 集成了编辑、编译、调试、版本控制却每个都做得不精。UNIX 工具如 grep 只做文本搜索、sort 只做排序、wc 只做计数，组合起来却能完成复杂的数据处理。",
    tags: ["单一职责", "简洁性", "模块原则"],
  },
  {
    id: "aup-unix-philosophy-03",
    chapter: "aup-unix-philosophy",
    level: 2,
    question: "为什么 UNIX 哲学强调「文本流是通用接口」？有什么优缺点？",
    answer: "强调文本流的原因：① 通用性——任何程序都能产生和消费文本，无需专用协议；② 可组合——通过管道可将多个工具串联（cat | grep | sort | head）；③ 可调试——人眼可直接阅读、grep 可搜索、diff 可比较；④ 工具生态——awk/sed/cut/jq 等工具可处理文本。缺点：① 体积比二进制大；② 解析有开销；③ 表达复杂数据结构（如嵌套关系）不如二进制高效。但 UNIX 的哲学是：在大多数场景下，可读性和可组合性的价值远大于性能损失，性能敏感场景才用二进制。",
    tags: ["文本流", "管道", "通用接口"],
  },
  {
    id: "aup-unix-philosophy-04",
    chapter: "aup-unix-philosophy",
    level: 3,
    question: "用管道组合示例说明 UNIX 哲学中「组合性」原则的威力。",
    answer: "组合性示例：cat access.log | grep 404 | awk '{print $1}' | sort -u | head -10。这条管道完成了复杂任务：① cat 读取日志文件（单一职责：输出文件内容）；② grep 过滤包含 404 的行（单一职责：文本搜索）；③ awk 提取第一列 IP 地址（单一职责：列处理）；④ sort -u 排序去重（单一职责：排序）；⑤ head -10 取前 10 条（单一职责：截取）。每个工具独立开发、独立维护、独立测试，无需预知彼此存在。用户可自由替换任一环节——用 uniq -c 替代 sort -u 来计数，用 tail 替代 head 来看末尾。这就是组合性的威力：简单工具 × 灵活组合 = 复杂能力，无需编写任何新代码。",
    tags: ["组合性", "管道", "实战应用"],
  },
];
