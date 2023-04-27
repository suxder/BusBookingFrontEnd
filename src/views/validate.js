
 //在js文件中写一个身份校验的方法，在需要身份校验的vue组件中导入这个js文件，调用暴露出去的校验方法。传入的参数为用户输入的身份证号
//校验身份证号
export function isIdentityId(identityId) {
    var patrn = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;//长度或格式校验
    //地区校验
    var aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    // 出生日期验证
    var sBirthday = (
      identityId.substr(6, 4) +
      "-" +
      Number(identityId.substr(10, 2)) +
      "-" +
      Number(identityId.substr(12, 2))
    ).replace(/-/g, "/"),
      d = new Date(sBirthday)
    // 身份证号码校验 最后4位  包括最后一位的数字/字母X
    var sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = "10X98765432";
    for (var i = 0; i < identityId.length - 1; i++) {
      sum += identityId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  
    var errorMsg = "";
    if (identityId === "") {
      errorMsg = "身份证号不能为空"
    } else if (!patrn.exec(identityId)) {
      errorMsg = "你输入的身份证长度或格式错误"
    } else if (!aCity[parseInt(identityId.substr(0, 2))]) {
      errorMsg = "你的身份证地区非法"
    } else if (sBirthday != d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) { errorMsg = "身份证上的出生日期非法" } else if (identityId[identityId.length - 1] != last) {
      errorMsg = "你输入的身份证号非法"
    }
    return errorMsg;
  }


  export function isTel(tel) {
    var isMobile = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/;
    var errorMsg = "";
    if (tel === "") {
      errorMsg = "电话号不能为空"
    } else if (!isMobile.exec(tel)) {
      errorMsg = "你输入的电话号长度或格式错误"
    } 
    return errorMsg;
  }

  