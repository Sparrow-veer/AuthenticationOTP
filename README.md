# AuthenticationOTP
otp based authentication api

webapplication listening at 5000 port.

Db Used: MongoDb

Frameworks used 1)"express": "^4.17.1" to create web application
                2)"fast-two-sms": "^3.0.0"  to send otp to user
                3)"mongoose": "^6.0.14"  to connect with mongo db
                4) "otp-generator": "^4.0.0" to generate 6 digit otp
                
Api1: http://localhost:5000/GetCode/:number
      ex:http://localhost:5000/GetCode/9553030219
      
      this api is used to create a otp to given user mobile number and also store in db for authentication purpose.
      
 Api2: http://localhost:5000/Authenticate/:number/:code
        ex:http://localhost:5000/Authenticate/9553030219/12345
        
        this api check whether the mobile number and provided code mathches with the one in db.and returns 200 with success message and if
        not correct return 404 with unsuccessful message
