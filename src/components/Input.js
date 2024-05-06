import React, { useState } from 'react';
import Send from '../assets/send.svg'
import Stop from '../assets/stop.svg'
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalState } from '../state';
import { base_api } from '../constant/url';
import { getToken, setLoading } from '../state/functions';
import { toast } from 'react-toastify';


const Input = ({ setData, chatData, chats, setIsTyping, getAllChats, shared }) => {
    const [value, setValue] = useState("")
    let { chatId } = useParams();
    const [auth] = useGlobalState('auth');
    const [loading] = useGlobalState('loading');
    const navigate = useNavigate();

    const updateChat = (name, message, bot) => {
        if(bot){
            setIsTyping(true)
        }
        else{
            setIsTyping(false)
        }
        var temp = { ...chatData }
        if (temp['chats']) {
            temp['chats'] = [...temp['chats'], { name: name, message: message, bot }]
        }
        else {
            temp["chats"] = [{ name: name, message: message }]
        }
        chatData = { ...temp }
        setData(temp)
        console.log(chatData, temp, name)

    }

    const onChatSubmit = () => {
        if (value == "") {
            return
        }
        let data = {}
        if (auth !== null) {
            data = { ...auth }
        }
        updateChat("You", value)
        setValue("")
        let body = {
            name: data.name,
            user: data['id'],
            token: data.token,
            message: value,
            chatId
        }
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch(`${base_api}/chats/chat`, requestOptions)
            .then(response => response.json())
            .then(async data => {
                if (!data.error) {
                    setLoading(false)
                    // console.log(data)
                    if (data.message) updateChat("ChatGPT", data.message, true)


                    if (data.chatId && !chatId) {
                        // SetDataChange(false)
                        getAllChats()
                        setTimeout(navigate(`/c/${data.chatId}`), 500)
                    }
                }
                else {
                    setLoading(false)
                }
            });

    }

    const onFork = () =>{
        const token = getToken()
        if(!token){
          navigate(`/`)
          toast.error("You are not authorised to view the chat", {
            position: "top-center"
          });
          return
        }
        let body = {
          chatId,
          token:token
      }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      };
      fetch(`${base_api}/chats/forkChat`, requestOptions)
          .then(response => response.json())
          .then(async data => {
              if (!data.error) {
                  setLoading(false)
                  if (data.chatId) {
                   
                    navigate(`/c/${data.chatId}`)
                    getAllChats()
                      // SetDataChange(false)
                      // setTimeout(navigate(`/c/${data.chatId}`), 500)
                  }
              }
              else {
                  setLoading(false)
                  toast.error("Error retriving the chat", {
                    position: "top-center"
                  });
              }
          })
          .catch((err)=>{
            setLoading(false)
            toast.error("Error retriving the chat", {
              position: "top-center"
            });
          })
      
    }

    const checkEnter=(event)=> {
        if (event.keyCode === 13 && value!=="") {
            onChatSubmit()
        }
    }
    return (<div>
       {!shared? <div className="relative my-2 rounded-xl	 shadow-sm max-w-3xl mx-auto focus:border-gray-200 ring-0 focus:ring-0  pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] juice:w-full">

            <input type="text" autoComplete="off"  onKeyDown={(e) => checkEnter(e) } name="messagGPT" value={value} onChange={(e) => setValue(e.target.value)} id="messageGPT" className="block w-full 	focus:ring-0 rounded-xl	 bg-transparent	 border-1 py-4 pl-7 pr-20 text-white placeholder:text-gray-400 border border-gray-600 focus:border-gray-200 sm:text-sm sm:leading-6" placeholder="Message ChatGPT" />
            <div className={`absolute inset-y-0 rounded-xl	 mr-2 my-3  right-0 flex items-center   ${value == "" ? "bg-gray-600" : "bg-white"}`}>
                <button onClick={() => onChatSubmit()} disabled={value===""} className={` border-0 ${value == "" ? "bg-gray-600" : "bg-white "} rounded-xl	 py-0 pl-2 pr-2 text-gray-500  sm:text-sm `}>
                    {!loading ? <img src={Send} alt='send button' /> : <img className='rounded' src={Stop} alt='send button' />}
                </button>
            </div>
        </div>:<div className='flex justify-center'>
                                    <button onClick={()=>onFork()} className="text-white bg-[rgba(16,163,127)] px-4  mx-auto my-3 rounded py-2 pointer hover:bg-[rgba(16,163,127,0.3)]">Fork Chat</button>
                              </div>  }
        <p className='text-gray-300  text-center' style={{ fontSize: 10 }}>  ChatGPT can make mistakes. Consider checking important information. Read our <a className='underline' href='#'>Terms</a> and <a className='underline' href='#'> Privacy Policy</a>.</p>
    </div>
    )
}

export default Input;