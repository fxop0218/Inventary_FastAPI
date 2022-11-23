from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Permisions
    allow_methods=["*"], # Permisions
    allow_headers=["*"]
)

redis = get_redis_connection(
    host=os.environ.get("HOST"),
    port=os.environ.get("PORT"),
    password=os.environ.get("PASSWORD"),
    decode_responses=True
)

class Product(HashModel):
    name: str
    price: float 
    quantity: int

    class Meta:
        database = redis

@app.get("/test")
def index():
    return {"message": "test"}

@app.get("/products")
def all():
    return [format(pk) for pk in Product.all_pks()]

def format(pk: str): 
    product = Product.get(pk)

    return {
        "id" : product.pk,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity,

    }

@app.post("/create") # POST
def create(product: Product):
    return product.save()


@app.get("/products/{pk}")
def get(pk: str): 
    return Product.get(pk)


@app.delete("/product/{pk}")
def delete(pk: str):
    return Product.delete(pk)
