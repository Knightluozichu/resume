/**
 * <CvcFinalReviewDiagram>：CLR via C# 全书总复习——对象完整生命周期。
 *
 * 以一个 Dog 对象的生命周期为主线，串联四大板块知识。
 * 五阶段环形流：编译 → 加载 → 创建 → 执行 → 回收。
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

export function CvcFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CLR via C# 全书总复习。以 Dog 对象的生命周期为主线，五阶段环形流：编译期生成 IL+元数据，加载期构建类型对象，创建期 GC 分配，执行期 JIT 编译+方法分派，回收期 GC 遍历+Finalizer。串联四大板块知识。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            对象完整生命周期：CLR 全书知识串联
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            编译 → 加载 → 创建 → 执行 → 回收 · 五阶段贯穿四大板块
          </text>

          {/* 五阶段时间线 */}
          {/* 阶段 1：编译期 */}
          <rect x={40} y={76} width={120} height={80} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={100} y={96} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>1. 编译期</text>
          <text x={100} y={114} textAnchor="middle" fontSize="10" fill={secondary}>C# 编译器</text>
          <text x={100} y={130} textAnchor="middle" fontSize="10" fill={secondary}>→ IL + 元数据</text>
          <text x={100} y={146} textAnchor="middle" fontSize="10" fill={accent}>程序集 .dll</text>

          {/* 箭头 */}
          <line x1={160} y1={116} x2={190} y2={116} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-fr-arrow)" />

          {/* 阶段 2：加载期 */}
          <rect x={190} y={76} width={120} height={80} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={250} y={96} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2. 加载期</text>
          <text x={250} y={114} textAnchor="middle" fontSize="10" fill={secondary}>CLR 读取元数据</text>
          <text x={250} y={130} textAnchor="middle" fontSize="10" fill={secondary}>→ 构建类型对象</text>
          <text x={250} y={146} textAnchor="middle" fontSize="10" fill={success}>方法表 + 字段布局</text>

          {/* 箭头 */}
          <line x1={310} y1={116} x2={340} y2={116} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-fr-arrow)" />

          {/* 阶段 3：创建期 */}
          <rect x={340} y={76} width={120} height={80} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={400} y={96} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>3. 创建期</text>
          <text x={400} y={114} textAnchor="middle" fontSize="10" fill={secondary}>new Dog()</text>
          <text x={400} y={130} textAnchor="middle" fontSize="10" fill={secondary}>GC Gen0 分配</text>
          <text x={400} y={146} textAnchor="middle" fontSize="10" fill={warning}>类型指针 + 构造</text>

          {/* 箭头 */}
          <line x1={460} y1={116} x2={490} y2={116} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-fr-arrow)" />

          {/* 阶段 4：执行期 */}
          <rect x={490} y={76} width={120} height={80} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={550} y={96} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>4. 执行期</text>
          <text x={550} y={114} textAnchor="middle" fontSize="10" fill={secondary}>dog.Speak()</text>
          <text x={550} y={130} textAnchor="middle" fontSize="10" fill={secondary}>JIT IL→机器码</text>
          <text x={550} y={146} textAnchor="middle" fontSize="10" fill={danger}>方法表分派</text>

          {/* 回收箭头（向下弯） */}
          <path d="M 550 156 L 550 175 L 100 175 L 100 196" fill="none" stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-fr-arrow)" strokeDasharray="4 3" />

          {/* 阶段 5：回收期 */}
          <rect x={270} y={196} width={180} height={80} rx="8" fill={secondary} fillOpacity="0.06" stroke={secondary} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={360} y={216} textAnchor="middle" fontSize="11" fontWeight="700" fill={secondary}>5. 回收期</text>
          <text x={360} y={234} textAnchor="middle" fontSize="10" fill={secondary}>GC 遍历引用图</text>
          <text x={360} y={250} textAnchor="middle" fontSize="10" fill={secondary}>不可达 → Finalizer？</text>
          <text x={360} y={266} textAnchor="middle" fontSize="10" fill={secondary}>Dispose → SuppressFinalize</text>

          {/* 分隔线 */}
          <line x1={32} y1={296} x2={VIEW_W - 32} y2={296} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 底部：四大板块映射 */}
          <text x={VIEW_W / 2} y={316} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            五阶段映射四大板块
          </text>

          {/* 板块标签 */}
          <rect x={50} y={330} width={150} height={50} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
          <text x={125} y={350} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>CLR 基础</text>
          <text x={125} y={368} textAnchor="middle" fontSize="10" fill={secondary}>编译 + 加载 + JIT</text>

          <rect x={215} y={330} width={150} height={50} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x={290} y={350} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>类型设计</text>
          <text x={290} y={368} textAnchor="middle" fontSize="10" fill={secondary}>类型对象 + 方法表</text>

          <rect x={380} y={330} width={150} height={50} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" />
          <text x={455} y={350} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>内存 GC</text>
          <text x={455} y={368} textAnchor="middle" fontSize="10" fill={secondary}>GC 分配 + 回收</text>

          <rect x={545} y={330} width={150} height={50} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x={620} y={350} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>高级 CLR</text>
          <text x={620} y={368} textAnchor="middle" fontSize="10" fill={secondary}>async + 反射</text>

          {/* 底部总结 */}
          <line x1={32} y1={392} x2={VIEW_W - 32} y2={392} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            一个对象的生命周期串联全书：IL/JIT 是地基 · 类型系统决定行为 · GC 管理生命周期 · async/反射是高级能力
          </text>

          <defs>
            <marker id="cvc-fr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个 Dog 对象的五阶段生命周期（编译→加载→创建→执行→回收）串联四大板块知识。
      </figcaption>
    </figure>
  );
}
