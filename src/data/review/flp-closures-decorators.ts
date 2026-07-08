import type { ReviewQuestion } from "./types";

/** 闭包与装饰器 复习题 */
export const flpClosuresDecoratorsQuestions: ReviewQuestion[] = [
  {
    id: "flp-closures-decorators-1",
    chapter: "flp-closures-decorators",
    level: 1,
    question: "什么是闭包？它「捕获」的到底是变量还是值？",
    answer:
      "闭包是「延伸了作用域的函数」——内部函数引用了外层函数的变量，即使外层函数已返回，内部函数仍能访问那些变量。\n\n闭包捕获的是**变量本身（引用）**，而非捕获那一刻的值。这意味着：若外层变量在闭包被调用前发生变化，闭包看到的是最新值（延迟绑定）。\n\n例如：\n```python\ndef make_adder():\n    n = 1\n    def add(x):\n        return x + n     # 捕获的是变量 n\n    n = 100               # 改了 n\n    return add\nprint(make_adder()(1))    # 101，不是 2 —— 看到的是 n 的最终值\n```\n\n这就是「闭包捕获变量而非值」的核心后果，也是循环闭包陷阱的根源。",
    tags: ["闭包", "捕获变量", "延迟绑定", "作用域"],
  },
  {
    id: "flp-closures-decorators-2",
    chapter: "flp-closures-decorators",
    level: 2,
    question: "`@timer` 装饰器等价于什么操作？为什么装饰器返回的 wrapper 需要用 `functools.wraps`？",
    answer:
      "`@timer` 加在 `def greet():` 上，等价于定义 greet 后执行 `greet = timer(greet)`——即把 greet 这个名字重新绑定到 `timer(greet)` 的返回值（wrapper）。调用 `greet()` 实际执行的是 wrapper，wrapper 内部再调用原 greet。\n\n需要 `functools.wraps(func)` 的原因：wrapper 是新函数，它的 `__name__`、`__doc__`、`__module__` 等元信息默认是 wrapper 自己的，会把原函数的元信息抹掉。这会让调试、文档生成、反射（如 FastAPI 依赖签名）失效。`@wraps(func)` 把原函数的元信息复制到 wrapper 上，让 wrapper「看起来像」原函数。这是写装饰器的标配，不写会导致 `greet.__name__` 变成 `'wrapper'`。",
    tags: ["装饰器", "@timer", "functools.wraps", "元信息"],
  },
  {
    id: "flp-closures-decorators-3",
    chapter: "flp-closures-decorators",
    level: 3,
    question: "下面代码输出 `[2, 2]` 而非 `[0, 1]`，请用闭包捕获机制解释，并给出修复方案。`fns = [lambda: i for i in range(2)]; print([f() for f in fns])`",
    answer:
      "原因：列表推导式里的 `lambda: i` 是闭包，捕获的是变量 **i**（引用），不是推导式每次迭代时 i 的值。推导式执行完后，i 的最终值是 1（range(2) 最后一次 i=1）。等到真正调用 `f()` 时，所有闭包都去读 i，而 i 此时是 1，所以 `[f() for f in fns]` 得到 `[1, 1]`（题目说 [2,2] 应是 range(3) 的情形，原理相同）。\n\n这是「延迟绑定」的典型陷阱：闭包在**调用时**才求值 i，而非定义时。\n\n修复方案——把当前值绑定为默认参数（默认参数在定义时求值）：\n```python\nfns = [lambda i=i: i for i in range(2)]   # i=i 把当前 i 绑进默认参数\nprint([f() for f in fns])                  # [0, 1]\n```\n或用 `functools.partial`：`fns = [partial(lambda x: x, i) for i in range(2)]`。本质都是「把循环变量的值在定义时固化下来」，避免闭包延迟读到最终值。",
    tags: ["闭包陷阱", "循环闭包", "默认参数", "延迟绑定"],
  },
  {
    id: "flp-closures-decorators-4",
    chapter: "flp-closures-decorators",
    level: 4,
    question: "请实现一个带参数的 `@retry(times=3)` 装饰器，并解释「装饰器工厂」的三层嵌套结构为何必要。",
    answer:
      "```python\nimport functools\n\ndef retry(times=3):\n    def decorator(func):              # 第 2 层：接收被装饰函数\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs): # 第 3 层：实际替换 func 的包装\n            for attempt in range(times):\n                try:\n                    return func(*args, **kwargs)\n                except Exception:\n                    if attempt == times - 1:\n                        raise\n        return wrapper\n    return decorator                  # 第 1 层返回 decorator\n\n@retry(times=3)\ndef call_api(): ...\n# 等价于 call_api = retry(times=3)(call_api)\n```\n\n三层嵌套必要的原因：\n1. 第 1 层 `retry(times=3)`：接收装饰器参数，返回真正的装饰器。因为 `@retry(times=3)` 会先调用 `retry(times=3)`，它的返回值才是装饰 `call_api` 的函数。\n2. 第 2 层 `decorator(func)`：接收被装饰函数，返回包装。这是无参装饰器的角色。\n3. 第 3 层 `wrapper(*args, **kwargs)`：实际替代原函数的包装，用闭包捕获 func 和 times，实现重试逻辑。\n\n之所以不能合并：参数（times）和被装饰函数（func）是**两个不同时刻**传入的——times 在 `@retry(times=3)` 求值时传入，func 在装饰阶段传入，调用时的 *args 又是第三个时刻。每一层闭包对应一个参数传入时机，缺一层就无法区分「装饰器参数」和「被装饰函数」。这是带参装饰器的标准模式。",
    tags: ["带参装饰器", "装饰器工厂", "三层嵌套", "functools.wraps"],
  },
];
