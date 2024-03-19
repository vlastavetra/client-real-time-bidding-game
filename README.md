# Real Time Bidding Game

This game is an exciting real-time bidding platform where two users compete by placing bids within a set time limit. The challenge is to outbid your opponent by offering a higher price or greater quantity, all while racing against the clock.

**How to Play:**

1.  **Accessing the Game:**
    - Navigate to the game's website.
    - Log in or sign up to create a user account.
2.  **Starting a Bidding Match:**
    - Join a bidding match. You can start a new one or join an ongoing match.
    - Each match involves two players.
3.  **Placing Bids:**
    - Once the match starts, you will see an interface to submit your bid.
    - Enter your bid amount and submit before the timer runs out.
    - More bids! It’s not just the size that’s important, but also the quantity
4.  **Bidding Dynamics:**
    - Watch as bids from both players are updated in real-time.
5.  **Winning the Game:**
    - The winner is determined based on the highest bid in terms of price and quantity.
    - When the timer expires, the current highest bid wins the match.
6.  **Post-Match:**
    - The bid history, including prices, quantities, and the winner's details, are displayed.

**Features:**

- **User-Friendly Interface:** The game boasts a clean and intuitive React-based interface, making it easy to participate in matches.
- **Real-Time Updates:** Experience the thrill of live updates as bids from both users are displayed instantly.
- **Secure and Reliable:** Advanced error handling and validation ensure a secure and smooth gaming experience.

**Requirements for Playing:**

- A stable internet connection.
- Modern web browser.

### Video onboarding

[Link](https://www.loom.com/share/4d9f08bb9d46402b80d39f5a9b021739?sid=f62a1922-073a-43ee-9d4c-30affc01ea8b)

---

## How to run apps

### Install packages

```bash
npm i
# or
yarn i
```

### Getting Started

First, build:

```bash
npm run build
# or
yarn build
```

### Run app

```bash
npm run dev
# or
yarn dev
```

## Frontend Architecture Overview

The frontend architecture of this application adopts a classic modular approach, emphasizing reusability, maintainability, and scalability. This design strategy organizes the application into distinct, functional units, or "modules," which can be developed, tested, and debugged independently.

#### **Modular Structure**

- **Components**: The UI is built using self-contained components, each encapsulating a specific piece of functionality. This includes atomic components like buttons and text fields, as well as composite components like forms and data tables.
- **Pages**: Each page of the application is treated as a module, composed of various components. Pages represent screens in the application, such as the home page, login page, games catalog and personal pages for each game.
- **Services**: External interactions, such as API calls, are handled by service modules. These abstract the networking logic, making API calls and processing responses.

#### **State Management**

- Utilizing Redux Toolkit for efficient global state management, ensuring that the state is predictable and easy to manage across the entire application.
- Local state is managed within individual components using React's `useState` and `useContext` for passing data through the component tree without prop drilling.

#### **Routing and Navigation**

- The application leverages Next.js' powerful routing capabilities, enabling dynamic page routing and server-side rendering for improved performance and SEO.
- Client-side routing is handled efficiently to ensure seamless user navigation across different modules of the application.

#### **Data Fetching and WebSockets**

- Axios is used for data fetching from RESTful APIs, with modular service functions handling specific API endpoints.
- WebSocket integration for real-time functionalities like live bidding, where the WebSocket connection is established in relevant modules and managed for real-time data transmission.

#### **Styling and UI Consistency**

- Material-UI is used as the primary UI library, providing a consistent and responsive design system.

#### **Error Handling and Validation**

- Robust error handling strategies are in place, especially in service modules where API interactions occur.
- Frontend validation is implemented in forms to ensure data integrity before submission.

#### **Performance Optimization**

- Code splitting and lazy loading are used to optimize load times and performance.

#### **Security**

- Security considerations include safe handling of tokens and sensitive data.
- Input validation and sanitation to prevent XSS and CSRF attacks.
- Server-Side Authentication in Next.js: The application leverages Next.js's `getServerSideProps` for verifying user authentication on the server-side before rendering the pages. This approach ensures a higher level of security by validating the user's session on each page request.
