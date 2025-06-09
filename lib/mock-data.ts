// Mock data for development and testing

export const mockStagiaires = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "0123456789",
    etablissement: "Université Paris 1",
    niveau: "Master 2",
    specialite: "Informatique",
    date_debut: "2024-01-15",
    date_fin: "2024-06-15",
    tuteur_id: "tuteur1",
    statut: "actif",
    type_stage: "professionnel",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    telephone: "0123456790",
    etablissement: "Université Lyon 2",
    niveau: "Master 1",
    specialite: "Gestion",
    date_debut: "2024-02-01",
    date_fin: "2024-07-01",
    tuteur_id: "tuteur2",
    statut: "actif",
    type_stage: "academique",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@email.com",
    telephone: "0123456791",
    etablissement: "ESCP Business School",
    niveau: "Master 2",
    specialite: "Marketing",
    date_debut: "2024-03-01",
    date_fin: "2024-08-01",
    tuteur_id: "tuteur1",
    statut: "termine",
    type_stage: "professionnel",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-08-01T00:00:00Z",
  },
]

export const mockDocuments = [
  {
    id: "1",
    nom: "Convention de stage - Jean Dupont",
    type: "convention",
    url: "/documents/convention-jean-dupont.pdf",
    stagiaire_id: "1",
    statut: "valide",
    date_upload: "2024-01-10T00:00:00Z",
    taille: 245760,
    mime_type: "application/pdf",
  },
  {
    id: "2",
    nom: "Attestation de stage - Sophie Martin",
    type: "attestation",
    url: "/documents/attestation-sophie-martin.pdf",
    stagiaire_id: "2",
    statut: "en_attente",
    date_upload: "2024-06-15T00:00:00Z",
    taille: 189440,
    mime_type: "application/pdf",
  },
  {
    id: "3",
    nom: "Rapport de stage - Pierre Bernard",
    type: "rapport",
    url: "/documents/rapport-pierre-bernard.pdf",
    stagiaire_id: "3",
    statut: "valide",
    date_upload: "2024-07-30T00:00:00Z",
    taille: 1048576,
    mime_type: "application/pdf",
  },
  {
    id: "4",
    nom: "Évaluation finale - Jean Dupont",
    type: "evaluation",
    url: "/documents/evaluation-jean-dupont.pdf",
    stagiaire_id: "1",
    statut: "valide",
    date_upload: "2024-06-10T00:00:00Z",
    taille: 327680,
    mime_type: "application/pdf",
  },
]

export const mockDemandes = [
  {
    id: "1",
    type: "conge",
    titre: "Demande de congé - Vacances été",
    description: "Demande de congé pour les vacances d'été du 15 au 30 juillet",
    stagiaire_id: "1",
    statut: "en_attente",
    date_debut: "2024-07-15",
    date_fin: "2024-07-30",
    motif: "Vacances personnelles",
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    commentaire_tuteur: null,
    date_traitement: null,
  },
  {
    id: "2",
    type: "prolongation",
    titre: "Demande de prolongation de stage",
    description: "Demande de prolongation du stage de 2 mois supplémentaires",
    stagiaire_id: "2",
    statut: "approuve",
    date_debut: "2024-07-01",
    date_fin: "2024-09-01",
    motif: "Projet en cours nécessitant plus de temps",
    created_at: "2024-05-15T00:00:00Z",
    updated_at: "2024-05-20T00:00:00Z",
    commentaire_tuteur: "Prolongation accordée, excellent travail",
    date_traitement: "2024-05-20T00:00:00Z",
  },
  {
    id: "3",
    type: "attestation",
    titre: "Demande d'attestation de stage",
    description: "Demande d'attestation de fin de stage pour dossier universitaire",
    stagiaire_id: "3",
    statut: "approuve",
    date_debut: null,
    date_fin: null,
    motif: "Validation du cursus universitaire",
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2024-08-02T00:00:00Z",
    commentaire_tuteur: "Attestation générée et envoyée",
    date_traitement: "2024-08-02T00:00:00Z",
  },
  {
    id: "4",
    type: "stage_professionnel",
    titre: "Demande de stage professionnel",
    description: "Candidature pour un stage de 6 mois en développement web",
    stagiaire_id: "1",
    statut: "refuse",
    date_debut: "2024-09-01",
    date_fin: "2025-03-01",
    motif: "Spécialisation en développement web",
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2024-04-15T00:00:00Z",
    commentaire_tuteur: "Profil ne correspond pas aux besoins actuels",
    date_traitement: "2024-04-15T00:00:00Z",
  },
  {
    id: "5",
    type: "stage_academique",
    titre: "Demande de stage académique",
    description: "Stage de recherche en intelligence artificielle",
    stagiaire_id: "2",
    statut: "en_attente",
    date_debut: "2024-10-01",
    date_fin: "2025-02-01",
    motif: "Recherche pour mémoire de fin d'études",
    created_at: "2024-07-01T00:00:00Z",
    updated_at: "2024-07-01T00:00:00Z",
    commentaire_tuteur: null,
    date_traitement: null,
  },
]

// Types pour TypeScript
export interface MockStagiaire {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  etablissement: string
  niveau: string
  specialite: string
  date_debut: string
  date_fin: string
  tuteur_id: string
  statut: string
  type_stage: string
  created_at: string
  updated_at: string
}

export interface MockDocument {
  id: string
  nom: string
  type: string
  url: string
  stagiaire_id: string
  statut: string
  date_upload: string
  taille: number
  mime_type: string
}

export interface MockDemande {
  id: string
  type: string
  titre: string
  description: string
  stagiaire_id: string
  statut: string
  date_debut: string | null
  date_fin: string | null
  motif: string
  created_at: string
  updated_at: string
  commentaire_tuteur: string | null
  date_traitement: string | null
}

// Fonctions utilitaires pour filtrer les données
export const getStagiaireById = (id: string) => mockStagiaires.find((stagiaire) => stagiaire.id === id)

export const getDocumentsByStagiaire = (stagiaireId: string) =>
  mockDocuments.filter((doc) => doc.stagiaire_id === stagiaireId)

export const getDemandesByStagiaire = (stagiaireId: string) =>
  mockDemandes.filter((demande) => demande.stagiaire_id === stagiaireId)

export const getDemandesByStatut = (statut: string) => mockDemandes.filter((demande) => demande.statut === statut)

export const getStagiairesByStatut = (statut: string) =>
  mockStagiaires.filter((stagiaire) => stagiaire.statut === statut)
