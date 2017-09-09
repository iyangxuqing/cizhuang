/**
 * 调用：
 * var time1 = new Date().Format("yyyy-MM-dd");
 * var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
 */
Date.prototype.Format = function (format) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}

String.prototype.szTime = function () {
  let strtime = this
  let strtimes = strtime.split(/[.:\s]/)
  let year = strtimes[0]
  let month = strtimes[1] - 1
  let day = strtimes[2]
  let hour = strtimes[3] || 0
  let minute = strtimes[4] || 0
  let second = strtimes[5] || 0
  let time = new Date(year, month, day, hour, minute, second)
  let diff = Date.now() - time.getTime()
  if (diff < 24 * 3600 * 1000) {
    if (time.getDay() == new Date().getDay()) {
      strtime = '今天'
    } else {
      strtime = '1天前'
    }
  } else if (diff <= 30 * 24 * 3600 * 1000) {
    strtime = Math.floor(diff / (24 * 3600 * 1000)) + '天前'
  }
  return strtime
}
