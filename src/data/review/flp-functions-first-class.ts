import type { ReviewQuestion } from "./types";

/** 一等函数 复习题 */
export const flpFunctionsFirstClassQuestions: ReviewQuestion[] = [
  {
    id: "flp-functions-first-class-1",
    chapter: "flp-functions-first-class",
    level: 1,
    question: "什么是「一等函数」？一等函数有哪三种基本能力？",
    answer:
      "一等函数指函数与其他对象（如 int、str）地位平等，可被当作值来处理。三种基本能力：\n1. 赋值给变量：`f = len` 后 `f([1,2,3])` 等价于 `len([1,2,3])`。\n2. 作为参数传递：`sorted(words, key=len)` 把函数当参数传给高阶函数。\n3. 作为返回值：`def adder(n): return lambda x: x+n` 让函数工厂产出新函数。\n\n接收函数为参数或返回函数的函数叫高阶函数（map、sorted、filter、装饰器都建立在此基础上）。",
    tags: ["一等函数", "高阶函数", "函数即值"],
  },
  {
    id: "flp-functions-first-class-2",
    chapter: "flp-functions-first-class",
    level: 2,
    question: "`sorted(words, key=len)` 中 `key=len` 传的是函数还是调用结果？为什么不写 `key=len()`？",
    answer:
      "`key=len` 传的是**函数对象本身**（len 的引用），不是调用结果。\n\n原因：`key` 参数期望接收一个「接收元素、返回排序键」的函数。`sorted` 内部会对每个元素调用 `key(element)` 来计算排序键。如果写 `key=len()`，会立即调用 `len()`（无参数）抛 `TypeError`；即使能调用，传的也是某次调用的结果（一个固定值），而非函数。\n\n这是「函数即值」的体现：把函数当参数传递，由接收方（sorted）决定何时调用它。同理 `map(str.upper, words)` 传的也是函数对象 str.upper。",
    tags: ["key参数", "sorted", "高阶函数", "函数对象"],
  },
  {
    id: "flp-functions-first-class-3",
    chapter: "flp-functions-first-class",
    level: 3,
    question: "请用高阶函数实现一个 `make_tagger(tag)` 工厂，返回把字符串包进 HTML 标签的函数，并说明它如何体现「函数即返回值」。",
    answer:
      "```python\ndef make_tagger(tag: str):\n    def tagger(text: str) -> str:\n        return f\"<{tag}>{text}</{tag}>\"\n    return tagger          # 返回内部定义的函数\n\nb = make_tagger('b')      # b 是一个函数\ni = make_tagger('i')\nprint(b('hello'))         # <b>hello</b>\nprint(i('world'))         # <i>world</i>\n```\n\n体现「函数即返回值」：`make_tagger` 不返回数据，而返回一个**根据参数定制的新函数**。每次调用 `make_tagger('b')` 都产出一个闭包，它记住了 `tag='b'` 这个环境。这样 `b` 和 `i` 是两个行为不同但同源的函数——这就是工厂模式在函数式里的表达。装饰器本质就是这类「接收函数、返回函数」的高阶函数。",
    tags: ["工厂函数", "闭包", "高阶函数", "返回函数"],
  },
  {
    id: "flp-functions-first-class-4",
    chapter: "flp-functions-first-class",
    level: 4,
    question: "Python 同时支持高阶函数（map/filter/sorted）和推导式，社区更推荐哪种？请从可读性、性能、惰性三个维度综合分析取舍。",
    answer:
      "社区（含《流畅的 Python》）更推荐**推导式**处理「映射+过滤」类简单变换，map/filter 仅在需要把函数传给已有高阶函数（如 `key=`、`functools.reduce`）时使用。\n\n1. 可读性：`[x*x for x in nums if x > 0]` 一目了然，等价的 `list(map(lambda x: x*x, filter(lambda x: x>0, nums)))` 嵌套难读。推导式把「变换+条件」写在一个表达式里，符合人对列表构造的直觉。但纯映射 `map(str, items)` 有时可读性也不错，不必教条。\n2. 性能：在 CPython 里推导式通常略快于 map+lambda，因为推导式用了专用的字节码 LIST_APPEND，避免 lambda 调用开销；但 `map(str, items)`（传内置函数无 lambda）与推导式接近。差异通常不是瓶颈，不必为性能选型。\n3. 惰性：`map`/`filter` 返回迭代器（惰性），推导式（列表）立即求值。处理大数据流且只要迭代一次时，用 `map`/生成器表达式更省内存；需要多次遍历或随机访问用列表推导式。\n\n取舍口诀：简单变换用推导式更清晰；需要惰性管道或把函数传给 reduce/sorted/key 时用高阶函数。两者不是对立，组合使用最 Pythonic。",
    tags: ["推导式", "map/filter", "惰性", "可读性", "性能"],
  },
];
