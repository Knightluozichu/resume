"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <ChunkingDemo>：文档「分块（chunk）切分」交互演示（HEL-305，《RAG 检索增强生成》
 * 篇3·1，知识点 3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。RAG 离线建库的第一刀：文档往往很长，得先切成
 * 一个个小块（chunk）再各自向量化。切分有讲究——切太大（一块塞太多，检索不精准、还占窗口）、
 * 切太小（丢上下文，一句话断章取义）；常带点重叠（overlap）保住跨块的连贯。
 *
 * 这个 Demo：给一段固定的示例长文档（按「字」为最小单位），两个滑块——chunk 大小、重叠——
 * 拖动实时把文档切成几块、画出每块边界、把相邻块的重叠区高亮。旁注随参数给出「切太大/太小」
 * 的利弊提示。必有重置（回默认 chunk=18、overlap=4）。
 *
 * 关键教学点：chunk 大小和重叠不是随便定的——它直接决定「每块塞多少上下文、跨块连不连贯、
 * 检索精不精准」。这是 RAG 检索质量的第一道闸。
 *
 * 为何 client：两个滑块是真交互（受控状态），用状态直接算切块 / 重叠区并渲染——这是
 * 「chunk 切分」在「没法在线跑」约束下的可视化落地（curated 文档，参考 ToolSchemaAnatomy /
 * TemperatureSamplingExplorer 范式）。颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

// 示例长文档（一段连贯的中文，按「字」切。真实里按 token 切，这里用字看个意思）。
const DOC =
  "小明上周买了一台咖啡机，用了三天发现漏水，他想退货。商家说自收货起七天内可以无理由退货，但要保持包装完好。小明赶紧把盒子找了回来。";

const DOC_LEN = DOC.length;

const INITIAL_SIZE = 18;
const INITIAL_OVERLAP = 4;
const SIZE_MIN = 6;
const SIZE_MAX = 40;
const OVERLAP_MIN = 0;
const OVERLAP_MAX = 12;

type Chunk = {
  /** 在文档中的起始下标（含）。 */
  start: number;
  /** 在文档中的结束下标（不含）。 */
  end: number;
  /** 这块文本。 */
  text: string;
};

/**
 * 把文档按 size / overlap 切成 chunk：每块长 size，下一块起点 = 上一块起点 + step，
 * 其中 step = size - overlap（重叠 overlap 个字）。step ≤ 0 视为非法（重叠 ≥ 块长）。
 */
function splitIntoChunks(
  text: string,
  size: number,
  overlap: number,
): Chunk[] {
  const step = size - overlap;
  if (step <= 0) return []; // 重叠 ≥ 块长 → 永远切不完，非法
  const chunks: Chunk[] = [];
  for (let start = 0; start < text.length; start += step) {
    const end = Math.min(start + size, text.length);
    chunks.push({ start, end, text: text.slice(start, end) });
    if (end >= text.length) break;
  }
  return chunks;
}

/** 该字符下标是否落在「与上一块的重叠区」里（用于高亮）。 */
function isOverlapChar(
  chunk: Chunk,
  charIdx: number,
  overlap: number,
  isFirst: boolean,
): boolean {
  if (isFirst || overlap <= 0) return false;
  // 重叠区 = 这块开头的 overlap 个字（它们也属于上一块的结尾）。
  return charIdx < chunk.start + overlap;
}

export function ChunkingDemo() {
  const [size, setSize] = useState(INITIAL_SIZE);
  const [overlap, setOverlap] = useState(INITIAL_OVERLAP);

  const reset = () => {
    setSize(INITIAL_SIZE);
    setOverlap(INITIAL_OVERLAP);
  };

  // 重叠不能 ≥ 块长，否则切不完——夹紧到 size-1。
  const effOverlap = Math.min(overlap, size - 1);
  const chunks = splitIntoChunks(DOC, size, effOverlap);

  // 旁注：按参数给「切太大 / 太小 / 重叠」的利弊提示。
  const sizeHint =
    size <= 9
      ? "块太小：一块就几个字，很容易把一句话拦腰断开，丢掉上下文（比如「七天内」和「退货」被切散）。"
      : size >= 34
        ? "块太大：一块塞了一大段，检索时不够精准（命中里混进无关内容），还更占上下文窗口。"
        : "块大小适中：每块是一两句完整的话，既保住上下文、检索又不至于太粗。";
  const overlapHint =
    effOverlap <= 0
      ? "没有重叠：相邻块的接缝处可能把一句话切两半，跨块的信息容易在边界丢失。"
      : "带点重叠：相邻块共享开头几个字（黄色高亮），跨块的句子在接缝处不至于被切断。";

  return (
    <DemoStage
      title="Chunk 切分：文档先切成小块，块大小与重叠都得调——这是检索质量的第一道闸"
      onReset={reset}
      controls={
        <>
          <Slider
            label="chunk 大小（每块几个字）"
            min={SIZE_MIN}
            max={SIZE_MAX}
            step={1}
            value={size}
            onChange={(v) => setSize(v)}
            format={(v) => `${v} 字`}
          />
          <Slider
            label="重叠 overlap（相邻块共享几个字）"
            min={OVERLAP_MIN}
            max={OVERLAP_MAX}
            step={1}
            value={overlap}
            onChange={(v) => setOverlap(v)}
            format={(v) => `${v} 字`}
          />
        </>
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        {/* 原文档 */}
        <p className="mb-1 text-xs font-semibold text-secondary">
          示例文档（共 {DOC_LEN} 字）
        </p>
        <p className="mb-4 rounded-control border border-border bg-bg p-3 text-[13px] leading-relaxed text-secondary">
          {DOC}
        </p>

        {/* 切出的 chunk 列表 */}
        <p className="mb-2 text-xs font-semibold text-secondary">
          切成了 <span className="text-accent">{chunks.length}</span> 块（黄色 =
          与上一块的重叠区）
        </p>
        <div className="flex flex-col gap-2">
          {chunks.map((c, ci) => {
            const isFirst = ci === 0;
            return (
              <div
                key={`${c.start}-${c.end}`}
                className="rounded-control border border-accent/50 bg-bg p-2"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-control bg-accent-glow px-1.5 py-0.5 font-mono text-[10px] font-bold text-accent">
                    chunk #{ci + 1}
                  </span>
                  <span className="font-mono text-[10px] text-secondary">
                    字 [{c.start}, {c.end})
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed">
                  {c.text.split("").map((ch, k) => {
                    const charIdx = c.start + k;
                    const overlapped = isOverlapChar(
                      c,
                      charIdx,
                      effOverlap,
                      isFirst,
                    );
                    return (
                      <span
                        key={k}
                        style={
                          overlapped
                            ? {
                                backgroundColor: "var(--warning)",
                                color: "var(--bg)",
                                borderRadius: "2px",
                                padding: "0 1px",
                              }
                            : { color: "var(--text-primary)" }
                        }
                      >
                        {ch}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>

        {/* 旁注：利弊提示 */}
        <div className="mt-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-1 text-xs leading-relaxed text-secondary">
            <strong className="text-accent">块大小</strong>：{sizeHint}
          </p>
          <p className="text-xs leading-relaxed text-secondary">
            <strong className="text-warning">重叠</strong>：{overlapHint}
          </p>
        </div>

        {/* 诚实声明 */}
        <p className="mt-2 text-[11px] leading-relaxed text-secondary">
          说明：这里为了直观<strong className="text-primary">按「字」</strong>
          切；真实 RAG 里通常按 token（或句子 / 段落）切，且会用更聪明的切法（按标点 /
          语义边界切），但「块大小 + 重叠」这两个旋钮的取舍是一样的。
        </p>
      </div>
    </DemoStage>
  );
}
