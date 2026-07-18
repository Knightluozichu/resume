import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第11章 项目实战：聊天应用Chatty",
  "11.1 整体系统架构",
  "11.2 登录注册模块",
  "11.3 IM聊天模块",
  "11.3.1 对话列表页",
  "11.3.2 对话详情页",
  "11.4 联系人模块",
  "11.4.1 通讯录页",
  "11.4.2 添加搜索页",
  "11.4.3 二维码扫描页",
  "11.4.4 陌生人信息页",
  "11.5 用户信息模块",
  "11.5.1 个人信息页",
  "11.5.2 信息编辑页",
  "11.5.3 联系人信息页",
  "11.6 发现模块",
  "11.7 适配暗黑主题"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第11章 项目实战：聊天应用Chatty" focus="以产品级架构串联登录注册、会话、联系人、扫码、用户信息、发现模块和暗黑主题" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第11章 项目实战：聊天应用Chatty" focus="只实现静态聊天界面，遗漏鉴权过期、离线重试、消息身份、权限拒绝和跨模块所有权" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第11章 项目实战：聊天应用Chatty" focus="模块依赖图、鉴权状态机、消息分页与幂等、离线失败、联系人权限、编辑校验、主题截图矩阵" nodes={nodes} />; }
