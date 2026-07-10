import type { ReviewQuestion } from "./types";

export const uslPropertiesBlockQuestions: ReviewQuestion[] = [
  {
    id: "usl-properties-block-1",
    chapter: "usl-properties-block",
    level: 1,
    question: `Properties 语义块的作用是什么？`,
    answer: `声明可在材质面板中调节的属性，将面板参数传递到 Shader 代码中。支持 Float、Range、Color、Vector、2D/3D/Cube 纹理等类型。每个属性有名称、面板标签、类型和默认值。`,
    tags: ["Properties", "属性声明"],
  },
  {
    id: "usl-properties-block-2",
    chapter: "usl-properties-block",
    level: 2,
    question: `Properties 中 Float 和 Range 类型的区别是什么？`,
    answer: `Float 是普通浮点数，在面板上显示为输入框。Range(min, max) 是带滑块的浮点数，限制在 min 到 max 范围内。两者在 Shader 代码中都映射为 float 类型，但面板交互方式不同。`,
    tags: ["Float", "Range"],
  },
  {
    id: "usl-properties-block-3",
    chapter: "usl-properties-block",
    level: 3,
    question: `如何在 Properties 中声明纹理并设置默认值？`,
    answer: `格式为 _Name(\"Label\", 2D) = \"white\" {}。2D/3D/Cube 类型后跟默认纹理名（white/black/gray/bump）和花括号（旧版纹理生成器参数，现已弃用但语法保留）。在 Shader 代码中用 sampler2D 接收。`,
    tags: ["纹理属性", "默认值"],
  },
  {
    id: "usl-properties-block-4",
    chapter: "usl-properties-block",
    level: 4,
    question: `如何在 C# 脚本中动态修改材质的 Properties？`,
    answer: `1)用 Material.SetFloat/SetColor/SetTexture/SetVector 修改 2)使用 MaterialPropertyBlock 避免创建材质实例（合批友好）3)属性名要加下划线前缀如 _Color 4)修改后如需持久化保存需 CreateAsset 5)用 Shader.GetGlobalFloat 等设置全局属性影响所有材质。`,
    tags: ["C# 交互", "MaterialPropertyBlock"],
  },
];
