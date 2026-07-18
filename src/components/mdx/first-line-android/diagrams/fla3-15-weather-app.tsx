import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第15章 进入实战，开发一个天气预报App",
  "15.1 功能需求及技术可行性分析",
  "15.2 Git时间：将代码托管到GitHub上",
  "15.3 搭建MVVM项目架构",
  "15.4 搜索全球城市数据",
  "15.5 显示天气信息",
  "15.6 手动刷新天气和切换城市",
  "15.7 制作App的图标",
  "15.8 生成正式签名的APK文件",
  "15.9 你还可以做的事情"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第15章 进入实战，开发一个天气预报App" focus="把需求、Git、MVVM、城市搜索、天气展示、刷新切换、图标和签名发布串成可交付App" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第15章 进入实战，开发一个天气预报App" focus="从空仓库实现天气App，注入无网、慢网、空数据、城市切换、进程重建和签名配置差异完成端到端验收" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第15章 进入实战，开发一个天气预报App" focus="需求与风险表、分层依赖图、离线/错误状态、端到端测试、签名产物与发布清单" nodes={nodes} />; }
