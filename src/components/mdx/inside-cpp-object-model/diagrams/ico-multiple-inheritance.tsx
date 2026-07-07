/**
 * <IcoMultipleInheritanceDiagram>：多重继承内存布局（多重继承章）。
 *
 * 上半部展示普通多重继承：派生对象含两段基类子对象，各带 vptr，
 *   指向不同基类时 this 指针需偏移调整；
 * 下半部展示菱形继承下共享基类的二义性，以及虚继承用 vbptr
 *   指向虚基表、把共享基类挪到对象末尾共享一份的解法。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const border = "var(--border)";

export function IcoMultipleInheritanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="多重继承内存布局图。上半部普通多重继承：派生对象含两段基类子对象各带 vptr，指向不同基类时 this 指针需偏移调整。下半部菱形继承：普通方式共享基类存两份造成二义，虚继承用 vbptr 指向虚基表把共享基类挪到末尾共享一份。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-mi-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            多重继承内存布局
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            多个基类子对象拼成一个派生对象——this 指针在基类间切换时需要偏移
          </text>

          {/* ===== 上半：普通多重继承 ===== */}
          <text x={180} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>普通多重继承 D : B1, B2</text>
          <rect x={72} y={96} width={216} height={132} rx="6" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.5" />
          <rect x={80} y={104} width={200} height={36} rx="4" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.2" />
          <text x={180} y={126} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B1 子对象（vptr1 + B1 成员）</text>
          <rect x={80} y={146} width={200} height={36} rx="4" fill={success} fillOpacity="0.10" stroke={success} strokeWidth="1.2" />
          <text x={180} y={168} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B2 子对象（vptr2 + B2 成员）</text>
          <rect x={80} y={188} width={200} height={32} rx="4" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.2" />
          <text x={180} y={208} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>D 自己的成员</text>

          {/* this 调整说明 */}
          <rect x={312} y={104} width={296} height={116} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" />
          <text x={460} y={128} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent}>this 指针调整</text>
          <text x={460} y={150} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>D* d = new D;</text>
          <text x={460} y={170} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={secondary}>B1* p1 = d;        // 不偏移</text>
          <text x={460} y={190} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={secondary}>B2* p2 = d + Δ;     // 偏移到 B2 段</text>
          <text x={460} y={210} textAnchor="middle" fontSize="10.5" fill={secondary}>转不同基类指针时编译器自动加减偏移</text>

          {/* 分隔线 */}
          <line x1={32} y1={252} x2={VIEW_W - 32} y2={252} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* ===== 下半：菱形继承 ===== */}
          <text x={180} y={280} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>菱形继承（普通）</text>
          <rect x={72} y={288} width={216} height={92} rx="6" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.5" />
          <text x={180} y={308} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B1 子对象（含一份 Base）</text>
          <text x={180} y={328} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B2 子对象（含一份 Base）</text>
          <text x={180} y={348} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>D 成员</text>
          <text x={180} y={370} textAnchor="middle" fontSize="10.5" fill={danger}>Base 存两份 → 访问 Base 成员二义</text>

          {/* 虚继承解法 */}
          <text x={560} y={280} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>虚继承（virtual）</text>
          <rect x={448} y={288} width={216} height={116} rx="6" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.5" />
          <text x={556} y={308} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B1 子对象 + vbptr1</text>
          <text x={556} y={328} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>B2 子对象 + vbptr2</text>
          <text x={556} y={348} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>D 成员</text>
          <rect x={460} y={358} width={192} height={36} rx="4" fill={success} fillOpacity="0.10" stroke={success} strokeWidth="1.2" />
          <text x={556} y={380} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>共享 Base（仅一份）</text>

          {/* vbptr 指向说明 */}
          <line x1={556} y1={394} x2={556} y2={412} stroke={success} strokeWidth="1.6" markerEnd="url(#ico-mi-arrow)" />
          <text x={460} y={428} fontSize="10.5" fill={secondary}>vbptr → 虚基表</text>
          <text x={460} y={444} fontSize="10.5" fill={secondary}>记录到共享 Base 的偏移</text>

          {/* 底部总结 */}
          <line x1={32} y1={466} x2={VIEW_W - 32} y2={466} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            普通多重继承：基类子对象拼接，this 跨基类要偏移
          </text>
          <text x={VIEW_W / 2} y={508} textAnchor="middle" fontSize="11" fill={secondary}>
            虚继承：用 vbptr 把共享基类挪到对象末尾共享一份，消除菱形二义性，代价是多一次间接访问
          </text>
          <text x={VIEW_W / 2} y={526} textAnchor="middle" fontSize="11" fill={secondary}>
            多重继承的复杂度大多来自 this 指针调整与虚基类的间接寻址
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        普通多重继承把基类子对象拼接，this 在基类间切换需偏移；菱形继承用虚继承让共享基类只存一份，靠 vbptr 间接寻址消除二义性。
      </figcaption>
    </figure>
  );
}
