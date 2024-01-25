public with sharing class CustomObjectController {
	@AuraEnabled
	public static List<CustomObject__c> getRelatedRecords(Id accountId) {
		System.debug('Test');
		System.debug('Test');
		return [SELECT Id, Name FROM CustomObject__c WHERE Account__c = :accountId];
	}
}
