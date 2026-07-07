/**
 * <SoftwareArchitectureLayers>：Unity客户端软件架构分层图
 *
 * 展示一个典型Unity游戏客户端的分层架构，自上而下：
 *  表现层（UI/View）→ 业务层（Logic/System）→ 数据层（Data/Model）→ 基础层（Engine/Utility）
 * 横向贯穿：事件系统、对象池、资源管理、网络层
 */

const VIEW_W = 800;
const VIEW_H = 520;

const LAYER_X = 80;
const LAYER_W = 640;
const LAYER_H = 72;
const LAYER_GAP = 16;
const FIRST_Y = 90;

type Layer = {
  name: string;
  en: string;
  desc: string;
  color: string;
  modules: string[];
};

const LAYERS: readonly Layer[] = [
  {
    name: "表现层",
    en: "Presentation / View",
    desc: "玩家直接看到和交互的部分",
    color: "var(--accent)",
    modules: ["UI界面", "3D场景表现", "特效", "动画", "摄像机", "输入响应"],
  },
  {
    name: "业务层",
    en: "Business Logic / System",
    desc: "游戏规则、玩法逻辑、状态管理",
    color: "var(--success)",
    modules: ["战斗系统", "任务系统", "背包系统", "角色系统", "状态机", "事件总线"],
  },
  {
    name: "数据层",
    en: "Data / Model",
    desc: "配置数据、存档、运行时状态",
    color: "var(--warning)",
    modules: ["配置表", "存档系统", "运行时Model", "多语言", "数据缓存"],
  },
  {
    name: "基础层",
    en: "Infrastructure / Engine",
    desc: "引擎封装、通用工具、第三方SDK",
    color: "var(--text-secondary)",
    modules: ["资源管理", "网络通信", "对象池", "UI框架", "日志", "工具类"],
  },
];

const CROSS_CUTTING = [
  { name: "事件系统", icon: "⚡" },
  { name: "对象池", icon: "♻️" },
  { name: "资源管理", icon: "📦" },
  { name: "网络层", icon: "🌐" },
];

function layerY(i: number) {
  return FIRST_Y + i * (LAYER_H + LAYER_GAP);
}

export function SoftwareArchitectureLayers() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[800px]"
        style={{ minWidth: 560 }}
        role="img"
        aria-label="Unity客户端软件架构分层图"
      >
        {/* 背景 */}
        <rect
          x="0"
          y="0"
          width={VIEW_W}
          height={VIEW_H}
          fill="var(--bg-elevated)"
          rx="12"
        />

        {/* 标题 */}
        <text
          x={VIEW_W / 2}
          y={38}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="18"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Unity 客户端架构分层
        </text>
        <text
          x={VIEW_W / 2}
          y={58}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="12"
          fontFamily="Inter, system-ui, sans-serif"
        >
          自上而下：表现 → 业务 → 数据 → 基础，依赖方向只能向下
        </text>

        {/* 分层 */}
        {LAYERS.map((layer, i) => {
          const y = layerY(i);
          return (
            <g key={layer.name}>
              {/* 层背景 */}
              <rect
                x={LAYER_X}
                y={y}
                width={LAYER_W}
                height={LAYER_H}
                fill="var(--bg)"
                stroke={layer.color}
                strokeWidth="1.5"
                rx="8"
              />
              {/* 左侧色条 */}
              <rect
                x={LAYER_X}
                y={y}
                width={5}
                height={LAYER_H}
                fill={layer.color}
                rx="2"
              />
              {/* 层名 */}
              <text
                x={LAYER_X + 20}
                y={y + 26}
                fill={layer.color}
                fontSize="16"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {layer.name}
              </text>
              <text
                x={LAYER_X + 20}
                y={y + 44}
                fill="var(--text-secondary)"
                fontSize="11"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {layer.en}
              </text>
              <text
                x={LAYER_X + 20}
                y={y + 60}
                fill="var(--text-secondary)"
                fontSize="11"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {layer.desc}
              </text>
              {/* 模块标签 */}
              {layer.modules.map((mod, mi) => {
                const tagW = Math.max(mod.length * 12 + 16, 56);
                const tagsPerRow = 4;
                const row = Math.floor(mi / tagsPerRow);
                const col = mi % tagsPerRow;
                const tagX = LAYER_X + 180 + col * (tagW + 8);
                const tagY = y + 14 + row * 28;
                return (
                  <g key={mod}>
                    <rect
                      x={tagX}
                      y={tagY}
                      width={tagW}
                      height={22}
                      fill={layer.color}
                      fillOpacity="0.1"
                      stroke={layer.color}
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                      rx="4"
                    />
                    <text
                      x={tagX + tagW / 2}
                      y={tagY + 15}
                      textAnchor="middle"
                      fill="var(--text-primary)"
                      fontSize="11"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {mod}
                    </text>
                  </g>
                );
              })}
              {/* 向下箭头（除了最后一层） */}
              {i < LAYERS.length - 1 && (
                <g>
                  <path
                    d={`M ${LAYER_X + LAYER_W / 2} ${y + LAYER_H + 2} L ${LAYER_X + LAYER_W / 2} ${y + LAYER_H + LAYER_GAP - 4}`}
                    stroke="var(--border)"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arch-arrow)"
                  />
                  <text
                    x={LAYER_X + LAYER_W / 2 + 10}
                    y={y + LAYER_H + LAYER_GAP / 2 + 4}
                    fill="var(--text-secondary)"
                    fontSize="10"
                    fontFamily="system-ui, sans-serif"
                  >
                    依赖
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 横向贯穿模块 */}
        <g>
          <rect
            x={40}
            y={VIEW_H - 70}
            width={VIEW_W - 80}
            height={48}
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
            rx="8"
          />
          <text
            x={60}
            y={VIEW_H - 48}
            fill="var(--text-primary)"
            fontSize="12"
            fontWeight="600"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            横切关注点（所有层都可用）
          </text>
          {CROSS_CUTTING.map((item, i) => {
            const cx = 200 + i * 140;
            return (
              <g key={item.name}>
                <circle
                  cx={cx}
                  cy={VIEW_H - 38}
                  r={14}
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={VIEW_H - 34}
                  textAnchor="middle"
                  fontSize="14"
                >
                  {item.icon}
                </text>
                <text
                  x={cx}
                  y={VIEW_H - 18}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="10"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* 右侧依赖原则标注 */}
        <g>
          <rect
            x={LAYER_X + LAYER_W + 16}
            y={FIRST_Y}
            width={50}
            height={LAYER_H * 4 + LAYER_GAP * 3}
            fill="transparent"
          />
          <text
            x={LAYER_X + LAYER_W + 40}
            y={FIRST_Y + (LAYER_H * 4 + LAYER_GAP * 3) / 2}
            textAnchor="middle"
            fill="var(--danger)"
            fontSize="11"
            fontWeight="500"
            fontFamily="system-ui, sans-serif"
            writingMode="tb"
          >
            禁止反向依赖
          </text>
        </g>

        <defs>
          <marker
            id="arch-arrow"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
