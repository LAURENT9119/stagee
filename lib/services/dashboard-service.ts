import { createClient } from "@/lib/supabase/client"

type DashboardStats = {
  stagiaires_actifs: number
  stagiaires_total: number
  demandes_en_cours: number
  demandes_total: number
  documents_total: number
  evaluations_total: number
}

export class DashboardService {
  private supabase = createClient()

  async getDashboardStats(userId: string, role: string): Promise<DashboardStats> {
    try {
      // Utiliser des requêtes simples au lieu de la fonction RPC pour éviter les problèmes de permissions
      let stats: DashboardStats = {
        stagiaires_actifs: 0,
        stagiaires_total: 0,
        demandes_en_cours: 0,
        demandes_total: 0,
        documents_total: 0,
        evaluations_total: 0,
      }

      if (role === "admin" || role === "rh") {
        // Statistiques globales
        const { count: stagiaireActifs } = await this.supabase
          .from("stagiaires")
          .select("*", { count: "exact", head: true })
          .eq("statut", "actif")

        const { count: stagiaireTotal } = await this.supabase
          .from("stagiaires")
          .select("*", { count: "exact", head: true })

        const { count: demandesEnCours } = await this.supabase
          .from("demandes")
          .select("*", { count: "exact", head: true })
          .eq("statut", "En attente")

        const { count: demandesTotal } = await this.supabase
          .from("demandes")
          .select("*", { count: "exact", head: true })

        const { count: documentsTotal } = await this.supabase
          .from("documents")
          .select("*", { count: "exact", head: true })

        const { count: evaluationsTotal } = await this.supabase
          .from("evaluations")
          .select("*", { count: "exact", head: true })

        stats = {
          stagiaires_actifs: stagiaireActifs || 0,
          stagiaires_total: stagiaireTotal || 0,
          demandes_en_cours: demandesEnCours || 0,
          demandes_total: demandesTotal || 0,
          documents_total: documentsTotal || 0,
          evaluations_total: evaluationsTotal || 0,
        }
      } else if (role === "tuteur") {
        // Statistiques pour le tuteur
        const { count: stagiaireActifs } = await this.supabase
          .from("stagiaires")
          .select("*", { count: "exact", head: true })
          .eq("tuteur_id", userId)
          .eq("statut", "actif")

        const { count: stagiaireTotal } = await this.supabase
          .from("stagiaires")
          .select("*", { count: "exact", head: true })
          .eq("tuteur_id", userId)

        const { count: demandesEnCours } = await this.supabase
          .from("demandes")
          .select("*", { count: "exact", head: true })
          .eq("tuteur_id", userId)
          .eq("statut", "En attente")

        const { count: demandesTotal } = await this.supabase
          .from("demandes")
          .select("*", { count: "exact", head: true })
          .eq("tuteur_id", userId)

        stats = {
          stagiaires_actifs: stagiaireActifs || 0,
          stagiaires_total: stagiaireTotal || 0,
          demandes_en_cours: demandesEnCours || 0,
          demandes_total: demandesTotal || 0,
          documents_total: 0,
          evaluations_total: 0,
        }
      } else if (role === "stagiaire") {
        // Récupérer l'ID du stagiaire
        const { data: stagiaireData } = await this.supabase
          .from("stagiaires")
          .select("id")
          .eq("user_id", userId)
          .single()

        if (stagiaireData) {
          const { count: demandesEnCours } = await this.supabase
            .from("demandes")
            .select("*", { count: "exact", head: true })
            .eq("stagiaire_id", stagiaireData.id)
            .eq("statut", "En attente")

          const { count: demandesTotal } = await this.supabase
            .from("demandes")
            .select("*", { count: "exact", head: true })
            .eq("stagiaire_id", stagiaireData.id)

          const { count: documentsTotal } = await this.supabase
            .from("documents")
            .select("*", { count: "exact", head: true })
            .eq("stagiaire_id", stagiaireData.id)

          stats = {
            stagiaires_actifs: 0,
            stagiaires_total: 1,
            demandes_en_cours: demandesEnCours || 0,
            demandes_total: demandesTotal || 0,
            documents_total: documentsTotal || 0,
            evaluations_total: 0,
          }
        }
      }

      return stats
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error)
      return {
        stagiaires_actifs: 0,
        stagiaires_total: 0,
        demandes_en_cours: 0,
        demandes_total: 0,
        documents_total: 0,
        evaluations_total: 0,
      }
    }
  }

  async getRecentActivities(userId: string, role: string, limit = 10) {
    try {
      let query = this.supabase
        .from("demandes")
        .select(
          `
          *,
          stagiaires!inner(nom, prenom)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit)

      // Filtrer selon le rôle
      if (role === "tuteur") {
        query = query.eq("tuteur_id", userId)
      } else if (role === "stagiaire") {
        // Récupérer l'ID du stagiaire
        const { data: stagiaireData } = await this.supabase
          .from("stagiaires")
          .select("id")
          .eq("user_id", userId)
          .single()

        if (stagiaireData) {
          query = query.eq("stagiaire_id", stagiaireData.id)
        }
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des activités:", error)
      return []
    }
  }

  async getNotifications(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .eq("lu", false)
        .order("date", { ascending: false })
        .limit(10)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications:", error)
      return []
    }
  }
}

export const dashboardService = new DashboardService()
