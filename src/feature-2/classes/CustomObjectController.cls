public with sharing class CustomObjectController {
	@AuraEnabled
	public static List<CustomObject__c> getRelatedRecords(Id accountId) {
		return [SELECT Id, Name FROM CustomObject__c WHERE Account__c = :accountId];
	}
}
