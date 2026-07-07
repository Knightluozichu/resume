/**
 * <EmcForwardingDiagram>：完美转发机制。
 *
 * 三段式展示完美转发的三块拼图：
 *   - 上段「通用引用」（accent 紫）：T&& 在类型推导上下文中是通用引用
 *   - 中段「引用折叠规则」（warning 暖）：四种折叠组合，最终非右即左
 *   - 下段「std::forward」（success 绿）：按值类别条件转型，保持左值/右值性
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

export function EmcForwardingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="完美转发三块拼图。上段通用引用（紫色）：T&& 在类型推导上下文中既能绑左值也能绑右值。中段引用折叠（暖色）：四种组合 T& & 折叠为 T&、T& && 折叠为 T&、T&& & 折叠为 T&、T&& && 折叠为 T&&，规则是有左则左。下段 std::forward（绿色）：左值实参转发为左值，右值实参转发为右值，保持值类别。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            完美转发的三块拼图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 24-28 · 通用引用 · 引用折叠 · std::forward
          </text>

          {/* 上段：通用引用 */}
          <g>
            <rect x={32} y={78} width={VIEW_W - 64} height={108} rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.55" />
            <text x={48} y={102} fontSize="13" fontWeight="700" fill="var(--accent)">
              ① 通用引用（Universal Reference）
            </text>
            <text x={48} y={124} fontSize="11.5" fill="var(--text-primary)" fontFamily="monospace">
              template&lt;typename T&gt; void f(T&amp;&amp; param);
            </text>
            <text x={48} y={146} fontSize="11" fill="var(--text-primary)">
              T&amp;&amp; 在「类型推导」上下文中是通用引用：左值实参 → T 推为 T&amp;，右值实参 → T 推为 T
            </text>
            <text x={48} y={166} fontSize="11" fill="var(--text-secondary)">
              关键：必须发生类型推导；auto&amp;&amp; 同理也是通用引用
            </text>
          </g>

          {/* 中段：引用折叠 */}
          <g>
            <rect x={32} y={202} width={VIEW_W - 64} height={132} rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.5" strokeOpacity="0.55" />
            <text x={48} y={226} fontSize="13" fontWeight="700" fill="var(--warning)">
              ② 引用折叠规则
            </text>

            {/* 四种折叠 */}
            <rect x={48} y={240} width={148} height={36} rx="6" fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x={122} y={262} textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              T&amp; &amp; → T&amp;
            </text>

            <rect x={208} y={240} width={148} height={36} rx="6" fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x={282} y={262} textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              T&amp; &amp;&amp; → T&amp;
            </text>

            <rect x={368} y={240} width={148} height={36} rx="6" fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x={442} y={262} textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              T&amp;&amp; &amp; → T&amp;
            </text>

            <rect x={528} y={240} width={148} height={36} rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.4" />
            <text x={602} y={262} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)" fontFamily="monospace">
              T&amp;&amp; &amp;&amp; → T&amp;&amp;
            </text>

            <text x={48} y={304} fontSize="11.5" fill="var(--text-primary)">
              口诀：只要其中一个是左值引用（&amp;），结果就是左值引用；两个都是右值引用（&amp;&amp;）才是右值引用
            </text>
            <text x={48} y={324} fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
              触发场景：模板实例化、auto、typedef/别名、decltype
            </text>
          </g>

          {/* 下段：std::forward */}
          <g>
            <rect x={32} y={350} width={VIEW_W - 64} height={118} rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.5" strokeOpacity="0.55" />
            <text x={48} y={374} fontSize="13" fontWeight="700" fill="var(--success)">
              ③ std::forward 按值类别条件转型
            </text>

            <text x={48} y={396} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              f(Widget&amp; w)  → forward(w)  转型为 Widget&amp;  （左值保持左值）
            </text>
            <text x={48} y={418} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              f(Widget&amp;&amp; w) → forward(w)  转型为 Widget&amp;&amp; （右值保持右值）
            </text>
            <text x={48} y={442} fontSize="11" fill="var(--text-primary)">
              forward 只在实参被右值初始化时才 cast 为右值，否则保持左值——实现「原样转发」
            </text>
            <text x={48} y={460} fontSize="10.5" fill="var(--text-secondary)">
              对比：std::move 是无条件右值 cast，std::forward 是有条件右值 cast
            </text>
          </g>

          {/* 底部总结 */}
          <line x1={32} y1={486} x2={VIEW_W - 32} y2={486} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={508} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            通用引用 + 引用折叠 + std::forward 三者合奏，才能把实参的值类别原样传给内部函数
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        完美转发由三块拼图组成：通用引用（T&& 配合类型推导）能同时接收左值与右值；引用折叠（有左则左）解析嵌套引用；std::forward 按实参初始化的值类别有条件地转型，保持左值/右值性。
      </figcaption>
    </figure>
  );
}
