/** 复习题库 · 使用intent拍照（bnrg-taking-pictures）。Big Nerd Ranch Guide 第 16 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgTakingPicturesQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bnrg-tp-1",
    chapter: "bnrg-taking-pictures",
    level: 1,
    question:
      "调用系统相机拍照的标准 action 是什么？完整写出创建拍照 intent 的 Kotlin 代码（含 EXTRA_OUTPUT）。",
    answer:
      "action 是 `MediaStore.ACTION_IMAGE_CAPTURE`（值为 `android.media.action.IMAGE_CAPTURE`）。\n\n```kotlin\nval captureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {\n    putExtra(MediaStore.EXTRA_OUTPUT, photoUri)  // FileProvider 生成的 content:// URI\n    addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)\n}\n```\n\n`EXTRA_OUTPUT` 指定照片写入位置；`FLAG_GRANT_WRITE_URI_PERMISSION` 临时授权相机 App 写入该 URI。",
    tags: ["ACTION_IMAGE_CAPTURE", "EXTRA_OUTPUT"],
  },
  {
    id: "bnrg-tp-2",
    chapter: "bnrg-taking-pictures",
    level: 1,
    question:
      "FileProvider 需要在 AndroidManifest 中配置哪三个关键属性？`file_paths.xml` 的作用是什么？",
    answer:
      "三个关键属性：① `android:authorities` —— 唯一标识符，通常为 `${applicationId}.fileprovider`；② `android:exported=\"false\"` —— 不允许外部 App 直接访问 Provider；③ `android:grantUriPermissions=\"true\"` —— 允许临时授权 URI 读写权限。\n\n`file_paths.xml` 定义哪些目录下的文件可以被 FileProvider 共享（如 `<cache-path>` 对应 `cacheDir`，`<external-files-path>` 对应 `getExternalFilesDir`）。",
    tags: ["FileProvider", "Manifest"],
  },

  // ── L2 理解 ──
  {
    id: "bnrg-tp-3",
    chapter: "bnrg-taking-pictures",
    level: 2,
    question:
      "为什么 Android 7.0 起禁止用 `file://` URI 跨 App 传文件？FileProvider 如何解决这个问题？",
    answer:
      "`file://` URI 暴露 App 私有目录的绝对路径（如 `/data/data/com.myapp/cache/photo.jpg`），其他 App 拿到路径后可以直接读写你的私有文件——严重安全漏洞。Android 7.0 起抛出 `FileUriExposedException` 强制禁止。\n\nFileProvider 把文件路径包装成 `content://` URI，并附带临时读写权限。相机 App 只能访问你授权的那一个文件，权限在 intent 结束后自动失效。",
    tags: ["FileProvider", "file://", "安全"],
  },
  {
    id: "bnrg-tp-4",
    chapter: "bnrg-taking-pictures",
    level: 2,
    question:
      "拍照 intent 不传 `MediaStore.EXTRA_OUTPUT` 和传了有什么区别？分别怎么获取照片？",
    answer:
      "不传 `EXTRA_OUTPUT`：相机返回 intent data 里一个压缩缩略图 Bitmap（通常几百像素），通过 `result.data?.extras?.get(\"data\")` 获取——模糊，不适合展示大图。\n\n传了 `EXTRA_OUTPUT` 并指定 FileProvider URI：相机 App 把**原始全分辨率 JPEG** 直接写入你指定的文件，intent data 里没有照片。你需要用之前保存的 `photoUri` 或 `photoFile` 路径，通过 `setImageURI()` 或 `BitmapFactory.decodeFile()` 读取。",
    tags: ["EXTRA_OUTPUT", "缩略图", "全分辨率"],
  },
  {
    id: "bnrg-tp-5",
    chapter: "bnrg-taking-pictures",
    level: 2,
    question:
      'Android 10 的 Scoped Storage 对「App 内拍照→展示」的流程有什么影响？还需要 `WRITE_EXTERNAL_STORAGE` 权限吗？',
    answer:
      "Scoped Storage 限制 App 访问公共外部存储的任意路径，但**不限制 App 访问自己的私有目录**（`cacheDir`、`getExternalFilesDir`）。FileProvider 共享的正是这些私有目录——完全不受 Scoped Storage 影响。\n\nApp 内拍照→展示不需要 `WRITE_EXTERNAL_STORAGE`。只有要把照片写入**公共相册**（系统图库可见）时才需要 MediaStore API。Android 13+ 读取公共相册改用 `READ_MEDIA_IMAGES` 细粒度权限。",
    tags: ["Scoped Storage", "权限"],
  },

  // ── L3 应用 ──
  {
    id: "bnrg-tp-6",
    chapter: "bnrg-taking-pictures",
    level: 3,
    question:
      "拍照成功后 `success == true`，但 ImageView 显示空白。代码里用了 `result.data?.extras?.get(\"data\") as Bitmap` 来取照片。最可能的原因是什么？怎么修？",
    answer:
      "原因：用了 `EXTRA_OUTPUT` 指定 FileProvider URI 后，相机 App 把全分辨率照片**直接写入文件**，intent data 的 extras 里没有缩略图 Bitmap。从 `result.data` 取到的自然是 null。\n\n修法：在发出 intent 前把 `photoUri`（或 `photoFile`）存为成员变量。回调里直接用 `binding.imageView.setImageURI(photoUri)` 或 `BitmapFactory.decodeFile(photoFile.absolutePath)` 读取文件。不要依赖 `result.data?.extras?.get(\"data\")`。",
    tags: ["排错", "EXTRA_OUTPUT", "回调"],
  },
];

export default bnrgTakingPicturesQuestions;
