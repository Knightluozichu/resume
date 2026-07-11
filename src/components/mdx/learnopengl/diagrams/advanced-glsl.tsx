import type { ReactNode } from "react";

export { GlFragCoordDiagram } from "../../diagrams/gl-fragcoord-diagram";
export { InterfaceBlockDiagram } from "../../diagrams/interface-block-diagram";
export { UboBindingDiagram } from "../../diagrams/ubo-binding-diagram";
export { ShaderDemo } from "../../shader-demo";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const slots = [
  { offset: "0", label: "vec3 b", detail: "占用 b.x/b.y/b.z", color: "var(--accent)" },
  { offset: "12", label: "float c", detail: "可复用第 4 个槽位", color: "var(--success)" },
  { offset: "16", label: "vec2 d", detail: "需 8B 对齐，跳到 16", color: "var(--warning)" },
  { offset: "24", label: "padding", detail: "为下一个 16B 对齐成员留出", color: "var(--text-secondary)" },
] as const;

export function Std140PackingDiagram() {
  return (
    <Frame caption="std140 的关键是每个成员的起始对齐，而不是把每个 vec3 强行扩成 vec4。vec3 后紧接 float 可以放在偏移 12；但 vec2、vec4、矩阵或数组常会要求跳到下一对齐边界。">
      <div role="img" aria-label="std140 内存排布，vec3 从偏移零开始，紧随的 float 可放在偏移十二，vec2 因八字节对齐从偏移十六开始，后续为十六字节对齐成员保留填充" className="grid gap-3">
        <div className="grid gap-2 sm:grid-cols-4">
          {slots.map((slot) => (
            <div key={slot.offset} className="rounded-control border border-border bg-bg/40 p-3 text-xs">
              <strong style={{ color: slot.color }}>byte {slot.offset}: {slot.label}</strong>
              <p className="mt-2 text-secondary">{slot.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-secondary">图中从 vec3 开始：float 可复用 byte 12，vec2 则需从 byte 16 起。若前面另有 float a 在 byte 0，随后的 vec3 b 必须先跳到 byte 16。</p>
      </div>
    </Frame>
  );
}
