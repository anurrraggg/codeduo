from quart import Quart, request

app = Quart(__name__)

@app.post("/echo")
async def echo():
    data = await request.get_json()
    return {"input": data, "extra": True}

def run() -> None:
    app.run()