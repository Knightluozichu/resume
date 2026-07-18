import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第10章 项目实战：小游戏Tetris",
  "10.1 整体项目架构",
  "10.2 砖块矩阵（BrickMatrix）",
  "10.2.1 drawBrick绘制砖块单元",
  "10.2.2 drawMatrix绘制砖块矩阵",
  "10.3 下落中的砖块（Sprite）",
  "10.3.1 Shape砖块组合形状",
  "10.3.2 Sprite定义下落砖块",
  "10.3.3 drawSprite绘制下落砖块",
  "10.4 游戏机体（GameBody）",
  "10.4.1 GameButton",
  "10.4.2 组装Button、发送Action",
  "10.4.3 Clickable：分发事件",
  "10.5 订阅游戏状态（ViewState）",
  "10.5.1 ViewState",
  "10.5.2 Action",
  "10.5.3 reduce",
  "10.6 预览游戏画面"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第10章 项目实战：小游戏Tetris" focus="从整体架构、BrickMatrix与Sprite绘制，组装GameBody输入，再以ViewState、Action和reduce驱动游戏" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第10章 项目实战：小游戏Tetris" focus="把计时、碰撞、绘制和输入都写进Composable，导致状态不可重放且每次重组产生新的游戏循环" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第10章 项目实战：小游戏Tetris" focus="棋盘坐标断言、形状旋转样本、碰撞与消行测试、动作序列、归约快照、可重复随机种子" nodes={nodes} />; }
