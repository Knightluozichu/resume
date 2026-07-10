import type { ReviewQuestion } from "./types";

/** 金属与电介质材质 复习题 */
export const rtwMetalDielectricQuestions: ReviewQuestion[] = [
  {
    id: "rtw-metal-dielectric-1",
    chapter: "rtw-metal-dielectric",
    level: 1,
    question: `写出镜面反射向量公式。金属 fuzz 起什么作用？`,
    answer: `r = d − 2(d·N)N，即入射方向关于法线的对称向量。fuzz 给反射方向加随机扰动，0 为完美镜面，越大越像磨砂金属，反射越漫散。`,
    tags: ["金属", "reflect"],
  },
  {
    id: "rtw-metal-dielectric-2",
    chapter: "rtw-metal-dielectric",
    level: 2,
    question: `Snell 定律是什么？全内反射在什么条件下发生？`,
    answer: `Snell 定律：ηi·sinθi=ηt·sinθt，入射角与折射角正弦之比等于两介质折射率之比。全内反射发生在光从密介质射向疏介质（ηi>ηt）且入射角超过临界角时，此时 sinθt>1 无实数解，光无法折射而全部反射。`,
    tags: ["Snell", "全内反射"],
  },
  {
    id: "rtw-metal-dielectric-3",
    chapter: "rtw-metal-dielectric",
    level: 3,
    question: `阅读 dielectric::scatter：cannot_refract 的判定条件是什么？为何要优先判它？`,
    answer: `cannot_refract = (ratio·sin_theta > 1.0)，其中 ratio=ηi/ηt。它表示按 Snell 算出的 sinθt>1，折射无实数解（全内反射）。优先判它是因为此时 refract 会产生非法（复数根）向量，必须走 reflect；只有可折射时才用 Schlick 概率在反射/折射间抽样。`,
    tags: ["读代码", "全内反射"],
  },
  {
    id: "rtw-metal-dielectric-4",
    chapter: "rtw-metal-dielectric",
    level: 4,
    question: `玻璃球折射率从 1.5 调到 1.0 会发生什么？front_face 在电介质实现中为什么关键？`,
    answer: `折射率 1.0 与空气相同，光进出球不弯折，玻璃球「消失」、不再折射。front_face 决定 ratio 取 1/ir（从外进内）还是 ir（从内出外），折射方向与全内反射判定都依赖它；若搞反 ratio，折射方向错误、全内反射在错的一侧发生，玻璃球看起来完全失真。front_face 让同一套公式正确处理光线的进、出两次相交。`,
    tags: ["综合", "折射率", "front_face"],
  },
];
