/**
 * <JctJavaFundamentalsDiagram>：Java基础语法图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctJavaFundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Java基础语法图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Java基础语法——数据类型与控制流
          </text>

          {/* 基本数据类型 */}
          <rect x="30" y="48" width="340" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">基本数据类型（8种）</text>

          <rect x="45" y="82" width="100" height="34" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="95" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">byte 1字节</text>
          <text x="95" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">-128 ~ 127</text>

          <rect x="155" y="82" width="100" height="34" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="205" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">short 2字节</text>
          <text x="205" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">-32768 ~ 32767</text>

          <rect x="265" y="82" width="100" height="34" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="315" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">int 4字节</text>
          <text x="315" y="110" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">默认整数类型</text>

          <rect x="45" y="122" width="100" height="34" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="95" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">long 8字节</text>
          <text x="95" y="150" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">需加 L 后缀</text>

          <rect x="155" y="122" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="205" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">float 4字节</text>
          <text x="205" y="150" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">需加 F 后缀</text>

          <rect x="265" y="122" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="315" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">double 8字节</text>
          <text x="315" y="150" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">默认浮点类型</text>

          <rect x="45" y="162" width="150" height="34" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="120" y="178" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">char 2字节</text>
          <text x="120" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Unicode字符</text>

          <rect x="205" y="162" width="150" height="34" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="280" y="178" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">boolean 1位</text>
          <text x="280" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">true / false</text>

          <text x="200" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">基本类型直接存值, 存于栈内存</text>
          <text x="200" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自动装箱: int &rarr; Integer</text>

          {/* 引用类型 */}
          <rect x="390" y="48" width="320" height="200" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="550" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">引用类型</text>
          <text x="405" y="92" fontSize="10" fill="var(--text-secondary)">String s = "Hello";   // 不可变</text>
          <text x="405" y="110" fontSize="10" fill="var(--text-secondary)">int[] arr = new int[5];  // 数组</text>
          <text x="405" y="128" fontSize="10" fill="var(--text-secondary)">Object o = new Object();</text>
          <text x="405" y="146" fontSize="10" fill="var(--text-secondary)">Integer i = 42;  // 包装类</text>
          <text x="405" y="168" fontSize="10" fill="var(--text-secondary)">引用类型存地址, 存于堆内存</text>
          <text x="405" y="184" fontSize="10" fill="var(--text-secondary)">==比较地址, equals比较内容</text>
          <text x="405" y="200" fontSize="10" fill="var(--text-secondary)">String 不可变, 修改创建新对象</text>
          <text x="405" y="216" fontSize="10" fill="var(--text-secondary)">StringBuilder 可变字符串</text>
          <text x="405" y="238" fontSize="10" fill="var(--text-secondary)">null 表示引用不指向任何对象</text>

          {/* 控制流 */}
          <text x={VIEW_W / 2} y="278" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            控制流
          </text>

          <rect x="30" y="292" width="220" height="60" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">条件分支</text>
          <text x="140" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">if / else if / else</text>
          <text x="140" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">switch / case / yield</text>

          <rect x="260" y="292" width="220" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">循环迭代</text>
          <text x="370" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">for / while / do-while</text>
          <text x="370" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">for-each / break / continue</text>

          <rect x="490" y="292" width="220" height="60" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">异常处理</text>
          <text x="600" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">try / catch / finally</text>
          <text x="600" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">throw / throws / try-with</text>

          {/* 运算符与变量 */}
          <rect x="30" y="372" width="340" height="110" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="200" y="392" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">变量与运算符</text>
          <text x="45" y="412" fontSize="10" fill="var(--text-secondary)">int x = 10; double y = 3.14;</text>
          <text x="45" y="428" fontSize="10" fill="var(--text-secondary)">var z = "推断类型";  // Java 10+</text>
          <text x="45" y="444" fontSize="10" fill="var(--text-secondary)">算术: + - * / %  关系: == != &lt; &gt;</text>
          <text x="45" y="460" fontSize="10" fill="var(--text-secondary)">逻辑: &amp;&amp; || !  位: &amp; | ^ ~</text>
          <text x="45" y="476" fontSize="10" fill="var(--text-secondary)">三目: cond ? a : b  赋值: = += -=</text>

          {/* 类型转换 */}
          <rect x="390" y="372" width="320" height="110" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="392" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">类型转换</text>
          <text x="405" y="412" fontSize="10" fill="var(--text-secondary)">自动转换（ widening ）:</text>
          <text x="405" y="428" fontSize="10" fill="var(--text-secondary)">  byte &rarr; short &rarr; int &rarr; long &rarr; float</text>
          <text x="405" y="444" fontSize="10" fill="var(--text-secondary)">强制转换（ narrowing ）:</text>
          <text x="405" y="460" fontSize="10" fill="var(--text-secondary)">  double d = 3.14; int n = (int) d;  // n=3</text>
          <text x="405" y="476" fontSize="10" fill="var(--text-secondary)">强转可能丢失精度或溢出!</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java基础语法——8种基本数据类型、引用类型、控制流分支循环、运算符与类型转换
      </figcaption>
    </figure>
  );
}
