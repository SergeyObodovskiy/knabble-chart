## Overview

This project is to present how we can build visualizations with custom behavior using d3js and React libraries. As a base it uses a standard chart and implements the following customizations:

- Capability for zoom via right-click-and-drag in the chart area
- Ability to select portions of the line via left-click-and-drag, highlighting the selected dots in a different color
- Allow each dot to be left-click-and-dragged verticallyresulting in a corresponding change in the chart line

**Note: It was hard to make too brushes to work together on the same chart (because only one layer is active for events),
so I had to make extra functionality for the area selecting.**

## Installation

#### Run `npm install` or `yarn install`

## Available Scripts

In the project directory, you can run:

#### `npm start`

Launches the app in the development mode.
To view the app open http://localhost:3000.

## Unit tests

This project doesn’t contain tests since it’s hard to find a good documentation on how to do it better for d3js + React.
However spending more time into that would probably result in some working solution.

## Perfomance testing
Charts performances tested in Chrome inspector using Performance tab.

![Native D3 LineChart 1000 points](public/Native%20D3%20Line%20Chart%201000.png 'Native D3 LineChart 1000 points')
![Native D3 LineChart 1000 points](public/Native%20D3%20Line%20Chart%205000.png 'Native D3 LineChart 5000 points')
![Native D3 LineChart 1000 points](public/React%20Simple%20Line%20Chart%201000.png 'Native D3 LineChart 1000 points')
![Native D3 LineChart 1000 points](public/React%20Simple%20Line%20Chart%205000.png 'Native D3 LineChart 5000 points')

