# Salesforce DX Project: Package Versions
Testing out the process of developing several dependent packages in a single repository. Focusing on version number bump process (via GitHub PR) and proper ancestory settings.
## Package Structure
Typical project with a base package, sibling feature packages and 1 final app-level package with dependencies to all above.

* Base
  * Feature 1
  * Feature 2
    * App

# Initial Versions

| Package      | Version | Dependecies |
| ----------- | ----------- | -----------
| base      | 0.1.0-1       | 
| feature-1   | 0.1.0-1        | base@0.1.0-1
| feature-2   | 0.1.0-2        | base@0.1.0-1
| app   | 0.1.0-1        | base@0.1.0-1, feature-1@0.1.0-1, feature-2@0.1.0-2