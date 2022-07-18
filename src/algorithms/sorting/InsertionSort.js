import React from "react";

import { newTrace, addToTrace, createKey } from "./helpers";

const InsertionSort = (nums) => {
  const trace = newTrace(nums);

  for (let i = 1; i < nums.length; i++) {
    let value = nums[i];
    let hole = i;

    addToTrace(trace, nums, [], [i]);
    while (hole > 0 && nums[hole - 1] > value) {
      addToTrace(trace, nums, [], [hole], [hole - 1]);
      nums[hole] = nums[hole - 1];
      hole -= 1;

      addToTrace(trace, nums, [], [], [hole, hole + 1]);
    }
    addToTrace(trace, nums, [], [], [], [hole]);
    nums[hole] = value;
  }
  addToTrace(trace, nums, [...Array(nums.length).keys()]);
  return trace;
};

export const InsertionSortKey = createKey(
  "Comparing",
  "Swapping",
  "Overwrite from memory"
);

export const InsertionSortDesc = {
  title: "Insertion Sort",
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Insertion_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Insertion Sort
      </a>{" "}
      is a simple sorting algorithm that iterates through an array and at each
      iteration it removes one element from the array, finds the location it
      belongs to in the sorted list and inserts it there, repeating until no
      element remains in the unsorted list. It is an in-place, stable sorting
      algorithm that is inefficient on large input array but works well for data
      sets that are almost sorted. It is more efficient in practice compared to
      other quadratic sorting algorithms like bubble sort and selection sort.
    </p>
  ),
  worstCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  avgCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  bestCase: <span>O(n)</span>,
  space: <span>O(1)</span>,
};

export default InsertionSort;
