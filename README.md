# Stateless-Microservice

**Simple stateless microservice with authentication, json patching and image thumb nail generation functionalities**

## Setup

**1.** Clone the repo.

```
git clone https://github.com/Tunjii10/Stateless-Microservice.git
```

**2.** `cd` into the repo and installing dependencies with

```
npm install
```

**3.** The app runs on port 3000 with `npm start`.

### Authentication

This is a mock authentication and therefore accepts any username and password pair.

1.  Set the request to **POST** and the url to _/api/v1/user/login_.
2.  The body of the request is a **JSON** with 2 keys (for username and password). Set the `username` key to any name. Set `password` to any password.
3.  Hit `Send`. You will get a result in this format:

```
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZyIsImlhdCI6MTY0ODk5NzkzOSwiZXhwIjoxNjQ5MDAxNTM5fQ.0ygS0DaIXwhx4Q_aEqTUORLsWTkRn0n_fsOfkYbM-3Q"
}
```

### JSON patching

Apply json patch to a json object, and return the resulting json object.

1.  Set the request to **PATCH** and the url to _/api/v1/feautres/patch-object_.
2.  Set the key `jsonObject` to an object you would like to patch. Set the key `jsonPatchObject` to the object you want to use to patch the `jsonObject`.

```
{
 "jsonObject":{"name":"Albert", "sex": "male"},
 "jsonPatchObject":{"op": "replace", "path": "/name", "value": "Joachjim" }
}
```

3.  Since this is a secure route, for testing, you will have to set the token in the `Header`. Set key as `authorization` and value as token you received from **Authentication**.
4.  Expected result should be:

```
{
	"patchedObject": {
		"name": "Joachjim",
		"sex": "male"
	}
}
```

### Image Thumbnail Generation

This request downloads an image, resizes it to 50x50 pixels thumbnail. The request must contain a public url.

1.  Set the request to **POST** and the url to _/api/v1/features/create-thumbnail_.
2.  Set the key `url` that contains a public image url.
3.  Since this is a secure route, for testing, you will have to set the token in the `Header`. Set key as `authorization` and value as token you received from **Authentication**.
4.  Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample result as below:

```
{
	"converted": true,
	"success": "Image has been resized",
	"thumbnail": "images/cropped/blog.jpg"
}
```

## Unit Testing

Unit testing is done using mochai.

Run `npm test` from the application's root directory.

## Test Coverage

Test coverage is automatically run on unit testing.

Coverage report are saved in json file in this route `coverage\temp\`

## Logging

All logs are saved in `stateless_microservice.log` in the application's root.
