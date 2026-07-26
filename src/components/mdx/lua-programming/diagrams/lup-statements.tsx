/**
 * <LupStatementsDiagram>：Lua 语句与控制结构。
 *
 * 局部变量、if-elseif-else、while/repeat/for 循环、break/return。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function LupStatementsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 语句与控制结构：local 局部变量声明、if-elseif-else 条件分支、while/repeat/for 循环、break/return 跳转。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            语句与控制结构
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            local 声明 · if-elseif-else · while/repeat/for · break/return
          </text>

          {/* 左侧：变量声明 */}
          <text x={160} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            变量声明
          </text>

          <rect x={40} y={92} width={240} height={32} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={52} y={112} fontSize="12" fontWeight="600" fill={accent}>local</text>
          <text x={100} y={112} fontSize="11" fill={secondary}>局部变量（推荐）</text>

          <rect x={40} y={132} width={240} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={152} fontSize="12" fill={primary}>x = 10</text>
          <text x={110} y={152} fontSize="11" fill={secondary}>全局变量（慎用）</text>

          <rect x={40} y={172} width={240} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={192} fontSize="11" fill={primary}>local a, b = 1, 2</text>
          <text x={170} y={192} fontSize="11" fill={secondary}>多重赋值</text>

          <text x={160} y={222} textAnchor="middle" fontSize="11" fill={secondary}>默认全局——必须用 local 声明局部</text>
          <text x={160} y={238} textAnchor="middle" fontSize="11" fill={secondary}>尽量用 local：更快、不污染全局</text>

          {/* 分隔线 */}
          <line x1={300} y1={70} x2={300} y2={250} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：条件与循环 */}
          <text x={510} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            控制结构
          </text>

          <rect x={320} y={92} width={360} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={332} y={110} fontSize="12" fontWeight="600" fill={accent}>if</text>
          <text x={360} y={110} fontSize="11" fill={secondary}>cond then ... elseif cond then ... else ... end</text>

          <rect x={320} y={128} width={360} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={332} y={146} fontSize="12" fontWeight="600" fill={success}>while</text>
          <text x={380} y={146} fontSize="11" fill={secondary}>cond do ... end （先判断后执行）</text>

          <rect x={320} y={164} width={360} height={28} rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={332} y={182} fontSize="12" fontWeight="600" fill={warning}>repeat</text>
          <text x={390} y={182} fontSize="11" fill={secondary}>... until cond （先执行后判断）</text>

          <rect x={320} y={200} width={360} height={28} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={332} y={218} fontSize="12" fontWeight="600" fill={danger}>for</text>
          <text x={360} y={218} fontSize="11" fill={secondary}>i = 1, 10 do ... end （数值遍历）</text>

          <rect x={320} y={236} width={360} height={28} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={332} y={254} fontSize="12" fontWeight="600" fill={danger}>for</text>
          <text x={360} y={254} fontSize="11" fill={secondary}>k, v in pairs(t) do ... end （泛型遍历）</text>

          {/* 底部：for 循环详解 */}
          <line x1={32} y1={270} x2={VIEW_W - 32} y2={270} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={292} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            for 循环详解
          </text>

          <rect x={40} y={306} width={320} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={324} fontSize="11" fill={primary}>for i = 1, 10, 2 do</text>
          <text x={220} y={324} fontSize="11" fill={secondary}>从1到10步进2</text>

          <rect x={40} y={340} width={320} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={358} fontSize="11" fill={primary}>for i = #t, 1, -1 do</text>
          <text x={220} y={358} fontSize={11} fill={secondary}>倒序遍历数组</text>

          <rect x={376} y={306} width={304} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={388} y={324} fontSize="11" fill={primary}>for k, v in pairs(t) do</text>
          <text x={540} y={324} fontSize="11" fill={secondary}>遍历所有键值对</text>

          <rect x={376} y={340} width={304} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={388} y={358} fontSize="11" fill={primary}>for i, v in ipairs(t) do</text>
          <text x={540} y={358} fontSize="11" fill={secondary}>遍历数组部分</text>

          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            注意：Lua 没有 continue，没有 switch，没有 ++ 。循环变量 for 中是局部的新变量
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 控制结构使用 then/do...end 作为块标记，默认全局变量，必须用 local 声明局部。
      </figcaption>
    </figure>
  );
}
