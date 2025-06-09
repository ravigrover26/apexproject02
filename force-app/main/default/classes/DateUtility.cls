/**
 * @description Utility class demonstrating various ways to create and work with Date variables in Apex
 * @author Salesforce Developer
 * @date 2024
 */
public class DateUtility {
    
    /**
     * @description Demonstrates different ways to create date variables
     * @return Map<String, Date> containing various date examples
     */
    public static Map<String, Date> createDateExamples() {
        Map<String, Date> dateExamples = new Map<String, Date>();
        
        // 1. Current date
        Date today = Date.today();
        dateExamples.put('today', today);
        
        // 2. Specific date using newInstance
        Date christmas2024 = Date.newInstance(2024, 12, 25);
        dateExamples.put('christmas2024', christmas2024);
        
        // 3. Date from string
        Date newYear = Date.valueOf('2025-01-01');
        dateExamples.put('newYear', newYear);
        
        // 4. Date from DateTime
        DateTime now = DateTime.now();
        Date dateFromDateTime = now.date();
        dateExamples.put('dateFromDateTime', dateFromDateTime);
        
        // 5. First day of current month
        Date firstDayOfMonth = today.toStartOfMonth();
        dateExamples.put('firstDayOfMonth', firstDayOfMonth);
        
        // 6. Date arithmetic examples
        Date thirtyDaysFromNow = today.addDays(30);
        Date threeMonthsAgo = today.addMonths(-3);
        Date nextYear = today.addYears(1);
        
        dateExamples.put('thirtyDaysFromNow', thirtyDaysFromNow);
        dateExamples.put('threeMonthsAgo', threeMonthsAgo);
        dateExamples.put('nextYear', nextYear);
        
        return dateExamples;
    }
    
    /**
     * @description Calculates age in years based on birth date
     * @param birthDate The birth date
     * @return Integer age in years
     */
    public static Integer calculateAge(Date birthDate) {
        if (birthDate == null) {
            throw new IllegalArgumentException('Birth date cannot be null');
        }
        
        Date today = Date.today();
        Integer age = today.year() - birthDate.year();
        
        // Adjust if birthday hasn't occurred this year
        Date birthdayThisYear = Date.newInstance(today.year(), birthDate.month(), birthDate.day());
        if (today < birthdayThisYear) {
            age--;
        }
        
        return age;
    }
    
    /**
     * @description Gets the last day of a given month
     * @param year The year
     * @param month The month (1-12)
     * @return Date representing the last day of the month
     */
    public static Date getLastDayOfMonth(Integer year, Integer month) {
        Date firstDayOfNextMonth = Date.newInstance(year, month + 1, 1);
        return firstDayOfNextMonth.addDays(-1);
    }
    
    /**
     * @description Checks if a date falls within a date range
     * @param checkDate The date to check
     * @param startDate Range start date
     * @param endDate Range end date
     * @return Boolean true if date is within range (inclusive)
     */
    public static Boolean isDateInRange(Date checkDate, Date startDate, Date endDate) {
        return checkDate >= startDate && checkDate <= endDate;
    }
    
    /**
     * @description Gets all business days between two dates (excluding weekends)
     * @param startDate The start date
     * @param endDate The end date
     * @return List<Date> list of business days
     */
    public static List<Date> getBusinessDays(Date startDate, Date endDate) {
        List<Date> businessDays = new List<Date>();
        
        Date currentDate = startDate;
        while (currentDate <= endDate) {
            // Check if it's not a weekend (Saturday = 7, Sunday = 1)
            Integer dayOfWeek = Math.mod(currentDate.dayOfWeek(), 7);
            if (dayOfWeek != 0 && dayOfWeek != 6) { // 0 = Sunday, 6 = Saturday
                businessDays.add(currentDate);
            }
            currentDate = currentDate.addDays(1);
        }
        
        return businessDays;
    }
    
    /**
     * @description Formats a date for display
     * @param inputDate The date to format
     * @return String formatted date string
     */
    public static String formatDateForDisplay(Date inputDate) {
        if (inputDate == null) {
            return '';
        }
        
        return inputDate.format('MMMM d, yyyy');
    }
    
    /**
     * @description Gets quarter information for a given date
     * @param inputDate The input date
     * @return Map<String, Object> containing quarter number and year
     */
    public static Map<String, Object> getQuarterInfo(Date inputDate) {
        Map<String, Object> quarterInfo = new Map<String, Object>();
        
        Integer month = inputDate.month();
        Integer quarter = (Integer) Math.ceil(month / 3.0);
        
        quarterInfo.put('quarter', quarter);
        quarterInfo.put('year', inputDate.year());
        quarterInfo.put('quarterYear', 'Q' + quarter + ' ' + inputDate.year());
        
        return quarterInfo;
    }
} 