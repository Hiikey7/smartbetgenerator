module.exports = {
  apps: [
    {
      name: "smartbets-backend",
      script: "./backend/server.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "smartbets-frontend",
      script: "serve",
      cwd: "./frontend",
      args: "-s dist -l 8080",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
