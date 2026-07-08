/**
 * <NdgClusterWorkerDiagram>：集群与 Worker Threads 多进程/多线程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdgClusterWorkerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="集群与Worker Threads多进程多线程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            集群（cluster）vs Worker Threads（worker_threads）
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            多进程共享端口 vs 多线程共享内存
          </text>

          {/* 左侧：cluster */}
          <rect x="30" y="66" width="330" height="360" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">cluster（多进程）</text>
          <text x="195" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">利用多核 CPU / 容错</text>

          <rect x="50" y="118" width="290" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="136" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">主进程 Master</text>
          <text x="195" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">cluster.fork() → 创建子进程</text>

          <text x="195" y="174" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="92" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Worker 1</text>
          <text x="92" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="92" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="152" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="194" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Worker 2</text>
          <text x="194" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="194" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="254" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="296" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Worker N</text>
          <text x="296" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="296" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="50" y="246" width="290" height="80" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="264" fontSize="9" fill="var(--text-tertiary)">端口共享</text>
          <text x="60" y="280" fontSize="9" fill="var(--text-secondary)">所有 Worker 共同监听同一端口</text>
          <text x="60" y="294" fontSize="9" fill="var(--text-secondary)">Master 通过 round-robin 分发连接</text>
          <text x="60" y="308" fontSize="9" fill="var(--text-secondary)">进程间通信 IPC（fork 通道）</text>
          <text x="60" y="320" fontSize="9" fill="var(--text-secondary)">Worker 崩溃 → Master 自动重启</text>

          <rect x="50" y="336" width="290" height="78" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="354" fontSize="9" fill="var(--text-tertiary)">适用场景</text>
          <text x="60" y="370" fontSize="9" fill="var(--text-secondary)">HTTP 服务器水平扩展（I/O 密集）</text>
          <text x="60" y="384" fontSize="9" fill="var(--text-secondary)">进程隔离，一个崩溃不影响其他</text>
          <text x="60" y="398" fontSize="9" fill="var(--text-secondary)">代价：内存开销大（每进程独立 V8）</text>
          <text x="60" y="412" fontSize="9" fill="var(--text-secondary)">PM2 生产部署基于此原理</text>

          {/* 右侧：worker_threads */}
          <rect x="380" y="66" width="330" height="360" rx="12" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">worker_threads（多线程）</text>
          <text x="545" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 密集任务卸载</text>

          <rect x="400" y="118" width="290" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="136" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">主线程 Main Thread</text>
          <text x="545" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">new Worker(file.js) → 创建线程</text>

          <text x="545" y="174" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="442" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Thread 1</text>
          <text x="442" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="442" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="502" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="544" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Thread 2</text>
          <text x="544" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="544" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="604" y="184" width="85" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="646" y="202" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Thread N</text>
          <text x="646" y="216" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立 V8</text>
          <text x="646" y="228" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">独立事件循环</text>

          <rect x="400" y="246" width="290" height="80" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="264" fontSize="9" fill="var(--text-tertiary)">通信方式</text>
          <text x="410" y="280" fontSize="9" fill="var(--text-secondary)">postMessage / on("message")</text>
          <text x="410" y="294" fontSize="9" fill="var(--text-secondary)">SharedArrayBuffer 共享内存（零拷贝）</text>
          <text x="410" y="308" fontSize="9" fill="var(--text-secondary)">Atomics 原子操作保证线程安全</text>
          <text x="410" y="320" fontSize="9" fill="var(--text-secondary)">MessageChannel 双向管道</text>

          <rect x="400" y="336" width="290" height="78" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="410" y="354" fontSize="9" fill="var(--text-tertiary)">适用场景</text>
          <text x="410" y="370" fontSize="9" fill="var(--text-secondary)">CPU 密集计算（图像/加密/压缩）</text>
          <text x="410" y="384" fontSize="9" fill="var(--text-secondary)">不阻塞主线程事件循环</text>
          <text x="410" y="398" fontSize="9" fill="var(--text-secondary)">代价：序列化开销（postMessage）</text>
          <text x="410" y="412" fontSize="9" fill="var(--text-secondary)">比 cluster 轻：同进程多线程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集群与Worker Threads——cluster多进程共享端口水平扩展，worker_threads多线程卸载CPU密集任务
      </figcaption>
    </figure>
  );
}
