"use client";

import { MathGirlOfficialLab } from "./official-lab";

const volumes = [
  {
    number: "第1卷",
    subtitle: "数学女孩",
    color: "var(--accent)",
    chapters: [
      "数列和数学模型",
      "一封名叫数学公式的情书",
      "ω的华尔兹",
      "斐波那契数列和生成函数",
      "基本不等式",
      "在米尔嘉旁边",
      "卷积",
      "调和数",
      "泰勒展开与巴塞尔问题",
      "分拆数",
    ],
  },
  {
    number: "第2卷",
    subtitle: "费马大定理",
    color: "var(--success)",
    chapters: [
      "将无限宇宙尽收掌心",
      "勾股定理",
      "互质",
      "反证法",
      "分裂的质数",
      "阿贝尔群的眼泪",
      "以发型为模",
      "无穷递降法",
      "最美的数学公式",
      "费马大定理",
    ],
  },
  {
    number: "第3卷",
    subtitle: "哥德尔不完备定理",
    color: "var(--warning)",
    chapters: [
      "镜子的独白",
      "皮亚诺算术",
      "伽利略的犹豫",
      "无限接近的目的地",
      "莱布尼茨之梦",
      "ε-δ语言",
      "对角论证法",
      "两份孤独所衍生的产物",
      "令人迷惑的螺旋楼梯",
      "哥德尔不完备定理",
    ],
  },
  {
    number: "第4卷",
    subtitle: "随机算法",
    color: "var(--danger)",
    chapters: [
      "绝不会输的赌博",
      "积跬步，致千里",
      "171亿7986万9184份孤独",
      "可能性中的不确定性",
      "期望",
      "难以捉摸的未来",
      "矩阵",
      "孤零零的随机漫步",
      "坚强、正直、美丽",
      "随机算法",
    ],
  },
] as const;

const themeCases = [
  {
    label: "第1卷·发现",
    fields: [
      ["主线", "数列、生成函数、微积分与组合计数"],
      ["核心对象", "斐波那契、调和数、泰勒展开、分拆数"],
      ["证明动作", "从例子猜结构，再把结构一般化"],
      ["落点", "数学公式也是表达与对话"],
    ],
  },
  {
    label: "第2卷·证明",
    fields: [
      ["主线", "数论、群、模运算与无穷递降"],
      ["核心对象", "勾股数、互质、分裂质数、费马大定理"],
      ["证明动作", "反证、构造、同余、递降"],
      ["落点", "局部工具汇入一条长证明"],
    ],
  },
  {
    label: "第3卷·边界",
    fields: [
      ["主线", "形式系统、极限、无穷与不完备"],
      ["核心对象", "皮亚诺算术、ε-δ、对角论证、哥德尔句"],
      ["证明动作", "定义语言、编码命题、区分系统内外"],
      ["落点", "认识证明能力的边界"],
    ],
  },
  {
    label: "第4卷·不确定",
    fields: [
      ["主线", "概率、期望、矩阵与随机算法"],
      ["核心对象", "随机漫步、3-SAT、随机快速排序"],
      ["证明动作", "建立概率空间、求期望、控制失败率"],
      ["落点", "把不确定性纳入可复查分析"],
    ],
  },
] as const;

const bridgeCases = [
  {
    label: "数列→算法",
    fields: [
      ["第1卷", "递推、生成函数与调和数"],
      ["第4卷", "快排递推与期望比较次数"],
      ["桥梁", "把过程写成数列，再分析增长"],
      ["复习点", "Σ、Hn、Θ记号"],
    ],
  },
  {
    label: "反证→边界",
    fields: [
      ["第2卷", "反证法与无穷递降"],
      ["第3卷", "对角论证与不完备定理"],
      ["桥梁", "假设目标否定，再构造不可兼容对象"],
      ["复习点", "前提、量词、矛盾来源"],
    ],
  },
  {
    label: "代数→矩阵",
    fields: [
      ["第1卷", "函数、卷积与变换"],
      ["第4卷", "矩阵、线性变换与马尔可夫链"],
      ["桥梁", "用结构保存重复计算"],
      ["复习点", "复合、逆、特征值"],
    ],
  },
  {
    label: "计数→概率",
    fields: [
      ["第1卷", "组合数、卡特兰数与分拆"],
      ["第4卷", "概率公理、路径计数与随机算法"],
      ["桥梁", "先数清样本，再给事件赋概率"],
      ["复习点", "互斥、独立、期望线性"],
    ],
  },
] as const;

const routeCases = [
  {
    label: "顺序精读",
    fields: [
      ["顺序", "第1卷→第2卷→第3卷→第4卷"],
      ["适合", "第一次完整阅读"],
      ["节奏", "每章预测、推导、练习、回顾"],
      ["验收", "能复述本章问题如何推进"],
    ],
  },
  {
    label: "证明路线",
    fields: [
      ["入口", "第1卷基本不等式"],
      ["推进", "第2卷反证法与无穷递降"],
      ["高点", "第3卷对角论证与不完备"],
      ["回用", "第4卷概率上下界证明"],
    ],
  },
  {
    label: "算法路线",
    fields: [
      ["入口", "第1卷数列、递推与生成函数"],
      ["工具", "第2卷模运算"],
      ["边界", "第3卷形式系统"],
      ["应用", "第4卷查找、排序、SAT与随机化"],
    ],
  },
  {
    label: "回查路线",
    fields: [
      ["触发", "后章遇到不熟悉工具"],
      ["动作", "沿先修桥回到原章"],
      ["记录", "写下定义、一个例子、一个反例"],
      ["返回", "重新完成当前章推导"],
    ],
  },
] as const;

export function MglBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border-y border-border bg-elevated px-3 py-5 sm:px-5">
        <div className="mb-4 text-center">
          <div className="text-base font-semibold text-primary">
            数学女孩前四卷 · 40章学习地图
          </div>
          <div className="mt-1 text-xs text-secondary">
            发现结构 → 锤炼证明 → 追问边界 → 分析不确定性
          </div>
        </div>
        <div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="数学女孩前四卷40章完整学习地图"
        >
          {volumes.map((volume) => (
            <section
              key={volume.number}
              className="min-w-0 border-l-2 pl-3"
              style={{ borderColor: volume.color }}
            >
              <div className="mb-2">
                <div
                  className="text-sm font-semibold"
                  style={{ color: volume.color }}
                >
                  {volume.number}
                </div>
                <div className="text-xs text-secondary">{volume.subtitle}</div>
              </div>
              <ol className="space-y-0">
                {volume.chapters.map((chapter, index) => (
                  <li
                    key={chapter}
                    className="grid min-h-8 grid-cols-[1.5rem_minmax(0,1fr)] items-center border-t border-border/60 py-1 text-xs"
                  >
                    <span className="font-mono text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 break-words text-primary">
                      {chapter}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        权威目录对应前四卷各10章；专题导读只负责跨卷导航，不替代原书章节。
      </figcaption>
    </figure>
  );
}

export function MglVolumeThemeLab() {
  return (
    <MathGirlOfficialLab
      cases={themeCases}
      caption="四卷不是十个泛化主题，而是四条各自完整又彼此衔接的叙事与证明主线。"
      tone="cyan"
    />
  );
}

export function MglPrerequisiteBridgeLab() {
  return (
    <MathGirlOfficialLab
      cases={bridgeCases}
      caption="跨卷先修关系不是硬性关卡，而是后章遇到工具时可以往返的桥。"
      tone="amber"
    />
  );
}

export function MglReadingRouteLab() {
  return (
    <MathGirlOfficialLab
      cases={routeCases}
      caption="顺序精读保留故事推进；证明与算法路线用于复习，不能取代40章原始顺序。"
      tone="violet"
    />
  );
}
