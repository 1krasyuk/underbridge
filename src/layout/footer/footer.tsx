import { Link } from "react-router-dom"
import { Instagram, Send } from 'lucide-react'


export default function Footer() {

    return <div className="container w-2/3 flex flex-col mt-10">
        
        <div className="flex-row justify-between space-x-5 my-4 ">

            <div className="flex-row justify-between items-center text-xs tracking-wide font-semibold uppercase space-x-10">
                <p className="my-4">  <Link to="/about"> О НАС </Link> </p>
                <p className="my-4">  <Link to="/faq"> FAQ </Link> </p>
                <p className="my-4">  <Link to="/delivery"> Доставка </Link> </p>
                <p className="my-4">  <Link to="/contacts"> Контакты </Link> </p>
            </div>

            <div className="flex-row justify-between items-center space-x-5" >

                <Instagram size={24} strokeWidth={2}/>
                <Send size={24} strokeWidth={1.5}/>
                <p className="uppercase font-bold text-md">Underbridge</p>

            </div>

        </div>

    </div>
    
}