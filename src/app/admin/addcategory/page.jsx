'use client';

import React from 'react';

import AddCategory from '@/components/AddCategory/index'

const Page = () => {


  return (
    <div className='pt-[6rem] min-h-[100vh] bg-gray-600 py-8'>
      <AddCategory type={'category'}/>
    </div>
  );
};

export default Page;
