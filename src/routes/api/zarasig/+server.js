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

function getMessage(nyitvatartasData) {
	const now = new Date();
	const dayOfTheWeek = now.getDay();

	const nyitasValue = nyitvatartasData.nyitvatartas.nyitas;
	const zarasValue = nyitvatartasData.nyitvatartas.zaras;
  
	const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nyitasValue.ora, nyitasValue.perc, 0);
	const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), zarasValue.ora, zarasValue.perc, 0);  

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

async function fetchData(context) {
	const response = await context.fetch('/api/nyitvatartas');
	if (response.ok) {
	  	return await response.json();
	} else {
	  	console.error('Error fetching nyitvatartas data:', response.status);
	  	return null;
	}
}

export async function GET(context) {
	const nyitvatartasData = await fetchData(context);

	if (nyitvatartasData) {
	  	const message = getMessage(nyitvatartasData);
  
	  	const body = JSON.stringify({ message });
	  	const headers = { "Content-Type": "application/json" };
	  	const response = new Response(body, { headers });
  
	  	return response;
	} else {
	  	const body = JSON.stringify({ error: 'Failed to fetch nyitvatartas data' });
	  	const headers = { "Content-Type": "application/json" };
	  	const response = new Response(body, { status: 500, headers });
  
	  	return response;
	}
}