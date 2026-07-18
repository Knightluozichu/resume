import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第9章 使用REST API控制Rabbit",
  focus: "通过Management REST API完成授权、统计查询以及vhost和用户的自动化配置",
  invariant:
    "API主体只拥有必要权限，请求幂等性和资源目标明确，HTTP成功后继续核对broker对象与权限，凭据不进入日志和脚本仓库",
  artifact: "REST资源表、授权测试、统计采样、vhost用户自动配置脚本与执行后核验",
  nodes: [
    "能用RabbitMQ REST API做什么",
    "对客户端授权访问",
    "访问数据统计",
    "自动化vhost和用户配置",
    "总结",
  ],
} as const;

export function Rmq09RestApiTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq09RestApiDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq09RestApiEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
