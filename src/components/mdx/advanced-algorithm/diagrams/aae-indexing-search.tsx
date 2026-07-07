/**
 * <AaeIndexingSearchDiagram>：索引与搜索引擎架构图（advanced-algorithm 数据结构章）。
 *
 * 左侧构建流水线（accent 紫）：Document Collection → Tokenizer → Inverted Index（Term → Posting List）。
 * 右侧查询流水线（success 绿）：Query → Query Parser → Index Lookup → Ranker → Results。
 * 中间 Index Lookup → Inverted Index 的查询箭头（warning 黄），Ranker 标注 BM25 / TF-IDF 排序。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 左侧构建流水线（accent）
const DOCS = { x: 40, y: 92, w: 240, h: 44 };
const TOKENIZER = { x: 40, y: 168, w: 240, h: 44 };
const INDEX = { x: 40, y: 244, w: 240, h: 96 };

// 右侧查询流水线（success）
const QUERY = { x: 440, y: 92, w: 240, h: 44 };
const PARSER = { x: 440, y: 168, w: 240, h: 44 };
const LOOKUP = { x: 440, y: 244, w: 240, h: 44 };
const RANKER = { x: 440, y: 320, w: 240, h: 44 };
const RESULTS = { x: 440, y: 396, w: 240, h: 44 };

export function AaeIndexingSearchDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="索引与搜索引擎架构图。左侧构建流水线（紫色）：文档集合 → 分词器 → 倒排索引（词项 → 倒排表）。右侧查询流水线（绿色）：查询 → 查询解析器 → 索引查找 → 排序器 → 结果。中间索引查找到倒排索引用黄色箭头连接，排序器标注 BM25 / TF-IDF 排序。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="is-build" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="is-query" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
            <marker id="is-lookup" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            倒排索引 · 构建与查询
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            离线构建索引，在线查询索引——两条流水线在倒排表汇合
          </text>

          {/* 侧标题 */}
          <text x={DOCS.x + DOCS.w / 2} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            索引构建（离线）
          </text>
          <text x={QUERY.x + QUERY.w / 2} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            查询处理（在线）
          </text>

          {/* ===== 左侧构建节点 ===== */}
          <g>
            <rect x={DOCS.x} y={DOCS.y} width={DOCS.w} height={DOCS.h} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
            <text x={DOCS.x + DOCS.w / 2} y={DOCS.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">Document Collection</text>
            <text x={DOCS.x + DOCS.w / 2} y={DOCS.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>文档集合</text>
          </g>
          <g>
            <rect x={TOKENIZER.x} y={TOKENIZER.y} width={TOKENIZER.w} height={TOKENIZER.h} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
            <text x={TOKENIZER.x + TOKENIZER.w / 2} y={TOKENIZER.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">Tokenizer</text>
            <text x={TOKENIZER.x + TOKENIZER.w / 2} y={TOKENIZER.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>分词 · 归一化 · 去停用词</text>
          </g>
          <g>
            <rect x={INDEX.x} y={INDEX.y} width={INDEX.w} height={INDEX.h} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.8" />
            <text x={INDEX.x + INDEX.w / 2} y={INDEX.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">Inverted Index</text>
            <text x={INDEX.x + INDEX.w / 2} y={INDEX.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>倒排索引 · Term → Posting List</text>
            {/* 倒排表示意 */}
            <g fontFamily="monospace" fontSize="9.5" fill={primary}>
              <text x={INDEX.x + 14} y={INDEX.y + 56} fill={accent}>algorithm</text>
              <text x={INDEX.x + 92} y={INDEX.y + 56}>→ [1, 3, 7]</text>
              <text x={INDEX.x + 14} y={INDEX.y + 72} fill={accent}>search</text>
              <text x={INDEX.x + 92} y={INDEX.y + 72}>→ [2, 3, 5]</text>
              <text x={INDEX.x + 14} y={INDEX.y + 88} fill={accent}>index</text>
              <text x={INDEX.x + 92} y={INDEX.y + 88}>→ [1, 2, 6]</text>
            </g>
          </g>

          {/* ===== 右侧查询节点 ===== */}
          <g>
            <rect x={QUERY.x} y={QUERY.y} width={QUERY.w} height={QUERY.h} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
            <text x={QUERY.x + QUERY.w / 2} y={QUERY.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success} fontFamily="monospace">Query</text>
            <text x={QUERY.x + QUERY.w / 2} y={QUERY.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>用户查询 &quot;algorithm search&quot;</text>
          </g>
          <g>
            <rect x={PARSER.x} y={PARSER.y} width={PARSER.w} height={PARSER.h} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
            <text x={PARSER.x + PARSER.w / 2} y={PARSER.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success} fontFamily="monospace">Query Parser</text>
            <text x={PARSER.x + PARSER.w / 2} y={PARSER.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>查询解析 · 布尔/短语</text>
          </g>
          <g>
            <rect x={LOOKUP.x} y={LOOKUP.y} width={LOOKUP.w} height={LOOKUP.h} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
            <text x={LOOKUP.x + LOOKUP.w / 2} y={LOOKUP.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success} fontFamily="monospace">Index Lookup</text>
            <text x={LOOKUP.x + LOOKUP.w / 2} y={LOOKUP.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>索引查找 · 取倒排表</text>
          </g>
          <g>
            <rect x={RANKER.x} y={RANKER.y} width={RANKER.w} height={RANKER.h} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.8" />
            <text x={RANKER.x + RANKER.w / 2} y={RANKER.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={warning} fontFamily="monospace">Ranker</text>
            <text x={RANKER.x + RANKER.w / 2} y={RANKER.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>BM25 / TF-IDF 打分排序</text>
          </g>
          <g>
            <rect x={RESULTS.x} y={RESULTS.y} width={RESULTS.w} height={RESULTS.h} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
            <text x={RESULTS.x + RESULTS.w / 2} y={RESULTS.y + 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success} fontFamily="monospace">Results</text>
            <text x={RESULTS.x + RESULTS.w / 2} y={RESULTS.y + 35} textAnchor="middle" fontSize="10.5" fill={secondary}>排序结果返回</text>
          </g>

          {/* ===== 构建流水线箭头（accent，纵向） ===== */}
          <line x1={DOCS.x + DOCS.w / 2} y1={DOCS.y + DOCS.h} x2={TOKENIZER.x + TOKENIZER.w / 2} y2={TOKENIZER.y - 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#is-build)" />
          <line x1={TOKENIZER.x + TOKENIZER.w / 2} y1={TOKENIZER.y + TOKENIZER.h} x2={INDEX.x + INDEX.w / 2} y2={INDEX.y - 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#is-build)" />

          {/* ===== 查询流水线箭头（success，纵向） ===== */}
          <line x1={QUERY.x + QUERY.w / 2} y1={QUERY.y + QUERY.h} x2={PARSER.x + PARSER.w / 2} y2={PARSER.y - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#is-query)" />
          <line x1={PARSER.x + PARSER.w / 2} y1={PARSER.y + PARSER.h} x2={LOOKUP.x + LOOKUP.w / 2} y2={LOOKUP.y - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#is-query)" />
          <line x1={LOOKUP.x + LOOKUP.w / 2} y1={LOOKUP.y + LOOKUP.h} x2={RANKER.x + RANKER.w / 2} y2={RANKER.y - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#is-query)" />
          <line x1={RANKER.x + RANKER.w / 2} y1={RANKER.y + RANKER.h} x2={RESULTS.x + RESULTS.w / 2} y2={RESULTS.y - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#is-query)" />

          {/* ===== 中间：Index Lookup → Inverted Index（warning，横向） ===== */}
          <line x1={LOOKUP.x} y1={LOOKUP.y + LOOKUP.h / 2} x2={INDEX.x + INDEX.w + 2} y2={LOOKUP.y + LOOKUP.h / 2} stroke={warning} strokeWidth="1.8" strokeDasharray="6 3" markerEnd="url(#is-lookup)" />
          <text x={(INDEX.x + INDEX.w + LOOKUP.x) / 2} y={LOOKUP.y + LOOKUP.h / 2 - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>
            查询倒排表
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={464} x2={VIEW_W - 32} y2={464} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={486} textAnchor="middle" fontSize="11.5" fill={secondary}>
            构建一次，查询无数次——倒排索引是搜索引擎的核心
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        倒排索引架构：左侧离线构建（文档集合 → 分词器 → 倒排索引，词项映射到倒排表），右侧在线查询（查询 → 解析 → 索引查找 → BM25/TF-IDF 排序 → 结果），两条流水线在倒排表汇合。
      </figcaption>
    </figure>
  );
}
