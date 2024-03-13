'use client'
import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from '@nextui-org/react';

import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';
const pages = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token')
  const id = searchParams.get('id')

  const [newPassword, setNewPassword] = useState("")

  const changePassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password")

    }
    const { data } = await axios.post('/api/auth/verifyForgotPasswordToken', {
      token, id, password: newPassword
    },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    if (data.success) {
      alert(data.message)
      router.push('/login')
    }
  }

  return (
    <div className='flex w-full flex-col justify-center items-center mt-[7rem] '>
      <Tabs aria-label="Options" className="">


// log in
        <Tab key="Log in" title="Log in">
          <Card className="md:w-[40vw] w-[50vw] sm:w-[80vw] sm:flex sm:justify-center sm:items-center sm:h-full">
            <CardBody>
              <form action="" className="flex flex-col justify-between items-center">


                <Input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-[2rem]"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
                <Button onClick={changePassword} >
                  Submit
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>


      </Tabs>
    </div>
  )
}

export default pages
