# Aggy

client: frontend (react)  
server: backend (flask)



# When you first pull the repository  


### Client setup

***make sure you cd into the client folder!!!!!*** 

When you first pull: npm install # install all relevant depndencies that are listed in package.json  

To run: npm start  


### Server setup

***make sure you cd into the server folder!!!!!*** 

1. python3 -m venv venv # creates your virtual environment  
2. source venv/bin/activate # activates your virtual environment  
3. pip install -r requirements.txt # download all depndencies for the server  
4. deactivate  

After doing the three steps above you have set up your virtual environment where you can run the server. Next time you want to run the server:  

1. source venv/bin/activate  
2. python3 main.py  
3. deactivate  

When there are new edits to requirements.txt:

1. source venv/bin/activate  
2. pip install -r requirements.txt  
3. deactivate  
