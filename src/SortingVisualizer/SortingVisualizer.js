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
}
