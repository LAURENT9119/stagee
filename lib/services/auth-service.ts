import { createClient } from "@/lib/supabase/client"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export class AuthService {
  private supabase = createClient()

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signUp(email: string, password: string, userData: Partial<Profile>) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Créer le profil utilisateur
        const { error: profileError } = await this.supabase.from("profiles").insert({
          id: data.user.id,
          email,
          ...userData,
        })

        if (profileError) throw profileError
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async getUserProfile(userId: string) {
    try {
      const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return { profile: data, error: null }
    } catch (error) {
      return { profile: null, error: error as Error }
    }
  }
}

// Instance singleton
export const authService = new AuthService()

// Server-side auth helper
export async function getServerUser() {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) throw error
    return { user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}
