//Print object
function print(objeto){
    console.log(objeto);
}

/*Data
* what: "data", "hora", "datahora", "horadata"
*/
function getNow(what){
    var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
    dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
    curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = null;

    switch(what)
    {
        case "data":
            today = dayOfMonth + "/" + curMonth + "/" + curYear;
            break;
        case "hora":
            today = curHour + ":" + curMinute + "." + curSeconds;
            break;
        case "datahora":
            today = dayOfMonth + "/" + curMonth + "/" + curYear + " " + curHour + ":" + curMinute + ":" + curSeconds + " " +curMeridiem ;
            break;
        case "horadata":
            today = curHour + ":" + curMinute + ":" + curSeconds+" "+ curMeridiem +" "+" "+dayOfMonth + "/" + curMonth + "/" + curYear;
            break;
        default:
            today =  curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
    }
    return today;
}//fim getNow

function findObjectInArray(arr, attr, value){
    for(var i = 0; i < arr.length ; i++){
        var object = arr[i];
        if (typeof(eval("object."+attr)) !== 'undefined'){
            if(eval("object."+attr) == value){
                return object;
            }
        }else{
            return false;
        }
    }
    return false;
}//fim findPropertyInArray

function findListInArray(arr, attr, value){
    var list = [];
    for(var i = 0; i < arr.length ; i++){
        var object = arr[i];
        if (typeof(eval("object."+attr)) !== 'undefined'){
            if(eval("object."+attr) == value){
                list.push(object);
            }
        }else{
            return false;
        }
    }
    return list;
}//fim findPropertyInArray

function setData(name,value) {
    window.localStorage.setItem(name,value);
    if(window.localStorage.getItem(name) != value){
        var days = 1;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
}

function getData(name) {
    if(window.localStorage.getItem(name) != undefined && window.localStorage.getItem(name) != null){
        return window.localStorage.getItem(name);
    }else{
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
}

function deleteData(name) {
    //setCookie(name,"",-1);
}