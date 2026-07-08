/**
 * <JpgFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JavaScript高级程序设计全书总复习知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：五层如何协同工作
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一次「点击按钮 → 发请求 → 更新页面」串联全部知识点
          </text>

          <defs>
            <marker id="arrF" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 中心旅程节点 */}
          <rect x="40" y="64" width="660" height="320" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 五个阶段节点 */}
          <rect x="60" y="88" width="130" height="70" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">① 语言基础</text>
          <text x="125" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">btn 用 const 声明</text>
          <text x="125" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">回调形成闭包</text>
          <text x="125" y="150" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">类型/作用域/闭包</text>

          <rect x="210" y="88" width="130" height="70" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="275" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">② 对象原型</text>
          <text x="275" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按钮是 DOM 对象</text>
          <text x="275" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原型链继承方法</text>
          <text x="275" y="150" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">属性/OOP/原型</text>

          <rect x="360" y="88" width="130" height="70" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="425" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③ 异步模型</text>
          <text x="425" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fetch 返回 Promise</text>
          <text x="425" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">await 暂停函数</text>
          <text x="425" y="150" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Promise/事件循环</text>

          <rect x="510" y="88" width="130" height="70" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="575" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">④ DOM/BOM</text>
          <text x="575" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">事件委托监听</text>
          <text x="575" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">textContent 更新</text>
          <text x="575" y="150" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DOM 树/BOM 对象</text>

          <rect x="285" y="184" width="170" height="64" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="370" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">⑤ 模块系统</text>
          <text x="370" y="220" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">import 处理函数</text>
          <text x="370" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ESM 静态加载</text>
          <text x="370" y="244" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">tree-shaking 打包</text>

          {/* 箭头串联 */}
          <path d="M190 123 L 208 123" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrF)" />
          <path d="M340 123 L 358 123" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrF)" />
          <path d="M490 123 L 508 123" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrF)" />
          <path d="M575 158 C 575 174, 370 170, 370 182" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrF)" />
          <path d="M285 216 C 220 216, 125 180, 125 160" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrF)" />

          {/* 完整代码旅程 */}
          <rect x="60" y="268" width="620" height="100" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="286" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">一次点击的完整代码旅程</text>
          <text x="74" y="304" fontSize="9" fill="var(--text-secondary)">btn.addEventListener(&quot;click&quot;, async () =&gt; &lbrace;  // ②DOM 事件 + ③异步</text>
          <text x="74" y="320" fontSize="9" fill="var(--text-secondary)">  const data = await fetchData();        // ⑤ESM import 的函数 + ③await</text>
          <text x="74" y="336" fontSize="9" fill="var(--text-secondary)">  display.textContent = format(data);    // ④DOM 更新 + ①闭包捕获的 format</text>
          <text x="74" y="352" fontSize="9" fill="var(--text-secondary)">&rbrace;);  // 整个回调是个闭包，保留对 btn/display 的引用</text>
          <text x="370" y="370" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">五层知识点在这 4 行代码里全部出现</text>

          {/* 总结 */}
          <rect x="60" y="388" width="620" height="40" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="406" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">工程判断力三问</text>
          <text x="370" y="422" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">数据是值还是引用？｜异步用 Promise 还是回调？｜性能瓶颈在 DOM 还是计算？</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            关键洞察：五层不是孤立知识，而是协同支撑每一次页面交互的运行时
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习：语言基础、对象原型、异步模型、DOM/BOM、模块系统五层在一次交互中协同工作
      </figcaption>
    </figure>
  );
}
