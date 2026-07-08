/**
 * <HfjFinalReviewDiagram>：全书复习知识整合图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function HfjFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习知识整合图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Head First Java——全书知识整合
          </text>

          {/* 中心：Java 应用 */}
          <rect x="270" y="220" width="200" height="80" rx="12" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x="370" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">一个完整 Java 应用</text>
          <text x="370" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类设计 + 集合 + GUI + 并发 + 网络</text>
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从语法到架构的完整链路</text>

          {/* 四个角的知识领域 */}
          <rect x="30" y="50" width="170" height="80" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="115" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">基础语法</text>
          <text x="40" y="90" fontSize="9" fill="var(--text-secondary)">变量/类型/运算符</text>
          <text x="40" y="104" fontSize="9" fill="var(--text-secondary)">条件/循环/数组</text>
          <text x="40" y="118" fontSize="9" fill="var(--text-secondary)">方法/参数/返回值</text>

          <rect x="540" y="50" width="170" height="80" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="625" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">面向对象</text>
          <text x="550" y="90" fontSize="9" fill="var(--text-secondary)">类/对象/封装</text>
          <text x="550" y="104" fontSize="9" fill="var(--text-secondary)">继承/多态/接口</text>
          <text x="550" y="118" fontSize="9" fill="var(--text-secondary)">抽象类/重写</text>

          <rect x="30" y="390" width="170" height="80" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="115" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">GUI与事件</text>
          <text x="40" y="430" fontSize="9" fill="var(--text-secondary)">JFrame/布局/组件</text>
          <text x="40" y="444" fontSize="9" fill="var(--text-secondary)">监听器/事件队列</text>
          <text x="40" y="458" fontSize="9" fill="var(--text-secondary)">EDT单线程模型</text>

          <rect x="540" y="390" width="170" height="80" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="625" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">并发与网络</text>
          <text x="550" y="430" fontSize="9" fill="var(--text-secondary)">Thread/Runnable</text>
          <text x="550" y="444" fontSize="9" fill="var(--text-secondary)">synchronized/wait</text>
          <text x="550" y="458" fontSize="9" fill="var(--text-secondary)">Socket/ServerSocket</text>

          {/* 连接线 */}
          <line x1="200" y1="110" x2="280" y2="230" stroke="var(--warning)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
          <line x1="540" y1="110" x2="460" y2="230" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
          <line x1="200" y1="410" x2="280" y2="290" stroke="var(--danger)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
          <line x1="540" y1="410" x2="460" y2="290" stroke="var(--success)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />

          {/* 数据流 */}
          <text x={VIEW_W / 2} y="156" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            「聊天室应用」串联全书
          </text>

          <rect x="30" y="170" width="680" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            ① 定义 Message 类（OOP）→ ② 用 ArrayList 管理消息历史（API）→ ③ JFrame 显示聊天窗口（GUI）
          </text>
          <text x="370" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            ④ 按钮事件发送消息（事件处理）→ ⑤ 每个客户端一个线程（并发）→ ⑥ ServerSocket 接收连接（网络）
          </text>

          {/* 进阶路径 */}
          <text x={VIEW_W / 2} y="494" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            进阶方向：集合源码 → JVM调优 → Spring框架 → 分布式系统
          </text>
          <text x={VIEW_W / 2} y="510" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            本书打基础，进阶需深入 JVM 内存模型/GC、NIO/Netty、设计模式、函数式编程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Head First Java全书知识整合——用聊天室应用串联语法、OOP、API、GUI、事件、并发、网络全部知识点
      </figcaption>
    </figure>
  );
}
