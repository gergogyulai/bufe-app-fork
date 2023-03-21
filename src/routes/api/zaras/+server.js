import { bufeClosed } from "$lib/stores/Closed.js";

export function GET() {
	const now = new Date();
	const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0, 0);
	const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0);
	const zarasDifference = zaras - now;
	const nyitasDifference = nyitas - now;
	const dayOfTheWeek = now.getDay();
	let message, zarva;
  
	if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
	  	message = "weekend";
	  	zarva = true;
		bufeClosed.set(true);
	} else if (zarasDifference <= 0) {
	  	message = "closed";
	  	zarva = true;
		bufeClosed.set(true);
	} else if (zarasDifference <= 10 * 60000) {
	  	message = "10minLeft";
	  	zarva = false;
		bufeClosed.set(false)
	} else if (zarasDifference <= 20 * 60000) {
	  	message = "20minLeft";
	  	zarva = false;
		bufeClosed.set(false)
	} else if (zarasDifference <= 30 * 60000) {
	  	message = "30minLeft";
	  	zarva = false;
		bufeClosed.set(false)
	} else if (zarasDifference <= 60 * 60000) {
	  	message = "60minLeft";
	  	zarva = false;
		bufeClosed.set(false)
	} else if (nyitasDifference <= now){
	  	message = "nyitva";
	  	zarva = false;
		bufeClosed.set(false)
	} else {
		message = "error with time";
	}
  
	const body = JSON.stringify({ message, zarva });
	const headers = { "Content-Type": "application/json" };
	const response = new Response(body, { headers });
	
	return response;
}  