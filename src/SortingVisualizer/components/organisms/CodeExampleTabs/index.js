import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

class CodeExampleTabs extends Component {
  state = {
    value: 0,
  };

  render() {
    const { array } = this.props;

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
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
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
          onAdjustSpeed
        </TabPanel>
        onAdjustSpeed
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
