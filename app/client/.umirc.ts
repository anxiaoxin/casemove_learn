const pxtorem = require('postcss-pxtorem');

export default {
    extraPostCSSPlugins: [
        pxtorem({
            rootValue: 75, //这里根据设计稿大小配置,一般是375
            exclude: /node_modules/i,
            propList: ['*']
         }),
    ]
}