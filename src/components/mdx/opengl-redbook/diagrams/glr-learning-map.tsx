import type { ReactNode } from "react";

const layers = [
  ["State", "context · object · DSA", "命令修改哪个对象"],
  ["Programs", "GLSL · SPIR-V · interfaces", "数据经过哪些阶段"],
  ["Graphics", "draw · clip · raster · fragments", "图元如何成为样本"],
  ["Resources", "texture · FBO · SSBO", "数据如何存储和复用"],
  ["Execution", "tessellation · geometry · compute", "工作如何组织与同步"],
] as const;

const mappings = [
  ["基础", "1", "context、state、object、pipeline、DSA"],
  ["着色器", "2", "GLSL、interface block、program pipeline、SPIR-V"],
  ["几何", "3, 5, 9, 10", "draw、view/clip/feedback、tessellation、geometry"],
  ["纹理 / FBO", "4, 6, 8", "fragments、texture/view/sampler、procedural signals"],
  ["光照", "7, 8", "lighting、shadow、bump、noise"],
  ["缓冲 / 现代", "5, 11, 12", "feedback、SSBO、atomic、barrier、compute"],
] as const;

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function GlrLearningMapDiagram() {
  return (
    <Frame caption="第 9 版的十二章围绕状态、程序、图形、资源和执行五份合同展开。">
      <div role="img" aria-label="OpenGL Programming Guide 第九版五层知识结构" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">12 chapters → 5 contracts</strong>
          <span className="text-xs text-secondary">OpenGL 4.5 · GLSL · SPIR-V</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {layers.map(([name, topics, question], index) => (
            <div key={name} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{name}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{topics}</p>
              <p className="mb-0 mt-2 text-xs font-medium leading-5 text-primary">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function GlrChapterMappingDiagram() {
  return (
    <Frame caption="现有十页按主题承载官方十二章；合并页面不允许省略原书单元。">
      <div role="img" aria-label="OpenGL 红宝书官方十二章到站内页面的映射" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.1fr_1fr_2.8fr] gap-px bg-border text-xs">
            {['页面组', '官方章号', '必须承载的合同'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {mappings.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
