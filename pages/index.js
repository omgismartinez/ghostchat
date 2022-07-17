import { useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { authOptions } from './api/auth/[...nextauth]'

import { useUser } from 'context/context'
import Layout from 'components/layout'
import Header from 'components/header'
import Form from 'components/form-select-room'

export default function Home({ user }) {
  const { setUserContext } = useUser()

  useEffect(() => {
    document.getElementById('main').style.opacity = 1
    setUserContext(user)
  }, []);

  return (
    <Layout page={`Secret chat`}>
      <div className='flex justify-center items-center h-5/6'>
        <div className='flex flex-col justify-center items-center w-full duration-500
          bg-[#242628] rounded-2xl p-4 opacity-0' id='main'>
          <Header user={user} />
          <Form />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  const accessTokenNextAuth = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET
  })

  return {
    props: {
      user: accessTokenNextAuth,
    },
  }
} 
