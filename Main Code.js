const scriptName = "출첵";

const Fs = FileStream;
const Path = "/sdcard/attendance/";

var list = {};
var d_rank = 1;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  try{
  
  if (!Fs.read(Path + room)) {
    Fs.write(Path + room, "{}");
  }
  
  list = JSON.parse(Fs.read(Path + room));
  
  if (msg == ".ㅊㅊ") {
    
    //replier.reply(JSON.stringify(Fs.read(Path + room), null, 4));
    
    if (Object.keys(list).includes(sender)) {
      replier.reply("이미 출석체크를 하셨습니다!");
    } else {
      list[sender] = T();
      replier.reply(sender + "님이 " + d_rank + " 등으로 출석하셨습니다!");
      d_rank++;
    }
    
    Fs.write(Path + room, JSON.stringify(list));
  }
  
  if (msg == ".ㅊㅊ순위") {
    
    
    //replier.reply(JSON.stringify(list, null, 4));
    //replier.reply(Object.keys(list).length);
    
    var finalList = [];
    for (i=1; i<=Object.keys(list).length; i++) {
      finalList.push(
        i + "등: " + Object.keys(list)[i-1]
        + "("+list[Object.keys(list)[i-1]]+")");
    }
    
    replier.reply(
    "<출석 순위>\n\n"
    + finalList.join("\n"));
    
  }
  
  if (msg == ".ㅊㅊ리셋") {
    var list = {};
    d_rank = 1;
    Fs.write(Path + room, "{}");
    replier.reply("출석 목록을 제거하였습니다.");
  }
  
  
  
  
  
  } catch(e) {
    replier.reply(e+e.lineNumber);
  }
}

function T() {
  var day = new Date();
  return day.getHours() + "h" + day.getMinutes() + "m" + day.getSeconds() + "s";
}
