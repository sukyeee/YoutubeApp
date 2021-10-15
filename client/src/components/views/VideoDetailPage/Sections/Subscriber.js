import React , {useEffect, useState} from 'react'
import {Button} from 'antd'
import Axios from 'axios'


function Subscriber(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    
    const variable = {userTo:props.userTo }

    useEffect(() => {
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if (response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber)
           
            } else {
                alert('Failed to get subscribeNumber')
            }
        })

        const subscribeVariable = {userTo:props.userTo, userFrom:props.userFrom }

        Axios.post('/api/subscribe/subscribed', subscribeVariable)
        .then(response => {
            if (response.data.success) {
                setSubscribed(response.data.subscribed)
            } else {
                alert('Failed to get Subscribed')
            }
        })



    }, [])


    const onClickSubscriber = () => {

        let subscribedVariable = {
            userTo:props.userTo,
            userFrom:props.userFrom
        } 

          if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber-1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소 실패')
                }
            })

          } else {
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber+1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독하는데 실패')
                }
            })
          }
    }

    //Movie.writer == userTo같으면 구독버튼 보이지않게
    
       
        return (
            <div>
            {  (props.userFrom != props.userTo )?
                <Button onClick={onClickSubscriber} style={{'backgroundColor' : (Subscribed ? "red" : "" )}}> {SubscribeNumber} {Subscribed? 'Subscribed' : 'Subscribe'}</Button>
                : "" 
            }
            </div>
        )
    
    
}

export default Subscriber
