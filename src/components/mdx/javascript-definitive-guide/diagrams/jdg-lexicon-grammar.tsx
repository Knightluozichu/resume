/**
 * <JdgLexiconGrammarDiagram>：词法结构与语法图解（Unicode、分号、关键字）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgLexiconGrammarDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="词法结构与语法图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            词法结构：从源码字符到可执行程序
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Unicode / 注释 / 分号插入 / 标识符与保留字
          </text>

          {/* 顶部：四个词法要素 */}
          <rect x="30" y="68" width="680" height="92" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四个词法要素（程序的字符级构成）</text>

          <rect x="50" y="100" width="150" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Unicode 文本</text>
          <text x="125" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">区分大小写 / UTF-16</text>

          <rect x="214" y="100" width="150" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="289" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">注释与空白</text>
          <text x="289" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">// 与 /* */ 两种</text>

          <rect x="378" y="100" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="453" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">分号与 ASI</text>
          <text x="453" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自动分号插入规则</text>

          <rect x="542" y="100" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="617" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">标识符与关键字</text>
          <text x="617" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">保留字不可做变量名</text>

          {/* 中部：ASI 规则 */}
          <rect x="30" y="176" width="680" height="148" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">ASI 自动分号插入（为什么省略分号有时会出错）</text>

          <rect x="50" y="210" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="150" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">1. 遇换行符</text>
          <text x="150" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">下一 token 无法拼接时补 ;</text>

          <rect x="270" y="210" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">2. 遇 &rbrace; 结束</text>
          <text x="370" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">块尾自动补 ;</text>

          <rect x="490" y="210" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="590" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">3. 输入流结束</text>
          <text x="590" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文件末尾补 ;</text>

          <text x="50" y="286" fontSize="11" fill="var(--danger)">隐患：return\nvalue  会被 ASI 在 return 后补分号 → 返回 undefined</text>
          <text x="50" y="304" fontSize="11" fill="var(--danger)">隐患：a\n(b+c)  不补分号 → 被解析成 a(b+c) 调用</text>

          {/* 底部：关键字分类 */}
          <rect x="30" y="340" width="680" height="92" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">保留字分类</text>
          <text x="50" y="382" fontSize="11" fill="var(--text-secondary)">语言关键字：var / let / const / function / class / return / if / for / async / await</text>
          <text x="50" y="400" fontSize="11" fill="var(--text-secondary)">保留待用：enum / implements / interface / package（严格模式保留，暂未启用）</text>
          <text x="50" y="418" fontSize="11" fill="var(--text-secondary)">特殊字面量：true / false / null / undefined（不是关键字但不可作标识符）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        词法结构由 Unicode 文本、注释空白、ASI 分号插入、标识符保留字四要素构成，是源码到程序的第一层
      </figcaption>
    </figure>
  );
}
