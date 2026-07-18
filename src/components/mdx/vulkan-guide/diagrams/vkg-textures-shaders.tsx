const uploadStages = [
  ["Decode", "CPU pixels", "颜色语义、format、extent、mip policy"],
  ["Allocate", "Buffer + Image", "requirements、memory type、bind/suballocate"],
  ["Transfer", "Copy + barriers", "flush、layout、stage/access、ownership"],
  ["Publish", "View + sampler + descriptor", "subresource、LOD、shader ABI、retire"],
] as const;

const contractRows = [
  ["Image view", "format/aspect/mip/layer", "只暴露声明的 subresources"],
  ["Sampler", "filter/address/LOD/aniso", "feature 与 limit 已核验"],
  ["Descriptor", "set/binding/type/count/stage", "imageLayout 与实际使用状态一致"],
  ["Shader", "SPIR-V resource ABI", "reflection 与 pipeline layout 匹配"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgTexturesShadersDiagram() {
  return (
    <Frame caption="纹理可见性来自内存绑定、host flush、copy、barrier 和 descriptor ABI 的完整链，而非单个 VkImage。">
      <div role="img" aria-label="Vulkan 纹理上传与发布链" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Texture publication pipeline</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {uploadStages.map(([stage, object, proof], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <code className="mt-2 block text-xs text-accent">{object}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">证据：{proof}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgTextureContractDiagram() {
  return (
    <Frame caption="Image、view、sampler、descriptor 与 shader 各自负责不同合同，任何一层都不能替代 layout barrier。">
      <div role="img" aria-label="Vulkan 纹理着色器资源合同矩阵" className="overflow-x-auto">
        <div className="min-w-[700px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_1.8fr_2fr] gap-px bg-border text-xs">
            {['层', '声明', '验证重点'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {contractRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
