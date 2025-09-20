"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Sparkles, CheckCircle, Brain, Target, TrendingUp, Loader2 } from "lucide-react"

export function CVUploadInterface() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResponse, setAiResponse] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find((file) => file.type === "application/pdf")

    if (pdfFile) {
      handleFileUpload(pdfFile)
    }
  }, [])

  const handleFileUpload = (file: File) => {
    setIsUploading(true)
    setUploadedFile(file)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
      }
    }, 200)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      handleFileUpload(file)
    }
  }

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mb-2 text-foreground">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium mb-2 text-foreground">$1</h3>')
      .replace(/^\*\* (.*$)/gim, '<h4 class="text-sm font-medium mb-1 text-foreground">$1</h4>')
      .replace(/^\* (.*$)/gim, '<li class="text-sm leading-relaxed text-foreground ml-4">• $1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-foreground">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-3 text-sm leading-relaxed text-foreground">')
      .replace(/\n/g, '<br/>')
      .replace(/^/, '<p class="mb-3 text-sm leading-relaxed text-foreground">')
      .replace(/$/, '</p>')
  }

  const analyzeCV = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError("")
    setAiResponse("")

    try {
      const formData = new FormData()
      formData.append("cv", uploadedFile)

      const response = await fetch("https://back-roast-cv.onrender.com/roast_cv", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setAiResponse(result.roaster_response || result.message || "Aucune réponse reçue")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'analyse")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">CVBoost AI</h1>
                <p className="text-sm text-muted-foreground">Optimisez votre CV avec l'IA</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Se connecter
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Analyse IA avancée
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Transformez votre CV avec {""}
            <span className="text-accent">l'intelligence artificielle</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Obtenez des conseils personnalisés, optimisez vos compétences et augmentez vos chances d'être recruté grâce
            à notre IA spécialisée.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyse ciblée</h3>
              <p className="text-muted-foreground text-sm">
                Notre IA analyse votre CV selon les standards du marché et identifie les points d'amélioration.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conseils personnalisés</h3>
              <p className="text-muted-foreground text-sm">
                Recevez des recommandations spécifiques adaptées à votre secteur et niveau d'expérience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimisation ATS</h3>
              <p className="text-muted-foreground text-sm">
                Optimisez votre CV pour passer les filtres automatiques des systèmes de recrutement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Commencez l'analyse de votre CV</h2>
              <p className="text-muted-foreground">
                Uploadez votre CV au format PDF pour recevoir une analyse complète et des conseils personnalisés
              </p>
            </div>

            {!uploadedFile ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-accent bg-accent/5 scale-[1.02]"
                    : "border-border hover:border-accent/50 hover:bg-accent/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Glissez-déposez votre CV ici</h3>
                <p className="text-muted-foreground mb-6">ou cliquez pour sélectionner un fichier PDF</p>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Sélectionner un fichier
                </Button>

                <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Format PDF uniquement
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Taille max: 10MB
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{uploadedFile.name}</h4>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Uploadé
                  </Badge>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Upload en cours...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {!isUploading && (
                  <div className="text-center">
                    <Button 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90"
                      onClick={analyzeCV}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyse en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Analyser mon CV
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isAnalyzing ? "L'analyse est en cours..." : "L'analyse prendra environ 30 secondes"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Response Section */}
        {(aiResponse || error || isAnalyzing) && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-8">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Analyse IA de votre CV</h2>
                <p className="text-muted-foreground">
                  Voici l'analyse détaillée de votre CV par notre intelligence artificielle
                </p>
              </div>

              {isAnalyzing && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent" />
                  <p className="text-muted-foreground">L'IA analyse votre CV...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 text-sm">
                    <strong>Erreur:</strong> {error}
                  </p>
                </div>
              )}

              {aiResponse && (
                <div className="space-y-4">
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Réponse de l'IA
                    </h3>
                    <div 
                      className="prose prose-sm max-w-none text-foreground"
                      dangerouslySetInnerHTML={{ __html: formatMarkdownText(aiResponse) }}
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAiResponse("")
                        setError("")
                      }}
                    >
                      Nouvelle analyse
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">Déjà utilisé par plus de 10,000 professionnels</p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-xs font-medium">🔒 Données sécurisées</div>
            <div className="text-xs font-medium">⚡ Analyse instantanée</div>
            <div className="text-xs font-medium">🎯 IA spécialisée RH</div>
          </div>
        </div>
      </div>
    </div>
  )
}
