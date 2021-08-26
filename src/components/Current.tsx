import axios from "axios"
import { useEffect, useState } from "react"

type Bitcoin = {
    time: {
        updated: string
        updatedISO: string
        updateduk: string
    }
    disclaimer: string
    bpi: {
        USD: {
            code: string
            rate: string
            description: string
            rate_float: number
        }
        THB: {
            code: string
            rate: string
            description: string
            rate_float: number
        }
    }
}

const Current = () => {
    const [current, setCurrent] = useState<Bitcoin | null>(null)

    useEffect(() => {
        axios.get<Bitcoin | null>('https://api.coindesk.com/v1/bpi/currentprice/thb.json')
            .then(resp => {
                console.log(resp.data)
                setCurrent(resp.data)
            })
            .catch(err => console.log(err))
    }, [])

    const render = () => {
        if (current === null) return <p className='text-2xl'>Loading ...</p>
        return (
            <div>
                <p className='text-2xl'>{current?.bpi.THB.rate_float.toLocaleString()} THB</p>
                <p> (Last updated {current?.time.updated}) </p>
            </div>
        )
    }

    return (
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Current price</p>
            {render()}
        </div>
    )
}

export default Current