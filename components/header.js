import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useConversation } from 'context/context'
import Signout from './signout'
import ChangeIcon from './change'
import AddIcon from './add'
import Users from './users'
import Hash from './hash'

export default function Header({ user, room }) {
    const [hoverSignout, setHoverSignout] = useState(false)
    const [hoverChange, setHoverChange] = useState(false)
    const [hoverAddUser, setHoverAddUser] = useState(false)
    const [participants, setParticipants] = useState([])

    const { conversationContext } = useConversation()

    useEffect(() => {
        if (room) {
            getParticipants()
        }
    }, [conversationContext])

    async function getParticipants() {
        const allParticipants = await conversationContext.participants
        allParticipants.forEach(p => {
            setParticipants([p.identity])
        })
    }

    return (
        <div className={`flex items-center 
                        w-full transition-all gap-8 mb-2 relative
                        ${room ? 'py-6 border-b-2 border-[#1a1b1c] justify-between' : 'py-4 justify-center'}`}>
            {
                room && (
                    <div className={`flex gap-2 items-center ${room ? 'z-10' : ''}`}>
                        <div className={`${room ? 'visible' : 'hidden'}
                                flex justify-start items-center
                                gap-1 bg-[#151617] px-2 py-1 rounded-md max-w-[6rem] overflow-hidden
                                text-sm text-[#8f939a] lowercase font-semibold`}>
                            <Hash className={`${room ? 'visible' : 'hidden'}`} />
                            {room}
                        </div>
                        <div className='
                                flex justify-center items-center h-full
                                gap-2 bg-[#151617] px-2 py-1 rounded-md
                                text-sm text-[#8f939a] lowercase font-semibold'>
                            <Users /> <span>{participants.length}</span>
                        </div>
                    </div>
                )
            }
            {
                user && (
                    <div className='flex justify-center items-center gap-2 w-full absolute'>
                        <Image src={user.picture} alt={user.name} className='rounded-full'
                            placeholder='blur' blurDataURL='#1a1b1c' width={28} height={28} />
                        <span className={`${room ? 'hidden' : 'visible'} lowercase`}>{user.name} / {user.username}</span>
                    </div>
                )
            }
            <div className={`flex gap-6 text-sm ${!room ? 'absolute right-0' : 'z-10'}`}>
                <Link href={'/'}>
                    <a
                        onMouseEnter={() => setHoverAddUser(true)}
                        onMouseLeave={() => setHoverAddUser(false)}
                        className={`${!room ? 'hidden' : 'visible'}
                            flex justify-center items-center
                            gap-1 rounded-xl transition-all
                            text-md font-bold text-[#8f939a] hover:text-white`}>
                        <AddIcon active={hoverAddUser} />
                        <span className='hidden md:block'>Add</span>
                    </a>
                </Link>
                <Link href={'/'}>
                    <a
                        onMouseEnter={() => setHoverChange(true)}
                        onMouseLeave={() => setHoverChange(false)}
                        className={`${!room ? 'hidden' : 'visible'}
                            flex justify-center items-center
                            gap-1 rounded-xl transition-all
                            text-md font-bold text-[#8f939a] hover:text-white`}>
                        <ChangeIcon active={hoverChange} />
                        <span className='hidden md:block'>Room</span>
                    </a>
                </Link>
                <Link href={'/signin'}>
                    <a
                        onClick={() => signOut()}
                        onMouseEnter={() => setHoverSignout(true)}
                        onMouseLeave={() => setHoverSignout(false)}
                        className={`
                            flex justify-center items-center
                            gap-1 rounded-xl transition-all
                            text-md font-bold text-[#8f939a] hover:text-white`}>
                        <Signout active={hoverSignout} />
                        <span className='hidden md:block'>Sign out</span>
                    </a>
                </Link>

            </div>
        </div>
    )
}
