This project is a continuation of my Mega-Backend-Template. This project is even better than that template. There were some problems in out Backend Template project, that has been solved her. Not only that, some more features are also added here. The frontend is minimalistic here because our main focus was backend functionalities. The following functionalities are present here ----

1. Full functional Express backend. Basically what we want in an express backend - Supabase(PostgreSQL) connection with queries, proper routes and controllers, backend data handling with middlewares (JS obj, url, form, file all are handled), on that note - multer middleware setup, custom ApiResponse and ApiError with errorHandler middleware such that all responses from backend are in the form of JSON, cloudinary utility, asyncHandler and all other assorted middlewares and packages.

2. JWT - cookie based authentication
3. Forget password with OTP verification. Used Nodemailer.
4. OAuth2.0 google setup.
5. proper use of .env file. So now you can deploy it and it will work fine.


Again, in the frontend, extensive work was not done, but some functinoalities are present,
1. showing data based on authentication. Mainly login to see more in Home page
2. Proper use of react router dom and tailwind css
3. Login, Signup, Forget password - all are handled with react hook form
4. After a response is got from backend, then whether to show that data (saved in a state) or go to another page(via useNavigate hook of react router dom) is achieved
5. proper use of .env file. So now you can deploy it and it will work fine.