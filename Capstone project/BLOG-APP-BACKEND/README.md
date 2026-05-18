### Backend development

1.create git repo
    git init
2. Add .gitignore
3. Create .env file for environment variables & read data from .env with "dotenv" module
4. Generate package.json
5. create express application server
6. connect to data base
7. Add middle wares error handling and body parsing middle ware
8. design schema and model

.cookies are attached to request
.  1  client------>request--->loginRoute
   2  login----->token stored--->cookie storage
   3  login----->responce sccessful login ---->client

   1  client --->crud operation req---->route
   2  cookie---->attaches--->request
   3  

// function declaration vs function expression


Backend development
Create git repo git init

Add .gitignore file

Create .env file for environment variables & Read data from .env
with "dotenv" module npm install dotenv

Generate package.json

Create express app

Connect to Database

Add middlewares( body parser, err handling middlewares)

Design Schemas and create models

Design REST APIs for all resources

Registration & Login
Registration & Login in common for USER & AUTHOR. Create a seperate service to reuse

The Client wont send role. It just redirects to a specific API based on role selection. The hardcoded role assigned by API routes.