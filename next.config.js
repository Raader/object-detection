module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/detection",
        destination: "https://api.openvisionapi.com/api/v1/detection",
      },
    ];
  },
};
