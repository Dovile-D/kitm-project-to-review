# Back-End environment requirements

- Node.js >= 16.10
- Latest stable version of yarn

## Installation

1. It's recommended to have nvm installed, so you can quickly change nodejs versions on your environment.

   Depending on your OS there is two links that can guide you with installation:

   - **Unix based**: <https://github.com/nvm-sh/nvm>

   - **Windows**: <https://github.com/coreybutler/nvm-windows>

2. After successfully setting up nvm:

   ```
   nvm install lts && nvm use lts
   ```

3. One of simplies method to get the latest stable version of yarn is:

   ```
   yarn set version stable
   ```

4. Simply run:

   ```
   yarn or yarn install
   ```

   inside of the root folder in the project to get all of the necessary dependencies.

5. Npm scripts like:

   ```
   yarn start
   ```

   should be working as usual from here.

6. Create .env file that includes (you dont need to use quotation marks for text after the equals symbol):

   ```
    DB_KEY = key to database
    PORT = 5000
    JWT_SECRET = any random text you can think off
   ```

## Issues with setting up the project

🚧🚧🚧

If you're experiencing any issues while spinning up the project do not hesitate and call for a help in our slack channel:

<https://kitmjs21.slack.com/archives/C036HREHRR7>

![Help](https://i.redd.it/pa73g98rqot41.png)

### Miscellaneous 🪁

- Once we have testing environment correctly set do not forget to include this line of code in: "package.json/lint-staged":

```
"yarn test --findRelatedTests"
```
# kitm-project-to-review
