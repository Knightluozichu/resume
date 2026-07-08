/**
 * <SiaAopDiagram>：面向切面编程（AOP）机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function SiaAopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Spring AOP面向切面编程机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Spring AOP——横切关注点分离
          </text>

          {/* 顶部：无AOP vs 有AOP */}
          <rect x="30" y="50" width="330" height="70" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">无AOP（关注点纠缠）</text>
          <text x="195" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">日志、事务、安全代码散布在每个方法</text>
          <text x="195" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">修改日志 = 改每个业务类</text>

          <rect x="380" y="50" width="330" height="70" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">有AOP（关注点分离）</text>
          <text x="545" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">日志/事务/安全抽成切面，声明式织入</text>
          <text x="545" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">业务类只写业务逻辑</text>

          {/* 中间：AOP核心概念 */}
          <text x="370" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">AOP 核心概念</text>

          <rect x="30" y="170" width="330" height="150" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="195" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">切面 Aspect</text>
          <text x="195" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Aspect 标注的类</text>
          <text x="195" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">封装横切关注点（如日志切面）</text>
          <text x="195" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">切点 Pointcut</text>
          <text x="195" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Pointcut 定义「在哪里」</text>
          <text x="195" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">execution(* x.Service.*(..))</text>
          <text x="195" y="304" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">通知 Advice</text>
          <text x="195" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Before/@After/@Around 定义「做什么」</text>

          <rect x="380" y="170" width="330" height="150" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="545" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">织入 Weaving</text>
          <text x="545" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">把切面应用到目标对象</text>
          <text x="545" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Spring 用运行时代理（JDK/CGLIB）</text>
          <text x="545" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">目标对象 Target</text>
          <text x="545" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">被代理的业务Bean</text>
          <text x="545" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">连接点 JoinPoint</text>
          <text x="545" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法执行的那一个时刻</text>
          <text x="545" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Spring仅支持方法级连接点</text>

          {/* 底部：五种通知时序 */}
          <text x="370" y="355" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">五种通知类型——围绕目标方法的时序</text>

          <rect x="30" y="370" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="90" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">@Before</text>
          <text x="90" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">方法前执行</text>

          <text x="158" y="400" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="175" y="370" width="120" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="235" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">@Around</text>
          <text x="235" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">环绕（前后都执行）</text>

          <text x="303" y="400" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="370" width="120" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.10" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="380" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">目标方法</text>
          <text x="380" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">业务逻辑执行</text>

          <text x="448" y="400" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="465" y="370" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="525" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">@AfterReturning</text>
          <text x="525" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">正常返回后</text>

          <text x="593" y="400" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="610" y="370" width="100" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="660" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">@AfterThrowing</text>
          <text x="660" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">抛异常后</text>

          {/* @After 说明 */}
          <rect x="30" y="440" width="680" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">@After（最终通知）</text>
          <text x="370" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无论正常返回还是抛异常都执行——类似 finally，常用于资源清理</text>
          <text x="370" y="492" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@Around 最强大：可决定是否执行目标、修改参数、修改返回值、吞掉异常</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Spring AOP——切面、切点、通知、织入四要素，五种通知类型围绕目标方法的执行时序
      </figcaption>
    </figure>
  );
}
