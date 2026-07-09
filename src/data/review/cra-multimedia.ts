import type { ReviewQuestion } from "./types";

export const craMultimediaQuestions: ReviewQuestion[] = [
  {
    id: "cra-mm-1",
    chapter: "cra-multimedia",
    level: 1,
    question: "MediaPlayer和SoundPool有什么区别？各自适合什么场景？",
    answer:
      "MediaPlayer：①功能全面——支持播放音频（MP3/AAC/WAV等）和视频（MP4/3GP等），可从本地文件、资源、网络URL加载。②API流程：create/setDataSource → prepare（同步缓冲）或prepareAsync（异步缓冲）→ start → pause → stop → seekTo → release。③支持setLooping循环播放、setVolume调节音量、setOnCompletionListener播放完成回调。④适合播放较长音频（背景音乐）或视频。缺点：延迟较高（prepare需缓冲），不适合频繁快速播放短音效；同时只能播放有限数量的流。SoundPool：①专为短音效设计——支持多路同时混音播放（可同时播放多个音效互不干扰）。②API：通过SoundPool.Builder构建（指定maxStreams最大并发流数），load加载音频资源返回soundId，play(soundId, leftVol, rightVol, priority, loop, rate)播放。③音频预先加载到内存，播放延迟极低，适合游戏音效（枪声/爆炸/脚步）。④支持rate变速播放、loop循环。缺点：只适合短音频（通常几秒以内），不适合长音乐或视频。场景选择：背景音乐/视频播放用MediaPlayer，游戏音效/按钮点击声用SoundPool。",
    tags: ["MediaPlayer", "SoundPool", "音频播放", "对比", "音效"],
  },
  {
    id: "cra-mm-2",
    chapter: "cra-multimedia",
    level: 2,
    question: "如何在Android中进行2D绘图？Canvas和Paint各自的作用是什么？",
    answer:
      "Android 2D绘图通过自定义View + Canvas + Paint实现：①创建自定义View继承View，重写onDraw(Canvas canvas)方法。②Canvas（画布）——提供各种绘制方法：drawRect画矩形、drawCircle画圆、drawLine画线、drawText画文字、drawBitmap画位图、drawPath画自定义路径、drawArc画弧、drawOval画椭圆。Canvas还支持save/restore保存恢复绘制状态、translate/rotate/scale变换坐标系、clipRect裁剪绘制区域。③Paint（画笔）——定义绘制样式：setColor设置颜色、setAntiAlias开启抗锯齿、setStrokeWidth设置线条粗细、setStyle设置填充模式（FILL填充/STROKE描边/FILL_AND_STROKE）、setTextSize设置文字大小、setShader设置渐变着色器、setPathEffect设置虚线效果。④绘制流程：在onDraw中先用Paint设置好样式，然后调用Canvas的drawXXX方法绘制。⑤性能优化：onDraw中不要创建对象（Paint等应在构造函数中初始化），避免GC卡顿；复杂动画用invalidate触发重绘。典型应用：绘图板、游戏画面、自定义图表、进度环。",
    tags: ["2D绘图", "Canvas", "Paint", "自定义View", "onDraw", "drawRect"],
  },
  {
    id: "cra-mm-3",
    chapter: "cra-multimedia",
    level: 2,
    question: "Android三种动画（补间动画、帧动画、属性动画）的原理和区别是什么？",
    answer:
      "三种动画：①Tween Animation（补间动画）——通过定义起始和结束状态，系统自动计算中间帧实现渐变效果。四种类型：AlphaAnimation（透明度）、TranslateAnimation（平移）、RotateAnimation（旋转）、ScaleAnimation（缩放）。可在res/anim/下用XML定义，通过AnimationUtils.loadAnimation加载，view.startAnimation播放。特点：只改变View的显示效果（视觉变换），不改变View的实际属性值（如位置、大小）。动画结束后View回到原始状态。②Frame Animation（帧动画）——逐帧播放图片序列，类似GIF。在res/drawable/下用XML的`<animation-list>`定义`<item drawable duration>`帧列表，通过AnimationDrawable.start()播放。适合复杂动画效果但图片资源占用大。③Property Animation（属性动画）——通过ObjectAnimator或ValueAnimator真正改变View的属性值（如translationX/alpha/scaleX/rotation），而非仅视觉变换。动画结束后属性值保持。ObjectAnimator.ofFloat(view, \"translationX\", 0f, 100f).start()让View真正移动。支持AnimatorSet组合动画、AnimatorListener监听状态。推荐使用属性动画——效果真实、灵活性强、与交互逻辑一致。",
    tags: ["动画", "补间动画", "帧动画", "属性动画", "ObjectAnimator", "AnimationDrawable"],
  },
  {
    id: "cra-mm-4",
    chapter: "cra-multimedia",
    level: 3,
    question: "如何使用Android传感器？SensorManager的注册/注销流程和注意事项是什么？",
    answer:
      "传感器使用流程：①获取SensorManager——`SensorManager sm = (SensorManager) getSystemService(SENSOR_SERVICE)`。②获取Sensor对象——`Sensor sensor = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)`，常见类型：TYPE_ACCELEROMETER（加速度，计步/摇一摇）、TYPE_ORIENTATION（方向，指南针）、TYPE_LIGHT（光线，自动亮度）、TYPE_PROXIMITY（距离，通话息屏）、TYPE_GYROSCOPE（陀螺仪）、TYPE_MAGNETIC（磁场）。③注册监听——`sm.registerListener(listener, sensor, rate)`，listener实现SensorEventListener接口，重写onSensorChanged(SensorEvent event)处理传感器数据（event.values数组包含各轴数据），onAccuracyChanged处理精度变化。rate指定采样频率（SENSOR_DELAY_FASTEST/GAME/UI/NORMAL）。④注销监听——在Activity的onPause中调用`sm.unregisterListener(listener)`释放传感器，避免持续耗电。注意事项：①传感器持续工作耗电量大，必须在onPause注销、onResume重新注册。②不同设备传感器支持不同，使用前应判断getDefaultSensor返回是否为null。③onSensorChanged在传感器线程回调，更新UI需用Handler切回主线程。④加速度传感器三轴数据values[0]=X、values[1]=Y、values[2]=Z，检测摇一摇可计算三轴加速度合力是否超阈值。",
    tags: ["传感器", "SensorManager", "加速度", "registerListener", "省电", "onPause"],
  },
];
