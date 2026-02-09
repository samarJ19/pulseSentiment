import { httpClient } from "@/util/axios";

type MeResponse = {
  success: true;
  data: {
    userId: string | null;
    role: string | null;
  };
};

export function clearAuthStorage() {
  try {
    localStorage.removeItem("ROLE");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
  } catch (error) {
    // ignore storage errors
  }

  // expire all cookies (best-effort for auth cookies set by backend)
  if (typeof document !== "undefined" && document.cookie) {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }
}

export async function fetchMe(): Promise<{ role: string | null }> {
  try {
    const response = await httpClient.get<MeResponse>("/user/me");
    const role = response.data?.data?.role ?? null;
    if (role) {
      localStorage.setItem("ROLE", role);
    } else {
      clearAuthStorage();
    }
    return { role };
  } catch (error) {
    clearAuthStorage();
    return { role: null };
  }
}
