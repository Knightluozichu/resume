/**
 * <EppCppBasicsDiagram>：C++ 最小程序解剖图（cpp-primer-plus 基础语法章）。
 *
 * 把一段最简 C++ 程序逐行拆成五张「代码 → 解释」配对卡片：
 *   #include 预处理 / using namespace 命名空间 / main 入口 / cout 输出 / return 返回
 * 左侧代码框等宽风格，右侧解释卡片点明每行作用，配对间用板块色细线相连。
 * 底部总结栏点出「预处理 + 入口 + I/O」三要素。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×480、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 五行配对 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const CODE_X = 48;
const CODE_W = 268;
const EXPL_X = 372;
const EXPL_W = 300;
const ROW_H = 48;
const ROW_GAP = 12;
const ROW_TOP = 116;

type Row = {
  code: string;
  expl: string;
  color: string;
};

const ROWS: readonly Row[] = [
  { code: "#include <iostream>", expl: "预处理指令：把输入输出库头文件插入源码", color: "var(--accent)" },
  { code: "using namespace std;", expl: "命名空间声明：省去 std:: 前缀直接用 cout", color: "var(--success)" },
  { code: "int main() {", expl: "程序入口：操作系统调用 main，返回 int 状态码", color: "var(--warning)" },
  { code: '  cout << "Hello";', expl: "标准输出：插入运算符把文本送到屏幕", color: "var(--accent)" },
  { code: "  return 0; }", expl: "返回语句：0 表示正常结束，交还控制权给 OS", color: "var(--success)" },
];

export function EppCppBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 最小程序解剖图。五行代码逐一解释：#include 预处理指令引入输入输出库；using namespace std 声明命名空间省去前缀；int main 是程序入口由操作系统调用；cout 用插入运算符把文本送到屏幕；return 0 返回状态码 0 表示正常结束。底部总结：预处理、入口、I/O 是 C++ 程序三要素。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 最小程序解剖
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            预处理 + 命名空间 + 入口 + I/O + 返回，五要素构成一个可运行程序
          </text>

          {/* ===== 列头 ===== */}
          <text x={CODE_X + CODE_W / 2} y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">代码</text>
          <text x={EXPL_X + EXPL_W / 2} y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">作用</text>

          {/* ===== 五行配对 ===== */}
          {ROWS.map((r, i) => {
            const y = ROW_TOP + i * (ROW_H + ROW_GAP);
            return (
              <g key={r.code}>
                {/* 代码框 */}
                <rect x={CODE_X} y={y} width={CODE_W} height={ROW_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <text x={CODE_X + 16} y={y + ROW_H / 2 + 4} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">{r.code}</text>
                {/* 连接线 */}
                <line x1={CODE_X + CODE_W} y1={y + ROW_H / 2} x2={EXPL_X} y2={y + ROW_H / 2} stroke={r.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <circle cx={EXPL_X} cy={y + ROW_H / 2} r="3" fill={r.color} />
                {/* 解释卡片 */}
                <rect x={EXPL_X} y={y} width={EXPL_W} height={ROW_H} rx="8" fill={r.color} fillOpacity="0.06" stroke={r.color} strokeWidth="1" strokeOpacity="0.4" />
                <text x={EXPL_X + 16} y={y + ROW_H / 2 + 4} fontSize="12" fill="var(--text-primary)">{r.expl}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 56} width={VIEW_W - 120} height="40" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 38} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            程序三要素：预处理引入库、main 作入口、I/O 与外界交互
          </text>
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            return 把状态码交还操作系统，标志程序生命周期的结束
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一段最简 C++ 程序由五要素构成：#include 预处理引入库、using namespace 简化命名、main 作程序入口、cout 做输入输出、return 交还控制权。理解这五行就掌握了 C++ 程序的骨架。
      </figcaption>
    </figure>
  );
}
