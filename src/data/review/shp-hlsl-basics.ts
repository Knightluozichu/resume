import type { ReviewQuestion } from "./types";

export const shpHlslBasicsQuestions: ReviewQuestion[] = [
  {
    id: "shp-hlsl-basics-1",
    chapter: "shp-hlsl-basics",
    level: 1,
    question: "HLSL 中最常用的基本数据类型有哪些？",
    answer: "标量类型 float/half/int/bool，向量类型 float2/float3/float4，矩阵类型 float3x3/float4x4。其中 float4 和 float4x4 是着色器中最常使用的数据类型。",
    tags: ["数据类型"],
  },
  {
    id: "shp-hlsl-basics-2",
    chapter: "shp-hlsl-basics",
    level: 2,
    question: "HLSL 中 sematic 语义（如 POSITION、COLOR）的作用是什么？",
    answer: "语义用于在管线阶段之间传递数据。顶点着色器输入用 POSITION/NORMAL/TEXCOORD 等语义从顶点缓冲读取数据，输出用 SV_POSITION/SV_TARGET 等系统语义传递给后续阶段或渲染目标。",
    tags: ["语义", "数据传递"],
  },
  {
    id: "shp-hlsl-basics-3",
    chapter: "shp-hlsl-basics",
    level: 3,
    question: "HLSL 中 mul 函数的参数顺序为什么重要？",
    answer: "mul(matrix, vector) 表示行主序矩阵乘列向量，mul(vector, matrix) 表示行向量乘矩阵。参数顺序决定了矩阵的存储约定（行主序 vs 列主序），顺序错误会导致变换结果完全错误。",
    tags: ["矩阵运算", "mul"],
  },
  {
    id: "shp-hlsl-basics-4",
    chapter: "shp-hlsl-basics",
    level: 4,
    question: "如何在 HLSL 中正确使用 Constant Buffer 并保证数据对齐？",
    answer: "1)cbuffer 中按从大到小排列成员（float4x4 在前，float3 需补齐为 float4）2)注意 packing rule：每个 float4 占 16 字节边界 3)C++ 侧结构体需匹配对齐规则 4)使用 alignas(16) 或手动填充 5)避免在 cbuffer 中放动态长度数组。",
    tags: ["Constant Buffer", "对齐", "实践"],
  },
];
