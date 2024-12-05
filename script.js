console.log("Interactive Audio Visualizer Initialized");

// HTML Elements
const audioInput = document.getElementById("audio-input");
const audio = document.getElementById("audio");
const visualizer = document.getElementById("visualizer");
const moodSlider = document.getElementById("mood-slider");
const energySlider = document.getElementById("energy-slider");
const satisfactionSlider = document.getElementById("satisfaction-slider");

// Create Canvas for Visualization
const canvas = document.createElement("canvas");
canvas.width = visualizer.clientWidth;
canvas.height = 400;
visualizer.appendChild(canvas);

const ctx = canvas.getContext("2d");

// Audio Context and Analyser Variables
let audioContext, analyser, dataArray, source;

// File Upload Listener
audioInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("File uploaded:", file.name);
        const url = URL.createObjectURL(file);
        audio.src = url;

        // Initialize Audio Context
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Disconnect previous source if necessary
        if (source) {
            source.disconnect();
        }

        // Connect audio to Web Audio API
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        dataArray = new Uint8Array(analyser.frequencyBinCount);
        console.log("Audio context and analyser initialized.");
    } else {
        console.error("No file selected.");
    }
});

// Audio Playback Listener
audio.addEventListener("play", () => {
    if (audioContext && audioContext.state === "suspended") {
        audioContext.resume().then(() => console.log("Audio context resumed."));
    }
    animate();
});

// Visualization Loop
function animate() {
    requestAnimationFrame(animate);

    if (analyser) {
        analyser.getByteFrequencyData(dataArray);

        // Clear Canvas
        ctx.fillStyle = "#121212";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Adjust Bar Magnitude Based on Energy
        const energyMultiplier = energySlider.value / 5; // Default is 1 at midpoint

        // Adjust Graph Size Based on Satisfaction
        const satisfactionScale = satisfactionSlider.value / 10; // Default is 1 at max satisfaction
        canvas.width = visualizer.clientWidth * satisfactionScale;
        canvas.height = 400 * satisfactionScale;

        // Draw Bars
        const barWidth = canvas.width / dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * energyMultiplier;
            
            // Adjust Color Based on Mood
            const moodValue = moodSlider.value;
            const red = 255 * (moodValue / 10); // Warmer as mood increases
            const blue = 255 * (1 - moodValue / 10); // Cooler as mood decreases

            ctx.fillStyle = `rgb(${red}, 50, ${blue})`;
            ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
        }
    }
}

// Adjust Canvas Size on Resize
window.addEventListener("resize", () => {
    canvas.width = visualizer.clientWidth;
    canvas.height = 400;
});
