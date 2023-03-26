<script>
	import toast, {Toaster} from 'svelte-french-toast'
	import { onMount } from 'svelte';

	onMount(() => {
  		async function runCheckTime() {
			await checkTime();
    		setInterval(async () => {
      			await checkTime();
    		}, 60000);
  		}
  		runCheckTime();
	});

	async function checkTime() {
	  	const res = await fetch('/api/zaras');
	  	const { message } = await res.json();

	  	const messageHandler = getMessageHandler(message);
		console.log(message)
	  	messageHandler();
	}

	function getMessageHandler(message) {
  		const handlers = {
			"closed": () => showNotification('A büfé bezárt!', '#ef4444', '#ffffff'),
    		"10minLeft": () => showNotification('A büfé 10 perc múlva bezár', '#dc2626', '#ffffff'),
    		"20minLeft": () => showNotification('A büfé 20 perc múlva bezár', '#f87171', '#ffffff'),
    		"30minLeft": () => showNotification('A büfé fél óra múlva bezár', '#ffffff', '#363636'),
    		"60minLeft": () => showNotification('A büfé 1 óra múlva bezár', '#ffffff', '#363636'),
    		"hetvege": () =>  showNotification('A jelenleg zárva van', '#ffffff', '#363636'),
			"nyitva": () => console.log("bufe nyitva")
  		};
  		const handler = handlers[message];
  		if (handler) {
    		return handler;
  		} else {
    		return () => console.log("unknown message from api/zaras");
  		}
	}

	function showNotification(text, bgcolor, color) {
      	toast(text, {
        	style: `color: ${color}; background-color: ${bgcolor};`,
        	icon: '❗',
      	});
	}
</script>
<Toaster/>
