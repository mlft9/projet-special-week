import { jsPDF } from 'jspdf'

type CertificatePayload = {
  playerName: string
  score: number
  total: number
  logoUrl: string
}

type ImageData = {
  dataUrl: string
  width: number
  height: number
}

function loadImageData(url: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Canvas context unavailable'))
        return
      }

      context.drawImage(image, 0, 0)
      resolve({
        dataUrl: canvas.toDataURL('image/png'),
        width: image.naturalWidth,
        height: image.naturalHeight,
      })
    }
    image.onerror = () => reject(new Error('Unable to load logo image'))
    image.src = url
  })
}

export async function generateCertificatePdf(payload: CertificatePayload): Promise<void> {
  const { playerName, score, total, logoUrl } = payload

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  pdf.setFillColor(250, 243, 224)
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  pdf.setDrawColor(147, 54, 0)
  pdf.setLineWidth(2.2)
  pdf.rect(24, 24, pageWidth - 48, pageHeight - 48)
  pdf.setLineWidth(0.8)
  pdf.rect(34, 34, pageWidth - 68, pageHeight - 68)

  const logo = await loadImageData(logoUrl)
  const maxLogoWidth = 150
  const maxLogoHeight = 74
  const logoScale = Math.min(maxLogoWidth / logo.width, maxLogoHeight / logo.height)
  const drawLogoWidth = logo.width * logoScale
  const drawLogoHeight = logo.height * logoScale
  const logoX = pageWidth / 2 - drawLogoWidth / 2
  const logoY = 52 + (maxLogoHeight - drawLogoHeight) / 2
  pdf.addImage(logo.dataUrl, 'PNG', logoX, logoY, drawLogoWidth, drawLogoHeight)

  pdf.setTextColor(147, 54, 0)
  pdf.setFont('times', 'bold')
  pdf.setFontSize(18)
  pdf.text('CERTIFICATION OFFICIELLE', pageWidth / 2, 154, { align: 'center' })

  pdf.setFont('times', 'normal')
  pdf.setTextColor(80, 60, 40)
  pdf.setFontSize(16)
  pdf.text('Détective de la désinformation', pageWidth / 2, 184, { align: 'center' })

  pdf.setFontSize(13)
  pdf.text('Ce diplôme est décerné à', pageWidth / 2, 234, { align: 'center' })

  pdf.setTextColor(42, 26, 14)
  pdf.setFont('times', 'bold')
  pdf.setFontSize(36)
  pdf.text(playerName, pageWidth / 2, 278, { align: 'center' })

  pdf.setDrawColor(147, 54, 0)
  pdf.setLineWidth(1)
  pdf.line(pageWidth / 2 - 210, 292, pageWidth / 2 + 210, 292)

  pdf.setTextColor(80, 60, 40)
  pdf.setFont('times', 'normal')
  pdf.setFontSize(14)
  pdf.text('pour sa performance remarquable au quiz', pageWidth / 2, 332, { align: 'center' })

  pdf.setFont('times', 'bold')
  pdf.setFontSize(28)
  pdf.setTextColor(147, 54, 0)
  pdf.text(`${score} / ${total}`, pageWidth / 2, 370, { align: 'center' })

  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  pdf.setFont('times', 'normal')
  pdf.setTextColor(80, 60, 40)
  pdf.setFontSize(12)
  pdf.text(`Délivré le ${date}`, 100, pageHeight - 80)
  pdf.text('Signature numérique · Programme Détective IA', pageWidth - 100, pageHeight - 80, {
    align: 'right',
  })

  const safeName = playerName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  pdf.save(`certificat-${safeName || 'joueur'}-${score}-${total}.pdf`)
}