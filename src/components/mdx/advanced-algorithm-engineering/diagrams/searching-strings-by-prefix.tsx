"use client";

import { useMemo, useState } from "react";

const prefixWords = [
  "ace",
  "acid",
  "act",
  "actor",
  "atlas",
  "atom",
  "attenuate",
  "auto",
  "by",
  "bye",
  "car",
] as const;

export function PaePrefixRangeLab() {
  const [prefix, setPrefix] = useState("at");
  const matches = prefixWords
    .map((word, index) => (word.startsWith(prefix) ? index : -1))
    .filter((index) => index >= 0);
  const left = matches[0] ?? -1;
  const right = matches.at(-1) ?? -1;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          查询前缀 P
          <input
            className="mt-2 h-10 w-full border border-border bg-background px-3 text-secondary outline-none focus:border-accent"
            value={prefix}
            maxLength={5}
            onChange={(event) => setPrefix(event.target.value.toLowerCase())}
          />
        </label>
        <div className="mt-4 grid grid-cols-4 gap-1 sm:grid-cols-11">
          {prefixWords.map((word, index) => (
            <div
              key={word}
              className={
                "min-w-0 border p-2 text-center text-xs " +
                (index >= left && index <= right && left >= 0
                  ? "border-accent bg-accent/15 font-semibold text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              <span className="break-all">{word}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">
          {left >= 0
            ? `连续区间 A[${left}, ${right}]，共 ${right - left + 1} 个结果`
            : "结果区间为空"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字典序中共享前缀的字符串必定连续；两次词典位置搜索即可确定左、右边界。
      </figcaption>
    </figure>
  );
}

export function PaePointerLocalityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-4">
          <div className="text-sm font-semibold text-primary">间接指针数组</div>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {["p7", "p2", "p9", "p1", "p6", "p4", "p8", "p3"].map((item) => (
              <span
                key={item}
                className="border border-border bg-elevated p-2 text-center text-xs text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
            指针相邻，正文可能散落在八个页面；每次比较和每个结果都可能触发随机
            I/O。
          </p>
        </div>
        <div className="border border-accent bg-accent/10 p-4">
          <div className="text-sm font-semibold text-accent">
            排序后连续字符串块
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {["ace", "acid", "act", "actor", "atlas", "atom", "auto", "by"].map(
              (item) => (
                <span
                  key={item}
                  className="border border-accent/40 bg-background p-2 text-center text-xs text-secondary"
                >
                  {item}
                </span>
              ),
            )}
          </div>
          <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
            每页只索引首串；命中块后顺序解码和报告，结果长度决定必要 I/O。
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        词典序连续不自动等于物理连续；把正文排序并按 B
        字符分块，才能把范围输出转为顺序扫描。
      </figcaption>
    </figure>
  );
}

const frontWords = [
  "alcatraz",
  "alcool",
  "alcyone",
  "anacleto",
  "ananas",
  "aster",
  "astral",
  "astronomy",
] as const;
function lcpLength(left: string, right: string) {
  let length = 0;
  while (
    length < left.length &&
    length < right.length &&
    left[length] === right[length]
  )
    length += 1;
  return length;
}

export function PaeFrontCodingLab() {
  const [cursor, setCursor] = useState(4);
  const pairs = frontWords.map((word, index) => {
    const lcp = index === 0 ? 0 : lcpLength(frontWords[index - 1], word);
    return { word, lcp, suffix: word.slice(lcp) };
  });
  const current = pairs[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input
          className="w-full accent-current"
          type="range"
          min="0"
          max={pairs.length - 1}
          value={cursor}
          onChange={(event) => setCursor(Number(event.target.value))}
          aria-label="前端编码字符串"
        />
        <div className="mt-4 grid grid-cols-4 gap-1 sm:grid-cols-8">
          {pairs.map((pair, index) => (
            <button
              key={pair.word}
              type="button"
              onClick={() => setCursor(index)}
              aria-pressed={cursor === index}
              className={
                "min-h-14 border px-1 text-[10px] " +
                (cursor === index
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              <span className="break-all">
                ({pair.lcp}, {pair.suffix})
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            前一串：{cursor === 0 ? "无" : frontWords[cursor - 1]}
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            复制前缀 {current.lcp} 字符
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-xs font-semibold text-accent">
            重建：{current.word}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Front Coding 保存与前一串的 LCP 长度和剩余后缀；块首或 LPFC
        复制点负责切断过长依赖链。
      </figcaption>
    </figure>
  );
}

const interpolationValues = [
  1, 2, 4, 5, 9, 10, 12, 17, 20, 27, 30, 36,
] as const;

export function PaeInterpolationSearchLab() {
  const [query, setQuery] = useState(18);
  const binWidth = 3;
  const bin = Math.min(11, Math.max(0, Math.floor((query - 1) / binWidth)));
  const low = 1 + bin * binWidth;
  const high = low + binWidth;
  const candidates = interpolationValues.filter(
    (value) => value >= low && value < high,
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          查询 y = {query}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="36"
            value={query}
            onChange={(event) => setQuery(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className={
                "min-h-14 border p-2 text-center text-[10px] " +
                (index === bin
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-muted")
              }
            >
              <div>B{index + 1}</div>
              <div className="mt-1">
                {1 + index * 3}..{3 + index * 3}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">
          直接定位 B{bin + 1}，候选集合：
          {candidates.length ? candidates.join(", ") : "空"}
          ；随后只在该小段二分。
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先按值域插值到候选 bin，再在 bin 内二分；成本由相邻 gap 的最大/最小比
        Delta 决定。
      </figcaption>
    </figure>
  );
}

export function PaeCompactedTrieDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-4">
          <div className="text-sm font-semibold text-primary">未压缩 Trie</div>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-secondary">
            root <span>→ a → t →</span>
            <span className="border border-border p-2">l</span>
            <span className="border border-border p-2">o</span>
            <span className="border border-border p-2">t</span>
          </div>
          <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
            单孩子路径每个字符一个节点，节点数最坏与总字符数 N 同阶。
          </p>
        </div>
        <div className="border border-accent bg-accent/10 p-4">
          <div className="text-sm font-semibold text-accent">压缩 Trie</div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-secondary">
            <span className="border border-accent p-2">root</span>
            <span>→</span>
            <span className="border border-accent p-2">&quot;at&quot;</span>
            <span>→</span>
            <span className="border border-accent p-2">l / om / tenuate</span>
          </div>
          <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
            一条长边只存 (string-id, begin, end)，每个内部节点至少二叉，总节点
            O(n)。
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        压缩单孩子路径后，结构空间从依赖字符总长 N 改为依赖字符串数
        n，边标签仍由原串切片解析。
      </figcaption>
    </figure>
  );
}

const blindCases = [
  {
    query: "attic",
    route: "a → t → t",
    interesting: "attenuate",
    lcp: 3,
    position: "atlas 与 attenuate 之间",
  },
  {
    query: "ato",
    route: "a → t → o",
    interesting: "atom",
    lcp: 3,
    position: "atom 之前",
  },
  {
    query: "autumn",
    route: "a → u",
    interesting: "auto",
    lcp: 2,
    position: "auto 之后、by 之前",
  },
] as const;

export function PaePatriciaBlindSearchLab() {
  const [choice, setChoice] = useState(0);
  const current = blindCases[choice];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {blindCases.map((item, index) => (
            <button
              key={item.query}
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
              {item.query}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            1. 盲下行
            <br />
            <strong className="text-primary">{current.route}</strong>
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            2. 只取一串
            <br />
            <strong className="text-primary">{current.interesting}</strong>
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            3. 计算 LCP
            <br />
            <strong className="text-primary">{current.lcp} 字符</strong>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            4. 回溯定位
            <br />
            <strong className="text-accent">{current.position}</strong>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Patricia 仅保留边首字符与节点深度；blind search
        先盲走到叶，再访问一条完整字符串校准词典位置。
      </figcaption>
    </figure>
  );
}

export function PaeStringBTreeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="mx-auto max-w-sm border border-accent bg-accent/10 p-3 text-center text-sm font-semibold text-accent">
          根页：Patricia routing table
        </div>
        <div className="mx-auto h-5 w-px bg-border" />
        <div className="grid grid-cols-3 gap-2">
          {["ace..actor", "atlas..auto", "by..car"].map((range) => (
            <div
              key={range}
              className="border border-border bg-background p-3 text-center text-xs text-secondary"
            >
              <strong className="text-primary">内部页</strong>
              <br />
              {range}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["叶块 D1", "叶块 D2", "叶块 D3"].map((item) => (
            <div
              key={item}
              className="border border-border bg-background p-3 text-center text-xs text-muted"
            >
              {item}
              <br />
              Theta(B) 个字符串指针
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        String B-Tree 把每页的路由表做成 Patricia 树，B
        叉层级定位块，再连续输出匹配字符串。
      </figcaption>
    </figure>
  );
}
