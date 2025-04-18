# Algorithm Visualization Collection

A collection of interactive algorithm visualization tools with a unified access hub.

## Project Structure

This repository contains three separate applications:

### 1. Algorithm Visualizer Hub

A central landing page that provides access to all algorithm visualization tools. This application:
- Provides a clean UI to navigate to any visualization tool
- Coordinates running all applications on different ports
- Redirects users to the specific tool they select

### 2. Max Flow Visualizer

An interactive visualization of maximum flow algorithms including:
- Ford-Fulkerson
- Edmonds-Karp
- Push-Relabel

### 3. Maximum Matching Visualizer

An interactive visualization of maximum matching algorithms for bipartite graphs.

## Getting Started

See the README in the [algorithm-visualizer-hub](./algorithm-visualizer-hub/README.md) directory for detailed instructions on:
- Installing dependencies
- Running all applications
- Configuring the system

## Quick Start

To run all visualization tools together:

```bash
# Install dependencies for each application (one-time setup)
cd algorithm-visualizer-hub
npm install
cd ../maxflow
npm install
cd ../maximum-matching-graph
npm install

# Start all applications from the hub
cd ../algorithm-visualizer-hub
npm run start:all
```

Then open your browser to http://localhost:3000 to access the hub. 