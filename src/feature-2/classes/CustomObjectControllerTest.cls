@IsTest
private class CustomObjectControllerTest {
	@IsTest
	static void noRecordsForBadId() {
		List<CustomObject__c> records = CustomObjectController.getRelatedRecords('001000000000000');
		Assert.isTrue(records.isEmpty(), 'Should be empty');
	}
}
