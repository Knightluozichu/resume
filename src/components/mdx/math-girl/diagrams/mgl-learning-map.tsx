"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 760 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function MglLearningMapDiagram() {
  const volumes = [
    {
      label: "第1卷",
      theme: "发现结构",
      detail: "数列 · 生成函数 · 组合",
      color: accent,
    },
    {
      label: "第2卷",
      theme: "锤炼证明",
      detail: "数论 · 反证 · 无穷递降",
      color: success,
    },
    {
      label: "第3卷",
      theme: "追问边界",
      detail: "极限 · 可数性 · 形式系统",
      color: warning,
    },
    {
      label: "第4卷",
      theme: "分析不确定性",
      detail: "概率 · 矩阵 · 随机算法",
      color: danger,
    },
  ];

  return (
    <Frame
      ariaLabel="数学女孩前四卷学习地图：四卷各十章，主线依次是发现结构、锤炼证明、追问形式系统边界和分析不确定性。"
      caption="四卷各十章；颜色表示主线，不表示难度等级。"
    >
      <text
        x="380"
        y="34"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        40章 = 四段连续的提问方式
      </text>
      <text x="380" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        每卷十章，导航页连接问题与先修关系，不替代原书章节
      </text>

      {volumes.map((volume, index) => {
        const x = 24 + index * 184;
        return (
          <g key={volume.label}>
            <rect
              x={x}
              y="92"
              width="156"
              height="182"
              rx="10"
              fill={volume.color}
              fillOpacity="0.08"
              stroke={volume.color}
              strokeWidth="1.4"
            />
            <text
              x={x + 78}
              y="123"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={volume.color}
            >
              {volume.label}
            </text>
            <text
              x={x + 78}
              y="153"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={primary}
            >
              {volume.theme}
            </text>
            <line x1={x + 24} y1="169" x2={x + 132} y2="169" stroke={border} />
            <text
              x={x + 78}
              y="198"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {volume.detail.split(" · ")[0]}
            </text>
            <text
              x={x + 78}
              y="220"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {volume.detail.split(" · ").slice(1).join(" · ")}
            </text>
            <text
              x={x + 78}
              y="250"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={volume.color}
            >
              10 个原书章节
            </text>
            {index < volumes.length - 1 ? (
              <path
                d={`M ${x + 160} 183 C ${x + 168} 166, ${x + 174} 166, ${x + 180} 183`}
                fill="none"
                stroke={secondary}
                strokeWidth="1.4"
              />
            ) : null}
          </g>
        );
      })}

      <rect
        x="42"
        y="316"
        width="676"
        height="66"
        rx="9"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="380"
        y="343"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        回查方向：数列与表示 → 证明与反证 → 严格语言 → 概率与随机算法
      </text>
      <text x="380" y="366" textAnchor="middle" fontSize="12" fill={secondary}>
        卡住时沿桥回到定义和例子，而不是只记住最后一个公式
      </text>
    </Frame>
  );
}

export function MglLearningMapVolumeDiagram() {
  const lanes = [
    { label: "第1卷", color: accent, note: "发现结构" },
    { label: "第2卷", color: success, note: "证明工具" },
    { label: "第3卷", color: warning, note: "严格边界" },
    { label: "第4卷", color: danger, note: "随机分析" },
  ];

  return (
    <Frame
      ariaLabel="四卷十章计数图：每一卷是一条包含十个章节节点的横向轨道，卷与卷之间按主题相连。"
      caption="阅读计数先看卷，再看章；跨卷导读页不增加原书计数。"
    >
      <text
        x="380"
        y="32"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        目录计数的安全检查
      </text>
      <text x="380" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        四条轨道 × 每条十个节点 = 40 个原书章节
      </text>

      {lanes.map((lane, laneIndex) => {
        const y = 92 + laneIndex * 70;
        return (
          <g key={lane.label}>
            <text
              x="30"
              y={y + 6}
              fontSize="13"
              fontWeight="700"
              fill={lane.color}
            >
              {lane.label}
            </text>
            <text x="30" y={y + 27} fontSize="11" fill={secondary}>
              {lane.note}
            </text>
            <line
              x1="128"
              y1={y + 7}
              x2="710"
              y2={y + 7}
              stroke={border}
              strokeWidth="2"
            />
            {Array.from({ length: 10 }, (_, index) => {
              const x = 145 + index * 61;
              return (
                <g key={`${lane.label}-${index + 1}`}>
                  <circle
                    cx={x}
                    cy={y + 7}
                    r="14"
                    fill={lane.color}
                    fillOpacity="0.14"
                    stroke={lane.color}
                    strokeWidth="1.2"
                  />
                  <text
                    x={x}
                    y={y + 11}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={lane.color}
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      <rect
        x="42"
        y="382"
        width="676"
        height="20"
        rx="8"
        fill={accent}
        fillOpacity="0.08"
      />
      <text x="380" y="396" textAnchor="middle" fontSize="11.5" fill={primary}>
        检查失败信号：只剩“主题标签”，却找不到卷号、章号和原书入口
      </text>
    </Frame>
  );
}

export function MglLearningMapBridgeDiagram() {
  const bridges = [
    {
      x: 44,
      title: "数列 ↔ 算法",
      detail: "递推、调和数、增长阶",
      color: accent,
    },
    {
      x: 230,
      title: "反证 ↔ 对角",
      detail: "从否定假设到构造矛盾",
      color: success,
    },
    {
      x: 416,
      title: "计数 ↔ 概率",
      detail: "样本空间与事件比例",
      color: warning,
    },
    {
      x: 602,
      title: "表示 ↔ 状态",
      detail: "生成函数与矩阵变换",
      color: danger,
    },
  ];

  return (
    <Frame
      ariaLabel="跨卷先修桥图：数列连接算法，反证连接对角构造，组合计数连接概率，生成函数连接矩阵状态。"
      caption="桥表示回查路径；它们是学习建议，不是新增的卷章。"
    >
      <text
        x="380"
        y="32"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        跨卷先修桥：卡住时回到哪一块？
      </text>
      <text x="380" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        用“缺的语言”定位回查点，而不是按标签随机跳章
      </text>

      <line
        x1="82"
        y1="188"
        x2="678"
        y2="188"
        stroke={border}
        strokeWidth="2"
      />
      {bridges.map((bridge, index) => (
        <g key={bridge.title}>
          <circle
            cx={bridge.x + 58}
            cy="188"
            r="34"
            fill={bridge.color}
            fillOpacity="0.14"
            stroke={bridge.color}
            strokeWidth="1.5"
          />
          <text
            x={bridge.x + 58}
            y="184"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={bridge.color}
          >
            {index + 1}
          </text>
          <text
            x={bridge.x + 58}
            y="202"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            桥
          </text>
          <rect
            x={bridge.x}
            y="90"
            width="116"
            height="66"
            rx="8"
            fill={bridge.color}
            fillOpacity="0.07"
            stroke={bridge.color}
          />
          <text
            x={bridge.x + 58}
            y="116"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            {bridge.title}
          </text>
          <text
            x={bridge.x + 58}
            y="139"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {bridge.detail}
          </text>
          <line
            x1={bridge.x + 58}
            y1="156"
            x2={bridge.x + 58}
            y2="151"
            stroke={bridge.color}
            strokeWidth="1.2"
          />
        </g>
      ))}

      <rect
        x="46"
        y="260"
        width="668"
        height="106"
        rx="9"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text x="72" y="288" fontSize="13" fontWeight="700" fill={accent}>
        回查动作
      </text>
      <text x="72" y="314" fontSize="12" fill={primary}>
        1. 写下卡住的对象：公式、定义、证明动作，或概率事件。
      </text>
      <text x="72" y="337" fontSize="12" fill={primary}>
        2. 选择对应桥，回读一个例子，再回到当前章重做推导。
      </text>
      <text x="72" y="360" fontSize="12" fill={secondary}>
        3. 若仍不能解释，记录“缺少的先修”，不要用主题标签掩盖断点。
      </text>
    </Frame>
  );
}

export function MglLearningMapRouteDiagram() {
  const routes = [
    {
      y: 102,
      title: "顺序精读",
      detail: "保留人物对话、错误猜想与问题推进",
      color: accent,
    },
    {
      y: 190,
      title: "证明专题",
      detail: "数列与定义 → 反证与递降 → 严格语言",
      color: success,
    },
    {
      y: 278,
      title: "算法专题",
      detail: "递推与表示 → 渐近阶 → 随机算法",
      color: warning,
    },
  ];

  return (
    <Frame
      ariaLabel="三种阅读路线图：顺序精读保留叙事，证明专题连接反证与严格语言，算法专题连接递推、表示和随机算法。"
      caption="三种路线共享同一套 40 章目录；路线改变入口，不改变原书身份。"
    >
      <text
        x="380"
        y="32"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        选择路线，但不要改写目录
      </text>
      <text x="380" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每条路线都必须回到卷号、章号和可验证的练习证据
      </text>

      <rect
        x="54"
        y="94"
        width="192"
        height="252"
        rx="10"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
      />
      <text
        x="150"
        y="128"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        共同入口
      </text>
      <text x="150" y="160" textAnchor="middle" fontSize="12" fill={primary}>
        前四卷目录
      </text>
      <text x="150" y="184" textAnchor="middle" fontSize="12" fill={primary}>
        40 个原书章节
      </text>
      <text x="150" y="208" textAnchor="middle" fontSize="12" fill={secondary}>
        每卷 10 章
      </text>
      <text x="150" y="252" textAnchor="middle" fontSize="11" fill={secondary}>
        导读页只负责
      </text>
      <text x="150" y="273" textAnchor="middle" fontSize="11" fill={secondary}>
        连接、回查、练习
      </text>
      <text x="150" y="294" textAnchor="middle" fontSize="11" fill={secondary}>
        不新增“第五卷”
      </text>

      {routes.map((route) => (
        <g key={route.title}>
          <line
            x1="246"
            y1={route.y + 27}
            x2="284"
            y2={route.y + 27}
            stroke={route.color}
            strokeWidth="1.5"
          />
          <rect
            x="292"
            y={route.y}
            width="414"
            height="62"
            rx="9"
            fill={route.color}
            fillOpacity="0.08"
            stroke={route.color}
          />
          <text
            x="318"
            y={route.y + 26}
            fontSize="14"
            fontWeight="700"
            fill={route.color}
          >
            {route.title}
          </text>
          <text x="318" y={route.y + 47} fontSize="11.5" fill={primary}>
            {route.detail}
          </text>
        </g>
      ))}
    </Frame>
  );
}
