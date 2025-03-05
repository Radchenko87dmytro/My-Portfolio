module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const minimizerIndex = webpackConfig.optimization.minimizer.findIndex(
        (plugin) => plugin.constructor.name === "CssMinimizerPlugin"
      );
      if (minimizerIndex !== -1) {
        webpackConfig.optimization.minimizer.splice(minimizerIndex, 1); // Remove the minimizer
      }
      return webpackConfig;
    },
  },
};
