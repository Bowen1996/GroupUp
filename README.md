#GroupUp
GroupUp is a web application designed for students and professors of classes that require students to form groups. Students can create profiles that list their skills and expertise as well as their availability, propose group projects, describe the skills and availability they are seeking in other group members, and join other groups. Professors are able to upload csv files with the students’ information, set the number of students allowed in groups, create a list of skills she feels are relevant for the project for students to rate themselves, and randomly assign students to groups. 
##Release Notes
###Features:
####Professors:
1. Professors can create an account and log in.

2. Professors can create a project by uploading a csv containing student emails.

3. Professors can use a generated url to invite students to join a project.

4. Professors are provided with a dashboard detailing how many students are in groups and how many have yet to find a group.

5. Professors have the ability to manually group students into groups.


####Students:
1. Students can create an account and log in.

2. Students can use a url given to them by their professor to join a project.

3. Students can create and edit an “About Me” for each project they join.

4. Students can add their weekly availability and relevant skills to the their “About Me”.

5. Students can see a list of current groups.

6. Students can ask to join current groups.

7. Students can propose their own group.

8. Students who are part of a group can approve or deny requests to join his/her group.

###Bug Fixes:

This is the first release (no bugfixes yet). See below for Missing features and known bugs.

###Missing Features:
Group randomization has been implemented, but is not included in this release because it has not been tested.

###Known Bugs:
1. When manually grouping students, the page must be refreshed if a new csv file has been uploaded (this is indicated on the page so the user knows what to do).
2. Manually grouping students currently does not take into account size constraints for the groups (for example, a professor could create a group of 7 students even if the max size is 5).

##Install Guide

###Pre-requisites

Must be using one of the following platforms

1. Mac OS X 10.7 (Lion) and above
2. Linux on x86 and x86_64 architectures
3. Windows 7, Windows 8.1, Windows 10, Windows Server 2008, and Windows Server 2012

###Installation

The following steps will build the GroupUp application while automatically pulling in the dependencies

1. Install Meteor by following the instructions on the Meteor website (https://www.meteor.com/install)

2. Clone this repository (or download it as a zip and extract)

3. Change GroupUp directory. (You should see a package.json file)

4. Run “npm install” (This will only have to be run once for this project)

5. Enter the command “meteor” into your terminal. (Note: The first build will take several minutes to complete).

##Troubleshooting

1. The first build will take several minutes to complete

2. Be sure to do an “npm install”
