# Create Demo Lab Help Text

You can read the instructions and tips here to help you create your demo lab. At any time in the process, you can click **Save As Draft** in the bottom-left corner of the window to save your progress and come back to it later. 

For further assistance, send an email to support@qloudable.com.

## Advanced Details

In this section, you will add and configure advanced detials for your demo lab. The settings here can affect how your demo lab deploys,
and what your users will experience, so keep that in mind.

### Demo Lab Duration

This is how long the demo lab will stay active, in minutes. Note the approximate length (in minutes) that it would take a first-timer to complete the demo lab, and enter that number here. This lets the customer know how much of a commitment they have to make to try out your solution.

**Tip:** 60 minutes is generally a good place to start and usually a safe bet, if you are unsure.

![demo lab duration](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_demo-lab-duration.gif)

### Soft Lab Deployment Time

This is the length of time it will take for the demo lab to deploy, in minutes, depending on when your template finishes deploying in the cloud. 

**Soft deployment** is when the lab begins as soon as the template completes its deployment process, which can sometimes occur quicker than expected. We recommend using this option for your demo lab if it only relies on the main template to deploy all necessary components, and there are no additional scripts or processes that need to run for a period of time after the main template is ready.

Note the approximate length (in minutes) that it would take for the demo lab template to deploy, and enter the number here. This lets the customer know how much lead time will be needed before they can try the demo lab.

### Hard Lab Deployment Time

This is the length of time it will take for the demo lab to deploy, in minutes, independent of when your template finishes deploying in the cloud. 

**Hard deployment** is when the lab begins once a specified period of time has passed, regardless of when the template completes its deployment process. We recommend using this option for your demo lab if it relies on additional scripts and/or processes to run after the main templates completes in order to properly deploy all necessary components, as sometimes the main template is ready before all of the other scripts have finished their tasks.

Note the approximate length (in minutes) that it would take for the demo lab's template and additional scripts to deploy. This lets the customer know how much lead time will be needed before they can try the demo lab.

### Concurrency Limit

Note the number of demo labs that can be active at the same time.

![concurrency limit](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_demo-lab-concurrency-limit.gif)

### Demo Labs Per User Limit

Enter the number of demo labs each unique user is allowed to deploy. Any attempts to deploy afer this number will be restricted

![user limit](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_demo-lab-user-limit.gif)

### Deployment Failure Message

Enter the message that will appear when a user's demo lab deployment fails for whatever reason. This message will be viewed by the customer.

**Tip:** A good default failure message is: "Sorry, your demo lab deployment has failed. Please try again later or contact us for support."

![failure message](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_failure-message.gif)

### Concurrency Limit Message

Enter the message that will appear when a user has reached their concurrency limit. This message will be viewed by the customer.

**Tip:** A good default concurrency limit message is: "Sorry, there are too many demo labs active right now. Please wait a bit and try again later. Thanks for your interest!"

![concurrency message](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_concurrency-message.gif)

### Demo Lab Per User Limit Message

Enter the message that will appear when a user reaches their limit of total demo labs deployments. This message will be viewed by the customer.

**Tip:** A good default demo lab per user limit message is: "Sorry, you have reached the maximum number of demo lab deployments allowed. Please contact us for more information."

![user limit message](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_user-limit-message.gif)

### Demo Lab Access Details & Outputs

In this text box, you can add and customize the demo lab access details and template output parameters that are displayed to the user once the demo lab is ready. You can use HTML inline formatting to customize your text (**e.g.** <b>**bold text**</b> and line breaks <br>). 

To dynamically populate this field with the output parameters from the main demo lab template, type the value of the output surrounded by double curly brackets (**e.g.** Here is the password: **{{LabPassword}}** ). This will automatically add the *LabPassword* output parameter from the template to your demo lab access details. 

**Tip:** Make sure you type the output values correctly, and with proper casing.

![outputs](https://raw.githubusercontent.com/qloudable/qloudable-help/master/images/demo-lab-ad_outputs.gif)

Click the **Link Cloud Account** tab to continue.