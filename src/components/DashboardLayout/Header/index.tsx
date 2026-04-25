import React from "react";
import Image from "next/image";
import { DropdownIcon, SearchIcon } from "@/components/Icons";
import styles from "./Header.module.scss";
import { AiOutlineBell } from "react-icons/ai";
import Link from "next/link";

const index = () => {
  return (
    <header className={styles.header}>
      <Link href={'/dashboard'}  className={styles.logo}>
        <Image src="/assets/images/logo.svg" alt="logo" width={174} height={36} />
      </Link>

      <div className={styles.info}>
        <form action="">
          <input
            type="text"
            className={styles.input}
            placeholder="Search for anything"
          />
          <button>
            <SearchIcon />
          </button>
        </form>

        <div>
          <a href="">Docs</a>
          <button className={styles.notificationBell}>
            <AiOutlineBell size={24} />
          </button>

          <section className={styles.profile}>
            <Image
              src="/assets/images/avatar.png"
              className="user-profile-image"
              alt="user avatar"
              width={40}
              height={40}
            />

            <button>
              Adedeji <DropdownIcon />
            </button>
          </section>
        </div>
      </div>
    </header>
  );
};

export default index;
