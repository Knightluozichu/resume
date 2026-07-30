"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-23",
  title: "立方体贴图、天空盒与环境映射边界",
  task: "按六个方向建立 cubemap，并区分天空盒、反射和折射的采样向量与深度状态",
  owner: "GL_TEXTURE_CUBE_MAP 对象、skybox VAO/program 与 camera view",
  state: "六面图像、方向向量、samplerCube、去平移 view、depth func 和绘制顺序",
  event: "上传六面，先/后画天空盒并以方向向量采样，再恢复 depth state",
  invariant: "六面尺寸/格式一致；天空盒不继承相机平移且不会覆盖已绘制近景",
  fault: "天空盒使用完整 view 矩阵，摄像机平移时盒体边界像普通物体一样移动",
  proof: "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素",
  concepts: ["cubemap", "skybox", "reflection", "refraction"],
  stages: [
    {
      action: "冻结输入：cubemap",
      resource:
        "GL_TEXTURE_CUBE_MAP 对象、skybox VAO/program 与 camera view记录六面图像、方向向量、samplerCube、去平移 view、depth func 和绘制顺序",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素中的初始快照",
    },
    {
      action: "提交命令：skybox",
      resource: "上传六面，先/后画天空盒并以方向向量采样，再恢复 depth state",
      result: "只改变与“skybox”相关的状态",
      observation:
        "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素中的命令参数",
    },
    {
      action: "执行管线：skybox",
      resource:
        "驱动/GPU 消费六面图像、方向向量、samplerCube、去平移 view、depth func 和绘制顺序",
      result: "产生“skybox”对应的中间结果",
      observation:
        "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素中的首个可观测结果",
    },
    {
      action: "核对边界：reflection",
      resource: "六面尺寸/格式一致；天空盒不继承相机平移且不会覆盖已绘制近景",
      result: "错误状态在继续传播前被定位",
      observation:
        "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素中的差异定位",
    },
    {
      action: "保存交付：refraction",
      resource: "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“六面尺寸/格式一致；天空盒不继承相机平移且不会覆盖已绘制近景”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“上传六面，先/后画天空盒并以方向向量采样，再恢复 depth state”",
      expected:
        "GL_TEXTURE_CUBE_MAP 对象、skybox VAO/program 与 camera view得到可复查结果，并持续满足“六面尺寸/格式一致；天空盒不继承相机平移且不会覆盖已绘制近景”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“天空盒使用完整 view 矩阵，摄像机平移时盒体边界像普通物体一样移动”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function CubemapsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function CubemapsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function CubemapsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
