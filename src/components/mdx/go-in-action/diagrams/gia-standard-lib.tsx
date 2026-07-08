/**
 * <GiaStandardLibDiagram>：Go 标准库全景与分层。
 *
 * 展示 io/net/encoding/sync 等核心标准库及「电池齐全」理念。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const GROUPS = [
  { title: "IO 与文件", color: accent, items: ["io / io/fs", "os", "bufio", "path/filepath"], x: 36 },
  { title: "网络", color: success, items: ["net/http", "net", "net/url", "context"], x: 200 },
  { title: "编码", color: warning, items: ["encoding/json", "encoding/xml", "encoding/base64", "fmt"], x: 364 },
  { title: "并发与同步", color: danger, items: ["sync", "sync/atomic", "time", "runtime"], x: 528 },
];

export function GiaStandardLibDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 标准库分层：IO文件、网络、编码、并发同步四大组，电池齐全无需外部依赖。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go 标准库：电池齐全（Batteries Included）
          </text>

          {GROUPS.map((g) => (
            <g key={g.title}>
              <rect x={g.x} y={50} width={156} height={150} rx="10" fill={g.color} fillOpacity="0.06" stroke={g.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={g.x + 78} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={g.color}>{g.title}</text>
              {g.items.map((item, i) => (
                <g key={item}>
                  <rect x={g.x + 14} y={84 + i * 28} width={128} height={22} rx="4" fill={elevated} stroke={border} />
                  <text x={g.x + 78} y={100 + i * 28} textAnchor="middle" fontSize="10" fill={primary}>{item}</text>
                </g>
              ))}
            </g>
          ))}

          {/* 设计理念 */}
          <line x1={36} y1={220} x2={684} y2={220} stroke={border} strokeWidth="1" />
          <text x={360} y={242} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>标准库设计理念</text>
          <g>
            <rect x={60} y={258} width={200} height={56} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.5" />
            <text x={160} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>io.Reader/Writer</text>
            <text x={160} y={296} textAnchor="middle" fontSize="9" fill={secondary}>统一抽象 · 组合管道</text>
            <text x={160} y={310} textAnchor="middle" fontSize="9" fill={secondary}>io.Copy 万能拷贝</text>
          </g>
          <g>
            <rect x={280} y={258} width={200} height={56} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeOpacity="0.5" />
            <text x={380} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>context.Context</text>
            <text x={380} y={296} textAnchor="middle" fontSize="9" fill={secondary}>超时/取消/值传递</text>
            <text x={380} y={310} textAnchor="middle" fontSize="9" fill={secondary}>贯穿调用链</text>
          </g>
          <g>
            <rect x={500} y={258} width={160} height={56} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeOpacity="0.5" />
            <text x={580} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>interface 隐式</text>
            <text x={580} y={296} textAnchor="middle" fontSize="9" fill={secondary}>小接口 · 组合</text>
            <text x={580} y={310} textAnchor="middle" fontSize="9" fill={secondary}>error 是值</text>
          </g>

          <text x={360} y={346} textAnchor="middle" fontSize="11" fill={accent}>一个 HTTP 服务只需 net/http，无需 Express/Spring 等框架</text>
          <text x={360} y={366} textAnchor="middle" fontSize="10" fill={secondary}>标准库覆盖 90% 常见需求 · 第三方库遵循标准库接口风格</text>
          <text x={360} y={386} textAnchor="middle" fontSize="10" fill={secondary}>go list std 查看全部 · godoc 离线文档 · pkg.go.dev 在线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 标准库电池齐全：io.Reader/Writer 统一抽象、context 贯穿调用链、interface 隐式组合。
      </figcaption>
    </figure>
  );
}
