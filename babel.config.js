module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: true,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime']
};
