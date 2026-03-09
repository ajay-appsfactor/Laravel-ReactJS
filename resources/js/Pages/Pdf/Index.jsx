import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

const Index = () => {
  return (
    <>
     <AuthenticatedLayout>
        <Head title="PDF Upload" />
       <div>
        <h2>PDF</h2>
       </div>
      
      </AuthenticatedLayout>
      </>
  )
}

export default Index