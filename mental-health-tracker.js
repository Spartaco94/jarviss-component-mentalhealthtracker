```javascript
class MentalHealthTracker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mood = null;
        this.energyLevel = null;
        this.stressLevel = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    max-width: 400px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 10px;
                }
                .tracker-grid {
                    display: grid;
                    gap: 15px;
                }
                .mood-selector, .level-selector {
                    display: flex;
                    justify-content: space-between;
                }
                button {
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button.selected {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
            <div class="tracker-grid">
                <h2>Daily Mental Health Check</h2>
                
                <div>
                    <h3>How are you feeling?</h3>
                    <div class="mood-selector">
                        ${['😊 Happy', '😐 Neutral', '😢 Sad', '😤 Stressed'].map(mood => 
                            `<button class="mood-btn" data-mood="${mood.split(' ')[1].toLowerCase()}">${mood}</button>`
                        ).join('')}
                    </div>
                </div>

                <div>
                    <h3>Energy Level</h3>
                    <div class="level-selector">
                        ${[1, 2, 3, 4, 5].map(level => 
                            `<button class="energy-btn" data-level="${level}">${level}</button>`
                        ).join('')}
                    </div>
                </div>

                <div>
                    <h3>Stress Level</h3>
                    <div class="level-selector">
                        ${[1, 2, 3, 4, 5].map(level => 
                            `<button class="stress-btn" data-level="${level}">${level}</button>`
                        ).join('')}
                    </div>
                </div>

                <button id="submit-btn" disabled>Submit Daily Check</button>
            </div>
        `;
    }

    setupEventListeners() {
        const moodButtons = this.shadowRoot.querySelectorAll('.mood-btn');
        const energyButtons = this.shadowRoot.querySelectorAll('.energy-btn');
        const stressButtons = this.shadowRoot.querySelectorAll('.stress-btn');
        const submitButton = this.shadowRoot.getElementById('submit-btn');

        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                moodButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.mood = btn.dataset.mood;
                this.checkSubmitAvailability();
            });
        });

        energyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                energyButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.energyLevel = btn.dataset.level;
                this.checkSubmitAvailability();
            });
        });

        stressButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                stressButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.stressLevel = btn.dataset.level;
                this.checkSubmitAvailability();
            });
        });

        submitButton.addEventListener('click', () => this.submitDailyCheck());
    }

    checkSubmitAvailability() {
        const submitButton = this.shadowRoot.getElementById('submit-btn');
        if (this.mood && this.energyLevel && this.stressLevel) {
            submitButton.disabled = false;
        }
    }

    submitDailyCheck() {
        const dailyCheck = {
            mood: this.mood,
            energyLevel: this.energyLevel,
            stressLevel: this.stressLevel,
            timestamp: new Date().toISOString()
        };

        // Dispatch custom event with daily check data
        this.dispatchEvent(new CustomEvent('dailyCheckSubmitted', { 
            detail: dailyCheck,
            bubbles: true,
            composed: true 
        }));

        // Optional: Reset form
        this.resetTracker();
    }

    resetTracker() {
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        const submitButton = this.shadowRoot.getElementById('submit-btn');
        submitButton.disabled = true;
        this.mood = null;
        this.energyLevel = null;
        this.stressLevel = null;
    }
}

customElements.define('mental-health-tracker', MentalHealthTracker);
```