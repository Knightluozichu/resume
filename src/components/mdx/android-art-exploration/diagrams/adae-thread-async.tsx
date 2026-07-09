/**
 * <AdaeThreadAsyncDiagram>：线程与AsyncTask图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AdaeThreadAsyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程与AsyncTask图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            线程与 AsyncTask
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            AsyncTask 五步 + 线程池配置 + 替代方案
          </text>

          {/* 左：AsyncTask 五步 */}
          <rect x="30" y="62" width="350" height="430" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="205" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">AsyncTask 五个回调</text>

          <rect x="50" y="100" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="205" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onPreExecute  主线程</text>
          <text x="60" y="142" fontSize="11" fill="var(--text-secondary)">准备阶段，显示加载进度条</text>

          <rect x="50" y="164" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="205" y="186" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">doInBackground  子线程</text>
          <text x="60" y="206" fontSize="11" fill="var(--text-secondary)">耗时任务，publishProgress</text>

          <rect x="50" y="228" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="205" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">onProgressUpdate  主线程</text>
          <text x="60" y="270" fontSize="11" fill="var(--text-secondary)">更新进度 UI</text>

          <rect x="50" y="292" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="205" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onPostExecute  主线程</text>
          <text x="60" y="334" fontSize="11" fill="var(--text-secondary)">收结果，刷新 UI</text>

          <rect x="50" y="356" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="205" y="378" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onCancelled  主线程</text>
          <text x="60" y="398" fontSize="11" fill="var(--text-secondary)">取消时回调，替代 onPostExecute</text>

          <rect x="50" y="420" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.1" strokeOpacity="0.4" />
          <text x="205" y="442" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">注意</text>
          <text x="60" y="462" fontSize="11" fill="var(--text-secondary)">需主线程创建执行；3.0 起串行执行</text>

          {/* 右：线程池与替代方案 */}
          <rect x="400" y="62" width="310" height="430" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="555" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">线程池与替代</text>

          <rect x="420" y="100" width="270" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="555" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">AsyncTask 内置线程池</text>
          <text x="430" y="144" fontSize="11" fill="var(--text-secondary)">CPU 核数 N = Runtime.availableProcessors</text>
          <text x="430" y="162" fontSize="11" fill="var(--text-secondary)">核心池 [N+1]，最大 [2N+1]</text>
          <text x="430" y="180" fontSize="11" fill="var(--text-secondary)">SERIAL_EXECUTOR 串行队列</text>
          <text x="430" y="198" fontSize="11" fill="var(--text-secondary)">THREAD_POOL_EXECUTOR 并行</text>

          <rect x="420" y="232" width="270" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="555" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">其他线程形态</text>
          <text x="430" y="276" fontSize="11" fill="var(--text-secondary)">HandlerThread：带 Looper 的线程</text>
          <text x="430" y="294" fontSize="11" fill="var(--text-secondary)">IntentService：串行后台 Service</text>
          <text x="430" y="312" fontSize="11" fill="var(--text-secondary)">ThreadPoolExecutor：自定义线程池</text>
          <text x="430" y="330" fontSize="11" fill="var(--text-secondary)">ScheduledThreadPoolExecutor 定时</text>

          <rect x="420" y="364" width="270" height="112" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="555" y="386" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">现代替代（推荐）</text>
          <text x="430" y="408" fontSize="11" fill="var(--text-secondary)">RxJava：调度器+流式异步</text>
          <text x="430" y="426" fontSize="11" fill="var(--text-secondary)">Kotlin 协程：suspend+结构化并发</text>
          <text x="430" y="444" fontSize="11" fill="var(--text-secondary)">ListenableFuture / CompletableFuture</text>
          <text x="430" y="462" fontSize="11" fill="var(--text-tertiary)">AsyncTask 已被官方废弃</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AsyncTask五回调（onPreExecute/doInBackground/onProgressUpdate/onPostExecute/onCancelled）、线程池配置与现代替代方案
      </figcaption>
    </figure>
  );
}
