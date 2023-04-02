//tovabbra is szar az egesz
//nem irja az a bufeClosed erteket

import { bufeClosed } from "$lib/stores/BufeClosed.js";

function isWeekend(dayOfWeek) {
  	return dayOfWeek === 0 || dayOfWeek === 6;
}

function getMinutesUntil(date) {
  	const now = new Date();
  	return Math.floor((date - now) / 60000);
}

function getMessage() {
  	const now = new Date();
  	const dayOfTheWeek = now.getDay();
  	const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0);
  	const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0, 0);
  
  	if (isWeekend(dayOfTheWeek)) {
    	bufeClosed.set(1);
    	return "hetvege";
  	} else if (zaras - now <= 0) {
    	bufeClosed.set(1);
    	return "closed";
  	}
  
  	const minutesUntil = getMinutesUntil(zaras);
  
  	if (minutesUntil <= 60) {
    	bufeClosed.set(0);
  	}
  
  	if (minutesUntil <= 10) {
  	  	return "10minLeft";
  	} else if (minutesUntil <= 20) {
  	  	return "20minLeft";
  	} else if (minutesUntil <= 30) {
  	  	return "30minLeft";
  	} else if (minutesUntil <= 60) {
  	  	return "60minLeft";
  	} else if (nyitas - now <= now) {
  	  	bufeClosed.set(0);
  	  	return "nyitva";
  	}
}

export function GET() {
  	const message = getMessage();
  
  	const body = JSON.stringify({ message });
  	const headers = { "Content-Type": "application/json" };
  	const response = new Response(body, { headers });
  
  	return response;
}