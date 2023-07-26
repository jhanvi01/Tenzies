import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 * 
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies]= React.useState(false)
    const [rolls, setRolls]= React.useState(0)
    const leastRolls = localStorage.getItem('leastRolls')
    console.log(leastRolls)

    React.useEffect(()=>{
      const firstNum = dice[0].value
      const isHeld = dice.every(die=> die.isHeld)
      const isSame = dice.every(die=> die.value ===firstNum)

      if(isHeld && isSame){
        setTenzies(true)
      }

    },[dice])

    function holdDie(id){
      
      setDice(oldDice=> oldDice.map(die=>{
        return die.id===id?{...die, isHeld:!die.isHeld} : die
      }))

    }
    
    
    
    function allNewDice() {
      
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

 
    
    function rollDice() {
        if (!tenzies){
        setRolls(oldRolls => oldRolls+1)
        setDice(oldDice=> oldDice.map(die=>{
          return die.isHeld? die: {...die, value: Math.ceil(Math.random() * 6) }
        }))
      }else{
        if(rolls<leastRolls || leastRolls===null){
          localStorage.setItem('leastRolls',rolls)
        }
        setDice(allNewDice())
        setTenzies(false) 
        setRolls(0)
      }
       
    }
    
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDie={holdDie} />
    ))
    
    return (
      <div className="main-body">
        {tenzies && <Confetti/>}
        <main>
            
            <h1 className="tenzies">Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p>Rolls : {rolls}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies?"Reset Game" : "Roll"}</button>
            <h3 >Least Rolls: {leastRolls}</h3>
        </main>
        <p className="developer">By Jhanvi Pandya</p>
      </div>
    )
}