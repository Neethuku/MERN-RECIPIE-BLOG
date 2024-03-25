import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'

function FooterComponent() {
  return (
    <Footer container className="border border-t-8">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>ish <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>elight
                </Link> 
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                   <div>
                   <Footer.Title title="ABOUT"></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="https://react.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            React
                        </Footer.Link>
                        <Footer.Link
                        href="https://react-bootstrap.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            React Bootstrap
                        </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                   <div>
                   <Footer.Title title="FOLLOW US"></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            Github
                        </Footer.Link>
                        <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            LinkedIn
                        </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                   <div>
                   <Footer.Title title="LEGAL"></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            Terms & Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="BlogVista" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook}/>
                    <Footer.Icon href="#" icon={BsInstagram}/>
                    <Footer.Icon href="#" icon={BsTwitter}/>
                    <Footer.Icon href="#" icon={BsGithub}/>
                    <Footer.Icon href="#" icon={BsDribbble}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComponent