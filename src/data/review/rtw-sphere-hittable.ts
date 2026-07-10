import type { ReviewQuestion } from "./types";

/** 球体与可命中对象 复习题 */
export const rtwSphereHittableQuestions: ReviewQuestion[] = [
  {
    id: "rtw-sphere-hittable-1",
    chapter: "rtw-sphere-hittable",
    level: 1,
    question: `hit_record 包含哪些字段？各有什么用？`,
    answer: `p（交点位置）、normal（交点法线）、t（射线参数，表示距离）、front_face（是否正面/外表面命中）、mat_ptr（材质指针，供散射用）。`,
    tags: ["hit_record"],
  },
  {
    id: "rtw-sphere-hittable-2",
    chapter: "rtw-sphere-hittable",
    level: 2,
    question: `front_face 是怎么判定的？为什么要把法线翻转成始终朝外？`,
    answer: `front_face = (射线方向 · 外法线 < 0)，射线迎着外法线射入为正面命中。翻转法线使其始终朝射线来源侧，是为了给材质散射/折射公式一个统一约定——法线总指向入射光来的那一侧，材质无需再判断射线来自物体内还是外。`,
    tags: ["法线", "front_face"],
  },
  {
    id: "rtw-sphere-hittable-3",
    chapter: "rtw-sphere-hittable",
    level: 3,
    question: `阅读 sphere::hit：为什么先试 (-h-sqrtd)/a 再试 (-h+sqrtd)/a？`,
    answer: `(-h-sqrtd)/a 是较小的根（近交点），(-h+sqrtd)/a 是较大的根（远交点）。先试近根可拿到射线最先碰到的表面；若近根不在 [t_min,t_max] 区间（如射线起点在球内），才退而试远根，保证取到合法范围内最近的交点。`,
    tags: ["读代码", "求交"],
  },
  {
    id: "rtw-sphere-hittable-4",
    chapter: "rtw-sphere-hittable",
    level: 4,
    question: `hittable_list 如果不收紧 t_max 会出现什么 bug？为什么收紧能修复？`,
    answer: `不收紧时每个物体都在原始 [t_min,t_max] 区间求交，后命中的更远物体会覆盖之前更近物体的交点，导致渲染了「最远」交点、出现穿透。收紧做法：维护 closest=t_max，每次命中把 closest 更新为当前 t，后续物体只在 [t_min,closest] 内求交，从而只可能命中更近的，遍历结束留下全局最近交点。`,
    tags: ["综合", "hittable_list", "穿透"],
  },
];
