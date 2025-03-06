const Path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(basedir, mode){
  let prodution = /^prod/.test(mode);
  a = {
    rules: [{
      test: /\.(sa|sc|c)ss$/,

      use: [
        prodution ? MiniCssExtractPlugin.loader : "style-loader",
        //MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: !prodution,
            importLoaders: true,
            url: false
          },
        },{
          loader: 'postcss-loader',
          options:{
            sourceMap: true, // Show resource full path
          }
        },{
          loader: 'sass-loader',
          options:{
            sourceMap: true,
            sassOptions: {
              sourceMap: true,
              sourceMapEmbed: true,
              includePaths:[Path.resolve(basedir, 'src', 'skin')]
            }
          }
        }
      ],
    },{
      test: /\.coffee$/,
      use: ["coffee-loader"],
    },{
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ["file-loader"]
    },{
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      use: ['url-loader']
    },{
      test: /babel(.*)\.js?$/,
      use: ['babel-loader']
    },{
      test: /\.(txt|text)$/i,
      use: ['raw-loader']
    },{
      test: /\.tpl$/,
      use: ['underscore-template-loader']
    },{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  };
  return a;
};
