import React, { Component } from "react";
import SortVisualizerOrganism from "./components/organisms/SortVisualizerOrganism";
import BubbleSort, {
  BubbleSortKey,
  BubbleSortDesc,
} from "../algorithms/sorting/BubbleSort";
import SelectionSort, {
  SelectionSortKey,
  SelectionSortDesc,
} from "../algorithms/sorting/SelectionSort";
import InsertionSort, {
  InsertionSortKey,
  InsertionSortDesc,
} from "../algorithms/sorting/InsertionSort";
import MergeSort, {
  MergeSortKey,
  MergeSortDesc,
} from "../algorithms/sorting/MergeSort";
import QuickSort, {
  QuickSortKey,
  QuickSortDesc,
} from "../algorithms/sorting/QuickSort";
import QuickSort3, {
  QuickSort3Key,
  QuickSort3Desc,
} from "../algorithms/sorting/QuickSort3";
import HeapSort, {
  HeapSortKey,
  HeapSortDesc,
} from "../algorithms/sorting/HeapSort";
import ShellSort, {
  ShellSortKey,
  ShellSortDesc,
} from "../algorithms/sorting/ShellSort";

class SortingVisualizer extends Component {
  state = {
    array: [],
    arraySize: 10,
    trace: [],
    algorithm: null,
    appDrawerOpen: false,
  };

  ALGORITHM = {
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Insertion Sort": InsertionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Quick Sort 3": QuickSort3,
    "Heap Sort": HeapSort,
    "Shell Sort": ShellSort,
  };

  ALGORITHM_KEY = {
    "Bubble Sort": BubbleSortKey,
    "Insertion Sort": InsertionSortKey,
    "Selection Sort": SelectionSortKey,
    "Merge Sort": MergeSortKey,
    "Quick Sort": QuickSortKey,
    "Quick Sort 3": QuickSort3Key,
    "Heap Sort": HeapSortKey,
    "Shell Sort": ShellSortKey,
  };

  ALGORITHM_DESC = {
    "Bubble Sort": BubbleSortDesc,
    "Selection Sort": SelectionSortDesc,
    "Insertion Sort": InsertionSortDesc,
    "Merge Sort": MergeSortDesc,
    "Quick Sort": QuickSortDesc,
    "Quick Sort 3": QuickSort3Desc,
    "Heap Sort": HeapSortDesc,
    "Shell Sort": ShellSortDesc,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    const array = Array(this.state.arraySize)
      .fill(0)
      .map(() => getRandomInt(this.state.arraySize * 5));

    this.setState(
      {
        array,
        trace: [],
      },
      this.createTrace
    );
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ algorithm }, this.generateRandomArray);
  };

  handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 100 ? 100 : size;
    size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray);
  };

  createTrace = () => {
    const numbers = [...this.state.array];
    const sort = this.ALGORITHM[this.state.algorithm];
    if (sort) {
      const trace = sort(numbers);
      this.setState({ trace });
    }
  };

  renter() {
    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
    const desc = this.ALGORITHM_DESC[this.state.algorithm];

    return (
      <div>
        <main className="App__Body">
          <SortVisualizerOrganism
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
            desc={desc}
          ></SortVisualizerOrganism>
        </main>
      </div>
    );
  }
}

export default SortingVisualizer;
