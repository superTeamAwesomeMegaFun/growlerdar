#Growlerdar
##API
###Authentication
Requests that require authentication (primarily the requests that modify data)
require an authentication to be sent in an `auth` header or in the in the body
of the request. These tokens can be aquired through the `GET: /api/users/sign_in`
or the `POST: /api/users`.
