import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type Bitcoin = {
    bpi: Record<string, number>
    disclaimer: string
    time: {
        updated: string
        updatedISO: string
    }
}

const Result = () => {
    const [error, setError] = useState<boolean>(false)
    const [result, setResult] = useState<Bitcoin | null>(null)

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()

    useEffect(() => {
        axios.get<Bitcoin | null>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${query.get('start')}&end=${query.get('end')}`)
            .then(resp => {
                console.log(resp.data)
                setResult(resp.data)
            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
    }, [])

    const render = () => {
        if (error) return <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
        if (!result) return <p className='text-2xl'>Loading ...</p>
        return ([
            <p className='text-xl font-semibold'>( From {query.get('start')} To {query.get('end')})</p>,
            <ul>{Object.entries(result?.bpi).map(x => <li className='text-xl'>{x[0]} - {x[1].toLocaleString()} THB</li>)}</ul>
        ]
        )
    }

    return (
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            {render()}
        </div>
    )
}

export default Result