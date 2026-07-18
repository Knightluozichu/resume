"use client";

import { useMemo, useState } from "react";

export function GoplIntegerRepresentationLab() {
  const [raw, setRaw] = useState(130);
  const [signed, setSigned] = useState(true);
  const [shift, setShift] = useState(1);
  const bits = raw.toString(2).padStart(8, "0");
  const interpreted = signed && raw >= 128 ? raw - 256 : raw;
  const shiftedRaw = (raw << shift) & 0xff;
  const shifted = signed && shiftedRaw >= 128 ? shiftedRaw - 256 : shiftedRaw;
  const mathematical = interpreted * 2 ** shift;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              8-bit pattern: <strong>{raw}</strong>
              <input
                type="range"
                min="0"
                max="255"
                value={raw}
                onChange={(event) => setRaw(Number(event.target.value))}
                className="mt-2 block w-full accent-[var(--accent)]"
              />
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={signed}
                onChange={(event) => setSigned(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              interpret as int8
            </label>
            <label className="block text-sm text-primary">
              left shift: <strong>{shift}</strong>
              <input
                type="range"
                min="0"
                max="4"
                value={shift}
                onChange={(event) => setShift(Number(event.target.value))}
                className="mt-2 block w-full accent-[var(--accent)]"
              />
            </label>
          </section>
          <section
            className="border border-cyan-500/40 bg-cyan-500/10 p-4"
            aria-live="polite"
          >
            <div className="grid grid-cols-8 gap-1">
              {bits.split("").map((bit, index) => (
                <div
                  key={index}
                  className={`grid aspect-square place-items-center border text-sm font-semibold ${signed && index === 0 ? "border-amber-500/50 bg-amber-500/10 text-primary" : "border-border bg-bg text-primary"}`}
                >
                  {bit}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">interpretation</span>
                <strong className="mt-2 block text-sm text-primary">
                  {signed ? "int8" : "uint8"}({raw}) = {interpreted}
                </strong>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">
                  mathematical ×2^{shift}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {mathematical}
                </strong>
              </div>
              <div
                className={`border p-3 ${mathematical === shifted ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}
              >
                <span className="text-xs text-secondary">8-bit result</span>
                <strong className="mt-2 block text-sm text-primary">
                  {shifted} {mathematical === shifted ? "" : "· overflow"}
                </strong>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">
              bit pattern 没有自带 signedness；type 决定最高位解释、range 与
              comparison。shift 后赋回 fixed-width type 才发生截断。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一 8-bit pattern 可解释为 uint8 或 two&apos;s-complement
        int8；conversion 和 shift 必须同时检查 value range 与 target width。
      </figcaption>
    </figure>
  );
}

type NumericMode = "float" | "complex";
type FloatCase = "finite" | "infinity" | "nan";

export function GoplFloatingComplexLab() {
  const [mode, setMode] = useState<NumericMode>("float");
  const [floatCase, setFloatCase] = useState<FloatCase>("nan");
  const [real, setReal] = useState(3);
  const [imaginary, setImaginary] = useState(4);
  const floatValue =
    floatCase === "nan"
      ? Number.NaN
      : floatCase === "infinity"
        ? Number.POSITIVE_INFINITY
        : 0.1 + 0.2;
  const magnitude = Math.hypot(real, imaginary);
  const angle = Math.atan2(imaginary, real);
  const pointX = 100 + real * 14;
  const pointY = 100 - imaginary * 14;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          className="grid grid-cols-2 border border-border"
          role="group"
          aria-label="floating-point 与 complex 模式"
        >
          <button
            type="button"
            aria-pressed={mode === "float"}
            onClick={() => setMode("float")}
            className={`min-h-11 border-r border-border text-sm ${mode === "float" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}
          >
            floating point
          </button>
          <button
            type="button"
            aria-pressed={mode === "complex"}
            onClick={() => setMode("complex")}
            className={`min-h-11 text-sm ${mode === "complex" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}
          >
            complex number
          </button>
        </div>
        {mode === "float" ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="space-y-3 border border-border bg-bg p-4">
              {(["finite", "infinity", "nan"] as FloatCase[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFloatCase(item)}
                  className={`min-h-11 w-full border text-sm ${floatCase === item ? "border-cyan-500 bg-cyan-500/10 text-primary" : "border-border text-primary hover:bg-elevated"}`}
                >
                  {item}
                </button>
              ))}
            </section>
            <section
              className={`border p-4 ${floatCase === "nan" ? "border-amber-500/40 bg-amber-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-border bg-bg p-3">
                  <span className="text-xs text-secondary">value</span>
                  <strong className="mt-2 block text-lg text-primary">
                    {String(floatValue)}
                  </strong>
                </div>
                <div className="border border-border bg-bg p-3">
                  <span className="text-xs text-secondary">x == x</span>
                  <strong className="mt-2 block text-lg text-primary">
                    {String(floatValue === floatValue)}
                  </strong>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-secondary">
                {floatCase === "finite"
                  ? "0.1 + 0.2 受 binary floating representation 影响，不等于精确十进制 0.3。"
                  : floatCase === "infinity"
                    ? "Inf 可参与 ordering，但应由 math.IsInf 显式识别。"
                    : "NaN 与包括自身在内的任何 value 比较都为 false，应使用 math.IsNaN。"}
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="space-y-4 border border-border bg-bg p-4">
              <label className="block text-sm text-primary">
                real: <strong>{real}</strong>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={real}
                  onChange={(event) => setReal(Number(event.target.value))}
                  className="mt-2 block w-full accent-[var(--accent)]"
                />
              </label>
              <label className="block text-sm text-primary">
                imaginary: <strong>{imaginary}</strong>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={imaginary}
                  onChange={(event) => setImaginary(Number(event.target.value))}
                  className="mt-2 block w-full accent-[var(--accent)]"
                />
              </label>
              <div className="border border-border bg-elevated p-3 text-sm text-primary">
                complex({real}, {imaginary}) = {real}
                {imaginary < 0 ? "" : "+"}
                {imaginary}i<br />
                abs = {magnitude.toFixed(2)} · phase = {angle.toFixed(2)} rad
              </div>
            </section>
            <section className="grid place-items-center border border-violet-500/40 bg-violet-500/10 p-4">
              <svg
                viewBox="0 0 200 200"
                role="img"
                aria-label="当前复数在 complex plane 上的位置"
                className="aspect-square w-full max-w-72 border border-border bg-bg"
              >
                <line
                  x1="10"
                  y1="100"
                  x2="190"
                  y2="100"
                  stroke="currentColor"
                  opacity="0.35"
                />
                <line
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="190"
                  stroke="currentColor"
                  opacity="0.35"
                />
                <line
                  x1="100"
                  y1="100"
                  x2={pointX}
                  y2={pointY}
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <circle cx={pointX} cy={pointY} r="5" fill="var(--accent)" />
              </svg>
            </section>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        float32/float64 包含 rounding、Inf 与 NaN；complex64/complex128 用
        real/imag、magnitude/phase 表示二维数值。
      </figcaption>
    </figure>
  );
}

export function GoplUtf8ConstantLab() {
  const [input, setInput] = useState("Go语言");
  const [power, setPower] = useState(8);
  const bytes = useMemo(
    () => Array.from(new TextEncoder().encode(input)),
    [input],
  );
  const runes = Array.from(input).map((character) => ({
    character,
    codePoint: character.codePointAt(0) ?? 0,
  }));
  const constantValue = 2 ** power;
  const fitsUint8 = constantValue <= 255;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              UTF-8 string
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary outline-none focus:border-cyan-500"
              />
            </label>
            <div className="mt-4">
              <span className="text-xs text-secondary">
                bytes · len(s) = {bytes.length}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {bytes.map((byte, index) => (
                  <code
                    key={`${byte}-${index}`}
                    className="border border-border bg-elevated px-2 py-1 text-xs text-primary"
                  >
                    {byte.toString(16).padStart(2, "0")}
                  </code>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-secondary">
                runes · utf8.RuneCountInString = {runes.length}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {runes.map(({ character, codePoint }, index) => (
                  <span
                    key={`${codePoint}-${index}`}
                    className="border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-sm text-primary"
                  >
                    {character} U+{codePoint.toString(16).toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section
            className={`border p-4 ${fitsUint8 ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}
          >
            <label className="block text-sm text-primary">
              const value = 1 &lt;&lt; {power}
              <input
                type="range"
                min="0"
                max="16"
                value={power}
                onChange={(event) => setPower(Number(event.target.value))}
                className="mt-2 block w-full accent-[var(--accent)]"
              />
            </label>
            <div className="mt-4 border border-border bg-bg p-3">
              <span className="text-xs text-secondary">
                untyped integer value
              </span>
              <strong className="mt-2 block text-lg text-primary">
                {constantValue}
              </strong>
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">
              assign to uint8:{" "}
              <strong className="text-primary">
                {fitsUint8 ? "representable" : "compile-time overflow"}
              </strong>
              . untyped constant 先保留精确值，进入 typed context 时才检查
              representability。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        string length 和 index 面向 bytes，range 解码 UTF-8 runes；untyped
        constants 在赋给具体类型时才接受范围检查。
      </figcaption>
    </figure>
  );
}
