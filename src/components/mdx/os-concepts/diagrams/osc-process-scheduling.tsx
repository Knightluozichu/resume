/**
 * <OscProcessSchedulingDiagram>：CPU 调度算法对比——FCFS / SJF / RR 甘特图。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscProcessSchedulingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU 调度算法甘特图对比"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 调度算法对比（P1=6ms, P2=8ms, P3=7ms, 量子=4ms）
          </text>

          {/* 进程信息 */}
          <text x="40" y="56" fontSize="11" fill="var(--text-secondary)">进程：P1 突发时间=6, P2=8, P3=7（同时到达 t=0）</text>

          {/* FCFS */}
          <text x="40" y="84" fontSize="12" fontWeight="600" fill="var(--warning)">FCFS（先来先服务）</text>
          <rect x="40" y="92" width="120" height="28" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="100" y="111" textAnchor="middle" fontSize="10" fill="var(--warning)">P1 (0-6)</text>
          <rect x="160" y="92" width="160" height="28" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="240" y="111" textAnchor="middle" fontSize="10" fill="var(--warning)">P2 (6-14)</text>
          <rect x="320" y="92" width="140" height="28" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="390" y="111" textAnchor="middle" fontSize="10" fill="var(--warning)">P3 (14-21)</text>
          <text x="480" y="111" fontSize="10" fill="var(--text-tertiary)">平均等待 = (0+6+14)/3 = 6.67ms</text>

          {/* SJF */}
          <text x="40" y="148" fontSize="12" fontWeight="600" fill="var(--accent)">SJF（最短作业优先，非抢占）</text>
          <rect x="40" y="156" width="120" height="28" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="175" textAnchor="middle" fontSize="10" fill="var(--accent)">P1 (0-6)</text>
          <rect x="160" y="156" width="140" height="28" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="230" y="175" textAnchor="middle" fontSize="10" fill="var(--accent)">P3 (6-13)</text>
          <rect x="300" y="156" width="160" height="28" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="175" textAnchor="middle" fontSize="10" fill="var(--accent)">P2 (13-21)</text>
          <text x="480" y="175" fontSize="10" fill="var(--text-tertiary)">平均等待 = (0+6+13)/3 = 6.33ms</text>

          {/* RR */}
          <text x="40" y="212" fontSize="12" fontWeight="600" fill="var(--danger)">RR（轮转，量子=4ms）</text>
          <rect x="40" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="80" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P1(0-4)</text>
          <rect x="120" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="160" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P2(4-8)</text>
          <rect x="200" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="240" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P3(8-12)</text>
          <rect x="280" y="220" width="40" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="300" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P1</text>
          <rect x="320" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="360" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P2(12-16)</text>
          <rect x="400" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="440" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P3(16-20)</text>
          <rect x="480" y="220" width="80" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="520" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P2(20-24)</text>
          <rect x="560" y="220" width="60" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="239" textAnchor="middle" fontSize="9" fill="var(--danger)">P3(24-27)</text>
          <text x="640" y="239" fontSize="10" fill="var(--text-tertiary)">公平但切换多</text>

          {/* 调度准则对比 */}
          <rect x="30" y="278" width="680" height="170" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="300" fontSize="13" fontWeight="600" fill="var(--text-primary)">调度准则对比</text>

          <text x="50" y="324" fontSize="10" fontWeight="600" fill="var(--text-secondary)">准则</text>
          <text x="200" y="324" fontSize="10" fontWeight="600" fill="var(--text-secondary)">含义</text>
          <text x="440" y="324" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优化方向</text>

          <text x="50" y="344" fontSize="10" fill="var(--warning)">CPU 利用率</text>
          <text x="200" y="344" fontSize="10" fill="var(--text-tertiary)">CPU 忙碌时间占比</text>
          <text x="440" y="344" fontSize="10" fill="var(--text-tertiary)">越高越好（减少空闲）</text>

          <text x="50" y="362" fontSize="10" fill="var(--accent)">吞吐量</text>
          <text x="200" y="362" fontSize="10" fill="var(--text-tertiary)">单位时间完成进程数</text>
          <text x="440" y="362" fontSize="10" fill="var(--text-tertiary)">越高越好（短作业优先）</text>

          <text x="50" y="380" fontSize="10" fill="var(--danger)">周转时间</text>
          <text x="200" y="380" fontSize="10" fill="var(--text-tertiary)">完成 - 到达</text>
          <text x="440" y="380" fontSize="10" fill="var(--text-tertiary)">越短越好（SJF 最优）</text>

          <text x="50" y="398" fontSize="10" fill="var(--success)">等待时间</text>
          <text x="200" y="398" fontSize="10" fill="var(--text-tertiary)">就绪队列中等待总和</text>
          <text x="440" y="398" fontSize="10" fill="var(--text-tertiary)">越短越好</text>

          <text x="50" y="416" fontSize="10" fill="var(--warning)">响应时间</text>
          <text x="200" y="416" fontSize="10" fill="var(--text-tertiary)">首次响应 - 到达</text>
          <text x="440" y="416" fontSize="10" fill="var(--text-tertiary)">越短越好（RR 最优）</text>

          <text x="50" y="438" fontSize="10" fill="var(--text-tertiary)">
            SJF 最小化平均等待时间但可能饥饿长作业；RR 公平但上下文切换开销大；FCFS 简单但 convoy effect
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU 调度算法甘特图对比——FCFS、SJF、轮转调度的执行时间线与评估准则
      </figcaption>
    </figure>
  );
}
