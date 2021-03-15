import React from 'react';

export default function CubsGame(props) {

    const {cub, emptyPos} = props;


    let side='';
    const nearEmpty = () => {
        return (emptyPos[0] === cub.pos[0] && emptyPos[1] === cub.pos[1] + 1) ||
            (emptyPos[0] === cub.pos[0] && emptyPos[1] === cub.pos[1] - 1) ||
            (emptyPos[1] === cub.pos[1] && emptyPos[0] === cub.pos[0] + 1) ||
            (emptyPos[1] === cub.pos[1] && emptyPos[0] === cub.pos[0] - 1);
    }


    const initialClick = (id) => {
        if ((emptyPos[0]===cub.pos[0] && emptyPos[1]===cub.pos[1]+1)) side = 'left';
        if ((emptyPos[0]===cub.pos[0] && emptyPos[1]===cub.pos[1]-1)) side = 'right';
        if ((emptyPos[1]===cub.pos[1] && emptyPos[0]===cub.pos[0]+1)) side = 'up';
        if ((emptyPos[1]===cub.pos[1] && emptyPos[0]===cub.pos[0]-1)) side = 'down';
        console.log(side)
        props.changePos(id, side);
    }


    return (
        <>
        <button className={(cub.num===16) ? 'cub-16' : (nearEmpty()) ? 'cub-button-grab': 'cub-button'}
                onClick={()=>initialClick(cub.id)} disabled={!nearEmpty()}>{cub.num}</button>
        </>
    )
}