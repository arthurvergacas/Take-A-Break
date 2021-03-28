# Take A Break

## Project based on the application Move.it, presented by [Rocketseat](https://rocketseat.com.br/) in the event [Next Level Week](https://nextlevelweek.com/)

### What is it?

**Take a Break** is an application similar to the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique), where the user can define a timer to take pauses while working. **Take A Break**, however, goes a step further. Using concepts of gamification, the application proposes physical activities in the format of challenges to be accomplished at the end of every cycle. If the challenge is successfully completed, the user will be rewarded with **Experience Points**, which can be then used to **Level Up**.

### How was it made?

While **Take A Break** was first designed to be an only-frontend application, new features created the necessity of a simple backend. Currently the backend is not yet implemented, but it is already in development. The technologies used were:

- **[React.js](https://reactjs.org/)**

- **[Next.js](https://nextjs.org/)**

- **[Typescript](https://www.typescriptlang.org/)**

- **[Material UI](https://material-ui.com/components/material-icons/)**

- **[Google OAuth2](https://developers.google.com/identity/protocols/oauth2)**

- **[Vercel](https://vercel.com/)**

- **[Yarn](https://yarnpkg.com/)**

- **[React Transtion Group](https://reactcommunity.org/react-transition-group/)**

### What are the addtionals features compared to the original Rocketseat's application?

#### **The original application (**Move.it**) included the following features:**

- Fixed timer (25 minutes) to every cycle

- Challenges, experience points and level system

- Hardcoded user profile

- Notification triggered when the cycle was completed

- Data serialization with cookies

#### **The modified application (**Take A Break**) include all of the above features, or a better version of them, as well as the following new:**

- Customizable timer (5 - 60 minutes)

- Login with Google to customize profile and, futurely, share data between devices

- Customizable logout profile

#### **Some features are still in development, such as:**

- Customizable offline profile picture

- Analytics page (hours worked, days that the user works more, etc)

- Dark theme

### Contributing

To start to work on this repository locally, do the following:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install yarn: `npm install -g yarn`
4. Install the dependencies: `yarn`
5. Run `yarn dev` to build and watch for code changes
6. Start coding!
