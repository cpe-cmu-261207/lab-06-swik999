import { useEffect, useState } from "react"
import axios from "axios"
import { Link, Route, useHistory } from "react-router-dom"

const History = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const history = useHistory()

    const check = () => {
        const currentDate = new Date()
        if (Date.parse(start) > Date.parse(end) || start === "" || end === ""
            || Date.parse(start) > currentDate.getTime() || Date.parse(end) > currentDate.getTime()) alert('Please select start date and end date correctly')
        else history.push(`/history/result?start=${start}&end=${end}`)
    }

    return (
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => {
                console.log(e.target.value)
                setStart(e.target.value)
            }}></input>
            <span>To date</span>
            <input type='date' onChange={e => {
                console.log(e.target.value)
                setEnd(e.target.value)
            }}></input>
            <br />
            <button onClick={check}>Get data</button>
        </div>
    )
}

export default History