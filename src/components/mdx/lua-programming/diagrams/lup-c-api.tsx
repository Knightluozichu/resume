/**
 * <LupCApiDiagram>：Lua C API 栈模型。
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

export function LupCApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua C API 栈模型：C 与 Lua 通过虚拟栈交换数据，lua_push 压栈，lua_to 取值，lua_gettop 获取栈大小。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            C API：虚拟栈模型
          `}</text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>{`
            C 与 Lua 通过虚拟栈交换数据 · 栈底→栈顶 索引 1→n · 负索引 -1=栈顶
          `}</text>

          {/* 虚拟栈 */}
          <text x={360} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            Lua 虚拟栈
          `}</text>

          {/* 栈帧（从底到顶） */}
          <rect x={280} y={92} width={160} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={360} y={110} textAnchor="middle" fontSize="11" fill={primary}>{`字符串 "hello"`}</text>
          <text x={460} y={110} fontSize="10" fill={secondary}>{`[1] / [-3]`}</text>

          <rect x={280} y={124} width={160} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={360} y={142} textAnchor="middle" fontSize="11" fill={primary}>{`数字 42`}</text>
          <text x={460} y={142} fontSize="10" fill={secondary}>{`[2] / [-2]`}</text>

          <rect x={280} y={156} width={160} height={28} rx="4" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.2" strokeOpacity="0.6" />
          <text x={360} y={174} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>{`nil ← 栈顶`}</text>
          <text x={460} y={174} fontSize="10" fill={success}>{`[3] / [-1]`}</text>

          {/* 栈底标签 */}
          <text x={360} y={200} textAnchor="middle" fontSize="10" fill={secondary}>{`↑ 栈底  栈顶 ↑`}</text>

          {/* 左侧：压栈操作 */}
          <text x={120} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>{`
            压栈（C→Lua）
          `}</text>

          <rect x={32} y={92} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={108} fontSize="11" fill={primary}>{`lua_pushstring(L, "hi")`}</text>

          <rect x={32} y={122} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={138} fontSize="11" fill={primary}>{`lua_pushnumber(L, 3.14)`}</text>

          <rect x={32} y={152} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={168} fontSize="11" fill={primary}>{`lua_pushnil(L)`}</text>

          <rect x={32} y={182} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={198} fontSize="11" fill={primary}>{`lua_pushboolean(L, 1)`}</text>

          {/* 右侧：取值操作 */}
          <text x={600} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>{`
            取值（Lua→C）
          `}</text>

          <rect x={500} y={92} width={188} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={512} y={108} fontSize="11" fill={primary}>{`lua_tostring(L, -1)`}</text>

          <rect x={500} y={122} width={188} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={512} y={138} fontSize="11" fill={primary}>{`lua_tonumber(L, 2)`}</text>

          <rect x={500} y={152} width={188} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={512} y={168} fontSize="11" fill={primary}>{`lua_gettop(L)`}</text>

          <rect x={500} y={182} width={188} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={512} y={198} fontSize="11" fill={primary}>{`lua_pop(L, 1)`}</text>

          {/* 底部：注册 C 函数 */}
          <line x1={32} y1={220} x2={VIEW_W - 32} y2={220} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={242} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            注册 C 函数到 Lua
          `}</text>

          <rect x={40} y={256} width={640} height={96} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={56} y={276} fontSize="11" fill={primary}>{`static int l_add(lua_State *L) {`}</text>
          <text x={56} y={294} fontSize="11" fill={primary}>{`  double a = lua_tonumber(L, 1);  // 从栈底取第1个参数`}</text>
          <text x={56} y={312} fontSize="11" fill={primary}>{`  double b = lua_tonumber(L, 2);  // 取第2个参数`}</text>
          <text x={56} y={330} fontSize="11" fill={primary}>{`  lua_pushnumber(L, a + b);      // 结果压栈`}</text>
          <text x={56} y={348} fontSize="11" fill={primary}>{`  return 1;                       // 返回值个数`}</text>

          <text x={VIEW_W / 2} y={374} textAnchor="middle" fontSize="11" fill={secondary}>{`
            lua_register(L, "add", l_add)  — 注册后 Lua 中可直接调用 add(1, 2)
          `}</text>
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>{`
            栈是唯一接口：C 不能直接操作 Lua 变量，必须通过栈交换
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C API 通过虚拟栈与 Lua 交换数据，C 函数从栈取参数、结果压栈、返回值个数。
      </figcaption>
    </figure>
  );
}
