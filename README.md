# This is Back End application in my exercises in vue and prime vue

The standard Node.js express application which represents Rest API to dials with "todo list".

The **todo list** is setuated in json-file in **public/data** folder

There are 4 methods

## Get the  list  of todos **GET /todo**

- Method http get
- path /todo
- response OK

```json
[{
  "id": 26439,
  "user_id": 5132794,
  "title": "!!!!!!!!!!!!Amissio aspicio utor triumphus deinde.",
  "due_on": "2023-09-27T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26430,
  "user_id": 5132775,
  "title": "Labore theatrum fuga dolore ambulo texo.",
  "due_on": "2023-09-23T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26424,
  "user_id": 5132764,
  "title": "!!!Currus solio creta trado contigo varietas vix auctor.",
  "due_on": "2023-09-22T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26422,
  "user_id": 5132761,
  "title": "Conturbo despirmatio subnecto aranea cum adicio patrocinor coma tenus.",
  "due_on": "2023-09-23T00:00:00.000+05:30",
  "status": "completed"
}, {
  "id": 26420,
  "user_id": 5132757,
  "title": "Ascit strenuus cresco pecunia tutamen aeneus.",
  "due_on": "2023-09-29T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26419,
  "user_id": 5132756,
  "title": "Commodo inventore suadeo ut vesica aut.",
  "due_on": "2023-09-27T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26408,
  "user_id": 5132727,
  "title": "Vix suasoria sequi timidus depraedor turba alter omnis vis.",
  "due_on": "2023-10-09T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26407,
  "user_id": 5132725,
  "title": "Tero thema congregatio ut atrocitas quia aurum.",
  "due_on": "2023-10-03T00:00:00.000+05:30",
  "status": "completed"
}, {
  "id": 26405,
  "user_id": 5132721,
  "title": "Aureus deleo socius cunctatio carus.",
  "due_on": "2023-10-04T00:00:00.000+05:30",
  "status": "pending"
}, {
  "id": 26394,
  "user_id": 5131584,
  "title": "Cruentus quisquam cilicium sublime ventus.",
  "due_on": "2023-09-26T00:00:00.000+05:30",
  "status": "completed"
}]
```

## Add a new record in the  list  of todos **PUT /todo**

- Method http put
- path /todo
- request

``` json
{
   "user_id": 5131584,
  "title": "Cruentus quisquam cilicium sublime ventus.",
  "due_on": "2023-09-26T00:00:00.000+05:30",
  "status": "completed"
}

```
- response OK

```json
{
  "ok": true,
  "id": 26424
}

```

Id calculated  as max id value in the list of objects.


## Edit a  record in the  list  of todos **POST /todo**

- Method http post
- path /todo
- request

``` json
{
  "id": 26424,
  "user_id": 5131584,
  "title": "Cruentus quisquam cilicium sublime ventus.",
  "due_on": "2023-09-26T00:00:00.000+05:30",
  "status": "completed"
}

```
- response OK

```json
{
  "ok": true,
  "id": 26424
}

```

## Delete the  record  from the list of todos **delete /todo/:id**

- Method http delete
- path /todo/:id
- response OK

```json
{
  "ok": true,
  "id": 26424
}

```

## Start on your laptop

- clone the repository
- install dependensy

```bash
npm install
```
- start 

```bash
npm start
```

The application is accessed on url: http://localhost:8081/

The port could be changed  in .env file

- .env

```text
## local config
PORT=8081

```

