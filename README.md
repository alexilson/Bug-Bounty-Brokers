# Bug-Bounty-Brokers

## Description

#### <center>Buggy Bandits Presents:</center>
### <center>The Bug Bounty Brokers</center>
#### <center>A Bug Bounty Board with GitHub Integration</center>

Introducing "The Bug Bounty Brokers" by The Buggy Bandits – your go-to platform for addressing those pesky bugs in your favorite GitHub repositories! Ever encountered a crucial issue in a repository that no one seems to be addressing? Fret not! Our platform is designed to empower users like you to take matters into your own hands. By placing bounties, you encourage developers to prioritize and resolve bugs that matter to you.

Join The Buggy Bandits in revolutionizing how bugs are tackled in the open-source community. The Bug Bounty Brokers – because every bug deserves a bounty!

## Link

https://evening-cliffs-29965-51622bc99066.herokuapp.com/

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [License](#licence)
- [Questions](#questions)

## Installation
- Clone repository to the directory of your choice
- Run "npm i" to install dependencies
- Create .env file based on the .env.example file
- Run db/schema.sql in mysql to create database
- Run "npm run seed" to seed database with data
- Run "npm start" to start the server
- Navigate to http://localhost:3001/ to start using the bounty board.


## Usage

![splash](../Bug-Bounty-Brokers/public/screnshots/splash.png)

**Adding A Bounty**
- Create an account
![signup](../Bug-Bounty-Brokers/public/screnshots/signup.png)
- Log in
- Click "Search Repos"
- Type in the name of the repo you would like to view
- Find the repo in the search results and click the "See Issues" button
![search](../Bug-Bounty-Brokers/public/screnshots/search.png)
- Scroll through the issues and find one on which you'd like to place a bounty.
- Enter a bounty amount into the Add Bounty field.
- Click Create Bounty.

![bounty](../Bug-Bounty-Brokers/public/screnshots/createBounty.png)

**Viewing Top 10 Most Wanted**
- Create an account
- Log in
- Click "Most Wanted"
- You will be shown the top 10 highest bounties on the board.

![wanted](../Bug-Bounty-Brokers/public/screnshots/mostWanted.png)


**Viewing Bounties You've Placed**
- Log In
- Click "Bounty Board"
- You will be shown only the bounties you've placed with the totals reflecting the amount you have placed on each bug.

![My Bounty](../Bug-Bounty-Brokers/public/screnshots/myBounty.png)


## Features
- User-Friendly Interface: The Bug Bounty Brokers provide a seamless experience, allowing users to create accounts effortlessly. Once registered, users can easily navigate through the platform's intuitive design.

- GitHub Integration: Search and connect with GitHub repositories seamlessly. Our platform fetches the latest issues from your chosen repository, ensuring you have all the information you need to make informed decisions.

- Bounty Placement: Found an issue that needs attention? Add a bounty of any amount to incentivize developers to fix it. The Bug Bounty Brokers enable users to contribute to issue resolution and make a meaningful impact on the open-source community.

- Personalized Dashboard: Keep track of all your bounties in one place with a personalized dashboard. Monitor the status of each bounty and stay updated on the progress of the issues you've supported.

- Top 10 Most Wanted Bounties: Explore the most critical and sought-after issues across various repositories on our platform. The Top 10 Most Wanted Bounties page showcases the bugs that need immediate attention, encouraging users to contribute to resolving high-priority issues.

## Credits

Multiple CSS Files with Express Handlebars. YouTube. https://www.youtube.com/watch?v=o4njTeKjGWQ.
Google Fonts Webpage: Author. (Year, Month Day). Title. Google Fonts. URL.

Google Fonts. https://fonts.google.com/specimen/JetBrains+Mono?preview.text=Bug%20Bounty%20Brokers&classification=Monospace.

Slider Revolution. https://www.sliderrevolution.com/resources/css-animated-background/.

Sequelize Documentation. (n.d.). https://sequelize.org/docs/v6/getting-started/.

Bootstrap Documentation. (n.d.). https://getbootstrap.com/docs/5.3/getting-started/introduction/.

Handlebars.js Documentation. (n.d.). https://handlebarsjs.com/guide/builtin-helpers.html#built-in-helpers.


## License
[![License](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)

This app is licensed under the WTFPL license. Information on the license can be found online at http://www.wtfpl.net/about/ or by clicking the badge above.

## Questions
GitHub Repo: https://github.com/alexilson/Bug-Bounty-Brokers

Alex Ilson

GitHub: https://github.com/alexilson

Email: ilsonalex@gmail.com


Spencer Cox

GitHub: https://github.com/spencox

Email: spencox@gmail.com

Yvette Carbajal

GitHub: https://github.com/YvetteCarbajal

Email: yvettemcj@gmail.com