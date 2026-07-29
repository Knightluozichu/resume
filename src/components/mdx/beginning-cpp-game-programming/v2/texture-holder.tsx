"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-11",
  title: "第 11 章：TextureHolder 与僵尸群",
  focus:
    "让 TextureHolder 集中加载、缓存并借出纹理，同时把单实例便利性与隐藏全局状态的代价写清",
  invariant:
    "同一路径只加载一次，返回的 Texture 引用在所有 Sprite 使用期间稳定有效，失败项不进入缓存",
  fault:
    "用 map 的 operator[] 先插入空纹理，再忽略 loadFromFile 失败并返回该条目",
  evidence: "规范化资源键、缓存命中/未命中、加载返回值、Texture 地址和销毁顺序",
  concepts: [
    "textureholder 类（textureholder class）",
    "静态成员函数（static function）",
    "单实例（single instance）",
    "僵尸群（horde of zombies）",
    "纹理缓存（texture cache）",
  ],
  zones: [
    {
      label: "资源请求",
      detail: "路径键、调用点与静态访问入口",
    },
    {
      label: "缓存所有权",
      detail: "TextureHolder、map 与稳定对象寿命",
    },
    {
      label: "借用结果",
      detail: "Sprite 保存的 Texture 关系与加载错误",
    },
  ],
  trace: ["规范化键", "查找缓存", "加载纹理", "原子插入", "借出引用"],
  scenarios: [
    {
      label: "重复请求同一纹理",
      input: "两个 Sprite 依次请求同一个规范化路径",
      expected: "只发生一次文件加载，两次获得同一稳定 Texture 对象",
    },
    {
      label: "纹理文件缺失",
      input: "请求一个不存在的资源路径",
      expected: "失败被报告且缓存不留下伪成功空条目",
    },
  ],
} satisfies CppGameBuildModel;

export function TextureHolderPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function TextureHolderFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function TextureHolderFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
