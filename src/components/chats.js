import React, { useEffect, useRef } from 'react'
import Chat from '../elements/chat'
import ScrollToBottom from 'react-scroll-to-bottom';



const Chats = ({data, isTyping, setIsTyping}) =>{
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [data]);

    return (<div className='chats flex flex-col overflow-y-auto max-w-3xl w-full mx-auto flex-1 focus:border-gray-200 px-5' >
       {data&&data.chats&&data.chats.map((item,index)=>(
        <Chat data={item} key={index} isTyping={isTyping} setIsTyping={setIsTyping} isLast={index===data.chats.length-1}/>
       ))}
      
        <div ref={messagesEndRef} />
    </div>)
}

export default Chats