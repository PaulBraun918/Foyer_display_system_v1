var page_id = 0;
var timer;
var temp_array=[];
var page_count=0;
var same_events=[];
var showable_event_index=[];

function getcurrenttime()
{
	var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
    
    return dateTime;

}

function compare_time(current_time,start_time)
{

	var is_show=false;
	var n = current_time.localeCompare(start_time);
	if(n == -1)
		is_show = false;
	else
		is_show = true;

	return is_show;
}


function calc_showable_event_count(events)
{

	showable_event_index.length=0;

	var cur_time=getcurrenttime();
	for(var k = 0; k < events.length; k++)
	{
		if(events[k]["hide"]==0)
		{
			if ((compare_time(cur_time,events[k]["foyerEventStart"])) && !(compare_time(cur_time,events[k]["foyerEventEnd"])))
			{
				showable_event_index.push(k);
			};
		}
	}
}

function event_time_hour_min_sec(str)
{
	var result=str.split(" ");
	return result[1];
}
function return_event_only_start_time(events,etf)
{
	if(etf=="yyyy:mm:dd hh:mm:ss")
		return events["eventStart"];
	else
		return event_time_hour_min_sec(events["eventStart"]);
}
function return_event_start_and_end_time(events,etf,ietS)
{
	if(etf=="yyyy:mm:dd hh:mm:ss")
		return events["eventStart"]+ietS+events["eventEnd"];
	else
		return event_time_hour_min_sec(events["eventStart"])+ietS+event_time_hour_min_sec(events["eventEnd"]);
}

function show_page(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events,page_id)
{

	var time_for_page=tpp;
	var events_count=(events.length);

	var text;

	for(var i=page_id*epp;i<page_id*epp+Math.min(epp,events_count-page_id*epp);i++)
	{
		
		var eventLineOne=document.createElement("div");
		eventLineOne.setAttribute("class","eventLineOne");
		var text = document.createTextNode(events[i]["title1"]);
		eventLineOne.appendChild(text); 


		var eventLineTwo=document.createElement("div");
		eventLineTwo.setAttribute("class","eventLineTwo");
		text = document.createTextNode(events[i]["title2"]);
		eventLineTwo.appendChild(text); 


		var eventTime=document.createElement("div");
		eventTime.setAttribute("class","eventTime");
		if(iet==true)
		{
			text = document.createTextNode(return_event_start_and_end_time(events[i],etf,ietS));
		}
		else
		{
			text = document.createTextNode(return_event_only_start_time(events[i],etf));
		}
		eventTime.appendChild(text); 



		var eventRoom=document.createElement("div");
		eventRoom.setAttribute("class","eventRoom");
		var room_name;
		if(events[i]["roomName"]=="")
		{
			var result=events[i]["roomNames"].split(",");
			room_name=result[0];
		}
		else
		{
			room_name=events[i]["roomName"];
		}
		text = document.createTextNode(room_name);
		eventRoom.appendChild(text); 


		var eventArrow=document.createElement("div");
		eventArrow.setAttribute("class","eventArrow");
		var image=document.createElement("div");
		image.setAttribute("class","arrow");
		var image_inside=document.createElement("div");
		image_inside.setAttribute("class","arrow");
		image.appendChild(image_inside);

		var fileName;
		if(events[i]["alternateDirections"]==1)
		{
			fileName="arrows/"+events[i]["arrowNameAlt"]+".png";
		}
		else
		{
			fileName="arrows/"+events[i]["arrowName"]+".png";
		}

		image.setAttribute("style","background-image:url("+fileName+")");
		image_inside.setAttribute("style","background-image:url("+fileName+")");
		eventArrow.appendChild(image);


		var eventText=document.createElement("div");
		eventText.setAttribute("class","eventText");
		var txt;
		if(events[i]["alternateDirections"]==1)
			txt=events[i]["textAlt"];
		else
			txt=events[i]["text"];
		text = document.createTextNode(txt);
		eventText.appendChild(text);


		var eventLogo=document.createElement("div");
		eventLogo.setAttribute("class","eventLogo");
		
		if(events[i]["logoHide"]!=1)
		{
			var logo=document.createElement("div");
			var logo_inside = document.createElement("div");
			logo.appendChild(logo_inside)

			images = "img/";
			var logoJpgFile=images + events[i]["id"]+".jpg";
			var logoPNGFile=images + events[i]["id"]+".png";
			
			logo.setAttribute("class","eventLogoImg ");
			logo.setAttribute("style","background-image:url(" + logoJpgFile + ")");
			
			logo_inside.setAttribute("class","eventLogoImg ps0");
			logo_inside.setAttribute("style","background-image:url(" + logoPNGFile + ")");
			
			
			eventLogo.appendChild(logo);
			
		}


		var container=document.createElement("div");
		container.setAttribute("class","evtCont container");
		container.appendChild(eventLineOne);
		container.appendChild(eventLineTwo);
		container.appendChild(eventTime);
		container.appendChild(eventRoom);
		container.appendChild(eventArrow);
		container.appendChild(eventText);
		container.appendChild(eventLogo);

		if(evd =="evtCont")
		{
			var row=document.createElement("div");
			row.setAttribute("class", "row"+"-"+page_id+" created");
			row.setAttribute("style","display:none;");
			row.appendChild(container);

			document.body.appendChild(row);
		}
		else
		{
			var rowAlt=document.createElement("div");
			rowAlt.setAttribute("class", "rowAlt"+"-"+page_id+" created");
			rowAlt.setAttribute("style","display:none;");
			rowAlt.appendChild(container);

			document.body.appendChild(rowAlt);

		}
	}

	var class_n=".rowAlt-"+page_id;
	$(class_n).children().children().css("display","none");


	show_event_divs(epp,evd,events,fade,fadeTime);

	setTimeout(function(){hide_page(page_id,evd);},1000*(tpp+fadeTime*epp)-100);
}

function show(epp,tpp,toe,evd,events,turl,fade,fadeTime,iet,ietS,etf)
{
	
	if(etf == undefined)
	{
		etf = "hh:mm:ss";
	}
	if(fade == undefined)
	{
		fade = false;
	}
	if(fadeTime == undefined)
	{
		fadeTime = 4;
	}
	if(iet == undefined)
	{
		iet = false;
	}
	if(ietS == undefined)
	{
		ietS = " ";
	}
	if(turl == undefined)
	{
		turl = "http://127.0.0.1:5555/zone=myzone";
	}

	var events_count=showable_event_index.length;

	page_count=Math.ceil(events_count/epp);
	
	show_page(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events,page_id);

	var timer_id=setInterval(function(){
		if(page_id<page_count-1)
		{
			page_id = page_id + 1;
			show_page(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events,page_id);
		}
		else
		{
			if(toe == true)
			{
				clearInterval(timer_id);
				window.location.href = turl;
			}
			else
			{
				page_id = 0;
				clearInterval(timer_id);
			}
		}
	}
		,1000*(tpp+fadeTime*epp));
}

function float2int (value) {
    return value | 0;
}

function hide_page(page_id,evd)
{
	
	if(evd == "evtCont")
	{
		var className=".row-"+page_id;
		$($(className)).remove();
	}
	else
	{
		var className=".rowAlt-"+page_id;
		$($(className)).remove();
	}
}

function modify_events(epp,tpp,toe,evd,events,turl,fade,fadeTime,iet,ietS,etf)
{

	clear_all_events();

	temp_array.length=0;

	same_events=events;

	calc_showable_event_count(events);


	for(var index=0;index<showable_event_index.length;index++)
	{
		temp_array.push(events[showable_event_index[index]]);
	}
	

	events=temp_array;
	show(epp,tpp,toe,evd,events,turl,fade,fadeTime,iet,ietS,etf);
	events = same_events;

	var time_refresh=1000*(tpp+fadeTime*epp)*page_count+10;
  	setTimeout(function(){modify_events(epp,tpp,toe,evd,events,turl,fade,fadeTime,iet,ietS,etf);},time_refresh);

}

function show_event_divs(epp,evd,events,fade,fadeTime)
{

	for( var index = 0 ; index < events.length; index++)
	{
		var page_num = float2int(index / epp);
		var div_index = index % epp;
		if(fade == true)
		{
			if(evd == "evtCont")
			{
				var class_n=".row-"+page_num;
				$($(class_n)[div_index]).delay(1000*fadeTime*(index % epp));
				$($(class_n)[div_index]).fadeIn(1000*fadeTime);

			}
			else
			{
				var class_n=".rowAlt-"+page_num;

				$($(class_n)[div_index]).delay(1000*fadeTime*(index % epp));
				$($(class_n)[div_index]).fadeIn(1000*fadeTime);

			    var children_array=$($(class_n)[div_index]).children().children();
				var children_count=children_array.length;
		
			    for(var child_index=0; child_index<children_count;child_index++)
				{
					$(children_array[child_index]).delay(800*child_index+1000*fadeTime*(index %epp));
					$(children_array[child_index]).fadeIn(100);
				}
			}
		}
		else
		{
			if(evd == "evtCont")
			{
				var class_n=".row-"+page_num;
				$($(class_n)).fadeIn(0);
			}
			else
			{
				var class_n=".rowAlt-"+page_num;
				$($(class_n)).fadeIn(0);
			}	
		}
	}
}

function return_showable_page_counts(epp,events)
{
	calc_showable_event_count(events);
	return Math.ceil(showable_event_index.length/epp);
}

function clear_all_events()
{
	var ele = $(".created");
	if(ele!=null)
	{
		ele.remove();
	}
}