"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/modal_register.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { registerUser, userLogin } from "@/redux/features/authActions";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Error } from "./styled";
import Spinner from "./Spinner";

function ModalRegister() {
  const registerModal = useSearchParams()!.get("registerModal");
  const pathname = usePathname();
  const [signUp, setSignUp] = useState<boolean>(true);
  const [customError, setCustomError] = useState<string | null>(null);
  const { loading, userInfo, error, success } = useAppSelector((state) => ({
    loading: state.auth.loading,
    userInfo: state.auth.userInfo,
    error: state.auth.error,
    success: state.auth.success,
  }));

  useEffect(() => {
    if (registerModal && success && userInfo) {
      redirect("/home");
    }
  }, [success, registerModal, userInfo]);

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const submitForm = (data: any) => {
    if (signUp && data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
    }
    data.email = data.email.toLowerCase();
    if (signUp) {
      dispatch(registerUser(data));
    } else {
      dispatch(userLogin(data));
    }
  };

  if (registerModal) {
    return (
      <div className={styles.modalregister}>
        <main>
          <form onSubmit={handleSubmit(submitForm)}>
            <Link href={pathname!}>BACK TO MAIN PAGE</Link>
            <h1>{signUp ? "REGISTER" : "Sign In"}</h1>
            {error && <Error>{error}</Error>}
            {customError && <Error>{customError}</Error>}
            {signUp && (
              <div className="form-group" aria-label="Name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-input"
                  {...register("name")}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-input"
                {...register("email")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-input"
                {...register("password")}
                required
              />
            </div>
            {signUp && (
              <div className="form-group">
                <label htmlFor="email">Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  {...register("confirmPassword")}
                  required
                />
              </div>
            )}
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="button orange large"
                disabled={loading}
              >
                {signUp ? "Sign Up" : "Sign In"}
              </button>
            )}
            <div>
              <span>
                Already have an account? Please,
                <span
                  onClick={() => setSignUp((prevState) => !prevState)}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "orange",
                  }}
                >
                  {signUp ? "Sign In" : "Sign Up"}
                </span>
              </span>
            </div>
          </form>
        </main>
      </div>
    );
  } else {
    return;
  }
}

export default ModalRegister;
