/**
 * <UmsAdvancedScriptingDiagram>：高级脚本三件套图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsAdvancedScriptingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级脚本三件套图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">C# 高级脚本三件套</text>

          {/* 泛型 */}
          <rect x="40" y="65" width="200" height="120" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="140" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">泛型</text>
          <text x="140" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">代码复用</text>
          <text x="140" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Singleton&lt;T&gt;</text>
          <text x="140" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">ObjectPool&lt;T&gt;</text>
          <text x="140" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">where T : MonoBehaviour</text>
          <text x="140" y="182" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">类型安全，零 cast</text>

          {/* 委托事件 */}
          <rect x="260" y="65" width="200" height="120" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">委托与事件</text>
          <text x="360" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">模块解耦</text>
          <text x="360" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Action&lt;T&gt; / event</text>
          <text x="360" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">EventBus.Publish()</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Subscribe / Unsubscribe</text>
          <text x="360" y="182" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">发布者不认识订阅者</text>

          {/* 扩展方法 */}
          <rect x="480" y="65" width="200" height="120" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="580" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">扩展方法</text>
          <text x="580" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无侵入增强</text>
          <text x="580" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">this GameObject go</text>
          <text x="580" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">SetLayerRecursive()</text>
          <text x="580" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">不继承不改源码</text>
          <text x="580" y="182" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">静态类 + this 关键字</text>

          {/* 协作示意 */}
          <rect x="40" y="220" width="640" height="80" rx="8" fill="var(--info)" fillOpacity="0.06" stroke="var(--info)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="242" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--info)">三者协作：泛型对象池 + 事件总线 + 扩展方法</text>
          <text x="360" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ObjectPool&lt;Bullet&gt; 管理 + EventBus.Publish&lt;EnemyKilled&gt; 通知 + go.ReleaseToPool() 回收</text>
          <text x="360" y="282" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">高复用、低耦合、无侵入——Unity 优雅代码的核心</text>

          {/* 陷阱提示 */}
          <text x="360" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">常见陷阱：事件订阅后忘记取消 &rarr; 内存泄漏 + MissingReferenceException</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">修法：OnDisable / OnDestroy 里 -= 取消所有订阅，养成「订阅必取消」习惯</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级脚本三件套——泛型 / 委托事件 / 扩展方法
      </figcaption>
    </figure>
  );
}
