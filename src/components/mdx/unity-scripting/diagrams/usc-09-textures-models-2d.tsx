import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 9 权威边界",
    action:
      "官方目录只包含 Skybox、Procedural meshes、Animating UVs - scrolling textures、Texture painting。原章不等于完整 2D 游戏或模型导入教程；它关注脚本怎样控制这些纹理、模型和 2D 元素。",
    metric: "4 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "几何与纹理的生产者到 GPU 链",
    action:
      "程序网格脚本产生 vertices、triangles、normals、uv 和 bounds，MeshFilter 持有几何，Renderer 与 Material 决定着色；Skybox 由相机或渲染设置消费环境材质。UV 滚动改变采样坐标而非纹理像素，纹理绘制则修改像素并 Apply 上传。sharedMaterial 修改共享资产，renderer.material 可能克隆实例，MaterialPropertyBlock 适合每 Renderer 参数。",
    metric: "producer -> consumer",
    evidence: "Skybox；Procedural meshes",
    boundary:
      "在 Update 中访问 renderer.material 可能不断创建材质实例并破坏合批，应缓存或用 PropertyBlock。",
  },
  {
    label: "实验",
    stage: "生成最小网格",
    action:
      "创建四边形并可视化法线，依次破坏 winding、UV 和 bounds，保存背面、拉伸和剔除错误。",
    metric: "single variable",
    evidence:
      "mesh.vertices = new[] { new Vector3(-1,0,-1), new Vector3(1,0,-1), new Vector3(-1,0,1), new Vector3(1,0,1) };",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "绘制并上传纹理",
    action:
      "按确定笔刷轨迹修改像素，控制 Apply 频率，测试不可读纹理、边界裁剪、分辨率和保存需求。",
    metric: "normal / edge / failure",
    evidence:
      "在 Update 中访问 renderer.material 可能不断创建材质实例并破坏合批，应缓存或用 PropertyBlock。；高分辨率纹理每次笔刷都 Apply 会产生大带宽与主线程成本，必须批量更新并测量。",
    boundary:
      "现代 SRP 的天空盒、Shader 属性名和后处理不同，GPU 绘制或 Compute Shader 可替代高频 CPU Texture2D 修改。迁移应保留网格拓扑、UV 采样、材质所有权和上传成本这些不变量。Sprite、Tilemap 或 Shader Graph 可作为现代扩展，不能替代四个原始小节。",
  },
  {
    label: "验收",
    stage: "Chapter 9 证据包",
    action:
      "验收包含正确与反向 winding、法线与 UV 可视化、两个对象材质隔离、确定性滚动、纹理边界绘制、不可读失败和上传 Profiler。每个生成资源都记录创建者、生命周期与销毁点，避免 Editor 或运行时泄漏。",
    metric: "replayable proof",
    evidence:
      "程序网格必须同时正确提供拓扑、法线、UV 与 bounds；UV 滚动改变采样，纹理绘制改变像素，两者成本不同；材质共享、实例与 PropertyBlock 决定参数影响范围；现代 GPU 方案替换载体时仍要验证坐标、所有权与上传成本",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc09TexturesModels2dMapLab() {
  return (
    <UnityScriptingLab
      title="第 9 章 Working with Textures, Models, and 2D"
      chapter="Chapter 9 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc09TexturesModels2dExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 9 章 Working with Textures, Models, and 2D"
      chapter="Chapter 9 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc09TexturesModels2dEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 9 章 Working with Textures, Models, and 2D"
      chapter="Chapter 9 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
