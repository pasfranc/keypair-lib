# Keypair lib

Component to generate and regenerate a keypair, in a deterministic and private way.
The cryptographic part consists of two [Zenroom](zenroom.org) smart contracts, the first executed server-side to generate a seed (based on public data such as user name), the second generate client side, based on the output of the first smart contract and on private information, namely "The challenges". 

## Installation

```bash
npm i keypair-lib
```

## Usage

```ts
import { getSafetyQuestions } from 'keypair-lib'

getSafetyQuestions('en_GB'); 
```
outcome:

```json
{
    "question1":"Where my parents met?",
    "question2":"What is the name of your first pet?",
    "question3":"What is your home town?",
    "question4":"What is the name of your first teacher?",
    "question5":"What is the surname of your mother before wedding?"
}
``` 

```ts
import { createPBKDF } from 'keypair-lib'

const userData = {
    username: "JohnDoe",
    email: "john@doe.com",
    phone: "12345678",
};

const data = await createPBKDF(userData);
```
content of data will be:

```json
{
   "key_derivation": "IF+tlV3TquNpuXVheRz8vKwkD567Nf9YzrI/AIi5Yr0gX62VXdOq42m5dWF5HPw="
}
``` 

```ts
import { sanitizeAnswers } from 'keypair-lib'

const answers = {
    question1: "L'Aquila",
    question2: "C arl",
    question3: "88 ggg",
    question4: "null",
    question5: "null",
};

sanitizeAnswers(answers);
```
outcome:

```json
{
    "question1": "laquila",
    "question2": "carl",
    "question3": "88ggg",
    "question4": "null",
    "question5": "null",
}
``` 

```ts
import { recoveryKeypair } from 'keypair-lib'

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const username = "user";

const data = await recoveryKeypair(answers, PBKDF, username);
```
outcome:

```json
{
    "hashedAnswers": {
        "question1.hash": "XdJytPMWt3anuOPQiUs34eQr49XTsgS4pYNsxQWXprE=",
        "question2.hash": "2hauYmg/8TGnG5IeCTzlFKHvw1XpxbKaMdmEUbUNQ2c=",
        "question3.hash": "ABPAH+DQlCCbi9PSO4+W26vNAd3SoDnuuoLRiRrPDWE=",
        "question4.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
        "question5.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
    },
    "user": {
        "keypair": {
        "private_key": "VUVdIyPeC+x3o66b+n06Jxc4c3p9TBFfaSiaEPx5FmI=",
        "public_key":
            "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=",
        },
    },
}
``` 

```ts
import { verifyAnswers } from 'keypair-lib'

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const publicKey =
    "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=";
const username = "user";

const data = await verifyAnswers(answers, PBKDF, username, publicKey);
```
outcome:

```json
true
``` 

To configure backend environment variables please put an .env file at the top of your project like this or rename .env.sample to .env: 

```json
#BACKEND CREDENTIALS
BACKEND_PRIVATE_KEY=Aku7vkJ7K01gQehKELav3qaQfTeTMZKgK+5VhaR3Ui0=
BACKEND_PUBLIC_KEY=BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI=
BACKEND_PASSWORD=myVerySecretPassword

#CHANGE HERE TO OVERRIDE THE CONTRACTS
SERVER_SIDE_CONTRACT=zencode/Keypair-Creation-Server-Side.zen
CLIENT_SIDE_CONTRACT=zencode/Keypair-Creation-Client-Side.zen

#CHANGE HERE TO OVERRIDE FOLDER OR FILENAME default: prop/questions-en_GB.json
QUESTION_FOLDER=props/
QUESTION_FILE_PREPEND=questions-
``` 
 
 