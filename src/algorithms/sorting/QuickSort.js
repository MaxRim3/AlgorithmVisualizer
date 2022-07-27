import React from "react";
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey,
} from "./helpers";

const QuickSort = (nums) => {
  const trace = newTrace(nums);

  function choosePivot(array, start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }

  function partition(array, start, end) {
    let i = start + 1;
    let j = start + 1;

    addToTrace(trace, array, lastSorted(trace), [start]);

    while (j <= end) {
      if (array[j] < array[start]) {
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start],
          [j],
          [],
          createRange(start + 1, i)
        );
        swap(array, i, j);

        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start],
          [i],
          [],
          createRange(start + 1, i)
        );
        i += 1;
      }
      j += 1;
    }

    addToTrace(
      trace,
      array,
      lastSorted(trace),
      [i - 1],
      [],
      [],
      createRange(start, i - 1)
    );
    swap(array, start, i - 1);

    addToTrace(
      trace,
      array,
      lastSorted(trace),
      [i - 1],
      [],
      [],
      createRange(start, i - 1)
    );
    return i - 1;
  }
  function recursiveQuickSort(array, start, end) {
    if (start >= end) {
      if (start === end) {
        addToTrace(trace, array, [...lastSorted(trace), start]);
      }
      return null;
    }
    let pivot = choosePivot(array, start, end);

    addToTrace(trace, array, lastSorted(trace), [pivot]);

    swap(array, start, pivot);

    addToTrace(trace, array, lastSorted(trace), [pivot]);

    pivot = partition(array, start, end);

    addToTrace(trace, array, [...lastSorted(trace), pivot]);

    recursiveQuickSort(array, start, pivot - 1);
    recursiveQuickSort(array, pivot + 1, end);
  }
  recursiveQuickSort(nums, 0, nums.length - 1);
  return trace;
};

export const QuickSortKey = createKey(
  "Comparing",
  "Swapping",
  null,
  "Less than pivot"
);

export const QuickSortDesc = {
  title: "Quick Sort",
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Quicksort"
          target="_blank"
          rel="noopener no referrer"
        >
          Quick Sort
        </a>{" "}
        is an efficient, in-place sorting algorithm which is faster than a
        MergeSort and HeapSort. However, it is not a stable sorting algorithm,
        meaning that the relative positioning of the equal sort items is not
        perserved. Quicksort is a divide and conquer algorithm. Quicksort first
        divides a large array into two smaller sub-arrays : the low elements and
        the high elements. Quicksort can then recursively sort the sub-arrays.
        The steps are:
      </p>
      <ol>
        <li>
          Pick an element, called a pivot, from the array. This is usually done
          at random.
        </li>
        <li>Move pivot element to the start of the array.</li>
        <li>
          <em>Partitioning:</em> reorder the array so that all elements with
          values less than the pivot come before the pivot, while all elements
          with values greater than the pivot come after it. (equal values can go
          either way). After this paritioning, the pivot is in its final
          position. This is called the <em>partition</em> operation.
        </li>
        <li>
          Recursively apply the above steps to the sub-array of elements with
          smaller values and separately to the sub-array of elements with
          greater values.
        </li>
      </ol>
      <p>
        The base case of the recursion is an array of size zero or one, which
        are sorted by definition.
      </p>
    </div>
  ),
  worstCase: (
    <span>
      O(<em>n</em>
      <sup>2</sup>)
    </span>
  ),
  avgCase: (
    <span>
      O(<em>n</em>log<em>n</em>)
    </span>
  ),
  bestCase: (
    <span>
      O(<em>n</em>log<em>n</em>)
    </span>
  ),
  space: (
    <span>
      O(log<em>n</em>)
    </span>
  ),
};

export default QuickSort;
