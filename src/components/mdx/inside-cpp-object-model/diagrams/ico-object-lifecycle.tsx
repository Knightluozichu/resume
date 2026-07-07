/**
 * <IcoObjectLifecycleDiagram>：对象生命周期全流程（对象生命周期章）。
 *
 * 横向五阶段流水线展示对象从生到灭：
 *   ① 分配内存（operator new / 栈预留）
 *   ② 构造（设 vptr → 基类 → 成员 → 函数体 → 改 vptr）
 *   ③ 使用（成员访问 / 虚函数调用 / 多态生效）
 *   ④ 析构（反向：函数体 → 成员析构 → 基类析构）
 *   ⑤ 释放内存（operator delete / 栈回收）
 * 底部标注全局/静态、栈、堆三类对象的生存期差异。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const border = "var(--border)";

interface Phase {
  n: string;
  title: string;
  detail: string;
  color: string;
}

const PHASES: readonly Phase[] = [
  { n: "①", title: "分配内存", detail: "new → operator new\n栈：预留空间", color: accent },
  { n: "②", title: "构造", detail: "设 vptr → 基类\n→ 成员 → 函数体", color: success },
  { n: "③", title: "使用", detail: "成员访问\n虚调用多态生效", color: warning },
  { n: "④", title: "析构", detail: "函数体 → 成员析构\n→ 基类析构", color: warning },
  { n: "⑤", title: "释放内存", detail: "operator delete\n栈：回收", color: danger },
];

export function IcoObjectLifecycleDiagram() {
  const boxW = 116;
  const boxH = 110;
  const gap = 14;
  const startX = 36;
  const boxY = 100;
  const detailLines = (s: string) => s.split("\n");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象生命周期图。横向五阶段流水线：分配内存、构造、使用、析构、释放内存。底部对比全局静态对象、栈对象、堆对象的生存期差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-lc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            对象生命周期：从分配到释放
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            构造与析构严格对称——构造自基向派，析构自派向基，中间夹着成员
          </text>

          {/* 五阶段 */}
          {PHASES.map((p, i) => {
            const x = startX + i * (boxW + gap);
            return (
              <g key={p.n}>
                <rect x={x} y={boxY} width={boxW} height={boxH} rx="8" fill={p.color} fillOpacity="0.07" stroke={p.color} strokeWidth="1.6" />
                <text x={x + boxW / 2} y={boxY + 26} textAnchor="middle" fontSize="14" fontWeight="700" fill={p.color}>
                  {p.n} {p.title}
                </text>
                {detailLines(p.detail).map((line, li) => (
                  <text key={li} x={x + boxW / 2} y={boxY + 54 + li * 20} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={secondary}>
                    {line}
                  </text>
                ))}
                {i < PHASES.length - 1 && (
                  <line x1={x + boxW + 2} y1={boxY + boxH / 2} x2={x + boxW + gap - 2} y2={boxY + boxH / 2} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ico-lc-arrow)" />
                )}
              </g>
            );
          })}

          {/* 生存期对比区 */}
          <line x1={32} y1={252} x2={VIEW_W - 32} y2={252} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={276} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            三类对象的生存期
          </text>

          {/* 全局/静态 */}
          <rect x={60} y={292} width={196} height={120} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.4" />
          <text x={158} y={314} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent}>全局 / 静态对象</text>
          <text x={158} y={338} textAnchor="middle" fontSize="11" fill={secondary}>程序启动时构造</text>
          <text x={158} y={358} textAnchor="middle" fontSize="11" fill={secondary}>main 退出时析构</text>
          <text x={158} y={380} textAnchor="middle" fontSize="11" fill={secondary}>存于数据段</text>
          <text x={158} y={400} textAnchor="middle" fontSize="10.5" fill={secondary}>生存期 = 整个程序</text>

          {/* 栈对象 */}
          <rect x={262} y={292} width={196} height={120} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.4" />
          <text x={360} y={314} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>栈对象</text>
          <text x={360} y={338} textAnchor="middle" fontSize="11" fill={secondary}>声明处构造</text>
          <text x={360} y={358} textAnchor="middle" fontSize="11" fill={secondary}>离开作用域析构</text>
          <text x={360} y={380} textAnchor="middle" fontSize="11" fill={secondary}>存于栈帧</text>
          <text x={360} y={400} textAnchor="middle" fontSize="10.5" fill={secondary}>生存期 = 所在作用域</text>

          {/* 堆对象 */}
          <rect x={464} y={292} width={196} height={120} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.4" />
          <text x={562} y={314} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={warning}>堆对象</text>
          <text x={562} y={338} textAnchor="middle" fontSize="11" fill={secondary}>new 时构造</text>
          <text x={562} y={358} textAnchor="middle" fontSize="11" fill={secondary}>delete 时析构</text>
          <text x={562} y={380} textAnchor="middle" fontSize="11" fill={secondary}>存于自由存储区</text>
          <text x={562} y={400} textAnchor="middle" fontSize="10.5" fill={secondary}>生存期 = 手动管控</text>

          {/* 底部总结 */}
          <line x1={32} y1={436} x2={VIEW_W - 32} y2={436} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={458} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            生命周期 = 内存管理 + 构造析构 + 多态生效窗口
          </text>
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="11" fill={secondary}>
            构造完成到析构开始之间，多态才真正生效——这是对象「可用」的窗口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象经分配、构造、使用、析构、释放五阶段；构造析构对称反向。全局/栈/堆三类对象的构造与析构时机不同，决定了多态生效的窗口。
      </figcaption>
    </figure>
  );
}
