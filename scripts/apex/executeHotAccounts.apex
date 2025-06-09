// Get the list of hot accounts with their contacts
List<Account> hotAccounts = AccountController.getHotAccountsWithContacts();

// Print the results
System.debug('Total Hot Accounts found: ' + hotAccounts.size());

// Loop through each account to show details
for(Account acc : hotAccounts) {
    System.debug('Account Name: ' + acc.Name);
    System.debug('Contact Count: ' + acc.Contacts.size());
    System.debug('Opportunity Count: ' + acc.Opportunities.size());
    System.debug('-------------------');
} 