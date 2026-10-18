"use client";

import { useId, useState } from "react";

export type RequestKind = "encoded" | "get" | "multipart" | "json";
export type Fault = "none" | "limit" | "invalid";
export type CookieMode = "delete" | "keep" | "wrong-path" | "expired";
export type LabParameters = {
  request: RequestKind;
  fault: Fault;
  earlyWrite: boolean;
  cookie: CookieMode;
  frame: number;
};

export const INITIAL: LabParameters = {
  request: "encoded",
  fault: "none",
  earlyWrite: false,
  cookie: "delete",
  frame: 0,
};

// A bounded teaching model, not an HTTP parser or a browser cookie implementation.
// Its observable examples are paired with the Go httptest evidence in batch-36/ch04.
export function deriveRequestState(p: LabParameters) {
  const consumesBody = p.request !== "get";
  const error =
    p.frame >= 1 && p.fault !== "none" && consumesBody
      ? p.fault === "limit"
        ? "413：读取超过限额，停止处理"
        : "400：正文解析失败，停止处理"
      : "";
  const parsed = p.frame >= 2 && !error;
  const bodyForm = p.request === "encoded" || p.request === "multipart";
  const multipart =
    parsed && p.request === "multipart"
      ? {
          value: { name: ["b1", "b2"] },
          file: { upload: [{ filename: "untrusted.txt", size: 2 }] },
        }
      : null;
  const postForm =
    !parsed || !bodyForm
      ? []
      : multipart
        ? [...multipart.value.name]
        : ["b1", "b2"];
  const form =
    p.frame < 3 || error
      ? []
      : p.request === "encoded"
        ? [...postForm, "q1", "q2"]
        : ["q1", "q2", ...postForm];
  return {
    consumesBody,
    error,
    postForm,
    form,
    json: parsed && p.request === "json",
    file: multipart !== null,
    multipart,
    ready: p.frame === 4 && !error,
  };
}

export function deriveResponseState(p: LabParameters) {
  const committed = p.frame >= (p.earlyWrite ? 1 : 2);
  return {
    committed,
    status: committed ? (p.earlyWrite ? 200 : 201) : null,
    header: committed
      ? p.earlyWrite
        ? "X-Stage 缺失"
        : "X-Stage: ready"
      : "可改",
    body: p.frame >= (p.earlyWrite ? 1 : 3) ? "ok" : "∅",
    rejected: p.frame >= 4,
  };
}

export function deriveCookieState(p: LabParameters) {
  const expired = p.cookie === "expired";
  const received = p.frame >= 2 && !expired;
  const deleted = p.frame >= 4 && p.cookie === "delete";
  return {
    jar: p.frame >= 1 && !expired && !deleted,
    received,
    deletionSent: p.frame >= 3 && !expired && p.cookie !== "keep",
    nextRequest: p.frame >= 4 && !expired && !deleted,
    expired,
  };
}

const colors = {
  accent: "var(--accent)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  bg: "var(--bg-elevated)",
  warning: "var(--warning)",
};
const control =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const svgStyle = {
  width: "100%",
  maxWidth: 360,
  display: "block",
  margin: "0 auto",
  fontSize: 16,
  color: colors.text,
};

function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const end = (a: number) => `${x2 - 8 * Math.cos(a)},${y2 - 8 * Math.sin(a)}`;
  return (
    <g
      stroke={active ? colors.accent : colors.border}
      strokeWidth={2}
      fill="none"
    >
      <path d={`M${x1},${y1} L${x2},${y2}`} />
      <polyline
        points={`${end(angle - 0.45)} ${x2},${y2} ${end(angle + 0.45)}`}
      />
    </g>
  );
}

function Slots({
  values,
  y,
  label,
}: {
  values: string[];
  y: number;
  label: string;
}) {
  return (
    <g>
      <text x={12} y={y - 12} fill={colors.text}>
        {label}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={12 + i * 65}
            y={y}
            width={58}
            height={32}
            rx={4}
            fill={colors.bg}
            stroke={values[i] ? colors.accent : colors.border}
          />
          <text
            x={41 + i * 65}
            y={y + 22}
            textAnchor="middle"
            fill={colors.text}
          >
            {values[i] || "—"}
          </text>
        </g>
      ))}
    </g>
  );
}

// Frame 2 reveals successful parse outputs; frame 3 reveals the merge relationship.
// These are teaching reveals, not separate mutation points inside ParseMultipartForm.
export function RequestFieldFlow({
  parameters: p,
}: {
  parameters: LabParameters;
}) {
  const request = deriveRequestState(p);
  const multipartMode = p.request === "multipart";
  const parsed = p.frame >= 2 && !request.error;
  const merge = p.frame >= 3 && !request.error;
  const bodyToPost = parsed && (p.request === "encoded" || multipartMode);
  const summary =
    request.error ||
    (multipartMode
      ? request.multipart
        ? `MultipartForm.Value[name]: ${request.multipart.value.name.join(", ")}；MultipartForm.File[upload]: 1 个 FileHeader，2 字节；PostForm: ${request.postForm.join(", ")}；File 不进入 Form；Form: ${request.form.join(", ") || "尚未展示合并"}`
        : "尚未展示 MultipartForm 解析结果"
      : `MultipartForm 为 nil；PostForm: ${request.postForm.join(", ") || "空"}；Form: ${request.form.join(", ") || "尚未展示合并"}`);
  return (
    <figure className="m-0 min-w-0" aria-label="请求字段流">
      <figcaption className="mb-2 font-semibold">
        1 · 请求字段流与表单容器
      </figcaption>
      <svg
        viewBox="0 0 280 780"
        role="img"
        aria-label={`请求字段流：${summary}`}
        style={svgStyle}
      >
        <text x={12} y={24} fill={colors.text}>
          {p.request === "get"
            ? "对照：手工 GET 正文"
            : p.request === "json"
              ? "脚本发送 JSON"
              : "HTML表单 POST"}
        </text>
        <text x={12} y={51} fill={colors.muted}>
          {multipartMode
            ? "multipart/form-data"
            : p.request === "json"
              ? "application/json"
              : "urlencoded"}
        </text>
        <rect
          x={12}
          y={70}
          width={256}
          height={64}
          rx={6}
          fill={colors.bg}
          stroke={colors.border}
        />
        <text x={24} y={95} fill={colors.text}>
          Body：{p.request === "json" ? '{"name":"b1"}' : "name=b1 / name=b2"}
        </text>
        <text x={24} y={120} fill={colors.muted}>
          {multipartMode ? "另有 upload 文件部分（2B）" : "没有文件部分"}
        </text>
        <Arrow
          x1={140}
          y1={136}
          x2={140}
          y2={151}
          active={p.frame >= 1 && request.consumesBody && !request.error}
        />
        <text
          x={12}
          y={173}
          fill={request.error ? colors.warning : colors.text}
        >
          {request.error
            ? "× 解析失败：禁止业务交付"
            : p.request === "get"
              ? "ParseForm：不消费正文"
              : multipartMode
                ? "限额 → ParseMultipartForm"
                : p.request === "json"
                  ? "限额 → JSON 独立解码"
                  : "限额 → ParseForm"}
        </text>
        <Arrow x1={140} y1={181} x2={140} y2={204} active={parsed} />
        {multipartMode ? (
          <g
            data-testid="multipart-container"
            data-state={
              request.error ? "error-hidden" : parsed ? "parsed" : "unparsed"
            }
          >
            <rect
              x={12}
              y={208}
              width={256}
              height={192}
              rx={8}
              fill="none"
              stroke={request.multipart ? colors.accent : colors.border}
              strokeWidth={2}
            />
            <text x={24} y={233} fill={colors.text}>
              MultipartForm
            </text>
            <text x={24} y={253} fill={colors.muted}>
              {request.error
                ? "部分结果不展示"
                : parsed
                  ? "正文解析所得的容器"
                  : "尚未展示解析结果"}
            </text>
            <rect
              x={24}
              y={264}
              width={232}
              height={51}
              rx={4}
              fill={colors.bg}
              stroke={colors.border}
            />
            <text x={34} y={284} fill={colors.text}>
              Value[&quot;name&quot;]
            </text>
            <text
              x={34}
              y={306}
              fill={colors.text}
              data-testid="multipart-value"
            >
              {request.multipart ? "[b1, b2]（文字）" : "—"}
            </text>
            <rect
              x={24}
              y={329}
              width={232}
              height={57}
              rx={4}
              fill={colors.bg}
              stroke={colors.border}
            />
            <text x={34} y={350} fill={colors.text}>
              File[&quot;upload&quot;]
            </text>
            <text
              x={34}
              y={374}
              fill={colors.text}
              data-testid="multipart-file"
            >
              {request.multipart ? "[FileHeader]（1个，2B）" : "—"}
            </text>
          </g>
        ) : (
          <g>
            <rect
              x={12}
              y={208}
              width={256}
              height={118}
              rx={8}
              fill={colors.bg}
              stroke={colors.border}
            />
            <text x={24} y={234} fill={colors.text}>
              {p.request === "json"
                ? "应用结构体（独立路径）"
                : "正文文字的解析结果"}
            </text>
            <text x={24} y={270} fill={colors.text}>
              {request.json
                ? "name=b1"
                : bodyToPost
                  ? "[b1, b2]"
                  : p.request === "get"
                    ? "未读取；不产生正文值"
                    : "—"}
            </text>
            <text x={24} y={304} fill={colors.muted}>
              {p.request === "json"
                ? "不进入任何表单文字槽"
                : "仅 urlencoded 正文可汇入"}
            </text>
            <rect
              x={12}
              y={345}
              width={256}
              height={55}
              rx={6}
              fill="none"
              stroke={colors.border}
              strokeDasharray="5 5"
            />
            <text x={24} y={378} fill={colors.muted}>
              MultipartForm = nil
            </text>
          </g>
        )}
        <g data-edge="body-value-to-postform" data-active={bodyToPost}>
          <path
            d="M24 290 H5 V516 H12"
            fill="none"
            stroke={bodyToPost ? colors.accent : colors.border}
            strokeWidth={2}
          />
          <Arrow x1={5} y1={516} x2={12} y2={516} active={bodyToPost} />
        </g>
        {multipartMode ? (
          <g data-edge="file-to-open" data-active={request.file}>
            <Arrow x1={174} y1={386} x2={174} y2={419} active={request.file} />
            <text x={24} y={440} fill={colors.text}>
              FileHeader.Open → 读取
            </text>
            <text x={24} y={464} fill={colors.muted}>
              内存 / 临时文件；不进 Form
            </text>
          </g>
        ) : (
          <text x={24} y={440} fill={colors.muted}>
            {p.request === "json"
              ? "JSON 对象供业务单独读取"
              : "没有 MultipartForm.File"}
          </text>
        )}
        <Slots
          values={request.postForm}
          y={500}
          label="PostForm（仅正文文字）"
        />
        <g data-edge="postform-to-form" data-active={merge && bodyToPost}>
          <Arrow
            x1={60}
            y1={536}
            x2={60}
            y2={638}
            active={merge && bodyToPost}
          />
        </g>
        <rect
          x={91}
          y={552}
          width={177}
          height={53}
          rx={4}
          fill={colors.bg}
          stroke={colors.border}
        />
        <text x={102} y={574} fill={colors.text}>
          URL.Query[&quot;name&quot;]
        </text>
        <text x={102} y={596} fill={colors.text}>
          [q1, q2]
        </text>
        <g data-edge="query-to-form" data-active={merge}>
          <Arrow x1={220} y1={607} x2={220} y2={638} active={merge} />
        </g>
        <Slots values={request.form} y={660} label="Form（查询 + 正文文字）" />
        <text x={12} y={722} fill={colors.text}>
          {multipartMode
            ? "查询在前，后追加 Value"
            : p.request === "encoded"
              ? "正文在前，查询随后合并"
              : "只有查询进入 Form"}
        </text>
        <text
          x={12}
          y={754}
          fill={request.error ? colors.warning : colors.muted}
        >
          {request.error
            ? "不展示部分结果 ≠ 清空 map"
            : request.ready
              ? "可交给业务：按来源校验"
              : "输入 → 容器 → 合并 → 交付"}
        </text>
      </svg>
      <p className="break-words text-sm text-secondary">
        {request.error ||
          (multipartMode
            ? "先由 ParseForm 取得查询，再由 ParseMultipartForm 建立 Value / File。Value 汇入 PostForm，并追加到已有查询的 Form；File 只走 Open 的独立读取路径。"
            : p.request === "get"
              ? "原生 HTML GET 表单把字段放入查询。这里特意构造带正文的 GET：ParseForm 不消费它，正文故障不触发；这不代表输入安全。"
              : p.request === "json"
                ? "JSON 不属于原生 HTML 表单编码：对象独立解码，PostForm 为空，MultipartForm 为 nil；图中 ParseForm 只收查询。"
                : "urlencoded POST 的文字直接进入 PostForm，并在 Form 中排在查询前；不建立 MultipartForm 容器。")}
      </p>
      <p className="text-sm text-secondary">
        第2、3帧依次揭示容器和汇入关系，不是解析函数内部的暂停点。文件可在内存或临时磁盘；本测试将阈值设为1B，2B文件即可落盘。解析失败仍可能有部分结果；图只禁止业务交付，不声称清空集合。
      </p>
    </figure>
  );
}

function Choice<T extends string>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([key, label]) => (
          <label
            key={key}
            className={`${control} flex cursor-pointer items-center gap-2 ${value === key ? "border-accent" : ""}`}
          >
            <input
              type="radio"
              name={id}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="accent-(--accent)"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function GwpProcessingRequestsLab() {
  const [p, setP] = useState<LabParameters>({ ...INITIAL });
  const change = (next: Partial<LabParameters>) =>
    setP((old) => ({ ...old, ...next, frame: 0 }));
  const request = deriveRequestState(p);
  const response = deriveResponseState(p);
  const cookie = deriveCookieState(p);
  const requestSummary =
    request.error ||
    `Form: ${request.form.join(", ") || "尚未合并"}；PostForm: ${request.postForm.join(", ") || "空"}；${request.multipart ? "MultipartForm.Value[name]: b1, b2；MultipartForm.File[upload]: 1 个文件" : p.request === "multipart" ? "MultipartForm 尚未展示" : "MultipartForm 为 nil"}；${request.ready ? "可交给业务" : "尚未交给业务"}`;
  const cookieSummary =
    p.frame < 2
      ? "尚未读取下一请求"
      : `请求 B：${cookie.received ? "flash=saved（删除也不改变本次快照）" : "ErrNoCookie"}；请求 C：${p.frame < 4 ? "尚未发送" : cookie.nextRequest ? "flash=saved" : "ErrNoCookie"}`;
  return (
    <section
      aria-label="请求处理因果实验"
      className="my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="mt-0 text-lg font-semibold">
        请求、提交与 Cookie：三条因果轨道
      </h3>
      <p className="text-sm text-secondary">
        教学模型，不执行 Go；三条轨道独立示范，不表示同一个
        handler。单步推进，无自动播放或动画。切换参数回到第 0 帧。
      </p>
      <div className="grid min-w-0 gap-4">
        <Choice
          legend="请求编码与方法"
          value={p.request}
          onChange={(request) => change({ request })}
          options={[
            ["encoded", "urlencoded POST"],
            ["get", "urlencoded GET"],
            ["multipart", "multipart POST"],
            ["json", "JSON POST"],
          ]}
        />
        <Choice
          legend="正文故障"
          value={p.fault}
          onChange={(fault) => change({ fault })}
          options={[
            ["none", "正常正文"],
            ["limit", "读取超限"],
            ["invalid", "无效正文"],
          ]}
        />
        <Choice
          legend="响应提交顺序"
          value={p.earlyWrite ? "early" : "normal"}
          onChange={(v) => change({ earlyWrite: v === "early" })}
          options={[
            ["normal", "先 Header 再 201"],
            ["early", "提前 Write"],
          ]}
        />
        <Choice
          legend="Cookie 消费策略"
          value={p.cookie}
          onChange={(cookie) => change({ cookie })}
          options={[
            ["delete", "匹配作用域删除"],
            ["keep", "遗漏删除"],
            ["wrong-path", "错误 Path 删除"],
            ["expired", "收到即已过期"],
          ]}
        />
      </div>
      <div className="my-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          disabled={p.frame === 0}
          onClick={() => setP((old) => ({ ...old, frame: old.frame - 1 }))}
        >
          上一步
        </button>
        <button
          type="button"
          className={control}
          disabled={p.frame === 4}
          onClick={() => setP((old) => ({ ...old, frame: old.frame + 1 }))}
        >
          下一步
        </button>
        <button
          type="button"
          className={control}
          onClick={() => setP({ ...INITIAL })}
        >
          重置全部
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="break-words text-sm"
        data-testid="processing-status"
      >
        第 {p.frame} / 4 帧。{requestSummary}。响应：
        {response.status ?? "未提交"}。{cookieSummary}
      </p>
      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <RequestFieldFlow parameters={p} />
        <figure className="m-0 min-w-0" aria-label="响应提交状态">
          <figcaption className="mb-2 font-semibold">2 · 响应提交线</figcaption>
          <svg
            viewBox="0 0 280 460"
            role="img"
            aria-label={`最终状态 ${response.status ?? "未提交"}；${response.header}；正文 ${response.body}`}
            style={svgStyle}
          >
            <line
              x1={25}
              y1={35}
              x2={25}
              y2={300}
              stroke={colors.border}
              strokeWidth={3}
            />
            {[
              "0：尚未调用输出",
              p.earlyWrite
                ? '1：Write("ok") → 200'
                : '1：Header.Set("X-Stage")',
              p.earlyWrite ? "2：Header.Set 已太晚" : "2：WriteHeader(201)",
              p.earlyWrite
                ? "3：WriteHeader(201) 被忽略"
                : '3：Write("ok") 保留 201',
              "4：再写 500 / late 头",
            ].map((label, i) => (
              <g key={label}>
                <circle
                  cx={25}
                  cy={45 + i * 57}
                  r={8}
                  fill={p.frame >= i ? colors.accent : colors.bg}
                  stroke={colors.border}
                />
                <text x={42} y={51 + i * 57} fill={colors.text}>
                  {label}
                </text>
              </g>
            ))}
            <path
              d="M12 308 H268"
              stroke={response.committed ? colors.accent : colors.border}
              strokeWidth={3}
              strokeDasharray={response.committed ? undefined : "6 6"}
            />
            <text x={12} y={335} fill={colors.text}>
              {response.committed ? "最终头快照已冻结" : "尚无最终快照，可修改"}
            </text>
            <text x={12} y={366} fill={colors.text}>
              状态：{response.status ?? "—"}
            </text>
            <text x={12} y={396} fill={colors.text}>
              {response.header}
            </text>
            <text x={12} y={426} fill={colors.text}>
              body：{response.body}
            </text>
            {response.rejected && (
              <path
                d="M235 345 l20 20 m0 -20 l-20 20"
                stroke={colors.warning}
                strokeWidth={3}
              />
            )}
          </svg>
          <p className="text-sm text-secondary">
            {response.rejected
              ? "第二个最终状态 500 被忽略，late 普通头不会更新快照。"
              : "观察第一次最终提交的位置；Header() 的可变 map 不等于客户端收到的快照。"}{" "}
            本图不模拟 1xx、trailer 或网络 flush。
          </p>
        </figure>
        <figure className="m-0 min-w-0" aria-label="Cookie 生命周期">
          <figcaption className="mb-2 font-semibold">
            3 · Cookie 往返时序
          </figcaption>
          <svg
            viewBox="0 0 280 460"
            role="img"
            aria-label={cookieSummary}
            style={svgStyle}
          >
            <text x={18} y={24} fill={colors.text}>
              客户端
            </text>
            <text x={204} y={24} fill={colors.text}>
              服务端
            </text>
            <path
              d="M46 38 V377 M234 38 V377"
              stroke={colors.border}
              strokeDasharray="5 5"
            />
            <Arrow x1={234} y1={75} x2={46} y2={75} active />
            <text x={57} y={61} fill={colors.text}>
              A 响应 Set-Cookie
            </text>
            <rect
              x={18}
              y={96}
              width={76}
              height={46}
              rx={9}
              fill={colors.bg}
              stroke={colors.border}
            />
            {cookie.jar && (
              <rect
                x={23}
                y={118}
                width={66}
                height={18}
                rx={3}
                fill={colors.accent}
              />
            )}
            <text x={106} y={120} fill={colors.text}>
              {cookie.jar ? "jar: saved" : "jar: 空"}
            </text>
            <Arrow x1={46} y1={188} x2={234} y2={188} active={p.frame >= 2} />
            <text x={57} y={173} fill={colors.text}>
              B 请求 {cookie.received ? "Cookie" : "无值"}
            </text>
            <circle
              cx={234}
              cy={214}
              r={8}
              fill={cookie.received ? colors.accent : colors.bg}
              stroke={colors.border}
            />
            <text x={57} y={237} fill={colors.muted}>
              B 快照：{cookie.received ? "saved" : "无"}
            </text>
            <Arrow x1={234} y1={280} x2={46} y2={280} active={p.frame >= 3} />
            <text x={57} y={266} fill={colors.text}>
              {cookie.deletionSent ? "B 响应 Max-Age=0" : "B 响应：无删除头"}
            </text>
            <text x={57} y={305} fill={colors.muted}>
              {p.cookie === "wrong-path"
                ? "Path=/other 不匹配"
                : p.cookie === "expired"
                  ? "过去 Expires，未保存"
                  : "Path=/，同一 host"}
            </text>
            <Arrow x1={46} y1={355} x2={234} y2={355} active={p.frame >= 4} />
            <text x={57} y={342} fill={colors.text}>
              C 请求：
              {p.frame < 4
                ? "未发送"
                : cookie.nextRequest
                  ? "saved"
                  : "无 flash"}
            </text>
            <text x={12} y={405} fill={colors.text}>
              删除头不会改写 B 的快照
            </text>
            <text x={12} y={438} fill={colors.muted}>
              Go MaxAge=-1 → Max-Age=0
            </text>
          </svg>
          <p className="break-words text-sm text-secondary">
            {cookieSummary}。本模型的 jar
            仅示范匹配作用域的顺序请求，不模拟并发、浏览器恢复或全部 SameSite
            策略。
          </p>
        </figure>
      </div>
    </section>
  );
}
