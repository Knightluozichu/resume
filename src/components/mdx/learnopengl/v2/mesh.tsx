"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-16",
  title: "Mesh 数据布局、GPU 资源与纹理绑定",
  task: "把 Vertex/Index/Texture 数据转成 Mesh 自有 VAO/VBO/EBO 与确定性 Draw 绑定",
  owner: "Mesh 实例及其 VAO/VBO/EBO/texture handles",
  state: "Vertex 内存布局、索引、纹理语义/编号、attribute pointer 和资源寿命",
  event: "setupMesh 上传数据并记录属性，Draw 绑定材质纹理后执行 indexed draw",
  invariant: "offsetof/stride 与 C++ Vertex 实际布局一致，EBO 绑定保存在该 VAO",
  fault: "假定 glm::vec3 紧密无填充并手写 offset，法线/UV 从错误字节读取",
  proof: "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素",
  concepts: ["mesh", "vertex", "index", "texture"],
  stages: [
    {
      action: "冻结输入：mesh",
      resource:
        "Mesh 实例及其 VAO/VBO/EBO/texture handles记录Vertex 内存布局、索引、纹理语义/编号、attribute pointer 和资源寿命",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素中的初始快照",
    },
    {
      action: "提交命令：vertex",
      resource:
        "setupMesh 上传数据并记录属性，Draw 绑定材质纹理后执行 indexed draw",
      result: "只改变与“vertex”相关的状态",
      observation:
        "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素中的命令参数",
    },
    {
      action: "执行管线：vertex",
      resource:
        "驱动/GPU 消费Vertex 内存布局、索引、纹理语义/编号、attribute pointer 和资源寿命",
      result: "产生“vertex”对应的中间结果",
      observation:
        "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素中的首个可观测结果",
    },
    {
      action: "核对边界：index",
      resource:
        "offsetof/stride 与 C++ Vertex 实际布局一致，EBO 绑定保存在该 VAO",
      result: "错误状态在继续传播前被定位",
      observation:
        "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素中的差异定位",
    },
    {
      action: "保存交付：texture",
      resource:
        "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“offsetof/stride 与 C++ Vertex 实际布局一致，EBO 绑定保存在该 VAO”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“setupMesh 上传数据并记录属性，Draw 绑定材质纹理后执行 indexed draw”",
      expected:
        "Mesh 实例及其 VAO/VBO/EBO/texture handles得到可复查结果，并持续满足“offsetof/stride 与 C++ Vertex 实际布局一致，EBO 绑定保存在该 VAO”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“假定 glm::vec3 紧密无填充并手写 offset，法线/UV 从错误字节读取”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function MeshContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function MeshTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function MeshFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
