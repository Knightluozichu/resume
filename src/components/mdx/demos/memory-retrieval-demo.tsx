"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <MemoryRetrievalDemo>：长期记忆「语义检索」交互演示（HEL-301，《记忆系统 Memory》
 * 篇2·3，知识点 3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。长期记忆怎么找回相关的？不是关键词匹配，而是把
 * 内容变成向量（embedding），按「意思相近」（相似度）排序，找最相关的几条捞回窗口。
 * 这个 Demo 给一个查询（如「我的预算是多少？」），下方一组长期记忆条目各标一个 canned
 * 语义相似度分数，点查询后按相似度从高到低排序、高亮命中最相关那条。可切换不同查询看命中变化。
 *
 * 关键教学点（本 Demo 的灵魂）：**按「意思」找回（语义），不是按字面关键词**——查询「预算」
 * 能命中「打算花 500 块」（条目里根本没有「预算」二字），就是因为它们「意思相近」。
 *
 * 诚实声明：相似度分数为「按意思预估的示意值」，不是实时跑 embedding 模型算的。必有重置
 *（回到第一个查询、收起命中说明）。深的 embedding 机制留到 RAG 那章，这里只讲「按意思找回」
 * 这个直觉。
 *
 * 为何 client：查询切换按钮是真交互（受控状态），用状态直接排序 / 高亮——这是「语义检索」
 * 在「没法在线跑 embedding」约束下的落地（curated 数据，参考 ToolSchemaAnatomy 范式）。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

type Entry = {
  /** 长期记忆里存的一条内容。 */
  text: string;
  /** 这条内容相对当前查询的语义相似度（0–1，canned 示意值）。 */
  sim: number;
};

type Query = {
  id: string;
  /** 用户/大脑发出的查询。 */
  text: string;
  /** 这个查询为什么能按「意思」命中那条字面不同的记忆（点题）。 */
  insight: string;
  /** 各长期记忆条目相对该查询的相似度（curated）。 */
  entries: readonly Entry[];
};

// 四条固定的长期记忆条目（顺序稳定），不同查询给不同相似度。
// 教学点：查询里的字眼和命中条目的字眼往往**不一样**，靠的是「意思相近」。
const QUERIES: readonly Query[] = [
  {
    id: "budget",
    text: "我的预算是多少？",
    insight:
      "命中「打算花 500 块」——注意这条里根本没有「预算」二字！靠的是「预算」和「打算花多少钱」意思相近，不是字面匹配。",
    entries: [
      { text: "打算花 500 块", sim: 0.91 },
      { text: "想去上海", sim: 0.18 },
      { text: "喜欢靠窗的座位", sim: 0.12 },
      { text: "下午到就行", sim: 0.1 },
    ],
  },
  {
    id: "destination",
    text: "我要去哪个城市？",
    insight:
      "命中「想去上海」——查询问「去哪个城市」，「上海」是个城市名，意思最贴。其它条（预算、座位偏好）和「去哪」没什么关系，分数都低。",
    entries: [
      { text: "打算花 500 块", sim: 0.14 },
      { text: "想去上海", sim: 0.93 },
      { text: "喜欢靠窗的座位", sim: 0.21 },
      { text: "下午到就行", sim: 0.33 },
    ],
  },
  {
    id: "seat",
    text: "订票时座位怎么选？",
    insight:
      "命中「喜欢靠窗的座位」——查询问「座位怎么选」，这条直接讲座位偏好，意思最近。注意「下午到就行」也沾点边（都和出行偏好有关），但没靠窗那条贴。",
    entries: [
      { text: "打算花 500 块", sim: 0.16 },
      { text: "想去上海", sim: 0.19 },
      { text: "喜欢靠窗的座位", sim: 0.95 },
      { text: "下午到就行", sim: 0.41 },
    ],
  },
];

/** 把 0–1 相似度渲染成百分比文本。 */
const pct = (s: number) => `${Math.round(s * 100)}%`;

export function MemoryRetrievalDemo() {
  const [queryId, setQueryId] = useState<string>(QUERIES[0].id);
  const reset = () => setQueryId(QUERIES[0].id);

  const query = QUERIES.find((q) => q.id === queryId)!;
  // 按相似度从高到低排序——「找最相关的」。
  const ranked = [...query.entries].sort((a, b) => b.sim - a.sim);
  const topText = ranked[0].text;

  return (
    <DemoStage
      title="语义检索：长期记忆按「意思相近」找回，不是按字面关键词"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            换个查询看命中变化：
          </span>
          {QUERIES.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setQueryId(q.id)}
              aria-pressed={queryId === q.id}
              className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                queryId === q.id
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {q.text}
            </button>
          ))}
        </div>
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        {/* 查询行 */}
        <div className="mb-3 rounded-control border border-accent/50 bg-bg p-3">
          <p className="mb-1 text-xs font-semibold text-secondary">
            查询（大脑想从长期记忆里找回相关的）
          </p>
          <p className="text-sm font-semibold text-accent">「{query.text}」</p>
        </div>

        {/* 长期记忆条目，按相似度排序、高亮命中最相关那条 */}
        <p className="mb-2 text-xs font-semibold text-secondary">
          长期记忆里的条目（按语义相似度从高到低排序）
        </p>
        <div className="flex flex-col gap-2">
          {ranked.map((e, i) => {
            const hit = i === 0;
            return (
              <div
                key={e.text}
                className="flex items-center gap-3 rounded-control border px-3 py-2 transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: hit ? "var(--success)" : "var(--border)",
                  backgroundColor: hit ? "var(--bg-elevated)" : "transparent",
                  opacity: hit ? 1 : 0.62,
                }}
              >
                {/* 命中标记 / 排名 */}
                <span
                  className="w-12 shrink-0 text-center font-mono text-[11px] font-bold"
                  style={{
                    color: hit ? "var(--success)" : "var(--text-secondary)",
                  }}
                >
                  {hit ? "命中" : `#${i + 1}`}
                </span>
                {/* 条目内容 */}
                <span
                  className="flex-1"
                  style={{
                    color: hit ? "var(--success)" : "var(--text-primary)",
                    fontWeight: hit ? 600 : 400,
                  }}
                >
                  {e.text}
                </span>
                {/* 相似度条 + 百分比 */}
                <span className="flex w-28 shrink-0 items-center gap-2">
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-control bg-border">
                    <span
                      className="absolute inset-y-0 left-0 rounded-control"
                      style={{
                        width: pct(e.sim),
                        backgroundColor: hit
                          ? "var(--success)"
                          : "var(--accent)",
                        opacity: hit ? 1 : 0.6,
                      }}
                    />
                  </span>
                  <span
                    className="w-9 text-right font-mono text-[11px] tabular-nums"
                    style={{
                      color: hit ? "var(--success)" : "var(--text-secondary)",
                    }}
                  >
                    {pct(e.sim)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* 命中点题 */}
        <div className="mt-3 rounded-control border border-success/40 bg-bg p-3">
          <p className="mb-1 text-xs font-semibold text-success">
            找回了：「{topText}」
          </p>
          <p className="text-xs text-secondary">{query.insight}</p>
        </div>

        {/* 关键教学点强调 */}
        <p className="mt-3 rounded-control border border-warning/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-warning">最关键的一句</strong>：检索靠的是
          <strong className="text-primary">「意思相近」</strong>
          （把内容变成向量按相似度排），
          <strong className="text-primary">不是</strong>
          字面关键词匹配——所以查询「预算」能找回「打算花 500
          块」，哪怕这条里压根没有「预算」二字。
        </p>

        {/* 诚实声明 */}
        <p className="mt-2 text-[11px] leading-relaxed text-secondary">
          说明：上面的相似度分数为按意思
          <strong className="text-primary">预估的示意值</strong>
          （非实时跑 embedding
          模型）。真实里每条记忆和查询都会被转成向量，按向量「意思相近」算分排序。深一层的
          embedding 机制留到《RAG 检索增强生成》那章细讲。
        </p>
      </div>
    </DemoStage>
  );
}
