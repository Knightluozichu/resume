/**
 * <UIStackDiagram>：UI栈管理图
 *
 * 展示UIManager的层级栈结构：
 * - 底层（Bottom）：常驻主界面、HUD
 * - 中层（Normal）：普通面板
 * - 顶层（Top）：弹窗/对话框（压栈/出栈）
 * - 系统层（System）：Loading、Toast、网络错误
 * - Sorting Order逐层递增
 * 右侧演示弹窗压栈(Push)/出栈(Pop)过程。
 */

const VIEW_W = 860;
const VIEW_H = 500;

const STACK_X = 80;
const STACK_BASE_Y = 420;
const PANEL_W = 280;
const PANEL_H = 48;
const PANEL_GAP = 6;

type Layer = {
  name: string;
  en: string;
  color: string;
  order: number;
  desc: string;
};

const LAYERS: readonly Layer[] = [
  { name: "系统层 System", en: "Loading/Toast/Error", color: "var(--danger)", order: 400, desc: "最高优先级，覆盖一切" },
  { name: "弹窗层 Popup", en: "Push/Pop 栈管理", color: "var(--warning)", order: 300, desc: "模态弹窗，先进后出" },
  { name: "面板层 Panel", en: "Normal Screens", color: "var(--accent)", order: 200, desc: "全屏/大半屏功能面板" },
  { name: "HUD层 HUD", en: "Head-Up Display", color: "var(--success)", order: 100, desc: "血条/小地图/摇杆" },
  { name: "底层 Background", en: "Main Scene UI", color: "var(--text-secondary)", order: 0, desc: "主界面常驻背景" },
];

type Op = { label: string; color: string };
const OPS: readonly Op[] = [
  { label: "Push(Settings)", color: "var(--accent)" },
  { label: "Push(Confirm)", color: "var(--warning)" },
  { label: "Pop() → Confirm", color: "var(--success)" },
  { label: "Pop() → Settings", color: "var(--success)" },
];

export function UIStackDiagram() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[860px]"
        style={{ minWidth: 640 }}
        role="img"
        aria-label="UI栈管理层级图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          UI 栈与层级管理
        </text>
        <text x={VIEW_W / 2} y={52} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          按 Sorting Order 分层，弹窗用栈管理（LIFO）
        </text>

        {/* 层级柱（左侧） */}
        <g>
          <text x={STACK_X + PANEL_W / 2} y={78} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">
            UIManager 层级（越往上 Order 越高）
          </text>

          {/* 栈容器 */}
          <rect x={STACK_X - 8} y={STACK_BASE_Y - (PANEL_H + PANEL_GAP) * LAYERS.length + PANEL_H - 8} width={PANEL_W + 16} height={(PANEL_H + PANEL_GAP) * LAYERS.length + 8} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />

          {LAYERS.map((layer, i) => {
            const y = STACK_BASE_Y - (i + 1) * (PANEL_H + PANEL_GAP) + PANEL_GAP;
            return (
              <g key={layer.name}>
                <rect x={STACK_X} y={y} width={PANEL_W} height={PANEL_H} fill="var(--bg)" stroke={layer.color} strokeWidth="1.5" rx="6" />
                <rect x={STACK_X} y={y} width={4} height={PANEL_H} fill={layer.color} rx="2" />
                <text x={STACK_X + 14} y={y + 20} fill={layer.color} fontSize="12" fontWeight="600" fontFamily="system-ui">
                  {layer.name}
                </text>
                <text x={STACK_X + 14} y={y + 36} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
                  {layer.en}
                </text>
                {/* Sorting Order */}
                <rect x={STACK_X + PANEL_W - 60} y={y + 12} width={50} height={22} fill={layer.color} fillOpacity="0.12" stroke={layer.color} strokeWidth="0.8" rx="4" />
                <text x={STACK_X + PANEL_W - 35} y={y + 28} textAnchor="middle" fill={layer.color} fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  {layer.order}
                </text>
              </g>
            );
          })}

          {/* Sorting Order 标注 */}
          <text x={STACK_X + PANEL_W - 35} y={STACK_BASE_Y - (PANEL_H + PANEL_GAP) * LAYERS.length + PANEL_H - 16} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
            Order
          </text>
        </g>

        {/* 右侧：弹窗栈操作演示 */}
        <g>
          <text x={620} y={78} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">
            弹窗栈操作（Push / Pop）
          </text>

          {/* 栈可视化 */}
          <rect x={520} y={100} width={200} height={240} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" rx="8" />
          <text x={620} y={120} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">Popup Stack</text>

          {/* 栈内元素 */}
          {[
            { name: "ConfirmDlg", color: "var(--warning)", y: 260 },
            { name: "Settings", color: "var(--accent)", y: 200 },
            { name: "Shop", color: "var(--accent)", y: 140 },
          ].map((p, i) => (
            <g key={p.name}>
              <rect x={540} y={p.y} width={160} height={44} fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1" rx="5" />
              <text x={620} y={p.y + 27} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontFamily="system-ui">
                {p.name}
              </text>
              {i === 0 && (
                <text x={620} y={p.y - 6} textAnchor="middle" fill="var(--warning)" fontSize="10" fontWeight="600" fontFamily="system-ui">
                  ← Top
                </text>
              )}
            </g>
          ))}

          {/* 操作按钮 */}
          {OPS.map((op, i) => {
            const bx = 460;
            const by = 360 + i * 28;
            return (
              <g key={op.label}>
                <rect x={bx} y={by} width={340} height={22} fill={op.color} fillOpacity="0.08" stroke={op.color} strokeWidth="0.8" rx="4" />
                <text x={bx + 170} y={by + 15} textAnchor="middle" fill={op.color} fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  {op.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* 底部规则 */}
        <rect x={30} y={VIEW_H - 50} width={VIEW_W - 60} height={36} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" rx="6" />
        <text x={VIEW_W / 2} y={VIEW_H - 27} textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily="system-ui">
          规则：每个层级独立Canvas，避免跨层重建；弹窗Push加遮罩、Pop恢复输入；同层用Sorting Order排序
        </text>
      </svg>
    </div>
  );
}
