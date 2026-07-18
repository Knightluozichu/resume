type Item = readonly [title: string, code: string, detail: string];

function CameraMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const drawItems = [
  ["Snapshot", "RenderSnapshot", "逻辑提交后冻结本帧位置、层级和外观。"],
  [
    "Gather",
    "Graphics::submit",
    "图形行为生成数据化绘制请求，不修改玩法状态。",
  ],
  ["Cull", "camera bounds", "按相机可见矩形过滤屏外对象和无效资源。"],
  ["Sort", "layer + material", "先保证语义层级，再在层内减少纹理切换。"],
  ["Draw", "target.draw", "渲染器把请求翻译成 SFML 绘制调用。"],
  ["Measure", "calls + switches", "分别统计提交数、剔除数、绘制数和材质切换。"],
] as const;

const viewItems = [
  [
    "Player",
    "committed position",
    "相机只读取提交后的玩家位置，避免画面领先逻辑。",
  ],
  [
    "Main camera",
    "world meters",
    "平滑跟随、前视和世界边界限制都在世界坐标计算。",
  ],
  ["Main viewport", "0..1 window", "主视图占据窗口主体，不把像素尺寸写死。"],
  ["Radar camera", "expanded world", "雷达使用更大世界范围与独立缩放。"],
  [
    "Radar viewport",
    "top-right inset",
    "小视口叠加在右上角，并裁剪自己的绘制集合。",
  ],
  [
    "HUD view",
    "logical pixels",
    "计时文本使用固定逻辑屏幕坐标，不随世界移动。",
  ],
] as const;

const timerItems = [
  ["Accumulate", "elapsed += dt", "只在 Playing 阶段累计受限时间步。"],
  [
    "Derive",
    "minutes + seconds",
    "从单一 elapsed 值派生显示，不分别保存多个计数器。",
  ],
  ["Format", "02:07", "分钟秒数固定宽度，避免文本每秒左右跳动。"],
  ["Measure", "local bounds", "字符串变化后重算原点并包含 bounds 偏移。"],
  ["Anchor", "top center", "按 HUD 逻辑尺寸锚定，不依赖当前世界 View。"],
  ["Reset", "elapsed = 0", "新局、暂停和终局遵循明确计时状态协议。"],
] as const;

export function BcgpDrawCallPipelineMap() {
  return (
    <CameraMap
      ariaLabel="渲染快照收集剔除排序绘制测量六阶段 draw call 图"
      caption="Graphics 只提交绘制数据；渲染器在相机上下文中剔除、排序并执行可度量的 draw calls。"
      items={drawItems}
    />
  );
}

export function BcgpCameraViewsMap() {
  return (
    <CameraMap
      ariaLabel="玩家主相机主视口雷达相机雷达视口 HUD 视图关系图"
      caption="main view 与 radar view 观察同一世界快照但使用不同范围和 viewport；HUD 使用独立屏幕坐标。"
      items={viewItems}
    />
  );
}

export function BcgpTimerTextMap() {
  return (
    <CameraMap
      ariaLabel="计时累计派生格式测量锚定重置六阶段图"
      caption="timer text 从单一 elapsed 派生、按固定宽度格式化并锚定在 HUD View。"
      items={timerItems}
    />
  );
}
