import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第19章 电子拍卖系统",
  "19.1 系统功能简介和架构设计",
  "19.1.1 系统功能简介",
  "19.1.2 系统架构设计",
  "19.2 JSON简介",
  "19.2.1 使用JSON语法创建对象",
  "19.2.2 使用JSON语法创建数组",
  "19.2.3 Android的JSON支持",
  "19.3 发送请求的工具类",
  "19.4 用户登录",
  "19.4.1 处理登录的接口",
  "19.4.2 用户登录客户端",
  "19.5 查看流拍物品",
  "19.5.1 查看流拍物品的接口",
  "19.5.2 查看流拍物品客户端",
  "19.6 管理物品种类",
  "19.6.1 浏览物品种类的接口",
  "19.6.2 查看物品种类",
  "19.6.3 添加物品种类的接口",
  "19.6.4 添加物品种类",
  "19.7 管理拍卖物品",
  "19.7.1 查看自己的拍卖物品的接口",
  "19.7.2 查看自己的拍卖物品",
  "19.7.3 添加拍卖物品的接口",
  "19.7.4 添加拍卖物品",
  "19.8 参与竞拍",
  "19.8.1 选择物品种类",
  "19.8.2 根据种类浏览物品的服务器端接口",
  "19.8.3 根据种类浏览物品",
  "19.8.4 参与竞价的服务器端接口",
  "19.8.5 参与竞价",
  "19.9 权限控制",
  "19.10 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第19章 电子拍卖系统" focus="以电子拍卖系统综合RESTful服务、JSON、登录、物品分类、拍卖、竞价和权限控制" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第19章 电子拍卖系统" focus="以电子拍卖系统综合RESTful服务、JSON、登录、物品分类、拍卖、竞价和权限控制" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第19章 电子拍卖系统" focus="端到端架构图、API合同、JSON样本、身份权限、竞价并发与部署回滚记录" nodes={nodes} />; }
