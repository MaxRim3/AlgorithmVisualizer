import React, { Component } from "react";
import SortVisualizerOrganism from "./components/organisms/SortVisualizerOrganism/index";
import AppControls from "./components/molecules/AppControls";
import Footer from "./components/molecules/Footer";
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

import AppDrawer from "./components/organisms/AppDrawer";
import TopBar from "./components/organisms/TopBar";

import CodeExampleTabs from './components/organisms/CodeExampleTabs';

import "./SortingVisualizer.css";
import "./SortingVisualizerDark.css";

class SortingVisualizer extends Component {
  state = {
    darkMode: false,
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

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  toggleAppDrawer = () => {
    this.setState((prevState) => ({
      appDrawerOpen: !prevState.appDrawerOpen,
    }));
  };

  render() {
    let theme = `App`;
    if (this.state.darkMode) theme += ` App_dark`;
    if (this.state.appDrawerOpen) theme += ` App_modal_open`;

    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
    const desc = this.ALGORITHM_DESC[this.state.algorithm];

    const controls = (
      <AppControls
        onGenerateRandomArray={this.generateRandomArray}
        algorithm={this.state.algorithm}
        onAlgorithmChange={this.handleAlgorithmChange}
        arraySize={this.state.arraySize}
        onArraySizeChange={this.handleArraySizeChange}
        onToggleDarkMode={this.toggleDarkMode}
        darkMode={this.state.darkMode}
      ></AppControls>
    );

    return (
      <div className={theme}>
        <TopBar
          drawerOpen={this.state.appDrawerOpen}
          toggleDrawer={this.toggleAppDrawer}
        >
          {controls}
        </TopBar>
        <AppDrawer
          open={this.state.appDrawerOpen}
          closeDrawer={this.toggleAppDrawer}
        >
          {controls}
        </AppDrawer>
        <main className="App__Body">
          <SortVisualizerOrganism
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
            desc={desc}
          ></SortVisualizerOrganism>
          <CodeExampleTabs
          array={this.state.array}
          ></CodeExampleTabs>
        </main>
        <Footer />
      </div>
    );
  }
}

export default SortingVisualizer;
