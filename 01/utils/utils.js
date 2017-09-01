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

String.prototype.szTime = function() {
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

String.prototype.json = function () {
  let value = this
  let temp = ''
  for (let i = 0; i < value.length; i++) {
    let char = value[i]
    let ascii = value.charCodeAt(i)
    if (ascii === 0) char = 'u0000' //null
    else if (ascii === 8) char = 'u0008' //回退符 \b
    else if (ascii === 9) char = 'u0009' //制表符 \t
    else if (ascii == 10) char = 'u000A' //换行符 \r
    else if (ascii == 11) char = 'u000B' //制表符 \v
    else if (ascii == 12) char = 'u000C' //换页符 \f
    else if (ascii == 13) char = 'u000D' //回车符 \n
    // else if (ascii == 34) char = 'u0022' //双引号 \"
    // else if (ascii == 39) char = 'u0027' //单引号 \'
    else if (ascii == 92) char = 'u005C' //反斜杠 \\
    temp += char
  }
  try {
    let object = JSON.parse(temp, function (key, val) {
      if (key === '') return val
      if (typeof val == 'string') {
        val = val.replace(/u0000/g, '\0')
        val = val.replace(/u0008/g, '\b')
        val = val.replace(/u0009/g, '\t')
        val = val.replace(/u000A/g, '\n')
        val = val.replace(/u000B/g, '\v')
        val = val.replace(/u000C/g, '\f')
        val = val.replace(/u000D/g, '\n')
        val = val.replace(/u0022/g, '"')
        val = val.replace(/u0027/g, "'")
        val = val.replace(/u005C/g, '\\')
      }
      return val
    })
    return object
  } catch (e) {
    console.log(e)
    return ''
  }
}