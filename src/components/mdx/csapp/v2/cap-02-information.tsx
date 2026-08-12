"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 820;
const VIEW_H = 470;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Encoding = "unsigned" | "twos" | "float" | "endian";
type Sample = "normal" | "overflow" | "rounding";

const CONCEPTS = [
  "第2章 信息的表示和处理",
  "2.1 信息存储",
  "2.1.1 十六进制表示法",
  "2.1.2 字数据大小",
  "2.1.3 寻址和字节顺序",
  "2.1.4 表示字符串",
  "2.1.5 表示代码",
  "2.1.6 布尔代数简介",
  "2.1.7 C语言中的位级运算",
  "2.1.8 C语言中的逻辑运算",
  "2.1.9 C语言中的移位运算",
  "2.2 整数表示",
  "2.2.1 整型数据类型",
  "2.2.2 无符号数的编码",
  "2.2.3 补码编码",
  "2.2.4 有符号数和无符号数之间的转换",
  "2.2.5 C语言中的有符号数与无符号数",
  "2.2.6 扩展一个数字的位表示",
  "2.2.7 截断数字",
  "2.2.8 关于有符号数与无符号数的建议",
  "2.3 整数运算",
  "2.3.1 无符号加法",
  "2.3.2 补码加法",
  "2.3.3 补码的非",
  "2.3.4 无符号乘法",
  "2.3.5 补码乘法",
  "2.3.6 乘以常数",
  "2.3.7 除以2的幂",
  "2.3.8 关于整数运算的最后思考",
  "2.4 浮点数",
  "2.4.1 二进制小数",
  "2.4.2 IEEE浮点表示",
  "2.4.3 数字示例",
  "2.4.4 舍入",
  "2.4.5 浮点运算",
  "2.4.6 C语言中的浮点数",
  "2.5 小结",
] as const;

const ENCODINGS: readonly {
  id: Encoding;
  label: string;
  result: string;
  field: string;
}[] = [
  {
    id: "unsigned",
    label: "无符号",
    result: "128",
    field: "每位按二的幂加权",
  },
  {
    id: "twos",
    label: "补码",
    result: "-128",
    field: "最高位承担负权重",
  },
  {
    id: "float",
    label: "浮点字段",
    result: "sign · exponent · fraction",
    field: "字段共同决定值",
  },
  {
    id: "endian",
    label: "字节序",
    result: "0x12345678",
    field: "先决定字节排列",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  bytes: string;
  observation: string;
  action: string;
}[] = [
  {
    id: "normal",
    label: "普通样本",
    bytes: "0x12 0x34 0x56 0x78",
    observation: "字段在范围内",
    action: "先记录位模式",
  },
  {
    id: "overflow",
    label: "溢出样本",
    bytes: "0x7f + 0x01",
    observation: "八位补码改变符号",
    action: "比较保留位",
  },
  {
    id: "rounding",
    label: "舍入样本",
    bytes: "0.1 + 0.2",
    observation: "结果靠近相邻值",
    action: "拆解字段",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "bits", caption: "保留原始比特。" },
  { label: "width", caption: "声明位宽与端序。" },
  { label: "decode", caption: "选择编码解释。" },
  { label: "operate", caption: "运行边界运算。" },
  { label: "replay", caption: "重放字段与结果。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function BitCell({
  bit,
  index,
  active,
}: {
  bit: string;
  index: number;
  active: boolean;
}) {
  const x = 30 + index * 48;
  return (
    <g>
      <rect
        x={x}
        y="126"
        width="38"
        height="46"
        rx="8"
        fill={active ? COLORS.accent : COLORS.elevated}
        fillOpacity={active ? 0.16 : 1}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth={active ? 2 : 1.2}
      />
      <text
        x={x + 19}
        y="156"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={active ? COLORS.accent : COLORS.primary}
      >
        {bit}
      </text>
      <text
        x={x + 19}
        y="190"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        {7 - index}
      </text>
    </g>
  );
}

function ValueCard({
  encoding,
  sample,
}: {
  encoding: (typeof ENCODINGS)[number];
  sample: Sample;
}) {
  const issue =
    sample === "overflow"
      ? encoding.id === "twos"
      : sample === "rounding"
        ? encoding.id === "float"
        : false;
  const color = issue ? COLORS.warning : COLORS.success;
  return (
    <g>
      <rect
        x="442"
        y="108"
        width="348"
        height="112"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="466" cy="134" r="6" fill={color} />
      <text
        x="484"
        y="139"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {encoding.label}
      </text>
      <text x="462" y="174" fontSize="16" fontWeight="700" fill={color}>
        {sample === "overflow" && encoding.id === "twos"
          ? "0x80 → -128"
          : sample === "rounding" && encoding.id === "float"
            ? "相邻可表示值"
            : encoding.result}
      </text>
      <text x="462" y="201" fontSize="13" fill={COLORS.secondary}>
        {issue ? "先检查边界字段与舍入规则" : encoding.field}
      </text>
    </g>
  );
}

/** 第2章专属实验：把同一位模式切换成整数、浮点和端序解释。 */
export function Cap02InformationLab() {
  const [encodingId, setEncodingId] = useState<Encoding>("unsigned");
  const [sampleId, setSampleId] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const encoding = useMemo(
    () => ENCODINGS.find((item) => item.id === encodingId) ?? ENCODINGS[0],
    [encodingId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
  );
  const bits =
    sampleId === "overflow"
      ? "01111111"
      : sampleId === "rounding"
        ? "00111101"
        : "10000000";
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.3, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setEncodingId("unsigned");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第2章信息的表示和处理专属比特解释实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-02"
      data-visual-kind="cap-02-information-bit-interpretation"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap02InformationLab · 比特解释与边界回放台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            先看原始位，再决定它代表什么
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：切换编码或样本后，哪一组字段会改变，哪一组字节仍然不变？
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择比特解释方式">
          {ENCODINGS.map((item) => (
            <ToggleButton
              key={item.id}
              active={encodingId === item.id}
              onClick={() => setEncodingId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择信息表示样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={sampleId === item.id}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`第2章比特解释可视化；当前编码${encoding.label}，样本${sample.label}，字段结果${encoding.result}`}
            className="h-auto w-full"
          >
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <text
              x="28"
              y="42"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {encoding.label} · {sample.label}
            </text>
            <text x="28" y="68" fontSize="13" fill={COLORS.secondary}>
              原始字节：{sample.bytes} · 先保存位模式，再解释字段
            </text>
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              {STEPS.map((step, index) => (
                <g
                  key={step.label}
                  ref={(element) => {
                    timelineRefs.current[step.label] = element;
                  }}
                  transform={`translate(${42 + index * 150} 82)`}
                >
                  <rect width="120" height="22" rx="6" fill={COLORS.accent} />
                  <text x="10" y="16" fontSize="11" fill="var(--bg)">
                    T{index} · {step.label}
                  </text>
                </g>
              ))}
            </g>
            <text
              x="30"
              y="104"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              位模式 · 8 bit 观察窗口
            </text>
            {bits.split("").map((bit, index) => (
              <BitCell
                key={`${bit}-${index}`}
                bit={bit}
                index={index}
                active={
                  encodingId === "twos"
                    ? index === 0
                    : encodingId === "float"
                      ? index >= 1
                      : index < 4
                }
              />
            ))}
            <text x="30" y="224" fontSize="13" fill={COLORS.secondary}>
              字节不变，解释规则改变；边界样本会把差异推到可见字段。
            </text>
            <ValueCard encoding={encoding} sample={sampleId} />
            <rect
              x="24"
              y="258"
              width="766"
              height="78"
              rx="12"
              fill={sampleId === "normal" ? COLORS.success : COLORS.warning}
              fillOpacity="0.12"
              stroke={sampleId === "normal" ? COLORS.success : COLORS.warning}
              strokeWidth="2"
            />
            <text
              x="46"
              y="286"
              fontSize="14"
              fontWeight="700"
              fill={sampleId === "normal" ? COLORS.success : COLORS.warning}
            >
              {sampleId === "normal"
                ? "基线：字段解释在范围内"
                : sampleId === "overflow"
                  ? "边界：保留位造成补码溢出"
                  : "边界：舍入把结果映射到相邻值"}
            </text>
            <text x="46" y="312" fontSize="13" fill={COLORS.secondary}>
              下一步动作：{sample.action}
              ；不要用显示出来的十进制值替代原始字段。
            </text>
            <g transform="translate(24 370)">
              <text
                x="0"
                y="0"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                C 探针字段
              </text>
              <rect
                x="0"
                y="16"
                width="766"
                height="44"
                rx="9"
                fill={COLORS.elevated}
                stroke={COLORS.border}
              />
              <circle cx="20" cy="38" r="6" fill={COLORS.accent} />
              <text x="38" y="43" fontSize="13" fill={COLORS.primary}>
                width: 8 bit · encoding: {encoding.label} · result:{" "}
                {encoding.result} · replay: {sample.observation}
              </text>
            </g>
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{encoding.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {sampleId === "overflow"
              ? "保留原始八位，再比较无符号和补码的数值解释；溢出发生在固定宽度边界。"
              : sampleId === "rounding"
                ? "保存浮点字段和打印精度，使用相邻可表示值解释为什么显示值不能代表精确实数。"
                : `当前字段 ${encoding.field}，可以先用十六进制打印，再进入对应的整数或浮点探针。`}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步回放 bits、width、decode、operate 和 replay；重置后可用同一位模式重新选择编码与样本。"
          reset={{
            label: "重置比特解释",
            ariaLabel: "重置第2章信息的表示和处理专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
