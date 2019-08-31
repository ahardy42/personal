# personal
personal page with links to projects. this will be pointed at https://www.ahardy42.com/ so go check out the live site there. 

## structure

This site is a full stack site utilizing the MVC design pattern. 

- M 
    - utlizes mongoDB database to store portfolio information
    - mongoose ODM to retrieve and set data in the database
- V
    - Materialize css framework for the styling
    - jQuery library to make DOM manipulation a bit easier.
- C
    - stitched together with Node.js framework express.js to create a server
    - middleware for authentication provided by passport.js

## why full stack?

I wanted to be able to edit my site on the fly, without having to re-deploy when I created a new project, or updated an old one.  So, I built this website with an admin page. Using my credentials I can login to access the admin page where I am able to edit the content of the portfolio carousel. 

I created the api route to add the following items to the database:

- title
- description of the project
- links for both the project, and for the github repo address
- image file...

the image file is uploaded to an AWS S3 bucket using multer / multerS3 and the AWS-SDK packages. Then, the mongoDB database is updated with the correct path to access the image from the bucket, and the img tag src attribute is set with the resulting path.  This way I can edit and upload my own photos on the fly as well. 
