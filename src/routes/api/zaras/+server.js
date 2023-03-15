export function GET() {
  	const now = new Date();
  	const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 3, 0);
 	const diff = cutoff - now;
  	let message, zarva;

  	if (diff <= 0) {
    	message = "closed";
    	zarva = true;
  	} else if (diff <= 10 * 60000) {
    	message = "10minLeft";
    	zarva = false;
  	} else if (diff <= 20 * 60000) {
    	message = "20minLeft";
    	zarva = false;
  	} else if (diff <= 30 * 60000) {
    	message = "30minLeft";
    	zarva = false;
  	} else if (diff <= 60 * 60000) {
    	message = "60minLeft";
    	zarva = false;
  	} else {
    	message = "moreThanOne";
    	zarva = false;
  	}

  	const body = JSON.stringify({ message, zarva });
	const headers = { "Content-Type": "application/json" };
  	const response = new Response(body, { headers });

  	return response;
}