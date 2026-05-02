module.exports = {
  apps: [
    {
      name: "quynguyen-app",
      script: "./backend-express/dist/index.js",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      watch: false,
      ignore_watch: ["node_modules", "frontend/node_modules", "logs", ".git"],
      max_restarts: 10,
      min_uptime: "10s",
      listen_timeout: 3000,
      kill_timeout: 5000,
      shutdown_with_message: true,
      autorestart: true,
      exp_backoff_restart_delay: 100,
      interpreter: "node",
      interpreter_args: "--max-old-space-size=1024",
    },
  ],
  deploy: {
    production: {
      user: "deploy",
      host: "your-server.com",
      ref: "origin/main",
      repo: "https://github.com/yourusername/quynguyen.git",
      path: "/var/www/quynguyen",
      "post-deploy":
        "yarn install && yarn build && pm2 restart ecosystem.config.js --env production",
    },
    staging: {
      user: "deploy",
      host: "staging-server.com",
      ref: "origin/develop",
      repo: "https://github.com/yourusername/quynguyen.git",
      path: "/var/www/quynguyen-staging",
      "post-deploy":
        "yarn install && yarn build && pm2 restart ecosystem.config.js --env development",
    },
  },
};
