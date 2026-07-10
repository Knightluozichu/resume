/**
 * <GiaTestingPackagingDiagram>：Go 测试与模块打包。
 *
 * 展示 testing 包、表驱动测试、benchmark、go module 与包组织。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function GiaTestingPackagingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 测试与打包：testing 包、表驱动测试、benchmark 基准测试、go module 模块管理。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            测试与打包：Go 的工程一体化
          `}</text>

          {/* 测试 */}
          <rect x={36} y={50} width={310} height={200} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`测试 testing 包`}</text>
          <text x={191} y={90} textAnchor="middle" fontSize="10" fill={secondary}>{`文件名 _test.go · 内置无需框架`}</text>
          <rect x={56} y={102} width={270} height={28} rx="4" fill={elevated} stroke={border} />
          <text x={191} y={120} textAnchor="middle" fontSize="10" fill={primary}>{`func TestXxx(t *testing.T)`}</text>
          <text x={191} y={142} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>{`表驱动测试（惯用模式）`}</text>
          <rect x={56} y={150} width={270} height={40} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeDasharray="3 2" />
          <text x={191} y={166} textAnchor="middle" fontSize="9" fill={secondary}>{`cases := []struct{in, want int}`}</text>
          <text x={191} y={180} textAnchor="middle" fontSize="9" fill={secondary}>{`for _, c := range cases { t.Run(...) }`}</text>
          <text x={191} y={204} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>{`基准测试 Benchmark`}</text>
          <text x={191} y={222} textAnchor="middle" fontSize="9" fill={secondary}>{`for i := 0; i &lt; b.N; i++ { ... }`}</text>
          <text x={191} y={238} textAnchor="middle" fontSize="9" fill={secondary}>{`go test -bench=. -benchmem`}</text>

          {/* 打包 */}
          <rect x={374} y={50} width={310} height={200} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`模块与打包 go module`}</text>
          <text x={529} y={90} textAnchor="middle" fontSize="10" fill={secondary}>{`go.mod · go.sum 版本锁定`}</text>
          <rect x={394} y={102} width={270} height={28} rx="4" fill={elevated} stroke={border} />
          <text x={529} y={120} textAnchor="middle" fontSize="10" fill={primary}>{`module github.com/me/app`}</text>
          <text x={529} y={142} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>{`包组织约定`}</text>
          <text x={529} y={160} textAnchor="middle" fontSize="9" fill={secondary}>{`cmd/ 入口 · pkg/ 库 · internal/ 私有`}</text>
          <text x={529} y={176} textAnchor="middle" fontSize="9" fill={secondary}>{`大写导出 · 小写私有 · 包名简短`}</text>
          <text x={529} y={200} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>{`构建与部署`}</text>
          <text x={529} y={218} textAnchor="middle" fontSize="9" fill={secondary}>{`go build · CGO_ENABLED=0 纯静态`}</text>
          <text x={529} y={234} textAnchor="middle" fontSize="9" fill={secondary}>{`单二进制 · 交叉编译 GOOS/GOARCH`}</text>

          {/* 命令速查 */}
          <line x1={36} y1={268} x2={684} y2={268} stroke={border} strokeWidth="1" />
          <text x={360} y={290} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>{`常用命令`}</text>
          <text x={120} y={314} textAnchor="middle" fontSize="10" fill={accent}>{`go test ./...`}</text>
          <text x={120} y={330} textAnchor="middle" fontSize="9" fill={secondary}>{`运行所有测试`}</text>
          <text x={300} y={314} textAnchor="middle" fontSize="10" fill={accent}>{`go test -cover`}</text>
          <text x={300} y={330} textAnchor="middle" fontSize="9" fill={secondary}>{`覆盖率`}</text>
          <text x={480} y={314} textAnchor="middle" fontSize="10" fill={accent}>{`go vet ./...`}</text>
          <text x={480} y={330} textAnchor="middle" fontSize="9" fill={secondary}>{`静态检查`}</text>
          <text x={620} y={314} textAnchor="middle" fontSize="10" fill={accent}>{`go mod tidy`}</text>
          <text x={620} y={330} textAnchor="middle" fontSize="9" fill={secondary}>{`整理依赖`}</text>
          <text x={360} y={362} textAnchor="middle" fontSize="11" fill={accent}>{`测试与构建零配置——Go 把工程工具链内置于语言生态`}</text>
          <text x={360} y={382} textAnchor="middle" fontSize="10" fill={secondary}>{`go test -race 检测数据竞争 · gofmt 统一代码风格`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 测试内置 testing 包（表驱动+benchmark），go module 管理依赖，单二进制交叉编译部署。
      </figcaption>
    </figure>
  );
}
