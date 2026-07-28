"use client";

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
