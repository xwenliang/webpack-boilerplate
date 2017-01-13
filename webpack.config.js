const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const args = process.argv;
const path = require('path');


// function WebpackFtpDeploy(){

// };

// WebpackFtpDeploy.prototype.apply = function(compiler){
//     compiler.plugin('emit', function(compilation, callback){
//         console.dir(compilation.assets);
//     });
// }


const config = {
    entry: {
        page1: './src/page1/page1',
        page2: './src/page2/page2',
        page3: './src/page3/page3',
        page4: './src/page4/page4',
        common: [
            './src/vendor/vendor1',
            './src/vendor/vendor2',
            './src/vendor/vendor3',
            'lodash'
        ]
        // common: [
        //     './src/vendor/vendor1.css',
        //     './src/vendor/vendor2.css',
        //     './src/vendor/vendor3.css',
        // ]
    },
    // ensure entry files hash not to change when delete or add entry files
    recordsPath: 'webpack.records.json',
    output: {
        filename: '[name]_[chunkhash:10].js',
        path: path.join(__dirname, 'build')
    },
    module: {
        rules: [
            // js
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // css
            {
                test: /\.css$/,
               // use: ['style-loader', 'css-loader']
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                           //  options: {
                           //     modules: true,
                           //     importLoaders: 1,
                           //     localIdentName: '[hash:base64:5]'
                           // }
                       }
                    ]
                })
            },
            // images, set inlining files below some size
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 10,//B
                    name: './images/[name]_[hash:10].[ext]'
                }
            }
            // images
            // {
            //     test: /\.(jpg|png)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name]_[hash:10].[ext]'
            //     }
            // }
        ]
    },
    plugins: [
        // my plugin
        //new WebpackFtpDeploy(),
        // use hashedModuleId
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 10
        }),

        // use file path as moduleId
        // new webpack.NamedModulesPlugin({
        //     //hashDigestLength: 10
        // }),

        // extract common codes
        new webpack.optimize.CommonsChunkPlugin({
            // point the output file, from entry's key
            names: ['common', 'manifest']
        }),


        // auto inject js / css ..
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/page1.html',
            // inject modules from entry's key
            chunks: ['manifest', 'common', 'page1'],
            filename: './page1-deploy.html',
            path: path.join(__dirname, 'build')
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/page2.html',
            // inject modules from entry's key
            chunks: ['manifest', 'common', 'page2'],
            filename: './page2-deploy.html',
            path: path.join(__dirname, 'build')
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/page3.html',
            // inject modules from entry's key
            chunks: ['manifest', 'common', 'page3'],
            filename: './page3-deploy.html',
            path: path.join(__dirname, 'build')
        }),


        new ExtractTextPlugin({
            // but the hash was js's....(use contenthash instead chunkhash will avoid this problem)
            filename: '[name]_[contenthash:10].css',
            allChunks: true
        }),

        //new webpack.optimize.UglifyJsPlugin()
    ]
    // use webpack-dev-server command will use this config
    // devServer: {
    //     contentBase: path.join(__dirname, 'build'),
    //     compress: true,
    //     port: 9000
    // }
};

// if (args.join('').indexOf('-dev') === -1 ){
//     config.plugins = [
//         new webpack.optimize.UglifyJsPlugin()
//     ];
// }


let compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function(err, stats){
    //console.log(err, stats);
});

// compiler.apply(new webpack.ProgressPlugin(function(percentage, msg) {
//   console.log((percentage * 100) + '%', msg);
// }));



// let server = new WebpackDevServer(compiler, {
//     contentBase: path.join(__dirname, 'build'),
//     compress: true,
//     hot: true,
//     stats: { colors: true },
//     setup: function(app){
//         app.get('/new', function(req, res){
//             res.json({'abc': 123})
//         });
//     }
// });

// server.listen(9000);


module.exports = config;