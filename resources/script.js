const canvas = document.getElementById('matrix');
const context = canvas.getContext("2d");
const divWidth = document.getElementById('sectionOne').clientWidth;
const divHeigh = document.getElementById('sectionOne').clientHeight;

canvas.width = divWidth;
canvas.height = divHeigh;

const katana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = '0123456789';

const alphabet = katana + latin + nums;

const fontsize = 24;
const columns = canvas.width/fontsize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#0F0";
    context.font = fontsize + "fx monospace";

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontsize, rainDrops[i] * fontsize)

        if(rainDrops[i] * fontsize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++
    }
}

setInterval(draw, 35);

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hide');
hiddenElements.forEach((el) => observer.observe(el));