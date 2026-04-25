"use client";
import React from "react";
import Image from "next/image";
import styles from "./login.module.scss";
import Input from "@/components/FormInputs/Input";
import Button from "@/components/FormInputs/Button";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Please enter password"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (_data: LoginFormValues) => {
    await new Promise((res) => setTimeout(res, 2000));
    router.push("/customers/users");
    toast.success("Successfully logged in");
  };

  return (
    <main className={styles.root}>
      <section>
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          className="logo"
          width={174}
          height={36}
        />
        <Image
          src="/assets/images/sign-in-image.svg"
          alt="sign in"
          className="sign-in-image"
          width={600}
          height={600}
        />
      </section>

      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="heading">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </div>

          <Input
            id="email"
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            registration={register("email")}
          />

          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            error={errors.password?.message}
            registration={register("password")}
          />

          <a href="">FORGOT PASSWORD?</a>

          <Button isLoading={isSubmitting} disabled={isSubmitting}>
            LOG IN
          </Button>
        </form>
      </section>
    </main>
  );
};

export default page;
