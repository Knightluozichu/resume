import type { ReactNode } from "react";

export { PointShadowStepDiagram } from "../../diagrams/point-shadow-step-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const cubeFaces = ["+X", "-X", "+Y", "-Y", "+Z", "-Z"] as const;

export function PointShadowCubemapContractDiagram() {
  return (
    <Frame caption="点阴影不是把方向光的 2D 深度图放大，而是以光源为中心建立六个 90 度透视面。每一面存相同单位的线性距离：写入时除 far_plane，采样时乘回 far_plane，再与 length(fragPos - lightPos) 比较。">
      <div
        role="img"
        aria-label="点阴影深度立方图契约图，显示以光源为中心的六个方向加减 X、加减 Y、加减 Z，每面覆盖九十度透视视场，写入线性距离除远平面，采样方向向量后乘远平面恢复并与当前距离比较"
        className="grid gap-3"
      >
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {cubeFaces.map((face) => (
            <div key={face} className="rounded-control border border-border bg-bg/40 p-3 text-center font-mono text-sm text-accent">
              {face}
            </div>
          ))}
        </div>
        <div className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-3">
          <code className="break-words text-primary">write: length(P - L) / far</code>
          <code className="break-words text-primary">sample: texture(cube, P - L) * far</code>
          <code className="break-words text-primary">compare: length(P - L) - bias &gt; closest</code>
        </div>
      </div>
    </Frame>
  );
}

export function PointShadowRenderPathsDiagram() {
  return (
    <Frame caption="桌面 OpenGL 可借几何着色器把一个三角形发射到六个 gl_Layer；WebGL2 没有该阶段，必须逐面绑定同一深度 cubemap 的 face 并渲六次。两条路径最终写入同一份线性距离语义。">
      <div
        role="img"
        aria-label="点阴影渲染路径对照图，桌面 OpenGL 用几何着色器和 gl Layer 在一遍中写入六个面，WebGL2 逐面绑定深度附件循环六次，两者都写入线性距离到深度立方图"
        className="grid gap-3 md:grid-cols-2"
      >
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-success">Desktop OpenGL</strong>
          <p className="mt-2 text-xs leading-5 text-secondary">geometry shader: 1 triangle -&gt; 6 faces, <code>gl_Layer = 0..5</code></p>
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-warning">WebGL2</strong>
          <p className="mt-2 text-xs leading-5 text-secondary">for each face: bind <code>DEPTH_ATTACHMENT</code>, set matrix, render scene</p>
        </div>
      </div>
    </Frame>
  );
}
