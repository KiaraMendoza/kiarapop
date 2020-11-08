<h1 align="center">Welcome to Kiarapop 👋</h1>

This is a project made for the KeepCoding's Web Development Bootcamp. I hope you like it and send feedback to improve!

## Install

```sh
npm install
```

## Configure environment variables

Copy .env.example to .env and review the settings to adjust them to yours.

```sh
cp .env.example .env
```

### The first time you use this, you may also want to start the database with some default data:

For doing that, just execute the following command:

```sh
npm run init-db
```

** For some reason, this command isnt working properly, so please, just make a 'Ctrl + C' right after you see the message 'Created 2 users' on the console.

**Warning! this script delete database contents before the load.**

When used in production, use only in the first deployment.

## Usage

```sh
npm start
```

## Development start

```sh
npm run dev
```

## API Methods

GET /apiv2/ads

```json
[
  {
    "_id": "5f54ff0359704a3fd0186857",
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
```

Example filters:

* http://localhost:3000/apiv2/ads?name=adName
* http://localhost:3000/apiv2/ads?price=360
* http://localhost:3000/apiv2/ads?sale=true
* http://localhost:3000/apiv2/ads?skip=20&limit=10
* http://localhost:3000/apiv2/ads?sort=name
* http://localhost:3000/apiv2/ads?fields=name%20-_id (get only names, discarting the id field)

### To get only one ad by id

GET /apiv2/ads/_id

```json
{
  "result": {
    "_id": "5f54ff0359704a3fd0186857",
    "name": "Samsung Galaxy S9",
    "price": 360,
    "sale": true,
    "tags": ["mobile","recent"]
  },
}
```

### To create one ad

POST /apiv2/ads body: { name: 'Ad name', price: 999, sale: true, tags: ["example"] },

```json
{
  "result":  { 
    "name": "Ad name",
    "price": 999, 
    "sale": true, 
    "tags": ["example"],
    "image": "10101010010_imageName.jpg"
  },
}

```

The thumbnail will automatically be generating right after you post the new ad, it will just take some little time to appear on the ads' page.

### Update one ad by id

PUT /apiv2/agentes/<_id> body: { name: 'Ad new name', price: 444 }

```json
{
  "result": { 
    "name": "Ad new name",
    "price": 444, 
    "sale": true, 
    "tags": ["example"] 
  },
}
```

### Delete one ad by id

DELETE /apiv2/agentes/<_id>

Returns: HTTPCode 200 its to say, a successfully response from the server. And the deleted Ad.

```json
{
  "result": { 
    "name": "Ad new name",
    "price": 444, 
    "sale": true, 
    "tags": ["example"] 
  },
}
```

### Get all images
Needed for updating ads and add them it's images.

GET /apiv2/images

```json
[
    "1599842148234_checo.jpg",
    "1600011872410_macbookpro.jpg",
    "1600011932250_xiaomi.jpg"
]
```

## Author

👤 **Kiara Mendoza**

* Website: https://kiara-portfolio.netlify.app/
* Github: [@KiaraMendoza](https://github.com/KiaraMendoza)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_