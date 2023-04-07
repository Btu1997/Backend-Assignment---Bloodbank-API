# Backend-Assignment---Bloodbank-API

Develop a NestJS / ExpressJS REST API server with the following requirements:


The app should handle 2 types of users - Hospital, Receiver
Hospital and Receiver should be able to create an account and sign in
The hospital should be able to add all the blood samples info available
Receivers are able to request blood samples from hospitals. Make sure that only those receivers who are eligible for the blood sample are allowed to request samples.
The hospital should be able to see the list of all receivers who have requested a particular blood group from its blood bank.



Endpoints:


<!-- GET endpoint to get the list of all blood samples available in all hospitals (Public - Everyone can access) -->

<!-- //POST endpoint to add the blood sample info (Only accessible to respective hospital) -->

<!-- PUT endpoint to update the respective blood info (Only accessible to respective hospital) -->

<!-- DELETE endpoint to delete the respective blood info (Only accessible to respective hospital) -->

<!-- GET endpoint to get all the blood info that the hospital uploaded (Only accessible to respective hospital) -->

<!-- POST Endpoint to request a blood sample (Only accessible to receiver) -->

<!-- GET endpoint to get the list of all receivers who have requested a particular blood group from its blood bank (Only accessible to respective hospital) -->

Tech Stack - Typescript, NestJS/ExpressJS (NestJS preferred), MongoDB/Postgres
Deliverables:

A Git repository containing the source code

