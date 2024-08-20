
const timeReload = 60000 * 5

async function checkUrl(url, elementId, imgID) {
    const statusElement = document.getElementById(elementId).querySelector('.status');
    const statusImg = document.getElementById(imgID)
            
    statusImg.src = "./imgs/status/idle-status.png"

    try {
        const response = await fetch(url, { method: 'HEAD' });


        if (response.ok) {
            statusImg.src = "./imgs/status/online-status.png"
            statusElement.textContent = 'Está funcionando.';
            statusElement.className = 'status status-green';
        } else {
            statusImg.src = "./imgs/status/offline-status.png";
            statusElement.textContent = 'Não está funcionando.';
            statusElement.className = 'status status-red';
        }
    } catch (error) {
        const statusElements = document.getElementById(elementId).querySelector('.status');
        const statusImg = document.getElementById(imgID)
        statusImg.src = "./imgs/status/offline-status.png"
        statusElements.textContent = 'Erro ao verificar.';
        statusElements.className = 'status status-red';
    }
}

function getLocalTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    return formatter.format(now);
}

function displayTime() {
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = getLocalTime();
}

async function checkUrls() {
    checkUrl('https://10.26.100.181', 'status-Voip', 'img-status-voip');
    checkUrl('10.26.101.32', 'status-sped', 'img-status-sped');
    checkUrl('https://10.26.100.181', 'status-zimbra', 'img-status-zimbra');
    checkUrl('http://10.25.255.55:8000/', 'status-internal', 'img-status-internal');
    displayTime()
}


setInterval(() => {
    displayTime()
    location.reload();
}, timeReload);

window.onload = checkUrls();
