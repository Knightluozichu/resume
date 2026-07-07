/**
 * <EcsExceptionUsageDiagram>：异常使用准则（条款 45-47）。
 *
 * 左：throw（保留栈）vs throw ex（重置栈）——重抛必须用裸 throw
 * 右：异常过滤器 when——在 catch 前做条件判定，避免吞异常
 * 下：catch 顺序——具体异常在前，基类在后
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsExceptionUsageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异常使用准则。左：throw 保留调用栈，throw ex 重置调用栈导致无法定位原始抛出点；右：异常过滤器 when 在 catch 前做条件判定；下：catch 顺序具体异常在前基类在后。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-exc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            异常使用准则
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            重抛保留栈 · 过滤器精确判定 · catch 由具体到一般
          </text>

          {/* 左：throw vs throw ex */}
          <g>
            <rect x={40} y={76} width={316} height={160} rx="10" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.6" />
            <text x={198} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              重抛：保留还是重置栈
            </text>
            <line x1={52} y1={108} x2={344} y2={108} stroke={border} strokeWidth="1" />

            <text x={56} y={130} fontSize="11" fontFamily="monospace" fill={success}>{"catch (Exception) { throw; }"}</text>
            <text x={56} y={148} fontSize="11" fill={success}>裸 throw · 保留原始抛出点</text>

            <text x={56} y={176} fontSize="11" fontFamily="monospace" fill={danger}>{"catch (Exception ex) { throw ex; }"}</text>
            <text x={56} y={194} fontSize="11" fill={danger}>throw ex · 栈被重置到此行</text>

            <text x={56} y={222} fontSize="11" fontWeight="600" fill={primary}>调试时无法定位真正出错位置</text>
          </g>

          {/* 右：异常过滤器 when */}
          <g>
            <rect x={376} y={76} width={304} height={160} rx="10" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
            <text x={528} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              异常过滤器 when
            </text>
            <line x1={388} y1={108} x2={668} y2={108} stroke={border} strokeWidth="1" />

            <text x={392} y={130} fontSize="11" fontFamily="monospace" fill={primary}>{"catch (Exception e)"}</text>
            <text x={392} y={146} fontSize="11" fontFamily="monospace" fill={success}>{"  when (e.Code == 503)"}</text>
            <text x={392} y={166} fontSize="11" fill={primary}>过滤器 false = 不进入此 catch</text>
            <text x={392} y={184} fontSize="11" fill={primary}>异常继续传播，栈不丢失</text>
            <text x={392} y={206} fontSize="11" fill={secondary}>替代「捕获-判断-重抛」</text>
            <text x={392} y={224} fontSize="11" fontWeight="600" fill={success}>在 catch 前精确过滤</text>
          </g>

          {/* 下：catch 顺序 */}
          <text x={VIEW_W / 2} y={262} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            catch 顺序：具体在前，基类在后
          </text>

          <g>
            <rect x={80} y={278} width={200} height={40} rx="6" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.4" />
            <text x={180} y={303} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
              catch (IOException)
            </text>
          </g>
          <line x1={180} y1={318} x2={180} y2={328} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-exc-arrow)" />

          <g>
            <rect x={80} y={330} width={200} height={40} rx="6" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.4" />
            <text x={180} y={355} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">
              catch (SystemException)
            </text>
          </g>

          <g>
            <rect x={320} y={304} width={280} height={50} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={460} y={326} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>
              反例：基类在前
            </text>
            <text x={460} y={344} textAnchor="middle" fontSize="11" fill={secondary}>
              具体异常永远无法被捕获
            </text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={384} x2={VIEW_W - 32} y2={384} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="11" fill={secondary}>
            重抛用裸 throw · 过滤器精确 catch · 顺序由具体到一般——异常不丢栈
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重抛异常必须用裸 throw 保留原始调用栈；异常过滤器 when 让你在进入 catch 前精确判定条件，避免捕获后再重抛的栈丢失；catch 顺序必须由具体异常到基类异常。
      </figcaption>
    </figure>
  );
}
