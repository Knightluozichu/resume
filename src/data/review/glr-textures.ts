import type { ReviewQuestion } from "./types";

export const glrTexturesQuestions: ReviewQuestion[] = [
  {
    id: "glr-textures-1",
    chapter: "glr-textures",
    level: 1,
    question: `纹理过滤模式有哪些？`,
    answer: `GL_NEAREST最近邻快但锯齿，GL_LINEAR双线性平滑，GL_LINEAR_MIPMAP_LINEAR三线性最佳。MAG只能NEAREST或LINEAR。`,
    tags: ["过滤"],
  },
  {
    id: "glr-textures-2",
    chapter: "glr-textures",
    level: 2,
    question: `UV超出[0,1]怎么处理？`,
    answer: `环绕模式：GL_REPEAT重复，GL_MIRRORED_REPEAT镜像，GL_CLAMP_TO_EDGE边缘拉伸，GL_CLAMP_TO_BORDER边界色。`,
    tags: ["环绕"],
  },
  {
    id: "glr-textures-3",
    chapter: "glr-textures",
    level: 3,
    question: `为什么MIN_FILTER应使用Mipmap？`,
    answer: `不用Mipmap远处像素覆盖多纹素只采样一个产生摩尔纹。Mipmap预生成多级远处用低级别消除aliasing。`,
    tags: ["Mipmap"],
  },
  {
    id: "glr-textures-4",
    chapter: "glr-textures",
    level: 4,
    question: `如何管理多个纹理及纹理单元？`,
    answer: `glActiveTexture激活单元→绑定纹理→着色器uniform设为单元编号。可用采样器对象分离状态、纹理数组、纹理图集合批。`,
    tags: ["纹理管理"],
  },
];
