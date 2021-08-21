const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const data = require('./data/people.json');

/////////////////////////////////// NEW //////////////////////////////////
module.exports = {
    entry:{
        index:'./ts-code/index.ts'
        // footer:'./ts-code/components/footer.ts'
    },  
    output:{
        filename:'[name].bundle.js',
        path:`${__dirname}/public`
    },
    plugins:[

        ///////////////////////////////////////
        new HtmlWebpackPlugin({
            filename:'index.html',
            inject:'body',
            chunks:['index'],
            templateParameters:data,
            template:'./templates/index.hbs',
        }),

        new MiniCssExtractPlugin({
            filename:`[name].css`,
            chunkFilename: '[name]'
        }),

        ////////////////////////////////////////

        new HtmlWebpackPlugin({
            filename:'footer.html',
            template:'./templates/components/footer/footer.hbs',
            inject:'body',
            chunks:['footer']
        })
    ],
    module:{
        rules:[
            {
                test:/\.hbs$/,
                loader:'handlebars-loader'
            },
            {
                test:/\.tsx?$/,
                use:'ts-loader',
                exclude:'/node_modules/'
            },
            {
                test: /\.scss$/i,
                use: [
                    
                    MiniCssExtractPlugin.loader, //3. Inject into chunk file
                    
                    "css-loader", // 2. Turn css into commonjs code
                    
                    "sass-loader", // 1. Turns scss into css code
                  ]
            }
        ]
    },
    resolve:{
        extensions:[
            '.tsx',
            '.ts',
            '.js'
        ]
    }
}