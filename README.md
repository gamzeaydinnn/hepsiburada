# hepsiburada
Otomation System 
Hepsiburada E-Commerce Automation This project is an end-to-end test script that automates a complete shopping flow on Hepsiburada.com. Developed with Playwright, it simulates user actions from Browse categories and filtering products to managing the shopping cart.

✨ Features / Test Scenario Flow Navigates to the Hepsiburada homepage and accepts cookies.

Selects the "Electronics" category, then the "Computer/Tablet" sub-category.

Applies a price filter to show products between 25,000 TL and 30,000 TL.

Selects a specific product from the results.

Adds the product to the cart and navigates to the cart page.

Updates item quantity in the cart (increase and decrease) and verifies the changes.

Asserts the correctness of the product name and quantity.

Adds a second, recommended product to the cart.

Removes all items from the cart one by one and confirms the cart is empty.

🛠️ Tech Stack Testing Framework: Playwright

Language: JavaScript

Runtime: Node.js

Package Manager: npm

Environment Variables: dotenv

🚀 Installation and Setup To run this project on your local machine, follow these steps:

Clone the repository:

Bash

git clone Navigate to the project directory:

Bash

cd Install the necessary packages:

Bash

npm install Install Playwright browsers:

Bash

npx playwright install (Optional) Create an environment file: The login steps in the script are commented out. To use them, create a .env file in the project's root directory and add your credentials:

Kod snippet'i

MAIL="your_email@example.com" PASSWORD2="your_password" ▶️ Running the Test To execute the test script, run one of the following commands in your terminal.

Run in headless mode (no browser UI):

Bash

npx playwright test Run in headed mode (watch the browser automate live):

Bash

npx playwright test --headed 📝 Notes Selector Stability: The test relies on selectors specific to the current layout of Hepsiburada.com. Website updates may cause selectors to fail, requiring them to be updated in the script.

Commented Code: The script contains commented-out logic for user login and applying coupon codes. You can uncomment these sections to extend the test scenario.
