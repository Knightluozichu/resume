"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-10",
  title: "第 10 章：指针、STL 与纹理管理",
  focus:
    "区分拥有与观察指针，用 std::vector 管理可变实体集合，并把纹理生命周期提升到所有 Sprite 之上",
  invariant:
    "每个动态对象只有一个明确所有者，vector 变更后不继续使用可能失效的元素地址，纹理活得比 Sprite 久",
  fault: "保存 vector 元素指针后触发扩容，再通过旧地址更新僵尸",
  evidence:
    "所有权图、vector size/capacity、扩容前后地址、析构日志及纹理/精灵寿命",
  concepts: [
    "指针（pointers）",
    "标准模板库（standard template library）",
    "容器（container）",
    "纹理管理（texture management）",
  ],
  zones: [
    {
      label: "所有权",
      detail: "对象创建、指针职责与析构",
    },
    {
      label: "集合变化",
      detail: "vector 容量、插入、擦除和迭代",
    },
    {
      label: "资源绑定",
      detail: "Texture 所有者与 Sprite 观察关系",
    },
  ],
  trace: ["创建所有者", "加入 vector", "记录容量", "更新实体", "按序销毁"],
  scenarios: [
    {
      label: "生成一波僵尸",
      input: "预留足够容量后创建并加入固定数量实体",
      expected: "集合大小正确，所有对象被更新且退出时只析构一次",
    },
    {
      label: "触发重新分配",
      input: "保存元素地址后插入直到 vector 扩容",
      expected: "旧地址被判定失效，代码改用索引、迭代器规则或稳定所有权",
    },
  ],
} satisfies CppGameBuildModel;

export function PointersStlPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function PointersStlFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function PointersStlFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
