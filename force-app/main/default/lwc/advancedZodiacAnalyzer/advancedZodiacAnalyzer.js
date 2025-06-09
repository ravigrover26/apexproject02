import { LightningElement, track } from 'lwc';

/**
 * Advanced Zodiac Analyzer Component
 * Provides comprehensive zodiac analysis including Western zodiac, Chinese zodiac,
 * numerology, compatibility, and personalized insights
 */
export default class AdvancedZodiacAnalyzer extends LightningElement {
    @track name = '';
    @track dateOfBirth = '';
    @track showResults = false;
    @track analysisResult = {};
    @track errorMessage = '';
    @track isLoading = false;

    /**
     * Enhanced zodiac signs data with comprehensive information
     */
    zodiacSigns = [
        {
            sign: 'Aries',
            symbol: '♈',
            element: 'Fire',
            rulingPlanet: 'Mars',
            startMonth: 3,
            startDay: 21,
            endMonth: 4,
            endDay: 19,
            dateRange: 'March 21 - April 19',
            luckyNumbers: [1, 8, 17, 26],
            luckyColors: ['Red', 'Orange', 'Scarlet'],
            compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
            traits: 'You are a natural-born leader with boundless energy and enthusiasm. Aries are known for their courage, determination, and pioneering spirit.',
            careerSuggestions: ['Entrepreneur', 'Military Leader', 'Emergency Responder', 'Sales Executive', 'Athlete'],
            famousPeople: ['Leonardo da Vinci', 'Maya Angelou', 'Robert Downey Jr.', 'Lady Gaga']
        },
        {
            sign: 'Taurus',
            symbol: '♉',
            element: 'Earth',
            rulingPlanet: 'Venus',
            startMonth: 4,
            startDay: 20,
            endMonth: 5,
            endDay: 20,
            dateRange: 'April 20 - May 20',
            luckyNumbers: [2, 6, 9, 12, 24],
            luckyColors: ['Green', 'Pink', 'Earth Tones'],
            compatibleSigns: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
            traits: 'You are reliable, practical, and have a strong appreciation for the finer things in life. Your stability and determination are your greatest strengths.',
            careerSuggestions: ['Banking', 'Agriculture', 'Culinary Arts', 'Real Estate', 'Luxury Goods'],
            famousPeople: ['William Shakespeare', 'Queen Elizabeth II', 'Adele', 'Dwayne Johnson']
        },
        {
            sign: 'Gemini',
            symbol: '♊',
            element: 'Air',
            rulingPlanet: 'Mercury',
            startMonth: 5,
            startDay: 21,
            endMonth: 6,
            endDay: 20,
            dateRange: 'May 21 - June 20',
            luckyNumbers: [5, 7, 14, 23],
            luckyColors: ['Yellow', 'Silver', 'Green'],
            compatibleSigns: ['Libra', 'Aquarius', 'Aries', 'Leo'],
            traits: 'You are curious, adaptable, and excellent at communication. Your quick wit and versatility make you a natural problem solver.',
            careerSuggestions: ['Journalism', 'Teaching', 'Sales', 'Translation', 'Social Media'],
            famousPeople: ['Marilyn Monroe', 'John F. Kennedy', 'Angelina Jolie', 'Kanye West']
        },
        {
            sign: 'Cancer',
            symbol: '♋',
            element: 'Water',
            rulingPlanet: 'Moon',
            startMonth: 6,
            startDay: 21,
            endMonth: 7,
            endDay: 22,
            dateRange: 'June 21 - July 22',
            luckyNumbers: [2, 7, 11, 16, 20, 25],
            luckyColors: ['Silver', 'Sea Green', 'White'],
            compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
            traits: 'You are nurturing, intuitive, and deeply emotional. Your strong connection to family and home defines your caring nature.',
            careerSuggestions: ['Healthcare', 'Childcare', 'Hospitality', 'Psychology', 'Social Work'],
            famousPeople: ['Princess Diana', 'Tom Hanks', 'Frida Kahlo', 'Nelson Mandela']
        },
        {
            sign: 'Leo',
            symbol: '♌',
            element: 'Fire',
            rulingPlanet: 'Sun',
            startMonth: 7,
            startDay: 23,
            endMonth: 8,
            endDay: 22,
            dateRange: 'July 23 - August 22',
            luckyNumbers: [1, 3, 10, 19],
            luckyColors: ['Gold', 'Orange', 'Red'],
            compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
            traits: 'You are confident, generous, and love being in the spotlight. Your magnetic personality and leadership qualities inspire others.',
            careerSuggestions: ['Entertainment', 'Leadership Roles', 'Fashion', 'Public Relations', 'Politics'],
            famousPeople: ['Barack Obama', 'Madonna', 'Jennifer Lopez', 'Andy Warhol']
        },
        {
            sign: 'Virgo',
            symbol: '♍',
            element: 'Earth',
            rulingPlanet: 'Mercury',
            startMonth: 8,
            startDay: 23,
            endMonth: 9,
            endDay: 22,
            dateRange: 'August 23 - September 22',
            luckyNumbers: [3, 27, 35, 51],
            luckyColors: ['Navy Blue', 'Grey', 'Beige'],
            compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
            traits: 'You are analytical, practical, and have a keen eye for detail. Your perfectionism and desire to help others make you invaluable.',
            careerSuggestions: ['Healthcare', 'Accounting', 'Research', 'Quality Control', 'Administration'],
            famousPeople: ['Mother Teresa', 'Warren Buffett', 'Beyoncé', 'Stephen King']
        },
        {
            sign: 'Libra',
            symbol: '♎',
            element: 'Air',
            rulingPlanet: 'Venus',
            startMonth: 9,
            startDay: 23,
            endMonth: 10,
            endDay: 22,
            dateRange: 'September 23 - October 22',
            luckyNumbers: [4, 6, 13, 15, 24],
            luckyColors: ['Blue', 'Green', 'Pink'],
            compatibleSigns: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
            traits: 'You are diplomatic, charming, and have a strong sense of justice. Your love of harmony and beauty defines your approach to life.',
            careerSuggestions: ['Law', 'Diplomacy', 'Fashion', 'Art', 'Counseling'],
            famousPeople: ['Mahatma Gandhi', 'John Lennon', 'Kim Kardashian', 'Will Smith']
        },
        {
            sign: 'Scorpio',
            symbol: '♏',
            element: 'Water',
            rulingPlanet: 'Pluto',
            startMonth: 10,
            startDay: 23,
            endMonth: 11,
            endDay: 21,
            dateRange: 'October 23 - November 21',
            luckyNumbers: [8, 11, 18, 22],
            luckyColors: ['Deep Red', 'Black', 'Maroon'],
            compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
            traits: 'You are intense, passionate, and incredibly perceptive. Your depth and ability to see beneath the surface set you apart.',
            careerSuggestions: ['Investigation', 'Psychology', 'Surgery', 'Research', 'Occult Studies'],
            famousPeople: ['Pablo Picasso', 'Hillary Clinton', 'Leonardo DiCaprio', 'Marie Curie']
        },
        {
            sign: 'Sagittarius',
            symbol: '♐',
            element: 'Fire',
            rulingPlanet: 'Jupiter',
            startMonth: 11,
            startDay: 22,
            endMonth: 12,
            endDay: 21,
            dateRange: 'November 22 - December 21',
            luckyNumbers: [3, 9, 15, 21, 27],
            luckyColors: ['Purple', 'Turquoise', 'Orange'],
            compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
            traits: 'You are adventurous, optimistic, and love exploring new horizons. Your philosophical nature and love of freedom inspire others.',
            careerSuggestions: ['Travel Industry', 'Education', 'Philosophy', 'Publishing', 'Sports'],
            famousPeople: ['Walt Disney', 'Winston Churchill', 'Taylor Swift', 'Brad Pitt']
        },
        {
            sign: 'Capricorn',
            symbol: '♑',
            element: 'Earth',
            rulingPlanet: 'Saturn',
            startMonth: 12,
            startDay: 22,
            endMonth: 1,
            endDay: 19,
            dateRange: 'December 22 - January 19',
            luckyNumbers: [6, 9, 15, 18, 24],
            luckyColors: ['Brown', 'Black', 'Dark Green'],
            compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
            traits: 'You are ambitious, disciplined, and have a strong work ethic. Your practical approach to achieving goals sets you up for success.',
            careerSuggestions: ['Management', 'Government', 'Architecture', 'Engineering', 'Finance'],
            famousPeople: ['Martin Luther King Jr.', 'Stephen Hawking', 'Michelle Obama', 'Denzel Washington']
        },
        {
            sign: 'Aquarius',
            symbol: '♒',
            element: 'Air',
            rulingPlanet: 'Uranus',
            startMonth: 1,
            startDay: 20,
            endMonth: 2,
            endDay: 18,
            dateRange: 'January 20 - February 18',
            luckyNumbers: [4, 7, 11, 22, 29],
            luckyColors: ['Blue', 'Silver', 'Aqua'],
            compatibleSigns: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
            traits: 'You are independent, innovative, and humanitarian. Your unique perspective and desire to make the world better set you apart.',
            careerSuggestions: ['Technology', 'Social Activism', 'Science', 'Aviation', 'Humanitarian Work'],
            famousPeople: ['Abraham Lincoln', 'Oprah Winfrey', 'Bob Marley', 'Franklin D. Roosevelt']
        },
        {
            sign: 'Pisces',
            symbol: '♓',
            element: 'Water',
            rulingPlanet: 'Neptune',
            startMonth: 2,
            startDay: 19,
            endMonth: 3,
            endDay: 20,
            dateRange: 'February 19 - March 20',
            luckyNumbers: [3, 9, 12, 15, 18, 24],
            luckyColors: ['Sea Green', 'Lavender', 'Silver'],
            compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
            traits: 'You are compassionate, artistic, and deeply intuitive. Your empathy and creative abilities make you a natural healer and artist.',
            careerSuggestions: ['Arts', 'Music', 'Healing Professions', 'Spirituality', 'Marine Biology'],
            famousPeople: ['Albert Einstein', 'Steve Jobs', 'Rihanna', 'George Washington']
        }
    ];

    /**
     * Chinese zodiac animals with years and characteristics
     */
    chineseZodiac = [
        { animal: 'Rat', years: [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020], traits: 'Clever, resourceful, versatile, kind' },
        { animal: 'Ox', years: [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021], traits: 'Loyal, reliable, thorough, strong' },
        { animal: 'Tiger', years: [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022], traits: 'Enthusiastic, courageous, ambitious, leadership' },
        { animal: 'Rabbit', years: [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023], traits: 'Trustworthy, empathic, modest, diplomatic' },
        { animal: 'Dragon', years: [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024], traits: 'Lucky, flexible, eccentric, imaginative' },
        { animal: 'Snake', years: [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025], traits: 'Philosophical, organized, intelligent, intuitive' },
        { animal: 'Horse', years: [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026], traits: 'Adaptable, loyal, courageous, ambitious' },
        { animal: 'Goat', years: [1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027], traits: 'Tasteful, crafty, warm, elegant' },
        { animal: 'Monkey', years: [1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028], traits: 'Quick-witted, charming, lucky, adaptable' },
        { animal: 'Rooster', years: [1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029], traits: 'Honest, energetic, intelligent, flamboyant' },
        { animal: 'Dog', years: [1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030], traits: 'Loyal, sociable, courageous, diligent' },
        { animal: 'Pig', years: [1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031], traits: 'Honorable, philanthropic, determined, optimistic' }
    ];

    /**
     * Check if button should be disabled
     */
    get isButtonDisabled() {
        return !this.name || !this.dateOfBirth || this.isLoading;
    }

    /**
     * Handle name input change
     */
    handleNameChange(event) {
        this.name = event.target.value;
        this.resetResults();
    }

    /**
     * Handle date of birth input change
     */
    handleDateChange(event) {
        this.dateOfBirth = event.target.value;
        this.resetResults();
    }

    /**
     * Handle analyze button click - performs comprehensive zodiac analysis
     */
    async handleAnalyze() {
        this.resetResults();
        this.isLoading = true;

        if (!this.name || !this.dateOfBirth) {
            this.errorMessage = 'Please fill in both name and date of birth.';
            this.isLoading = false;
            return;
        }

        try {
            // Simulate loading time for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            const analysis = this.performComprehensiveAnalysis(this.name, this.dateOfBirth);
            if (analysis) {
                this.analysisResult = analysis;
                this.showResults = true;
            } else {
                this.errorMessage = 'Unable to perform analysis. Please check your inputs.';
            }
        } catch (error) {
            this.errorMessage = 'An error occurred during analysis. Please try again.';
            console.error('Analysis error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Perform comprehensive zodiac and numerology analysis
     */
    performComprehensiveAnalysis(name, dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const zodiacSign = this.calculateZodiacSign(birthDate);
        const chineseSign = this.calculateChineseZodiac(birthDate.getFullYear());
        const lifePathNumber = this.calculateLifePathNumber(birthDate);
        const nameNumber = this.calculateNameNumber(name);

        if (!zodiacSign || !chineseSign) {
            return null;
        }

        return {
            name: name,
            birthDate: dateOfBirth,
            westernZodiac: zodiacSign,
            chineseZodiac: chineseSign,
            numerology: {
                lifePathNumber: lifePathNumber,
                nameNumber: nameNumber
            },
            compatibility: this.generateCompatibilityInsights(zodiacSign),
            personalizedMessage: this.generatePersonalizedMessage(name, zodiacSign, chineseSign, lifePathNumber)
        };
    }

    /**
     * Calculate Western zodiac sign based on date of birth
     */
    calculateZodiacSign(birthDate) {
        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();

        for (let zodiac of this.zodiacSigns) {
            if (this.isDateInRange(month, day, zodiac)) {
                return zodiac;
            }
        }
        return null;
    }

    /**
     * Check if date falls within zodiac sign range
     */
    isDateInRange(month, day, zodiac) {
        if (zodiac.startMonth > zodiac.endMonth) {
            return (
                (month === zodiac.startMonth && day >= zodiac.startDay) ||
                (month === zodiac.endMonth && day <= zodiac.endDay)
            );
        }
        if (zodiac.startMonth === zodiac.endMonth) {
            return (
                month === zodiac.startMonth &&
                day >= zodiac.startDay &&
                day <= zodiac.endDay
            );
        }
        return (
            (month === zodiac.startMonth && day >= zodiac.startDay) ||
            (month === zodiac.endMonth && day <= zodiac.endDay) ||
            (month > zodiac.startMonth && month < zodiac.endMonth)
        );
    }

    /**
     * Calculate Chinese zodiac sign based on birth year
     */
    calculateChineseZodiac(year) {
        for (let sign of this.chineseZodiac) {
            if (sign.years.includes(year)) {
                return sign;
            }
        }
        // Calculate for years not in the predefined array
        const baseYear = 1936; // Rat year
        const cyclePosition = (year - baseYear) % 12;
        return this.chineseZodiac[cyclePosition];
    }

    /**
     * Calculate life path number from birth date
     */
    calculateLifePathNumber(birthDate) {
        const dateString = birthDate.getFullYear().toString() + 
                          (birthDate.getMonth() + 1).toString().padStart(2, '0') + 
                          birthDate.getDate().toString().padStart(2, '0');
        
        let sum = dateString.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        }
        
        return sum;
    }

    /**
     * Calculate name number using numerology
     */
    calculateNameNumber(name) {
        const letterValues = {
            A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
            J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
            S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
        };

        let sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('')
                     .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);

        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        }

        return sum;
    }

    /**
     * Generate compatibility insights
     */
    generateCompatibilityInsights(zodiacSign) {
        return {
            mostCompatible: zodiacSign.compatibleSigns[0],
            compatibleSigns: zodiacSign.compatibleSigns,
            elementCompatibility: this.getElementCompatibility(zodiacSign.element)
        };
    }

    /**
     * Get compatible elements
     */
    getElementCompatibility(element) {
        const compatibility = {
            Fire: ['Air', 'Fire'],
            Earth: ['Water', 'Earth'],
            Air: ['Fire', 'Air'],
            Water: ['Earth', 'Water']
        };
        return compatibility[element] || [];
    }

    /**
     * Generate personalized message combining all analysis
     */
    generatePersonalizedMessage(name, westernSign, chineseSign, lifePathNumber) {
        const lifePathMeanings = {
            1: 'a natural leader with strong independence',
            2: 'a cooperative and diplomatic person',
            3: 'a creative and expressive individual',
            4: 'a practical and hardworking person',
            5: 'an adventurous and freedom-loving spirit',
            6: 'a nurturing and responsible caretaker',
            7: 'a spiritual and analytical thinker',
            8: 'an ambitious and material-focused achiever',
            9: 'a humanitarian with a global perspective',
            11: 'an intuitive and inspirational master number',
            22: 'a master builder with practical idealism',
            33: 'a master teacher with spiritual wisdom'
        };

        return `Hello ${name}! Your cosmic profile reveals a fascinating combination. As a ${westernSign.sign}, you embody the ${westernSign.element} element's energy, while your Chinese zodiac sign ${chineseSign.animal} adds ${chineseSign.traits.toLowerCase()} to your personality. Your Life Path Number ${lifePathNumber} indicates you are ${lifePathMeanings[lifePathNumber]}. This unique blend suggests you have the potential to excel in ${westernSign.careerSuggestions[0].toLowerCase()} while maintaining the ${chineseSign.animal.toLowerCase()}'s natural wisdom.`;
    }

    /**
     * Reset all results and error messages
     */
    resetResults() {
        this.showResults = false;
        this.errorMessage = '';
        this.analysisResult = {};
    }
}