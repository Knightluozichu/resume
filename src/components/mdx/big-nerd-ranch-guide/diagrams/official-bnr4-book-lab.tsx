"use client";

import { useMemo, useState } from "react";

type Mode = "lifecycle" | "failure" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[] };
type Scenario = {
  kind:
    | "lifecycle"
    | "state"
    | "ui"
    | "data"
    | "boundary"
    | "background"
    | "render"
    | "capstone";
  phases: readonly string[];
  primaryCondition: string;
  secondaryCondition: string;
  baseline: string;
};

const evidenceGates = [
  "固定构建与设备",
  "记录初始状态",
  "只改变一个条件",
  "保存原始轨迹",
  "复位并重放断言",
];

function scenarioFor(unitTitle: string): Scenario {
  if (/Activity Lifecycle/.test(unitTitle))
    return {
      kind: "lifecycle",
      phases: ["启动", "覆盖", "返回", "旋转", "进程恢复"],
      primaryCondition: "允许保存状态",
      secondaryCondition: "所有者仍存活",
      baseline: "新Activity实例进入onResume，quiz索引为0。",
    };
  if (/Persisting UI State|Fragment|Dialogs/.test(unitTitle))
    return {
      kind: "state",
      phases: ["输入", "保存", "销毁View", "重建", "恢复"],
      primaryCondition: "saved state可用",
      secondaryCondition: "目标仍在返回栈",
      baseline: "用户输入进入状态所有者，界面只渲染快照。",
    };
  if (/Databases|Room|Data Binding|SearchView/.test(unitTitle))
    return {
      kind: "data",
      phases: ["读基线", "写事务", "提交", "通知观察者", "重开进程"],
      primaryCondition: "schema匹配",
      secondaryCondition: "观察者仍活跃",
      baseline: "DAO读取2行，UI观察同一事实源。",
    };
  if (/HTTP|Looper|WorkManager/.test(unitTitle))
    return {
      kind: "background",
      phases: ["入队", "等待约束", "执行", "回传", "重试/完成"],
      primaryCondition: "外部资源可用",
      secondaryCondition: "接收所有者有效",
      baseline: "任务尚未执行，队列只有一个稳定ID。",
    };
  if (/Intent|Picture|Broadcast|WebView|Accessibility|Localization|Audio/.test(unitTitle))
    return {
      kind: "boundary",
      phases: ["构造请求", "解析目标", "授权", "交换数据", "验证结果"],
      primaryCondition: "外部响应者可信",
      secondaryCondition: "临时权限有效",
      baseline: "请求留在应用边界内，尚未授予外部能力。",
    };
  if (/RecyclerView|Layout|App Bar|Styles|Drawables|Custom Views|Animation/.test(unitTitle))
    return {
      kind: "render",
      phases: ["测量", "绑定", "输入", "绘制", "回收/取消"],
      primaryCondition: "输入数据有效",
      secondaryCondition: "渲染所有者有效",
      baseline: "模型与View边界一致，尚无未完成动画或手势。",
    };
  if (/学习地图|总复习|Afterword/.test(unitTitle))
    return {
      kind: "capstone",
      phases: ["定义任务", "画状态图", "实现切片", "注入故障", "发布验收"],
      primaryCondition: "证据齐全",
      secondaryCondition: "回滚路径可用",
      baseline: "六条项目线均从用户任务开始，没有把API清单当成结果。",
    };
  return {
    kind: "ui",
    phases: ["接收事件", "更新模型", "生成状态", "渲染", "重建"],
    primaryCondition: "输入合同有效",
    secondaryCondition: "状态所有者有效",
    baseline: "用户事件尚未产生副作用，模型与界面一致。",
  };
}

function nodeContract(node: string, scenario: Scenario) {
  const value = node.toLowerCase();
  if (/challenge/.test(value))
    return {
      owner: "学习者编写的最小实现",
      state: "一个刻意制造的边界样本",
      thread: "沿被测API真实线程执行",
      test: "先预测，再用反例推翻顺利路径",
    };
  if (/lifecycle|rotat|state|viewmodel/.test(value))
    return {
      owner: "Activity / ViewModel / saved state",
      state: "实例字段与可恢复事实分层",
      thread: "主线程分发生命周期回调",
      test: "旋转后比较实例ID、回调和用户状态",
    };
  if (/room|database|dao|query|livedata|repository/.test(value))
    return {
      owner: "RoomDatabase、DAO与Repository",
      state: "SQLite行、schema版本与观察快照",
      thread: "磁盘I/O离开主线程，通知回到观察者",
      test: "重开进程后核对行数、迁移和通知次数",
    };
  if (/work|background|http|looper|handler|thread|network/.test(value))
    return {
      owner: "Worker / Repository / MessageQueue",
      state: "请求ID、约束、attempt与终态",
      thread: "后台执行，生命周期安全地回传",
      test: "断网、取消与重试时不重复副作用",
    };
  if (/intent|broadcast|web|picture|contact|permission/.test(value))
    return {
      owner: "发起组件、系统解析器与外部响应者",
      state: "action、URI、授权和返回结果",
      thread: "主线程交接，外部进程独立执行",
      test: "零响应者、拒权、取消和畸形返回均可恢复",
    };
  if (/view|layout|recycler|draw|animation|touch|style|theme/.test(value))
    return {
      owner: "View树、Adapter或Animator",
      state: "模型身份、几何边界与交互终态",
      thread: "主线程测量、布局、绘制和输入",
      test: "小屏、大字、重绑与取消后视觉和语义一致",
    };
  return {
    owner: `${scenario.kind}场景的最近生命周期所有者`,
    state: "输入、当前事实与可观察输出",
    thread: "按Android API合同区分主线程与后台",
    test: "只改变一个条件并定位首个状态分叉",
  };
}

function transitionText(
  scenario: Scenario,
  phase: number,
  primary: boolean,
  secondary: boolean,
) {
  const phaseName = scenario.phases[phase];
  if (!primary)
    return {
      event: `${phaseName}：${scenario.primaryCondition}被关闭`,
      owned: "副作用不得继续提交；保留可重试输入或明确失败终态。",
      visible: "显示可恢复错误，不伪造成功，也不丢失既有事实。",
    };
  if (!secondary)
    return {
      event: `${phaseName}：${scenario.secondaryCondition}被关闭`,
      owned: "取消回调、观察或动画，释放对旧所有者的引用。",
      visible: "旧结果不得覆盖新页面；重新进入时从事实源重建。",
    };
  const states = {
    lifecycle: [
      "onCreate → onStart → onResume，实例#1可交互。",
      "onPause；若完全不可见再进入onStop。",
      "onRestart → onStart → onResume，仍是实例#1。",
      "实例#1保存状态后销毁，实例#2按新配置创建。",
      "进程内对象消失，实例#3只从持久事实恢复。",
    ],
    state: [
      "事件写入状态所有者，View只显示新快照。",
      "只保存重建界面所需的最小键和值。",
      "清除View引用，状态所有者按作用域继续或结束。",
      "新View重新订阅，不重复导航或写入。",
      "用saved state或持久事实恢复同一用户任务。",
    ],
    data: [
      "DAO读取固定基线，记录行数与schema版本。",
      "写入位于一个事务内，约束失败则整体回滚。",
      "提交后文件事实改变，返回影响行数。",
      "观察者收到新快照，UI按稳定ID做差量更新。",
      "新进程重新打开同一数据库并得到相同行数。",
    ],
    background: [
      "生成稳定请求ID并去重，队列只增加一项。",
      "约束未满足时保持等待，不忙轮询。",
      "后台执行一次，保存attempt与原始结果。",
      "只向仍有效的状态所有者提交结果。",
      "成功收束为终态；可重试错误增加attempt但不重复副作用。",
    ],
    boundary: [
      "构造最小action、data与MIME，不附带多余事实。",
      "系统得到明确匹配集合，零响应者走可恢复分支。",
      "只授予本次任务所需的临时能力。",
      "外部响应者独立处理，应用不假设其进程存活。",
      "校验结果类型、大小与来源，再更新内部事实。",
    ],
    render: [
      "父约束和内容共同得到确定测量边界。",
      "稳定身份对应完整绑定，旧View状态被覆盖。",
      "输入归约为模型变化，不直接涂改偶然像素。",
      "按模型绘制，视觉边界与语义节点一致。",
      "回收或取消后无旧监听、旧动画和每帧泄漏。",
    ],
    capstone: [
      "从可观察用户结果定义范围，而非列API。",
      "标出所有者、事实源、线程、边界和恢复点。",
      "完成最小垂直切片并冻结输入与构建。",
      "一次注入一个边界，保存首个分叉。",
      "全书门禁通过后才形成可回滚发布候选。",
    ],
    ui: [
      "接收并验证一个用户事件。",
      "状态归约器产生唯一新模型。",
      "状态所有者发布不可变快照。",
      "View根据快照渲染可见与语义结果。",
      "新实例从事实源重建，不重放旧副作用。",
    ],
  } as const;
  return {
    event: `${phaseName}：两个条件均满足`,
    owned: states[scenario.kind][phase],
    visible: `用户看到与“${phaseName}”一致的确定结果，可由同一输入重放。`,
  };
}

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded border border-zinc-400 px-3 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-900"
    >
      重置实验
    </button>
  );
}

export function OfficialBnr4BookLab({ mode, unitTitle, focus, nodes }: Props) {
  const scenario = useMemo(() => scenarioFor(unitTitle), [unitTitle]);
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState(0);
  const [primary, setPrimary] = useState(true);
  const [secondary, setSecondary] = useState(true);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visible = nodes.slice(0, 16);
  const contract = nodeContract(visible[selected] ?? unitTitle, scenario);
  const transition = transitionText(scenario, phase, primary, secondary);
  const evidenceCount = checked.filter(Boolean).length;

  if (mode === "lifecycle")
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={`${unitTitle}目录机制实验`}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40">
          <div>
            <p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Android mechanism map
            </p>
            <h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3>
          </div>
          <ResetButton onReset={() => setSelected(0)} />
        </header>
        <div className="grid min-h-[320px] md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
          <div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">
            {visible.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                className={`min-h-11 rounded border px-3 py-2 text-left text-xs font-medium ${
                  selected === index
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
              >
                <span className="mr-2 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {node}
              </button>
            ))}
          </div>
          <div className="p-4" aria-live="polite">
            <p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">
              当前机制合同
            </p>
            <p className="mt-2 text-sm font-bold">{visible[selected] ?? unitTitle}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <div><dt className="font-semibold">所有者</dt><dd>{contract.owner}</dd></div>
              <div><dt className="font-semibold">状态</dt><dd>{contract.state}</dd></div>
              <div><dt className="font-semibold">线程</dt><dd>{contract.thread}</dd></div>
              <div><dt className="font-semibold">反例</dt><dd>{contract.test}</dd></div>
            </dl>
            <p className="mt-4 border-l-4 border-amber-500 pl-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              {focus}
            </p>
          </div>
        </div>
      </section>
    );

  if (mode === "failure")
    return (
      <section
        className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={`${unitTitle}单变量边界实验`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              One-variable boundary lab
            </p>
            <h3 className="m-0 mt-1 text-base font-bold">状态转换与可见结果</h3>
          </div>
          <ResetButton
            onReset={() => {
              setPhase(0);
              setPrimary(true);
              setSecondary(true);
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {scenario.phases.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setPhase(index)}
              aria-pressed={phase === index}
              className={`min-h-11 rounded border px-2 text-xs font-semibold ${
                phase === index
                  ? "border-cyan-700 bg-cyan-700 text-white"
                  : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPrimary((value) => !value)}
            aria-pressed={!primary}
            className={`min-h-11 rounded border px-3 text-sm ${
              primary
                ? "border-zinc-300 dark:border-zinc-700"
                : "border-rose-700 bg-rose-700 text-white"
            }`}
          >
            {scenario.primaryCondition}：{primary ? "是" : "否"}
          </button>
          <button
            type="button"
            onClick={() => setSecondary((value) => !value)}
            aria-pressed={!secondary}
            className={`min-h-11 rounded border px-3 text-sm ${
              secondary
                ? "border-zinc-300 dark:border-zinc-700"
                : "border-amber-700 bg-amber-700 text-white"
            }`}
          >
            {scenario.secondaryCondition}：{secondary ? "是" : "否"}
          </button>
        </div>
        <dl
          className="mt-4 grid gap-3 rounded border border-zinc-300 p-4 text-sm dark:border-zinc-700"
          aria-live="polite"
        >
          <div><dt className="font-semibold">触发事件</dt><dd>{transition.event}</dd></div>
          <div><dt className="font-semibold">所有者内状态</dt><dd>{transition.owned}</dd></div>
          <div><dt className="font-semibold">用户可见结果</dt><dd>{transition.visible}</dd></div>
        </dl>
        <p className="mt-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          基线：{scenario.baseline}
        </p>
      </section>
    );

  return (
    <section
      className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${unitTitle}重放证据门`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-xs font-semibold text-violet-700 dark:text-violet-300">
            Replay evidence gate
          </p>
          <h3 className="m-0 mt-1 text-base font-bold">初始—改变—重置</h3>
        </div>
        <div className="flex items-center gap-2">
          <output
            className="min-w-20 rounded border border-zinc-300 px-3 py-2 text-center text-sm font-bold dark:border-zinc-700"
            aria-live="polite"
          >
            {evidenceCount}/5
          </output>
          <ResetButton onReset={() => setChecked([true, false, false, false, false])} />
        </div>
      </div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {evidenceGates.map((gate, index) => (
          <button
            key={gate}
            type="button"
            onClick={() =>
              setChecked((current) =>
                current.map((value, itemIndex) =>
                  itemIndex === index ? !value : value,
                ),
              )
            }
            aria-pressed={checked[index]}
            className="flex min-h-11 w-full items-center justify-between gap-3 px-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <span>{gate}</span>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded border font-bold ${
                checked[index]
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-zinc-400 text-transparent"
              }`}
            >
              ✓
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        {evidenceCount === evidenceGates.length
          ? `“${unitTitle}”已形成可重放证据：同一基线、单变量变化和重置后的断言一致。`
          : `“${unitTitle}”仍缺${evidenceGates.length - evidenceCount}项证据；完成前不能把一次成功操作当成结论。`}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
        {focus}
      </p>
    </section>
  );
}
