type Item = readonly [title: string, code: string, detail: string];

function MechanicsMap({
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

const branchItems = [
  [
    "State",
    "array<BranchSide, N>",
    "固定槽位保存 Left、Right、None，逻辑状态不依赖精灵当前变换。",
  ],
  [
    "Shift",
    "for i = N-1 down to 1",
    "从高索引向低索引来源复制，避免正向覆盖后所有槽都变成同一值。",
  ],
  [
    "Generate",
    "distribution -> enum",
    "随机整数只在边界转换一次，核心逻辑使用有名字的枚举状态。",
  ],
  [
    "Map",
    "switch(side)",
    "每个状态设置纹理、位置和旋转；None 必须显式隐藏旧精灵。",
  ],
  [
    "Commit",
    "sprite[i] matches state[i]",
    "更新完成后精灵数组与逻辑数组逐槽一致，渲染只读取。",
  ],
  [
    "Verify",
    "seed + expected slots",
    "固定种子或注入新值，断言移位前后每个索引，不靠肉眼看树枝。",
  ],
] as const;

const loopItems = [
  [
    "Range",
    "0 <= i < size",
    "进入循环体前索引合法；反向循环要避免无符号减到最大值。",
  ],
  [
    "Progress",
    "++i | --i",
    "每次迭代朝退出条件推进；continue 也必须经过推进表达式。",
  ],
  [
    "Invariant",
    "processed prefix",
    "正向遍历前缀已完成，反向移位后缀已保存，未处理区域仍可读取。",
  ],
  [
    "Exit",
    "i == size | i == 0",
    "退出时所有目标槽恰好处理一次，不漏首尾、不访问 size 索引。",
  ],
  [
    "Break",
    "stop current construct",
    "break 只退出当前循环或 switch，不会自动越过外层循环。",
  ],
  [
    "Continue",
    "skip current body",
    "continue 适合过滤，但过多跳转会隐藏不变量，应优先清晰条件。",
  ],
] as const;

const functionItems = [
  [
    "Inputs",
    "branches + rng",
    "函数接收它真正需要的状态和随机源，不读隐式全局变量。",
  ],
  [
    "Mutation",
    "array&",
    "非常量引用明确会修改调用者数组；只读输入使用 const 引用。",
  ],
  [
    "Precondition",
    "N > 0",
    "模板大小或运行时长度先满足边界，空集合不能写索引零。",
  ],
  [
    "Postcondition",
    "shift + one new side",
    "旧槽按规则移动，只有首槽是新生成值，所有枚举都有效。",
  ],
  [
    "Failure",
    "no partial hidden state",
    "本例无分配失败；更复杂函数应返回状态并保持可检查结果。",
  ],
  [
    "Test",
    "fixed rng or supplied side",
    "把随机选择与纯移位分开，核心变换可用固定输入直接断言。",
  ],
] as const;

export function BcgpBranchMechanicMap() {
  return (
    <MechanicsMap
      ariaLabel="Beginning C++ Game Programming 第三版第四章树枝状态移位生成映射提交验证六阶段图"
      caption="树枝机制由数组状态驱动：先安全移位并生成新枚举，再一次性把状态映射到精灵。"
      items={branchItems}
    />
  );
}

export function BcgpLoopInvariantMap() {
  return (
    <MechanicsMap
      ariaLabel="C++ for 循环范围推进不变量退出 break 和 continue 六项边界图"
      caption="循环正确性来自范围、推进和不变量；语法简短不代表首尾与无符号边界会自动正确。"
      items={loopItems}
    />
  );
}

export function BcgpFunctionContractMap() {
  return (
    <MechanicsMap
      ariaLabel="树枝更新函数输入修改前置后置失败和测试六项契约图"
      caption="函数把机制变成可测试契约：依赖显式传入，修改范围由引用表达，随机边界可以替换。"
      items={functionItems}
    />
  );
}
