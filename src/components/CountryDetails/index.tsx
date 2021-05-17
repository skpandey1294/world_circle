import React, { FC, Fragment, useEffect, useState } from "react"
import { SecondaryDetails, Loading } from '..'
import { CountrySecondaryDetailsProps } from '../../Types/types'
import { apiCall } from "../../utils"

import './index.css'

type CountryDetailsProps = {
    name: string;
    capital: string;
    light?: boolean;
}

const CountryDetails: FC<CountryDetailsProps> = ({ name, capital, light }) => {
    const [country, setCountry] = useState<CountrySecondaryDetailsProps>()
    const fetchParams = name !== "Antarctica" ? `capital/${capital}` : `name/${name}`

    useEffect(() => {
        apiCall(fetchParams)
        .then((response: CountrySecondaryDetailsProps[]) => setCountry(response[0]))
        .catch((e: any) => console.error(e))
    }, [])

    return (
    <Fragment>
        <div className="details-container">
            {country === undefined ? 
            <Loading light={light} /> : 
            <SecondaryDetails
             country={country}
             light={light}
            />}
        </div>
    </Fragment>
      )
    }

export default CountryDetails
