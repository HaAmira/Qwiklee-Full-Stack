import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer  style={{backgroundColor: "rgb(148 163 184 / 9%)"}} className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p>©All Right Reserved 2024.</p>
            <div className='px-3 flex items-center justify-center gap-4 text-2xl'>
                <a href='' className='hover:text-primary-100'>
                    <FaFacebook />
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaInstagram />
                </a>
                <a href='' className='hover:text-primary-100'>
                    <FaLinkedin />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
