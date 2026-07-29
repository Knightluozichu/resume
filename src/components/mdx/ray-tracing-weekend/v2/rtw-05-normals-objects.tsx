"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle =
  "Surface Normals and Multiple Objects × Moving Camera Code Into Its Own Class";
const nodes = [
  {
    label: "法线",
    unit: "Surface Normals and Multiple Objects",
    mechanism:
      "法线从球心指向交点，hit_record 保存t、位置、法线与正反面，hittable_list 逐对象缩短允许上界以保留最近命中。这样材质只消费稳定的命中记录，不再重复求交细节。",
    probe: "front_face、单位法线、对象身份和最近命中距离",
  },
  {
    label: "hit_record",
    unit: "Surface Normals and Multiple Objects",
    mechanism:
      "法线从球心指向交点，hit_record 保存t、位置、法线与正反面，hittable_list 逐对象缩短允许上界以保留最近命中。这样材质只消费稳定的命中记录，不再重复求交细节。",
    probe: "front_face、单位法线、对象身份和最近命中距离",
  },
  {
    label: "hittable_list",
    unit: "Surface Normals and Multiple Objects",
    mechanism:
      "法线从球心指向交点，hit_record 保存t、位置、法线与正反面，hittable_list 逐对象缩短允许上界以保留最近命中。这样材质只消费稳定的命中记录，不再重复求交细节。",
    probe: "front_face、单位法线、对象身份和最近命中距离",
  },
  {
    label: "camera class",
    unit: "Moving Camera Code Into Its Own Class",
    mechanism:
      "Moving Camera Code Into Its Own Class把分散在main中的视口计算、get_ray、ray_color与render循环迁入camera类。重构前后图像必须一致；initialize集中派生参数，render只负责按像素调度并写出结果。",
    probe: "公开参数、initialize派生量、首末像素射线和重构前后PPM哈希",
  },
  {
    label: "initialize",
    unit: "Moving Camera Code Into Its Own Class",
    mechanism:
      "Moving Camera Code Into Its Own Class把分散在main中的视口计算、get_ray、ray_color与render循环迁入camera类。重构前后图像必须一致；initialize集中派生参数，render只负责按像素调度并写出结果。",
    probe: "公开参数、initialize派生量、首末像素射线和重构前后PPM哈希",
  },
  {
    label: "render",
    unit: "Moving Camera Code Into Its Own Class",
    mechanism:
      "Moving Camera Code Into Its Own Class把分散在main中的视口计算、get_ray、ray_color与render循环迁入camera类。重构前后图像必须一致；initialize集中派生参数，render只负责按像素调度并写出结果。",
    probe: "公开参数、initialize派生量、首末像素射线和重构前后PPM哈希",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "把交点几何、朝向和多对象最近命中统一成查询合同，并把相机初始化、射线生成、颜色求值与图像写出收拢为稳定接口",
  formula:
    "n=\\frac{P-C}{r},\\qquad t_{\\max}\\leftarrow t_{\\mathrm{closest}} ; R=write(color(get\\_ray(pixel)))",
  invariant:
    "Surface Normals and Multiple Objects的输入、公式中间量、输出与恢复结果可用同一基线复算，且Moving Camera Code Into Its Own Class的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "不根据入射方向翻转法线，或遍历对象时没有收紧t上界；重构时改变像素坐标或初始化顺序，导致相同场景输出发生漂移",
  evidence:
    "front_face、单位法线、对象身份和最近命中距离、公开参数、initialize派生量、首末像素射线和重构前后PPM哈希",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw05NormalsObjectsGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw05NormalsObjectsSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw05NormalsObjectsEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
