/**
 * <HfjConcurrencyDiagram>：并发与多线程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function HfjConcurrencyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发与多线程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            并发与多线程——线程创建与同步
          </text>

          {/* 线程创建方式 */}
          <text
            x={VIEW_W / 2}
            y="52"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            创建线程的两种方式
          </text>

          <rect
            x="30"
            y="64"
            width="330"
            height="140"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="195"
            y="84"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            方式1: extends Thread
          </text>
          <text x="45" y="102" fontSize="11" fill="var(--text-secondary)">
            class MyThread extends Thread &#123;
          </text>
          <text x="45" y="118" fontSize="11" fill="var(--text-secondary)">
            {" "}
            public void run() &#123;
          </text>
          <text x="45" y="134" fontSize="11" fill="var(--text-secondary)">
            {" "}
            System.out.println(&quot;running&quot;);
          </text>
          <text x="45" y="150" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &#125;
          </text>
          <text x="45" y="166" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="45" y="184" fontSize="11" fill="var(--text-secondary)">
            MyThread t = new MyThread();
          </text>
          <text x="45" y="200" fontSize="11" fill="var(--text-secondary)">
            t.start(); // 启动新线程
          </text>

          <rect
            x="380"
            y="64"
            width="330"
            height="140"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="84"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            方式2: implements Runnable
          </text>
          <text x="395" y="102" fontSize="11" fill="var(--text-secondary)">
            class MyJob implements Runnable &#123;
          </text>
          <text x="395" y="118" fontSize="11" fill="var(--text-secondary)">
            {" "}
            public void run() &#123;
          </text>
          <text x="395" y="134" fontSize="11" fill="var(--text-secondary)">
            {" "}
            System.out.println(&quot;running&quot;);
          </text>
          <text x="395" y="150" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &#125;
          </text>
          <text x="395" y="166" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="395" y="184" fontSize="11" fill="var(--text-secondary)">
            Thread t = new Thread(new MyJob());
          </text>
          <text x="395" y="200" fontSize="11" fill="var(--text-secondary)">
            t.start(); // 推荐此方式
          </text>

          {/* 线程状态 */}
          <text
            x={VIEW_W / 2}
            y="232"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            线程生命周期状态
          </text>

          <rect
            x="30"
            y="246"
            width="110"
            height="40"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.06"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
          />
          <text
            x="85"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            NEW
          </text>
          <text
            x="85"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            已创建未启动
          </text>

          <text
            x="150"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-tertiary)"
          >
            start()
          </text>
          <text
            x="158"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="180"
            y="246"
            width="110"
            height="40"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="235"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            RUNNABLE
          </text>
          <text
            x="235"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            就绪/运行中
          </text>

          <text
            x="300"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-tertiary)"
          >
            wait()
          </text>
          <text
            x="308"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="330"
            y="246"
            width="110"
            height="40"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="385"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            BLOCKED
          </text>
          <text
            x="385"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            等待锁
          </text>

          <text
            x="450"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-tertiary)"
          >
            sleep()
          </text>
          <text
            x="458"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="480"
            y="246"
            width="110"
            height="40"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="535"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            WAITING
          </text>
          <text
            x="535"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            无限等待
          </text>

          <text
            x="600"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-tertiary)"
          >
            run结束
          </text>
          <text
            x="608"
            y="280"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &rarr;
          </text>

          <rect
            x="630"
            y="246"
            width="80"
            height="40"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.12"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
          />
          <text
            x="670"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            TERMINATED
          </text>
          <text
            x="670"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            终止
          </text>

          {/* 竞争条件 */}
          <text
            x={VIEW_W / 2}
            y="318"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            竞争条件——多线程共享数据的问题
          </text>

          <rect
            x="30"
            y="332"
            width="340"
            height="80"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.04"
            stroke="var(--danger)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="200"
            y="352"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            不同步（数据竞争）
          </text>
          <text x="45" y="370" fontSize="11" fill="var(--text-secondary)">
            balance = 100; 线程A和B同时取50
          </text>
          <text x="45" y="386" fontSize="11" fill="var(--text-secondary)">
            A读 balance=100, B读 balance=100
          </text>
          <text x="45" y="402" fontSize="11" fill="var(--text-secondary)">
            A写 balance=50, B写 balance=50
          </text>
          <text x="45" y="418" fontSize="11" fill="var(--text-secondary)">
            结果: 取了两次50, 余额还有50 (错!)
          </text>

          <rect
            x="390"
            y="332"
            width="320"
            height="80"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.04"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="550"
            y="352"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            synchronized 同步
          </text>
          <text x="405" y="370" fontSize="11" fill="var(--text-secondary)">
            public synchronized void withdraw(int amt) &#123;
          </text>
          <text x="405" y="386" fontSize="11" fill="var(--text-secondary)">
            {" "}
            if (balance &gt;= amt) balance -= amt;
          </text>
          <text x="405" y="402" fontSize="11" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="405" y="418" fontSize="11" fill="var(--text-secondary)">
            一次只允许一个线程执行, 保证原子性
          </text>

          {/* 同步方式 */}
          <rect
            x="30"
            y="428"
            width="220"
            height="76"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="140"
            y="448"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            synchronized 方法
          </text>
          <text x="40" y="466" fontSize="11" fill="var(--text-secondary)">
            锁 = this 对象
          </text>
          <text x="40" y="480" fontSize="11" fill="var(--text-secondary)">
            整个方法体同步
          </text>
          <text x="40" y="494" fontSize="11" fill="var(--text-secondary)">
            粒度粗, 简单安全
          </text>

          <rect
            x="260"
            y="428"
            width="220"
            height="76"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="448"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            synchronized 块
          </text>
          <text x="270" y="466" fontSize="11" fill="var(--text-secondary)">
            synchronized(lock) &#123;...&#125;
          </text>
          <text x="270" y="480" fontSize="11" fill="var(--text-secondary)">
            可指定任意锁对象
          </text>
          <text x="270" y="494" fontSize="11" fill="var(--text-secondary)">
            粒度细, 性能好
          </text>

          <rect
            x="490"
            y="428"
            width="220"
            height="76"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="600"
            y="448"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            wait / notify
          </text>
          <text x="500" y="466" fontSize="11" fill="var(--text-secondary)">
            wait(): 释放锁, 线程等待
          </text>
          <text x="500" y="480" fontSize="11" fill="var(--text-secondary)">
            notify(): 唤醒一个等待线程
          </text>
          <text x="500" y="494" fontSize="11" fill="var(--text-secondary)">
            notifyAll(): 唤醒所有
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发与多线程——Thread与Runnable创建线程、线程状态机、竞争条件与synchronized同步机制
      </figcaption>
    </figure>
  );
}
