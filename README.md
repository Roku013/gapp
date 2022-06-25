# Gapp

## Client

### Pages

- Home/Login - Allows visitor to log into existing account.
  - Register - Allows visitor to create new account.
- Profile - Display profile details
  - Edit profile - Edit user details
- Groups - display all chats
  - Single group - Display single chat
    - Create event - create event inside the group
  - Create group - Create a group
- Events - Display users events

### Services

- listPets - issues GET to '/profile/list' - List all profiles.
- loadProfile - issues GET to '/profile/:id' - Load details on a single profile.
- editProfile - issues PATCH to '/profile/:id' - Edit single profile.
- deleteProfile - issues DELETE to '/profile/:id' - Delete single profile.

- listgroups - issues POST to '/group' - list all groups.
- creategroup - issues POST to '/group' - Creates single group.
- loadgroup - issues POST to '/group' - load single group.
- editgroup - issues POST to '/group' - edit single group.
- deletegroup - issues POST to '/group' - delete single group.

- registerUser - issues a POST to '/authentication/sign-up' - Registers new user.
- logInUser - issues a POST to '/authentication/sign-in' - Authenticates existing user.
- signOutUser - issues a POST to '/authentication/sign-out' - Signs out user.
- loadUserInformation - issues a GET to '/authentication/me' - Loads information about authenticated user.

## Server

### Model/Schema

#### User

- name - String, required
- Email -
- Password -
- Image -
- Groups - [object_id of groups]

#### Group

- description
- name
- Image
- creator: userID

#### Event

- Group_Id
- name
- description
- location
- Image
- Date
- Time
- creator: userID

### Participations

- UserID
- EventId

### How do I retrieve:

- All the events within a group? Event.find({group_id: 123})
- All the events of a particular user? Participation.find({userID: query}).populate()

### Routes

- GET - '/' - Home page - Login
- GET - '/Profile/:id' - Load details of the user.
- PATCH - '/Profile/:id' - Edit user profile.
- DELETE - '/Profile/:id' - Delete single pet.

- GET - '/group' - List of all groups
- GET - '/group/create' - dispaly form to create a group
- POST - '/group/create' - create a group
- GET - '/group/:id' - load single group chat.
- PATCH - '/group/:id' - edit single group chat.
- DELETE - '/group/:id' - Delete single group.

- GET - '/event' - List of all events
- GET - '/event/:id' - display single event
- GET - '/event/create' - dispaly form to create a event
- POST - '/event/create' - create an event
- PATCH - '/event/:id' - edit single event.
- DELETE - '/event/:id' - Delete single event.

- POST - '/authentication/sign-up' - Registers new user.
- POST - '/authentication/sign-in' - Authenticates existing user.
- POST - '/authentication/sign-out' - Signs out user.
- GET - '/authentication/me' - Loads information about authenticated user.
