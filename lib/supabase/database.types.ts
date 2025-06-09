export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: "admin" | "rh" | "tuteur" | "stagiaire"
          nom: string
          prenom: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: "admin" | "rh" | "tuteur" | "stagiaire"
          nom: string
          prenom: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: "admin" | "rh" | "tuteur" | "stagiaire"
          nom?: string
          prenom?: string
          created_at?: string
          updated_at?: string
        }
      }
      stagiaires: {
        Row: {
          id: string
          user_id: string
          etablissement: string
          niveau_etude: string
          specialite: string
          tuteur_id: string | null
          date_debut: string | null
          date_fin: string | null
          statut: "actif" | "termine" | "suspendu"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          etablissement: string
          niveau_etude: string
          specialite: string
          tuteur_id?: string | null
          date_debut?: string | null
          date_fin?: string | null
          statut?: "actif" | "termine" | "suspendu"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          etablissement?: string
          niveau_etude?: string
          specialite?: string
          tuteur_id?: string | null
          date_debut?: string | null
          date_fin?: string | null
          statut?: "actif" | "termine" | "suspendu"
          created_at?: string
          updated_at?: string
        }
      }
      demandes: {
        Row: {
          id: string
          stagiaire_id: string
          type: string
          titre: string
          description: string
          statut: "en_attente" | "approuvee" | "rejetee"
          date_debut: string | null
          date_fin: string | null
          commentaire_tuteur: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stagiaire_id: string
          type: string
          titre: string
          description: string
          statut?: "en_attente" | "approuvee" | "rejetee"
          date_debut?: string | null
          date_fin?: string | null
          commentaire_tuteur?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stagiaire_id?: string
          type?: string
          titre?: string
          description?: string
          statut?: "en_attente" | "approuvee" | "rejetee"
          date_debut?: string | null
          date_fin?: string | null
          commentaire_tuteur?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "rh" | "tuteur" | "stagiaire"
      demande_statut: "en_attente" | "approuvee" | "rejetee"
      stagiaire_statut: "actif" | "termine" | "suspendu"
    }
  }
}
