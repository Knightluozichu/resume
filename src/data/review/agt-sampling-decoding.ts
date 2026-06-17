/** 复习题库 · 采样与解码（agt-sampling-decoding）。《从零构建 AI Agent》篇2·2·驾驭大模型，B 数学型，含手算/推导题。 */

import type { ReviewQuestion } from "./types";

export const agtSamplingDecodingQuestions: ReviewQuestion[] = [
  // ── L1 认记：定义 / 术语 ──
  {
    id: "agt-sd-1",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "什么是 logits？它和概率有什么区别？",
    answer:
      "**logits** 是模型为词表里每个候选 token 吐出的**原始分数**，有正有负、未归一，不能直接当概率。要经过 softmax 把它们变成全部相加为 1、各落在 0~1 之间的**概率**，才能用来挑 token。",
    tags: ["logits", "概率", "softmax"],
  },
  {
    id: "agt-sd-2",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "贪心解码（greedy decoding）和采样（sampling）各是怎么挑 token 的？",
    answer:
      "**贪心解码**永远挑概率最高的那个，不掺随机——结果确定、每次一字不差，但死板。**采样**按各候选的概率「掷骰子」随机挑——概率高的更易中、低的也有机会，带来多样性但不确定。",
    tags: ["贪心解码", "采样", "辨析"],
  },
  {
    id: "agt-sd-3",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "温度（temperature）$T$ 是干什么的？",
    answer:
      "$T$ 是个正数，控制概率分布的「陡峭度」：在 softmax 前把每个分数除以 $T$。$T$ 越小分布越陡（趋贪心、确定）、$T$ 越大分布越平（趋均匀、发散）。它只改「挑 token 的随机度」，不改谁本来分高。",
    tags: ["温度", "temperature"],
  },
  {
    id: "agt-sd-4",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "top-p（核采样）是怎么圈定采样范围的？",
    answer:
      "把候选按概率从高到低累加，只保留累积概率刚够到 $p$ 的最小候选集（这一小撮叫「核」nucleus），其余长尾砍掉，再在核里按概率采。比如 top-p=0.9 就是「只在累积前 90% 的候选里掷骰子」。",
    tags: ["top-p", "核采样"],
  },
  {
    id: "agt-sd-5",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "top-k 和 top-p 的区别是什么？",
    answer:
      "**top-k** 固定只留概率最高的前 $k$ 个候选再采，简单直接。**top-p** 留的是累积概率够 $p$ 的最小候选集，会随分布陡平**自适应**——陡时核里就一两个、平时自动放宽。所以实践中 top-p 更常用。",
    tags: ["top-k", "top-p", "辨析"],
  },
  {
    id: "agt-sd-6",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "写出带温度的 softmax 公式。",
    answer:
      "$$p_i = \\dfrac{\\exp(z_i / T)}{\\sum_{j} \\exp(z_j / T)}$$ 其中 $z_i$ 是第 $i$ 个候选的 logit、$T$ 是温度。它就是普通 softmax 多了一步「先把每个分数除以 $T$ 再算」。",
    tags: ["softmax", "温度", "公式"],
  },
  {
    id: "agt-sd-7",
    chapter: "agt-sampling-decoding",
    level: 1,
    question: "「一次采样」从 logits 到挑出一个 token 要走哪几步？",
    answer:
      "五步：① 原始 logits → ② softmax 归一成概率 → ③ 按温度重塑分布陡平 → ④ top-p 截断砍掉长尾 → ⑤ 在存活候选里掷骰子抽一个。温度在第③步动手脚、top-p 在第④步动手脚。",
    tags: ["采样流程", "五步"],
  },

  // ── L2 理解：辨析 / 因果 ──
  {
    id: "agt-sd-8",
    chapter: "agt-sampling-decoding",
    level: 2,
    question: "为什么 $T \\to 0$ 时带温度 softmax 会退化成贪心解码？",
    answer:
      "看最高分 $z_a$ 与次高分 $z_b$ 的概率比值 $p_a/p_b = \\exp((z_a - z_b)/T)$。当 $T \\to 0$，指数里的 $(z_a - z_b)/T \\to +\\infty$，比值 $\\to +\\infty$——最高分那个把概率几乎全占了，其余趋近 0。分布塌成一根独大，等于「永远挑最高的」即贪心。",
    tags: ["温度极限", "贪心", "推导"],
  },
  {
    id: "agt-sd-9",
    chapter: "agt-sampling-decoding",
    level: 2,
    question: "为什么 $T \\to \\infty$ 时分布会趋近均匀分布？",
    answer:
      "$T \\to \\infty$ 时每个 $z_j / T \\to 0$，于是每个 $\\exp(z_j/T) \\to \\exp(0) = 1$。代回公式，分子分母都成了「一堆 1」，每个 $p_i \\to 1/|V|$（$|V|$ 是候选个数）——也就是均匀分布，谁原始分高已无所谓，挑谁都一样。",
    tags: ["温度极限", "均匀分布", "推导"],
  },
  {
    id: "agt-sd-10",
    chapter: "agt-sampling-decoding",
    level: 2,
    question: "「调高温度 = 模型变聪明、答得更好」这句话对吗？",
    answer:
      "不对。温度只改「挑 token 的随机度」，**不改谁本来分高**——它给的是花样不是正确率。高温只是让模型更敢选冷门候选，并不会让它更懂。应把温度当「创意旋钮」而非「智力旋钮」。",
    tags: ["温度", "误区", "理解"],
  },
  {
    id: "agt-sd-11",
    chapter: "agt-sampling-decoding",
    level: 2,
    question: "softmax 实现里为什么常先「减去最大值」再取指数？",
    answer:
      "纯数值技巧：给分子分母同乘一个常数 $\\exp(-m)$（$m$ 为最大分数）结果不变，却能让指数的输入都 $\\le 0$，避免大分数取 $\\exp$ 溢出。不减最大值在分数大时可能算出 inf。",
    tags: ["softmax", "数值稳定", "理解"],
  },
  {
    id: "agt-sd-12",
    chapter: "agt-sampling-decoding",
    level: 2,
    question: "为什么说 top-p 比 top-k 更「自适应」？",
    answer:
      "top-k 固定留前 $k$ 个，不管分布形状——分布很陡时 $k$ 个里可能混进没用的，很平时又可能砍掉本该保留的。top-p 留的是「累积够 $p$」的候选：分布陡时核里自动只剩一两个、平时自动放宽到好几个，跟着分布形状走。",
    tags: ["top-p", "top-k", "自适应", "因果"],
  },

  // ── L3 应用：手算 / 选型 ──
  {
    id: "agt-sd-13",
    chapter: "agt-sampling-decoding",
    level: 3,
    question:
      "logits $z=[2,1,0]$，$T=1$ 时三个候选的概率约是多少？（$\\exp(2)\\approx7.39,\\ \\exp(1)\\approx2.72,\\ \\exp(0)=1$）",
    answer:
      "分子 $\\approx 7.39,\\ 2.72,\\ 1.00$，和 $\\approx 11.11$。所以 $p \\approx [0.665,\\ 0.245,\\ 0.090]$——最高的占大头。这就是 $T=1$（原始 softmax）下的分布。",
    tags: ["softmax", "手算", "应用"],
  },
  {
    id: "agt-sd-14",
    chapter: "agt-sampling-decoding",
    level: 3,
    question: "T=2 时和 T=1 时比，同一组 logits 的分布更陡还是更平？为什么？",
    answer:
      "更**平**。$T$ 越大，每个分数除以 $T$ 后差距被压得越小，softmax 出来的各概率越接近——最高的矮下去、矮的顶上来。$T=2$ 比 $T=1$ 多压了一道，分布自然更平、采样更随机。",
    tags: ["温度", "陡平", "应用"],
  },
  {
    id: "agt-sd-15",
    chapter: "agt-sampling-decoding",
    level: 3,
    question:
      "概率（已排好）$[0.55, 0.25, 0.12, 0.05, 0.03]$，top-p=0.9 会保留哪几个候选？",
    answer:
      "从高到低累加到首次 $\\ge 0.9$：$0.55 \\to 0.80 \\to 0.92$。第 3 个加完累积 0.92 已够 0.9，停。**保留前 3 个**（0.55、0.25、0.12），后两个长尾被砍，再在这 3 个里归一掷骰子。",
    tags: ["top-p", "手算", "应用"],
  },
  {
    id: "agt-sd-16",
    chapter: "agt-sampling-decoding",
    level: 3,
    question:
      "任务 (a) 把输入解析成固定格式 JSON、(b) 给文章起 10 个不同风格标题——分别该把 temperature 和 top-p 往哪调？",
    answer:
      "(a) 调**低** temperature（接近 0，甚至贪心）、收紧 top-p——要确定、可复现、格式不能错。(b) 调**高** temperature（如 0.9~1.2）、放宽 top-p（如 0.95）——要多样、十个各不相同，但 top-p 别拉满以兜住长尾免出乱码。",
    tags: ["选型", "确定性多样性权衡", "应用"],
  },

  // ── L4 综合：跨概念整合 / 反思 ──
  {
    id: "agt-sd-17",
    chapter: "agt-sampling-decoding",
    level: 4,
    question:
      "同事把 temperature 和 top-p 一起拉满想要「极致创意」，结果输出开始蹦乱码。结合本章解释原因，并给出更好做法。",
    answer:
      "高温已经把长尾候选的概率顶上来，top-p 又放得很宽（甚至 1.0），等于允许在一大堆离谱候选里掷骰子，自然抽到垃圾。两个旋钮别同时拉满：想要创意，常见做法是温度适度调高（如 0.8~1.0）、top-p 收在 0.9 左右——温度给花样、top-p 兜住长尾，二者配合才稳又有创意。",
    tags: ["温度", "top-p", "反思", "综合"],
  },
  {
    id: "agt-sd-18",
    chapter: "agt-sampling-decoding",
    level: 4,
    question:
      "把本章的 sample_next / llm() 和上一章的 messages / build_messages 串起来：tinyagent 到这一章具备了什么能力？为什么采样参数要收进 llm() 这层薄封装？",
    answer:
      "上一章 `build_messages` 把提示组装成 `messages`，本章 `sample_next` 实现了「从 logits 到一个 token」的采样、`llm(messages, temperature, top_p)` 把「组装好的纸条」和「采样旋钮」收口成唯一入口。收进薄封装是为了**不绑死某家 SDK**：全书上层 Agent 只调 `llm()`，换 provider 只改这一处函数体、采样参数顺着接口透传下去，降低过时风险。tinyagent 至此能真正「喂纸条、控风格、拿回话」。",
    tags: ["tinyagent", "llm 封装", "全书地图", "综合"],
  },
];
