// pm2 进程定义 — 由 deploy.sh rsync 到 /var/www/remuse/，在服务器上执行
// 内部端口 3100，仅监听回环；公网由 nginx 反代 + TLS（见 deploy/blog.luozichu.ink.conf）
module.exports = {
  apps: [
    {
      name: "remuse",
      script: "server.js", // Next.js standalone 产物入口
      cwd: "/var/www/remuse/current",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3100,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "512M",
      time: true, // 日志加时间戳
    },
  ],
};
