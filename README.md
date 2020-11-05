# Marvel-Auctioneers

<br>

## Description

Marvel Auctioneers is an online auctions app for Marvel comics. It allows users to sell and buy their domics.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Home** As an anon I can browse throught the list of ongoing comics sales without redirecting to comic details.
-  **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my backlog
-  **Login:** As a user I can login to the platform so that I can start creating and managing my backlog
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Filter sales** As a user/anon I can filter ongoing sales depending on title, date release and main characters.
-  **Sell comic** As a user I can create a sale so other users can bid within a time frame.
-  **Delete elements** As a user I can delete sales or bids that are created by me.
-  **Check profile** As a user I can check my profile and add credit to their wallet.

## Backlog

- Wishlist
- Recommendations from friends
- CheckOut Form
- Comics media

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | NavBar, ElementList, FooterBar | public `<Route>`            | Home page                                                     |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/buy/search`           ` | SearchForm, SearchResults      | public `<Route>`            | Shows lastest open comic sales                                |
| `/aboutus`                | businness info                 | public `<Route>`            | shows info and contact(map)                                   |
| `/buy/:saleId`            | Sale Details, bidder chart     | user only `<PrivateRoute>`  | Shows bids on sale and form to bid for it                     |
| `/sell/create`            | Add-Form for a new sale        | user only `<PrivateRoute>`  | Create a sale                                                 |
| `/sell/:saleId`           | Sale Details, bidder chart     | user only `<PrivateRoute>`  | Shows detail for sale and close sale optio                    |  
| `/profile`                | Profile, MyBids                | user only  `<PrivateRoute>` | Check profile                                                 |
| `/profile/edit`           | Edit profile info and credit   | user only  `<PrivateRoute>` | Edit form and add credit to wallet                            |
| `/profile/my-bids`        | list ongoing and closed sales  | user only `<PrivateRoute>`  | Shows all sales related to user                               |


          

## Components

- LoginPage

- SignupPage

- NavBar

- FooterBar

- BannerBox

- SalesList

- SaleDetail

- SearchForm

- SearchResults

- BidderChart

- Bid-Form

- Add-Sale

- ProfilePage

- MyBidsChart



  

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Main Service
  - .filter(title, character, event) 
  - .detail(id)
  - .add(id)
  - .delete(id)
  - .update(id)
  
- External API
  - API for Marvel Comics


<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  wallet: {type: Number, required: true}
  sales: [{type: Schema.Types.ObjectId,ref:'Sale'}]
}
```



Sale model

```javascript
 {
   title: {type: String, required: true},
   state: {type: enum["good", "standard", "bad"], required: true}
   Issue Nº: {type: String, required: true},
   image: {type: String, required: true}
   description: {type, String, required: true}
   seller: {type: Schema.Types.ObjectId,ref:'User'},
   starting_price: {type: Number}
   bids[{user:{type: Schema.Types.ObjectId, ref: 'User'}, bid_price:{type:Number}}]
 }
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/buy/search`                 | {title, character, event}        |            | 400          | Search sales list                                        |
| GET         | `/buy/:saleId`                 | {title,starting_price,desc} |                | 400          | Show series elements         |
|POST         | `/sell/create  `              |                              |                |              | Add-form for a new sale                                      |
|POST         | `/sell/:saleId`              |                              |                |              | update or delete sale                                         |
| POST       | `/profile/edit`                        |                              | 201            | 400          | edit account info, add credit                    |
| GET      | `/profile/mybids`                 |                              | 201            | 400          | delete element                                               |

                               |



<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PuNMiqaT/marvel-auctioneers) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/jorgeberrizbeitia/backlog-quest)

[Server repository Link](https://github.com/jorgeberrizbeitia/backlog-quest-server)

[Deployed App Link](https://backlog-quest.herokuapp.com/login)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)
