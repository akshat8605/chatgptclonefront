import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../state/functions";
import { base_api } from "../constant/url";

export default function Card({ data }) {
  const navigate = useNavigate()
  let { chatId } = useParams();

  const gotoChat = () => {
    navigate(`/c/${data['_id']}`)
  }
  const onshare =()=>{
    toast("Link copied to clipboard you can share now!",{
      position: "top-center"
    })
    const token = getToken()
  
    let body = {
      chatId,
      token:token
  }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  fetch(`${base_api}/chats/share`, requestOptions)
      .then(response => response.json())
      .then(async data => {
          if (!data.error) {

              // updateChat("ChatGPT", data.message)

              if (data.data) {
                console.log(data)
                
                  // SetDataChange(false)
                  // setTimeout(navigate(`/c/${data.chatId}`), 500)
              }
          }
          else {
              toast.error("Error enabling share option", {
                position: "top-center"
              });
          }
      })
      .catch((err)=>{
        toast.error("Error enabling share option", {
          position: "top-center"
        });
      })
  }
  return (
    data && data.date ? <div className="rounded-md p-1.5  text-gray-300 text-[12px] w-full ">
      {data.value}
    </div> : <div className="rounded-md p-1.5 history text-white w-[220px]  cursor-pointer hover:bg-zinc-700	flex justify-between">
      <div className="whitespace-nowrap	overflow-hidden" onClick={() => gotoChat()}>
        {data.title}
      </div>
      <div className="bg-zinc-700 flex pl-3 pr-1  historyButton z-[9999]	">
        <CopyToClipboard text={window.location.href}
          onCopy={() => onshare()}>
          <button className="mr-1">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z" fill="currentColor"></path></svg>
          </button>
        </CopyToClipboard>


        {/* <button>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" fill="currentColor"></path></svg>
        </button> */}
      </div>
    </div>
  );
}
