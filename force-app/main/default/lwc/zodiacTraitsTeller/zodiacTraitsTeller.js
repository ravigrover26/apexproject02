import { LightningElement, track } from "lwc";

export default class ZodiacTraitsTeller extends LightningElement {
  @track name = "";
  @track dateOfBirth = "";
  @track showResults = false;
  @track zodiacResult = {};
  @track errorMessage = "";

  /**
   * Zodiac signs data with date ranges, symbols, and traits
   */
  zodiacSigns = [
    {
      sign: "Aries",
      symbol: "♈",
      startMonth: 3,
      startDay: 21,
      endMonth: 4,
      endDay: 19,
      dateRange: "March 21 - April 19",
      traits:
        "You are a natural-born leader with boundless energy and enthusiasm. Aries are known for their courage, determination, and pioneering spirit. You love taking on new challenges and are always ready for adventure. Your confidence and optimism inspire others, though you may sometimes act impulsively.",
    },
    {
      sign: "Taurus",
      symbol: "♉",
      startMonth: 4,
      startDay: 20,
      endMonth: 5,
      endDay: 20,
      dateRange: "April 20 - May 20",
      traits:
        "You are reliable, practical, and have a strong appreciation for the finer things in life. Taurus individuals are known for their stability, patience, and determination. You value security and comfort, and once you set your mind to something, you see it through. Your loyalty and dependability make you a treasured friend.",
    },
    {
      sign: "Gemini",
      symbol: "♊",
      startMonth: 5,
      startDay: 21,
      endMonth: 6,
      endDay: 20,
      dateRange: "May 21 - June 20",
      traits:
        "You are curious, adaptable, and excellent at communication. Geminis are known for their quick wit, versatility, and love of learning. You can easily adapt to new situations and enjoy meeting new people. Your dual nature allows you to see multiple perspectives, making you an excellent mediator and conversationalist.",
    },
    {
      sign: "Cancer",
      symbol: "♋",
      startMonth: 6,
      startDay: 21,
      endMonth: 7,
      endDay: 22,
      dateRange: "June 21 - July 22",
      traits:
        "You are nurturing, intuitive, and deeply emotional. Cancers are known for their strong connection to family and home. You have excellent instincts and can sense others' emotions easily. Your caring nature and protective instincts make you a wonderful friend and partner. You value tradition and create lasting memories.",
    },
    {
      sign: "Leo",
      symbol: "♌",
      startMonth: 7,
      startDay: 23,
      endMonth: 8,
      endDay: 22,
      dateRange: "July 23 - August 22",
      traits:
        "You are confident, generous, and love being in the spotlight. Leos are natural performers with warm hearts and magnetic personalities. You have strong leadership qualities and inspire others with your enthusiasm. Your creativity and flair for drama make you unforgettable, and your loyalty to loved ones is unwavering.",
    },
    {
      sign: "Virgo",
      symbol: "♍",
      startMonth: 8,
      startDay: 23,
      endMonth: 9,
      endDay: 22,
      dateRange: "August 23 - September 22",
      traits:
        "You are analytical, practical, and have a keen eye for detail. Virgos are known for their perfectionism and desire to help others. You approach life methodically and have excellent problem-solving skills. Your reliability and attention to detail make you invaluable in any team, and your humble nature endears you to others.",
    },
    {
      sign: "Libra",
      symbol: "♎",
      startMonth: 9,
      startDay: 23,
      endMonth: 10,
      endDay: 22,
      dateRange: "September 23 - October 22",
      traits:
        "You are diplomatic, charming, and have a strong sense of justice. Libras are known for their love of harmony and beauty. You excel at bringing people together and finding fair solutions to conflicts. Your refined taste and social skills make you popular, and you strive to create balance in all aspects of life.",
    },
    {
      sign: "Scorpio",
      symbol: "♏",
      startMonth: 10,
      startDay: 23,
      endMonth: 11,
      endDay: 21,
      dateRange: "October 23 - November 21",
      traits:
        "You are intense, passionate, and incredibly perceptive. Scorpios are known for their depth and ability to see beneath the surface. You have strong intuition and are not afraid to explore life's mysteries. Your determination and resourcefulness help you overcome any obstacle, and your loyalty runs deep.",
    },
    {
      sign: "Sagittarius",
      symbol: "♐",
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
      dateRange: "November 22 - December 21",
      traits:
        "You are adventurous, optimistic, and love exploring new horizons. Sagittarians are known for their philosophical nature and love of freedom. You have a great sense of humor and see life as a grand adventure. Your honesty and enthusiasm inspire others, and you're always ready for the next journey.",
    },
    {
      sign: "Capricorn",
      symbol: "♑",
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
      dateRange: "December 22 - January 19",
      traits:
        "You are ambitious, disciplined, and have a strong work ethic. Capricorns are known for their practical approach to achieving goals. You value tradition and respect, and you're willing to work hard for long-term success. Your wisdom and reliability make you a natural leader that others look up to.",
    },
    {
      sign: "Aquarius",
      symbol: "♒",
      startMonth: 1,
      startDay: 20,
      endMonth: 2,
      endDay: 18,
      dateRange: "January 20 - February 18",
      traits:
        "You are independent, innovative, and humanitarian. Aquarians are known for their unique perspective and desire to make the world a better place. You think outside the box and aren't afraid to be different. Your progressive ideas and friendly nature attract diverse groups of people who appreciate your authenticity.",
    },
    {
      sign: "Pisces",
      symbol: "♓",
      startMonth: 2,
      startDay: 19,
      endMonth: 3,
      endDay: 20,
      dateRange: "February 19 - March 20",
      traits:
        "You are compassionate, artistic, and deeply intuitive. Pisceans are known for their empathy and creative abilities. You have a rich inner world and can easily connect with others on an emotional level. Your imagination and sensitivity make you a natural artist, and your kindness touches everyone you meet.",
    },
  ];

  /**
   * Computed property to disable button when required fields are empty
   */
  get isButtonDisabled() {
    return !this.name || !this.dateOfBirth;
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
   * Handle show zodiac sign button click
   */
  handleShowZodiacSign() {
    this.resetResults();

    if (!this.name || !this.dateOfBirth) {
      this.errorMessage = "Please fill in both name and date of birth.";
      return;
    }

    try {
      const zodiacSign = this.calculateZodiacSign(this.dateOfBirth);
      if (zodiacSign) {
        this.zodiacResult = zodiacSign;
        this.showResults = true;
      } else {
        this.errorMessage =
          "Unable to determine zodiac sign. Please check your date of birth.";
      }
    } catch (error) {
      this.errorMessage =
        "An error occurred while calculating your zodiac sign. Please try again.";
      console.error("Error calculating zodiac sign:", error);
    }
  }

  /**
   * Calculate zodiac sign based on date of birth
   */
  calculateZodiacSign(dateString) {
    const birthDate = new Date(dateString);
    const month = birthDate.getMonth() + 1; // getMonth() returns 0-11
    const day = birthDate.getDate();

    for (let zodiac of this.zodiacSigns) {
      if (this.isDateInRange(month, day, zodiac)) {
        return zodiac;
      }
    }
    return null;
  }

  /**
   * Check if the given date falls within the zodiac sign's date range
   */
  isDateInRange(month, day, zodiac) {
    // Handle cases where zodiac spans across year boundary (like Capricorn)
    if (zodiac.startMonth > zodiac.endMonth) {
      // Case: spans year boundary (Dec 22 - Jan 19)
      return (
        (month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay)
      );
    }
    if (zodiac.startMonth === zodiac.endMonth) {
      // Case: same month (shouldn't happen with zodiac signs, but included for completeness)
      return (
        month === zodiac.startMonth &&
        day >= zodiac.startDay &&
        day <= zodiac.endDay
      );
    }
    // Case: normal range within same year
    return (
      (month === zodiac.startMonth && day >= zodiac.startDay) ||
      (month === zodiac.endMonth && day <= zodiac.endDay) ||
      (month > zodiac.startMonth && month < zodiac.endMonth)
    );
  }

  /**
   * Reset results and error messages
   */
  resetResults() {
    this.showResults = false;
    this.errorMessage = "";
    this.zodiacResult = {};
  }
}
