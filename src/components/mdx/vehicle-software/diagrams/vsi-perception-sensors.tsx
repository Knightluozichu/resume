/**
 * <VsiPerceptionSensorsDiagram>：感知传感器体系图（车辆俯视图）。
 *
 * 中心为车辆俯视轮廓，四周辐射四类传感器覆盖范围：
 *   - 摄像头（accent 紫）：前方视野锥，彩色填充
 *   - 毫米波雷达（warning 黄）：前后中距扇形，虚线
 *   - 激光雷达（success 绿）：360° 点云环
 *   - 超声波（primary）：四角近距环形
 * 底部四列属性表：探测距离 / 分辨率 / 天气抗性。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CX = 360;
const CY = 232;
// 车辆俯视轮廓
const CAR_X = 312;
const CAR_Y = 168;
const CAR_W = 96;
const CAR_H = 128;

// 激光雷达点云环：36 个点
const LIDAR_R = 132;
const LIDAR_DOTS = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  return { x: CX + LIDAR_R * Math.cos(a), y: CY + LIDAR_R * Math.sin(a) };
});

// 超声波四角位置（车体四角）
const USS = [
  { x: CAR_X + 6, y: CAR_Y + 6, label: "左前" },
  { x: CAR_X + CAR_W - 6, y: CAR_Y + 6, label: "右前" },
  { x: CAR_X + 6, y: CAR_Y + CAR_H - 6, label: "左后" },
  { x: CAR_X + CAR_W - 6, y: CAR_Y + CAR_H - 6, label: "右后" },
];

interface SensorAttr {
  name: string;
  color: string;
  range: string;
  resolution: string;
  weather: string;
}

const ATTRS: readonly SensorAttr[] = [
  { name: "摄像头", color: accent, range: "~200m", resolution: "高 · 像素级", weather: "弱 · 雨雾退化" },
  { name: "毫米波雷达", color: warning, range: "~250m", resolution: "中 · 距离/速度", weather: "强 · 穿透雨雾" },
  { name: "激光雷达", color: success, range: "~200m", resolution: "极高 · 点云", weather: "中 · 雨天噪点" },
  { name: "超声波", color: primary, range: "~5m", resolution: "低", weather: "强" },
];

export function VsiPerceptionSensorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="感知传感器体系俯视图。中心为车辆俯视轮廓：摄像头前方紫色视野锥；毫米波雷达前后黄色虚线中距扇形；激光雷达绿色 360 度点云环；超声波四角近距环形。底部四列属性表对比探测距离、分辨率、天气抗性。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vps-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            感知传感器体系 · 俯视覆盖
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四类传感器各有所长：摄像看得清 · 雷达穿得透 · 激光测得准 · 超声波贴得近
          </text>

          {/* 激光雷达 360° 点云环（先画，置底） */}
          <circle cx={CX} cy={CY} r={LIDAR_R} fill="none" stroke={success} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 4" />
          {LIDAR_DOTS.map((d, i) => (
            <circle key={`lidar-${i}`} cx={d.x} cy={d.y} r="2.2" fill={success} fillOpacity="0.7" />
          ))}
          <text x={CX + LIDAR_R + 10} y={CY + 4} fontSize="11" fontWeight="700" fill={success}>
            激光雷达 · 360° 点云
          </text>

          {/* 摄像头前方视野锥 */}
          <path d={`M ${CX} ${CAR_Y} L ${CX - 56} 96 L ${CX + 56} 96 Z`} fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="1.4" />
          <text x={CX} y={120} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            摄像头 · 前方视野
          </text>

          {/* 毫米波雷达前扇（虚线） */}
          <path d={`M ${CX - 12} ${CAR_Y} L ${CX - 36} 84 L ${CX + 36} 84 L ${CX + 12} ${CAR_Y} Z`} fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeDasharray="5 3" />
          {/* 毫米波雷达后扇 */}
          <path d={`M ${CX - 12} ${CAR_Y + CAR_H} L ${CX - 36} ${CAR_Y + CAR_H + 84} L ${CX + 36} ${CAR_Y + CAR_H + 84} L ${CX + 12} ${CAR_Y + CAR_H} Z`} fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={CX - 70} y={88} textAnchor="end" fontSize="11" fontWeight="700" fill={warning}>
            毫米波 · 前
          </text>
          <text x={CX - 70} y={CAR_Y + CAR_H + 86} textAnchor="end" fontSize="11" fontWeight="700" fill={warning}>
            毫米波 · 后
          </text>

          {/* 超声波四角近距环形 */}
          {USS.map((u) => (
            <g key={u.label}>
              <circle cx={u.x} cy={u.y} r="34" fill={primary} fillOpacity="0.05" stroke={primary} strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx={u.x} cy={u.y} r="20" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="1" strokeOpacity="0.4" />
            </g>
          ))}

          {/* 车辆俯视轮廓 */}
          <rect x={CAR_X} y={CAR_Y} width={CAR_W} height={CAR_H} rx="18" fill="var(--bg)" stroke={primary} strokeWidth="2" />
          {/* 车窗 */}
          <rect x={CAR_X + 12} y={CAR_Y + 24} width={CAR_W - 24} height={CAR_H - 56} rx="8" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="1" strokeOpacity="0.4" />
          {/* 车头方向指示 */}
          <path d={`M ${CX} ${CAR_Y - 8} L ${CX - 6} ${CAR_Y + 2} L ${CX + 6} ${CAR_Y + 2} Z`} fill={primary} />
          <text x={CX} y={CY + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
            自车
          </text>
          <text x={CX} y={CY + 20} textAnchor="middle" fontSize="11" fill={secondary}>
            行进方向 ↑
          </text>
          {/* 超声波标注 */}
          <text x={CX} y={CAR_Y + CAR_H + 50} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
            超声波 · 四角近距
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={400} x2={VIEW_W - 32} y2={400} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={420} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            传感器属性对照
          </text>

          {/* 四列属性表 */}
          {ATTRS.map((a, i) => {
            const colW = 160;
            const gap = 16;
            const x = (VIEW_W - colW * ATTRS.length - gap * (ATTRS.length - 1)) / 2 + i * (colW + gap);
            return (
              <g key={a.name}>
                <rect x={x} y={434} width={colW} height={104} rx="10" fill={a.color} fillOpacity="0.05" stroke={a.color} strokeWidth="1.4" />
                <rect x={x} y={434} width={colW} height="26" rx="10" fill={a.color} fillOpacity="0.16" stroke={a.color} strokeWidth="1.2" />
                <text x={x + colW / 2} y={452} textAnchor="middle" fontSize="12" fontWeight="700" fill={a.color}>
                  {a.name}
                </text>
                <text x={x + 12} y={476} fontSize="11" fill={secondary}>探测距离</text>
                <text x={x + colW - 12} y={476} textAnchor="end" fontSize="11" fontWeight="600" fill={primary}>{a.range}</text>
                <text x={x + 12} y={498} fontSize="11" fill={secondary}>分辨率</text>
                <text x={x + colW - 12} y={498} textAnchor="end" fontSize="11" fontWeight="600" fill={primary}>{a.resolution}</text>
                <text x={x + 12} y={520} fontSize="11" fill={secondary}>天气抗性</text>
                <text x={x + colW - 12} y={520} textAnchor="end" fontSize="11" fontWeight="600" fill={primary}>{a.weather}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={556} textAnchor="middle" fontSize="11" fill={secondary}>
            单一传感器都有盲区 · 多源互补融合才是正解
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        感知传感器俯视图：摄像头前方紫色视野锥；毫米波雷达前后黄色虚线中距扇形；激光雷达绿色 360° 点云环；超声波四角近距环形。底部对照四类传感器的探测距离、分辨率与天气抗性——单一传感器均有盲区，需多源互补融合。
      </figcaption>
    </figure>
  );
}
