var page_id=0;
var showable_event_index=[];

function getcurrenttime()
{
	var d = new Date();
	var year=d.getFullYear();
	var month=d.getMonth();
	var date=d.getDate();
	var hour=d.getHours();
	var minute=d.getMinutes();
	var sec= d.getSeconds();
	var current_time=year+"-"+month+"-"+date+" "+ hour+":"+minute+":"+sec;
	
	return current_time;

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
	
	var len=(events.length);
	var cur_time=getcurrenttime();
	for(var k = 0; k < len; k++)
	{
		if (compare_time(cur_time,events[i]["eventStart"])) 
		{
			showable_event_index.push(k);
		};
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
	getcurrenttime();

	var events_per_page=epp;
	var time_for_page=tpp;
	var event_add_or_remove=evd;
	var trigger_on_end=toe;
	var events_count=(events.length);

	var text;

	for(i=page_id*events_per_page;i<page_id*events_per_page+Math.min(events_per_page,events_count-page_id*events_per_page);i++)
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
			row.setAttribute("class", "row"+"-"+page_id);
			if(fade==true)
			{
				row.setAttribute("style","display:none;");	
			}
			row.appendChild(container);

			document.body.appendChild(row);
		}
		else
		{
			var rowAlt=document.createElement("div");
			rowAlt.setAttribute("class", "rowAlt"+"-"+page_id);
			if(fade==true)
			{
				rowAlt.setAttribute("style","display:none;");
			}
			rowAlt.appendChild(container);

			document.body.appendChild(rowAlt);

		}
	}
	if(fade == true)
	{
		if(evd == "evtCont")
		{
			var class_name=".row"+"-"+page_id;
			$(class_name).fadeIn(1000*fadeTime);		
		}
		else
		{
			var class_name=".rowAlt"+"-"+page_id;
			$(class_name).fadeIn(1000*fadeTime);
		}
	}
	
	setTimeout(function(){hide_page(page_id,evd);},1000*(tpp+fadeTime));
}

function show(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events)
{
	var events_per_page=epp;
	var events_count=(events.length);
	var page_count=float2int(events_count/(events_per_page))+1;
	show_page(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events,page_id);

	page_id++;
	var timer_id=setInterval(function(){show_page(epp,tpp,toe,turl,evd,fade,fadeTime,iet,ietS,etf,events,page_id);
		if(page_id<page_count-1)
		{
			page_id++;	
		}
		else
		{
			if(toe==true)
			{
				clearInterval(timer_id);
				setTimeout(function(){window.location.href = turl;},1000*(tpp+fadeTime));
			}
			else
			{
				page_id=0;
			}
		}

	},1000*(tpp+fadeTime));
	
}

function float2int (value) {
    return value | 0;
}

function hide_page(page_id,evd)
{
	
	if(evd == "evtCont")
	{
		var className=".row-"+page_id;
		$(className).remove();
	}
	else
	{
		var className=".rowAlt-"+page_id;
		$(className).remove();
	}
}