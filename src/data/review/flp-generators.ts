import type { ReviewQuestion } from "./types";

/** 生成器 复习题 */
export const flpGeneratorsQuestions: ReviewQuestion[] = [
  {
    id: "flp-generators-1",
    chapter: "flp-generators",
    level: 1,
    question: `什么是生成器？\`yield\` 和 \`return\` 的关键区别是什么？`,
    answer:
      `生成器是用 \`yield\` 产出值的函数——调用它返回一个生成器对象，函数体不会立即执行。\n\n\`yield\` 与 \`return\` 的关键区别：\n1. \`return\` 返回值后函数终止、栈帧销毁；\`yield\` 产出值后**暂停**执行、保留栈帧（局部变量、执行位置），等下次 \`next()\` 调用时**恢复**继续执行。\n2. \`return\` 一次性结束；\`yield\` 可多次产出，函数自然结束或 return 时抛 \`StopIteration\` 表示迭代完成。\n\n所以生成器是「可暂停、可恢复」的函数，能逐个产出值而不一次性生成全部，实现惰性求值。`,
    tags: ["生成器", "yield", "暂停恢复", "惰性求值"],
  },
  {
    id: "flp-generators-2",
    chapter: "flp-generators",
    level: 2,
    question: `为什么生成器能处理「无限序列」而 list 不能？这种能力的代价是什么？`,
    answer:
      `能处理无限序列的原因：生成器是惰性的——它不预先计算所有值，而是每次 \`next()\` 时才计算并产出下一个。\`def naturals(): n=0; while True: n+=1; yield n\` 这个生成器永远不结束，但内存占用是 O(1)，因为任何时刻只保留当前状态。而 list 必须立即求值所有元素，无限序列会让它无限分配内存，物理上不可能。\n\n代价：\n1. 只能前向迭代一次——生成器是迭代器，耗尽即终止，不能像 list 那样反复遍历。\n2. 不支持随机索引——\`gen[i]\` 非法，因为元素尚未计算，要取第 i 个只能逐个 next。\n3. 不能获取长度——\`len(gen)\` 非法，因为可能无限。\n4. 不可切片——切片需要随机访问。\n\n所以生成器用「一次性、不可索引」换来了「惰性、省内存、可无限」。需要多次遍历或随机访问时，要么用 list，要么用 \`itertools.tee\` 复制（有内存代价）。`,
    tags: ["无限序列", "惰性求值", "代价", "迭代器"],
  },
  {
    id: "flp-generators-3",
    chapter: "flp-generators",
    level: 3,
    question: `请写一个生成器函数 \`fib()\` 产出斐波那契数，并用它打印前 10 项。说明生成器在管道（pipeline）中的优势。`,
    answer:
      `\`\`\`python\ndef fib():\n    a, b = 0, 1\n    while True:\n        yield b\n        a, b = b, a + b\n\nfrom itertools import islice\nprint(list(islice(fib(), 10)))\n# [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]\n\`\`\`\n\n管道优势：生成器可作为惰性管道的一环，把多个变换串起来而中间不产生完整 list。例如：\n\`\`\`python\nnums = (x*x for x in range(10**9))        # 生成器，不占内存\nevens = (x for x in nums if x % 2 == 0)   # 再接一个生成器\ntop10 = list(islice(evens, 10))           # 只取需要的 10 个\n\`\`\`\n\n这里 \`nums\`、\`evens\` 都是惰性的，即使 range 有 10 亿，最终只计算了取出 10 个偶数平方所需的次数。如果每步都用 list，中间会生成上亿元素撑爆内存。生成器管道让「过滤-映射-截取」的数据流处理内存恒定，这是大数据流处理的核心模式。`,
    tags: ["斐波那契", "生成器管道", "islice", "惰性"],
  },
  {
    id: "flp-generators-4",
    chapter: "flp-generators",
    level: 4,
    question: `生成器协程（yield 接收值）和普通生成器有何不同？用 \`send()\` 双向通信的意义是什么？这种模式与 async/await 有什么历史渊源？`,
    answer:
      `普通生成器是「生产者」——\`yield value\` 把值产出给调用方，单向。生成器协程让 yield 变成双向：\`received = yield value\`，调用方用 \`gen.send(x)\` 把值送回生成器，yield 表达式求值为 x。这样生成器既是生产者又是消费者，可与调用方双向通信。\n\nsend 的意义：\n1. 让生成器能根据外部输入决定下一步产出，实现状态机、协作式调度。\n2. 可作轻量协程——多个生成器协程交替执行，模拟并发而不需线程切换开销。\n\n示例：\n\`\`\`python\ndef averager():\n    total = count = 0\n    while True:\n        value = yield total / count if count else 0\n        total += value; count += 1\navg = averager(); next(avg)        # 预激\nprint(avg.send(10))  # 10.0\nprint(avg.send(20))  # 15.0\n\`\`\`\n\n与 async/await 的渊源：Python 早期（2.5 引入 send、3.3 引入 yield from）用生成器协程实现异步——\`@asyncio.coroutine\` + \`yield from\` 把生成器当协程调度。3.5 引入 \`async\`/\`await\` 是对生成器协程的语法化与规范化：\`await\` 本质类似 \`yield from\`，但原生协程（async def）与生成器分离，语义更清晰、性能更好。所以生成器协程是 async/await 的前身，理解 yield 的双向通信有助于理解事件循环如何挂起/恢复协程。现代代码应直接用 async/await，生成器协程只用于需「按需喂数据」的惰性消费者场景。`,
    tags: ["生成器协程", "send", "yield from", "async/await", "渊源"],
  },
];
