import React from "react"
// import "App.css"
import { VectorMap } from "react-jvectormap";

import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const { getName } = require("country-list");

class WorldMapChart extends React.Component {
    state = {
        countriesCodesArray: [],
        countriesNamesArray: [],
        data: {},
        title: "",
        titleSet: false,
        color: "#48aeef"
    };

    handleColorChange = color => {
        console.log(color.hex);
        this.setState({ color: color.hex });
    };

    handleChange = e => {
        this.setState({
            title: e.target.value
        });
    };

    handleFormSubmit = () => {
        this.setState({
            titleSet: true
        });
    };


    handleClick = (e, countryCode) => {
        const { countriesCodesArray } = this.state;
        // console.log(countryCode);
        if (countriesCodesArray.indexOf(countryCode) === -1) {
            this.setState(
                {
                    countriesCodesArray: [...countriesCodesArray, countryCode]
                },
                () => this.getCountriesNamesList()
            );
        }
    };



    getCountriesNamesList = () => {
        const { countriesCodesArray } = this.state;
        const list = countriesCodesArray.map(code => getName(code));
        this.setState(
            {
                countriesNamesArray: list
            },
            () => this.makeMapDataStructure()
        );
    };

    makeMapDataStructure = () => {
        const { countriesCodesArray } = this.state;
        let obj = {};
        //{CN: 5, MX: 5, TX: 5}
        countriesCodesArray.forEach(countryCode => (obj[countryCode] = 5));
        this.setState({
            data: obj
        });
    };


    render() {
        // console.log(this.state.data);
        const { countriesNamesArray, title, titleSet, color } = this.state;
        return (
            <div className="col-lg-6">
                <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" // change it to ocean blue: #0077be
                    zoomOnScroll={false}
                    containerStyle={{
                        width: "100%",
                        height: "520px"
                    }}
                    onRegionClick={this.handleClick} // gets the country code
                    containerClassName="map"
                    regionStyle={{
                        initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                        },
                        hover: {
                            "fill-opacity": 0.8,
                            cursor: "pointer"
                        },
                        selected: {
                            fill: "#2938bc" // color for the clicked country
                        },
                        selectedHover: {}
                    }}
                    regionsSelectable={true}
                    series={{
                        regions: [
                            {
                                values: this.state.data, // this is the map data
                                scale: ["#146804", color], // your color game's here
                                normalizeFunction: "polynomial"
                            }
                        ]
                    }}
                />

            </div>
        );
    }
}

export default WorldMapChart;



const Container = styled.div`
  text-align: center;
  input {
    padding: 10px;
    border-radius: 5px;
    border-shadow: 0;
    border-style: solid;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
`;
const ColorPickerContainer = styled.div`
  position: absolute;
`;