"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { dashboardService } from "@/lib/services/dashboard-service"
import { authService } from "@/lib/services/auth-service"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface DashboardStats {
  stagiaires_actifs: number
  stagiaires_total: number
  demandes_en_cours: number
  demandes_total: number
  documents_total: number
  evaluations_total: number
}

interface RecentActivity {
  id: string
  date: string
  type: string
  statut: string
  stagiaire_nom: string
  stagiaire_prenom: string
  tuteur_nom: string | null
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Récupérer l'utilisateur actuel
      const { user: currentUser } = await authService.getCurrentUser()
      if (!currentUser) return

      setUser(currentUser)

      // Récupérer les statistiques
      const dashboardStats = await dashboardService.getDashboardStats(currentUser.id, "admin")
      setStats(dashboardStats)

      // Récupérer les activités récentes
      const recentActivities = await dashboardService.getRecentActivities(currentUser.id, "admin", 5)
      setActivities(recentActivities)
    } catch (error) {
      console.error("Erreur lors du chargement du dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En attente":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            En attente
          </Badge>
        )
      case "Validé":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Validé
          </Badge>
        )
      case "Refusé":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Refusé
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      stage_academique: "Stage Académique",
      stage_professionnel: "Stage Professionnel",
      conge: "Congé",
      prolongation: "Prolongation",
      attestation: "Attestation",
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme Bridge</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/stagiaires">Gérer les stagiaires</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/reports">Rapports</Link>
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stagiaires Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stagiaires_actifs || 0}</div>
            <p className="text-xs text-muted-foreground">sur {stats?.stagiaires_total || 0} stagiaires au total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en cours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.demandes_en_cours || 0}</div>
            <p className="text-xs text-muted-foreground">sur {stats?.demandes_total || 0} demandes au total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.documents_total || 0}</div>
            <p className="text-xs text-muted-foreground">documents stockés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évaluations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.evaluations_total || 0}</div>
            <p className="text-xs text-muted-foreground">évaluations réalisées</p>
          </CardContent>
        </Card>
      </div>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
          <CardDescription>Les dernières demandes soumises sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.statut === "En attente" && <Clock className="h-5 w-5 text-yellow-500" />}
                      {activity.statut === "Validé" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {activity.statut === "Refusé" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.stagiaire_prenom} {activity.stagiaire_nom}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getTypeLabel(activity.type)} • {new Date(activity.date).toLocaleDateString("fr-FR")}
                      </p>
                      {activity.tuteur_nom && <p className="text-xs text-gray-500">Tuteur: {activity.tuteur_nom}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(activity.statut)}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/demandes/${activity.id}`}>Voir</Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune activité récente</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
