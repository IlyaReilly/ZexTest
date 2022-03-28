You need to create a cypress.env.json in order to override cypress default configuration in order to run your tests.

An example of env configuration you might need is:

{
"baseUrl": <server-to-test>,
"username": <your-username>,
"password": <your-password>
}

Then you can import those env variables in your test files:
const { baseUrl, username, password } = Cypress.env();

You can add all the variables you need in order to make your test work.


To write your tests check the following links.

Write your first test:
https://docs.cypress.io/guides/getting-started/writing-your-first-test#Write-your-first-test

Bundled tools:
https://docs.cypress.io/guides/references/bundled-tools#Mocha

Assertions:
https://docs.cypress.io/guides/references/assertions#Chai

Organize tests:
https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Configuring-Folder-Structure