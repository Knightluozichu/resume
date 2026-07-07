/**
 * <IcoVtableLayoutDiagram>：虚表结构与虚函数调用机制（虚函数章）。
 *
 * 左侧展示对象的内存：数据成员 + vptr；
 * 中间展示 vtable 的槽位：每槽一个虚函数指针；
 * 右侧展示多重继承下两个 vptr（主基类与次基类各一）。
 * 底部标注：虚函数调用 = (*obj.vptr[slot])(obj)。
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
const border = "var(--border)";

export function IcoVtableLayoutDiagram() {
  const ROW_H = 28;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="虚表结构图。左侧对象含数据成员与 vptr；中间虚表每槽一个虚函数指针，槽 0 指向析构、槽 1 指向 draw、槽 2 指向 area；右侧多重继承下主基类与次基类各有一个 vptr 指向各自的虚表。底部标注虚函数调用等于解引用 obj.vptr 的对应槽位。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-vt-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="ico-vt-arrow-w" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            虚表结构与虚函数调用
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            vptr 指向一张函数指针表，运行期按槽位取出真正该调的函数
          </text>

          {/* ===== 左：对象内存 ===== */}
          <text x={120} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>对象 Circle</text>
          <rect x={48} y={96} width={144} height={ROW_H * 4} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
          <text x={56} y={116} fontSize="11.5" fontFamily="monospace" fill={primary}>double radius</text>
          <text x={56} y={116 + ROW_H} fontSize="11.5" fontFamily="monospace" fill={primary}>double cx</text>
          <text x={56} y={116 + ROW_H * 2} fontSize="11.5" fontFamily="monospace" fill={primary}>double cy</text>
          <text x={56} y={116 + ROW_H * 3} fontSize="11.5" fontFamily="monospace" fontWeight="700" fill={accent}>vptr ──┐</text>

          {/* ===== 中：虚表 ===== */}
          <text x={360} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Circle 的 vtable</text>
          <rect x={288} y={96} width={144} height={ROW_H * 4} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
          <text x={296} y={116} fontSize="11" fontFamily="monospace" fill={secondary}>slot 0</text>
          <text x={424} y={116} textAnchor="end" fontSize="11.5" fontFamily="monospace" fill={primary}>→ ~Circle</text>
          <text x={296} y={116 + ROW_H} fontSize="11" fontFamily="monospace" fill={secondary}>slot 1</text>
          <text x={424} y={116 + ROW_H} textAnchor="end" fontSize="11.5" fontFamily="monospace" fill={primary}>→ draw()</text>
          <text x={296} y={116 + ROW_H * 2} fontSize="11" fontFamily="monospace" fill={secondary}>slot 2</text>
          <text x={424} y={116 + ROW_H * 2} textAnchor="end" fontSize="11.5" fontFamily="monospace" fill={primary}>→ area()</text>
          <text x={296} y={116 + ROW_H * 3} fontSize="11" fontFamily="monospace" fill={secondary}>slot 3</text>
          <text x={424} y={116 + ROW_H * 3} textAnchor="end" fontSize="11.5" fontFamily="monospace" fill={primary}>→ rotate()</text>

          {/* vptr → vtable 连线 */}
          <line x1={192} y1={112 + ROW_H * 3} x2={288} y2={112 + ROW_H * 3} stroke={accent} strokeWidth="1.8" markerEnd="url(#ico-vt-arrow)" />

          {/* ===== 右：多重继承双 vptr ===== */}
          <text x={600} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>多重继承：双 vptr</text>
          <rect x={528} y={96} width={144} height={ROW_H * 3} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.5" />
          <text x={536} y={116} fontSize="11" fontFamily="monospace" fill={primary}>vptr_Base1 ─┐</text>
          <text x={536} y={116 + ROW_H} fontSize="11" fontFamily="monospace" fill={primary}>Base1 成员</text>
          <text x={536} y={116 + ROW_H * 2} fontSize="11" fontFamily="monospace" fill={primary}>vptr_Base2 ─┐</text>
          <text x={536} y={116 + ROW_H * 3} fontSize="11" fontFamily="monospace" fill={secondary}>Base2 成员</text>

          {/* 双虚表小框 */}
          <rect x={556} y={196} width={104} height={ROW_H * 2 + 8} rx="5" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.2" />
          <text x={608} y={214} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={primary}>Base1 vtable</text>
          <text x={608} y={214 + ROW_H} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={primary}>Base2 vtable</text>
          <line x1={672} y1={110} x2={676} y2={196} stroke={warning} strokeWidth="1.4" markerEnd="url(#ico-vt-arrow-w)" />
          <line x1={672} y1={110 + ROW_H * 2} x2={676} y2={196 + ROW_H} stroke={warning} strokeWidth="1.4" markerEnd="url(#ico-vt-arrow-w)" />

          {/* ===== 调用机制说明区 ===== */}
          <line x1={32} y1={300} x2={VIEW_W - 32} y2={300} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <rect x={60} y={316} width={600} height={70} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={360} y={340} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>
            虚函数调用的内部展开
          </text>
          <text x={360} y={360} textAnchor="middle" fontSize="11.5" fontFamily="monospace" fill={primary}>
            obj.draw()  →  (*obj.vptr[1])(obj)
          </text>
          <text x={360} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            取出 obj 的 vptr → 按声明顺序定位槽位 1 → 解引用该槽函数指针 → 以 obj 为 this 调用
          </text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={436} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            虚表每槽对应一个虚函数，槽位顺序由声明顺序决定，全类共享一份
          </text>
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="11" fill={secondary}>
            多重继承的对象有多个 vptr，分别管理各基类接口的虚函数
          </text>
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="11" fill={secondary}>
            每个有虚函数的对象多出 1 个 vptr（通常一个指针大小）的空间开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        虚表是一张函数指针表，vptr 指向它；虚调用 = 经 vptr 按槽位解引用。多重继承的对象持有多个 vptr，各管一组基类虚函数。
      </figcaption>
    </figure>
  );
}
