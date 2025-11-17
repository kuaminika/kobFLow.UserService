module.exports = {
  apps: [
    {
      name: "UserService",
      script: "src/index.js",

      // Load .env created by GitHub Actions
      env_file: ".env",

      // Basic runtime configurations
      instances: 1,            // or "max" to scale
      exec_mode: "fork",       // or "cluster"
      watch: false,            // pm2 should not watch in production
      autorestart: true,
      max_memory_restart: "300M",

     
    }
  ]
};
