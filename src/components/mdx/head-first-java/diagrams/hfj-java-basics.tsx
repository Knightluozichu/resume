/**
 * <HfjJavaBasicsDiagram>：Java入门基础图解——从源码到运行。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function HfjJavaBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Java入门基础图解——从源码到运行"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Java入门基础——从源码到运行
          </text>

          {/* 编译流程 */}
          <rect x="30" y="48" width="200" height="80" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">1. 编写源码</text>
          <text x="130" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Hello.java</text>
          <text x="130" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">public class Hello &#123;</text>
          <text x="130" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  public static void main(...)</text>

          <text x="245" y="92" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="48" width="200" height="80" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">2. 编译 javac</text>
          <text x="370" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">javac Hello.java</text>
          <text x="370" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译器检查语法</text>
          <text x="370" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成 Hello.class 字节码</text>

          <text x="485" y="92" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="510" y="48" width="200" height="80" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">3. 运行 java</text>
          <text x="610" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">java Hello</text>
          <text x="610" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">JVM 加载 .class</text>
          <text x="610" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">执行 main 方法</text>

          {/* 变量类型 */}
          <text x={VIEW_W / 2} y="158" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            Java 基本数据类型
          </text>

          <rect x="30" y="172" width="105" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="82" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">整数</text>
          <text x="82" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">byte short</text>
          <text x="82" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">int long</text>

          <rect x="145" y="172" width="105" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="197" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">浮点</text>
          <text x="197" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">float</text>
          <text x="197" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">double</text>

          <rect x="260" y="172" width="105" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="312" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">字符</text>
          <text x="312" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">char</text>
          <text x="312" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">16位 Unicode</text>

          <rect x="375" y="172" width="105" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="427" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">布尔</text>
          <text x="427" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">boolean</text>
          <text x="427" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">true / false</text>

          <rect x="490" y="172" width="220" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="600" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">引用类型</text>
          <text x="600" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">String / 数组 / 自定义类</text>
          <text x="600" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变量存的是对象的引用地址</text>

          {/* 内存模型 */}
          <text x={VIEW_W / 2} y="258" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            栈与堆——变量存储模型
          </text>

          <rect x="40" y="272" width="300" height="180" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="190" y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">栈（Stack）——方法局部变量</text>
          <text x="60" y="312" fontSize="10" fill="var(--text-secondary)">int x = 42;       &rarr;  栈中直接存值 42</text>
          <text x="60" y="328" fontSize="10" fill="var(--text-secondary)">double d = 3.14;   &rarr;  栈中直接存值 3.14</text>
          <text x="60" y="344" fontSize="10" fill="var(--text-secondary)">boolean f = true;  &rarr;  栈中直接存值 true</text>
          <text x="60" y="360" fontSize="10" fill="var(--text-secondary)">char c = 'A';      &rarr;  栈中直接存值 'A'</text>
          <text x="60" y="380" fontSize="10" fill="var(--text-secondary)">基本类型: 值直接在栈上</text>
          <text x="60" y="396" fontSize="10" fill="var(--text-secondary)">方法结束时自动回收</text>
          <text x="60" y="420" fontSize="10" fill="var(--text-secondary)">引用变量 s 也在栈上:</text>
          <text x="60" y="436" fontSize="10" fill="var(--text-secondary)">String s = "hi";   &rarr; 栈存引用地址</text>

          <rect x="400" y="272" width="300" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">堆（Heap）——对象实际存放</text>
          <text x="420" y="312" fontSize="10" fill="var(--text-secondary)">new 创建的对象 &rarr; 堆上分配</text>
          <text x="420" y="328" fontSize="10" fill="var(--text-secondary)">String "hi" &rarr; 堆中 String 对象</text>
          <text x="420" y="344" fontSize="10" fill="var(--text-secondary)">int[] arr &rarr; 堆中数组对象</text>
          <text x="420" y="364" fontSize="10" fill="var(--text-secondary)">栈引用 s -----&gt; 堆对象 "hi"</text>
          <text x="420" y="384" fontSize="10" fill="var(--text-secondary)">栈引用 arr --&gt; 堆数组 [1,2,3]</text>
          <text x="420" y="408" fontSize="10" fill="var(--text-secondary)">引用类型: 栈存地址, 堆存对象</text>
          <text x="420" y="424" fontSize="10" fill="var(--text-secondary)">GC 负责回收无引用的对象</text>
          <text x="420" y="444" fontSize="10" fill="var(--text-secondary)">多个引用可指向同一个对象</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java入门基础——编译运行流程、基本数据类型、栈与堆的变量存储模型
      </figcaption>
    </figure>
  );
}
