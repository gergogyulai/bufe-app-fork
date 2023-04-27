export function szunetCalc(nyitvatartasData) {
    const now = new Date();
    const elsoSzunet = new Date().setHours(nyitvatartasData.szunetek.elso.ora, nyitvatartasData.szunetek.elso.perc, 0);
    const masodikSzunet = new Date().setHours(nyitvatartasData.szunetek.masodik.ora, nyitvatartasData.szunetek.masodik.perc, 0);
    const harmadikSzunet = new Date().setHours(nyitvatartasData.szunetek.harmadik.ora, nyitvatartasData.szunetek.masodik.perc, 0);
    const negyedikSzunet = new Date().setHours(nyitvatartasData.szunetek.negyedik.ora, nyitvatartasData.szunetek.negyedik.perc, 0);
    const ebedSzunet = new Date().setHours(nyitvatartasData.szunetek.ebed.ora, nyitvatartasData.szunetek.ebed.perc, 0);
    const hatodikSzunet = new Date().setHours(nyitvatartasData.szunetek.hatodik.ora, nyitvatartasData.szunetek.hatodik.perc, 0);
    const zaras  = new Date().setHours(nyitvatartasData.nyitvatartas.zaras.ora, nyitvatartasData.nyitvatartas.zaras.perc, 0);
    
    if (now < elsoSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '1.szunet', label: '1. szünet (8:45-8:55)'},
            {value: '2.szunet', label: '2. szünet (9:40-9:50)'},
            {value: '3.szunet', label: '3. szünet (10:35-10:45)'},
            {value: '4.szunet', label: '4. szünet (11:30-11:40)'},
            {value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < masodikSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '2.szunet', label: '2. szünet (9:40-9:50)'},
            {value: '3.szunet', label: '3. szünet (10:35-10:45)'},
            {value: '4.szunet', label: '4. szünet (11:30-11:40)'},
            {value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < harmadikSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '3.szunet', label: '3. szünet (10:35-10:45)'},
            {value: '4.szunet', label: '4. szünet (11:30-11:40)'},
            {value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < negyedikSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '4.szunet', label: '4. szünet (11:30-11:40)'},
            {value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < ebedSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < hatodikSzunet) {
        return [
            {value: 'Most', label: 'Most'},
            {value: '6.szunet', label: '6. szünet (13:30-13:35)'}
        ];
    } else if (now < zaras){
        return [];
    } else {
        return [];
    }
}