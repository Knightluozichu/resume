/**
 * <DnmSosDumpDiagram>：SOS 调试——转储生成与分析流程。
 *
 * 展示从进程到 dump 文件，再用 SOS 命令分析的完整链路。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function DnmSosDumpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="SOS 调试转储流程。从运行中的 .NET 进程生成 dump 文件，再用 SOS 扩展命令分析堆、类型和根引用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            SOS 调试：转储生成与分析流程
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            进程快照 → dump 文件 → SOS 命令 → 内存诊断
          </text>

          {/* 第一层：生成 dump */}
          <rect x={50} y={76} width={150} height={68} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" />
          <text x={125} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>.NET 进程</text>
          <text x={125} y={116} textAnchor="middle" fontSize="10" fill={secondary}>运行中的托管应用</text>
          <text x={125} y={132} textAnchor="middle" fontSize="10" fill={secondary}>含 CLR + 托管堆</text>

          <line x1={200} y1={110} x2={240} y2={110} stroke={accent} strokeWidth="1.4" markerEnd="url(#dnm-sd-a1)" />
          <text x={220} y={102} textAnchor="middle" fontSize="10" fill={secondary}>生成</text>

          <rect x={240} y={76} width={170} height={68} rx="8" fill={elevated} stroke={warning} strokeWidth="1.4" strokeDasharray="4 3" />
          <text x={325} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>Dump 文件</text>
          <text x={325} y={116} textAnchor="middle" fontSize="10" fill={secondary}>进程内存快照</text>
          <text x={325} y={132} textAnchor="middle" fontSize="10" fill={secondary}>.dmp / 离线分析</text>

          <line x1={410} y1={110} x2={450} y2={110} stroke={warning} strokeWidth="1.4" markerEnd="url(#dnm-sd-a2)" />
          <text x={430} y={102} textAnchor="middle" fontSize="10" fill={secondary}>加载</text>

          <rect x={450} y={76} width={180} height={68} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" />
          <text x={540} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>SOS 扩展</text>
          <text x={540} y={116} textAnchor="middle" fontSize="10" fill={secondary}>.loadby sos clr</text>
          <text x={540} y={132} textAnchor="middle" fontSize="10" fill={secondary}>WinDbx / dotnet-dump</text>

          {/* 分隔线 */}
          <line x1={32} y1={166} x2={VIEW_W - 32} y2={166} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 第二层：SOS 核心命令 */}
          <text x={VIEW_W / 2} y={188} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            SOS 核心分析命令
          </text>

          {/* 命令卡片 */}
          <rect x={50} y={204} width={140} height={80} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={120} y={224} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">!dumpheap</text>
          <text x={120} y={242} textAnchor="middle" fontSize="10" fill={secondary}>遍历托管堆</text>
          <text x={120} y={258} textAnchor="middle" fontSize="10" fill={secondary}>统计类型与数量</text>
          <text x={120} y={274} textAnchor="middle" fontSize="10" fill={secondary}>找出大对象</text>

          <rect x={210} y={204} width={140} height={80} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={280} y={224} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">!gcroot</text>
          <text x={280} y={242} textAnchor="middle" fontSize="10" fill={secondary}>追溯根引用</text>
          <text x={280} y={258} textAnchor="middle" fontSize="10" fill={secondary}>找出谁持有对象</text>
          <text x={280} y={274} textAnchor="middle" fontSize="10" fill={secondary}>定位泄漏源</text>

          <rect x={370} y={204} width={140} height={80} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={440} y={224} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning} fontFamily="monospace">!dumpobj</text>
          <text x={440} y={242} textAnchor="middle" fontSize="10" fill={secondary}>查看对象详情</text>
          <text x={440} y={258} textAnchor="middle" fontSize="10" fill={secondary}>字段值与类型</text>
          <text x={440} y={274} textAnchor="middle" fontSize="10" fill={secondary}>方法表指针</text>

          <rect x={530} y={204} width={140} height={80} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={600} y={224} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger} fontFamily="monospace">!eeheap</text>
          <text x={600} y={242} textAnchor="middle" fontSize="10" fill={secondary}>CLR 内存统计</text>
          <text x={600} y={258} textAnchor="middle" fontSize="10" fill={secondary}>GC 堆/JIT/Loader</text>
          <text x={600} y={274} textAnchor="middle" fontSize="10" fill={secondary}>各堆大小</text>

          {/* 第三层：诊断结论 */}
          <line x1={32} y1={304} x2={VIEW_W - 32} y2={304} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <rect x={50} y={316} width={620} height={60} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={338} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            诊断结论输出
          </text>
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="10" fill={secondary}>
            内存泄漏类型 · 大对象分布 · 根引用链 · 碎片化程度 · 各代堆大小
          </text>

          <defs>
            <marker id="dnm-sd-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="dnm-sd-a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 底部注释 */}
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            生产环境用 dotnet-dump collect 生成 dump，离线用 dotnet-dump analyze 加载 SOS 分析
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SOS 转储分析流程：生成 dump → 加载 SOS → 核心命令诊断 → 定位内存问题。
      </figcaption>
    </figure>
  );
}
