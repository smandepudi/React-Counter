// import { useState } from 'react'
import "./App.css";
import Counter from "./components/Counter"

function App() {

  return (
    <main className="header">
      <h1>Day 1 - react Basics</h1>
      <p>Let's build a tiny counter.</p>
      <Counter/>
      <Counter step={5} initial={5}/>
    </main>
  );
}

export default App;
