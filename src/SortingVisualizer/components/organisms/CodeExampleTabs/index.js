import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BubbleSortCSharp from "../../../../algorithms/sorting/BubbleSort/BubbleSortCSharp";

class CodeExampleTabs extends Component {
  state = {
    value: 0,
  };

  render() {
    const { algorithm } = this.props;
    switch(algorithm){
      case "Bubble Sort":
        switch(this.state.value)
          {
            case 0:
              //get C# example
              break;
          }
        break;
      case "Selection Sort":
        break;
      case "Insertion Sort":
        break;
      case "Merge Sort":
        break;
      case "Quick Sort":
        break;
      case "Quick Sort 3":
        break;
      case "Heap Sort":
        break;
      case "Shell Sort":
        break;
  }


    const handleChange = (event, newValue) => {
        console.log(this.state.value);
        console.log(newValue);
      this.setState({ value: newValue });
    };

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }} style={{textAlign: "left"}}>
              <Typography component={'span'} variant={'body2'}>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    function a11yProps(index) {
        return {
          id: `scrollable-auto-tab-${index}`,
          "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
      }

    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={handleChange}
          aria-label="code example tabs"
        >
          <Tab label="C#" {...a11yProps(0)}/>
          <Tab label="Java" {...a11yProps(1)}/>
          <Tab label="Javascript" {...a11yProps(2)}/>
          <Tab label="C++" {...a11yProps(3)}/>
          <Tab label="Python" {...a11yProps(4)}/>
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          <BubbleSortCSharp/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          adjustPlaybackSpeed
        </TabPanel>
        onAdjustSpeed
        <TabPanel value={this.state.value} index={2}>
          onAdjustSpeed
        </TabPanel>
        asd
        <TabPanel value={this.state.value} index={3}>
          asd
        </TabPanel>
        asd
        <TabPanel value={this.state.value} index={4}>
          asd
        </TabPanel>
      </div>
    );
  }
}

export default CodeExampleTabs;
