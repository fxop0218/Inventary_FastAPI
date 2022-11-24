# Inventory Microservice


## This software has a work to test fastApi created by Francesc Oliveras

client.py is a listener of Order.py (other microservice)
```
python client.py
```

dependences py 3.11
```
pip install uvicorn[standard], fastapi, redis_om, python_dotenv
```

Run the fastAPI
```
uvicorn main:app --reload --port=8000
```