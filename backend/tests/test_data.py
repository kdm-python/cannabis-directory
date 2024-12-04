import pytest
import pandas as pd

import src.backend.data as dt


def test_get_data():
    df = dt.get_data()
    assert isinstance(df, pd.DataFrame)
