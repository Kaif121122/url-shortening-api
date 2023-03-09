import React, { useEffect, useState } from 'react'
import brandImg from '../images/icon-brand-recognition.svg'
import detailedImg from '../images/icon-detailed-records.svg'
import fullyImg from '../images/icon-fully-customizable.svg'

const getLocalStorage = () => {
    let link = localStorage.getItem("link");

    if (link) {
        return JSON.parse(localStorage.getItem("link"))
    } else {
        return []
    }
}

const Main = () => {

    const cardArr = [{
        image: brandImg,
        heading: "Brand Recognition",
        para: " Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content."
    },
    {
        image: detailedImg,
        heading: "Detailed Records",
        para: " Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
    },
    {
        image: fullyImg,
        heading: "Fully Customizable",
        para: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
    }]

    const API = 'https://api.shrtco.de/v2/shorten?url='
    const [inputField, setInputField] = useState(false)
    const [text, setText] = useState('');
    const [link, setLink] = useState(getLocalStorage())
    const [copy, setCopy] = useState()

    console.log(link)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            console.log('empty')
            setInputField(true)
        } else {
            const shortUrl = async () => {
                try {
                    const res = await fetch(API + `${text}`)
                    const data = await res.json()
                    console.log(data)
                    if (data.ok === true) {
                        setLink([...link,
                        {
                            original_link: data.result.original_link,
                            short_link: data.result.short_link
                        }
                        ])
                    }

                    setText('')
                } catch (error) {
                    console.log(error)
                }
            }
            shortUrl()
        }
    }

    const handleCopy = (elem, index) => {
        console.log(navigator.clipboard.writeText(elem.short_link));
        setCopy(index)
    }

    useEffect(() => {
        localStorage.setItem("link", JSON.stringify(link))
    }, [link])


    return (<>
        <main className="main container">
            <section className="search-section">
                <form onSubmit={() => onSubmit} action="" className={inputField ? "form flex flex-col error" : "form flex flex-col"}>
                    <div className="search-input"> <input value={text} onChange={(e) => setText(e.target.value)} placeholder='Shorten a link here...' type="text" className="form-input" />

                        <button onClick={onSubmit} className="btn search-btn">Shorten It!</button></div>
                    <p className="error-para none">please add a link</p>
                </form>
            </section>

            <section className="total-links flex flex-col">
                {
                    link.map((elem, index) => {
                        return <div key={index} className="single-link-container flex">
                            <h3 className="original-link-h3">{elem.original_link}</h3>

                            <div className="right-link-container flex">
                                <h3 className="shorter-link-h3">{elem.short_link}</h3>
                                <button onClick={() => handleCopy(elem, index)} style={copy === index ? { backgroundColor: "hsl(260, 8%, 14%)" } : { backgroundColor: "hsl(180, 66%, 49%)" }} className="btn links-btn">{copy !== index ? "Copy" : "Copied!"}</button>
                            </div>
                        </div>
                    })
                }

            </section>

            <section className="first-section flex flex-col">
                <div className="first-main-content flex flex-col">
                    <h2 className="common-h2">Advanced Statistics</h2>
                    <p className="common-para main-1st-para">Track how your links are performing across the web with our
                        advanced statistics dashboard.</p>
                </div>

                <div className="card-container flex">
                    {
                        cardArr.map((elem, index) => {
                            return <div key={index} className="card flex flex-col">

                                <div className="card-img-container"><img src={elem.image} alt="" className="card-img" /></div>
                                <h3 className="common-h3">{elem.heading}</h3>
                                <p className="common-para main-2nd-para">{elem.para}</p>

                            </div>
                        })
                    }

                </div>
            </section>



        </main>

        <section className="second-section flex flex-col container">
            <h2 className="second-h2">Boost your links today</h2>
            <div className="second-btn-container">
                <button className="btn get-started-btn">Get Started</button>
            </div>
        </section>
    </>
    )
}

export default Main