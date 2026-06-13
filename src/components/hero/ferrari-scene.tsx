"use client";

/**
 * 首页 Hero 跑车场景（HEL-13）。
 *
 * 这里是「含 three import 的场景组件」——CLAUDE.md 硬规则 2/6 要求它
 * 只能经 next/dynamic + ssr:false 加载（见 hero-canvas.tsx），
 * 绝不能进入公共 layout 或任何首屏静态 import 链路。
 *
 * 本卡只做静态展示：固定机位、PBR 车漆、HDRI 环境、接触阴影。
 * 鼠标交互 / 自动旋转 / Bloom / 粒子留给 HEL-14，降级留给 HEL-15。
 */

import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  Lightformer,
} from "@react-three/drei";
import { Color, Mesh, MeshPhysicalMaterial, type Object3D } from "three";

const MODEL_URL = "/models/ferrari.glb";
// 本地 Draco decoder（public/draco），离线可用，不依赖 CDN。
// drei useGLTF 第二参传字符串即用作 DRACOLoader.setDecoderPath。
const DRACO_DECODER_PATH = "/draco/";

/** 品牌紫车漆（DESIGN --accent 同源，仅用于 3D 材质创作，不是 UI 颜色）。 */
const BODY_PAINT = "#5b3fd6";

/**
 * 按模型内材质名重写为合理的 PBR 材质。
 * Ferrari 458 模型无纹理，全部靠命名材质区分部件，便于精确接管。
 */
function buildMaterial(name: string): MeshPhysicalMaterial | null {
  switch (name) {
    // 车身漆面：金属底漆 + clearcoat 透明清漆，做出漆面光泽
    case "Body_Color":
      return new MeshPhysicalMaterial({
        color: new Color(BODY_PAINT),
        metalness: 1,
        roughness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.4,
      });
    // 风挡 / 侧窗：通透深色玻璃
    case "Glass_Gray":
      return new MeshPhysicalMaterial({
        color: new Color("#0b0b10"),
        metalness: 0,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.2,
        ior: 1.45,
        transparent: true,
        opacity: 0.55,
        envMapIntensity: 1.6,
      });
    // 车灯灯罩玻璃
    case "Taillight_Glass":
    case "Projector_Glass":
      return new MeshPhysicalMaterial({
        color: new Color("#15151c"),
        metalness: 0,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.6,
      });
    // 镀铬 / 金属件：高反射
    case "metal_chrome":
      return new MeshPhysicalMaterial({
        color: new Color("#d7d7e0"),
        metalness: 1,
        roughness: 0.08,
        envMapIntensity: 1.6,
      });
    case "metal_gray":
      return new MeshPhysicalMaterial({
        color: new Color("#8a8a96"),
        metalness: 1,
        roughness: 0.3,
        envMapIntensity: 1.2,
      });
    // 轮毂 / 刹车
    case "Tires":
      return new MeshPhysicalMaterial({
        color: new Color("#0c0c10"),
        metalness: 0,
        roughness: 0.85,
      });
    // 碳纤维 / 内饰塑料
    case "Carbon_Fiber":
      return new MeshPhysicalMaterial({
        color: new Color("#141418"),
        metalness: 0.4,
        roughness: 0.4,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      });
    case "plastic_gray":
    case "Interior_dark":
    case "Carpet":
      return new MeshPhysicalMaterial({
        color: new Color("#1a1a20"),
        metalness: 0,
        roughness: 0.7,
      });
    // 皮革内饰
    case "Leather":
    case "Leather_red":
      return new MeshPhysicalMaterial({
        color: new Color("#22222a"),
        metalness: 0,
        roughness: 0.6,
      });
    default:
      return null;
  }
}

function FerrariModel() {
  // useGLTF 第二参传 decoder 路径字符串 → drei 内部 DRACOLoader.setDecoderPath
  const { scene } = useGLTF(MODEL_URL, DRACO_DECODER_PATH);

  // 接管材质：按材质名重写为 PBR，未命中的保留原材质
  useMemo(() => {
    scene.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const matName = Array.isArray(child.material)
        ? child.material[0]?.name
        : child.material?.name;
      if (!matName) return;
      const next = buildMaterial(matName);
      if (next) child.material = next;
    });
  }, [scene]);

  // 车身略微抬高，让接触阴影正好贴地
  return <primitive object={scene} position={[0, -0.18, 0]} />;
}

function FerrariRig() {
  return (
    <>
      {/* 环境光：studio HDRI 撑起金属漆面反射，背景不显示天空盒 */}
      <Environment
        preset="studio"
        background={false}
        environmentIntensity={0.6}
      >
        {/* 顶部柔光条 + 侧向辉光条，凸显车身高光线条 */}
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 1]}
          scale={[8, 2, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-4, 1, 2]}
          scale={[3, 4, 1]}
          color="#9d86ff"
        />
      </Environment>

      {/* 柔和主方向光（投影来源） */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.15} />

      <FerrariModel />

      {/* 接触阴影：让车「落地」，颜色贴近 --bg */}
      <ContactShadows
        position={[0, -0.18, 0]}
        opacity={0.55}
        scale={12}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </>
  );
}

export default function FerrariScene() {
  // 离开页面时释放 GLTF 缓存，避免热更新/导航后的句柄堆积
  useEffect(() => {
    return () => {
      useGLTF.clear(MODEL_URL);
    };
  }, []);

  return (
    <Canvas
      // 透明背景，与页面 --bg 融合；不抢首页文字
      gl={{ alpha: true, antialias: true }}
      shadows
      dpr={[1, 2]}
      // 3/4 侧前方、略俯视的静态机位；拉远 + 抬高让车落在画面下半部，
      // 给顶部文字留出干净留白（移动端完整响应式取景见 HEL-15）
      camera={{ position: [4.8, 2.7, 6.2], fov: 36 }}
    >
      <FerrariRig />
    </Canvas>
  );
}

// 预声明资源 + 本地 decoder 路径，便于动态 chunk 加载后立即取模型
useGLTF.preload(MODEL_URL, DRACO_DECODER_PATH);
