const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000
 },
  //This property defines where the application starts
  entry:'./src/js/app.jsx',
    
  //This property defines the file path and the file name which will be used for deploying the bundled file
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
    
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
        }]
    }
    ]
  },

  resolve: {
    fallback: {
      crypto: false
    }
  },


    
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: "./index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './services', to: './services'},{from: './assets', to: './assets'}]
    })
  ]
}