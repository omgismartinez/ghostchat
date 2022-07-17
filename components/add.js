import React from 'react'

export default function AddIcon({ active }) {
    return (
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={`${active ? '#fff' : '#8f939a'}`}
                d="M256,136a12,12,0,0,1-12,12h-8v8a12,12,0,0,1-24,0v-8h-8a12,12,0,0,1,0-24h8v-8a12,12,0,0,1,24,0v8h8A12,12,0,0,1,256,136Zm-53.01953,56.27979a11.99993,11.99993,0,1,1-18.376,15.4375A100.00712,100.00712,0,0,0,31.396,207.7168,11.99993,11.99993,0,1,1,13.02,192.2793a123.94912,123.94912,0,0,1,50.23144-35.9361,72,72,0,1,1,89.4972-.00006A123.94949,123.94949,0,0,1,202.98047,192.27979ZM108,148a48,48,0,1,0-48-48A48.05436,48.05436,0,0,0,108,148Z" />
        </svg>
    )
}
