import type { ReviewQuestion } from "./types";

export const uvfPhysicsVfxQuestions: ReviewQuestion[] = [
  {
    id: "uvf-physics-vfx-1",
    chapter: "uvf-physics-vfx",
    level: 1,
    question: "如何在物理碰撞回调中获取碰撞点位置并生成特效？",
    answer: "在 OnCollisionEnter(Collision collision) 回调中，collision.contacts 数组包含所有碰撞接触点。每个 ContactPoint 有 point（碰撞位置）和 normal（碰撞法线）。生成特效：`void OnCollisionEnter(Collision col) { ContactPoint cp = col.contacts[0]; var vfx = Instantiate(hitPrefab, cp.point, Quaternion.LookRotation(cp.normal)); vfx.GetComponent<ParticleSystem>().Play(); }`。碰撞点决定特效位置，法线决定特效朝向（粒子沿法线方向飞溅）。",
    tags: ["OnCollisionEnter", "碰撞点", "contact", "法线"],
  },
  {
    id: "uvf-physics-vfx-2",
    chapter: "uvf-physics-vfx",
    level: 2,
    question: "ParticleSystem Force Field（力场）组件的作用是什么？它可以模拟哪些效果？",
    answer: "Force Field 是粒子系统的外部力场模块，可以在空间中施加方向力、吸引力、排斥力、漩涡力、湔流力等，影响经过该区域的粒子。可模拟效果：1）龙卷风——漩涡力+向上方向力；2）黑洞技能——强吸引力将粒子吸入中心；3）爆炸冲击波——瞬间排斥力将粒子向外推；4）风场——方向力让烟雾飘散。力场可以是局部触发器（只有进入范围的粒子受影响）或全局。在 VFX Graph 中还可以用噪声场模拟更自然的扰动。",
    tags: ["Force Field", "力场", "漩涡", "吸引排斥"],
  },
  {
    id: "uvf-physics-vfx-3",
    chapter: "uvf-physics-vfx",
    level: 3,
    question: "Unity Cloth（布料）组件如何配合特效使用？布料模拟对性能有什么影响？",
    answer: "Cloth 模拟柔软物体（披风、旗帜、窗帘）。配合特效：1）布料拖尾——在布料顶点挂粒子发射器，运动时产生拖尾粒子；2）布料撕裂——布料被破坏时在撕裂边缘生成碎片粒子；3）旗帜飘动+尘粒——Cloth 模拟旗帜飘动，同时发射灰尘粒子。性能影响：Cloth 在 CPU 上逐顶点模拟，顶点越多越慢，且不支持 GPU 加速。移动端建议：限制 Cloth 顶点数（少于100）、降低模拟频率、或直接用预烘焙动画替代实时布料模拟。PC 端可以放心使用，但仍需控制场景中 Cloth 数量。",
    tags: ["Cloth", "布料", "性能", "拖尾"],
  },
  {
    id: "uvf-physics-vfx-4",
    chapter: "uvf-physics-vfx",
    level: 4,
    question: "设计一个「陨石坠落撞击地面」的完整物理特效链，涉及哪些物理回调？如何编排特效序列？",
    answer: "1）陨石下落：Rigidbody 自由落体，尾迹粒子用 Trail Renderer 跟随；2）撞击瞬间：OnCollisionEnter 触发，获取 contact.point 和 contact.normal；3）撞击坑特效：在碰撞点生成爆炸粒子（Burst 50个碎片，沿法线方向散射）+ 烟尘粒子（向上扩散）+ 冲击波环（沿地面扩张的扁平粒子）；4）物理交互：碰撞点施加 AddExplosionForce 给周围 Rigidbody，让碎石飞溅；5）力场扰动：在碰撞点放 Force Field（排斥力），影响周围环境粒子；6）地面裂痕：用投影贴图在地面生成烧焦痕迹；7）震屏+顿帧：Camera Shake + Time.timeScale 短暂降低。序列编排：碰撞瞬间0s爆炸+震屏→0.1s烟尘扩散→0.3s冲击波环→0.5s碎片落地→2s烟尘消散。用协程按时间延迟触发各阶段。",
    tags: ["陨石坠落", "碰撞特效", "特效序列", "综合设计"],
  },
];
