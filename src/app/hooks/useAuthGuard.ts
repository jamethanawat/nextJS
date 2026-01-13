"use client";

import {useEffect,useState} from "react";
import {useRouter,usePathname} from "next/navigation";
import {getValidSession,type AuthSession} from "@/app/services/authService";

type AuthGuardState = {
  isChecking: boolean;
  session: AuthSession | null;
};

export function useAuthGuard(redirectTo = "/auth/login"): AuthGuardState {
  const router = useRouter();
  const pathname = usePathname();
  // 1. [Initial Render]
  // เริ่มต้นมา กำหนดให้ isChecking เป็น true ทันที
  // ผลลัพธ์: หน้าจอจะแสดง Loading หรือ null (ตามที่เขียนใน layout)
  const [state, setState] = useState < AuthGuardState > ({
    isChecking: true,
    session: null,
  });
  // 2. [Effect Runs]
  // หลังจากหน้าจอ Render เสร็จแล้ว (แม้จะเป็นหน้าว่างๆ)
  // React จะมาทำโค้ดในนี้
  useEffect(() => {
    // เข้าถึง localStorage หรือ Cookie เพื่อเช็ค session
    // (ซึ่งทำใน Server Side ไม่ได้ ต้องรอทำใน useEffect ฝั่ง Client)
    const session = getValidSession();
    if (!session) {
      // ถ้าไม่มี session -> สั่งเปลี่ยนหน้า
      setState({
        isChecking: false,
        session: null
      });
      sessionStorage.setItem("returnUrl", pathname);
      router.replace(redirectTo);
      return;
    }
    // 3. [State Update]
    // ถ้ามี session -> สั่งอัปเดต State
    // ผลลัพธ์: React จะรู้ว่า State เปลี่ยน และจะสั่ง Render ใหม่อีกรอบ (Re-render)
    setState({
      isChecking: false,
      session
    });
  }, [router, redirectTo, pathname]);

  return state;
}