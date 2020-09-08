<h1 align="center">Welcome to Nodepop 👋</h1>

This is a project made for the KeepCoding's Web Development Bootcamp. I hope you like it and send feedback to improve!

## Install

```sh
npm start
```

## Configure environment variables

Copy .env.example to .env and review the settings to adjust them to yours.

```sh
cp .env.example .env
```

### The first time you may also want to start the database with some default data:

```sh
npm run init-db
```

**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.

## Usage

```sh
npm start
```

## Development start

```sh
npm run dev
```

## API Methods

GET /api/ads

[
  {
    _id": "5f54ff0359704a3fd0186857",
    "name": "Samsung Galaxy S9",
    "price": 360,
    "sale": true,
    "tags": ["mobile","recent"]
  },
  {
    "_id": "5f54ff0359704a3fd0186858",
    "name": "Xiaomi Redmi Note 8",
    "price": 190,
    "sale": true,
    "tags": ["mobile","recent"]
  }
]

Example filters:

* http://localhost:3000/api/ads?name=adName
* http://localhost:3000/api/ads?price=360
* http://localhost:3000/api/ads?sale=true
* http://localhost:3000/api/ads?skip=20&limit=10
* http://localhost:3000/api/ads?sort=name
* http://localhost:3000/api/ads?fields=name%20-_id (get only age, discarting the id field)

### To get only one ad by id

GET /api/ads/_id

{
  "result": {
    _id": "5f54ff0359704a3fd0186857",
    "name": "Samsung Galaxy S9",
    "price": 360,
    "sale": true,
    "tags": ["mobile","recent"]
  },
}

### To create one ad

POST /api/ads body: { name: 'Ad name', price: 999, sale: true, tags: ["example"] },

{
  "result":  { 
    name: 'Ad name',
    price: 999, 
    sale: true, 
    tags: ["example"] 
  },
}

### Update one ad by id

PUT /api/agentes/<_id> body: { name: 'Ad new name', price: 444 }

{
  "result": { 
    name: 'Ad new name',
    price: 444, 
    sale: true, 
    tags: ["example"] 
  },
}

### Delete an ad bu id

DELETE /api/agentes/<_id>

Returns: HTTPCode 200 its to say, a successfully response from the server.

## Author

👤 **Kiara Mendoza**

* Website: https://kiara-portfolio.netlify.app/
* Github: [@KiaraMendoza](https://github.com/KiaraMendoza)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_