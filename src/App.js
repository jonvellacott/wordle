
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import React,{useState}  from 'react';
import './App.css';
import { createContext , useEffect} from "react";
import { generateWordSet } from "./Words";
export const AppContext = createContext();



function App() {
  const grid = new Array(6);
    
  for(var i=0; i<6; i++){
    grid[i]=new Array(5);
      for(var j=0; j<5 ; j++){
        grid[i][j] = {value: '', status: "black"};
      }
  }
  
  
  



  const [gridState, setGridState] = useState(grid);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [output, setOutput] = useState("");

  const [invalid, setInvalid] = useState([]);
  const [almost, setAlmost] = useState([]);
  const [correct, setCorrect] = useState([]);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      //console.log(words.todaysWord);
    });
  
  }, []);


  const onSelectLetter = (keyVal) => {
    if(currentLetter < 5){
      const newGrid = [...gridState];
      newGrid[currentGuess][currentLetter] = {value: keyVal};
  
      setGridState(newGrid);
   
      setCurrentLetter(currentLetter+1);
    }
  }



  const onEnter = () => {
    
    if(currentGuess < 6 && currentLetter ===5){
      const newGrid = [...gridState];
      const guess = newGrid[currentGuess][0].value + newGrid[currentGuess][1].value + newGrid[currentGuess][2].value + newGrid[currentGuess][3].value + newGrid[currentGuess][4].value
      
      let newCorrect = [];
      let newAlmost = [];
      setOutput( "" );
      if(!wordSet.has(guess.toLowerCase())){
        setOutput( "invalid word" );
       
        for(var i=0; i<5;i++){
          newGrid[currentGuess][i].value="";
          
        }
        setCurrentLetter(0);
        setGridState(newGrid);
        return;
      }
      
      if(correctWord===guess.toLowerCase()){
        setOutput("You Win!!!");
        console.log("You win")
      }
    

      for(i=0; i<5;i++){
        if(correctWord.charAt(i)===newGrid[currentGuess][i].value.toLowerCase()){
          newGrid[currentGuess][i].status="correct";
          newCorrect = newCorrect.concat(newGrid[currentGuess][i].value.toUpperCase())
        }
      }
      for(i=0; i<5;i++){
        if(newGrid[currentGuess][i].status!=="correct"){
          
          for(var j=0; j<5;j++){
              //console.log(newGrid[currentGuess][j].status);
              if(newGrid[currentGuess][j].status !== "correct"  && newGrid[currentGuess][i].value.toLowerCase() === correctWord.charAt(j) ){  
                newGrid[currentGuess][i].status="almost";
                newAlmost = newAlmost.concat(newGrid[currentGuess][i].value.toUpperCase());
              }  
          }
        }

      }
      let newInvalid = [];
    
      for(i=0; i<5;i++){
       
        if(!newGrid[currentGuess][i].status){

          newInvalid = newInvalid.concat(newGrid[currentGuess][i].value.toUpperCase());
         
          
          
        }
      }

      setInvalid(invalid.concat(newInvalid));
      setCorrect(correct.concat(newCorrect));
      setAlmost(almost.concat(newAlmost));
      setGridState(newGrid);

      if(currentGuess===5){
        setOutput("You Lose! The Correct word was " + correctWord.toUpperCase());
      }

      setCurrentGuess(currentGuess+1);
      setCurrentLetter(0);
      
    }
   
  }
  const onDelete = () => {
    if(currentLetter>0){
      
      const newGrid = [...gridState];
      newGrid[currentGuess][currentLetter-1] = {value: "", status: ""};
      setGridState(newGrid);
      setCurrentLetter(currentLetter-1);
    }
   
  

  }



  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <AppContext.Provider 
            value = {{gridState, setGridState ,currentGuess, setCurrentGuess,currentLetter, 
              setCurrentLetter, onSelectLetter, onEnter, onDelete, output, setOutput, invalid,
               setInvalid, almost, setAlmost, correct, setCorrect}}
            >
          <Board />
          <label>{output}</label>
          <Keyboard />
       </AppContext.Provider>
    </div>
  );
}

export default App;
