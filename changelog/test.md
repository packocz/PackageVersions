# v1.1.13

Cumulative Release Number: <b>9</b>

Matching defintion first created or deployed to an org on: Thu Jan 11 2024 22:10:55 GMT+0100 (Central European Standard Time)

### Artifacts :package:

-   **src-env-specific-pre** v0.1.0.7489816960 (e524f8a6)

-   **src-env-specific-alias-pre** v0.1.0.7489816960 (e524f8a6)

-   **src-env-specific-alias-post** v0.1.0.7489816960 (e524f8a6)

-   **CSAS-Core** v0.1.0.1085 (e524f8a6)

-   **CRM-Retail** v0.1.0.1177 (e524f8a6)

-   **CRM-POS** v0.1.0.746 (e524f8a6)

-   **CRM-Encryption** v0.1.0.7489816960 (e524f8a6)

-   **CRM-Core** v0.1.0.1141 (e524f8a6)

-   **CRM-App** v0.1.0.1091 (e524f8a6)

-   **CRM-App-Source** v0.1.0.7489816960 (e524f8a6)

### Work Items :gem:

[DF-88069](https://fujira.csin.cz/browse/DF-88069)
[DF-89314](https://fujira.csin.cz/browse/DF-89314)
[DF-89462](https://fujira.csin.cz/browse/DF-89462)
[DF-87621](https://fujira.csin.cz/browse/DF-87621)
[PE-98020](https://fujira.csin.cz/browse/PE-98020)
[DF-89197](https://fujira.csin.cz/browse/DF-89197)
[DF-88908](https://fujira.csin.cz/browse/DF-88908)
[PE-98715](https://fujira.csin.cz/browse/PE-98715)
[DF-89315](https://fujira.csin.cz/browse/DF-89315)
[DF-89307](https://fujira.csin.cz/browse/DF-89307)
[DF-88898](https://fujira.csin.cz/browse/DF-88898)
[DF-89027](https://fujira.csin.cz/browse/DF-89027)
[DF-89574](https://fujira.csin.cz/browse/DF-89574)
[DG-24217](https://fujira.csin.cz/browse/DG-24217)
[PE-75299](https://fujira.csin.cz/browse/PE-75299)
[PE-74950](https://fujira.csin.cz/browse/PE-74950)
[DG-24528](https://fujira.csin.cz/browse/DG-24528)
[PE-75322](https://fujira.csin.cz/browse/PE-75322)
[PE-74504](https://fujira.csin.cz/browse/PE-74504)
[DF-89310](https://fujira.csin.cz/browse/DF-89310)
[PE-98614](https://fujira.csin.cz/browse/PE-98614)
[PE-98346](https://fujira.csin.cz/browse/PE-98346)
[DF-89258](https://fujira.csin.cz/browse/DF-89258)
[PE-98814](https://fujira.csin.cz/browse/PE-98814)

### Commits :book:

#### src-env-specific-alias-post

| Date       | Time     | Commit ID | Commit Message                                                           |
| ---------- | -------- | --------- | ------------------------------------------------------------------------ |
| 11/01/2024 | 14:36:25 | b0cdeddc  | fix(subjects): DF-88069 LegalForm - change field type to picklist (#542) |

#### CRM-Retail

| Date       | Time     | Commit ID | Commit Message                                                                                |
| ---------- | -------- | --------- | --------------------------------------------------------------------------------------------- |
| 11/01/2024 | 10:43:05 | 9cf11417  | fix(subjects): DF-89314 Loan Account - Missing Fields (#549)                                  |
| 11/01/2024 | 10:02:03 | 6ee53934  | fix(subjects) DF-89462 Fin Acc Roles + Fin Acc Card translations (#550)                       |
| 11/01/2024 | 07:58:36 | 9f9bceaa  | fix(subject): DF-87621 Chybějící práva u Retail Banker a Manazer (#529)                       |
| 10/01/2024 | 15:44:55 | 43eafaa3  | fix(meeting-book): PE-98020 revert deleting nonclient logic (#546)                            |
| 10/01/2024 | 12:40:05 | 051ce4b5  | fix(meeting-book): DF-89197 replace phone with encrypted phone (#536)                         |
| 10/01/2024 | 11:49:26 | 12b8feb1  | fix(activities): DF-88908 - timeZone correction (#522)                                        |
| 10/01/2024 | 11:23:56 | fa03fbab  | feat(oko-reporting): PE-98715 new field on user for OKO reporting (#539)                      |
| 10/01/2024 | 10:18:56 | d0652817  | fix(subjects): DF-89315-DF-89307 insurance and saving related hovers (#531)                   |
| 09/01/2024 | 15:20:06 | 1fe41018  | fix(meeting-book): DF-88898 fix timeslot loading behavior (#533)                              |
| 09/01/2024 | 13:38:23 | b9ffb5aa  | fix(meeting-book): DF-89027 add disable button logic (#538)                                   |
| 09/01/2024 | 10:42:23 | 7f0c9c9d  | feat(meeting-book): PE-98020 ui update meeting (#515)                                         |
| 09/01/2024 | 08:57:21 | a009fc22  | fix(branch): DF-89574 User Redirect to Intranet (#532)                                        |
| 08/01/2024 | 14:37:17 | 8195b0ff  | feat(products): DG-24217 DEV Account Balance Update - Apex (#409)                             |
| 08/01/2024 | 09:49:08 | fbe45e3f  | feat(subjects): PE-75299 DEV account highlight panel for quickactions (#520)                  |
| 08/01/2024 | 08:03:14 | aa654546  | fix(activities): PE-74950 - changed creator attribute type from array to single object (#523) |

#### CRM-Core

| Date       | Time     | Commit ID | Commit Message                                                           |
| ---------- | -------- | --------- | ------------------------------------------------------------------------ |
| 11/01/2024 | 14:40:39 | e524f8a6  | feat(data-model): DG-24528 change title fields type on Account (#545)    |
| 11/01/2024 | 14:36:25 | b0cdeddc  | fix(subjects): DF-88069 LegalForm - change field type to picklist (#542) |
| 11/01/2024 | 13:59:40 | 1da8d3d5  | feat(framework): PE-75322 DEV_plnění RT u produktu třetích stran (#526)  |
| 11/01/2024 | 13:11:13 | cfe31f7b  | feat(subjects): PE-74504 Contact Ids Replication (#541)                  |
| 11/01/2024 | 12:07:36 | 5b1b5999  | fix(subjects): DF-89310 formula null values (#547)                       |
| 10/01/2024 | 11:23:56 | fa03fbab  | feat(oko-reporting): PE-98715 new field on user for OKO reporting (#539) |
| 09/01/2024 | 10:42:23 | 7f0c9c9d  | feat(meeting-book): PE-98020 ui update meeting (#515)                    |
| 08/01/2024 | 12:35:03 | e20b1206  | feat(subjects): PE-98614 financial health and pillars renaming (#527)    |
| 05/01/2024 | 14:48:55 | 42242daa  | feat(branch): PE-98346 DEV_Adjustment user redirect (#521)               |

#### CRM-App

| Date       | Time     | Commit ID | Commit Message                                                                    |
| ---------- | -------- | --------- | --------------------------------------------------------------------------------- |
| 11/01/2024 | 13:11:13 | cfe31f7b  | feat(subjects): PE-74504 Contact Ids Replication (#541)                           |
| 11/01/2024 | 11:10:00 | 4f17b595  | fix(subjects): DF-89258 Fin Acc Role - Start Date translation (#548)              |
| 11/01/2024 | 10:02:03 | 6ee53934  | fix(subjects) DF-89462 Fin Acc Roles + Fin Acc Card translations (#550)           |
| 10/01/2024 | 11:23:56 | fa03fbab  | feat(oko-reporting): PE-98715 new field on user for OKO reporting (#539)          |
| 09/01/2024 | 13:04:43 | 959a9a83  | fix(deployment): PE-98814 Deployment user permission fix (#525)                   |
| 09/01/2024 | 12:06:32 | 5b7758cf  | feat(subjects): PE-75299 standard highlight panel for Accounts Record Page (#537) |
| 09/01/2024 | 10:42:23 | 7f0c9c9d  | feat(meeting-book): PE-98020 ui update meeting (#515)                             |
| 08/01/2024 | 12:35:03 | e20b1206  | feat(subjects): PE-98614 financial health and pillars renaming (#527)             |
| 08/01/2024 | 09:49:08 | fbe45e3f  | feat(subjects): PE-75299 DEV account highlight panel for quickactions (#520)      |
| 05/01/2024 | 14:48:55 | 42242daa  | feat(branch): PE-98346 DEV_Adjustment user redirect (#521)                        |

#### CRM-App-Source

| Date       | Time     | Commit ID | Commit Message                                                                    |
| ---------- | -------- | --------- | --------------------------------------------------------------------------------- |
| 11/01/2024 | 10:02:03 | 6ee53934  | fix(subjects) DF-89462 Fin Acc Roles + Fin Acc Card translations (#550)           |
| 09/01/2024 | 12:06:32 | 5b7758cf  | feat(subjects): PE-75299 standard highlight panel for Accounts Record Page (#537) |

### Additional Information

The following artifacts' version may have changed due to an update in the scratch org definition file, incremented package version in SFDX project configuration, or build all packages:

-   src-env-specific-pre
-   src-env-specific-alias-pre
-   CSAS-Core
-   CRM-POS
-   CRM-Encryption
