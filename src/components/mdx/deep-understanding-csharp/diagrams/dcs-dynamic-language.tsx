/**
 * <DcsDynamicLanguageDiagram>：dynamic 与 DLR 机制。
 *
 * 上半：dynamic vs object vs var 三者对比。
 * 下半：DLR CallSite 缓存机制——第一次绑定（慢）与第二次缓存命中（快）。
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

const COL_W = 190;

export function DcsDynamicLanguageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="dynamic 与 DLR 机制。上半对比 dynamic（运行时绑定）、object（编译时+强制转换）、var（编译时推断）。下半展示 DLR CallSite 缓存：第一次调用走 Binder 绑定（慢），第二次同类型调用命中缓存（快）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            dynamic 与 DLR 机制
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            运行时绑定 · CallSite 缓存 · 与 object/var 的区别
          </text>

          {/* 上半：三者对比 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            dynamic vs object vs var
          </text>

          {/* var 列 */}
          <rect x={48} y={92} width={COL_W} height={96} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={48 + COL_W / 2} y={112} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">var</text>
          <text x={48 + COL_W / 2} y={130} textAnchor="middle" fontSize="11" fill={primary}>编译时类型推断</text>
          <text x={48 + COL_W / 2} y={148} textAnchor="middle" fontSize="11" fill={secondary}>var x = 5; // int</text>
          <text x={48 + COL_W / 2} y={166} textAnchor="middle" fontSize="11" fill={secondary}>类型安全 · 有智能提示</text>
          <text x={48 + COL_W / 2} y={182} textAnchor="middle" fontSize="10" fill={secondary}>语法糖，编译后消失</text>

          {/* object 列 */}
          <rect x={265} y={92} width={COL_W} height={96} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" />
          <text x={265 + COL_W / 2} y={112} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning} fontFamily="monospace">object</text>
          <text x={265 + COL_W / 2} y={130} textAnchor="middle" fontSize="11" fill={primary}>编译时+强制转换</text>
          <text x={265 + COL_W / 2} y={148} textAnchor="middle" fontSize="11" fill={secondary}>(string)obj</text>
          <text x={265 + COL_W / 2} y={166} textAnchor="middle" fontSize="11" fill={secondary}>转换失败抛异常</text>
          <text x={265 + COL_W / 2} y={182} textAnchor="middle" fontSize="10" fill={secondary}>所有类型的基类</text>

          {/* dynamic 列 */}
          <rect x={482} y={92} width={COL_W} height={96} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={482 + COL_W / 2} y={112} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">dynamic</text>
          <text x={482 + COL_W / 2} y={130} textAnchor="middle" fontSize="11" fill={primary}>运行时绑定</text>
          <text x={482 + COL_W / 2} y={148} textAnchor="middle" fontSize="11" fill={secondary}>d.Foo() // 运行时查找</text>
          <text x={482 + COL_W / 2} y={166} textAnchor="middle" fontSize="11" fill={secondary}>无编译检查 · DLR 绑定</text>
          <text x={482 + COL_W / 2} y={182} textAnchor="middle" fontSize="10" fill={secondary}>COM/脚本/JSON 交互</text>

          {/* 分隔线 */}
          <line x1={32} y1={212} x2={VIEW_W - 32} y2={212} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：CallSite 缓存 */}
          <text x={VIEW_W / 2} y={236} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            DLR CallSite 缓存机制
          </text>

          {/* 第一次调用 */}
          <rect x={40} y={252} width={300} height={120} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={190} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>第一次调用（慢）</text>
          <text x={54} y={292} fontSize="11" fill={primary} fontFamily="monospace">{"CallSite<T> -> Binder"}</text>
          <text x={54} y={308} fontSize="11" fill={secondary}>1. 反射检查实际类型</text>
          <text x={54} y={324} fontSize="11" fill={secondary}>2. 查找匹配方法</text>
          <text x={54} y={340} fontSize="11" fill={secondary}>3. 生成委托并缓存</text>
          <text x={54} y={356} fontSize="11" fill={danger}>开销约等于反射</text>

          {/* 箭头 */}
          <line x1={345} y1={312} x2={375} y2={312} stroke={secondary} strokeWidth="1.4" markerEnd="url(#dcs-dl-arrow)" />
          <text x={360} y={304} textAnchor="middle" fontSize="10" fill={secondary}>缓存</text>

          {/* 第二次调用 */}
          <rect x={380} y={252} width={300} height={120} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={530} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>第二次调用（快）</text>
          <text x={394} y={292} fontSize="11" fill={primary} fontFamily="monospace">{"CallSite -> L0 缓存命中"}</text>
          <text x={394} y={308} fontSize="11" fill={secondary}>1. 检查类型相同</text>
          <text x={394} y={324} fontSize="11" fill={secondary}>2. 直接调用缓存委托</text>
          <text x={394} y={340} fontSize="11" fill={secondary}>3. 跳过 Binder 反射</text>
          <text x={394} y={356} fontSize="11" fill={success}>接近直接调用速度</text>

          {/* 底部总结 */}
          <line x1={32} y1={388} x2={VIEW_W - 32} y2={388} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="11" fill={secondary}>
            var 是编译时语法糖 · object 需强制转换 · dynamic 运行时 DLR 绑定 · CallSite 缓存让第二次调用接近直接速度
          </text>

          <defs>
            <marker id="dcs-dl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        dynamic 运行时绑定与 DLR CallSite 缓存机制。
      </figcaption>
    </figure>
  );
}
