#GroupUp
GroupUp is a web application that allows students to form groups for academic group projects. Students can create profiles that list their skills and expertise as well as their availability, propose group projects, describe the skills and availability they are seeking in other group members, and group up with other students. Professors can upload csv files with the students’ information, set the number of students allowed in groups, create a list of relevant skills for the project, and randomly assign students to groups. 
##Release Notes
###New Features:
####Professor Features:
1. Professors can create an account and log in.

2. Professors can create a project by uploading a csv containing student emails.

3. Professors can use a generated url to invite students to join a project.

4. Professors are provided with a dashboard detailing how many students are in groups and how many have yet to find a group.

5. Professors have the ability to manually group students into groups.


####Student Features:
1. Students can create an account and log in.

2. Students can use a url given to them by their professor to join a project.

3. Students can create and edit an “About Me” for each project they join.

4. Students can add their weekly availability and relevant skills to the their “About Me”.

5. Students can see a list of current groups.

6. Students can propose their own group.

###Bug Fixes:

This is release 1.0 (no relevant bug fixes yet). See below for missing features and known bugs.

###Missing Features:
1. Students cannot ask to join a current group yet (nearly finished).

2. Students who are part of a group cannot yet approve or deny requests to join his/her group (nearly finished).

3. Group randomization has been implemented, but is not included in this release because it has not been tested.

4. Student and group profile pages have been coded, but not integrated into the application yet.

###Known Bugs:
1. When manually grouping students, the page must be refreshed if a new csv file has been uploaded (this is indicated on the page so the user knows what to do).

2. Manually grouping students currently does not take into account size constraints for the groups (for example, a professor could create a group of 7 students even if the max size is 5).

3. When joining a group, the project is no longer shown on the student dashboard. This issue will be fixed as soon as possible.

##Install Guide

###Pre-requisites

Must be using one of the following platforms

1. Mac OS X 10.7 (Lion) and above

2. Linux on x86 and x86_64 architectures

3. Windows 7, Windows 8.1, Windows 10, Windows Server 2008, and Windows Server 2012

###Dependent Libraries

See installation instructions for information about installing Meteor, Atmosphere dependencies, and NPM dependencies.

###Download Instructions

Clone this repository (or download it as a zip and extract the files).

###Installation

The following steps will build the GroupUp application while automatically pulling in the dependencies

1. Install Meteor by following the instructions on the Meteor website (https://www.meteor.com/install).

2. In terminal or command line, navigate to the GroupUp directory (You should see a package.json file).

3. Run “npm install” to install NPM dependencies (This will only have to be run once for this project).

4. Enter the command “meteor” into your terminal. (Note: The first build will take several minutes to complete, as it will install necessary Atmosphere dependencies).

###Run Instructions

1. Enter the command “meteor” into your terminal. 

2. Navigate to localhost:3000 in your browser

##Troubleshooting

1. The first build will take several minutes to complete.

2. Be sure to do an “npm install.”
