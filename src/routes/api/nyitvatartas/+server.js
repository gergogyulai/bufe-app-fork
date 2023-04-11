import singletonStore from '$lib/stores/Nyitvatartas.js';

function isWeekend(dayOfWeek) {
  	return dayOfWeek === 0 || dayOfWeek === 6;
}

function getMinutesUntil(date) {
  	const now = new Date();
  	return Math.floor((date - now) / 60000);
}

function getMessageForMinutesLeft(minutesUntil) {
  	if (minutesUntil <= 10) {
    	return "10minLeft";
  	} else if (minutesUntil <= 20) {
    	return "20minLeft";
  	} else if (minutesUntil <= 30) {
    	return "30minLeft";
  	} else if (minutesUntil <= 60) {
    	return "60minLeft";
  	} else {
    	return "nyitva";
  	}
}

function getMessage() {
  	const now = new Date();
  	const dayOfTheWeek = now.getDay();

  	let storeState;
  	singletonStore.subscribe(value => {
  	  	storeState = value;
  	});

  	const nyitasValue = storeState.nyitasIdo[0];
  	const zarasValue = storeState.zarasIdo[0];

  	const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nyitasValue.hours, nyitasValue.minutes, 0);
  	const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), zarasValue.hours, zarasValue.minutes, 0);

  	console.log("nyitas object:", nyitas);
  	console.log("zaras object:", zaras);

  	if (isWeekend(dayOfTheWeek)) {
  	  	return "hetvege";
  	} else if (now < nyitas) {
		return "notYetOpened";
	} else if (zaras - now <= 0) {
  	  	return "closed";
  	}

  	const minutesUntil = getMinutesUntil(zaras);
  	return getMessageForMinutesLeft(minutesUntil);
}

export function GET() {
  const message = getMessage();
  
  const body = JSON.stringify({ message });
  const headers = { "Content-Type": "application/json" };
  const response = new Response(body, { headers });
  
  return response;
}
