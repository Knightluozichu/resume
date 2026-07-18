const layers = [
  ["Systems", "硬件、图形系统、交互与 GUI", "像素怎样显示和被操控"],
  ["Geometry", "图元、属性、2D/3D 变换与观察", "对象怎样表示和投影"],
  ["Sampling", "实现算法、光栅化、可见面", "连续几何怎样离散和遮挡"],
  ["Appearance", "光照、纹理、颜色、全局光照", "表面怎样产生颜色"],
  ["Creation", "动画、样条、算法建模、可视化、shader", "内容怎样生成和解释"],
] as const;

const mappings = [
  ["地图 / 管线", "1-5, 17, 20", "系统、图元、属性、实现算法、颜色、shader"],
  ["变换", "6-10", "2D/3D 变换与观察、层次建模"],
  ["光栅 / 可见性", "3-5, 9, 14", "覆盖、裁剪、深度与可见面"],
  ["曲线 / 表面", "12-13, 21", "对象表示、样条、算法建模"],
  ["光照 / 纹理", "15-17, 19", "局部/全局光照、细节与颜色"],
  ["高级 / 总复习", "11, 18, 20-22", "动画、交互、shader、建模、可视化"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4LearningMapDiagram() {
  return (
    <Frame caption="Hearn/Baker/Carithers 4e 不只是实时 3D 管线，而是从设备、算法到建模、交互与可视化的完整体系。">
      <div role="img" aria-label="Computer Graphics with OpenGL 第四版五层知识结构" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">22 chapters → 5 contracts</strong>
          <span className="text-xs text-secondary">system · geometry · sampling · appearance · creation</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {layers.map(([name, topics, question], index) => (
            <div key={name} className="min-h-44 rounded-control border border-border bg-bg/45 p-4">
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

export function Cg4ChapterMappingDiagram() {
  return (
    <Frame caption="现有十页按主题重组原书 22 章；覆盖是多对多映射，不是把原书压缩成十章目录。">
      <div role="img" aria-label="原书二十二章到现有十页的映射" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.4fr_1fr_2.4fr] gap-px bg-border text-xs">
            {['现有页面组', '原书章号', '承担单元'].map((label) => (
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
