/**
 * <GplTestingDiagram>：Go testing 推荐表驱动测试，Benchmark 基准分析性能，httptest+接口 mock 测试 HTTP。
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

export function GplTestingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go testing 包。表驱动测试是推荐方式，Benchmark 基准测试分析性能，httptest 测试 HTTP 处理器。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>测试：表驱动 · 基准 · httptest</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>表驱动推荐 · Benchmark 分析 · httptest mock</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>单元测试</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>Test 前缀</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>_test.go 文件</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>t.Errorf 失败</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>t.Parallel 并行</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>表驱动测试</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>结构体切片用例</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>循环执行</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>t.Run 子测试</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>数据逻辑分离</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>基准+HTTP</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>Benchmark 前缀</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>b.N 自动调整</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>httptest.NewRecorder</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>接口 mock 依赖</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>Go 无断言库（刻意设计） · 用原生 if + t.Errorf 代替</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>基准: ns/op 越快 · B/op allocs/op 越少 GC 压力越小</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go testing 推荐表驱动测试，Benchmark 基准分析性能，httptest+接口 mock 测试 HTTP。
      </figcaption>
    </figure>
  );
}
