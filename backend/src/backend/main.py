from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from .operations import get_data, search_strains


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
def welcome():
    return {"message": "Welcome to the Cannabis Directory v0.1"}


@app.get("/strains/")
def get_all_data():
    """
    TODO: Query parameters: category, search_term, limit
    """
    try:
        data = get_data()
    except Exception as e:
        logger.error(f"get_data() operation failed: {e}")
        return HTTPException(status_code=500, detail={"Backend error": e})
    else:
        logger.info(f"Successfully retrieved data")
        return data


@app.get("/strains/search/{search_term}")
def search_data(search_term: str, limit: int = 10):
    data = get_data()
    results = search_strains(data=data, search_term=search_term, limit=limit)
    return {"results": results}


@app.get("/strains/pagination")
def get_paginated_data(page: int = 1, per_page: int = 100):
    """Return paginated data."""
    data = get_data()  # Load all data or cache this result (see caching below)
    start = (page - 1) * per_page
    end = start + per_page
    return {"page": page, "per_page": per_page, "data": data[start:end]}
