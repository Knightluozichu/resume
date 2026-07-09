/**
 * <KiaFinalReviewDiagram>：Kotlin实战 第9章 全书复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function KiaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习——知识图谱与选型矩阵图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin实战全书复习——知识图谱
          </text>

          {/* 上半部：知识维度总览 */}
          <rect x="30" y="50" width="680" height="240" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">三大知识维度回顾</text>

          <rect x="50" y="90" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">语言核心</text>
          <text x="150" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">简介/基础/函数/OOP</text>
          <text x="150" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val/var/when/扩展函数</text>
          <text x="150" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">data class/sealed/object</text>

          <rect x="270" y="90" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">类型与抽象</text>
          <text x="370" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Lambda/类型系统/DSL</text>
          <text x="370" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空安全/智能转换/泛型</text>
          <text x="370" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">out/in/reified/带接收者Lambda</text>

          <rect x="490" y="90" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">并发与工程</text>
          <text x="590" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">协程/Flow</text>
          <text x="590" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">suspend/launch/async</text>
          <text x="590" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">结构化并发/Java互操作</text>

          {/* 知识链 */}
          <text x={VIEW_W / 2} y="195" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">知识递进链</text>

          <rect x="50" y="210" width="640" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="232" textAnchor="middle" fontSize="10" fill="var(--text-primary)">简介(为什么Kotlin) -&gt; 基础(val/var/when) -&gt; 函数(扩展/默认参数) -&gt; OOP(data/sealed/object)</text>
          <text x="370" y="250" textAnchor="middle" fontSize="10" fill="var(--text-primary)">-&gt; Lambda(高阶/inline) -&gt; 类型系统(空安全/泛型) -&gt; DSL(带接收者) -&gt; 协程(suspend/Flow)</text>

          {/* 下半部：选型矩阵 */}
          <rect x="30" y="310" width="680" height="230" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="334" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">场景选型矩阵</text>

          <text x="50" y="358" fontSize="10" fontWeight="600" fill="var(--text-secondary)">场景</text>
          <text x="270" y="358" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Kotlin方案</text>
          <text x="520" y="358" fontSize="10" fontWeight="600" fill="var(--text-secondary)">替代的Java写法</text>
          <line x1="45" y1="364" x2="695" y2="364" stroke="var(--border)" strokeWidth="1" />

          <text x="50" y="380" fontSize="9" fill="var(--text-primary)">数据建模</text>
          <text x="270" y="380" fontSize="9" fill="var(--success)">data class User(val name, val age)</text>
          <text x="520" y="380" fontSize="9" fill="var(--text-secondary)">手写equals/hashCode/toString</text>

          <text x="50" y="396" fontSize="9" fill="var(--text-primary)">状态分支</text>
          <text x="270" y="396" fontSize="9" fill="var(--success)">sealed class + when（穷尽）</text>
          <text x="520" y="396" fontSize="9" fill="var(--text-secondary)">enum + switch（无编译检查）</text>

          <text x="50" y="412" fontSize="9" fill="var(--text-primary)">空值处理</text>
          <text x="270" y="412" fontSize="9" fill="var(--success)">String? + ?. + ?: + 智能转换</text>
          <text x="520" y="412" fontSize="9" fill="var(--text-secondary)">if (x != null) 手动检查</text>

          <text x="50" y="428" fontSize="9" fill="var(--text-primary)">集合操作</text>
          <text x="270" y="428" fontSize="9" fill="var(--success)">list.map { }.filter { }.sortedBy { }</text>
          <text x="520" y="428" fontSize="9" fill="var(--text-secondary)">Stream API / for循环</text>

          <text x="50" y="444" fontSize="9" fill="var(--text-primary)">异步编程</text>
          <text x="270" y="444" fontSize="9" fill="var(--success)">suspend + coroutineScope + Flow</text>
          <text x="520" y="444" fontSize="9" fill="var(--text-secondary)">回调 / Thread / CompletableFuture</text>

          <text x="50" y="460" fontSize="9" fill="var(--text-primary)">单例模式</text>
          <text x="270" y="460" fontSize="9" fill="var(--success)">object Singleton</text>
          <text x="520" y="460" fontSize="9" fill="var(--text-secondary)">双重检查锁 + volatile</text>

          <text x="50" y="476" fontSize="9" fill="var(--text-primary)">工具函数</text>
          <text x="270" y="476" fontSize="9" fill="var(--success)">顶层函数 + 扩展函数</text>
          <text x="520" y="476" fontSize="9" fill="var(--text-secondary)">XxxUtils.staticMethod()</text>

          <text x="50" y="492" fontSize="9" fill="var(--text-primary)">配置构建</text>
          <text x="270" y="492" fontSize="9" fill="var(--success)">带接收者Lambda + @DslMarker</text>
          <text x="520" y="492" fontSize="9" fill="var(--text-secondary)">Builder模式链式调用</text>

          <rect x="50" y="505" width="640" height="26" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="522" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">
            核心理念：简洁（val优先/data class）、安全（空安全/sealed）、惯用（扩展/协程/DSL）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书复习——三大知识维度回顾（语言核心/类型与抽象/并发与工程）、知识递进链、场景选型矩阵
      </figcaption>
    </figure>
  );
}
