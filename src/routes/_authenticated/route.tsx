import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({ ssr: false, beforeLoad: async () => { const { data, error } = await supabase.auth.getUser(); if (error || !data.user) throw redirect({ to: "/auth/sign-in" }); return { user: data.user }; }, component: AuthenticatedLayout });
function AuthenticatedLayout() { const { user } = Route.useRouteContext(); return <DashboardLayout email={user.email} name={String(user.user_metadata?.full_name ?? "")}><Outlet /></DashboardLayout>; }
