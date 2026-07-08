import type { ReviewQuestion } from "./types";

export const jdgLexiconGrammarQuestions: ReviewQuestion[] = [
  {
    id: "jdg-lexicon-grammar-1",
    chapter: "jdg-lexicon-grammar",
    level: 2,
    question: "ASI 自动分号插入的三条规则是什么？",
    answer:
      "①遇到换行符，且下一 token 无法与当前语句拼接成合法语法时，在换行处插入分号；②遇到右大括号 } 时，在 } 前插入分号；③输入流（文件/程序）结束时，在末尾插入分号。ASI 让省略分号在多数情况下可行，但核心机制是「只有拼接后不合法才补分号」——以 ( [ ` + - 开头的行若能和上一行拼成合法语法（如函数调用、属性访问），ASI 不补分号，导致错误拼接。",
    tags: ["ASI", "分号", "词法结构"],
  },
  {
    id: "jdg-lexicon-grammar-2",
    chapter: "jdg-lexicon-grammar",
    level: 3,
    question: "为什么 `return\\nvalue` 会返回 `undefined`？`let x = 1\\n(x+2).toFixed()` 为什么报错？",
    answer:
      "return 后换行：ASI 规则①检测到换行，而 return 本身是完整语句（return 后可无表达式表示返回 undefined），于是在 return 后补分号，return 变成返回 undefined，下一行 value 变独立语句。修复：return 与返回值写同一行。let x=1 后 (x+2) 以 ( 开头，ASI 不补分号——因为 1(x+2) 语法上合法（函数调用表达式），于是被解析成「把 1 当函数调用参数 x+2」，1 不是函数故 TypeError。修复：行首加分号 ;(x+2).toFixed() 或上行末写分号。这是无分号风格必须警惕的行首防御场景。",
    tags: ["ASI", "return", "行首防御"],
  },
  {
    id: "jdg-lexicon-grammar-3",
    chapter: "jdg-lexicon-grammar",
    level: 3,
    question: "JavaScript 保留字分哪三类？`undefined` 是关键字吗？",
    answer:
      "三类：①语言关键字（var/let/const/function/class/return/if/for/async/await 等），有固定语法含义不可作标识符；②保留待用字（enum/implements/interface/package 等），当前未启用但严格模式保留以备扩展；③特殊字面量（true/false/null/undefined），非关键字但不可作标识符。undefined 不是关键字，而是全局只读属性——这意味着非严格模式下可被遮蔽（如 var undefined = 1 会污染），这也是用 void 0 替代 undefined 的由来。null 是关键字，typeof null === 'object' 是历史遗留 bug。",
    tags: ["保留字", "关键字", "undefined"],
  },
  {
    id: "jdg-lexicon-grammar-4",
    chapter: "jdg-lexicon-grammar",
    level: 4,
    question: "工程上如何稳妥处理分号风格？纯靠 ASI 不加任何防护有什么风险？",
    answer:
      "两种稳健做法：①每条语句末尾都写分号（主流风格），完全依赖显式分号，ASI 不介入，最安全可预测；②无分号风格——不写行尾分号，但以 ( [ ` + - 开头的行前加分号（行首防御），防止 ASI 把两行错误拼接。纯靠 ASI 不加任何防护的风险：以 ( [ ` + - 开头的行会被拼到上一行（如 a\\n(b+c) 解析成 a(b+c)），return/throw/break/continue 后换行会提前断句返回 undefined。这些 bug 在代码合并、压缩、移动语句位置时极易出现且难排查。工程原则：选一种风格贯彻到底，配合 ESLint 的 semi 或 @typescript-eslint/semi 规则强制一致性。",
    tags: ["ASI", "工程实践", "分号风格"],
  },
];
