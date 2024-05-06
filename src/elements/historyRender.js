import React from 'react'
import Card from './historyCard'


const HistoryRender = ({allChats, setIsOpenM}) => {
    let date;
    let show;
    // console.log(allChats)
    return (
        allChats  && allChats.map((item, index) => {
            show=false
            if(date!==item.createdAt.substring(0,4)){
                date = item.createdAt.substring(0,4)
                show=true
            }
            return(<>
            {show?  <Card data={{date:true, value:date}}/>:null}
                 <Card data={item} setIsOpenM={setIsOpenM}/>
                 </> )
        }
        )
    )
}

export default HistoryRender