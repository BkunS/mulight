# mulight

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

Built package intends to run locally by directly opening /dist/index.html. If you want to put it on a http server such as nginx, please comment out `publicPath` in vue.config.js.

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## My Approach
```
Tech Stacks: Vue + Vuex + localforage + ElementUI.
Built with @vue/cli. Simple unit tests included.
The SPA contains three routes: "Questions List (index page)", "Questions Detail", and "Create Question".

Questions List: Display all questions in list.
Questions Detail: Display selected question with details such as vote number and percent, and users are allowed to vote for choices.
Create Question: Allow users to submit new questions for voting.
```

### Design and Reasons:
```
Since the mock data doesn't have many items and there's no way of doing "actual" paganization (doesn't know total pages and only page=1 works), SPA will only try to retrieve all questions once users go to the page for the first-time or they refresh the page (navigate back will not).

Although questions list contains all data for displaying individual question, voting numbers would be changing regularly, so SPA will retrieve latest individual question's data when displaying the question in detail page.

I've also implemented "Create Question" page where users could submit new questions. The "Create Question" endpoint would provide errors if number of choices is less than 2, so the page would start with two empty choices for users to fill or delete, and disable "Submit" button if there're not enough choices.

"Questions List" and "Selected Question" data is managed in Vuex store. "Selected Question" data is also stored in browser's local storage (IndexedDB) in case users refresh the page.
```

### Improvements Could be Done:
```
1. Optimization on data retrieving: paganization including "load on scrolling". I only use "get once for all" design because the mock data size is small. Once data size gets large in the future, paganization is a must.

2. Improvement how voting numbers are displayed when multiple users are voting at the same time. It would be confusing if one user votes a choice and the voting number increases more than 1 because other users are voting for it at the same time.

3. Searching for keywords before users create new questions so that users won't create duplicated or similar ones.
```
