"use client";

import { useId, useState } from "react";

export type StorageFault =
  | "none"
  | "constraint"
  | "query"
  | "scan"
  | "rows"
  | "commit";
export const storageFaults: { value: StorageFault; label: string }[] = [
  { value: "none", label: "无故障" },
  { value: "constraint", label: "子行约束失败" },
  { value: "query", label: "Query 失败" },
  { value: "scan", label: "Scan 失败" },
  { value: "rows", label: "Rows.Err 失败" },
  { value: "commit", label: "Commit 失败" },
];
export type StorageState = {
  step: number;
  tx: boolean;
  rows: boolean;
  stagedPosts: number;
  stagedComments: number;
  scanned: number;
  committed: "no" | "yes" | "unknown";
  memory: boolean;
  done: boolean;
  log: string[];
};
export function initialStorageState(): StorageState {
  return {
    step: 0,
    tx: false,
    rows: false,
    stagedPosts: 0,
    stagedComments: 0,
    scanned: 0,
    committed: "no",
    memory: true,
    done: false,
    log: ["草稿在进程内；连接池由应用拥有，尚未借出事务连接。"],
  };
}
const actions = [
  "BeginTx 借出连接",
  "INSERT 父行并取得 ID",
  "INSERT 子行绑定父 ID",
  "Query 打开 Rows",
  "Scan 读取父行",
  "Next 结束并检查 Err",
  "Commit 结束事务",
  "模拟进程重启",
];
export function advanceStorage(
  s: StorageState,
  fault: StorageFault,
): StorageState {
  if (s.done) return s;
  const step = s.step + 1;
  const n = { ...s, step, log: [...s.log] };
  function note(text: string) {
    n.log.push(text);
  }
  function fail(text: string) {
    n.rows = false;
    n.tx = false;
    n.stagedPosts = 0;
    n.stagedComments = 0;
    n.done = true;
    note(
      text +
        "；关闭 Rows（如已打开），Rollback 结束本教学模型的事务，归还连接。",
    );
  }
  if (step === 1) {
    n.tx = true;
    note("BeginTx 成功：事务独占一条连接；不能把后续写入改为 db.Exec。");
  }
  if (step === 2) {
    n.stagedPosts = 1;
    note("INSERT posts RETURNING id 得到 41；父行只在本事务暂存区。");
  }
  if (step === 3) {
    if (fault === "constraint") fail("子行 post_id 错指 99，外键约束失败");
    else {
      n.stagedComments = 1;
      note("INSERT comments(post_id=41)：父行 1 → 子行 1，仍未提交。");
    }
  }
  if (step === 4) {
    if (fault === "query") fail("Query 返回错误，没有可归调用者关闭的 Rows");
    else {
      n.rows = true;
      note("Query 成功：Rows 占用读取资源；即使只读一行也必须结束游标。");
    }
  }
  if (step === 5) {
    if (fault === "scan") fail("Scan 类型转换失败，不能把零值当有效记录");
    else {
      n.scanned = 1;
      note("Scan 得到本事务中的父行；读到自己的写入不等于已经提交。");
    }
  }
  if (step === 6) {
    if (fault === "rows")
      fail("Next=false，Rows.Err 返回读取故障，而不是正常读完");
    else {
      n.rows = false;
      note(
        "Next=false 且 Err=nil；耗尽时自动关闭，defer Close 仍为提前返回兜底。",
      );
    }
  }
  if (step === 7) {
    n.tx = false;
    n.stagedPosts = 0;
    n.stagedComments = 0;
    if (fault === "commit") {
      n.committed = "unknown";
      n.done = true;
      note(
        "Commit 返回错误：不确认成功；服务端结果可能未知。事务已终结，不能靠随后 Rollback 证明未提交，也不能盲目重试。",
      );
    } else {
      n.committed = "yes";
      note(
        "Commit=nil：确认父子两行提交；连接归池。这里是教学状态，不是实际 PostgreSQL。",
      );
    }
  }
  if (step === 8) {
    n.memory = false;
    n.done = true;
    note(
      "模拟重启清空进程草稿；已确认的持久化记录仍在。真实耐久性取决于数据库配置与运行验证。",
    );
  }
  return n;
}
const colors = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  warning: "var(--warning)",
};

export function GwpDatabaseLab() {
  const id = useId();
  const [fault, setFault] = useState<StorageFault>("none");
  const [prediction, setPrediction] = useState("未选择");
  const [title, setTitle] = useState("第一篇帖子");
  const [state, setState] = useState(initialStorageState);
  const locked = state.step > 0;
  const buttonClass =
    "min-h-11 rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";
  function reset() {
    setFault("none");
    setPrediction("未选择");
    setTitle("第一篇帖子");
    setState(initialStorageState());
  }
  const visibility =
    state.committed === "yes"
      ? "已确认 1 父 + 1 子"
      : state.committed === "unknown"
        ? "结果未知，需核对"
        : "未确认提交";
  const diagramLabel = `草稿${state.memory ? "存在" : "已清空"}；事务暂存${state.stagedPosts}父行和${state.stagedComments}子行；Rows${state.rows ? "打开" : "关闭"}；${visibility}`;
  return (
    <section
      aria-label="帖子存储与事务资源实验"
      className="my-8 rounded-xl border p-3 sm:p-5"
      style={{ borderColor: colors.border, background: colors.elevated }}
    >
      <h3 className="mt-0 text-lg font-semibold">
        帖子存储：数据去向与资源归还
      </h3>
      <p className="text-sm">
        教学模拟，不连接数据库。先预测提交结果，再单步观察父子行、游标与连接。更换输入先重置；无自动播放。
      </p>
      <label htmlFor={`${id}-title`} className="block text-sm">
        帖子标题（提交参数）
      </label>
      <input
        id={`${id}-title`}
        value={title}
        disabled={locked}
        maxLength={32}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 min-h-11 w-full rounded-md border bg-transparent px-3"
      />
      <fieldset className="mb-3">
        <legend className="text-sm font-medium">故障注入</legend>
        <div className="flex flex-wrap gap-2">
          {storageFaults.map((f) => (
            <button
              key={f.value}
              type="button"
              disabled={locked}
              aria-pressed={fault === f.value}
              onClick={() => setFault(f.value)}
              className={buttonClass}
              style={{
                borderColor: fault === f.value ? colors.accent : colors.border,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mb-3">
        <legend className="text-sm font-medium">预测最终结果</legend>
        <div className="flex flex-wrap gap-2">
          {["可确认已提交", "不能确认已提交"].map((p) => (
            <button
              key={p}
              type="button"
              disabled={locked}
              aria-pressed={prediction === p}
              onClick={() => setPrediction(p)}
              className={buttonClass}
              style={{
                borderColor: prediction === p ? colors.accent : colors.border,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 md:grid-cols-2">
        <svg
          viewBox="0 0 280 440"
          role="img"
          aria-label={diagramLabel}
          className="mx-auto block w-full max-w-[360px]"
          style={{ color: colors.text }}
        >
          <title>{diagramLabel}</title>
          <rect
            x="8"
            y="8"
            width="264"
            height="64"
            rx="8"
            fill={colors.bg}
            stroke={colors.border}
          />
          <text x="20" y="33" fill="currentColor" fontSize="16">
            进程草稿 / Post
          </text>
          {state.memory && (
            <rect x="20" y="46" width="180" height="12" fill={colors.accent} />
          )}
          <path
            d="M140 76 V96 L134 88 M140 96 L146 88"
            stroke={colors.accent}
            fill="none"
            strokeWidth="2"
          />
          <rect
            x="8"
            y="100"
            width="264"
            height="154"
            rx="8"
            fill={colors.bg}
            stroke={state.tx ? colors.accent : colors.border}
            strokeWidth="2"
          />
          <text x="20" y="125" fill="currentColor" fontSize="16">
            事务暂存区（未提交）
          </text>
          {state.stagedPosts > 0 && (
            <g>
              <rect
                x="20"
                y="139"
                width="240"
                height="35"
                rx="4"
                fill={colors.elevated}
                stroke={colors.accent}
              />
              <text x="30" y="162" fill="currentColor" fontSize="16">
                posts · id=41
              </text>
            </g>
          )}
          {state.stagedComments > 0 && (
            <g>
              <path
                d="M42 175 V194 H60"
                stroke={colors.accent}
                fill="none"
                strokeWidth="2"
              />
              <rect
                x="62"
                y="182"
                width="198"
                height="55"
                rx="4"
                fill={colors.elevated}
                stroke={colors.accent}
              />
              <text x="72" y="204" fill="currentColor" fontSize="16">
                comments · id=7
              </text>
              <text x="72" y="225" fill="currentColor" fontSize="16">
                post_id=41
              </text>
            </g>
          )}
          {state.rows && (
            <g>
              <circle cx="247" cy="125" r="7" fill={colors.accent} />
              <path d="M252 155 V223" stroke={colors.accent} strokeWidth="4" />
            </g>
          )}
          <path
            d="M140 259 V288 L134 280 M140 288 L146 280"
            stroke={state.committed === "yes" ? colors.accent : colors.border}
            fill="none"
            strokeWidth="3"
          />
          <text x="20" y="280" fill="currentColor" fontSize="16">
            Commit
          </text>
          <rect
            x="8"
            y="295"
            width="264"
            height="136"
            rx="8"
            fill={colors.bg}
            stroke={
              state.committed === "unknown" ? colors.warning : colors.border
            }
            strokeWidth="2"
          />
          <text x="20" y="322" fill="currentColor" fontSize="16">
            持久化确认区
          </text>
          {state.committed === "yes" && (
            <g>
              <rect
                x="20"
                y="337"
                width="240"
                height="32"
                fill={colors.accent}
                opacity="0.2"
              />
              <rect
                x="62"
                y="379"
                width="198"
                height="32"
                fill={colors.accent}
                opacity="0.2"
              />
              <path d="M42 370 V395 H60" stroke={colors.accent} fill="none" />
              <text x="30" y="359" fill="currentColor" fontSize="16">
                posts · id=41
              </text>
              <text x="72" y="401" fill="currentColor" fontSize="16">
                comments → 41
              </text>
            </g>
          )}
          {state.committed !== "yes" && (
            <text x="20" y="366" fill="currentColor" fontSize="16">
              {visibility}
            </text>
          )}
        </svg>
        <div className="min-w-0">
          <h4 className="font-medium">资源与可见性账本</h4>
          <dl className="space-y-2 text-sm">
            <div>
              <dt>帖子参数</dt>
              <dd className="break-all">{title || "（空标题）"}</dd>
            </div>
            <div>
              <dt>事务连接</dt>
              <dd>{state.tx ? "借出 1 / 归还 0" : "借出 0 / 无占用"}</dd>
            </div>
            <div>
              <dt>Rows 游标</dt>
              <dd>{state.rows ? "打开 1 / 必须关闭" : "打开 0 / 无占用"}</dd>
            </div>
            <div>
              <dt>应用已扫描</dt>
              <dd>{state.scanned} 行（不代表提交）</dd>
            </div>
            <div>
              <dt>提交确认</dt>
              <dd>{visibility}</dd>
            </div>
            <div>
              <dt>资源所有者</dt>
              <dd>应用拥有 DB；事务拥有借用连接；查询调用者负责结束 Rows。</dd>
            </div>
          </dl>
          <p
            role="status"
            aria-live="polite"
            className="mt-4 rounded border p-3 text-sm"
          >
            步骤 {state.step}/8：{state.log.at(-1)}
          </p>
          {state.done && (
            <p className="text-sm">
              预测：{prediction}。实际：{visibility}。
              {prediction === "未选择"
                ? "可重置后先预测再观察。"
                : (prediction === "可确认已提交") ===
                    (state.committed === "yes")
                  ? "预测吻合；请用资源账本解释原因。"
                  : "预测不符；Scan 成功和 Commit 成功不是同一件事。"}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClass}
          disabled={state.done}
          onClick={() => setState((s) => advanceStorage(s, fault))}
        >
          单步：{state.done ? "已结束" : actions[state.step]}
        </button>
        <button type="button" className={buttonClass} onClick={reset}>
          重置全部参数与账本
        </button>
      </div>
      <details className="mt-4 text-sm">
        <summary className="min-h-11 cursor-pointer py-3">
          查看完整资源事件
        </summary>
        <ol className="list-decimal space-y-2 pl-6">
          {state.log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      </details>
      <p className="text-sm">
        边界：约束和回滚是明确的教学规则；提交失败保留未知。图不证明 PostgreSQL
        的隔离级别、崩溃恢复或持久性。
      </p>
    </section>
  );
}

// Executable teaching models, not adapters to sqlx or GORM.
export function mapColumnsByTag(wrongTag: boolean) {
  const columns = [
    { name: "id", value: 41 },
    { name: "title", value: "草稿" },
  ];
  const fields = [
    { field: "ID", tag: "id" },
    { field: "Title", tag: wrongTag ? "headline" : "title" },
  ];
  const links = columns.map((column) => ({
    ...column,
    destination: fields.find((field) => field.tag === column.name)?.field,
  }));
  const missing = links.find((link) => !link.destination);
  return {
    columns,
    fields,
    links,
    error: missing ? `缺少列 ${missing.name} 的目标字段` : null,
    // Do not expose a partially scanned object as a successful result.
    value: missing
      ? null
      : Object.fromEntries(
          links.map((link) => [link.destination!, link.value]),
        ),
  };
}
export type RelationSample = "normal" | "no-parents" | "empty";
export const relationSamples: { value: RelationSample; label: string }[] = [
  { value: "normal", label: "两父三子（打乱子行）" },
  { value: "no-parents", label: "无父行" },
  { value: "empty", label: "有父行但空关联" },
];
export function modelPreload(sample: RelationSample, step: number) {
  const parents = step >= 1 && sample !== "no-parents" ? [41, 42] : [];
  const source =
    sample === "empty"
      ? []
      : [
          { id: 7, postID: 42 },
          { id: 8, postID: 41 },
          { id: 9, postID: 41 },
        ];
  const queried = step >= 2 && parents.length > 0;
  const children = queried
    ? source.filter((child) => parents.includes(child.postID))
    : [];
  const groups = parents.map((id) => ({
    id,
    comments:
      step >= 3
        ? children
            .filter((child) => child.postID === id)
            .map((child) => child.id)
        : [],
  }));
  return {
    parents,
    children,
    groups,
    queried,
    queryCount: Number(step >= 1) + Number(queried),
    done: (step >= 1 && parents.length === 0) || step >= 3,
  };
}

export function GwpMapperLab() {
  const [wrongTag, setWrongTag] = useState(false);
  const [mappingStep, setMappingStep] = useState(0);
  const [sample, setSample] = useState<RelationSample>("normal");
  const [relationStep, setRelationStep] = useState(0);
  const [prediction, setPrediction] = useState("未选择");
  const mapped = mapColumnsByTag(wrongTag);
  const relation = modelPreload(sample, relationStep);
  const buttonClass =
    "min-h-11 rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";
  const mappingStatus =
    mappingStep === 0
      ? "等待读取 SQL 列"
      : mappingStep === 1
        ? "已读 id=41、title=草稿；尚未映射"
        : mapped.error || "映射成功：ID=41，Title=草稿";
  const relationStatus =
    relationStep === 0
      ? "等待父查询"
      : !relation.parents.length
        ? "Find 空父列表；无关联键，跳过 Preload 查询"
        : relationStep === 1
          ? "父键 41、42 已收集；尚未查询评论"
          : relationStep === 2
            ? `关联查询返回 ${relation.children.length} 行；尚未归组`
            : `按 post_id 归组：${relation.groups.map((g) => `${g.id}→[${g.comments.join(",")}]`).join("；")}`;
  function reset() {
    setWrongTag(false);
    setMappingStep(0);
    setSample("normal");
    setRelationStep(0);
    setPrediction("未选择");
  }
  return (
    <section
      aria-label="关系映射器机制实验"
      className="my-6 rounded-xl border p-3 sm:p-5"
      style={{ borderColor: colors.border, background: colors.elevated }}
    >
      <h3 className="mt-0 text-lg font-semibold">列映射不等于关联加载</h3>
      <p className="text-sm">
        两个独立、可执行的教学模型，不调用
        sqlx/GORM，不连接数据库，也不是把两库串联使用。
        左图按标签查找字段；右图按父键筛选子行，再按外键归组。手动操作，无自动播放。
      </p>
      <fieldset>
        <legend className="text-sm font-medium">
          预测当前关联样本的查询总数
        </legend>
        <div className="my-2 flex flex-wrap gap-2">
          {["1 次查询", "2 次查询"].map((label) => (
            <button
              key={label}
              type="button"
              className={buttonClass}
              disabled={relationStep > 0}
              aria-pressed={prediction === label}
              onClick={() => setPrediction(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 md:grid-cols-2">
        <section aria-label="sqlx 列标签映射模型" className="min-w-0">
          <h4 className="font-semibold">sqlx：列名 → db 标签 → 字段</h4>
          <div className="flex flex-wrap gap-2">
            {[false, true].map((wrong) => (
              <button
                key={String(wrong)}
                type="button"
                className={buttonClass}
                disabled={mappingStep > 0}
                aria-pressed={wrongTag === wrong}
                onClick={() => setWrongTag(wrong)}
              >
                {wrong ? "标签错写 headline" : "标签正确 title"}
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 280 290"
            role="img"
            aria-label={mappingStatus}
            className="mx-auto my-3 block w-full max-w-[360px]"
            style={{ color: colors.text }}
          >
            <title>{mappingStatus}</title>
            {[12, 108, 204].map((y) => (
              <rect
                key={y}
                x="6"
                y={y}
                width="268"
                height="74"
                rx="7"
                fill={colors.bg}
                stroke={colors.border}
              />
            ))}
            <g fill="currentColor" fontSize="15">
              <text x="16" y="34">
                SQL 结果列
              </text>
              <text x="16" y="63">
                {mappingStep ? "id = 41" : "id 待读取"}
              </text>
              <text x="139" y="63">
                {mappingStep ? "title = 草稿" : "title 待读取"}
              </text>
              <text x="16" y="130">
                目标字段的 db 标签
              </text>
              <text x="16" y="160">
                id → ID
              </text>
              <text x="139" y="160">
                {wrongTag ? "headline" : "title"} → Title
              </text>
              <text x="16" y="226">
                Go 对象（成功才交付）
              </text>
              <text x="16" y="255">
                {mappingStep < 2
                  ? "尚未交付"
                  : mapped.error
                    ? "映射错误；不交付对象"
                    : "ID:41 · Title:草稿"}
              </text>
            </g>
            {mappingStep >= 2 &&
              mapped.links.map((link, i) => (
                <g
                  key={link.name}
                  stroke={link.destination ? colors.accent : colors.warning}
                  strokeWidth="2"
                  fill="none"
                >
                  <path d={`M${65 + i * 140} 86 V108`} />
                  {link.destination ? (
                    <path d={`M${65 + i * 140} 182 V204 l-5 -7 m5 7 l5 -7`} />
                  ) : (
                    <path d="M198 92 l14 10 m-14 0 l14 -10" />
                  )}
                </g>
              ))}
          </svg>
          <p role="status" className="text-sm">
            {mappingStatus}
          </p>
          <p className="text-sm">
            默认安全映射不忽略未知列；错标签时不会按列位置猜字段。简化模型不涵盖类型转换、嵌入字段和
            Unsafe 模式。
          </p>
          <button
            type="button"
            className={buttonClass}
            disabled={mappingStep === 2}
            onClick={() => setMappingStep((s) => Math.min(s + 1, 2))}
          >
            {mappingStep === 0
              ? "映射单步：读取 SQL 列"
              : mappingStep === 1
                ? "映射单步：按 db 标签匹配"
                : "映射单步：已结束"}
          </button>
        </section>
        <section aria-label="GORM Preload 关联分组模型" className="min-w-0">
          <h4 className="font-semibold">GORM：父键 → 额外查询 → 归组</h4>
          <div className="flex flex-wrap gap-2">
            {relationSamples.map((option) => (
              <button
                key={option.value}
                type="button"
                className={buttonClass}
                disabled={relationStep > 0}
                aria-pressed={sample === option.value}
                onClick={() => {
                  setSample(option.value);
                  setPrediction("未选择");
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 280 370"
            role="img"
            aria-label={relationStatus}
            className="mx-auto my-3 block w-full max-w-[360px]"
            style={{ color: colors.text }}
          >
            <title>{relationStatus}</title>
            {[8, 116, 254].map((y, i) => (
              <rect
                key={y}
                x="6"
                y={y}
                width="268"
                height={i === 1 ? 106 : 94}
                rx="7"
                fill={colors.bg}
                stroke={colors.border}
              />
            ))}
            <g fill="currentColor" fontSize="15">
              <text x="16" y="31">
                父查询：posts · Find
              </text>
              <text x="16" y="65">
                {relationStep === 0
                  ? "尚未执行"
                  : relation.parents.length
                    ? "父 id=41     父 id=42"
                    : "父列表 []：无键可查"}
              </text>
              <text x="16" y="140">
                关联查询：comments
              </text>
              <text x="16" y="165">
                {relation.queried
                  ? "WHERE post_id IN (41,42)"
                  : "尚未查询／无父键则跳过"}
              </text>
              {relation.queried && !relation.children.length && (
                <text x="16" y="196">
                  子列表 []（仍花费 1 次查询）
                </text>
              )}
              {relation.children.map((child, i) => (
                <g key={child.id}>
                  <text x={16 + i * 87} y="189">
                    子 {child.id}
                  </text>
                  <text x={16 + i * 87} y="211">
                    外键 {child.postID}
                  </text>
                </g>
              ))}
              <text x="16" y="279">
                按外键装入 Comments
              </text>
              {relationStep >= 3 ? (
                relation.groups.map((group, i) => (
                  <g key={group.id}>
                    <text x={16 + i * 135} y="307">
                      父 {group.id}
                    </text>
                    <text x={16 + i * 135} y="332">
                      [{group.comments.join(", ")}]
                    </text>
                  </g>
                ))
              ) : (
                <text x="16" y="311">
                  尚未组装，不按行号配对
                </text>
              )}
            </g>
            {relation.queried && (
              <path
                d="M140 102 V116 l-5 -7 m5 7 l5 -7"
                stroke={colors.accent}
                strokeWidth="2"
                fill="none"
              />
            )}
            {relationStep >= 3 &&
              relation.children.map((child, i) => (
                <path
                  key={child.id}
                  d={`M${40 + i * 87} 222 L${child.postID === 41 ? 60 : 215} 254`}
                  stroke={colors.accent}
                  strokeWidth="2"
                  fill="none"
                />
              ))}
          </svg>
          <div role="status" className="text-sm">
            <p>{relationStatus}</p>
            <p>
              查询账本：父 {Number(relationStep >= 1)} + 关联{" "}
              {Number(relation.queried)} = {relation.queryCount} 次；预测：
              {prediction}
            </p>
            {relation.done && (
              <p>
                {prediction === "未选择"
                  ? "未作预测；请重置再比较"
                  : prediction === `${relation.queryCount} 次查询`
                    ? "预测一致"
                    : "预测不一致：以查询账本为准"}
              </p>
            )}
          </div>
          <p className="text-sm">
            限定普通 has-many、Find、一个关联、非嵌套 Preload；不是 Join，也不是
            First。无父行仅 1 次；空关联仍 2
            次。其他关联与查询错误未模拟，实库日志另验。
          </p>
          <button
            type="button"
            className={buttonClass}
            disabled={relation.done}
            onClick={() => setRelationStep((s) => Math.min(s + 1, 3))}
          >
            {relation.done
              ? "关联单步：已结束"
              : [
                  "关联单步：查询父行",
                  "关联单步：查询关联行",
                  "关联单步：按外键归组",
                ][relationStep]}
          </button>
        </section>
      </div>
      <button type="button" className={`${buttonClass} mt-4`} onClick={reset}>
        重置映射器全部参数
      </button>
      <p className="text-sm">
        本区 Reset
        恢复标签、样本、预测、两边步数及结果；不改变上方事务实验。这里的查询计数是模型算出的，不是第三方库执行日志。
      </p>
    </section>
  );
}
