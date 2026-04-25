"use client";
import React from 'react'
import styles from './Users.module.scss'
import UsersInfoCard from './components/UsersInfoCard'
import { ActiveUsersCardIcon, TotalUsersCardIcon, UsersLoansCardIcon, UsersSavingsCardIcon } from '@/components/Icons'
import UsersTable from './components/UsersTable'
import { useQuery } from '@tanstack/react-query'
import { getUsersTableData } from '@/services/users'
import { User } from '@/types'

const UsersPage = () => {
  const { data } = useQuery<User[]>({
    queryKey: ["customers-users"],
    queryFn: getUsersTableData,
    staleTime: 300 * 1000,
  });

  const totalUsers = data?.length ?? 0;
  const activeUsers = data?.filter(u => u.status.toLowerCase() === 'active').length ?? 0;
  const usersWithLoans = data?.filter(u => u.loanAmount).length ?? 0;
  const usersWithSavings = data?.filter(u => u.status.toLowerCase() !== 'blacklisted').length ?? 0;

  return (
    <div className={styles.users}>
      <h2>Users</h2>

      <section className={styles.cardsSlider}>
        <UsersInfoCard cardTitle='Users' amount={totalUsers} icon={TotalUsersCardIcon}/>
        <UsersInfoCard cardTitle='Active users' amount={activeUsers} icon={ActiveUsersCardIcon}/>
        <UsersInfoCard cardTitle='Users with loans' amount={usersWithLoans} icon={UsersLoansCardIcon}/>
        <UsersInfoCard cardTitle='Users with savings' amount={usersWithSavings} icon={UsersSavingsCardIcon}/>
      </section>

      <section>
        <UsersTable />
      </section>
    </div>
  )
}

export default UsersPage
