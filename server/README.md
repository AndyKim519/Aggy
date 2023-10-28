# Relevant information for backend server  

server.py: root server (imports database.py and logic.py)  
database.py: deals with database works  
logic.py: deals with ML APIs  

# When you first pull the repository  

(make sure you cd into the server folder)  

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
