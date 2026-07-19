import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-05",
  title: "3.5 从密码到token，一个有关授权的故事",
  family: "web",
  nodes: ["发起授权", "用户同意", "返回授权码", "后端换令牌", "携令牌访问"],
  concepts: [
    "3.5 从密码到token，一个有关授权的故事",
    "我把密码献给你",
    "token",
    "授权码 token",
    "后记",
  ],
  mechanism:
    "OAuth 授权码流程让资源所有者在授权服务器登录，客户端以授权码换取访问令牌；客户端不应取得用户密码",
  success:
    "3.5 从密码到token，一个有关授权的故事 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.5 从密码到token，一个有关授权的故事 在“攻击者截获可复用授权码，客户端又未绑定 redirect URI 或 PKCE 校验值”处拒绝",
} as const;

export function Crv18Section0305Lab() {
  return <CoderMechanismLab {...profile} />;
}
