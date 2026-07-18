const FRAME_CONTRACT = [
  ["上下文与能力", "版本、限制、扩展、绘图缓冲和资源代"],
  ["程序接口", "shader 编译/链接、attribute、uniform、sampler"],
  ["顶点获取", "VAO 属性槽、VBO 关联、EBO、实例 divisor"],
  ["光栅与片元", "viewport、剔除、深度、模板、混合、写掩码"],
  ["输出目标", "默认/FBO、附件、draw buffers、反馈与 resolve"],
  ["提交与证据", "draw、错误、帧抓取、CPU/GPU 时间和回归"],
] as const;

const SUPPORT_LAYERS = [
  ["OpenGL ES", "EGL Surface/Context 生命周期、tile 带宽与热稳态"],
  ["WebGL", "canvas 像素、浏览器安全、context lost/restored"],
  ["后处理", "FBO 完整性、ping-pong、多采样 resolve"],
  ["跨平台", "能力契约、格式探针、shader 后端与降级理由"],
  ["优化调试", "瓶颈归因、非阻塞计时、帧证据与单变量实验"],
] as const;

export function DogFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="OpenGL WebGL OpenGL ES 全书六段帧契约和五个支撑专题"
          className="grid gap-4"
        >
          <section>
            <h3 className="text-sm font-bold text-primary">一次可验证绘制的六段契约</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {FRAME_CONTRACT.map(([title, detail], index) => (
                <div
                  key={title}
                  className="grid min-h-28 content-start rounded-control border border-accent/50 bg-accent/10 p-3"
                >
                  <span className="font-mono text-xs text-secondary">{index + 1}</span>
                  <strong className="mt-2 text-sm text-accent">{title}</strong>
                  <span className="mt-2 text-xs leading-5 text-secondary">{detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-primary">贯穿契约的五个支撑专题</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-5">
              {SUPPORT_LAYERS.map(([title, detail]) => (
                <div
                  key={title}
                  className="min-h-28 rounded-control border border-border bg-bg/40 p-3"
                >
                  <strong className="text-sm text-primary">{title}</strong>
                  <p className="mt-2 text-xs leading-5 text-secondary">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每次绘制都要满足六段契约；移动、浏览器、后处理、兼容和优化问题都能映射回其中一段
      </figcaption>
    </figure>
  );
}

const EVIDENCE_LOOP = [
  ["症状", "黑屏、错误颜色、尖峰、热降频、设备降级"],
  ["假设", "只提出一个可被证伪的断点或瓶颈"],
  ["隔离", "固定三角形、常量 shader、格式探针或单变量实验"],
  ["证据", "日志、帧抓取、像素、限制值、CPU/GPU 查询"],
  ["回归", "保存场景、阈值、设备范围与修复前后结果"],
] as const;

export function DogEvidenceLoopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="从症状、假设、隔离、证据到回归的五步图形诊断闭环"
          className="grid gap-2 md:grid-cols-5"
        >
          {EVIDENCE_LOOP.map(([title, detail], index) => (
            <div
              key={title}
              className="relative min-h-32 rounded-control border border-border bg-bg/40 p-3"
            >
              <span className="font-mono text-xs text-secondary">{index + 1}</span>
              <strong className="mt-2 block text-sm text-accent">{title}</strong>
              <p className="mt-2 text-xs leading-5 text-secondary">{detail}</p>
              {index < EVIDENCE_LOOP.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-accent md:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        修复只有进入可重复回归，才从一次偶然排错升级为工程能力
      </figcaption>
    </figure>
  );
}
