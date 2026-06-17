/**
 * <Vector3Diagram>：第3章「Vector3 是什么」小节的几何掰碎图（HEL-280，B 数学型）。
 *
 * 用 Unity 左手坐标系（X 红向右 / Y 绿向上 / Z 蓝向「里」）画一个点 P=(2,3,4)，
 * 把它表示成从原点出发的一根向量箭头，标注两件事：
 *  ① Vector3 既能表「位置」——从原点出发的位移（终点就是 P 的坐标）；
 *  ② Vector3 也能表「方向 + 大小」——箭头指向哪、有多长。
 *
 * 三根坐标轴用等距投影（isometric）画出立体感：Y 竖直向上，X、Z 各斜向两侧，
 * Unity 是左手系，Z 指向屏幕里侧。坐标轴标签彼此错开、远离边界（svg-check：text ≥14px）。
 *
 * Server Component（纯展示静态 SVG，无交互 / 无 three / reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：全部 DESIGN token（var(--accent)/--success/--warning/
 * --danger/--border/--bg-elevated/--text-primary/--text-secondary），无裸 hex（硬规则 5）。
 */

export function Vector3Diagram() {
  // 等距投影：把 3D 坐标 (x,y,z) 投到 2D 屏幕。原点放画面中下部。
  // X 轴向右偏上、Z 轴向右偏下（指向屏幕里）、Y 轴竖直向上。
  const ORIGIN_X = 235;
  const ORIGIN_Y = 248;
  const UNIT = 20; // 每个世界单位对应的像素步长

  // 投影函数：屏幕坐标。X 往右下偏（cos/sin），Z 往左下偏，Y 直接抬高。
  const project = (x: number, y: number, z: number) => ({
    sx: ORIGIN_X + x * UNIT * 0.92 - z * UNIT * 0.62,
    sy: ORIGIN_Y - y * UNIT - x * UNIT * 0.34 - z * UNIT * 0.52,
  });

  // 点 P = (2, 3, 4)。
  const P = { x: 2, y: 3, z: 4 };
  const pPt = project(P.x, P.y, P.z);

  // 三根轴的末端（轴长各取，确保末端标签远离右侧说明框与边界）。
  const xEnd = project(5, 0, 0);
  const yEnd = project(0, 5.5, 0);
  const zEnd = project(0, 0, 5);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 360"
          role="img"
          aria-label="Unity 左手坐标系下 Vector3 的几何示意。三根坐标轴从原点出发：X 轴红色向右、Y 轴绿色向上、Z 轴蓝色指向屏幕里侧。一个点 P 坐标为括号 2 逗号 3 逗号 4，用一根从原点指向 P 的紫色向量箭头表示。图右侧标注两层含义：第一，Vector3 当位置用时，表示从原点出发的位移，箭头的终点就是 P 的坐标；第二，Vector3 当方向用时，箭头指向哪个朝向、有多长，长度就是它的大小 magnitude。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="v3-arrow-x"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="v3-arrow-y"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
            <marker
              id="v3-arrow-z"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="v3-arrow-p"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="24"
            y="32"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Vector3：一个点 P = (2, 3, 4)
          </text>
          <text x="24" y="52" fontSize="11" fill="var(--text-secondary)">
            Unity 是左手坐标系，Y 朝上
          </text>

          {/* ===== 三根坐标轴 ===== */}
          {/* X 轴（红，向右） */}
          <line
            x1={ORIGIN_X}
            y1={ORIGIN_Y}
            x2={xEnd.sx}
            y2={xEnd.sy}
            stroke="var(--danger)"
            strokeWidth="2"
            markerEnd="url(#v3-arrow-x)"
          />
          <text
            x={xEnd.sx + 8}
            y={xEnd.sy + 6}
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            X
          </text>
          {/* Y 轴（绿，向上） */}
          <line
            x1={ORIGIN_X}
            y1={ORIGIN_Y}
            x2={yEnd.sx}
            y2={yEnd.sy}
            stroke="var(--success)"
            strokeWidth="2"
            markerEnd="url(#v3-arrow-y)"
          />
          <text
            x={yEnd.sx - 6}
            y={yEnd.sy - 10}
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            Y
          </text>
          {/* Z 轴（蓝，指向屏幕里） */}
          <line
            x1={ORIGIN_X}
            y1={ORIGIN_Y}
            x2={zEnd.sx}
            y2={zEnd.sy}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#v3-arrow-z)"
          />
          <text
            x={zEnd.sx - 22}
            y={zEnd.sy + 16}
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            Z
          </text>

          {/* 原点标记 */}
          <circle
            cx={ORIGIN_X}
            cy={ORIGIN_Y}
            r="3.5"
            fill="var(--text-primary)"
          />
          <text
            x={ORIGIN_X - 30}
            y={ORIGIN_Y + 18}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            原点 O
          </text>

          {/* ===== 位置向量 OP（紫，从原点指向 P） ===== */}
          <line
            x1={ORIGIN_X}
            y1={ORIGIN_Y}
            x2={pPt.sx}
            y2={pPt.sy}
            stroke="var(--warning)"
            strokeWidth="2.8"
            markerEnd="url(#v3-arrow-p)"
          />
          {/* P 点 */}
          <circle cx={pPt.sx} cy={pPt.sy} r="4.5" fill="var(--warning)" />
          <text
            x={pPt.sx - 4}
            y={pPt.sy - 12}
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            P (2, 3, 4)
          </text>

          {/* ===== 右侧两层含义说明 ===== */}
          <rect
            x="372"
            y="84"
            width="168"
            height="92"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="386"
            y="106"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ① 当「位置」用
          </text>
          <text x="386" y="126" fontSize="11" fill="var(--text-secondary)">
            从原点出发的位移
          </text>
          <text x="386" y="144" fontSize="11" fill="var(--text-secondary)">
            箭头终点 = P 的坐标
          </text>
          <text x="386" y="162" fontSize="11" fill="var(--text-secondary)">
            (x, y, z) = (2, 3, 4)
          </text>

          <rect
            x="372"
            y="200"
            width="168"
            height="92"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="386"
            y="222"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ② 当「方向」用
          </text>
          <text x="386" y="242" fontSize="11" fill="var(--text-secondary)">
            箭头指向哪个朝向
          </text>
          <text x="386" y="260" fontSize="11" fill="var(--text-secondary)">
            长度 = 大小 magnitude
          </text>
          <text x="386" y="278" fontSize="11" fill="var(--text-secondary)">
            归一化后只剩纯方向
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Vector3 就是三个数 (x, y,
        z)。当成「位置」看，它是从原点出发的一段位移，箭头终点就是 P
        的坐标；当成「方向」看，它指向某个朝向、有自己的长度（大小
        magnitude）。同一个 Vector3，看你怎么用。
      </figcaption>
    </figure>
  );
}
