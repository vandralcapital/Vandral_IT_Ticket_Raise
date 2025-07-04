import React from 'react'
import TicketForm from './TicketForm'
import TicketTable from './TicketTable'

const EmployeeDashboard = () => (
  <div className="space-y-8">
    <TicketForm />
    <TicketTable />
  </div>
)

export default EmployeeDashboard 