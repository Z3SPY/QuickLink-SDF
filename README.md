To get this project on your local device:
- make a folder first
- go to cmd
- go to your folder directory
- git clone -b search https://github.com/Z3SPY/QuickLink-SDF.git

Open xampp (download if no xampp yet :https://www.apachefriends.org/download.html)
- Create database named “qldb”

open vscode or any textEditor that is applicable for this project and do the following on the command line:
- cd QuickLink-SDF
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py makemigrations
- python manage.py runserver

open another terminal and do the following on the command line:
- cd Quicklink-SDF
- cd FrontEnd
- npm i
- npm run dev

You'll see the link http://localhost:5173/ after npm run dev, open this link in the browser
- go to register
- fill up the form (should have 8 characters or long on the password)
- proceed to login page after registration

you'll arrive at the homepage after you log in the website, go to profile and make your first post


END


This project is intended for project presentation only at our school organization.


  

