// JavaScript Document
//時・分・秒を取得する
date= new Date();
//date.setHours(8);
var hour = date.getHours();
var minute = date.getMinutes();
document.write("現在時刻："+hour+"時",+minute+"分");

//変数の定義
str = "";
result = new Array();
timetable = new Date();	
timetable2 = new Date();	

//Json読み込み
httpObj = new XMLHttpRequest();
httpObj.open("get", "./bus_timetable.json", true);
httpObj.onload = function(){
	//Jsonデータを配列に格納
	var myData = JSON.parse(this.responseText);
	for (var i=0; i < myData.length; i++){
		//配列にあるデータを区切り文字で区切りDateオブジェクトに変換ー＞現在時刻と比較を行う
		time_split = myData[i].toString().split(":");
		timetable.setHours(time_split[0]);
		timetable.setMinutes(time_split[1]);
		if(((date - timetable)/60/1000) < 10 && ((date - timetable)/60/1000) > -30 ){
			result.push(myData[i]+"-normal");
		}
	}
	
	//Json読み込み2
	httpObj2 = new XMLHttpRequest();
	httpObj2.open("get", "./twin_timetable.json", true);
	httpObj2.onload = function(){
		//Jsonデータを配列に格納
		var myData2 = JSON.parse(this.responseText);
		for (var i=0; i < myData2.length; i++){
			//配列にあるデータを区切り文字で区切りDateオブジェクトに変換ー＞現在時刻と比較を行う
			time_split2 = myData2[i].toString().split(":");
			timetable2.setHours(time_split2[0]);
			timetable2.setMinutes(time_split2[1]);
			if(((date - timetable2)/60/1000) < 10 && ((date - timetable2)/60/1000) > -30 ){
				result.push(myData2[i]+"-twin");
			}
		}
		//配列のソートー＞時刻順に並び変わる
		result.sort();


		//結果の出力
		for(var i=0;i < result.length;i++){
			str = str + result[i]+"<br>";
		}
		document.getElementById("result").innerHTML = str;
	}
	httpObj2.send(null);
}
httpObj.send(null);