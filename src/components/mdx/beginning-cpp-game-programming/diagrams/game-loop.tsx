type Item = readonly [title: string, code: string, detail: string];

function ChapterMap({
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

const setupItems = [
  [
    "Compiler",
    "C++20 mode",
    "统一语言标准、架构和调试配置；头文件能找到不等于链接库版本匹配。",
  ],
  [
    "SFML",
    "graphics + window + system",
    "图形模块依赖窗口与系统模块，构建目标必须链接同一套发行版本。",
  ],
  [
    "Assets",
    "assets/graphics/background.png",
    "运行目录决定相对路径；资源应随可执行产物复制并在加载失败时报告完整上下文。",
  ],
  [
    "Window",
    "sf::RenderWindow",
    "窗口拥有 OpenGL 上下文和事件队列；创建尺寸是初始视口，不等于世界坐标范围。",
  ],
  [
    "Coordinates",
    "screen != world",
    "屏幕像素、视图坐标和游戏世界单位分层，后续相机移动时不要混算。",
  ],
  [
    "Evidence",
    "configure + build + launch",
    "安装完成要由最小窗口实际编译、链接和打开证明，而不是只看 IDE 配置页。",
  ],
] as const;

const frameItems = [
  [
    "Pump events",
    "while (pollEvent)",
    "耗尽窗口事件队列，处理关闭与离散事件；每帧只取一个会积压输入。",
  ],
  [
    "Sample state",
    "Keyboard::isKeyPressed",
    "连续按键状态适合移动，事件适合按下、释放和窗口生命周期。",
  ],
  [
    "Update",
    "world state",
    "当前章只保留位置状态；计时、物理和碰撞将在后续章节逐步加入。",
  ],
  [
    "Clear",
    "window.clear()",
    "开始构造新后缓冲，清除上一帧像素；清屏颜色不是背景资源。",
  ],
  [
    "Draw",
    "window.draw(sprite)",
    "按层次提交当前状态的可绘制对象，纹理必须仍然存活。",
  ],
  [
    "Display",
    "window.display()",
    "交换或呈现完整后缓冲；每帧一次，结束后回到事件处理。",
  ],
] as const;

const ownershipItems = [
  [
    "Texture owns pixels",
    "sf::Texture",
    "纹理持有 GPU 资源，加载失败时对象仍不能作为有效背景使用。",
  ],
  [
    "Sprite borrows",
    "sf::Sprite",
    "精灵保存纹理关联和变换，不拥有纹理；纹理必须比精灵活得更久。",
  ],
  [
    "Path context",
    "asset path + cwd",
    "错误日志同时给路径和运行目录，避免把缺文件误判为解码器或显卡故障。",
  ],
  [
    "Window owns context",
    "RenderWindow",
    "依赖图形上下文的资源销毁顺序要受控，主函数局部对象按逆声明顺序销毁。",
  ],
  [
    "Close request",
    "window.close()",
    "事件只报告请求，代码显式关闭窗口，循环条件在下一次检查时终止。",
  ],
  [
    "Single exit policy",
    "return nonzero",
    "初始化失败立即停止进入循环；运行期错误记录状态并按一致策略退出。",
  ],
] as const;

export function BcgpSetupCoordinateMap() {
  return (
    <ChapterMap
      ariaLabel="Beginning C++ Game Programming 第三版第一章编译器 SFML 资源窗口坐标和验证六项环境图"
      caption="最小窗口能运行才算环境成立：编译、链接、资源路径、窗口上下文和坐标约定必须同时一致。"
      items={setupItems}
    />
  );
}

export function BcgpFirstFrameMap() {
  return (
    <ChapterMap
      ariaLabel="Timber 第一章事件状态更新清屏绘制呈现六阶段游戏循环图"
      caption="一帧先耗尽事件，再更新世界，最后按 clear-draw-display 构造并呈现完整画面。"
      items={frameItems}
    />
  );
}

export function BcgpBackgroundOwnershipMap() {
  return (
    <ChapterMap
      ariaLabel="Timber 第一章纹理精灵路径窗口关闭与错误退出六项资源所有权图"
      caption="精灵借用纹理，窗口管理上下文，初始化错误阻止进入循环；把生命周期画清才能避免白块和悬空资源。"
      items={ownershipItems}
    />
  );
}
