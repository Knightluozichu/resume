/**
 * <CpcMemoryModelDiagram>：C++ 程序虚拟地址空间布局（cpu-eye-cpp 内存模型章）。
 *
 * 纵向五段内存布局：代码段、只读数据、数据段、BSS、堆（向上长）、栈（向下长），
 * 每段标注存放内容与特性。右侧标注「低地址 → 高地址」方向。
 * 底部给出对象布局示例（含 vptr + 成员 + 对齐填充）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 段布局主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 500;

// 左侧段列表几何
const SEG_X = 80;
const SEG_W = 300;
const SEG_TOP = 104;
const SEG_H = 40;
const SEG_GAP = 8;

// 右侧对象布局几何
const OBJ_X = 432;
const OBJ_W = 208;
const OBJ_TOP = 104;

type Segment = {
  name: string;
  color: string;
  desc: string;
};

const SEGMENTS: readonly Segment[] = [
  { name: "代码段 (Text)", color: "var(--accent)", desc: "机器指令，只读可执行" },
  { name: "只读数据 (RODATA)", color: "var(--accent)", desc: "const 常量、字符串字面量" },
  { name: "数据段 (Data)", color: "var(--success)", desc: "已初始化全局/静态变量" },
  { name: "BSS 段", color: "var(--success)", desc: "未初始化全局/静态（加载清零）" },
  { name: "堆 (Heap)", color: "var(--warning)", desc: "new/malloc 动态分配，向上增长" },
  { name: "栈 (Stack)", color: "var(--danger)", desc: "局部变量/参数/返回地址，向下增长" },
];

type ObjField = {
  name: string;
  bytes: string;
  color: string;
  note: string;
};

const OBJ_FIELDS: readonly ObjField[] = [
  { name: "vptr", bytes: "8B", color: "var(--warning)", note: "虚指针（有虚函数时）" },
  { name: "int x", bytes: "4B", color: "var(--success)", note: "数据成员" },
  { name: "char c", bytes: "1B", color: "var(--success)", note: "数据成员" },
  { name: "padding", bytes: "3B", color: "var(--border)", note: "对齐填充" },
];

export function CpcMemoryModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 程序虚拟地址空间布局。从低地址到高地址：代码段（机器指令只读）、只读数据段（const 常量）、数据段（已初始化全局变量）、BSS 段（未初始化全局变量加载时清零）、堆（new 分配向上增长）、栈（局部变量向下增长）。右侧展示一个含虚函数的对象内存布局：vptr 8 字节 + int x 4 字节 + char c 1 字节 + 对齐填充 3 字节 = 16 字节。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 程序虚拟地址空间布局
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：内存段布局（低地址 → 高地址）　右：含虚函数对象内存布局
          </text>

          {/* ===== 左：段列表 ===== */}
          <text x={SEG_X} y={SEG_TOP - 12} fontSize="13" fontWeight="700" fill="var(--text-primary)">内存段</text>
          {/* 低地址标记 */}
          <text x={SEG_X - 12} y={SEG_TOP + 4} fontSize="11" fill="var(--text-secondary)">低</text>

          {SEGMENTS.map((s, i) => {
            const y = SEG_TOP + i * (SEG_H + SEG_GAP);
            return (
              <g key={s.name}>
                <rect x={SEG_X} y={y} width={SEG_W} height={SEG_H} rx="6" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeWidth="1.2" />
                <circle cx={SEG_X + 12} cy={y + SEG_H / 2} r="3" fill={s.color} />
                <text x={SEG_X + 24} y={y + 17} fontSize="12" fontWeight="700" fill="var(--text-primary)">{s.name}</text>
                <text x={SEG_X + 24} y={y + 32} fontSize="11" fill="var(--text-secondary)">{s.desc}</text>
                {i < SEGMENTS.length - 1 && (
                  <line x1={SEG_X + SEG_W / 2} y1={y + SEG_H} x2={SEG_X + SEG_W / 2} y2={y + SEG_H + SEG_GAP} stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" />
                )}
              </g>
            );
          })}
          {/* 高地址标记 */}
          <text x={SEG_X - 12} y={SEG_TOP + 6 * (SEG_H + SEG_GAP) - 4} fontSize="11" fill="var(--text-secondary)">高</text>

          {/* ===== 右：对象布局 ===== */}
          <text x={OBJ_X} y={OBJ_TOP - 12} fontSize="13" fontWeight="700" fill="var(--text-primary)">对象布局 struct A {`{virtual void f(); int x; char c;};`}</text>

          <rect x={OBJ_X} y={OBJ_TOP} width={OBJ_W} height={4 * 36 + 16} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />

          {OBJ_FIELDS.map((f, i) => {
            const y = OBJ_TOP + 8 + i * 36;
            return (
              <g key={f.name}>
                <rect x={OBJ_X + 12} y={y} width={OBJ_W - 24} height="30" rx="4" fill={f.color} fillOpacity="0.12" stroke={f.color} strokeWidth="1" />
                <text x={OBJ_X + 24} y={y + 20} fontSize="12" fontWeight="700" fill="var(--text-primary)">{f.name}</text>
                <text x={OBJ_X + OBJ_W - 20} y={y + 20} textAnchor="end" fontSize="11" fill={f.color}>{f.bytes}</text>
                <text x={OBJ_X + 24} y={y + 44} fontSize="11" fill="var(--text-secondary)">{f.note}</text>
              </g>
            );
          })}

          {/* sizeof 标注 */}
          <rect x={OBJ_X} y={OBJ_TOP + 4 * 36 + 28} width={OBJ_W} height="28" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={OBJ_X + OBJ_W / 2} y={OBJ_TOP + 4 * 36 + 46} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">sizeof(A) = 16 字节</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            栈自动管理、堆手动管理；对象含 vptr 与对齐填充，sizeof 反映真实内存占用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        程序地址空间分代码段、只读数据、数据段、BSS、堆、栈。BSS 不占可执行文件空间（加载清零）。含虚函数的对象起始有 vptr，末尾按对齐补齐，sizeof 反映含填充的真实占用。
      </figcaption>
    </figure>
  );
}
