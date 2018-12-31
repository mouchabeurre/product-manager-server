## Product Manager Server

This simple **Nodejs** server exposes an API allowing CRUD operations on _product_ objects.

### API

Routes:

- GET `/api/`: return list of products in database
- GET`/api/product/:id`: returns, if it exists, the product with corresponding `id`
- PUT`/api/product/:id`: modifies object properties with provided `name` and/or `price`
- DELETE`/api/product/:id`: removes product from database
- POST`/api/create`: creates new product with provided `name` and `price`
- GET`/api/existsByName/:name`: returns whether product with `name` already exists

### Schemas

A single schema is used by the server: _product_.

A _product_ is made of the following properties:

- `name`: a string holding the name of the product
- `price`: a number holding the value of the product

> the _product_ schema aims to provide a bare minimum object to interact with.

The model is handled via **Mongoose**.

The model file exports an interface object abstracting the lowest level usage of the _product_.

### Controller

The product controller handles the many queries forwarded by the **router**: to each _product_ route its corresponding function in the controller.

Minimal payload in responses, accompagnied with a meaningfull status code.

### Router

Basic out of the box _express_ router, binding the endpoints the the right functions.

### Server

Connection to the _mongodb_ database, as specified in the config file.

Instanciation of our _express_ server, plugged with _cors_, _body-parser_ and the router, then started on the config port.
