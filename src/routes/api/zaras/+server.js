import { nyitasIdo, zarasIdo, bufeClosed } from "$lib/stores/Nyitvatartas.js";

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

    let nyitasValue = {hour: 7, minute: 0};
    let zarasValue = {hour: 14, minute: 0};
	
    nyitasIdo.subscribe(value => {
        nyitasValue = value;
    });
    zarasIdo.subscribe(value => {
        zarasValue = value;
    });

    const nyitas = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nyitasValue.hour, nyitasValue.minute, 0);
    const zaras = new Date(now.getFullYear(), now.getMonth(), now.getDate(), zarasValue.hour, zarasValue.minute, 0);

    if (isWeekend(dayOfTheWeek)) {
        bufeClosed.set(true)
        return "hetvege";
    } else if (now >= zaras) {
        bufeClosed.set(true)
        return "closed";
    } else if (now < nyitas) {
        bufeClosed.set(true)
        return "closed";
    }

    const minutesUntil = getMinutesUntil(zaras);

    if (minutesUntil <= 10) {
        return "10minLeft";
    } else if (minutesUntil <= 20) {
        return "20minLeft";
    } else if (minutesUntil <= 30) {
        return "30minLeft";
    } else if (minutesUntil <= 60) {
        return "60minLeft";
    } else if (now - nyitas <= 0) {
        bufeClosed.set(false)
        return "nyitva";
    } else {
        return "asdasasdasd";
    }
}

export function GET() {
    const message = getMessage();

    const body = JSON.stringify({ message });
    const headers = { "Content-Type": "application/json" };
    const response = new Response(body, { headers });

    return response;
}
