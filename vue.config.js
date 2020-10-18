module.exports ={
    lintOnSave:'warning', //让eslint不报错，只警告
    devServer : { //配置端口号
        port: 666
    },
    chainWebpack: config => {       
        //配置别名
        config.resolve.alias
             .set('~v',__dirname+'/src/views')
             .set('~c',__dirname+'/src/components')
             .set('~r',__dirname+'/src/router')
             .set('~a',__dirname+'/src/assets')
             .set('~p',__dirname+'/src/plugin')
        config
          .plugin('html')
          .tap(args => {
            args[0].title=process.env.TITLE //配置项目title
            return args
          })
      }
}