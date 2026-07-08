/**
 * <HfjEventHandlingDiagram>：事件处理机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function HfjEventHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件处理机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            事件处理——源-监听器-事件对象三要素
          </text>

          {/* 事件源 */}
          <rect x="30" y="52" width="200" height="100" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="130" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">事件源（Source）</text>
          <text x="45" y="92" fontSize="10" fill="var(--text-secondary)">JButton button = new JButton();</text>
          <text x="45" y="108" fontSize="10" fill="var(--text-secondary)">button.addActionListener(l);</text>
          <text x="45" y="124" fontSize="10" fill="var(--text-secondary)">用户点击时:</text>
          <text x="45" y="140" fontSize="10" fill="var(--text-secondary)">button 创建 ActionEvent</text>

          {/* 事件对象 */}
          <rect x="270" y="52" width="200" height="100" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">事件对象（Event）</text>
          <text x="285" y="92" fontSize="10" fill="var(--text-secondary)">ActionEvent e</text>
          <text x="285" y="108" fontSize="10" fill="var(--text-secondary)">e.getSource() &rarr; button</text>
          <text x="285" y="124" fontSize="10" fill="var(--text-secondary)">e.getActionCommand()</text>
          <text x="285" y="140" fontSize="10" fill="var(--text-secondary)">携带事件信息</text>

          {/* 监听器 */}
          <rect x="510" y="52" width="200" height="100" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <text x="610" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">监听器（Listener）</text>
          <text x="525" y="92" fontSize="10" fill="var(--text-secondary)">ActionListener 接口</text>
          <text x="525" y="108" fontSize="10" fill="var(--text-secondary)">void actionPerformed(e)</text>
          <text x="525" y="124" fontSize="10" fill="var(--text-secondary)">接收事件并处理</text>
          <text x="525" y="140" fontSize="10" fill="var(--text-secondary)">注册: source.add*Listener</text>

          <text x="245" y="108" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="485" y="108" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 事件分发流程 */}
          <text x={VIEW_W / 2} y="180" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            事件分发线程（EDT）与事件队列
          </text>

          <rect x="30" y="194" width="680" height="80" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="214" fontSize="10" fill="var(--text-secondary)">1. 用户点击按钮</text>
          <text x="50" y="230" fontSize="10" fill="var(--text-secondary)">2. 操作系统通知 Swing 窗口</text>
          <text x="50" y="246" fontSize="10" fill="var(--text-secondary)">3. Swing 将事件放入事件队列（EventQueue）</text>
          <text x="50" y="262" fontSize="10" fill="var(--text-secondary)">4. EDT 从队列取出事件, 依次调用所有注册监听器的回调方法</text>

          <rect x="370" y="214" width="320" height="56" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">EDT 单线程模型</text>
          <text x="530" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">事件处理在单线程上串行执行</text>
          <text x="530" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">耗时操作会阻塞界面, 应另起线程</text>

          {/* 常见事件类型 */}
          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            常见事件类型与监听器
          </text>

          <rect x="30" y="312" width="160" height="72" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ActionEvent</text>
          <text x="110" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按钮点击/回车</text>
          <text x="110" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ActionListener</text>
          <text x="110" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">actionPerformed()</text>

          <rect x="200" y="312" width="160" height="72" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="280" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">MouseEvent</text>
          <text x="280" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">鼠标按下/移动</text>
          <text x="280" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MouseListener</text>
          <text x="280" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">mouseClicked()等</text>

          <rect x="370" y="312" width="160" height="72" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="450" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">KeyEvent</text>
          <text x="450" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">键盘按下/释放</text>
          <text x="450" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">KeyListener</text>
          <text x="450" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">keyPressed()等</text>

          <rect x="540" y="312" width="160" height="72" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="620" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">WindowEvent</text>
          <text x="620" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">窗口打开/关闭</text>
          <text x="620" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">WindowListener</text>
          <text x="620" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">windowClosing()等</text>

          {/* 适配器模式 */}
          <rect x="30" y="400" width="680" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="420" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">适配器（Adapter）——空实现所有方法，只重写需要的</text>
          <text x="40" y="438" fontSize="10" fill="var(--text-secondary)">MouseListener 有5个方法, 如果只用 mouseClicked, 可继承 MouseAdapter 只重写一个:</text>
          <text x="40" y="454" fontSize="10" fill="var(--text-secondary)">addMouseListener(new MouseAdapter() &#123; public void mouseClicked(MouseEvent e) &#123;...&#125; &#125;);</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件处理——事件源产生事件对象、监听器接收处理、EDT单线程分发、适配器简化实现
      </figcaption>
    </figure>
  );
}
