// script.js

let hunger = 100;
let happiness = 100;
let energy = 100;
let health = 100;

let daysSurvived = 0;
let evolutionStage = 0;

const evolutionStages = [
    { stage: 'Baby', minDays: 0, image: 'baby-tamagotchi.png' },
    { stage: 'Teen', minDays: 3, image: 'teen-tamagotchi.png' },
    { stage: 'Adult', minDays: 6, image: 'adult-tamagotchi.png' },
];

let difficulty = 'easy';

function setDifficulty() {
    const select = document.getElementById('difficulty-select');
    difficulty = select.value;
}

function getDifficultyModifier() {
    switch (difficulty) {
        case 'easy': return 1;
        case 'medium': return 2;
        case 'hard': return 3;
        default: return 1;
    }
}

function updateStatus() {
    document.getElementById('hunger').textContent = hunger;
    document.getElementById('happiness').textContent = happiness;
    document.getElementById('energy').textContent = energy;
    document.getElementById('health').textContent = health;
}

function animateTamagotchi(animation) {
    const tamagotchi = document.getElementById('tamagotchi-image');
    tamagotchi.style.animation = `${animation} 1s`;
    tamagotchi.addEventListener('animationend', () => {
        tamagotchi.style.animation = ''; // Resetovanje animacije
    }, { once: true });
}

function feed() {
    hunger = Math.min(hunger + 10, 100);
    animateTamagotchi('feedAnimation');
    updateStatus();
}

function play() {
    happiness = Math.min(happiness + 10, 100);
    energy = Math.max(energy - 10, 0);
    animateTamagotchi('playAnimation');
    updateStatus();
}

function sleep() {
    energy = Math.min(energy + 20, 100);
    animateTamagotchi('sleepAnimation');
    updateStatus();
}

function heal() {
    health = Math.min(health + 20, 100);
    updateStatus();
}

function evolve() {
    if (daysSurvived >= evolutionStages[evolutionStage].minDays) {
        evolutionStage++;
        if (evolutionStage < evolutionStages.length) {
            document.getElementById('tamagotchi-image').src = evolutionStages[evolutionStage].image;
        }
    }
}

const challenges = [
    'Feed Tamagotchi three times',
    'Play with Tamagotchi for five minutes',
    'Heal Tamagotchi once'
];

let challengeIndex = 0;

function updateChallenge() {
    const challengeText = document.getElementById('challenge-text');
    challengeText.textContent = challenges[challengeIndex];
}

function completeChallenge() {
    if (challengeIndex < challenges.length) {
        alert('Challenge completed!');
        energy = Math.min(energy + 20, 100);
        happiness = Math.min(happiness + 20, 100);
        updateStatus();
        challengeIndex++;
        updateChallenge();
    } else {
        alert('No more challenges today!');
    }
}

function changeName() {
    const nameInput = document.getElementById('name-input').value;
    if (nameInput.trim() !== '') {
        document.getElementById('tamagotchi-name').textContent = nameInput;
    } else {
        alert('Please enter a valid name!');
    }
}

function updateStats() {
    const statsText = document.getElementById('stats-text');
    statsText.textContent = `Days Survived: ${daysSurvived}\n
        Evolution Stage: ${evolutionStages[evolutionStage].stage}`;
}

function endOfDay() {
    daysSurvived++;
    hunger = Math.max(hunger - getDifficultyModifier() * 5, 0);
    happiness = Math.max(happiness - getDifficultyModifier() * 5, 0);
    energy = Math.max(energy - getDifficultyModifier() * 5, 0);
    health = Math.max(health - getDifficultyModifier() * 5, 0);
    updateStatus();
    evolve();
    updateStats();
}

// Update status and handle end of day in intervals
setInterval(() => {
    const currentTime = new Date();
    if (currentTime.getSeconds() === 0) {
        endOfDay();
    }
}, 1000);

// Initial call to update challenge
updateChallenge();


const missions = [
    'Feed Tamagotchi 5 times',
    'Play with Tamagotchi for 10 minutes',
    'Heal Tamagotchi 2 times'
];

let missionIndex = 0;

function updateMission() {
    const missionText = document.getElementById('mission-text');
    missionText.textContent = missions[missionIndex];
}

function completeMission() {
    if (missionIndex < missions.length) {
        alert('Mission completed!');
        energy = Math.min(energy + 30, 100);
        happiness = Math.min(happiness + 30, 100);
        updateStatus();
        missionIndex++;
        updateMission();
    } else {
        alert('No more missions available!');
    }
}

// Initial call to update mission
updateMission();

function changeColor() {
    const colorSelect = document.getElementById('color-select');
    const color = colorSelect.value;
    const tamagotchi = document.getElementById('tamagotchi-image');

    switch (color) {
        case 'red':
            tamagotchi.style.filter = 'hue-rotate(0deg)'; // Primer promene boje
            break;
        case 'blue':
            tamagotchi.style.filter = 'hue-rotate(240deg)';
            break;
        case 'green':
            tamagotchi.style.filter = 'hue-rotate(120deg)';
            break;
        default:
            tamagotchi.style.filter = 'none';
    }
}

function updateEmotion() {
    const emotionText = document.getElementById('emotion-text');

    if (happiness < 30) {
        emotionText.textContent = 'Tamagotchi is feeling sad.';
        document.getElementById('tamagotchi-image').src = 'sad-tamagotchi.png'; // Primer slike
    } else if (happiness < 60) {
        emotionText.textContent = 'Tamagotchi is feeling okay.';
        document.getElementById('tamagotchi-image').src = 'neutral-tamagotchi.png'; // Primer slike
    } else {
        emotionText.textContent = 'Tamagotchi is feeling great!';
        document.getElementById('tamagotchi-image').src = 'happy-tamagotchi.png'; // Primer slike
    }
}

function updateStatus() {
    document.getElementById('hunger').textContent = hunger;
    document.getElementById('happiness').textContent = happiness;
    document.getElementById('energy').textContent = energy;
    document.getElementById('health').textContent = health;
    updateEmotion(); // Ažuriranje emocija
}
const rewards = [
    'Special Toy',
    'New Outfit',
    'Extra Playtime'
];

function unlockReward() {
    const rewardText = document.getElementById('reward-text');
    rewardText.textContent = `Congratulations! You earned a ${rewards[Math.floor(Math.random() * rewards.length)]}.`;
}

let musicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('background-music');
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
    } else {
        music.play();
        musicPlaying = true;
    }
}
