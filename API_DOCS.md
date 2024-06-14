# Eat Eat Chinese Food 

list of available endpoints:

- `POST /register`
- `POST /login`
- `GET /foods`
- `POST /foods`
- `GET /foods/:id`
- `PUT /foods/:id`
- `DELETE /foods/:id`
- `GET /carts`
- `POST /carts`
- `DELETE /carts/:id`
- `PATCH /carts/:id/quantity`
- `DELETE /carts/:id/status`
- `POST /transactions`


&nbsp;

## 1. POST /register

Description:

- Register user to view content

Request:

- body:

```json
{
    "username":"string",
    "password":"string",
    "email":"string",
    "phoneNumber":"string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Username is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Invalid Email Format"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Phone Number is required"
}

```

&nbsp;

## 2. POST /login

Description:

- Login user to view content

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "<token>",
   "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email / Password is required"
}
```

&nbsp;

## 3. GET /foods

Description:

- Fetch all foods data in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
    "page": "integer",
    "data": ["object"],
    "totalData": "integer",
    "totalPage": "integer",
    "dataPerPage": "integer"
}
```

&nbsp;

## 4. POST /foods/

Description:

- add Food data.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- body:

```json
{
    "title":"string",
    "price":"integer",
    "difficulty":"string",
    "image":"string",
    "category":"string"
}
```

_Response (201 - Created)_

```json
{
    "message": "string",
    "food": {
        "id": "integer",
        "title": "string",
        "price": "integer",
        "difficulty": "string",
        "image": "string",
        "category": "string",
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Difficulty is required"
}
OR
{
    "message": "Image Url is required"
}
OR
{
    "message": "Category is required"
}
```
&nbsp;

## 5. GET /foods/:id

Description:

- Get Food data by Id


Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "title": "string",
    "price": "integer",
    "difficulty": "string",
    "image": "string",
    "category": "string"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 6. PUT /foods/:id

Description:

- Edit Food Data by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
    "title":"string",
    "price":"integer",
    "difficulty":"string",
    "image":"string",
    "category":"string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Food <food_name> is updated"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Difficulty is required"
}
OR
{
    "message": "Image Url is required"
}
OR
{
    "message": "Category is required"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 7. DELETE /foods/:id

Description:

- Delete Food Data by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "<food_name> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 8. POST /carts

Description:

- add Food data from food id to Cart by userId.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- body:

```json
{
    "id":"integer",
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "UserId": "integer",
    "FoodId": "integer",
    "quantity": "integer",
    "status": "boolean"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 9. GET /carts

Description:

- Get Cart by userId.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "UserId": "integer",
        "FoodId": "integer",
        "quantity": "integer",
        "status": "boolean",
        "Food": {"object"}
    }
]
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 10. DELETE /carts/:id

Description:

- Delete Cart Data by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "success to delete items"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```
&nbsp;

## 11. PATCH /carts/:id/quantity

Description:

- Patch carts quantity data by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
    "quantity": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Item Quantity is updated to <cart_quantity>"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Quantity is required"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 12. PATCH /carts/:id/status

Description:

- Patch carts status data by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Item Status is updated"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 13. POST /transactions

Description:

- add transaction data by userId.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "UserId": "integer",
    "totalAmount": "integer",
    "paymentStatus": "boolean",
    "orderId": "null"
}
```


&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
