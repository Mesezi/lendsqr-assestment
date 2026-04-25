"use client";
import React from "react";
import styles from "./Dashboard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getUsersTableData } from "@/services/users";
import { User } from "@/types";
import {
  TotalUsersCardIcon,
  ActiveUsersCardIcon,
  UsersLoansCardIcon,
  UsersSavingsCardIcon,
} from "@/components/Icons";
import UsersInfoCard from "../customers/users/components/UsersInfoCard";
import { formatNumberWithCommas } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DashboardPage = () => {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["customers-users"],
    queryFn: getUsersTableData,
    staleTime: 300 * 1000,
  });

  const totalUsers = data?.length ?? 0;
  const activeUsers = data?.filter((u) => u.status.toLowerCase() === "active").length ?? 0;
  const usersWithLoans = data?.filter((u) => u.loanAmount).length ?? 0;
  const usersWithSavings = data?.filter((u) => u.status.toLowerCase() !== "blacklisted").length ?? 0;

  return (
    <main className={styles.dashboard}>
      <h2>Dashboard</h2>

      {isLoading ? (
        <div className={styles.loading}>
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        <>
          <section className={styles.cards}>
            <UsersInfoCard cardTitle="Users" amount={totalUsers} icon={TotalUsersCardIcon} />
            <UsersInfoCard cardTitle="Active Users" amount={activeUsers} icon={ActiveUsersCardIcon} />
            <UsersInfoCard cardTitle="Users with Loans" amount={usersWithLoans} icon={UsersLoansCardIcon} />
            <UsersInfoCard cardTitle="Users with Savings" amount={usersWithSavings} icon={UsersSavingsCardIcon} />
          </section>

          <section className={styles.summary}>
            <div className={styles.summaryCard}>
              <h4>User Status Breakdown</h4>
              <ul>
                {["Active", "Inactive", "Pending", "Blacklisted"].map((status) => {
                  const count = data?.filter((u) => u.status.toLowerCase() === status.toLowerCase()).length ?? 0;
                  return (
                    <li key={status} data-status={status.toLowerCase()}>
                      <span>{status}</span>
                      <strong>{formatNumberWithCommas(count)}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.summaryCard}>
              <h4>Users by Organization</h4>
              <ul>
                {Array.from(new Set(data?.map((u) => u.organization)))
                  .slice(0, 8)
                  .map((org) => {
                    const count = data?.filter((u) => u.organization === org).length ?? 0;
                    return (
                      <li key={org}>
                        <span>{org}</span>
                        <strong>{formatNumberWithCommas(count)}</strong>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default DashboardPage;
