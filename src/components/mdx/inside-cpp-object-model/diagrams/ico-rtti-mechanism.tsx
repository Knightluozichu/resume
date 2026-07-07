/**
 * <IcoRttiMechanismDiagram>：RTTI 机制（RTTI 章）。
 *
 * 左侧展示对象内存中的 vptr 同时指向虚表首槽前的 type_info 槽；
 * 中间展示 dynamic_cast 的运行期判定流程；
 * 右侧展示 typeid 返回 type_info 的用法与对比。
 * 底部标注：RTTI 依赖虚函数——没有虚函数的类无多态 RTTI。
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

export function IcoRttiMechanismDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="RTTI 机制图。左侧对象 vptr 指向虚表，虚表首槽前存有 type_info 槽；中间展示 dynamic_cast 运行期判定流程：取 type_info 比对继承链，成功返回调整后指针，失败返回空；右侧展示 typeid 返回 type_info 用于类型对比。底部标注 RTTI 依赖虚函数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-rt-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="ico-rt-arrow-g" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ico-rt-arrow-r" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={danger} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            RTTI 机制：type_info 与 dynamic_cast
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            运行期类型信息挂在虚表上——RTTI 是多态体系的副产品
          </text>

          {/* ===== 左：对象 + 虚表 + type_info ===== */}
          <text x={120} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>对象</text>
          <rect x={56} y={96} width={128} height={64} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
          <text x={120} y={120} textAnchor="middle" fontSize="11.5" fontFamily="monospace" fill={primary}>数据成员</text>
          <text x={120} y={142} textAnchor="middle" fontSize="11.5" fontFamily="monospace" fontWeight="700" fill={accent}>vptr ──┐</text>

          <text x={300} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>虚表（含 type_info）</text>
          <rect x={236} y={96} width={128} height={92} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
          <text x={244} y={116} fontSize="10.5" fontFamily="monospace" fill={success}>type_info*</text>
          <text x={244} y={116 + 22} fontSize="10.5" fontFamily="monospace" fill={secondary}>slot 0 → ~Derived</text>
          <text x={244} y={116 + 44} fontSize="10.5" fontFamily="monospace" fill={secondary}>slot 1 → draw()</text>
          <text x={244} y={116 + 66} fontSize="10.5" fontFamily="monospace" fill={secondary}>slot 2 → area()</text>
          <line x1={184} y1={138} x2={236} y2={112} stroke={accent} strokeWidth="1.8" markerEnd="url(#ico-rt-arrow)" />
          <text x={210} y={150} textAnchor="middle" fontSize="10" fill={secondary}>vptr</text>

          {/* ===== 中：dynamic_cast 流程 ===== */}
          <text x={420} y={210} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>dynamic_cast 流程</text>
          <rect x={392} y={220} width={200} height={40} rx="6" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.5" />
          <text x={492} y={244} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>p = dynamic_cast&lt;T*&gt;(base)</text>
          <line x1={492} y1={260} x2={492} y2={280} stroke={success} strokeWidth="1.6" markerEnd="url(#ico-rt-arrow-g)" />
          <rect x={392} y={284} width={200} height={40} rx="6" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.5" />
          <text x={492} y={308} textAnchor="middle" fontSize="11" fill={primary}>取 base 的 type_info</text>
          <line x1={492} y1={324} x2={492} y2={344} stroke={success} strokeWidth="1.6" markerEnd="url(#ico-rt-arrow-g)" />
          <rect x={392} y={348} width={200} height={40} rx="6" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.5" />
          <text x={492} y={372} textAnchor="middle" fontSize="11" fill={primary}>沿继承链比对 T</text>

          {/* 两分支 */}
          <line x1={492} y1={388} x2={420} y2={412} stroke={success} strokeWidth="1.6" markerEnd="url(#ico-rt-arrow-g)" />
          <line x1={492} y1={388} x2={564} y2={412} stroke={danger} strokeWidth="1.6" markerEnd="url(#ico-rt-arrow-r)" />
          <rect x={360} y={416} width={120} height={36} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" />
          <text x={420} y={438} textAnchor="middle" fontSize="10.5" fill={success}>成功 → 调整 this 返回</text>
          <rect x={504} y={416} width={120} height={36} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" />
          <text x={564} y={438} textAnchor="middle" fontSize="10.5" fill={danger}>失败 → 返回 nullptr</text>

          {/* ===== 右：typeid ===== */}
          <text x={636} y={210} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>typeid 用法</text>
          <rect x={596} y={220} width={92} height={120} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.5" />
          <text x={642} y={244} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={primary}>typeid(obj)</text>
          <text x={642} y={266} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={secondary}>→ type_info</text>
          <text x={642} y={296} textAnchor="middle" fontSize="10" fill={primary}>.name()</text>
          <text x={642} y={314} textAnchor="middle" fontSize="10" fill={primary}>.before()</text>
          <text x={642} y={332} textAnchor="middle" fontSize="10" fill={primary}>== / !=</text>
          <text x={642} y={360} textAnchor="middle" fontSize="10" fill={secondary}>用于类型相等</text>
          <text x={642} y={376} textAnchor="middle" fontSize="10" fill={secondary}>与排序比较</text>

          {/* 底部总结 */}
          <line x1={32} y1={466} x2={VIEW_W - 32} y2={466} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={486} textAnchor="middle" fontSize="11.5" fill={secondary}>
            RTTI 依赖虚函数：无虚函数的类没有 vptr，dynamic_cast 做多态下行转换会编译失败
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        type_info 挂在虚表首槽前；dynamic_cast 经 type_info 沿继承链比对做安全下行转换，失败返回空指针；typeid 取 type_info 做类型对比。
      </figcaption>
    </figure>
  );
}
