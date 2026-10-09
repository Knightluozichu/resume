"use client";

import { useState } from "react";

type EvidenceLayer = "catalog" | "text" | "guide";

const layers: Record<
  EvidenceLayer,
  {
    label: string;
    color: string;
    heading: string;
    examples: string[];
    limit: string;
  }
> = {
  catalog: {
    label: "书目与目录",
    color: "border-emerald-500 bg-emerald-500/10",
    heading: "目前可确认",
    examples: ["推荐序一的署名为邵明路", "本页对应的目录位置是推荐序一"],
    limit: "只能确认书目身份与目录范围；不能据此概括推荐序内容。",
  },
  text: {
    label: "推荐序正文",
    color: "border-amber-500 bg-amber-500/10",
    heading: "需要取得文本后核验",
    examples: ["推荐者实际提出了什么判断？", "判断依赖哪些例子、证据或限定？"],
    limit: "未取得正文时，不写成事实，不编造引文，也不把推测归给推荐者。",
  },
  guide: {
    label: "本站阅读导引",
    color: "border-sky-500 bg-sky-500/10",
    heading: "可以独立提出的问题",
    examples: [
      "我读到的评价，哪些是事实、解释或价值判断？",
      "正文提供了什么证据，什么仍待验证？",
    ],
    limit: "这些是本站的阅读方法，不是对邵明路观点的复述。",
  },
};

export function Eex19Recommendation01ReadingBoundaryLab() {
  const [active, setActive] = useState<EvidenceLayer>("catalog");
  const layer = layers[active];

  return (
    <section
      aria-labelledby="eex19-recommendation-01-boundary-title"
      className="not-prose my-6 rounded-card border border-border bg-surface p-4 text-primary sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
        阅读前工具 · 证据边界
      </p>
      <h3
        id="eex19-recommendation-01-boundary-title"
        className="mt-1 text-lg font-semibold"
      >
        先分清“知道什么”与“还要读什么”
      </h3>
      <p className="mt-2 text-sm leading-6 text-secondary">
        选择一个证据层级，检查一句话是否有足够来源支持。切换只改变当前提示，不会生成对原文的结论。
      </p>

      <div
        className="mt-4 grid gap-2 sm:grid-cols-3"
        role="group"
        aria-label="选择证据层级"
      >
        {(
          Object.entries(layers) as [
            EvidenceLayer,
            (typeof layers)[EvidenceLayer],
          ][]
        ).map(([id, item]) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => setActive(id)}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === id
                ? item.color
                : "border-border bg-surface hover:border-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={`mt-4 rounded-control border-l-4 p-4 ${layer.color}`}
        aria-live="polite"
      >
        <h4 className="font-semibold">{layer.heading}</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
          {layer.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-6">
          <strong>边界：</strong>
          {layer.limit}
        </p>
      </div>
      <p className="mt-3 text-xs leading-5 text-secondary">
        使用规则：正文未核验的命题，先记为问题或假设；取得原文后再标注页码、上下文和自己的解释。
      </p>
    </section>
  );
}
