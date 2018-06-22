# [Restoracioj](https://translate.google.es/#eo/es/Restoracioj)

Technical backend test for Pedidos Ya

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/es/)

### Installing

Install dependencies

```
npm install
```

### Start server

```
npm start
```

Project should be available at [http://localhost:3000](http://localhost:3001)

## Running the tests

```
npm test
```

## Endpoints available

###### POST http://localhost:3001/restaurants
*Request body example:*
```
{
	"name": "Marrero's wraps",
	"description": "Best wraps in town",
	"opening_time": "12:00",
	"closing_time": "21:00",
	"phone": "097971462",
	"lat": "-34.8986819",
	"lng": "-56.1532894",
	"categories": ["3", "23", "16"]
}
```


###### GET http://localhost:3001/restaurants
*Response example:*
```
[
  {
    "name": "Marrero's wraps",
    "description": "Best wraps in town",
    "opening_time": "12:00:00",
    "closing_time": "21:00:00",
    "phone": 097971462,
    "lat": "-34.8986819",
    "lng": "-56.1532894",
    "categories": [
      {
        "id": 2,
        "name": "Cafetería",
        "description": null
      }
    ]
  },
  {
    "name": "Marrero's chivitos",
    "description": "Best chivitos in town",
    "opening_time": "12:00",
    "closing_time": "21:00",
    "phone": "097971462",
    "lat": "-34.8986819",
    "lng": "-56.1532894",
    "categories": [
      {
        "id": 3,
        "name": "Calzones",
        "description": null
      }
    ]
  }
]
```


###### GET http://localhost:3001/restaurants/:id
*Response example:*
```
{
  "name": "Marrero's wraps",
  "description": "Best wraps in town",
  "opening_time": "12:00",
  "closing_time": "21:00",
  "phone": "097971462",
  "lat": "-34.8986819",
  "lng": "-56.1532894",
  "categories": [
    {
      "id": 3,
      "name": "Calzones",
      "description": null
    }
  ]
}
```


###### GET http://localhost:3001/restaurants/:id/competitors
*Response is formatted like PedidosYa API's response*


###### PATCH http://localhost:3001/restaurants/:id
*Request body example:*
```
{
  "name": "Marrero's wraps"
}
```


###### DELETE http://localhost:3001/restaurants/:id
*Response: 204 No Content*

## Authors

* **Daniel Marrero**
