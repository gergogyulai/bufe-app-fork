import { bufeClosed } from "$lib/stores/Closed.js";

export function GET() {
	const now = new Date();
	const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 20, 0);
	const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0);
	const zarasDifference = zaras - now;
	const nyitasDifference = nyitas - now;
	const dayOfTheWeek = now.getDay();
	let message;
  
	if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
		bufeClosed.set(true);
	  	message = "weekend";
	} else if (zarasDifference <= 0) {
		bufeClosed.set(true);
	  	message = "closed";
	} else if (zarasDifference <= 10 * 60000) {
		bufeClosed.set(false);
	  	message = "10minLeft";
	} else if (zarasDifference <= 20 * 60000) {
		bufeClosed.set(false);
	  	message = "20minLeft";
	} else if (zarasDifference <= 30 * 60000) {
		bufeClosed.set(false);
	  	message = "30minLeft";
	} else if (zarasDifference <= 60 * 60000) {
		bufeClosed.set(false);
	  	message = "60minLeft";
	} else if (nyitasDifference <= now){
		bufeClosed.set(false);
	  	message = "nyitva";
	} else {
		message = "error with time";
	}
  
	const body = JSON.stringify({ message });
	const headers = { "Content-Type": "application/json" };
	const response = new Response(body, { headers });
	
	return response;
}  