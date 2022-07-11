# **BUYCOINS JOB CHALLENGE**

This is my attempt at the Buycoins React / React Native developer job challenge. The app is a basic React + GraphQL web job listing application that features filtering and seraching by job title, location, company name and tags.

The tools used incude React, TypeScript (all files are typed), SASS(SCSS) and axios for the GraphQl request.

###### **FOLDER STRUCTURE**

* Components: contains functional components that do not manage overall app state by themselves, they are fed with props or static.
* Containers: contains React components that manage overall app state and feed children components with life.

###### **APP LOGIC**

* The App.tsx manages filtering and search text state. It provides functions to the children so that they can change its state. Also supplies relevant data such as filtering state and search text to show only valid Job Postings.
* Header.tsx controls the filtering and serching functionalities.
* JobPosts.tsx fetches the job posts, displays them and also apply the set filters.

Run "npm install" then "npm run dev" to view the app locally

The app is hosted live [Here](https://buycoins-app.netlify.app)
