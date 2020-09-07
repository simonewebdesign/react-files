## React Files

A performant app that simply retrieves a list of files and displays them.

You can sort and/or filter them based on any attribute (e.g. name, size, etc.).

Everything is unit tested.

I chose Redux for state management, even though it felt a bit overkill, mostly because it's the library I'm most familiar with and it's simple enough. I considered using something simpler such as the context API, but I wanted to make it robust from the beginning. I didn't add any Redux middleware (except for redux-thunk that comes with redux tools) for the same reason.

The searching/filtering isn't debounced on purpose. Normally I would debounce any search field, but in this case the filtering is happening client-side, so there's no need.

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Below you will find some simple information about how to run the app and make changes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run api`

A fake API service (using [json-server](https://github.com/typicode/json-server)) is available at [http://localhost:3003/files](http://localhost:3003/files). For details of the available API Methods, please read the [json-server](https://github.com/typicode/json-server) documentation.
