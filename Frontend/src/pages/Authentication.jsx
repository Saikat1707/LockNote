import React, { useState } from 'react'
import "../css/pagesCSS/AuthCSS.css"
import CreateRouteBox from '../component/CreateRouteBox'
import LoginUser from '../component/LoginUser'
import InfoPage from '../component/InfoPage'

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(1)
    const handleOptions = (value)=>{
        setIsLogin(value)
    }
  return (
    <div>
        <div className="HeroTexts">
            <div className="HeroWrapper">
                <div className="HeroLogo">
                    <h1>Lo<span>c</span>kN<span>o</span>te</h1>
                    <iframe src="https://lottie.host/embed/b70361f9-e6e1-46a0-b8a5-6c515434aa5a/fUY3OurkLQ.lottie"
                    style={{ border: "none" }}></iframe>
                </div>

                <div className="HeroWorkFunctions">
                    <ol>
                        <li>📝 Create unlimited <span> encrypted </span> notes</li>
                        <li>📁 Create & organize <span> folders </span></li>
                        <li>📄 Create and manage <span> files </span> inside folders</li>
                        <li>🗑️ Instantly <span> delete </span> notes, files & folders</li>
                        <li>🔐 <span> End-to-end </span> encryption — zero knowledge</li>
                        <li>⚡ Fast, secure & <span> account-free </span> access</li>
                    </ol>
                </div>
                <p>LockNote is a secure online notepad that lets you create, organize,
                    and manage encrypted notes, files, and folders effortlessly. 
                    With end-to-end encryption, zero-knowledge storage, and account-free 
                    access, your data stays private and safe. Fast, simple, and free, 
                    LockNote ensures your notes are always under your control—no ads, no 
                    tracking, just secure writing anywhere, anytime</p>
                </div>
        </div>

        <div className="RoutingInputs">
            <div className="InputOptions">
                <div className="login" onClick={()=>handleOptions(1)}>🔓 Unlock</div>
                <div className="createRoute" onClick={()=>handleOptions(2)}>🆕 Create</div>
            </div>
            {isLogin == 1 ? <LoginUser/> : <CreateRouteBox/>}
        </div>

        <InfoPage/>

    </div>
  )
}

export default Authentication