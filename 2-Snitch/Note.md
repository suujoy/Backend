# Snitch Notes ~

## Backend

1. Create a Backend Folder
2. Setup The Node js `npm init-y`
3. Install Packages ` mongoose express dotenv jsonwebtoken cookie-parser`
4. give task to codex `Setup express server with import statement and morgan loger and mongo db connect function`
5. Setup Basic Express server with mongodb connect 
6. Create a `config.js` file and `Store all Prosess.env variables inside it `
7. Create `Models` file inside it Create `user.model.js` 
8. Create a `userSchema` in The same file use `Bcrypt` for hashing password and compare password
9. Create `routes` file and `auth.routes.js` 
10. import `Router from express` then export it 
11. import inside `app.js` and use `authRouter`
12. `Validation` import express-validator
13. create a `validate` function and create `validateRagister`
14. use `validateRagister` in auth.routes.js file as middleware
15. error handler
16. register user `token create `