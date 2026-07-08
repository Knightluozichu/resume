/**
 * <UapDesignPatternsDiagram>：Unity 设计模式应用图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapDesignPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 设计模式应用图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 四大设计模式</text>
          <rect x="40" y="60" width="150" height="90" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">单例</text>
          <text x="115" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全局唯一管理器</text>
          <text x="115" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">克制使用</text>
          <text x="115" y="142" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">AudioManager</text>
          <rect x="205" y="60" width="150" height="90" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="280" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">观察者</text>
          <text x="280" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一对多事件广播</text>
          <text x="280" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">解耦发布者订阅者</text>
          <text x="280" y="142" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">EventBus</text>
          <rect x="370" y="60" width="150" height="90" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="445" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">状态</text>
          <text x="445" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">行为封装为状态对象</text>
          <text x="445" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">消除巨型 if-else</text>
          <text x="445" y="142" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">角色 AI 状态机</text>
          <rect x="535" y="60" width="145" height="90" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="607" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">命令</text>
          <text x="607" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">请求封装为对象</text>
          <text x="607" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">排队/回放/撤销</text>
          <text x="607" y="142" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">输入系统</text>
          <rect x="40" y="180" width="640" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="210" textAnchor="middle" fontSize="12" fill="var(--text-primary)">选型原则：在正确场景用正确模式，不为用模式而用模式</text>
          <text x="115" y="265" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全局唯一</text>
          <text x="115" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr; 单例</text>
          <text x="280" y="265" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">事件广播</text>
          <text x="280" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr; 观察者</text>
          <text x="445" y="265" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">行为切换</text>
          <text x="445" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr; 状态</text>
          <text x="607" y="265" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">操作回放</text>
          <text x="607" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr; 命令</text>
          <text x="360" y="335" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">单例最被滥用——能不用就不用，用 DI 替代</text>
          <text x="360" y="355" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">状态模式是消除巨型 if-else 的标准解法</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 设计模式——单例/观察者/状态/命令的适用场景
      </figcaption>
    </figure>
  );
}
