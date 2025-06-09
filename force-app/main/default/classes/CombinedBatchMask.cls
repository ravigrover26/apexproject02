public class CombinedBatchMask implements Database.Batchable<SObject> {

    public String leadQuery;
    public String accountQuery;
    public String objectType; // 'Lead' or 'Account'

    // Constructor for Lead processing (default)
    public CombinedBatchMask() {
        this('Lead');
    }
    
    // Constructor with object type specification
    public CombinedBatchMask(String objType) {
        this.objectType = objType;
        leadQuery = 'SELECT Id, Email FROM Lead WHERE Email != null AND Industry != null';
        accountQuery = 'SELECT Id, Phone FROM Account WHERE Phone != NULL';
    }

    public Database.QueryLocator start(Database.BatchableContext BC) {
        if (objectType == 'Lead') {
            System.debug('Starting Lead processing batch...');
            return Database.getQueryLocator(leadQuery);
        } else if (objectType == 'Account') {
            System.debug('Starting Account processing batch...');
            return Database.getQueryLocator(accountQuery);
        } else {
            throw new IllegalArgumentException('Invalid object type: ' + objectType);
        }
    }

    public void execute(Database.BatchableContext BC, List<SObject> scope) {
        if (objectType == 'Lead') {
            processLeads(scope);
        } else if (objectType == 'Account') {
            processAccounts(scope);
        }
    }

    public void finish(Database.BatchableContext BC) {
        if (objectType == 'Lead') {
            System.debug('Lead processing completed. Starting Account processing batch...');
            // Chain to Account processing
            CombinedBatchMask accountBatch = new CombinedBatchMask('Account');
            Database.executeBatch(accountBatch, 200);
        } else {
            System.debug('Account processing completed. All masking operations finished.');
        }
    }

    /**
     * Process Lead records for email masking
     */
    private void processLeads(List<SObject> scope) {
        List<Lead> leadsToUpdate = new List<Lead>();

        for (SObject record : scope) {
            Lead lead = (Lead) record;
            if (lead.Email != null) {
                String email = lead.Email;
                String[] emailParts = email.split('@');

                if (emailParts.size() == 2 && emailParts[0].length() > 1) {
                    String shuffledLocalPart = shuffleString(emailParts[0]);
                    lead.Email = shuffledLocalPart + '@' + emailParts[1];
                    leadsToUpdate.add(lead);
                }
            }
        }

        if (!leadsToUpdate.isEmpty()) {
            update leadsToUpdate;
            System.debug('Updated ' + leadsToUpdate.size() + ' Lead records');
        }
    }

    /**
     * Process Account records for phone masking
     */
    private void processAccounts(List<SObject> scope) {
        List<Account> accountsToUpdate = new List<Account>();

        for (SObject record : scope) {
            Account acc = (Account) record;
            if (acc.Phone != null) {
                String originalPhone = acc.Phone;
                String maskedPhone = maskPhone(originalPhone);

                if (originalPhone != maskedPhone) {
                    acc.Phone = maskedPhone;
                    accountsToUpdate.add(acc);
                }
            }
        }

        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
            System.debug('Updated ' + accountsToUpdate.size() + ' Account records');
        }
    }

    private String shuffleString(String input) {
        List<String> charList = new List<String>();
        for (Integer i = 0; i < input.length(); i++) {
            charList.add(input.substring(i, i + 1));
        }

       
        List<String> validStartChars = new List<String>();
        List<String> otherChars = new List<String>();
        for (String ch : charList) {
            if (Pattern.matches('[A-Za-z0-9]', ch)) {
                validStartChars.add(ch);
            } else {
                otherChars.add(ch);
            }
        }

       
        if (validStartChars.isEmpty()) {
            return input;
        }

        charList = new List<String>(validStartChars);
        charList.addAll(otherChars);

        for (Integer i = 0; i < charList.size(); i++) {
            Integer randomIndex = (Integer)(Math.random() * charList.size());
            String temp = charList[i];
            charList[i] = charList[randomIndex];
            charList[randomIndex] = temp;
        }

        for (Integer i = 0; i < charList.size(); i++) {
            if (Pattern.matches('[A-Za-z0-9]', charList[i])) {
                String tmp = charList[0];
                charList[0] = charList[i];
                charList[i] = tmp;
                break;
            }
        }

        String shuffled = '';
        for (String s : charList) {
            shuffled += s;
        }

        return shuffled;
    }

    private String maskPhone(String phone) {
        // Handle null, empty, or whitespace-only strings
        if (String.isBlank(phone)) {
            return phone; // Return original value for null/empty/blank
        }

        // Trim whitespace first
        phone = phone.trim();
        
        // Check if it's an international number (starts with +)
        Boolean isInternational = phone.startsWith('+');
        String cleanedPhone;

        if (isInternational) {
            // For international numbers, preserve + and remove all non-numeric characters
            String numericPart = phone.substring(1).replaceAll('[^0-9]', '');
            if (String.isBlank(numericPart)) {
                return '321'; // Handle case where only + remains
            }
            cleanedPhone = '+' + numericPart;
        } else {
            // For non-international numbers, remove all non-numeric characters
            cleanedPhone = phone.replaceAll('[^0-9]', '');
            if (String.isBlank(cleanedPhone)) {
                return '321'; // Handle case where no digits remain
            }
        }

        // Handle very long numbers (over 15 digits is unusually long for phone numbers)
        if (cleanedPhone.length() > 15) {
            cleanedPhone = cleanedPhone.substring(0, 15);
        }

        // Handle very short numbers
        if (cleanedPhone.length() <= 3) {
            return '321';
        }

        // Handle +61 format (Australian international)
        if (cleanedPhone.startsWith('+61')) {
            if (cleanedPhone.length() <= 7) {
                return cleanedPhone; // Too short to mask meaningfully
            }
            return '+61' + '1111' + cleanedPhone.substring(7);
        }
        
        // Handle other international formats (+1, +44, etc.)
        if (cleanedPhone.startsWith('+')) {
            // Extract country code (assume 1-3 digits after +)
            String countryCode = '';
            Integer i = 1;
            while (i < cleanedPhone.length() && i <= 4) { // Max 3 digits for country code
                countryCode += cleanedPhone.substring(i, i + 1);
                i++;
                if (i >= 4 || cleanedPhone.length() <= i + 3) break; // Need at least 3 more digits to mask
            }
            
            if (cleanedPhone.length() <= countryCode.length() + 4) {
                return cleanedPhone; // Too short to mask
            }
            
            return '+' + countryCode + '5555' + cleanedPhone.substring(countryCode.length() + 5);
        }
        
        // Handle Australian mobile (04)
        if (cleanedPhone.startsWith('04')) {
            if (cleanedPhone.length() <= 6) {
                return cleanedPhone; // Too short to mask
            }
            return '04' + '2222' + cleanedPhone.substring(6);
        }
        
        // Handle other Australian area codes (02, 03, 07, 08)
        if (cleanedPhone.startsWith('02') || cleanedPhone.startsWith('03') || 
            cleanedPhone.startsWith('07') || cleanedPhone.startsWith('08')) {
            if (cleanedPhone.length() <= 6) {
                return cleanedPhone; // Too short to mask
            }
            return cleanedPhone.substring(0, 2) + '1111' + cleanedPhone.substring(6);
        }
        
        // Handle 61 format without + (Australian country code)
        if (cleanedPhone.startsWith('61')) {
            if (cleanedPhone.length() <= 6) {
                return cleanedPhone; // Too short to mask
            }
            return '61' + '3333' + cleanedPhone.substring(6);
        }
        
        // Handle all other numbers
        if (cleanedPhone.length() > 3) {
            return '444' + cleanedPhone.substring(3);
        }
        
        return '321'; // Default fallback
    }
}