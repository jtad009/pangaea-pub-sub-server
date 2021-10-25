## Publisher Server
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Setup](#setup)
4. [Installation & Configuration](#installation-and-configuration)
5. [Testing](#testing)
6. [Security Vulnerabilities](#security-vulnerabilities)

### Introduction

This project houses a pub / sub system using HTTP requests, this projects uses docker to boot up two containers connected via custom_network. Subscriber running on port 9000 and the Publisher running on port 3000

This project uses sqlite database to hold subscriber information. it employ queue that have a 10s delay to deploy http requesut to subscribers and logs the ok reesponse from subscribers.

After starting the app, Visit ``` http://localhost:3000/api ``` to publish or subscribe 

Subscriber  endpoint  ``` http://localhost:9000/```

### Technologies

- [Nestjs](https://www.nestjs.com//)
- [redis](https://www.redis.com/)
- [Docker](https://www.docker.com/)
- [typeorm](https://www.npmjs.com/package/typeorm)


### Setup

**Pre-requisites:**

#### With Docker
* **Docker**: Install [Docker](https://docs.docker.com/get-docker/)
* **For MySQL users**: 5.7.23 or higher.
* **For MariaDB users**: 10.2.7 or Higher.


**Configure your database:**

Find file **.env** or create one in your root directory and set the environment variables listed below:

* **PORT**
* **APP_PREFIX**
* **REDIS_HOST**
* **REDIS_PASSWORD**
* **REDIS_PORT**
* **REDIS_HOST_PORT**
* **CACHE_TTL**
* **MAX_ITEM_IN_CACHE**
* **SUBSCRIBER_PORT**

**Note:**
If you are using Docker and your database is on the same machine, use **docker.host.internal** as the **DB_HOST**

**Change Workspace:**

### Installation
**To start your application**:

#### With Docker

Find file **docker-compose.yml**, **docker-compose-production.yml** and **docker-compose-testing.yml** in your root directory:

##### On server:

The production docker-compose file pulls the latest changes directly from your repository. Find file **docker-compose-production.yml** and set the environment variables listed below:

* **GIT_OAUTH2_TOKEN**
* **REPOSITORY_URL**
* **GIT_BRANCH**

Then run the command below:

```
docker-compose -f docker-compose-production.yml up
```

##### On local:

```
docker-compose up
```

Visit ``` http://localhost:3000/api ``` to publish or subscribe 

### Testing

Find file **.env.test** in your root directory and set the environment variables listed below:

* **DB_CONNECTION**
* **DB_HOST**
* **DB_PORT**
* **DB_DATABASE**
* **DB_USERNAME**
* **DB_PASSWORD**

**Note:**
If your database is on the same machine, use **docker.host.internal** as the **DB_HOST**

```
docker-compose -f docker-compose-test.yml up
```

This project uses Jest for testing.  For more information on how to use jest for testing, visit [Jest](https://jestjs.io/) official website.

### Security Vulnerabilities

If you discover a security vulnerability within this project, please send an e-mail to me [jtad009@gmail.com](mailto:jtad009@gmail.com). All security vulnerabilities will be promptly addressed.

