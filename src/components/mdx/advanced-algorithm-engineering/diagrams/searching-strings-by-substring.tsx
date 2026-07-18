"use client";

import { useState } from "react";

const bananaSuffixes = [
  [6, "$"],
  [5, "a$"],
  [3, "ana$"],
  [1, "anana$"],
  [0, "banana$"],
  [4, "na$"],
  [2, "nana$"],
] as const;
const bananaLcp = [0, 0, 1, 3, 0, 0, 2] as const;

export function PaeSuffixReductionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-[180px_1fr] sm:p-5">
        <div className="border border-accent bg-accent/10 p-4">
          <div className="text-xs text-muted">文本 T</div>
          <div className="mt-2 font-semibold text-accent">banana$</div>
          <div className="mt-4 text-xs text-muted">模式 P</div>
          <div className="mt-2 font-semibold text-primary">ana</div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["banana$", "anana$", "nana$", "ana$", "na$", "a$", "$"].map(
            (suffix, index) => (
              <div
                key={suffix}
                className={
                  "border p-3 text-xs " +
                  (suffix.startsWith("ana")
                    ? "border-success bg-success/10 font-semibold text-success"
                    : "border-border bg-background text-secondary")
                }
              >
                <div className="text-[10px] text-muted">suffix {index}</div>
                {suffix}
              </div>
            ),
          )}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        P 在位置 i 出现，当且仅当 P 是后缀 T[i..n]
        的前缀；子串搜索因此归约为后缀字典的前缀搜索。
      </figcaption>
    </figure>
  );
}

const suffixQueries = ["ana", "na", "ban", "x"] as const;

export function PaeSuffixArraySearchLab() {
  const [query, setQuery] = useState("ana");
  const hits = bananaSuffixes.filter(([, suffix]) => suffix.startsWith(query));
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {suffixQueries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              aria-pressed={query === item}
              className={
                "h-10 border text-xs font-semibold " +
                (query === item
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1">
          {bananaSuffixes.map(([position, suffix]) => (
            <div
              key={position}
              className={
                "min-w-0 border p-2 text-center text-[10px] " +
                (suffix.startsWith(query)
                  ? "border-success bg-success/10 text-success"
                  : "border-border bg-background text-secondary")
              }
            >
              <div className="truncate">{suffix}</div>
              <div className="mt-1 text-muted">SA={position}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">
          {hits.length
            ? `连续命中 ${hits.length} 个后缀；出现位置 ${hits.map(([position]) => position).join(", ")}`
            : "后缀区间为空，模式不出现"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SA 只保存各后缀起点；以 P
        为前缀的后缀形成连续区间，区间内整数就是文本出现位置。
      </figcaption>
    </figure>
  );
}

export function PaeKasaiLcpLab() {
  const [row, setRow] = useState(3);
  const previous = row > 0 ? bananaSuffixes[row - 1][1] : "无";
  const current = bananaSuffixes[row][1];
  const lcp = bananaLcp[row];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input
          className="w-full accent-current"
          type="range"
          min="1"
          max={bananaSuffixes.length - 1}
          value={row}
          onChange={(event) => setRow(Number(event.target.value))}
          aria-label="LCP 数组行"
        />
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">
            前一有序后缀
            <br />
            <strong className="text-primary">{previous}</strong>
          </div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">
            当前后缀
            <br />
            <strong className="text-primary">{current}</strong>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-sm text-secondary">
            LCP 长度
            <br />
            <strong className="text-accent">{lcp}</strong>
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          {bananaLcp.map((value, index) => (
            <span
              key={index}
              className={
                "grid h-10 flex-1 place-items-center border text-xs " +
                (index === row
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-muted")
              }
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kasai 按文本起点顺序处理后缀；前一步已知 LCP 去掉首字符后至少保留
        h-1，比较指针整体只向右移动。
      </figcaption>
    </figure>
  );
}

export function PaeSkewConstructionMap() {
  const text = "mississippi$";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-12 gap-1">
          {Array.from(text).map((char, index) => {
            const residue = (index + 1) % 3;
            const sampled = residue === 0 || residue === 2;
            return (
              <div
                key={index}
                className={
                  "border p-2 text-center text-xs " +
                  (sampled
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-background text-secondary")
                }
              >
                <div>{char}</div>
                <div className="mt-1 text-[10px] text-muted">
                  {index + 1} mod3={residue}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            <strong className="text-accent">Step 1</strong>
            <br />
            排序 residue 2/0 的三元组并递归命名
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            <strong className="text-primary">Step 2</strong>
            <br />
            用字符与采样 rank 排序 residue 1
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            <strong className="text-primary">Step 3</strong>
            <br />
            用一或两个字符加 rank 线性归并
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Skew 的 2/3 与 1/3
        非对称划分，使跨组后缀比较可化为常数字段的原子项比较。
      </figcaption>
    </figure>
  );
}

const treeQueries = [
  { pattern: "ana", route: "root → a → na", leaves: [1, 3], ok: true },
  { pattern: "na", route: "root → na", leaves: [2, 4], ok: true },
  {
    pattern: "anas",
    route: "root → a → na → mismatch s/$",
    leaves: [],
    ok: false,
  },
] as const;

export function PaeSuffixTreeSearchLab() {
  const [choice, setChoice] = useState(0);
  const current = treeQueries[choice];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {treeQueries.map((item, index) => (
            <button
              key={item.pattern}
              type="button"
              onClick={() => setChoice(index)}
              aria-pressed={choice === index}
              className={
                "h-10 border text-xs font-semibold " +
                (choice === index
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              {item.pattern}
            </button>
          ))}
        </div>
        <div className="mt-4 border border-border bg-background p-4 text-center text-sm text-secondary">
          {current.route}
        </div>
        <div
          className={
            "mt-3 border p-3 text-center text-sm font-semibold " +
            (current.ok
              ? "border-success bg-success/10 text-success"
              : "border-danger bg-danger/10 text-danger")
          }
        >
          {current.ok
            ? `扩展 locus 下的叶：${current.leaves.join(", ")}，即全部出现位置`
            : "边内 mismatch，模式不存在"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后缀树沿唯一长边路径消费 P；完整匹配后，扩展 locus
        的全部后代叶就是出现位置。
      </figcaption>
    </figure>
  );
}

export function PaeSaTreeConversionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-[1fr_80px_1fr] sm:p-5">
        <div className="border border-border bg-background p-4">
          <div className="text-sm font-semibold text-primary">SA + LCP</div>
          <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
            {bananaSuffixes.map(([position, suffix], index) => (
              <span key={position} className="bg-elevated p-2 text-secondary">
                {suffix} · {bananaLcp[index]}
              </span>
            ))}
          </div>
        </div>
        <div className="grid place-items-center text-center text-xs font-semibold text-accent">
          线性
          <br />
          互转
        </div>
        <div className="border border-accent bg-accent/10 p-4">
          <div className="text-sm font-semibold text-accent">Suffix Tree</div>
          <div className="mt-3 space-y-2 text-xs text-secondary">
            <div className="border border-accent/40 bg-background p-2">
              栈维护递增节点深度
            </div>
            <div className="border border-accent/40 bg-background p-2">
              LCP 上升时拆边建内部节点
            </div>
            <div className="border border-accent/40 bg-background p-2">
              按 SA 顺序挂入新叶
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        树的词典序叶序就是 SA，内部节点深度按中序产生 LCP；反向用 LCP 栈可在
        O(n) 内恢复树。
      </figcaption>
    </figure>
  );
}

const suffixLinks = [
  ["ssi", "si"],
  ["issi", "ssi"],
  ["ana", "na"],
  ["ab", "b"],
] as const;

export function PaeMcCreightSuffixLinkLab() {
  const [choice, setChoice] = useState(0);
  const [from, to] = suffixLinks[choice];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {suffixLinks.map(([source], index) => (
            <button
              key={source}
              type="button"
              onClick={() => setChoice(index)}
              aria-pressed={choice === index}
              className={
                "h-10 border text-xs font-semibold " +
                (choice === index
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              {source}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-4">
          <span className="border border-accent bg-accent/15 p-4 font-semibold text-accent">
            locus &quot;{from}&quot;
          </span>
          <span className="text-sm text-secondary">drop first char →</span>
          <span className="border border-success bg-success/10 p-4 font-semibold text-success">
            locus &quot;{to}&quot;
          </span>
        </div>
        <p className="mb-0 mt-4 text-center text-xs leading-5 text-secondary">
          插入下一个后缀时先沿 suffix link
          跳到已知公共部分，再只扫描尚未确认的尾部。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Suffix link 把 s[z]=a·s[z&apos;]
        的内部节点相连，复用前一后缀的匹配信息，避免从根重复扫描。
      </figcaption>
    </figure>
  );
}
