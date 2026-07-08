/**
 * <GiaGoPhilosophyDiagram>：Go 设计哲学：少即是多与并发原生。
 *
 * 展示 Go 的核心理念：简洁语法、快速编译、原生并发、工程务实。
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

const PILLARS = [
  { title: "少即是多", desc: "25 个关键字\n无继承无泛型(1.18前)\n显式优于隐式", color: accent },
  { title: "快速编译", desc: "无头文件\n依赖明确\n秒级构建大项目", color: success },
  { title: "原生并发", desc: "goroutine 轻量\nchannel 通信\nCSP 模型", color: warning },
  { title: "工程务实", desc: "gofmt 统一风格\n内置测试\n一处构建部署", color: danger },
];

export function GiaGoPhilosophyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 设计哲学四大支柱：少即是多、快速编译、原生并发、工程务实。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go 设计哲学：为工程而生
          </text>

          {/* 中心 Gopher 图标化 */}
          <circle cx={360} cy={120} r={32} fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="2" />
          <text x={360} y={126} textAnchor="middle" fontSize="20" fontWeight="700" fill={accent}>Go</text>

          {/* 四大支柱 */}
          {PILLARS.map((p, i) => {
            const positions = [
              { x: 80, y: 70 },
              { x: 500, y: 70 },
              { x: 80, y: 200 },
              { x: 500, y: 200 },
            ];
            const pos = positions[i];
            return (
              <g key={p.title}>
                <line x1={360} y1={120} x2={pos.x + 70} y2={pos.y + 36} stroke={p.color} strokeWidth="1" strokeOpacity="0.4" />
                <rect x={pos.x} y={pos.y} width={140} height={72} rx="8" fill={p.color} fillOpacity="0.08" stroke={p.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={pos.x + 70} y={pos.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={p.color}>{p.title}</text>
                {p.desc.split("\n").map((line, li) => (
                  <text key={li} x={pos.x + 70} y={pos.y + 36 + li * 14} textAnchor="middle" fontSize="9.5" fill={secondary}>{line}</text>
                ))}
              </g>
            );
          })}

          {/* 对比条 */}
          <line x1={36} y1={300} x2={684} y2={300} stroke={border} strokeWidth="1" />
          <text x={360} y={322} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>Go vs 其他语言的核心差异</text>
          <text x={180} y={346} textAnchor="middle" fontSize="10" fill={accent}>无继承 · 组合优于继承</text>
          <text x={180} y={362} textAnchor="middle" fontSize="10" fill={secondary}>接口隐式实现（鸭子类型）</text>
          <text x={540} y={346} textAnchor="middle" fontSize="10" fill={accent}>错误是值（error 返回）</text>
          <text x={540} y={362} textAnchor="middle" fontSize="10" fill={secondary}>无异常 · 显式处理</text>
          <text x={360} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            Go 不追求语言特性的丰富，而追求工程协作的高效——简洁即生产力
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 四大支柱：少即是多、快速编译、原生并发、工程务实——为大规模协作工程而生。
      </figcaption>
    </figure>
  );
}
