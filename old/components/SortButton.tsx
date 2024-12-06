import React from "react";

interface SortButtonProps {
  toggleSortOrder: () => void; // Function to switch ascending or descending order
  isAscending: boolean; 
}

const SortButton: React.FC<SortButtonProps> = ({ toggleSortOrder, isAscending }) => {
  return (
    <button onClick={toggleSortOrder} style={{ marginBottom: "10px" }}>
      Sort by name: {isAscending ? "Ascending": "Descending"}
    </button>
  )
};

export default SortButton;
