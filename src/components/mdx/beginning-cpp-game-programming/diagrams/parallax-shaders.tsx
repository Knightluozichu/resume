type Item = readonly [title: string, code: string, detail: string];

function FinishMap({
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

const parallaxItems = [
  [
    "Camera",
    "committed center",
    "读取提交后的主相机中心，不跟随抖动中的临时值。",
  ],
  ["Factor", "0..1 depth", "远层因子小、近层因子大，前景可超过一。"],
  ["Offset", "camera * factor", "从相机位移派生层偏移，不逐帧累加误差。"],
  ["Wrap", "positive modulo", "纹理周期平铺并正确处理负坐标。"],
  ["Submit", "RenderLayer", "每层带语义顺序加入 draw queue。"],
  ["Resize", "coverage tiles", "按 View 宽度计算足够副本，避免边缘露空。"],
] as const;

const shaderItems = [
  [
    "Capability",
    "Shader::isAvailable",
    "启动时检测支持并准备无着色器降级路径。",
  ],
  ["Load", "GLSL files", "一次加载编译，错误包含文件、阶段和驱动日志。"],
  ["Bind", "texture + uniforms", "每帧显式设置时间、分辨率和相机偏移。"],
  ["Draw", "OpenGL context", "SFML 在有效上下文中把状态提交给 GPU。"],
  ["Reset", "RenderStates", "后续普通绘制不继承错误 shader 或 blend 状态。"],
  ["Fallback", "plain sprite", "编译或能力失败时保留可玩、可读画面。"],
] as const;

const gameItems = [
  ["Flow", "Home -> GameOver", "开始、暂停、重启、退出和完整一局均可达。"],
  ["Rules", "deterministic replay", "固定输入与步长得到一致平台、伤害和得分。"],
  [
    "Presentation",
    "camera + audio + HUD",
    "视差、空间音频和界面只消费提交事实。",
  ],
  ["Resources", "load + failure", "纹理、声音、字体和 shader 均有错误策略。"],
  ["Performance", "frame budget", "统计对象、粒子、calls、voice 和更新时间。"],
  ["Release", "clean build + smoke", "从干净环境构建并走完整关键路径。"],
] as const;

export function BcgpParallaxLayersMap() {
  return (
    <FinishMap
      ariaLabel="相机因子偏移环绕提交缩放六阶段视差背景图"
      caption="每层位置由绝对相机位移和深度因子派生；周期环绕与 View 覆盖防止接缝露空。"
      items={parallaxItems}
    />
  );
}

export function BcgpShaderPipelineMap() {
  return (
    <FinishMap
      ariaLabel="着色器能力加载绑定绘制重置降级六阶段图"
      caption="SFML 在 OpenGL 上提交 GLSL；能力检测、uniform 契约和无 shader 降级同样属于实现。"
      items={shaderItems}
    />
  );
}

export function BcgpCompletedGameGateMap() {
  return (
    <FinishMap
      ariaLabel="完成游戏流程规则表现资源性能发布六项验收图"
      caption="completed game 要同时证明流程、规则、表现、资源、性能与干净构建，而不只是能打开窗口。"
      items={gameItems}
    />
  );
}
