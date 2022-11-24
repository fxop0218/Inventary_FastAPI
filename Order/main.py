from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
from starlette.requests import Request
import time
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
    quantity: int
    status: str # Completed // pending // error // refunded

    class Meta:
        database = redis

@app.get("/test")
def test():
    return {"message": "test"}


@app.get("/orders/{pk}")
def get_order(pk: str):
    order = Order.get(pk)
    # redis.xadd("refund_order", order.dict(), "*")
    return order


@app.post("/orders")
async def create(request: Request, background_t: BackgroundTasks):
    body = await request.json()
    reqst = requests.get(f"http://localhost:8000/products/%s" % body["id"])
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
    background_t.add_task(order_completed, order) # Execute this function at the background
    #order_completed(order)
    
    return order

def order_completed(odr: Order):
    time.sleep(20) # After this, the status change to completed
    odr.status = "completed"
    odr.save()
    # send event 
    redis.xadd("order_completed", odr.dict(), "*") # * is a id, if you put * autogenerates a id

