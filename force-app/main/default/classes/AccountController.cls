/**
 * @description Controller class for Account-related operations
 */
public with sharing class AccountController {
    /**
     * @description Fetch all accounts with Industry 'Technology' and their related contacts
     * @return List<Account> List of Technology industry accounts with contact relationships
     */
    public static List<Account> getAccountsWithTechnologyIndustry() {
        // Check if user has access to objects
        if (!Schema.SObjectType.Account.isAccessible() || !Schema.SObjectType.Contact.isAccessible()) {
            return new List<Account>();
        }
        List<Account> accounts = [SELECT Id, Name, Industry, (SELECT Id FROM Contacts)
                                 FROM Account 
                                 WHERE Industry = 'Technology'
                                 WITH SECURITY_ENFORCED];
        return accounts;
    }
}