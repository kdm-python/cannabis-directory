import timeit

from src.backend.operations import get_data, search_strains, search_strains_enhanced


def compare_search(
    data: list[dict], search_term: str, category: str = "Name", num_runs: int = 100
) -> str:
    """Compare execution time of list-based and generator-based search approaches."""

    # Define the list-based search function
    def list_based_search():
        results = [
            strain
            for strain in data
            if search_term.lower() in strain.get(category, "").lower()
        ]
        return results

    # Define the generator-based search function
    def generator_based_search():
        results = (
            strain
            for strain in data
            if search_term.lower() in strain.get(category, "").lower()
        )
        return list(results)  # Convert generator to list to complete the search

    # Time the list-based search
    list_time = timeit.timeit(list_based_search, number=num_runs)

    # Time the generator-based search
    generator_time = timeit.timeit(generator_based_search, number=num_runs)

    # Compute average times per run
    avg_list_time = list_time / num_runs
    avg_generator_time = generator_time / num_runs

    # Prepare the report
    report = (
        f"Comparison of search approaches over {num_runs} runs:\n"
        f"- List-based search: {avg_list_time:.6f} seconds per run\n"
        f"- Generator-based search: {avg_generator_time:.6f} seconds per run\n"
        f"\n"
        f"Conclusion:\n"
        f"- The list-based search creates the entire result list in memory before returning, which can take more time when the dataset is large.\n"
        f"- The generator-based search yields items one by one, making it more memory-efficient, especially for large datasets.\n"
    )

    return report


def compare_search_functions(
    data: list[dict],
    search_term: str,
    category: str = "Name",
    limit: int | None = 10,
    num_runs: int = 100,
) -> str:
    """Compare the execution speed of `search_strains` and `search_strains_enhanced`."""

    # Prepare the partial functions with fixed arguments
    def run_search_strains():
        search_strains(
            data=data, search_term=search_term, category=category, limit=limit
        )

    def run_search_strains_enhanced():
        search_strains_enhanced(
            data=data, search_term=search_term, category=category, limit=limit
        )

    # Time both functions using timeit
    time_strains = timeit.timeit(run_search_strains, number=num_runs)
    time_enhanced = timeit.timeit(run_search_strains_enhanced, number=num_runs)

    # Calculate average times per run
    avg_time_strains = time_strains / num_runs
    avg_time_enhanced = time_enhanced / num_runs

    # Generate and return the report
    report = (
        f"Comparison of search functions over {num_runs} runs:\n"
        f"- `search_strains`: {avg_time_strains:.6f} seconds per run\n"
        f"- `search_strains_enhanced`: {avg_time_enhanced:.6f} seconds per run\n"
        f"\n"
        f"Conclusion:\n"
        f"- The enhanced function uses a generator and avoids creating unnecessary intermediate lists,\n"
        f"  which may provide better performance for large datasets or when a limit is specified.\n"
        f"- Compare the results above to determine which approach is better for your specific use case.\n"
    )

    return report


if __name__ == "__main__":
    data = get_data()
    compare_search(data=data, search_term="widow", num_runs=1000)
