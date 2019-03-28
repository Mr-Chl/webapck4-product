function getEnv() {
    const target = process.env.npm_lifecycle_event;
    switch (target) {
      case "start":
        return "development";
  
      case "build":
        return "production";
  
      default:
        return "development";
    }
}

module.exports = getEnv;