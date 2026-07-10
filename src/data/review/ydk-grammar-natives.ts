import type { ReviewQuestion } from "./types";

export const ydkGrammarNativesQuestions: ReviewQuestion[] = [
  {
    id: "ydk-grammar-natives-1",
    chapter: "ydk-grammar-natives",
    level: 2,
    question: `为什么 \`let s = \"hi\"; s.x = 1; console.log(s.x)\` 得到 \`undefined\`？`,
    answer:
      `s 是原始字符串，没有属性。第二行 s.x = 1 访问 s 的属性时，引擎临时用 new String(\"hi\") 装箱成一个包装对象，在包装对象上设置 x = 1，但这个包装对象是临时的，语句执行完立即被销毁——x 赋到了一个即将丢弃的对象上。第三行再次访问 s.x 时，又新建了一个全新的包装对象（没有 x 属性），所以得到 undefined。这就是「幽灵赋值」：写得到、读不到。原始值的属性访问永远是只读的临时装箱，赋值无法持久化。`,
    tags: ["包装类型", "装箱", "原始值"],
  },
  {
    id: "ydk-grammar-natives-2",
    chapter: "ydk-grammar-natives",
    level: 3,
    question: `\`new String(\"a\") === \"a\"\` 为什么是 \`false\`？如何避免这个坑？`,
    answer:
      `=== 类型不同直接返回 false。左侧 new String(\"a\") 是包装对象，typeof 是 \"object\"；右侧 \"a\" 是原始字符串，typeof 是 \"string\"。类型不同（object ≠ string），=== 直接判 false，不比值。更隐蔽的是 new String(\"a\") == new String(\"a\") 也是 false——对象用 == 比较看引用是否相同，两个独立对象引用不同。避免方法：永远用字面量 \"a\"/1/false 而非 new 包装类型；需要类型转换用 String(x)/Number(x)/Boolean(x)（无 new 的函数调用）；判断原始值用 typeof，判断对象用 instanceof 或 Array.isArray。记住「原始值用字面量，对象用 new，转换用函数」三类分清。`,
    tags: ["包装类型", "new", "严格相等", "typeof"],
  },
  {
    id: "ydk-grammar-natives-3",
    chapter: "ydk-grammar-natives",
    level: 3,
    question: `原生构造器有哪两类用途？哪些该 new、哪些可当函数、哪些应避免 new？`,
    answer:
      `推荐 new（创建对象）：Object/Array/Function/RegExp/Date/Error/Map/Set——它们创建的就是对象，无原始值形态。可当函数做显式转换（无 new）：String(123)→\"123\"、Number(\"9\")→9、Boolean(0)→false——显式转换的安全写法，比 123+\"\"/+\"9\"/!!0 更可读。应避免 new：new String/Number/Boolean 产生包装对象，typeof 是 \"object\"，与原始值比较会出错。Symbol/null/undefined 没有对应包装构造器。判断准则：要对象用 new，要转换用函数调用，原始值用字面量，绝不手动 new 包装类型。`,
    tags: ["原生构造器", "new", "显式转换"],
  },
  {
    id: "ydk-grammar-natives-4",
    chapter: "ydk-grammar-natives",
    level: 4,
    question: `运算符优先级和自动分号插入（ASI）各有什么坑？工程上如何规避？`,
    answer:
      `运算符优先级最易错的是 && 高于 ||（两者都高于 ?:），所以 a && b || c 是 (a && b) || c。记忆优先级表负担大且易错，工程上用括号显式表达结合意图——括号是给读代码的人看的。ASI 的坑：return 后换行会被补分号导致返回 undefined；行首以 [ 或 ( 开头可能与上一行合并。ASI 规则复杂且偶有反直觉，建议显式写分号不依赖 ASI 的「方便」。两者共同原则：把意图写在明处（括号表达结合、分号表达语句结束），不依赖引擎的隐式推断，代码更可读、更少踩坑。`,
    tags: ["运算符优先级", "ASI", "语法"],
  },
];
