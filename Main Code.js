const scriptName = "출첵2";

const Fs = FileStream;
const Path = "/sdcard/Attendance2/";

var file = {};
var arr = [];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
    if (room != "카톡봇 테스트방") return;
    
    if (msg == ".ㄹ") Fs.write(Path + room, "{}")
    if (msg == ".ㄹㅇ") {
      file = JSON.parse(Fs.read(Path + room));
      file["today"] = [];
          Fs.write(Path + room, JSON.stringify(file));
    }
    
    
    if (!Fs.read(Path + room)) Fs.write(Path + room, "{}");
    
    file = JSON.parse(Fs.read(Path + room));
    
    if (!JSON.parse(Fs.read(Path + room))) file = {};
    if (!JSON.parse(Fs.read(Path + room))["today"]) file["today"] = [];
    if (!JSON.parse(Fs.read(Path + room))["todayDate"])
      file["todayDate"] = new Date().getDate();
    if (!JSON.parse(Fs.read(Path + room))["total"]) file["total"] = [];
    
    Fs.write(Path + room, JSON.stringify(file));
    
    
    if (msg == ".ㅌ") {
      replier.reply(JSON.stringify(file, null, 4))
      replier.reply(JSON.stringify(file["total"].find(e => e.name == sender).score))
    
    }
    
    
    if (msg == ".ㅊㅊ") {

      if (file["todayDate"] != new Date().getDate()) {
        file["today"] = [];
        file["todayDate"] = new Date().getDate();
      }
      
      if (!file["today"].find(e => e.name == sender)) {
        
        var score = Math.floor(Math.random()*10) + 1;
        
        file["today"].push(
          {
            'name': sender,
            'time': time(),
            'point': score
          }
        );
        
        if (!file["total"].find(e => e.name == sender)) {
          
          file["total"].push(
            {
              'name': sender,
              'score': score
            }
          );
          
        } else {
          
          file["total"].find(e => e.name == sender).score += score;
        }
        
        
                
        replier.reply(
          ">" + sender + "님이\n" + file["today"].length + "등으로 출석하셨어요."
          + "\n\n출석 확인: " + time()
          + "\n얻은 점수: " + score);
          
          
          
        Fs.write(Path + room, JSON.stringify(file, null, 4));
          
      } else {
        
        replier.reply(sender + "님은 이미 출석하셨슴니다!"
          + "\n최근 출석: " + file["today"].find(e => e.name == sender).time);
      }
      
      
    }
    
    if (msg == ".오늘순위") {
      
      arr = [];
      
      for (i=0; i<file["today"].length; i++) {
        arr.push(
          (i+1).toString() + "등: " + file["today"][i].name
          + "\n시간:" + file["today"][i].time.split("일")[1]
        );
      }
      
      replier.reply("오늘순위\n\n" + arr.join("\n\n"));
    }
    
    if (msg == ".전체순위") {
      
      arr = file["total"].sort((a,b) => b.score-a.score).map((i) => i.name);
      
      var temp = [];
      for (i=0; i<arr.length; i++) {
        temp.push((i+1) + "등: " + arr[i]
        + "\n점수: " + file["total"].find(e => e.name == arr[i]).score);
      }
      
      replier.reply(temp.join("\n\n"));
    }
    
    if (msg == ".내순위") {
      
      arr = file["total"].sort((a,b) => b.score-a.score).map((i) => i.name);
      replier.reply(
        "이름: " + sender
        + "\n오늘 순위: "
          + (file["today"].indexOf(file["today"].find(e => e.name == sender)) +1) + "등 "
          + "(" + file["today"].find(e => e.name == sender).time.split("일 ")[1] + ")"
        + "\n전체 순위: "
          + (arr.indexOf(sender) +1) + "등 "
          +"(" + file["total"].find(e => e.name == sender).score + "점)"
      );
    }
    
  } catch(e) {
    replier.reply(e + e.lineNumber);
  }
}


function time() {
  var day = new Date();
  return ( 
   day.getDate() + "일 "+
    (day.getHours() > 12 ?
    "오후 " + (day.getHours() -12).toString() : day.getHours().toString()) )+ "시 "
    + day.getMinutes() + "분 "
    + day.getSeconds() + "초";
  
}
