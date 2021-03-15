import React, { useState, useEffect } from 'react';
import {v4 as uuid4v} from 'uuid';
import CubsGame from './CubsGame';
import './App.css';



function App() {

    const [cubs, setCubs] = useState ([{id: uuid4v(), num: 1, pos: [1, 1]},
    {id: uuid4v(), num: 2, pos: [1, 2]},
    {id: uuid4v(), num: 3, pos: [1, 3]},
    {id: uuid4v(), num: 4, pos: [1, 4]},
    {id: uuid4v(), num: 5, pos: [2, 1]},
    {id: uuid4v(), num: 6, pos: [2, 2]},
    {id: uuid4v(), num: 7, pos: [2, 3]},
    {id: uuid4v(), num: 8, pos: [2, 4]},
    {id: uuid4v(), num: 9, pos: [3, 1]},
    {id: uuid4v(), num: 10, pos: [3, 2]},
    {id: uuid4v(), num: 11, pos: [3, 3]},
    {id: uuid4v(), num: 12, pos: [3, 4]},
    {id: uuid4v(), num: 13, pos: [4, 1]},
    {id: uuid4v(), num: 14, pos: [4, 2]},
    {id: uuid4v(), num: 15, pos: [4, 3]},
    {id: uuid4v(), num: 16, pos: [4, 4]},
])
    const [steps, setSteps] = useState(0);
    const [emptyPos, setEmptyPos] = useState([4, 4])
    const initialState = cubs;

    const  cubsRandom = () => {
        setFinish(false);
        const newCubs = [...cubs].sort(()=>Math.random()-0.5);
        let newEmptyPos = [...emptyPos];
        newCubs.map((el,i) => {
            el.pos[0] = Math.floor(i / 4) + 1;
            el.pos[1] = i % 4+1;
            if (el.num===16) newEmptyPos=el.pos;
        })
        setCubs(newCubs);
        setEmptyPos(newEmptyPos);
        setSteps(0);
    }
    let [finish, setFinish] = useState(false);

    const changePos = (id, side) => {
        const newCubs = [...cubs];
        let newEmptyPos=[...emptyPos];
        newCubs.map((el, i) => {
            let z=0;
            if (el.id===id) {
                console.log(el.id)
                console.log(el.num)
                switch (side) {
                    case "left": z=el.num; el.num=16; newCubs[i+1].num=z; break;
                    case "right":  z=el.num; el.num=16; newCubs[i-1].num = z; break;
                    case "up": z=el.num; el.num=16; newCubs[i+4].num= z; break;
                    case "down": z=el.num; el.num=16; newCubs[i-4].num= z; break;
                    default: z=0; break;
                }  return newEmptyPos=el.pos;
                }
            });
        console.log(newCubs)
        console.log(initialState);
        setSteps(newCubs);
        setEmptyPos(newEmptyPos);
        setSteps(steps+1);
        check(newCubs);
    }

    const check=(arr)=> {
        if (arr.every((el,i)=> (i<arr.length-1) ? el.num < arr[i+1].num : el)) setTimeout(setFinish(!finish));
    }

  return (
    <div className="App">
      <header className="App-header">
        Barley-Break
      </header>
        <button className='buttons' onClick={cubsRandom}>Start Game</button>
      <div>
          <hr/>
      <div className='cubs'>
          {cubs.map((el, index) => <CubsGame cub={el} key={index} id={el.id} emptyPos={emptyPos} steps={steps} changePos={changePos}/>)}
      </div>
          <hr/>
        {finish &&
        <div className="modal">
            <h2>Congratulation!</h2>
            <h3>You have done it!<br/> Your score <span style={{color: "#1b98fc"}}>{steps}</span> steps!</h3>
            <h4>Do you want to play again?<br/> Click on the button!</h4>
            <button className='buttons' onClick={cubsRandom}>Start new game</button>
        </div>
        }
      </div>
        <div><h2>Score:</h2><h3>{steps}</h3></div>
    </div>
  );
}

export default App;
