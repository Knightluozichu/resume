import type { ReviewQuestion } from "./types";

/** 材质与散射 复习题 */
export const rtwMaterialsQuestions: ReviewQuestion[] = [
  {
    id: "rtw-materials-1",
    chapter: "rtw-materials",
    level: 1,
    question: `材质的 scatter 接口输入和输出各是什么？`,
    answer: `输入：入射射线 r_in 和命中记录 rec（含法线、交点、front_face）。输出：attenuation（衰减色，光被吸收后剩余的颜色比例）和 scattered（散射后的新射线）。ray_color 用 attenuation 乘以散射光的递归颜色。`,
    tags: ["scatter", "接口"],
  },
  {
    id: "rtw-materials-2",
    chapter: "rtw-materials",
    level: 2,
    question: `为什么把材质指针放进 hit_record，而不是在 ray_color 里按物体类型选材质？`,
    answer: `为了材质与几何体解耦。球只负责求交并把自己绑定的 mat_ptr 写入 rec，ray_color 只调 rec.mat_ptr->scatter，无需知道命中的是球还是别的。加新几何体或新材质互不影响，递归代码不变，符合开放-封闭原则。`,
    tags: ["解耦", "设计"],
  },
  {
    id: "rtw-materials-3",
    chapter: "rtw-materials",
    level: 3,
    question: `阅读 ray_color：scatter 返回 false 时返回什么？这代表什么物理含义？`,
    answer: `scatter 返回 false 时 ray_color 返回 color(0,0,0)（黑色）。这表示该材质把光线完全吸收、没有散射出任何新光线（如某些电介质的全内反射分支或刻意设为吸收的材质），该路径对像素颜色贡献为 0。`,
    tags: ["读代码", "吸收"],
  },
  {
    id: "rtw-materials-4",
    chapter: "rtw-materials",
    level: 4,
    question: `若把材质颜色直接当像素颜色输出（不递归），会缺哪些效果？为什么 attenuation * ray_color(scattered) 才能产生？`,
    answer: `会缺反射、阴影、色渗、间接光照等所有全局效果，画面变成纯色块。因为真实感来自光的多次弹射：attenuation 给当前表面调色，ray_color(scattered) 递归去取散射光在场景里看到的其他颜色，两者相乘才把「这个面反射/透射了什么」带回来。单层颜色无法表达光在物体间的传递。`,
    tags: ["综合", "递归", "全局光照"],
  },
];
