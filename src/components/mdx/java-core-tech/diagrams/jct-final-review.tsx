/**
 * <JctFinalReviewDiagram>：全书复习图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Java核心技术全书复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Java核心技术——全书知识链路
          </text>

          {/* 四阶段总览 */}
          <rect x="30" y="48" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">全书四阶段总览</text>

          <rect x="50" y="82" width="150" height="50" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">基础与OOP</text>
          <text x="125" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">语法/类/继承/多态</text>

          <text x="220" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="235" y="82" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="310" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">接口与集合</text>
          <text x="310" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Lambda/泛型/Stream</text>

          <text x="405" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="82" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="495" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">IO与并发</text>
          <text x="495" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">流/NIO/线程/锁</text>

          <text x="590" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="605" y="82" width="100" height="50" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="655" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">高级与网络</text>
          <text x="655" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">反射/XML/Socket</text>

          {/* 知识链路 */}
          <text x={VIEW_W / 2} y="174" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            知识链路——从代码到架构
          </text>

          <rect x="30" y="188" width="680" height="136" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="45" y="208" fontSize="11" fill="var(--text-secondary)">1. 语法基础: 变量/类型/运算符/控制流/异常</text>
          <text x="45" y="224" fontSize="11" fill="var(--text-secondary)">2. OOP: 封装(private) &rarr; 继承(extends) &rarr; 多态(override) &rarr; 抽象(abstract)</text>
          <text x="45" y="240" fontSize="11" fill="var(--text-secondary)">3. 接口: interface &rarr; default &rarr; Lambda &rarr; 函数式接口 &rarr; 方法引用</text>
          <text x="45" y="256" fontSize="11" fill="var(--text-secondary)">4. 集合: List/Set/Queue/Map &rarr; 泛型类型安全 &rarr; 迭代器 fail-fast</text>
          <text x="45" y="272" fontSize="11" fill="var(--text-secondary)">5. IO: 字节流/字符流 &rarr; 缓冲/装饰器 &rarr; NIO Channel/Buffer &rarr; Stream API</text>
          <text x="45" y="288" fontSize="11" fill="var(--text-secondary)">6. 并发: Thread/Runnable &rarr; synchronized/Lock &rarr; volatile/CAS &rarr; 线程池</text>
          <text x="45" y="304" fontSize="11" fill="var(--text-secondary)">7. 高级: 注解@Retention &rarr; 反射invoke &rarr; 类加载双亲委派</text>
          <text x="45" y="320" fontSize="11" fill="var(--text-secondary)">8. 网络: DOM/SAX XML &rarr; JSON Jackson &rarr; Socket TCP &rarr; HttpClient</text>

          {/* 核心对比 */}
          <rect x="30" y="340" width="340" height="146" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">核心易混对比</text>
          <text x="45" y="378" fontSize="11" fill="var(--text-secondary)">== vs equals: 地址 vs 内容</text>
          <text x="45" y="394" fontSize="11" fill="var(--text-secondary)">String vs StringBuilder: 不可变 vs 可变</text>
          <text x="45" y="410" fontSize="11" fill="var(--text-secondary)">接口 vs 抽象类: 多实现 vs 单继承</text>
          <text x="45" y="426" fontSize="11" fill="var(--text-secondary)">synchronized vs Lock: 自动 vs 手动</text>
          <text x="45" y="442" fontSize="11" fill="var(--text-secondary)">HashMap vs ConcurrentHashMap:</text>
          <text x="45" y="456" fontSize="11" fill="var(--text-secondary)">  非线程安全 vs 分段锁/CAS</text>
          <text x="45" y="472" fontSize="11" fill="var(--text-secondary)">IO流 vs Stream API:</text>
          <text x="45" y="482" fontSize="11" fill="var(--text-secondary)">  数据读写 vs 函数式管道</text>

          {/* JVM核心概念 */}
          <rect x="390" y="340" width="320" height="146" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">JVM核心概念</text>
          <text x="405" y="378" fontSize="11" fill="var(--text-secondary)">JVM内存: 堆/栈/方法区/程序计数器</text>
          <text x="405" y="394" fontSize="11" fill="var(--text-secondary)">GC: 新生代(Eden+S0+S1)/老年代</text>
          <text x="405" y="410" fontSize="11" fill="var(--text-secondary)">  Minor GC / Full GC</text>
          <text x="405" y="426" fontSize="11" fill="var(--text-secondary)">类加载: 加载&minus;验证&minus;准备&minus;解析&minus;初始化</text>
          <text x="405" y="442" fontSize="11" fill="var(--text-secondary)">双亲委派: 先委派父加载器</text>
          <text x="405" y="458" fontSize="11" fill="var(--text-secondary)">字节码: .class &rarr; JVM解释/JIT编译</text>
          <text x="405" y="474" fontSize="11" fill="var(--text-secondary)">JIT: 热点代码编译为机器码</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java核心技术全书复习——四阶段总览、八步知识链路、核心易混对比与JVM核心概念
      </figcaption>
    </figure>
  );
}
