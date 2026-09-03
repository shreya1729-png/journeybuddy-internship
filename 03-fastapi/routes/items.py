from fastapi import APIRouter, Query
from pydantic import BaseModel, Field

router = APIRouter()


class Item(BaseModel):
    id: int = Field(gt=0)
    name: str = Field(min_length=2, max_length=50)


items = [
    {"id": 1, "name": "Laptop"},
    {"id": 2, "name": "Keyboard"},
    {"id": 3, "name": "Mouse"},
]


@router.get("/items")
def get_items(
    min_id: int = Query(default=1, gt=0),
):
    filtered_items = [
        item for item in items
        if item["id"] >= min_id
    ]

    return {"items": filtered_items}