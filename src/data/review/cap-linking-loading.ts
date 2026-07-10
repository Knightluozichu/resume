import type { ReviewQuestion } from "./types";

export const capLinkingLoadingQuestions: ReviewQuestion[] = [
  {
    id: "cap-linking-loading-1",
    chapter: "cap-linking-loading",
    level: 2,
    question: `从源码到可执行文件分哪几步？每步的输入输出是什么？`,
    answer:
      `四步：①预处理——输入 .c，展开 #include、#define、条件编译，输出 .i；②编译——输入 .i，做词法/语法/语义分析+优化+生成，输出汇编 .s；③汇编——输入 .s，把汇编指令翻译成机器码，输出目标文件 .o（ELF 格式，含 .text 代码、.data 已初始化全局、.bss 未初始化全局、.symtab 符号表、.rela.text 重定位条目）；④链接——输入多个 .o 和库，合并段、解析符号、重定位地址，输出可执行文件（也是 ELF）。.o 里的地址还是相对的（从 0 开始），链接后才确定绝对地址。gcc 一条命令 \`gcc hello.c -o hello\` 默认走完全部四步，可用 -E -S -c 分别停在预处理/编译/汇编阶段。`,
    tags: ["编译流水线", "ELF"],
  },
  {
    id: "cap-linking-loading-2",
    chapter: "cap-linking-loading",
    level: 3,
    question: `静态链接和动态链接各有什么优缺点？为什么现代系统默认动态链接？`,
    answer:
      `静态链接：构建期把库代码复制进可执行文件。优点——独立可移植（不依赖系统库）、启动快（无需运行时解析符号）。缺点——体积大、库升级需重链接所有程序、多进程各存一份库代码浪费内存。动态链接：可执行文件只记录库依赖，加载时/运行时由动态链接器（ld-linux.so）解析符号做重定位。优点——多进程共享一份库代码（节省内存，libc 被千百进程共享）、库升级不需重链接（修 .so 即可）、可运行时按需加载（dlopen）。缺点——启动稍慢（需解析符号）、PIC 位置无关代码有间接寻址开销、依赖环境（库缺失/版本不匹配会启动失败）。现代系统默认动态链接，因内存共享和可维护性收益远大于启动开销。`,
    tags: ["静态链接", "动态链接"],
  },
  {
    id: "cap-linking-loading-3",
    chapter: "cap-linking-loading",
    level: 3,
    question: `为什么静态库的链接顺序很重要？\`gcc main.o -la -lb\` 和 \`-lb -la\` 有何区别？`,
    answer:
      `静态库（.a）的符号解析是单向的：链接器从左到右扫，只解析当前未决符号引用。若 main.o 引用 liba.a 的函数，而 liba.a 又引用 libb.a，必须写成 \`gcc main.o -la -lb\`——先扫 -la 解析 main.o 的引用并产生对 libb 的新引用，再扫 -lb 解析之。若写成 \`-lb -la\`：扫 -lb 时没有未决引用直接跳过（不提取任何 .o），扫 -la 时解析 main.o 的引用并产生对 libb 的引用，但已无后续库可解析，报 undefined reference。这就是 \`gcc ... -lm\` 要放最后的根源。循环依赖（a 依赖 b 依赖 a）可用 \`--start-group -la -lb --end-group\` 让链接器反复扫描解决。`,
    tags: ["链接顺序", "静态库", "符号解析"],
  },
  {
    id: "cap-linking-loading-4",
    chapter: "cap-linking-loading",
    level: 4,
    question: `ELF 文件包含哪些关键段？链接器如何用重定位表完成符号绑定？强弱符号规则是什么？`,
    answer:
      `ELF 关键段：.text 代码、.rodata 只读数据、.data 已初始化全局变量、.bss 未初始化全局（不占文件空间运行时清零）、.symtab 符号表、.rela.text/.rela.data 重定位条目、.debug 调试信息。链接流程：①合并所有 .o 的 .text .data 等段，每个符号获得最终虚拟地址；②符号解析——把每个引用绑定到唯一定义，强弱符号规则：强符号（已初始化全局）不允许重复定义，弱符号（未初始化全局、__attribute__((weak))）可被强符号覆盖，多个弱符号任选其一；③扫 .rela 重定位条目，按类型（R_X86_64_PC32 相对调用、R_X86_64_64 绝对地址）把指令占位地址改写成符号真实地址。重定位条目记录「哪条指令哪个字节要改、改成什么符号、按什么公式」。`,
    tags: ["ELF", "重定位", "强弱符号"],
  },
];
