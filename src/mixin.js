import instance from './plugin/instance';
import 'simba-awesome-js';
import md5 from 'md5';
import KEY_WORDS from'~p/myvariable.js';
export default {
    data() {
        return {
            KEY_WORDS 
        }
    },
    methods: {
        $absoultSrc(src){
            return  KEY_WORDS.STATIC_SRC+src //加this表示从data中获取，不加就直接从引的文件中获取，都可以
        },
        $welcomeMsg(){
            var now = new Date().getHours()
            var msg=''  
            if (now>=6 && now<=11) {
                msg = '上午好'
            } else if(now>11 && now<14) {
                msg = '中午好'
            }else if(now>=14 && now<=17){
                msg = '下午好'
            }else{
                msg = '晚上好'
            }          
           return this.$message.success(`欢迎回来,${msg}`);
        },
        $encrypt(str){
            return md5(md5(str.toUpperCase().reverse()+'simba').toUpperCase().reverse())      
        },
        $setColCenter(columns){
            columns.forEach(item => {
                 item.align='center'
            });
            return columns
        },
        $get(url,params){
           return instance.get(url,{
                params
           })
        },
        $post(url,params){
            return instance.post(url,params)
        },
        $mc(title,content){ //此时$mc()方法是个promise对象
           return new Promise((resolve) => {
                this.$confirm({
                    title,
                    content,
                    okText:'确定',
                    cancelText:'取消',
                    onOk(){
                        resolve() //只有点击确定按钮时才调用resolve,组件中的await后的代码才走
                    }
                 });
            })          
        }
    },
}