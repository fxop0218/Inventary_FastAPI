from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
from starlette.requests import Request
import requests
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Permisions
    allow_methods=["*"], # Permisions
    allow_headers=["*"]
)


# Diferent databse
redis = get_redis_connection(
    host=os.environ.get("HOST"),
    port=os.environ.get("PORT"),
    password=os.environ.get("PASSWORD"),
    decode_responses=True
)

# Order class 
class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantiry: int
    status: str # Completed // pending // error // refunded

    class Meta:
        database = redis

@app.get("/test")
def test():
    return {"message": "test"}

@app.post("/orders")
async def create(request: Request):
    body = await request.json()
    reqst = requests.get(f"http://localhost:8000/products/{body['id']}")
    product = reqst.json()

    order = Order(
        product_id=body["id"],
        price=product["price"],
        fee=0.2 * product["price"],
        total=1.2 * product["price"],
        quantity=body["quantity"],
        status = "pending"
    )
    order.save()
    
    return order

def order_completed(odr: Order):
    odr.status = "completed"
    odr.save() 

