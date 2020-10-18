import moment from 'moment';
export default {
   /*  Vue.filter('fmtTime', function(val){     由于不想再为他引个vue，所以换个写法
        // let d=new Date(val) //将val转为时间
       //  return d.toLocaleString() 方式一
        return moment(val).format('YYYY-MM-DD HH:mm:SS') //分钟用小写防止与月份的MM冲突
    }) */
 
    /* fmtTime (val){
        return moment(val).format('YYYY-MM-DD HH:mm:SS')
    } //可简写为箭头函数 */

    fmtTime: val=>moment(val).format('YYYY-MM-DD HH:mm:SS')
}