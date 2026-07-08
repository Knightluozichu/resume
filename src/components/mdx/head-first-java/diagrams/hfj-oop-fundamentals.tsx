/**
 * <HfjOopFundamentalsDiagram>：面向对象基础图解——类与对象。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function HfjOopFundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="面向对象基础图解——类与对象"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            面向对象基础——类与对象
          </text>

          {/* 类蓝图 */}
          <rect x="30" y="48" width="260" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="160" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">类（Class）= 蓝图</text>
          <line x1="40" y1="80" x2="280" y2="80" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="45" y="98" fontSize="11" fontWeight="600" fill="var(--text-primary)">class Dog &#123;</text>
          <text x="45" y="116" fontSize="10" fill="var(--text-secondary)">  // 实例变量（状态）</text>
          <text x="45" y="132" fontSize="10" fill="var(--text-secondary)">  int size;</text>
          <text x="45" y="148" fontSize="10" fill="var(--text-secondary)">  String breed;</text>
          <text x="45" y="164" fontSize="10" fill="var(--text-secondary)">  String name;</text>
          <text x="45" y="184" fontSize="10" fill="var(--text-secondary)">  // 方法（行为）</text>
          <text x="45" y="200" fontSize="10" fill="var(--text-secondary)">  void bark() &#123;...&#125;</text>
          <text x="45" y="216" fontSize="10" fill="var(--text-secondary)">  void eat() &#123;...&#125;</text>
          <text x="45" y="236" fontSize="10" fill="var(--text-secondary)">&#125;</text>

          {/* 箭头：实例化 */}
          <text x="340" y="100" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">new Dog()</text>
          <text x="340" y="118" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="340" y="160" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">new Dog()</text>
          <text x="340" y="178" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="340" y="220" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">new Dog()</text>
          <text x="340" y="238" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 对象1 */}
          <rect x="420" y="50" width="280" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">对象1: dogA</text>
          <text x="435" y="84" fontSize="9" fill="var(--text-secondary)">size=70, breed="金毛", name="旺财"</text>
          <text x="435" y="98" fontSize="9" fill="var(--text-secondary)">bark() &rarr; "汪汪汪!"</text>

          {/* 对象2 */}
          <rect x="420" y="118" width="280" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="136" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">对象2: dogB</text>
          <text x="435" y="152" fontSize="9" fill="var(--text-secondary)">size=20, breed="吉娃娃", name="小花"</text>
          <text x="435" y="166" fontSize="9" fill="var(--text-secondary)">bark() &rarr; "汪!"</text>

          {/* 对象3 */}
          <rect x="420" y="186" width="280" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">对象3: dogC</text>
          <text x="435" y="220" fontSize="9" fill="var(--text-secondary)">size=50, breed="哈士奇", name="二哈"</text>
          <text x="435" y="234" fontSize="9" fill="var(--text-secondary)">bark() &rarr; "嗷呜~"</text>

          {/* 封装 */}
          <text x={VIEW_W / 2} y="280" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            封装——用 private 隐藏状态，用 public 暴露行为
          </text>

          <rect x="30" y="294" width="340" height="180" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">不封装（坏实践）</text>
          <text x="45" y="334" fontSize="10" fill="var(--text-secondary)">class DogBad &#123;</text>
          <text x="45" y="350" fontSize="10" fill="var(--text-secondary)">  int size;  // 外部可随意改</text>
          <text x="45" y="366" fontSize="10" fill="var(--text-secondary)">&#125;</text>
          <text x="45" y="386" fontSize="10" fill="var(--text-secondary)">dog.size = -999; // 合法但荒谬</text>
          <text x="45" y="402" fontSize="10" fill="var(--text-secondary)">dog.size = 0;     // 合法但无效</text>
          <text x="45" y="426" fontSize="10" fill="var(--text-secondary)">问题: 状态可被任意破坏</text>
          <text x="45" y="442" fontSize="10" fill="var(--text-secondary)">无法校验, 无法保护不变量</text>
          <text x="45" y="462" fontSize="10" fill="var(--text-secondary)">调试困难, 责任不清</text>

          <rect x="390" y="294" width="320" height="180" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">封装（好实践）</text>
          <text x="405" y="334" fontSize="10" fill="var(--text-secondary)">class DogGood &#123;</text>
          <text x="405" y="350" fontSize="10" fill="var(--text-secondary)">  private int size; // 隐藏</text>
          <text x="405" y="366" fontSize="10" fill="var(--text-secondary)">  public int getSize() &#123; return size; &#125;</text>
          <text x="405" y="382" fontSize="10" fill="var(--text-secondary)">  public void setSize(int s) &#123;</text>
          <text x="405" y="398" fontSize="10" fill="var(--text-secondary)">    if (s &gt; 0) size = s; // 校验</text>
          <text x="405" y="414" fontSize="10" fill="var(--text-secondary)">  &#125;</text>
          <text x="405" y="434" fontSize="10" fill="var(--text-secondary)">&#125;</text>
          <text x="405" y="454" fontSize="10" fill="var(--text-secondary)">dog.setSize(70);  // 合法</text>
          <text x="405" y="470" fontSize="10" fill="var(--text-secondary)">dog.setSize(-1);  // 被拒绝</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面向对象基础——类是蓝图，对象是实例，封装用private隐藏状态、用public暴露行为
      </figcaption>
    </figure>
  );
}
