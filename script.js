// ========================================
// CONSTANTS & CONFIGURATION
// All hardcoded strings, settings, and configuration data
// ========================================


const CONSTANTS = {
    // Common Messages
    MESSAGES: {
        WELCOME: "Hi Jenny! 👋 Welcome to your payroll setup",
        COMPANY_CONFIRMED: "✅ Company information confirmed!",
        PLEASE_REVIEW: "Please review this information and confirm it's correct.",
        PERFECT: "Perfect!",
        GREAT: "Great!",
        EXCELLENT: "Excellent!",
        NO_PROBLEM: "No problem!",
        LOADING: "Loading...",
        PROCESSING: "Processing...",
        COMPLETE: "Complete",
        APPROVED: "✅ Approved",
        PENDING: "Pending...",
        READY_TO_CONTINUE: "Ready to continue?",
        LOOKS_GOOD: "Looks good, continue",
        CONTINUE: "Continue",
        SKIP: "Skip",
        NEXT_STEP: "Next step",
        CANCEL: "Cancel"
    },

    // Wizard Messages
    WIZARD: {
        INTRO_TITLE: "Hi Jenny! 👋",
        INTRO_SUBTITLE: "Welcome to your payroll setup",
        ROLE_TITLE: "What's your primary role?",
        EXPERIENCE_TITLE: "How much payroll experience do you have?",
        SYSTEM_TITLE: "What payroll system are you migrating from?",
        FREQUENCY_TITLE: "How frequently do you pay your employees?",
        START_DATE_TITLE: "When do you plan to start paying employees using our system?"
    },

    // Payroll Setup Messages
    PAYROLL: {
        SCHEDULE_REVIEW: "Review Extracted Pay Schedules",
        EARNING_CODES: "Review All Earning Codes",
        SUGGESTIONS: "Recommendations to Optimize Earning Codes",
        RATE_CONFIG: "Configure Pay Rates",
        W2_PREVIEW: "W-2 Tax Form Simulation",
        CALENDAR_SIM: "Payroll Calendar Simulation"
    },

    // Company Info Messages  
    COMPANY: {
        INFO_EXTRACTED: "🏢 **Company information extracted successfully!**",
        LEGAL_NAME: "Legal Company Name",
        ADDRESS: "Company Address",
        EIN: "Employer Identification Number (EIN)",
        CONFIRM_INFO: "Confirm information",
        MAKE_CORRECTIONS: "Make corrections"
    },

    // Error Messages
    ERRORS: {
        INVALID_NAME: "Please enter a valid company name (at least 2 characters).",
        INVALID_ADDRESS: "Please enter a complete address (at least 10 characters).",
        INVALID_EIN: "Please enter a valid EIN in the format: XX-XXXXXXX (e.g., 12-3456789)",
        MISSING_SELECTION: "Please make a selection before continuing.",
        UPLOAD_FAILED: "Upload failed. Please try again."
    },

    // Step Labels
    STEPS: {
        STEP_1: "Step 1 of 6: Review each pay schedule and approve them",
        STEP_2: "Step 2 of 6: Review payroll calendar simulation",
        STEP_3: "Step 3 of 6: Earning Codes Review",
        STEP_4: "Step 4 of 6: Suggestions",
        STEP_5: "Step 5 of 6: Rate Configuration",
        STEP_6: "Step 6 of 6: W-2 Tax Form Preview"
    },

    // File Settings
    FILES: {
        HANDBOOK_FORMATS: "Supports: PDF, DOC, DOCX",
        PAYROLL_FORMATS: "Supports: PDF, Excel, CSV",
        UPLOAD_TEXT: "Drag & drop your files here or click to browse"
    }
};
// ========================================
// GLOBAL STATE & DATA
// ========================================
// Application State
let currentStep = 1;



let reviewProgress = {
    totalCodes: 11,
    reviewedCodes: 0,
    approvedCodes: []

};
// ========================================
// DOM CACHE & INITIALIZATION
// ========================================
function initializeApp() {
    // Initialize DOM element cache first
    DOM.init();

    setupPanelToggle();

    // Skip wizard and go directly to pay schedule setup
    const chatPanel = document.getElementById('chatPanel');
    const tablePanel = document.getElementById('tablePanel');

    // Show both panels immediately without animation
    chatPanel.style.display = 'flex';
    chatPanel.style.opacity = '1';
    chatPanel.style.transform = 'none';
    tablePanel.style.display = 'flex';
    tablePanel.style.opacity = '1';
    tablePanel.style.transform = 'none';
    chatPanel.classList.remove('intro-mode');

    // Load initial schedule cards immediately
    loadInitialScheduleCards();

    // Start with pay schedule focused message - remove the setTimeout delay
    addMessage(`${CONSTANTS.MESSAGES.PERFECT} I've analyzed your pay registers and extracted information for two different pay schedules:\n\n<Strong>Schedule 1</strong>\nName: Semi-Monthly payroll \nPay frequency: Twice per month\n\n\n<Strong>Schedule 2</strong>\nName: Weekly payroll \nPay frequency: Every week\n\nLet's verify these schedules. Shall we start?`, 'ai', [
        { action: 'looks-good', text: 'Looks good, continue' },
        { action: 'add-new', text: 'Add new schedule' },
        { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' },
        { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
    ]);

 

    // ADD THIS LINE:
   //initializeWorkflowSidebar();//Comment out to hide workflow sidebar

    console.log('App initialized with pay schedule configuration');
}
    

 

// ========================================
// WIZARD WORKFLOW FUNCTIONS
// ========================================


let newWizardState = {
    currentStep: 1,
    totalSteps: 5,
    userData: {}
};


function showNewWizardIntro() {
    // Hide both panels and show wizard
    const chatPanel = document.getElementById('chatPanel');
    const tablePanel = document.getElementById('tablePanel');
    const appContainer = document.querySelector('.app-container');

    // Hide existing panels
    chatPanel.style.display = 'none';
    tablePanel.style.display = 'none';

    // Create wizard container
    const wizardContainer = document.createElement('div');
    wizardContainer.className = 'wizard-container';
    wizardContainer.id = 'wizardContainer';

    appContainer.appendChild(wizardContainer);

    // Reset wizard state
    newWizardState.currentStep = 1;
    newWizardState.userData = {};

    // Show welcome step
    showNewWelcomeStep();
}

function showNewWelcomeStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <h1 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                   ${CONSTANTS.WIZARD.INTRO_TITLE}
                </h1>
               <p class="wizard-subtitle">${CONSTANTS.WIZARD.INTRO_SUBTITLE}</p>
            </div>

            <div class="wizard-content">
                <p class="wizard-description">
                    We see you've selected Payroll, HR, and Time Keeping modules. Great choice! 
                    Let's get to know more about you so we can tailor the process for your needs.
                </p>

                <div class="wizard-highlight">
                    <strong>Tell us about you</strong>, and we'll be able to provide a more personalized experience.
                    We'll use this info to customize your experience and show you the features that matter most to your day-to-day work.
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="startNewWizard()">
                    Let's get started
                </button>
                <button class="wizard-btn wizard-btn-secondary" onclick="skipNewWizard()">
                    Skip the introduction
                </button>
            </div>
        </div>
    `;
}

function startNewWizard() {
    newWizardState.currentStep = 1;
    newWizardState.totalSteps = 5;
    showRoleStep();
}

function showRoleStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 1 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    What's your primary role?
                </h2>
                <p class="wizard-subtitle">Select all that apply - this helps us customize the interface for you.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-checkboxes">
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="hr-manager">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I handle all HR and payroll tasks</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="payroll-admin">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I focus mainly on payroll</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="business-owner">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I'm new to HR but learning fast</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="consultant">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I work with an accountant or HR consultant</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromRole()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function toggleWizardCheckbox(element) {
    element.classList.toggle('checked');

    // Enable/disable continue button based on selection
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = checkedBoxes.length === 0;
    continueBtn.style.opacity = checkedBoxes.length === 0 ? '0.5' : '1';
}

function continueFromRole() {
    // Store selected roles
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const selectedRoles = Array.from(checkedBoxes).map(box => box.getAttribute('data-value'));

    if (selectedRoles.length === 0) {
        alert('Please select at least one role');
        return;
    }

    newWizardState.userData.roles = selectedRoles;
    newWizardState.currentStep = 2;
    showExperienceStep();
}

function showExperienceStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 2 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    How much payroll experience do you have?
                </h2>
                <p class="wizard-subtitle">This helps us adjust the pace and detail level of the setup process.</p>
            </div>

            <div class="wizard-content">
                <div class="experience-slider-container">
                    <div class="experience-label" id="experienceLabel">Less than 1 year</div>
                    <input type="range" class="experience-slider" id="experienceSlider" min="1" max="4" value="1" oninput="updateExperienceLabel(this.value)">
                    <div class="experience-markers">
                        <span>< 1 year</span>
                        <span>2-5 years</span>
                        <span>5-10 years</span>
                        <span>10+ years</span>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromExperience()">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function updateExperienceLabel(value) {
    const label = document.getElementById('experienceLabel');
    const labels = {
        '1': 'Less than 1 year',
        '2': '2-5 years of experience',
        '3': '5-10 years of experience',
        '4': '10+ years of experience'
    };
    label.textContent = labels[value];
}

function continueFromExperience() {
    const slider = document.getElementById('experienceSlider');
    const experienceLevel = slider.value;
    const experienceLabels = {
        '1': 'less-than-1-year',
        '2': '2-5-years',
        '3': '5-10-years',
        '4': '10-plus-years'
    };

    newWizardState.userData.experience = experienceLabels[experienceLevel];
    newWizardState.currentStep = 3;
    showCurrentSystemStep();
}

function showCurrentSystemStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 3 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    What payroll system are you migrating from?
                </h2>
                <p class="wizard-subtitle">This helps us understand your current setup and migration needs.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-options">
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="manual">
                        <div class="option-content">
                            <h3>Manual payroll (Excel, paper, etc.)</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="quickbooks">
                        <div class="option-content">
                            <h3>QuickBooks Payroll</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="adp">
                        <div class="option-content">
                            <h3>ADP</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="paychex">
                        <div class="option-content">
                            <h3>Paychex</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="gusto">
                        <div class="option-content">
                            <h3>Gusto</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="other">
                        <div class="option-content">
                            <h3>Other system</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="new">
                        <div class="option-content">
                            <h3>This is my first payroll system</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromSystem()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function selectSystem(element) {
    // Remove selection from all options
    document.querySelectorAll('.wizard-option').forEach(opt => opt.classList.remove('selected'));

    // Select the clicked option
    element.classList.add('selected');

    // Store the selection
    newWizardState.userData.currentSystem = element.getAttribute('data-value');

    // Enable the continue button
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
}

function continueFromSystem() {
    if (!newWizardState.userData.currentSystem) {
        alert('Please select a payroll system');
        return;
    }

    newWizardState.currentStep = 4;
    showFirstPayDateStep();
}


function showFirstPayDateStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 4 of 5</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    How frequently do you pay your employees?
                </h2>
                <p class="wizard-subtitle">Select all pay frequencies you need - you can have multiple schedules.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-checkboxes">
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="weekly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Weekly</h3>
                            <p>52 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="bi-weekly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Bi-weekly</h3>
                            <p>26 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="semi-monthly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Semi-monthly</h3>
                            <p>24 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="monthly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Monthly</h3>
                            <p>12 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="quarterly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Quarterly</h3>
                            <p>4 pay periods per year</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromPayFrequency()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function togglePayFrequency(element) {
    element.classList.toggle('checked');

    // Enable/disable continue button based on selection
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = checkedBoxes.length === 0;
    continueBtn.style.opacity = checkedBoxes.length === 0 ? '0.5' : '1';
}

function continueFromPayFrequency() {
    // Store selected pay frequencies
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const selectedFrequencies = Array.from(checkedBoxes).map(box => box.getAttribute('data-value'));

    if (selectedFrequencies.length === 0) {
        alert('Please select at least one pay frequency');
        return;
    }

    newWizardState.userData.payFrequencies = selectedFrequencies;
    newWizardState.currentStep = 5;
    newWizardState.totalSteps = 5;
    showStartDateStep();
}

function showStartDateStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 5 of 5</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    When do you plan to start paying employees using our system?
                </h2>
                <p class="wizard-subtitle">Choose your first payroll date to help us create a setup timeline.</p>
            </div>

            <div class="wizard-content">
                <div class="dual-calendar-container">
                    <div class="calendar-navigation">
                        <button class="calendar-nav" onclick="changeMonth(-1)">‹</button>
                        <button class="calendar-nav" onclick="changeMonth(1)">›</button>
                    </div>

                    <div class="dual-calendar-widget">
                        <!-- First Month -->
                        <div class="calendar-month-container">
                            <div class="calendar-header">
                                <h3 class="calendar-month" id="calendarMonth1"></h3>
                            </div>
                            <div class="calendar-grid" id="calendarGrid1">
                                <!-- First month calendar will be generated here -->
                            </div>
                        </div>

                        <!-- Second Month -->
                        <div class="calendar-month-container">
                            <div class="calendar-header">
                                <h3 class="calendar-month" id="calendarMonth2"></h3>
                            </div>
                            <div class="calendar-grid" id="calendarGrid2">
                                <!-- Second month calendar will be generated here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="completeWizardSetup()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;



    // Initialize dual calendar
    initializeDualCalendar(currentMonth, currentYear);
}

let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();
let selectedDate = null;

function initializeDualCalendar(month, year) {
    currentCalendarMonth = month;
    currentCalendarYear = year;

    // Calculate second month
    let secondMonth = month + 1;
    let secondYear = year;
    if (secondMonth > 11) {
        secondMonth = 0;
        secondYear++;
    }

    // Update month displays
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    document.getElementById('calendarMonth1').textContent = `${monthNames[month]} ${year}`;
    document.getElementById('calendarMonth2').textContent = `${monthNames[secondMonth]} ${secondYear}`;

    // Generate both calendars
    generateCalendarMonth(month, year, 'calendarGrid1');
    generateCalendarMonth(secondMonth, secondYear, 'calendarGrid2');
}

function generateCalendarMonth(month, year, gridId) {
    const calendarGrid = document.getElementById(gridId);
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDay(); // Day of week (0 = Sunday)
    const daysInMonth = lastDay.getDate();

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const currentDate = new Date(year, month, day);
        currentDate.setHours(0, 0, 0, 0);

        const isToday = currentDate.getTime() === today.getTime();
        const isPast = currentDate < today;

        // Style different types of days
        if (isToday) {
            dayElement.classList.add('today');
        }

        if (isPast) {
            dayElement.classList.add('past');
        } else {
            // Make today and future dates selectable
            dayElement.classList.add('selectable');
            dayElement.setAttribute('data-year', year);
            dayElement.setAttribute('data-month', month);
            dayElement.setAttribute('data-day', day);
            dayElement.addEventListener('click', function() {
                selectCalendarDate(year, month, day);
            });
        }

        calendarGrid.appendChild(dayElement);
    }
}
function selectCalendarDate(year, month, day) {
    console.log('Date clicked:', year, month, day); // Debug log

    // Remove previous selection from both calendars
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Find and select the clicked day
    const clickedDay = document.querySelector(`[data-year="${year}"][data-month="${month}"][data-day="${day}"]`);
    if (clickedDay) {
        clickedDay.classList.add('selected');
    }

    // Store selected date
    selectedDate = new Date(year, month, day);

    // Enable continue button
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
}
function changeMonth(direction) {
    currentCalendarMonth += direction;

    if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    } else if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    }

    initializeDualCalendar(currentCalendarMonth, currentCalendarYear);
}


function completeWizardSetup() {
    if (!selectedDate) {
        alert('Please select a start date');
        return;
    }

    // Store the selected start date
    newWizardState.userData.startDate = selectedDate.toISOString().split('T')[0];

    // Skip the full-page timeline and go directly to split-screen
    transitionToSplitScreenWithTimeline();
}

function skipNewWizard() {
    // Go back to existing functionality
    const wizardContainer = document.getElementById('wizardContainer');
    const chatPanel = document.getElementById('chatPanel');
    const tablePanel = document.getElementById('tablePanel');

    wizardContainer.remove();
    chatPanel.style.display = 'flex';
    tablePanel.style.display = 'flex';
    chatPanel.classList.remove('intro-mode');

    // Use existing functions

    // Set up fake company data for the demo
    extractedCompanyInfo = { ...fakeCompanyData.handbook };

    // Show company info confirmation workflow
    showCompanyInfoConfirmation(false, false);
}


// ========================================
// PAYROLL SETUP FUNCTIONS  
// ========================================

// ========================================
// CHAT & MESSAGING FUNCTIONS
// ========================================

// Input handler configuration - ADD THIS NEW CODE
// REPLACE your existing inputHandlers object with this complete version:

const inputHandlers = {
    semiMonthlyName: {
        flagName: 'waitingForSemiMonthlyNameInput',
        validate: (value) => value.trim().length >= 2,
        errorMessage: 'Please enter a valid schedule name (at least 2 characters).',
        onSuccess: (value) => {
            updateScheduleField('semi-monthly', 'name', value.trim());
            setTimeout(() => {
                addMessage(`✅ Semi-Monthly schedule name updated to: **${value.trim()}**\n\nWhat else would you like to modify?`, 'ai', [
                    { action: 'change-semi-first-pay-date', text: 'Change first pay date' },
                    { action: 'change-semi-weekend-rules', text: 'Change weekend rules' },
                    { action: 'looks-good', text: 'Looks good, continue' }
                ]);
            }, 1000);
        }
    },

    weeklyName: {
        flagName: 'waitingForWeeklyNameInput',
        validate: (value) => value.trim().length >= 2,
        errorMessage: 'Please enter a valid schedule name (at least 2 characters).',
        onSuccess: (value) => {
            updateScheduleField('weekly', 'name', value.trim());
            setTimeout(() => {
                addMessage(`✅ Weekly schedule name updated to: **${value.trim()}**\n\nWhat else would you like to modify?`, 'ai', [
                    { action: 'change-weekly-first-pay-date', text: 'Change first pay date' },
                    { action: 'change-weekly-weekend-rules', text: 'Change weekend rules' },
                    { action: 'looks-good', text: 'Looks good, continue' }
                ]);
            }, 1000);
        }
    },

    companyName: {
        flagName: 'waitingForCompanyNameInput',
        validate: (value) => value.trim().length >= 2,
        errorMessage: 'Please enter a valid company name (at least 2 characters).',
        onSuccess: (value) => {
            updateDisplayField('LegalName', value.trim());
            setTimeout(() => {
                addMessage(`✅ Company name updated to: **${value.trim()}**\n\nAnything else you'd like to correct?`, 'ai', [
                    { action: 'edit-address', text: 'Edit address' },
                    { action: 'edit-ein', text: 'Edit EIN' },
                    { action: 'confirm-company-info', text: 'Confirm all information' }
                ]);
            }, 1000);
        }
    },

    address: {
        flagName: 'waitingForAddressInput',
        validate: (value) => value.trim().length >= 10,
        errorMessage: 'Please enter a complete address (at least 10 characters).',
        onSuccess: (value) => {
            updateDisplayField('Address', value.trim());
            setTimeout(() => {
                addMessage(`✅ Address updated to: **${value.trim()}**\n\nAnything else you'd like to correct?`, 'ai', [
                    { action: 'edit-company-name', text: 'Edit company name' },
                    { action: 'edit-ein', text: 'Edit EIN' },
                    { action: 'confirm-company-info', text: 'Confirm all information' }
                ]);
            }, 1000);
        }
    },

    ein: {
        flagName: 'waitingForEINInput',
        validate: (value) => /^\d{2}-\d{7}$/.test(value.trim()),
        errorMessage: 'Please enter a valid EIN in the format: XX-XXXXXXX (e.g., 12-3456789)',
        onSuccess: (value) => {
            updateDisplayField('EIN', value.trim());
            setTimeout(() => {
                addMessage(`✅ EIN updated to: **${value.trim()}**\n\nAnything else you'd like to correct?`, 'ai', [
                    { action: 'edit-company-name', text: 'Edit company name' },
                    { action: 'edit-address', text: 'Edit address' },
                    { action: 'confirm-company-info', text: 'Confirm all information' }
                ]);
            }, 1000);
        }
    },

    earningCodeDescription: {
        flagName: 'waitingForEarningCodeDescription',
        validate: (value) => value.trim().length >= 3,
        errorMessage: 'Please provide a more detailed description (at least 3 characters).',
        onSuccess: (value) => {
            setTimeout(() => {
                handleEarningCodeDescription(value.trim());
            }, 1000);
        }
    },

    earningCodeName: {
        flagName: 'waitingForEarningCodeName',
        validate: validateEarningName,
        errorMessage: 'Please enter a valid name (at least 2 characters).',
        onSuccess: (value) => {
            earningCodeCreationState.userName = value.trim();
            setTimeout(() => {
                confirmEarningCodeCreation();
            }, 1000);
        }
    },

    earningCodeCode: {
        flagName: 'waitingForEarningCodeCode',
        validate: validateEarningCode,
        errorMessage: 'Please enter a valid code (2-10 characters, uppercase letters/numbers/underscores only).',
        transform: (value) => value.trim().toUpperCase(),
        onSuccess: (value) => {
            earningCodeCreationState.userCode = value;
            setTimeout(() => {
                confirmEarningCodeCreation();
            }, 1000);
        }
    }
};

// Unified input processor - ADD THIS NEW FUNCTION
function processUnifiedInput(message) {
    // Find which input handler is currently active
    for (const [handlerName, config] of Object.entries(inputHandlers)) {
        if (window[config.flagName]) {
            // Reset the flag
            window[config.flagName] = false;

            // Transform the value if needed
            const processedValue = config.transform ? config.transform(message) : message.trim();

            // Validate the input
            if (!config.validate(processedValue)) {
                addMessage(config.errorMessage, 'ai');
                window[config.flagName] = true; // Reset flag to keep waiting
                return true; // Input was handled
            }

            // Add user message to show what they typed
            addMessage(processedValue, 'user');

            // Execute success handler
            config.onSuccess(processedValue);
            return true; // Input was handled
        }
    }

    return false; // No input handler was active
}


function addMessage(content, sender, pills = null, options = {}) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    // Add delay class if specified
    if (options.delay) {
        messageDiv.classList.add(options.delay);
    }

    // Handle process card type FIRST
    if (typeof content === 'object' && content.type === 'process-card') {
        messageDiv.classList.add('process-card-message');
        messageDiv.innerHTML = `
            <div class="process-card" id="process-card-${content.id}">
                <div class="process-card-header">
                    <div class="process-card-icon">⚙️</div>
                    <h4 class="process-card-title">${content.title}</h4>
                </div>
                <div class="process-card-description">${content.description}</div>
                <div class="process-card-meta">
                    <div class="process-card-status ${content.status}">
                        ${content.status === 'processing' ? '<div class="process-card-spinner"></div>' : ''}
                        <span>${content.status === 'processing' ? 'Processing...' : content.status}</span>
                    </div>
                    <div class="process-card-timestamp">${content.timestamp}</div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);

        // Auto-collapse conversation when process card appears
        if (!conversationState.isCollapsed) {
            setTimeout(() => {
                collapseConversationHistory();
            }, 900);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return messageDiv; // EXIT HERE - don't continue processing
    }

    // Handle regular messages (ONLY if not a process card)
    let text = content;
    let responsePills = pills;

    if (typeof content === 'object' && content !== null && content.type !== 'process-card') {
        text = content.text || content;
        responsePills = content.pills || pills;
    }

    let pillsHtml = '';
    if (responsePills && responsePills.length > 0) {
        console.log('=== CREATING PILLS ===', responsePills);

        // Check if we should use radio style
        const useRadioStyle = options.style === 'radio';

        if (options.style === 'radio') {
            pillsHtml = `
                <div class="suggested-radios">
                    ${responsePills.map(pill => `<button class="radio-btn" onclick="selectRadio(this); handlePillClick('${pill.action}')">${pill.text}</button>`).join('')}
                </div>
            `;
        } else if (options.style === 'checkbox') {
            pillsHtml = `
                <div class="suggested-checkboxes">
                    ${responsePills.map(pill => `<button class="checkbox-btn" onclick="toggleCheckbox(this)" data-action="${pill.action}">${pill.text}</button>`).join('')}
                    <button class="pill-btn" onclick="submitCheckboxes()" style="margin-top: 12px; background: #30258D; color: white;">Continue</button>
                </div>
            `;
        } else {
            pillsHtml = `
                <div class="suggested-pills">
                    ${responsePills.map(pill => {
                const pillType = getPillType(pill.action);
                const pillText = pillType === 'interactive' ? `${pill.text} →` : pill.text;
                return `<button class="pill-btn" onclick="handlePillClick('${pill.action}')">${pillText}</button>`;
            }).join('')}
                </div>
            `;
        }
    }

    // Add Bryte logo for AI messages
    let messageContentHtml = '';
    if (sender === 'ai') {
        messageContentHtml = `
            <div class="message-content">
                <img src="attached_assets/bryte logo.svg" alt="Bryte AI Logo" class="ai-logo" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;"/>
                ${text}
            </div>
            ${pillsHtml}
        `;
    } else {
        messageContentHtml = `
            <div class="message-content">${text}</div>
            ${pillsHtml}
        `;
    }

    messageDiv.innerHTML = messageContentHtml;
    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);

    return messageDiv;
}

// ========================================
// UNIFIED MESSAGE SYSTEM (CONSOLIDATION TARGET 3)
// ========================================

function addUnifiedMessage(content, sender, options = {}) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    // Handle delay class if specified
    if (options.delay) {
        messageDiv.classList.add(options.delay);
    }

    // Handle process card type FIRST (existing logic)
    if (typeof content === 'object' && content.type === 'process-card') {
        messageDiv.classList.add('process-card-message');
        messageDiv.innerHTML = `
            <div class="process-card" id="process-card-${content.id}">
                <div class="process-card-header">
                    <div class="process-card-icon">⚙️</div>
                    <h4 class="process-card-title">${content.title}</h4>
                </div>
                <div class="process-card-description">${content.description}</div>
                <div class="process-card-meta">
                    <div class="process-card-status ${content.status}">
                        ${content.status === 'processing' ? '<div class="process-card-spinner"></div>' : ''}
                        <span>${content.status === 'processing' ? 'Processing...' : content.status}</span>
                    </div>
                    <div class="process-card-timestamp">${content.timestamp}</div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);

        // Auto-collapse conversation when process card appears
        if (!conversationState.isCollapsed) {
            setTimeout(() => {
                collapseConversationHistory();
            }, 900);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return messageDiv;
    }

    // Extract text and pills from content
    let text = content;
    let pills = options.pills || null;

    if (typeof content === 'object' && content !== null && content.type !== 'process-card') {
        text = content.text || content;
        pills = content.pills || options.pills;
    }

    // Generate pills HTML (unified logic)
    let pillsHtml = '';
    if (pills && pills.length > 0) {
        console.log('=== CREATING PILLS (UNIFIED) ===', pills);

        if (options.style === 'radio') {
            pillsHtml = `
                <div class="suggested-radios">
                    ${pills.map(pill => `<button class="radio-btn" onclick="selectRadio(this); handlePillClick('${pill.action}')">${pill.text}</button>`).join('')}
                </div>
            `;
        } else if (options.style === 'checkbox') {
            pillsHtml = `
                <div class="suggested-checkboxes">
                    ${pills.map(pill => `<button class="checkbox-btn" onclick="toggleCheckbox(this)" data-action="${pill.action}">${pill.text}</button>`).join('')}
                    <button class="pill-btn" onclick="submitCheckboxes()" style="margin-top: 12px; background: #30258D; color: white;">Continue</button>
                </div>
            `;
        } else {
            pillsHtml = `
                <div class="suggested-pills">
                    ${pills.map(pill => {
                const pillType = getPillType(pill.action);
                const pillText = pillType === 'interactive' ? `${pill.text} →` : pill.text;
                return `<button class="pill-btn" onclick="handlePillClick('${pill.action}')">${pillText}</button>`;
            }).join('')}
                </div>
            `;
        }
    }

    // Build message content with optional accordion
    let messageContentHtml = '';
    if (sender === 'ai') {
        messageContentHtml = `
            <div class="message-content">
                <img src="attached_assets/bryte logo.svg" alt="Bryte AI Logo" class="ai-logo" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;"/>
                ${text}
            </div>
            ${options.accordion || ''}
            ${pillsHtml}
        `;
    } else {
        messageContentHtml = `
            <div class="message-content">${text}</div>
            ${options.accordion || ''}
            ${pillsHtml}
        `;
    }

    messageDiv.innerHTML = messageContentHtml;
    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);

    return messageDiv;
}


function handlePillClick(action, skipUserMessage = false) {

    console.log('=== PILL CLICKED ===', action);

    // Find the exact pill text that was clicked
    // Only find pill text and add user message if not skipped
    let message = null;
    if (!skipUserMessage) {
        const clickedPill = document.querySelector(`[onclick="handlePillClick('${action}')"]`);
        const pillText = clickedPill ? clickedPill.textContent.replace(' →', '') : action; // Remove arrow if present
        message = pillText; // Use the exact pill text
    }

    // Instantly remove ALL pills
    const allPills = document.querySelectorAll('.suggested-pills');
    allPills.forEach(pills => {
        if (pills.parentNode) {
            pills.parentNode.removeChild(pills);
        }
    });
    let response = null;
    let rightPanelAction = null;

    switch (action) {
      

            case 'create-new-earning-code':
            message = 'Create new earning code';
            addMessage(message, 'user');

            // Remove pills immediately
            const allPills = document.querySelectorAll('.suggested-pills');
            allPills.forEach(pills => {
                if (pills.parentNode) {
                    pills.parentNode.removeChild(pills);
                }
            });
            
            setTimeout(() => {
                startEarningCodeCreationWorkflow();
            }, 1000);
            return;

            case 'accept-earning-code-suggestions':
                message = 'Accept suggestions';
                addMessage(message, 'user');
                setTimeout(() => {
                    acceptEarningCodeSuggestions();
                }, 1000);
                return;

            case 'edit-earning-code-name':
                message = 'Edit name';
                addMessage(message, 'user');
                setTimeout(() => {
                    addMessage('What would you like to name this earning code?', 'ai');
                    window.waitingForEarningCodeName = true;
                }, 1000);
                return;

            case 'edit-earning-code-code':
                message = 'Edit code';
                addMessage(message, 'user');
                setTimeout(() => {
                    addMessage('What code would you like to use? (2-10 characters, uppercase letters/numbers/underscores only)', 'ai');
                    window.waitingForEarningCodeCode = true;
                }, 1000);
                return;

            case 'confirm-add-earning-code':
                message = 'Yes, add it';
                addMessage(message, 'user');
                setTimeout(() => {
                    addNewEarningCodeToTable();
                }, 1000);
                return;

            case 'cancel-earning-code-creation':
                message = 'Cancel';
                addMessage(message, 'user');
                setTimeout(() => {
                    earningCodeCreationState.isActive = false;
                    window.waitingForEarningCodeDescription = false;
                    window.waitingForEarningCodeName = false;
                    window.waitingForEarningCodeCode = false;
                    addMessage('Earning code creation cancelled. What would you like to do next?', 'ai', [
                        { action: 'create-new-earning-code', text: 'Create new earning code' },
                        { action: 'continue-to-recommendations', text: 'Continue to next step' }
                    ]);
                }, 1000);
                return;
            
        case 'change-semi-name':
            message = 'Change Semi-Monthly name';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage('What would you like to name the Semi-Monthly schedule?', 'ai');

                // Set flag to wait for semi-monthly name input
                window.waitingForSemiMonthlyNameInput = true;
            }, 1000);
            return;

        case 'change-semi-first-pay-date':
            message = 'Change first pay date';
            addMessage(message, 'user');

            setTimeout(() => {
                chatDatePickerShow('What should be the first pay date for the Semi-Monthly schedule?', function(selectedDate) {
                    // Handle the selected date for semi-monthly
                    const formattedDate = selectedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Update the semi-monthly card with the new first pay date
                    updateScheduleField('semi-monthly', 'first-pay-date', formattedDate);

                    setTimeout(() => {
                        addMessage(`✅ Semi-Monthly first pay date updated to: **${formattedDate}**\n\nWhat else would you like to modify?`, 'ai', [
                            { action: 'change-semi-name', text: 'Change name' },
                            { action: 'change-semi-weekend-rules', text: 'Change weekend rules' },
                            { action: 'looks-good', text: 'Looks good, continue' }
                        ]);
                    }, 1000);
                });
            }, 1000);
            return;

        case 'change-weekly-name':
            message = 'Change Weekly name';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage('What would you like to name the Weekly schedule?', 'ai');

                // Set flag to wait for weekly name input
                window.waitingForWeeklyNameInput = true;
            }, 1000);
            return;

        case 'change-weekly-first-pay-date':
            message = 'Change first pay date';
            addMessage(message, 'user');

            setTimeout(() => {
                chatDatePickerShow('What should be the first pay date for the Weekly schedule?', function(selectedDate) {
                    // Handle the selected date for weekly
                    const formattedDate = selectedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Update the weekly card with the new first pay date
                    updateScheduleField('weekly', 'first-pay-date', formattedDate);

                    setTimeout(() => {
                        addMessage(`✅ Weekly first pay date updated to: **${formattedDate}**\n\nWhat else would you like to modify?`, 'ai', [
                            { action: 'change-weekly-name', text: 'Change name' },
                            { action: 'change-weekly-weekend-rules', text: 'Change weekend rules' },
                            { action: 'looks-good', text: 'Looks good, continue' }
                        ]);
                    }, 1000);
                });
            }, 1000);
            return;
        case 'confirm-company-info':
            message = 'Confirm information';
            addMessage(message, 'user');

            // Update status to confirmed
            updateCompanyInfoStatus('confirmed');

            setTimeout(() => {
                addMessage('✅ Company information confirmed!\n\nNow let\'s set up your pay schedules. I\'ve extracted information for two different pay schedules from your documents.', 'ai', [
                    { action: 'continue-to-schedules', text: 'Set up pay schedules' },
                    { action: 'review-company-info', text: 'Review company info again' }
                ]);
            }, 1000);
            return;

        case 'make-corrections':
            message = 'Make corrections';
            addMessage(message, 'user');

            // Update status to editing
            updateCompanyInfoStatus('editing');

            setTimeout(() => {
                addMessage('What would you like to correct?', 'ai', [
                    { action: 'edit-company-name', text: 'Edit company name' },
                    { action: 'edit-address', text: 'Edit address' },
                    { action: 'edit-ein', text: 'Edit EIN' }
                ]);
            }, 1000);
            return;

        case 'add-new-ein':
            message = 'Add new EIN';
            addMessage(message, 'user');

            // Update status to editing
            updateCompanyInfoStatus('editing');

            setTimeout(() => {
                addMessage('Please enter your company\'s EIN in the format: XX-XXXXXXX', 'ai');

                // Set flag to wait for EIN input
                window.waitingForEINInput = true;
            }, 1000);
            return;

        case 'edit-company-name':
            message = 'Edit company name';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage(`Current company name: **${extractedCompanyInfo.legalName}**\n\nPlease enter the correct legal company name:`, 'ai');

                // Set flag to wait for company name input
                window.waitingForCompanyNameInput = true;
            }, 1000);
            return;

        case 'edit-address':
            message = 'Edit address';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage(`Current address: **${extractedCompanyInfo.address}**\n\nPlease enter the correct company address:`, 'ai');

                // Set flag to wait for address input
                window.waitingForAddressInput = true;
            }, 1000);
            return;

        case 'edit-ein':
            message = 'Edit EIN';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage(`Current EIN: **${extractedCompanyInfo.ein}**\n\nPlease enter the correct EIN in the format: XX-XXXXXXX`, 'ai');

                // Set flag to wait for EIN input
                window.waitingForEINInput = true;
            }, 1000);
            return;

        case 'continue-to-schedules':
            message = 'Set up pay schedules';
            addMessage(message, 'user');

            setTimeout(() => {
                // Transition to existing pay schedule setup
                loadInitialScheduleCards();
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} I\'ve analyzed your pay registers and extracted information for two different pay schedules:\n\n**Schedule 1: Semi-Monthly**\n- Pay frequency: Twice per month\n- Pay dates: 15th and last day of each month\n\n**Schedule 2: Weekly**\n- Pay frequency: Every week\n- Pay day: Friday\n\nLet\'s verify these schedules first. Shall we start?`, 'ai', [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]);
            }, 1000);
            return;

        case 'review-company-info':
            message = 'Review company info again';
            addMessage(message, 'user');

            setTimeout(() => {
                addMessage('Here\'s your confirmed company information:\n\n' +
                    `**Legal Name:** ${extractedCompanyInfo.legalName}\n` +
                    `**Address:** ${extractedCompanyInfo.address}\n` +
                    `**EIN:** ${extractedCompanyInfo.ein}\n\n` +
                    'Ready to continue?', 'ai', [
                    { action: 'continue-to-schedules', text: 'Set up pay schedules' },
                    { action: 'make-corrections', text: 'Make more corrections' }
                ]);
            }, 1000);
            return;


        case 'upload-documents':
            message = 'Upload documents (recommended)';
            addMessage(message, 'user');

            // Collapse timeline conversation
            setTimeout(() => {
                collapseConversationHistory("Timeline configuration threads");
            }, 500);

            setTimeout(() => {
                showDocumentUploadInterface();
                addMessage('Great choice! Uploading documents will help me configure your system faster and more accurately.\n\n**Upload your documents →**\n• Employee handbook (helps identify pay policies)\n• Recent payroll history (fastest way to extract earning codes)\n\nBoth uploads are optional, but they save significant setup time.', 'ai', [
                    { action: 'complete-document-upload', text: 'Finished uploading' },

                    { action: 'skip-to-company-config', text: 'Skip to company configuration' }
                ]);
            }, 1000);
            return;



        case 'why-upload-documents':
            message = 'Why do I need to upload documents?';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('Uploading documents provides several key benefits:\n\n**📋 Employee Handbook Benefits:**\n• Automatically extract pay policies\n• Identify overtime rules and holiday pay\n• Configure time-off policies correctly\n\n**📊 Payroll History Benefits:**\n• Extract all your earning codes instantly\n• Copy exact rate configurations\n• Reduce setup time by 80%\n\n**Without documents:** Manual configuration takes 45-60 minutes\n**With documents:** Automated extraction takes 5-10 minutes', 'ai', [
                    { action: 'upload-documents', text: 'Upload documents now' },
                    { action: 'start-schedule-setup', text: 'Skip and configure manually' }
                ]);
            }, 1000);
            return;

        case 'skip-document-upload':
            message = 'Skip and configure manually';
            addMessage(message, 'user');
            setTimeout(() => {
                // Transition to existing payroll setup
                loadInitialScheduleCards();
                addMessage('No problem! I\'ll guide you through manual configuration.\n\nI\'ve analyzed your pay registers and extracted information for two different pay schedules. Let\'s verify these schedules first.', 'ai', [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]);
            }, 1000);
            return;

        case 'explain-document-benefits':
            message = 'Tell me more about benefits';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('Here\'s exactly how document upload saves time:\n\n**⚡ Speed Comparison:**\n• Manual setup: 45-60 minutes of Q&A\n• With documents: 5-10 minutes automated extraction\n\n**🎯 Accuracy Benefits:**\n• No risk of missed earning codes\n• Exact rate matching from your current system\n• Policy compliance automatically checked\n\n**💼 Professional Setup:**\n• Industry best practices automatically applied\n• Audit-ready configuration from day 1\n• Seamless migration from your current system', 'ai', [
                    { action: 'upload-documents', text: 'Upload documents now' },
                    { action: 'start-schedule-setup', text: 'Continue with manual setup' }
                ]);
            }, 1000);
            return;





        case 'complete-document-upload':
            message = 'Complete uploading';
            addMessage(message, 'user');
            setTimeout(() => {
                // Check if files were uploaded
                const handbookInput = document.getElementById('handbookFileInput');
                const payrollInput = document.getElementById('payrollFileInput');

                if (handbookInput?.files.length > 0 || payrollInput?.files.length > 0) {
                    // Call existing document processing simulation
                    simulateDocumentProcessing(handbookInput.files.length > 0, payrollInput.files.length > 0);
                } else {
                    addMessage('I don\'t see any uploaded files yet. Please drag and drop your documents in the upload areas on the right, or click "Skip to company configuration" to continue without uploading.', 'ai', [
                        { action: 'skip-to-company-config', text: 'Skip to company configuration' },

                    ]);
                }
            }, 1000);
            return;

        case 'skip-to-company-config':
            message = 'Skip to company configuration';
            addMessage(message, 'user');
            setTimeout(() => {
                // Transition to existing payroll setup
                loadInitialScheduleCards();
                addMessage('No problem! I\'ll guide you through manual configuration.\n\nI\'ve analyzed your pay registers and extracted information for two different pay schedules. Let\'s verify these schedules first.', 'ai', [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]);
            }, 1000);
            return;

        // === BASIC SCHEDULE ACTIONS ===
        case 'add-new':
            response = {
                text: 'I\'d be happy to help you add a new pay schedule!\n\nWhich type would you like to add?',
                pills: [
                    { action: 'weekly', text: 'Add weekly' },
                    { action: 'bi-weekly', text: 'Add Bi-weekly' },
                    { action: 'semi-monthly', text: 'Add Semi-monthly' },
                    { action: 'monthly', text: 'Add Monthly' },
                    { action: 'quarterly', text: 'Add Quarterly' }

                ]
            };
            break;

        case 'bi-weekly':
        // Always execute the core action logic
        updatePanelContent('biweekly-placeholder');
        
        // Only add AI response if this isn't called from natural language
        if (!skipUserMessage) {
            response = {
                text: `${CONSTANTS.MESSAGES.PERFECT} I've added a Bi-weekly schedule to your payroll setup.\n\nWhat would you like to name this schedule?`,
                pills: []
            };
            window.waitingForBiweeklyName = true;
        } else {
            // When called from natural language, add the follow-up message
            setTimeout(() => {
                addMessage(`What would you like to name this schedule?`, 'ai');
                window.waitingForBiweeklyName = true;
            }, 1000);
        }
        break;
        case 'monthly':
            addMonthlySchedule();
            response = {
                text: '✅ Added Monthly schedule! This schedule pays employees once per month (12 times per year). You now have 3 pay schedules configured.',
                pills: [
                    { action: 'approve-all', text: 'Approve all schedules' },
                    { action: 'edit-schedule', text: 'Edit a schedule' },
                    { action: 'remove-schedule', text: 'Remove a schedule' }
                ]
            };
            break;

        case 'quarterly':
            response = 'Quarterly schedules are less common for payroll. Are you sure you want quarterly payments (4 times per year)?';
            break;



        case 'edit-schedule':
            message = 'Edit schedule';
            response = {
                text: 'Sure! Which schedule would you like to modify?',
                pills: [
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' },
                    { action: 'edit-both', text: 'Edit both schedules' }
                ]
            };
            break;

        // ADD THESE NEW CASES after the existing cases:

        case 'edit-semi-monthly':
            message = 'Edit Semi-Monthly';
            response = {
                text: 'What would you like to modify for the <Strong>Semi-Monthly</strong> schedule?',
                pills: [
                    { action: 'change-semi-name', text: 'Change name' },
                    { action: 'change-semi-first-pay-date', text: 'Change first pay date' },
                    { action: 'change-semi-weekend-rules', text: 'Change weekend rules' },
                    { action: 'change-semi-holiday-rules', text: 'Change holiday rules' }
                ]
            };
            break;

        case 'edit-weekly':
            message = 'Edit Weekly';
            response = {
                text: 'What would you like to modify for the Weekly schedule?',
                pills: [
                    { action: 'change-weekly-name', text: 'Change name' },
                    { action: 'change-weekly-first-pay-date', text: 'Change first pay date' },
                    { action: 'change-weekly-weekend-rules', text: 'Change weekend rules' },
                    { action: 'change-weekly-holiday-rules', text: 'Change holiday rules' }
                ]
            };
            break;



        // ADD THESE SPECIFIC EDIT ACTIONS:

        case 'change-semi-pay-dates':
            message = 'Change pay dates';
            response = {
                text: 'What pay dates would you like for the Semi-Monthly schedule?\n\n**Current:** 15th and last day of month\n**Common alternatives:**\n• 1st and 15th of month\n• 10th and 25th of month\n• Custom dates',
                pills: [
                    { action: 'set-semi-1st-15th', text: '1st and 15th' },
                    { action: 'set-semi-10th-25th', text: '10th and 25th' },
                    { action: 'set-semi-custom-dates', text: 'Custom dates' }
                ]
            };
            break;

        case 'change-weekly-pay-day':
            message = 'Change pay day';
            response = {
                text: 'What day would you like for Weekly payroll?\n\n**Current:** Every Friday\n**Other options:**',
                pills: [
                    { action: 'set-weekly-monday', text: 'Monday' },
                    { action: 'set-weekly-tuesday', text: 'Tuesday' },
                    { action: 'set-weekly-wednesday', text: 'Wednesday' },
                    { action: 'set-weekly-thursday', text: 'Thursday' },
                    { action: 'keep-weekly-friday', text: 'Keep Friday' }
                ]
            };
            break;

        case 'change-semi-name':
            message = 'Change name';
            response = 'What would you like to name the Semi-Monthly schedule?';
            break;

        case 'change-semi-first-pay-date':
            message = 'Change first pay date';
            response = 'What should be the first pay date for the Semi-Monthly schedule? (e.g., August 15, 2025)';
            break;

        case 'change-weekly-name':
            message = 'Change name';
            response = 'What would you like to name the Weekly schedule?';
            break;

        case 'change-weekly-first-pay-date':
            message = 'Change first pay date';
            response = 'What should be the first pay date for the Weekly schedule? (e.g., August 8, 2025)';
            break;


        case 'edit-weekly':
            message = 'Edit Weekly schedule';
            response = 'I can help you modify the Weekly schedule. What would you like to change?\n\n• **Pay day**: Currently Friday - change to another day?\n• **Hours**: Currently 40 hours - adjust for part-time?\n• **Weekend/Holiday dates**: Currently Friday before - change timing?\n\nJust tell me what you\'d like to update!';
            break;


        case 'view-semi-monthly':
            message = 'Show Semi-Monthly details';
            response = 'Here are the Semi-Monthly payroll details for August-December 2025:\n\n📅 **Key Dates:**\n• Pay dates: 15th and last day of each month\n• Submit deadline: 2 business days before pay date by 1:30 PM EST\n• Weekend adjustments: Pay moves to Friday before\n• Holiday adjustments: Pay moves to previous business day\n\n**August Example:**\n• 1st pay: Submit by Aug 13, Pay Aug 15\n• 2nd pay: Submit by Aug 27, Pay Aug 29\n\nReview the calendar on the right for complete details!';
            break;

        case 'view-weekly':
            message = 'Show Weekly details';
            response = 'Here are the Weekly payroll details starting August 2025:\n\n📅 **Key Dates:**\n• Pay day: Every Friday\n• Submit deadline: 2 business days before (Wednesday) by 1:30 PM EST\n• Weekend/Holiday adjustments: Pay moves to Thursday before\n\n**August Examples:**\n• Week 1: Submit Wed Aug 6, Pay Fri Aug 8\n• Week 2: Submit Wed Aug 13, Pay Fri Aug 15\n• Week 3: Submit Wed Aug 20, Pay Fri Aug 22\n\nSwitch to the Weekly tab on the right to see the full calendar!';
            break;

        case 'change-semi-weekend-rules':
            message = 'Change weekend/holiday rules';
            response = {
                text: 'Choose the weekend adjustment rule for **Semi-Monthly** schedule:\n\n<strong>.Current: Friday before the date</strong>\nAvailable options:',
                pills: [
                    { action: 'set-semi-weekend-previous-friday', text: 'Previous Friday' },
                    { action: 'set-semi-weekend-following-monday', text: 'Following Monday' }
                ]
            };
            break;

        case 'change-weekly-weekend-rules':
            message = 'Change weekend/holiday rules';
            response = {
                text: 'Choose the weekend adjustment rule for Weekly schedule:\n\n<Strong>Current:</strong> Friday before the date\nAvailable options:',
                pills: [
                    { action: 'set-weekly-weekend-previous-friday', text: 'Previous Friday' },
                    { action: 'set-weekly-weekend-following-monday', text: 'Following Monday' }
                ]
            };
            break;

        // Weekend rule updates
        case 'set-semi-weekend-previous-friday':
            message = 'Previous Friday';
            updateScheduleRule('semi-monthly', 'weekend', 'Previous Friday');
            response = {
                text: '✅ Updated Semi-Monthly weekend rule to "Previous Friday"\n\nWeekend rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]
            };
            break;

        case 'set-semi-weekend-following-monday':
            message = 'Following Monday';
            updateScheduleRule('semi-monthly', 'weekend', 'Following Monday');
            response = {
                text: '✅ Updated Semi-Monthly weekend rule to "Following Monday"\n\nWeekend rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]
            };
            break;

        case 'set-weekly-weekend-previous-friday':
            message = 'Previous Friday';
            updateScheduleRule('weekly', 'weekend', 'Previous Friday');
            response = {
                text: '✅ Updated Weekly weekend rule to "Previous Friday"\n\nWeekend rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' }
                ]
            };
            break;

        case 'set-weekly-weekend-following-monday':
            message = 'Following Monday';
            updateScheduleRule('weekly', 'weekend', 'Following Monday');
            response = {
                text: '✅ Updated Weekly weekend rule to "Following Monday"\n\nWeekend rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' }
                ]
            };
            break;

        // ADD THESE MISSING HOLIDAY RULE CASES

        case 'change-semi-holiday-rules':
            message = 'Change holiday rules';
            response = {
                text: 'Choose the holiday adjustment rule for Semi-Monthly schedule:\n\n<strong>Current: Business before the date,</strong>\nAvailable options:',
                pills: [
                    { action: 'set-semi-holiday-business-before', text: 'Business day before' },
                    { action: 'set-semi-holiday-business-after', text: 'Business day after' },
                    { action: 'set-semi-holiday-closest-business', text: 'Closest business day' }
                ]
            };
            break;

        case 'change-weekly-holiday-rules':
            message = 'Change holiday rules';
            response = {
                text: 'Choose the holiday adjustment rule for Weekly schedule:\n\n<strong.Current:Business before the date </strong>\nAvailable options:',
                pills: [
                    { action: 'set-weekly-holiday-business-before', text: 'Business day before' },
                    { action: 'set-weekly-holiday-business-after', text: 'Business day after' },
                    { action: 'set-weekly-holiday-closest-business', text: 'Closest business day' }
                ]
            };
            break;

        // Holiday rule updates
        case 'set-semi-holiday-business-before':
            message = 'Business day before';
            updateScheduleRule('semi-monthly', 'holiday', 'Business day before');
            response = {
                text: '✅ Semi-Monthly holiday rule updated to "Business day before"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]
            };
            break;

        case 'set-semi-holiday-business-after':
            message = 'Business day after';
            updateScheduleRule('semi-monthly', 'holiday', 'Business day after');
            response = {
                text: '✅ Semi-Monthly holiday rule updated to "Business day after"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]
            };
            break;

        case 'set-semi-holiday-closest-business':
            message = 'Closest business day';
            updateScheduleRule('semi-monthly', 'holiday', 'Closest business day');
            response = {
                text: '✅ Semi-Monthly holiday rule updated to "Closest business day"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                ]
            };
            break;

        case 'set-weekly-holiday-business-before':
            message = 'Business day before';
            updateScheduleRule('weekly', 'holiday', 'Business day before');
            response = {
                text: '✅ Weekly holiday rule updated to "Business day before"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' }
                ]
            };
            break;

        case 'set-weekly-holiday-business-after':
            message = 'Business day after';
            updateScheduleRule('weekly', 'holiday', 'Business day after');
            response = {
                text: '✅ Weekly holiday rule updated to "Business day after"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' }
                ]
            };
            break;

        case 'set-weekly-holiday-closest-business':
            message = 'Closest business day';
            updateScheduleRule('weekly', 'holiday', 'Closest business day');
            response = {
                text: '✅ Weekly holiday rule updated to "Closest business day"\n\nHoliday rule has been configured. What would you like to do next?',
                pills: [
                    { action: 'looks-good', text: 'Looks good, continue' },
                    { action: 'add-new', text: 'Add new schedule' },
                    { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' }
                ]
            };
            break;

        // === EARNING CODES ACTIONS ===

        case 'explain-assessments':
            message = 'Explain assessment types';
            response = {
                text: 'Here\'s what each assessment means:\n\n**🟢 Confident**: Clear, standard codes I recognize\n**🟡 Review**: Codes that need your verification\n**🔴 Missing**: Codes without names/descriptions\n\n**Assessment Details:**\n• REG, OTShift, HOL, OTHOL → Standard codes ✅\n• OTHOL2, OTHOL3, COMM, BONUS → Need review ⚠️\n• VAC, SICK, MISC → Missing info ❌\n\nReady to start reviewing?',
                pills: [
                    { action: 'approve-confident-codes', text: 'Start with confident codes' },
                    { action: 'fill-missing-codes', text: 'Fill missing details first' },
                    { action: 'review-all-together', text: 'Review everything together' }
                ]
            };
            break;

        case 'review-yellow-codes':
            message = 'Review yellow-flagged codes';
            response = 'The yellow-flagged codes need your verification:\n\n• **OTHOL2, OTHOL3** - Multiple overtime holiday tiers\n• **COMM** - Commission payments\n• **BONUS** - Performance bonuses\n\nThese look correct but please confirm they match your payroll needs.';
            break;

        case 'approve-all-remaining':
            message = 'Approve all remaining';
            approveAllCodes();
            return;

        case 'review-all-together':
            message = 'Review everything together';
            response = 'Great approach! You can review all codes in the table. Click on any field to edit it, or use the bulk actions at the top to approve multiple codes at once.';
            break;



        // === SUGGESTIONS ACTIONS ===
        case 'accept-all-suggestions':
            message = 'Accept all recommendations';
            applyAllSuggestions();
            response = {
                text: `✅ ${CONSTANTS.MESSAGES.PERFECT} I\'ve applied all 4 recommendations:\n\n• Renamed codes for clarity\n• Consolidated OTHOL2 and OTHOL3\n• Removed unused MISC code\n• Fixed vacation/sick leave setup\n\n**Your earning codes are now optimized!** Ready for the final step?`,
                pills: [
                    { action: 'continue-to-rate-config', text: 'Continue to Rate Configuration' },
                    { action: 'review-final-codes', text: 'Review final code list' },
                    { action: 'undo-suggestions', text: 'Undo changes' }
                ]
            };
            break;

        case 'explain-suggestions':
            message = 'Explain these recommendations';
            response = {
                text: 'Here\'s what each recommendation will improve:\n\n**1. Rename codes** - Makes them clearer for payroll staff\n**2. Consolidate codes** - Reduces complexity and confusion\n**3. Remove unused codes** - Cleans up your setup\n**4. Fix missing info** - Ensures proper tracking\n\nEach recommendation can be accepted or rejected individually in the panel →',
                pills: [
                    { action: 'accept-all-suggestions', text: 'Apply all recommendations' },
                    { action: 'skip-suggestions', text: 'Skip all recommendations' },
                    { action: 'review-benefits', text: 'Tell me more benefits' }
                ]
            };
            break;





        // === RATE CONFIGURATION ACTIONS ===
        case 'set-standard-rates':
            message = 'Use standard rates';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('Applied standard rate configurations for all earning codes. Ready to continue?', 'ai', [
                    { action: 'continue-to-w2-preview', text: 'Show W-2 Preview' },
                    { action: 'custom-rate-setup', text: 'I want to customize rates' }
                ]);
            }, 1000);
            return;



        // === W-2 ACTIONS ===
        case 'explain-w2-boxes':
            message = 'Explain W-2 boxes';
            response = {
                text: '**W-2 Form Boxes Explained:**\n\n• **Box 1** - Total wages, tips, and compensation\n• **Box 3** - Social Security wages (may differ from Box 1)\n• **Box 5** - Medicare wages and tips\n• **Box 12** - Special codes (401k, insurance, etc.)\n• **Box 14** - Other compensation\n\nYour earning codes are automatically assigned to the correct boxes based on their tax treatment.',
                pills: [
                    { action: 'adjust-w2-reporting', text: 'Adjust reporting settings' },
                    { action: 'finalize-complete-setup', text: 'Complete setup' }
                ]
            };
            break;

        case 'adjust-w2-reporting':
            message = 'Adjust reporting settings';
            response = {
                text: 'W-2 reporting adjustments can be made in the rate configuration table above. You can modify:\n• Special taxability settings\n• Which codes reduce base pay\n• Weighted average overtime calculations\n\nWould you like to go back and make changes?',
                pills: [
                    { action: 'back-to-rate-config', text: 'Back to Rate Configuration' },
                    { action: 'finalize-complete-setup', text: 'Settings look good, complete setup' }
                ]
            };
            break;



        case 'accept-earning-code-suggestions':
            message = 'Accept suggestions';
            addMessage(message, 'user');
            setTimeout(() => {
                acceptEarningCodeSuggestions();
            }, 1000);
            return;

        case 'edit-earning-code-name':
            message = 'Edit name';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('What would you like to name this earning code?', 'ai');
                window.waitingForEarningCodeName = true;
            }, 1000);
            return;

        case 'edit-earning-code-code':
            message = 'Edit code';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('What code would you like to use? (2-10 characters, uppercase letters/numbers/underscores only)', 'ai');
                window.waitingForEarningCodeCode = true;
            }, 1000);
            return;

        case 'confirm-add-earning-code':
            message = 'Yes, add it';
            addMessage(message, 'user');
            setTimeout(() => {
                addNewEarningCodeToTable();
            }, 1000);
            return;

        case 'cancel-earning-code-creation':
            message = 'Cancel';
            addMessage(message, 'user');
            setTimeout(() => {
                earningCodeCreationState.isActive = false;
                window.waitingForEarningCodeDescription = false;
                window.waitingForEarningCodeName = false;
                window.waitingForEarningCodeCode = false;
                addMessage('Earning code creation cancelled. What would you like to do next?', 'ai', [
                    { action: 'create-new-earning-code', text: 'Create new earning code' },
                    { action: 'continue-to-recommendations', text: 'Continue to next step' }
                ]);
            }, 1000);
            return;

        case 'finalize-complete-setup':
            message = 'Complete setup';
            addMessage(message, 'user');
            setTimeout(() => {
                completePayrollSetup();
            }, 1000);
            return;


        case 'start-over':
            message = 'Start New Configuration';
            response = 'Are you sure you want to start a completely new payroll configuration? This will reset all current settings.';
            break;

        // === EXISTING WORKING CASES (Keep these) ===
        

        case 'continue-to-recommendations':
            message = 'Continue to Recommendations';
            addMessage(message, 'user');

            // Check if any codes have been approved
            const approvedCount = earningCodes.filter(code => code.reviewed).length;
            
            if (approvedCount === 0) {
                // No codes approved - show validation message with proper options
                setTimeout(() => {
                    addMessage('You haven\'t approved any earning codes yet. Please review and approve your codes before continuing, or choose an alternative:', 'ai', [
                        { action: 'approve-all-remaining', text: 'Approve all codes' },
                        { action: 'skip-to-deduction-codes', text: 'Skip to deduction codes' },
                        { action: 'skip-to-tax-configuration', text: 'Skip to tax configuration' }
                    ]);
                }, 1000);
                return;
            }

            // Show spinner in right panel immediately
            const panelContent = document.querySelector('.panel-content');
            if (panelContent) {
                panelContent.innerHTML = `
                <div class="loading-container">
                    <div class="spinner"></div>
                    <div class="loading-text">${CONSTANTS.MESSAGES.LOADING} recommendations...</div>
                    <div class="loading-subtext">Analyzing your earning codes</div>
                </div>
            `;
            }

            setTimeout(function() {
                // Calculate summary
                const pendingCount = earningCodes.filter(code => !code.reviewed && code.assessment != 'missing').length;
                const missingCount = earningCodes.filter(code => code.assessment == 'missing').length;
                const totalCount = earningCodes.length;

                const summaryText = `Thank you for participating in our usability test!`;

                addMessage(summaryText, 'ai', [
                   //{ action: 'move-to-rate-configuration', text: 'Done! Next: Rate configuration' },
                    //{ action: 'skip-suggestions', text: 'Skip all recommendations' }
                ]);

                // Show AI suggestions after spinner
                setTimeout(function() {
                    showAISuggestions();
                }, 1500);
            }, 1000);
            return null;

        case 'skip-to-deduction-codes':
            message = 'Skip to Deduction Codes';
            addMessage(message, 'user');
            setTimeout(function() {
                addMessage('Moving to deduction codes review...', 'ai');
            }, 1000);
            return;

        case 'skip-to-tax-configuration':
            message = 'Skip to Tax Configuration';
            addMessage(message, 'user');
            setTimeout(function() {
                addMessage('Jumping directly to tax configuration...', 'ai');
                setTimeout(function() { showW2Simulation(); }, 1500);
            }, 1000);
            return;

        case 'skip-suggestions':
            message = 'Skip all recommendations';
            addMessage(message, 'user');
            setTimeout(() => {
                currentStep = 5;
                showRateConfiguration();
                addMessage('Now let\'s set up how much each earning code pays:\n\n<strong>Review the configuration in the table →</strong>\n• Regular codes: Hourly rates\n• Overtime codes: Multipliers (1.5x, 2.0x)\n• Bonus codes: Flat amounts\n\nOnce you\'re satisfied with the rate configuration, let me know when you\'re ready to see the W-2 preview!', 'ai', [
                    { action: 'set-standard-rates', text: 'Use standard rates' },
                    { action: 'custom-rate-setup', text: 'Set custom rates' },
                    { action: 'continue-to-w2-preview', text: 'Show W-2 Preview' }
                ]);
            }, 1000);
            return;

        case 'move-to-rate-configuration':
            message = 'Move to Rate Configuration';
            addMessage(message, 'user');
            setTimeout(() => {
                currentStep = 5;
                showRateConfiguration();
                addMessage('Now let\'s set up how much each earning code pays:\n\n<strong>Review the configuration in the table →</strong>\n\Once you\'re satisfied with the configuration, let me know when you\'re ready to see the W-2 preview!', 'ai', [
                    { action: 'set-standard-rates', text: 'Use standard rates' },
                    { action: 'custom-rate-setup', text: 'Set custom rates' },
                    { action: 'continue-to-w2-preview', text: 'Show W-2 Preview' }
                ]);
            }, 1000);
            return;

        case 'continue-to-rate-config':
            message = 'Continue to Rate Configuration';
            addMessage(message, 'user');
            setTimeout(() => {
                currentStep = 5;
                showRateConfiguration();
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} Moving to <stong> Earning codes Configuration</strong>.\n\nConfigure how much each earning code pays and their tax treatment settings.`, 'ai', [
                    { action: 'set-standard-rates', text: 'Use standard rates' },
                    { action: 'custom-rate-setup', text: 'Set custom rates' },
                    { action: 'continue-to-w2-preview', text: 'Show W-2 Preview' }
                ]);
            }, 1000);
            return;

        case 'continue-to-w2-preview':
            message = 'Show W-2 Preview';
            addMessage(message, 'user');
            setTimeout(() => {
                finalizeConfiguration();
            }, 1000);
            return;

        case 'approve-all':
case 'looks-good':
    // Add user message first
    if (!skipUserMessage) {
        addMessage('Looks good, continue', 'user');
    }

    // Immediately show process card
    setTimeout(() => {
        const processCard = createProcessCard({
            title: 'Configure pay schedule',
            description: 'Configuring pay schedules...',
            status: 'processing',
            timestamp: 'Just started',
            id: 'pay-schedule-config'
        });

        addMessage(processCard, 'ai');

        // Collapse conversation threads after 500ms
        setTimeout(() => {
            collapseConversationHistory("Pay schedule configuration threads");
        }, 500);

        // Skip calendar simulation entirely and go directly to earning codes after 2 seconds
        setTimeout(() => {
            currentStep = 3;
            showEarningCodesReview();
            addMessage('We found 6 earning codes in your payroll registers. Let\'s make sure we have everything set up correctly for your team.\n\n <Strong>How this works:→</strong>\n\n• ✅ Green badges: We\'re confident about these codes and they\'re ready to go\n• ⚠️ Yellow badges: These need your review. We want to make sure we got them right\n• ❌ Red badges: We\'re missing some info and need your help to complete them\n\n<strong>What you need to do:</strong> Review the codes in the table below and approve the ones you want to use.\n\n<strong>Ready to move forward?</strong> Once you\'ve reviewed your codes, click "Continue" and we\'ll take you through the next steps.', 'ai', [
                 { action: 'continue-to-recommendations', text: 'Continue' },
                { action: 'create-new-earning-code', text: 'Create new earning code' },
                { action: 'skip-to-deduction-codes', text: 'Skip to Deduction Codes' },
                { action: 'skip-to-tax-configuration', text: 'Skip to Tax Configuration' }
            ]);
        }, 2000);

        // Background process completion after 1 minute
        setTimeout(() => {
            updateProcessCard('pay-schedule-config', {
                status: 'complete',
                description: 'Pay schedules successfully configured',
                timestamp: '1 minute ago'
            });
        }, 60000); // 60 seconds = 1 minute
    }, 1000);
    
    return; // Exit early - don't continue with normal response handling
        case 'continue-earning-codes':
            message = 'Configure Pay Schedules';
            addMessage(message, 'user');

            // Show process card first
            setTimeout(() => {
                const processCard = createProcessCard({
                    title: 'Configure pay schedule',
                    description: 'Configuring...',
                    status: 'processing',
                    timestamp: 'Just started',
                    id: 'payroll-config'
                });

                addMessage(processCard, 'ai');

                // Collapse conversation history for pay schedules
                setTimeout(() => {
                    collapseConversationHistory("Pay schedule configuration threads");
                }, 500);
                // Show loading in right panel
                //const panelContent = document.querySelector('.panel-content');
                //if (panelContent) {
                   // panelContent.innerHTML = `
                    //<div class="loading-container">
                        //<div class="spinner"></div>
                        //<div class="loading-text">${CONSTANTS.MESSAGES.LOADING} earning codes...</div>
                        //<div class="loading-subtext">Analyzing code assessments</div>
                    //</div>
                //`;
                //}

                // Then show the actual content after delay
                setTimeout(() => {
                    currentStep = 3;
                    showEarningCodesReview();
                    addMessage('I\'ve extracted 11 earning codes from your payroll registers. Some I\'m confident about, others need your review, and a few are missing information.\n\n<Strong>Review the codes in the table →</strong>\n• ✅ Green badges: I\'m confident about these\n• ⚠️ Yellow badges: Please review these\n• ❌ Red badges: Missing info - click to add', 'ai', [
                        { action: 'continue-to-recommendations', text: 'Continue to Recommendations' },
                        { action: 'skip-to-deduction-codes', text: 'Skip to Deduction Codes' },
                        { action: 'skip-to-tax-configuration', text: 'Skip to Tax Configuration' }
                    ]);
                }, 2000);

                // Background process completion (1 minute)
                setTimeout(() => {
                    updateProcessCard('payroll-config', {
                        status: 'complete',
                        description: 'Pay schedules successfully configured',
                        timestamp: '1 minute ago'
                    });
                }, 60000); // 60 seconds = 1 minute
            }, 1000);
            return;
        // ADD THESE NEW CASES TO handlePillClick SWITCH STATEMENT

        case 'modify-timeline':
            message = 'Modify timeline dates';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('You can adjust your timeline dates. Which dates would you like to modify?', 'ai', [
                    { action: 'change-launch-date', text: 'Change launch date' },
                    { action: 'keep-timeline', text: 'Keep current timeline' }
                ]);
            }, 1000);
            return;

        case 'view-full-timeline':
            message = 'View complete timeline';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage('Here\'s your complete payroll setup timeline. You can see all tasks, deadlines, and current progress in the panel →', 'ai', [
                    { action: 'start-schedule-setup', text: 'Start pay schedule setup' }
                ]);
            }, 1000);
            return;

        case 'change-launch-date':
            message = 'Change launch date';
            addMessage(message, 'user');
            setTimeout(() => {
                chatDatePickerShow('What would you like your new launch date to be? I\'ll adjust all the deadlines accordingly.', function(selectedDate) {
                    // Handle the selected date
                    const formattedDate = selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Update the wizard state if it exists
                    if (newWizardState && newWizardState.userData) {
                        newWizardState.userData.startDate = selectedDate.toISOString().split('T')[0];
                    }

                    // Start the timeline recalculation process with AI thinking
                    setTimeout(() => {
                        handleTimelineRecalculation(selectedDate);
                    }, 1000);

                    // Continue conversation after recalculation is complete
                    setTimeout(() => {
                        addMessage(`${CONSTANTS.MESSAGES.PERFECT} I've updated your launch date to ${formattedDate}. All timeline deadlines have been adjusted accordingly.\n\nYour updated timeline is now ready. Ready to continue?`, 'ai', [
                            { action: 'upload-documents', text: 'Upload documents (recommended)' },
                            { action: 'start-schedule-setup', text: 'Skip and configure manually' },
                        ]);
                    }, 6000); // Show message after AI thinking completes
                });
            }, 1000);
            return;

        case 'keep-timeline':
            message = 'Keep current timeline';
            addMessage(message, 'user');
            setTimeout(() => {
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} Your timeline stays as planned. Ready to continue with pay schedule setup?`, 'ai', [
                    { action: 'start-schedule-setup', text: 'Start pay schedule setup' }
                ]);
            }, 1000);
            return;

    }

    // Add user message immediately (pills are already gone) - only if not skipped
    if (message && !skipUserMessage) {
        addMessage(message, 'user');
    }

    // Add AI response after a delay
    if (response) {
        setTimeout(() => {
            if (typeof response === 'object' && response !== null) {
                addMessage(response.text, 'ai', response.pills);
            } else {
                addMessage(response, 'ai');
            }

            // Execute right panel action if defined
            if (rightPanelAction && typeof rightPanelAction === 'function') {
                rightPanelAction();
            }
        }, 1000);

    }
}
// ========================================
// WORKFLOW-SPECIFIC PILL HANDLERS
// ========================================

function handleWizardPill(action) {
    switch (action) {
        case 'modify-timeline':
            return handlePillClick_Original('modify-timeline');
        case 'view-full-timeline':
            return handlePillClick_Original('view-full-timeline');
        case 'change-launch-date':
            return handlePillClick_Original('change-launch-date');
        case 'keep-timeline':
            return handlePillClick_Original('keep-timeline');
        default:
            console.log('Unhandled wizard action:', action);
            return null;
    }
}

function handleSchedulePill(action) {
    switch (action) {
        case 'change-semi-name':
            return handlePillClick_Original('change-semi-name');
        case 'change-semi-first-pay-date':
            return handlePillClick_Original('change-semi-first-pay-date');
        case 'change-semi-weekend-rules':
            return handlePillClick_Original('change-semi-weekend-rules');
        case 'change-semi-holiday-rules':
            return handlePillClick_Original('change-semi-holiday-rules');
        case 'change-weekly-name':
            return handlePillClick_Original('change-weekly-name');
        case 'change-weekly-first-pay-date':
            return handlePillClick_Original('change-weekly-first-pay-date');
        case 'change-weekly-weekend-rules':
            return handlePillClick_Original('change-weekly-weekend-rules');
        case 'change-weekly-holiday-rules':
            return handlePillClick_Original('change-weekly-holiday-rules');
        case 'set-semi-weekend-previous-friday':
        case 'set-semi-weekend-following-monday':
        case 'set-weekly-weekend-previous-friday':
        case 'set-weekly-weekend-following-monday':
        case 'set-semi-holiday-business-before':
        case 'set-semi-holiday-business-after':
        case 'set-semi-holiday-closest-business':
        case 'set-weekly-holiday-business-before':
        case 'set-weekly-holiday-business-after':
        case 'set-weekly-holiday-closest-business':
            return handlePillClick_Original(action);
        case 'add-new':
        case 'bi-weekly':
        case 'monthly':
        case 'quarterly':
        case 'edit-schedule':
        case 'edit-semi-monthly':
        case 'edit-weekly':
            return handlePillClick_Original(action);
        case 'looks-good':
        case 'approve-all':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled schedule action:', action);
            return null;
    }
}

function handleCompanyPill(action) {
    switch (action) {
        case 'confirm-company-info':
        case 'make-corrections':
        case 'add-new-ein':
        case 'edit-company-name':
        case 'edit-address':
        case 'edit-ein':
        case 'continue-to-schedules':
        case 'review-company-info':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled company action:', action);
            return null;
    }
}

function handleDocumentPill(action) {
    switch (action) {
        case 'upload-documents':
        case 'why-upload-documents':
        case 'skip-document-upload':
        case 'explain-document-benefits':
        case 'complete-document-upload':
        case 'skip-to-company-config':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled document action:', action);
            return null;
    }
}

function handleEarningCodesPill(action) {
    switch (action) {
        case 'continue-earning-codes':
        case 'explain-assessments':
        case 'review-yellow-codes':
        case 'approve-all-remaining':
        case 'review-all-together':
        case 'continue-to-recommendations':
        case 'skip-to-deduction-codes':
        case 'skip-to-tax-configuration':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled earning codes action:', action);
            return null;
    }
}

function handleSuggestionsPill(action) {
    switch (action) {
        case 'accept-all-suggestions':
        case 'explain-suggestions':
        case 'skip-suggestions':
        case 'move-to-rate-configuration':
        case 'continue-to-rate-config':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled suggestions action:', action);
            return null;
    }
}

function handleRateConfigPill(action) {
    switch (action) {
        case 'set-standard-rates':
        case 'continue-to-w2-preview':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled rate config action:', action);
            return null;
    }
}

function handleW2Pill(action) {
    switch (action) {
        case 'explain-w2-boxes':
        case 'adjust-w2-reporting':
        case 'finalize-complete-setup':
        case 'back-to-rate-config':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled W2 action:', action);
            return null;
    }
}

function handleGeneralPill(action) {
    switch (action) {
        case 'start-over':
        case 'view-semi-monthly':
        case 'view-weekly':
            return handlePillClick_Original(action);
        default:
            console.log('Unhandled general action:', action);
            return null;
    }
}

// ========================================
// DATE & CALENDAR FUNCTIONS
// ========================================

// ========================================
// UI HELPER FUNCTIONS
// ========================================

// DOM Element Cache

const DOM = {
    messagesContainer: null,
    panelContent: null,
    panelHeader: null,
    panelSubtitle: null,
    messageInput: null,
    chatInput: null,
    chatPanel: null,
    tablePanel: null,

    // Initialize DOM cache after page loads
    init() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.panelContent = document.querySelector('.panel-content');
        this.panelHeader = document.querySelector('.panel-header h2');
        this.panelSubtitle = document.querySelector('.panel-subtitle');
        this.messageInput = document.getElementById('messageInput');
        this.chatInput = document.querySelector('.chat-input');
        this.chatPanel = document.getElementById('chatPanel');
        this.tablePanel = document.getElementById('tablePanel');
    }
};





// Company information extracted from documents (PROTOTYPE - FAKE DATA)
let extractedCompanyInfo = {
    legalName: "",
    address: "",
    ein: "",
    sourceDocument: "",
    documentType: "",
    isConfirmed: false
};

// Company info editing state
window.waitingForCompanyNameInput = false;
window.waitingForAddressInput = false;
window.waitingForEINInput = false;

// Fake extracted data (simulates document scraping results)
const fakeCompanyData = {
    handbook: {
        legalName: "Acme Corporation Inc.",
        address: "1234 Business Ave, Suite 500, Chicago, IL 60601",
        ein: "12-3456789",
        sourceDocument: "Employee_Handbook_2024.pdf",
        documentType: "Employee Handbook"
    },
    payroll: {
        legalName: "ACME CORP INC",
        address: "1234 Business Avenue, Chicago, IL 60601",
        ein: "12-3456789",
        sourceDocument: "Payroll_Report_Q2_2024.xlsx",
        documentType: "Payroll Report"
    }
};

// Earning codes data
const earningCodes = [
    { code: "REG", name: "Regular", description: "Regular wages", assessment: "confident", reviewed: false, editMode: false },
    { code: "OTShift", name: "Overtime", description: "Overtime wages (1.5x rate)", assessment: "confident", reviewed: false, editMode: false },
       { code: "BONUS", name: "Performance Bonus", description: "Annual performance bonus", assessment: "review", reviewed: false, editMode: false },
    { code: "VAC", name: "Vacation Pay", description: "Paid vacation time off", assessment: "confident", reviewed: false, editMode: false },
    { code: "SICK", name: "Sick Leave", description: "Paid sick leave", assessment: "confident", reviewed: false, editMode: false },
    { code: "MISC", name: "", description: "", assessment: "missing", reviewed: false, editMode: false }
];

// Sample data
const schedules = [
    {
        id: 1,
        name: "Semi-Monthly",
        frequency: "24 pay periods/year",
        payDate: "15th and last day",
        hours: "80 hours",
        approved: false
    },
    {
        id: 2,
        name: "Weekly",
        frequency: "52 pay periods/year",
        payDate: "Every Friday",
        hours: "40 hours",
        approved: false
    }
];

// AI Suggestions data
const aiSuggestions = [
    {
        id: 1,
        title: "Rename 'OTShift' to 'Overtime'",
        description: "Make code names more intuitive for payroll staff",
        impact: "Improves clarity and reduces training time",
        status: "pending", // pending, accepted, rejected
        changes: {
            code: "OTShift",
            field: "name",
            from: "Overtime",
            to: "Overtime Premium"
        }
    },
    {
        id: 2,
        title: "Consolidate Holiday Overtime Codes",
        description: "Combine OTHOL2 and OTHOL3 into single 'Holiday Overtime' code",
        impact: "Simplifies payroll processing and reduces complexity",
        status: "pending",
        changes: {
            action: "consolidate",
            codes: ["OTHOL2", "OTHOL3"],
            newCode: "HOL_OT"
        }
    },
    {
        id: 3,
        title: "Remove Unused MISC Code",
        description: "MISC code has no clear purpose and isn't being used",
        impact: "Reduces clutter and potential confusion",
        status: "pending",
        changes: {
            action: "remove",
            code: "MISC"
        }
    },
    {
        id: 4,
        title: "Improve Vacation/Sick Leave Setup",
        description: "Add proper descriptions and configure as time-off codes",
        impact: "Better tracking of employee leave balances",
        status: "pending",
        changes: {
            codes: ["VAC", "SICK"],
            updates: {
                VAC: { name: "Vacation Pay", description: "Paid vacation time off" },
                SICK: { name: "Sick Leave", description: "Paid sick leave" }
            }
        }
    }
];

// CHAT DATE PICKER FUNCTIONALITY

// Global state for chat date picker
let chatDatePickerState = {
    isActive: false,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedDate: null,
    callback: null,
    originalPlaceholder: ''
};

function chatDatePickerShow(promptText, callback) {
    // Set the waiting state
    window.waitingForDateInput = true;
    chatDatePickerState.isActive = true;
    chatDatePickerState.callback = callback;

    // Reset to current month/year
    const today = new Date();
    chatDatePickerState.currentMonth = today.getMonth();
    chatDatePickerState.currentYear = today.getFullYear();
    chatDatePickerState.selectedDate = null;

    // Add AI message with prompt
    addMessage(promptText, 'ai');

    // Enhance input field (don't hide it)
    const chatInput = document.querySelector('.chat-input');
    const inputField = document.getElementById('messageInput');

    chatInput.classList.add('date-picker-active');

    // Store original placeholder and update it
    chatDatePickerState.originalPlaceholder = inputField.placeholder;
    inputField.placeholder = 'Type a date (e.g., "July 15, 2025") or use calendar below...';

    // Create and insert date picker
    const datePickerHtml = chatDatePickerCreateHTML();
    const datePickerContainer = document.createElement('div');
    datePickerContainer.innerHTML = datePickerHtml;
    datePickerContainer.className = 'chat-date-picker-message';

    // Insert before the input
    chatInput.parentNode.insertBefore(datePickerContainer, chatInput);

    // Generate calendar content
    chatDatePickerGenerateCalendar();

    // Scroll to show the picker
    setTimeout(() => {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function chatDatePickerCreateHTML() {
    return `
        <div class="chat-date-picker-container" id="chatDatePicker">
            <div class="chat-date-picker-header">
                <h4 class="chat-date-picker-month" id="chatDatePickerMonth"></h4>
                <div class="chat-date-picker-nav-container">
                    <button class="chat-date-picker-nav" onclick="chatDatePickerChangeMonth(-1)">‹</button>
                    <button class="chat-date-picker-nav" onclick="chatDatePickerChangeMonth(1)">›</button>
                </div>
            </div>
            <div class="chat-date-picker-grid" id="chatDatePickerGrid">
                <!-- Calendar will be generated here -->
            </div>
            <!-- Footer removed completely -->
        </div>
    `;
}

function chatDatePickerGenerateCalendar() {
    // Update month/year header display (this was missing!)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const monthElement = document.getElementById('chatDatePickerMonth');
    if (monthElement) {
        monthElement.textContent = `${monthNames[chatDatePickerState.currentMonth]} ${chatDatePickerState.currentYear}`;
    }

    // Use unified calendar system with chat-specific configuration
    generateUnifiedCalendar(
        chatDatePickerState.currentMonth, 
        chatDatePickerState.currentYear, 
        'chatDatePickerGrid',
        {
            dayClass: 'chat-date-picker-day',
            dayHeaderClass: 'chat-date-picker-day-header',
            onSelect: function(selectedDate) {
                // Preserve existing chat date picker behavior
                chatDatePickerState.selectedDate = selectedDate;

                // Visual feedback - mark as selected
                document.querySelectorAll('.chat-date-picker-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                const clickedDay = event.target;
                if (clickedDay) {
                    clickedDay.classList.add('selected');
                }

                // Auto-submit after brief delay (existing behavior)
                setTimeout(() => {
                    chatDatePickerSubmit();
                }, 300);
            }
        }
    );
}

function chatDatePickerChangeMonth(direction) {
    // Update chat date picker state
    chatDatePickerState.currentMonth += direction;

    if (chatDatePickerState.currentMonth > 11) {
        chatDatePickerState.currentMonth = 0;
        chatDatePickerState.currentYear++;
    } else if (chatDatePickerState.currentMonth < 0) {
        chatDatePickerState.currentMonth = 11;
        chatDatePickerState.currentYear--;
    }

    // Use unified calendar generation
    chatDatePickerGenerateCalendar();
}

function chatDatePickerSelectDate(year, month, day) {
    // Store selected date
    chatDatePickerState.selectedDate = new Date(year, month, day);

    // Visual feedback
    document.querySelectorAll('.chat-date-picker-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    const clickedDay = event.target;
    clickedDay.classList.add('selected');

    // Auto-submit after brief delay for visual feedback
    setTimeout(() => {
        chatDatePickerSubmit();
    }, 300);
}

function chatDatePickerSubmit() {
    if (!chatDatePickerState.selectedDate) return;

    // Format the selected date
    const selectedDateString = chatDatePickerState.selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Add user message with selected date
    addMessage(selectedDateString, 'user');

    // Clean up date picker
    chatDatePickerCleanup();

    // Execute callback if provided
    if (chatDatePickerState.callback && typeof chatDatePickerState.callback === 'function') {
        chatDatePickerState.callback(chatDatePickerState.selectedDate);
    }

    // Reset state
    window.waitingForDateInput = false;
    chatDatePickerState.isActive = false;
    chatDatePickerState.selectedDate = null;
    chatDatePickerState.callback = null;
}

function chatDatePickerCleanup() {
    // Remove date picker from DOM
    const datePickerMessage = document.querySelector('.chat-date-picker-message');
    if (datePickerMessage) {
        datePickerMessage.remove();
    }

    // Restore regular input
    const chatInput = document.querySelector('.chat-input');
    const inputField = document.getElementById('messageInput');

    chatInput.classList.remove('date-picker-active');

    // Restore original placeholder
    if (chatDatePickerState.originalPlaceholder) {
        inputField.placeholder = chatDatePickerState.originalPlaceholder;
    }
}

function chatDatePickerCancel() {
    addMessage('Cancel date selection', 'user');

    setTimeout(() => {
        addMessage('No problem! You can continue typing your response normally.', 'ai');
    }, 1000);

    chatDatePickerCleanup();
    window.waitingForDateInput = false;
    chatDatePickerState.isActive = false;
    chatDatePickerState.selectedDate = null;
    chatDatePickerState.callback = null;
}

// Enhanced date parsing function
function chatDatePickerParseTextDate(text) {
    // Try to parse common date formats
    const datePatterns = [
        /(\w+)\s+(\d{1,2}),?\s+(\d{4})/i, // "July 15, 2025" or "July 15 2025"
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/,   // "7/15/2025"
        /(\d{1,2})-(\d{1,2})-(\d{4})/,    // "7-15-2025"
        /(\d{4})-(\d{1,2})-(\d{1,2})/,    // "2025-07-15"
    ];

    // Try Date.parse first (handles many formats)
    const parsed = new Date(text);
    if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 1900) {
        return parsed;
    }

    // Handle relative dates
    const today = new Date();
    const lowerText = text.toLowerCase();

    if (lowerText.includes('today')) {
        return today;
    }

    if (lowerText.includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
    }

    if (lowerText.includes('next friday')) {
        const nextFriday = new Date(today);
        const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
        nextFriday.setDate(today.getDate() + daysUntilFriday);
        return nextFriday;
    }

    return null;
}

// ========================================
// UNIFIED CALENDAR SYSTEM (CONSOLIDATION TARGET 4)
// ========================================

// Unified calendar state management
const unifiedCalendarState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedDate: null,
    callback: null,
    type: null, // 'chat-picker', 'wizard-dual', 'regular'
    isDual: false,
    containerIds: []
};

// Unified calendar generator
function generateUnifiedCalendar(month, year, gridId, options = {}) {
    const calendarGrid = document.getElementById(gridId);
    if (!calendarGrid) {
        console.error(`Calendar grid ${gridId} not found`);
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDay(); // Day of week (0 = Sunday)
    const daysInMonth = lastDay.getDate();

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = options.dayHeaderClass || 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = options.dayClass ? `${options.dayClass} empty` : 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = options.dayClass || 'calendar-day';
        dayElement.textContent = day;

        const currentDate = new Date(year, month, day);
        currentDate.setHours(0, 0, 0, 0);

        const isToday = currentDate.getTime() === today.getTime();
        const isPast = currentDate < today;

        // Style different types of days
        if (isToday) {
            dayElement.classList.add('today');
        }

        if (isPast && options.disablePast !== false) {
            dayElement.classList.add('past');
        } else {
            // Make today and future dates selectable
            dayElement.classList.add('selectable');
            dayElement.setAttribute('data-year', year);
            dayElement.setAttribute('data-month', month);
            dayElement.setAttribute('data-day', day);

            // Add click handler based on calendar type
            dayElement.addEventListener('click', function() {
                selectUnifiedDate(year, month, day, options);
            });
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Unified date selection handler
function selectUnifiedDate(year, month, day, options = {}) {
    console.log('Unified date selected:', year, month, day);

    // Remove previous selection from all calendars
    document.querySelectorAll('.calendar-day.selected, .chat-date-picker-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Find and select the clicked day (try both selector patterns)
    const clickedDay = document.querySelector(`[data-year="${year}"][data-month="${month}"][data-day="${day}"]`);
    if (clickedDay) {
        clickedDay.classList.add('selected');
    }

    // Store selected date
    unifiedCalendarState.selectedDate = new Date(year, month, day);

    // Handle different calendar types
    if (options.onSelect) {
        options.onSelect(unifiedCalendarState.selectedDate);
    } else if (unifiedCalendarState.type === 'chat-picker') {
        // Chat date picker behavior
        setTimeout(() => {
            chatDatePickerSubmit();
        }, 300);
    } else if (unifiedCalendarState.type === 'wizard-dual') {
        // Wizard calendar behavior
        selectedDate = unifiedCalendarState.selectedDate;
        const continueBtn = document.querySelector('.wizard-btn-primary');
        if (continueBtn) {
            continueBtn.disabled = false;
            continueBtn.style.opacity = '1';
        }
    }
}

// Unified month navigation
function changeUnifiedMonth(direction, options = {}) {
    unifiedCalendarState.currentMonth += direction;

    if (unifiedCalendarState.currentMonth > 11) {
        unifiedCalendarState.currentMonth = 0;
        unifiedCalendarState.currentYear++;
    } else if (unifiedCalendarState.currentMonth < 0) {
        unifiedCalendarState.currentMonth = 11;
        unifiedCalendarState.currentYear--;
    }

    // Update calendars based on type
    if (unifiedCalendarState.type === 'chat-picker') {
        chatDatePickerGenerateCalendar();
    } else if (unifiedCalendarState.type === 'wizard-dual') {
        initializeDualCalendar(unifiedCalendarState.currentMonth, unifiedCalendarState.currentYear);
    } else if (options.updateCallback) {
        options.updateCallback(unifiedCalendarState.currentMonth, unifiedCalendarState.currentYear);
    }
}

// Unified calendar initialization
function initializeUnifiedCalendar(config = {}) {
    const {
        type = 'regular',
        month = new Date().getMonth(),
        year = new Date().getFullYear(),
        isDual = false,
        containers = [],
        onSelect = null,
        dayClass = 'calendar-day',
        dayHeaderClass = 'calendar-day-header'
    } = config;

    // Set state
    unifiedCalendarState.type = type;
    unifiedCalendarState.currentMonth = month;
    unifiedCalendarState.currentYear = year;
    unifiedCalendarState.isDual = isDual;
    unifiedCalendarState.containerIds = containers;
    unifiedCalendarState.callback = onSelect;

    // Generate calendar(s)
    if (isDual && containers.length >= 2) {
        // Generate first month
        generateUnifiedCalendar(month, year, containers[0], {
            dayClass,
            dayHeaderClass,
            onSelect
        });

        // Generate second month
        let secondMonth = month + 1;
        let secondYear = year;
        if (secondMonth > 11) {
            secondMonth = 0;
            secondYear++;
        }

        generateUnifiedCalendar(secondMonth, secondYear, containers[1], {
            dayClass,
            dayHeaderClass,
            onSelect
        });
    } else if (containers.length > 0) {
        generateUnifiedCalendar(month, year, containers[0], {
            dayClass,
            dayHeaderClass,
            onSelect
        });
    }
}

// ========================================
// TEST FUNCTION FOR UNIFIED CALENDAR (REMOVE AFTER TESTING)
// ========================================


function createProcessCard(config) {
    return {
        type: 'process-card',
        title: config.title || 'Processing...',
        description: config.description || 'Working on your request...',
        status: config.status || 'processing',
        timestamp: config.timestamp || 'Just started',
        id: config.id || Date.now()
    };
}
// Initialize the app


// Add these functions after initializeApp()
// Intro session state


function setupPanelToggle() {
    // No event listener needed since we're using onclick in HTML
    console.log('Panel toggle setup complete (using HTML onclick)');
}

function togglePanelSize() {
    console.log('Toggle button clicked!');
    const chatPanel = document.getElementById('chatPanel');
    const tablePanel = document.getElementById('tablePanel');
    const toggleBtn = document.getElementById('panelToggleBtn');

    console.log('Elements found:', {
        chatPanel: !!chatPanel,
        tablePanel: !!tablePanel,
        toggleBtn: !!toggleBtn
    });

    if (chatPanel && tablePanel && toggleBtn) {
        if (chatPanel.classList.contains('collapsed')) {
            console.log('Expanding chat panel');
            chatPanel.classList.remove('collapsed');
            tablePanel.classList.remove('expanded');
            
            toggleBtn.innerHTML = '<span class="toggle-icon">⟷</span>';
        } else {
            console.log('Collapsing chat panel');
            chatPanel.classList.add('collapsed');
            tablePanel.classList.add('expanded');
            toggleBtn.innerHTML = '<span class="toggle-icon">⟸</span>';
        }
    } else {
        console.log('ERROR: Missing required elements');
    }
}

// Load initial schedule cards into right panel
function loadInitialScheduleCards() {
    const panelContent = document.querySelector('.panel-content');
    if (panelContent) {
        panelContent.innerHTML = `
            <!-- Schedule Cards Container -->
            <div class="schedule-cards">
                <div class="schedule-card">
                    <div class="card-header">
                        <div class="card-title">Semi-Monthly</div>
                    </div>
                    <div class="card-body">
                        <div class="schedule-detail">
                            <div class="detail-label">Name</div>
                            <div class="detail-value">Semi-Monthly Payroll</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">First pay date</div>
                            <div class="detail-value">August 15, 2025</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Frequency</div>
                            <div class="detail-value">24 pay periods/year</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Payroll date</div>
                            <div class="detail-value">15th and last day</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Hours per pay period</div>
                            <div class="detail-value">80 hours</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Weekend pay date</div>
                            <div class="detail-value">Friday before the date</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Holiday pay date</div>
                            <div class="detail-value">Business before the date</div>
                        </div>
                    </div>
                </div>

                <div class="schedule-card">
                    <div class="card-header">
                        <div class="card-title">Weekly</div>
                    </div>
                    <div class="card-body">
                        <div class="schedule-detail">
                            <div class="detail-label">Name</div>
                            <div class="detail-value">Weekly Payroll</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">First pay date</div>
                            <div class="detail-value">August 8, 2025</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Frequency</div>
                            <div class="detail-value">52 pay periods/year</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Payroll date</div>
                            <div class="detail-value">Every Friday</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Hours per pay period</div>
                            <div class="detail-value">40 hours</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Weekend pay date</div>
                            <div class="detail-value">Friday before the date</div>
                        </div>
                        <div class="schedule-detail">
                            <div class="detail-label">Holiday pay date</div>
                            <div class="detail-value">Business before the date</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    console.log('Right panel initialized with schedule cards');
}

// Chat functionality



// Enhanced function to add typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typing-indicator';

    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });

    return typingDiv;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Enhanced smooth panel content transition
function smoothPanelTransition(newContent, callback) {
    const panelContent = document.querySelector('.panel-content');
    if (!panelContent) return;

    // Add loading class for fade effect
    panelContent.classList.add('loading');

    setTimeout(() => {
        panelContent.innerHTML = newContent;
        panelContent.classList.remove('loading');
        if (callback) callback();
    }, 300);
}
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    // Check for skip to recommendations command
    if (lowerMessage.includes('skip to recommendations') ||
        lowerMessage.includes('go to recommendations') ||
        lowerMessage.includes('show recommendations') ||
        lowerMessage.includes('recommendations')) {

        // Skip directly to AI suggestions step
        setTimeout(() => {
            currentStep = 4;
            showAISuggestions();
            addMessage('Skipping directly to **Step 4: AI Recommendations**!\n\nHere are my suggestions to optimize your earning codes based on the analysis.', 'ai', [
                { action: 'accept-all-suggestions', text: 'Accept all recommendations' },
                { action: 'skip-suggestions', text: 'Skip all recommendations' },
                { action: 'move-to-rate-configuration', text: 'Done, next to rate configuration' }
            ]);
        }, 1000);

        return null; // Don't continue with other response logic
    }
    // Check for approval keywords to auto-progress to next step
    const approvalKeywords = ['yes', 'approve', 'move to the next step', 'move to next step', 'next step', 'continue', 'proceed'];
    const isApprovalMessage = approvalKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isApprovalMessage) {
        // Execute actions immediately without transition messages
        switch (currentStep) {
            case 1: // Schedule review step
                showLoadingSpinner();
                setTimeout(() => {
                    approveAllSchedules();
                    showCalendarSimulation();
                }, 1000);

                return {
                    text: `${CONSTANTS.MESSAGES.PERFECT} The schedule information is confirmed. I\'ve generated a calendar showing your payroll timeline:\n• <strong>Submit deadlines</strong> \n• <strong>Processing periods</strong> \n• <strong>Employee pay dates</strong> (with automatic weekend/holiday adjustments)\n\nReview the calendar on the right to see your payroll schedule starting August 2025.\n\nOnce you\'ve explored the calendar, I\'ll configure these schedules.`,
                    pills: [
                        { action: 'continue-earning-codes', text: 'Configure Pay Schedules' },
                        { action: 'view-semi-monthly', text: 'Focus on Semi-Monthly' },
                        { action: 'view-weekly', text: 'Focus on Weekly' }
                    ]
                };


            case 3: // Earning codes review step
                // Show process card
                const processCard = createProcessCard({
                    title: 'Processing Earning Codes Review',
                    description: 'Analyzing your earning codes and preparing recommendations...',
                    status: 'processing',
                    timestamp: 'Just started',
                    id: 'payroll-config'
                });

                addMessage(processCard, 'ai');

                // Show spinner in right panel immediately
                const panelContent = document.querySelector('.panel-content');
                if (panelContent) {
                    panelContent.innerHTML = `
                <div class="loading-container">
                    <div class="spinner"></div>
                    <div class="loading-text">${CONSTANTS.MESSAGES.LOADING} recommendations...</div>
                    <div class="loading-subtext">Analyzing your earning codes</div>
                </div>
            `;
                }

                setTimeout(function() {
                    const approvedCount = earningCodes.filter(code => code.reviewed).length;
                    const pendingCount = earningCodes.filter(code => !code.reviewed && code.assessment != 'missing').length;
                    const missingCount = earningCodes.filter(code => code.assessment == 'missing').length;
                    const totalCount = earningCodes.length;

                    const summaryText = `${CONSTANTS.MESSAGES.GREAT} Let me summarize your earning codes review:\n\n` +
                        '✅ Approved: ' + approvedCount + ' codes\n' +
                        '⏳ Pending Review: ' + pendingCount + ' codes\n' +
                        '❌ Missing Info: ' + missingCount + ' codes\n' +
                        'Total: ' + totalCount + ' codes\n\n' +
                        'Now let me show you my recommendations to optimize these codes...';

                    addMessage(summaryText, 'ai', [
                        { action: 'skip-suggestions', text: 'Skip all recommendations' },
                        { action: 'move-to-rate-configuration', text: 'Done, next: Rate configuration' }
                    ]);

                    setTimeout(function() {
                        showAISuggestions();
                    }, 1500);
                }, 1000);

                return null;

            case 4: // AI suggestions step
                currentStep = 5;
                setTimeout(() => {
                    showRateConfiguration();
                    addMessage('Now let\'s set up how much each earning code pays:\n\n<strong>Review the configuration in the table →</strong>\n• Regular codes: Hourly rates\n• Overtime codes: Multipliers (1.5x, 2.0x)\n• Bonus codes: Flat amounts\n\nOnce you\'re satisfied with the rate configuration, let me know when you\'re ready to see the W-2 preview!', 'ai', [
                        { action: 'set-standard-rates', text: 'Use standard rates' },
                        { action: 'custom-rate-setup', text: 'Set custom rates' },
                        { action: 'continue-to-w2-preview', text: 'Show W-2 Preview' }
                    ]);
                }, 1000);
                return null;

            case 5: // Rate configuration step
                setTimeout(() => {
                    finalizeConfiguration();
                }, 1000);
                return {
                    text: "${CONSTANTS.MESSAGES.GREAT} Moving to the final step - W-2 Tax Form Preview. This will show you how all your earning codes will be reported for tax purposes.",
                    pills: []
                };

            case 6: // W-2 preview step
                setTimeout(() => {
                    completePayrollSetup();
                }, 1000);
                return null;

            default:
                return null;
        }
    }

    // Handle weekend pay date updates
    if (lowerMessage.includes('weekend pay date') && lowerMessage.includes('semi-monthly') && lowerMessage.includes('thursday')) {
        updateWeekendPayDate('semi-monthly', 'Thursday before the date');
        return {
            text: "${CONSTANTS.MESSAGES.PERFECT} I've updated the weekend pay date for the Semi-Monthly schedule to 'Thursday before the date'. The change is now reflected in the schedule card above.\n\nIs there anything else you'd like to adjust for the Semi-Monthly schedule, or shall we review the Weekly schedule next?",
            pills: [
                { action: 'edit-weekly', text: 'Edit Weekly schedule' },
                { action: 'approve-all', text: 'Approve both schedules' },
                { action: 'add-new', text: 'Add another schedule' }
            ]
        };
    }

    // Handle semi-monthly holiday rule changes
    if ((lowerMessage.includes('change') || lowerMessage.includes('update')) && 
        lowerMessage.includes('semi') && 
        (lowerMessage.includes('holiday') || lowerMessage.includes('holiday pay')) &&
        (lowerMessage.includes('nearest') || lowerMessage.includes('closest') || lowerMessage.includes('business day'))) {
        
        // Execute the change immediately
        updateScheduleRule('semi-monthly', 'holiday', 'Closest business day');
        
        return {
            text: "✅ Updated Semi-Monthly holiday rule to 'Closest business day'\n\nWhen a holiday falls on a pay date, the payment will now be moved to the closest business day (either before or after the holiday). This change has been applied to the Semi-Monthly schedule.\n\nWhat would you like to do next?",
            pills: [
                { action: 'looks-good', text: 'Looks good, continue' },
                { action: 'change-weekly-holiday-rules', text: 'Change Weekly holiday rules' },
                { action: 'edit-semi-monthly', text: 'Make other Semi-Monthly changes' }
            ]
        };
    }

    // Handle specific questions about schedules
    if (lowerMessage.includes('difference') || lowerMessage.includes('compare')) {
        return {
            text: "Great question! Here are the key differences:\n\n**Semi-Monthly (24 periods/year):**\n• Employees get paid twice per month\n• Typically 80 hours per pay period\n• More predictable for salaried employees\n\n**Weekly (52 periods/year):**\n• Employees get paid every Friday\n• Typically 40 hours per pay period\n• Better cash flow for hourly employees\n\nWhich schedule type do you need more details about?",
            pills: [
                { action: 'semi-monthly-details', text: 'Tell me more about Semi-Monthly' },
                { action: 'weekly-details', text: 'Tell me more about Weekly' },
                { action: 'approve-all', text: 'Both look good, approve them' }
            ]
        };
    }

    if (lowerMessage.includes('hours') || lowerMessage.includes('time')) {
        return {
            text: "The hours per pay period are calculated based on a standard full-time schedule:\n\n• **Semi-Monthly**: 80 hours (40 hours/week × 2 weeks)\n• **Weekly**: 40 hours (standard work week)\n\nWould you like me to adjust these hours for part-time employees or a different work schedule?",
            pills: [
                { action: 'adjust-hours', text: 'Adjust hours for part-time' },
                { action: 'custom-hours', text: 'Set custom hours' },
                { action: 'keep-standard', text: 'Keep standard hours' }
            ]
        };
    }

    if (lowerMessage.includes('holiday') || lowerMessage.includes('weekend')) {
        return {
            text: "Both schedules currently use 'Friday before the date' for weekend and holiday pay dates. This ensures employees get paid before weekends and holidays.\n\nWould you like to modify these rules for either schedule?",
            pills: [
                { action: 'change-semi-weekend-rules', text: 'Change Semi-Monthly rules' },
                { action: 'change-weekly-weekend-rules', text: 'Change Weekly rules' },
                { action: 'keep-current-dates', text: 'Keep current settings' }
            ]
        };
    }

    if (lowerMessage.includes('approve')) {
        // Automatically approve schedules and move to calendar simulation
        approveAllSchedules();
        showCalendarSimulation();
        return {
            text: "${CONSTANTS.MESSAGES.PERFECT} ✅ I've generated a calendar showing when you'll need to:\n• Submit payroll (2 business days before pay date by 1:30 PM EST)\n• Process payroll\n• Pay employees\n\nThis includes adjustments for weekends and holidays. Review the calendar on the right to see your payroll schedule starting August 2025.",
            pills: [
                { action: 'view-semi-monthly', text: 'Show Semi-Monthly details' },
                { action: 'view-weekly', text: 'Show Weekly details' },
                { action: 'continue-earning-codes', text: 'Configure Pay Schedules' }
            ]
        };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what')) {
        return {
            text: "I'm here to help you review and configure these pay schedules! You can:\n\n• Ask questions about schedule differences\n• Request changes to pay dates or hours\n• Approve schedules when ready\n• Add new schedule types\n\nWhat would you like to know more about?",
            pills: [
                { action: 'explain-differences', text: 'Explain schedule differences' },
                { action: 'edit-schedule', text: 'Make changes' },
                { action: 'approve-all', text: 'Approve schedules' }
            ]
        };
    }
    // Handle W-2 requests - Skip directly to W-2 preview from any step
    if (lowerMessage.includes('w-2') || lowerMessage.includes('w2') || lowerMessage.includes('tax form')) {
        setTimeout(() => {
            finalizeConfiguration();
        }, 1000);
        return {
            text: "Jumping directly to the W-2 preview! I'll show you exactly how your earning codes will appear on employee tax forms.",
            pills: []
        };
    }

    // Handle "ready/next/continue" from Step 5
    if (lowerMessage.includes('ready') || lowerMessage.includes('next') || lowerMessage.includes('continue')) {
        if (currentStep === 5) {
            // User says they're ready to continue from Step 5
            setTimeout(() => {
                finalizeConfiguration();
            }, 1000);
            return {
                text: "${CONSTANTS.MESSAGES.GREAT} Moving to the final step - W-2 Tax Form Preview. This will show you how all your earning codes will be reported for tax purposes.",
                pills: []
            };
        }
    }

    // Handle "done/finish/complete" from Step 5
    if (currentStep === 5) {
        if (lowerMessage.includes('done') || lowerMessage.includes('finish') ||
            lowerMessage.includes('complete') || lowerMessage.includes('final')) {
            setTimeout(() => {
                finalizeConfiguration();
            }, 1000);
            return {
                text: "${CONSTANTS.MESSAGES.EXCELLENT} You're ready for the final step. Let me show you the W-2 preview now.",
                pills: []
            };
        }
    }

    // Default contextual response
    return {
        text: "I can help you review these pay schedules. Feel free to ask about the differences between Semi-Monthly and Weekly schedules, request any changes, or let me know when you're ready to approve them and move to the next step.",
        pills: [
            { action: 'explain-differences', text: 'What are the differences?' },
            { action: 'edit-schedule', text: 'I want to make changes' },
            { action: 'approve-all', text: 'Configure pay schedules' }
        ]
    };
}

function updateWeekendPayDate(scheduleType, newPayDate) {
    const scheduleCards = document.querySelectorAll('.schedule-card');

    scheduleCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        if (cardTitle.includes(scheduleType.toLowerCase())) {
            const scheduleDetails = card.querySelectorAll('.schedule-detail');
            scheduleDetails.forEach(detail => {
                const label = detail.querySelector('.detail-label').textContent;
                if (label.includes('Weekend pay date')) {
                    detail.querySelector('.detail-value').textContent = newPayDate;
                }
            });
        }
    });
}
function updateScheduleRule(scheduleType, ruleType, newRule) {
    const scheduleCards = document.querySelectorAll('.schedule-card');

    scheduleCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const normalizedScheduleType = scheduleType.toLowerCase().replace('-', '');
        const normalizedCardTitle = cardTitle.replace('-', '');
        
        if (normalizedCardTitle.includes(normalizedScheduleType)) {
            const scheduleDetails = card.querySelectorAll('.schedule-detail');
            scheduleDetails.forEach(detail => {
                const label = detail.querySelector('.detail-label').textContent.toLowerCase();

                if (ruleType === 'weekend' && label.includes('weekend pay date')) {
                    detail.querySelector('.detail-value').textContent = newRule;
                } else if (ruleType === 'holiday' && label.includes('holiday pay date')) {
                    detail.querySelector('.detail-value').textContent = newRule;
                }
            });
        }
    });
}
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Handle pill button clicks




// Function to recalculate timeline dates based on new launch date
function recalculateTimelineDates(newLaunchDate) {
    const launchDate = new Date(newLaunchDate);
    const timelineItems = [];

    // Company configuration tasks (work backwards from launch date)
    const companyInfoDue = new Date(launchDate);
    companyInfoDue.setDate(launchDate.getDate() - 45); // 45 days before launch

    const bankAccountDue = new Date(launchDate);
    bankAccountDue.setDate(launchDate.getDate() - 40); // 40 days before launch

    const employeeInfoDue = new Date(launchDate);
    employeeInfoDue.setDate(launchDate.getDate() - 35); // 35 days before launch

    // Payroll setup tasks
    const payScheduleDue = new Date(launchDate);
    payScheduleDue.setDate(launchDate.getDate() - 30); // 30 days before launch

    const earningDeductionDue = new Date(launchDate);
    earningDeductionDue.setDate(launchDate.getDate() - 20); // 20 days before launch

    const taxSetupDue = new Date(launchDate);
    taxSetupDue.setDate(launchDate.getDate() - 10); // 10 days before launch

    return {
        companyInfo: formatTimelineDate(companyInfoDue),
        bankAccount: formatTimelineDate(bankAccountDue),
        employeeInfo: formatTimelineDate(employeeInfoDue),
        paySchedule: formatTimelineDate(payScheduleDue),
        earningDeduction: formatTimelineDate(earningDeductionDue),
        taxSetup: formatTimelineDate(taxSetupDue)
    };
}

// Function to format dates for timeline display
function formatTimelineDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
}

// Function to update timeline with new dates
function updateTimelineWithNewDates(newDates) {
    const panelContent = document.querySelector('.panel-content');

    if (panelContent) {
        panelContent.innerHTML = `
            <div class="timeline-view-container">
                <div class="timeline-section">
                    <h3>Company configuration</h3>
                </div>

                <div class="timeline-content">
                    <div class="timeline-section">
                        <div class="timeline-items">
                            <div class="timeline-item">
                                <div class="timeline-icon">🏢</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Add company information</div>
                                        <div class="timeline-due">Due by ${newDates.companyInfo}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">🏦</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Add bank account</div>
                                        <div class="timeline-due">Due by ${newDates.bankAccount}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">👥</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Add employee information</div>
                                        <div class="timeline-due">Due by ${newDates.employeeInfo}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="timeline-section">
                        <h3>Payroll setup</h3>
                        <div class="timeline-items">
                            <div class="timeline-item">
                                <div class="timeline-icon">📋</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Pay schedule setup</div>
                                        <div class="timeline-due">Due by ${newDates.paySchedule}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">💰</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Earning and deduction setup</div>
                                        <div class="timeline-due">Due by ${newDates.earningDeduction}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">📊</div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="timeline-task">Tax setup</div>
                                        <div class="timeline-due">Due by ${newDates.taxSetup}</div>
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Function to handle timeline recalculation with AI thinking
function handleTimelineRecalculation(newDate) {
    // Show skeleton in right panel
    showTimelineSkeleton();

    // Show AI thinking indicator
    showAIThinkingIndicator();

    // Start the thinking text updates (reuse existing function)
    const thinkingSteps = [
        "Analyzing your new launch date...",
        "Recalculating all deadlines...",
        "Updating timeline milestones...",
        "Generating updated timeline view..."
    ];

    let currentStep = 0;

    function updateRecalcText() {
        const textElement = document.getElementById('thinking-text');
        if (textElement && currentStep < thinkingSteps.length - 1) {
            currentStep++;
            textElement.textContent = thinkingSteps[currentStep];

            if (currentStep < thinkingSteps.length - 1) {
                setTimeout(updateRecalcText, 800);
            }
        }
    }

    setTimeout(updateRecalcText, 600);

    // After thinking delay, update timeline with new dates
    setTimeout(() => {
        // Remove thinking indicator
        removeThinkingIndicator();

        // Calculate new timeline dates
        const newDates = recalculateTimelineDates(newDate);

        // Fade out skeleton and show new timeline
        const panelContent = document.querySelector('.panel-content');
        panelContent.style.transition = 'opacity 0.3s ease-out';
        panelContent.style.opacity = '0';

        setTimeout(() => {
            updateTimelineWithNewDates(newDates);
            panelContent.style.opacity = '1';
        }, 300);

    }, 4500); // Same timing as original thinking sequence
}


// Calendar and payroll simulation
const holidays2025 = [
    { date: '2025-01-01', name: 'New Year\'s Day' },
    { date: '2025-01-20', name: 'Martin Luther King Jr. Day' },
    { date: '2025-02-17', name: 'Presidents\' Day' },
    { date: '2025-05-26', name: 'Memorial Day' },
    { date: '2025-07-04', name: 'Independence Day' },
    { date: '2025-09-01', name: 'Labor Day' },
    { date: '2025-10-13', name: 'Columbus Day' },
    { date: '2025-11-11', name: 'Veterans Day' },
    { date: '2025-11-27', name: 'Thanksgiving' },
    { date: '2025-12-25', name: 'Christmas Day' }
];

function approveAllSchedules() {
    // Mark all schedules as approved
    schedules.forEach(schedule => {
        schedule.approved = true;
    });

    // Update the UI to show approved status
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        const approveBtn = card.querySelector('.card-btn');
        if (approveBtn) {
            approveBtn.textContent = '✅ Approved';
            approveBtn.disabled = true;
            approveBtn.style.backgroundColor = '#4CAF50';
        }
    });
}

function showCalendarSimulation() {
     advanceToStep(2);
    
    // Update step progress
    const stepProgress = document.querySelector('.step-progress');
    if (stepProgress) {
        stepProgress.innerHTML = '📅 Step 2 of 6: Review payroll calendar simulation';
    }

    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'Payroll Calendar Simulation';
    }
    if (panelSubtitle) {
        panelSubtitle.textContent = 'Review submission, processing, and payment dates for August 2025 onwards';
    }

    // Replace schedule cards with calendar simulation
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="simulation-controls">
            <div class="schedule-tabs">
                <button class="tab-btn active" onclick="showScheduleSimulation('semi-monthly')">Semi-Monthly Schedule</button>
                <button class="tab-btn" onclick="showScheduleSimulation('weekly')">Weekly Schedule</button>
            </div>
        </div>

        <div class="calendar-simulation" id="calendarSimulation">
            ${generateSemiMonthlyCalendar()}
        </div>

        <div class="simulation-legend">
            <div class="legend-item">
                <span class="legend-color submit"></span>
                <span>Payroll Submission Deadline (1:30 PM EST)</span>
            </div>
            <div class="legend-item">
                <span class="legend-color process"></span>
                <span>Processing Period</span>
            </div>
            <div class="legend-item">
                <span class="legend-color pay"></span>
                <span>Employee Pay Date</span>
            </div>
            <div class="legend-item">
                <span class="legend-color holiday"></span>
                <span>Holiday Adjustment</span>
            </div>
        </div>
    `;
}

function generateSemiMonthlyCalendar() {
    let calendarHtml = '<div class="calendar-container">';

    // First example - Normal payroll process
    calendarHtml += `
        <div class="example-section">
            <h3>📋 Standard Payroll Process Example</h3>
            <div class="example-description">Your first Semi-Monthly payroll in August 2025</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Pay Period: August 1-15, 2025</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Wed, Aug 13</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Thu, Aug 14</div>
                    </div>
                    <div class="date-item pay">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Fri, Aug 15</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Weekend adjustment example
    calendarHtml += `
        <div class="example-section">
            <h3>📅 Weekend Adjustment Example</h3>
            <div class="example-description">When pay date falls on weekend (March 15, 2025 is Saturday)</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Pay Period: March 1-15, 2025</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Wed, Mar 12</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Thu, Mar 13</div>
                    </div>
                    <div class="date-item pay adjusted">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Fri, Mar 14</div>
                        <div class="adjustment-note">🔄 Moved from Sat, Mar 15 (weekend)</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Holiday adjustment example
    calendarHtml += `
        <div class="example-section">
            <h3>🎃 Holiday Adjustment Example</h3>
            <div class="example-description">When pay date falls on holiday (October 31, 2025 is Halloween/observed holiday)</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Pay Period: October 16-31, 2025</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Tue, Oct 28</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Wed, Oct 29</div>
                    </div>
                    <div class="date-item pay adjusted">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Thu, Oct 30</div>
                        <div class="adjustment-note">🔄 Moved from Fri, Oct 31 (Halloween observed)</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    calendarHtml += '</div>';
    return calendarHtml;
}

function generateWeeklyCalendar() {
    let calendarHtml = '<div class="calendar-container weekly">';

    // First example - Normal weekly payroll
    calendarHtml += `
        <div class="example-section">
            <h3>📋 Standard Weekly Process Example</h3>
            <div class="example-description">Your first Weekly payroll in August 2025</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Week ending Friday, August 8, 2025</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Wed, Aug 6</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Thu, Aug 7</div>
                    </div>
                    <div class="date-item pay">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Fri, Aug 8</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Weekend adjustment example - July 4th 2026 falls on Saturday, so Friday July 3rd would be pay day but that's July 4th observed
    calendarHtml += `
        <div class="example-section">
            <h3>📅 Weekend + Holiday Combo Example</h3>
            <div class="example-description">When Friday pay date is July 4th observed holiday (July 2026)</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Week ending Friday, July 3, 2026</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Tue, Jun 30</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Wed, Jul 1</div>
                    </div>
                    <div class="date-item pay adjusted">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Thu, Jul 2</div>
                        <div class="adjustment-note">🔄 Moved from Fri, Jul 3 (July 4th observed)</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Holiday on different day example
    calendarHtml += `
        <div class="example-section">
            <h3>🦃 Holiday Adjustment Example</h3>
            <div class="example-description">When Friday falls on Thanksgiving (November 28, 2025)</div>
            <div class="payroll-cycle example">
                <div class="cycle-header">Week ending Friday, November 28, 2025</div>
                <div class="cycle-dates">
                    <div class="date-item submit">
                        <div class="date-label">Submit by</div>
                        <div class="date-value">Mon, Nov 24</div>
                        <div class="date-note">1:30 PM EST</div>
                    </div>
                    <div class="date-item process">
                        <div class="date-label">Processing</div>
                        <div class="date-value">Tue, Nov 25</div>
                    </div>
                    <div class="date-item pay adjusted">
                        <div class="date-label">Pay Date</div>
                        <div class="date-value">Wed, Nov 26</div>
                        <div class="adjustment-note">🔄 Moved from Fri, Nov 28 (Thanksgiving)</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    calendarHtml += '</div>';
    return calendarHtml;
}

function getSemiMonthlyDatesForMonth(monthName, year) {
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'].indexOf(monthName);

    const cycles = [];

    // 15th pay date
    let payDate15 = new Date(year, monthIndex, 15);
    const adjusted15 = adjustForWeekendAndHoliday(payDate15);
    const submit15 = getBusinessDaysBefore(adjusted15.date, 2);
    const process15 = getBusinessDaysBefore(adjusted15.date, 1);

    cycles.push({
        period: `1st-15th ${monthName}`,
        submitBy: formatDate(submit15),
        processing: formatDate(process15),
        payDate: formatDate(adjusted15.date),
        adjusted: adjusted15.adjusted,
        adjustmentReason: adjusted15.reason
    });

    // Last day pay date
    const lastDay = new Date(year, monthIndex + 1, 0);
    const adjustedLast = adjustForWeekendAndHoliday(lastDay);
    const submitLast = getBusinessDaysBefore(adjustedLast.date, 2);
    const processLast = getBusinessDaysBefore(adjustedLast.date, 1);

    cycles.push({
        period: `16th-${lastDay.getDate()} ${monthName}`,
        submitBy: formatDate(submitLast),
        processing: formatDate(processLast),
        payDate: formatDate(adjustedLast.date),
        adjusted: adjustedLast.adjusted,
        adjustmentReason: adjustedLast.reason
    });

    return cycles;
}

function getWeeklyDatesForFriday(friday) {
    const adjusted = adjustForWeekendAndHoliday(friday);
    const submit = getBusinessDaysBefore(adjusted.date, 2);
    const process = getBusinessDaysBefore(adjusted.date, 1);

    return {
        submitBy: formatDate(submit),
        processing: formatDate(process),
        payDate: formatDate(adjusted.date),
        adjusted: adjusted.adjusted,
        adjustmentReason: adjusted.reason
    };
}

function adjustForWeekendAndHoliday(date) {
    let adjustedDate = new Date(date);
    let adjusted = false;
    let reason = '';

    // Check if it's a weekend
    if (adjustedDate.getDay() === 6) { // Saturday
        adjustedDate.setDate(adjustedDate.getDate() - 1); // Move to Friday
        adjusted = true;
        reason = 'weekend';
    } else if (adjustedDate.getDay() === 0) { // Sunday
        adjustedDate.setDate(adjustedDate.getDate() - 2); // Move to Friday
        adjusted = true;
        reason = 'weekend';
    }

    // Check if it's a holiday
    const dateStr = adjustedDate.toISOString().split('T')[0];
    const holiday = holidays2025.find(h => h.date === dateStr);
    if (holiday) {
        // Move to previous business day
        do {
            adjustedDate.setDate(adjustedDate.getDate() - 1);
        } while (adjustedDate.getDay() === 0 || adjustedDate.getDay() === 6);
        adjusted = true;
        reason = holiday.name;
    }

    return { date: adjustedDate, adjusted, reason };
}

function getBusinessDaysBefore(date, days) {
    let result = new Date(date);
    let businessDays = 0;

    while (businessDays < days) {
        result.setDate(result.getDate() - 1);
        if (result.getDay() !== 0 && result.getDay() !== 6) { // Not weekend
            businessDays++;
        }
    }

    return result;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

function showScheduleSimulation(scheduleType) {
    // Update tab active state
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const calendarSimulation = document.getElementById('calendarSimulation');

    if (calendarSimulation) {
        if (scheduleType === 'semi-monthly') {
            calendarSimulation.innerHTML = generateSemiMonthlyCalendar();
        } else {
            calendarSimulation.innerHTML = generateWeeklyCalendar();
        }
    }
}

// Function to update the right panel with the Bi-Weekly schedule details
function updateRightPanelWithBiWeekly() {
    // Update the step progress
    const stepProgress = document.querySelector('.step-progress');
    if (stepProgress) {
        stepProgress.innerHTML = '📅 Bi-Weekly Schedule Added: Fill in Name and First Pay Date';
    }

    // Find the schedule cards container or create it if it doesn't exist
    let scheduleCardsContainer = document.querySelector('.schedule-cards');
    if (!scheduleCardsContainer) {
        scheduleCardsContainer = document.createElement('div');
        scheduleCardsContainer.className = 'schedule-cards';
        const panelContent = document.querySelector('.panel-content');
        panelContent.appendChild(scheduleCardsContainer);
    }

    // Create the new bi-weekly card
    const biWeeklyCard = document.createElement('div');
    biWeeklyCard.className = 'schedule-card';
    biWeeklyCard.id = 'biweekly-card';
    biWeeklyCard.innerHTML = `
        <div class="card-header">
            <div class="card-title">Bi-Weekly</div>
        </div>
        <div class="card-body">
            <div class="schedule-detail">
                <div class="detail-label">Name</div>
                <div class="detail-value editable-field missing-field" id="biweekly-name" onclick="makeScheduleFieldEditable('biweekly', 'name', this)">
                    Click to add name
                </div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">First pay date</div>
                <div class="detail-value editable-field missing-field" id="biweekly-first-date" onclick="makeScheduleFieldEditable('biweekly', 'firstPayDate', this)">
                    Click to add first pay date
                </div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Frequency</div>
                <div class="detail-value">26 pay periods/year</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Payroll Date</div>
                <div class="detail-value">Every other Friday</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Hours per Pay Period</div>
                <div class="detail-value">80 hours</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Weekend pay date</div>
                <div class="detail-value">Friday before the date</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Holiday pay date</div>
                <div class="detail-value">Business before the date</div>
            </div>
        </div>
    `;

    // Add the new card to the container
    scheduleCardsContainer.insertBefore(biWeeklyCard, scheduleCardsContainer.firstChild);
}


function updatePanelContent(type) {
    if (type === 'biweekly-placeholder') {
        updateRightPanelWithBiWeekly();
    }
}

function addMonthlySchedule() {
    // Find the schedule cards container
    let scheduleCardsContainer = document.querySelector('.schedule-cards');
    if (!scheduleCardsContainer) {
        scheduleCardsContainer = document.createElement('div');
        scheduleCardsContainer.className = 'schedule-cards';
        const panelContent = document.querySelector('.panel-content');
        panelContent.appendChild(scheduleCardsContainer);
    }

    // Create the new monthly card
    const monthlyCard = document.createElement('div');
    monthlyCard.className = 'schedule-card';
    monthlyCard.innerHTML = `
        <div class="card-header">
            <div class="card-title">Monthly</div>
        </div>
        <div class="card-body">
            <div class="schedule-detail">
                <div class="detail-label">Frequency</div>
                <div class="detail-value">12 pay periods/year</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Payroll Date</div>
                <div class="detail-value">Last day of month</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Hours per Pay Period</div>
                <div class="detail-value">173 hours (average)</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Weekend pay date</div>
                <div class="detail-value">Friday before the date</div>
            </div>
            <div class="schedule-detail">
                <div class="detail-label">Holiday pay date</div>
                <div class="detail-value">Business before the date</div>
            </div>
        </div>
    `;

    // Add the new card to the container
    scheduleCardsContainer.appendChild(monthlyCard);
}
function showEarningCodesReview() {
    currentStep = 3;

    advanceToStep(3);

    // Update header status
    const headerStatus = document.getElementById('headerStatus');
    if (headerStatus) {
        headerStatus.textContent = 'Step 3 of 6: Earning Codes Review';
    }

    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'Review All Earning Codes';
    }
    if (panelSubtitle) {
        const progressPercent = Math.round((reviewProgress.reviewedCodes / reviewProgress.totalCodes) * 100);
        panelSubtitle.innerHTML = `Please approve each code (${reviewProgress.reviewedCodes} of ${reviewProgress.totalCodes} reviewed)`;
    }

    // Replace panel content with earning codes table
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="bulk-actions">
            <button class="bulk-btn" onclick="approveSelectedCodes()">Approve Selected</button>
            <button class="bulk-btn" onclick="deleteSelectedCodes()">Delete Selected</button>
            
        </div>

       <table class="review-table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="selectAll" onchange="toggleSelectAll()">
                    </th>
                     <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th>Rate Multiplier</th>
                <th>Assessment</th>
                <th>Action</th>
                                  </tr>
            </thead>
            <tbody>
            ${generateSimpleEarningCodesTable()}
        </tbody>
    `;

    // Update panel actions
    const panelActions = document.querySelector('.panel-actions');
    if (panelActions) {
        panelActions.innerHTML = `
            <button class="next-step-btn" onclick="continueToRateConfiguration()" ${reviewProgress.reviewedCodes < reviewProgress.totalCodes ? 'disabled' : ''}>
                Continue to Suggestions
            </button>
        `;
    }
}

function generateSimpleEarningCodesTable() {
    return earningCodes
        .sort((a, b) => {
            // Sort by assessment priority: missing first, then review, then confident
            const priority = { 'missing': 0, 'review': 1, 'confident': 2 };
            return priority[a.assessment] - priority[b.assessment];
        })
        .map(code => {
            // Prepare values and escape quotes
            const codeValue = code.code || '';
            const nameValue = (code.name || '').replace(/"/g, '&quot;');
            const descValue = (code.description || '').replace(/"/g, '&quot;');

            // Determine input classes
            const nameInputClass = !code.name ? 'earning-code-input missing-field' : 'earning-code-input';
            const descInputClass = !code.description ? 'earning-code-input missing-field' : 'earning-code-input';

            // Get default rate multiplier for each code
            const defaultRateMultiplier = getDefaultRateMultiplier(code.code);

            return `
                <tr class="${code.reviewed ? 'approved-row' : ''}">
                    <td>
                        <input type="checkbox" class="code-checkbox" data-code="${code.code}" onchange="updateBulkActions()">
                    </td>
                    <td>
                        <input 
                            type="text" 
                            class="earning-code-input code-field" 
                            value="${codeValue}" 
                            placeholder="Code..." 
                            data-original-code="${code.code}"
                            data-field="code"
                            oninput="handleEarningCodeInput(this)"
                            onblur="saveEarningCodeField(this)">
                    </td>
                    <td>
                        <input 
                            type="text" 
                            class="${nameInputClass}" 
                            value="${nameValue}" 
                            placeholder="Enter earning code name..." 
                            data-code="${code.code}"
                            data-field="name"
                            oninput="handleEarningCodeInput(this)"
                            onblur="saveEarningCodeField(this)">
                    </td>
                    <td>
                        <input 
                            type="text" 
                            class="${descInputClass}" 
                            value="${descValue}" 
                            placeholder="Enter description..." 
                            data-code="${code.code}"
                            data-field="description"
                            oninput="handleEarningCodeInput(this)"
                            onblur="saveEarningCodeField(this)">
                    </td>
                    <td>
                        <select class="rate-multiplier-select" data-code="${code.code}" onchange="updateRateMultiplier('${code.code}', this.value)">
                            <option value="0.5" ${(code.rateMultiplier || defaultRateMultiplier) === '0.5' ? 'selected' : ''}>0.5</option>
                            <option value="1" ${(code.rateMultiplier || defaultRateMultiplier) === '1' ? 'selected' : ''}>1</option>
                            <option value="1.5" ${(code.rateMultiplier || defaultRateMultiplier) === '1.5' ? 'selected' : ''}>1.5</option>
                            <option value="2" ${(code.rateMultiplier || defaultRateMultiplier) === '2' ? 'selected' : ''}>2</option>
                            <option value="flat" ${(code.rateMultiplier || defaultRateMultiplier) === 'flat' ? 'selected' : ''}>Flat Amount</option>
                        </select>
                    </td>
                    <td>
                        <span class="assessment-badge ${code.assessment}">
                            ${code.assessment === 'confident' ? '✅ Confident' :
                              code.assessment === 'review' ? '⚠️ Review' : '❌ Missing'}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            ${code.reviewed ?
                              '<span class="approved-indicator">✅ Approved</span>' :
                              `<button class="approve-btn icon-btn" onclick="approveCode('${code.code}')" title="Approve code">
                                <i class="material-icons">check</i>
                              </button>`
                            }
                           <button class="delete-btn icon-btn" onclick="deleteCode('${code.code}')" title="Delete code">
                                <i class="material-icons">delete_outline</i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
}

function approveConfidentCodes() {
    earningCodes.forEach(code => {
        if (code.assessment === 'confident' && !code.reviewed) {
            code.reviewed = true;
            reviewProgress.reviewedCodes++;
            reviewProgress.approvedCodes.push(code.code);
        }
    });
    showEarningCodesReview(); // Refresh the table
}

function autoFillMissingCodes() {
    earningCodes.forEach(code => {
        if (code.assessment === 'missing') {
            if (code.code === 'VAC') {
                code.name = 'Vacation Pay';
                code.description = 'Paid vacation time off';
                code.assessment = 'confident';
            } else if (code.code === 'SICK') {
                code.name = 'Sick Leave';
                code.description = 'Paid sick leave';
                code.assessment = 'confident';
            } else if (code.code === 'MISC') {
                code.name = 'Miscellaneous';
                code.description = 'Miscellaneous earnings';
                code.assessment = 'confident';
            }

            // Auto-approve the filled codes
            if (!code.reviewed) {
                code.reviewed = true;
                reviewProgress.reviewedCodes++;
                reviewProgress.approvedCodes.push(code.code);
            }
        }
    });

    // Refresh the earning codes display
    showEarningCodesReview();
}

function approveCode(codeId) {
    const code = earningCodes.find(c => c.code === codeId);

    if (code.assessment === 'missing' && (!code.name || !code.description)) {
        // Only show error messages in chat when needed

    }

    if (code && !code.reviewed) {
        code.reviewed = true;
        reviewProgress.reviewedCodes++;
        reviewProgress.approvedCodes.push(codeId);
        showEarningCodesReview(); // Refresh the table
    }
}

function deleteCode(codeId) {
    if (confirm(`Are you sure you want to delete the "${codeId}" earning code?`)) {
        const codeIndex = earningCodes.findIndex(c => c.code === codeId);
        if (codeIndex !== -1) {
            earningCodes.splice(codeIndex, 1);
            reviewProgress.totalCodes--;
            
            // Remove from approved list if it was there
            const approvedIndex = reviewProgress.approvedCodes.indexOf(codeId);
            if (approvedIndex !== -1) {
                reviewProgress.approvedCodes.splice(approvedIndex, 1);
                reviewProgress.reviewedCodes--;
            }
            
            showEarningCodesReview(); // Refresh the table
        }
    }
}

function approveSelectedCodes() {
    const selectedCheckboxes = document.querySelectorAll('.code-checkbox:checked');
    let approvedCount = 0;

    selectedCheckboxes.forEach(checkbox => {
        const codeId = checkbox.getAttribute('data-code');
        const code = earningCodes.find(c => c.code === codeId);

        if (code && !code.reviewed) {
            if (code.assessment === 'missing' && (!code.name || !code.description)) {
                return; // Skip codes that need completion
            }

            code.reviewed = true;
            reviewProgress.reviewedCodes++;
            reviewProgress.approvedCodes.push(codeId);
            approvedCount++;
        }
    });

    if (approvedCount > 0) {
        showEarningCodesReview();
    }
}

function approveAllCodes() {
    let approvedCount = 0;
    earningCodes.forEach(code => {
        if (!code.reviewed) {
            // Auto-fill missing codes with standard definitions
            if (code.assessment === 'missing') {
                if (code.code === 'VAC') {
                    code.name = 'Vacation';
                    code.description = 'Vacation/PTO earnings';
                } else if (code.code === 'SICK') {
                    code.name = 'Sick Leave';
                    code.description = 'Sick leave pay';
                } else if (code.code === 'MISC') {
                    code.name = 'Miscellaneous';
                    code.description = 'Miscellaneous earnings';
                }
            }

            code.reviewed = true;
            reviewProgress.reviewedCodes++;
            reviewProgress.approvedCodes.push(code.code);
            approvedCount++;
        }
    });

    // Show as USER message (user performed the action)
    addMessage(`Approve all ${approvedCount} remaining codes`, 'user');
    showEarningCodesReview();

    // Auto-transition to recommendations after a short delay
    setTimeout(function() {
     addMessage("Thank you for participating in our usability test!", 'ai');

        setTimeout(function() {
            showAISuggestions();
        }, 1500);
    }, 1000);
}

function makeFieldEditable(codeId, field, element) {
    const code = earningCodes.find(c => c.code === codeId);
    if (!code) return;

    const currentValue = code[field] || '';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'inline-edit-input';

    input.onblur = function() {
        code[field] = this.value;
        showEarningCodesReview(); // Refresh table
    };

    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    };

    element.innerHTML = '';
    element.appendChild(input);
    input.focus();
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.code-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });

    updateBulkActions();
}

function updateBulkActions() {
    const selectedCount = document.querySelectorAll('.code-checkbox:checked').length;
    const bulkButtons = document.querySelectorAll('.bulk-btn');

    bulkButtons.forEach(btn => {
        if (btn.textContent.includes('Selected')) {
            btn.disabled = selectedCount === 0;
        }
    });
}

function deleteSelectedCodes() {
    const selectedCheckboxes = document.querySelectorAll('.code-checkbox:checked');
    selectedCheckboxes.forEach(checkbox => {
        const codeId = checkbox.getAttribute('data-code');
        const codeIndex = earningCodes.findIndex(c => c.code === codeId);
        if (codeIndex !== -1) {
            earningCodes.splice(codeIndex, 1);
            reviewProgress.totalCodes--;
        }
    });

    showEarningCodesReview();

}

function showAISuggestions() {
    currentStep = 4;
    
    advanceToStep(4);

    // Update header status
    const headerStatus = document.getElementById('headerStatus');
    if (headerStatus) {
        headerStatus.textContent = 'Step 4 of 6: Suggestions';
    }

    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'Recommendations to Optimize Earning Codes';
    }
    if (panelSubtitle) {
        const processedCount = aiSuggestions.filter(s => s.status !== 'pending').length;
        panelSubtitle.innerHTML = `Review and decide on ${aiSuggestions.length} AI suggestions (${processedCount} processed)`;
    }

    // Replace panel content with suggestions
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        

        <div class="suggestions-container">
            ${aiSuggestions.map(suggestion => `
                <div class="suggestion-card ${suggestion.status}">
                    <div class="suggestion-header">
                        <h3 class="suggestion-title">${suggestion.title}</h3>
                        <span class="suggestion-status ${suggestion.status}">
    ${suggestion.status === 'accepted' ? '✅ Accepted' :
            suggestion.status === 'rejected' ? '❌ Rejected' : ''}
</span>
                    </div>
                    <div class="suggestion-body">
                        <p class="suggestion-description">${suggestion.description}</p>
                        <div class="suggestion-impact">
                            <strong>Impact:</strong> ${suggestion.impact}
                        </div>
                    </div>
                    <div class="suggestion-actions">
                        ${suggestion.status === 'pending' ? `
                            <button class="accept-btn" onclick="acceptSuggestion(${suggestion.id})">Accept</button>
                            <button class="reject-btn" onclick="rejectSuggestion(${suggestion.id})">Reject</button>
                        ` : `
                            <button class="undo-btn" onclick="undoSuggestion(${suggestion.id})">Undo</button>
                        `}
            
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Update panel actions
    const panelActions = document.querySelector('.panel-actions');
    if (panelActions) {
        const allProcessed = aiSuggestions.every(s => s.status !== 'pending');
        panelActions.innerHTML = `
            <button class="next-step-btn" onclick="continueToFinalRates()" ${!allProcessed ? 'disabled' : ''}>
                Continue to earning code configuration
            </button>
        `;
    }
}

function continueToRateConfiguration() {
    const approvedCount = earningCodes.filter(code => code.reviewed).length;

    if (approvedCount === 0) {
        // No codes approved - show validation message with proper options
        addMessage('You haven\'t approved any earning codes yet. Please review and approve your codes before continuing, or choose an alternative:', 'ai', [
            { action: 'approve-all-remaining', text: 'Approve all codes' },
            { action: 'skip-to-deduction-codes', text: 'Skip to deduction codes' },
            { action: 'skip-to-tax-configuration', text: 'Skip to tax configuration' }
        ]);
        return;
    }

    if (reviewProgress.reviewedCodes < reviewProgress.totalCodes) {
        addMessage("Please review and approve all earning codes before continuing, or choose an alternative:", 'ai', [
            { action: 'approve-all-remaining', text: 'Approve all codes' },
            { action: 'continue-to-recommendations', text: 'Continue anyway' },
            { action: 'skip-to-deduction-codes', text: 'Skip to deduction codes' },
            { action: 'skip-to-tax-configuration', text: 'Skip to tax configuration' }
        ]);
        return;
    }

    // This should go to AI Suggestions (Step 4), not directly to Rate Configuration
    showAISuggestions();
}

function acceptSuggestion(suggestionId) {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
        suggestion.status = 'accepted';
        applySuggestionChanges(suggestion);
        showAISuggestions(); // Refresh display




    }
}

function rejectSuggestion(suggestionId) {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
        suggestion.status = 'rejected';
        showAISuggestions(); // Refresh display

    }
}

function acceptAllSuggestions() {
    aiSuggestions.forEach(suggestion => {
        if (suggestion.status === 'pending') {
            suggestion.status = 'accepted';
            applySuggestionChanges(suggestion);
        }
    });
    showAISuggestions();

}

function rejectAllSuggestions() {
    aiSuggestions.forEach(suggestion => {
        if (suggestion.status === 'pending') {
            suggestion.status = 'rejected';
        }
    });
    showAISuggestions();


}

function applyAllSuggestions() {
    acceptAllSuggestions();
}

function applySuggestionChanges(suggestion) {
    switch (suggestion.id) {
        case 1: // Rename OTShift
            const otCode = earningCodes.find(c => c.code === 'OTShift');
            if (otCode) {
                otCode.name = 'Overtime Premium';
            }
            break;
        case 2: // This suggestion is no longer applicable since codes were removed
            // No action needed - codes already removed
            break;
        case 3: // Remove MISC code
            const miscIndex = earningCodes.findIndex(c => c.code === 'MISC');
            if (miscIndex !== -1) {
                earningCodes.splice(miscIndex, 1);
            }
            break;
        case 4: // Improve VAC/SICK setup
            const vacCode = earningCodes.find(c => c.code === 'VAC');
            const sickCode = earningCodes.find(c => c.code === 'SICK');
            if (vacCode) {
                vacCode.name = 'Vacation Pay';
                vacCode.description = 'Paid vacation time off';
                vacCode.assessment = 'confident';
            }
            if (sickCode) {
                sickCode.name = 'Sick Leave';
                sickCode.description = 'Paid sick leave';
                sickCode.assessment = 'confident';
            }
            break;
    }
}



function showSuggestionDetails(suggestionId) {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
        let detailsText = `**${suggestion.title}**\n\n${suggestion.description}\n\n**Expected Impact:** ${suggestion.impact}\n\n`;

        // Add specific details based on suggestion type
        switch (suggestionId) {
            case 1:
                detailsText += "**Changes:** OTShift → Overtime Premium (clearer for payroll staff)";
                break;
            case 2:
                detailsText += "**Changes:** Remove OTHOL2 and OTHOL3, replace with single HOL_OT code";
                break;
            case 3:
                detailsText += "**Changes:** Remove MISC code entirely (no clear business purpose)";
                break;
            case 4:
                detailsText += "**Changes:** VAC → 'Vacation Pay', SICK → 'Sick Leave' with proper descriptions";
                break;
        }

        addMessage(detailsText, 'ai');
    }
}

function continueToFinalRates() {
    if (aiSuggestions.some(s => s.status === 'pending')) {
        addMessage("Please review all recommendations before continuing to earning code configuration.", 'ai');
        return;
    }

    showRateConfiguration();
}

function showRateConfiguration() {
    currentStep = 5;

    advanceToStep(5);
    // Update header status
    const headerStatus = document.getElementById('headerStatus');
    if (headerStatus) {
        headerStatus.textContent = 'Step 5 of 6: Rate Configuration';
    }

    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'Configure Pay Rates';
    }
    if (panelSubtitle) {
        panelSubtitle.innerHTML = 'Set up how much each code pays - one more step after this';
    }

    // Replace panel content with rate configuration
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `


       <table class="review-table rate-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Rate Type</th>
                    <th>Reduces Base Pay?</th>
                    <th>Weighted Average Overtime Calculation</th>
                    <th>Special Taxability</th>
                </tr>
            </thead>
            <tbody>
                ${earningCodes.map(code => `
                    <tr>
                        <td><strong>${code.name || code.code}</strong></td>
                        <td>
                            <select class="rate-select" onchange="updateRateType('${code.code}', this.value)">
                                <option value="hourly">Hourly Rate</option>
                                <option value="multiplier" ${getDefaultRateType(code.code) === 'multiplier' ? 'selected' : ''}>Multiplier</option>
                                <option value="flat" ${code.code === 'BONUS' ? 'selected' : ''}>Flat Amount</option>
                            </select>
                        </td>
                        <td>
                            <select class="rate-select" onchange="updateReducesBase('${code.code}', this.value)">
                                <option value="no">No</option>
                                <option value="yes" ${code.code === 'VAC' || code.code === 'SICK' ? 'selected' : ''}>Yes</option>
                            </select>
                        </td>
                        <td>
                            <select class="rate-select" onchange="updateWeightedOT('${code.code}', this.value)">
                                <option value="no" ${getDefaultWeightedOT(code.code) === 'no' ? 'selected' : ''}>No</option>
                                <option value="yes" ${getDefaultWeightedOT(code.code) === 'yes' ? 'selected' : ''}>Yes</option>
                            </select>
                        </td>
                        <td>
                            <select class="rate-select" onchange="updateSpecialTax('${code.code}', this.value)">
                                <option value="no" ${getDefaultSpecialTax(code.code) === 'no' ? 'selected' : ''}>No</option>
                                <option value="supplemental" ${getDefaultSpecialTax(code.code) === 'supplemental' ? 'selected' : ''}>Supplemental</option>
                                <option value="non-taxable" ${getDefaultSpecialTax(code.code) === 'non-taxable' ? 'selected' : ''}>Non-taxable</option>
                                <option value="yes-other" ${getDefaultSpecialTax(code.code) === 'yes-other' ? 'selected' : ''}>Yes-other</option>
                            </select>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Update panel actions
    const panelActions = document.querySelector('.panel-actions');
    if (panelActions) {
        panelActions.innerHTML = `

        `;
    }
}

function getDefaultRateType(code) {
    const overtimeCodes = ['OTShift', 'OTHOL', 'HOL_OT'];
    return overtimeCodes.includes(code) ? 'multiplier' : 'hourly';
}

function getDefaultRateSelection(code) {
    switch (code) {
        case 'REG': return '1';
        case 'OTShift': return '1.5';
        case 'HOL': return '1';
        case 'OTHOL': return '2';
        case 'HOL_OT': return '2';
        case 'BONUS': return 'flat';
        case 'VAC': return '1';
        case 'SICK': return '1';
        default: return '1';
    }
}

function getDefaultWeightedOT(code) {
    // Regular earning codes typically contribute to weighted average OT calculation
    const regularCodes = ['REG', 'BONUS'];
    return regularCodes.includes(code) ? 'yes' : 'no';
}

function getDefaultSpecialTax(code) {
    // Set default special tax treatment based on earning code type
    switch (code) {
        case 'BONUS':
            return 'supplemental'; // Bonuses are typically supplemental income
        case 'VAC':
        case 'SICK':
            return 'no'; // PTO usually taxed normally
        default:
            return 'no'; // Most earning codes are regular taxable income
    }
}



function finalizeConfiguration() {
    showW2Simulation();

    addMessage("Almost done! Let's review how your earning codes will appear on employee W-2 forms.\n\nI've generated a simulated W-2 showing:\n• Which codes appear in the form\n• Which codes are excluded from the form\n• Special reporting requirements\n\nReview the W-2 simulation on the right →", 'ai', [
        { action: 'explain-w2-boxes', text: 'Explain W-2 boxes' },
        { action: 'adjust-w2-reporting', text: 'Adjust reporting settings' },
        { action: 'finalize-complete-setup', text: 'Complete setup' }
    ]);
}
function updateProcessCard(cardId, updates) {
    const card = document.getElementById(`process-card-${cardId}`);
    if (!card) return;

    if (updates.description) {
        const descElement = card.querySelector('.process-card-description');
        if (descElement) descElement.textContent = updates.description;
    }

    if (updates.status) {
        const statusElement = card.querySelector('.process-card-status');
        if (statusElement) {
            statusElement.className = `process-card-status ${updates.status}`;

            if (updates.status === 'complete') {
                statusElement.innerHTML = '<span>✅ Complete</span>';
            } else if (updates.status === 'error') {
                statusElement.innerHTML = '<span>❌ Error</span>';
            }
        }
    }

    if (updates.timestamp) {
        const timestampElement = card.querySelector('.process-card-timestamp');
        if (timestampElement) timestampElement.textContent = updates.timestamp;
    }
}

function showW2Simulation() {
    currentStep = 6;

    // Update header status
    const headerStatus = document.getElementById('headerStatus');
    if (headerStatus) {
        headerStatus.textContent = 'Step 6 of 6: W-2 Tax Form Preview';
    }

    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'W-2 Tax Form Simulation';
    }
    if (panelSubtitle) {
        panelSubtitle.innerHTML = 'Review how your earning codes will appear on employee W-2 forms';
    }

    // Replace panel content with W-2 simulation
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="w2-simulation-container">
            ${generateW2Form()}
            ${generateW2CodeBreakdown()}
        </div>
    `;

    // Update panel actions
    const panelActions = document.querySelector('.panel-actions');
    if (panelActions) {
        panelActions.innerHTML = `
            <button class="next-step-btn" onclick="completePayrollSetup()">
                🎉 Complete Payroll Setup
            </button>
        `;
    }
}

function generateW2Form() {
    // Calculate sample values based on earning codes
    const sampleValues = calculateSampleW2Values();

    return `
        <div class="w2-form-container">
            <h3>Sample W-2 Form Preview</h3>
            <div class="w2-form">
                <div class="w2-header">
                    <div class="w2-title">Form W-2 Wage and Tax Statement 2025</div>
                    <div class="w2-subtitle">Copy B—To Be Filed With Employee's FEDERAL Tax Return</div>
                </div>

                <div class="w2-employer-section">
                    <div class="w2-box">
                        <div class="box-label">b Employer identification number (EIN)</div>
                        <div class="box-value"></div>
                    </div>
                    <div class="w2-box">
                        <div class="box-label">c Employer's name, address, and ZIP code</div>
                        <div class="box-value"></div>
                    </div>
                </div>

                <div class="w2-employee-section">
                    <div class="w2-box">
                        <div class="box-label">d Control number</div>
                        <div class="box-value"></div>
                    </div>
                    <div class="w2-box">
                        <div class="box-label">e Employee's first name and initial</div>
                        <div class="box-value"></div>
                    </div>
                    <div class="w2-box">
                        <div class="box-label">f Employee's address and ZIP code</div>
                        <div class="box-value"></div>
                    </div>
                </div>

                <div class="w2-wage-boxes">
                    <div class="w2-wage-row">
                        <div class="w2-box highlight-box">
                            <div class="box-label">1 Wages, tips, other compensation</div>
                            <div class="box-value">${sampleValues.box1}</div>
                        </div>
                        <div class="w2-box">
                            <div class="box-label">2 Federal income tax withheld</div>
                            <div class="box-value">${sampleValues.box2}</div>
                        </div>
                    </div>
                    <div class="w2-wage-row">
                        <div class="w2-box highlight-box">
                            <div class="box-label">3 Social security wages</div>
                            <div class="box-value">${sampleValues.box3}</div>
                        </div>
                        <div class="w2-box">
                            <div class="box-label">4 Social security tax withheld</div>
                            <div class="box-value">${sampleValues.box4}</div>
                        </div>
                    </div>
                    <div class="w2-wage-row">
                        <div class="w2-box highlight-box">
                            <div class="box-label">5 Medicare wages and tips</div>
                            <div class="box-value">${sampleValues.box5}</div>
                        </div>
                        <div class="w2-box">
                            <div class="box-label">6 Medicare tax withheld</div>
                            <div class="box-value">${sampleValues.box6}</div>
                        </div>
                    </div>
                </div>

                <div class="w2-additional-boxes">
                    <div class="w2-box">
                        <div class="box-label">12a See instructions for box 12</div>
                        <div class="box-value">${sampleValues.box12a}</div>
                    </div>
                    <div class="w2-box">
                        <div class="box-label">14 Other</div>
                        <div class="box-value">${sampleValues.box14}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSampleW2Values() {
    // Define which codes go in Box 1 as specified by user - exclude MISC
    const box1AllowedCodes = ['REG', 'OTShift', 'HOL', 'OTHOL', 'HOL_OT', 'BONUS'];
    const box1Codes = earningCodes.filter(code => box1AllowedCodes.includes(code.code));

    // Box 3 (Social Security) - same as Box 1 for most cases
    const box3Codes = box1Codes;

    // Box 5 (Medicare) - same as Box 1 for most cases  
    const box5Codes = box1Codes;

    return {
        box1: getCodesTagBreakdown(box1Codes),
        box2: '', // No generic data
        box3: getCodesTagBreakdown(box3Codes),
        box4: '', // No generic data
        box5: getCodesTagBreakdown(box5Codes),
        box6: '', // No generic data
        box12a: '', // No generic data
        box14: '' // No generic data
    };
}

function getCodesTagBreakdown(codes) {
    if (codes.length === 0) {
        return '<div class="no-codes-message">No codes included</div>';
    }

    return `<div class="earning-codes-tags">
        ${codes.map(code => {
        // Add different tag styles based on code type
        let tagClass = 'earning-code-tag';
        if (['OTShift', 'OTHOL', 'OTHOL2', 'OTHOL3', 'HOL_OT'].includes(code.code)) {
            tagClass += ' overtime';
        } else if (['BONUS', 'COMM'].includes(code.code)) {
            tagClass += ' bonus';
        } else if (['VAC', 'SICK'].includes(code.code)) {
            tagClass += ' leave';
        }

        return `<span class="${tagClass}">${code.code}</span>`;
    }).join('')}
    </div>`;
}


function getCodeTaxExclusion(codeId) {
    // Define which codes are excluded from various tax calculations
    const exclusions = {
        'VAC': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'SICK': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'REG': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'OTShift': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'HOL': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'OTHOL': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'COMM': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false },
        'BONUS': { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false }
    };

    return exclusions[codeId] || { excludedFromIncome: false, excludedFromSocialSecurity: false, excludedFromMedicare: false };
}

function generateW2CodeBreakdown() {
    // Define which codes are displayed in W-2 boxes
    const displayedCodes = ['REG', 'OTShift', 'HOL', 'OTHOL', 'OTHOL2', 'OTHOL3', 'HOL_OT', 'COMM'];
    const notDisplayedCodes = earningCodes.filter(code => !displayedCodes.includes(code.code));

    return `
        <div class="w2-breakdown-container">
         
            <div class="w2-summary">
                <h4>W-2 Summary</h4>
                <div class="summary-stats">
                    <div class="stat-item">
                        <span class="stat-number">${earningCodes.filter(code => displayedCodes.includes(code.code)).length}</span>
                        <span class="stat-label">Codes displayed in W-2</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${notDisplayedCodes.length}</span>
                        <span class="stat-label">Codes not displayed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${earningCodes.length}</span>
                        <span class="stat-label">Total earning codes</span>
                    </div>
                </div>
            </div>
                ${notDisplayedCodes.length > 0 ? `
                    <div class="breakdown-section">
                        <h4>Not Displayed in W-2 Form</h4>
                        <div class="code-list excluded">
                            ${notDisplayedCodes.map(code => `
                                <div class="code-item">
                                    <span class="code-name">${code.code}</span>
                                    <span class="code-desc">${code.name || 'Unnamed'}</span>
                                    <span class="exclusion-reason">${code.code === 'MISC' ? 'Miscellaneous codes excluded' :
            code.code === 'VAC' || code.code === 'SICK' ? 'Time-off codes handled separately' :
                code.code === 'BONUS' ? 'Bonus codes reported differently' : 'Not included in wage boxes'}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                
            </div>

            
        </div>
    `;
}

function completePayrollSetup() {
    addMessage("🎉 **Congratulations! Your complete payroll system is now fully configured!**\n\n**Final Summary:**\n✅ **Pay Schedules:** Configured and approved\n✅ **Calendar Simulation:** Generated with holiday/weekend adjustments\n✅ **Earning Codes:** Reviewed and optimized  \n✅ **Recommendations:** Processed and applied\n✅ **Rate Configuration:** Complete with tax settings\n✅ **W-2 Preview:** Tax form reporting verified\n\n**Your payroll system is ready for implementation!** All earning codes have been properly configured for accurate W-2 reporting.", 'ai', [
        { action: 'export-configuration', text: 'Export Configuration' },
        { action: 'review-final-setup', text: 'Review Final Setup' },
        { action: 'start-over', text: 'Start New Configuration' }
    ]);
}

// ========================================
// NATURAL LANGUAGE COMMAND PARSER
// Three-tier system: Direct execution → Clarification → Chat fallback
// ========================================

// Command patterns with confidence scoring
const commandPatterns = [
    // HIGH CONFIDENCE - Direct execution (80%+)
    { 
        pattern: /(?:add|create|new|setup).*(?:biweekly|bi weekly|bi-weekly|every two weeks|2 weeks).*(?:schedule|payroll)/i,
        confidence: 95,
        action: 'bi-weekly',
        type: 'schedule'
    },
    { 
        pattern: /(?:add|create|new|setup).*(?:pay schedule|payroll).*(?:biweekly|bi weekly|bi-weekly|every two weeks|twice a month|2 weeks)/i,
        confidence: 95,
        action: 'bi-weekly',
        type: 'schedule'
    },
    { 
        pattern: /(?:create|add|new|setup).*(?:schedule|payroll).*(?:to pay|that pays).*(?:twice a month|every two weeks|biweekly|bi-weekly)/i,
        confidence: 95,
        action: 'bi-weekly',
        type: 'schedule'
    },
    { 
        pattern: /(?:add|create|new|setup).*weekly.*(?:schedule|payroll)?/i,
        confidence: 90,
        action: 'weekly',
        type: 'schedule'
    },
    { 
        pattern: /(?:add|create|new|setup).*monthly.*(?:schedule|payroll)?/i,
        confidence: 90,
        action: 'monthly',
        type: 'schedule'
    },
    { 
        pattern: /(?:add|create|new|setup).*(?:semi-monthly|semimonthly).*(?:schedule|payroll)?/i,
        confidence: 90,
        action: 'semi-monthly',
        type: 'schedule'
    },
    { 
        pattern: /(?:add|create|new|setup).*quarterly.*(?:schedule|payroll)?/i,
        confidence: 85,
        action: 'quarterly',
        type: 'schedule'
    },

    {
        pattern: /(?:add|create|new|setup).*(?:award|awards).*(?:(?:earning\s+)?code|earning)/i,
        confidence: 95,
        action: 'create-earning-code-for-award',
        type: 'earning_code'
    },
    {
        pattern: /(?:add|create|new|setup).*(?:(?:earning\s+)?code|earning).*(?:award|awards)/i,
        confidence: 95,
        action: 'create-earning-code-for-award',
        type: 'earning_code'
    },

    // MEDIUM CONFIDENCE - Ask for clarification (40-79%)
    { 
        pattern: /(?:add|create|new|setup).*(?:schedule|payroll)/i,
        confidence: 60,
        action: 'schedule-clarification',
        type: 'ambiguous'
    },
    { 
        pattern: /(?:add|create|new)(?:\s+(?:a|an|the))?\s*$/i,
        confidence: 50,
        action: 'general-clarification',
        type: 'ambiguous'
    },
  

    {
        pattern: /(?:add|create|new|setup).*(?:(?:earning\s+)?code|earning)/i,
        confidence: 75,  // Lower confidence so award patterns take priority
        action: 'create-general-earning-code',
        type: 'earning_code'
    },
   
    { 
        pattern: /(?:biweekly|bi-weekly|weekly|monthly|semi-monthly|quarterly)(?:\s+(?:schedule|payroll))?$/i,
        confidence: 55,
        action: 'type-only-clarification',
        type: 'ambiguous'
    }
];

// Parse natural language command
function parseNaturalLanguageCommand(message) {
    if (!message || message.trim().length < 3) {
        return null;
    }

    const cleanMessage = message.trim().toLowerCase();

    // Check all patterns and find the best match
    let bestMatch = null;
    let highestConfidence = 0;

    for (const commandPattern of commandPatterns) {
        if (commandPattern.pattern.test(cleanMessage)) {
            if (commandPattern.confidence > highestConfidence) {
                highestConfidence = commandPattern.confidence;
                bestMatch = commandPattern;
            }
        }
    }

    if (!bestMatch) {
        return null;
    }

    return {
        action: bestMatch.action,
        type: bestMatch.type,
        confidence: bestMatch.confidence,
        originalMessage: message
    };
}

// Execute detected command
function executeCommand(command) {
    const { action, confidence, originalMessage } = command;

    // Add user message first
    addMessage(originalMessage, 'user');

    if (confidence >= 80) {
        // HIGH CONFIDENCE - Direct execution
        executeDirectCommand(action);
    } else if (confidence >= 40) {
        // MEDIUM CONFIDENCE - Ask for clarification
        setTimeout(() => {
            showClarificationOptions(action, originalMessage);
        }, 1000);
    }
    // LOW CONFIDENCE cases return null and fall through to getAIResponse()
}

// Execute high-confidence commands directly
function executeDirectCommand(action) {
    console.log(`Executing direct command: ${action}`);

    setTimeout(() => {
        switch (action) {
            case 'bi-weekly':
            addMessage(`${CONSTANTS.MESSAGES.PERFECT} I'll set up a Bi-Weekly schedule for you right away!`, 'ai');
            setTimeout(() => {
                // Update the right panel immediately
                updatePanelContent('biweekly-placeholder');
                
                // Ask for the name right away
                addMessage('What would you like to name this bi-weekly pay schedule?', 'ai');
                window.waitingForBiweeklyName = true;
            }, 1000);
            break;

            case 'weekly':
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} Creating a Weekly schedule now!`, 'ai');
                setTimeout(() => {
                    handlePillClick('add-new');
                    // Then simulate clicking weekly option
                    setTimeout(() => {
                        handlePillClick('weekly');
                    }, 1000);
                }, 500);
                break;

            case 'monthly':
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} Adding a Monthly schedule for you!`, 'ai');
                setTimeout(() => {
                    handlePillClick('monthly');
                }, 500);
                break;

            case 'semi-monthly':
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} I'll configure a Semi-Monthly schedule!`, 'ai');
                setTimeout(() => {
                    addMessage('Semi-Monthly schedules pay employees twice per month (24 periods/year). This is already configured in your system!', 'ai', [
                        { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly settings' },
                        { action: 'add-new', text: 'Add different schedule type' }
                    ]);
                }, 500);
                break;

            case 'quarterly':
                addMessage(`${CONSTANTS.MESSAGES.PERFECT} Setting up a Quarterly schedule!`, 'ai');
                setTimeout(() => {
                    handlePillClick('quarterly');
                }, 500);
                break;
            
                case 'create-earning-code-for-award':
        
                    earningCodeCreationState.isActive = true;
                    earningCodeCreationState.description = 'Employee awards';
                    handleEarningCodeDescription('Employee awards');
                
             break;

                case 'create-new-earning-code':
                message = 'Create new earning code';
                addMessage(message, 'user');

                // Remove pills immediately
                const allPills = document.querySelectorAll('.suggested-pills');
                allPills.forEach(pills => {
                    if (pills.parentNode) {
                        pills.parentNode.removeChild(pills);
                    }
                });

                setTimeout(() => {
                    startEarningCodeCreationWorkflow();
                }, 1000);
                return;
            default:
                console.warn(`Unknown direct command: ${action}`);
                break;
        }
    }, 1000);
}

// Show clarification options for medium-confidence commands
function showClarificationOptions(action, originalMessage) {
    let clarificationMessage = '';
    let clarificationPills = [];

    switch (action) {
        case 'schedule-clarification':
            clarificationMessage = `I see you want to add a new schedule! Which type would you like to create?`;
            clarificationPills = [
                { action: 'bi-weekly', text: 'Bi-Weekly (26 periods/year)' },
                { action: 'weekly', text: 'Weekly (52 periods/year)' },
                { action: 'monthly', text: 'Monthly (12 periods/year)' },
                { action: 'semi-monthly', text: 'Semi-Monthly (24 periods/year)' },
                { action: 'quarterly', text: 'Quarterly (4 periods/year)' }
            ];
            break;

        case 'general-clarification':
            clarificationMessage = `I see you want to add something new. What would you like to add?`;
            clarificationPills = [
                { action: 'add-new', text: 'Add new schedule' },
                { action: 'continue-earning-codes', text: 'Add earning codes' },
                { action: 'add-employee', text: 'Add employee' }
            ];
            break;

        case 'type-only-clarification':
            // Extract the schedule type from original message
            const scheduleType = extractScheduleType(originalMessage);
            clarificationMessage = `I see you mentioned "${scheduleType}". What would you like to do with it?`;
            clarificationPills = [
                { action: getScheduleAction(scheduleType), text: `Add ${scheduleType} schedule` },
                { action: getEditAction(scheduleType), text: `Edit ${scheduleType} schedule` },
                { action: 'add-new', text: 'See all schedule options' }
            ];
            break;

        default:
            clarificationMessage = `I'm not sure exactly what you want to do. Can you be more specific?`;
            clarificationPills = [
                { action: 'add-new', text: 'Add new schedule' },
                { action: 'edit-schedule', text: 'Edit existing schedule' },
                { action: 'continue-earning-codes', text: 'Work on earning codes' }
            ];
            break;
    }

    addMessage(clarificationMessage, 'ai', clarificationPills);
}

// Helper function to extract schedule type from message
function extractScheduleType(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('biweekly') || lowerMessage.includes('bi-weekly')) {
        return 'Bi-Weekly';
    } else if (lowerMessage.includes('weekly')) {
        return 'Weekly';
    } else if (lowerMessage.includes('monthly')) {
        return 'Monthly';
    } else if (lowerMessage.includes('semi-monthly') || lowerMessage.includes('semimonthly')) {
        return 'Semi-Monthly';
    } else if (lowerMessage.includes('quarterly')) {
        return 'Quarterly';
    }

    return 'schedule';
}

// Helper function to get schedule action
function getScheduleAction(scheduleType) {
    const typeMap = {
        'Bi-Weekly': 'bi-weekly',
        'Weekly': 'weekly',
        'Monthly': 'monthly',
        'Semi-Monthly': 'semi-monthly',
        'Quarterly': 'quarterly'
    };

    return typeMap[scheduleType] || 'add-new';
}

// Helper function to get edit action
function getEditAction(scheduleType) {
    const editMap = {
        'Bi-Weekly': 'edit-biweekly',
        'Weekly': 'edit-weekly',
        'Monthly': 'edit-monthly',
        'Semi-Monthly': 'edit-semi-monthly',
        'Quarterly': 'edit-quarterly'
    };

    return editMap[scheduleType] || 'edit-schedule';
}

// ========================================
// INTEGRATION WITH EXISTING SENDMESSAGE FUNCTION
// ========================================

// Modified sendMessage function (replace your existing one)

// ========================================
// MESSAGING AND INPUT HANDLING
// ========================================

function sendMessage() {
    console.log('sendMessage function called'); // Debug log

    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (!message) return;

    console.log('Processing message:', message); // Debug log

    // 1. Handle unified inputs FIRST (includes earning codes, company info, etc.)
    if (processUnifiedInput(message)) {
        input.value = '';
        return;
    }

    // 2. Handle bi-weekly name input (special case with date picker)
    if (window.waitingForBiweeklyName) {
        window.waitingForBiweeklyName = false;

        if (message.trim().length < 2) {
            addMessage('Please enter a valid schedule name (at least 2 characters).', 'ai');
            window.waitingForBiweeklyName = true;
            input.value = '';
            return;
        }

        addMessage(message.trim(), 'user');
        window.biweeklyName = message.trim();

        // Update the card with the name
        const nameElement = document.getElementById('biweekly-name');
        if (nameElement) {
            nameElement.textContent = message;
            nameElement.classList.remove('missing-field');
        }

        setTimeout(() => {
            chatDatePickerShow(`Great! What should be the first pay date for this schedule?`, function(selectedDate) {
                window.waitingForBiweeklyFirstDate = false;
                window.biweeklyFirstDate = selectedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Update the card with the first pay date
                const dateElement = document.getElementById('biweekly-first-date');
                if (dateElement) {
                    dateElement.textContent = window.biweeklyFirstDate;
                    dateElement.classList.remove('missing-field');
                }

                setTimeout(() => {
                    addMessage(`Perfect! I've configured your Bi-Weekly schedule:\n\n<Strong>Name:</strong> ${window.biweeklyName}\n<strong>First pay date:</strong>${window.biweeklyFirstDate}\n\nWhat else would you like to do?`, 'ai', [
                        { action: 'looks-good', text: 'Looks good, continue' },
                        { action: 'add-new', text: 'Add new schedule' },
                        { action: 'edit-semi-monthly', text: 'Edit semi-monthly' },
                        { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
                    ]);
                }, 1000);
            });
        }, 1000);
        input.value = '';
        return;
    }

    // 3. Handle date input when date picker is active
    if (window.waitingForDateInput) {
        const parsedDate = chatDatePickerParseTextDate(message);

        if (parsedDate) {
            addMessage(message, 'user');
            input.value = '';
            chatDatePickerCleanup();

            if (chatDatePickerState.callback && typeof chatDatePickerState.callback === 'function') {
                chatDatePickerState.callback(parsedDate);
            }

            window.waitingForDateInput = false;
            chatDatePickerState.isActive = false;
            chatDatePickerState.selectedDate = null;
            chatDatePickerState.callback = null;
            return;
        } else {
            addMessage(message, 'user');
            input.value = '';
            setTimeout(() => {
                addMessage('I couldn\'t understand that date format. Please try:\n• "July 15, 2025"\n• "7/15/2025" \n• "Tomorrow"\n• "Next Friday"\n\nOr use the calendar above to select a date.', 'ai');
            }, 1000);
            return;
        }
    }

    // 4. Check for natural language commands
    const detectedCommand = parseNaturalLanguageCommand(message);
    if (detectedCommand) {
        input.value = '';
        executeCommand(detectedCommand);
        return;
    }

    // 5. Default chat handling
    addMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
        const response = getAIResponse(message);
        if (response && response !== null) {
            addMessage(response, 'ai');
        }
    }, 1000);
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
// ========================================
// EARNING CODE CREATION WORKFLOW
// ========================================

// State for earning code creation
let earningCodeCreationState = {
    step: 1, // 1: description, 2: suggestion, 3: confirmation
    description: '',
    suggestedCode: '',
    suggestedName: '',
    userCode: '',
    userName: '',
    isActive: false
};

function startEarningCodeCreationWorkflow() {
    earningCodeCreationState.isActive = true;
    earningCodeCreationState.step = 1;
    earningCodeCreationState.description = '';
    
    addMessage('I\'ll help you create a new earning code. Please describe what this earning code will be used for:', 'ai');
    
    // Set input waiting state
    window.waitingForEarningCodeDescription = true;
      console.log('Flag set to:', window.waitingForEarningCodeDescription); 
}

function handleEarningCodeDescription(description) {
    earningCodeCreationState.description = description;
    earningCodeCreationState.step = 2;

    // Generate smart suggestions based on description
    const suggestions = generateEarningCodeSuggestions(description);
    earningCodeCreationState.suggestedCode = suggestions.code;
    earningCodeCreationState.suggestedName = suggestions.name;

    setTimeout(() => {
        addMessage(`Great! Based on your description, I suggest:\n\n**Code:** ${suggestions.code}\n**Name:** ${suggestions.name}\n\nYou can accept these suggestions or edit them:`, 'ai', [
            { action: 'accept-earning-code-suggestions', text: 'Accept suggestions' },
            { action: 'edit-earning-code-name', text: 'Edit name' },
            { action: 'edit-earning-code-code', text: 'Edit code' }
        ]);
    }, 1000);
}

function generateEarningCodeSuggestions(description) {
    const lowerDesc = description.toLowerCase();
    
    // Smart suggestion patterns
        if (lowerDesc.includes('award') || lowerDesc.includes('awards') || lowerDesc.includes('AWD')) {
            return { code: 'AWD', name: 'Employee Awards' };
           } else if (lowerDesc.includes('regular') || lowerDesc.includes('normal') || lowerDesc.includes('base')) {
            return { code: 'REG', name: 'Regular' };
        } else {
        // Generate code from first letters of key words
        const words = description.split(' ').filter(word => word.length > 2);
        const code = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('') + 'E';
        return { code: code, name: description.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') };
    }
}

function acceptEarningCodeSuggestions() {
    // Store the suggested values directly
    earningCodeCreationState.userCode = earningCodeCreationState.suggestedCode;
    earningCodeCreationState.userName = earningCodeCreationState.suggestedName;

    // Skip confirmEarningCodeCreation() and go directly to adding the code
    addNewEarningCodeToTable();
}

function confirmEarningCodeCreation() {
    earningCodeCreationState.step = 3;
    
    addMessage(`Perfect! I'll create the new earning code:\n\n**Code:** ${earningCodeCreationState.userCode}\n**Name:** ${earningCodeCreationState.userName}\n**Description:** ${earningCodeCreationState.description}\n\nShall I add this to your earning codes?`, 'ai', [
        { action: 'confirm-add-earning-code', text: 'Yes, add it' },
        { action: 'cancel-earning-code-creation', text: 'Cancel' }
    ]);
}

function addNewEarningCodeToTable() {
    // Check for duplicates
    const existingCode = earningCodes.find(code => code.code === earningCodeCreationState.userCode);
    if (existingCode) {
        addMessage(`A code with "${earningCodeCreationState.userCode}" already exists. Please choose a different code.`, 'ai', [
            { action: 'edit-earning-code-code', text: 'Choose different code' },
            { action: 'cancel-earning-code-creation', text: 'Cancel' }
        ]);
        return;
    }

    // Add new earning code
    const newCode = {
        code: earningCodeCreationState.userCode,
        name: earningCodeCreationState.userName,
        description: earningCodeCreationState.description,
        assessment: 'confident',
        reviewed: true,
        editMode: false
    };

    earningCodes.push(newCode);
    reviewProgress.totalCodes++;
    reviewProgress.reviewedCodes++;
    reviewProgress.approvedCodes.push(newCode.code);

    // Reset state
    earningCodeCreationState.isActive = false;
    window.waitingForEarningCodeDescription = false;
    window.waitingForEarningCodeName = false;
    window.waitingForEarningCodeCode = false;

    // Refresh the table immediately
    showEarningCodesReview();

    // Show success message with specific pills
    addMessage(`✅ Successfully added new earning code "${earningCodeCreationState.userCode}" to your table!`, 'ai', [
        { action: 'continue-to-recommendations', text: 'Next step' },
        { action: 'create-new-earning-code', text: 'Create new earning code' },
        { action: 'skip-to-deduction-codes', text: 'Skip to deduction codes' },
        { action: 'skip-to-tax-configuration', text: 'Skip to tax configuration' }
    ]);
}

function validateEarningCode(code) {
    if (!code || code.length < 2 || code.length > 10) {
        return false;
    }
    if (!/^[A-Z0-9_]+$/.test(code)) {
        return false;
    }
    return true;
}

function validateEarningName(name) {
    return name && name.trim().length >= 2;
}

function handleEarningCodeInput(inputElement) {
    // Remove missing-field class when user starts typing
    if (inputElement.classList.contains('missing-field')) {
        inputElement.classList.remove('missing-field');
    }
    
    // Add visual feedback for unsaved changes
    inputElement.classList.add('unsaved-changes');
}

function saveEarningCodeField(inputElement) {
    const codeId = inputElement.getAttribute('data-code') || inputElement.getAttribute('data-original-code');
    const field = inputElement.getAttribute('data-field');
    const value = inputElement.value.trim();
    
    console.log('Saving field:', { codeId, field, value }); // Debug log
    
    // Find the earning code in the array
    const earningCode = earningCodes.find(code => code.code === codeId);
    
    if (!earningCode) {
        console.error('Could not find earning code:', codeId);
        return;
    }
    
    // Handle code field changes (need to update the code identifier)
    if (field === 'code') {
        const oldCode = codeId;
        const newCode = value.toUpperCase();
        
        // Validate the new code
        if (!validateEarningCode(newCode)) {
            inputElement.classList.add('error');
            addMessage('Please enter a valid code (2-10 characters, uppercase letters/numbers/underscores only).', 'ai');
            inputElement.value = oldCode; // Revert to old value
            return;
        }
        
        // Check for duplicates
        const existingCode = earningCodes.find(code => code.code === newCode && code !== earningCode);
        if (existingCode) {
            inputElement.classList.add('error');
            addMessage(`Code "${newCode}" already exists. Please choose a different code.`, 'ai');
            inputElement.value = oldCode; // Revert to old value
            return;
        }
        
        // Update the code
        earningCode.code = newCode;
        
        // Update all data attributes that reference this code
        const tableRow = inputElement.closest('tr');
        tableRow.querySelectorAll('[data-code]').forEach(element => {
            element.setAttribute('data-code', newCode);
        });
        
        // Update the original code reference
        inputElement.setAttribute('data-original-code', newCode);
        
        console.log('Updated code from', oldCode, 'to', newCode);
    } else {
        // Handle other field changes
        earningCode[field] = value;
        console.log('Updated', field, 'to', value, 'for code', codeId);
    }
    
    // Update assessment if missing info is filled
    if (earningCode.assessment === 'missing' && earningCode.name && earningCode.description) {
        earningCode.assessment = 'confident';
        
        // Update the assessment badge in the UI
        const tableRow = inputElement.closest('tr');
        const assessmentBadge = tableRow.querySelector('.assessment-badge');
        if (assessmentBadge) {
            assessmentBadge.className = 'assessment-badge confident';
            assessmentBadge.textContent = '✅ Confident';
        }
    }
    
    // Remove visual feedback classes
    inputElement.classList.remove('unsaved-changes', 'error');
    
    // Update review progress if needed
    updateReviewProgress();
}

function updateReviewProgress() {
    // Count codes that have required info
    const codesWithInfo = earningCodes.filter(code => 
        code.name && code.description && code.assessment !== 'missing'
    );
    
    // Update the subtitle if it exists
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelSubtitle) {
        const progressPercent = Math.round((reviewProgress.reviewedCodes / reviewProgress.totalCodes) * 100);
        panelSubtitle.innerHTML = `Please approve each code (${reviewProgress.reviewedCodes} of ${reviewProgress.totalCodes} reviewed)`;
    }
}

function getDefaultRateMultiplier(code) {
    // Set default rate multipliers based on code type
    switch (code) {
        case 'REG':
        case 'HOL':
        case 'VAC':
        case 'SICK':
            return '1';
        case 'OTShift':
        case 'OTHOL':
            return '1.5';
        case 'OTHOL2':
        case 'OTHOL3':
        case 'HOL_OT':
            return '2';
        case 'BONUS':
        case 'COMM':
            return 'flat';
        default:
            return '1';
    }
}

function updateRateMultiplier(code, multiplier) {
    const earningCode = earningCodes.find(c => c.code === code);
    if (earningCode) {
        earningCode.rateMultiplier = multiplier;
        console.log(`Updated ${code} rate multiplier to ${multiplier}`);
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Conversation History Management
let conversationState = {
    isCollapsed: false,
    messageHistory: [],
    currentProcessCard: null,
    collapsedSections: [] // Track multiple collapsed sections
};

function collapseConversationHistory(headerText = "Pay schedule configuration threads") {
    const messagesContainer = document.getElementById('chatMessages');

    // Get messages that aren't already in collapsed sections or process cards
    const messages = messagesContainer.querySelectorAll('.message:not(.process-card-message):not(.conversation-history-collapsed .message)');

    if (messages.length === 0) return; // No messages to collapse

    // Create unique ID for this section
    const sectionId = `conversationHistory-${Date.now()}`;

    // Store this section in our state
    const sectionData = {
        id: sectionId,
        headerText: headerText,
        messageCount: messages.length,
        messages: Array.from(messages)
    };

    conversationState.collapsedSections.push(sectionData);
    conversationState.isCollapsed = true;

    // Create toggle header
    const toggleHeader = createToggleHeader(messages.length, headerText, sectionId);

    // Wrap existing messages in collapsible container
    const historyContainer = document.createElement('div');
    historyContainer.className = 'conversation-history-collapsed';
    historyContainer.id = sectionId;

    // Move messages to history container
    messages.forEach(message => {
        historyContainer.appendChild(message);
    });

    // Find where to insert this section (before any process cards but after existing collapsed sections)
    const existingCollapsedSections = messagesContainer.querySelectorAll('.conversation-toggle-header, .conversation-history-collapsed');
    const processCards = messagesContainer.querySelectorAll('.process-card-message');

    let insertionPoint = messagesContainer.firstChild;

    if (existingCollapsedSections.length > 0) {
        // Insert after the last collapsed section
        insertionPoint = existingCollapsedSections[existingCollapsedSections.length - 1].nextSibling;
    }

    // Insert toggle header and history container
    messagesContainer.insertBefore(toggleHeader, insertionPoint);
    messagesContainer.insertBefore(historyContainer, insertionPoint);

    // Smooth scroll to show the latest content
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 300);
}



function createToggleHeader(messageCount, headerText, sectionId) {
    const header = document.createElement('div');
    header.className = 'conversation-toggle-header';
    header.setAttribute('data-section-id', sectionId);
    header.onclick = function() { toggleConversationHistory(sectionId); };

    header.innerHTML = `
            <span class="toggle-icon">  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
            </span>
            <span class="toggle-text">${headerText}</span>
            <span class="toggle-count">${messageCount} messages</span>
        `;

    return header;
}

function toggleConversationHistory(sectionId) {
    const historyContainer = document.getElementById(sectionId);
    const toggleHeader = document.querySelector(`[data-section-id="${sectionId}"]`);

    if (!historyContainer || !toggleHeader) return;

    const sectionData = conversationState.collapsedSections.find(section => section.id === sectionId);
    if (!sectionData) return;

    if (historyContainer.classList.contains('conversation-history-collapsed')) {
        // Expand this section
        historyContainer.classList.remove('conversation-history-collapsed');
        historyContainer.classList.add('conversation-history-expanded');

        const toggleText = toggleHeader.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = 'Hide conversation threads';
        }
    } else {
        // Collapse this section
        historyContainer.classList.remove('conversation-history-expanded');
        historyContainer.classList.add('conversation-history-collapsed');

        const toggleText = toggleHeader.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = sectionData.headerText;
        }
    }

    // Scroll to show updated content
    setTimeout(() => {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 300);
}

function selectRadio(element) {
    const radioContainer = element.closest('.suggested-radios');
    if (radioContainer) {
        radioContainer.querySelectorAll('.radio-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
    element.classList.add('selected');
}

function toggleCheckbox(element) {
    element.classList.toggle('checked');
}

function submitCheckboxes() {
    const checkedBoxes = document.querySelectorAll('.checkbox-btn.checked');
    const selectedRoles = Array.from(checkedBoxes).map(box => box.textContent);

    if (selectedRoles.length === 0) {
        addMessage('Please select at least one role.', 'ai');
        return;
    }

    // Add user message showing what they selected
    addMessage(selectedRoles.join(', '), 'user');

    // Remove all checkboxes
    const allCheckboxes = document.querySelectorAll('.suggested-checkboxes');
    allCheckboxes.forEach(container => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });

}



// NEW FUNCTION: Call this to show wizard instead of existing intro


function showNewWelcomeStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <h1 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    ${CONSTANTS.WIZARD.INTRO_TITLE}
                </h1>
              <p class="wizard-subtitle">${CONSTANTS.WIZARD.INTRO_SUBTITLE}</p>
            </div>

            <div class="wizard-content">
                <p class="wizard-description">
                    We see you've selected Payroll, HR, and Time Keeping modules. Great choice! 
                    Let's get to know more about you so we can tailor the process for your needs.
                </p>

                <div class="wizard-highlight">
                    <strong>Tell us about you</strong>, and we'll be able to provide a more personalized experience.
                    We'll use this info to customize your experience and show you the features that matter most to your day-to-day work.
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="startNewWizard()">
                    Let's get started
                </button>
                <button class="wizard-btn wizard-btn-secondary" onclick="skipNewWizard()">
                    Skip the introduction
                </button>
            </div>
        </div>
    `;
}

function startNewWizard() {
    alert('Wizard started! (We will build the next steps in Phase 2)');
}

// PHASE 3: STEPS 1-4 - Replace existing step functions

function startNewWizard() {
    newWizardState.currentStep = 1;
    newWizardState.totalSteps = 5;
    showRoleStep();
}

function showRoleStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 1 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    What's your primary role?
                </h2>
                <p class="wizard-subtitle">Select all that apply - this helps us customize the interface for you.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-checkboxes">
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="hr-manager">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I handle all HR and payroll tasks</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="payroll-admin">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I focus mainly on payroll</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="business-owner">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I'm new to HR but learning fast</h3>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="toggleWizardCheckbox(this)" data-value="consultant">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>I work with an accountant or HR consultant</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromRole()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function toggleWizardCheckbox(element) {
    element.classList.toggle('checked');

    // Enable/disable continue button based on selection
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = checkedBoxes.length === 0;
    continueBtn.style.opacity = checkedBoxes.length === 0 ? '0.5' : '1';
}

function continueFromRole() {
    // Store selected roles
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const selectedRoles = Array.from(checkedBoxes).map(box => box.getAttribute('data-value'));

    if (selectedRoles.length === 0) {
        alert('Please select at least one role');
        return;
    }

    newWizardState.userData.roles = selectedRoles;
    newWizardState.currentStep = 2;
    showExperienceStep();
}

function showExperienceStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 2 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    How much payroll experience do you have?
                </h2>
                <p class="wizard-subtitle">This helps us adjust the pace and detail level of the setup process.</p>
            </div>

            <div class="wizard-content">
                <div class="experience-slider-container">
                    <div class="experience-label" id="experienceLabel">Less than 1 year</div>
                    <input type="range" class="experience-slider" id="experienceSlider" min="1" max="4" value="1" oninput="updateExperienceLabel(this.value)">
                    <div class="experience-markers">
                        <span>< 1 year</span>
                        <span>2-5 years</span>
                        <span>5-10 years</span>
                        <span>10+ years</span>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromExperience()">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function updateExperienceLabel(value) {
    const label = document.getElementById('experienceLabel');
    const labels = {
        '1': 'Less than 1 year',
        '2': '2-5 years of experience',
        '3': '5-10 years of experience',
        '4': '10+ years of experience'
    };
    label.textContent = labels[value];
}

function continueFromExperience() {
    const slider = document.getElementById('experienceSlider');
    const experienceLevel = slider.value;
    const experienceLabels = {
        '1': 'less-than-1-year',
        '2': '2-5-years',
        '3': '5-10-years',
        '4': '10-plus-years'
    };

    newWizardState.userData.experience = experienceLabels[experienceLevel];
    newWizardState.currentStep = 3;
    showCurrentSystemStep();
}

function showCurrentSystemStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 3 of ${newWizardState.totalSteps}</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    What payroll system are you migrating from?
                </h2>
                <p class="wizard-subtitle">This helps us understand your current setup and migration needs.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-options">
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="manual">
                        <div class="option-content">
                            <h3>Manual payroll (Excel, paper, etc.)</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="quickbooks">
                        <div class="option-content">
                            <h3>QuickBooks Payroll</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="adp">
                        <div class="option-content">
                            <h3>ADP</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="paychex">
                        <div class="option-content">
                            <h3>Paychex</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="gusto">
                        <div class="option-content">
                            <h3>Gusto</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="other">
                        <div class="option-content">
                            <h3>Other system</h3>
                        </div>
                    </div>
                    <div class="wizard-option" onclick="selectSystem(this)" data-value="new">
                        <div class="option-content">
                            <h3>This is my first payroll system</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromSystem()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function selectSystem(element) {
    // Remove selection from all options
    document.querySelectorAll('.wizard-option').forEach(opt => opt.classList.remove('selected'));

    // Select the clicked option
    element.classList.add('selected');

    // Store the selection
    newWizardState.userData.currentSystem = element.getAttribute('data-value');

    // Enable the continue button
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
}

function continueFromSystem() {
    if (!newWizardState.userData.currentSystem) {
        alert('Please select a payroll system');
        return;
    }

    newWizardState.currentStep = 4;
    showFirstPayDateStep();
}


function showFirstPayDateStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 4 of 5</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    How frequently do you pay your employees?
                </h2>
                <p class="wizard-subtitle">Select all pay frequencies you need - you can have multiple schedules.</p>
            </div>

            <div class="wizard-content">
                <div class="wizard-checkboxes">
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="weekly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Weekly</h3>
                            <p>52 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="bi-weekly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Bi-weekly</h3>
                            <p>26 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="semi-monthly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Semi-monthly</h3>
                            <p>24 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="monthly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Monthly</h3>
                            <p>12 pay periods per year</p>
                        </div>
                    </div>
                    <div class="wizard-checkbox" onclick="togglePayFrequency(this)" data-value="quarterly">
                        <div class="checkbox-indicator"></div>
                        <div class="option-content">
                            <h3>Quarterly</h3>
                            <p>4 pay periods per year</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="continueFromPayFrequency()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;
}

function togglePayFrequency(element) {
    element.classList.toggle('checked');

    // Enable/disable continue button based on selection
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = checkedBoxes.length === 0;
    continueBtn.style.opacity = checkedBoxes.length === 0 ? '0.5' : '1';
}

function continueFromPayFrequency() {
    // Store selected pay frequencies
    const checkedBoxes = document.querySelectorAll('.wizard-checkbox.checked');
    const selectedFrequencies = Array.from(checkedBoxes).map(box => box.getAttribute('data-value'));

    if (selectedFrequencies.length === 0) {
        alert('Please select at least one pay frequency');
        return;
    }

    newWizardState.userData.payFrequencies = selectedFrequencies;
    newWizardState.currentStep = 5;
    newWizardState.totalSteps = 5;
    showStartDateStep();
}

function showStartDateStep() {
    const wizardContainer = document.getElementById('wizardContainer');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    wizardContainer.innerHTML = `
        <div class="wizard-step">
            <div class="wizard-header">
                <div class="step-indicator">Step 5 of 5</div>
                <h2 class="wizard-title">
                    <img src="attached_assets/bryte logo.svg" alt="Bryte Logo" class="wizard-bryte-logo" />
                    When do you plan to start paying employees using our system?
                </h2>
                <p class="wizard-subtitle">Choose your first payroll date to help us create a setup timeline.</p>
            </div>
            
            <div class="wizard-content">
                <div class="dual-calendar-container">
                    <div class="calendar-navigation">
                        <button class="calendar-nav" onclick="changeMonth(-1)">‹</button>
                        <button class="calendar-nav" onclick="changeMonth(1)">›</button>
                    </div>
                    
                    <div class="dual-calendar-widget">
                        <!-- First Month -->
                        <div class="calendar-month-container">
                            <div class="calendar-header">
                                <h3 class="calendar-month" id="calendarMonth1"></h3>
                            </div>
                            <div class="calendar-grid" id="calendarGrid1">
                                <!-- First month calendar will be generated here -->
                            </div>
                        </div>
                        
                        <!-- Second Month -->
                        <div class="calendar-month-container">
                            <div class="calendar-header">
                                <h3 class="calendar-month" id="calendarMonth2"></h3>
                            </div>
                            <div class="calendar-grid" id="calendarGrid2">
                                <!-- Second month calendar will be generated here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="wizard-actions">
                <button class="wizard-btn wizard-btn-primary" onclick="completeWizardSetup()" disabled style="opacity: 0.5;">
                    Continue
                </button>
            </div>
        </div>
    `;



    // Initialize dual calendar
    initializeDualCalendar(currentMonth, currentYear);
}


function initializeDualCalendar(month, year) {
    currentCalendarMonth = month;
    currentCalendarYear = year;

    // Calculate second month
    let secondMonth = month + 1;
    let secondYear = year;
    if (secondMonth > 11) {
        secondMonth = 0;
        secondYear++;
    }

    // Update month displays
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    document.getElementById('calendarMonth1').textContent = `${monthNames[month]} ${year}`;
    document.getElementById('calendarMonth2').textContent = `${monthNames[secondMonth]} ${secondYear}`;

    // Generate both calendars
    generateCalendarMonth(month, year, 'calendarGrid1');
    generateCalendarMonth(secondMonth, secondYear, 'calendarGrid2');
}

function generateCalendarMonth(month, year, gridId) {
    // Use unified calendar system with wizard-specific configuration
    generateUnifiedCalendar(month, year, gridId, {
        dayClass: 'calendar-day',
        dayHeaderClass: 'calendar-day-header',
        onSelect: function(selectedDate) {
            // Preserve existing wizard calendar behavior
            selectCalendarDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        }
    });
}

function selectCalendarDate(year, month, day) {
    console.log('Date clicked:', year, month, day); // Debug log

    // Remove previous selection from both calendars
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Find and select the clicked day
    const clickedDay = document.querySelector(`[data-year="${year}"][data-month="${month}"][data-day="${day}"]`);
    if (clickedDay) {
        clickedDay.classList.add('selected');
    }

    // Store selected date
    selectedDate = new Date(year, month, day);

    // Enable continue button
    const continueBtn = document.querySelector('.wizard-btn-primary');
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
}

function changeMonth(direction) {
    // Update wizard calendar state
    currentCalendarMonth += direction;

    if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    } else if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    }

    // Use unified calendar system for dual calendar
    initializeDualCalendar(currentCalendarMonth, currentCalendarYear);
}

// ... your existing calendar functions ...

function completeWizardSetup() {
    if (!selectedDate) {
        alert('Please select a start date');
        return;
    }

    // Store the selected start date
    newWizardState.userData.startDate = selectedDate.toISOString().split('T')[0];

    // Skip the full-page timeline and go directly to split-screen
    transitionToSplitScreenWithTimeline();
}

// ADD THE NEW FUNCTION RIGHT HERE:


function transitionToSplitScreenWithTimeline() {
    // Hide wizard container
    const wizardContainer = document.getElementById('wizardContainer');
    const chatPanel = document.getElementById('chatPanel');
    const tablePanel = document.getElementById('tablePanel');
    const chatInput = document.querySelector('.chat-input');
    const panelToggle = document.querySelector('.panel-toggle-edge');

    if (wizardContainer) {
        wizardContainer.remove();
    }

    // Initially hide everything and prepare for animation
    chatPanel.style.display = 'flex';
    chatPanel.classList.remove('intro-mode');
    // showWorkflowSidebar(); // Comment out to hide initially
    // updateWorkflowSidebar(1); // Comment out to hide initially
    chatPanel.style.opacity = '0';
    chatPanel.style.transform = 'translateY(20px)';

    chatInput.style.opacity = '0';
    chatInput.style.transform = 'translateY(20px)';

    tablePanel.style.display = 'flex';
    tablePanel.style.opacity = '0';
    tablePanel.style.transform = 'translateX(100%)';

    panelToggle.style.opacity = '0';

    // FORCE UPDATE THE HEADER TEXT
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');

    if (panelHeader) {
        panelHeader.textContent = 'Implementation Timeline';
    }
    if (panelSubtitle) {
        panelSubtitle.innerHTML = 'Your personalized setup roadmap with key milestones';
    }

    // Load timeline view in right panel (but hidden)
    showTimelineSkeleton();

    // Start improved animation sequence with AI thinking
    startTimelineTransitionWithThinking();
}

function showTimelineSkeleton() {
    const panelContent = document.querySelector('.panel-content');

    if (panelContent) {
        panelContent.innerHTML = `
            <div class="timeline-view-container">
                <div class="timeline-section">
                    <div class="skeleton-header"></div>
                </div>

                <div class="timeline-content">
                    <div class="timeline-section">
                        <div class="timeline-items">
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="timeline-section">
                        <div class="skeleton-header"></div>
                        <div class="timeline-items">
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="skeleton-icon"></div>
                                <div class="timeline-task-content">
                                    <div class="timeline-task-info">
                                        <div class="skeleton-task-line"></div>
                                        <div class="skeleton-due-line"></div>
                                    </div>
                                    <div class="skeleton-progress-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function hideTimelineSkeleton() {
    const panelContent = document.querySelector('.panel-content');
    const selectedDateFormatted = formatDisplayDate(newWizardState.userData.startDate);

    if (panelContent) {
        // Add fade out transition
        panelContent.style.transition = 'opacity 0.3s ease-out';
        panelContent.style.opacity = '0';

        setTimeout(() => {
            // Load real timeline content
            panelContent.innerHTML = `
                <div class="timeline-view-container">
                    <div class="timeline-section">
                        <h3>Company configuration</h3>
                    </div>

                    <div class="timeline-content">
                        <div class="timeline-section">
                            <div class="timeline-items">
                                <div class="timeline-item">
                                    <div class="timeline-icon">🏢</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Add company information</div>
                                            <div class="timeline-due">Due by Friday, Jun 10</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-icon">🏦</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Add bank account</div>
                                            <div class="timeline-due">Due by Friday, Jun 12</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-icon">👥</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Add employee information</div>
                                            <div class="timeline-due">Due by Friday, Jun 12</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="timeline-section">
                            <h3>Payroll setup</h3>
                            <div class="timeline-items">
                                <div class="timeline-item">
                                    <div class="timeline-icon">📋</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Pay schedule setup</div>
                                            <div class="timeline-due">Due by Friday, Jun 15</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-icon">💰</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Earning and deduction setup</div>
                                            <div class="timeline-due">Due by Friday, Jun 30</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-icon">📊</div>
                                    <div class="timeline-task-content">
                                        <div class="timeline-task-info">
                                            <div class="timeline-task">Tax setup</div>
                                            <div class="timeline-due">Due by Friday, Jul 12</div>
                                        </div>
                                        <div class="timeline-progress">
                                            <div class="timeline-progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Fade in real content
            panelContent.style.opacity = '1';
        }, 300);
    }
}
// NEW FUNCTION: Timeline transition with AI thinking indicator

function startTimelineTransitionWithThinking() {
    const chatPanel = document.getElementById('chatPanel');
    const chatInput = document.querySelector('.chat-input');
    const tablePanel = document.getElementById('tablePanel');
    const panelToggle = document.querySelector('.panel-toggle-edge');

    // Step 1: Show chat panel with thinking indicator, input field, AND panel toggle together
    setTimeout(() => {
        // Chat panel with thinking indicator
        chatPanel.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        chatPanel.style.opacity = '1';
        chatPanel.style.transform = 'translateY(0)';
        showAIThinkingIndicator();

        // Input field slides up at the same time
        chatInput.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        chatInput.style.opacity = '1';
        chatInput.style.transform = 'translateY(0)';

        // Panel toggle appears at the same time as input
        panelToggle.style.transition = 'opacity 0.3s ease-in';
        panelToggle.style.opacity = '1';
    }, 200);

    // Step 2: Show right panel with skeleton while AI is thinking (after 1 second)
    setTimeout(() => {
        tablePanel.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        tablePanel.style.opacity = '1';
        tablePanel.style.transform = 'translateX(0)';
        // Skeleton is already loaded in the panel
    }, 1200);

    // Step 3: After thinking delay, show actual message and replace skeleton with real content
    setTimeout(() => {
        // Remove thinking indicator and show real message
        removeThinkingIndicator();
        showTimelineWelcomeMessage();

        // Replace skeleton with real timeline content
        hideTimelineSkeleton();

    }, 5500);
}


// Show AI thinking indicator
function showAIThinkingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message ai-message';
    thinkingDiv.id = 'ai-thinking-indicator';

    thinkingDiv.innerHTML = `
        <div class="message-content">
            <img src="attached_assets/bryte logo.svg" alt="Bryte AI Logo" class="ai-logo" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;"/>
            <div class="thinking-spinner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="thinking-spinner-icon">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                <span class="thinking-text" id="thinking-text">Analyzing your selected launch date...</span>
            </div>
        </div>
    `;

    messagesContainer.appendChild(thinkingDiv);
    startThinkingTextUpdates();
}

function showRightPanelWithSkeleton() {
    const tablePanel = document.getElementById('tablePanel');

    // Show the right panel with skeleton
    tablePanel.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    tablePanel.style.opacity = '1';
    tablePanel.style.transform = 'translateX(0)';
}

function startThinkingTextUpdates() {
    const thinkingSteps = [
        "Analyzing your selected launch date...",
        "Calculating implementation deadlines...",
        "Personalizing based on your profile...",
        "Generating your timeline view..."
    ];

    let currentStep = 0;

    function updateText() {
        const textElement = document.getElementById('thinking-text');
        if (textElement && currentStep < thinkingSteps.length - 1) {
            currentStep++;
            textElement.textContent = thinkingSteps[currentStep];

            // Show skeleton when we reach "Generating your timeline view..."
            if (currentStep === 3) { // Index 3 is "Generating your timeline view..."
                showRightPanelWithSkeleton();
            }

            // Continue with your existing timing logic...
            if (currentStep < thinkingSteps.length - 1) {
                if (currentStep < 4) {
                    window.thinkingTimeout = setTimeout(updateText, 400);
                } else {
                    window.thinkingTimeout = setTimeout(updateText, 800);
                }
            }
        }
    }

    window.thinkingTimeout = setTimeout(updateText, 400);
}

function removeThinkingIndicator() {
    // Clear the text update timeout
    if (window.thinkingTimeout) {
        clearTimeout(window.thinkingTimeout);
        window.thinkingTimeout = null;
    }

    const thinkingIndicator = document.getElementById('ai-thinking-indicator');
    if (thinkingIndicator) {
        thinkingIndicator.remove();
    }
}

function showTimelineWelcomeMessage() {
    const selectedDateFormatted = formatDisplayDate(newWizardState.userData.startDate);

    const welcomeText = `${CONSTANTS.MESSAGES.PERFECT} I've created your personalized setup timeline based on your ${selectedDateFormatted} launch date.

Let's start by uploading some documents. We'll scan these to auto-fill your company details, saving time and reducing errors.`;

    addMessage(welcomeText, 'ai', [
        { action: 'upload-documents', text: 'Upload documents (recommended)' },
        { action: 'modify-timeline', text: 'Modify timeline dates' },
        { action: 'why-upload-documents', text: 'Why do I need to upload documents?' }
    ]);
}
// ... rest of your existing functions continue here ...

function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateTimeUntil(dateString) {
    const targetDate = new Date(dateString);
    const today = new Date();
    const timeDiff = targetDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
        return 'Past date';
    } else if (daysDiff === 0) {
        return 'Today';
    } else if (daysDiff === 1) {
        return '1 day';
    } else if (daysDiff < 7) {
        return `${daysDiff} days`;
    } else if (daysDiff < 30) {
        const weeks = Math.floor(daysDiff / 7);
        const days = daysDiff % 7;
        if (days === 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''}`;
        } else {
            return `${weeks} week${weeks > 1 ? 's' : ''}, ${days} day${days > 1 ? 's' : ''}`;
        }
    } else {
        const months = Math.floor(daysDiff / 30);
        return `About ${months} month${months > 1 ? 's' : ''}`;
    }
}

// Function to categorize pills as interactive or informational


function getPillType(action) {
    // Interactive pills - these advance the workflow or perform actions
    const interactivePrefixes = [
        'accept-', 'approve-', 'continue-', 'start-', 'complete-', 'move-to-', 'edit-',
        'change-', 'set-', 'add-', 'modify-', 'update-', 'update-'
    ];

    const interactiveActions = [
        'looks-good', 'bi-weekly', 'monthly', 'quarterly', 'custom',
        'modify-timeline', 'change-launch-date', 'add-new-schedule',
        'change-name', 'change-first-pay-date', 'change-weekend-rules',
        'change-holiday-rules', 'business-day-before', 'business-day-after',
        'closest-business-day', 'upload-documents', 'why-upload-documents', 'confirm-company-info', 'make-corrections'
    ];
       console.log('=== PILL TYPE ANALYSIS ===', action);
    
    // Check if action starts with interactive prefix
    if (interactivePrefixes.some(prefix => action.startsWith(prefix))) {
        return 'interactive';
    }

    // Check if action is in interactive actions list
    if (interactiveActions.includes(action)) {
        return 'interactive';
    }

    // Default to informational for other actions
    return 'informational';
}

function showDocumentUploadInterface() {
    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');
    if (panelHeader) {
        panelHeader.textContent = 'Document Upload';
    }
    if (panelSubtitle) {
        panelSubtitle.innerHTML = 'Upload documents to accelerate your setup process';
    }

    // Replace panel content with document upload interface
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="document-upload-container">
            <div class="upload-section">
                <h3>📋 Employee Handbook</h3>
                <p class="upload-description">Upload your employee handbook to automatically extract pay policies, overtime rules, and time-off configurations.</p>

                <div class="upload-area" id="handbookUpload" onclick="triggerFileUpload('handbook')">
                    <div class="upload-content">
                        <div class="upload-icon">📄</div>
                        <div class="upload-text">
                            <strong>Drag & drop your handbook here</strong><br>
                            or click to browse files
                        </div>
                        <div class="upload-formats">Supports: PDF, DOC, DOCX</div>
                    </div>
                </div>

                <div class="upload-status" id="handbookStatus" style="display: none;">
                    <div class="status-text">No file selected</div>
                </div>
            </div>

            <div class="upload-section">
                <h3>📊 Payroll History</h3>
                <p class="upload-description"><strong>Recommended:</strong> Upload recent payroll reports to instantly extract earning codes and rate configurations.</p>

                <div class="upload-area" id="payrollUpload" onclick="triggerFileUpload('payroll')">
                    <div class="upload-content">
                        <div class="upload-icon">📊</div>
                        <div class="upload-text">
                            <strong>Drag & drop payroll files here</strong><br>
                            or click to browse files
                        </div>
                        <div class="upload-formats">Supports: PDF, Excel, CSV</div>
                    </div>
                </div>

                <div class="upload-status" id="payrollStatus" style="display: none;">
                    <div class="status-text">No file selected</div>
                </div>
            </div>
            </div>
        </div>

        <!-- Hidden file inputs -->
        <input type="file" id="handbookFileInput" style="display: none;" accept=".pdf,.doc,.docx" onchange="handleFileSelect('handbook', this)">
        <input type="file" id="payrollFileInput" style="display: none;" accept=".pdf,.xlsx,.xls,.csv" onchange="handleFileSelect('payroll', this)">
    `;
}

function triggerFileUpload(type) {
    const fileInput = document.getElementById(type + 'FileInput');
    fileInput.click();
}

function handleFileSelect(type, input) {
    const file = input.files[0];
    if (!file) return;

    const statusDiv = document.getElementById(type + 'Status');
    const uploadArea = document.getElementById(type + 'Upload');

    // Update UI to show file selected
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = `
        <div class="status-text success">
            ✅ <strong>${file.name}</strong> (${formatFileSize(file.size)})
        </div>
    `;

    uploadArea.classList.add('file-selected');


}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkUploadStatus() {
    const handbookInput = document.getElementById('handbookFileInput');
    const payrollInput = document.getElementById('payrollFileInput');
    const processBtn = document.getElementById('processBtn');

    const hasFiles = handbookInput.files.length > 0 || payrollInput.files.length > 0;
    processBtn.disabled = !hasFiles;
}


function simulateDocumentProcessing(hasHandbook, hasPayroll) {
    // Show processing message
    let processingText = `${CONSTANTS.MESSAGES.PERFECT} I\'m analyzing your uploaded documents...\n\n`;

    if (hasHandbook && hasPayroll) {
        processingText += '📋 Processing employee handbook for pay policies\n📊 Extracting earning codes from payroll history\n\nThis will take about 30 seconds.';
    } else if (hasHandbook) {
        processingText += '📋 Processing employee handbook for pay policies\n\nThis will take about 20 seconds.';
    } else if (hasPayroll) {
        processingText += '📊 Extracting earning codes from payroll history\n\nThis will take about 25 seconds.';
    }

    addMessage(processingText, 'ai');

    // Show loading in right panel
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Processing uploaded documents...</div>
            <div class="loading-subtext">Extracting configuration data</div>
        </div>
    `;

    // PHASE 1: After 3 seconds, extract company information
    setTimeout(() => {
        // Extract company info
        extractCompanyInformation(hasHandbook, hasPayroll);

        // Show company info extraction message
        addMessage('✅ Document processing complete!\n🏢 Now extracting company information...', 'ai');

        // Update loading text
        panelContent.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <div class="loading-text">Extracting company information...</div>
                <div class="loading-subtext">Analyzing legal name, address, and EIN</div>
            </div>
        `;

        // PHASE 2: After 2 more seconds, show company info confirmation
        setTimeout(() => {
            showCompanyInfoConfirmation(hasHandbook, hasPayroll);
        }, 2000);

    }, 3000);
}


function skipDocumentUpload() {
    addMessage('Skip & Configure Manually', 'user');

    setTimeout(() => {
        // Transition to existing payroll setup
        loadInitialScheduleCards();
        addMessage('No problem! I\'ll guide you through manual configuration.\n\nI\'ve analyzed your pay registers and extracted information for two different pay schedules. Let\'s verify these schedules first.', 'ai', [
            { action: 'looks-good', text: 'Looks good, continue' },
            { action: 'add-new', text: 'Add new schedule' },
            { action: 'edit-semi-monthly', text: 'Edit Semi-Monthly Payroll' },
            { action: 'edit-weekly', text: 'Edit Weekly Payroll' }
        ]);
    }, 1000);
}

function extractCompanyInformation(hasHandbook, hasPayroll) {
    // Simulate company info extraction based on uploaded documents
    if (hasHandbook && hasPayroll) {
        // Prioritize handbook data if both are available
        extractedCompanyInfo = { ...fakeCompanyData.handbook };
    } else if (hasHandbook) {
        extractedCompanyInfo = { ...fakeCompanyData.handbook };
    } else if (hasPayroll) {
        extractedCompanyInfo = { ...fakeCompanyData.payroll };
    }

    console.log('Extracted company info:', extractedCompanyInfo);
}

function showCompanyInfoConfirmation(hasHandbook, hasPayroll) {
    if (typeof showWorkflowSidebar === 'function') {
        showWorkflowSidebar();
        updateWorkflowSidebar(1);
    }
    
    // Create the main confirmation message
    const confirmationText = `🏢 **Company information extracted successfully!**

I found the following information in your documents:

**Legal Name:** ${extractedCompanyInfo.legalName}
**Address:** ${extractedCompanyInfo.address}
**EIN:** ${extractedCompanyInfo.ein}

Please review this information and confirm it's correct.`;

    // Create the accordion HTML
    const accordionHtml = createCompanyInfoAccordion();

    // Add the message with accordion and pills
    addUnifiedMessage(confirmationText, 'ai', {
        accordion: accordionHtml,
        pills: [
            { action: 'confirm-company-info', text: 'Confirm information' },
            { action: 'make-corrections', text: 'Make corrections' },
            { action: 'add-new-ein', text: 'Add new company' }
        ]
    });

    // Show company info in right panel
    showCompanyInfoPanel();
}

function createCompanyInfoAccordion() {
    return `
        <div class="source-accordion" id="companyInfoAccordion">
            <div class="accordion-header" onclick="toggleCompanyAccordion()">
                <span class="accordion-caret">></span>
                <span class="accordion-text">Source</span>
            </div>
            <div class="accordion-content" id="accordionContent" style="display: none;">
                <div class="document-name">${extractedCompanyInfo.sourceDocument}</div>
            </div>
        </div>
    `;
}

function toggleCompanyAccordion() {
    const content = document.getElementById('accordionContent');
    const caret = document.querySelector('.accordion-caret');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        caret.textContent = '˅';
    } else {
        content.style.display = 'none';
        caret.textContent = '>';
    }
}


function showCompanyInfoPanel() {
    // Update panel header
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');

    if (panelHeader) {
        panelHeader.textContent = 'Company Information';
    }
    if (panelSubtitle) {
        panelSubtitle.innerHTML = 'Review extracted company details';
    }

    // Replace panel content with company information display
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <div class="company-info-display">
            <div class="company-info-section">
               
                <div class="info-display-field">
                    <div class="field-label">Legal Company Name</div>
                    <div class="field-value" id="displayLegalName">${extractedCompanyInfo.legalName}</div>
               
                    <div class="field-label">Company Address</div>
                    <div class="field-value" id="displayAddress">${extractedCompanyInfo.address}</div>
                
                    <div class="field-label">Employer Identification Number (EIN)</div>
                    <div class="field-value" id="displayEIN">${extractedCompanyInfo.ein}</div>
               
           
        </div>
    `;
}

function updateCompanyInfoStatus(status) {


    // Always update confirmation status in data
    if (status === 'confirmed') {
        extractedCompanyInfo.isConfirmed = true;

    }
}

function updateDisplayField(fieldName, newValue) {
    const displayElement = document.getElementById(`display${fieldName}`);
    if (displayElement) {
        displayElement.textContent = newValue;

        // Update the data object
        switch (fieldName) {
            case 'LegalName':
                extractedCompanyInfo.legalName = newValue;
                break;
            case 'Address':
                extractedCompanyInfo.address = newValue;
                break;
            case 'EIN':
                extractedCompanyInfo.ein = newValue;
                break;
        }
    }
}

function updateScheduleField(scheduleType, fieldType, newValue) {
    const scheduleCards = document.querySelectorAll('.schedule-card');

    scheduleCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();

        // Match the schedule type
        if ((scheduleType === 'semi-monthly' && cardTitle.includes('semi-monthly')) ||
            (scheduleType === 'weekly' && cardTitle.includes('weekly'))) {

            const scheduleDetails = card.querySelectorAll('.schedule-detail');

            scheduleDetails.forEach(detail => {
                const label = detail.querySelector('.detail-label').textContent.toLowerCase();

                // Update the appropriate field
                if (fieldType === 'name' && label.includes('name')) {
                    detail.querySelector('.detail-value').textContent = newValue;
                } else if (fieldType === 'first-pay-date' && label.includes('first pay date')) {
                    detail.querySelector('.detail-value').textContent = newValue;
                }
            });
        }
    });
}

// ADD THIS FUNCTION TO YOUR CODE (put it near your other UI helper functions)

function updatePanelContent(type, options = {}) {
    const panelContent = document.querySelector('.panel-content');
    if (!panelContent) return;

    switch (type) {
        case 'loading':
            panelContent.innerHTML = `
                <div class="loading-container">
                    <div class="spinner"></div>
                    <div class="loading-text">${options.loadingText || 'Loading...'}</div>
                    <div class="loading-subtext">${options.subText || 'Please wait...'}</div>
                </div>
            `;
            break;

        case 'biweekly-placeholder':
            // Update the step progress
            const stepProgress = document.querySelector('.step-progress');
            if (stepProgress) {
                stepProgress.innerHTML = '📅 Bi-Weekly Schedule Added: Configuring Details';
            }

            // Find the schedule cards container or create it if it doesn't exist
            let scheduleCardsContainer = document.querySelector('.schedule-cards');
            if (!scheduleCardsContainer) {
                scheduleCardsContainer = document.createElement('div');
                scheduleCardsContainer.className = 'schedule-cards';
                panelContent.appendChild(scheduleCardsContainer);
            }

            // Create the new bi-weekly card with placeholder values
            const biWeeklyCard = document.createElement('div');
            biWeeklyCard.className = 'schedule-card';
            biWeeklyCard.id = 'biweekly-card';
            biWeeklyCard.innerHTML = `
                <div class="card-header">
                    <div class="card-title">Bi-Weekly</div>
                </div>
                <div class="card-body">
                    <div class="schedule-detail">
                        <div class="detail-label">Name</div>
                        <div class="detail-value missing-field" id="biweekly-name">
                            Pending...
                        </div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">First pay date</div>
                        <div class="detail-value missing-field" id="biweekly-first-date">
                            Pending...
                        </div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">Frequency</div>
                        <div class="detail-value">26 pay periods/year</div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">Payroll Date</div>
                        <div class="detail-value">Every other Friday</div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">Hours per Pay Period</div>
                        <div class="detail-value">80 hours</div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">Weekend pay date</div>
                        <div class="detail-value">Friday before the date</div>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-label">Holiday pay date</div>
                        <div class="detail-value">Business before the date</div>
                    </div>
                </div>
            `;

            // Add the new card to the container
            scheduleCardsContainer.appendChild(biWeeklyCard);
            break;

        default:
            console.warn(`Unknown panel content type: ${type}`);
            break;
    }
}

// ===========================================
// WORKFLOW SIDEBAR MANAGEMENT
// ===========================================



// Function to update workflow sidebar
function updateWorkflowSidebar(step) {
    const config = workflowConfig[step];
    if (!config) return;

    console.log(`Updating workflow sidebar for step ${step}`);

    // Show earning code section when we reach step 3
    const earningCodeSection = document.getElementById('earningCodeSection');
    if (step >= 3 && earningCodeSection) {
        earningCodeSection.style.display = 'block';
    }

    // Reset all step states
    document.querySelectorAll('.workflow-step').forEach(el => {
        el.classList.remove('active', 'completed');
    });

    document.querySelectorAll('.workflow-substep').forEach(el => {
        el.classList.remove('active', 'completed');
    });

    // Mark completed steps
    for (let i = 1; i < step; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (stepEl) {
            stepEl.classList.add('completed');

            // Mark all substeps as completed for completed main steps
            const substeps = stepEl.querySelectorAll('.workflow-substep');
            substeps.forEach(substep => {
                substep.classList.add('completed');
            });
        }
    }

    // Mark current step as active
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');

        // Handle substeps for current step
        const substeps = currentStepEl.querySelectorAll('.workflow-substep');
        if (substeps.length > 0 && config.substep) {
            // Mark substeps up to current substep as completed
            for (let i = 0; i < config.substep - 1; i++) {
                if (substeps[i]) {
                    substeps[i].classList.add('completed');
                }
            }
            // Mark current substep as active
            if (substeps[config.substep - 1]) {
                substeps[config.substep - 1].classList.add('active');
            }
        }
    }
}

// Function to navigate to a workflow step
function navigateToWorkflowStep(targetStep) {
    // Only allow navigation to current or completed steps
    if (targetStep <= currentStep) {
        console.log(`Navigating to step ${targetStep}`);

        // Integrate with your existing step navigation logic
        switch(targetStep) {
            case 1:
                loadInitialScheduleCards();
                break;
            case 2:
                if (currentStep >= 2) {
                    showCalendarSimulation();
                }
                break;
            case 3:
                if (currentStep >= 3) {
                    showEarningCodesReview();
                }
                break;
            case 4:
                if (currentStep >= 4) {
                    showRateConfiguration();
                }
                break;
            case 5:
                if (currentStep >= 5) {
                    showW2Simulation();
                }
                break;
        }
    } else {
        console.log(`Step ${targetStep} is not yet available`);
    }
}

// Function to advance to next step
function advanceWorkflowStep(step, substep = null) {
    const config = workflowConfig[step];
    if (!config) return;

    // Update current step
    currentStep = step;

    // Update the configuration if substep is provided
    if (substep !== null) {
        workflowConfig[step].substep = substep;
    }

    // Update the sidebar
    updateWorkflowSidebar(step);
}

// Function to complete a substep
function completeSubstep(step, substep) {
    const config = workflowConfig[step];
    if (!config) return;

    // Mark the substep as completed
    const substepEl = document.getElementById(`substep-${step}-${substep}`);
    if (substepEl) {
        substepEl.classList.remove('active');
        substepEl.classList.add('completed');
    }

    // Check if there are more substeps
    const stepEl = document.getElementById(`step-${step}`);
    const totalSubsteps = stepEl ? stepEl.querySelectorAll('.workflow-substep').length : 0;

    if (substep < totalSubsteps) {
        // Move to next substep
        advanceWorkflowStep(step, substep + 1);
    } else {
        // All substeps completed
        console.log(`All substeps completed for step ${step}`);
    }
}

// Initialize workflow sidebar
// Show the workflow sidebar
function showWorkflowSidebar() {
    const workflowSidebar = document.getElementById('workflowSidebar');
    if (workflowSidebar) {
        workflowSidebar.style.display = 'flex';
        workflowSidebar.classList.add('show');
        console.log('Workflow sidebar shown');
    }
}

// Hide the workflow sidebar
function hideWorkflowSidebar() {
    const workflowSidebar = document.getElementById('workflowSidebar');
    if (workflowSidebar) {
        workflowSidebar.style.display = 'none';
        workflowSidebar.classList.remove('show');
        console.log('Workflow sidebar hidden');
    }
}

// Update workflow sidebar based on current step
function updateWorkflowSidebar(step) {
    console.log(`Updating workflow sidebar for step ${step}`);

    // Ensure step is a number
    step = parseInt(step) || 1;

    // Show earning code section when we reach step 3
    if (step >= 3) {
        showEarningCodeSection();
    }

    // Reset all step states
    resetAllStepStates();

    // Mark completed steps
    markCompletedSteps(step);

    // Mark current step as active
    markCurrentStepActive(step);

    // Update step clickability
    updateStepClickability(step);
}

// Show earning code section with animation
function showEarningCodeSection() {
    const earningCodeSection = document.getElementById('earningCodeSection');
    if (earningCodeSection && earningCodeSection.style.display === 'none') {
        earningCodeSection.style.display = 'block';
        earningCodeSection.classList.add('fade-in');
        console.log('Earning code section revealed');

        // Remove animation class after animation completes
        setTimeout(() => {
            earningCodeSection.classList.remove('fade-in');
        }, 400);
    }
}

// Reset all step states
function resetAllStepStates() {
    document.querySelectorAll('.workflow-step').forEach(step => {
        step.classList.remove('active', 'completed', 'clickable', 'disabled');
    });
}

// Mark completed steps
function markCompletedSteps(currentStep) {
    for (let i = 1; i < currentStep; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (stepElement) {
            stepElement.classList.add('completed', 'clickable');
        }
    }
}

// Mark current step as active
function markCurrentStepActive(currentStep) {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
}

// Update step clickability
function updateStepClickability(currentStep) {
    for (let i = 1; i <= 5; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (stepElement) {
            if (i < currentStep) {
                // Completed steps are clickable
                stepElement.classList.add('clickable');
                stepElement.onclick = () => navigateToWorkflowStep(i);
            } else if (i === currentStep) {
                // Current step is not clickable
                stepElement.onclick = null;
            } else {
                // Future steps are disabled
                stepElement.classList.add();
                stepElement.onclick = null;
            }
        }
    }
}

// Navigate to a specific workflow step
function navigateToWorkflowStep(targetStep) {
    console.log(`Attempting to navigate to step ${targetStep}`);

    // Only allow navigation to completed steps
    if (targetStep >= currentStep) {
        console.log(`Step ${targetStep} is not yet available`);
        return;
    }

    console.log(`Navigating to step ${targetStep}`);

    // Navigate based on step
    switch(targetStep) {
        case 1:
            loadInitialScheduleCards();
            updatePanelHeaderForStep(1);
            break;
        case 2:
            showCalendarSimulation();
            updatePanelHeaderForStep(2);
            break;
        case 3:
            showEarningCodesReview();
            updatePanelHeaderForStep(3);
            break;
        case 4:
            showRateConfiguration();
            updatePanelHeaderForStep(4);
            break;
        case 5:
            showW2Simulation();
            updatePanelHeaderForStep(5);
            break;
        default:
            console.warn(`Unknown step: ${targetStep}`);
    }

    // Update sidebar to reflect navigation
    updateWorkflowSidebar(targetStep);
}

// Update panel header for specific step
function updatePanelHeaderForStep(step) {
    const panelHeader = document.querySelector('.panel-header h2');
    const panelSubtitle = document.querySelector('.panel-subtitle');

    if (!panelHeader) return;

    switch(step) {
        case 1:
            panelHeader.textContent = 'Review Extracted Pay Schedules';
            if (panelSubtitle) {
                panelSubtitle.innerHTML = 'Step 1 of 6: Review each pay schedule and approve them';
            }
            break;
        case 2:
            panelHeader.textContent = 'Payroll Calendar Simulation';
            if (panelSubtitle) {
                panelSubtitle.innerHTML = 'Step 2 of 6: Review payroll calendar simulation';
            }
            break;
        case 3:
            panelHeader.textContent = 'Review All Earning Codes';
            if (panelSubtitle) {
                panelSubtitle.innerHTML = 'Step 3 of 6: Earning Codes Review';
            }
            break;
        case 4:
            panelHeader.textContent = 'Configure Pay Rates';
            if (panelSubtitle) {
                panelSubtitle.innerHTML = 'Step 5 of 6: Rate Configuration';
            }
            break;
        case 5:
            panelHeader.textContent = 'W-2 Tax Form Simulation';
            if (panelSubtitle) {
                panelSubtitle.innerHTML = 'Step 6 of 6: W-2 Tax Form Preview';
            }
            break;
    }
}




// Hook into existing step progression
function advanceToStep(newStep) {
    console.log(`Advancing to step ${newStep}`);
    currentStep = newStep;
    
}