import '../App.css';
import { useEffect, useState } from 'react';
import Drawer from '../components/drawer2';
import DrawerMobile from '../components/drawerMobile';
import Card from '../elements/historyCard';
import Navbar from '../components/NavBar';
import Input from '../components/Input';
import React from 'react';
import Chats from '../components/chats';
import { useGlobalState } from '../state';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken, setLoading } from '../state/functions';
import { base_api } from '../constant/url';
import HistoryRender from '../elements/historyRender';
// import SharePopup from '../elements/sharePopup';
var chatData = {};



function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenM, setIsOpenM] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [auth] = useGlobalState('auth');
  const [loading] = useGlobalState('loading');
  const [data, setData] =useState({})
  const [allChats, setAllChats] =useState([])
  const [shared, setShared] =useState(false)
  const [show, setShow] =useState(false)
  let { chatId } = useParams();
  const navigate = useNavigate();
  const getChat=(chatId)=>{
    // console.log(chatId)
    setShared(false)
    const token = getToken()
    // if(!token){
    //   navigate(`/`)
    //   toast.error("You are not authorised to view the chat", {
    //     position: "top-center"
    //   });
    //   return
    // }
    let body = {
      chatId,
      token:token
  }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  fetch(`${base_api}/chats/getChat`, requestOptions)
      .then(response => response.json())
      .then(async data => {
          if (!data.error) {
              setLoading(false)

              // updateChat("ChatGPT", data.message)
              if(data.shared){
                setShared(data.shared)
              }
              if (data.data) {
                chatData={...data.data}
                setData(data.data)
                
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

  const getAllChats=()=>{
    const token = getToken()
    if(!token){
      return
    }
    let body = {
      token:token
  }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  fetch(`${base_api}/chats/allChats`, requestOptions)
      .then(response => response.json())
      .then(async data => {
          if (!data.error) {
              setLoading(false)

              // updateChat("ChatGPT", data.message)

              if (data.data) {
                setAllChats(data.data)
                // console.log(data)
                  // SetDataChange(false)
                  // setTimeout(navigate(`/c/${data.chatId}`), 500)
              }
          }
          else {
              setLoading(false)
              toast.error("Error retriving the all chat", {
                position: "top-center"
              });
          }
      })
      .catch((err)=>{
        setLoading(false)
        toast.error("Error retriving the all chat", {
          position: "top-center"
        });
      })
  }
  useEffect(()=>{
    if(chatId){
      getChat(chatId)
    }
    else{
      setData({})
    }
  },[chatId])

  useEffect(()=>{
      getAllChats()
  },[])



  return (
    <div className="	flex-initial h-full flex  w-full scroll-p-0	">
      <Drawer open={isOpen} setOpen={setIsOpen} auth={auth} >
        <HistoryRender allChats={allChats} setShow={setShow}/>
      </Drawer>
      <DrawerMobile open={isOpenM} setOpen={setIsOpenM} auth={auth}>
      <HistoryRender allChats={allChats} setIsOpenM={setIsOpenM} setShow={setShow}/>
      
      </DrawerMobile>
      <div>
                   {!isOpen? <button onClick={()=>setIsOpen(true)} className="absolute top-[50%] left-[10px] lines flex h-6 w-6 flex-col items-center hidden md:flex">
                        <div className="h-3 w-1 rounded-full lineFirst2" style={{ background: "#9b9b9b" }}></div>
                        <div className="h-3 w-1 rounded-full lineSecond2" style={{ background: "#9b9b9b" }}></div>
                    </button>:null}
                </div>
      <div className='w-full h-full flex flex-col overflow-y-auto  transition ease-in-out duration-500 '>
      <Navbar setIsOpen={setIsOpenM} auth={auth}/>
        <Chats data={data} isTyping={isTyping} setIsTyping={setIsTyping}/>
        <Input setData={setData } chats={data} chatData={chatData} shared={shared} setIsTyping={setIsTyping} getAllChats={getAllChats}/>
      </div>
     {/* <SharePopup show={show} setShow={setShow}/> */}
    </div>
  );
}

export default Main;
