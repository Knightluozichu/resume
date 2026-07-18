/**
 * <JvtThreadAnalysisDiagram>：线程分析与死锁图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function JvtThreadAnalysisDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程分析与死锁图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="26"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            线程状态机 + 死锁四条件 + jstack 诊断
          </text>

          {/* 线程状态机 */}
          <text
            x="40"
            y="54"
            fontSize="13"
            fontWeight="600"
            fill="var(--warning)"
          >
            Java 线程6种状态
          </text>

          <rect
            x="40"
            y="62"
            width="90"
            height="40"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="85"
            y="86"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            NEW
          </text>

          <text
            x="140"
            y="84"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-tertiary)"
          >
            start()
          </text>
          <text
            x="140"
            y="96"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="170"
            y="62"
            width="100"
            height="40"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.16"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="220"
            y="86"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            RUNNABLE
          </text>

          <rect
            x="290"
            y="40"
            width="110"
            height="36"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.14"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="345"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--danger)"
          >
            BLOCKED
          </text>
          <text
            x="285"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            synchronized
          </text>

          <rect
            x="420"
            y="40"
            width="110"
            height="36"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="475"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            WAITING
          </text>
          <text
            x="415"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            wait/join
          </text>

          <rect
            x="550"
            y="40"
            width="140"
            height="36"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="620"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            TIMED_WAITING
          </text>
          <text
            x="545"
            y="62"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            sleep(ms)
          </text>

          <rect
            x="640"
            y="62"
            width="60"
            height="40"
            rx="6"
            fill="var(--text-primary)"
            fillOpacity="0.10"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
          />
          <text
            x="670"
            y="86"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            END
          </text>

          <text
            x="370"
            y="120"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            RUNNABLE 可双向转到
            WAITING/TIMED_WAITING/BLOCKED；notify/超时/获锁返回 RUNNABLE
          </text>

          {/* 死锁四条件 */}
          <text
            x="40"
            y="148"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            死锁四个必要条件（缺一不可）
          </text>

          <rect
            x="40"
            y="156"
            width="150"
            height="60"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="115"
            y="176"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            ① 互斥
          </text>
          <text
            x="115"
            y="194"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            资源同时只能
          </text>
          <text
            x="115"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            一个线程占用
          </text>

          <rect
            x="200"
            y="156"
            width="160"
            height="60"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="176"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            ② 持有并等待
          </text>
          <text
            x="280"
            y="194"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            持有资源同时
          </text>
          <text
            x="280"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            等待其他资源
          </text>

          <rect
            x="370"
            y="156"
            width="150"
            height="60"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="445"
            y="176"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            ③ 不可剥夺
          </text>
          <text
            x="445"
            y="194"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            不能强行夺走
          </text>
          <text
            x="445"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            只能主动释放
          </text>

          <rect
            x="530"
            y="156"
            width="170"
            height="60"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.14"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="615"
            y="176"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            ④ 循环等待
          </text>
          <text
            x="615"
            y="194"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            A等B，B等C
          </text>
          <text
            x="615"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            C等A 环形链
          </text>

          {/* 死锁图示 */}
          <text
            x="40"
            y="240"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            死锁图示与避免
          </text>

          <circle
            cx="120"
            cy="290"
            r="26"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="120"
            y="286"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            线程A
          </text>
          <text
            x="120"
            y="300"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            持锁1等锁2
          </text>

          <circle
            cx="280"
            cy="290"
            r="26"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="280"
            y="286"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            线程B
          </text>
          <text
            x="280"
            y="300"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            持锁2等锁1
          </text>

          <path
            d="M 146 290 L 254 290"
            stroke="var(--danger)"
            strokeWidth="1.5"
            markerEnd="url(#deadArrow)"
            fill="none"
          />
          <path
            d="M 254 300 L 146 300"
            stroke="var(--danger)"
            strokeWidth="1.5"
            markerEnd="url(#deadArrow)"
            fill="none"
          />
          <defs>
            <marker
              id="deadArrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--danger)" />
            </marker>
          </defs>
          <text
            x="200"
            y="278"
            textAnchor="middle"
            fontSize="9"
            fill="var(--danger)"
          >
            等锁2
          </text>
          <text
            x="200"
            y="318"
            textAnchor="middle"
            fontSize="9"
            fill="var(--danger)"
          >
            等锁1
          </text>

          <rect
            x="360"
            y="254"
            width="340"
            height="76"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="530"
            y="274"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            避免死锁策略
          </text>
          <text
            x="530"
            y="292"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            破坏④：统一锁顺序（按 id 排序后锁）
          </text>
          <text
            x="530"
            y="308"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            破坏③：ReentrantLock.tryLock(timeout)
          </text>
          <text
            x="530"
            y="324"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            破坏②：一次性获取所有锁
          </text>

          {/* jstack 诊断 */}
          <rect
            x="40"
            y="346"
            width="660"
            height="118"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.05"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="368"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            jstack 诊断要点
          </text>
          <text x="60" y="388" fontSize="10" fill="var(--text-secondary)">
            1. 死锁自动检测：jstack 末尾打印 Found one Java-level deadlock +
            互持锁
          </text>
          <text x="60" y="406" fontSize="10" fill="var(--text-secondary)">
            2. BLOCKED 分析：waiting to lock &lt;0xaddr&gt; 找锁，搜 locked
            &lt;0xaddr&gt; 找持锁者
          </text>
          <text x="60" y="424" fontSize="10" fill="var(--text-secondary)">
            3. 连续 dump 三次：区分瞬时/持续状态，确认稳定死锁与真热点
          </text>
          <text x="60" y="442" fontSize="10" fill="var(--text-secondary)">
            4. CPU 高：top -Hp 找 tid，printf &apos;%x&apos; 转十六进制，jstack
            找 nid=0xtid 栈顶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程6状态机、死锁四条件（互斥/持有等待/不可剥夺/循环等待）、避免策略与
        jstack 连续 dump 诊断
      </figcaption>
    </figure>
  );
}
