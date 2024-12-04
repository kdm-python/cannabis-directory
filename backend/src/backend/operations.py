import pandas as pd
import csv
import timeit
import cProfile
from typing import Optional
from icecream import ic
from loguru import logger
from pathlib import Path
from functools import lru_cache

DATA_PATH = Path("src/data/strains_cleaned.csv")


@lru_cache(maxsize=1)
def get_data(limit: Optional[int] = None, path: Path = DATA_PATH) -> list[dict]:
    """Read a CSV file and return the columns and rows as a list of dictionaries."""
    with path.open("r", buffering=10_000) as csv_file:
        reader = csv.DictReader(csv_file)
        rows = [
            {key: value for key, value in strain.items() if key != ""}
            for strain in list(reader)
        ]
        if limit:
            return rows[:limit]

        return rows


def search_strains(
    data: list[dict], search_term: str, category: str = "Name", limit: int | None = 10
) -> list[dict]:
    """Perform a case insensitive text search on the provided strain data."""
    # TODO: Handle error if non-string value found
    search_term_lower = search_term.lower()  # Convert the search term to lowercase
    results = [
        strain
        for strain in data
        if search_term_lower
        in strain[category].lower()  # Compare lowercase versions of both strings
    ]
    return results[:limit] if limit else results


def search_strains_enhanced(
    data: list[dict], search_term: str, category: str = "Name", limit: int | None = 10
) -> list[dict]:
    """Perform a case-insensitive text search on the provided strain data using a generator."""
    search_term_lower = search_term.lower()  # Convert the search term to lowercase

    def matches(strain: dict) -> bool:
        """Check if the strain's category matches the search term."""
        value = strain.get(category, "")
        if not isinstance(value, str):
            return False  # Skip if the value is not a string
        return search_term_lower in value.lower()

    # Use a generator expression to filter strains efficiently
    matching_strains = (strain for strain in data if matches(strain))

    # If a limit is specified, slice the generator; otherwise, return all results
    return (
        list(next(matching_strains) for _ in range(limit))
        if limit
        else list(matching_strains)
    )


def get_data_pandas(
    limit: Optional[int] = None, path: Path = DATA_PATH
) -> pd.DataFrame:
    """Access the local static CSV file and convert to pandas dataframe."""
    return pd.read_csv(path)
