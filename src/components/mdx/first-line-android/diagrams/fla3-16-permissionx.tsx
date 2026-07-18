import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第16章 编写并发布一个开源库，PermissionX",
  "16.1 开发前的准备工作",
  "16.2 实现PermissionX开源库",
  "16.3 对开源库进行测试",
  "16.4 将开源库发布到jcenter仓库",
  "16.5 体验我们的成果",
  "16.6 结束语"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第16章 编写并发布一个开源库，PermissionX" focus="从API设计、不可见Fragment实现、测试、仓库发布和使用验证完成可维护Android权限库" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第16章 编写并发布一个开源库，PermissionX" focus="实现最小PermissionX，覆盖授权、拒绝、不再询问、旋转、并发请求和宿主销毁，再生成可消费制品" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第16章 编写并发布一个开源库，PermissionX" focus="公开API合同、权限状态机、宿主生命周期图、测试矩阵、版本与发布迁移说明" nodes={nodes} />; }
