/**
 * <CpcInlineDiagram>：内联优化与优化链（cpu-eye-cpp 内联与优化章）。
 *
 * 左侧展示内联前（call + ret 有调用边界）与内联后（边界消失、代码合并）。
 * 右侧展示内联触发的连锁优化：常量传播 → 死代码消除 → 循环展开/向量化。
 * 底部列出内联的决策因素与阻碍因素。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 500;

export function CpcInlineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内联优化与优化链。左侧上方内联前：调用方代码有 call foo 指令和独立函数体 foo，中间有调用边界。左侧下方内联后：调用边界消失，foo 的函数体被复制到调用点，代码合并。右侧展示内联触发的连锁优化：常量传播（参数被替换为常量）→ 死代码消除（恒假分支被删）→ 循环展开与 SIMD 向量化。底部列出决策因素（函数小、热路径、常量参数）与阻碍因素（递归、虚函数、过大）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内联优化 · 消除调用边界，开启优化链
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            内联不只是省 call/ret，更是编译器优化管道的入口
          </text>

          {/* ===== 左：内联前/后 ===== */}
          <text x="56" y="88" fontSize="13" fontWeight="700" fill="var(--text-primary)">内联前（有调用边界）</text>
          <rect x="48" y="100" width="300" height="68" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="120" fontSize="11" fill="var(--text-secondary)">调用方：</text>
          <text x="64" y="136" fontSize="11" fill="var(--text-primary)">  int r = foo(0);</text>
          <text x="64" y="152" fontSize="11" fill="var(--danger)">  call foo  ← 调用边界</text>
          <rect x="48" y="180" width="300" height="56" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="200" fontSize="11" fill="var(--text-secondary)">foo 函数体（独立）：</text>
          <text x="64" y="216" fontSize="11" fill="var(--text-primary)">  if (flag) {`{ A(); }`} else {`{ B(); }`}</text>
          <text x="64" y="230" fontSize="11" fill="var(--danger)">  ret  ← 返回边界</text>

          <text x="56" y="262" fontSize="13" fontWeight="700" fill="var(--text-primary)">内联后（边界消失）</text>
          <rect x="48" y="274" width="300" height="68" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="64" y="294" fontSize="11" fill="var(--text-secondary)">合并后（flag=0 已知）：</text>
          <text x="64" y="312" fontSize="11" fill="var(--success)">  B();  ← 常量传播+DCE 后</text>
          <text x="64" y="328" fontSize="11" fill="var(--text-secondary)">  （call/ret/死分支全消除）</text>

          {/* ===== 右：优化链 ===== */}
          <text x="388" y="88" fontSize="13" fontWeight="700" fill="var(--text-primary)">内联触发的连锁优化</text>

          {[
            { step: "① 常量传播", desc: "调用点常量参数内联后替换进函数体", color: "var(--accent)" },
            { step: "② 死代码消除", desc: "恒假分支被删，只为通用参数保留的代码消失", color: "var(--success)" },
            { step: "③ 循环展开", desc: "循环边界确定后可展开，减少控制开销", color: "var(--warning)" },
            { step: "④ SIMD 向量化", desc: "同模式操作合并成一条向量指令", color: "var(--danger)" },
          ].map((s, i) => {
            const y = 104 + i * 60;
            return (
              <g key={s.step}>
                <rect x="380" y={y} width="292" height="48" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <rect x="380" y={y} width="8" height="48" rx="4" fill={s.color} />
                <text x="400" y={y + 20} fontSize="12" fontWeight="700" fill={s.color}>{s.step}</text>
                <text x="400" y={y + 38} fontSize="11" fill="var(--text-secondary)">{s.desc}</text>
                {i < 3 && (
                  <text x="526" y={y + 58} textAnchor="middle" fontSize="14" fill="var(--text-secondary)">↓</text>
                )}
              </g>
            );
          })}

          {/* ===== 底部：决策与阻碍 ===== */}
          <rect x="48" y="356" width="300" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="64" y="376" fontSize="12" fontWeight="700" fill="var(--success)">编译器倾向内联</text>
          <text x="64" y="394" fontSize="11" fill="var(--text-secondary)">· 函数体小、调用频繁</text>
          <text x="64" y="408" fontSize="11" fill="var(--text-secondary)">· 常量参数、能触发后续优化</text>

          <rect x="372" y="356" width="300" height="60" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="388" y="376" fontSize="12" fontWeight="700" fill="var(--danger)">内联受阻</text>
          <text x="388" y="394" fontSize="11" fill="var(--text-secondary)">· 递归（次数不定）、虚函数</text>
          <text x="388" y="408" fontSize="11" fill="var(--text-secondary)">· 函数过大（代码膨胀风险）</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            inline 关键字只是建议；内联的真正价值是打开常量传播/DCE/向量化的优化链
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内联把函数体复制到调用点，消除调用边界后编译器能看到完整上下文，触发常量传播、死代码消除、循环展开与 SIMD 向量化的连锁优化。递归与虚函数因目标不确定而难以内联。
      </figcaption>
    </figure>
  );
}
