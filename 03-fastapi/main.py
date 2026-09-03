from fastapi import FastAPI
from routes.items import router as items_router

app = FastAPI()


@app.get("/")
def root():
    return {"message": "JourneyBuddy FastAPI is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(items_router)