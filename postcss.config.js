module.exports = {
    plugins: [
        require('autoprefixer')({
        	browsers: "> 0.5%, last 2 versions, Firefox ESR"
            // 默认配置 : "> 0.5%, last 2 versions, Firefox ESR, not dead"
        }),
        // require('cssnano')({zindex: false, reduceIdents: false})
    ]
}
