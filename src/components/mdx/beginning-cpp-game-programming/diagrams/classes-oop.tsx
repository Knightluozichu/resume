type Item = readonly [title: string, code: string, detail: string];

function OopMap({
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

const boundaryItems = [
  [
    "State",
    "position_ + speed_",
    "对象保存维持行为所需的最小状态，单位和值域由类不变量约束。",
  ],
  ["Representation", "private", "外部不能绕过边界直接制造负速度或越界位置。"],
  [
    "Construction",
    "Bat(start, size)",
    "构造函数建立可用对象，成员初始化列表按声明顺序初始化。",
  ],
  [
    "Commands",
    "moveLeft | moveRight | stop",
    "公开接口表达玩家意图，不泄漏内部布尔组合。",
  ],
  [
    "Update",
    "update(dt, arenaWidth)",
    "类推进并钳制自身位置，调用者不重复球拍边界公式。",
  ],
  [
    "Query",
    "shape() const",
    "只读查询提供绘制视图，const 保证调用不会修改球拍状态。",
  ],
] as const;

const batItems = [
  [
    "Input",
    "held Left / Right",
    "每帧采样连续按键，互相抵消或按明确定义的优先级生成方向。",
  ],
  [
    "Intent",
    "direction_ = -1,0,1",
    "把两个可能矛盾的 bool 归一成一个有限方向状态。",
  ],
  [
    "Integrate",
    "x += speed * direction * dt",
    "速度使用像素每秒，dt 只采样一次并由主循环传入。",
  ],
  ["Clamp", "0..arenaWidth-width", "钳制整个球拍包围盒，不让右边缘越出窗口。"],
  [
    "Sync",
    "shape_.setPosition",
    "逻辑位置更新后一次同步 RectangleShape，避免两套位置分叉。",
  ],
  [
    "Draw",
    "window.draw(bat.shape())",
    "主循环只读取公开视图，绘制不推进游戏状态。",
  ],
] as const;

const frameItems = [
  [
    "Create",
    "RenderWindow + Bat",
    "窗口与球拍在循环外构造，构造失败不进入运行期。",
  ],
  ["Events", "pollEvent", "窗口关闭等离散事件持续抽取，保持应用响应。"],
  ["Input", "Keyboard state", "按住方向键设置本帧移动意图，松开时显式 stop。"],
  [
    "Update",
    "bat.update(dt, width)",
    "对象负责自己的不变量，主函数负责调用顺序和世界边界。",
  ],
  [
    "Render",
    "clear -> draw -> display",
    "当前项目先画球拍，第 7 章再加入 Ball、碰撞和计分。",
  ],
  [
    "Verify",
    "edge + release + resize",
    "测试左右边界、松键停止、不同 dt 和窗口尺寸，不只看中间移动。",
  ],
] as const;

export function BcgpOopBoundaryMap() {
  return (
    <OopMap
      ariaLabel="Beginning C++ Game Programming 第三版第六章状态表示构造命令更新查询六项对象边界图"
      caption="类把状态与不变量放在同一边界内；public 表达意图，private 允许实现变化而不破坏调用者。"
      items={boundaryItems}
    />
  );
}

export function BcgpBatUpdateMap() {
  return (
    <OopMap
      ariaLabel="Pong 球拍输入方向积分边界同步和绘制六阶段更新图"
      caption="球拍每帧只接收方向和 dt，类内部完成积分、边界钳制与形状同步。"
      items={batItems}
    />
  );
}

export function BcgpPongFirstFrameMap() {
  return (
    <OopMap
      ariaLabel="Pong 项目创建事件输入更新渲染验证六阶段第一帧图"
      caption="Pong 第一个垂直切片只证明 Bat 类可构造、移动、停止、受边界约束并正确绘制。"
      items={frameItems}
    />
  );
}
