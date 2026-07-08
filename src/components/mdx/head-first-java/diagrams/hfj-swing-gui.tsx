/**
 * <HfjSwingGuiDiagram>：Swing图形界面组件层级图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function HfjSwingGuiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Swing图形界面组件层级图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Swing GUI——组件层级与布局
          </text>

          {/* JFrame */}
          <rect x="190" y="48" width="360" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x="370" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">JFrame（顶层窗口）</text>
          <text x="370" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setSize / setDefaultCloseOperation / setVisible</text>

          <text x="370" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* JRootPane → ContentPane */}
          <rect x="190" y="116" width="360" height="36" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">ContentPane（内容面板, getContentPane()）</text>

          <text x="370" y="168" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 布局管理器 */}
          <text x="370" y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            布局管理器决定子组件的排列方式
          </text>

          {/* 布局对比 */}
          <rect x="30" y="200" width="160" height="110" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">BorderLayout</text>
          <text x="40" y="238" fontSize="9" fill="var(--text-secondary)">5个区域: 东南西北中</text>
          <text x="40" y="254" fontSize="9" fill="var(--text-secondary)">CENTER: 主要内容区</text>
          <text x="40" y="270" fontSize="9" fill="var(--text-secondary)">NORTH/SOUTH: 上下条</text>
          <text x="40" y="286" fontSize="9" fill="var(--text-secondary)">EAST/WEST: 侧边栏</text>
          <text x="40" y="302" fontSize="9" fill="var(--text-secondary)">JFrame默认布局</text>

          <rect x="200" y="200" width="160" height="110" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="280" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">FlowLayout</text>
          <text x="210" y="238" fontSize="9" fill="var(--text-secondary)">从左到右排列</text>
          <text x="210" y="254" fontSize="9" fill="var(--text-secondary)">排满换行继续</text>
          <text x="210" y="270" fontSize="9" fill="var(--text-secondary)">可设对齐方式</text>
          <text x="210" y="286" fontSize="9" fill="var(--text-secondary)">JPanel默认布局</text>
          <text x="210" y="302" fontSize="9" fill="var(--text-secondary)">简单按钮排列</text>

          <rect x="370" y="200" width="160" height="110" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="450" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">BoxLayout</text>
          <text x="380" y="238" fontSize="9" fill="var(--text-secondary)">水平或垂直排列</text>
          <text x="380" y="254" fontSize="9" fill="var(--text-secondary)">X_AXIS / Y_AXIS</text>
          <text x="380" y="270" fontSize="9" fill="var(--text-secondary)">不换行</text>
          <text x="380" y="286" fontSize="9" fill="var(--text-secondary)">工具栏/侧边栏</text>
          <text x="380" y="302" fontSize="9" fill="var(--text-secondary)">固定方向排列</text>

          <rect x="540" y="200" width="160" height="110" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="620" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">GridLayout</text>
          <text x="550" y="238" fontSize="9" fill="var(--text-secondary)">网格排列</text>
          <text x="550" y="254" fontSize="9" fill="var(--text-secondary)">行列等分</text>
          <text x="550" y="270" fontSize="9" fill="var(--text-secondary)">等大单元格</text>
          <text x="550" y="286" fontSize="9" fill="var(--text-secondary)">计算器按钮</text>
          <text x="550" y="302" fontSize="9" fill="var(--text-secondary)">棋盘格</text>

          {/* 常用组件 */}
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            常用 Swing 组件
          </text>

          <rect x="30" y="352" width="120" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="90" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">JButton</text>
          <text x="90" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">按钮</text>
          <text x="90" y="400" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">setText/getText</text>

          <rect x="160" y="352" width="120" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="220" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">JLabel</text>
          <text x="220" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">标签/图标</text>
          <text x="220" y="400" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">不可编辑文本</text>

          <rect x="290" y="352" width="120" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="350" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">JTextField</text>
          <text x="350" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">单行输入</text>
          <text x="350" y="400" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">getText/setText</text>

          <rect x="420" y="352" width="120" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="480" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">JTextArea</text>
          <text x="480" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">多行输入</text>
          <text x="480" y="400" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">可滚动</text>

          <rect x="550" y="352" width="150" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="625" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">JPanel</text>
          <text x="625" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">中间容器</text>
          <text x="625" y="400" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">组合其他组件</text>

          {/* 构建流程 */}
          <rect x="30" y="420" width="680" height="60" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="440" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Swing 构建流程</text>
          <text x="40" y="458" fontSize="10" fill="var(--text-secondary)">1.JFrame frame = new JFrame();  2.frame.setLayout(...);  3.frame.add(component);  4.frame.setSize(w,h);  5.frame.setVisible(true);</text>
          <text x="40" y="472" fontSize="10" fill="var(--text-secondary)">规则: 组件先创建再添加, setVisible 最后调用, 所有 Swing 组件必须在事件分发线程(EDT)上操作</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Swing GUI——JFrame顶层窗口、布局管理器、常用组件与构建流程
      </figcaption>
    </figure>
  );
}
