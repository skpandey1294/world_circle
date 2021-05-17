import React, { FC, useEffect, useState } from 'react'
import { ThemeProvider } from "styled-components";
import { Card, DropdownList, Header, SearchBar } from ".."
import { getParams } from '../../Util'
import { ModeKind } from '../DetailsPage'
import { apiCall, darkMode, GlobalStyle, modeHandler } from "../../utils"
import { CountryPrimaryDetailsProps } from '../../Types/types'

import './index.css'

const HomePage: FC<{}> = () => {
    const [theme, setTheme] = useState({ mode: localStorage.getItem("mode") || darkMode()})
    const [light, setLight] = useState(localStorage.getItem("mode") !== ModeKind.Dark)
    const [searched, setSearched] = useState(false)
    const [countryList, setCountryList] = useState<CountryPrimaryDetailsProps[]>([])
    const [searchedCountry, setSearchedCountry] = useState<CountryPrimaryDetailsProps[]>([])
    const [countrySearch, setCountrySearch] = useState('')
    const countries = searched ? searchedCountry : countryList

    useEffect(() => {
        if (!countryList.length) {
            apiCall("all").then((response: CountryPrimaryDetailsProps[]) => {
                setCountryList(response) 
            })
            .catch((e: any) => console.error(e));
        }
    }, [])

    const darkModeHandler = () => {
        modeHandler()
        setTheme(prevProp => prevProp.mode !== ModeKind.Dark ? { mode: ModeKind.Dark } : { mode: ModeKind.Light })
        setLight(theme.mode !== ModeKind.Light)
    }

    const onHandler = (region: string) => {
        const params = getParams(region)
        apiCall(params).then((response: CountryPrimaryDetailsProps[]) => {
        setSearched(false)
        setCountryList(response)
        })
        .catch((e: any) => console.error(e));
    }

    const onEnter = () => {
        const expression = `${countrySearch}.*$`;
        const regEx = new RegExp(expression, "i");
        const filteredCountries = countryList.filter((country) => country.name.match(regEx))
        setSearched(true)
        setSearchedCountry(filteredCountries)
    }

    const onChange = (e: any) => {
        setCountrySearch(e)
        if (!e) {
            setSearched(false)
        }
    }
    
    return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="container">
            <Header light={light} darkModeHandler={darkModeHandler} />
            <div className="country-search">
                <SearchBar onChange={onChange} onEnter={onEnter} />
                <DropdownList onHandler={onHandler} />
            </div>
            <div className='countries-list'>
            {countries?.map(country =>
            <Card
              light={light}
              country={country}
              key={country.name}
            />
            )}
            </div>
        </div>
    </ThemeProvider>
    )
}

export default HomePage