/**
 * <AccessControlDiagram>：类的 public 接口 vs private 实现边界示意图。
 *
 * 展示类的外部视角（public 成员：调用方可访问的接口）和内部视角（private 成员：
 * 实现细节，外部不可见），用分界线明确 "接口 / 实现" 分离。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function AccessControlDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="类的访问控制示意图：public 区域是外部可见的接口，private 区域是隐藏的实现细节，中间用分界线隔开"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 标题 ── */}
          <text x={320} y={24} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>
            类的 public 接口 vs private 实现
          </text>

          {/* ── public 区域（上半）── */}
          <rect x={40} y={42} width={560} height={120} rx="8" fill={bg} stroke={accent} strokeWidth="2" />
          <text x={58} y={64} fontSize="12" fill={accent} fontWeight="700" fontFamily="monospace">
            public:
          </text>
          <text x={320} y={60} textAnchor="middle" fontSize="10" fill={secondary}>
            外部可见——调用方能使用的接口
          </text>

          {/* public 成员 */}
          <text x={70} y={90} fontSize="12" fill={primary} fontFamily="monospace">string isbn() const;</text>
          <text x={440} y={90} fontSize="10" fill={secondary}>✓ 外部可调用</text>

          <text x={70} y={112} fontSize="12" fill={primary} fontFamily="monospace">double avg_price() const;</text>
          <text x={440} y={112} fontSize="10" fill={secondary}>✓ 外部可调用</text>

          <text x={70} y={134} fontSize="12" fill={primary} fontFamily="monospace">Sales_data&amp; combine(const Sales_data&amp;);</text>
          <text x={440} y={134} fontSize="10" fill={secondary}>✓ 外部可调用</text>

          {/* ── 分隔线 ── */}
          <line x1={40} y1={170} x2={600} y2={170} stroke={border} strokeWidth="1" strokeDasharray="6,3" />
          <text x={320} y={182} textAnchor="middle" fontSize="9" fill={secondary}>
            —————— 封装边界：外部代码不能越过这条线 ——————
          </text>

          {/* ── private 区域（下半）── */}
          <rect x={40} y={194} width={560} height={86} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={58} y={216} fontSize="12" fill={secondary} fontWeight="700" fontFamily="monospace">
            private:
          </text>
          <text x={320} y={212} textAnchor="middle" fontSize="10" fill={secondary}>
            隐藏实现——外部不可见、不可直接访问
          </text>

          <text x={70} y={242} fontSize="12" fill={secondary} fontFamily="monospace">string bookNo;</text>
          <text x={440} y={242} fontSize="10" fill={secondary}>✗ 外部不可访问</text>

          <text x={70} y={264} fontSize="12" fill={secondary} fontFamily="monospace">unsigned units_sold = 0;</text>
          <text x={440} y={264} fontSize="10" fill={secondary}>✗ 外部不可访问</text>

          {/* ── 箭头：外部→public → ✗ private ── */}

          {/* 外部调用方 */}
          <rect x={30} y={296} width={88} height={32} rx="4" fill={bg} stroke={primary} strokeWidth="1" />
          <text x={74} y={316} textAnchor="middle" fontSize="11" fill={primary}>
            调用方
          </text>

          <defs>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="var(--success)" />
            </marker>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="var(--danger)" />
            </marker>
          </defs>

          {/* 调用方 → public */}
          <line x1={120} y1={308} x2={200} y2={308} stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
          <text x={160} y={302} textAnchor="middle" fontSize="9" fill="var(--success)">
            .isbn()
          </text>

          {/* 调用方 → private（被阻止） */}
          <line x1={120} y1={320} x2={200} y2={320} stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
          <text x={160} y={332} textAnchor="middle" fontSize="9" fill="var(--danger)">
            .bookNo
          </text>

          {/* 编译错误标注 */}
          <text x={210} y={334} fontSize="9" fill="var(--danger)" fontFamily="monospace">
            ✗ error: private member
          </text>

          {/* 右侧说明 — 什么时候用哪个 */}
          <text x={440} y={302} fontSize="10" fill={primary} fontWeight="600">使用原则</text>
          <text x={440} y={316} fontSize="9" fill={secondary}>构造函数 → public</text>
          <text x={440} y={330} fontSize="9" fill={secondary}>需要外部调用的 → public</text>
          <text x={540} y={316} fontSize="9" fill={secondary}>数据成员 → private</text>
          <text x={540} y={330} fontSize="9" fill={secondary}>内部辅助函数 → private</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        public 是类的"使用说明书"——外部代码只能通过 public 成员函数操作对象，不能直接碰 private 数据。这就是 C++ 封装的核心机制。
      </figcaption>
    </figure>
  );
}
