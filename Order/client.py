from main import redis, Order
import time

key = "refund_order"
group = "payment-group"

try:
    redis.xgroup_create(key, group)
except:
    print("Error: this product already exists")

while True:
    try: 
        res = redis.xreadgroup(group, key, {key: ">"}, None) # {key: ">"} = lisen all the events
        
        if res != []:
            for result in res:
                obj = result[1][0][1]
                order = Order.get(obj["pk"])
                order.status = "refunded"
                order.save()
    except Exception as e:
        print(f"Error: {str(e)}")
    time.sleep(2)
