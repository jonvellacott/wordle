import React,{useContext} from 'react'

import { AppContext } from "../App";
function Board() {
  const { gridState } = useContext(AppContext);
  
  const getClass = () => {

  }

  
      return (
        <div className="board">
        {gridState.map(row =>(
             <div className="row" >
                 
                     {row.map(l =>(
                        //<Tile value={l.value} mode={l.state} />
                        <div className={l.status ? 'letter  ' + l.status :  'letter'}>{l.value}</div>
                     ))}

             </div>
        ))}
     </div>
      )
  }


export default Board