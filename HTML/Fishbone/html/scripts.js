var p = 1;


function to_currentsong() {
	if (window.location.hash == '' || navigator.appName=="Microsoft Internet Explorer") {
		window.location.hash = 'currentsong';
	}
}

function openRemote(player,playername)
{
	window.open('status.html?player='+player+'&refresh=1', playername, 'width=500,height=270');
}

function setCookie(name, value)
{
	var expires = new Date();
	expires.setTime(expires.getTime() + 1000*60*60*24*365);
	document.cookie =
		name + "=" + escape(value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString()));
}

function checkReload()
{
			if (parent.playlist.location != '') parent.playlist.location.reload(true);
}

var p = 1;
// Update the progress dialog with the current state
function ProgressUpdate(mp,_progressEnd,_progressAt) 
{
	if (mp)_progressAt++;
	if(_progressAt > _progressEnd) _progressAt = _progressAt % _progressEnd;
	if (document.all) //if IE 4+
	{
		p = (document.body.clientWidth / _progressEnd) * _progressAt;
		//document.all.progressBar.innerWidth = p+" ";
		eval("document.progressBar.width=p");
	}
	else if (document.getElementById) //else if NS6+
	{
		p = (document.width / _progressEnd) * _progressAt;
		document.getElementById("progressBar").width=p+" ";
		//eval("document.progressBar.width=p");
	}
	setTimeout("ProgressUpdate("+mp+","+_progressEnd+","+_progressAt+")", 1000);
}

function Click(mp,end,at) 
{
	var s = '';
	if (!mp) s = '_s';
	if (document.all||document.getElementById)
	document.write('<table border="0" cellspacing="0" cellpadding="0"><td height="5"><img id="progressBar" name="progressBar" src="html/images/pixel.green'+s+'.gif" width="1" height="5"></td></table>');
	ProgressUpdate(mp,end,at)
}

function getArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}

function getPlayer(Player) 
{
	var search = Player + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
	return "";
}

function goHome(plyr)
{
	var loc = getHomeCookie('SlimServer-Browserpage')+'&player='+plyr;
	parent.browser.location = loc;
}

function getHomeCookie(Name) 
{
	var search = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			url = unescape(document.cookie.substring(offset, end));
			if (url == 'undefined') return "browsedb.html?hierarchy=album,track&level=0&page=BROWSE_BY_ALBUM";
			return url;
		}
	}
	return "browsedb.html?hierarchy=album,track&level=0&page=BROWSE_BY_ALBUM";
}

var selectedLink;

function selectLink(lnk) {

	if (selectedLink) selectedLink.style.fontWeight='normal';

	lnk.style.fontWeight='bold';

	selectedLink=lnk;
}

var homeLink;

function setLink(lnk,plyr) {

	lnk.href = getHomeCookie('SlimServer-Browserpage')+'&player='+plyr;

	homeLink=lnk;
}