import pandas as pd
from icecream import ic
from loguru import logger
from pathlib import Path

DATA_PATH = Path("src/data/strains_cleaned.csv")

def get_data(path: Path = DATA_PATH) -> pd.DataFrame:
    """Access the local static CSV file and convert to pandas dataframe."""
    return pd.read_csv(path)
