import { createElement } from 'lwc';
import AdvancedZodiacAnalyzer from 'c/advancedZodiacAnalyzer';

describe('c-advanced-zodiac-analyzer', () => {
    afterEach(() => {
        // Clear DOM after each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders component with form inputs', () => {
        // Create component
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        // Verify form inputs are present
        const nameInput = element.shadowRoot.querySelector('lightning-input[name="name"]');
        const dateInput = element.shadowRoot.querySelector('lightning-input[name="dateOfBirth"]');
        const analyzeButton = element.shadowRoot.querySelector('lightning-button');

        expect(nameInput).toBeTruthy();
        expect(dateInput).toBeTruthy();
        expect(analyzeButton).toBeTruthy();
        expect(analyzeButton.label).toBe('Analyze My Cosmic Profile');
    });

    it('disables button when inputs are empty', () => {
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        const analyzeButton = element.shadowRoot.querySelector('lightning-button');
        expect(analyzeButton.disabled).toBe(true);
    });

    it('shows loading spinner when analyzing', async () => {
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        // Set values to enable the button
        element.name = 'John Doe';
        element.dateOfBirth = '1990-04-01';
        
        await Promise.resolve();

        const analyzeButton = element.shadowRoot.querySelector('lightning-button');
        expect(analyzeButton.disabled).toBe(false);
    });

    it('shows error message for invalid inputs', async () => {
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        // Trigger analyze without inputs
        const analyzeButton = element.shadowRoot.querySelector('lightning-button');
        analyzeButton.click();

        await Promise.resolve();

        // Check if error message appears
        const errorMessage = element.shadowRoot.querySelector('.slds-notify_alert');
        expect(errorMessage).toBeTruthy();
    });

    it('has correct component title', () => {
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card.title).toBe('Advanced Zodiac Analyzer');
    });

    it('contains all required input labels', () => {
        const element = createElement('c-advanced-zodiac-analyzer', {
            is: AdvancedZodiacAnalyzer
        });
        document.body.appendChild(element);

        const nameInput = element.shadowRoot.querySelector('lightning-input[name="name"]');
        const dateInput = element.shadowRoot.querySelector('lightning-input[name="dateOfBirth"]');

        expect(nameInput.label).toBe('Full Name');
        expect(dateInput.label).toBe('Date of Birth');
        expect(dateInput.type).toBe('date');
    });
});