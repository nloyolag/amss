/*
====================================
= File that stores predefined app  =
= messages and names               =
====================================
*/

/*
====================================
=       Notification Messages      =
====================================
*/

START_TASK_NOTIFICATION = "\
%FROM% tasked you! <br> The task asked to be done is: %TASK% <br> \
Click one of the buttons below to accept or deny the task";

REVIEW_DONE_NOTIFICATION = "\
%FROM% reviewed you! <br> He says the following %TITLE% <br> \
You were given a %SCORE% star rating. <br> \
Click ... to read the full review";

TASK_REJECTED_NOTIFICATION = "\
%FROM% rejected your task! <br> Contact him for further information <br>";

TASK_ACCEPTED_NOTIFICATION = "\
%FROM% accepted your task! <br> %TASK% will begin.";

OTHER_COMPLETED_NOTIFICATION = "\
%OTHER% marked the task '%TASK%' as complete! <br> Mark the task \
as complete to proceed to the review phase. <br> You can do so by clicking \
the checkmark below";

BOTH_COMPLETED_EMPLOYER_NOTIFICATION = "\
You and %OTHER% marked the task '%TASK%' as complete! <br> To finish you \
should review %OTHER%. <br> Do so by clicking the checkmark symbol below";

BOTH_COMPLETED_EMPLOYEE_NOTIFICATION = "\
You and %OTHER% marked the task '%TASK%' as complete! <br> \
You should wait for %OTHER%'s review on your work";

RECEIVED_MESSAGE_NOTIFICATION = "\
%OTHER% messaged you! '%EXCERPT%'";

SKILL_VALIDATION_NOTIFICATION = "\
%OTHER% validated your %SKILL% skill!";

/*
====================================
=       Notification Types         =
====================================
*/

START_TASK = "Start task";
REVIEW_DONE = "Review done";
TASK_REJECTED = "Task rejected";
TASK_ACCEPTED = "Task accepted";
OTHER_COMPLETED = "Other completed";
BOTH_COMPLETED_EMPLOYER = "Both completed employer";
BOTH_COMPLETED_EMPLOYEE = "Both completed employee";
RECEIVED_MESSAGE = "Received message";
SKILL_VALIDATION = "Skill validated";

/*
====================================
=        Task Status Names         =
====================================
*/

ON_GOING = "On going";
PENDING_COMPLETION = "Pending completion";
PENDING_REVIEW = "Pending review";
CANCELLED = "Cancelled";
DONE = "Done";

/*
====================================
=          Alert Messages          =
====================================
*/

TASK_CONFIRMED = "The task has been accepted. You can begin work!";
TASK_COMPLETED_FIRST = "You have completed the task. \
You should wait for the other person's completion";
TASK_COMPLETED_LAST_EMPLOYER = "Both of you have completed the task \
You should now review your tasker's work";
TASK_COMPLETED_LAST_EMPLOYEE = "Both of you have completed the task \
You should wait for the review of your work";
SURE_REJECT_TASK = "Are you sure you want to reject this task?";
SURE_COMPLETE_TASK = "Are you sure you want to complete this task?";