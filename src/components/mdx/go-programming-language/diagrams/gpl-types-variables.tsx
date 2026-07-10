/**
 * <GplTypesVariablesDiagram>：Go 值类型赋值时复制，引用类型共享底层数据；零值机制保证无未初始化变量。
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

export function GplTypesVariablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go 类型系统与变量声明。值类型赋值复制，引用类型（slice/map）共享底层数据。零值机制保证安全。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`类型系统与变量`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`值类型复制 · 引用类型共享 · 零值保证安全`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`基本类型`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`int/float/bool`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`string/rune/byte`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`var/x:= 声明`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`类型推断`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`值 vs 引用`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`值类型: 复制`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`struct/array/int`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`引用: slice/map/chan`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`共享底层数据`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`零值机制`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`数值=0`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`bool=false`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`string=""`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`指针/map=nil`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`nil map 不能写入需 make · nil slice 可 append 自动分配 · nil 指针解引用 panic`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`slice 传参 header 拷贝但底层数组共享 · append 扩容后分道扬镳`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 值类型赋值时复制，引用类型共享底层数据；零值机制保证无未初始化变量。
      </figcaption>
    </figure>
  );
}
