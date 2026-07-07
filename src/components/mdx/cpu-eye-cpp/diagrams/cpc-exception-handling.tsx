/**
 * <CpcExceptionHandlingDiagram>：C++ 异常处理机制（cpu-eye-cpp 异常处理章）。
 *
 * 左侧展示正常路径（零开销，不查 unwind 表）。
 * 右侧展示异常抛出后的栈展开过程：逐帧查 unwind 表 → 析构局部对象 → 找 catch。
 * 底部对比异常 vs 返回码在热路径的差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 500;

export function CpcExceptionHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 异常处理机制。左侧正常路径：异常不抛出时零开销，不查 unwind 表，正常执行。右侧异常路径：throw 后，运行时用当前指令地址查 unwind 表定位栈帧析构动作，逐帧调用局部对象析构（栈展开），直到找到类型匹配的 catch 块；找不到则 terminate。底部对比：异常正常路径零开销但抛出极慢，适合罕见错误；返回码每次检查但分支预测消化，适合频繁错误。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异常处理 · 零开销与栈展开
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            正常路径零开销（表驱动），异常路径高开销（栈展开查表）
          </text>

          {/* ===== 左：正常路径 ===== */}
          <rect x="48" y="84" width="300" height="200" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />
          <rect x="48" y="84" width="300" height="28" rx="10" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="198" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">正常路径（异常不抛出）</text>
          <text x="68" y="132" fontSize="12" fontWeight="700" fill="var(--text-primary)">零开销</text>
          <text x="68" y="152" fontSize="11" fill="var(--text-secondary)">· 无 try 块检查分支</text>
          <text x="68" y="170" fontSize="11" fill="var(--text-secondary)">· 不查 unwind 表</text>
          <text x="68" y="188" fontSize="11" fill="var(--text-secondary)">· 代码与无异常版本几乎相同</text>
          <rect x="68" y="204" width="260" height="60" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="198" y="224" textAnchor="middle" fontSize="11" fill="var(--text-primary)">代价推迟到抛异常时</text>
          <text x="198" y="242" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">unwind 表占二进制空间（+10-20%）</text>
          <text x="198" y="258" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">但运行期正常路径不付任何代价</text>

          {/* ===== 右：异常路径 ===== */}
          <rect x="372" y="84" width="300" height="200" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="372" y="84" width="300" height="28" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="522" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">异常路径（throw 抛出后）</text>
          <text x="392" y="132" fontSize="12" fontWeight="700" fill="var(--text-primary)">栈展开（stack unwinding）</text>
          {[
            "① throw 分配异常对象 + 记录类型",
            "② 用指令地址查 unwind 表",
            "③ 逐帧调用局部对象析构",
            "④ 检查每帧是否有匹配 catch",
            "⑤ 找到 → 跳转 catch；无 → terminate",
          ].map((s, i) => (
            <text key={s} x="392" y={152 + i * 20} fontSize="11" fill="var(--text-primary)">{s}</text>
          ))}

          {/* ===== 底部对比表 ===== */}
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">热路径对比：异常 vs 返回码</text>

          <rect x="48" y="324" width="300" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="48" y="324" width="300" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="198" y="341" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">异常（罕见错误）</text>
          <text x="64" y="364" fontSize="11" fill="var(--text-primary)">正常路径：零开销</text>
          <text x="64" y="380" fontSize="11" fill="var(--text-primary)">抛出时：极慢（查表+展开）</text>
          <text x="64" y="396" fontSize="11" fill="var(--text-secondary)">适合：几乎不发生的异常</text>

          <rect x="372" y="324" width="300" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="372" y="324" width="300" height="24" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="522" y="341" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">返回码（频繁错误）</text>
          <text x="388" y="364" fontSize="11" fill="var(--text-primary)">每次：一条条件分支</text>
          <text x="388" y="380" fontSize="11" fill="var(--text-primary)">分支预测消化（99%+ 命中）</text>
          <text x="388" y="396" fontSize="11" fill="var(--text-secondary)">适合：预期会发生的错误</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            零开销 = 正常路径零开销、异常路径高开销；绝不把异常当常规控制流
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 异常采用表驱动机制：正常路径不查 unwind 表，零开销；抛出异常时按指令地址查表逐帧析构局部对象（栈展开）直到匹配 catch。异常适合罕见错误，返回码适合频繁错误。
      </figcaption>
    </figure>
  );
}
