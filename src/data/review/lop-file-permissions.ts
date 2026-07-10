import type { ReviewQuestion } from "./types";

export const lopFilePermissionsQuestions: ReviewQuestion[] = [
  {
    id: "lop-file-permissions-1",
    chapter: "lop-file-permissions",
    level: 2,
    question: `解释 \`drwxr-xr--\` 每一位的含义，并算出对应的数字权限。`,
    answer:
      `\`d\` 表示文件类型为目录（\`-\` 为普通文件）。随后三组 \`rwx\` 分别对应所有者(user)、组(group)、其他(other)：\`rwx\` = 所有者可读可写可进入；\`r-x\` = 组成员可读可进入但不可写；\`r--\` = 其他用户只读。数字权限：r=4, w=2, x=1，按组求和。rwx=7, r-x=5, r--=4，所以数字表示为 \`754\`。用 \`chmod 754 dir\` 设置。`,
    tags: ["权限", "rwx"],
  },
  {
    id: "lop-file-permissions-2",
    chapter: "lop-file-permissions",
    level: 2,
    question: `rwx 权限对文件和目录的含义有什么不同？`,
    answer:
      `r(read)：文件→可读取内容（cat）；目录→可列出目录内文件名（ls）。w(write)：文件→可修改内容（echo >）；目录→可在目录内增删文件（touch/rm），因为目录本质是文件名列表。x(execute)：文件→可作为程序执行（./script）；目录→可进入该目录（cd）并访问其中文件的 inode。关键区别：目录的 w 控制的是「能否增删目录项」，不是修改文件内容；目录的 x 是「能否进入」而非「能否执行」。`,
    tags: ["权限", "目录"],
  },
  {
    id: "lop-file-permissions-3",
    chapter: "lop-file-permissions",
    level: 3,
    question: `ACL 相比传统 UGO 权限模型有什么优势？如何使用？`,
    answer:
      `传统 UGO 只有所有者/组/其他三组权限，无法对「特定用户」单独授权。ACL（Access Control List）突破此限制，可为任意单个用户或组设置独立权限。设置：\`setfacl -m u:alice:rw file\` 给用户 alice 读写权限；\`setfacl -m g:dev:r file\` 给 dev 组读权限。查看：\`getfacl file\`。移除：\`setfacl -x u:alice file\`。典型场景：一个文件需要让 5 个不同用户有不同权限，UGO 做不到，ACL 可以。ACL 是 UGO 的精细化补充，不替代而是叠加。`,
    tags: ["ACL", "setfacl"],
  },
  {
    id: "lop-file-permissions-4",
    chapter: "lop-file-permissions",
    level: 3,
    question: `\`chmod u+x,g-w file\` 是什么意思？符号法相比数字法有什么优势？`,
    answer:
      `\`chmod u+x,g-w file\` 用符号法修改权限：\`u+x\` 给所有者(user)增加执行权限，\`g-w\` 给组(group)去除写权限。符号法格式为 \`身份(ugoa) 操作(+-=) 权限(rwx)\`。相比数字法 \`chmod 754\`，符号法的优势是「增量修改」——不需要知道当前权限的完整状态，只改动指定位。数字法需要计算完整的 3 位八进制数覆盖全部权限，适合从头设置；符号法适合微调现有权限。例如只想给所有者加执行权限，\`u+x\` 比 \`chmod 755\`（需先知道当前是 644）更安全直观。`,
    tags: ["chmod", "符号法"],
  },
];
