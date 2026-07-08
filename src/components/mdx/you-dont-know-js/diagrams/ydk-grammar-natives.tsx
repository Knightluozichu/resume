/**
 * <YdkGrammarNativesDiagram>：语法与原生函数（包装类型、字符串方法）图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkGrammarNativesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="语法与原生函数及包装类型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            原生函数与包装类型：原始值如何调用方法
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            原始值没有方法，引擎临时装箱（boxing）成包装对象再丢弃
          </text>

          {/* 左：原始值 vs 包装对象 */}
          <rect x="30" y="72" width="330" height="200" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">原始值 vs 包装对象</text>

          <rect x="50" y="104" width="290" height="44" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="122" fontSize="11" fontWeight="600" fill="var(--text-primary)">let s = "hi"</text>
          <text x="60" y="138" fontSize="10" fill="var(--text-secondary)">原始字符串，无属性方法</text>

          <text x="195" y="166" textAnchor="middle" fontSize="11" fill="var(--accent)">s.length 访问时发生了什么？</text>

          <rect x="50" y="178" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="194" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">1. 装箱：new String("hi")</text>
          <text x="195" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">临时包装对象，有 length 属性</text>

          <rect x="50" y="226" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="242" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">2. 拆箱：对象立即销毁</text>
          <text x="195" y="258" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">s.x = 1 赋值会丢失（写不到原始值）</text>

          {/* 右：原生构造器清单 */}
          <rect x="380" y="72" width="330" height="200" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">原生构造器（用途分类）</text>

          <text x="400" y="116" fontSize="11" fill="var(--text-primary)">推荐 new（创建对象）：</text>
          <text x="400" y="134" fontSize="11" fill="var(--success)">Object Array Function RegExp Date Error Map Set</text>

          <text x="400" y="162" fontSize="11" fill="var(--text-primary)">可当函数（显式转换，无 new）：</text>
          <text x="400" y="180" fontSize="11" fill="var(--warning)">String(123) Number("9") Boolean(0)</text>

          <text x="400" y="208" fontSize="11" fill="var(--text-primary)">避免 new（产生包装对象，易踩坑）：</text>
          <text x="400" y="226" fontSize="11" fill="var(--danger)">new String("a") === "a" 为 false</text>
          <text x="400" y="244" fontSize="11" fill="var(--danger)">typeof new Number(1) 为 "object"</text>
          <text x="400" y="262" fontSize="10" fill="var(--text-secondary)">Symbol/null/undefined 无对应包装构造器</text>

          {/* 底部：语句与表达式语法要点 */}
          <rect x="30" y="288" width="680" height="132" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="308" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">语法要点：运算符优先级与自动分号</text>

          <rect x="50" y="320" width="320" height="86" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="64" y="340" fontSize="11" fontWeight="600" fill="var(--text-primary)">运算符优先级决定结合方式</text>
          <text x="64" y="358" fontSize="10" fill="var(--text-secondary)">a &amp;&amp; b || c  等价 (a &amp;&amp; b) || c</text>
          <text x="64" y="376" fontSize="10" fill="var(--text-secondary)">&amp;&amp; 高于 ||，都高于 ?:</text>
          <text x="64" y="394" fontSize="10" fill="var(--text-secondary)">用括号显式表达意图，别背优先级表</text>

          <rect x="390" y="320" width="300" height="86" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="404" y="340" fontSize="11" fontWeight="600" fill="var(--text-primary)">自动分号插入（ASI）</text>
          <text x="404" y="358" fontSize="10" fill="var(--text-secondary)">return 换行会被补分号 → 返回 undefined</text>
          <text x="404" y="376" fontSize="10" fill="var(--text-secondary)">行首以 [ ( 开头可能合并上一行</text>
          <text x="404" y="394" fontSize="10" fill="var(--text-secondary)">建议显式写分号，不依赖 ASI</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：原始值轻量无方法，包装对象临时存在；语法是约定，机制是真相
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原始值通过临时装箱调用方法；原生构造器分清对象创建与显式转换两类用途
      </figcaption>
    </figure>
  );
}
