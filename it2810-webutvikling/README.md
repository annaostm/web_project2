# IT2810-Webutvikling

## Project 2 - Gitlab Repository

The code implemented by the team is in the src folder.

## Start the server

The package contains npm. To run the application, start in the root file, "IT2810-WEBUTVIKLING" and run `npm install` (short: npm i) in the terminal to install the packages and then `npm run start` to start the React-app.

## Run tests

Jest is included in the react-script, it is easy to make and run tests with it. To run the jest test for this project, type in `npm test` in the termminal when in project folder.
# Documentation for Project 2

The documentation is written by the teammembers of group 45. The code written in this project can be found in the src folder. The task description has given the group a clear framework and opportunities during the process for this application. This has increased the efficiency of the group during discussions in meetings and when programming together.

## Requirements for functionality

Project 2 is based on the descriptions of requirements for functionality and technology. Therefore the choices done by the team is not entirely decided by them, the team were rather guided by the task of this course. But the functionality related to the components in this project is choosen by the team.

### Parameterized

Parameterization is the consistent part we have across our application through the Gitlab API. The team has implemented it to return the Gitlab data, different types, applied by the user. The parameterization consist of filtering on members in the repository and on date. When you type in project id and access token, the project repository title and the members are displayed under.

#### Branches

When "Search" for the repository is clicked, there is an option to click on "Branches" if the user wishes to display all the branches in this repository. The user can also filter on a date to see which of the branches already displayed were created then, and also type in a member to see which branch they have created that day. The user can also "Reset" the date by choice. The user can also pick only 1 of the filters if thet want to.
The branch cards are rendered with the data branch-name, which member created the branch and the date of when this branch was created. These cards of data are displayed in a grid with CSS grid.

#### Issues

When the user chooses "Issues", a list of issues are displayed with the state "closed". This is the default value. The team agreed to have this as default, because the user usually would like to see the tasks that were completed before seeing the tasks that are uncompleted. This is first to get an overview over their own project. 

They can then filter on which date an issue was created. Going further, the user can choose if they want to still see all closed issues or open issues on that date specific date by the interaktive radiobuttons. The user can also "Reset" the date by choice. The user can also choose to generally see all closed or open issues, independent of the date.
The issue cards are rendered with the data issue-name, issue-id, the state of the issue being closed/open and the date of which the issue was created. 

#### Commits

If the button "Commits" is clicked, all the commits for their main branch in the repository is displayed. The user can then choose the wanted date to see which commits were made that day. To get the date choosen by the user, the "datepicker" API were used by the team because it gives an simple calender to interact with as an user using this application. Based on the commits that day, the user can also enter the member they want to see made a commit that specific day in the main branch. The user can also "Reset" the date by choice.
The commit cards are rendered with the data commit-name, date of which the commit was made, commit-id and the name of the member creating the commit.

#### Merge Requests

If the user want to see the merge requests for the repository, they click the "Merge Requests" button after the project id and access token is typed and searched. When the merge requests are displayed as a list, the defualt value for the radiobuttons are "Closed". The team choose this to be the default value because it is a natural instinct for the user to first see the requests that are done and ready to be merged into the repository. 

If wanted, the user can click on the radiobuttons "Merged" to see which merge requests are merged and is not a task anymore, or "Open" to see which merge requests are open and ready to be read and merged by the group/user. The user can also choose which date they want to see the merge requests with the "closed" filter as default here aswell. Further, they can, based on a date, filter on "Merged" or "open" to see which merge requests are merged or open on that specific date. The user can also "Reset" the date by choice.

The merge requests cards are rendered with the data merge request-name, merge request-id, state of if it is merged, closed or open and the date of which the merge request were created.

### Storage

Using localStorage and sessionStorage is an effecient way to store data locally in the browser, without having to use cookies, which have a lower storage limit and can affect the performance of the website.
We have chosen to implement a solution where the ID for the repository is stored with localStorage, so that there is no expiration, and the user can close the window and leave the site without having to type the Project ID in again.
For security reasons, we have chosen that the access Token will be stored with sessionStorage. The user can use the site and refresh without having to retype the access token within the same session. We consider it most secure if the user has to provide the access token every time they close the tab and start a new session, since the information and token name could be private.

In addiotion, the group has chosen to add the functionality that allows the user to select darkmode or lightmode throughout the application using localStorage. When a user chooses to press that he wants to present the page in dark mode, a Boolean value will be stored in localStorage, and this value will determine which CSS classes are used in each individual component to provide either a light theme or dark theme. The group considered it natural that the choice of darkmode should be saved permanently as this will make it more user-friendly for the user, but also because it is an easy way to show use of the technology requirement.

## Requirements for technology

For this project we have used React with TypeScript. Although Typescript may be challenging at times, it has multiple benefits, such as predictability of values. Class components were used to make and handle CostumButton, which you can read more about under 'Functional component vs Class component'. We also used Context API to make Darkmode, which is further elaborated under 'Use of Contect API'

### Handling props and states with React

In order to handle internal states in each individual react component, the hook 'useState' was used for functional components. In the class component we used the principles of the life cycle of class-based components to handle states.To share states between multiple components and functions, the React Conext API was used. More details on how the React Context API was used, can be found under 'Use of Contect API'.

Props were primarily used to send data or callback functions down a component tree. Primarily when the parent component that uses the child component sent relevant data that is desired to be displayed in the component. We also attempted to modularize as much as possible so that each resource is abstracted into components rather than having many html elements in one component. For example, control elements such as buttons, CustumButtons, textfields are abstracted into components which can then be reused in the other components/functions.

### Fetch for API's

We chose to use the built in function 'fetch' for fetching of data. We contemplated using the external library axios for fetching, which allows automatic transforming of json data. On the other hand, in this method we have to do a two-step-process to first make the request, before we can call the json-method. This can make the functions burdensome, reducing the readability and developer speed. Since there wouldn't be many fetch-definitions in the project, we found fetch to be suitable for our needs. This way, we avoided adding more dependencies to our project.

### Use of Contect API

To share states between multiple components or values, the React Conext API was used. Sensible use of the context API is when several components need access to the same values, which can be variables or functions. In this project, we used the Context API to set Darkmode for the entire page. This choice was made because when the user presses darkmode, all the components must be updated with a new color-scheme. Therefore, the best solution was to store a set function and the state itself in a common context called 'ThemeContext' which the components can use via calls to 'useContext'.

### Functional component vs Class component

An example of a class-based React component is shown in the project, namely the 'CostumButton'-component in the 'button.tsx'-file. In this class component we have used props, which are like function arguments which are sent into the component as attributes. There is also a constructor() function in the component which will be called when the component gets initiated. Because we have a contructur function, the props are passed to the constructor and also to the React.Component via the super() method. The internal setState method in a class-based component and the field state correspond to the use of 'useState' in functional components, where these handle states locally in the component they are defined in. This means that a state defined in 'this.state' will not be available outside the class component in which it is defined, the same applies to states defined via the 'useState' hook. 

The rest of the components in the project are implemented as functional components because it is easier, and the latest custom in React. A combination of ordinary javascript functions and arrow functions has been used as a consequence of different students working on the same project. In retrospect, we should have stuck to a standard.

### Responsive design

The team has used 900px as breakpoint for tablet version and 500px as breakpoint for mobile version of the application. Media-queries with breakpoints at 900px and 500px were used to implement the layout for the tablet and the mobile version. The team choose 2 breakpoints so that there will be a smoother transition from the different screen sizes. Viewport was also used to give the components with a background a smoother scaling when the screen shrunk. Both max-width with "vw" and max-height with "vh" were used to let the width and height increase or decrease smoothly responding with the screen changes.

The component itself consists of multiple elements that are placed inside of a grid to give an good structure and to divide the screen equally between the elements. On mobile and tablet the login-form, which is the main component in the application, is displayed with CSS flex, because it gives a responsive layout when it is a 1 dimension. Other components, which consists of multiple elements, like the grid-buttons with the 4 parameter buttons, uses CSS Grid, because we want to give the 4 buttons a more structured layout when on mobile or tablet version. Otherwise the buttons would be placed one and one under each other, but that takes to much unnecessary space on the screen, when you could rather have the buttons two and two under each other.

In the breakpoints, the font size is also taken in reconsideration when the screen shrinks. This is available in the CSS files of the components and App.css and input.css. To give the application a more interactive touch and useroriented experience, the text on the header, on the project-info displayed and on the data cards displayed for the parameters, hovers to Gitlabs orange color. The team has used Gitlabs color scheme throughout the application. The button component used on all buttons in the application also have the Gitlab scheme, aswell as a transformation and transition to give it a more responsive touch when the user hovers over them.

The Gitlab logo in the right side of the header increases on hover and shrinks back when mouse leaves the logo. This gives the user a playful and interactive session with the application. The Gitlab logo has smaller width on the mobile and tablet version to give a right feeling of proportions compared to the other elements on the side.

## Requirements for testing

React components are tested using the jest framework. Snapshot tests are implemented to verify that each component renders correctly and has the correct Html hierarchy. Snapshot test work by rendering individual components and comparing the rendering to a snapshot file stored in the __snapshots__ file in the test module.
