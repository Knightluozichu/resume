/**
 * <CqcAsyncPatternDiagram>：异步模式 · Task 状态机与执行流。
 *
 * 上半部分展示 async/await 编译器生成的状态机流转：
 *   Created → WaitingForActivation → Running → Completed
 * 下半部分对比「同步阻塞」与「异步非阻塞」的线程占用。
 * 左侧标注状态机关键节点，右侧标注常见陷阱。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcAsyncPatternDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异步模式 Task 状态机与执行流。上半部分展示状态机流转：Created 到 WaitingForActivation 到 Running 到 Completed。下半部分对比同步阻塞与异步非阻塞的线程占用。右侧标注常见陷阱。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异步模式 · Task 状态机与执行流
          </text>

          {/* ===== 上半：状态机流转 ===== */}
          <text x="360" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Task 状态机流转</text>

          {/* 状态节点 */}
          {[
            { x: 50, label: "Created", sub: "已创建未启动", color: "var(--text-secondary)" },
            { x: 210, label: "Waiting", sub: "等待异步操作", color: "var(--warning)" },
            { x: 370, label: "Running", sub: "回调线程执行", color: "var(--accent)" },
            { x: 530, label: "Completed", sub: "结果就绪", color: "var(--success)" },
          ].map((s, i) => (
            <g key={s.label}>
              <rect x={s.x} y="70" width="120" height="48" rx="8" fill="var(--bg)" stroke={s.color} strokeWidth="1.4" />
              <text x={s.x + 60} y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
              <text x={s.x + 60} y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{s.sub}</text>
              {i < 3 && (
                <g>
                  <line x1={s.x + 120} y1="94" x2={s.x + 150} y2="94" stroke="var(--text-secondary)" strokeWidth="1.4" />
                  <polygon points={`${s.x + 150},94 ${s.x + 144},90 ${s.x + 144},98`} fill="var(--text-secondary)" />
                </g>
              )}
            </g>
          ))}

          {/* await 回到原线程标注 */}
          <rect x="50" y="128" width="600" height="28" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="147" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            <tspan fontWeight="600" fill="var(--accent)">await</tspan> 挂起当前方法、释放线程，异步操作完成后在原上下文（或 ConfigureAwait 后的线程）恢复
          </text>

          {/* ===== 下半：同步 vs 异步对比 ===== */}
          <text x="360" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">同步阻塞 vs 异步非阻塞</text>

          {/* 同步行 */}
          <rect x="40" y="194" width="80" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.3" />
          <text x="80" y="217" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">同步</text>

          <rect x="130" y="194" width="180" height="36" rx="4" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="220" y="217" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程阻塞等待 IO</text>

          <rect x="316" y="194" width="140" height="36" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="386" y="217" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">IO 完成</text>

          <rect x="462" y="194" width="220" height="36" rx="4" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="572" y="217" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">继续处理</text>

          {/* 异步行 */}
          <rect x="40" y="238" width="80" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.3" />
          <text x="80" y="261" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">异步</text>

          <rect x="130" y="238" width="80" height="36" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="170" y="261" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">启动 IO</text>

          <rect x="216" y="238" width="224" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="328" y="261" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线程释放，处理其他请求</text>

          <rect x="446" y="238" width="76" height="36" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="484" y="261" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">IO 完成</text>

          <rect x="528" y="238" width="154" height="36" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="605" y="261" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">恢复继续处理</text>

          {/* ===== 底部：陷阱区 ===== */}
          <rect x="36" y="290" width={VIEW_W - 72} height="108" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="310" fontSize="12" fontWeight="700" fill="var(--danger)">常见陷阱</text>

          <text x="52" y="332" fontSize="11" fontWeight="600" fill="var(--text-primary)">async void</text>
          <text x="52" y="348" fontSize="11" fill="var(--text-secondary)">异常无法被调用方捕获，仅在事件处理器中使用</text>

          <text x="52" y="372" fontSize="11" fontWeight="600" fill="var(--text-primary)">.Result / .Wait() 阻塞</text>
          <text x="52" y="388" fontSize="11" fill="var(--text-secondary)">在异步上下文中阻塞会死锁，应一路 async 到顶</text>

          <text x="380" y="332" fontSize="11" fontWeight="600" fill="var(--text-primary)">Task.Run 误用</text>
          <text x="380" y="348" fontSize="11" fill="var(--text-secondary)">IO 密集任务不需要 Task.Run，它只帮 CPU 密集任务</text>

          <text x="380" y="372" fontSize="11" fontWeight="600" fill="var(--text-primary)">忘记 ConfigureAwait</text>
          <text x="380" y="388" fontSize="11" fill="var(--text-secondary)">库代码应 ConfigureAwait(false) 避免上下文捕获开销</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        async/await 让编译器生成状态机：await 时挂起方法释放线程，异步操作完成后恢复执行。同步阻塞线程等 IO，异步释放线程处理其他请求。
      </figcaption>
    </figure>
  );
}
