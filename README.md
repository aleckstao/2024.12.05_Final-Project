# 2024.12.05_Final-Project

Overview
---
The Interactive Audio Visualizer combines audio playback and visual elements to create an engaging user experience. It lets users explore how music can be represented visually in real time, with customizable parameters for mood, energy, and satisfaction.

How It Works
---
Audio Input:
Users can upload their own audio files.
The audio file is processed by the browser using the Web Audio API, which analyzes the sound's frequency and amplitude.

Visualization:
The audio data is represented as a dynamic bar graph on an HTML canvas.
Each bar corresponds to a specific frequency band, with the height indicating the magnitude of that frequency.

Customizable User Feedback:
Users can interact with sliders to adjust:
1. Mood: Changes the bar colors from cool (blue) to warm (red) based on happiness levels.
2. Energy: Modifies the intensity of the bar movements, making them more dynamic or subdued.
3. Satisfaction: Adjusts the overall size of the visualization.

Dynamic Interaction:
The canvas updates in real time as the audio plays. Responsive design ensures that the visualization adjusts to screen size changes.

Technologies Used
---
HTML5:
Structures the content, including sliders, audio controls, and the canvas for visualization.

CSS3:
Styles the interface.

JavaScript:
Implements the core logic for file input, audio playback, and visualization using the Web Audio API and canvas animations.

Web Audio API:
Processes audio input to extract frequency data for visualization.

Canvas API:
Draws the bar graph visualization dynamically based on the audio data.
