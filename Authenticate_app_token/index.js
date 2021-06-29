const dotenv = require('dotenv');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

dotenv.config();
let token = null;


const baseUrl = 'https://cdn.emnify.net/api/v1/';


async function getValidAuthToken(){
    let decodedToken = token == null ? null : jwt_decode(token); // If token exist, check whether it is valid
    let currentDate = new Date();
    if (decodedToken == null || decodedToken.exp * 1000 < currentDate.getTime()){
        token = await getNewAuthToken(); // if no token exist or token is not valid, get new token
    }
    return token;
}

async function getNewAuthToken(){
    return fetch(`${baseUrl}authenticate`, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
      body: `{\"application_token\":\"${process.env.APP_TOKEN}\"}` // Enter your application token in place of ${process.env.APP_TOKEN}
    })
    .then(result => result.json())
    .then(result => {
        console.log("Your token is : "+result.auth_token);
        return result.auth_token;
    })
}


async function app(){

    token = await getValidAuthToken();
    // Make API Call
}


app();

