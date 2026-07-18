import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第17章 他山之石可攻玉——三维游戏模型的载入",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#be185d",
  soft: "#fdf2f8",
  chain: [
    "解析模型文件",
    "创建网格对象",
    "载入材质纹理",
    "优化或克隆网格",
    "逐子集绘制",
    "回收资源与缓存",
  ],
  concepts: [
    "第17章 他山之石可攻玉——三维游戏模型的载入",
    "17.1 网格模型技术的前生今世",
    "17.2 认识三维建模软件3DSMax和Maya",
    "17.3 对X文件的认识",
    "17.4 从3DSMax中导出X文件方法详解",
    "17.5 网格模型接口ID3DXMESH",
    "17.6 文件模型载入三步曲",
    "17.6.1 三步曲之一：通过X文件加载网格模型",
    "17.6.2 三步曲之二：载入材质和纹理",
    "17.6.3 三步曲之三：绘制网格模型",
    "17.6.4 总结与升华",
    "17.7 示例程序D3demo12",
    "17.8 章节小憩",
  ],
} as const;

export function Wj17MeshLoadingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj17MeshLoadingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj17MeshLoadingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
