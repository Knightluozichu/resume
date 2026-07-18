import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第18章 系统的UI——SystemUI",
  "18.1 SystemUI的组成元素",
  "18.2 SystemUI的实现",
  "18.3 Android壁纸资源——WallpaperService",
  "18.3.1 WallpaperManagerService",
  "18.3.2 ImageWallpaper"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第18章 系统的UI——SystemUI" focus="分析SystemUI组成、进程实现和WallpaperService资源链" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第18章 系统的UI——SystemUI" focus="把SystemUI视为普通应用界面，忽略系统权限、窗口层级、服务启动和壁纸Token" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第18章 系统的UI——SystemUI" focus="进程与服务清单、状态栏导航栏、窗口类型、壁纸Token、WallpaperManagerService与ImageWallpaper" nodes={nodes}/>;}
