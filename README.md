# Table of Contents

* [Introduction](#introduction)
  * [Features](#features)
* [Documentaion](#documentation)

# Introduction

NodeJS application to provide REST APIs for a messaging application.

## Features

* [login](#login)
* [register](#register)
* [send message](#send-message)
* [inbox](#inbox)
* [block user](#fetch-n-random-thoughts-of-a-particular-topic)

# Documentation

**Base URL:** `https://messaging-node-api.herokuapp.com/v1`

## Login

Should authenticate and log in user

* **URL**

  `/login`

* **Method**

  `POST`

- **Success Response**

  * **Code:** 200 OK
  * **Content:**

    ````
    		```json
    		{
    		    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImltcmFqc2luZ2giLCJmdWxsTmFtZSI6IlJhaiBTaW5naCIsIl9pZCI6IjVhYjczZmU4Njc1M2RmMjMyYjM2OWNkYSIsImlhdCI6MTUyMTk2OTI1OH0.swz2hnvaA25FsZCYNU1bg-RG3bGNeyF0OfIa9_wdR7M"
    ````

    }
    ```

- **Error Response**

  * **Code:** 401 Unauthorised
  * **Content:**

    ````
    		```json
    		{
    		    "message": "Authentication failed. Invalid username or password."
    ````

    }
    ```

- **Sample Call**
  `curl -H "Content-Type: application/json" -X POST -d \ '{"username": "imshubhamsingh1","password": "welcome@54321"}' \ --url https://messaging-node-api.herokuapp.com/v1/login`

## Register

Allows user to register herself on the platform with basic information

* **URL**

  `/register`

* **Method**

  `POST`

- **Success Response**

  * **Code:** 200 OK
  * **Content:**

    ````
    		```json
    		{
    		    "message":"User successfully registered"
    ````

    }
    ```

- **Error Response**

  * **Code:** 400 Bad Request
  * **Content:**

    ````
    		```json
    		{
    		   "message": {
    "errors": {
        "username": {
            "message": "Error, expected `username` to be unique. Value: `imshubhamsingh`",
            "name": "ValidatorError",
            "properties": {
                "message": "Error, expected `{PATH}` to be unique. Value: `{VALUE}`",
                "type": "unique",
                "path": "username",
                "value": "imshubhamsingh"
            },
            "kind": "unique",
            "path": "username",
            "value": "imshubhamsingh",
            "$isValidatorError": true
        }
    },
    "_message": "User validation failed",
    "message": "User validation failed: username: Error, expected `username` to be unique. Value: `imshubhamsingh`",
    "name": "ValidationError"
    ````

    }  
     ```

- **Sample Call**
  `curl -H "Content-Type: application/json" -X POST -d \ '{"firstName": "Shubham","lastName":"Singh","username": "imshubhamsingh1","password": "welcome@54321"}' \ --url https://messaging-node-api.herokuapp.com/v1/register`

## Send Message

Allows user to send message to another user

* **URL**

  `/sendmessage`

* **Method**

  `POST`

- **Success Response**

  * **Code:** 200 OK
  * **Content:**

    ````
    		```json
    		{
    		    "message": "Message successfully send"
    ````

    }
    ```

- **Error Response**

  * **Code:** 404 Not Found
  * **Content:**

    ````
    		```json
    		{
    		  "message": "No such User"
    ````

    }  
     ```

  * **Code:** 400 Bad Request
  * **Content:**

    ````
    		```json
    		{
    		  "message": "err ..."
    ````

    }  
     ```

  * **Code:** 550 Permission Denied
  * **Content:**

    ````
    		```json
    		{
    		  "message": "Cannot send message as you are blocked"
    ````

    }  
     ```

- **Sample Call**
  `curl -H "Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imltc2h1YmhhbXNpbmdoIiwiZnVsbE5hbWUiOiJTaHViaGFtIFNpbmdoIiwiX2lkIjoiNWFiNzc5YzRjMDg2MGYwMDNkMzA3OGI1IiwiaWF0IjoxNTIxOTc2MTg2fQ.uUIVoLN_SWQAYSRgoWvVjU6ENBrdE1gm47CFg9dBQHY" -X POST -d \ '{"to": "imshubhamsi","subject": "testing API","message": "hi"}' \ --url https://messaging-node-api.herokuapp.com/v1/sendmessage`

## Inbox

Returns all messages sent to the logged in user

* **URL**

  `/inbox`

* **Method**

  `GET`

- **Success Response**

  * **Code:** 200 OK
  * **Content:**

    ````
    		```json
    		[
    		    {
    "to": "imshubhamsingh",
    "from": "wesbos",
    "subject": "testing API",
    "message": "hi"
    		   }
    ````

    ]
    ```

- **Error Response**

  * **Code:** 400 Bad Request
  * **Content:**

    ````
    		```json
    		{
    			"message":  "No token provided"
    ````

    }  
     ```

  * **Code:** 401 Unauthorised
  * **Content:**

    ````
    		```json
    		{
    			 "message": "Failed to authenticate token"
    ````

    }  
     ```

- **Sample Call**
  `curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imltc2h1YmhhbXNpbmdoIiwiZnVsbE5hbWUiOiJTaHViaGFtIFNpbmdoIiwiX2lkIjoiNWFiNzc5YzRjMDg2MGYwMDNkMzA3OGI1IiwiaWF0IjoxNTIxOTc2MTg2fQ.uUIVoLN_SWQAYSRgoWvVjU6ENBrdE1gm47CFg9dBQHY" \ -X GET --url https://messaging-node-api.herokuapp.com/v1/inbox`

## Block User

Allows logged in user to block another user from sending messages to them

* **URL**

  `/block/:username`

* **Method**

  `POST`

- **Success Response**

  * **Code:** 200 OK
  * **Content:**

    ````
    		```json
    		{
    		    "message": "User Blocked successfully"
    ````

    }
    ```

- **Error Response**

  * **Code:** 400 Bad Request
  * **Content:**

    ````
    		```json
    		{
    		  "message": "err ..."
    ````

    }  
     ```

  * **Code:** 404 Not Found
  * **Content:**

    ````
    		```json
    		{
    		  "message": "No such user exists"
    ````

    }  
     ```

  * **Code:** 550 Permission Denied
  * **Content:**

    ````
    		```json
    		{
    		  "message": "Cannot Block yourself"
    ````

    }  
     ```

- **Sample Call**
  `curl -H "Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imltc2h1YmhhbXNpbmdoIiwiZnVsbE5hbWUiOiJTaHViaGFtIFNpbmdoIiwiX2lkIjoiNWFiNzc5YzRjMDg2MGYwMDNkMzA3OGI1IiwiaWF0IjoxNTIxOTc2MTg2fQ.uUIVoLN_SWQAYSRgoWvVjU6ENBrdE1gm47CFg9dBQHY" -X POST \ --url https://messaging-node-api.herokuapp.com/v1/block/abc`
