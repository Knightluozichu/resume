"use client";

import { useId, useState, type ReactNode } from "react";

// 本章需求：用查单→确认取消串联七坐标；信任边界数据流、提交后丢包的跨服务时序、历史/现代适配差异拓扑；故障改变路径/执行次数，各自全重置。仅本地确定性模拟，不代表88条目验收或真实API证据。保留三个旧导出。
const C = {
  bg: "var(--bg-elevated)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  good: "var(--success)",
  bad: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 max-w-full rounded-lg border px-3 py-2 text-sm whitespace-normal text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";
const graphic = "mx-auto my-4 block h-auto w-full max-w-xl";

function ReviewLab({
  kind,
  title,
  reset,
  children,
}: {
  kind: string;
  title: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 min-w-0 max-w-full rounded-xl border p-3 sm:p-5"
      style={{ color: C.text, borderColor: C.border }}
      data-visual-kind={kind}
      aria-label={title}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <button type="button" className={control} onClick={reset}>
          重置
        </button>
      </header>
      {children}
    </section>
  );
}

function Arrow({
  d,
  marker,
  color = C.accent,
  dashed = false,
}: {
  d: string;
  marker: string;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeDasharray={dashed ? "12 10" : undefined}
      markerEnd={`url(#${marker})`}
    />
  );
}

function ArrowHead({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 Z" fill="context-stroke" />
      </marker>
    </defs>
  );
}

export function LaeOfficialFinalReviewRequestContractLab() {
  const id = useId();
  const [scenario, setScenario] = useState("normal");
  const [confirmed, setConfirmed] = useState(false);
  const [bypass, setBypass] = useState(false);
  const readable = scenario !== "foreign";
  const written = readable && (confirmed || bypass);
  const unsafe = written && !confirmed;
  const color = unsafe ? C.bad : C.good;
  return (
    <ReviewLab
      kind="order-support-trust-dataflow"
      title="实验一：查单证据不等于取消权限"
      reset={() => {
        setScenario("normal");
        setConfirmed(false);
        setBypass(false);
      }}
    >
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <label className="grid min-w-0 gap-1 text-sm">
          输入场景
          <select
            className={control}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="normal">本人 A17：查询并申请取消</option>
            <option value="injection">A17 备注注入：立即取消</option>
            <option value="foreign">他人 B42：尝试查询</option>
          </select>
        </label>
        <button
          type="button"
          className={control}
          aria-pressed={confirmed}
          onClick={() => setConfirmed(!confirmed)}
        >
          用户确认：{confirmed ? "已确认" : "未确认"}
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={bypass}
          onClick={() => setBypass(!bypass)}
        >
          故障：{bypass ? "跳过确认校验" : "确认校验正常"}
        </button>
      </div>
      <svg
        viewBox="0 0 800 950"
        className={graphic}
        role="img"
        aria-label="订单客服跨信任边界数据流"
        aria-describedby={`${id}-desc`}
      >
        <title>查询归属、模型建议与取消确认分离</title>
        <desc id={`${id}-desc`}>
          {readable
            ? `查询A17后仅把状态发送模型；模型返回取消建议。${written ? "确认门打开，进入订单写入。" : "确认门关闭，不能写订单。"}`
            : "B42归属检查失败，在查询入口拒绝，不向模型发送订单资料。"}
          {scenario === "injection"
            ? "备注注入沿不可信数据支路返回，不产生确认凭证。"
            : ""}
        </desc>
        <ArrowHead id={id} />
        <g fontSize="40" fill={C.text} textAnchor="middle">
          <path
            d="M430 180 V720"
            stroke={C.muted}
            strokeWidth="3"
            strokeDasharray="10 10"
          />
          <text x="90" y="190">
            业务后端
          </text>
          <text x="620" y="190">
            模型服务
          </text>
          <circle
            cx="185"
            cy="75"
            r="51"
            fill={C.bg}
            stroke={C.accent}
            strokeWidth="5"
          />
          <text x="185" y="89">
            用户
          </text>
          <Arrow d="M185 128 V215" marker={id} />
          <path
            d="M185 220 L295 280 L185 340 L75 280 Z"
            fill={C.bg}
            stroke={readable ? C.good : C.bad}
            strokeWidth="6"
          />
          <text x="185" y="294">
            归属检查
          </text>
          {readable ? (
            <>
              <Arrow d="M295 280 H550" marker={id} />
              <text x="430" y="250">
                最小状态
              </text>
              <circle
                cx="620"
                cy="280"
                r="65"
                fill={C.bg}
                stroke={C.accent}
                strokeWidth="5"
              />
              <text x="620" y="294">
                模型
              </text>
              <Arrow d="M620 345 V420 H185 V470" marker={id} dashed />
              <text x="410" y="399">
                建议：取消 A17
              </text>
              {scenario === "injection" && (
                <g>
                  <path
                    d="M620 490 L690 600 H550 Z"
                    fill="none"
                    stroke={C.bad}
                    strokeWidth="6"
                  />
                  <text x="620" y="580">
                    注入
                  </text>
                  <Arrow
                    d="M550 550 H320 L270 520"
                    marker={id}
                    color={C.bad}
                    dashed
                  />
                  <text x="580" y="660">
                    备注≠指令
                  </text>
                </g>
              )}
            </>
          ) : (
            <g stroke={C.bad} strokeWidth="7">
              <path d="M305 255 L355 305 M355 255 L305 305" />
              <text x="570" y="294" stroke="none" fill={C.bad}>
                拒绝读取 B42
              </text>
            </g>
          )}
          <path
            d="M185 475 L290 535 L185 595 L80 535 Z"
            fill={C.bg}
            stroke={readable ? (written ? color : C.accent) : C.border}
            strokeWidth="6"
          />
          <text x="185" y="549">
            确认门
          </text>
          {written ? (
            <>
              <path
                d="M100 640 L135 610 M235 610 L270 640"
                stroke={color}
                strokeWidth="10"
              />
              <Arrow d="M185 595 V765" marker={id} color={color} />
              <circle cx="185" cy="710" r="15" fill={color} />
            </>
          ) : (
            <>
              <path
                d="M90 640 H280"
                stroke={readable ? C.accent : C.border}
                strokeWidth="10"
              />
              <text x="185" y="710">
                停止写入
              </text>
            </>
          )}
          <path
            d="M65 800 V865 C65 910 305 910 305 865 V800"
            fill={C.bg}
            stroke={written ? color : C.border}
            strokeWidth="5"
          />
          <ellipse
            cx="185"
            cy="800"
            rx="120"
            ry="30"
            fill={C.bg}
            stroke={written ? color : C.border}
            strokeWidth="5"
          />
          <text x="185" y="868">
            订单账本
          </text>
          <text x="565" y="800">
            {written ? "取消事件：1" : "取消事件：0"}
          </text>
          <text x="565" y="861">
            {unsafe ? "未确认也执行！" : written ? "已确认后执行" : "尚未执行"}
          </text>
        </g>
      </svg>
      <p className="text-sm leading-6" role="status">
        {!readable
          ? "会话用户 U7 不拥有 B42：后端拒绝查询。确认按钮不能越过归属检查。"
          : unsafe
            ? "模拟反例：模型建议绕过确认门，产生了未获用户确认的取消事件。恢复确认校验可关闭这条路径。"
            : written
              ? "U7 对 A17 的取消已确认，且订单处于可取消状态；本次模拟允许一个取消事件。"
              : "查到 A17 待发货，但用户尚未确认取消。备注、模型措辞和工具参数都不能充当用户确认。"}
      </p>
      <p className="text-sm leading-6" style={{ color: C.muted }}>
        实线是后端控制的查询/执行路径，虚线是待校验建议或不可信备注。固定前提：参数模式、可取消状态与确认有效期均有效；真实系统还必须逐项验证。这里只模拟授权，不调用订单服务。
      </p>
    </ReviewLab>
  );
}

type Message = {
  from: number;
  to: number;
  label: string;
  kind?: "lost" | "return" | "commit" | "dedup";
};

export function LaeOfficialFinalReviewExecutionTraceLab() {
  const id = useId();
  const [lost, setLost] = useState(false);
  const [retry, setRetry] = useState(false);
  const [dedup, setDedup] = useState(true);
  const commits = retry && !dedup ? 2 : 1;
  const messages: Message[] = [
    { from: 100, to: 400, label: "确认 A17 / 键 K1" },
    { from: 400, to: 700, label: "取消请求 K1" },
    { from: 700, to: 700, label: "提交事件 #1", kind: "commit" },
    {
      from: 700,
      to: 400,
      label: lost ? "回包丢失 ×" : "返回已取消",
      kind: lost ? "lost" : "return",
    },
    {
      from: 400,
      to: 100,
      label: lost ? "超时：结果未知" : "展示成功",
      kind: "return",
    },
  ];
  if (retry) {
    messages.push(
      { from: 100, to: 400, label: "重复确认 / 同键 K1" },
      { from: 400, to: 700, label: "重试 K1" },
      {
        from: 700,
        to: 700,
        label: dedup ? "命中 K1 记录" : "提交事件 #2",
        kind: dedup ? "dedup" : "commit",
      },
      { from: 700, to: 400, label: "返回已取消", kind: "return" },
      { from: 400, to: 100, label: "展示已确认结果", kind: "return" },
    );
  }
  const height = 180 + messages.length * 115;
  return (
    <ReviewLab
      kind="order-cancel-timeout-sequence"
      title="实验二：超时不等于没有提交"
      reset={() => {
        setLost(false);
        setRetry(false);
        setDedup(true);
      }}
    >
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          aria-pressed={lost}
          onClick={() => setLost(!lost)}
        >
          故障：{lost ? "提交后回包丢失" : "回包正常"}
        </button>
        <button
          type="button"
          className={control}
          disabled={retry}
          onClick={() => setRetry(true)}
        >
          发送一次重复请求
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={dedup}
          onClick={() => setDedup(!dedup)}
        >
          业务去重：{dedup ? "开启" : "关闭"}
        </button>
      </div>
      <svg
        viewBox={`0 0 800 ${height}`}
        className={graphic}
        role="img"
        aria-label="取消订单跨服务时序"
        aria-describedby={`${id}-desc`}
      >
        <title>请求、提交、超时与重复投递</title>
        <desc
          id={`${id}-desc`}
        >{`时间向下；${messages.map((m) => m.label).join("；")}。持久取消事件共${commits}次。`}</desc>
        <ArrowHead id={id} />
        <g fontSize="40" fill={C.text}>
          {[
            { x: 100, label: "浏览器" },
            { x: 400, label: "应用" },
            { x: 700, label: "订单服务" },
          ].map((lane) => (
            <g key={lane.x}>
              <text x={lane.x} y="45" textAnchor="middle">
                {lane.label}
              </text>
              <path
                d={`M${lane.x} 70 V${height - 95}`}
                stroke={C.border}
                strokeWidth="4"
                strokeDasharray="10 8"
              />
            </g>
          ))}
          {messages.map((m, i) => {
            const y = 120 + i * 115;
            const self = m.from === m.to;
            const color =
              m.kind === "lost" || m.label === "提交事件 #2"
                ? C.bad
                : m.kind === "dedup"
                  ? C.good
                  : C.accent;
            return (
              <g key={i}>
                <text
                  x={self ? 650 : (m.from + m.to) / 2}
                  y={y - 15}
                  textAnchor={self ? "end" : "middle"}
                >
                  {m.label}
                </text>
                {self ? (
                  <>
                    <Arrow
                      d={`M700 ${y} H755 V${y + 48} H700`}
                      marker={id}
                      color={color}
                    />
                    <circle
                      cx="700"
                      cy={y + 48}
                      r={m.kind === "dedup" ? 19 : 13}
                      fill={m.kind === "dedup" ? C.bg : color}
                      stroke={color}
                      strokeWidth="5"
                    />
                  </>
                ) : m.kind === "lost" ? (
                  <>
                    <path
                      d={`M700 ${y} H505`}
                      stroke={C.bad}
                      strokeWidth="6"
                      strokeDasharray="12 10"
                    />
                    <path
                      d={`M475 ${y - 18} L510 ${y + 18} M510 ${y - 18} L475 ${y + 18}`}
                      stroke={C.bad}
                      strokeWidth="6"
                    />
                  </>
                ) : (
                  <Arrow
                    d={`M${m.from} ${y} H${m.to}`}
                    marker={id}
                    color={color}
                    dashed={m.kind === "return"}
                  />
                )}
              </g>
            );
          })}
          <text x="55" y={height - 35}>
            持久事件数
          </text>
          {Array.from({ length: commits }, (_, i) => (
            <circle
              key={i}
              cx={385 + i * 95}
              cy={height - 50}
              r="28"
              fill={commits > 1 ? C.bad : C.good}
            />
          ))}
          <text x="620" y={height - 35}>
            {commits} 次
          </text>
        </g>
      </svg>
      <p className="text-sm leading-6" role="status">
        {`请求 ${retry ? 2 : 1} 次；持久取消事件 ${commits} 次。`}
        {lost && !retry
          ? "后端已提交，浏览器只知道超时，必须查询状态或用同一业务键重试，不能宣称失败后随意创建新动作。"
          : "浏览器最后收到成功结果；仍须核对事件数量，而不只核对回答文本。"}
        {commits > 1
          ? "关闭去重后，重复请求产生第二个事件：即使订单最终状态相同，也可能重复发通知或触发退款链路。"
          : "K1 必须与用户、动作及参数摘要绑定，重复 K1 返回已有结果。"}
      </p>
      <p className="text-sm leading-6" style={{ color: C.muted }}>
        此模拟固定已授权，故意采用“每次请求都会追加取消事件”的简化服务；真实服务还应有状态约束。去重需原子地提交业务写入与结果记录，并处理并发、键冲突和记录过期。K1
        是业务键，不是模型响应 ID；网络重试本身不保证只执行一次。
      </p>
    </ReviewLab>
  );
}

export function LaeOfficialFinalReviewAuthorizationGateLab() {
  const id = useId();
  const [mode, setMode] = useState("adapter");
  const [fixture, setFixture] = useState("confirmed");
  const expected = fixture === "refused" ? 0 : 1;
  const modern =
    mode === "rename"
      ? 0
      : mode === "direct"
        ? fixture === "timeout"
          ? 2
          : 1
        : expected;
  return (
    <ReviewLab
      kind="review-era-adapter-difference-topology"
      title="实验三：迁移替换接口，不替换业务约束"
      reset={() => {
        setMode("adapter");
        setFixture("confirmed");
      }}
    >
      <div className="mt-3 flex flex-wrap gap-3">
        <label className="grid min-w-0 gap-1 text-sm">
          现代接线方案
          <select
            className={control}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="adapter">适配输出，保留业务校验</option>
            <option value="rename">故障：只改接口名</option>
            <option value="direct">故障：工具直连订单服务</option>
          </select>
        </label>
        <label className="grid min-w-0 gap-1 text-sm">
          同输入回归样本
          <select
            className={control}
            value={fixture}
            onChange={(e) => setFixture(e.target.value)}
          >
            <option value="confirmed">用户已确认：应执行 1 次</option>
            <option value="refused">用户拒绝：应执行 0 次</option>
            <option value="timeout">超时后重复：应执行 1 次</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 800 1050"
        className={graphic}
        role="img"
        aria-label="历史与现代接口迁移差异拓扑"
        aria-describedby={`${id}-desc`}
      >
        <title>相同业务样本经过两种响应适配路径</title>
        <desc
          id={`${id}-desc`}
        >{`历史轨为文本JSON解析；现代轨${mode === "adapter" ? "提取函数调用，保留确认与去重" : mode === "rename" ? "旧解析器读不到新输出，路径中断" : "直接执行，绕过确认与去重"}。历史取消事件${expected}次，现代${modern}次。`}</desc>
        <ArrowHead id={id} />
        <g fontSize="40" fill={C.text} textAnchor="middle">
          <path
            d="M400 20 V960"
            stroke={C.border}
            strokeWidth="3"
            strokeDasharray="12 10"
          />
          {[180, 620].map((x, i) => {
            const current = i === 1;
            const broken = current && mode === "rename";
            const direct = current && mode === "direct";
            const count = current ? modern : expected;
            const gateActive = !broken && !direct;
            return (
              <g key={x}>
                <text x={x} y="45">
                  {current ? "现代 Responses" : "历史 Chat接口"}
                </text>
                <circle
                  cx={x}
                  cy="135"
                  r="55"
                  fill={C.bg}
                  stroke={C.accent}
                  strokeWidth="5"
                />
                <text x={x} y="149">
                  输出
                </text>
                <text x={x} y="225">
                  {current ? "函数调用项" : "文本 JSON"}
                </text>
                {direct ? (
                  <>
                    <Arrow
                      d={`M${x + 55} 135 C795 160 795 805 ${x + 55} 850`}
                      marker={id}
                      color={C.bad}
                    />
                    <text x={x} y="325" fill={C.bad}>
                      绕过两层约束
                    </text>
                  </>
                ) : (
                  <>
                    <Arrow d={`M${x} 245 V285`} marker={id} />
                    <path
                      d={`M${x - 95} 295 H${x + 95} V365 H${x - 95} Z`}
                      fill={C.bg}
                      stroke={broken ? C.bad : C.accent}
                      strokeWidth="5"
                    />
                    <text x={x} y="344">
                      {current
                        ? broken
                          ? "旧解析器"
                          : "新适配器"
                        : "旧适配器"}
                    </text>
                    {broken ? (
                      <>
                        <path
                          d={`M${x - 30} 390 L${x + 30} 445 M${x + 30} 390 L${x - 30} 445`}
                          stroke={C.bad}
                          strokeWidth="8"
                        />
                        <text x={x} y="760" fill={C.bad}>
                          解析中断
                        </text>
                      </>
                    ) : (
                      <Arrow d={`M${x} 365 V465`} marker={id} />
                    )}
                  </>
                )}
                <path
                  d={`M${x} 470 L${x + 115} 530 L${x} 590 L${x - 115} 530 Z`}
                  fill={C.bg}
                  stroke={
                    gateActive
                      ? fixture === "refused"
                        ? C.bad
                        : C.good
                      : C.border
                  }
                  strokeWidth="5"
                />
                <text x={x} y="544">
                  用户确认
                </text>
                {gateActive && fixture !== "refused" && (
                  <Arrow d={`M${x} 590 V610`} marker={id} />
                )}
                {gateActive && fixture === "refused" && (
                  <path
                    d={`M${x - 65} 625 H${x + 65}`}
                    stroke={C.bad}
                    strokeWidth="10"
                  />
                )}
                <path
                  d={`M${x - 95} 670 H${x + 95} M${x - 95} 700 H${x + 95}`}
                  stroke={gateActive ? C.accent : C.border}
                  strokeWidth="7"
                />
                <text x={x} y="655">
                  业务键去重
                </text>
                {gateActive && fixture === "timeout" && (
                  <Arrow
                    d={`M${x - 100} 685 C${x - 165} 685 ${x - 165} 770 ${x - 30} 770 V710`}
                    marker={id}
                    color={C.good}
                    dashed
                  />
                )}
                {gateActive && fixture !== "refused" && (
                  <Arrow d={`M${x} 710 V805`} marker={id} />
                )}
                <circle
                  cx={x}
                  cy="865"
                  r="55"
                  fill={C.bg}
                  stroke={count === expected ? C.good : C.bad}
                  strokeWidth="6"
                />
                <text x={x} y="879">
                  {count}
                </text>
                <text x={x} y="955">
                  取消事件数
                </text>
              </g>
            );
          })}
          <text x="400" y="1020" fill={modern === expected ? C.good : C.bad}>
            {modern === expected ? "本样本行为一致" : "本样本行为不一致"}
          </text>
        </g>
      </svg>
      <p className="text-sm leading-6" role="status">
        {mode === "adapter"
          ? "两个适配器只把各自响应转为相同的取消建议；会话身份、确认和业务键由应用维护，不从模型输出取信。"
          : mode === "rename"
            ? "只改接口名却继续读取旧字段，会丢失现代函数调用项。拒绝样本虽同为0次，也不能证明迁移正确；请换成已确认样本。"
            : "工具直接连接写服务，成功样本可能仍是1次；请切到用户拒绝或超时重复，暴露授权与去重被绕过的问题。"}
      </p>
      <p className="text-sm leading-6" style={{ color: C.muted }}>
        左右复用同一组人工构造输入，数字是确定性模拟事件计数，不是模型实测、性能得分或兼容性认证。历史轨仅展示一个文本
        JSON
        教学样本，不代表所有旧接口只支持文本；插件属于历史机制，不等于现代函数工具。
      </p>
    </ReviewLab>
  );
}
