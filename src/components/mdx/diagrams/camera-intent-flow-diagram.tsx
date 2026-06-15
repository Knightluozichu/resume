/**
 * <CameraIntentFlowDiagram />：《Android 编程权威指南》intent-data/taking-pictures 章
 * 「Intent 拍照 + FileProvider 全链路」配图（HEL-185）。
 *
 * 画面内容：用隐式 intent 调系统相机拍照、经 FileProvider 安全交换文件的五步流程，
 * 用语义色区分两个参与方——「我的 App」（accent 紫）与「相机 App」（success 绿）：
 *  ① 我的 App：创建空临时文件 + FileProvider.getUriForFile() 取得 content:// URI；
 *  ② 我的 App：启动 ACTION_IMAGE_CAPTURE Intent，putExtra(EXTRA_OUTPUT, uri)
 *     并加 FLAG_GRANT_WRITE_URI_PERMISSION 授临时写权限；
 *  ③ 相机 App：拍照并把全分辨率图写入该 content URI；
 *  ④ 我的 App：Result API（TakePicture / registerForActivityResult）回到我的 App；
 *  ⑤ 我的 App：读取该文件路径、显示缩略图 / 高清图。
 * 右侧关键标注框（warning 色）：为何必须用 FileProvider——file:// URI 在 Android 7.0(N)+
 * 跨 App 传递会触发 FileUriExposedException，必须用 content:// 经 FileProvider 暴露并授临时权限。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 流程步骤：actor = 参与方语义色；title = 阶段名；sub = 关键 API / 动作。 ——
type FlowStep = {
  /** 序号标记（①②③④⑤）。 */
  badge: string;
  /** 参与方：我的 App / 相机 App。 */
  actor: string;
  /** 阶段标题。 */
  title: string;
  /** 关键 API / 动作说明（多行）。 */
  notes: readonly string[];
  /** 语义色 token：accent = 我的 App，success = 相机 App。 */
  color: string;
};

const STEPS: readonly FlowStep[] = [
  {
    badge: "①",
    actor: "我的 App",
    title: "建空文件 + 取 content:// URI",
    notes: [
      "File.createTempFile(…, cacheDir)",
      "FileProvider.getUriForFile(ctx, authority, file)",
    ],
    color: "var(--accent)",
  },
  {
    badge: "②",
    actor: "我的 App",
    title: "发 ACTION_IMAGE_CAPTURE Intent",
    notes: [
      "putExtra(MediaStore.EXTRA_OUTPUT, uri)",
      "FLAG_GRANT_WRITE_URI_PERMISSION 授临时写权限",
    ],
    color: "var(--accent)",
  },
  {
    badge: "③",
    actor: "相机 App",
    title: "拍照并写入该 content URI",
    notes: [
      "用户按下快门，相机 App 拍摄",
      "全分辨率 JPEG 直接写进你指定的文件",
    ],
    color: "var(--success)",
  },
  {
    badge: "④",
    actor: "我的 App",
    title: "Result API 回到我的 App",
    notes: [
      "registerForActivityResult(TakePicture())",
      "回调 success == true 表示拍照完成",
    ],
    color: "var(--accent)",
  },
  {
    badge: "⑤",
    actor: "我的 App",
    title: "读取文件、显示照片",
    notes: [
      "setImageURI(uri) 或 BitmapFactory.decodeFile",
      "data 里没有大图，靠之前存的 uri 读",
    ],
    color: "var(--accent)",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const STEP_X = 24; // 步骤块左边距
const STEP_W = 396; // 步骤块宽
const STEP_H = 72; // 步骤块高
const STEP_GAP = 32; // 步骤块竖向间距（容纳向下箭头）
const TOP = 64; // 第一块顶部 y（标题留白）

const BADGE_R = 14; // 序号圆半径

// 右侧关键标注框（FileProvider 为何而存在）。
const NOTE_X = 452; // 标注框左边距
const NOTE_W = 284; // 标注框宽

const ARROW = 5; // 箭头三角半高

const VIEW_W = 760;
const VIEW_H = TOP + STEPS.length * STEP_H + (STEPS.length - 1) * STEP_GAP + 40;

/** 第 i 块的顶部 y。 */
function stepTop(i: number): number {
  return TOP + i * (STEP_H + STEP_GAP);
}

export function CameraIntentFlowDiagram() {
  // 标注框竖向覆盖 ①~② 块（content:// URI 与授权发生处）。
  const noteTop = stepTop(0);
  const noteH = stepTop(1) + STEP_H - noteTop;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="用隐式 intent 调系统相机拍照、经 FileProvider 安全交换文件的五步流程图。左侧自上而下五个步骤块，用两种语义色区分参与方：紫色块是我的 App，绿色块是相机 App。第一步（我的 App）：先用 File.createTempFile 在 App 私有 cache 目录创建一个空文件，再用 FileProvider.getUriForFile 把这个文件路径包装成受权限保护的 content 冒号斜杠斜杠 URI。第二步（我的 App）：发出 action 为 MediaStore.ACTION_IMAGE_CAPTURE 的隐式 intent，通过 putExtra 把 MediaStore.EXTRA_OUTPUT 设为刚才那个 URI，并加上 FLAG_GRANT_WRITE_URI_PERMISSION 标志，把对这个 URI 的临时写权限授予相机 App。第三步（相机 App）：用户按下快门，相机 App 拍照，并把全分辨率 JPEG 直接写进你指定的那个 content URI 对应的文件里。第四步（我的 App）：通过 registerForActivityResult 配合 TakePicture Contract 的 Result API 回到我的 App，回调里 success 等于 true 表示拍照完成。第五步（我的 App）：用 setImageURI 或 BitmapFactory.decodeFile 读取该文件并显示照片，注意 intent 的 data 里并没有大图，必须靠之前保存的 URI 成员变量来读。五个步骤块之间用向下的箭头依次相连。图右侧有一个黄色关键标注框，说明为什么必须用 FileProvider：在 Android 7.0，也就是 API 24（代号 N）及以上，直接把 file 冒号斜杠斜杠 URI 跨 App 传递会触发 FileUriExposedException 异常，因为那会暴露你的私有目录绝对路径；所以必须改用 content 冒号斜杠斜杠 URI，经 FileProvider 暴露文件并只授予临时读写权限，相机 App 用完权限自动失效。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 箭头 marker：步骤间向下流转用 accent。 */}
          <defs>
            <marker
              id="cam-arr"
              markerWidth="8"
              markerHeight="8"
              refX="3"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L6 0 L3 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={STEP_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Intent 拍照全链路：我的 App 与相机 App 经 FileProvider 安全交换文件
          </text>
          <text
            x={STEP_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            紫 = 我的 App｜绿 = 相机 App；文件只在私有目录，靠 content:// URI + 临时权限借出
          </text>

          {/* —— 步骤间向下箭头（画在块下层）—— */}
          {STEPS.slice(0, -1).map((s, i) => {
            const fromBottom = stepTop(i) + STEP_H;
            const toTop = stepTop(i + 1);
            const x = STEP_X + STEP_W / 2;
            return (
              <line
                key={`arr-${s.badge}`}
                x1={x}
                y1={fromBottom}
                x2={x}
                y2={toTop - ARROW}
                stroke="var(--accent)"
                strokeWidth="1.6"
                markerEnd="url(#cam-arr)"
              />
            );
          })}

          {/* —— 五个流程步骤块 —— */}
          {STEPS.map((s, i) => {
            const y = stepTop(i);
            return (
              <g key={s.badge}>
                <rect
                  x={STEP_X}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.08"
                  stroke={s.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={STEP_X}
                  y={y}
                  width="4"
                  height={STEP_H}
                  rx="2"
                  fill={s.color}
                />
                {/* 序号圆 */}
                <circle
                  cx={STEP_X + 28}
                  cy={y + STEP_H / 2}
                  r={BADGE_R}
                  fill={s.color}
                  fillOpacity="0.16"
                  stroke={s.color}
                  strokeWidth="1.2"
                />
                <text
                  x={STEP_X + 28}
                  y={y + STEP_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.badge}
                </text>
                {/* 参与方标签 */}
                <text
                  x={STEP_X + 52}
                  y={y + 20}
                  fontSize="9.5"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.actor}
                </text>
                {/* 阶段标题 */}
                <text
                  x={STEP_X + 52}
                  y={y + 36}
                  fontSize="11.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.title}
                </text>
                {/* 关键 API / 动作（多行） */}
                {s.notes.map((n, j) => (
                  <text
                    key={n}
                    x={STEP_X + 52}
                    y={y + 50 + j * 13}
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 右侧关键标注框：为何必须用 FileProvider —— */}
          <rect
            x={NOTE_X}
            y={noteTop}
            width={NOTE_W}
            height={noteH}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          {/* 标注框 → ② 块的指向线（content:// 与授权发生处）。 */}
          <line
            x1={NOTE_X}
            y1={stepTop(1) + STEP_H / 2}
            x2={STEP_X + STEP_W + ARROW}
            y2={stepTop(1) + STEP_H / 2}
            stroke="var(--warning)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${STEP_X + STEP_W} ${stepTop(1) + STEP_H / 2}
                l ${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--warning)"
          />
          <text
            x={NOTE_X + 14}
            y={noteTop + 22}
            fontSize="11"
            fontWeight="700"
            fill="var(--warning)"
          >
            为何必须用 FileProvider？
          </text>
          {[
            "file:// URI 在 Android 7.0(N, API 24)+",
            "跨 App 传递会抛 FileUriExposedException——",
            "它会暴露你的私有目录绝对路径。",
            "必须改用 content:// URI：经 FileProvider",
            "暴露文件并只授临时读写权限，用完即失效。",
          ].map((line, i) => (
            <text
              key={line}
              x={NOTE_X + 14}
              y={noteTop + 40 + i * 14}
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              {line}
            </text>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拍照五步：我的 App 先建空文件并用 <code>FileProvider.getUriForFile()</code> 取得{" "}
        <code>content://</code> URI，发 <code>ACTION_IMAGE_CAPTURE</code> Intent
        （带 <code>EXTRA_OUTPUT</code> + 临时写权限）→ 相机 App 把全分辨率图写进该 URI →{" "}
        Result API 回调 → 读文件显示。用 <code>file://</code> URI 跨 App 传在 Android 7.0+ 会抛{" "}
        <code>FileUriExposedException</code>，必须经 FileProvider 暴露成 <code>content://</code>。
      </figcaption>
    </figure>
  );
}
