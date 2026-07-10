/**
 * <GplPackagesDiagram>：Go 包大写导出小写私有，internal 限制访问；go module 用语义化版本管理依赖。
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

export function GplPackagesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go 包与模块。大写导出小写私有，internal 包限制访问。go module 语义化版本管理依赖。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`包与模块：可见性与版本管理`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`大写导出小写私有 · internal 限制 · go module SemVer`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`包与可见性`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`大写=导出`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`小写=私有`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`一个目录一个包`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`internal 限制访问`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`go module`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`go.mod 声明`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`require 依赖`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`go mod tidy`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`go.sum 校验`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`语义化版本`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`vMAJOR.MINOR.PATCH`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`MAJOR 不兼容`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`v2+ 路径加 /v2`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`GOPROXY 代理`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`项目结构: cmd/(入口) + internal/(私有) + pkg/(公共)`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`internal 只能被父目录下的包导入`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 包大写导出小写私有，internal 限制访问；go module 用语义化版本管理依赖。
      </figcaption>
    </figure>
  );
}
