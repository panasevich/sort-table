import React from 'react';
import './App.css';
import ErrorBoundary from "./components/ErrorBoundary";
import TableList from "./components/TableList";

function App() {
  return (
      <ErrorBoundary>
          <div className="App">
              <TableList />
          </div>
      </ErrorBoundary>
  );
}

export default App;
